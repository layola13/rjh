/**
 * numeric.js - Numerical analysis library for JavaScript
 * Version: 1.2.6
 */

interface NumericLibrary {
  version: string;
  bench(fn: () => void, timeMs?: number): number;
  dim(array: any): number[];
  clone<T>(value: T): T;
  dot(a: any, b: any): any;
  add(...args: any[]): any;
  sub(...args: any[]): any;
  mul(...args: any[]): any;
  div(...args: any[]): any;
  inv(matrix: number[][]): number[][];
  det(matrix: number[][]): number;
  transpose(matrix: number[][]): number[][];
  identity(size: number): number[][];
  diag(diagonal: number[]): number[][];
  random(dimensions: number[]): any;
  rep(dimensions: number[], value: any): any;
  solve(A: number[][], b: number[], inPlace?: boolean): number[];
  eig(matrix: number[][], maxIterations?: number): { lambda: any; E: any };
  svd(matrix: number[][]): { U: number[][]; S: number[]; V: number[][] };
  [key: string]: any;
}

declare const numeric: NumericLibrary;

if (typeof global !== 'undefined') {
  (global as any).numeric = numeric;
}

numeric.version = '1.2.6';

/**
 * Benchmark a function by running it repeatedly for a specified time
 * @param fn - Function to benchmark
 * @param timeMs - Duration in milliseconds (default: 15ms)
 * @returns Operations per second
 */
numeric.bench = function(fn: () => void, timeMs: number = 15): number {
  let startTime: number;
  let repetitions: number;
  let iterations: number;

  for (repetitions = 0.5, startTime = Date.now(); ; ) {
    repetitions *= 2;
    for (iterations = repetitions; iterations > 3; iterations -= 4) {
      fn();
      fn();
      fn();
      fn();
    }
    while (iterations > 0) {
      fn();
      iterations--;
    }
    if (Date.now() - startTime > timeMs) break;
  }

  for (iterations = repetitions; iterations > 3; iterations -= 4) {
    fn();
    fn();
    fn();
    fn();
  }
  while (iterations > 0) {
    fn();
    iterations--;
  }

  return (1000 * (3 * repetitions - 1)) / (Date.now() - startTime);
};

numeric._myIndexOf = function<T>(this: T[], item: T): number {
  const length = this.length;
  for (let i = 0; i < length; ++i) {
    if (this[i] === item) return i;
  }
  return -1;
};

numeric.myIndexOf = Array.prototype.indexOf ?? numeric._myIndexOf;

numeric.Function = Function;

numeric.precision = 4;

numeric.largeArray = 50;

/**
 * Pretty print numbers, arrays, and objects with scientific notation
 */
numeric.prettyPrint = function(value: any): string {
  const outputBuffer: string[] = [];

  function formatNumber(num: number): string {
    if (num === 0) return '0';
    if (isNaN(num)) return 'NaN';
    if (num < 0) return '-' + formatNumber(-num);
    if (isFinite(num)) {
      let exponent = Math.floor(Math.log(num) / Math.log(10));
      let mantissa = num / Math.pow(10, exponent);
      let formatted = mantissa.toPrecision(numeric.precision);

      if (parseFloat(formatted) === 10) {
        exponent++;
        mantissa = 1;
        formatted = mantissa.toPrecision(numeric.precision);
      }

      return parseFloat(formatted).toString() + 'e' + exponent.toString();
    }
    return 'Infinity';
  }

  function process(val: any): boolean {
    if (val === undefined) {
      outputBuffer.push(Array(numeric.precision + 8).join(' '));
      return false;
    }

    if (typeof val === 'string') {
      outputBuffer.push('"' + val + '"');
      return false;
    }

    if (typeof val === 'boolean') {
      outputBuffer.push(val.toString());
      return false;
    }

    if (typeof val === 'number') {
      const scientific = formatNumber(val);
      const precision = val.toPrecision(numeric.precision);
      const regular = parseFloat(val.toString()).toString();
      const candidates = [
        scientific,
        precision,
        regular,
        parseFloat(precision).toString(),
        parseFloat(regular).toString()
      ];

      let shortest = scientific;
      for (let i = 1; i < candidates.length; i++) {
        if (candidates[i].length < shortest.length) {
          shortest = candidates[i];
        }
      }

      outputBuffer.push(Array(numeric.precision + 8 - shortest.length).join(' ') + shortest);
      return false;
    }

    if (val === null) {
      outputBuffer.push('null');
      return false;
    }

    if (typeof val === 'function') {
      outputBuffer.push(val.toString());
      let hasProperties = false;
      for (const key in val) {
        if (val.hasOwnProperty(key)) {
          outputBuffer.push(hasProperties ? ',\n' : '\n{\n');
          hasProperties = true;
          outputBuffer.push(key);
          outputBuffer.push(': \n');
          process((val as any)[key]);
        }
      }
      if (hasProperties) outputBuffer.push('\n}\n');
      return true;
    }

    if (val instanceof Array) {
      if (val.length > numeric.largeArray) {
        outputBuffer.push('...Large Array...');
        return true;
      }

      let multiline = false;
      outputBuffer.push('[');
      for (let i = 0; i < val.length; i++) {
        if (i > 0) {
          outputBuffer.push(', ');
          if (multiline) outputBuffer.push('\n ');
        }
        multiline = process(val[i]);
      }
      outputBuffer.push(']');
      return true;
    }

    outputBuffer.push('{\n');
    let hasKeys = false;
    for (const key in val) {
      if (val.hasOwnProperty(key)) {
        if (hasKeys) outputBuffer.push(',\n');
        hasKeys = true;
        outputBuffer.push(key);
        outputBuffer.push(': \n');
        process(val[key]);
      }
    }
    outputBuffer.push('\n}');
    return true;
  }

  process(value);
  return outputBuffer.join('');
};

/**
 * Parse date strings or arrays of date strings
 */
numeric.parseDate = function(input: string | string[]): number | number[] {
  function parse(data: string | string[]): number | number[] {
    if (typeof data === 'string') {
      return Date.parse(data.replace(/-/g, '/'));
    }
    if (!(data instanceof Array)) {
      throw new Error('parseDate: parameter must be arrays of strings');
    }
    const result: number[] = [];
    for (let i = 0; i < data.length; i++) {
      result[i] = parse(data[i]) as number;
    }
    return result;
  }

  return parse(input);
};

/**
 * Parse float strings or arrays recursively
 */
numeric.parseFloat = function(input: string | string[]): number | number[] {
  function parse(data: string | string[]): number | number[] {
    if (typeof data === 'string') {
      return parseFloat(data);
    }
    if (!(data instanceof Array)) {
      throw new Error('parseFloat: parameter must be arrays of strings');
    }
    const result: number[] = [];
    for (let i = 0; i < data.length; i++) {
      result[i] = parse(data[i]) as number;
    }
    return result;
  }

  return parse(input);
};

/**
 * Parse CSV text into 2D array
 */
numeric.parseCSV = function(csvText: string): any[][] {
  const lines = csvText.split('\n');
  const result: any[][] = [];
  const cellPattern = /(([^'",]*)|('[^']*')|("[^"]*")),/g;
  const numberPattern = /^\s*(([+-]?[0-9]+(\.[0-9]*)?(e[+-]?[0-9]+)?)|([+-]?[0-9]*(\.[0-9]+)?(e[+-]?[0-9]+)?))\s*$/;

  const trimLast = (str: string): string => str.substr(0, str.length - 1);

  let outputRow = 0;
  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const cells = (lines[lineIdx] + ', ').match(cellPattern);
    if (cells && cells.length > 0) {
      result[outputRow] = [];
      for (let cellIdx = 0; cellIdx < cells.length; cellIdx++) {
        const cellValue = trimLast(cells[cellIdx]);
        result[outputRow][cellIdx] = numberPattern.test(cellValue)
          ? parseFloat(cellValue)
          : cellValue;
      }
      outputRow++;
    }
  }

  return result;
};

/**
 * Convert 2D array to CSV string
 */
numeric.toCSV = function(data: any[][]): string {
  const dimensions = numeric.dim(data);
  const rows = dimensions[0];
  const outputLines: string[] = [];

  for (let i = 0; i < rows; i++) {
    const row: string[] = [];
    for (let j = 0; j < rows; j++) {
      row[j] = data[i][j].toString();
    }
    outputLines[i] = row.join(', ');
  }

  return outputLines.join('\n') + '\n';
};

/**
 * Synchronous XMLHttpRequest GET
 */
numeric.getURL = function(url: string): XMLHttpRequest {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send();
  return xhr;
};

// Additional utility functions and matrix operations would continue...
// Due to length constraints, this shows the pattern for the complete conversion

export { numeric };