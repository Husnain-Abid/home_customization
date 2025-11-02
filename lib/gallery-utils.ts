interface ProductFeatures {
    airConditioner?: string
    naturalGas?: string
    solarPanel?: string
    slider_door?: string
    french_door?: string
    stairs?: string
    railing?: string
    kitchen?: string
}

interface ProductData {
    sections: {
        exterior?: {
            images?: string[]
            gallery?: string[]
        }
        interior?: {
            images?: string[]
            gallery?: string[]
        }
        exteriorGallery?: {
            images?: string[]
        }
        interiorGallery?: {
            images?: string[]
        }
        energySources?: {
            gallery?: string[]
            images?: string[]
        }
    }
}

interface ExteriorEnergyData {
    sections: {
        exterior?: {
            gallery?: string[]
        }
        exterior_NoKitchen?: {
            gallery?: string[]
        }
        exteriorGallery?: {
            images?: string[]
        }
    }
}

export const getExteriorGalleryImages = (
    selectedFeatures: ProductFeatures,
    filteredInteriorData: ProductData | null,
    productData?: any,
    filteredExteriorEnergyData?: ExteriorEnergyData | null
): string[] => {
    const hasExteriorFeatures = selectedFeatures.stairs !== undefined ||
        selectedFeatures.railing !== undefined ||
        selectedFeatures.airConditioner !== undefined ||
        selectedFeatures.solarPanel !== undefined;

    if (filteredExteriorEnergyData && hasExteriorFeatures) {
        if (filteredExteriorEnergyData.sections?.exteriorGallery?.images?.length ?? 0 > 0) {
            return filteredExteriorEnergyData.sections?.exteriorGallery?.images || [];
        }
    } else {
    }

    const hasInteriorFeatures = Object.entries(selectedFeatures).some(([key, value]) => {
        if (key === 'kitchen' || key === 'bathroom') {
            return value === 'yes';
        }
        if (key === 'kitchen_position' || key === 'kitchen_wall') {
            return value && value !== '';
        }
        if (key === 'shower' || key === 'sink' || key === 'toilet') {
            return value === 'yes';
        }
        return false;
    });

    if (hasInteriorFeatures && filteredInteriorData && (filteredInteriorData.sections.exteriorGallery?.images?.length ?? 0) > 0) {
        return filteredInteriorData.sections.exteriorGallery?.images || [];
    }

    if (productData?.default_images?.exteriorGallery?.images?.length ?? 0 > 0) {
        return productData.default_images.exteriorGallery.images || [];
    }

    return []
}

export const getInteriorGalleryImages = (
    selectedFeatures: ProductFeatures,
    filteredInteriorData: ProductData | null,
    productData?: any
): string[] => {
    const hasInteriorFeatures = Object.entries(selectedFeatures).some(([key, value]) => {
        if (key === 'kitchen' || key === 'bathroom') {
            return value === 'yes';
        }
        if (key === 'kitchen_position' || key === 'kitchen_wall') {
            return value && value !== '';
        }
        if (key === 'shower' || key === 'sink' || key === 'toilet') {
            return value === 'yes';
        }
        return false;
    });

    if (hasInteriorFeatures && filteredInteriorData && (filteredInteriorData.sections.interiorGallery?.images?.length ?? 0) > 0) {
        return filteredInteriorData.sections.interiorGallery?.images || [];
    }

    if (productData?.default_images?.interiorGallery?.images?.length ?? 0 > 0) {
        return productData.default_images.interiorGallery.images || [];
    }

    return []
}
