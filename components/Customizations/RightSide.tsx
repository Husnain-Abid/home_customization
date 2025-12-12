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

        // Kitchen
        if (selectedFeatures.kitchen === 'yes') {
            const kitchenOption = productData.features.kitchen?.options.find(opt => opt.value === 'yes')
            if (kitchenOption) {
                items.push({
                    name: 'Kitchen',
                    price: kitchenOption.price,
                    description:
                        'Your custom kitchen delivers the full functionality of a traditional home kitchen in a compact footprint. Built in appliances, tailored cabinetry, and smart storage maximize workflow and usability. The layout includes a compact refrigerator, two burner cooktop, built in oven, and dual sinks, all set against heat resistant countertops designed for everyday durability.'
                })
            }
        }

        // Kitchen Position
        if (selectedFeatures.kitchen_position) {
            const positionOption = productData.features.kitchen_position?.options.find(opt => opt.value === selectedFeatures.kitchen_position)
            if (positionOption) {
                let positionName = selectedFeatures.kitchen_position === 'wall3'
                    ? 'Kitchen Position 1 (Wall 3)'
                    : 'Kitchen Position 2 (Wall 4)'

                items.push({
                    name: positionName,
                    price: positionOption.price,
                    description: 'Kitchen positioning for optimal space utilization.'
                })
            }
        }

        // Bathroom
        if (selectedFeatures.bathroom === 'yes') {
            const bathroomOption = productData.features.bathroom?.options.find(opt => opt.value === 'yes')
            if (bathroomOption) {
                items.push({
                    name: 'Full Bathroom',
                    price: bathroomOption.price,
                    description:
                        'Your custom bathroom combines modern design with space saving efficiency. It features a 60”x 30” shower, a floating sink, and a toilet, all arranged for comfort and usability in a compact footprint. Customers save $1,000 when purchasing the complete bathroom package instead of individually.'
                })
            }
        }

        // Shower
        if (selectedFeatures.shower === 'yes') {
            const showerOption = productData.features.shower?.options.find(opt => opt.value === 'yes')
            if (showerOption) {
                items.push({
                    name: 'Shower',
                    price: showerOption.price,
                    description:
                        'Full sized shower unit designed for compact comfort, complete with enclosure and fixtures.'
                })
            }
        }

        // Sink
        if (selectedFeatures.sink === 'yes') {
            const sinkOption = productData.features.sink?.options.find(opt => opt.value === 'yes')
            if (sinkOption) {
                items.push({
                    name: 'Sink',
                    price: sinkOption.price,
                    description:
                        'Floating sink with modern design, includes all hardware and plumbing connections.'
                })
            }
        }

        // Toilet
        if (selectedFeatures.toilet === 'yes') {
            const toiletOption = productData.features.toilet?.options.find(opt => opt.value === 'yes')
            if (toiletOption) {
                items.push({
                    name: 'Toilet',
                    price: toiletOption.price,
                    description:
                        'Space saving floating toilet, adaptable for use with a standard residential waste system or a disposable/portable setup similar to camping solutions.'
                })
            }
        }

        // Kitchen Wall
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

        // Slider Door
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

        // French Door
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

        // Stairs
        if (selectedFeatures.stairs === 'yes') {
            const stairsOption = productData.features.stairs?.options.find(opt => opt.value === 'yes')
            if (stairsOption) {
                items.push({
                    name: 'Stairs',
                    price: stairsOption.price,
                    description:
                        'Rooftop stairs provide safe and easy access to the full 8′×20′ rooftop. Crafted from solid wood, they combine strength, stability, and a natural finish that complements the home’s design. Compact yet sturdy, the stairs are built for long term durability and everyday use, offering secure access for solar maintenance, outdoor living, or rooftop storage.'
                })
            }
        }

        // Roof Railing
        if (selectedFeatures.railing === 'yes') {
            const railingOption = productData.features.railing?.options.find(opt => opt.value === 'yes')
            if (railingOption) {
                items.push({
                    name: 'Roof Railing',
                    price: railingOption.price,
                    description:
                        'Rooftop railing provides secure protection around the full 8′×20′ rooftop. Crafted from durable wood, it is engineered for stability and long term use while complementing the natural finish of the stairs. The railing ensures safe access for outdoor living or rooftop storage.'
                })
            }
        }

        // Air Conditioner
        if (selectedFeatures.airConditioner === 'yes') {
            const acOption = productData.features.airConditioner?.options.find(opt => opt.value === 'yes')
            if (acOption) {
                items.push({
                    name: 'Air Conditioning',
                    price: acOption.price,
                    description:
                        'Air Conditioning is equipped with a mini split air conditioning system, delivering efficient cooling, and heating in a compact design. Quiet, energy saving, and easy to control, the system keeps your space comfortable year round without bulky ductwork.'
                })
            }
        }

        // Natural Gas
        if (selectedFeatures.naturalGas === 'yes') {
            const gasOption = productData.features.naturalGas?.options.find(opt => opt.value === 'yes')
            if (gasOption) {
                items.push({
                    name: 'Gas',
                    price: gasOption.price,
                    description:
                        'If you’d like to have natural gas as an energy source, we’d be glad to install the piping that leads to the Kitchen.'
                })
            }
        }

        // Solar Panel
        if (selectedFeatures.solarPanel === 'yes') {
            const solarOption = productData.features.solarPanel?.options.find(opt => opt.value === 'yes')
            if (solarOption) {
                items.push({
                    name: 'Solar',
                    price: solarOption.price,
                    description:
                        'This system will surely keep you off grid and self sufficient. With a full roof array, inverter, and battery storage, your home generates and stores its own electricity—powering lights, appliances, and everyday living without reliance on external utilities.'
                })
            }
        }

        return items
    }



    const configurationItems = getConfigurationItems()
    const basePrice = productData?.basePrice || 21990

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
