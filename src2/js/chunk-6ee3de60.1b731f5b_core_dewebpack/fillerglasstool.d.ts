/**
 * Module: FillerGlassTool
 * Tool for managing glass filler operations in window/door design systems
 */

import { FillersTool } from './FillersTool';
import { ShapeType } from './ShapeType';

/**
 * Represents a polygon identifier
 */
export interface PolyId {
  /**
   * Checks if this PolyId is equal to another
   * @param other - The PolyId to compare with
   * @returns True if the IDs are equal
   */
  equalTo(other: PolyId): boolean;
}

/**
 * Represents a theft (glass unit) in the sash
 */
export interface Theft {
  /** The polygon identifier for this theft */
  polyId: PolyId;
}

/**
 * Manages sash elements including glass units
 */
export interface SashManager {
  /** Array of glass units (thefts) in the sash */
  thefts: Theft[];
}

/**
 * Represents a fixed area in the window/door system
 */
export interface FixedArea {
  /** The polygon identifier for this area */
  polyId: PolyId;
}

/**
 * Context containing sash and polygon usage information
 */
export interface FillerContext {
  /** Manager for sash elements */
  sashManager: SashManager;
  /** Array of polygon IDs that are currently in use */
  usedPoly: PolyId[];
}

/**
 * Represents a filler element that can be drawn
 */
export interface Filler {
  /**
   * Draws the filler on the provided view
   * @param view - The view to render on
   */
  draw(view: unknown): void;
}

/**
 * Target element that can change its filler type
 */
export interface FillerTarget {
  /**
   * Changes the filler type of this target
   * @param type - The new filler type
   * @param shapeType - The shape type to apply
   * @returns The modified filler, or null if change failed
   */
  changeFillerType(type: unknown, shapeType: ShapeType): Filler | null;
}

/**
 * Tool for managing glass fillers in window/door design
 * Extends the base FillersTool with glass-specific functionality
 */
export declare class FillerGlassTool extends FillersTool {
  /**
   * Determines if a fixed area is invalid for glass filler placement
   * A fixed area is invalid if:
   * - It's not used as a theft (glass unit) in the sash
   * - AND it's already used by another polygon
   * 
   * @param fixedArea - The fixed area to validate
   * @param context - Context containing sash and polygon usage data
   * @returns True if the area cannot be used for glass filler
   */
  invalidFixedArea(fixedArea: FixedArea, context: FillerContext): boolean;

  /**
   * Changes the filler type of a target element to glass
   * If successful, redraws the filler on the view
   * 
   * @param target - The element whose filler type will be changed
   * @param type - The filler type parameter to apply
   */
  changeFillerType(target: FillerTarget, type: unknown): void;
}