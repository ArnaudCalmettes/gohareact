import abcjs from "abcjs";
import { useContext } from "react";
import { GoharContext } from "./gohar/gohar";

export function ScaleNotation({
  rootPitch,
  scalePattern,
}: {
  rootPitch: number | null;
  scalePattern: number;
}) {
  const tag = <div id="sheetmusic"></div>;
  const gohar = useContext(GoharContext);
  if (rootPitch == null) {
    return tag;
  }
  const schema = gohar.newScaleSchema(rootPitch, scalePattern);
  if (schema == null) {
    return tag;
  }
  const code =
    "T: " +
    capitalize(schema.rootName) +
    " " +
    schema.scaleName +
    "\n" +
    "L:1\n" +
    schema.ABCNotes.join(" ");

  abcjs.renderAbc(tag.props.id, code, {
    jazzchords: true,
    responsive: "resize",
    selectionColor: "current",
  });
  return tag;
}

function capitalize(val: string): string {
  return val.charAt(0).toUpperCase() + val.slice(1);
}
