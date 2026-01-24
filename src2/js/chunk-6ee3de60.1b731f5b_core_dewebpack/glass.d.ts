import { Area, Frame, GlassHole, WinPolygon, PolygonCreator } from './frame-types';
import { DisplayUtils, ShapeColor, HitResult, Utils } from './display-utils';
import { DrawParams, Artisan } from './drawing';
import { EdgeFinder } from './edge-finder';
import { Frametify } from './frametify';
import Flatten from '@flatten-js/core';

/**
 * Color management interface for glass components
 */
interface ColorManager {
  /** Glass fill color */
  glass: string;
  /** Normal bar color for shading effects */
  barNormal: string;
}

/**
 * Frame manager interface for handling bars and dimensions
 */
interface FrameManager {
  /** Collection of bar elements */
  bars: any[];
  /**
   * Get the width of an edge by index
   * @param index - Edge index
   * @returns Edge width in units
   */
  getEdgeWidth(index: number): number;
}

/**
 * Mullion manager interface
 */
interface MulManager {
  /** Collection of mullion bars */
  bars: any[];
  /** Splitter configuration with profile sizes */
  splitter: {
    lineProfileSizes: number[];
  };
}

/**
 * Top-level frame interface
 */
interface TopFrame extends Frame {
  /** Color management system */
  colorManager: ColorManager;
  /** Frame component manager */
  frameManager: FrameManager;
  /** Mullion component manager */
  mulManager: MulManager;
}

/**
 * Shape data tuple for rendering
 * [polygon, styling options]
 */
type ShapeData = [
  WinPolygon,
  {
    fcolor: string;
  }
];

/**
 * Serialized glass hole data
 */
interface GlassHoleJSON {
  [key: string]: any;
}

/**
 * Serialized glass data structure
 */
interface GlassJSON {
  /** With shade flag */
  ws?: boolean;
  /** Serialized holes */
  hs?: GlassHoleJSON[];
  [key: string]: any;
}

/**
 * Glass component class representing a glass pane in a window frame.
 * Handles rendering, theft detection, shading effects, and holes.
 * 
 * @extends Area
 */
declare class Glass extends Area {
  /** Shape data for rendering layers */
  shapes: ShapeData[];
  
  /** Enable shading effect on glass */
  withShade: boolean;
  
  /** Collection of holes in the glass pane */
  holes: GlassHole[];
  
  /** Computed render polygon (may differ from logical polygon) */
  renderPolygon?: WinPolygon;

  constructor();

  /**
   * Check if this glass pane is associated with a theft-prevention bar
   * @returns True if connected to a theft bar
   */
  get withTheft(): boolean;

  /**
   * Get the color manager from the top frame
   * @returns Color manager instance
   */
  get colorManager(): ColorManager;

  /**
   * Highlight the glass pane visually
   * @param enable - True to highlight, false to remove
   */
  highlight(enable: boolean): void;

  /**
   * Check if the glass is currently highlighted
   * @returns True if highlighted
   */
  get highlighted(): boolean;

  /**
   * Delete selected holes from the glass pane
   */
  delete(): void;

  /**
   * Create a hole in the glass at the specified position
   * @param position - Center point of the hole
   * @param config - Hole configuration data
   */
  makeHole(position: Flatten.Point, config: any): void;

  /**
   * Generate polygon accounting for surrounding bars/mullions
   * @returns Polygon adjusted for frame and mullion widths
   */
  polygonWithBars(): WinPolygon;

  /**
   * Find the outer polygon by offsetting edges
   * @param polygon - Base polygon
   * @param offsets - Offset distances for each edge
   * @returns Offset polygon
   */
  findOutterPoly(polygon: WinPolygon, offsets: number[]): WinPolygon;

  /**
   * Update polygon and all dependent shapes/labels
   * Recalculates render polygon, shade, holes, serials, and specs
   */
  updatePoly(): void;

  /**
   * Serialize glass data to JSON
   * @returns Serialized glass object
   */
  toJSON(): GlassJSON;

  /**
   * Deserialize glass from JSON data
   * @param data - Serialized glass data
   * @returns This instance for chaining
   */
  deserialize(data: GlassJSON): this;

  /**
   * Draw the glass and all child components
   * @param context - Drawing context/artisan
   */
  draw(context: typeof Artisan): void;

  /**
   * Test if a point hits this glass or its holes
   * @param x - X coordinate
   * @param y - Y coordinate
   * @returns Hit result type
   */
  hitArea(x: number, y: number): HitResult;

  /**
   * Create the main glass shape with fill color
   * @private
   */
  private makeGlassShape(): void;

  /**
   * Generate shading effect shapes (venetian blind style)
   * Creates horizontal slats and vertical pull cords
   * @private
   */
  private makeShadeShape(): void;

  /**
   * Get the Z-index for layering with theft bars
   * @returns Calculated Z-index value
   */
  get Zindex(): number;
}

export { Glass };