import { HSApp } from './HSApp';

/**
 * Represents a roof drawing region in the application.
 * Manages interactive sketches and face models for roof design visualization.
 */
export interface RoofDrawingRegion extends HSApp.View.SVG.Base.Display2D {
  /**
   * Internal SVG group elements container
   * @private
   */
  _svgGroups: SVGGElement[] | undefined;

  /**
   * Initializes the roof drawing region with SVG groups
   * @param svgGroups - Array of SVG group elements to be managed
   */
  init(svgGroups: SVGGElement[]): void;

  /**
   * Cleanup method called when the region is being destroyed.
   * Releases resources and clears internal references.
   */
  onCleanup(): void;

  /**
   * Initializes the region sketch by creating an interactive sketch
   * and adding it as a child component.
   * @private
   */
  _initRegionSketch(): void;

  /**
   * Retrieves the face interactive model from child items.
   * Iterates through children to find an InteractiveModel instance.
   * @returns The face interactive model if found, undefined otherwise
   */
  getFaceInteractiveModel(): unknown | undefined;
}

/**
 * Constructor signature for RoofDrawingRegion
 * @param entity - The entity associated with this region
 * @param context - The rendering context
 * @param group - The SVG group element
 * @param options - Additional options for initialization
 */
export interface RoofDrawingRegionConstructor {
  new (
    entity: unknown,
    context: unknown,
    group: SVGGElement,
    options: unknown
  ): RoofDrawingRegion;
  prototype: RoofDrawingRegion;
}

export declare const RoofDrawingRegion: RoofDrawingRegionConstructor;