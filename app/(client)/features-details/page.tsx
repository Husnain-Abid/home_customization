"use client"

import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface Feature {
    id: string
    name: string
    category: 'Interior' | 'Exterior' | 'Energy'
    description: string
    icon: string
}

export default function FeaturesDetailsPage() {
    const features: Feature[] = [
        {
            id: 'kitchen',
            name: 'Kitchen',
            category: 'Interior',
            description: 'Add a modern kitchen with appliances and storage. Includes cabinetry, countertops, and your choice of layout positions.',
            icon: '🍳',
        },
        {
            id: 'bathroom',
            name: 'Full Bathroom',
            category: 'Interior',
            description: 'A complete bathroom with toilet, sink, shower/tub, and ventilation. Can be customized with various fixture options.',
            icon: '🚿',
        },
        {
            id: 'shower',
            name: 'Shower',
            category: 'Interior',
            description: 'Standalone shower unit with modern fixtures. Available as a standalone feature or part of a full bathroom.',
            icon: '🚿',
        },
        {
            id: 'sink',
            name: 'Sink',
            category: 'Interior',
            description: 'Bathroom or kitchen sink with faucet. Multiple style options available.',
            icon: '🚰',
        },
        {
            id: 'toilet',
            name: 'Toilet',
            category: 'Interior',
            description: 'Modern toilet fixture. Standard height with efficient water usage.',
            icon: '🚽',
        },
        {
            id: 'kitchen-wall',
            name: 'Kitchen Wall',
            category: 'Interior',
            description: 'Half-wall divider for kitchen area. Only available when Kitchen is not included. Provides partial separation.',
            icon: '🧱',
        },
        {
            id: 'stairs',
            name: 'Stairs',
            category: 'Exterior',
            description: 'Entry stairs for ground-level homes. Standard height with safe treads and optional landing.',
            icon: '📶',
        },
        {
            id: 'railing',
            name: 'Railing',
            category: 'Exterior',
            description: 'Safety railing for stairs and deck areas. Only available when Stairs are included.',
            icon: '🛡️',
        },
        {
            id: 'exterior-door',
            name: 'Exterior Door',
            category: 'Exterior',
            description: 'Main entry door. This feature is included in all customizations and cannot be modified.',
            icon: '🚪',
        },
        {
            id: 'air-conditioner',
            name: 'Air Conditioner',
            category: 'Energy',
            description: 'Climate control system for cooling. Efficient unit with thermostat control.',
            icon: '❄️',
        },
        {
            id: 'solar-panel',
            name: 'Solar Panels',
            category: 'Energy',
            description: 'Rooftop solar energy system. Reduces electrical costs and improves energy efficiency.',
            icon: '☀️',
        },
        {
            id: 'natural-gas',
            name: 'Natural Gas',
            category: 'Energy',
            description: 'Natural gas heating and cooking system. Provides efficient heating alternative.',
            icon: '🔥',
        },
    ]

    const interiorFeatures = features.filter(f => f.category === 'Interior')
    const exteriorFeatures = features.filter(f => f.category === 'Exterior')
    const energyFeatures = features.filter(f => f.category === 'Energy')

    const FeatureCard = ({ feature }: { feature: Feature }) => (
        <div className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="text-3xl flex-shrink-0">{feature.icon}</div>
            <div className="flex-grow">
                <h3 className="font-semibold text-lg text-gray-800">{feature.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{feature.description}</p>
            </div>
        </div>
    )

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Feature Details
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Explore all available features for customizing your Freepoint home. Each feature has been carefully
                    selected to provide maximum value and functionality.
                </p>
            </div>

            <div className="space-y-12">

                {/* Interior Features Section */}
                <section>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                             Interior Features
                        </h2>
                    </div>

                    {/* Accordion List */}
                    <Accordion type="single" collapsible className="space-y-4">
                        {interiorFeatures.map((feature) => (
                            <AccordionItem
                                key={feature.id}
                                value={feature.id}
                                className="border-b border-gray-300 pb-3"
                            >
                                <AccordionTrigger className="text-left font-semibold text-lg text-gray-800 md:text-lg tracking-wide  hover:no-underline">
                                    {feature.name}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-gray-600 text-sm  leading-relaxed pt-2">
                                        {feature.description}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                </section>

                {/* Exterior Features Section */}
                <section>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                         Exterior Features
                        </h2>
                    </div>

                    {/* Accordion List */}
                    <Accordion type="single" collapsible className="space-y-4">
                        {exteriorFeatures.map((feature) => (
                            <AccordionItem
                                key={feature.id}
                                value={feature.id}
                                className="border-b border-gray-300 pb-3"
                            >
                                <AccordionTrigger className="text-left font-semibold text-lg text-gray-800 md:text-lg tracking-wide  hover:no-underline">
                                    {feature.name}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-gray-600 text-sm  leading-relaxed pt-2">
                                        {feature.description}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                </section>

                {/* Energy Features Section */}
                <section>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            Energy & Systems
                        </h2>
                    </div>

                    {/* Accordion List */}
                    <Accordion type="single" collapsible className="space-y-4">
                        {energyFeatures.map((feature) => (
                            <AccordionItem
                                key={feature.id}
                                value={feature.id}
                                className="border-b border-gray-300 pb-3"
                            >
                                <AccordionTrigger className="text-left font-semibold text-lg text-gray-800 md:text-lg tracking-wide  hover:no-underline">
                                    {feature.name}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-gray-600 text-sm  leading-relaxed pt-2">
                                        {feature.description}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                </section>

            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
                <p className="text-gray-600 mb-4">Ready to customize your home?</p>
                <a href="/customizations" className="inline-block">
                    <button className="bg-[#C2A45C] hover:bg-[#C2A45C]/80 transition-all duration-300 text-white px-8 py-3 rounded-md font-semibold">
                        Start Customizing
                    </button>
                </a>
            </div>

        </div>
    )
}
