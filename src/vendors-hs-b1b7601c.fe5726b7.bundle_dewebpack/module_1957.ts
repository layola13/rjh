const globalObject = (typeof globalThis === "object" && globalThis && globalThis.Object === Object && globalThis) || undefined;

export default globalObject;