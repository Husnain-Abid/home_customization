import { useState } from 'react'

export const useImageModal = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [imageArray, setImageArray] = useState<string[]>([])
    const [sectionTitle, setSectionTitle] = useState<string>('')

    const openModal = (imageSrc: string, allImages: string[] = [], title: string = '') => {
        const imageIndex = allImages.findIndex(img => img === imageSrc)
        setSelectedImage(imageSrc)
        setCurrentImageIndex(imageIndex >= 0 ? imageIndex : 0)
        setImageArray(allImages)
        setSectionTitle(title)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedImage(null)
        setCurrentImageIndex(0)
        setImageArray([])
        setSectionTitle('')
    }

    const nextImage = () => {
        if (imageArray.length > 0) {
            const nextIndex = (currentImageIndex + 1) % imageArray.length
            setCurrentImageIndex(nextIndex)
            setSelectedImage(imageArray[nextIndex])
        }
    }

    const prevImage = () => {
        if (imageArray.length > 0) {
            const prevIndex = currentImageIndex === 0 ? imageArray.length - 1 : currentImageIndex - 1
            setCurrentImageIndex(prevIndex)
            setSelectedImage(imageArray[prevIndex])
        }
    }

    return {
        selectedImage,
        isModalOpen,
        currentImageIndex,
        totalImages: imageArray.length,
        sectionTitle,
        openModal,
        closeModal,
        nextImage,
        prevImage
    }
}
