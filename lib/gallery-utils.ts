interface ProductFeatures {
    kitchen_position: string
    sink: string
    toilet: string
    shower: string
    bathroom: string
    airConditioner?: string
    naturalGas?: string
    solarPanel?: string
    slider_door?: string
    french_door?: string
    stairs?: string
    railing?: string
    kitchen?: string
    kitchen_wall?: string
}

interface ProductData {
    sections: {


        interiorGallery_NoAC?: {
            images?: string[]
        }
        interiorGallery_NoStairs?: {
            images?: string[]
        }
        interiorGallery_NoAC_NoStairs?: {
            images?: string[]
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
        exteriorGallery_NoShower: any
        exteriorGallery_NoKitchenWall: any
        exteriorGallery_NoKitchen: any
        exterior?: {
            gallery?: string[]
        }
        exterior_NoKitchen?: {
            gallery?: string[]
        }
        exteriorGallery?: {
            images?: string[]
        }
        exteriorGallery_NoKitchenBathroom?: {
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

    const noKitchenBathroom =
        selectedFeatures.kitchen === 'no' &&
        selectedFeatures.bathroom === 'no';

    //  PRIORITY 2: EXTERIOR GALLERY - NO KITCHEN + NO BATHROOM
    if (
        filteredExteriorEnergyData &&
        noKitchenBathroom &&
        filteredExteriorEnergyData.sections?.exteriorGallery_NoKitchenBathroom?.images?.length
    ) {
        return filteredExteriorEnergyData.sections.exteriorGallery_NoKitchenBathroom.images;
    }




    // 🔥 PRIORITY 1: Kitchen = NO + Kitchen Wall = NO + (Shower OR Toilet OR Sink = NO)
    if (
        filteredExteriorEnergyData &&
        selectedFeatures.kitchen_wall === 'no' &&
        selectedFeatures.shower === 'no'
        &&
        filteredExteriorEnergyData.sections?.exteriorGallery_NoShower?.images?.length
    ) {
        return filteredExteriorEnergyData.sections.exteriorGallery_NoShower.images;
    }

    // 🔥 PRIORITY 1: Kitchen = NO + Kitchen Wall = Yes + (Shower OR Toilet OR Sink = NO)
    if (
        filteredExteriorEnergyData &&
        selectedFeatures.kitchen_wall === 'yes' &&
        selectedFeatures.shower === 'no'
        &&
        filteredExteriorEnergyData.sections?.exteriorGallery_NoShower?.images?.length
    ) {
        return filteredExteriorEnergyData.sections.exteriorGallery_NoShower.images;
    }

    // 🔥 PRIORITY 0: Kitchen YES + Bathroom NO + Kitchen Position = wall3 | wall4 → NO SHOWER GALLERY
    if (
        filteredExteriorEnergyData &&
        selectedFeatures.kitchen === 'yes' &&
        selectedFeatures.bathroom === 'no' &&
        (selectedFeatures.kitchen_position === 'wall3' ||
            selectedFeatures.kitchen_position === 'wall4') &&
        filteredExteriorEnergyData.sections?.exteriorGallery_NoShower?.images?.length
    ) {
        return filteredExteriorEnergyData.sections.exteriorGallery_NoShower.images;
    }




    //  PRIORITY 3: EXTERIOR GALLERY - NO KITCHEN wWall
    if (
        filteredExteriorEnergyData &&
        (selectedFeatures.kitchen === 'no' && selectedFeatures.kitchen_wall === 'no') &&
        filteredExteriorEnergyData.sections?.exteriorGallery_NoKitchenWall?.images?.length
    ) {
        return filteredExteriorEnergyData.sections.exteriorGallery_NoKitchenWall.images;
    }

    //  PRIORITY 4: EXTERIOR GALLERY - NO KITCHEN
    if (
        filteredExteriorEnergyData &&
        selectedFeatures.kitchen === 'no' &&
        filteredExteriorEnergyData.sections?.exteriorGallery_NoKitchen?.images?.length
    ) {
        return filteredExteriorEnergyData.sections.exteriorGallery_NoKitchen.images;
    }



    // 🔹 PRIORITY 2: Exterior feature based gallery
    const hasExteriorFeatures =
        selectedFeatures.stairs !== undefined ||
        selectedFeatures.railing !== undefined ||
        selectedFeatures.airConditioner !== undefined ||
        selectedFeatures.solarPanel !== undefined;

    if (
        filteredExteriorEnergyData &&
        hasExteriorFeatures &&
        filteredExteriorEnergyData.sections?.exteriorGallery?.images?.length
    ) {
        return filteredExteriorEnergyData.sections.exteriorGallery.images;
    }

    // 🔹 PRIORITY 3: Interior driven exterior gallery
    const hasInteriorFeatures = Object.entries(selectedFeatures).some(([key, value]) => {
        if (key === 'kitchen' || key === 'bathroom') return value === 'yes';
        if (key === 'kitchen_position' || key === 'kitchen_wall') return value && value !== '';
        if (key === 'shower' || key === 'sink' || key === 'toilet') return value === 'yes';
        return false;
    });

    if (
        hasInteriorFeatures &&
        filteredInteriorData &&
        filteredInteriorData.sections.exteriorGallery?.images?.length
    ) {
        return filteredInteriorData.sections.exteriorGallery.images;
    }

    // 🔹 PRIORITY 4: Default fallback
    if (productData?.default_images?.exteriorGallery?.images?.length) {
        return productData.default_images.exteriorGallery.images;
    }

    return [];
};



export const getInteriorGalleryImages = (
    selectedFeatures: ProductFeatures,
    filteredInteriorData: ProductData | null,
    productData?: any
): string[] => {

    if (!filteredInteriorData) return [];

    const hasInteriorFeatures = Object.entries(selectedFeatures).some(([key, value]) => {
        if (key === 'kitchen' || key === 'bathroom') return value === 'yes';
        if (key === 'kitchen_position' || key === 'kitchen_wall') return value && value !== '';
        if (key === 'shower' || key === 'sink' || key === 'toilet') return value === 'yes';
        return false;
    });

    if (hasInteriorFeatures) {

        // 🔥 PRIORITY 1: NO AC + NO STAIRS
        const noACNoStairs = filteredInteriorData.sections.interiorGallery_NoAC_NoStairs;
        if (
            selectedFeatures.airConditioner === 'no' &&
            selectedFeatures.stairs === 'no' &&
            noACNoStairs?.images?.length
        ) {
            return noACNoStairs.images;
        }

        // 🔥 PRIORITY 2:  NO STAIRS
        const noStairs = filteredInteriorData.sections.interiorGallery_NoStairs;
        if (
            selectedFeatures.stairs === 'no' &&
            noStairs?.images?.length
        ) {
            return noStairs.images;
        }

        // 🔹 PRIORITY 3: NO AC
        const interiorNoAC = filteredInteriorData.sections.interiorGallery_NoAC;
        if (
            selectedFeatures.airConditioner === 'no' &&
            interiorNoAC?.images?.length
        ) {
            return interiorNoAC.images;
        }

        // 🔹 PRIORITY 3: NORMAL INTERIOR
        const interiorGallery = filteredInteriorData.sections.interiorGallery;
        if (interiorGallery?.images?.length) {
            return interiorGallery.images;
        }
    }

    // 🔹 PRIORITY 4: DEFAULT FALLBACK
    const fallback = productData?.default_images?.interiorGallery;
    if (fallback?.images?.length) {
        return fallback.images;
    }

    return [];
};
