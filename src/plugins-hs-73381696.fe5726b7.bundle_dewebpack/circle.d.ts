/**
 * Circle module for 2D extraordinary sketch rendering
 * Provides Circle view and controller implementations
 * @module Circle
 * @originalId 312867
 */

import { HSApp } from './HSApp';
import { EdgeUtil } from './EdgeUtil';

/**
 * Entity model interface representing the source data for a circle
 */
interface ICircleEntity {
  /** Source model data */
  srcModel: {
    /** Topological classifications (e.g., "background") */
    topos: string[];
  };
}

/**
 * SVG element wrapper interface
 */
interface ISVGElement {
  /** Set SVG attributes on the element */
  attr(attributes: Record<string, unknown>): void;
}

/**
 * Base class for 2D circle views in extraordinary sketches
 */
declare class Circle2dBase extends HSApp.View.SVG.ExtraordinarySketch2d.Circle2d {
  /** Associated entity model */
  entity: ICircleEntity;
  /** SVG DOM elements array */
  element: ISVGElement[];
}

/**
 * Base controller class for 2D circles
 */
declare class Circle2dControllerBase extends HSApp.View.SVG.ExtraordinarySketch2d.Circle2dController {
  /** Get the command type for move operations */
  _getMoveCmdType(): string;
}

/**
 * Enhanced Circle controller with custom move command handling
 * Extends the base Circle2dController to provide slab editing move commands
 */
declare class CircleController extends Circle2dControllerBase {
  /**
   * Returns the command type for moving curves in slab editing mode
   * @returns The move curve command type constant
   */
  _getMoveCmdType(): string;
}

/**
 * Circle view component for 2D extraordinary sketches
 * Handles rendering and interaction for circular shapes with special styling
 * for background topology elements
 */
export declare class Circle extends Circle2dBase {
  /**
   * Creates a new Circle instance
   * @param param1 - First constructor parameter (coordinates/config)
   * @param param2 - Second constructor parameter
   * @param param3 - Third constructor parameter
   * @param radius - Circle radius
   */
  constructor(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    radius: number
  );

  /**
   * Updates the visual style of the circle
   * Applies special stroke width for background topology elements
   * @protected
   */
  protected _updateStyle(): void;

  /**
   * Handles flag state changes for the circle
   * Synchronizes point flags for background topology elements via EdgeUtil
   * @param flag - The new flag state to apply
   */
  onFlagChanged(flag: unknown): void;
}

/**
 * Type alias for the Circle class
 */
export type { Circle };

/**
 * Constants namespace for command types
 */
declare namespace HSFPConstants {
  namespace CommandType {
    namespace SlabEdit {
      /** Command type identifier for moving curves */
      const MoveCurve: string;
    }
  }
}