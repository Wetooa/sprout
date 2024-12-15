import {
  ChevronDown,
  PanelRightClose,
  PanelRightOpen,
  SunIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import WeatherAnalysisWidgetItem, {
  WeatherAnalysisWidgetItemProps,
} from "./weather-analysis";
import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/store/sidebar";

const dummyWeatherData: WeatherAnalysisWidgetItemProps[] = [
  { time: "12 AM", weather: 32 },
  { time: "1 AM", weather: 30 },
  { time: "2 AM", weather: 29 },
  { time: "3 AM", weather: 28 },
  { time: "4 AM", weather: 27 },
  { time: "5 AM", weather: 26 },
  { time: "6 AM", weather: 25 },
  { time: "7 AM", weather: 24 },
  { time: "8 AM", weather: 23 },
  { time: "9 AM", weather: 22 },
];

function Sidebar() {
  const { toggleSidebar, isOpen } = useSidebarStore();
  const [city, setCity] = useState("Cebu");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const currentWeather = 28;
  const weatherDescription = "Clear sky";

  const getCurrentDateTime = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setDate(formattedDate);
    setTime(formattedTime);
  };

  useEffect(() => {
    const dateTimeInterval = setInterval(getCurrentDateTime, 60000);

    getCurrentDateTime();

    return () => {
      clearInterval(dateTimeInterval);
    };
  }, []);

  return (
    <div
      className={`flex flex-col h-full transition-all relative gap-3 ${
        isOpen ? "w-0" : "w-60"
      }`}
    >
      <Button
        onClick={toggleSidebar}
        className="absolute top-0 -right-10 z-10"
        variant={"secondary"}
      >
        {isOpen ? <PanelRightOpen /> : <PanelRightClose />}
      </Button>

      <div className="bg-white/20 backdrop-blur p-4 rounded-lg flex flex-col items-center gap-2 bg-gradient-to-br from-[#059568] to-[#065f46] text-white">
        <div className="flex w-full">
          <p>{city}</p>
        </div>
        <div className="flex items-center">
          <SunIcon className="mr-2" />
          <p className="text-6xl">
            {currentWeather !== null ? `${currentWeather}°` : "Loading..."}
          </p>
        </div>
        <p>{weatherDescription}</p>
        <div className="flex gap-3">
          <p>{date}</p>
          <p>{time}</p>
        </div>
      </div>

      <div className="bg-white/20 backdrop-blur p-4 rounded-lg grid grid-rows-2 grid-cols-5 gap-2 bg-gradient-to-br from-[#059568] to-[#065f46] text-white">
        {dummyWeatherData.map((data, index) => (
          <WeatherAnalysisWidgetItem key={index} {...data} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
