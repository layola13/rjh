/**
 * Circle module for outdoor drawing functionality
 * Provides Circle2d view and controller implementations
 */

import { HSApp } from './HSApp';
import { EdgeUtil } from './EdgeUtil';
import { HSFPConstants } from './HSFPConstants';

/**
 * Entity model interface for Circle
 */
export interface CircleEntity {
  /** Source model containing topology information */
  srcModel: {
    /** Topology types array (e.g., ["background"]) */
    topos: string[];
  };
}

/**
 * SVG element wrapper with jQuery-like API
 */
export interface SVGElement {
  /** Set SVG attributes */
  attr(attributes: Record<string, number | string>): this;
}

/**
 * Circle2d view class extending ExtraordinarySketch2d.Circle2d
 * Handles rendering and styling of circular shapes in outdoor drawings
 */
export class Circle extends HSApp.View.SVG.ExtraordinarySketch2d.Circle2d {
  /** Associated entity data */
  entity: CircleEntity;
  
  /** SVG DOM elements array */
  element: SVGElement[];

  /**
   * Creates a new Circle instance
   * @param param1 - First constructor parameter
   * @param param2 - Second constructor parameter
   * @param param3 - Third constructor parameter
   * @param radius - Circle radius
   */
  constructor(param1: unknown, param2: unknown, param3: unknown, radius: number);

  /**
   * Updates the visual style of the circle
   * Applies special stroke width for background topology elements
   * @protected
   */
  protected _updateStyle(): void;

  /**
   * Handles flag change events on the circle entity
   * Synchronizes point flags for background topology elements
   * @param flag - The flag value to apply
   */
  onFlagChanged(flag: unknown): void;
}

/**
 * Circle2d controller class extending ExtraordinarySketch2d.Circle2dController
 * Manages user interactions and commands for circular shapes
 */
declare class Circle2dController extends HSApp.View.SVG.ExtraordinarySketch2d.Circle2dController {
  /**
   * Creates a new Circle2dController instance
   * @param radius - Circle radius
   * @param param2 - Second constructor parameter
   */
  constructor(radius: number, param2: unknown);

  /**
   * Returns the command type for move operations
   * @returns The move curve command type constant
   * @protected
   */
  protected _getMoveCmdType(): typeof HSFPConstants.CommandType.OutdoorDrawing.MoveCurve;
}

/**
 * Namespace declarations for external dependencies
 */
declare namespace HSApp.View.SVG.ExtraordinarySketch2d {
  /** Base Circle2d view class */
  export class Circle2d {
    constructor(param1: unknown, param2: unknown, param3: unknown, param4: unknown, controller: unknown);
    protected _updateStyle(args: unknown[]): void;
    protected onFlagChanged(args: unknown[]): void;
  }

  /** Base Circle2d controller class */
  export class Circle2dController {
    constructor(...args: unknown[]);
  }
}

declare namespace EdgeUtil {
  /**
   * Synchronizes point flags for an entity
   * @param entity - The entity to sync
   * @param flag - The flag value to apply
   */
  export function syncPointsFlag(entity: CircleEntity, flag: unknown): void;
}

declare namespace HSFPConstants.CommandType.OutdoorDrawing {
  /** Command type constant for moving curves */
  export const MoveCurve: unique symbol;
}