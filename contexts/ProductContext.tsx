"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface FeatureOption {
  value: string;
  label: string;
  price: number;
}

export interface ProductData {
  id: number;
  name: string;
  basePrice: number;
  features: {
    [key: string]: {
      options: FeatureOption[];
    };
  };
  interior: Array<{
    id: number;
    category: string;
    name: string;
    features: {
      [key: string]: string;
    };
    sections: {
      exterior: {
        gallery: string[];
      };
      interior: {
        gallery: string[];
      };
      exteriorGallery: {
        images: string[];
      };
      interiorGallery: {
        images: string[];
      };
    };
  }>;
  exterior: Array<{
    id: number;
    category: string;
    name: string;
    features: {
      [key: string]: string;
    };
    sections: {
      exterior: {
        gallery: string[];
      };
    };
  }>;
  exterior_energySources: Array<{
    id: number;
    category: string;
    name: string;
    features: {
      [key: string]: string;
    };
    sections: {
      [key: string]: {
        gallery?: string[];
        images?: string[];
      };
    };
  }>;
  default_images?: {
    exterior?: {
      gallery?: string[];
    };
    interior?: {
      gallery?: string[];
    };
    exteriorGallery?: {
      images?: string[];
    };
    interiorGallery?: {
      images?: string[];
    };
  };
}

interface ProductContextType {
  productData: ProductData | null;
  selectedFeatures: { [key: string]: string };
  filteredInteriorData: ProductData['interior'][0] | null;
  filteredExteriorEnergyData: ProductData['exterior_energySources'][0] | null;
  totalPrice: number;
  handleFeatureChange: (featureKey: string, value: string) => void;
  getFeatureOptions: (featureKey: string) => FeatureOption[];
  isFeatureSelected: (featureKey: string, value: string) => boolean;
  resetAllSelections: () => void;
  hasAnySelections: () => boolean;
  areAllFeaturesSelected: () => boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/productsData.json');
        const data = await response.json();
        setProductData(data[0]);
        // setSelectedFeatures({});

        setSelectedFeatures({
          // Interior defaults
          kitchen: 'yes',
          bathroom: 'yes',
          shower: 'yes',
          sink: 'yes',
          toilet: 'yes',
          kitchen_wall: 'yes',

          // Exterior defaults
          stairs: 'no',
          railing: 'no',

          // Energy defaults
          airConditioner: 'yes',
          solarPanel: 'no',
          naturalGas: 'no',
        });





      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchData();
  }, []);

  // console.log("productData" , productData);
  // console.log("selectedFeatures" , selectedFeatures);

  const getFilteredInteriorData = () => {
    if (!productData) return null;

    let bestMatch = null;
    let bestScore = -1;

    for (const item of productData.interior) {
      const itemFeatures = item.features;
      let score = 0;
      let isValidMatch = true;

      const match = (sel: string, val: string) => sel && sel === val;

      // Kitchen & Bathroom are primary
      if (!match(selectedFeatures.kitchen, itemFeatures.kitchen)) continue;
      if (selectedFeatures.bathroom && selectedFeatures.bathroom !== itemFeatures.bathroom) continue;

      // Optional
      if (match(selectedFeatures.shower, itemFeatures.shower)) score += 5;
      if (match(selectedFeatures.toilet, itemFeatures.toilet)) score += 5;
      if (match(selectedFeatures.sink, itemFeatures.sink)) score += 5;

      // Wall mapping fix
      if (match(selectedFeatures.kitchen_wall, itemFeatures.kitchen_wall)) score += 5;

      // Kitchen position mapping fix
      if (match(selectedFeatures.kitchen_position, itemFeatures.kitchen_position)) score += 10;

      if (score > bestScore && isValidMatch) {
        bestScore = score;
        bestMatch = item;
      }


      // --- Debug logs ---
      console.log("🟡 interior Checking Item:", itemFeatures);
      console.log("interior Selected:", selectedFeatures);
      console.log("interior Score:", score, "Valid:", isValidMatch);
    }

    console.log("✅interior Best Match:", bestMatch?.features || "None");

    return bestMatch;
  };


  const getFilteredExteriorEnergyData = () => {
    if (!productData?.exterior_energySources) return null;

    let bestMatch = null;
    let bestScore = -1;

    for (const item of productData.exterior_energySources) {
      const itemFeatures = item.features || {};
      let score = 0;
      let isValidMatch = true;

      // --- Stairs ---
      if (selectedFeatures.stairs) {
        if (itemFeatures.stairs === selectedFeatures.stairs) {
          score += 10;
        } else {
          isValidMatch = false;
        }
      }

      // --- Railing ---
      if (isValidMatch) {
        if (selectedFeatures.stairs === 'yes') {
          if (selectedFeatures.railing) {
            if (itemFeatures.railing === selectedFeatures.railing) {
              score += 8;
            } else {
              isValidMatch = false;
            }
          }
        } else if (selectedFeatures.stairs === 'no') {
          if (itemFeatures.railing === 'no') {
            score += 8;
          } else {
            isValidMatch = false;
          }
        }
      }

      // --- Air Conditioner ---
      if (isValidMatch && selectedFeatures.airConditioner) {
        if (itemFeatures.airConditioner === selectedFeatures.airConditioner) {
          score += 6;
        }
      }

      // --- Solar Panel ---
      if (isValidMatch && selectedFeatures.solarPanel) {
        if (itemFeatures.solarPanel === selectedFeatures.solarPanel) {
          score += 6;
        }
      }

      // --- Update best match ---
      if (isValidMatch && score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }

      // --- Debug logs ---
      console.log("🟡 exterior Checking Item:", itemFeatures);
      console.log("exterior Selected:", selectedFeatures);
      console.log("exterior Score:", score, "Valid:", isValidMatch);
    }

    console.log("✅exterior Best Match:", bestMatch?.features || "None");

    return bestMatch;
  };


  const calculateTotalPrice = () => {
    if (!productData) return 0;

    let total = productData.basePrice;

    Object.entries(selectedFeatures).forEach(([featureKey, value]) => {
      if (value === 'yes') {
        const feature = productData.features[featureKey];
        if (feature) {
          const option = feature.options.find(opt => opt.value === value);
          if (option) {
            total += option.price;
          }
        }
      }

      if (featureKey === 'kitchen_position' && value) {
        const feature = productData.features.kitchen_position;
        if (feature) {
          const option = feature.options.find(opt => opt.value === value);
          if (option) {
            total += option.price;
          }
        }
      }

      if (featureKey === 'railing' && value && selectedFeatures.stairs === 'yes') {
        const feature = productData.features[featureKey];
        if (feature) {
          const option = feature.options.find(opt => opt.value === value);
          if (option) {
            total += option.price;
          }
        }
      }
    });

    return total;
  };

  const handleFeatureChange = (featureKey: string, value: string) => {
    setSelectedFeatures(prev => ({
      ...prev,
      [featureKey]: value,
    }));
  };

  const getFeatureOptions = (featureKey: string): FeatureOption[] => {
    if (!productData) return [];
    return productData.features[featureKey]?.options || [];
  };

  const isFeatureSelected = (featureKey: string, value: string) => {
    return selectedFeatures[featureKey] === value;
  };

  const resetAllSelections = () => {
    setSelectedFeatures({
      // Interior defaults
      kitchen: 'yes',
      bathroom: 'yes',
      shower: 'yes',
      sink: 'yes',
      toilet: 'yes',

      // Exterior defaults
      stairs: 'no',
      railing: 'no',

      // Energy defaults
      airConditioner: 'yes',
      solarPanel: 'no',
      naturalGas: 'no',
    });
  };

  const hasAnySelections = () => {
    return Object.values(selectedFeatures).some(value => value !== '' && value !== undefined);
  };

  const areAllFeaturesSelected = () => {
    if (!productData) return false;
    const requiredKeys = Object.keys(productData.features);
    return requiredKeys.every(
      (key) => selectedFeatures[key] === 'yes' || selectedFeatures[key] === 'no'
    );
  };



  const filteredInteriorData = getFilteredInteriorData();
  const filteredExteriorEnergyData = getFilteredExteriorEnergyData();
  const totalPrice = calculateTotalPrice();

  const value: ProductContextType = {
    productData,
    selectedFeatures,
    filteredInteriorData,
    filteredExteriorEnergyData,
    totalPrice,
    handleFeatureChange,
    getFeatureOptions,
    isFeatureSelected,
    resetAllSelections,
    hasAnySelections,
    areAllFeaturesSelected
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
} 