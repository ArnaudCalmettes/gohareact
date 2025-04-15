import { defaultStyle, Style } from "./Style";
import { Key, KeyColorProfile, KeyShape } from "./Key";
import * as Gohar from "../gohar/gohar";

export function SingleNoteKeyboardSelector({
  keys,
  selectedPitch: selected,
  style,
  onSelectionChanged,
}: {
  keys: Gohar.KeyboardKey[];
  selectedPitch?: number | null;
  style?: Style;
  onSelectionChanged: (selectedPitch: number | null) => void;
}) {
  if (selected === undefined) {
    selected = null;
  }
  style ||= defaultStyle;

  function selectHandler(pitch: number) {
    if (selected === pitch) {
      onSelectionChanged(null);
    } else {
      onSelectionChanged(pitch);
    }
  }

  // black keys need to be rendered after white keys to appear above them.
  const whiteKeys = [];
  const blackKeys = [];
  const wColorProfile = whiteColorProfile(style);
  const bColorProfile = blackColorProfile(style);

  let x = 1;
  for (const k of keys) {
    const key = (
      <Key
        key={k.pitch}
        x={x}
        name={capitalize(k.name)}
        shape={k.isWhiteKey ? whiteShape : blackShape}
        colorProfile={k.isWhiteKey ? wColorProfile : bColorProfile}
        style={style}
        highlighted={k.isHighlighted}
        selected={k.pitch === selected}
        onSelect={() => selectHandler(k.pitch)}
      />
    );
    if (k.isWhiteKey) {
      whiteKeys.push(key);
      x += whiteShape.width;
    } else {
      blackKeys.push(key);
    }
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={"0 0 " + (x + 0.5) + " 100"}
      width="100%"
      height="200"
    >
      <defs>
        <clipPath id="canvas">
          <path d={"M0 1h" + (x + 0.5) + "v95H0z"} />
        </clipPath>
        <BaseSvgDefs style={style} />
      </defs>
      {whiteKeys}
      {blackKeys}
      <path d={"M0.5 1h" + x} style={style} />
    </svg>
  );
}

function whiteColorProfile(style: Style): KeyColorProfile {
  return {
    baseColor: style.whiteFill || "#fff",
    selColor: style.whiteSelFill || style.selectedFill || "#47a",
    highColor: style.whiteHLFill || style.highlightedFill || "#8bf",
    textColor: style.whiteTextFill || "black",
  };
}

function blackColorProfile(style: Style): KeyColorProfile {
  return {
    baseColor: style.blackFill || "#000",
    selColor: style.blackSelFill || style.selectedFill || "#47a",
    highColor: style.blackHLFill || style.highlightedFill || "#8bf",
    textColor: style.blackTextFill || "white",
  };
}

const whiteShape: KeyShape = {
  width: 20,
  height: 100,
  x: 0,
  y: -10,
  rx: 3,
  ry: 3,
};

const blackShape: KeyShape = {
  width: 14,
  height: 70,
  x: -7,
  y: -10,
  rx: 3,
  ry: 3,
};
export function BaseSvgDefs({ style }: { style: Style }) {
  return (
    <>
      <linearGradient id="Hover" x1="0%" x2="0%" y1="0%" y2="100%">
        <stop offset="0%" stopColor={style.selectedFill} />
        <stop offset="100%" stopColor={style.selectedFill} stopOpacity="0" />
      </linearGradient>
      <linearGradient id="whiteHoverback" x1="0%" x2="0%" y1="0%" y2="100%">
        <stop offset="0%" stopColor={style.whiteFill} />
        <stop offset="100%" stopColor={style.whiteFill} stopOpacity="0" />
      </linearGradient>
      <linearGradient id="blackHoverback" x1="0%" x2="0%" y1="0%" y2="100%">
        <stop offset="0%" stopColor={style.blackFill} />
        <stop offset="100%" stopColor={style.blackFill} stopOpacity="0" />
      </linearGradient>
    </>
  );
}

function capitalize(val: string): string {
  return val.charAt(0).toUpperCase() + val.slice(1);
}
