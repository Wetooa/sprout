"use client";

import {
  ChevronDown,
  ChevronRight,
  CloudIcon,
  CloudRainWindIcon,
  PlusIcon,
  SunIcon,
} from "lucide-react";
import React from "react";

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

function Map() {
  return (
    <div className="relative bg-[url('/bg/main.svg')] bg-cover bg-no-repeat overflow-y-scroll w-full h-full p-16 flex flex-col justify-center">
      <aside className="absolute top-0 left-0 p-4 space-y-6 w-1/4">
        <div className="rounded-lg overflow-hidden w-full">
          <div className="bg-white flex p-2">
            Province |
            <button className="flex">
              Cebu <ChevronRight />
            </button>
          </div>

          <div className="text-white flex justify-between bg-gradient-to-b from-primary to-primary/80 p-2">
            <div>Add field</div>
            <div className="rounded-full border-2 border-white">
              <PlusIcon />
            </div>
          </div>
        </div>

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
            return <WeatherAnalysisWidgetItem key={index} {...data} />;
          })}
        </div>

        <div></div>
      </aside>
    </div>
  );
}

interface WeatherAnalysisWidgetItemProps {
  time: string;
  weather: number;
}

function WeatherAnalysisWidgetItem({
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

export default Map;
