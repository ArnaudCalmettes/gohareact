import { useState, useContext, FormEvent } from "react";
import { Gohar, GoharContext, KeyboardKey } from "./gohar/gohar.tsx";
import { GoharLoader } from "./gohar/Loader.tsx";
import "./App.css";
import { SingleNoteKeyboardSelector } from "./piano/SingleNote.tsx";
import { ScalePatternSelector } from "./scale/PatternSelector.tsx";
import { ScaleNotation } from "./notation.tsx";

export default function App() {
  return (
    <GoharLoader>
      <ScaleExplorer />
    </GoharLoader>
  );
}

export function ScaleExplorer() {
  const [currentPattern, setPattern] = useState<number>(0b101010110101);
  const [currentPitch, setPitch] = useState<number | null>(null);
  const [locale, setLocale] = useState<string>("fr");
  const [octaves, setOctaves] = useState<number>(2);

  const gohar = useContext<Gohar>(GoharContext);
  if (gohar.isLoaded) {
    gohar.setLocale(locale);
  }

  let keys: KeyboardKey[] = [];
  if (currentPitch === null) {
    keys = gohar.simpleKeyboard(octaves);
  } else {
    keys = gohar.keyboardWithScalePattern(
      octaves,
      currentPitch || 0,
      currentPattern
    );
  }
  return (
    <>
      <LocaleSelector selected={locale} onSelectionChanged={setLocale} />
      <ScalePatternSelector
        selected={currentPattern}
        onSelectionChanged={setPattern}
      />
      <KeyboardRangeSelector
        onSelectionChanged={setOctaves}
        selected={octaves}
      />
      <SingleNoteKeyboardSelector
        keys={keys}
        selectedPitch={currentPitch}
        onSelectionChanged={setPitch}
      />
      <ScaleNotation
        rootPitch={currentPitch}
        scalePattern={currentPattern}
        locale={locale}
      />
    </>
  );
}

function KeyboardRangeSelector({
  selected,
  onSelectionChanged,
}: {
  selected: number;
  onSelectionChanged: (octaves: number) => void;
}) {
  return (
    <>
      <button
        disabled={selected <= 1}
        onClick={() => {
          onSelectionChanged(selected - 1);
        }}
      >
        -
      </button>
      {"" + selected + " octave" + (selected <= 1 ? "" : "s")}
      <button
        disabled={selected >= 8}
        onClick={() => {
          onSelectionChanged(selected + 1);
        }}
      >
        +
      </button>
    </>
  );
}

function LocaleSelector({
  selected,
  onSelectionChanged,
}: {
  selected: string;
  onSelectionChanged: (locale: string) => void;
}) {
  function changeHandler(e: FormEvent<HTMLSelectElement>) {
    onSelectionChanged(e.currentTarget.value);
  }

  return (
    <select id="localeSelector" value={selected} onChange={changeHandler}>
      <option key="en" value="en">
        English
      </option>
      <option key="fr" value="fr">
        Français
      </option>
    </select>
  );
}
