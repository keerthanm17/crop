type FormData = {
  soilType: string
  cropType: string
  ph: number
  Moisture: number
}

type Recommendation = {
  parameter: string
  type: "success" | "warning"
  message: string
  action: string
}

export function analyzeData(data: FormData) {
  const recommendations: Recommendation[] = []

  // Check pH levels
  if (data.ph < 5.5) {
    recommendations.push({
      parameter: "Soil pH (Acidic)",
      type: "warning",
      message: `Your soil pH of ${data.ph} is too acidic for most crops. This can limit nutrient availability and affect plant growth.`,
      action:
        "Apply agricultural lime to raise pH. The recommended application rate is 2-3 tons per hectare, depending on soil type and current pH level.",
    })
  } else if (data.ph > 7.5) {
    recommendations.push({
      parameter: "Soil pH (Alkaline)",
      type: "warning",
      message: `Your soil pH of ${data.ph} is too alkaline for most crops. This can cause micronutrient deficiencies and affect plant growth.`,
      action:
        "Apply agricultural sulfur or gypsum to lower pH. For sulfur, apply 300-500 kg per hectare. For gypsum, apply 1-2 tons per hectare.",
    })
  } else {
    recommendations.push({
      parameter: "Soil pH (Optimal)",
      type: "success",
      message: `Your soil pH of ${data.ph} is within the optimal range for most crops.`,
      action: "Continue monitoring pH levels annually to ensure they remain in the optimal range.",
    })
  }

  // Check Moisture
  if (data.Moisture < 40) {
    recommendations.push({
      parameter: "Moisture - Low",
      type: "warning",
      message: `Your Moisture level of ${data.Moisture}% is low. Low Moisture can lead to increased water stress and reduced crop yield.`,
      action:
        "Consider irrigation methods that increase Moisture such as drip irrigation or micro-sprinklers. Mulching can also help retain soil moisture and increase local Moisture.",
    })
  } else if (data.Moisture > 80) {
    recommendations.push({
      parameter: "Moisture - High",
      type: "warning",
      message: `Your Moisture level of ${data.Moisture}% is high. High Moisture can increase the risk of fungal diseases and affect pollination.`,
      action:
        "Ensure good air circulation by proper spacing between plants. Consider raised beds for better drainage. Monitor for fungal diseases and apply preventative fungicides if necessary.",
    })
  } else {
    recommendations.push({
      parameter: "Moisture - Optimal",
      type: "success",
      message: `Your Moisture level of ${data.Moisture}% is within the optimal range for most crops.`,
      action:
        "Continue monitoring Moisture levels and adjust irrigation practices as needed based on weather conditions.",
    })
  }

  // Crop-specific recommendations based on soil type
  const cropSoilRecommendation = getCropSoilRecommendation(data.cropType, data.soilType)
  if (cropSoilRecommendation) {
    recommendations.push(cropSoilRecommendation)
  }

  return {
    success: true,
    recommendations: recommendations,
  }
}

function getCropSoilRecommendation(cropType: string, soilType: string): Recommendation | null {
  // This is a simplified version - in a real application, you would have a more comprehensive database
  // of crop-soil compatibility and specific recommendations

  const cropSoilMatrix: Record<string, Record<string, { suitable: boolean; message: string; action: string }>> = {
    // Cereals
    rice: {
      clay_soil: {
        suitable: true,
        message: "Clay soil is well-suited for rice cultivation due to its water retention properties.",
        action: "Ensure proper leveling of fields for uniform water distribution. Add organic matter to improve soil structure over time.",
      },
      sandy_soil: {
        suitable: false,
        message: "Sandy soil is not ideal for rice cultivation due to poor water retention.",
        action: "Add organic matter and clay to improve water retention. Consider alternative crops better suited to sandy soils.",
      },
      alluvial_soil: {
        suitable: true,
        message: "Alluvial soil is excellent for rice cultivation due to its fertility and water retention.",
        action: "Maintain proper water management and apply balanced fertilizers based on soil testing.",
      },
      black_soil: {
        suitable: true,
        message: "Black soil is suitable for rice cultivation with proper water management.",
        action: "Implement proper drainage and maintain water levels. Add organic matter to improve soil structure.",
      },
      red_soil: {
        suitable: false,
        message: "Red soil is not ideal for rice due to poor water retention.",
        action: "Add organic matter and implement proper water management. Consider alternative crops.",
      },
      laterite_soil: {
        suitable: false,
        message: "Laterite soil is not suitable for rice due to poor water retention and nutrient availability.",
        action: "Consider alternative crops better suited to laterite soils.",
      },
      loamy_soil: {
        suitable: true,
        message: "Loamy soil is suitable for rice cultivation with proper water management.",
        action: "Maintain proper water levels and add organic matter for better soil structure.",
      },
      sandy_loam: {
        suitable: false,
        message: "Sandy loam is not ideal for rice due to moderate water retention.",
        action: "Add clay and organic matter to improve water retention. Consider alternative crops.",
      },
      silty_soil: {
        suitable: true,
        message: "Silty soil is suitable for rice cultivation due to good water retention.",
        action: "Maintain proper water management and add organic matter for better soil structure.",
      },
    },
    wheat: {
      loamy_soil: {
        suitable: true,
        message: "Loamy soil is ideal for wheat cultivation due to its balanced properties.",
        action: "Maintain organic matter content through crop residue incorporation. Follow recommended fertilizer application rates.",
      },
      black_soil: {
        suitable: true,
        message: "Black soil is well-suited for wheat cultivation due to its moisture retention and nutrient content.",
        action: "Implement proper drainage to prevent waterlogging. Rotate with legumes to maintain soil fertility.",
      },
      sandy_soil: {
        suitable: false,
        message: "Sandy soil is not ideal for wheat cultivation due to poor water and nutrient retention.",
        action: "Add organic matter and clay to improve soil structure. Consider alternative crops better suited to sandy soils.",
      },
      alluvial_soil: {
        suitable: true,
        message: "Alluvial soil is excellent for wheat cultivation due to its fertility.",
        action: "Maintain proper drainage and apply balanced fertilizers. Monitor soil moisture levels.",
      },
      red_soil: {
        suitable: true,
        message: "Red soil can support wheat cultivation with proper management.",
        action: "Add organic matter and maintain proper soil pH. Monitor nutrient levels.",
      },
      laterite_soil: {
        suitable: false,
        message: "Laterite soil is not ideal for wheat due to poor nutrient availability.",
        action: "Add organic matter and maintain proper soil pH. Consider alternative crops.",
      },
      clay_soil: {
        suitable: true,
        message: "Clay soil can support wheat cultivation with proper management.",
        action: "Ensure proper drainage and maintain soil structure. Monitor soil moisture levels.",
      },
      sandy_loam: {
        suitable: true,
        message: "Sandy loam is suitable for wheat cultivation with proper management.",
        action: "Add organic matter and maintain proper soil moisture. Monitor nutrient levels.",
      },
      silty_soil: {
        suitable: true,
        message: "Silty soil is suitable for wheat cultivation with proper management.",
        action: "Maintain proper drainage and soil structure. Monitor soil moisture levels.",
      },
    },
    maize: {
      loamy_soil: {
        suitable: true,
        message: "Loamy soil is ideal for maize cultivation due to its balanced properties.",
        action: "Maintain soil organic matter and ensure proper drainage. Monitor soil nutrient levels.",
      },
      black_soil: {
        suitable: true,
        message: "Black soil is well-suited for maize cultivation due to its moisture retention.",
        action: "Implement proper drainage and maintain soil structure. Monitor soil moisture levels.",
      },
      sandy_soil: {
        suitable: false,
        message: "Sandy soil is not ideal for maize cultivation due to poor water retention.",
        action: "Add organic matter to improve water retention. Consider alternative crops better suited to sandy soils.",
      },
      alluvial_soil: {
        suitable: true,
        message: "Alluvial soil is excellent for maize cultivation due to its fertility.",
        action: "Maintain proper drainage and apply balanced fertilizers. Monitor soil moisture levels.",
      },
      red_soil: {
        suitable: true,
        message: "Red soil can support maize cultivation with proper management.",
        action: "Add organic matter and maintain proper soil pH. Monitor nutrient levels.",
      },
      laterite_soil: {
        suitable: false,
        message: "Laterite soil is not ideal for maize due to poor nutrient availability.",
        action: "Add organic matter and maintain proper soil pH. Consider alternative crops.",
      },
      clay_soil: {
        suitable: true,
        message: "Clay soil can support maize cultivation with proper management.",
        action: "Ensure proper drainage and maintain soil structure. Monitor soil moisture levels.",
      },
      sandy_loam: {
        suitable: true,
        message: "Sandy loam is suitable for maize cultivation with proper management.",
        action: "Add organic matter and maintain proper soil moisture. Monitor nutrient levels.",
      },
      silty_soil: {
        suitable: true,
        message: "Silty soil is suitable for maize cultivation with proper management.",
        action: "Maintain proper drainage and soil structure. Monitor soil moisture levels.",
      },
    },
    // Pulses
    black_gram: {
      black_soil: {
        suitable: true,
        message: "Black soil is well-suited for black gram cultivation.",
        action: "Implement proper drainage and maintain soil structure. Monitor soil moisture levels.",
      },
      red_soil: {
        suitable: true,
        message: "Red soil is suitable for black gram cultivation with proper management.",
        action: "Add organic matter and maintain proper soil pH. Monitor nutrient levels.",
      },
      sandy_soil: {
        suitable: false,
        message: "Sandy soil is not ideal for black gram due to poor water retention.",
        action: "Add organic matter to improve water retention. Consider alternative crops.",
      },
      alluvial_soil: {
        suitable: true,
        message: "Alluvial soil is excellent for black gram cultivation.",
        action: "Maintain proper drainage and apply balanced fertilizers. Monitor soil moisture levels.",
      },
    },
    green_gram: {
      sandy_soil: {
        suitable: true,
        message: "Sandy soil is suitable for green gram cultivation due to good drainage.",
        action: "Add organic matter to improve water retention. Monitor soil moisture levels.",
      },
      red_soil: {
        suitable: true,
        message: "Red soil is well-suited for green gram cultivation.",
        action: "Maintain proper soil pH and add organic matter. Monitor nutrient levels.",
      },
      black_soil: {
        suitable: true,
        message: "Black soil can support green gram cultivation with proper management.",
        action: "Ensure proper drainage and maintain soil structure. Monitor soil moisture levels.",
      },
    },
    // Oilseeds
    groundnut: {
      sandy_soil: {
        suitable: true,
        message: "Sandy soil is well-suited for groundnut cultivation due to its good drainage and aeration.",
        action: "Add organic matter to improve water retention. Ensure proper calcium levels for pod development.",
      },
      red_soil: {
        suitable: true,
        message: "Red soil can support groundnut cultivation with proper management.",
        action: "Add organic matter and ensure proper calcium levels. Monitor soil moisture during pod development.",
      },
      laterite_soil: {
        suitable: false,
        message: "Laterite soil is challenging for groundnut due to its poor water retention and nutrient availability.",
        action: "Add organic matter and gypsum to improve soil structure. Consider raised beds for better drainage.",
      },
      black_soil: {
        suitable: true,
        message: "Black soil is suitable for groundnut cultivation with proper management.",
        action: "Ensure proper drainage and maintain soil structure. Monitor calcium levels for pod development.",
      },
      alluvial_soil: {
        suitable: true,
        message: "Alluvial soil is excellent for groundnut cultivation.",
        action: "Maintain proper drainage and apply balanced fertilizers. Monitor soil moisture levels.",
      },
    },
    sunflower: {
      black_soil: {
        suitable: true,
        message: "Black soil is well-suited for sunflower cultivation.",
        action: "Implement proper drainage and maintain soil structure. Monitor soil moisture levels.",
      },
      red_soil: {
        suitable: true,
        message: "Red soil is suitable for sunflower cultivation with proper management.",
        action: "Add organic matter and maintain proper soil pH. Monitor nutrient levels.",
      },
      sandy_soil: {
        suitable: false,
        message: "Sandy soil is not ideal for sunflower due to poor water retention.",
        action: "Add organic matter to improve water retention. Consider alternative crops.",
      },
    },
    // Commercial Crops
    cotton: {
      black_soil: {
        suitable: true,
        message: "Black soil is excellent for cotton cultivation due to its moisture retention and nutrient content.",
        action: "Implement proper drainage to prevent waterlogging during heavy rains. Rotate with legumes to maintain soil fertility.",
      },
      red_soil: {
        suitable: true,
        message: "Red soil can support cotton cultivation with proper management.",
        action: "Add organic matter to improve water retention. Apply balanced fertilizers to address potential nutrient deficiencies.",
      },
      alluvial_soil: {
        suitable: true,
        message: "Alluvial soil is well-suited for cotton cultivation due to its fertility.",
        action: "Maintain proper drainage and apply balanced fertilizers. Monitor soil moisture levels.",
      },
    },
    sugarcane: {
      alluvial_soil: {
        suitable: true,
        message: "Alluvial soil is ideal for sugarcane cultivation due to its fertility and water retention.",
        action: "Maintain proper irrigation and apply balanced fertilizers. Monitor soil salinity levels.",
      },
      black_soil: {
        suitable: true,
        message: "Black soil is well-suited for sugarcane cultivation due to its moisture retention.",
        action: "Implement proper drainage and maintain soil organic matter. Monitor for waterlogging.",
      },
      red_soil: {
        suitable: true,
        message: "Red soil can support sugarcane cultivation with proper management.",
        action: "Add organic matter and maintain proper irrigation. Monitor soil fertility levels.",
      },
    },
    // Vegetables
    tomato: {
      loamy_soil: {
        suitable: true,
        message: "Loamy soil is ideal for tomato cultivation due to its balanced properties.",
        action: "Maintain soil organic matter and ensure proper drainage. Monitor soil pH and nutrient levels.",
      },
      sandy_loam: {
        suitable: true,
        message: "Sandy loam is well-suited for tomato cultivation due to its good drainage.",
        action: "Add organic matter to improve water retention. Implement drip irrigation for efficient water use.",
      },
      black_soil: {
        suitable: true,
        message: "Black soil can support tomato cultivation with proper management.",
        action: "Ensure proper drainage and maintain soil structure. Monitor soil moisture levels.",
      },
      red_soil: {
        suitable: true,
        message: "Red soil is suitable for tomato cultivation with proper management.",
        action: "Add organic matter and maintain proper soil pH. Monitor nutrient levels.",
      },
    },
    onion: {
      sandy_loam: {
        suitable: true,
        message: "Sandy loam is ideal for onion cultivation due to its good drainage.",
        action: "Add organic matter and maintain proper soil moisture. Monitor nutrient levels.",
      },
      loamy_soil: {
        suitable: true,
        message: "Loamy soil is well-suited for onion cultivation.",
        action: "Maintain proper drainage and soil structure. Monitor soil moisture levels.",
      },
      black_soil: {
        suitable: true,
        message: "Black soil can support onion cultivation with proper management.",
        action: "Ensure proper drainage and maintain soil structure. Monitor soil moisture levels.",
      },
    },
    // Fruits
    mango: {
      red_soil: {
        suitable: true,
        message: "Red soil is well-suited for mango cultivation due to its good drainage.",
        action: "Add organic matter and maintain proper soil pH. Implement proper irrigation during dry periods.",
      },
      laterite_soil: {
        suitable: true,
        message: "Laterite soil can support mango cultivation with proper management.",
        action: "Add organic matter and maintain proper soil pH. Implement proper irrigation and drainage.",
      },
      black_soil: {
        suitable: true,
        message: "Black soil is suitable for mango cultivation with proper management.",
        action: "Ensure proper drainage and maintain soil structure. Monitor soil moisture levels.",
      },
      alluvial_soil: {
        suitable: true,
        message: "Alluvial soil is excellent for mango cultivation.",
        action: "Maintain proper drainage and apply balanced fertilizers. Monitor soil moisture levels.",
      },
    },
    banana: {
      alluvial_soil: {
        suitable: true,
        message: "Alluvial soil is ideal for banana cultivation due to its fertility and water retention.",
        action: "Maintain proper irrigation and apply balanced fertilizers. Monitor soil moisture levels.",
      },
      black_soil: {
        suitable: true,
        message: "Black soil is well-suited for banana cultivation due to its moisture retention.",
        action: "Implement proper drainage and maintain soil organic matter. Monitor for waterlogging.",
      },
      red_soil: {
        suitable: true,
        message: "Red soil can support banana cultivation with proper management.",
        action: "Add organic matter and maintain proper irrigation. Monitor soil fertility levels.",
      },
    },
  }

  // Check if we have a recommendation for this crop-soil combination
  if (cropSoilMatrix[cropType]?.[soilType]) {
    const recommendation = cropSoilMatrix[cropType][soilType]
    return {
      parameter: `${getCropName(cropType)} on ${getSoilName(soilType)}`,
      type: recommendation.suitable ? "success" : "warning",
      message: recommendation.message,
      action: recommendation.action,
    }
  }

  // Generic recommendation if specific combination not found
  return {
    parameter: "Crop-Soil Compatibility",
    type: "warning",
    message: `We don't have specific data for ${getCropName(cropType)} on ${getSoilName(soilType)}. Consider consulting with a local agricultural extension service for tailored advice.`,
    action:
      "Conduct a small test plot before full-scale planting. Monitor crop performance closely and adjust practices as needed.",
  }
}

function getCropName(cropType: string): string {
  const cropMap: Record<string, string> = {
    rice: "Rice",
    wheat: "Wheat",
    maize: "Maize",
    cotton: "Cotton",
    groundnut: "Groundnut",
    sugarcane: "Sugarcane",
    tomato: "Tomato",
    mango: "Mango",
    black_gram: "Black Gram",
    green_gram: "Green Gram",
    bengal_gram: "Bengal Gram",
    horse_gram: "Horse Gram",
    tur: "Tur",
    sunflower: "Sunflower",
    soybean: "Soybean",
    sesame: "Sesame",
    onion: "Onion",
    green_chilli: "Green Chilli",
    beans: "Beans",
    brinjal: "Brinjal",
    banana: "Banana",
    papaya: "Papaya",
    grapes: "Grapes",
    sapota: "Sapota"
  }
  return cropMap[cropType] || cropType.charAt(0).toUpperCase() + cropType.slice(1).replace(/_/g, " ")
}

function getSoilName(soilType: string): string {
  const soilMap: Record<string, string> = {
    black_soil: "Black Soil",
    red_soil: "Red Soil",
    clay_soil: "Clay Soil",
    sandy_soil: "Sandy Soil",
    loamy_soil: "Loamy Soil",
    alluvial_soil: "Alluvial Soil",
    laterite_soil: "Laterite Soil",
    sandy_loam: "Sandy Loam",
    silty_soil: "Silty Soil"
  }
  return soilMap[soilType] || soilType.charAt(0).toUpperCase() + soilType.slice(1).replace(/_/g, " ")
}
