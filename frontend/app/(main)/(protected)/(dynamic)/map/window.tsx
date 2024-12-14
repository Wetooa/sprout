import React from "react";

import { bbox } from "@turf/turf";
import { ChevronDown, ChevronRight, PlusIcon, SunIcon } from "lucide-react";
import { Map } from "maplibre-gl";
import { useEffect } from "react";

import WeatherAnalysisWidgetItem, {
  WeatherAnalysisWidgetItemProps,
} from "./weather-analysis";

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

interface WindowProps {
  id: string;
}

function Window(props: WindowProps) {
  const { id } = props;

  const mapIdDiv = `map-${id}`;
  const eeLayerId = `ee-layer-${id}`;
  const mapStyle = {
    height: "100%",
    width: "100%",
  };

  useEffect(() => {
    const map = new Map({
      container: mapIdDiv,
      zoom: 1,
      center: [0, 0],
      style: "https://demotiles.maplibre.org/style.json",
    });

    map.on("load", async () => {
      const res = await fetch("/api/ee/soil-moisture");
      const { layers, geojson, message } = await res.json();

      if (res.status != 200) {
        throw new Error(message);
      }

      map.addSource(eeLayerId, {
        type: "raster",
        tiles: [...layers],
        tileSize: 256,
      });

      map.addLayer({
        type: "raster",
        source: eeLayerId,
        id: eeLayerId,
        minzoom: 0,
        maxzoom: 20,
      });

      const bounds = bbox(geojson);
      map.fitBounds(bounds);
    });
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col rounded-2xl justify-center overflow-hidden">
      <div className="z-0" id={mapIdDiv} style={mapStyle}></div>;
      <aside className="z-10 absolute top-0 left-0 p-4 space-y-6 w-1/4">
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

export default Window;
