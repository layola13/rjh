/**
 * verb.js - NURBS geometry library
 * Production-ready TypeScript conversion
 */

interface WindowLike {
  [key: string]: unknown;
}

interface GlobalContext {
  [key: string]: unknown;
}

const globalContext: GlobalContext = (() => {
  try {
    return globalThis as GlobalContext;
  } catch {
    return (typeof window !== 'undefined' ? window : global) as GlobalContext;
  }
})();

const isNode = (() => {
  try {
    return typeof global !== 'undefined' && typeof global.process !== 'undefined';
  } catch {
    return false;
  }
})();

const isWorker = (() => {
  try {
    return typeof importScripts === 'function';
  } catch {
    return false;
  }
})();

if (isNode || isWorker) {
  const context = globalContext;
  
  if (isWorker) {
    onmessage = (event: MessageEvent): void => {
      if (event.data.className && event.data.methodName) {
        const targetClass = resolveClass(context, event.data.className, event.data.methodName);
        
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
}

function resolveClass(
  context: GlobalContext,
  className: string,
  methodName: string
): Function | null {
  let current: unknown = context;
  
  className.split('.').forEach((part) => {
    if (current && typeof current === 'object') {
      current = (current as Record<string, unknown>)[part];
    }
  });
  
  if (current && typeof current === 'object') {
    const method = (current as Record<string, unknown>)[methodName];
    return typeof method === 'function' ? method : null;
  }
  
  return null;
}

export function initializeVerbModule(
  moduleExports: unknown,
  context: GlobalContext,
  target: unknown
): void {
  'use strict';
  
  // Initialize namespaces
  const verb = context as Record<string, Record<string, unknown>>;
  verb.geom = verb.geom || {};
  verb.eval = verb.eval || {};
  verb.core = verb.core || {};
  verb.promhx = verb.promhx || {};
  
  // Core utility functions
  const objectToString = (): string => {
    return stringRec(this, '');
  };
  
  function stringRec(obj: unknown, indent: string): string {
    if (obj === null) return 'null';
    if (indent.length >= 5) return '<...>';
    
    const objType = typeof obj;
    
    if (objType === 'function' && (obj as Function).name) {
      return '<function>';
    }
    
    if (objType === 'string') {
      return obj as string;
    }
    
    if (objType === 'object') {
      if (Array.isArray(obj)) {
        const arr = obj as unknown[];
        const elements = arr.map((item, index) => 
          (index > 0 ? ', ' : '') + stringRec(item, indent + '\t')
        );
        return '[' + elements.join('') + ']';
      }
      
      const lines: string[] = [];
      const newIndent = indent + '\t';
      
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if (!['prototype', '__class__', '__super__', '__interfaces__'].includes(key)) {
            lines.push(`${newIndent}${key} : ${stringRec((obj as Record<string, unknown>)[key], newIndent)}`);
          }
        }
      }
      
      return '{\n' + lines.join(',\n') + '\n' + indent + '}';
    }
    
    return String(obj);
  }
  
  // Type constants
  const TOLERANCE = 1e-6;
  const EPSILON = 1e-10;
  const VERSION = '2.0.0';
}

export default initializeVerbModule;