import { CloudIcon, CloudRainWindIcon, SunIcon } from "lucide-react";

export interface WeatherAnalysisWidgetItemProps {
  time: string;
  weather: number;
}
export default function WeatherAnalysisWidgetItem({
  time,
  weather,
}: WeatherAnalysisWidgetItemProps) {
  const getWeatherIcon = (temperature: number) => {
    if (temperature >= 30) {
      return <SunIcon />;
    } else if (temperature >= 20) {
      return <CloudIcon />;
    } else {
      return <CloudRainWindIcon />;
    }
  };

  return (
    <div className="text-sm text-center">
      <div className="text-xs font-semibold">{time}</div>
      <div className="flex items-center">
        <div className="aspect-square flex items-center justify-center w-4">
          {getWeatherIcon(weather)}
        </div>
        <p className="w-full text-xs m-0">{weather}&deg;</p>
      </div>
    </div>
  );
}
