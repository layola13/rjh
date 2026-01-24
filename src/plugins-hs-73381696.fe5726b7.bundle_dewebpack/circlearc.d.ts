/**
 * Module: CircleArc
 * Original ID: 786391
 * Exports: CircleArc
 */

import type { HSApp } from './HSApp';
import type { EdgeUtil } from './EdgeUtil';
import type { HSFPConstants } from './HSFPConstants';

/**
 * Entity model representing the circle arc's data structure
 */
export interface CircleArcEntity {
  srcModel: {
    topos: string[];
  };
}

/**
 * SVG element wrapper with attribute manipulation methods
 */
export interface SVGElement {
  attr(attributes: Record<string, number | string>): void;
}

/**
 * Base class for 2D circle arc views in extraordinary sketch context
 */
export declare class CircleArc2d {
  constructor(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown,
    controller: CircleArc2dController
  );
  
  protected entity: CircleArcEntity;
  protected element: SVGElement[];
  
  protected _updateStyle(params: unknown[]): void;
  protected onFlagChanged(flag: unknown): void;
}

/**
 * Base controller class for 2D circle arc interactions
 */
export declare class CircleArc2dController {
  constructor(
    param1: unknown,
    param2: unknown
  );
  
  protected _getMoveCmdType(): number;
}

/**
 * Custom controller for CircleArc with specialized move command handling
 */
export declare class CircleArcController extends CircleArc2dController {
  /**
   * Returns the command type for moving curved slab elements
   * @returns The SlabEdit.MoveCurve command type constant
   */
  protected _getMoveCmdType(): number;
}

/**
 * CircleArc view component for rendering and managing circular arc elements
 * in the extraordinary sketch 2D context with background topology support
 */
export declare class CircleArc extends CircleArc2d {
  /**
   * Creates a new CircleArc instance
   * @param param1 - First initialization parameter
   * @param param2 - Second initialization parameter
   * @param param3 - Third initialization parameter
   * @param param4 - Fourth initialization parameter (passed to controller)
   */
  constructor(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown
  );

  /**
   * Updates the visual style of the circle arc element
   * Applies special stroke width (2.4) when entity topology includes "background"
   */
  protected _updateStyle(): void;

  /**
   * Handles changes to the flag state of the circle arc
   * Synchronizes point flags via EdgeUtil when topology includes "background"
   * @param flag - The new flag value to apply
   */
  protected onFlagChanged(flag: unknown): void;
}

/**
 * Namespace for HSApp constants
 */
export declare namespace HSFPConstants {
  namespace CommandType {
    namespace SlabEdit {
      /**
       * Command type constant for moving curve elements
       */
      const MoveCurve: number;
    }
  }
}

/**
 * Utility class for edge-related operations
 */
export declare namespace EdgeUtil {
  /**
   * Synchronizes point flags for an entity based on the provided flag value
   * @param entity - The entity whose points should be synchronized
   * @param flag - The flag value to synchronize
   */
  function syncPointsFlag(entity: CircleArcEntity, flag: unknown): void;
}