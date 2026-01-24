/**
 * Face module - Outdoor drawing sketch 2D face visualization component
 * Original Module ID: 987475
 */

import type { HSCore } from './core-types';
import type { HSApp } from './app-types';
import type { HSFPConstants } from './constants-types';

/**
 * SVG attribute style configuration for polygon rendering
 */
interface PolygonStyleConfig {
  /** Stroke width in pixels */
  'stroke-width': number;
  /** Fill color in hex format */
  fill: string;
  /** Opacity value between 0 and 1 */
  opacity: number;
  /** Vector effect rendering mode */
  'vector-effect': 'non-scaling-stroke';
  /** Stroke color (optional, for selected/hover states) */
  stroke?: string;
}

/**
 * Collection of polygon style states
 */
interface PolygonStyleSet {
  /** Style for transparent/invisible faces */
  transparent: PolygonStyleConfig;
  /** Default style for normal state */
  normal: PolygonStyleConfig;
  /** Style when face is selected */
  selected: PolygonStyleConfig;
  /** Style when face is hovered */
  hover: PolygonStyleConfig;
}

/**
 * SVG polygon and mask element pair
 */
interface PolygonElement {
  /** Main polygon path element */
  polygon: SVGPathElement;
  /** Mask path element for clipping */
  mask: SVGPathElement;
}

/**
 * 2D face visualization class for outdoor drawing sketches
 * Extends the base extraordinary sketch 2D face component
 */
export declare class Face extends HSApp.View.SVG.ExtraordinarySketch2d.Face2d {
  /**
   * Cached polygon style configurations
   * @private
   */
  private _polygonStyle?: PolygonStyleSet;

  /**
   * Creates a new Face instance
   * @param entity - The entity model associated with this face
   * @param context - SVG rendering context
   * @param polygonStyle - Initial polygon style configuration
   * @param maskStyle - Initial mask style configuration
   */
  constructor(
    entity: HSCore.Model.Entity,
    context: SVGElement,
    polygonStyle: PolygonStyleConfig,
    maskStyle: PolygonStyleConfig
  );

  /**
   * Gets the polygon style configurations for all states
   * Lazily initializes default styles on first access
   */
  get polygonStyle(): PolygonStyleSet;

  /**
   * Creates SVG polygon and mask elements with the given path data
   * @param pathData - SVG path data string
   * @returns Object containing polygon and mask elements
   * @protected
   */
  protected _createPolygonElement(pathData: string): PolygonElement;

  /**
   * Updates the polygon visual style based on current entity state
   * Applies selected, hover, or normal styles depending on entity flags
   * @protected
   */
  protected _updatePolygonStyle(): void;

  /**
   * Handles entity flag change events
   * Synchronizes visual state and propagates flags to related geometry
   * @param flag - The flag that was changed
   */
  onFlagChanged(flag: HSCore.Model.EntityFlagEnum | HSCore.Model.ExSketchFlagEnum): void;

  /**
   * Synchronizes flags between face and its constituent points/edges
   * Propagates hover and selection states to driven geometry elements
   * @param flag - The flag to synchronize
   * @private
   */
  private _syncPointsFlag(flag: HSCore.Model.EntityFlagEnum | HSCore.Model.ExSketchFlagEnum): void;
}

/**
 * Controller for 2D face interaction and manipulation
 * Handles move commands for outdoor drawing faces
 * @internal
 */
declare class Face2dController extends HSApp.View.SVG.ExtraordinarySketch2d.Face2dController {
  /**
   * Creates a new Face2dController instance
   * @param maskStyle - Mask style configuration
   * @param entity - The entity being controlled
   */
  constructor(maskStyle: PolygonStyleConfig, entity: HSCore.Model.Entity);

  /**
   * Gets the command type for moving faces in outdoor drawings
   * @returns The move faces command type constant
   * @protected
   */
  protected _getMoveCmdType(): typeof HSFPConstants.CommandType.OutdoorDrawing.MoveFaces;
}