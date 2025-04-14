import { ReactNode, useState, useEffect } from "react";
import { Gohar, defaultGoharCtx, GoharContext } from "./gohar.tsx";
import "../wasm_exec.js";

export function GoharLoader({ children }: { children: ReactNode }) {
  const [goharCtx, setGoharCtx] = useState<Gohar>(defaultGoharCtx);
  useEffect(() => {
    async function loadWasm(): Promise<void> {
      const window = globalThis as unknown as GoEnabled;
      const goWasm: GoRunner = new window.Go();
      const result = await WebAssembly.instantiateStreaming(
        fetch("gohar.wasm"),
        goWasm.importObject
      );
      goWasm.run(result.instance);
      setGoharCtx(window.gohar);
    }
    loadWasm();
  }, []);

  if (!goharCtx.isLoaded) {
    <p>Loading...</p>;
  }
  return <GoharContext value={goharCtx}>{children}</GoharContext>;
}

declare interface GoEnabled {
  Go: {
    new (): GoRunner;
  };
  gohar: Gohar;
}

declare interface GoRunner {
  importObject: WebAssembly.Imports;
  run(i: WebAssembly.Instance): void;
}
