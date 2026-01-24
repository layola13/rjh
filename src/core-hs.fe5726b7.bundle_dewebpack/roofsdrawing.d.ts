/**
 * Module: RoofsDrawing
 * Provides functionality for managing roof drawing entities with 2D sketches and guidelines.
 */

import { Entity, Entity_IO, EntityFieldOptions } from './Entity';
import { ExtraordinaryGuideline } from './ExtraordinaryGuideline';
import { RoofDrawingRegion } from './RoofDrawingRegion';
import { RoofsDrawingSketch2dBuilder } from './RoofsDrawingSketch2dBuilder';
import { Loader } from './Loader';
import { Curve } from './Curve';

/**
 * Guideline serialization data structure
 */
interface GuidelineSerializedData {
  /** Serialized curve data */
  c: unknown;
  /** From anchor point */
  f: unknown;
  /** End anchor point */
  e: unknown;
  /** Guideline type */
  t: unknown;
}

/**
 * Background sketch data structure containing faces, guidelines and background geometry
 */
interface BackgroundSketchData {
  /** Background geometry */
  background: unknown;
  /** Face elements in the sketch */
  faces: unknown[];
  /** Collection of extraordinary guidelines */
  guidelines: ExtraordinaryGuideline[];
}

/**
 * Serialization data for RoofsDrawing entity
 */
interface RoofsDrawingSerializedData {
  /** Serialized guidelines data */
  gls?: GuidelineSerializedData[];
}

/**
 * Custom IO handler for RoofsDrawing entity serialization/deserialization
 */
declare class RoofsDrawingIO extends Entity_IO {
  /**
   * Get singleton instance of the IO handler
   */
  static instance(): RoofsDrawingIO;

  /**
   * Serialize RoofsDrawing entity to storage format
   * @param entity - The entity to dump
   * @param context - Serialization context
   * @param includeChildren - Whether to include child entities
   * @param options - Additional serialization options
   * @returns Serialized entity data
   */
  dump(
    entity: RoofsDrawing,
    context: unknown,
    includeChildren?: boolean,
    options?: Record<string, unknown>
  ): [RoofsDrawingSerializedData, ...unknown[]];

  /**
   * Deserialize RoofsDrawing entity from storage format
   * @param entity - The entity to populate
   * @param data - Serialized data to load
   * @param context - Deserialization context
   */
  load(
    entity: RoofsDrawing,
    data: RoofsDrawingSerializedData,
    context: unknown
  ): void;
}

/**
 * Main RoofsDrawing entity class
 * Manages roof drawing regions and their associated 2D sketches with guidelines
 */
export declare class RoofsDrawing extends Entity {
  /**
   * Background sketch data containing guidelines and geometry
   */
  bkgSketchData?: BackgroundSketchData;

  /**
   * Internal 2D sketch builder instance
   * @private
   */
  private _bkgSketchBuilder?: RoofsDrawingSketch2dBuilder;

  /**
   * Get the IO handler for this entity type
   */
  getIO(): RoofsDrawingIO;

  /**
   * Clean up resources when destroying the entity
   */
  destroy(): void;

  /**
   * Get or create the 2D sketch builder for this drawing
   */
  getBuilder(): RoofsDrawingSketch2dBuilder;

  /**
   * Clear the cached sketch builder instance
   */
  clearBuilder(): void;

  /**
   * Get all child drawing regions
   */
  get drawingRegions(): RoofDrawingRegion[];

  /**
   * Get the sketch data, creating default data if it doesn't exist
   */
  getSketch(): BackgroundSketchData;

  /**
   * Set the sketch data
   * @param sketchData - New sketch data to set
   */
  setSketch(sketchData: BackgroundSketchData): void;

  /**
   * Update sketch data by merging with existing data
   * @param sketchData - Partial sketch data to merge
   */
  updateSketch(sketchData: Partial<BackgroundSketchData>): void;

  /**
   * Find a drawing region by its associated roof ID
   * @param roofId - The roof ID to search for
   * @returns The matching drawing region, or undefined if not found
   */
  getDrawingRegionByRoofId(roofId: unknown): RoofDrawingRegion | undefined;

  /**
   * Initialize drawing regions from a collection of roof entities
   * @param roofs - Array of roof entities to create regions from
   */
  initDrawingRegionsByRoofs(roofs: unknown[]): void;

  /**
   * Check if this drawing has valid sketch data
   * @returns True if the drawing has guidelines defined
   */
  isValid(): boolean;
}