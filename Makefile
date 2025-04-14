wasm:
	GOOS=js GOARCH=wasm tinygo build -o public/gohar.wasm ./gohar-wasm
	cp `tinygo env TINYGOROOT`/targets/wasm_exec.js src/
