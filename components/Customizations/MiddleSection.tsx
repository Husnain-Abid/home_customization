"use client"

import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MiddleSectionSkeleton from './MiddleSectionSkeleton'
import { useProductContext } from '../../contexts/ProductContext'
import { useImageModal } from '../../hooks/useImageModal'
import ImageModal from './ImageModal'


export default function MiddleSection() {
    const {
        productData,
        selectedFeatures,
        filteredInteriorData,
        filteredExteriorEnergyData,
        setFinalInteriorImages,
        setFinalExteriorImages
    } = useProductContext()

    const {
        selectedImage,
        isModalOpen,
        openModal,
        closeModal,
        nextImage,
        prevImage,
        currentImageIndex,
        totalImages,
        sectionTitle
    } = useImageModal();


    const [exteriorEmblaRef, exteriorEmblaApi] = useEmblaCarousel({ loop: true })
    const [interiorEmblaRef, interiorEmblaApi] = useEmblaCarousel({ loop: true })

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


    // Get images from filtered data with default fallback
    const getExteriorImages = () => {
        if (
            filteredExteriorEnergyData &&
            (
                selectedFeatures.stairs !== undefined ||
                selectedFeatures.railing !== undefined ||
                selectedFeatures.airConditioner !== undefined ||
                selectedFeatures.solarPanel !== undefined
            )
        ) {



            // 🔥 PRIORITY 1: Kitchen = No AND Bathroom = No
            if (
                selectedFeatures.kitchen === 'no' &&
                selectedFeatures.bathroom === 'no' &&
                (filteredExteriorEnergyData.sections?.exterior_NoKitchenBathroom?.gallery?.length ?? 0) > 0
            ) {
                return filteredExteriorEnergyData.sections.exterior_NoKitchenBathroom.gallery || [];
            }

            // 🔹 Priority 2: Kitchen = No AND Kitchen Wall = No AND Shower = No AND (Toilet = No OR Sink = No)
            if (
                selectedFeatures.kitchen === 'no' &&
                selectedFeatures.kitchen_wall === 'no' &&
                selectedFeatures.bathroom === 'yes' &&
                selectedFeatures.shower === 'no' &&
                (
                    selectedFeatures.toilet === 'no' ||
                    selectedFeatures.sink === 'no'
                ) &&
                (filteredExteriorEnergyData.sections?.exterior_NoToilet?.gallery?.length ?? 0) > 0
            ) {
                return filteredExteriorEnergyData.sections.exterior_NoToilet.gallery || [];
            }



            // PRIORITY 1: Kitchen Wall = No AND Shower = No
            if (
                selectedFeatures.kitchen === 'no' &&
                selectedFeatures.bathroom === 'yes' &&
                selectedFeatures.kitchen_wall === 'no' &&
                selectedFeatures.shower === 'no' &&
                (filteredExteriorEnergyData.sections?.exterior_NoShower?.gallery?.length ?? 0) > 0
            ) {
                return filteredExteriorEnergyData.sections.exterior_NoShower.gallery || [];
            }

            // 🔹 Priority 2: Kitchen = No AND Kitchen Wall = No
            if (
                selectedFeatures.kitchen === 'no' &&
                selectedFeatures.kitchen_wall === 'no' &&
                (filteredExteriorEnergyData.sections?.exterior_NoKitchenWall?.gallery?.length ?? 0) > 0
            ) {
                return filteredExteriorEnergyData.sections.exterior_NoKitchenWall.gallery || [];
            }


            // 🔹 Priority 2: Kitchen Position = wall3
            if (selectedFeatures.kitchen_position === 'wall3') {
                if (
                    filteredExteriorEnergyData.sections?.exterior_KitchenPosition?.gallery?.length ?? 0 > 0
                ) {
                    return filteredExteriorEnergyData.sections.exterior_KitchenPosition.gallery || [];
                }
            }


            // 🔹 Priority 4: Kitchen = No
            if (selectedFeatures.kitchen === 'no') {
                if (
                    filteredExteriorEnergyData.sections?.exterior_NoKitchen?.gallery?.length ?? 0 > 0
                ) {
                    return filteredExteriorEnergyData.sections.exterior_NoKitchen.gallery || [];
                }
            }

            // 🔹 Priority 5: Default exterior
            if (
                filteredExteriorEnergyData.sections?.exterior?.gallery?.length ?? 0 > 0
            ) {
                return filteredExteriorEnergyData.sections.exterior.gallery || [];
            }




            // 🔹 Fallback: exteriorGallery images
            if (
                filteredExteriorEnergyData.sections?.exteriorGallery?.images?.length ?? 0 > 0
            ) {
                return filteredExteriorEnergyData.sections.exteriorGallery.images || [];
            }
        }

        // 🔹  Interior features selected → exterior images from interior data
        const hasInteriorFeatures =
            selectedFeatures.kitchen === 'yes' ||
            selectedFeatures.bathroom === 'yes' ||
            selectedFeatures.shower === 'yes' ||
            selectedFeatures.sink === 'yes' ||
            selectedFeatures.toilet === 'yes' ||
            selectedFeatures.kitchen_wall === 'yes' ||
            (selectedFeatures.kitchen_position && selectedFeatures.kitchen_position !== '');

        if (
            hasInteriorFeatures &&
            filteredInteriorData &&
            (filteredInteriorData.sections?.exterior?.gallery?.length ?? 0) > 0
        ) {
            return filteredInteriorData.sections.exterior.gallery || [];
        }

        // 🔹 final fallback
        if (
            productData?.default_images?.exterior?.gallery?.length ?? 0 > 0
        ) {
            return productData?.default_images?.exterior?.gallery || [];
        }

        return [];
    };

    const getInteriorImages = (): string[] => {
        const hasInteriorFeatures =
            selectedFeatures.kitchen === 'yes' ||
            selectedFeatures.bathroom === 'yes' ||
            selectedFeatures.shower === 'yes' ||
            selectedFeatures.sink === 'yes' ||
            selectedFeatures.toilet === 'yes' ||
            selectedFeatures.kitchen_wall === 'yes' ||
            (selectedFeatures.kitchen_position && selectedFeatures.kitchen_position !== '');

        if (hasInteriorFeatures && filteredInteriorData) {

            // 🔥 PRIORITY 1: AC = NO AND STAIRS = NO → interior_NoAC_NoStairs
            if (
                selectedFeatures.airConditioner === 'no' &&
                selectedFeatures.stairs === 'no' &&
                (filteredInteriorData.sections?.interior_NoAC_NoStairs?.gallery?.length ?? 0) > 0
            ) {
                return filteredInteriorData.sections.interior_NoAC_NoStairs.gallery;
            }

            // 🔹 PRIORITY 2: STAIRS = NO → interior_NoStairs
            if (
                selectedFeatures.stairs === 'no' &&
                (filteredInteriorData.sections?.interior_NoStairs?.gallery?.length ?? 0) > 0
            ) {
                return filteredInteriorData.sections.interior_NoStairs.gallery;
            }

            // 🔹 PRIORITY 3: AC = NO → interior_NoAC
            if (
                selectedFeatures.airConditioner === 'no' &&
                (filteredInteriorData.sections?.interior_NoAC?.gallery?.length ?? 0) > 0
            ) {
                return filteredInteriorData.sections.interior_NoAC.gallery;
            }

            // 🔹 PRIORITY 4: Normal interior
            if (
                (filteredInteriorData.sections?.interior?.gallery?.length ?? 0) > 0
            ) {
                return filteredInteriorData.sections.interior.gallery;
            }
        }

        // 🔹 PRIORITY 5: Default fallback
        if (
            (productData?.default_images?.interior?.gallery?.length ?? 0) > 0
        ) {
            return productData.default_images!.interior!.gallery || [];
        }

        return [];
    };

    const exteriorImages = getExteriorImages()
    const interiorImages = getInteriorImages()

    useEffect(() => {
        if (!productData) return;

        setFinalInteriorImages(interiorImages);
        setFinalExteriorImages(exteriorImages);
    }, [productData, interiorImages, exteriorImages]);

    /* ---------------- SKELETON AFTER HOOKS ---------------- */

    if (!productData) {
        return <MiddleSectionSkeleton />;
    }

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
                                        interiorImages.map((image: string, index: number) => (
                                            <div key={index} className="flex-[0_0_100%] min-w-0">
                                                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                                                    {

                                                        imageErrors[image] ? (
                                                            <div className="flex items-center justify-center h-full text-gray-500">
                                                                <span>Image not found</span>
                                                            </div>
                                                        ) : (
                                                            <img
                                                                src={image}
                                                                alt={`Interior design ${index + 1}`}
                                                                className="w-full h-full object-cover rounded-lg"
                                                                onError={() => handleImageError(image)}
                                                                onClick={() => openModal(image, interiorImages, "Interior")}
                                                            />
                                                        )

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
                                                    imageErrors[image] ? (
                                                        <div className="flex items-center justify-center h-full text-gray-500">
                                                            <span>Image not found</span>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={image}
                                                            alt={`Exterior design ${index + 1}`}
                                                            className="w-full h-full object-cover rounded-lg"
                                                            onError={() => handleImageError(image)}
                                                            onClick={() => openModal(image, exteriorImages, "Exterior")}

                                                        />
                                                    )
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


            {/* ---------------- MODAL (Zoom Image) ---------------- */}

            {selectedImage && (
                <ImageModal
                    imageSrc={selectedImage}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onNext={nextImage}
                    onPrev={prevImage}
                    currentIndex={currentImageIndex}
                    totalImages={totalImages}
                    sectionTitle={sectionTitle}
                />
            )}


        </div>
    )
}
