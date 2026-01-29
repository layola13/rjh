const globalThis = (typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {}) as any;

const setGlobal = (key: string, value: any): any => {
  globalThis[key] = value;
  return value;
};

const CORE_JS_SHARED = "__core-js_shared__";

const coreJsShared = globalThis[CORE_JS_SHARED] || setGlobal(CORE_JS_SHARED, {});

export default coreJsShared;