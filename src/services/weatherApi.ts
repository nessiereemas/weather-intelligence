import {
  CurrentWeather,
  DailyForecast,
  GeoLocation,
  HourlyForecast,
  PlanningRecommendation,
  TemperatureUnit,
  WeatherConditionInfo,
  WeatherData,
} from '../types';

export const DEFAULT_CITIES: GeoLocation[] = [
  {
    id: 5391959,
    name: 'San Francisco',
    latitude: 37.7749,
    longitude: -122.4194,
    country: 'United States',
    country_code: 'US',
    admin1: 'California',
    timezone: 'America/Los_Angeles',
  },
  {
    id: 5128581,
    name: 'New York',
    latitude: 40.7128,
    longitude: -74.006,
    country: 'United States',
    country_code: 'US',
    admin1: 'New York',
    timezone: 'America/New_York',
  },
  {
    id: 2643743,
    name: 'London',
    latitude: 51.5074,
    longitude: -0.1278,
    country: 'United Kingdom',
    country_code: 'GB',
    admin1: 'England',
    timezone: 'Europe/London',
  },
  {
    id: 1850147,
    name: 'Tokyo',
    latitude: 35.6895,
    longitude: 139.6917,
    country: 'Japan',
    country_code: 'JP',
    admin1: 'Tokyo',
    timezone: 'Asia/Tokyo',
  },
  {
    id: 2988507,
    name: 'Paris',
    latitude: 48.8566,
    longitude: 2.3522,
    country: 'France',
    country_code: 'FR',
    admin1: 'Île-de-France',
    timezone: 'Europe/Paris',
  },
  {
    id: 2147714,
    name: 'Sydney',
    latitude: -33.8688,
    longitude: 151.2093,
    country: 'Australia',
    country_code: 'AU',
    admin1: 'New South Wales',
    timezone: 'Australia/Sydney',
  },
];

export function getWeatherConditionInfo(code: number, isDay = true): WeatherConditionInfo {
  switch (code) {
    case 0:
      return {
        code,
        label: isDay ? 'Clear Sky' : 'Clear Night',
        iconName: isDay ? 'Sun' : 'Moon',
        description: 'Sunny and completely clear atmospheric conditions.',
        gradient: 'from-amber-500/20 via-sky-500/10 to-transparent',
        badgeBg: 'bg-amber-500/10 border-amber-500/30',
        badgeText: 'text-amber-700 dark:text-amber-300',
      };
    case 1:
      return {
        code,
        label: 'Mainly Clear',
        iconName: isDay ? 'SunDim' : 'Moon',
        description: 'Mostly bright with subtle intermittent clouds.',
        gradient: 'from-sky-500/20 via-blue-500/10 to-transparent',
        badgeBg: 'bg-sky-500/10 border-sky-500/30',
        badgeText: 'text-sky-700 dark:text-sky-300',
      };
    case 2:
      return {
        code,
        label: 'Partly Cloudy',
        iconName: isDay ? 'CloudSun' : 'CloudMoon',
        description: 'Scattered clouds with generous sunny intervals.',
        gradient: 'from-sky-400/20 via-slate-500/10 to-transparent',
        badgeBg: 'bg-sky-500/10 border-sky-500/30',
        badgeText: 'text-sky-700 dark:text-sky-300',
      };
    case 3:
      return {
        code,
        label: 'Overcast',
        iconName: 'Cloud',
        description: 'Continuous cloud layer with diffused ambient light.',
        gradient: 'from-slate-400/20 via-gray-500/10 to-transparent',
        badgeBg: 'bg-slate-500/10 border-slate-500/30',
        badgeText: 'text-slate-700 dark:text-slate-300',
      };
    case 45:
    case 48:
      return {
        code,
        label: code === 48 ? 'Depositing Rime Fog' : 'Foggy',
        iconName: 'CloudFog',
        description: 'Reduced visibility due to low-lying cloud condensation.',
        gradient: 'from-zinc-400/20 via-slate-500/10 to-transparent',
        badgeBg: 'bg-zinc-500/10 border-zinc-500/30',
        badgeText: 'text-zinc-700 dark:text-zinc-300',
      };
    case 51:
    case 53:
    case 55:
      return {
        code,
        label: 'Drizzle',
        iconName: 'CloudDrizzle',
        description: 'Fine light mist precipitation.',
        gradient: 'from-blue-400/20 via-sky-500/10 to-transparent',
        badgeBg: 'bg-blue-500/10 border-blue-500/30',
        badgeText: 'text-blue-700 dark:text-blue-300',
      };
    case 61:
      return {
        code,
        label: 'Slight Rain',
        iconName: 'CloudRain',
        description: 'Gentle showers with mild ground dampening.',
        gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
        badgeBg: 'bg-blue-500/10 border-blue-500/30',
        badgeText: 'text-blue-700 dark:text-blue-300',
      };
    case 63:
      return {
        code,
        label: 'Moderate Rain',
        iconName: 'CloudRain',
        description: 'Steady rainfall across the area.',
        gradient: 'from-blue-600/25 via-indigo-500/15 to-transparent',
        badgeBg: 'bg-blue-600/10 border-blue-600/30',
        badgeText: 'text-blue-800 dark:text-blue-200',
      };
    case 65:
      return {
        code,
        label: 'Heavy Rain',
        iconName: 'CloudRain',
        description: 'Substantial downpour and rapid water accumulation.',
        gradient: 'from-blue-700/30 via-indigo-600/20 to-transparent',
        badgeBg: 'bg-blue-700/15 border-blue-700/40',
        badgeText: 'text-blue-800 dark:text-blue-200',
      };
    case 71:
    case 73:
    case 75:
    case 77:
      return {
        code,
        label: code === 75 ? 'Heavy Snow' : 'Snowfall',
        iconName: 'CloudSnow',
        description: 'Crisp snowfall with cold ambient ground temperatures.',
        gradient: 'from-cyan-400/25 via-sky-300/15 to-transparent',
        badgeBg: 'bg-cyan-500/15 border-cyan-500/30',
        badgeText: 'text-cyan-800 dark:text-cyan-200',
      };
    case 80:
    case 81:
    case 82:
      return {
        code,
        label: 'Rain Showers',
        iconName: 'CloudRain',
        description: 'Passing rain squalls with variable intensity.',
        gradient: 'from-sky-600/25 via-blue-500/15 to-transparent',
        badgeBg: 'bg-sky-600/10 border-sky-600/30',
        badgeText: 'text-sky-800 dark:text-sky-200',
      };
    case 85:
    case 86:
      return {
        code,
        label: 'Snow Showers',
        iconName: 'CloudSnow',
        description: 'Intermittent flurries and gusty winter snow showers.',
        gradient: 'from-indigo-400/20 via-cyan-400/15 to-transparent',
        badgeBg: 'bg-indigo-500/15 border-indigo-500/30',
        badgeText: 'text-indigo-800 dark:text-indigo-200',
      };
    case 95:
    case 96:
    case 99:
      return {
        code,
        label: code >= 96 ? 'Severe Thunderstorm & Hail' : 'Thunderstorm',
        iconName: 'CloudLightning',
        description: 'Active electrical storm with gusts and localized downpours.',
        gradient: 'from-purple-600/30 via-amber-500/15 to-transparent',
        badgeBg: 'bg-purple-500/15 border-purple-500/40',
        badgeText: 'text-purple-800 dark:text-purple-200',
      };
    default:
      return {
        code,
        label: 'Variable Weather',
        iconName: 'Cloud',
        description: 'Atmospheric conditions within typical seasonal ranges.',
        gradient: 'from-slate-400/20 via-zinc-400/10 to-transparent',
        badgeBg: 'bg-slate-500/10 border-slate-500/30',
        badgeText: 'text-slate-700 dark:text-slate-300',
      };
  }
}

export async function searchCities(query: string): Promise<GeoLocation[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];

  // Fetch up to 12 items so deduplication leaves a clean, rich list of up to 8 unique cities
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    trimmed
  )}&count=12&language=en&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Geocoding failed: HTTP ${response.status}`);
    }
    const data = await response.json();
    if (!data.results || !Array.isArray(data.results)) {
      return [];
    }

    // Filter and deduplicate results
    // Open-Meteo geocoding returns multiple entries for city-states (e.g. 'PPLC' capital city vs 'PCLI' country entity for Singapore or Monaco)
    // or entries with identical display names and nearby coordinates.
    const uniqueList: GeoLocation[] = [];
    const seenSignatures = new Set<string>();

    for (const item of data.results) {
      const name = (item.name || '').trim();
      const country = (item.country || '').trim();
      const admin1 = (item.admin1 || '').trim();
      const lat = item.latitude;
      const lon = item.longitude;

      if (!name) continue;

      // Primary signature: name + administrative region + country
      const textSig = `${name.toLowerCase()}|${admin1.toLowerCase()}|${country.toLowerCase()}`;

      // Proximity check: check if an entry with the exact same name and country is within ~25km (< 0.25 deg)
      const isNearbyDuplicate = uniqueList.some(
        (existing) =>
          existing.name.toLowerCase() === name.toLowerCase() &&
          existing.country.toLowerCase() === country.toLowerCase() &&
          Math.abs(existing.latitude - lat) < 0.25 &&
          Math.abs(existing.longitude - lon) < 0.25
      );

      if (seenSignatures.has(textSig) || isNearbyDuplicate) {
        continue;
      }

      seenSignatures.add(textSig);
      uniqueList.push({
        id: item.id,
        name,
        latitude: lat,
        longitude: lon,
        country,
        country_code: item.country_code || '',
        admin1,
        timezone: item.timezone || 'auto',
      });

      if (uniqueList.length >= 8) break;
    }

    return uniqueList;
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    return [];
  }
}

export async function fetchWeatherForLocation(
  location: GeoLocation,
  unit: TemperatureUnit = 'C'
): Promise<WeatherData> {
  const tempUnitParam = unit === 'F' ? 'fahrenheit' : 'celsius';
  const windUnitParam = unit === 'F' ? 'mph' : 'kmh';

  const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,uv_index&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&temperature_unit=${tempUnitParam}&wind_speed_unit=${windUnitParam}&timezone=auto`;

  const response = await fetch(forecastUrl);
  if (!response.ok) {
    throw new Error(`Weather fetch failed: HTTP ${response.status}`);
  }

  const data = await response.json();
  const currentRaw = data.current;
  const dailyRaw = data.daily;
  const hourlyRaw = data.hourly;

  const current: CurrentWeather = {
    time: currentRaw.time,
    temperature: Math.round(currentRaw.temperature_2m * 10) / 10,
    apparentTemperature: Math.round(currentRaw.apparent_temperature * 10) / 10,
    relativeHumidity: currentRaw.relative_humidity_2m ?? 0,
    isDay: currentRaw.is_day === 1,
    precipitation: currentRaw.precipitation ?? 0,
    weatherCode: currentRaw.weather_code ?? 0,
    cloudCover: currentRaw.cloud_cover ?? 0,
    pressure: Math.round(currentRaw.pressure_msl ?? 1013),
    windSpeed: Math.round((currentRaw.wind_speed_10m ?? 0) * 10) / 10,
    windDirection: currentRaw.wind_direction_10m ?? 0,
    uvIndex: Math.round((currentRaw.uv_index ?? 0) * 10) / 10,
  };

  const daily: DailyForecast[] = [];
  if (dailyRaw && dailyRaw.time) {
    for (let i = 0; i < Math.min(dailyRaw.time.length, 7); i++) {
      const dateStr = dailyRaw.time[i];
      const dateObj = new Date(dateStr + 'T12:00:00');
      const dayName =
        i === 0
          ? 'Today'
          : i === 1
          ? 'Tomorrow'
          : dateObj.toLocaleDateString('en-US', { weekday: 'short' });

      daily.push({
        date: dateStr,
        dayName,
        weatherCode: dailyRaw.weather_code[i] ?? 0,
        tempMax: Math.round(dailyRaw.temperature_2m_max[i]),
        tempMin: Math.round(dailyRaw.temperature_2m_min[i]),
        precipitationProbabilityMax:
          dailyRaw.precipitation_probability_max?.[i] ?? 0,
        sunrise: dailyRaw.sunrise?.[i] ? dailyRaw.sunrise[i].split('T')[1] : '--:--',
        sunset: dailyRaw.sunset?.[i] ? dailyRaw.sunset[i].split('T')[1] : '--:--',
        uvIndexMax: Math.round(dailyRaw.uv_index_max?.[i] ?? 0),
      });
    }
  }

  // Next 24 hours starting from current hour
  const hourly: HourlyForecast[] = [];
  if (hourlyRaw && hourlyRaw.time) {
    const currentIsoHour = current.time.slice(0, 13); // e.g. "2026-09-18T12"
    let startIndex = hourlyRaw.time.findIndex((t: string) => t.startsWith(currentIsoHour));
    if (startIndex === -1) startIndex = 0;

    for (let i = startIndex; i < Math.min(startIndex + 24, hourlyRaw.time.length); i++) {
      const timeStr = hourlyRaw.time[i];
      const hourPart = timeStr.split('T')[1] || '';
      const hourNum = parseInt(hourPart.split(':')[0], 10);
      const ampm = hourNum >= 12 ? 'PM' : 'AM';
      const formattedHour = i === startIndex ? 'Now' : `${((hourNum + 11) % 12) + 1} ${ampm}`;

      hourly.push({
        time: timeStr,
        hour: formattedHour,
        temperature: Math.round(hourlyRaw.temperature_2m[i]),
        precipitationProbability: hourlyRaw.precipitation_probability?.[i] ?? 0,
        weatherCode: hourlyRaw.weather_code?.[i] ?? 0,
      });
    }
  }

  return {
    location,
    current,
    daily,
    hourly,
    fetchedAt: new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    unit,
  };
}

export function generateRecommendations(
  current: CurrentWeather,
  dailyToday: DailyForecast | undefined,
  hourly: HourlyForecast[],
  unit: TemperatureUnit
): PlanningRecommendation[] {
  // Normalize temperature to Celsius for uniform threshold evaluations
  const tempC = unit === 'F' ? ((current.temperature - 32) * 5) / 9 : current.temperature;
  const feelsLikeC =
    unit === 'F'
      ? ((current.apparentTemperature - 32) * 5) / 9
      : current.apparentTemperature;
  const windKmh = unit === 'F' ? current.windSpeed * 1.60934 : current.windSpeed;
  const rainChance = dailyToday?.precipitationProbabilityMax ?? 0;
  const isRaining =
    [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(current.weatherCode) ||
    current.precipitation > 0;
  const isStorming = [95, 96, 99].includes(current.weatherCode);
  const isSnowing = [71, 73, 75, 77, 85, 86].includes(current.weatherCode);

  const recs: PlanningRecommendation[] = [];

  // 1. Outdoor Activity & Sports
  if (isStorming) {
    recs.push({
      id: 'rec-outdoor',
      category: 'outdoor',
      categoryLabel: 'Outdoor Sports & Activities',
      title: 'Thunderstorms in Area — Stay Indoors',
      status: 'warning',
      statusLabel: 'Avoid Outdoor Activities',
      summary:
        'Active lightning or severe convection poses safety hazards for outdoor recreation.',
      details:
        'Postpone cycling, running, open-field sports, and water activities until the storm cell passes completely.',
      tips: [
        'Shift workouts indoors to a gym or home setup',
        'Avoid open fields, tall trees, and exposed ridgelines',
        'Monitor local radar for storm clearance time',
      ],
    });
  } else if (isRaining || rainChance > 60) {
    recs.push({
      id: 'rec-outdoor',
      category: 'outdoor',
      categoryLabel: 'Outdoor Sports & Activities',
      title: 'Wet Conditions Expected',
      status: 'caution',
      statusLabel: 'Moderate Caution',
      summary: `High probability of precipitation (${rainChance}% peak). Roads and trails will be slick.`,
      details:
        'If exercising outside, choose paved courses with good drainage and wear high-traction waterproof footwear.',
      tips: [
        'Select moisture-resistant technical fabrics',
        'Be mindful of slippery painted road markings and wet leaves',
        'Consider covered sports facilities or indoor training',
      ],
    });
  } else if (tempC >= 32) {
    recs.push({
      id: 'rec-outdoor',
      category: 'outdoor',
      categoryLabel: 'Outdoor Sports & Activities',
      title: 'High Heat Advisory for Endurance',
      status: 'caution',
      statusLabel: 'Heat Caution',
      summary: `Ambient temperature around ${current.temperature}°${unit} creates elevated heat strain.`,
      details:
        'Schedule intensive workouts in early morning hours before solar heating peaks, or in late evening.',
      tips: [
        'Drink fluids with electrolytes every 20 minutes',
        'Rest in shaded intervals during training',
        'Wear lightweight, loose-fitting, light-colored fabrics',
      ],
    });
  } else if (tempC <= 2) {
    recs.push({
      id: 'rec-outdoor',
      category: 'outdoor',
      categoryLabel: 'Outdoor Sports & Activities',
      title: 'Cold Weather Training Protocol',
      status: 'caution',
      statusLabel: 'Cold Caution',
      summary: `Freezing or near-freezing chill (${current.temperature}°${unit}). Risk of muscle stiffness and ice.`,
      details:
        'Warm up thoroughly indoors before outdoor activity. Guard extremities against brisk wind chill.',
      tips: [
        'Wear wind-blocking outer shell, thermal gloves, and beanie',
        'Watch for black ice patches along shadowed trail curves',
        'Shorten rest periods to maintain elevated core body temperature',
      ],
    });
  } else if (windKmh > 40) {
    recs.push({
      id: 'rec-outdoor',
      category: 'outdoor',
      categoryLabel: 'Outdoor Sports & Activities',
      title: 'Brisk Wind Gusts Present',
      status: 'caution',
      statusLabel: 'Wind Caution',
      summary: `Sustained winds of ${current.windSpeed} ${unit === 'F' ? 'mph' : 'km/h'}.`,
      details:
        'Headwinds will noticeably impact cycling efficiency and open-air ball sports. Plan crosswind-protected routes.',
      tips: [
        'Opt for forested or urban shielded running paths',
        'Ensure eyewear fits securely against dust gusts',
        'Lower cycling aero profile on open roadway segments',
      ],
    });
  } else {
    recs.push({
      id: 'rec-outdoor',
      category: 'outdoor',
      categoryLabel: 'Outdoor Sports & Activities',
      title: 'Ideal Conditions for Outdoor Plans',
      status: 'optimal',
      statusLabel: 'Optimal Rating',
      summary: `Temperate conditions (${current.temperature}°${unit}) with manageable wind and no rain hindrance.`,
      details:
        'Excellent day for running, cycling, park gatherings, patio dining, and outdoor sightseeing.',
      tips: [
        'Take advantage of mild afternoon temperatures',
        'Great day for long-distance hiking or trail jogging',
        'Keep standard hydration handy for prolonged sessions',
      ],
    });
  }

  // 2. Clothing & Recommended Attire
  if (isSnowing || tempC <= 0) {
    recs.push({
      id: 'rec-clothing',
      category: 'clothing',
      categoryLabel: 'Attire & Wardrobe Guidance',
      title: 'Heavy Winter Insulation Required',
      status: 'caution',
      statusLabel: 'Thermal Layering',
      summary: 'Freezing temperatures demand multi-layer insulating garments.',
      details:
        'Base thermal layer (merino wool/polypropylene) + fleece mid-layer + windproof down parka.',
      tips: [
        'Insulated waterproof boots with deep lug tread',
        'Thermal beanies and windproof fleece-lined gloves',
        'Wool socks to prevent moisture buildup and heat loss',
      ],
    });
  } else if (isRaining || rainChance >= 50) {
    recs.push({
      id: 'rec-clothing',
      category: 'clothing',
      categoryLabel: 'Attire & Wardrobe Guidance',
      title: 'Waterproof Outer Layer & Umbrella Essential',
      status: 'caution',
      statusLabel: 'Wet Weather Gear',
      summary: `Pack reliable water protection. Precipitation chance is ${rainChance}%.`,
      details:
        'Breathable hardshell rain jacket, water-resistant footwear, and a compact windproof umbrella.',
      tips: [
        'Avoid raw denim or heavy cotton trousers that soak through',
        'Carry a waterproof backpack rain cover for electronics',
        'Stash an umbrella in your daily bag before heading out',
      ],
    });
  } else if (tempC < 13) {
    recs.push({
      id: 'rec-clothing',
      category: 'clothing',
      categoryLabel: 'Attire & Wardrobe Guidance',
      title: 'Moderate Cool Weather Layers',
      status: 'optimal',
      statusLabel: 'Light Jacket / Sweater',
      summary: `Crisp air (${current.temperature}°${unit}). A jacket, sweater, or trench coat will keep you comfortable.`,
      details:
        'Layer a light sweater or cardigan over a breathable shirt with a medium-weight wind jacket.',
      tips: [
        'Easy-to-shed mid-layers adapt best between indoor heat and outdoor air',
        'Light scarf or neck warmer for brisk morning commutes',
        'Comfortable closed-toe leather or walking shoes',
      ],
    });
  } else if (tempC <= 24) {
    recs.push({
      id: 'rec-clothing',
      category: 'clothing',
      categoryLabel: 'Attire & Wardrobe Guidance',
      title: 'Comfortable Mild Weather Attire',
      status: 'optimal',
      statusLabel: 'Light & Breathable',
      summary: `Balanced temperatures (${current.temperature}°${unit}). Standard casual or smart casual wear.`,
      details:
        'Cotton t-shirts, light button-downs, chinos, or jeans. Keep a lightweight cardigan for the evening.',
      tips: [
        'Breathable sneakers or casual footwear',
        'UV sunglasses for afternoon clear sky periods',
        'Pack a packable windbreaker if staying out past sunset',
      ],
    });
  } else {
    recs.push({
      id: 'rec-clothing',
      category: 'clothing',
      categoryLabel: 'Attire & Wardrobe Guidance',
      title: 'Ultra-Light Summer Fabrics',
      status: 'optimal',
      statusLabel: 'Summer Wear',
      summary: `Warm climate (${current.temperature}°${unit}). Prioritize air circulation and sun defense.`,
      details:
        'Linen shirts, quick-dry shorts, airy cotton dresses, and wide-brim sun hats.',
      tips: [
        'Wear light colors to reflect direct solar radiation',
        'Breathable open or mesh footwear',
        'Polarized sunglasses for strong ambient glare',
      ],
    });
  }

  // 3. Commute & Travel Advisory
  if (isStorming || [45, 48].includes(current.weatherCode)) {
    recs.push({
      id: 'rec-travel',
      category: 'travel',
      categoryLabel: 'Commute & Travel Advisory',
      title: current.weatherCode >= 45 && current.weatherCode <= 48
        ? 'Dense Fog Affecting Road Visibility'
        : 'Severe Weather Transit Delays',
      status: 'warning',
      statusLabel: 'Travel Alert',
      summary:
        current.weatherCode >= 45 && current.weatherCode <= 48
          ? 'Impaired visibility below standard safety thresholds.'
          : 'Hazardous driving conditions with localized ponding and slow traffic.',
      details:
        'Allow an extra 15-25 minutes for vehicular transit. Maintain expanded following distances.',
      tips: [
        'Use low-beam headlights; avoid blinding high-beams in fog',
        'Double braking distance behind preceding vehicles',
        'Check transit and airport departure boards for potential delays',
      ],
    });
  } else if (isRaining || windKmh > 35) {
    recs.push({
      id: 'rec-travel',
      category: 'travel',
      categoryLabel: 'Commute & Travel Advisory',
      title: 'Wet Roads & Gusty Highway Buffeting',
      status: 'caution',
      statusLabel: 'Moderate Delays',
      summary: `Surface water and wind speeds of ${current.windSpeed} ${unit === 'F' ? 'mph' : 'km/h'}.`,
      details:
        'Highway lanes, bridges, and overpasses may experience sudden lateral wind shifts.',
      tips: [
        'Firm grip on steering wheel across elevated bridges',
        'Avoid sudden acceleration on metal bridge gratings or turns',
        'Ensure windshield wipers and washer fluid are primed',
      ],
    });
  } else {
    recs.push({
      id: 'rec-travel',
      category: 'travel',
      categoryLabel: 'Commute & Travel Advisory',
      title: 'Smooth & Clear Transit Conditions',
      status: 'optimal',
      statusLabel: 'Normal Commute',
      summary: 'Optimal visibility and dry pavement along major roadways.',
      details:
        'Zero weather-related travel disruptions anticipated across road and public transit networks.',
      tips: [
        'Standard commute timelines apply',
        'Great day for walking or bicycling to destination',
        'Keep sunglasses handy for low-angle sun glare during drive',
      ],
    });
  }

  // 4. Health & Sun Safety
  const uv = current.uvIndex;
  if (uv >= 8) {
    recs.push({
      id: 'rec-health',
      category: 'health',
      categoryLabel: 'Sun & Health Safety',
      title: 'Very High UV Exposure Warning',
      status: 'warning',
      statusLabel: `UV Index ${uv} (Very High)`,
      summary: 'Unprotected skin can burn within 15-20 minutes under direct midday sun.',
      details:
        'Seek shade between 10:00 AM and 4:00 PM. Broad-spectrum SPF 30+ sunscreen is mandatory.',
      tips: [
        'Reapply sunscreen every 2 hours if outdoors',
        'Wear UV400 polarized sunglasses to protect retina',
        'Drink ample water to counter elevated evaporative loss',
      ],
    });
  } else if (uv >= 5) {
    recs.push({
      id: 'rec-health',
      category: 'health',
      categoryLabel: 'Sun & Health Safety',
      title: 'Moderate UV Radiance',
      status: 'caution',
      statusLabel: `UV Index ${uv} (Moderate)`,
      summary: 'Sun protection recommended during midday and early afternoon hours.',
      details:
        'Apply SPF 30 sunscreen on exposed facial and neck skin when outdoors for more than 30 minutes.',
      tips: [
        'Sun hat recommended for prolonged garden or park visits',
        'Stay hydrated with regular water intake',
        'Take brief shade breaks when exposed to direct sun',
      ],
    });
  } else if (tempC < 5) {
    recs.push({
      id: 'rec-health',
      category: 'health',
      categoryLabel: 'Sun & Health Safety',
      title: 'Hydration & Skin Barrier Protection',
      status: 'optimal',
      statusLabel: 'Dry Cold Protocol',
      summary: `Cold temperatures (${current.temperature}°${unit}) accelerate skin moisture depletion.`,
      details:
        'Indoor heating paired with cool outdoor air strips moisture from lips and hands.',
      tips: [
        'Apply lip balm and moisturizing barrier cream',
        'Drink warm herbal teas and water regularly',
        'Use an indoor humidifier if air feels dry',
      ],
    });
  } else {
    recs.push({
      id: 'rec-health',
      category: 'health',
      categoryLabel: 'Sun & Health Safety',
      title: 'Low Environmental Stress Index',
      status: 'optimal',
      statusLabel: 'Low Stress',
      summary: 'Gentle atmospheric parameters with minimal skin and respiratory burden.',
      details:
        'Pleasant conditions suitable for all age groups, outdoor leisure, and open-window home ventilation.',
      tips: [
        'Enjoy natural daylight to support circadian balance',
        'Open windows for clean air cross-breeze if desired',
        'Maintain daily healthy hydration habits',
      ],
    });
  }

  return recs;
}
