(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/lib/pdf-generator.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "generateCustomizedHomePDF": ()=>generateCustomizedHomePDF
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript)");
;
// Get first image from exterior and interior
const getFirstExteriorImage = (config)=>{
    var _filteredInteriorData_sections_exterior_gallery, _filteredInteriorData_sections_exterior, _filteredInteriorData_sections;
    const { selectedFeatures, filteredExteriorEnergyData, filteredInteriorData } = config;
    // Mirror MiddleSection: if energy/exterior features selected
    if (filteredExteriorEnergyData && (selectedFeatures.stairs !== undefined || selectedFeatures.railing !== undefined || selectedFeatures.airConditioner !== undefined || selectedFeatures.solarPanel !== undefined)) {
        var _filteredExteriorEnergyData_sections_exteriorGallery_images, _filteredExteriorEnergyData_sections_exteriorGallery, _filteredExteriorEnergyData_sections;
        if (selectedFeatures.kitchen === 'no') {
            var _filteredExteriorEnergyData_sections_exterior_NoKitchen_gallery, _filteredExteriorEnergyData_sections_exterior_NoKitchen, _filteredExteriorEnergyData_sections1;
            var _filteredExteriorEnergyData_sections_exterior_NoKitchen_gallery_length;
            if ((_filteredExteriorEnergyData_sections_exterior_NoKitchen_gallery_length = (_filteredExteriorEnergyData_sections1 = filteredExteriorEnergyData.sections) === null || _filteredExteriorEnergyData_sections1 === void 0 ? void 0 : (_filteredExteriorEnergyData_sections_exterior_NoKitchen = _filteredExteriorEnergyData_sections1.exterior_NoKitchen) === null || _filteredExteriorEnergyData_sections_exterior_NoKitchen === void 0 ? void 0 : (_filteredExteriorEnergyData_sections_exterior_NoKitchen_gallery = _filteredExteriorEnergyData_sections_exterior_NoKitchen.gallery) === null || _filteredExteriorEnergyData_sections_exterior_NoKitchen_gallery === void 0 ? void 0 : _filteredExteriorEnergyData_sections_exterior_NoKitchen_gallery.length) !== null && _filteredExteriorEnergyData_sections_exterior_NoKitchen_gallery_length !== void 0 ? _filteredExteriorEnergyData_sections_exterior_NoKitchen_gallery_length : 0) {
                return filteredExteriorEnergyData.sections.exterior_NoKitchen.gallery[0];
            }
        } else {
            var _filteredExteriorEnergyData_sections_exterior_gallery, _filteredExteriorEnergyData_sections_exterior, _filteredExteriorEnergyData_sections2;
            var _filteredExteriorEnergyData_sections_exterior_gallery_length;
            if ((_filteredExteriorEnergyData_sections_exterior_gallery_length = (_filteredExteriorEnergyData_sections2 = filteredExteriorEnergyData.sections) === null || _filteredExteriorEnergyData_sections2 === void 0 ? void 0 : (_filteredExteriorEnergyData_sections_exterior = _filteredExteriorEnergyData_sections2.exterior) === null || _filteredExteriorEnergyData_sections_exterior === void 0 ? void 0 : (_filteredExteriorEnergyData_sections_exterior_gallery = _filteredExteriorEnergyData_sections_exterior.gallery) === null || _filteredExteriorEnergyData_sections_exterior_gallery === void 0 ? void 0 : _filteredExteriorEnergyData_sections_exterior_gallery.length) !== null && _filteredExteriorEnergyData_sections_exterior_gallery_length !== void 0 ? _filteredExteriorEnergyData_sections_exterior_gallery_length : 0) {
                return filteredExteriorEnergyData.sections.exterior.gallery[0];
            }
        }
        var _filteredExteriorEnergyData_sections_exteriorGallery_images_length;
        if ((_filteredExteriorEnergyData_sections_exteriorGallery_images_length = (_filteredExteriorEnergyData_sections = filteredExteriorEnergyData.sections) === null || _filteredExteriorEnergyData_sections === void 0 ? void 0 : (_filteredExteriorEnergyData_sections_exteriorGallery = _filteredExteriorEnergyData_sections.exteriorGallery) === null || _filteredExteriorEnergyData_sections_exteriorGallery === void 0 ? void 0 : (_filteredExteriorEnergyData_sections_exteriorGallery_images = _filteredExteriorEnergyData_sections_exteriorGallery.images) === null || _filteredExteriorEnergyData_sections_exteriorGallery_images === void 0 ? void 0 : _filteredExteriorEnergyData_sections_exteriorGallery_images.length) !== null && _filteredExteriorEnergyData_sections_exteriorGallery_images_length !== void 0 ? _filteredExteriorEnergyData_sections_exteriorGallery_images_length : 0) {
            return filteredExteriorEnergyData.sections.exteriorGallery.images[0];
        }
    }
    // Otherwise, if interior features are selected, use interior data's exterior gallery
    const hasInteriorFeatures = selectedFeatures.kitchen === 'yes' || selectedFeatures.bathroom === 'yes' || selectedFeatures.shower === 'yes' || selectedFeatures.sink === 'yes' || selectedFeatures.toilet === 'yes' || selectedFeatures.kitchen_wall === 'yes' || selectedFeatures.kitchen_position && selectedFeatures.kitchen_position !== '';
    var _filteredInteriorData_sections_exterior_gallery_length;
    if (hasInteriorFeatures && ((_filteredInteriorData_sections_exterior_gallery_length = filteredInteriorData === null || filteredInteriorData === void 0 ? void 0 : (_filteredInteriorData_sections = filteredInteriorData.sections) === null || _filteredInteriorData_sections === void 0 ? void 0 : (_filteredInteriorData_sections_exterior = _filteredInteriorData_sections.exterior) === null || _filteredInteriorData_sections_exterior === void 0 ? void 0 : (_filteredInteriorData_sections_exterior_gallery = _filteredInteriorData_sections_exterior.gallery) === null || _filteredInteriorData_sections_exterior_gallery === void 0 ? void 0 : _filteredInteriorData_sections_exterior_gallery.length) !== null && _filteredInteriorData_sections_exterior_gallery_length !== void 0 ? _filteredInteriorData_sections_exterior_gallery_length : 0)) {
        return filteredInteriorData.sections.exterior.gallery[0];
    }
    return null;
};
const getFirstInteriorImage = (config)=>{
    var _filteredInteriorData_sections_interior_gallery, _filteredInteriorData_sections_interior, _filteredInteriorData_sections;
    const { selectedFeatures, filteredInteriorData } = config;
    // Mirror MiddleSection: only when interior features selected; no defaults
    const hasInteriorFeatures = selectedFeatures.kitchen === 'yes' || selectedFeatures.bathroom === 'yes' || selectedFeatures.shower === 'yes' || selectedFeatures.sink === 'yes' || selectedFeatures.toilet === 'yes' || selectedFeatures.kitchen_wall === 'yes' || selectedFeatures.kitchen_position && selectedFeatures.kitchen_position !== '';
    var _filteredInteriorData_sections_interior_gallery_length;
    if (hasInteriorFeatures && ((_filteredInteriorData_sections_interior_gallery_length = filteredInteriorData === null || filteredInteriorData === void 0 ? void 0 : (_filteredInteriorData_sections = filteredInteriorData.sections) === null || _filteredInteriorData_sections === void 0 ? void 0 : (_filteredInteriorData_sections_interior = _filteredInteriorData_sections.interior) === null || _filteredInteriorData_sections_interior === void 0 ? void 0 : (_filteredInteriorData_sections_interior_gallery = _filteredInteriorData_sections_interior.gallery) === null || _filteredInteriorData_sections_interior_gallery === void 0 ? void 0 : _filteredInteriorData_sections_interior_gallery.length) !== null && _filteredInteriorData_sections_interior_gallery_length !== void 0 ? _filteredInteriorData_sections_interior_gallery_length : 0)) {
        return filteredInteriorData.sections.interior.gallery[0];
    }
    return null;
};
// Generate configuration items
const getConfigurationItems = (config)=>{
    const { productData, selectedFeatures, filteredExteriorEnergyData, filteredInteriorData } = config;
    if (!productData) return [];
    const items = [];
    // Add kitchen if selected
    if (selectedFeatures.kitchen === 'yes') {
        var _productData_features_kitchen;
        const kitchenOption = (_productData_features_kitchen = productData.features.kitchen) === null || _productData_features_kitchen === void 0 ? void 0 : _productData_features_kitchen.options.find((opt)=>opt.value === 'yes');
        if (kitchenOption) {
            items.push({
                name: 'Kitchen',
                price: kitchenOption.price
            });
        }
    }
    // Add kitchen position if selected
    if (selectedFeatures.kitchen_position) {
        var _productData_features_kitchen_position;
        const positionOption = (_productData_features_kitchen_position = productData.features.kitchen_position) === null || _productData_features_kitchen_position === void 0 ? void 0 : _productData_features_kitchen_position.options.find((opt)=>opt.value === selectedFeatures.kitchen_position);
        if (positionOption) {
            let positionName = '';
            if (selectedFeatures.kitchen_position === 'wall3') {
                positionName = 'Kitchen Position 1 (Wall 3)';
            } else if (selectedFeatures.kitchen_position === 'wall4') {
                positionName = 'Kitchen Position 2 (Wall 4)';
            }
            items.push({
                name: positionName,
                price: positionOption.price
            });
        }
    }
    // Add bathroom if selected
    if (selectedFeatures.bathroom === 'yes') {
        var _productData_features_bathroom;
        const bathroomOption = (_productData_features_bathroom = productData.features.bathroom) === null || _productData_features_bathroom === void 0 ? void 0 : _productData_features_bathroom.options.find((opt)=>opt.value === 'yes');
        if (bathroomOption) {
            items.push({
                name: 'Full Bathroom',
                price: bathroomOption.price
            });
        }
    }
    // Add shower if selected
    if (selectedFeatures.shower === 'yes') {
        var _productData_features_shower;
        const showerOption = (_productData_features_shower = productData.features.shower) === null || _productData_features_shower === void 0 ? void 0 : _productData_features_shower.options.find((opt)=>opt.value === 'yes');
        if (showerOption) {
            items.push({
                name: 'Shower',
                price: showerOption.price
            });
        }
    }
    // Add sink if selected
    if (selectedFeatures.sink === 'yes') {
        var _productData_features_sink;
        const sinkOption = (_productData_features_sink = productData.features.sink) === null || _productData_features_sink === void 0 ? void 0 : _productData_features_sink.options.find((opt)=>opt.value === 'yes');
        if (sinkOption) {
            items.push({
                name: 'Sink',
                price: sinkOption.price
            });
        }
    }
    // Add toilet if selected
    if (selectedFeatures.toilet === 'yes') {
        var _productData_features_toilet;
        const toiletOption = (_productData_features_toilet = productData.features.toilet) === null || _productData_features_toilet === void 0 ? void 0 : _productData_features_toilet.options.find((opt)=>opt.value === 'yes');
        if (toiletOption) {
            items.push({
                name: 'Toilet',
                price: toiletOption.price
            });
        }
    }
    // Add kitchen wall if selected
    if (selectedFeatures.kitchen_wall === 'yes') {
        var _productData_features_kitchen_wall;
        const wallOption = (_productData_features_kitchen_wall = productData.features.kitchen_wall) === null || _productData_features_kitchen_wall === void 0 ? void 0 : _productData_features_kitchen_wall.options.find((opt)=>opt.value === 'yes');
        if (wallOption) {
            items.push({
                name: 'Kitchen Wall',
                price: wallOption.price
            });
        }
    }
    // Add slider door if selected
    if (selectedFeatures.slider_door === 'yes') {
        var _productData_features_slider_door;
        const sliderOption = (_productData_features_slider_door = productData.features.slider_door) === null || _productData_features_slider_door === void 0 ? void 0 : _productData_features_slider_door.options.find((opt)=>opt.value === 'yes');
        if (sliderOption) {
            items.push({
                name: 'Slider Door',
                price: sliderOption.price
            });
        }
    }
    // Add french door if selected
    if (selectedFeatures.french_door === 'yes') {
        var _productData_features_french_door;
        const frenchOption = (_productData_features_french_door = productData.features.french_door) === null || _productData_features_french_door === void 0 ? void 0 : _productData_features_french_door.options.find((opt)=>opt.value === 'yes');
        if (frenchOption) {
            items.push({
                name: 'French Door',
                price: frenchOption.price
            });
        }
    }
    // Add stairs if selected
    if (selectedFeatures.stairs === 'yes') {
        var _productData_features_stairs;
        const stairsOption = (_productData_features_stairs = productData.features.stairs) === null || _productData_features_stairs === void 0 ? void 0 : _productData_features_stairs.options.find((opt)=>opt.value === 'yes');
        if (stairsOption) {
            items.push({
                name: 'Stairs',
                price: stairsOption.price
            });
        }
    }
    // Add roof top if selected
    if (selectedFeatures.roofTop === 'yes') {
        var _productData_features_roofTop;
        const roofOption = (_productData_features_roofTop = productData.features.roofTop) === null || _productData_features_roofTop === void 0 ? void 0 : _productData_features_roofTop.options.find((opt)=>opt.value === 'yes');
        if (roofOption) {
            items.push({
                name: 'Roof Top',
                price: roofOption.price
            });
        }
    }
    // Add air conditioner if selected
    if (selectedFeatures.airConditioner === 'yes') {
        var _productData_features_airConditioner;
        const acOption = (_productData_features_airConditioner = productData.features.airConditioner) === null || _productData_features_airConditioner === void 0 ? void 0 : _productData_features_airConditioner.options.find((opt)=>opt.value === 'yes');
        if (acOption) {
            items.push({
                name: 'Air Conditioner',
                price: acOption.price
            });
        }
    }
    // Add natural gas if selected
    if (selectedFeatures.naturalGas === 'yes') {
        var _productData_features_naturalGas;
        const gasOption = (_productData_features_naturalGas = productData.features.naturalGas) === null || _productData_features_naturalGas === void 0 ? void 0 : _productData_features_naturalGas.options.find((opt)=>opt.value === 'yes');
        if (gasOption) {
            items.push({
                name: 'Natural Gas',
                price: gasOption.price
            });
        }
    }
    // Add solar panel if selected
    if (selectedFeatures.solarPanel === 'yes') {
        var _productData_features_solarPanel;
        const solarOption = (_productData_features_solarPanel = productData.features.solarPanel) === null || _productData_features_solarPanel === void 0 ? void 0 : _productData_features_solarPanel.options.find((opt)=>opt.value === 'yes');
        if (solarOption) {
            items.push({
                name: 'Solar Panel',
                price: solarOption.price
            });
        }
    }
    return items;
};
const generateCustomizedHomePDF = async function(config) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const { shouldCompress = false, shouldDownload = false, fileName = 'customized-home-configuration.pdf' } = options;
    const { totalPrice, productData } = config;
    try {
        // Create PDF with better layout
        const pdf = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]('p', 'mm', 'a4');
        // Set compression for smaller file size
        pdf.setProperties({
            title: 'Customized Home Configuration',
            subject: 'Freepoint Homes Configuration',
            author: 'Freepoint Homes',
            creator: 'Freepoint Homes'
        });
        // Page dimensions
        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 20;
        const contentWidth = pageWidth - 2 * margin;
        // Colors
        const primaryColor = [
            194,
            164,
            92
        ] // #C2A45C
        ;
        const darkColor = [
            51,
            51,
            51
        ] // #333
        ;
        const lightGray = [
            248,
            248,
            248
        ] // #F8F8F8
        ;
        const mediumGray = [
            102,
            102,
            102
        ] // #666
        ;
        let yPosition = margin;
        // Header with logo area - very small height
        pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        pdf.rect(0, 0, pageWidth, 25, 'F');
        // Company name in header - better positioning
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(20);
        pdf.setTextColor(255, 255, 255);
        pdf.text('Freepoint Homes', pageWidth / 2, 16, {
            align: 'center'
        });
        yPosition = 35;
        // Title
        pdf.setFontSize(20);
        pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
        pdf.text('Customized Home Configuration', pageWidth / 2, yPosition, {
            align: 'center'
        });
        yPosition += 12;
        // Date and reference
        pdf.setFontSize(10);
        pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
        pdf.text("Generated: ".concat(new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })), pageWidth / 2, yPosition, {
            align: 'center'
        });
        yPosition += 15;
        // Images Section with better layout
        const exteriorImage = getFirstExteriorImage(config);
        const interiorImage = getFirstInteriorImage(config);
        if (exteriorImage || interiorImage) {
            // Section title
            pdf.setFontSize(16);
            pdf.setFont('helvetica', 'bold');
            pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
            pdf.text('Design Preview', margin, yPosition);
            yPosition += 8;
            // Draw section line
            pdf.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            pdf.setLineWidth(0.5);
            pdf.line(margin, yPosition, pageWidth - margin, yPosition);
            yPosition += 12;
            const imageWidth = shouldCompress ? 60 : 70;
            const imageHeight = shouldCompress ? 40 : 50;
            const imageSpacing = 20;
            // Calculate positions for centered images
            const totalImagesWidth = exteriorImage && interiorImage ? imageWidth * 2 + imageSpacing : imageWidth;
            const startX = (pageWidth - totalImagesWidth) / 2;
            // Exterior Image
            if (exteriorImage) {
                try {
                    const exteriorImg = new Image();
                    exteriorImg.crossOrigin = 'anonymous';
                    exteriorImg.src = exteriorImage;
                    await new Promise((resolve, reject)=>{
                        exteriorImg.onload = resolve;
                        exteriorImg.onerror = reject;
                        setTimeout(reject, 5000);
                    });
                    pdf.addImage(exteriorImg, 'JPEG', startX, yPosition, imageWidth, imageHeight, undefined, 'FAST');
                    // Image label
                    pdf.setFontSize(10);
                    pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
                    pdf.text('Exterior Design', startX + imageWidth / 2, yPosition + imageHeight + 8, {
                        align: 'center'
                    });
                } catch (error) {
                    // Fallback rectangle
                    pdf.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
                    pdf.rect(startX, yPosition, imageWidth, imageHeight, 'F');
                    pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
                    pdf.setFontSize(8);
                    pdf.text('Exterior Image', startX + imageWidth / 2, yPosition + imageHeight / 2, {
                        align: 'center'
                    });
                    pdf.text('Not Available', startX + imageWidth / 2, yPosition + imageHeight / 2 + 5, {
                        align: 'center'
                    });
                }
            }
            // Interior Image
            if (interiorImage) {
                const interiorX = exteriorImage ? startX + imageWidth + imageSpacing : startX;
                try {
                    const interiorImg = new Image();
                    interiorImg.crossOrigin = 'anonymous';
                    interiorImg.src = interiorImage;
                    await new Promise((resolve, reject)=>{
                        interiorImg.onload = resolve;
                        interiorImg.onerror = reject;
                        setTimeout(reject, 5000);
                    });
                    pdf.addImage(interiorImg, 'JPEG', interiorX, yPosition, imageWidth, imageHeight, undefined, 'FAST');
                    // Image label
                    pdf.setFontSize(10);
                    pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
                    pdf.text('Interior Design', interiorX + imageWidth / 2, yPosition + imageHeight + 8, {
                        align: 'center'
                    });
                } catch (error) {
                    // Fallback rectangle
                    pdf.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
                    pdf.rect(interiorX, yPosition, imageWidth, imageHeight, 'F');
                    pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
                    pdf.setFontSize(8);
                    pdf.text('Interior Image', interiorX + imageWidth / 2, yPosition + imageHeight / 2, {
                        align: 'center'
                    });
                    pdf.text('Not Available', interiorX + imageWidth / 2, yPosition + imageHeight / 2 + 5, {
                        align: 'center'
                    });
                }
            }
            yPosition += imageHeight + 18;
        }
        // Configuration Section
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
        pdf.text('Your Configuration', margin, yPosition);
        yPosition += 8;
        // Draw section line
        pdf.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        pdf.setLineWidth(0.5);
        pdf.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 12;
        const configurationItems = getConfigurationItems(config);
        const basePrice = (productData === null || productData === void 0 ? void 0 : productData.basePrice) || 120000;
        const summaryStartY = yPosition;
        const summaryHeight = 25 + configurationItems.length * 6 + 12;
        // Summary background
        pdf.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
        pdf.rect(margin, summaryStartY, contentWidth, summaryHeight, 'F');
        // Base price
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
        pdf.text('Base Home:', margin + 10, summaryStartY + 12);
        pdf.text("$".concat(basePrice.toLocaleString()), pageWidth - margin - 10, summaryStartY + 12, {
            align: 'right'
        });
        // Selected features in summary
        configurationItems.forEach((item, index)=>{
            pdf.setFontSize(10);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
            pdf.text("".concat(item.name, ":"), margin + 10, summaryStartY + 20 + index * 6);
            pdf.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
            pdf.text("+$".concat(item.price.toLocaleString()), pageWidth - margin - 10, summaryStartY + 20 + index * 6, {
                align: 'right'
            });
        });
        const totalY = summaryStartY + summaryHeight - 12;
        pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        pdf.rect(margin, totalY, contentWidth, 12, 'F');
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(255, 255, 255);
        pdf.text('Total Estimate:', margin + 10, totalY + 8);
        pdf.text("$".concat(totalPrice.toLocaleString()), pageWidth - margin - 10, totalY + 8, {
            align: 'right'
        });
        yPosition = totalY + 18;
        // Footer - ensure it's always at the bottom
        const footerY = pageHeight - 20;
        pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        pdf.rect(0, footerY, pageWidth, 20, 'F');
        pdf.setFontSize(9);
        pdf.setTextColor(255, 255, 255);
        pdf.text('Thank you for choosing Freepoint Homes', pageWidth / 2, footerY + 8, {
            align: 'center'
        });
        pdf.text('contact@freepointhomes.com | www.freepointhomes.com', pageWidth / 2, footerY + 15, {
            align: 'center'
        });
        // Convert PDF to blob
        const pdfBlob = pdf.output('blob');
        // If compression is needed and PDF is still too large, create minimal version
        if (shouldCompress && pdfBlob.size > 50000) {
            // Create a new PDF with minimal content
            const compressedPdf = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]('p', 'mm', 'a4');
            // Add only essential information
            compressedPdf.setFont('helvetica', 'bold');
            compressedPdf.setFontSize(16);
            compressedPdf.text('Customized Home Configuration', 20, 30);
            compressedPdf.setFontSize(12);
            compressedPdf.text("Total Price: $".concat(totalPrice.toLocaleString()), 20, 50);
            // Add selected features as text only
            let yPos = 70;
            configurationItems.forEach((item, index)=>{
                if (yPos < 250) {
                    compressedPdf.text("".concat(item.name, ": +$").concat(item.price.toLocaleString()), 20, yPos);
                    yPos += 10;
                }
            });
            const compressedBlob = compressedPdf.output('blob');
            if (shouldDownload) {
                compressedPdf.save(fileName);
            }
            return compressedBlob;
        }
        if (shouldDownload) {
            pdf.save(fileName);
        }
        return pdfBlob;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(client)/send-email-success/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>SendEmailSuccess
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ProductContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/contexts/ProductContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pdf$2d$generator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/pdf-generator.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function SendEmailSuccess() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isDownloading, setIsDownloading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const { productData, selectedFeatures, filteredInteriorData, filteredExteriorEnergyData, totalPrice } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ProductContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProductContext"])();
    // Check if any customizations were actually selected
    const hasAnyCustomizations = ()=>{
        return selectedFeatures.kitchen === 'yes' || selectedFeatures.bathroom === 'yes' || selectedFeatures.shower === 'yes' || selectedFeatures.sink === 'yes' || selectedFeatures.toilet === 'yes' || selectedFeatures.kitchen_wall === 'yes' || selectedFeatures.slider_door === 'yes' || selectedFeatures.french_door === 'yes' || selectedFeatures.stairs === 'yes' || selectedFeatures.roofTop === 'yes' || selectedFeatures.airConditioner === 'yes' || selectedFeatures.naturalGas === 'yes' || selectedFeatures.solarPanel === 'yes' || selectedFeatures.kitchen_position && selectedFeatures.kitchen_position !== '';
    };
    // Redirect if no customizations and no product data (someone accessed this page directly)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SendEmailSuccess.useEffect": ()=>{
            if (!productData) {
                router.push('/customizations');
                return;
            }
            if (!hasAnyCustomizations()) {
                // If no customizations, redirect to customizations page after a short delay
                const timer = setTimeout({
                    "SendEmailSuccess.useEffect.timer": ()=>{
                        router.push('/customizations');
                    }
                }["SendEmailSuccess.useEffect.timer"], 3000);
                return ({
                    "SendEmailSuccess.useEffect": ()=>clearTimeout(timer)
                })["SendEmailSuccess.useEffect"];
            }
        }
    }["SendEmailSuccess.useEffect"], [
        productData,
        router
    ]);
    const getFirstExteriorImage = ()=>{
        var _filteredInteriorData_sections_exterior_gallery;
        // Mirror MiddleSection selection (no product defaults)
        if (filteredExteriorEnergyData && (selectedFeatures.stairs !== undefined || selectedFeatures.railing !== undefined || selectedFeatures.airConditioner !== undefined || selectedFeatures.solarPanel !== undefined)) {
            var _filteredExteriorEnergyData_sections_exteriorGallery_images, _filteredExteriorEnergyData_sections_exteriorGallery, _filteredExteriorEnergyData_sections;
            if (selectedFeatures.kitchen === 'no') {
                var _filteredExteriorEnergyData_sections_exterior_NoKitchen_gallery, _filteredExteriorEnergyData_sections_exterior_NoKitchen, _filteredExteriorEnergyData_sections1;
                var _filteredExteriorEnergyData_sections_exterior_NoKitchen_gallery_length;
                if (((_filteredExteriorEnergyData_sections_exterior_NoKitchen_gallery_length = (_filteredExteriorEnergyData_sections1 = filteredExteriorEnergyData.sections) === null || _filteredExteriorEnergyData_sections1 === void 0 ? void 0 : (_filteredExteriorEnergyData_sections_exterior_NoKitchen = _filteredExteriorEnergyData_sections1.exterior_NoKitchen) === null || _filteredExteriorEnergyData_sections_exterior_NoKitchen === void 0 ? void 0 : (_filteredExteriorEnergyData_sections_exterior_NoKitchen_gallery = _filteredExteriorEnergyData_sections_exterior_NoKitchen.gallery) === null || _filteredExteriorEnergyData_sections_exterior_NoKitchen_gallery === void 0 ? void 0 : _filteredExteriorEnergyData_sections_exterior_NoKitchen_gallery.length) !== null && _filteredExteriorEnergyData_sections_exterior_NoKitchen_gallery_length !== void 0 ? _filteredExteriorEnergyData_sections_exterior_NoKitchen_gallery_length : 0) > 0) {
                    var _filteredExteriorEnergyData_sections_exterior_NoKitchen_gallery1, _filteredExteriorEnergyData_sections_exterior_NoKitchen1, _filteredExteriorEnergyData_sections2;
                    return ((_filteredExteriorEnergyData_sections2 = filteredExteriorEnergyData.sections) === null || _filteredExteriorEnergyData_sections2 === void 0 ? void 0 : (_filteredExteriorEnergyData_sections_exterior_NoKitchen1 = _filteredExteriorEnergyData_sections2.exterior_NoKitchen) === null || _filteredExteriorEnergyData_sections_exterior_NoKitchen1 === void 0 ? void 0 : (_filteredExteriorEnergyData_sections_exterior_NoKitchen_gallery1 = _filteredExteriorEnergyData_sections_exterior_NoKitchen1.gallery) === null || _filteredExteriorEnergyData_sections_exterior_NoKitchen_gallery1 === void 0 ? void 0 : _filteredExteriorEnergyData_sections_exterior_NoKitchen_gallery1[0]) || null;
                }
            } else {
                var _filteredExteriorEnergyData_sections_exterior_gallery, _filteredExteriorEnergyData_sections_exterior, _filteredExteriorEnergyData_sections3;
                var _filteredExteriorEnergyData_sections_exterior_gallery_length;
                if (((_filteredExteriorEnergyData_sections_exterior_gallery_length = (_filteredExteriorEnergyData_sections3 = filteredExteriorEnergyData.sections) === null || _filteredExteriorEnergyData_sections3 === void 0 ? void 0 : (_filteredExteriorEnergyData_sections_exterior = _filteredExteriorEnergyData_sections3.exterior) === null || _filteredExteriorEnergyData_sections_exterior === void 0 ? void 0 : (_filteredExteriorEnergyData_sections_exterior_gallery = _filteredExteriorEnergyData_sections_exterior.gallery) === null || _filteredExteriorEnergyData_sections_exterior_gallery === void 0 ? void 0 : _filteredExteriorEnergyData_sections_exterior_gallery.length) !== null && _filteredExteriorEnergyData_sections_exterior_gallery_length !== void 0 ? _filteredExteriorEnergyData_sections_exterior_gallery_length : 0) > 0) {
                    var _filteredExteriorEnergyData_sections_exterior_gallery1, _filteredExteriorEnergyData_sections_exterior1, _filteredExteriorEnergyData_sections4;
                    return ((_filteredExteriorEnergyData_sections4 = filteredExteriorEnergyData.sections) === null || _filteredExteriorEnergyData_sections4 === void 0 ? void 0 : (_filteredExteriorEnergyData_sections_exterior1 = _filteredExteriorEnergyData_sections4.exterior) === null || _filteredExteriorEnergyData_sections_exterior1 === void 0 ? void 0 : (_filteredExteriorEnergyData_sections_exterior_gallery1 = _filteredExteriorEnergyData_sections_exterior1.gallery) === null || _filteredExteriorEnergyData_sections_exterior_gallery1 === void 0 ? void 0 : _filteredExteriorEnergyData_sections_exterior_gallery1[0]) || null;
                }
            }
            var _filteredExteriorEnergyData_sections_exteriorGallery_images_length;
            if (((_filteredExteriorEnergyData_sections_exteriorGallery_images_length = (_filteredExteriorEnergyData_sections = filteredExteriorEnergyData.sections) === null || _filteredExteriorEnergyData_sections === void 0 ? void 0 : (_filteredExteriorEnergyData_sections_exteriorGallery = _filteredExteriorEnergyData_sections.exteriorGallery) === null || _filteredExteriorEnergyData_sections_exteriorGallery === void 0 ? void 0 : (_filteredExteriorEnergyData_sections_exteriorGallery_images = _filteredExteriorEnergyData_sections_exteriorGallery.images) === null || _filteredExteriorEnergyData_sections_exteriorGallery_images === void 0 ? void 0 : _filteredExteriorEnergyData_sections_exteriorGallery_images.length) !== null && _filteredExteriorEnergyData_sections_exteriorGallery_images_length !== void 0 ? _filteredExteriorEnergyData_sections_exteriorGallery_images_length : 0) > 0) {
                var _filteredExteriorEnergyData_sections_exteriorGallery_images1, _filteredExteriorEnergyData_sections_exteriorGallery1, _filteredExteriorEnergyData_sections5;
                return ((_filteredExteriorEnergyData_sections5 = filteredExteriorEnergyData.sections) === null || _filteredExteriorEnergyData_sections5 === void 0 ? void 0 : (_filteredExteriorEnergyData_sections_exteriorGallery1 = _filteredExteriorEnergyData_sections5.exteriorGallery) === null || _filteredExteriorEnergyData_sections_exteriorGallery1 === void 0 ? void 0 : (_filteredExteriorEnergyData_sections_exteriorGallery_images1 = _filteredExteriorEnergyData_sections_exteriorGallery1.images) === null || _filteredExteriorEnergyData_sections_exteriorGallery_images1 === void 0 ? void 0 : _filteredExteriorEnergyData_sections_exteriorGallery_images1[0]) || null;
            }
        }
        const hasInteriorFeatures = selectedFeatures.kitchen === 'yes' || selectedFeatures.bathroom === 'yes' || selectedFeatures.shower === 'yes' || selectedFeatures.sink === 'yes' || selectedFeatures.toilet === 'yes' || selectedFeatures.kitchen_wall === 'yes' || selectedFeatures.kitchen_position && selectedFeatures.kitchen_position !== '';
        var _filteredInteriorData_sections_exterior_gallery_length;
        if (hasInteriorFeatures && filteredInteriorData && ((_filteredInteriorData_sections_exterior_gallery_length = (_filteredInteriorData_sections_exterior_gallery = filteredInteriorData.sections.exterior.gallery) === null || _filteredInteriorData_sections_exterior_gallery === void 0 ? void 0 : _filteredInteriorData_sections_exterior_gallery.length) !== null && _filteredInteriorData_sections_exterior_gallery_length !== void 0 ? _filteredInteriorData_sections_exterior_gallery_length : 0) > 0) {
            var _filteredInteriorData_sections_exterior_gallery1;
            return ((_filteredInteriorData_sections_exterior_gallery1 = filteredInteriorData.sections.exterior.gallery) === null || _filteredInteriorData_sections_exterior_gallery1 === void 0 ? void 0 : _filteredInteriorData_sections_exterior_gallery1[0]) || null;
        }
        return null;
    };
    const getFirstInteriorImage = ()=>{
        var _filteredInteriorData_sections_interior_gallery;
        // Mirror MiddleSection: only when interior features are selected; no defaults
        const hasInteriorFeatures = selectedFeatures.kitchen === 'yes' || selectedFeatures.bathroom === 'yes' || selectedFeatures.shower === 'yes' || selectedFeatures.sink === 'yes' || selectedFeatures.toilet === 'yes' || selectedFeatures.kitchen_wall === 'yes' || selectedFeatures.kitchen_position && selectedFeatures.kitchen_position !== '';
        var _filteredInteriorData_sections_interior_gallery_length;
        if (hasInteriorFeatures && filteredInteriorData && ((_filteredInteriorData_sections_interior_gallery_length = (_filteredInteriorData_sections_interior_gallery = filteredInteriorData.sections.interior.gallery) === null || _filteredInteriorData_sections_interior_gallery === void 0 ? void 0 : _filteredInteriorData_sections_interior_gallery.length) !== null && _filteredInteriorData_sections_interior_gallery_length !== void 0 ? _filteredInteriorData_sections_interior_gallery_length : 0) > 0) {
            var _filteredInteriorData_sections_interior_gallery1;
            return ((_filteredInteriorData_sections_interior_gallery1 = filteredInteriorData.sections.interior.gallery) === null || _filteredInteriorData_sections_interior_gallery1 === void 0 ? void 0 : _filteredInteriorData_sections_interior_gallery1[0]) || null;
        }
        return null;
    };
    // Generate configuration items
    const getConfigurationItems = ()=>{
        if (!productData) return [];
        const items = [];
        if (selectedFeatures.kitchen === 'yes') {
            var _productData_features_kitchen;
            const kitchenOption = (_productData_features_kitchen = productData.features.kitchen) === null || _productData_features_kitchen === void 0 ? void 0 : _productData_features_kitchen.options.find((opt)=>opt.value === 'yes');
            if (kitchenOption) {
                items.push({
                    name: 'Kitchen',
                    price: kitchenOption.price
                });
            }
        }
        if (selectedFeatures.kitchen_position) {
            var _productData_features_kitchen_position;
            const positionOption = (_productData_features_kitchen_position = productData.features.kitchen_position) === null || _productData_features_kitchen_position === void 0 ? void 0 : _productData_features_kitchen_position.options.find((opt)=>opt.value === selectedFeatures.kitchen_position);
            if (positionOption) {
                let positionName = '';
                if (selectedFeatures.kitchen_position === 'wall3') {
                    positionName = 'Kitchen Position 1 (Wall 3)';
                } else if (selectedFeatures.kitchen_position === 'wall4') {
                    positionName = 'Kitchen Position 2 (Wall 4)';
                }
                items.push({
                    name: positionName,
                    price: positionOption.price
                });
            }
        }
        if (selectedFeatures.bathroom === 'yes') {
            var _productData_features_bathroom;
            const bathroomOption = (_productData_features_bathroom = productData.features.bathroom) === null || _productData_features_bathroom === void 0 ? void 0 : _productData_features_bathroom.options.find((opt)=>opt.value === 'yes');
            if (bathroomOption) {
                items.push({
                    name: 'Full Bathroom',
                    price: bathroomOption.price
                });
            }
        }
        if (selectedFeatures.shower === 'yes') {
            var _productData_features_shower;
            const showerOption = (_productData_features_shower = productData.features.shower) === null || _productData_features_shower === void 0 ? void 0 : _productData_features_shower.options.find((opt)=>opt.value === 'yes');
            if (showerOption) {
                items.push({
                    name: 'Shower',
                    price: showerOption.price
                });
            }
        }
        if (selectedFeatures.sink === 'yes') {
            var _productData_features_sink;
            const sinkOption = (_productData_features_sink = productData.features.sink) === null || _productData_features_sink === void 0 ? void 0 : _productData_features_sink.options.find((opt)=>opt.value === 'yes');
            if (sinkOption) {
                items.push({
                    name: 'Sink',
                    price: sinkOption.price
                });
            }
        }
        if (selectedFeatures.toilet === 'yes') {
            var _productData_features_toilet;
            const toiletOption = (_productData_features_toilet = productData.features.toilet) === null || _productData_features_toilet === void 0 ? void 0 : _productData_features_toilet.options.find((opt)=>opt.value === 'yes');
            if (toiletOption) {
                items.push({
                    name: 'Toilet',
                    price: toiletOption.price
                });
            }
        }
        if (selectedFeatures.kitchen_wall === 'yes') {
            var _productData_features_kitchen_wall;
            const wallOption = (_productData_features_kitchen_wall = productData.features.kitchen_wall) === null || _productData_features_kitchen_wall === void 0 ? void 0 : _productData_features_kitchen_wall.options.find((opt)=>opt.value === 'yes');
            if (wallOption) {
                items.push({
                    name: 'Kitchen Wall',
                    price: wallOption.price
                });
            }
        }
        if (selectedFeatures.slider_door === 'yes') {
            var _productData_features_slider_door;
            const sliderOption = (_productData_features_slider_door = productData.features.slider_door) === null || _productData_features_slider_door === void 0 ? void 0 : _productData_features_slider_door.options.find((opt)=>opt.value === 'yes');
            if (sliderOption) {
                items.push({
                    name: 'Slider Door',
                    price: sliderOption.price
                });
            }
        }
        if (selectedFeatures.french_door === 'yes') {
            var _productData_features_french_door;
            const frenchOption = (_productData_features_french_door = productData.features.french_door) === null || _productData_features_french_door === void 0 ? void 0 : _productData_features_french_door.options.find((opt)=>opt.value === 'yes');
            if (frenchOption) {
                items.push({
                    name: 'French Door',
                    price: frenchOption.price
                });
            }
        }
        if (selectedFeatures.stairs === 'yes') {
            var _productData_features_stairs;
            const stairsOption = (_productData_features_stairs = productData.features.stairs) === null || _productData_features_stairs === void 0 ? void 0 : _productData_features_stairs.options.find((opt)=>opt.value === 'yes');
            if (stairsOption) {
                items.push({
                    name: 'Stairs',
                    price: stairsOption.price
                });
            }
        }
        if (selectedFeatures.roofTop === 'yes') {
            var _productData_features_roofTop;
            const roofOption = (_productData_features_roofTop = productData.features.roofTop) === null || _productData_features_roofTop === void 0 ? void 0 : _productData_features_roofTop.options.find((opt)=>opt.value === 'yes');
            if (roofOption) {
                items.push({
                    name: 'Roof Top',
                    price: roofOption.price
                });
            }
        }
        if (selectedFeatures.airConditioner === 'yes') {
            var _productData_features_airConditioner;
            const acOption = (_productData_features_airConditioner = productData.features.airConditioner) === null || _productData_features_airConditioner === void 0 ? void 0 : _productData_features_airConditioner.options.find((opt)=>opt.value === 'yes');
            if (acOption) {
                items.push({
                    name: 'Air Conditioner',
                    price: acOption.price
                });
            }
        }
        if (selectedFeatures.naturalGas === 'yes') {
            var _productData_features_naturalGas;
            const gasOption = (_productData_features_naturalGas = productData.features.naturalGas) === null || _productData_features_naturalGas === void 0 ? void 0 : _productData_features_naturalGas.options.find((opt)=>opt.value === 'yes');
            if (gasOption) {
                items.push({
                    name: 'Natural Gas',
                    price: gasOption.price
                });
            }
        }
        if (selectedFeatures.solarPanel === 'yes') {
            var _productData_features_solarPanel;
            const solarOption = (_productData_features_solarPanel = productData.features.solarPanel) === null || _productData_features_solarPanel === void 0 ? void 0 : _productData_features_solarPanel.options.find((opt)=>opt.value === 'yes');
            if (solarOption) {
                items.push({
                    name: 'Solar Panel',
                    price: solarOption.price
                });
            }
        }
        return items;
    };
    const handlePDFDownload = async ()=>{
        try {
            setIsDownloading(true);
            // brief delay to show spinner before triggering download
            await new Promise((resolve)=>setTimeout(resolve, 1500));
            setIsDownloading(false);
            const config = {
                productData,
                selectedFeatures,
                filteredInteriorData,
                filteredExteriorEnergyData,
                totalPrice
            };
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$pdf$2d$generator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateCustomizedHomePDF"])(config, {
                shouldDownload: true,
                fileName: 'customized-home-configuration.pdf'
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('PDF downloaded successfully!');
        } catch (error) {
            console.error('Error downloading PDF:', error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('Failed to download PDF. Please try again.');
        } finally{
            setIsDownloading(false);
        }
    };
    const exteriorImage = getFirstExteriorImage();
    const interiorImage = getFirstInteriorImage();
    const configurationItems = getConfigurationItems();
    const basePrice = (productData === null || productData === void 0 ? void 0 : productData.basePrice) || 120000;
    const hasCustomizations = hasAnyCustomizations();
    // Show loading/redirect message if no customizations
    if (!hasCustomizations) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl w-full mx-auto px-4 h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto w-36 h-36 bg-yellow-100 rounded-full flex items-center justify-center mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "w-20 h-20 text-yellow-600",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            }, void 0, false, {
                                fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                lineNumber: 271,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(client)/send-email-success/page.tsx",
                            lineNumber: 270,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(client)/send-email-success/page.tsx",
                        lineNumber: 269,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 mb-2",
                        children: "No Customizations Selected"
                    }, void 0, false, {
                        fileName: "[project]/app/(client)/send-email-success/page.tsx",
                        lineNumber: 274,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mb-6",
                        children: "Redirecting you to the customizations page..."
                    }, void 0, false, {
                        fileName: "[project]/app/(client)/send-email-success/page.tsx",
                        lineNumber: 277,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "animate-spin rounded-full h-5 w-5 border-b-2 border-[#C2A45C] mx-auto"
                    }, void 0, false, {
                        fileName: "[project]/app/(client)/send-email-success/page.tsx",
                        lineNumber: 280,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(client)/send-email-success/page.tsx",
                lineNumber: 268,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(client)/send-email-success/page.tsx",
            lineNumber: 267,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl w-full mx-auto px-4 py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center max-w-md mx-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mx-auto w-36 h-36 bg-[#C2A45C]/20 rounded-full flex items-center justify-center mb-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                    className: "w-20 h-20 text-[#C2A45C]"
                                }, void 0, false, {
                                    fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                    lineNumber: 293,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                lineNumber: 292,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 mb-2 leading-9 sm:leading-10 md:leading-11",
                                children: "Your Custom Home Has Been Submitted"
                            }, void 0, false, {
                                fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                lineNumber: 295,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600",
                                        children: "Thank you! We will be in touch with you as soon as possible."
                                    }, void 0, false, {
                                        fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                        lineNumber: 299,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600",
                                        children: [
                                            " Please email us at anytime ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                className: "text-[#C2A45C]",
                                                children: "contact@freepointhomes.com"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                lineNumber: 302,
                                                columnNumber: 86
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                        lineNumber: 302,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                lineNumber: 298,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(client)/send-email-success/page.tsx",
                        lineNumber: 291,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(client)/send-email-success/page.tsx",
                    lineNumber: 290,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border border-gray-200 rounded-lg p-6 mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-bold text-gray-800 mb-6 text-center",
                            children: "Your Customization Preview"
                        }, void 0, false, {
                            fileName: "[project]/app/(client)/send-email-success/page.tsx",
                            lineNumber: 309,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-lg font-semibold text-gray-800 mb-3",
                                                    children: "Exterior Design:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 33
                                                }, this),
                                                exteriorImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    width: 1000,
                                                    height: 1000,
                                                    src: exteriorImage,
                                                    alt: "Exterior Design",
                                                    className: "w-full rounded-lg shadow-md"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                    lineNumber: 320,
                                                    columnNumber: 37
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-full max-w-sm mx-auto h-48 bg-gray-200 rounded-lg flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-500",
                                                        children: "No exterior image available"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                        lineNumber: 329,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                    lineNumber: 328,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                            lineNumber: 317,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-lg font-semibold text-gray-800 mb-3",
                                                    children: "Interior Design:"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                    lineNumber: 336,
                                                    columnNumber: 33
                                                }, this),
                                                interiorImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    width: 1000,
                                                    height: 1000,
                                                    src: interiorImage,
                                                    alt: "Interior Design",
                                                    className: "w-full rounded-lg shadow-md"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                    lineNumber: 338,
                                                    columnNumber: 37
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-full max-w-sm mx-auto h-48 bg-gray-200 rounded-lg flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-500",
                                                        children: "No interior image available"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                        lineNumber: 347,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                    lineNumber: 346,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                            lineNumber: 335,
                                            columnNumber: 29
                                        }, this),
                                        hasCustomizations && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handlePDFDownload,
                                                disabled: isDownloading,
                                                className: "bg-[#C2A45C] text-white px-6 py-3 rounded-md transition-colors font-medium flex items-center justify-center gap-2 min-w-[160px] ".concat(isDownloading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:bg-[#C2A45C]/80'),
                                                children: isDownloading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                            lineNumber: 362,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Preparing..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                            lineNumber: 363,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                            lineNumber: 367,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Download PDF"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                            lineNumber: 368,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                lineNumber: 355,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                            lineNumber: 354,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                    lineNumber: 315,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-lg font-semibold text-gray-800 mb-4",
                                            children: "Your Configuration"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                            lineNumber: 378,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-50 p-4 rounded-lg",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-600",
                                                                children: "Base Home:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                                lineNumber: 384,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-800",
                                                                children: [
                                                                    "$",
                                                                    basePrice.toLocaleString()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                                lineNumber: 385,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                        lineNumber: 383,
                                                        columnNumber: 37
                                                    }, this),
                                                    configurationItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-600",
                                                                    children: [
                                                                        item.name,
                                                                        ":"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                                    lineNumber: 390,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-gray-800",
                                                                    children: [
                                                                        "+$",
                                                                        item.price.toLocaleString()
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                                    lineNumber: 391,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, index, true, {
                                                            fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                            lineNumber: 389,
                                                            columnNumber: 41
                                                        }, this)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "border-t pt-2 mt-3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between items-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-bold text-gray-800",
                                                                    children: "Total Estimate:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                                    lineNumber: 397,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xl font-bold text-[#C2A45C]",
                                                                    children: [
                                                                        "$",
                                                                        totalPrice.toLocaleString()
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                                    lineNumber: 398,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                            lineNumber: 396,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                        lineNumber: 395,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                                lineNumber: 382,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                            lineNumber: 381,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                    lineNumber: 377,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(client)/send-email-success/page.tsx",
                            lineNumber: 313,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(client)/send-email-success/page.tsx",
                    lineNumber: 308,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col sm:flex-row gap-4 justify-center mt-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "block",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "w-full cursor-pointer sm:w-auto bg-[#C2A45C] hover:bg-[#C2A45C]/80 text-white px-6 py-3 rounded-md transition-colors font-medium flex items-center justify-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"], {
                                        className: "w-4 h-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                        lineNumber: 413,
                                        columnNumber: 29
                                    }, this),
                                    "Back to Home"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                lineNumber: 412,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(client)/send-email-success/page.tsx",
                            lineNumber: 411,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/customizations",
                            className: "block",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "w-full cursor-pointer sm:w-auto border border-[#C2A45C] text-[#C2A45C] hover:bg-[#C2A45C] hover:text-white px-6 py-3 rounded-md transition-colors font-medium",
                                children: "Continue Customizing"
                            }, void 0, false, {
                                fileName: "[project]/app/(client)/send-email-success/page.tsx",
                                lineNumber: 419,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(client)/send-email-success/page.tsx",
                            lineNumber: 418,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(client)/send-email-success/page.tsx",
                    lineNumber: 410,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(client)/send-email-success/page.tsx",
            lineNumber: 288,
            columnNumber: 13
        }, this)
    }, void 0, false);
}
_s(SendEmailSuccess, "fDqzm9avdqMiHrhecNuOzXhjNCQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$contexts$2f$ProductContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useProductContext"]
    ];
});
_c = SendEmailSuccess;
var _c;
__turbopack_context__.k.register(_c, "SendEmailSuccess");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_b7e5503e._.js.map