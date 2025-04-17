//go:build js && wasm

package main

import (
	"syscall/js"

	"github.com/ArnaudCalmettes/gohar"
	goharjs "github.com/ArnaudCalmettes/gohar/lib/js"
	"github.com/ArnaudCalmettes/gohar/lib/js/convert"
)

func main() {
	done := make(chan struct{})
	goharjs.ImportGoharBindings()
	gohar := js.Global().Get("gohar")
	gohar.Set("keyboardWithScalePattern", js.FuncOf(KeyboardWithScalePattern))
	gohar.Set("simpleKeyboard", js.FuncOf(SimpleKeyboard))
	gohar.Set("newScaleSchema", js.FuncOf(newScaleSchema))
	<-done
}

func SimpleKeyboard(_ js.Value, args []js.Value) any {
	if len(args) != 1 {
		panic("simpleKeyboard: octaves are required")
	}
	return simpleKeyboard(args[0].Int())
}

func KeyboardWithScalePattern(_ js.Value, args []js.Value) any {
	if len(args) < 3 {
		panic("keyboardWithScalePattern: octaves, root and scalePattern are required")
	}
	return keyboardWithScalePattern(args[0].Int(), args[1].Int(), args[2].Int())
}

func newScaleSchema(_ js.Value, args []js.Value) any {
	if len(args) < 2 {
		panic("newScaleSchema: root and pattern are required")
	}
	return NewScaleSchema(gohar.Pitch(args[0].Int()), convert.ScalePatternFromJS(args[1]))
}
