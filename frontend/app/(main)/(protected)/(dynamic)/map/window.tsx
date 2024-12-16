import React, { useEffect } from "react";
import { bbox } from "@turf/turf";
import lodash from "lodash";
import { Map, NavigationControl } from "maplibre-gl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapFilter, mapFilters } from "./page";

export type MapStyleKeys = keyof typeof MAP_STYLES;
export const MAP_STYLES = {
  basic:
    "https://api.maptiler.com/maps/basic-v2/style.json?key=wp8RVzXAsc3dZj3qJlo8",
  satellite:
    "https://api.maptiler.com/maps/satellite/style.json?key=wp8RVzXAsc3dZj3qJlo8",
  topology:
    "https://api.maptiler.com/maps/topo-v2/style.json?key=wp8RVzXAsc3dZj3qJlo8",
} as const;

interface WindowProps {
  id: string;
  filter: MapFilter;
  mapStyle: MapStyleKeys;
}

function Window(props: WindowProps) {
  const { id, filter, mapStyle: ms } = props;
  const mapIdDiv = `map-${id}`;
  const eeLayerId = `ee-layer-${id}`;
  const [mapFilter, setMapFilter] = React.useState<MapFilter>(filter);
  const [mapStyle, setMapStyle] = React.useState<MapStyleKeys>(ms);

  useEffect(() => {
    const map = new Map({
      container: mapIdDiv,
      zoom: 1,
      center: [0, 0],
      style: MAP_STYLES[mapStyle],
    });

    map.addControl(new NavigationControl());

    map.on("load", async () => {
      const res = await fetch(`/api/ee/${mapFilter}`);
      const { layers, geojson, message } = await res.json();

      if (res.status !== 200) {
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
  }, [eeLayerId, mapFilter, mapIdDiv, mapStyle]);

  const formatStyleName = (style: string) => {
    if (style == "ndvi") {
      return "NDVI";
    }
    return style
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => lodash.capitalize(word))
      .join(" ");
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-center overflow-hidden">
      <div id={mapIdDiv} className="z-0 w-full h-full"></div>
      <div className="flex flex-col gap-3 absolute right-14 top-3 w-[150px]">
        <Select
          defaultValue={mapFilter}
          onValueChange={(value) => setMapFilter(value as MapFilter)}
        >
          <SelectTrigger className="w-full bg-emerald-800/20 backdrop-blur text-white">
            <SelectValue placeholder="Map Style" />
          </SelectTrigger>
          <SelectContent>
            {mapFilters.map((style) => (
              <SelectItem key={`${style}-${id}`} value={style}>
                {formatStyleName(style)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          defaultValue={ms}
          onValueChange={(value) => setMapStyle(value as MapStyleKeys)}
        >
          <SelectTrigger className="w-full bg-emerald-800/20 backdrop-blur text-white">
            <SelectValue placeholder="Map Style" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(MAP_STYLES).map((style) => (
              <SelectItem key={`${style}-${id}`} value={style}>
                {formatStyleName(style)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default Window;
