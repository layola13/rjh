/**
 * Represents a three-dimensional cube with specific dimensions
 */
export declare class test_cube {
  /**
   * The name identifier of the cube
   */
  readonly name: string;

  /**
   * The width dimension of the cube
   */
  readonly width: number;

  /**
   * The height dimension of the cube
   */
  readonly height: number;

  /**
   * The depth dimension of the cube
   */
  readonly depth: number;

  /**
   * Creates a new test_cube instance
   * @param name - The identifier name for the cube
   * @param width - The width dimension
   * @param height - The height dimension
   * @param depth - The depth dimension
   */
  constructor(name: string, width: number, height: number, depth: number);
}