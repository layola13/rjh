const globalObject = (typeof globalThis !== "undefined" && globalThis && globalThis.Object === Object && globalThis) ||
  (typeof self !== "undefined" && self && self.Object === Object && self) ||
  Function("return this")();

export default globalObject;