import jsPDF from 'jspdf'

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

// Get first image from exterior and interior
const getFirstExteriorImage = (config: PDFGeneratorConfig) => {
    const { selectedFeatures, filteredExteriorEnergyData, filteredInteriorData } = config as any

    // Mirror MiddleSection: if energy/exterior features selected
    if (
        filteredExteriorEnergyData && (
            selectedFeatures.stairs !== undefined ||
            selectedFeatures.railing !== undefined ||
            selectedFeatures.airConditioner !== undefined ||
            selectedFeatures.solarPanel !== undefined
        )
    ) {
        if (selectedFeatures.kitchen === 'no') {
            if (filteredExteriorEnergyData.sections?.exterior_NoKitchen?.gallery?.length ?? 0) {
                return filteredExteriorEnergyData.sections.exterior_NoKitchen.gallery[0];
            }
        } else {
            if (filteredExteriorEnergyData.sections?.exterior?.gallery?.length ?? 0) {
                return filteredExteriorEnergyData.sections.exterior.gallery[0];
            }
        }
        if (filteredExteriorEnergyData.sections?.exteriorGallery?.images?.length ?? 0) {
            return filteredExteriorEnergyData.sections.exteriorGallery.images[0];
        }
    }

    // Otherwise, if interior features are selected, use interior data's exterior gallery
    const hasInteriorFeatures = selectedFeatures.kitchen === 'yes' ||
        selectedFeatures.bathroom === 'yes' ||
        selectedFeatures.shower === 'yes' ||
        selectedFeatures.sink === 'yes' ||
        selectedFeatures.toilet === 'yes' ||
        selectedFeatures.kitchen_wall === 'yes' ||
        (selectedFeatures.kitchen_position && selectedFeatures.kitchen_position !== '');

    if (hasInteriorFeatures && (filteredInteriorData?.sections?.exterior?.gallery?.length ?? 0)) {
        return filteredInteriorData.sections.exterior.gallery[0];
    }

    return null;
}

const getFirstInteriorImage = (config: PDFGeneratorConfig) => {
    const { selectedFeatures, filteredInteriorData } = config as any

    // Mirror MiddleSection: only when interior features selected; no defaults
    const hasInteriorFeatures = selectedFeatures.kitchen === 'yes' ||
        selectedFeatures.bathroom === 'yes' ||
        selectedFeatures.shower === 'yes' ||
        selectedFeatures.sink === 'yes' ||
        selectedFeatures.toilet === 'yes' ||
        selectedFeatures.kitchen_wall === 'yes' ||
        (selectedFeatures.kitchen_position && selectedFeatures.kitchen_position !== '');

    if (hasInteriorFeatures && (filteredInteriorData?.sections?.interior?.gallery?.length ?? 0)) {
        return filteredInteriorData.sections.interior.gallery[0];
    }

    return null;
}

// Generate configuration items
const getConfigurationItems = (config: PDFGeneratorConfig) => {
    const { productData, selectedFeatures, filteredExteriorEnergyData, filteredInteriorData  } = config
    if (!productData) return []

    const items: Array<{ name: string; price: number }> = []

    // Add kitchen if selected
    if (selectedFeatures.kitchen === 'yes') {
        const kitchenOption = productData.features.kitchen?.options.find((opt: any) => opt.value === 'yes')
        if (kitchenOption) {
            items.push({ name: 'Kitchen', price: kitchenOption.price })
        }
    }

    // Add kitchen position if selected
    if (selectedFeatures.kitchen_position) {
        const positionOption = productData.features.kitchen_position?.options.find((opt: any) => opt.value === selectedFeatures.kitchen_position)
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

    // Add bathroom if selected
    if (selectedFeatures.bathroom === 'yes') {
        const bathroomOption = productData.features.bathroom?.options.find((opt: any) => opt.value === 'yes')
        if (bathroomOption) {
            items.push({ name: 'Full Bathroom', price: bathroomOption.price })
        }
    }

    // Add shower if selected
    if (selectedFeatures.shower === 'yes') {
        const showerOption = productData.features.shower?.options.find((opt: any) => opt.value === 'yes')
        if (showerOption) {
            items.push({ name: 'Shower', price: showerOption.price })
        }
    }

    // Add sink if selected
    if (selectedFeatures.sink === 'yes') {
        const sinkOption = productData.features.sink?.options.find((opt: any) => opt.value === 'yes')
        if (sinkOption) {
            items.push({ name: 'Sink', price: sinkOption.price })
        }
    }

    // Add toilet if selected
    if (selectedFeatures.toilet === 'yes') {
        const toiletOption = productData.features.toilet?.options.find((opt: any) => opt.value === 'yes')
        if (toiletOption) {
            items.push({ name: 'Toilet', price: toiletOption.price })
        }
    }

    // Add kitchen wall if selected
    if (selectedFeatures.kitchen_wall === 'yes') {
        const wallOption = productData.features.kitchen_wall?.options.find((opt: any) => opt.value === 'yes')
        if (wallOption) {
            items.push({ name: 'Kitchen Wall', price: wallOption.price })
        }
    }

    // Add slider door if selected
    if (selectedFeatures.slider_door === 'yes') {
        const sliderOption = productData.features.slider_door?.options.find((opt: any) => opt.value === 'yes')
        if (sliderOption) {
            items.push({ name: 'Slider Door', price: sliderOption.price })
        }
    }

    // Add french door if selected
    if (selectedFeatures.french_door === 'yes') {
        const frenchOption = productData.features.french_door?.options.find((opt: any) => opt.value === 'yes')
        if (frenchOption) {
            items.push({ name: 'French Door', price: frenchOption.price })
        }
    }

    // Add stairs if selected
    if (selectedFeatures.stairs === 'yes') {
        const stairsOption = productData.features.stairs?.options.find((opt: any) => opt.value === 'yes')
        if (stairsOption) {
            items.push({ name: 'Stairs', price: stairsOption.price })
        }
    }

    // Add roof top if selected
    if (selectedFeatures.roofTop === 'yes') {
        const roofOption = productData.features.roofTop?.options.find((opt: any) => opt.value === 'yes')
        if (roofOption) {
            items.push({ name: 'Roof Top', price: roofOption.price })
        }
    }

    // Add air conditioner if selected
    if (selectedFeatures.airConditioner === 'yes') {
        const acOption = productData.features.airConditioner?.options.find((opt: any) => opt.value === 'yes')
        if (acOption) {
            items.push({ name: 'Air Conditioner', price: acOption.price })
        }
    }

    // Add natural gas if selected
    if (selectedFeatures.naturalGas === 'yes') {
        const gasOption = productData.features.naturalGas?.options.find((opt: any) => opt.value === 'yes')
        if (gasOption) {
            items.push({ name: 'Natural Gas', price: gasOption.price })
        }
    }

    // Add solar panel if selected
    if (selectedFeatures.solarPanel === 'yes') {
        const solarOption = productData.features.solarPanel?.options.find((opt: any) => opt.value === 'yes')
        if (solarOption) {
            items.push({ name: 'Solar Panel', price: solarOption.price })
        }
    }

    return items
}

// Main PDF generator function
export const generateCustomizedHomePDF = async (
    config: PDFGeneratorConfig,
    options: PDFGeneratorOptions = {}
): Promise<Blob> => {
    const { shouldCompress = false, shouldDownload = false, fileName = 'customized-home-configuration.pdf' } = options
    const { totalPrice, productData } = config

    try {
        // Create PDF with better layout
        const pdf = new jsPDF('p', 'mm', 'a4')
        
        // Set compression for smaller file size
        pdf.setProperties({
            title: 'Customized Home Configuration',
            subject: 'Freepoint Homes Configuration',
            author: 'Freepoint Homes',
            creator: 'Freepoint Homes'
        })

        // Page dimensions
        const pageWidth = 210
        const pageHeight = 297
        const margin = 20
        const contentWidth = pageWidth - (2 * margin)

        // Colors
        const primaryColor = [194, 164, 92] // #C2A45C
        const darkColor = [51, 51, 51] // #333
        const lightGray = [248, 248, 248] // #F8F8F8
        const mediumGray = [102, 102, 102] // #666

        let yPosition = margin

        // Header with logo area - very small height
        pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
        pdf.rect(0, 0, pageWidth, 25, 'F')

        // Company name in header - better positioning
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(20)
        pdf.setTextColor(255, 255, 255)
        pdf.text('Freepoint Homes', pageWidth / 2, 16, { align: 'center' })

        yPosition = 35

        // Title
        pdf.setFontSize(20)
        pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2])
        pdf.text('Customized Home Configuration', pageWidth / 2, yPosition, { align: 'center' })
        yPosition += 12

        // Date and reference
        pdf.setFontSize(10)
        pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2])
        pdf.text(`Generated: ${new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}`, pageWidth / 2, yPosition, { align: 'center' })
        yPosition += 15

        // Images Section with better layout
        const exteriorImage = getFirstExteriorImage(config)
        const interiorImage = getFirstInteriorImage(config)
        
        if (exteriorImage || interiorImage) {
            // Section title
            pdf.setFontSize(16)
            pdf.setFont('helvetica', 'bold')
            pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2])
            pdf.text('Design Preview', margin, yPosition)
            yPosition += 8

            // Draw section line
            pdf.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
            pdf.setLineWidth(0.5)
            pdf.line(margin, yPosition, pageWidth - margin, yPosition)
            yPosition += 12

            const imageWidth = shouldCompress ? 60 : 70
            const imageHeight = shouldCompress ? 40 : 50
            const imageSpacing = 20

            // Calculate positions for centered images
            const totalImagesWidth = (exteriorImage && interiorImage) ? (imageWidth * 2 + imageSpacing) : imageWidth
            const startX = (pageWidth - totalImagesWidth) / 2

            // Exterior Image
            if (exteriorImage) {
                try {
                    const exteriorImg = new Image()
                    exteriorImg.crossOrigin = 'anonymous'
                    exteriorImg.src = exteriorImage

                    await new Promise((resolve, reject) => {
                        exteriorImg.onload = resolve
                        exteriorImg.onerror = reject
                        setTimeout(reject, 5000)
                    })

                    pdf.addImage(exteriorImg, 'JPEG', startX, yPosition, imageWidth, imageHeight, undefined, 'FAST')

                    // Image label
                    pdf.setFontSize(10)
                    pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2])
                    pdf.text('Exterior Design', startX + (imageWidth / 2), yPosition + imageHeight + 8, { align: 'center' })
                } catch (error) {
                    // Fallback rectangle
                    pdf.setFillColor(lightGray[0], lightGray[1], lightGray[2])
                    pdf.rect(startX, yPosition, imageWidth, imageHeight, 'F')
                    pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2])
                    pdf.setFontSize(8)
                    pdf.text('Exterior Image', startX + (imageWidth / 2), yPosition + (imageHeight / 2), { align: 'center' })
                    pdf.text('Not Available', startX + (imageWidth / 2), yPosition + (imageHeight / 2) + 5, { align: 'center' })
                }
            }

            // Interior Image
            if (interiorImage) {
                const interiorX = exteriorImage ? startX + imageWidth + imageSpacing : startX

                try {
                    const interiorImg = new Image()
                    interiorImg.crossOrigin = 'anonymous'
                    interiorImg.src = interiorImage

                    await new Promise((resolve, reject) => {
                        interiorImg.onload = resolve
                        interiorImg.onerror = reject
                        setTimeout(reject, 5000)
                    })

                    pdf.addImage(interiorImg, 'JPEG', interiorX, yPosition, imageWidth, imageHeight, undefined, 'FAST')

                    // Image label
                    pdf.setFontSize(10)
                    pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2])
                    pdf.text('Interior Design', interiorX + (imageWidth / 2), yPosition + imageHeight + 8, { align: 'center' })
                } catch (error) {
                    // Fallback rectangle
                    pdf.setFillColor(lightGray[0], lightGray[1], lightGray[2])
                    pdf.rect(interiorX, yPosition, imageWidth, imageHeight, 'F')
                    pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2])
                    pdf.setFontSize(8)
                    pdf.text('Interior Image', interiorX + (imageWidth / 2), yPosition + (imageHeight / 2), { align: 'center' })
                    pdf.text('Not Available', interiorX + (imageWidth / 2), yPosition + (imageHeight / 2) + 5, { align: 'center' })
                }
            }

            yPosition += imageHeight + 18
        }

        // Configuration Section
        pdf.setFontSize(16)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2])
        pdf.text('Your Configuration', margin, yPosition)
        yPosition += 8

        // Draw section line
        pdf.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
        pdf.setLineWidth(0.5)
        pdf.line(margin, yPosition, pageWidth - margin, yPosition)
        yPosition += 12

        const configurationItems = getConfigurationItems(config)
        const basePrice = productData?.basePrice || 120000

        const summaryStartY = yPosition
        const summaryHeight = 25 + (configurationItems.length * 6) + 12

        // Summary background
        pdf.setFillColor(lightGray[0], lightGray[1], lightGray[2])
        pdf.rect(margin, summaryStartY, contentWidth, summaryHeight, 'F')

        // Base price
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2])
        pdf.text('Base Home:', margin + 10, summaryStartY + 12)
        pdf.text(`$${basePrice.toLocaleString()}`, pageWidth - margin - 10, summaryStartY + 12, { align: 'right' })

        // Selected features in summary
        configurationItems.forEach((item, index) => {
            pdf.setFontSize(10)
            pdf.setFont('helvetica', 'normal')
            pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2])
            pdf.text(`${item.name}:`, margin + 10, summaryStartY + 20 + (index * 6))
            pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2])
            pdf.text(`+$${item.price.toLocaleString()}`, pageWidth - margin - 10, summaryStartY + 20 + (index * 6), { align: 'right' })
        })

        const totalY = summaryStartY + summaryHeight - 12

        pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
        pdf.rect(margin, totalY, contentWidth, 12, 'F')

        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(255, 255, 255)
        pdf.text('Total Estimate:', margin + 10, totalY + 8)
        pdf.text(`$${totalPrice.toLocaleString()}`, pageWidth - margin - 10, totalY + 8, { align: 'right' })

        yPosition = totalY + 18

        // Footer - ensure it's always at the bottom
        const footerY = pageHeight - 20
        pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
        pdf.rect(0, footerY, pageWidth, 20, 'F')

        pdf.setFontSize(9)
        pdf.setTextColor(255, 255, 255)
        pdf.text('Thank you for choosing Freepoint Homes', pageWidth / 2, footerY + 8, { align: 'center' })
        pdf.text('contact@freepointhomes.com | www.freepointhomes.com', pageWidth / 2, footerY + 15, { align: 'center' })

        // Convert PDF to blob
        const pdfBlob = pdf.output('blob')
        
        // If compression is needed and PDF is still too large, create minimal version
        if (shouldCompress && pdfBlob.size > 50000) {

            
            // Create a new PDF with minimal content
            const compressedPdf = new jsPDF('p', 'mm', 'a4')
            
            // Add only essential information
            compressedPdf.setFont('helvetica', 'bold')
            compressedPdf.setFontSize(16)
            compressedPdf.text('Customized Home Configuration', 20, 30)
            
            compressedPdf.setFontSize(12)
            compressedPdf.text(`Total Price: $${totalPrice.toLocaleString()}`, 20, 50)
            
            // Add selected features as text only
            let yPos = 70
            configurationItems.forEach((item, index) => {
                if (yPos < 250) { // Prevent overflow
                    compressedPdf.text(`${item.name}: +$${item.price.toLocaleString()}`, 20, yPos)
                    yPos += 10
                }
            })
            
            const compressedBlob = compressedPdf.output('blob')
    
            
            if (shouldDownload) {
                compressedPdf.save(fileName)
            }
            
            return compressedBlob
        }
        
        if (shouldDownload) {
            pdf.save(fileName)
        }
        
        return pdfBlob

    } catch (error) {
        console.error('Error generating PDF:', error)
        throw error
    }
} 