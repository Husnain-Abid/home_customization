import React, { useState } from 'react'
import Image from 'next/image'

interface GalleryItemProps {
    image: string
    alt: string
    onClick: (imageSrc: string) => void
    className?: string
}

export default function GalleryItem({ image, alt, onClick, className = "" }: GalleryItemProps) {
    const [imageError, setImageError] = useState(false)

    const handleImageError = () => {
        setImageError(true)
    }

    return (
        <div className={`group overflow-hidden rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${className}`}>
            <div className={`relative ${className.includes('aspect-') ? '' : 'h-48 md:h-56 lg:h-64'}`}>
                {
                // imageError ? (
                //     <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                //         <span className="text-xs">Image not found</span>
                //     </div>
                // ) : (
                    <div
                        onClick={() => onClick(image)}
                        className='cursor-pointer'
                    >
                        <Image
                            src={image}
                            alt={alt}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                            unoptimized
                            onError={handleImageError}
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-transparent group-hover:bg-black/50 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                            <button
                                className="opacity-0 cursor-pointer group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300  text-white px-4 py-2 rounded-lg font-medium"
                            >
                                View
                            </button>
                        </div>
                    </div>
                // )
                
                }
            </div>
        </div>
    )
}
