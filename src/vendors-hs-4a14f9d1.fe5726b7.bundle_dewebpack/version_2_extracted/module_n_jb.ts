export interface NumericVersion {
  version: string;
}

export interface BenchmarkOptions {
  duration?: number;
}

export interface DimensionArray extends Array<number> {}

export interface SparseMatrix {
  rowIndices: number[];
  colIndices: number[];
  values: number[];
}

export interface LUDecomposition {
  LU: number[][];
  P: number[];
}

export interface SVDResult {
  U: number[][];
  S: number[];
  V: number[][];
}

export interface QPSolution {
  solution: number[];
  value: number[];
  unconstrained_solution: number[];
  iterations: number[];
  iact: number[];
  message: string;
}

const NUMERIC_VERSION = "1.2.6";
const DEFAULT_PRECISION = 4;
const DEFAULT_LARGE_ARRAY = 50;
const EPSILON = 2.220446049250313e-16;

export function bench(callback: () => void, duration: number = 15): number {
  let iterations = 0.5;
  const startTime = new Date().getTime();

  while (true) {
    iterations *= 2;
    let count = iterations;
    
    while (count > 3) {
      callback();
      callback();
      callback();
      callback();
      count -= 4;
    }
    
    while (count > 0) {
      callback();
      count--;
    }
    
    if (new Date().getTime() - startTime > duration) break;
  }

  let finalCount = iterations;
  while (finalCount > 3) {
    callback();
    callback();
    callback();
    callback();
    finalCount -= 4;
  }
  
  while (finalCount > 0) {
    callback();
    finalCount--;
  }

  return (1000 * (3 * iterations - 1)) / (new Date().getTime() - startTime);
}

function arrayIndexOf<T>(array: T[], element: T): number {
  const length = array.length;
  for (let i = 0; i < length; ++i) {
    if (array[i] === element) return i;
  }
  return -1;
}

export const myIndexOf = Array.prototype.indexOf ?? arrayIndexOf;

export function prettyPrint(value: unknown): string {
  const output: string[] = [];

  function formatNumber(num: number): string {
    if (num === 0) return "0";
    if (isNaN(num)) return "NaN";
    if (num < 0) return "-" + formatNumber(-num);
    
    if (isFinite(num)) {
      let exponent = Math.floor(Math.log(num) / Math.log(10));
      let mantissa = num / Math.pow(10, exponent);
      let mantissaStr = mantissa.toPrecision(DEFAULT_PRECISION);
      
      if (parseFloat(mantissaStr) === 10) {
        exponent++;
        mantissaStr = (mantissa = 1).toPrecision(DEFAULT_PRECISION);
      }
      
      return parseFloat(mantissaStr).toString() + "e" + exponent.toString();
    }
    
    return "Infinity";
  }

  function printValue(val: unknown): boolean {
    if (val === undefined) {
      output.push(Array(DEFAULT_PRECISION + 8).join(" "));
      return false;
    }
    
    if (typeof val === "string") {
      output.push('"' + val + '"');
      return false;
    }
    
    if (typeof val === "boolean") {
      output.push(val.toString());
      return false;
    }
    
    if (typeof val === "number") {
      const exponential = formatNumber(val);
      const precision = val.toPrecision(DEFAULT_PRECISION);
      const standard = parseFloat(val.toString()).toString();
      
      const candidates = [
        exponential,
        precision,
        standard,
        parseFloat(precision).toString(),
        parseFloat(standard).toString()
      ];
      
      let shortest = exponential;
      for (let i = 1; i < candidates.length; i++) {
        if (candidates[i].length < shortest.length) {
          shortest = candidates[i];
        }
      }
      
      output.push(Array(DEFAULT_PRECISION + 8 - shortest.length).join(" ") + shortest);
      return false;
    }
    
    if (val === null) {
      output.push("null");
      return false;
    }
    
    if (typeof val === "function") {
      output.push(val.toString());
      let hasProperties = false;
      
      for (const key in val) {
        if (val.hasOwnProperty(key)) {
          output.push(hasProperties ? ",\n" : "\n{\n");
          hasProperties = true;
          output.push(key);
          output.push(": \n");
          printValue((val as Record<string, unknown>)[key]);
        }
      }
      
      if (hasProperties) output.push("}\n");
      return true;
    }
    
    if (val instanceof Array) {
      if (val.length > DEFAULT_LARGE_ARRAY) {
        output.push("...Large Array...");
        return true;
      }
      
      output.push("[");
      let multiline = false;
      
      for (let i = 0; i < val.length; i++) {
        if (i > 0) {
          output.push(", ");
          if (multiline) output.push("\n ");
        }
        multiline = printValue(val[i]);
      }
      
      output.push("]");
      return true;
    }
    
    output.push("{\n");
    let hasEntries = false;
    
    for (const key in val as object) {
      if ((val as Record<string, unknown>).hasOwnProperty(key)) {
        if (hasEntries) output.push(",\n");
        hasEntries = true;
        output.push(key);
        output.push(": \n");
        printValue((val as Record<string, unknown>)[key]);
      }
    }
    
    output.push("}");
    return true;
  }

  printValue(value);
  return output.join("");
}

export function dim(array: unknown): number[] {
  const dimensions: number[] = [];
  let current: unknown = array;
  
  while (typeof current === "object" && current !== null) {
    if (Array.isArray(current)) {
      dimensions.push(current.length);
      current = current[0];
    } else {
      break;
    }
  }
  
  return dimensions;
}

export function clone<T>(value: T): T {
  if (typeof value !== "object" || value === null) {
    return value;
  }
  
  if (Array.isArray(value)) {
    return value.map(item => clone(item)) as T;
  }
  
  const cloned = {} as T;
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      cloned[key] = clone(value[key]);
    }
  }
  
  return cloned;
}

export function rep<T>(dimensions: number[], value: T): unknown {
  if (dimensions.length === 0) return value;
  
  const size = dimensions[0];
  const result = Array(size);
  
  if (dimensions.length === 1) {
    for (let i = size - 1; i >= 0; i--) {
      result[i] = value;
    }
  } else {
    for (let i = size - 1; i >= 0; i--) {
      result[i] = rep(dimensions.slice(1), value);
    }
  }
  
  return result;
}

export const version = NUMERIC_VERSION;
export const precision = DEFAULT_PRECISION;
export const largeArray = DEFAULT_LARGE_ARRAY;
export const epsilon = EPSILON;