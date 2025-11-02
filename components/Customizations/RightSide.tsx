"use client"

import React from "react";
import { useProductContext } from "../../contexts/ProductContext";
import RightSideSkeleton from "./RightSideSkeleton";
import jsPDF from "jspdf";
import "jspdf-autotable";
import type { jsPDFWithPlugin } from "jspdf-autotable";




interface ConfigurationItem {
    name: string
    price: number
    description?: string
}

export default function RightSide() {
    const {
        productData,
        selectedFeatures,
        totalPrice,
        getFeatureOptions
    } = useProductContext()

    // Generate configuration items based on selected features
    const getConfigurationItems = (): ConfigurationItem[] => {
        if (!productData) return []

        const items: ConfigurationItem[] = []

        // Add kitchen if selected
        if (selectedFeatures.kitchen === 'yes') {
            const kitchenOption = productData.features.kitchen?.options.find(opt => opt.value === 'yes')
            if (kitchenOption) {
                items.push({
                    name: 'Kitchen',
                    price: kitchenOption.price,
                    description: 'The kitchen is one of the most important areas of your home, where you spend a lot of time preparing meals and gathering with family. If you\'re looking for a spacious and modern kitchen for your family, the size and design of your kitchen are crucial. It adds both functionality and style to your home. Upgrading your kitchen is an investment, but it will significantly increase the overall value of your home.'
                })
            }
        }

        // Add kitchen position if selected
        if (selectedFeatures.kitchen_position) {
            const positionOption = productData.features.kitchen_position?.options.find(opt => opt.value === selectedFeatures.kitchen_position)
            if (positionOption) {
                let positionName = ''
                if (selectedFeatures.kitchen_position === 'wall3') {
                    positionName = 'Kitchen Position 1 (Wall 3)'
                } else if (selectedFeatures.kitchen_position === 'wall4') {
                    positionName = 'Kitchen Position 2 (Wall 4)'
                }
                items.push({
                    name: positionName,
                    price: positionOption.price,
                    description: 'Kitchen positioning for optimal space utilization.'
                })
            }
        }

        // Add bathroom if selected
        if (selectedFeatures.bathroom === 'yes') {
            const bathroomOption = productData.features.bathroom?.options.find(opt => opt.value === 'yes')
            if (bathroomOption) {
                items.push({
                    name: 'Full Bathroom',
                    price: bathroomOption.price,
                    description: 'A full bathroom adds convenience and value to your home. It includes all necessary fixtures for a complete bathroom experience.'
                })
            }
        }

        // Add shower if selected
        if (selectedFeatures.shower === 'yes') {
            const showerOption = productData.features.shower?.options.find(opt => opt.value === 'yes')
            if (showerOption) {
                items.push({
                    name: 'Shower',
                    price: showerOption.price,
                    description: 'A modern shower installation for your bathroom convenience.'
                })
            }
        }

        // Add sink if selected
        if (selectedFeatures.sink === 'yes') {
            const sinkOption = productData.features.sink?.options.find(opt => opt.value === 'yes')
            if (sinkOption) {
                items.push({
                    name: 'Sink',
                    price: sinkOption.price,
                    description: 'Bathroom sink installation for your convenience.'
                })
            }
        }

        // Add toilet if selected
        if (selectedFeatures.toilet === 'yes') {
            const toiletOption = productData.features.toilet?.options.find(opt => opt.value === 'yes')
            if (toiletOption) {
                items.push({
                    name: 'Toilet',
                    price: toiletOption.price,
                    description: 'Toilet installation for your bathroom.'
                })
            }
        }

        // Add kitchen wall if selected
        if (selectedFeatures.kitchen_wall === 'yes') {
            const wallOption = productData.features.kitchen_wall?.options.find(opt => opt.value === 'yes')
            if (wallOption) {
                items.push({
                    name: 'Kitchen Wall',
                    price: wallOption.price,
                    description: 'Kitchen wall installation for better space organization.'
                })
            }
        }

        // Add slider door if selected
        if (selectedFeatures.slider_door === 'yes') {
            const sliderOption = productData.features.slider_door?.options.find(opt => opt.value === 'yes')
            if (sliderOption) {
                items.push({
                    name: 'Slider Door',
                    price: sliderOption.price,
                    description: 'Modern slider door installation for easy access.'
                })
            }
        }

        // Add french door if selected
        if (selectedFeatures.french_door === 'yes') {
            const frenchOption = productData.features.french_door?.options.find(opt => opt.value === 'yes')
            if (frenchOption) {
                items.push({
                    name: 'French Door',
                    price: frenchOption.price,
                    description: 'Elegant French door installation for a sophisticated look.'
                })
            }
        }

        // Add stairs if selected
        if (selectedFeatures.stairs === 'yes') {
            const stairsOption = productData.features.stairs?.options.find(opt => opt.value === 'yes')
            if (stairsOption) {
                items.push({
                    name: 'Stairs',
                    price: stairsOption.price,
                    description: 'Stair installation for multi-level access.'
                })
            }
        }

        // Add railing if selected
        if (selectedFeatures.railing === 'yes') {
            const railingOption = productData.features.railing?.options.find(opt => opt.value === 'yes')
            if (railingOption) {
                items.push({
                    name: 'Railing',
                    price: railingOption.price,
                    description: 'Safety railing installation for stairs.'
                })
            }
        }

        // Add air conditioner if selected
        if (selectedFeatures.airConditioner === 'yes') {
            const acOption = productData.features.airConditioner?.options.find(opt => opt.value === 'yes')
            if (acOption) {
                items.push({
                    name: 'Air Conditioner',
                    price: acOption.price,
                    description: 'Air conditioning system for climate control.'
                })
            }
        }

        // Add natural gas if selected
        if (selectedFeatures.naturalGas === 'yes') {
            const gasOption = productData.features.naturalGas?.options.find(opt => opt.value === 'yes')
            if (gasOption) {
                items.push({
                    name: 'Natural Gas',
                    price: gasOption.price,
                    description: 'Natural gas connection for heating and cooking.'
                })
            }
        }

        // Add solar panel if selected
        if (selectedFeatures.solarPanel === 'yes') {
            const solarOption = productData.features.solarPanel?.options.find(opt => opt.value === 'yes')
            if (solarOption) {
                items.push({
                    name: 'Solar Panel',
                    price: solarOption.price,
                    description: 'Solar panel installation with battery for renewable energy.'
                })
            }
        }

        return items
    }


    const configurationItems = getConfigurationItems()
    const basePrice = productData?.basePrice || 120000

    if (!productData) {
        return <RightSideSkeleton />
    }

    return (
        <div className="p-4 h-full xl:h-screen overflow-y-auto  bg-white border border-gray-100 rounded-lg">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-800 text-center">Your Configuration</h2>

            <div className="space-y-4 sm:space-y-6">
                {/* Configuration Items */}
                {configurationItems.map((item, index) => (
                    <div key={index} className="bg-gray-100 border rounded-lg p-3 sm:p-4">
                        <div className="flex justify-between items-start mb-2 sm:mb-3">
                            <h3 className="font-bold text-gray-800 text-sm sm:text-base">{item.name}</h3>
                            <span className="font-bold text-gray-800 text-sm sm:text-base">${item.price.toLocaleString()}</span>
                        </div>
                        {item.description && (
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{item.description}</p>
                        )}
                    </div>
                ))}

                {/* Cost Summary */}
                <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm sm:text-base">Base Home:</span>
                        <span className="text-gray-800 text-sm sm:text-base">${basePrice.toLocaleString()}</span>
                    </div>

                    {/* Show selected features */}
                    {configurationItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <span className="text-gray-600 text-sm sm:text-base">{item.name}:</span>
                            <span className="text-gray-800 text-sm sm:text-base">+${item.price.toLocaleString()}</span>
                        </div>
                    ))}

                    <div className="border-t pt-2 sm:pt-3 mt-3 sm:mt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm sm:text-lg font-bold text-gray-800">Total Estimate:</span>
                            <span className="text-lg sm:text-xl xl:text-2xl font-bold text-gray-800">${totalPrice.toLocaleString()}</span>
                        </div>
                    </div>

                </div>




            </div>
        </div>
    )
}
