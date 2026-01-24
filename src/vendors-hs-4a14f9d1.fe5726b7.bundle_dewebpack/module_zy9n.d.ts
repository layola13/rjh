/**
 * numeric.js v1.2.6 - Numerical analysis library for JavaScript
 * Provides matrix operations, linear algebra, optimization, and numerical methods
 */

declare namespace numeric {
  // Version
  const version: string;

  // Core types
  type Scalar = number;
  type Vector = number[];
  type Matrix = number[][];
  type Tensor = number[] | number[][] | number[][][];

  // Configuration
  let precision: number;
  let largeArray: number;
  const epsilon: number;

  // Benchmarking
  /**
   * Benchmark a function by running it repeatedly for a specified duration
   * @param func - Function to benchmark
   * @param timeLimit - Time limit in milliseconds (default: 15)
   * @returns Operations per millisecond
   */
  function bench(func: () => void, timeLimit?: number): number;

  // Utility functions
  /**
   * Find index of element in array (polyfill for Array.indexOf)
   * @param element - Element to find
   * @returns Index of element or -1
   */
  function myIndexOf<T>(this: T[], element: T): number;

  /**
   * Pretty print arrays, matrices, and objects
   * @param data - Data to format
   * @returns Formatted string representation
   */
  function prettyPrint(data: unknown): string;

  // Array dimension and shape
  /**
   * Get dimensions of an array/matrix/tensor
   * @param arr - Input array
   * @returns Array of dimensions [rows, cols, ...]
   */
  function dim(arr: Tensor): number[];

  /**
   * Create array filled with specified value
   * @param dimensions - Array of dimension sizes
   * @param value - Value to fill
   * @param level - Internal recursion level
   * @returns N-dimensional array
   */
  function rep(dimensions: number[], value: Scalar, level?: number): Tensor;

  // Matrix operations
  /**
   * Matrix multiplication (supports various combinations)
   * @param a - First operand (matrix, vector, or scalar)
   * @param b - Second operand (matrix, vector, or scalar)
   * @returns Product
   */
  function dot(a: Tensor | Scalar, b: Tensor | Scalar): Tensor | Scalar;

  /**
   * Matrix-matrix multiplication (small matrices)
   */
  function dotMMsmall(a: Matrix, b: Matrix): Matrix;

  /**
   * Matrix-matrix multiplication (large matrices)
   */
  function dotMMbig(a: Matrix, b: Matrix): Matrix;

  /**
   * Matrix-vector multiplication
   */
  function dotMV(a: Matrix, b: Vector): Vector;

  /**
   * Vector-matrix multiplication
   */
  function dotVM(a: Vector, b: Matrix): Vector;

  /**
   * Vector dot product
   */
  function dotVV(a: Vector, b: Vector): Scalar;

  /**
   * Create diagonal matrix from vector
   * @param values - Diagonal values
   * @returns Diagonal matrix
   */
  function diag(values: Vector): Matrix;

  /**
   * Extract diagonal from matrix
   * @param matrix - Input matrix
   * @returns Diagonal vector
   */
  function getDiag(matrix: Matrix): Vector;

  /**
   * Create identity matrix
   * @param size - Matrix size
   * @returns Identity matrix
   */
  function identity(size: number): Matrix;

  /**
   * Matrix transpose
   * @param matrix - Input matrix
   * @returns Transposed matrix
   */
  function transpose(matrix: Matrix): Matrix;

  /**
   * Negated transpose
   */
  function negtranspose(matrix: Matrix): Matrix;

  /**
   * Matrix inverse
   * @param matrix - Square matrix
   * @returns Inverse matrix
   */
  function inv(matrix: Matrix): Matrix;

  /**
   * Matrix determinant
   * @param matrix - Square matrix
   * @returns Determinant value
   */
  function det(matrix: Matrix): number;

  /**
   * Clone (deep copy) of array/matrix
   * @param arr - Input array
   * @returns Deep copy
   */
  function clone<T extends Tensor>(arr: T): T;

  // Linear algebra
  /**
   * LU decomposition with partial pivoting
   * @param matrix - Input matrix
   * @param inPlace - Modify matrix in place (default: false)
   * @returns LU decomposition object
   */
  function LU(matrix: Matrix, inPlace?: boolean): {
    LU: Matrix;
    P: number[];
  };

  /**
   * Solve linear system Ax = b using LU decomposition
   * @param luDecomp - LU decomposition from numeric.LU
   * @param b - Right-hand side vector
   * @returns Solution vector x
   */
  function LUsolve(luDecomp: { LU: Matrix; P: number[] }, b: Vector): Vector;

  /**
   * Solve linear system Ax = b
   * @param A - Coefficient matrix
   * @param b - Right-hand side vector
   * @param inPlace - Modify A in place
   * @returns Solution vector x
   */
  function solve(A: Matrix, b: Vector, inPlace?: boolean): Vector;

  /**
   * Singular Value Decomposition
   * @param matrix - Input matrix
   * @returns SVD components {U, S, V}
   */
  function svd(matrix: Matrix): {
    U: Matrix;
    S: Vector;
    V: Matrix;
  };

  /**
   * Eigenvalue decomposition
   * @param matrix - Square matrix
   * @param maxIterations - Maximum iterations (default: 1000)
   * @returns Eigenvalues and eigenvectors
   */
  function eig(
    matrix: Matrix,
    maxIterations?: number
  ): {
    lambda: T;
    E: T;
  };

  // Arithmetic operations (element-wise)
  function add(a: Tensor | Scalar, b: Tensor | Scalar): Tensor | Scalar;
  function sub(a: Tensor | Scalar, b: Tensor | Scalar): Tensor | Scalar;
  function mul(a: Tensor | Scalar, b: Tensor | Scalar): Tensor | Scalar;
  function div(a: Tensor | Scalar, b: Tensor | Scalar): Tensor | Scalar;
  function neg(a: Tensor | Scalar): Tensor | Scalar;

  // In-place operations
  function addeq(a: Tensor, b: Tensor | Scalar): Tensor;
  function subeq(a: Tensor, b: Tensor | Scalar): Tensor;
  function muleq(a: Tensor, b: Tensor | Scalar): Tensor;
  function diveq(a: Tensor, b: Tensor | Scalar): Tensor;

  // Math functions (element-wise)
  function abs(a: Tensor | Scalar): Tensor | Scalar;
  function sqrt(a: Tensor | Scalar): Tensor | Scalar;
  function sin(a: Tensor | Scalar): Tensor | Scalar;
  function cos(a: Tensor | Scalar): Tensor | Scalar;
  function exp(a: Tensor | Scalar): Tensor | Scalar;
  function log(a: Tensor | Scalar): Tensor | Scalar;
  function floor(a: Tensor | Scalar): Tensor | Scalar;
  function ceil(a: Tensor | Scalar): Tensor | Scalar;
  function round(a: Tensor | Scalar): Tensor | Scalar;

  // Reductions
  function sum(arr: Tensor): Scalar;
  function prod(arr: Tensor): Scalar;
  function norm2(arr: Vector): number;
  function norm2Squared(arr: Vector): number;
  function norminf(arr: Tensor): number;
  function norm1(arr: Tensor): number;
  function sup(arr: Tensor): number;
  function inf(arr: Tensor): number;
  function any(arr: Tensor): boolean;
  function all(arr: Tensor): boolean;

  // Random and ranges
  /**
   * Generate random array
   * @param dimensions - Array dimensions
   * @returns Random array
   */
  function random(dimensions: number[]): Tensor;

  /**
   * Generate linearly spaced vector
   * @param start - Start value
   * @param end - End value
   * @param count - Number of points
   * @returns Vector of evenly spaced values
   */
  function linspace(start: number, end: number, count?: number): Vector;

  // Block operations
  function getBlock(arr: Tensor, from: number[], to: number[]): Tensor;
  function setBlock(
    arr: Tensor,
    from: number[],
    to: number[],
    block: Tensor
  ): Tensor;

  // Sparse matrices (CCS format)
  type SparseMatrix = [number[], number[], number[]]; // [colPtr, rowIdx, values]

  function ccsSparse(matrix: Matrix): SparseMatrix;
  function ccsFull(sparse: SparseMatrix): Matrix;
  function ccsDot(a: SparseMatrix, b: SparseMatrix): SparseMatrix;
  function ccsLUP(sparse: SparseMatrix, threshold?: number): {
    L: SparseMatrix;
    U: SparseMatrix;
    P: number[];
    Pinv: number[];
  };

  // Complex number support
  class T {
    x: Tensor | Scalar;
    y?: Tensor | Scalar;

    constructor(real: Tensor | Scalar, imag?: Tensor | Scalar);

    add(other: T | Scalar): T;
    sub(other: T | Scalar): T;
    mul(other: T | Scalar): T;
    div(other: T | Scalar): T;
    dot(other: T): T;
    transpose(): T;
    transjugate(): T;
    exp(): T;
    conj(): T;
    neg(): T;
    sin(): T;
    cos(): T;
    abs(): T;
    log(): T;
    norm2(): number;
    inv(): T;
    get(indices: number[]): T;
    set(indices: number[], value: T): T;
    getBlock(from: number[], to: number[]): T;
    getDiag(): T;
    fft(): T;
    ifft(): T;

    static rep(dimensions: number[], value: T): T;
    static diag(values: T): T;
    static identity(size: number): T;
  }

  function t(real: Tensor | Scalar, imag?: Tensor | Scalar): T;

  // Optimization
  /**
   * Unconstrained minimization using quasi-Newton method
   * @param objective - Objective function f(x)
   * @param x0 - Initial guess
   * @param tolerance - Convergence tolerance
   * @param gradient - Gradient function (optional, uses numeric gradient if omitted)
   * @param maxIterations - Maximum iterations
   * @param callback - Callback function
   * @param options - Additional options
   * @returns Optimization result
   */
  function uncmin(
    objective: (x: Vector) => number,
    x0: Vector,
    tolerance?: number,
    gradient?: (x: Vector) => Vector,
    maxIterations?: number,
    callback?: (
      iter: number,
      x: Vector,
      f: number,
      grad: Vector,
      H: Matrix
    ) => boolean,
    options?: { Hinv?: Matrix }
  ): {
    solution: Vector;
    f: number;
    gradient: Vector;
    invHessian: Matrix;
    iterations: number;
    message: string;
  };

  /**
   * Numerical gradient computation
   * @param func - Scalar function
   * @param x - Point to evaluate gradient
   * @returns Gradient vector
   */
  function gradient(func: (x: Vector) => number, x: Vector): Vector;

  /**
   * Solve linear programming problem
   */
  function solveLP(
    c: Vector,
    A: Matrix,
    b: Vector,
    Aeq?: Matrix,
    beq?: Vector,
    tol?: number,
    maxit?: number
  ): {
    solution: Vector;
    message: string;
    iterations: number;
  };

  /**
   * Solve quadratic programming problem
   */
  function solveQP(
    Dmat: Matrix,
    dvec: Vector,
    Amat: Matrix,
    bvec: Vector,
    meq?: number,
    factorized?: number[]
  ): {
    solution: Vector;
    value: number[];
    unconstrained_solution: Vector;
    iterations: number[];
    iact: number[];
    message: string;
  };

  // Splines
  class Spline {
    x: Vector;
    yl: Tensor;
    yr: Tensor;
    kl: Tensor;
    kr: Tensor;

    constructor(
      x: Vector,
      yl: Tensor,
      yr: Tensor,
      kl: Tensor,
      kr: Tensor
    );

    at(x: number | Vector): Tensor | Scalar;
    diff(): Spline;
    roots(): Vector | Vector[];
  }

  /**
   * Create cubic spline interpolation
   * @param x - X coordinates
   * @param y - Y coordinates
   * @param k0 - Left boundary condition
   * @param kn - Right boundary condition
   * @returns Spline object
   */
  function spline(
    x: Vector,
    y: Tensor,
    k0?: Vector | string,
    kn?: Vector | string
  ): Spline;

  // ODE solver
  class Dopri {
    x: Vector;
    y: Tensor[];
    f: Tensor[];
    ymid: Tensor[];
    iterations: number;
    events?: boolean[];
    message: string;

    at(t: number | Vector): Tensor;
  }

  /**
   * Solve ODE using Dormand-Prince method
   * @param x0 - Initial time
   * @param x1 - Final time
   * @param y0 - Initial state
   * @param f - Derivative function dy/dt = f(t, y)
   * @param tol - Tolerance
   * @param maxIterations - Maximum iterations
   * @param eventFunc - Event detection function
   * @returns Solution object
   */
  function dopri(
    x0: number,
    x1: number,
    y0: Tensor,
    f: (t: number, y: Tensor) => Tensor,
    tol?: number,
    maxIterations?: number,
    eventFunc?: (t: number, y: Tensor) => Tensor | Scalar
  ): Dopri;

  // FFT
  function fftpow2(real: Vector, imag: Vector): void;
  function ifftpow2(real: Vector, imag: Vector): void;

  // Miscellaneous
  function seedrandom: {
    (seed?: unknown, useEntropy?: boolean): string;
    pow: typeof Math.pow;
    random: typeof Math.random;
  };

  function parseCSV(csv: string): (string | number)[][];
  function toCSV(matrix: Matrix): string;
  function imageURL(rgb: [Matrix, Matrix, Matrix]): string;
}

export = numeric;
export as namespace numeric;