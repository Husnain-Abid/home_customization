import jsPDF from "jspdf"
import { getPriceSummary } from "@/lib/price-summary"

export interface PDFGeneratorConfig {
  productData: any
  selectedFeatures: any
  filteredInteriorData: any
  filteredExteriorEnergyData: any
  totalPrice: number
}

export interface PDFGeneratorOptions {
  shouldCompress?: boolean
  shouldDownload?: boolean
  fileName?: string
}

/* ------------------------------------------------
   IMAGE HELPERS
------------------------------------------------- */
const getFirstExteriorImage = (config: PDFGeneratorConfig) => {
  const { selectedFeatures, filteredExteriorEnergyData, filteredInteriorData } =
    config as any

  if (
    filteredExteriorEnergyData &&
    (selectedFeatures.stairs !== undefined ||
      selectedFeatures.railing !== undefined ||
      selectedFeatures.airConditioner !== undefined ||
      selectedFeatures.solarPanel !== undefined)
  ) {
    if (
      selectedFeatures.kitchen === "no" &&
      filteredExteriorEnergyData.sections?.exterior_NoKitchen?.gallery?.length
    ) {
      return filteredExteriorEnergyData.sections.exterior_NoKitchen.gallery[0]
    }

    if (filteredExteriorEnergyData.sections?.exterior?.gallery?.length) {
      return filteredExteriorEnergyData.sections.exterior.gallery[0]
    }
  }

  if (filteredInteriorData?.sections?.exterior?.gallery?.length) {
    return filteredInteriorData.sections.exterior.gallery[0]
  }

  return null
}

const getFirstInteriorImage = (config: PDFGeneratorConfig) => {
  const { filteredInteriorData } = config as any
  return filteredInteriorData?.sections?.interior?.gallery?.[0] || null
}

/* ------------------------------------------------
   MAIN PDF GENERATOR
------------------------------------------------- */
export const generateCustomizedHomePDF = async (
  config: PDFGeneratorConfig,
  options: PDFGeneratorOptions = {}
): Promise<Blob> => {
  const {
    shouldCompress = false,
    shouldDownload = false,
    fileName = "customized-home-configuration.pdf",
  } = options

  const { productData, selectedFeatures, totalPrice } = config

  try {
    /* ---------- PRICE SUMMARY (SAME AS UI) ---------- */
    const { basePrice, items, bathroomBreakdown } =
      getPriceSummary(productData, selectedFeatures)

    /* ---------- PDF SETUP ---------- */
    const pdf = new jsPDF("p", "mm", "a4")

    const pageWidth = 210
    const pageHeight = 297
    const margin = 20
    const contentWidth = pageWidth - margin * 2

    const primaryColor = [194, 164, 92]
    const darkColor = [51, 51, 51]
    const grayColor = [120, 120, 120]
    const lightGray = [248, 248, 248]

    let y = margin

    /* ---------- HEADER ---------- */
    pdf.setFillColor(...primaryColor)
    pdf.rect(0, 0, pageWidth, 25, "F")

    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(20)
    pdf.setTextColor(255, 255, 255)
    pdf.text("Freepoint Homes", pageWidth / 2, 16, { align: "center" })

    y = 38

    /* ---------- TITLE ---------- */
    pdf.setFontSize(18)
    pdf.setTextColor(...darkColor)
    pdf.text("Customized Home Configuration", pageWidth / 2, y, {
      align: "center",
    })
    y += 14

    pdf.setFontSize(10)
    pdf.setTextColor(...grayColor)
    pdf.text(
      `Generated: ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      y,
      { align: "center" }
    )
    y += 18

    /* ---------- IMAGES ---------- */
    const exteriorImage = getFirstExteriorImage(config)
    const interiorImage = getFirstInteriorImage(config)

    if (exteriorImage || interiorImage) {
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(14)
      pdf.setTextColor(...darkColor)
      pdf.text("Design Preview", margin, y)
      y += 8

      pdf.setDrawColor(...primaryColor)
      pdf.line(margin, y, pageWidth - margin, y)
      y += 10

      const imgW = 70
      const imgH = 45
      const gap = 15
      const totalW =
        exteriorImage && interiorImage ? imgW * 2 + gap : imgW
      const startX = (pageWidth - totalW) / 2

      const drawImage = async (src: string, x: number, label: string) => {
        try {
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.src = src

          await new Promise((res, rej) => {
            img.onload = res
            img.onerror = rej
          })

          pdf.addImage(img, "JPEG", x, y, imgW, imgH)
          pdf.setFontSize(9)
          pdf.text(label, x + imgW / 2, y + imgH + 6, { align: "center" })
        } catch {
          pdf.setFillColor(...lightGray)
          pdf.rect(x, y, imgW, imgH, "F")
        }
      }

      if (exteriorImage)
        await drawImage(exteriorImage, startX, "Exterior Design")

      if (interiorImage)
        await drawImage(
          interiorImage,
          exteriorImage ? startX + imgW + gap : startX,
          "Interior Design"
        )

      y += imgH + 20
    }

    /* ---------- PRICE SUMMARY ---------- */
    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(14)
    pdf.setTextColor(...darkColor)
    pdf.text("Your Configuration", margin, y)
    y += 8

    pdf.line(margin, y, pageWidth - margin, y)
    y += 10

    const bathroomExtra =
      items.some(i => i.name === "Bathroom")
        ? bathroomBreakdown.length * 5
        : 0

    const summaryHeight = 30 + items.length * 6 + bathroomExtra + 12

    pdf.setFillColor(...lightGray)
    pdf.rect(margin, y, contentWidth, summaryHeight, "F")

    /* Base */
    pdf.setFontSize(12)
    pdf.text("Base Home", margin + 10, y + 12)
    pdf.text(
      `$${basePrice.toLocaleString()}`,
      pageWidth - margin - 10,
      y + 12,
      { align: "right" }
    )

    let rowY = y + 20

    items.forEach(item => {
      pdf.setFontSize(10)
      pdf.setFont("helvetica", "normal")
      pdf.setTextColor(...darkColor)

      pdf.text(item.name, margin + 10, rowY)
      pdf.text(
        `+$${item.price.toLocaleString()}`,
        pageWidth - margin - 10,
        rowY,
        { align: "right" }
      )

      if (item.name === "Bathroom") {
        bathroomBreakdown.forEach(sub => {
          rowY += 5
          pdf.setFontSize(9)
          pdf.setTextColor(...grayColor)
          pdf.text(`— ${sub.name}`, margin + 16, rowY)
          pdf.text(
            `+$${sub.price.toLocaleString()}`,
            pageWidth - margin - 10,
            rowY,
            { align: "right" }
          )
        })
      }

      rowY += 6
    })

    /* TOTAL */
    const totalY = y + summaryHeight - 12
    pdf.setFillColor(...primaryColor)
    pdf.rect(margin, totalY, contentWidth, 12, "F")

    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(12)
    pdf.setTextColor(255, 255, 255)
    pdf.text("Total Estimate", margin + 10, totalY + 8)
    pdf.text(
      `$${totalPrice.toLocaleString()}`,
      pageWidth - margin - 10,
      totalY + 8,
      { align: "right" }
    )

    /* ---------- FOOTER ---------- */
    const footerY = pageHeight - 18
    pdf.setFillColor(...primaryColor)
    pdf.rect(0, footerY, pageWidth, 18, "F")

    pdf.setFontSize(9)
    pdf.setTextColor(255, 255, 255)
    pdf.text(
      "Thank you for choosing Freepoint Homes",
      pageWidth / 2,
      footerY + 7,
      { align: "center" }
    )
    pdf.text(
      "contact@freepointhomes.com",
      pageWidth / 2,
      footerY + 13,
      { align: "center" }
    )

    const blob = pdf.output("blob")
    if (shouldDownload) pdf.save(fileName)

    return blob
  } catch (err) {
    console.error("PDF generation failed:", err)
    throw err
  }
}
