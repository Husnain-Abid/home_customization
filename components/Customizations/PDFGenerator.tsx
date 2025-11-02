"use client"

import React from 'react'
import { useProductContext } from '@/contexts/ProductContext'
import { generateCustomizedHomePDF } from '@/lib/pdf-generator'

interface PDFGeneratorProps {
    onDownload: () => void
}

export default function PDFGenerator({ onDownload }: PDFGeneratorProps) {
    const [isLoading, setIsLoading] = React.useState(false)

    const {
        productData,
        selectedFeatures,
        filteredInteriorData,
        filteredExteriorEnergyData,
        totalPrice
    } = useProductContext()

    const generatePDF = async () => {
        setIsLoading(true)

        try {
            const config = {
                productData,
                selectedFeatures,
                filteredInteriorData,
                filteredExteriorEnergyData,
                totalPrice
            }

            await generateCustomizedHomePDF(config, {
                shouldDownload: true,
                fileName: 'customized-home-configuration.pdf'
            })

            onDownload()

        } catch (error) {
            console.error('Error generating PDF:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            {/* Download Button */}
            <button
                onClick={generatePDF}
                disabled={isLoading}
                className={`bg-[#C2A45C] cursor-pointer text-white px-6 py-3 rounded-md transition-colors font-medium flex items-center justify-center gap-2 min-w-[140px] ${isLoading
                        ? 'opacity-70 cursor-not-allowed'
                        : 'hover:bg-[#C2A45C]/80'
                    }`}
            >
                {isLoading ? (
                    <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Generating...</span>
                    </>
                ) : (
                    'Download PDF'
                )}
            </button>
        </div>
    )
} 