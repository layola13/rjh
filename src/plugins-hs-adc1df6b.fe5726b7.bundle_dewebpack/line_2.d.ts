/**
 * Line module - 2D line drawing component for outdoor/background sketches
 * @module Line
 * @originalId 927104
 */

import { HSApp } from './HSApp';
import { EdgeUtil } from './EdgeUtil';
import { HSFPConstants } from './HSFPConstants';

/**
 * Entity model representing a line with topology information
 */
interface LineEntity {
  /** Source model containing topology data */
  srcModel: {
    /** Topology classifications (e.g., "background") */
    topos: string[];
  };
}

/**
 * SVG element wrapper with attribute manipulation methods
 */
interface SVGElement {
  /**
   * Set SVG attributes on the element
   * @param attributes - Key-value pairs of SVG attributes
   */
  attr(attributes: Record<string, number | string>): void;
}

/**
 * Base class for 2D line views in extraordinary sketches
 */
declare class Line2dBase {
  /** Associated entity model */
  protected entity: LineEntity;
  
  /** SVG DOM elements representing the line */
  protected element: SVGElement[];
  
  /**
   * Constructor for base Line2d
   * @param startX - Start X coordinate
   * @param startY - Start Y coordinate
   * @param endX - End X coordinate
   * @param endY - End Y coordinate
   * @param controller - Line controller instance
   */
  constructor(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    controller: unknown
  );
  
  /**
   * Internal method to update line styling
   * @param styles - Array of style overrides
   */
  protected _updateStyle(styles: unknown[]): void;
  
  /**
   * Handler for flag state changes
   * @param flag - New flag value
   */
  onFlagChanged(flag: unknown): void;
}

/**
 * Base controller class for 2D line interactions
 */
declare class Line2dControllerBase {
  /**
   * Get the command type for move operations
   * @returns Command type constant
   */
  protected _getMoveCmdType(): string;
}

/**
 * Enhanced 2D line view with background topology support
 * Extends base Line2d with special styling for background elements
 */
export declare class Line extends Line2dBase {
  /**
   * Creates a new Line instance
   * @param startX - Starting X coordinate
   * @param startY - Starting Y coordinate
   * @param endX - Ending X coordinate
   * @param endY - Ending Y coordinate
   */
  constructor(
    startX: number,
    startY: number,
    endX: number,
    endY: number
  );
  
  /**
   * Updates line styling, applies thicker stroke for background topology
   * Sets stroke-width to 2.4 when entity belongs to "background" topology
   * @override
   */
  protected _updateStyle(): void;
  
  /**
   * Handles flag changes and synchronizes points for background elements
   * @override
   * @param flag - The new flag state to apply
   */
  onFlagChanged(flag: unknown): void;
}

/**
 * Controller for Line view, manages move commands for outdoor drawings
 * @internal
 */
declare class LineController extends Line2dControllerBase {
  /**
   * Returns the command type for moving curves in outdoor drawings
   * @override
   * @returns OutdoorDrawing.MoveCurve command type
   */
  protected _getMoveCmdType(): string;
}