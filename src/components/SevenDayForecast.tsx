import React from 'react';
import { Calendar, Droplets, ArrowUp, ArrowDown, Sun } from 'lucide-react';
import { DailyForecast, TemperatureUnit } from '../types';
import { getWeatherConditionInfo } from '../services/weatherApi';
import { WeatherIcon } from './WeatherIcon';

interface SevenDayForecastProps {
  daily: DailyForecast[];
  unit: TemperatureUnit;
}

export const SevenDayForecast: React.FC<SevenDayForecastProps> = ({ daily, unit }) => {
  if (!daily || daily.length === 0) return null;

  // Calculate global min and max across all 7 days for the proportional bar
  const allMin = Math.min(...daily.map((d) => d.tempMin));
  const allMax = Math.max(...daily.map((d) => d.tempMax));
  const tempRange = Math.max(allMax - allMin, 1);

  return (
    <div
      id="seven-day-forecast-section"
      className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-sky-400" />
          <h2 className="text-base font-semibold text-white tracking-tight">
            7-Day Extended Forecast
          </h2>
        </div>
        <span className="text-xs text-slate-400">Open-Meteo High-Resolution Model</span>
      </div>

      <div className="divide-y divide-slate-800/80">
        {daily.map((day, idx) => {
          const condition = getWeatherConditionInfo(day.weatherCode, true);
          const isToday = idx === 0;

          // Calculate bar offsets
          const leftPercent = ((day.tempMin - allMin) / tempRange) * 100;
          const barWidthPercent = Math.max(((day.tempMax - day.tempMin) / tempRange) * 100, 8);

          return (
            <div
              key={day.date}
              className={`py-3.5 px-2 sm:px-3 rounded-xl transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isToday ? 'bg-slate-800/40' : 'hover:bg-slate-800/20'
              }`}
            >
              {/* Day name & date */}
              <div className="w-full sm:w-36 flex items-center justify-between sm:justify-start gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-semibold text-sm ${
                      isToday ? 'text-sky-400 font-bold' : 'text-slate-100'
                    }`}
                  >
                    {day.dayName}
                  </span>
                  {isToday && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      Today
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400 sm:hidden">
                  {new Date(day.date + 'T12:00:00').toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>

              {/* Condition & Rain Chance */}
              <div className="flex items-center gap-3 sm:w-52">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sky-400 shrink-0">
                  <WeatherIcon name={condition.iconName} className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-200 truncate max-w-[130px]">
                    {condition.label}
                  </span>
                  {day.precipitationProbabilityMax > 0 ? (
                    <div className="flex items-center gap-1 text-[11px] text-sky-400">
                      <Droplets className="w-3 h-3" />
                      <span>{day.precipitationProbabilityMax}% rain</span>
                    </div>
                  ) : (
                    <span className="text-[11px] text-slate-400">Dry</span>
                  )}
                </div>
              </div>

              {/* Temperature Bar & Numbers */}
              <div className="flex-1 flex items-center gap-3 sm:max-w-xs w-full">
                <span className="text-xs font-semibold text-sky-400 w-8 text-right">
                  {day.tempMin}°
                </span>

                {/* Range bar */}
                <div className="flex-1 h-2 bg-slate-800 rounded-full relative overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-400 via-amber-400 to-rose-400"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${barWidthPercent}%`,
                    }}
                  />
                </div>

                <span className="text-xs font-semibold text-rose-400 w-8 text-left">
                  {day.tempMax}°
                </span>
              </div>

              {/* UV Max Badge */}
              <div className="hidden md:flex items-center justify-end w-20 text-[11px] text-slate-400 gap-1">
                <Sun className="w-3 h-3 text-amber-400" />
                <span>UV {day.uvIndexMax}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
