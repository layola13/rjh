/**
 * Module: ScreenFiller
 * Original ID: 420
 * Exports: ScreenFiller
 */

import { Area } from './Area';
import { ShapeType } from './ShapeType';
import { Utils, GlassSpec, ShapeColor } from './Utils';
import { DrawParams, Artisan } from './DrawParams';

/**
 * Represents a point in 2D space
 */
export interface Point {
  x: number;
  y: number;
  translate(dx: number, dy: number): Point;
}

/**
 * Polygon representation as an array of points
 */
export type Polygon = Point[];

/**
 * Drawing context interface
 */
export interface DrawContext {
  // Canvas rendering context or similar drawing interface
  [key: string]: unknown;
}

/**
 * Serial label component associated with a screen filler
 */
export interface SerialLabel {
  position: Point;
  updatePoly(): void;
  draw(context: DrawContext): void;
}

/**
 * Specification label component
 */
export interface SpecLabel {
  position: Point;
  updatePoly(): void;
  draw(context: DrawContext): void;
}

/**
 * Visual shape representation
 */
export interface VShape {
  setAttr(key: string, value: unknown): void;
  moveTo(target: unknown): void;
}

/**
 * Host container for the screen filler
 */
export interface ScreenFillerHost {
  // Host-specific properties
  [key: string]: unknown;
}

/**
 * Screen filler data attributes
 */
export interface ScreenFillerData {
  poly: Polygon;
  fcolor: string;
}

/**
 * ScreenFiller class - extends Area to provide screen filling functionality
 * Manages rendering of screen areas with optional serial labels and specifications
 */
export declare class ScreenFiller extends Area {
  /**
   * Host container reference
   */
  host: ScreenFillerHost;

  /**
   * Glass specification details
   */
  glassSpec: GlassSpec;

  /**
   * Shape type identifier
   */
  type: ShapeType;

  /**
   * Rendered polygon geometry
   */
  renderPolygon: Polygon;

  /**
   * Serial label component (optional)
   */
  serial?: SerialLabel;

  /**
   * Specification label component (optional)
   */
  spec?: SpecLabel;

  /**
   * Fixed specification label component (optional)
   */
  fixedSpec?: SpecLabel;

  /**
   * Bead indicator flag
   */
  bead?: boolean;

  /**
   * Array of visual shapes for rendering
   */
  vshape: VShape[];

  /**
   * Group shape container (optional)
   */
  gshape?: unknown;

  /**
   * Polygon geometry data
   */
  polygon: Polygon;

  /**
   * Location identifier for color determination
   */
  where: string | number;

  /**
   * Creates a new ScreenFiller instance
   * @param host - Host container for the screen filler
   * @param options - Additional configuration options
   */
  constructor(host: ScreenFillerHost, options?: unknown);

  /**
   * Updates the polygon geometry and repositions child components
   * Calculates centroids and adjusts positions for serial and spec labels
   */
  updatePoly(): void;

  /**
   * Draws the screen filler and its child components
   * @param context - Drawing context for rendering
   */
  draw(context: DrawContext): void;

  /**
   * Creates the render polygon from base polygon geometry
   * @returns Processed polygon ready for rendering
   */
  protected makeRenderPolygon(): Polygon;

  /**
   * Adds shapes to the parent group
   * @param shapes - Array of shapes to add
   */
  protected addToGroup(shapes: VShape[]): void;
}