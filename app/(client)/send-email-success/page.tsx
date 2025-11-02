"use client"

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CheckCircle, Home, Download } from 'lucide-react'
import { useProductContext } from '@/contexts/ProductContext'
import { generateCustomizedHomePDF } from '@/lib/pdf-generator'
import toast from 'react-hot-toast'
import Image from 'next/image'

export default function SendEmailSuccess() {
    const router = useRouter()
    const [isDownloading, setIsDownloading] = React.useState(false)
    const {
        productData,
        selectedFeatures,
        filteredInteriorData,
        filteredExteriorEnergyData,
        totalPrice
    } = useProductContext()

    // Check if any customizations were actually selected
    const hasAnyCustomizations = () => {
        return (
            selectedFeatures.kitchen === 'yes' ||
            selectedFeatures.bathroom === 'yes' ||
            selectedFeatures.shower === 'yes' ||
            selectedFeatures.sink === 'yes' ||
            selectedFeatures.toilet === 'yes' ||
            selectedFeatures.kitchen_wall === 'yes' ||
            selectedFeatures.slider_door === 'yes' ||
            selectedFeatures.french_door === 'yes' ||
            selectedFeatures.stairs === 'yes' ||
            selectedFeatures.roofTop === 'yes' ||
            selectedFeatures.airConditioner === 'yes' ||
            selectedFeatures.naturalGas === 'yes' ||
            selectedFeatures.solarPanel === 'yes' ||
            (selectedFeatures.kitchen_position && selectedFeatures.kitchen_position !== '')
        )
    }

    // Redirect if no customizations and no product data (someone accessed this page directly)
    useEffect(() => {
        if (!productData) {
            router.push('/customizations')
            return
        }

        if (!hasAnyCustomizations()) {
            // If no customizations, redirect to customizations page after a short delay
            const timer = setTimeout(() => {
                router.push('/customizations')
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [productData, router])

    const getFirstExteriorImage = () => {
        // Mirror MiddleSection selection (no product defaults)
        if (
            filteredExteriorEnergyData && (
                selectedFeatures.stairs !== undefined ||
                selectedFeatures.railing !== undefined ||
                selectedFeatures.airConditioner !== undefined ||
                selectedFeatures.solarPanel !== undefined
            )
        ) {
            if (selectedFeatures.kitchen === 'no') {
                if ((filteredExteriorEnergyData.sections?.exterior_NoKitchen?.gallery?.length ?? 0) > 0) {
                    return filteredExteriorEnergyData.sections?.exterior_NoKitchen?.gallery?.[0] || null;
                }
            } else {
                if ((filteredExteriorEnergyData.sections?.exterior?.gallery?.length ?? 0) > 0) {
                    return filteredExteriorEnergyData.sections?.exterior?.gallery?.[0] || null;
                }
            }

            if ((filteredExteriorEnergyData.sections?.exteriorGallery?.images?.length ?? 0) > 0) {
                return filteredExteriorEnergyData.sections?.exteriorGallery?.images?.[0] || null;
            }
        }

        const hasInteriorFeatures = selectedFeatures.kitchen === 'yes' ||
            selectedFeatures.bathroom === 'yes' ||
            selectedFeatures.shower === 'yes' ||
            selectedFeatures.sink === 'yes' ||
            selectedFeatures.toilet === 'yes' ||
            selectedFeatures.kitchen_wall === 'yes' ||
            (selectedFeatures.kitchen_position && selectedFeatures.kitchen_position !== '');

        if (hasInteriorFeatures && filteredInteriorData && (filteredInteriorData.sections.exterior.gallery?.length ?? 0) > 0) {
            return filteredInteriorData.sections.exterior.gallery?.[0] || null;
        }

        return null;
    }

    const getFirstInteriorImage = () => {
        // Mirror MiddleSection: only when interior features are selected; no defaults
        const hasInteriorFeatures = selectedFeatures.kitchen === 'yes' ||
            selectedFeatures.bathroom === 'yes' ||
            selectedFeatures.shower === 'yes' ||
            selectedFeatures.sink === 'yes' ||
            selectedFeatures.toilet === 'yes' ||
            selectedFeatures.kitchen_wall === 'yes' ||
            (selectedFeatures.kitchen_position && selectedFeatures.kitchen_position !== '');

        if (hasInteriorFeatures && filteredInteriorData && (filteredInteriorData.sections.interior.gallery?.length ?? 0) > 0) {
            return filteredInteriorData.sections.interior.gallery?.[0] || null;
        }

        return null;
    }

    // Generate configuration items
    const getConfigurationItems = () => {
        if (!productData) return []

        const items: Array<{ name: string; price: number }> = []

        if (selectedFeatures.kitchen === 'yes') {
            const kitchenOption = productData.features.kitchen?.options.find(opt => opt.value === 'yes')
            if (kitchenOption) {
                items.push({ name: 'Kitchen', price: kitchenOption.price })
            }
        }

        if (selectedFeatures.kitchen_position) {
            const positionOption = productData.features.kitchen_position?.options.find(opt => opt.value === selectedFeatures.kitchen_position)
            if (positionOption) {
                let positionName = ''
                if (selectedFeatures.kitchen_position === 'wall3') {
                    positionName = 'Kitchen Position 1 (Wall 3)'
                } else if (selectedFeatures.kitchen_position === 'wall4') {
                    positionName = 'Kitchen Position 2 (Wall 4)'
                }
                items.push({ name: positionName, price: positionOption.price })
            }
        }

        if (selectedFeatures.bathroom === 'yes') {
            const bathroomOption = productData.features.bathroom?.options.find(opt => opt.value === 'yes')
            if (bathroomOption) {
                items.push({ name: 'Full Bathroom', price: bathroomOption.price })
            }
        }

        if (selectedFeatures.shower === 'yes') {
            const showerOption = productData.features.shower?.options.find(opt => opt.value === 'yes')
            if (showerOption) {
                items.push({ name: 'Shower', price: showerOption.price })
            }
        }

        if (selectedFeatures.sink === 'yes') {
            const sinkOption = productData.features.sink?.options.find(opt => opt.value === 'yes')
            if (sinkOption) {
                items.push({ name: 'Sink', price: sinkOption.price })
            }
        }

        if (selectedFeatures.toilet === 'yes') {
            const toiletOption = productData.features.toilet?.options.find(opt => opt.value === 'yes')
            if (toiletOption) {
                items.push({ name: 'Toilet', price: toiletOption.price })
            }
        }

        if (selectedFeatures.kitchen_wall === 'yes') {
            const wallOption = productData.features.kitchen_wall?.options.find(opt => opt.value === 'yes')
            if (wallOption) {
                items.push({ name: 'Kitchen Wall', price: wallOption.price })
            }
        }

        if (selectedFeatures.slider_door === 'yes') {
            const sliderOption = productData.features.slider_door?.options.find(opt => opt.value === 'yes')
            if (sliderOption) {
                items.push({ name: 'Slider Door', price: sliderOption.price })
            }
        }

        if (selectedFeatures.french_door === 'yes') {
            const frenchOption = productData.features.french_door?.options.find(opt => opt.value === 'yes')
            if (frenchOption) {
                items.push({ name: 'French Door', price: frenchOption.price })
            }
        }

        if (selectedFeatures.stairs === 'yes') {
            const stairsOption = productData.features.stairs?.options.find(opt => opt.value === 'yes')
            if (stairsOption) {
                items.push({ name: 'Stairs', price: stairsOption.price })
            }
        }

        if (selectedFeatures.roofTop === 'yes') {
            const roofOption = productData.features.roofTop?.options.find(opt => opt.value === 'yes')
            if (roofOption) {
                items.push({ name: 'Roof Top', price: roofOption.price })
            }
        }

        if (selectedFeatures.airConditioner === 'yes') {
            const acOption = productData.features.airConditioner?.options.find(opt => opt.value === 'yes')
            if (acOption) {
                items.push({ name: 'Air Conditioner', price: acOption.price })
            }
        }

        if (selectedFeatures.naturalGas === 'yes') {
            const gasOption = productData.features.naturalGas?.options.find(opt => opt.value === 'yes')
            if (gasOption) {
                items.push({ name: 'Natural Gas', price: gasOption.price })
            }
        }

        if (selectedFeatures.solarPanel === 'yes') {
            const solarOption = productData.features.solarPanel?.options.find(opt => opt.value === 'yes')
            if (solarOption) {
                items.push({ name: 'Solar Panel', price: solarOption.price })
            }
        }

        return items
    }

    const handlePDFDownload = async () => {
        try {
            setIsDownloading(true)
            // brief delay to show spinner before triggering download
            await new Promise(resolve => setTimeout(resolve, 1500))
            setIsDownloading(false)
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

            toast.success('PDF downloaded successfully!')
        } catch (error) {
            console.error('Error downloading PDF:', error)
            toast.error('Failed to download PDF. Please try again.')
        } finally {
            setIsDownloading(false)
        }
    }

    const exteriorImage = getFirstExteriorImage()
    const interiorImage = getFirstInteriorImage()
    const configurationItems = getConfigurationItems()
    const basePrice = productData?.basePrice || 120000
    const hasCustomizations = hasAnyCustomizations()

    // Show loading/redirect message if no customizations
    if (!hasCustomizations) {
        return (
            <div className="max-w-7xl w-full mx-auto px-4 h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto w-36 h-36 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-20 h-20 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 mb-2">
                        No Customizations Selected
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Redirecting you to the customizations page...
                    </p>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#C2A45C] mx-auto"></div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="max-w-7xl w-full mx-auto px-4 py-8">
                {/* Success Header */}
                <div className="mb-8">
                    <div className="text-center max-w-md mx-auto">
                        <div className="mx-auto w-36 h-36 bg-[#C2A45C]/20 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="w-20 h-20 text-[#C2A45C]" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 mb-2 leading-9 sm:leading-10 md:leading-11">
                            Your Custom Home Has Been Submitted
                        </h2>
                        <div className='flex flex-col gap-1'>
                            <p className="text-gray-600">
                                Thank you! We will be in touch with you as soon as possible.
                            </p>
                            <p className='text-gray-600'> Please email us at anytime <a className='text-[#C2A45C]'>contact@freepointhomes.com</a></p>
                        </div>
                    </div>
                </div>

                {/* Your Customization Preview */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                        Your Customization Preview
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Images Section */}
                        <div className="space-y-6">
                            {/* Exterior Image */}
                            <div className="">
                                <h4 className="text-lg font-semibold text-gray-800 mb-3">Exterior Design:</h4>
                                {exteriorImage ? (
                                    <Image
                                        width={1000}
                                        height={1000}
                                        src={exteriorImage}
                                        alt="Exterior Design"
                                        className="w-full rounded-lg shadow-md"
                                    />
                                ) : (
                                    <div className="w-full max-w-sm mx-auto h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <span className="text-gray-500">No exterior image available</span>
                                    </div>
                                )}
                            </div>

                            {/* Interior Image */}
                            <div className="">
                                <h4 className="text-lg font-semibold text-gray-800 mb-3">Interior Design:</h4>
                                {interiorImage ? (
                                    <Image
                                        width={1000}
                                        height={1000}
                                        src={interiorImage}
                                        alt="Interior Design"
                                        className="w-full rounded-lg shadow-md"
                                    />
                                ) : (
                                    <div className="w-full max-w-sm mx-auto h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <span className="text-gray-500">No interior image available</span>
                                    </div>
                                )}
                            </div>

                            {/* Only show PDF download button if there are customizations */}
                            {hasCustomizations && (
                                <div className=''>
                                    <button
                                        onClick={handlePDFDownload}
                                        disabled={isDownloading}
                                        className={`bg-[#C2A45C] text-white px-6 py-3 rounded-md transition-colors font-medium flex items-center justify-center gap-2 min-w-[160px] ${isDownloading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:bg-[#C2A45C]/80'}`}
                                    >
                                        {isDownloading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                <span>Preparing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Download className="w-4 h-4" />
                                                <span>Download PDF</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Configuration Section */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Your Configuration</h4>

                            {/* Cost Summary */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Base Home:</span>
                                        <span className="text-gray-800">${basePrice.toLocaleString()}</span>
                                    </div>

                                    {configurationItems.map((item, index) => (
                                        <div key={index} className="flex justify-between">
                                            <span className="text-gray-600">{item.name}:</span>
                                            <span className="text-gray-800">+${item.price.toLocaleString()}</span>
                                        </div>
                                    ))}

                                    <div className="border-t pt-2 mt-3">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-gray-800">Total Estimate:</span>
                                            <span className="text-xl font-bold text-[#C2A45C]">
                                                ${totalPrice.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Link href="/" className="block">
                        <button className="w-full cursor-pointer sm:w-auto bg-[#C2A45C] hover:bg-[#C2A45C]/80 text-white px-6 py-3 rounded-md transition-colors font-medium flex items-center justify-center">
                            <Home className="w-4 h-4 mr-2" />
                            Back to Home
                        </button>
                    </Link>

                    <Link href="/customizations" className="block">
                        <button className="w-full cursor-pointer sm:w-auto border border-[#C2A45C] text-[#C2A45C] hover:bg-[#C2A45C] hover:text-white px-6 py-3 rounded-md transition-colors font-medium">
                            Continue Customizing
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}

