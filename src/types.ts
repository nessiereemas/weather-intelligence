export interface GeoLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string;
  timezone?: string;
}

export type TemperatureUnit = 'C' | 'F';

export interface CurrentWeather {
  time: string;
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  isDay: boolean;
  precipitation: number;
  weatherCode: number;
  cloudCover: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  uvIndex: number;
}

export interface DailyForecast {
  date: string;
  dayName: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitationProbabilityMax: number;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
}

export interface HourlyForecast {
  time: string;
  hour: string;
  temperature: number;
  precipitationProbability: number;
  weatherCode: number;
}

export interface WeatherData {
  location: GeoLocation;
  current: CurrentWeather;
  daily: DailyForecast[];
  hourly: HourlyForecast[];
  fetchedAt: string;
  unit: TemperatureUnit;
}

export type RecommendationStatus = 'optimal' | 'caution' | 'warning';

export interface PlanningRecommendation {
  id: string;
  category: 'outdoor' | 'clothing' | 'travel' | 'health';
  categoryLabel: string;
  title: string;
  status: RecommendationStatus;
  statusLabel: string;
  summary: string;
  details: string;
  tips: string[];
}

export interface WeatherConditionInfo {
  code: number;
  label: string;
  iconName: string;
  description: string;
  gradient: string;
  badgeBg: string;
  badgeText: string;
}
