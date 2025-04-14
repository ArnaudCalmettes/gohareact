//go:build js && wasm

package main

import (
	"syscall/js"

	"github.com/ArnaudCalmettes/gohar"
)

func simpleKeyboard(octaves int) any {
	from, to := computeAmbitus(octaves)
	keys := baseKeys(from, to)
	return keysToJS(keys)
}

func keyboardWithScalePattern(octaves int, root int, scalePattern int) any {
	from, to := computeAmbitus(octaves)
	keys := baseKeys(from, to)
	pattern := gohar.ScalePattern(scalePattern)
	rootPC := gohar.DefaultPitchClass(gohar.Pitch(root))
	for pc := range pattern.PitchClasses(rootPC, nil) {
		name, _ := gohar.NoteName(pc)
		for pitch := range pc.Pitches(from, to) {
			i := pitch - from
			keys[i].isHighlighted = true
			keys[i].name = name
		}
	}
	return keysToJS(keys)
}

func baseKeys(from, to gohar.Pitch) []key {
	keys := make([]key, to-from+1)
	for i := range keys {
		p := from + gohar.Pitch(i)
		keys[i].Pitch = p
		keys[i].isWhiteKey = isWhiteKey(p)
	}
	return keys
}

func keysToJS(keys []key) any {
	jsKeys := make([]any, len(keys))
	for i, k := range keys {
		jsKeys[i] = js.ValueOf(map[string]any{
			"pitch":         js.ValueOf(int(k.Pitch)),
			"isWhiteKey":    js.ValueOf(k.isWhiteKey),
			"isHighlighted": js.ValueOf(k.isHighlighted),
			"name":          js.ValueOf(k.name),
		})
	}
	return js.ValueOf(jsKeys)
}

type key struct {
	gohar.Pitch
	isWhiteKey    bool
	isHighlighted bool
	name          string
}

func isWhiteKey(p gohar.Pitch) bool {
	return []bool{
		true,
		false,
		true,
		false,
		true,
		true,
		false,
		true,
		false,
		true,
		false,
		true,
	}[int(p.Normalize())]
}

func computeAmbitus(octaves int) (lowest, highest gohar.Pitch) {
	low, high := 0, octaves
	for high-low > 1 {
		low++
		high--
	}
	return gohar.Pitch(low * -12), gohar.Pitch(high*12 - 1)
}
