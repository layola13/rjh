/**
 * Text item module for displaying curve measurements and labels
 * @module TextItem
 */

import type { Matrix } from 'svg.js';

/**
 * Represents a point in SVG coordinate space
 */
export interface SvgPoint {
  x: number;
  y: number;
}

/**
 * Represents a geometric curve that can be measured
 */
export interface Curve {
  /**
   * Gets the midpoint of the curve
   */
  getMidPt(): unknown;
  
  /**
   * Checks if the curve is a 2D arc
   */
  isArc2d(): boolean;
  
  /**
   * Gets the angular range of the curve (for arcs)
   */
  getRange(): {
    getLength(): number;
  };
  
  /**
   * Gets the linear length of the curve
   */
  getLength(): number;
}

/**
 * SVG drawing context for creating and managing text elements
 */
export interface DrawingContext {
  /**
   * Creates a new text node
   */
  text(): TextNode;
  
  /**
   * Gets the current scale factor for coordinate transformation
   */
  getScaleFactor(): number;
}

/**
 * SVG text node with styling and transformation capabilities
 */
export interface TextNode {
  /**
   * The underlying DOM node
   */
  node: {
    style: CSSStyleDeclaration;
  };
  
  /**
   * Sets attributes on the text node
   */
  attr(attributes: Record<string, unknown>): this;
  
  /**
   * Sets the text content
   */
  text(content: string): this;
  
  /**
   * Shows the text node
   */
  show(): void;
  
  /**
   * Hides the text node
   */
  hide(): void;
  
  /**
   * Removes the text node from the DOM
   */
  remove(): void;
}

/**
 * Configuration attributes for text styling
 */
export declare const TextAttr: Record<string, unknown>;

/**
 * Length unit type enumeration
 */
export enum LengthUnitTypeEnum {
  inch = 'inch',
  metric = 'metric'
}

/**
 * Application namespace
 */
export namespace HSApp {
  export namespace App {
    export interface Application {
      floorplan: {
        displayLengthUnit: LengthUnitTypeEnum;
      };
    }
    
    export function getApp(): Application;
  }
}

/**
 * Core utilities namespace
 */
export namespace HSCore {
  export namespace Util {
    export namespace Unit {
      export { LengthUnitTypeEnum };
    }
  }
}

/**
 * Converts a point to SVG coordinate space
 */
export declare function toSvgPoint(point: unknown): SvgPoint;

/**
 * Gets the current unit conversion parameter
 */
export declare function getUnitParam(): number;

/**
 * Text item class for displaying measurements on curves
 * Supports both angular measurements (for arcs) and linear measurements (for lines)
 */
export declare class TextItem {
  /**
   * The drawing context
   */
  private readonly context: DrawingContext;
  
  /**
   * The SVG text node
   */
  private readonly node: TextNode;
  
  /**
   * Creates a new TextItem
   * @param context - The drawing context to create the text element in
   */
  constructor(context: DrawingContext);
  
  /**
   * Updates the text item to display measurement for the given curve
   * For arcs: displays angle in degrees
   * For lines: displays length in current unit system (feet/inches or metric)
   * 
   * @param curve - The curve to measure and display
   */
  setCurve(curve: Curve): void;
  
  /**
   * Sets attributes on the text node
   * @param attributes - Key-value pairs of SVG attributes
   * @returns This TextItem for method chaining
   */
  attr(attributes: Record<string, unknown>): this;
  
  /**
   * Makes the text item visible
   */
  show(): void;
  
  /**
   * Hides the text item
   */
  hide(): void;
  
  /**
   * Removes the text item from the DOM and cleans up resources
   */
  dispose(): void;
}