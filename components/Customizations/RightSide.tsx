"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useProductContext } from "../../contexts/ProductContext"
import RightSideSkeleton from "./RightSideSkeleton"

interface ConfigurationItem {
  name: string
  price: number
  description: string
  detailsUrl: string
  placeholderPrice: number
  isChild?: boolean
  parent?: string
  boxColors: string
}


export default function RightSide() {



  const { productData, selectedFeatures, totalPrice } = useProductContext()
  const [openItems, setOpenItems] = useState<string[]>([])

  if (!productData) return <RightSideSkeleton />

  const getPrice = (featureKey: keyof typeof selectedFeatures) => {
    const option = productData.features[featureKey]?.options.find(
      opt => opt.value === "yes"
    )
    return selectedFeatures[featureKey] === "yes" && option
      ? option.price
      : 0
  }


  const bathroomTotal =
    selectedFeatures.bathroom === "yes"
      ? getPrice("shower") + getPrice("sink") + getPrice("toilet")
      : 0

  const isBathroomOpen = openItems.includes("Bathroom")



  const items: ConfigurationItem[] = [
    {
      name: "Kitchen",
      price: getPrice("kitchen"),
      placeholderPrice: 6000,
      description:
        "Your custom kitchen delivers the full functionality of a traditional home. Built in appliances, tailored cabinetry, and smart storage maximize workflow and usability. The appliances include a refrigerator, two burner cooktop, and built in oven. Dual undermount sinks are set under heat resistant countertops designed for everyday durability.",
      detailsUrl: "/details?section=interior",
      boxColors: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-300",
    },

    {
      name: "Bathroom",
      price: bathroomTotal,
      placeholderPrice: 4000,
      description:
        "A fully functioning shower, a floating sink, and toilet are all arranged for comfort and usability in a compact footprint. A locking door provides privacy and there is still lots of room for storage.",
      detailsUrl: "/details?section=interior",
      boxColors: "bg-gradient-to-r from-purple-50 to-violet-50 border-purple-300"
    },
    {
      name: "Shower",
      price: getPrice("shower"),
      placeholderPrice: 2500,
      description:
        "Full sized 60’x30’ shower designed for compact comfort, complete with enclosure and fixtures.",
      detailsUrl: "/details?section=interior",
      isChild: true,
      parent: "Bathroom",
      boxColors: "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300"
    },
    {
      name: "Sink",
      price: getPrice("sink"),
      placeholderPrice: 750,
      description:
        "Floating sink with modern design, includes all hardware and plumbing connections.",
      detailsUrl: "/details?section=interior",
      isChild: true,
      parent: "Bathroom",
      boxColors: "bg-gradient-to-r from-purple-50 to-violet-50 border-purple-300"
    },
    {
      name: "Toilet",
      price: getPrice("toilet"),
      placeholderPrice: 750,
      description:
        "Space saving floating toilet, adaptable for use with a standard residential waste system or a disposable/portable setup.",
      detailsUrl: "/details?section=interior",
      isChild: true,
      parent: "Bathroom",
      boxColors: "bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-300"
    },
    {
      name: "Stairs",
      price: getPrice("stairs"),
      placeholderPrice: 3000,
      description:
        "Rooftop stairs provide safe and easy access to the full 8′×20′ rooftop. Crafted from solid wood for long term durability.",
      detailsUrl: "/details?section=exterior",
      boxColors: "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-300"
    },
    {
      name: "Roof Railing",
      price: getPrice("railing"),
      placeholderPrice: 1800,
      description:
        "Rooftop railing provides secure protection around the full rooftop and complements the stair design.",
      detailsUrl: "/details?section=exterior",
      boxColors: "bg-gradient-to-r from-lime-50 to-green-50 border-lime-300"
    },
    {
      name: "Air Conditioning",
      price: getPrice("airConditioner"),
      placeholderPrice: 3000,
      description:
        "Mini split air conditioning system delivering efficient cooling and heating year round.",
      detailsUrl: "/details?section=energy",
      boxColors: "bg-gradient-to-r from-sky-50 to-blue-50 border-sky-300"
    },
    {
      name: "Solar",
      price: getPrice("solarPanel"),
      placeholderPrice: 8900,
      description:
        "With a full roof solar array, inverter, and battery storage, your home generates and stores its own electricity—powering everyday living without reliance on external utilities.",
      detailsUrl: "/details?section=energy",
      boxColors: "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300 "
    },
    {
      name: "Gas",
      price: getPrice("naturalGas"),
      placeholderPrice: 1000,
      description:
        "If you’d like to have natural gas as an energy source, we’d be glad to install the piping that leads to the Kitchen.",
      detailsUrl: "/details?section=energy",
      boxColors: "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-300"
    },
  ]

  const basePrice = productData.basePrice || 21990

  const bathroomBreakdown = [
    { name: "Shower", price: getPrice("shower") },
    { name: "Sink", price: getPrice("sink") },
    { name: "Toilet", price: getPrice("toilet") },
  ]

  return (
    <div className="p-4 bg-white border rounded-lg h-full xl:h-screen overflow-y-auto">
      <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
        Your Configuration
      </h2>

      {/* Configuration List */}


      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
        className="space-y-3"
      >
        {items.map((item, index) => {
          // 🔒 Hide children if bathroom is closed
          if (item.isChild && !isBathroomOpen) return null

          return (
            <AccordionItem
              key={index}
              value={item.name}
              className={`rounded-lg 
                border 
                
                ${item.boxColors}
                shadow-md
                transition-all duration-200    last:mb-0 last:!border-b   ${item.isChild ? "ml-6" : ""
                } `}
            >
              <AccordionTrigger className="px-3 py-3 text-sm font-bold text-gray-800 hover:no-underline">
                <div className="flex w-full justify-between">
                  <span>
                    {item.isChild ? "— " : ""}
                    {item.name}
                  </span>
                  <span>${item.placeholderPrice.toLocaleString()}</span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-3 pb-3 text-xs text-gray-600">
                {item.description}
                <br />
                <Link
                  href={item.detailsUrl}
                  className="mt-2 inline-block text-xs font-semibold text-gray-600 hover:text-blue-800 underline"
                >
                  More Details…
                </Link>

              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>




      {/* Cost Summary */}
      <div className="mt-6 border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Base Home</span>
          <span className="font-semibold">
            ${basePrice.toLocaleString()}
          </span>
        </div>

        {items
          .filter(item => !item.isChild)
          .map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{item.name}</span>
                <span className="font-semibold">
                  +${item.price.toLocaleString()}
                </span>
              </div>

              {item.name === "Bathroom" &&
                bathroomBreakdown.map((sub, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-xs ml-4 text-gray-500"
                  >
                    <span>— {sub.name}</span>
                    <span>+${sub.price.toLocaleString()}</span>
                  </div>
                ))}
            </React.Fragment>
          ))}

        <div className="border-t pt-3 flex justify-between">
          <span className="font-bold text-gray-800">
            Total Estimate
          </span>
          <span className="font-bold text-lg">
            ${totalPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}
