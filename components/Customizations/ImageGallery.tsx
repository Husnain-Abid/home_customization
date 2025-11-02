"use client"
import React from 'react'
import { useProductContext } from '../../contexts/ProductContext'
import { useImageModal } from '../../hooks/useImageModal'
import { getExteriorGalleryImages, getInteriorGalleryImages } from '../../lib/gallery-utils'
import ImageGallerySkeleton from './ImageGallerySkeleton'
import GalleryItem from './GalleryItem'
import ImageModal from './ImageModal'

export default function ImageGallery() {
    const {
        productData,
        selectedFeatures,
        filteredInteriorData,
        filteredExteriorEnergyData
    } = useProductContext()

    const { selectedImage, isModalOpen, currentImageIndex, totalImages, sectionTitle, openModal, closeModal, nextImage, prevImage } = useImageModal()

    // Get images using utility functions
    const exteriorImages = getExteriorGalleryImages(selectedFeatures, filteredInteriorData, productData, filteredExteriorEnergyData)
    const interiorImages = getInteriorGalleryImages(selectedFeatures, filteredInteriorData, productData)


    // console.log("interiorImages", interiorImages);
    // console.log("exteriorImages", exteriorImages);



    if (!productData) {
        return <ImageGallerySkeleton />
    }

    return (
        <div className="max-w-7xl mx-auto py-4 w-full">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
                Gallery
            </h2>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Interior Section - Left Side */}
                <div className="space-y-6">
                    <h3 className="text-xl text-center md:text-2xl font-semibold text-gray-800 mb-6">
                        Interior :
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {interiorImages.length > 0 ? (
                            interiorImages.map((image, index) => (
                                <GalleryItem
                                    key={index}
                                    image={image}
                                    alt={`Interior gallery image ${index + 1}`}
                                    onClick={(imageSrc) => openModal(imageSrc, interiorImages, 'Interior')}
                                />
                            ))
                        ) : (
                            <div className="col-span-2 h-48 md:h-56 lg:h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500">No interior images available</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Exterior Section - Right Side */}
                <div className="space-y-6">
                    <h3 className="text-xl text-center md:text-2xl font-semibold text-gray-800 mb-6">
                        Exterior :
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {exteriorImages.length > 0 ? (
                            exteriorImages.map((image, index) => (
                                <GalleryItem
                                    key={index}
                                    image={image}
                                    alt={`Exterior gallery image ${index + 1}`}
                                    onClick={(imageSrc) => openModal(imageSrc, exteriorImages, 'Exterior')}
                                />
                            ))
                        ) : (
                            <div className="col-span-2 h-48 md:h-56 lg:h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500">No exterior images available</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Responsive Mobile Layout */}


            {/* Image Modal */}
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
