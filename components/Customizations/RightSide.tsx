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
  isChild?: boolean
  parent?: string
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
      description:
        "Your custom kitchen delivers the full functionality of a traditional home. Built in appliances, tailored cabinetry, and smart storage maximize workflow and usability. The appliances include a refrigerator, two burner cooktop, and built in oven. Dual undermount sinks are set under heat resistant countertops designed for everyday durability.",
      detailsUrl: "/details?section=interior"
    },

    {
      name: "Bathroom",
      price: bathroomTotal,
      description:
        "A fully functioning shower, a floating sink, and toilet are all arranged for comfort and usability in a compact footprint. A locking door provides privacy and there is still lots of room for storage.",
      detailsUrl: "/details?section=interior"
    },
    {
      name: "Shower",
      price: getPrice("shower"),
      description:
        "Full sized 60’x30’ shower designed for compact comfort, complete with enclosure and fixtures.",
      detailsUrl: "/details?section=interior",
      isChild: true,
      parent: "Bathroom",
    },
    {
      name: "Sink",
      price: getPrice("sink"),
      description:
        "Floating sink with modern design, includes all hardware and plumbing connections.",
      detailsUrl: "/details?section=interior",
      isChild: true,
      parent: "Bathroom",
    },
    {
      name: "Toilet",
      price: getPrice("toilet"),
      description:
        "Space saving floating toilet, adaptable for use with a standard residential waste system or a disposable/portable setup.",
      detailsUrl: "/details?section=interior",
      isChild: true,
      parent: "Bathroom",
    },
    {
      name: "Air Conditioning",
      price: getPrice("airConditioner"),
      description:
        "Mini split air conditioning system delivering efficient cooling and heating year round.",
      detailsUrl: "/details?section=energy",
    },
    {
      name: "Stairs",
      price: getPrice("stairs"),
      description:
        "Rooftop stairs provide safe and easy access to the full 8′×20′ rooftop. Crafted from solid wood for long term durability.",
      detailsUrl: "/details?section=exterior",
    },
    {
      name: "Roof Railing",
      price: getPrice("railing"),
      description:
        "Rooftop railing provides secure protection around the full rooftop and complements the stair design.",
      detailsUrl: "/details?section=exterior",
    },
    {
      name: "Solar",
      price: getPrice("solarPanel"),
      description:
        "With a full roof solar array, inverter, and battery storage, your home generates and stores its own electricity—powering everyday living without reliance on external utilities.",
      detailsUrl: "/details?section=energy",
    },
    {
      name: "Gas",
      price: getPrice("naturalGas"),
      description:
        "If you’d like to have natural gas as an energy source, we’d be glad to install the piping that leads to the Kitchen.",
      detailsUrl: "/details?section=energy",
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
              className={`rounded-lg border ${item.isChild ? "ml-6" : ""
                } bg-gray-100`}
            >
              <AccordionTrigger className="px-3 py-3 text-sm font-semibold text-gray-800 hover:no-underline">
                <div className="flex w-full justify-between">
                  <span>
                    {item.isChild ? "— " : ""}
                    {item.name}
                  </span>
                  <span>${item.price.toLocaleString()}</span>
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
