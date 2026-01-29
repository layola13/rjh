import polyfill from './polyfill';

const globalContext: Window | WorkerGlobalScope | typeof globalThis = 
  typeof self !== 'undefined' 
    ? self 
    : typeof window !== 'undefined' 
      ? window 
      : globalThis;

const result = polyfill(globalContext);

export default result;