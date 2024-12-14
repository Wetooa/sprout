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
      <div>{time}</div>
      <div className="flex items-center ">
        <div className="aspect-square flex items-center justify-center w-6">
          {getWeatherIcon(weather)}
        </div>
        <p className="w-full ">{weather}&deg;</p>
      </div>
    </div>
  );
}
