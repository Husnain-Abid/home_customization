import { useState } from 'react'

export const useImageZoom = () => {
    const [zoomLevel, setZoomLevel] = useState(1)
    const [panPosition, setPanPosition] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

    const zoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.5, 3))
    }

    const zoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 0.5, 0.5))
    }

    const resetZoom = () => {
        setZoomLevel(1)
        setPanPosition({ x: 0, y: 0 })
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        if (zoomLevel > 1) {
            e.preventDefault()
            setIsDragging(true)
            setDragStart({
                x: e.clientX - panPosition.x,
                y: e.clientY - panPosition.y
            })
        }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && zoomLevel > 1) {
            e.preventDefault()
            const newX = e.clientX - dragStart.x
            const newY = e.clientY - dragStart.y
            
            // Smooth pan with constraints
            setPanPosition({
                x: newX,
                y: newY
            })
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault()
        e.stopPropagation()
        
        // Smooth wheel zoom
        const delta = e.deltaY
        const zoomFactor = delta > 0 ? -0.1 : 0.1
        const newZoom = Math.max(0.5, Math.min(3, zoomLevel + zoomFactor))
        
        setZoomLevel(newZoom)
    }

    // Touch support for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1 && zoomLevel > 1) {
            const touch = e.touches[0]
            setIsDragging(true)
            setDragStart({
                x: touch.clientX - panPosition.x,
                y: touch.clientY - panPosition.y
            })
        }
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isDragging && e.touches.length === 1 && zoomLevel > 1) {
            e.preventDefault()
            const touch = e.touches[0]
            const newX = touch.clientX - dragStart.x
            const newY = touch.clientY - dragStart.y
            
            setPanPosition({
                x: newX,
                y: newY
            })
        }
    }

    const handleTouchEnd = () => {
        setIsDragging(false)
    }

    const resetZoomState = () => {
        setZoomLevel(1)
        setPanPosition({ x: 0, y: 0 })
        setIsDragging(false)
        setDragStart({ x: 0, y: 0 })
    }

    return {
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
    }
}
