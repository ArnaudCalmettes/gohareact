export interface Style {
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
  whiteFill?: string;
  blackFill?: string;
  selectedFill?: string;
  highlightedFill?: string;
  whiteSelFill?: string;
  blackSelFill?: string;
  whiteHLFill?: string;
  blackHLFill?: string;
  whiteTextFill?: string;
  blackTextFill?: string;
}

export const defaultStyle: Style = {
  strokeWidth: 1,
  stroke: "#000",
  whiteFill: "#fff",
  blackFill: "#000",
  selectedFill: "#4ad",
  highlightedFill: "#8db",
  whiteSelFill: "#4ad",
  blackSelFill: "#17a",
  whiteHLFill: "#8db",
  blackHLFill: "#275",
  whiteTextFill: "black",
  blackTextFill: "white",
};
