const globalThis = (typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {}) as typeof globalThis;

const SHARED_KEY = '__core-js_shared__';

interface SharedData {
  [key: string]: unknown;
}

function setGlobal(key: string, value: SharedData): SharedData {
  (globalThis as any)[key] = value;
  return value;
}

const shared: SharedData = (globalThis as any)[SHARED_KEY] || setGlobal(SHARED_KEY, {});

export default shared;