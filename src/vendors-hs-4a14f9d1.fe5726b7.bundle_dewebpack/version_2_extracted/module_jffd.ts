/**
 * Verb - A CAD library for NURBS geometry
 * Main module exports
 */

// Type definitions for complex structures
interface NurbsCurveData {
  degree: number;
  knots: number[];
  controlPoints: number[][];
}

interface NurbsSurfaceData {
  degreeU: number;
  degreeV: number;
  knotsU: number[];
  knotsV: number[];
  controlPoints: number[][][];
}

interface MeshData {
  faces: number[][];
  points: number[][];
  normals: number[][];
  uvs: number[][];
}

interface PolylineData {
  points: number[][];
  params: number[];
}

interface VolumeData {
  degreeU: number;
  degreeV: number;
  degreeW: number;
  knotsU: number[];
  knotsV: number[];
  knotsW: number[];
  controlPoints: number[][][][];
}

// Core constants
const TOLERANCE = 1e-6;
const EPSILON = 1e-10;
const TWO_PI = 2 * Math.PI;

/**
 * Check if running in browser (window object exists)
 */
function isBrowser(): boolean {
  try {
    return this === window;
  } catch (e) {
    return false;
  }
}

/**
 * Check if running in Node.js (global object exists)
 */
function isNode(): boolean {
  try {
    return this === global;
  } catch (e) {
    return false;
  }
}

/**
 * Check if running in Web Worker
 */
function isWebWorker(): boolean {
  try {
    return typeof importScripts === 'function';
  } catch (e) {
    return false;
  }
}

// Environment detection
const globalContext = (function(): unknown {
  if (isBrowser() || isWebWorker()) {
    return this;
  }
  return undefined;
})();

/**
 * Web Worker message handler for method invocation
 */
if (isWebWorker() && globalContext) {
  onmessage = function(event: MessageEvent): void {
    if (event.data.className && event.data.methodName) {
      const targetClass = resolveClass(event.data.className, event.data.methodName);
      
      if (!targetClass) {
        console.error(`could not find ${event.data.className}.${event.data.methodName}`);
        return;
      }
      
      postMessage({
        result: targetClass.apply(null, event.data.args),
        id: event.data.id
      });
    }
  };
}

/**
 * Resolve a class method from a dot-notation path
 */
function resolveClass(className: string, methodName: string): Function | null {
  let context: any = globalContext;
  
  className.split('.').forEach((part: string) => {
    if (context) {
      context = context[part];
    }
  });
  
  return context ? context[methodName] : null;
}

/**
 * Main Verb namespace initialization
 */
const VerbModule = (function(console: Console, exports: any, global: any): any {
  'use strict';
  
  // Initialize sub-namespaces
  const verb = {
    geom: {},
    eval: {},
    core: {},
    promhx: {}
  };
  
  /**
   * String representation for objects
   */
  function objectToString(obj: any, indent: string): string {
    // Implementation of recursive string conversion
    return JSON.stringify(obj);
  }
  
  /**
   * Create inheritance chain
   */
  function extend<T, U>(baseClass: { new(): T }, derived: U): T & U {
    function TempConstructor() {}
    TempConstructor.prototype = baseClass.prototype;
    
    const instance = new (TempConstructor as any)() as T & U;
    
    for (const key in derived) {
      if (derived.hasOwnProperty(key)) {
        (instance as any)[key] = derived[key];
      }
    }
    
    if (derived.toString !== Object.prototype.toString) {
      instance.toString = derived.toString as any;
    }
    
    return instance;
  }
  
  /**
   * HxOverrides - Haxe compatibility layer
   */
  class HxOverrides {
    static strDate(dateStr: string): Date {
      switch (dateStr.length) {
        case 8: {
          const parts = dateStr.split(':');
          const date = new Date();
          date.setTime(0);
          date.setUTCHours(parseInt(parts[0]));
          date.setUTCMinutes(parseInt(parts[1]));
          date.setUTCSeconds(parseInt(parts[2]));
          return date;
        }
        case 10: {
          const parts = dateStr.split('-');
          return new Date(
            parseInt(parts[0]),
            parseInt(parts[1]) - 1,
            parseInt(parts[2]),
            0, 0, 0
          );
        }
        case 19: {
          const segments = dateStr.split(' ');
          const dateParts = segments[0].split('-');
          const timeParts = segments[1].split(':');
          return new Date(
            parseInt(dateParts[0]),
            parseInt(dateParts[1]) - 1,
            parseInt(dateParts[2]),
            parseInt(timeParts[0]),
            parseInt(timeParts[1]),
            parseInt(timeParts[2])
          );
        }
        default:
          throw new Error(`Invalid date format: ${dateStr}`);
      }
    }
    
    static cca(str: string, index: number): number | undefined {
      const charCode = str.charCodeAt(index);
      return charCode === charCode ? charCode : undefined;
    }
    
    static substr(str: string, pos: number | null, len?: number | null): string {
      if (pos != null && pos !== 0 && len != null && len < 0) {
        return '';
      }
      
      if (len == null) {
        len = str.length;
      }
      
      if (pos != null && pos < 0) {
        pos = str.length + pos;
        if (pos < 0) pos = 0;
      } else if (len < 0) {
        len = str.length + len - (pos ?? 0);
      }
      
      return str.substr(pos ?? 0, len);
    }
    
    static iter<T>(arr: T[]): Iterator<T> {
      let current = 0;
      return {
        hasNext(): boolean {
          return current < arr.length;
        },
        next(): T {
          return arr[current++];
        }
      };
    }
  }
  
  return verb;
})(
  typeof console !== 'undefined' ? console : ({} as Console),
  typeof exports !== 'undefined' ? exports : undefined,
  typeof global !== 'undefined' ? global : (typeof self !== 'undefined' ? self : this)
);

export default VerbModule;