wasm:
	GOOS=js GOARCH=wasm tinygo build -o public/gohar.wasm ./gohar-wasm
	cp `tinygo env TINYGOROOT`/targets/wasm_exec.js src/

wasm-debug:
	GOOS=js GOARCH=wasm go build -o public/gohar.wasm ./gohar-wasm
	cp `go env GOROOT`/targets/wasm_exec.js src/