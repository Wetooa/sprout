import {
  ChevronRight,
  PanelRightClose,
  PanelRightOpen,
  PlusIcon,
  SunIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import WeatherAnalysisWidgetItem, {
  WeatherAnalysisWidgetItemProps,
} from "./weather-analysis";
import { useSidebarStore } from "@/store/sidebar";
import GenerateInsightsButton from "./insights";
import AddField from "./add-field";
import Province from "./province";

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
      className={`flex flex-col h-full transition-all absolute gap-3 left-5 top-12 w-60 mr-4 z-10`}
    >
      <div className="rounded-lg overflow-hidden w-full">
        <div className="bg-white flex px-4 py-2 gap-2 items-center">
          <p className="m-0 text-[#6B7280]">Province</p>
          <p className="m-0 text-[#6B7280]">|</p>
          <Province />
        </div>
        <AddField />
      </div>

      <GenerateInsightsButton />

      <div className="bg-[#0C654A]/50 backdrop-blur p-4 rounded-lg flex flex-col items-center gap-2 text-white border border-[#59A693]">
        <div className="flex w-full">
          <p className="font-semibold">{city}</p>
        </div>
        <div className="flex items-center">
          <SunIcon className="mr-2" />
          <p className="text-6xl">
            {currentWeather !== null ? `${currentWeather}°` : "Loading..."}
          </p>
        </div>
        <p>{weatherDescription}</p>
        <div className="flex gap-4">
          <p>{date}</p>
          <p>{time}</p>
        </div>
      </div>

      <div className="bg-[#0C654A]/50 backdrop-blur p-4 rounded-lg grid grid-rows-2 grid-cols-5 gap-2 text-white border border-[#59A693]">
        {dummyWeatherData.map((data, index) => (
          <WeatherAnalysisWidgetItem key={index} {...data} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
