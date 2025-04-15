import { useState, useContext, FormEvent } from "react";
import { Gohar, GoharContext, KeyboardKey } from "./gohar/gohar.tsx";
import { GoharLoader } from "./gohar/Loader.tsx";
import "./App.css";
import { SingleNoteKeyboardSelector } from "./piano/SingleNote.tsx";
import { ScalePatternSelector } from "./scale/PatternSelector.tsx";

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
  const [octaves, setOctaves] = useState<number>(1);

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
    <select
      id="keyboardRangeSelector"
      onChange={(e) => onSelectionChanged(parseInt(e.currentTarget.value))}
      value={selected}
    >
      <option key={1} value={"1"}>
        1 octave
      </option>
      <option key={2} value={"2"}>
        2 octaves
      </option>
      <option key={3} value={"3"}>
        3 octaves
      </option>
      <option key={4} value={"4"}>
        4 octaves
      </option>
      <option key={5} value={"5"}>
        5 octaves
      </option>
    </select>
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
