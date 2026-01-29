interface PolyfillModule {
  Polyfill: PromiseConstructor;
}

interface ObjectAssignModule {
  default: typeof Object.assign;
}

interface GlobalThisPolyfill {
  performance?: Performance;
  requestAnimationFrame?: (callback: FrameRequestCallback) => number;
  cancelAnimationFrame?: (handle: number) => void;
  Promise?: PromiseConstructor;
  ArrayBuffer?: ArrayBufferConstructor;
  Float32Array?: Float32ArrayConstructor;
  Uint32Array?: Uint32ArrayConstructor;
  Uint16Array?: Uint16ArrayConstructor;
  Uint8Array?: Uint8ArrayConstructor;
  Int32Array?: Int32ArrayConstructor;
  [key: string]: unknown;
}

import { Polyfill as PromisePolyfill } from '@pixi/polyfill-promise';
import objectAssignPolyfill from '@pixi/polyfill-object-assign';

/**
 * @pixi/polyfill - v5.2.4
 * Compiled Sun, 03 May 2020 22:38:52 UTC
 *
 * @pixi/polyfill is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */

if (!window.Promise) {
  window.Promise = PromisePolyfill;
}

if (!Object.assign) {
  Object.assign = objectAssignPolyfill;
}

const globalScope: GlobalThisPolyfill & typeof globalThis =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
    ? window
    : typeof self !== 'undefined'
    ? self
    : ({} as GlobalThisPolyfill & typeof globalThis);

if (!Date.now || !Date.prototype.getTime) {
  Date.now = function (): number {
    return new Date().getTime();
  };
}

if (!globalScope.performance || !globalScope.performance.now) {
  const performanceStartTime = Date.now();
  
  if (!globalScope.performance) {
    globalScope.performance = {} as Performance;
  }
  
  globalScope.performance.now = function (): number {
    return Date.now() - performanceStartTime;
  };
}

let lastFrameTime = Date.now();
const vendorPrefixes = ['ms', 'moz', 'webkit', 'o'];

for (let index = 0; index < vendorPrefixes.length && !globalScope.requestAnimationFrame; ++index) {
  const prefix = vendorPrefixes[index];
  globalScope.requestAnimationFrame = globalScope[`${prefix}RequestAnimationFrame`] as (callback: FrameRequestCallback) => number;
  globalScope.cancelAnimationFrame =
    (globalScope[`${prefix}CancelAnimationFrame`] as (handle: number) => void) ??
    (globalScope[`${prefix}CancelRequestAnimationFrame`] as (handle: number) => void);
}

if (!globalScope.requestAnimationFrame) {
  globalScope.requestAnimationFrame = function (callback: FrameRequestCallback): number {
    if (typeof callback !== 'function') {
      throw new TypeError(`${callback} is not a function`);
    }
    
    const currentTime = Date.now();
    const frameDuration = 16;
    let timeToCall = frameDuration + lastFrameTime - currentTime;
    
    if (timeToCall < 0) {
      timeToCall = 0;
    }
    
    lastFrameTime = currentTime;
    
    return setTimeout(() => {
      lastFrameTime = Date.now();
      callback(performance.now());
    }, timeToCall);
  };
}

if (!globalScope.cancelAnimationFrame) {
  globalScope.cancelAnimationFrame = function (handle: number): void {
    clearTimeout(handle);
  };
}

if (!Math.sign) {
  Math.sign = function (value: number): number {
    const numValue = Number(value);
    if (numValue === 0 || isNaN(numValue)) {
      return numValue;
    }
    return numValue > 0 ? 1 : -1;
  };
}

if (!Number.isInteger) {
  Number.isInteger = function (value: unknown): value is number {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
  };
}

if (!window.ArrayBuffer) {
  (window as unknown as { ArrayBuffer: ArrayConstructor }).ArrayBuffer = Array as unknown as ArrayBufferConstructor;
}

if (!window.Float32Array) {
  (window as unknown as { Float32Array: ArrayConstructor }).Float32Array = Array as unknown as Float32ArrayConstructor;
}

if (!window.Uint32Array) {
  (window as unknown as { Uint32Array: ArrayConstructor }).Uint32Array = Array as unknown as Uint32ArrayConstructor;
}

if (!window.Uint16Array) {
  (window as unknown as { Uint16Array: ArrayConstructor }).Uint16Array = Array as unknown as Uint16ArrayConstructor;
}

if (!window.Uint8Array) {
  (window as unknown as { Uint8Array: ArrayConstructor }).Uint8Array = Array as unknown as Uint8ArrayConstructor;
}

if (!window.Int32Array) {
  (window as unknown as { Int32Array: ArrayConstructor }).Int32Array = Array as unknown as Int32ArrayConstructor;
}