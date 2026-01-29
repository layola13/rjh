const globalThis: typeof window & typeof global = 
  (typeof self === "object" && self && self.Object === Object && self) ||
  (typeof global === "object" && global && global.Object === Object && global) ||
  Function("return this")();

export default globalThis;