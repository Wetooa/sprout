import {
  ChevronDown,
  PanelRightClose,
  PanelRightOpen,
  SunIcon,
} from "lucide-react";
import React from "react";
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

  return (
    <div
      className={`h-full transition-all relative ${isOpen ? "w-0" : "w-72"}`}
    >
      <Button
        onClick={toggleSidebar}
        className="absolute top-0 -right-10 z-10"
        variant={"secondary"}
      >
        {isOpen ? <PanelRightOpen /> : <PanelRightClose />}
      </Button>

      <div className="bg-white/20 backdrop-blur p-4 rounded-lg flex flex-col items-center gap-2">
        <div className="flex">
          Today <ChevronDown />
        </div>
        <div className="flex">
          <SunIcon />
          <p className="text-6xl">32 &deg;</p>
        </div>
        <p>Sunny</p>
        <p>Cebu City, Cebu</p>
        <p>10 Oct 2019</p>
      </div>

      <div className="bg-white/20 backdrop-blur p-4 rounded-lg grid grid-rows-2 grid-cols-5 gap-2">
        {dummyWeatherData.map((data, index) => {
          return <WeatherAnalysisWidgetItem key={`${index}`} {...data} />;
        })}
      </div>
    </div>
  );
}

export default Sidebar;
