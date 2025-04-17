import abcjs from "abcjs";
import { useContext } from "react";
import { GoharContext } from "./gohar/gohar";

export function ScaleNotation({
  rootPitch,
  scalePattern,
  locale,
}: {
  rootPitch: number | null;
  scalePattern: number;
  locale: string;
}) {
  const tag = <div id="sheetmusic"></div>;
  const gohar = useContext(GoharContext);
  const root = rootPitch || 0;
  const schema = gohar.newScaleSchema(root, scalePattern);
  let code: string =
    locale == "fr" ? "T: Choisissez une note" : "T: Pick a note";
  if (rootPitch != null && schema != null) {
    code =
      "T: " +
      capitalize(schema.rootName) +
      " " +
      schema.scaleName +
      "\n" +
      "L:1\n" +
      schema.ABCNotes.join(" ");
  }
  abcjs.renderAbc(tag.props.id, code, {
    jazzchords: true,
    responsive: "resize",
    selectTypes: [],
  });
  return tag;
}

function capitalize(val: string): string {
  return val.charAt(0).toUpperCase() + val.slice(1);
}
