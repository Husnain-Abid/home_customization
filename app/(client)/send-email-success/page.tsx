"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle, Home, Download } from "lucide-react"
import { useProductContext } from "@/contexts/ProductContext"
import { generateCustomizedHomePDF } from "@/lib/pdf-generator"
import toast from "react-hot-toast"
import Image from "next/image"

export default function SendEmailSuccess() {
  const router = useRouter()
  const [isDownloading, setIsDownloading] = useState(false)

  const {
    productData,
    selectedFeatures,
    filteredInteriorData,
    filteredExteriorEnergyData,
    totalPrice,
      finalInteriorImages,
  finalExteriorImages
  } = useProductContext()

  /* ---------------------------------------------
     Redirect safety
  --------------------------------------------- */
  useEffect(() => {
    if (!productData) {
      router.push("/customizations")
    }
  }, [productData, router])

  /* ---------------------------------------------
     Helpers (SAME AS RightSide)
  --------------------------------------------- */
  const getPrice = (featureKey: keyof typeof selectedFeatures) => {
    const option = productData?.features[featureKey]?.options.find(
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

  const basePrice = productData?.basePrice || 21990

  /* ---------------------------------------------
     Items (SAME PATTERN AS RightSide)
  --------------------------------------------- */
  const items = [
    { name: "Kitchen", price: getPrice("kitchen") },
    { name: "Bathroom", price: bathroomTotal },
    { name: "Air Conditioning", price: getPrice("airConditioner") },
    { name: "Stairs", price: getPrice("stairs") },
    { name: "Roof Railing", price: getPrice("railing") },
    { name: "Solar", price: getPrice("solarPanel") },
    { name: "Gas", price: getPrice("naturalGas") },
  ]

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

  /* ---------------------------------------------
     PDF Download
  --------------------------------------------- */
  const handlePDFDownload = async () => {
    try {
      setIsDownloading(true)
      await new Promise(res => setTimeout(res, 1200))

      await generateCustomizedHomePDF(
        {
          productData,
          selectedFeatures,
          filteredInteriorData,
          filteredExteriorEnergyData,
          totalPrice,
            finalInteriorImages,
  finalExteriorImages
        },
        {
          shouldDownload: true,
          fileName: "customized-home-configuration.pdf",
        }
      )

      toast.success("PDF downloaded successfully!")
    } catch (error) {
      console.error(error)
      toast.error("PDF download failed")
    } finally {
      setIsDownloading(false)
    }
  }

  /* ---------------------------------------------
     Images (same logic as before)
  --------------------------------------------- */
  // const exteriorImage =
  //   filteredExteriorEnergyData?.sections?.exterior?.gallery?.[0] || null
  // const interiorImage =
  //   filteredInteriorData?.sections?.interior?.gallery?.[0] || null

const exteriorImage = finalExteriorImages?.[0] || null
const interiorImage = finalInteriorImages?.[0] || null


  /* ---------------------------------------------
     UI
  --------------------------------------------- */
  return (
    <div className="max-w-7xl w-full mx-auto px-4 py-8">
      {/* Success Header */}
      <div className="text-center mb-10">
        <div className="mx-auto w-36 h-36 bg-[#C2A45C]/20 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-20 h-20 text-[#C2A45C]" />
        </div>
        <h2 className="text-3xl font-semibold text-gray-700">
          Your Custom Home Has Been Submitted
        </h2>
        <p className="text-gray-600 mt-2">
          We’ll be in touch shortly. You can email us anytime at{" "}
          <span className="text-[#C2A45C]">
            contact@freepointhomes.com
          </span>
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white border rounded-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Exterior Design</h4>
              {exteriorImage ? (
                <Image
                  src={exteriorImage}
                  alt="Exterior"
                  width={1000}
                  height={1000}
                  className="rounded-lg"
                />
              ) : (
                <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  No Image
                </div>
              )}
            </div>

            <div>
              <h4 className="font-semibold mb-2">Interior Design</h4>
              {interiorImage ? (
                <Image
                  src={interiorImage}
                  alt="Interior"
                  width={1000}
                  height={1000}
                  className="rounded-lg"
                />
              ) : (
                <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  No Image
                </div>
              )}
            </div>

            <button
              onClick={handlePDFDownload}
              disabled={isDownloading}
              className="bg-[#C2A45C] text-white px-6 py-3 rounded-md flex items-center gap-2 hover:bg-[#C2A45C]/80"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? "Preparing..." : "Download PDF"}
            </button>
          </div>

          {/* PRICE SUMMARY (RIGHTSIDE STYLE) */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              Your Configuration
            </h4>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              {/* Base */}
              <div className="flex justify-between text-sm">
                <span>Base Home</span>
                <span className="font-semibold">
                  ${basePrice.toLocaleString()}
                </span>
              </div>

              {/* Items */}
              {items.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex justify-between text-sm">
                    <span>{item.name}</span>
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
                        <span>
                          +${sub.price.toLocaleString()}
                        </span>
                      </div>
                    ))}
                </React.Fragment>
              ))}

              {/* Total */}
              <div className="border-t pt-3 flex justify-between">
                <span className="font-bold">Total Estimate</span>
                <span className="font-bold text-lg text-[#C2A45C]">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 justify-center mt-8">
        <Link href="/">
          <button className="bg-[#C2A45C] text-white px-6 py-3 rounded-md flex items-center gap-2">
            <Home className="w-4 h-4" />
            Back to Home
          </button>
        </Link>

        <Link href="/customizations">
          <button className="border border-[#C2A45C] text-[#C2A45C] px-6 py-3 rounded-md">
            Continue Customizing
          </button>
        </Link>
      </div>
    </div>
  )
}
