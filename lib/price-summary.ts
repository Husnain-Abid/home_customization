export const getPrice = (
  productData: any,
  selectedFeatures: any,
  featureKey: string
) => {
  const option = productData?.features?.[featureKey]?.options?.find(
    (opt: any) => opt.value === "yes"
  )
  return selectedFeatures?.[featureKey] === "yes" && option
    ? option.price
    : 0
}

export const getBathroomTotal = (
  productData: any,
  selectedFeatures: any
) => {
  if (selectedFeatures.bathroom !== "yes") return 0

  return (
    getPrice(productData, selectedFeatures, "shower") +
    getPrice(productData, selectedFeatures, "sink") +
    getPrice(productData, selectedFeatures, "toilet")
  )
}

export const getPriceSummary = (
  productData: any,
  selectedFeatures: any
) => {
  const bathroomTotal = getBathroomTotal(productData, selectedFeatures)

  return {
    basePrice: productData?.basePrice || 21990,

    items: [
      { name: "Kitchen", price: getPrice(productData, selectedFeatures, "kitchen") },
      { name: "Bathroom", price: bathroomTotal },
      { name: "Stairs", price: getPrice(productData, selectedFeatures, "stairs") },
      { name: "Roof Railing", price: getPrice(productData, selectedFeatures, "railing") },
      { name: "Air Conditioning", price: getPrice(productData, selectedFeatures, "airConditioner") },
      { name: "Solar", price: getPrice(productData, selectedFeatures, "solarPanel") },
      { name: "Gas", price: getPrice(productData, selectedFeatures, "naturalGas") },
    ],

    bathroomBreakdown: [
      { name: "Shower", price: getPrice(productData, selectedFeatures, "shower") },
      { name: "Sink", price: getPrice(productData, selectedFeatures, "sink") },
      { name: "Toilet", price: getPrice(productData, selectedFeatures, "toilet") },
    ],
  }
}
