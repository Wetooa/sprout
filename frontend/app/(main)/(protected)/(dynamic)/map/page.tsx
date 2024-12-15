"use client";
import "maplibre-gl/dist/maplibre-gl.css";
import { Mosaic, MosaicWindow } from "react-mosaic-component";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "react-mosaic-component/react-mosaic-component.css";
import Window from "./window";
import Sidebar from "./sidebar";

export type ViewId = string;

export type MapFilter =
  | "ndvi"
  | "soil-moisture"
  | "land-surface-temperature"
  | "precipitation";

function MapPage() {
  const ELEMENT_MAP: { [viewId: string]: JSX.Element } = {
    a: <Window filter="soil-moisture" id={"a"} />,
    b: <Window filter="ndvi" id={"b"} />,
    // c: <Window filter="land-surface-temperature" id={"c"} />,
    // d: <Window filter="precipitation" id={"d"} />,
  };

  const TITLE_MAP: { [viewId: string]: string } = {
    a: "Left Window",
    b: "Top Right Window",
    c: "Bottom Right Window",
    d: "Bottom Right Window",
    new: "New Window",
  };

  return (
    <main className="flex h-full overflow-hidden">
      <Sidebar />

      <div className="flex-1">
        <Mosaic<string>
          renderTile={(id, path) => (
            <MosaicWindow<ViewId>
              key={id}
              path={path}
              createNode={() => "new"}
              title={TITLE_MAP[id]}
            >
              {ELEMENT_MAP[id]}
            </MosaicWindow>
          )}
          initialValue={{
            direction: "row",
            first: "a",
            // second: {
            //   direction: "column",
            //   first: "b",
            // first: "b",
            // second: {
            //   direction: "column",
            //   first: "c",
            //   second: "d",
            // },
            second: "b",
            splitPercentage: 60,
          }}
        />
      </div>
    </main>
  );
}

export default MapPage;
