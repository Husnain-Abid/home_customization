import React from 'react'
import Image from 'next/image'
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'
import { useImageZoom } from '../../hooks/useImageZoom'
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from '../ui/dialog'

interface ImageModalProps {
    imageSrc: string
    isOpen: boolean
    onClose: () => void
    onNext?: () => void
    onPrev?: () => void
    currentIndex?: number
    totalImages?: number
    sectionTitle?: string
}

export default function ImageModal({ imageSrc, isOpen, onClose, onNext, onPrev, currentIndex = 0, totalImages = 0, sectionTitle = '' }: ImageModalProps) {
    const {
        zoomLevel,
        panPosition,
        isDragging,
        zoomIn,
        zoomOut,
        resetZoom,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleWheel,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        resetZoomState
    } = useImageZoom()

    React.useEffect(() => {
        if (isOpen) {
            resetZoomState()
        }
    }, [isOpen])

    // Keyboard navigation
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return

            if (e.key === 'ArrowLeft' && onPrev) {
                onPrev()
            } else if (e.key === 'ArrowRight' && onNext) {
                onNext()
            } else if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onNext, onPrev, onClose])

    // Prevent wheel event from bubbling to parent
    const handleWheelWithStop = (e: React.WheelEvent) => {
        e.preventDefault()
        e.stopPropagation()
        handleWheel(e)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="!max-w-none !w-screen !h-screen !p-0 !bg-black/80 !border-none !fixed !inset-0 !translate-x-0 !translate-y-0 !top-0 !left-0 !rounded-none"
                showCloseButton={false}
            >
                {/* Hidden title for accessibility */}
                <DialogTitle className="sr-only">Image Gallery Viewer</DialogTitle>

                <div className="relative w-full h-full flex flex-col">
                    {/* Section Title */}
                    {/* {sectionTitle && (
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
                            <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                {sectionTitle} Gallery
                            </div>
                        </div>
                    )} */}

                    {/* Header with controls */}
                    <div className={`absolute left-4 right-4 flex justify-between items-center z-10 ${sectionTitle ? 'top-16' : 'top-4'}`}>
                        <div className="flex gap-2">
                            <button
                                onClick={zoomOut}
                                className="bg-white/20 cursor-pointer hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
                                disabled={zoomLevel <= 0.5}
                            >
                                <ZoomOut className="w-5 h-5" />
                            </button>
                            <button
                                onClick={zoomIn}
                                className="bg-white/20 cursor-pointer hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
                                disabled={zoomLevel >= 3}
                            >
                                <ZoomIn className="w-5 h-5" />
                            </button>
                            {/* <button
                                onClick={resetZoom}
                                className="bg-white/20 cursor-pointer hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
                            >
                                <RotateCcw className="w-5 h-5" />
                            </button> */}
                            <div className="bg-white/20 text-white px-3 py-2 rounded-full text-sm">
                                {Math.round(zoomLevel * 100)}%
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {totalImages > 1 && (
                                <div className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                                    {currentIndex + 1} / {totalImages}
                                </div>
                            )}
                            <button
                                onClick={onClose}
                                className="bg-white/20  cursor-pointer hover:bg-white/30 text-white p-1 rounded-full transition-all duration-200"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    {totalImages > 1 && (
                        <>
                            {/* Previous Button */}
                            <button
                                onClick={onPrev}
                                className="absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 z-10"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            {/* Next Button */}
                            <button
                                onClick={onNext}
                                className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200 z-10"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}

                    {/* Image Container */}
                    <div
                        className="flex-1 flex items-center justify-center overflow-hidden touch-none select-none"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onWheel={handleWheelWithStop}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        style={{
                            cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                            touchAction: 'none'
                        }}
                    >
                        <div
                            className={`relative ${!isDragging ? 'transition-transform duration-200 ease-out' : ''}`}
                            style={{
                                transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                                transformOrigin: 'center center',
                                willChange: 'transform'
                            }}
                        >
                            {imageSrc && (
                                <Image
                                    src={imageSrc}
                                    alt="Gallery image full view"
                                    width={800}
                                    height={600}
                                    className="max-w-full max-h-full object-contain"
                                    unoptimized
                                    priority
                                />
                            )}
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="absolute bottom-4 w-full px-2 left-1/2 transform -translate-x-1/2 text-white/70 text-sm text-center">
                        <p>Use zoom controls or mouse wheel to zoom • Drag to pan when zoomed{totalImages > 1 ? ' • Use arrow keys or buttons to navigate' : ''}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
