"use client";
import "maplibre-gl/dist/maplibre-gl.css";
import { Mosaic, MosaicWindow } from "react-mosaic-component";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "react-mosaic-component/react-mosaic-component.css";
import Window from "./window";

export type ViewId = string;

function MapPage() {
  const ELEMENT_MAP: { [viewId: string]: JSX.Element } = {
    a: <Window id={"a"} />,
    b: <Window id={"b"} />,
    c: <Window id={"c"} />,
  };

  const TITLE_MAP: { [viewId: string]: string } = {
    a: "Left Window",
    b: "Top Right Window",
    c: "Bottom Right Window",
    new: "New Window",
  };

  return (
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
        second: {
          direction: "column",
          first: "b",
          second: "c",
        },
        splitPercentage: 60,
      }}
    />
  );
}

export default MapPage;
