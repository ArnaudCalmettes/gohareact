wasm:
	GOOS=js GOARCH=wasm go build -o public/gohar.wasm ./gohar-wasm
	cp `go env GOROOT`/lib/wasm/wasm_exec.js src/

wasm-tinygo:
	GOOS=js GOARCH=wasm tinygo build -o public/gohar.wasm ./gohar-wasm
	cp `tinygo env TINYGOROOT`/targets/wasm_exec.js src/
