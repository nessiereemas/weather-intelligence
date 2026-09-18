import React from 'react';
import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudDrizzle,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Wind,
  LucideProps,
} from 'lucide-react';

interface WeatherIconProps extends LucideProps {
  name: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'Sun':
      return <Sun {...props} />;
    case 'Moon':
      return <Moon {...props} />;
    case 'SunDim':
      return <Sun {...props} />;
    case 'CloudSun':
      return <CloudSun {...props} />;
    case 'CloudMoon':
      return <CloudMoon {...props} />;
    case 'Cloud':
      return <Cloud {...props} />;
    case 'CloudRain':
      return <CloudRain {...props} />;
    case 'CloudDrizzle':
      return <CloudDrizzle {...props} />;
    case 'CloudSnow':
      return <CloudSnow {...props} />;
    case 'CloudLightning':
      return <CloudLightning {...props} />;
    case 'CloudFog':
      return <CloudFog {...props} />;
    case 'Wind':
      return <Wind {...props} />;
    default:
      return <Cloud {...props} />;
  }
};
