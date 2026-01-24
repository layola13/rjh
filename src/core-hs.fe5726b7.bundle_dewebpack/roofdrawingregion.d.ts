import { Entity } from './Entity';
import { NCustomizedParametricRoof } from './NCustomizedParametricRoof';
import { RoofsDrawingSketch2dBuilder, Sketch2dData, RegionDefinition } from './RoofsDrawingSketch2dBuilder';
import { MathPolygon, Loop } from './MathPolygon';
import { Unit } from './Unit';

/**
 * Represents a drawing region for a roof element.
 * Manages the 2D sketch data and builder for roof boundary definition.
 */
export declare class RoofDrawingRegion extends Entity {
  /**
   * The sketch data containing background, faces, and guidelines for the roof region.
   * @internal
   */
  private _sketchData?: Sketch2dData;

  /**
   * The unique identifier of the associated roof entity.
   * @internal
   */
  private _roofId: string;

  /**
   * The 2D sketch builder instance for constructing the roof region geometry.
   * @internal
   */
  private _sketchBuilder?: RoofsDrawingSketch2dBuilder;

  /**
   * Determines whether this entity needs to be serialized/dumped.
   * @returns Always returns false for RoofDrawingRegion.
   */
  needDump(): boolean;

  /**
   * Cleans up resources and clears the builder instance.
   */
  destroy(): void;

  /**
   * Gets the ID of the associated roof entity.
   */
  get roofId(): string;

  /**
   * Sets the ID of the associated roof entity.
   * @param value - The roof entity ID.
   */
  set roofId(value: string);

  /**
   * Gets the associated NCustomizedParametricRoof entity.
   * @returns The roof entity if found and valid, otherwise undefined.
   */
  get roof(): NCustomizedParametricRoof | undefined;

  /**
   * Gets the outer loop (boundary) of the roof region.
   * @returns The outer loop as an array of points/curves, or undefined if no sketch data exists.
   */
  get outerLoop(): Loop | undefined;

  /**
   * Gets or creates the 2D sketch builder for this roof region.
   * @returns The RoofsDrawingSketch2dBuilder instance.
   */
  getBuilder(): RoofsDrawingSketch2dBuilder;

  /**
   * Clears the cached sketch builder instance.
   */
  clearBuilder(): void;

  /**
   * Gets or initializes the sketch data structure.
   * Creates default sketch with super large background if not exists.
   * @returns The sketch data containing background, faces, and guidelines.
   */
  getSketch(): Sketch2dData;

  /**
   * Replaces the current sketch data.
   * @param sketchData - The new sketch data to set.
   */
  setSketch(sketchData: Sketch2dData): void;

  /**
   * Updates the sketch data by merging with existing data.
   * @param sketchData - Partial sketch data to merge.
   */
  updateSketch(sketchData: Partial<Sketch2dData>): void;

  /**
   * Initializes the roof region from an existing roof entity.
   * Extracts the room loop, scales it to meters, and creates the region geometry.
   * @param roof - The NCustomizedParametricRoof to initialize from.
   */
  initByRoof(roof: NCustomizedParametricRoof): void;

  /**
   * Validates whether the roof region has valid sketch data.
   * @returns True if exactly one face exists in the sketch data.
   */
  isValid(): boolean;
}