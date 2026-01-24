/**
 * numeric.js - Numerical analysis library for JavaScript
 * Version: 1.2.6
 */

declare namespace numeric {
  type Numeric = number | number[] | number[][];
  type Vector = number[];
  type Matrix = number[][];
  
  interface DimResult {
    length: number;
    [index: number]: number;
  }

  interface LUResult {
    LU: Matrix;
    P: Vector;
  }

  interface SVDResult {
    U: Matrix;
    S: Vector;
    V: Matrix;
  }

  interface EigResult {
    lambda: T;
    E: T;
  }

  interface QRResult {
    Q: Matrix;
    B: number[][];
  }

  interface LPSolution {
    solution: Vector;
    message: string;
    iterations: number;
  }

  interface QPSolution {
    solution: Vector;
    value: Vector;
    unconstrained_solution: Vector;
    iterations: Vector;
    iact: Vector;
    message: string;
  }

  interface EchelonResult {
    I: Matrix;
    A: Matrix;
    P: Vector;
  }

  interface CCSMatrix {
    0: Vector;
    1: Vector;
    2: Vector;
  }

  interface CCSLUPResult {
    L: CCSMatrix;
    U: CCSMatrix;
    P: Vector;
    Pinv: Vector;
  }

  /**
   * Get version string
   */
  const version: string;

  /**
   * Benchmark a function
   * @param func - Function to benchmark
   * @param timeLimit - Time limit in milliseconds (default: 15)
   * @returns Operations per second
   */
  function bench(func: () => void, timeLimit?: number): number;

  /**
   * Get dimensions of array
   * @param array - Input array
   * @returns Array of dimensions
   */
  function dim(array: Numeric): number[];

  /**
   * Clone an array
   * @param array - Input array
   * @returns Deep copy of array
   */
  function clone(array: Numeric): Numeric;

  /**
   * Add two arrays element-wise
   */
  function add(x: Numeric, y: Numeric): Numeric;
  function addVV(x: Vector, y: Vector): Vector;
  function addSV(scalar: number, vector: Vector): Vector;
  function addVS(vector: Vector, scalar: number): Vector;

  /**
   * Subtract two arrays element-wise
   */
  function sub(x: Numeric, y: Numeric): Numeric;
  function subVV(x: Vector, y: Vector): Vector;
  function subSV(scalar: number, vector: Vector): Vector;
  function subVS(vector: Vector, scalar: number): Vector;

  /**
   * Multiply two arrays element-wise
   */
  function mul(x: Numeric, y: Numeric): Numeric;
  function mulVV(x: Vector, y: Vector): Vector;
  function mulSV(scalar: number, vector: Vector): Vector;
  function mulVS(vector: Vector, scalar: number): Vector;

  /**
   * Divide two arrays element-wise
   */
  function div(x: Numeric, y: Numeric): Numeric;
  function divVV(x: Vector, y: Vector): Vector;
  function divSV(scalar: number, vector: Vector): Vector;
  function divVS(vector: Vector, scalar: number): Vector;

  /**
   * Modulo operation
   */
  function mod(x: Numeric, y: Numeric): Numeric;

  /**
   * Dot product or matrix multiplication
   * @param x - First operand
   * @param y - Second operand
   * @returns Scalar, vector, or matrix result
   */
  function dot(x: Numeric, y: Numeric): Numeric;
  function dotVV(x: Vector, y: Vector): number;
  function dotMV(matrix: Matrix, vector: Vector): Vector;
  function dotVM(vector: Vector, matrix: Matrix): Vector;
  function dotMM(a: Matrix, b: Matrix): Matrix;

  /**
   * Create diagonal matrix from vector
   * @param vector - Diagonal elements
   * @returns Diagonal matrix
   */
  function diag(vector: Vector): Matrix;

  /**
   * Get diagonal elements from matrix
   * @param matrix - Input matrix
   * @returns Diagonal elements
   */
  function getDiag(matrix: Matrix): Vector;

  /**
   * Create identity matrix
   * @param size - Matrix dimension
   * @returns Identity matrix
   */
  function identity(size: number): Matrix;

  /**
   * Matrix inversion
   * @param matrix - Input square matrix
   * @returns Inverted matrix
   */
  function inv(matrix: Matrix): Matrix;

  /**
   * Matrix determinant
   * @param matrix - Input square matrix
   * @returns Determinant value
   */
  function det(matrix: Matrix): number;

  /**
   * Matrix transpose
   * @param matrix - Input matrix
   * @returns Transposed matrix
   */
  function transpose(matrix: Matrix): Matrix;

  /**
   * Negated transpose
   * @param matrix - Input matrix
   * @returns Negated transposed matrix
   */
  function negtranspose(matrix: Matrix): Matrix;

  /**
   * Generate random array
   * @param dimensions - Array dimensions
   * @returns Random array
   */
  function random(dimensions: number[]): Numeric;

  /**
   * L2 norm (Euclidean norm)
   * @param vector - Input vector
   * @returns L2 norm
   */
  function norm2(vector: Vector): number;

  /**
   * Squared L2 norm
   * @param vector - Input vector
   * @returns Squared L2 norm
   */
  function norm2Squared(vector: Vector): number;

  /**
   * Infinity norm
   * @param array - Input array
   * @returns Infinity norm
   */
  function norminf(array: Numeric): number;

  /**
   * L1 norm
   * @param array - Input array
   * @returns L1 norm
   */
  function norm1(array: Numeric): number;

  /**
   * Create linearly spaced vector
   * @param start - Start value
   * @param end - End value
   * @param count - Number of points
   * @returns Linearly spaced vector
   */
  function linspace(start: number, end: number, count?: number): Vector;

  /**
   * Create repeated array
   * @param dimensions - Array dimensions
   * @param value - Value to repeat
   * @returns Repeated array
   */
  function rep(dimensions: number[], value: number): Numeric;

  /**
   * LU decomposition
   * @param matrix - Input matrix
   * @param inPlace - Modify matrix in place
   * @returns LU decomposition result
   */
  function LU(matrix: Matrix, inPlace?: boolean): LUResult;

  /**
   * Solve linear system using LU decomposition
   * @param luResult - LU decomposition result
   * @param vector - Right-hand side vector
   * @returns Solution vector
   */
  function LUsolve(luResult: LUResult, vector: Vector): Vector;

  /**
   * Solve linear system
   * @param matrix - Coefficient matrix
   * @param vector - Right-hand side vector
   * @param inPlace - Modify matrix in place
   * @returns Solution vector
   */
  function solve(matrix: Matrix, vector: Vector, inPlace?: boolean): Vector;

  /**
   * Singular Value Decomposition
   * @param matrix - Input matrix
   * @returns SVD result
   */
  function svd(matrix: Matrix): SVDResult;

  /**
   * Eigenvalue decomposition
   * @param matrix - Input square matrix
   * @param maxIterations - Maximum iterations
   * @returns Eigenvalues and eigenvectors
   */
  function eig(matrix: Matrix, maxIterations?: number): EigResult;

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
    maxIterations?: number
  ): LPSolution;

  /**
   * Solve quadratic programming problem
   */
  function solveQP(
    D: Matrix,
    d: Vector,
    A: Matrix,
    b: Vector,
    meq?: number,
    factorized?: [undefined | number, number]
  ): QPSolution;

  /**
   * Gradient of a function
   * @param func - Scalar function
   * @param point - Evaluation point
   * @returns Gradient vector
   */
  function gradient(func: (x: Vector) => number, point: Vector): Vector;

  /**
   * Unconstrained minimization
   */
  function uncmin(
    func: (x: Vector) => number,
    x0: Vector,
    tol?: number,
    gradient?: (x: Vector) => Vector,
    maxIterations?: number,
    callback?: (iteration: number, x: Vector, f: number, gradient: Vector, invHessian: Matrix) => boolean,
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
   * Spline interpolation class
   */
  class Spline {
    x: Vector;
    yl: Vector | Matrix;
    yr: Vector | Matrix;
    kl: Vector | Matrix;
    kr: Vector | Matrix;

    constructor(
      x: Vector,
      yl: Vector | Matrix,
      yr: Vector | Matrix,
      kl: Vector | Matrix,
      kr: Vector | Matrix
    );

    at(x: number | Vector): number | Vector;
    diff(): Spline;
    roots(): Vector | Vector[];
  }

  /**
   * Create cubic spline
   * @param x - X coordinates
   * @param y - Y coordinates
   * @param leftBC - Left boundary condition
   * @param rightBC - Right boundary condition
   * @returns Spline object
   */
  function spline(
    x: Vector,
    y: Vector | Matrix,
    leftBC?: number | string,
    rightBC?: number | string
  ): Spline;

  /**
   * Complex number class
   */
  class T {
    x: Numeric;
    y?: Numeric;

    constructor(x: Numeric, y?: Numeric);

    add(other: T): T;
    sub(other: T): T;
    mul(other: T): T;
    div(other: T): T;
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
    getRows(start: number, end: number): T;
    setRows(start: number, end: number, value: T): T;
    getRow(index: number): T;
    setRow(index: number, value: T): T;
    getBlock(from: number[], to: number[]): T;
    setBlock(from: number[], to: number[], value: T): T;
    getDiag(): T;
    fft(): T;
    ifft(): T;

    static rep(dimensions: number[], value: T): T;
    static diag(value: T): T;
    static identity(size: number): T;
  }

  /**
   * Create complex number
   */
  function t(real: Numeric, imag?: Numeric): T;

  /**
   * Compressed Column Sparse matrix operations
   */
  function ccsSparse(matrix: Matrix): CCSMatrix;
  function ccsFull(ccs: CCSMatrix): Matrix;
  function ccsDim(ccs: CCSMatrix): [number, number];
  function ccsDot(a: CCSMatrix, b: CCSMatrix): CCSMatrix;
  function ccsLUP(ccs: CCSMatrix, threshold?: number): CCSLUPResult;
  function ccsLUPSolve(lup: CCSLUPResult, b: CCSMatrix | Vector): CCSMatrix | Vector;

  /**
   * ODE solver (Dormand-Prince)
   */
  class Dopri {
    x: Vector;
    y: Matrix;
    f: Matrix;
    ymid: Matrix;
    iterations: number;
    events?: unknown;
    message: string;

    at(t: number | Vector): Vector | Matrix;
  }

  function dopri(
    t0: number,
    t1: number,
    y0: Vector,
    func: (t: number, y: Vector) => Vector,
    tol?: number,
    maxIterations?: number,
    eventFunc?: (t: number, y: Vector) => Vector
  ): Dopri;

  // Math functions
  function neg(x: Numeric): Numeric;
  function abs(x: Numeric): Numeric;
  function sin(x: Numeric): Numeric;
  function cos(x: Numeric): Numeric;
  function tan(x: Numeric): Numeric;
  function asin(x: Numeric): Numeric;
  function acos(x: Numeric): Numeric;
  function atan(x: Numeric): Numeric;
  function exp(x: Numeric): Numeric;
  function log(x: Numeric): Numeric;
  function sqrt(x: Numeric): Numeric;
  function floor(x: Numeric): Numeric;
  function ceil(x: Numeric): Numeric;
  function round(x: Numeric): Numeric;
  function isNaN(x: Numeric): boolean | boolean[];
  function isFinite(x: Numeric): boolean | boolean[];

  // Comparison operations
  function eq(x: Numeric, y: Numeric): boolean | boolean[];
  function neq(x: Numeric, y: Numeric): boolean | boolean[];
  function lt(x: Numeric, y: Numeric): boolean | boolean[];
  function gt(x: Numeric, y: Numeric): boolean | boolean[];
  function leq(x: Numeric, y: Numeric): boolean | boolean[];
  function geq(x: Numeric, y: Numeric): boolean | boolean[];

  // Logical operations
  function and(x: Numeric, y: Numeric): boolean | boolean[];
  function or(x: Numeric, y: Numeric): boolean | boolean[];
  function not(x: Numeric): boolean | boolean[];

  // Aggregation functions
  function sum(x: Numeric): number;
  function prod(x: Numeric): number;
  function any(x: Numeric): boolean;
  function all(x: Numeric): boolean;
  function sup(x: Numeric): number;
  function inf(x: Numeric): number;

  // Utility functions
  function same(a: Numeric, b: Numeric): boolean;
  function prettyPrint(value: unknown): string;
  function parseCSV(csv: string): Matrix;
  function toCSV(matrix: Matrix): string;
  function seedrandom: {
    pow: (base: number, exponent: number) => number;
    random: () => number;
  };

  const epsilon: number;
  const precision: number;
  const largeArray: number;
}

export = numeric;
export as namespace numeric;