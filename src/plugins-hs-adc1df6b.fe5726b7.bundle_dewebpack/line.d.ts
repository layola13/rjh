/**
 * Line module - Provides Line view component and controller for 2D roof drawing
 * Original Module ID: 270170
 */

import { HSApp } from './HSApp';
import { EdgeUtil } from './EdgeUtil';
import { HSFPConstants } from './HSFPConstants';

/**
 * Entity model interface representing the line's data structure
 */
interface LineEntity {
  /** Source model containing topology information */
  srcModel: {
    /** Topology classifications (e.g., "background") */
    topos: string[];
  };
}

/**
 * SVG element wrapper with D3-like attribute methods
 */
interface SVGElement {
  attr(attributes: Record<string, number | string>): void;
}

/**
 * Base Line2d view class from HSApp framework
 */
declare class Line2dBase {
  /** The entity data model */
  entity: LineEntity;
  /** SVG element array */
  element: SVGElement[];
  
  constructor(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown,
    controller: Line2dController
  );
  
  protected _updateStyle(): void;
  onFlagChanged(flag: unknown): void;
}

/**
 * Base Line2d controller class from HSApp framework
 */
declare class Line2dControllerBase {
  constructor(
    entity: LineEntity,
    view: unknown
  );
  
  protected _getMoveCmdType(): string;
}

/**
 * Custom Line2d controller for roof drawing
 * Extends the base controller with roof-specific move command type
 */
declare class Line2dController extends Line2dControllerBase {
  /**
   * Returns the command type for moving curves in roof drawing
   * @returns Command type constant for roof curve movement
   */
  protected _getMoveCmdType(): string;
}

/**
 * Line view component for 2D roof drawing
 * Extends the base Line2d view with background styling and flag synchronization
 */
export declare class Line extends Line2dBase {
  /**
   * Creates a new Line view instance
   * @param param1 - First initialization parameter
   * @param param2 - Second initialization parameter
   * @param param3 - Third initialization parameter
   * @param entity - The line entity data model
   */
  constructor(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    entity: LineEntity
  );
  
  /**
   * Updates the line's SVG style
   * Applies special stroke width for background topology lines
   * @override
   */
  protected _updateStyle(): void;
  
  /**
   * Handles flag change events
   * Synchronizes edge points when the entity is a background topology
   * @param flag - The flag value that changed
   * @override
   */
  onFlagChanged(flag: unknown): void;
}