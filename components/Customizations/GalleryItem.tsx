import React, { useState } from 'react'
import Image from 'next/image'

interface GalleryItemProps {
    image: string
    alt: string
    onClick: (imageSrc: string) => void
    className?: string
}

export default function GalleryItem({ image, alt, onClick, className = "" }: GalleryItemProps) {

    const [loading, setLoading] = useState(true)
    const [imageError, setImageError] = useState(false)

    const handleImageError = () => {
        setImageError(true)
        setLoading(false)
    }

    return (
        <div className={`group overflow-hidden rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${className}`}>
            <div className={`relative ${className.includes('aspect-') ? '' : 'h-48 md:h-56 lg:h-64'}`}>

                {/* 🔄 Spinner */}
                {loading && !imageError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                        <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
                    </div>
                )}

                {
                    imageError ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                            <span className="text-xs">Image not found</span>
                        </div>
                    ) : (
                        <div
                            onClick={() => onClick(image)}
                            className='cursor-pointer'
                        >
                            <Image
                                src={image}
                                alt={alt}
                                fill
                                // className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                                unoptimized
                                onError={handleImageError}
                                className={`object-cover transition-all duration-300 ${loading ? "opacity-0" : "opacity-100"} group-hover:scale-105`}
                                onLoadingComplete={() => setLoading(false)} // ✅ IMPORTANT                          
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
                    )

                }
            </div>
        </div>
    )
}
