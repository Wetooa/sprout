"use client";

import { useEffect, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { Mosaic, MosaicWindow } from "react-mosaic-component";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "react-mosaic-component/react-mosaic-component.css";
import Window from "./window";
import Sidebar from "./sidebar";

export type ViewId = string;

export type MapData = {
  id: number;
  ownerId: number;
  name: string;
  filter: string;
  mapStyle: string;
  createdAt: string;
  updatedAt: string;
};

export type MapFilter =
  | "ndvi"
  | "soil-moisture"
  | "land-surface-temperature"
  | "precipitation";

export const mapFilters: MapFilter[] = [
  "ndvi",
  "soil-moisture",
  "land-surface-temperature",
  "precipitation",
];

function MapPage() {
  const [maps, setMaps] = useState<MapData[]>([]);
  const [elementMap, setElementMap] = useState<{
    [viewId: string]: JSX.Element;
  }>({});
  const [titleMap, setTitleMap] = useState<{ [viewId: string]: string }>({});

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5105/api/map", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2IiwiZW1haWwiOiJhZHJpYW5AZ21haWwuY29tIiwicm9sZSI6IlVzZXIiLCJuYmYiOjE3MzQyNDkyMTEsImV4cCI6MTczNDMzNTYxMSwiaWF0IjoxNzM0MjQ5MjExLCJpc3MiOiJTcHJvdXQiLCJhdWQiOiJTcHJvdXRVc2VycyJ9.xlC0GdDyEQFWM5z2lljUVSuT_N3RjVLvOe0Ahy-OcOY`,
          },
        });

        console.log(response);

        const data = await response.json();
        const fetchedMaps = data.maps;

        // Transform fetched maps into ELEMENT_MAP and TITLE_MAP
        const elements: { [viewId: string]: JSX.Element } = {};
        const titles: { [viewId: string]: string } = {};

        fetchedMaps.forEach((map: any) => {
          const viewId = `map-${map.id}`; // Create a unique viewId for each map
          elements[viewId] = (
            <Window mapStyle={map.mapStyle} filter={map.filter} id={viewId} />
          );
          titles[viewId] = map.name;
        });

        setMaps(fetchedMaps);
        setElementMap(elements);
        setTitleMap(titles);
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex h-full overflow-hidden relative">
      <Sidebar />

      <div className="flex-1">
        <Mosaic<string>
          renderTile={(id, path) => (
            <MosaicWindow<ViewId>
              key={id}
              path={path}
              createNode={() => "new"}
              title={titleMap[id] || "New Window"}
            >
              {elementMap[id] || <div>Loading...</div>}
            </MosaicWindow>
          )}
          initialValue={{
            direction: "row",
            first: maps.length > 0 ? `map-${maps[0].id}` : "loading",
            second: maps.length > 1 ? `map-${maps[1].id}` : "loading...",
            splitPercentage: 60,
          }}
        />
      </div>
    </main>
  );
}

export default MapPage;
