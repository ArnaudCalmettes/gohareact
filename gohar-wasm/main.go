//go:build js && wasm

package main

import (
	"syscall/js"

	goharjs "github.com/ArnaudCalmettes/gohar/lib/js"
)

func main() {
	done := make(chan struct{})
	goharjs.ImportGoharBindings()
	gohar := js.Global().Get("gohar")
	gohar.Set("keyboardWithScalePattern", js.FuncOf(KeyboardWithScalePattern))
	gohar.Set("simpleKeyboard", js.FuncOf(SimpleKeyboard))
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
