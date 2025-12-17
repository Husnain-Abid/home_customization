"use client"

import React, { useState } from "react"
import { useProductContext } from "../../contexts/ProductContext"
import RightSideSkeleton from "./RightSideSkeleton"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ConfigurationItem {
  name: string
  price: number
  description: string
  isChild?: boolean
}

export default function RightSide() {
  const { productData, selectedFeatures, totalPrice } = useProductContext()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  if (!productData) return <RightSideSkeleton />

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const getPrice = (featureKey: keyof typeof selectedFeatures) => {
    const option = productData.features[featureKey]?.options.find(
      opt => opt.value === "yes"
    )
    return selectedFeatures[featureKey] === "yes" && option
      ? option.price
      : 0
  }

  const bathroomTotal =
    (selectedFeatures.bathroom === "yes"
      ? getPrice("shower") + getPrice("sink") + getPrice("toilet")
      : 0)

  const items: ConfigurationItem[] = [
    {
      name: "Kitchen",
      price: getPrice("kitchen"),
      description:
        "Your custom kitchen delivers the full functionality of a traditional home. Built in appliances, tailored cabinetry, and smart storage maximize workflow and usability. The appliances include a refrigerator, two burner cooktop, and built in oven. Dual undermount sinks are set under heat resistant countertops designed for everyday durability.",
    },
    {
      name: "Bathroom",
      price: bathroomTotal,
      description:
        "A fully functioning shower, a floating sink, and toilet are all arranged for comfort and usability in a compact footprint. A locking door provides privacy and there is still lots of room for storage.",
    },
    {
      name: "Shower",
      price: selectedFeatures.bathroom === "yes" ? getPrice("shower") : 0,
      description:
        "Full sized 60’x30’ shower designed for compact comfort, complete with enclosure and fixtures.",
      isChild: true,
    },
    {
      name: "Sink",
      price: selectedFeatures.bathroom === "yes" ? getPrice("sink") : 0,
      description:
        "Floating sink with modern design, includes all hardware and plumbing connections.",
      isChild: true,
    },
    {
      name: "Toilet",
      price: selectedFeatures.bathroom === "yes" ? getPrice("toilet") : 0,
      description:
        "Space saving floating toilet, adaptable for use with a standard residential waste system or a disposable/portable setup.",
      isChild: true,
    },
    {
      name: "Kitchen Wall",
      price: getPrice("kitchen_wall"),
      description:
        "",
    },

    {
      name: "Gas",
      price: getPrice("naturalGas"),
      description:
        "If you’d like to have natural gas as an energy source, we’d be glad to install the piping that leads to the Kitchen.",
    },
    {
      name: "Solar",
      price: getPrice("solarPanel"),
      description:
        "With a full roof solar array, inverter, and battery storage, your home generates and stores its own electricity—powering everyday living without reliance on external utilities.",
    },
    {
      name: "Stairs",
      price: getPrice("stairs"),
      description:
        "Rooftop stairs provide safe and easy access to the full 8′×20′ rooftop. Crafted from solid wood for long term durability.",
    },
    {
      name: "Roof Railing",
      price: getPrice("railing"),
      description:
        "Rooftop railing provides secure protection around the full rooftop and complements the stair design.",
    },
    {
      name: "Air Conditioning",
      price: getPrice("airConditioner"),
      description:
        "Mini split air conditioning system delivering efficient cooling and heating year round.",
    },
  ]

  const basePrice = productData.basePrice || 21990

  const bathroomBreakdown = [
    {
      name: "Shower",
      price:
        selectedFeatures.bathroom === "yes" &&
          selectedFeatures.shower === "yes"
          ? getPrice("shower")
          : 0,
    },
    {
      name: "Sink",
      price:
        selectedFeatures.bathroom === "yes" &&
          selectedFeatures.sink === "yes"
          ? getPrice("sink")
          : 0,
    },
    {
      name: "Toilet",
      price:
        selectedFeatures.bathroom === "yes" &&
          selectedFeatures.toilet === "yes"
          ? getPrice("toilet")
          : 0,
    },
  ]

  return (
    <div className="p-4 bg-white border rounded-lg h-full xl:h-screen overflow-y-auto">
      <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
        Your Configuration
      </h2>

      <div className="space-y-4">
        {items.map((item, index) => {
          const isOpen = openSections[item.name]
          const isZero = item.price === 0

          return (
            <div
              key={index}
              className={`border rounded-lg ${item.isChild ? "ml-6" : ""
                } ${isZero ? "bg-gray-50 opacity-60" : "bg-gray-100"}`}
            >
              <button
                onClick={() => toggleSection(item.name)}
                className="w-full flex justify-between items-center p-3"
              >
                <div>
                  <h3 className="font-semibold text-sm text-gray-800">
                    {item.isChild ? "— " : ""}
                    {item.name}
                  </h3>
                  <span className="text-xs text-gray-600">
                    ${item.price.toLocaleString()}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {isOpen && (
                <div className="px-3 pb-3 text-xs text-gray-600 leading-relaxed">
                  {item.description}
                </div>
              )}
            </div>
          )
        })}
      </div>





      {/* Cost Summary */}
      <div className="mt-6 border-t pt-4 space-y-2">
        {/* Base Price */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Base Home</span>
          <span className="font-semibold">
            ${basePrice.toLocaleString()}
          </span>
        </div>

        {/* Main Items */}
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

              {/* Bathroom Breakdown */}
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

        {/* Total */}
        <div className="border-t pt-3 flex justify-between">
          <span className="font-bold text-gray-800">Total Estimate</span>
          <span className="font-bold text-lg">
            ${totalPrice.toLocaleString()}
          </span>
        </div>
      </div>


    </div>
  )
}