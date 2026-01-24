/**
 * Vertex Module
 * Provides 3D coordinate vertex representation and management
 */

import { Entity, Entity_IO } from './Entity';
import { nearlyEquals } from './MathUtils';
import { EntityField, isValidNumber } from './EntityDecorators';

/**
 * Vertex movement type enumeration
 * Defines how a vertex can be transformed in 3D space
 */
export enum VertexMoveTypeEnum {
  /** Translation movement type */
  T = "T",
  /** Free movement in all directions */
  freeMove = "freeMove",
  /** Other movement types */
  other = "other"
}

/**
 * Vertex serialization/deserialization handler
 * Manages loading vertex data from external sources
 */
export class Vertex_IO extends Entity_IO {
  /**
   * Load vertex data from source
   * @param target - Target vertex instance to populate
   * @param data - Source data containing x, y, z coordinates
   * @param context - Loading context
   * @param options - Additional loading options
   */
  load(
    target: Vertex,
    data: { x: number; y: number; z: number },
    context: unknown,
    options: unknown
  ): void;
}

/**
 * 3D Vertex entity
 * Represents a point in 3D space with x, y, z coordinates
 */
export class Vertex extends Entity {
  /**
   * X coordinate in 3D space
   * @private
   */
  private __x: number;

  /**
   * Y coordinate in 3D space
   * @private
   */
  private __y: number;

  /**
   * Z coordinate in 3D space
   * @private
   */
  private __z: number;

  /**
   * Create a new vertex instance
   * @param id - Optional unique identifier for the vertex
   */
  constructor(id?: string);

  /**
   * Factory method to create a vertex with coordinates
   * @param x - X coordinate (default: 0)
   * @param y - Y coordinate (default: 0)
   * @param z - Z coordinate (default: 0)
   * @returns New vertex instance with specified coordinates
   */
  static create(x?: number, y?: number, z?: number): Vertex;

  /**
   * X coordinate property with validation
   * Value must be within Max_Vertex_Value range
   */
  x: number;

  /**
   * Y coordinate property with validation
   * Value must be within Max_Vertex_Value range
   */
  y: number;

  /**
   * Z coordinate property with validation
   */
  z: number;

  /**
   * Get parent entities that reference this vertex
   * @returns Array of parent entities
   */
  get parents(): Entity[];

  /**
   * Set vertex coordinates with validation
   * @param x - New X coordinate
   * @param y - New Y coordinate
   * @param z - New Z coordinate (default: current z value)
   * @param markDirty - Whether to mark geometry as dirty (default: true)
   * @returns true if coordinates were successfully set, false if validation failed
   */
  set(x: number, y: number, z?: number, markDirty?: boolean): boolean;

  /**
   * Get vertex geometry as plain object
   * @returns Object containing x, y, z coordinates
   */
  get geometry(): { x: number; y: number; z: number };

  /**
   * Validate input value for coordinate property
   * @param propertyName - Name of the property being validated (x, y, or z)
   * @param value - Value to validate
   * @returns true if value is valid, false otherwise
   * @private
   */
  private _validateInput(propertyName: string, value: unknown): boolean;

  /**
   * Get IO handler instance for serialization
   * @returns Vertex_IO instance
   */
  getIO(): Vertex_IO;

  /**
   * Verify vertex data integrity
   * Ensures coordinates are valid numbers within acceptable range
   * @returns true if vertex data is valid, false otherwise
   */
  verify(): boolean;

  /**
   * Mark geometry as modified (triggers updates in dependent systems)
   * @private
   */
  private dirtyGeometry(): void;

  /**
   * Entity tag for logging and debugging
   */
  readonly tag: string;
}