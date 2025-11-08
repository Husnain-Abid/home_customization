"use client"

import React, { useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MiddleSectionSkeleton from './MiddleSectionSkeleton'
import { useProductContext } from '../../contexts/ProductContext'


export default function MiddleSection() {
    const {
        productData,
        selectedFeatures,
        filteredInteriorData,
        filteredExteriorEnergyData
    } = useProductContext()


    const [exteriorEmblaRef, exteriorEmblaApi] = useEmblaCarousel()
    const [interiorEmblaRef, interiorEmblaApi] = useEmblaCarousel()
    const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({})

    const scrollPrev = (api: any) => {
        if (api) api.scrollPrev()
    }

    const scrollNext = (api: any) => {
        if (api) api.scrollNext()
    }

    const handleImageError = (imageSrc: string) => {
        setImageErrors(prev => ({
            ...prev,
            [imageSrc]: true
        }))
    }

    if (!productData) {
        return <MiddleSectionSkeleton />
    }

    // Get images from filtered data with default fallback
    const getExteriorImages = () => {
        if (filteredExteriorEnergyData && (selectedFeatures.stairs !== undefined || selectedFeatures.railing !== undefined || selectedFeatures.airConditioner !== undefined || selectedFeatures.solarPanel !== undefined)) {
            // Check if kitchen is selected to determine which exterior images to show
            if (selectedFeatures.kitchen === 'no') {
                // Kitchen = No: display images from exterior_NoKitchen.gallery (for MiddleSection)
                if (filteredExteriorEnergyData.sections?.exterior_NoKitchen?.gallery?.length ?? 0 > 0) {
                    return filteredExteriorEnergyData.sections?.exterior_NoKitchen?.gallery || [];
                }
            } else {
                // Kitchen = Yes: display regular exterior.gallery images (for MiddleSection)
                if (filteredExteriorEnergyData.sections?.exterior?.gallery?.length ?? 0 > 0) {
                    return filteredExteriorEnergyData.sections?.exterior?.gallery || [];
                }
            }

            // Fallback to exterior gallery images if main sections don't have images
            if (filteredExteriorEnergyData.sections?.exteriorGallery?.images?.length ?? 0 > 0) {
                return filteredExteriorEnergyData.sections?.exteriorGallery?.images || [];
            }
        }

        // Priority 2: If interior features are selected, check interior data for exterior gallery images
        const hasInteriorFeatures = selectedFeatures.kitchen === 'yes' ||
            selectedFeatures.bathroom === 'yes' ||
            selectedFeatures.shower === 'yes' ||
            selectedFeatures.sink === 'yes' ||
            selectedFeatures.toilet === 'yes' ||
            selectedFeatures.kitchen_wall === 'yes' ||
            (selectedFeatures.kitchen_position && selectedFeatures.kitchen_position !== '');

        if (hasInteriorFeatures && filteredInteriorData && (filteredInteriorData.sections.exterior.gallery?.length ?? 0) > 0) {
            return filteredInteriorData.sections.exterior.gallery || [];
        }

        // Priority 3: Default fallback - show default exterior images
        if (productData?.default_images?.exterior?.gallery?.length ?? 0 > 0) {
            return productData.default_images!.exterior!.gallery || [];
        }

        return []
    }

    const getInteriorImages = () => {
        // Check if any interior-specific features are selected (EXCLUDING exterior features) - more strict
        const hasInteriorFeatures = selectedFeatures.kitchen === 'yes' ||
            selectedFeatures.bathroom === 'yes' ||
            selectedFeatures.shower === 'yes' ||
            selectedFeatures.sink === 'yes' ||
            selectedFeatures.toilet === 'yes' ||
            selectedFeatures.kitchen_wall === 'yes' ||
            (selectedFeatures.kitchen_position && selectedFeatures.kitchen_position !== '');

        // Priority 1: If interior features are selected, check interior data
        if (hasInteriorFeatures && filteredInteriorData && (filteredInteriorData.sections.interior.gallery?.length ?? 0) > 0) {
            return filteredInteriorData.sections.interior.gallery || [];
        }

        // Priority 2: Default fallback - show default interior images
        if (productData?.default_images?.interior?.gallery?.length ?? 0 > 0) {
            return productData.default_images!.interior!.gallery || [];
        }

        return []
    }

    const exteriorImages = getExteriorImages()
    const interiorImages = getInteriorImages()





    return (
        <div className=" px-4 py-4 xl:py-0 h-full overflow-y-auto">
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Interior Design Section */}
                <div className=" p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center text-gray-800">Interior Design :</h2>
                    <div className="relative">
                        <div className="overflow-hidden rounded-lg" ref={interiorEmblaRef}>
                            <div className="flex">
                                {
                                interiorImages.length > 0 ? (
                                    interiorImages.map((image, index) => (
                                        <div key={index} className="flex-[0_0_100%] min-w-0">
                                            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                                                {
                                                
                                                
                                                // imageErrors[image] ? (
                                                //     <div className="flex items-center justify-center h-full text-gray-500">
                                                //         <span>Image not found</span>
                                                //     </div>
                                                // ) : (
                                                    <img
                                                        src={image}
                                                        alt={`Interior design ${index + 1}`}
                                                        className="w-full h-full object-cover rounded-lg"
                                                        onError={() => handleImageError(image)}
                                                    />
                                                // )
                                                
                                                
                                                }
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex-[0_0_100%] min-w-0">
                                        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                                            <span className="text-gray-500">No interior images available</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            className="absolute cursor-pointer left-1 sm:left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md transition-all"
                            onClick={() => scrollPrev(interiorEmblaApi)}
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button
                            className="absolute cursor-pointer right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md transition-all"
                            onClick={() => scrollNext(interiorEmblaApi)}
                        >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </div>

                {/* Exterior Design Section */}
                <div className="  px-4 sm:px-6">
                    <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center text-gray-800">Exterior Design :</h2>
                    <div className="relative">
                        <div className="overflow-hidden rounded-lg" ref={exteriorEmblaRef}>
                            <div className="flex">
                                {exteriorImages.length > 0 ? (
                                    exteriorImages.map((image: string, index: number) => (
                                        <div key={index} className="flex-[0_0_100%] min-w-0">
                                            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                                                {
                                                // imageErrors[image] ? (
                                                //     <div className="flex items-center justify-center h-full text-gray-500">
                                                //         <span>Image not found</span>
                                                //     </div>
                                                // ) : (
                                                    <img
                                                        src={image}
                                                        alt={`Exterior design ${index + 1}`}
                                                        className="w-full h-full object-cover rounded-lg"
                                                        onError={() => handleImageError(image)}
                                                    />
                                                // )
                                                }
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex-[0_0_100%] min-w-0">
                                        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                                            <span className="text-gray-500">No exterior images available</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            className="absolute cursor-pointer left-1 sm:left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md transition-all"
                            onClick={() => scrollPrev(exteriorEmblaApi)}
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button
                            className="absolute cursor-pointer right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md transition-all"
                            onClick={() => scrollNext(exteriorEmblaApi)}
                        >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}