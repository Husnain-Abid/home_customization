"use client"

import React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const detailsData = [
  {
    title: "STRUCTURE & ENGINEERING",
    items: [
      {
        name: "Engineered Steel Home",
        desc: "A true steel and cement structure engineered for permanent strength, with a full 8'6\"+ interior width and a 9'6\" high ceiling — delivering more livable volume than any other single piece home in its class."
      },
      {
        name: "Indestructible Construction",
        desc: "Built from steel and cement, this home is fire resistant, weather proof, pest proof, and designed to outperform traditional wood frame construction in every category."
      },
      {
        name: "No Permits Required",
        desc: "Place it in your yard, on land, or on a trailer — no red tape, no delays, no construction zone."
      }
    ]
  },
  {
    title: "INTERIOR FEATURES",
    items: [
      { name: "Kitchen", desc: "Compact, efficient, fully electric kitchen with modern appliances and a clean, functional layout." },
      { name: "Full Bathroom", desc: "A complete bathroom with shower, sink, and toilet — engineered for comfort and space efficiency." },
      { name: "Shower", desc: "30\" × 5' shower enclosure with modern fixtures and easy clean surfaces." },
      { name: "Sink", desc: "Floating sink with minimalist hardware and flexible plumbing options." },
      { name: "Toilet", desc: "Space saving toilet with standard waste outlet or optional composting setup." },
      { name: "Kitchen Wall", desc: "Durable, easy clean wall system behind the cooktop and sink, finished in tile or composite panel." }
    ]
  },
  {
    title: "EXTERIOR FEATURES",
    items: [
      { name: "Stairs", desc: "Compact steel stair system designed for safe, easy access to the entry." },
      { name: "Railing", desc: "Minimal steel railing for safety and durability, with clean lines and a powder coated finish." },
      { name: "Exterior Glass Door", desc: "Insulated steel exterior door with a full height glass panel for natural light and a modern look." }
    ]
  },
  {
    title: "ENERGY & SYSTEMS",
    items: [
      { name: "Air Conditioner", desc: "High efficiency cooling system included, sized for the home’s volume and insulation rating." },
      { name: "Solar Panels (Optional)", desc: "Supports rooftop or ground mounted solar kits, with plug and play compatibility." },
      { name: "Natural Gas (Optional)", desc: "Compatible with external natural gas hookups for heating, cooking, or backup power." }
    ]
  },
  {
    title: "UTILITIES & SETUP",
    items: [
      { name: "Fully Electric", desc: "Runs on standard household power with its own breaker box — plug it into a 120V outlet and go." },
      { name: "Plug and Play Water", desc: "Connect a garden hose for instant running water. No trenching, no plumbing install, no hassle." },
      { name: "Climate Controlled", desc: "Real home insulation, heating, and cooling — engineered for year round comfort." }
    ]
  },
  {
    title: "DELIVERY & MOBILITY",
    items: [
      { name: "Built in 10 Days", desc: "A complete, finished steel home — engineered, assembled, and ready faster than anything else on the market." },
      { name: "White Glove Delivery", desc: "We handle transport, placement, and setup so you don’t lift a finger." },
      { name: "Permanent Strength, Mobile Freedom", desc: "Engineered like a permanent building but flexible enough to relocate whenever life changes." }
    ]
  }
]

export default function DetailsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Intro */}
      <div className="mb-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          DETAILS
        </h1>
        <p className="text-gray-600">
          There’s a lot of detail here — and we know it inside and out. This section walks through every part of how your Freepoint Home is built and what it includes.
        </p>
      </div>

      {/* Accordion */}
      <Accordion type="multiple" className="space-y-6">
        {detailsData.map((section, i) => (
          <AccordionItem key={i} value={`section-${i}`}
            className="border border-gray-200 rounded-lg px-6 mb-6 last:mb-0 last:!border-b">

            <AccordionTrigger className="text-lg font-semibold text-[#4A4C56]">
              {section.title}
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              {section.items.map((item, idx) => (
                <div key={idx}>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
