import { Activity, Droplets, Leaf, Shield, Users, Zap } from 'lucide-react';

export const demoFarm = {
  farmName: 'Green Valley Farm',
  location: 'Karnataka',
  crop: 'Tomato',
  soilType: 'Red soil',
  season: 'Kharif',
  farmArea: 2,
  waterAvailability: 640,
  fertilizerBudget: 180000,
  electricityPrice: 7.2,
  dieselPrice: 92,
  laborAvailability: 14,
  expectedRainfall: 420,
  temperature: 31,
  humidity: 68
};

export const weatherData = {
  current: {
    temp: 31,
    humidity: 68,
    rainfall: 18,
    wind: 14
  },
  forecast: [
    { day: 'Mon', temp: 30, rain: 18 },
    { day: 'Tue', temp: 29, rain: 22 },
    { day: 'Wed', temp: 32, rain: 14 },
    { day: 'Thu', temp: 33, rain: 12 },
    { day: 'Fri', temp: 31, rain: 26 }
  ]
};

export const decisions = [
  'Reduce irrigation frequency during cloudy periods to save 8–12% water without affecting root health.',
  'Maintain balanced NPK application by splitting fertilizer into two top-dressings to reduce nutrient loss.',
  'Limit spray activity to sunrise or late evening when humidity is lower and spray suitability is better.',
  'Shift labor to harvest and mulch management during the next 5-day window to protect yield.'
];

export const buildIrrigationPlan = ({ waterAvailability, crop, farmArea }) => {
  const base = Math.max(20, Math.round((waterAvailability / 16) / farmArea));
  return [
    { stage: 'Seedling', allocation: Math.round(base * 0.6) },
    { stage: 'Vegetative', allocation: Math.round(base * 1.1) },
    { stage: 'Flowering', allocation: Math.round(base * 1.25) },
    { stage: 'Fruit development', allocation: Math.round(base * 1.4) }
  ];
};

export const buildNutrientBalance = ({ crop, farmArea, fertilizerBudget }) => {
  const nitrogen = 82;
  const phosphorus = 74;
  const potassium = 88;
  return {
    nitrogen,
    phosphorus,
    potassium,
    cost: Math.round(fertilizerBudget * 0.32),
    status: {
      Nitrogen: 82,
      Phosphorus: 74,
      Potassium: 88
    },
    plan: [
      { stage: 'Pre-planting', recommendation: 'Apply composted organic mix before transplanting' },
      { stage: 'Vegetative', recommendation: 'Top-dress 35% of N as split dose' },
      { stage: 'Flowering', recommendation: 'Use balanced NPK to support fruit set' }
    ]
  };
};

export const buildEnergySummary = ({ electricityPrice, dieselPrice, farmArea }) => {
  const electricityCost = Math.round((farmArea * 1600 * electricityPrice) / 6);
  const dieselCost = Math.round((farmArea * 1200 * dieselPrice) / 50);
  const savings = Math.round((electricityCost + dieselCost) * 0.16);
  return {
    electricityCost,
    dieselCost,
    solarFeasibility: 'High',
    savings,
    comparisonData: [
      { name: 'Electricity', cost: electricityCost },
      { name: 'Diesel', cost: dieselCost },
      { name: 'Solar', cost: Math.round((electricityCost + dieselCost) * 0.67) }
    ]
  };
};

export const buildLaborCalendar = ({ laborAvailability, farmArea, crop }) => {
  const requiredWorkers = Math.max(8, Math.round(farmArea * 5 + laborAvailability / 2));
  return {
    requiredWorkers,
    workdays: 18,
    seasonalDemand: 'Peak harvest window',
    cost: 42000,
    activities: [
      { week: 'W1', task: 'Transplanting and bed prep', workers: 10 },
      { week: 'W2', task: 'Irrigation and nutrient management', workers: 12 },
      { week: 'W3', task: 'Harvest planning', workers: 14 },
      { week: 'W4', task: 'Post-harvest sorting', workers: 8 }
    ]
  };
};

export const buildCropProtectionRisk = ({ temperature, humidity, crop }) => {
  const riskLevel = humidity > 60 && temperature > 30 ? 'Moderate' : 'Low';
  return {
    riskLevel,
    sprayWindow: '06:00–08:00',
    weatherTrigger: 'High humidity + warm nights',
    safetyNote: 'Follow label instructions; avoid mixing incompatible products.'
  };
};

export const resourcePlan = (farm) => {
  const waterRequirement = Math.round((farm.farmArea * 820) / 2) + 80;
  const fertilizerCost = Math.round(farm.fertilizerBudget * 0.28);
  const energyCost = Math.round((farm.farmArea * 5000) + (farm.electricityPrice * 1200));
  const laborCost = Math.round((farm.laborAvailability * 600) + (farm.farmArea * 6000));
  const groundwaterUse = Math.min(82, Math.round((100 - farm.expectedRainfall / 8) + 20));
  const efficiency = Math.max(70, Math.min(92, 85 - (farm.farmArea > 2 ? 3 : 0)));
  const shortageRisk = groundwaterUse > 70 ? 'Elevated' : 'Moderate';
  return {
    crop: farm.crop,
    waterRequirement,
    fertilizerCost,
    energyCost,
    laborCost,
    groundwaterUse,
    shortageRisk,
    efficiency,
    recommendations: decisions.slice(0, 3)
  };
};

export const cropRecommendations = [
  { name: 'Tomato', season: 'Kharif', waterNeed: 'High', soil: 'Well-drained loam', duration: '110–120 days', suitability: 'High fit' },
  { name: 'Maize', season: 'Kharif', waterNeed: 'Moderate', soil: 'Alluvial', duration: '100–110 days', suitability: 'High fit' },
  { name: 'Chickpea', season: 'Rabi', waterNeed: 'Low', soil: 'Black soil', duration: '90–120 days', suitability: 'Very good' },
  { name: 'Groundnut', season: 'Summer', waterNeed: 'Moderate', soil: 'Sandy loam', duration: '100–120 days', suitability: 'Good' }
];

export const wasteDetections = [
  {
    id: 1,
    domain: 'Water',
    issue: 'Excess irrigation cycles are creating runoff after rainfall events.',
    action: 'Reduce irrigation by 15% for the next two cycles and validate soil moisture.'
  },
  {
    id: 2,
    domain: 'Fertilizer',
    issue: 'Nitrogen top-dressing is higher than target during flowering.',
    action: 'Split applications and compare soil test values before the next dose.'
  },
  {
    id: 3,
    domain: 'Energy',
    issue: 'Pump runtime is above expected load during midday.',
    action: 'Shift pump operation to early morning hours to reduce peak power cost.'
  },
  {
    id: 4,
    domain: 'Labor',
    issue: 'Labor allocation overlaps with harvest and basal application.',
    action: 'Rebalance workforce by creating a staggered daily schedule.'
  }
];

export const budgetScenarios = [
  { label: 'Base plan', cost: 160000 },
  { label: 'Efficiency plan', cost: 142000 },
  { label: 'High-input plan', cost: 185000 }
];

export const buildSimulatorComparison = (farm, scenario) => {
  const current = 160000 + (farm.farmArea * 2500);
  const modified = current - (scenario.water * 0.07) + (scenario.electricityPrice * 2000) + (scenario.dieselPrice * 160);
  const delta = Math.round(modified - current);
  return {
    currentSavings: `₹${Math.round(current * 0.08)}`,
    modifiedCost: `₹${Math.round(modified)}`,
    costDelta: Math.abs(delta),
    tradeoff: delta > 0 ? 'Higher operating cost due to increased energy and input prices.' : 'Reduced cost due to better water and labor scheduling.'
  };
};

export const buildAIResponse = (question) => {
  const q = question.toLowerCase();
  if (q.includes('water')) return 'Reduce irrigation frequency by 10–15% during low-rainfall periods, use mulch to preserve soil moisture, and schedule pumping at early morning hours when pressure demand is lower.';
  if (q.includes('nutrient') || q.includes('fertilizer')) return 'Check the NPK balance before application. Split nitrogen into two applications and prioritize phosphorus during transplanting to support root growth.';
  if (q.includes('pest') || q.includes('risk')) return 'Monitor humidity, temperature, and canopy density. Favor preventive actions such as sanitation, trap crops, and favorable spray timing before visible damage spreads.';
  if (q.includes('energy')) return 'Compare electricity, diesel, and solar operating costs. In most cases, moving pump hours to off-peak periods and reducing runtime can reduce the energy bill.';
  if (q.includes('worker') || q.includes('labor')) return 'Estimate labor based on crop stage and farm area. For tomato, peak harvest weeks require more workers than routine irrigation days, so stagger tasks across the week.';
  if (q.includes('crop')) return 'For the current Kharif condition, tomato and maize are strong fits for a well-managed field. Consider water availability and soil type before finalizing.';
  return 'AgroSense recommends combining crop stage analysis, weather conditions, and input cost estimates before making operational changes. Focus on the limiting resource first.';
};

export default {
  demoFarm,
  weatherData,
  resourcePlan,
  cropRecommendations,
  wasteDetections,
  budgetScenarios,
  buildSimulatorComparison,
  buildAIResponse,
  buildIrrigationPlan,
  buildNutrientBalance,
  buildEnergySummary,
  buildLaborCalendar,
  buildCropProtectionRisk
};
