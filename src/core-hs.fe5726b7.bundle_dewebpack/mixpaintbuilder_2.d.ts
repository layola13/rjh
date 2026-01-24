/**
 * Module: MixpaintBuilder
 * A builder class for creating and managing 2D sketch faces with background manipulation
 */

import { Sketch2dBuilder } from './Sketch2dBuilder';
import { Face2d } from './Face2d';
import { Util } from './Util';

/**
 * Options for changing the background
 */
export interface ChangeBackgroundOptions {
  /**
   * Force background change even if the new background is the same as the current one
   */
  forceChangeBackground?: boolean;
  
  /**
   * Keep existing background curves when changing background
   */
  keepBackgroundCurve?: boolean;
}

/**
 * Information about background curves
 */
export interface BackgroundInfo {
  /**
   * Array of curve information objects
   */
  curveInfos: unknown[];
}

/**
 * Represents a polygon with an outer boundary
 */
export interface DiscretePolygon {
  /**
   * The outer boundary points of the polygon
   */
  outer: unknown;
}

/**
 * Represents a background that can be converted to discrete polygons
 */
export interface Background {
  /**
   * Convert the background to an array of discrete polygons
   */
  toDiscretePolygons(): DiscretePolygon[];
  
  /**
   * Check if this background is the same as another background
   */
  isSameBackground(other: Background): boolean;
}

/**
 * Represents a 2D sketch containing faces and background
 */
export interface Sketch2d {
  /**
   * The background of the sketch
   */
  background: Background;
  
  /**
   * Array of 2D faces in the sketch
   */
  faces: Face2d[];
}

/**
 * Builder class for creating mixed paint sketches with face and background management
 * Extends Sketch2dBuilder to provide specialized functionality for handling backgrounds
 */
export declare class MixpaintBuilder extends Sketch2dBuilder {
  /**
   * The current background of the builder
   */
  background: Background;
  
  /**
   * The 2D sketch being built
   */
  sketch2d: Sketch2d;
  
  /**
   * Creates a new MixpaintBuilder instance
   * @param initialData - Initial data for the builder
   */
  constructor(initialData: unknown);
  
  /**
   * Creates a 2D face from the given parameters
   * @param param1 - First parameter for face initialization
   * @param param2 - Second parameter for face initialization
   * @returns The newly created Face2d instance
   */
  createFace(param1: unknown, param2: unknown): Face2d;
  
  /**
   * Checks if the total area of faces meets the threshold criteria
   * Validates that the total outer area is at least 80% of the target area (or target is very small)
   * @param faces - Array of face polygons to check
   * @param targetArea - The target area to compare against
   * @returns True if the area check passes, false otherwise
   */
  check(faces: unknown[], targetArea: number): boolean;
  
  /**
   * Changes the background of the sketch and updates all related faces
   * @param newBackground - The new background to apply
   * @param options - Options controlling the background change behavior
   * @returns True if the background was changed, false if it remained the same
   */
  changeBackground(newBackground: Background, options?: ChangeBackgroundOptions): boolean;
  
  /**
   * Prepares the builder state before building operations
   */
  protected preBuild(): void;
  
  /**
   * Finalizes the builder state after building operations
   */
  protected postBuild(): void;
  
  /**
   * Gets information about the current background including curve data
   * @returns Background information including curve infos
   */
  protected getBackgroundInfo(): BackgroundInfo;
  
  /**
   * Adds curves to the sketch from curve information objects
   * @param curveInfos - Array of curve information
   * @param shouldValidate - Whether to validate curves during addition
   */
  protected addCurvesFromInfos(curveInfos: unknown[], shouldValidate: boolean): void;
  
  /**
   * Gets the largest face in the background
   * @returns The largest background face, or undefined if none exists
   */
  protected _getLargestBackgroundFace(): Face2d | undefined;
  
  /**
   * Adds an entity to the internal entity collection
   * @param entity - The entity to add
   */
  protected _addEntity(entity: unknown): void;
  
  /**
   * Removes curves that are not part of the background
   * @param backgroundCurves - Array of curves that should be kept
   */
  protected _removeNoBackgroundCurve(backgroundCurves: unknown[]): void;
  
  /**
   * Removes curves that fall outside the valid drawing area
   */
  protected _removeOutsideCurves(): void;
  
  /**
   * Attempts to merge redundant points in the sketch
   */
  protected tryMergeReduntPoints(): void;
  
  /**
   * Updates faces from curves that don't cross each other
   * @returns Array of updated faces
   */
  protected updateFacesFromNoCrossCurves(): unknown[];
}