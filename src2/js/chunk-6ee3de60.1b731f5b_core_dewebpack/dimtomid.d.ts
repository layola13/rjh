import type { Dimension } from './Dimension';
import type { Hardware } from './Hardware';
import type { Point } from './Point';
import type { DrawParams } from './DrawParams';

/**
 * DimToMid dimension class
 * Represents a dimension from a hardware edge to its midpoint
 * Extends the base Dimension class
 */
export declare class DimToMid extends Dimension {
  /**
   * The hardware component this dimension is associated with
   */
  readonly hardware: Hardware;

  /**
   * Margin distance from the edge (default: 180)
   */
  margin: number;

  /**
   * Whether this dimension is currently active/visible
   */
  actived: boolean;

  /**
   * Start point of the dimension line
   */
  from: Point;

  /**
   * End point of the dimension line (at edge midpoint)
   */
  to: Point;

  /**
   * Creates a new DimToMid dimension
   * @param hardware - The hardware component to dimension
   */
  constructor(hardware: Hardware);

  /**
   * Calculates and sets the dimension line position
   * Based on edge orientation, tangent, and center position
   */
  locate(): void;

  /**
   * Handles edit events on the dimension
   * @param value - Edit value (0 for auto-offset, otherwise adjusts percent offset)
   * @param context - Edit context/additional parameters
   */
  onEdit(value: number, context: unknown): void;

  /**
   * Serializes the dimension to JSON format
   * @returns JSON object with dimension data including actived state
   */
  toJSON(): DimToMidJSON;

  /**
   * Deserializes dimension data from JSON
   * @param data - JSON data to deserialize
   */
  deserialize(data: DimToMidJSON | undefined): void;

  /**
   * Clones properties from another DimToMid instance
   * @param source - Source dimension to clone from
   * @returns This instance for chaining
   */
  cloneFrom(source: DimToMid): this;

  /**
   * Creates the visual shapes for rendering the dimension
   * Skips creation if dimension line has zero length
   * @returns This instance for chaining
   */
  createShapes(): this;

  /**
   * Determines if dimension should be ignored during creation
   * @returns True if should be ignored (when inactive or base conditions met)
   */
  ignoreCreating(): boolean;
}

/**
 * JSON representation of DimToMid dimension
 */
export interface DimToMidJSON {
  /**
   * Whether the dimension is active/visible
   */
  atv: boolean;
  
  // ... other properties inherited from base Dimension JSON
  [key: string]: unknown;
}