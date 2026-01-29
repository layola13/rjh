import { Sketch2dBuilder } from './Sketch2dBuilder';

/**
 * Options for changing background behavior
 */
export interface ChangeBackgroundOptions {
  /** Whether to keep existing background curves when changing background */
  keepBackgroundCurve?: boolean;
}

/**
 * Builder class for creating and managing Mixpaint 2D sketches.
 * Extends Sketch2dBuilder to provide specialized functionality for mixpaint operations.
 */
export declare class MixpaintBuilder extends Sketch2dBuilder {
  /** Default material applied to newly created faces */
  protected defaultMaterial: HSCore.Material.MaterialData;
  
  /** Reference to the parent mixpaint instance */
  protected readonly mixpaint: any; // Replace 'any' with specific Mixpaint type if available

  /**
   * Creates a new MixpaintBuilder instance
   * @param mixpaint - The mixpaint instance this builder operates on
   * @param defaultMaterial - The default material to apply to created faces
   */
  constructor(mixpaint: any, defaultMaterial: HSCore.Material.MaterialData);

  /**
   * Creates a new polygon face with the specified vertices and normal
   * @param vertices - Array of vertex positions defining the face
   * @param normal - Normal vector of the face
   * @returns The newly created polygon face with applied material
   */
  createFace(vertices: any[], normal: any): HSCore.Model.Polygon;

  /**
   * Changes the background of the sketch and updates related geometry
   * @param newBackground - The new background to apply
   * @param options - Options controlling background change behavior
   * @returns True if background was changed successfully, false if it's the same background
   */
  changeBackground(
    newBackground: any,
    options?: ChangeBackgroundOptions
  ): boolean;

  /**
   * Retrieves the largest face associated with the current background
   * @protected
   * @returns The largest background face or null if none exists
   */
  protected _getLargestBackgroundFace(): HSCore.Model.Polygon | null;

  /**
   * Adds the created entity to the internal collection
   * @protected
   * @param entity - The entity to add
   */
  protected _addEntity(entity: HSCore.Model.Polygon): void;

  /**
   * Removes curves that are not associated with the background
   * @protected
   * @param curvesToKeep - Array of curves to preserve
   */
  protected _removeNoBackgroundCurve(curvesToKeep: any[]): void;

  /**
   * Removes curves that fall outside the valid drawing area
   * @protected
   */
  protected _removeOutsideCurves(): void;

  /**
   * Retrieves information about the current background
   * @protected
   * @returns Object containing curve information for the background
   */
  protected getBackgroundInfo(): { curveInfos: any[] };

  /**
   * Adds curves to the sketch from curve information objects
   * @protected
   * @param curveInfos - Array of curve information objects
   * @param merge - Whether to merge curves with existing geometry
   */
  protected addCurvesFromInfos(curveInfos: any[], merge: boolean): void;

  /**
   * Attempts to merge redundant points in the sketch geometry
   * @protected
   */
  protected tryMergeReduntPoints(): void;

  /**
   * Updates and returns face geometry from non-crossing curves
   * @protected
   * @returns Array of updated face polygons
   */
  protected updateFacesFromNoCrossCurves(): HSCore.Model.Polygon[];

  /**
   * Performs pre-build operations before geometry updates
   * @protected
   */
  protected preBuild(): void;

  /**
   * Performs post-build operations after geometry updates
   * @protected
   */
  protected postBuild(): void;
}