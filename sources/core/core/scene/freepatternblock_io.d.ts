/**
 * Module: FreePatternBlock_IO
 * Original ID: 68073
 * Exports: FreePatternBlock, FreePatternBlock_IO
 */

import { PatternBlock, PatternBlock_IO } from './PatternBlock';
import { Entity } from './Entity';
import { EntityField } from './decorators';
import { Material } from './Material';
import { Pattern } from './Pattern';

/**
 * Point representation in 2D space
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Options for dump operation
 */
export interface DumpOptions {
  [key: string]: unknown;
}

/**
 * Options for load operation
 */
export interface LoadOptions {
  [key: string]: unknown;
}

/**
 * Serialized representation of FreePatternBlock
 */
export interface SerializedFreePatternBlock {
  rotationAngle: number;
  pattern: string;
  [key: string]: unknown;
}

/**
 * Callback function for dump operation
 */
export type DumpCallback = (
  serialized: SerializedFreePatternBlock[],
  entity: FreePatternBlock
) => void;

/**
 * IO handler for FreePatternBlock serialization and deserialization
 */
export declare class FreePatternBlock_IO extends PatternBlock_IO {
  private static _FreePatternBlock_IO_instance?: FreePatternBlock_IO;

  /**
   * Get singleton instance of FreePatternBlock_IO
   */
  static instance(): FreePatternBlock_IO;

  /**
   * Whether to save pattern entity during serialization
   */
  get savePatternEntity(): boolean;

  /**
   * Serialize FreePatternBlock to plain object
   * @param entity - The FreePatternBlock instance to serialize
   * @param callback - Optional callback to modify serialized data
   * @param includeMetadata - Whether to include metadata in serialization
   * @param options - Additional serialization options
   * @returns Array of serialized data
   */
  dump(
    entity: FreePatternBlock,
    callback?: DumpCallback,
    includeMetadata?: boolean,
    options?: DumpOptions
  ): SerializedFreePatternBlock[];

  /**
   * Deserialize plain object to FreePatternBlock
   * @param entity - The FreePatternBlock instance to populate
   * @param data - Serialized data to load from
   * @param options - Additional deserialization options
   */
  load(
    entity: FreePatternBlock,
    data: SerializedFreePatternBlock,
    options?: LoadOptions
  ): void;
}

/**
 * A pattern block that can be freely rotated and positioned
 */
export declare class FreePatternBlock extends PatternBlock {
  private _rotation: number;
  private _originalMaterial?: Material;

  /**
   * Current rotation angle in degrees/radians
   */
  @EntityField({ prefix: '_' })
  rotation: number;

  /**
   * Array of current point positions
   */
  points: Point[];

  /**
   * Array of original point positions before transformations
   */
  originPoints: Point[];

  /**
   * The material applied to this block
   */
  material?: Material;

  /**
   * The original material before modifications
   */
  originalMaterial?: Material;

  /**
   * The pattern applied to this block
   */
  pattern: Pattern;

  /**
   * Creates a new FreePatternBlock instance
   * @param id - Optional unique identifier
   * @param parent - Optional parent entity
   */
  constructor(id?: string, parent?: Entity);

  /**
   * Get the rotation angle of the block
   */
  get rotationAngle(): number;

  /**
   * Set the rotation angle of the block
   */
  set rotationAngle(value: number);

  /**
   * Rotate the block by specified angle around a point
   * @param angle - Rotation angle in degrees/radians
   * @param centerX - X coordinate of rotation center
   * @param centerY - Y coordinate of rotation center
   */
  rotate(angle: number, centerX: number, centerY: number): void;

  /**
   * Apply an affine transformation to the block
   * @param transform - The affine transform to apply
   */
  transform(transform: unknown): void;

  /**
   * Get the IO handler for this entity type
   */
  getIO(): FreePatternBlock_IO;

  /**
   * Create a new FreePatternBlock from an array of points
   * @param points - Array of points defining the block shape
   * @returns New FreePatternBlock instance
   */
  static create(points: Point[]): FreePatternBlock;

  /**
   * Set the material for this block
   * @param material - The material to apply
   * @param preserveOriginal - Whether to preserve the original material
   */
  setMaterial(material: Material, preserveOriginal?: boolean): void;

  /**
   * Get the pattern applied to this block
   */
  getPattern(): Pattern;

  /**
   * Begin a transaction for batch updates
   */
  transact(): void;

  /**
   * Copy properties from another FreePatternBlock
   * @param source - The source block to copy from
   */
  copyFrom(source: FreePatternBlock): void;

  /**
   * Create a deep clone of this block
   */
  clone(): FreePatternBlock;
}