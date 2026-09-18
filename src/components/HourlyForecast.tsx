import React, { useRef } from 'react';
import { Clock, Droplets, ChevronLeft, ChevronRight } from 'lucide-react';
import { HourlyForecast as HourlyType, TemperatureUnit } from '../types';
import { getWeatherConditionInfo } from '../services/weatherApi';
import { WeatherIcon } from './WeatherIcon';

interface HourlyForecastProps {
  hourly: HourlyType[];
  unit: TemperatureUnit;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly, unit }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  if (!hourly || hourly.length === 0) return null;

  return (
    <div
      id="hourly-forecast-section"
      className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-sky-400" />
          <h2 className="text-base font-semibold text-white tracking-tight">
            Hourly Forecast (Next 24 Hours)
          </h2>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => handleScroll('left')}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal timeline */}
      <div
        ref={scrollRef}
        className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent snap-x"
        style={{ scrollbarWidth: 'thin' }}
      >
        {hourly.map((item, idx) => {
          const condition = getWeatherConditionInfo(item.weatherCode, true);
          const isNow = idx === 0;

          return (
            <div
              key={item.time}
              className={`flex-shrink-0 flex flex-col items-center justify-between w-20 py-3.5 px-2 rounded-xl border transition-all snap-start ${
                isNow
                  ? 'bg-sky-500/15 border-sky-500/40 text-white shadow-md shadow-sky-500/10'
                  : 'bg-slate-800/40 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              {/* Hour */}
              <span
                className={`text-xs font-medium ${
                  isNow ? 'text-sky-300 font-bold' : 'text-slate-400'
                }`}
              >
                {item.hour}
              </span>

              {/* Icon */}
              <div className="my-2.5 text-sky-400">
                <WeatherIcon name={condition.iconName} className="w-6 h-6" />
              </div>

              {/* Temperature */}
              <span className="text-sm font-bold text-white">
                {item.temperature}°
              </span>

              {/* Precipitation chance */}
              <div className="mt-2 flex items-center gap-0.5 text-[10px] text-sky-400 font-medium">
                {item.precipitationProbability > 0 ? (
                  <>
                    <Droplets className="w-2.5 h-2.5" />
                    <span>{item.precipitationProbability}%</span>
                  </>
                ) : (
                  <span className="text-slate-600">—</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
