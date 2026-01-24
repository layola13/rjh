/**
 * Numeric.js - JavaScript library for numerical computing
 * Version: 1.2.6
 */

interface NumericStatic {
  version: string;
  precision: number;
  largeArray: number;
  epsilon: number;
  
  bench(fn: () => void, duration?: number): number;
  prettyPrint(obj: unknown): string;
  dim(array: unknown): number[];
  clone<T>(array: T): T;
  
  // Matrix operations
  dot(a: number[][] | number[], b: number[][] | number[]): number[][] | number[] | number;
  identity(size: number): number[][];
  diag(diagonal: number[]): number[][];
  getDiag(matrix: number[][]): number[];
  transpose(matrix: number[][]): number[][];
  inv(matrix: number[][]): number[][];
  det(matrix: number[][]): number;
  
  // Vector operations
  add(...args: (number | number[] | number[][])[]):  number | number[] | number[][];
  sub(...args: (number | number[] | number[][])[]):  number | number[] | number[][];
  mul(...args: (number | number[] | number[][])[]):  number | number[] | number[][];
  div(...args: (number | number[] | number[][])[]):  number | number[] | number[][];
  
  norm2(vector: number[]): number;
  linspace(start: number, end: number, count?: number): number[];
  rep(dimensions: number[], value: number): number[] | number[][];
  random(dimensions: number[]): number[] | number[][];
  
  // Sparse matrix
  ccsSparse(matrix: number[][]): [number[], number[], number[]];
  ccsFull(ccs: [number[], number[], number[]]): number[][];
  
  // Linear algebra
  solve(A: number[][], b: number[]): number[];
  svd(matrix: number[][]): { U: number[][], S: number[], V: number[][] };
  eig(matrix: number[][]): { lambda: unknown, E: unknown };
  
  // Optimization
  uncmin(
    f: (x: number[]) => number,
    x0: number[],
    tol?: number,
    gradient?: (x: number[]) => number[],
    maxIterations?: number,
    callback?: (iteration: number, x: number[], fx: number, gradient: number[], invHessian: number[][]) => boolean,
    options?: { Hinv?: number[][] }
  ): {
    solution: number[];
    f: number;
    gradient: number[];
    invHessian: number[][];
    iterations: number;
    message: string;
  };
  
  solveQP(
    Dmat: number[][],
    dvec: number[],
    Amat: number[][],
    bvec?: number[],
    meq?: number,
    factorized?: [undefined, number]
  ): {
    solution: number[];
    value: number[];
    unconstrained_solution: number[];
    iterations: number[];
    iact: number[];
    message: string;
  };
  
  // Interpolation
  spline(
    x: number[],
    y: number[] | number[][],
    k1?: number | number[] | string,
    kn?: number | number[] | string
  ): Spline;
  
  // FFT
  fftpow2(real: number[], imag: number[]): void;
  ifftpow2(real: number[], imag: number[]): void;
  
  // Utilities
  parseCSV(csv: string): (string | number)[][];
  toCSV(matrix: (string | number)[][]): string;
  seedrandom: {
    pow: typeof Math.pow;
    random: typeof Math.random;
  };
}

interface Spline {
  x: number[];
  yl: number[] | number[][];
  yr: number[] | number[][];
  kl: number[] | number[][];
  kr: number[] | number[][];
  
  at(x: number | number[]): number | number[] | number[][];
  diff(): Spline;
  roots(): number[] | number[][];
}

declare const numeric: NumericStatic;

if (typeof global !== 'undefined') {
  (global as any).numeric = numeric;
}

numeric.version = "1.2.6";

/**
 * Benchmark a function by running it repeatedly
 * @param fn - Function to benchmark
 * @param duration - Target duration in milliseconds (default: 15)
 * @returns Operations per second
 */
numeric.bench = function(fn: () => void, duration: number = 15): number {
  let count = 0.5;
  const startTime = Date.now();
  
  while (true) {
    count *= 2;
    let iterations = count;
    
    while (iterations > 3) {
      fn(); fn(); fn(); fn();
      iterations -= 4;
    }
    while (iterations > 0) {
      fn();
      iterations--;
    }
    
    if (Date.now() - startTime > duration) break;
  }
  
  let iterations = count;
  while (iterations > 3) {
    fn(); fn(); fn(); fn();
    iterations -= 4;
  }
  while (iterations > 0) {
    fn();
    iterations--;
  }
  
  return (3 * count - 1) * 1000 / (Date.now() - startTime);
};

// Additional type definitions would continue here...
// This is a partial conversion focusing on the main API surface

export = numeric;