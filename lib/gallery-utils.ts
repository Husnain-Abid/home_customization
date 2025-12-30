interface ProductFeatures {
    bathroom: string
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

    // 🔥 PRIORITY 1: EXTERIOR GALLERY - NO KITCHEN + NO BATHROOM
    const noKitchenBathroom =
        selectedFeatures.kitchen === 'no' &&
        selectedFeatures.bathroom === 'no';

    if (
        filteredExteriorEnergyData &&
        noKitchenBathroom &&
        filteredExteriorEnergyData.sections?.exteriorGallery_NoKitchenBathroom?.images?.length
    ) {
        return filteredExteriorEnergyData.sections.exteriorGallery_NoKitchenBathroom.images;
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
