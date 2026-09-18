import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, Navigation, X } from 'lucide-react';
import { GeoLocation } from '../types';
import { DEFAULT_CITIES, searchCities } from '../services/weatherApi';

interface CitySearchProps {
  currentLocation: GeoLocation;
  onSelectCity: (location: GeoLocation) => void;
  isLoading: boolean;
}

function formatLocationSubtitle(item: GeoLocation): string {
  const parts: string[] = [];
  const normalizedName = item.name.trim().toLowerCase();

  // Add administrative state/province if distinct from city name
  if (item.admin1 && item.admin1.trim().toLowerCase() !== normalizedName) {
    parts.push(item.admin1.trim());
  }

  // Handle country / city-state distinction
  if (item.country) {
    if (item.country.trim().toLowerCase() === normalizedName && parts.length === 0) {
      return `Capital / City-State · ${item.country_code || item.country}`;
    }
    parts.push(item.country.trim());
  } else if (item.country_code) {
    parts.push(item.country_code);
  }

  return parts.length > 0 ? parts.join(', ') : 'Global coordinates';
}

export const CitySearch: React.FC<CitySearchProps> = ({
  currentLocation,
  onSelectCity,
  isLoading,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      const items = await searchCities(query);
      setResults(items);
      setIsSearching(false);
      setIsOpen(true);
    }, 280);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city: GeoLocation) => {
    onSelectCity(city);
    setQuery('');
    setIsOpen(false);
    setLocationError(null);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          // Attempt reverse geocoding via Open-Meteo or BigDataCloud
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          if (res.ok) {
            const data = await res.json();
            const cityName =
              data.city || data.locality || data.principalSubdivision || 'My Location';
            const countryName = data.countryName || '';
            const countryCode = data.countryCode || '';
            const admin1 = data.principalSubdivision || '';

            handleSelect({
              id: Date.now(),
              name: cityName,
              latitude,
              longitude,
              country: countryName,
              country_code: countryCode,
              admin1,
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            });
          } else {
            throw new Error('Reverse geocode failed');
          }
        } catch {
          // Fallback to coordinates
          handleSelect({
            id: Date.now(),
            name: 'Current Coordinates',
            latitude,
            longitude,
            country: '',
            country_code: '',
            admin1: `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          });
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        setLocating(false);
        if (err.code === 1) {
          setLocationError('Location access was denied. Please allow permission or select a city below.');
        } else {
          setLocationError('Unable to detect current location. Please use manual city search.');
        }
      },
      { timeout: 8000 }
    );
  };

  return (
    <div id="city-search-container" className="relative w-full max-w-2xl mx-auto" ref={containerRef}>
      {/* Search Bar Input */}
      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-slate-400 pointer-events-none">
          {isLoading || isSearching ? (
            <Loader2 className="w-5 h-5 animate-spin text-sky-400" />
          ) : (
            <Search className="w-5 h-5" />
          )}
        </div>

        <input
          id="city-search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          placeholder="Search any city, capital, or town (e.g., Tokyo, Seattle, Rome)..."
          className="w-full pl-11 pr-24 py-3 text-sm bg-slate-900/90 text-slate-100 placeholder-slate-400 rounded-xl border border-slate-700/80 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all"
        />

        <div className="absolute right-2.5 flex items-center gap-1.5">
          {query && (
            <button
              id="clear-search-button"
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
                setIsOpen(false);
              }}
              className="p-1 text-slate-400 hover:text-slate-200 rounded-md hover:bg-slate-800 transition"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            id="locate-me-button"
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={locating}
            title="Use current device location"
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
          >
            {locating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-400" />
            ) : (
              <Navigation className="w-3.5 h-3.5 text-sky-400" />
            )}
            <span className="hidden sm:inline">GPS</span>
          </button>
        </div>
      </div>

      {/* Geolocation error message if any */}
      {locationError && (
        <div className="mt-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center justify-between">
          <span>{locationError}</span>
          <button
            onClick={() => setLocationError(null)}
            className="text-amber-400 hover:text-amber-200 ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div
          id="city-search-dropdown"
          className="absolute left-0 right-0 top-full mt-2 z-40 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-72 overflow-y-auto"
        >
          {results.length > 0 ? (
            <div className="divide-y divide-slate-800/80">
              {results.map((item) => (
                <button
                  key={`${item.id}-${item.latitude}-${item.longitude}`}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-slate-800/70 transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-medium text-sm text-slate-100 group-hover:text-sky-300">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        {formatLocationSubtitle(item)}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
                    {item.country_code}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            !isSearching && (
              <div className="p-4 text-center text-xs text-slate-400">
                No cities found matching "{query}". Try a different spelling or region name.
              </div>
            )
          )}
        </div>
      )}

      {/* Quick Select Preset City Pills */}
      <div id="quick-city-presets" className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <span className="text-xs text-slate-400 mr-1 font-medium hidden sm:inline">
          Quick jump:
        </span>
        {DEFAULT_CITIES.map((city) => {
          const isSelected =
            currentLocation.name === city.name &&
            Math.abs(currentLocation.latitude - city.latitude) < 0.05;

          return (
            <button
              key={city.id}
              type="button"
              onClick={() => handleSelect(city)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                isSelected
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 font-medium'
                  : 'bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {city.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
