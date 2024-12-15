import React, { useState } from "react";

import { bbox } from "@turf/turf";
import { ChevronRight, PlusIcon } from "lucide-react";
import { Map, NavigationControl } from "maplibre-gl";
import { useEffect } from "react";
import GenerateInsightsButton from "./insights";
import lodash from "lodash";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MapFilter } from "./page";

interface WindowProps {
  id: string;
  filter: MapFilter;
}

const MAP_STYLES = {
  basic:
    "https://api.maptiler.com/maps/basic-v2/style.json?key=wp8RVzXAsc3dZj3qJlo8",
  satellite:
    "https://api.maptiler.com/maps/satellite/style.json?key=wp8RVzXAsc3dZj3qJlo8",
  topology:
    "https://api.maptiler.com/maps/topo-v2/style.json?key=wp8RVzXAsc3dZj3qJlo8",
} as const;

type MapStyleKeys = keyof typeof MAP_STYLES;

function Window(props: WindowProps) {
  const { id, filter } = props;

  const mapIdDiv = `map-${id}`;
  const eeLayerId = `ee-layer-${id}`;
  const defaultMapStyle: MapStyleKeys = "basic";

  const [mapStyle, setMapStyle] = React.useState<MapStyleKeys>(defaultMapStyle);

  useEffect(() => {
    const map = new Map({
      container: mapIdDiv,
      zoom: 1,
      center: [0, 0],
      style: MAP_STYLES[mapStyle],
    });

    map.addControl(new NavigationControl());

    map.on("load", async () => {
      const res = await fetch(`/api/ee/${filter}`);
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
  }, [eeLayerId, filter, mapIdDiv, mapStyle]);

  return (
    <div className="relative w-full h-full flex flex-col rounded-2xl justify-center overflow-hidden">
      <div id={mapIdDiv} className="z-0 w-full h-full"></div>;
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

        <GenerateInsightsButton />

        <div>
          <Select
            defaultValue={defaultMapStyle}
            onValueChange={(value) => setMapStyle(value as MapStyleKeys)}
          >
            <SelectTrigger className="w-full bg-white/20 backdrop-blur">
              <SelectValue placeholder="Map Style" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(MAP_STYLES).map((style) => (
                <SelectItem key={`${style}-${id}`} value={style}>
                  {lodash.capitalize(style)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </aside>
    </div>
  );
}

export default Window;
