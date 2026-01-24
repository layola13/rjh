/**
 * SVG Corner Windows rendering module
 * Handles the rendering of corner windows, parametric openings, and various window types in SVG format
 */

import { SvgBase } from './SvgBase';
import { Util } from './Util';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Style configuration for stroke rendering
 */
interface StrokeStyle {
  fill: string;
  stroke: string;
  'fill-opacity': number;
}

/**
 * Style configuration for path rendering
 */
interface PathStyle {
  stroke: string;
  'stroke-width': number;
}

/**
 * Style configuration for inner path rendering
 */
interface InnerPathStyle {
  fill: string;
  stroke: string;
  'stroke-width': number;
}

/**
 * Style configuration for wall rendering
 */
interface WallStyle {
  fill: string;
  stroke: string;
  'stroke-width'?: number;
}

/**
 * Style configuration for glass rendering
 */
interface GlassStyle {
  fill: string;
  stroke: string;
}

/**
 * Collection of all styles used for rendering
 */
interface CornerWindowStyles {
  strokeStyle?: StrokeStyle;
  middlePathStyle?: PathStyle;
  innerPathStyle?: InnerPathStyle;
  wallStyle?: WallStyle;
  wallInnerStyle?: WallStyle;
  glassStyle?: GlassStyle;
}

/**
 * 2D point in model space
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * Glass element data for rendering
 */
interface GlassData {
  outer: Point2D[];
  middleLine: Point2D[][];
}

/**
 * 2D view data for parametric openings
 */
interface ParametricOpening2DViewData {
  innerPath?: Point2D[][];
  walls?: Point2D[][];
  glass?: GlassData[];
}

/**
 * Top projection data for corner windows
 */
interface TopProjectionData {
  outPath: Point2D[];
  wallA?: Point2D[];
  wallD?: Point2D[];
  middle1Path?: Point2D[];
  middle2Path?: Point2D[];
  innerPath?: Point2D[];
}

/**
 * SVG node interface with transform and path methods
 */
interface SvgNode {
  group(): SvgNode;
  path(data: string): SvgNode;
  id(id: string): SvgNode;
  attr(attributes: Record<string, unknown>): SvgNode;
  move(x: number, y: number): SvgNode;
  add(node: SvgNode): void;
}

/**
 * Layer nodes structure
 */
interface LayerNodes {
  cornerwindows: SvgNode;
}

/**
 * Layers interface
 */
interface Layers {
  cornerwindows: SvgNode;
}

/**
 * Context interface for rendering operations
 */
interface RenderContext {
  pageSetting(): PageSettings;
  getWallsMask(): SvgNode | null;
  getUnitPerPixel(): number;
  layers(): Layers;
}

/**
 * Page settings for rendering configuration
 */
interface PageSettings {
  window: {
    strokeColor: string;
    wallColor: string;
    glassColor: string;
    glassStrokeColor: string;
    wallsMaskStrokeWidth?: number;
    lineWidth: number;
    lineColor: string;
  };
  room: {
    edgeColor: string;
  };
  wall: {
    normalColor: string;
  };
}

/**
 * Entity interface representing a window or opening model
 */
interface WindowEntity {
  ID: string;
  id: string;
  x: number;
  y: number;
  ZRotation: number;
  pathSegments: unknown[];
  instanceOf(className: string): boolean;
  get2DViewData(): ParametricOpening2DViewData | null;
  getTopProjection(): TopProjectionData;
  getHost(): unknown | null;
}

/**
 * Application interface with floorplan access
 */
interface Application {
  floorplan: {
    scene: {
      activeLayer: {
        contents: Record<string, WindowEntity>;
        parametricOpenings: Record<string, WindowEntity>;
      };
    };
  };
}

// ============================================================================
// Main Export: SvgCornerWindows
// ============================================================================

/**
 * Main class for rendering corner windows in SVG format
 * Manages the collection of corner window renderers and coordinates their drawing
 */
export declare class SvgCornerWindows extends SvgBase {
  private _cornerwindows: BaseCornerWindowRenderer[];
  private _node: SvgNode;
  private _styles: CornerWindowStyles;

  /**
   * Creates a new SvgCornerWindows instance
   * @param app - Application instance containing floorplan data
   * @param ctx - Rendering context with settings and utilities
   */
  constructor(app: Application, ctx: RenderContext);

  /**
   * Builds the corner window renderers for all valid entities in the active layer
   * Initializes styles based on page settings
   */
  build(): void;

  /**
   * Draws all corner windows to the SVG canvas
   */
  draw(): void;

  /**
   * Exports corner windows for manufacturing/printing view
   * Rebuilds and draws with specialized manufacturing settings
   */
  exportM(): void;

  /**
   * Creates the appropriate renderer for a given window entity
   * @param entity - The window or opening entity to render
   * @returns The appropriate renderer instance or null if entity is invalid
   */
  private _createCornerwindows(entity: WindowEntity): BaseCornerWindowRenderer | null;

  /**
   * Validates if an entity should be rendered
   * @param entity - The entity to validate
   * @returns True if the entity is valid for rendering
   */
  protected isItemValid(entity: WindowEntity): boolean;
}

// ============================================================================
// Parametric Opening Renderer
// ============================================================================

/**
 * Renderer for parametric opening windows
 * Handles complex parametric window geometries with glass panels and walls
 */
declare class ParametricOpeningRenderer extends SvgBase {
  private parametricopening: WindowEntity;
  private _node: SvgNode;
  private _styles: CornerWindowStyles;

  /**
   * Creates a new parametric opening renderer
   * @param app - Application instance
   * @param ctx - Rendering context
   * @param entity - The parametric opening entity
   * @param node - SVG node for rendering
   * @param styles - Style configuration
   */
  constructor(
    app: Application,
    ctx: RenderContext,
    entity: WindowEntity,
    node: SvgNode,
    styles: CornerWindowStyles
  );

  /**
   * Draws the parametric opening in standard view mode
   * Renders inner paths, walls, and glass elements
   */
  draw(): void;

  /**
   * Draws the parametric opening in manufacturing/export mode
   * Uses specialized rendering for production output
   */
  drawM(): void;

  /**
   * Appends a path element with specified style
   * @param points - Array of points defining the path
   * @param style - Style attributes to apply
   * @param close - Whether to close the path (default: true)
   */
  private _appendPathtoElement(points: Point2D[], style: Record<string, unknown>, close?: boolean): void;

  /**
   * Builds an SVG path string from points
   * @param points - Array of points
   * @param close - Whether to close the path with 'Z'
   * @returns SVG path data string
   */
  private _buildSvgString(points: Point2D[], close: boolean): string;

  /**
   * Builds an SVG path for line segments (middle lines)
   * @param points - Array of points defining the line segments
   * @returns SVG path data string
   */
  private _buildLineSvgPath(points: Point2D[]): string;
}

// ============================================================================
// Base Corner Window Renderer
// ============================================================================

/**
 * Base renderer for standard corner windows
 * Handles common corner window rendering logic for various window types
 */
declare class BaseCornerWindowRenderer extends SvgBase {
  protected _entity: WindowEntity;
  protected _node: SvgNode;
  protected _styles: CornerWindowStyles;

  /**
   * Creates a new base corner window renderer
   * @param app - Application instance
   * @param ctx - Rendering context
   * @param entity - The window entity
   * @param node - SVG node for rendering
   * @param styles - Style configuration
   */
  constructor(
    app: Application,
    ctx: RenderContext,
    entity: WindowEntity,
    node: SvgNode,
    styles: CornerWindowStyles
  );

  /**
   * Draws the corner window in standard view mode
   * Renders outer path, walls, middle paths, and optional inner path
   */
  draw(): void;

  /**
   * Draws the corner window in manufacturing/export mode
   * Uses specialized rendering for production output with masks
   */
  drawM(): void;

  /**
   * Determines if the window has an inner path
   * @returns True if inner path should be rendered
   */
  hasInner(): boolean;

  /**
   * Gets the style configuration for middle path rendering
   * @returns Style object for middle paths
   */
  getMiddlePathStyle(): PathStyle;

  /**
   * Builds an SVG path string from points
   * @param points - Array of points
   * @param close - Whether to close the path with 'Z'
   * @returns SVG path data string
   */
  private _buildSvgString(points: Point2D[], close: boolean): string;

  /**
   * Builds an SVG path for line segments
   * @param points - Array of points defining the line segments
   * @returns SVG path data string
   */
  private _buildLineSvgPath(points: Point2D[]): string;
}

// ============================================================================
// Flat Corner Window Renderer
// ============================================================================

/**
 * Renderer for flat corner windows (NgCornerFlatWindow)
 * Simplified rendering without inner path, using solid black middle lines
 */
declare class FlatCornerWindowRenderer extends BaseCornerWindowRenderer {
  /**
   * Creates a new flat corner window renderer
   * @param app - Application instance
   * @param ctx - Rendering context
   * @param entity - The flat window entity
   * @param node - SVG node for rendering
   * @param styles - Style configuration
   */
  constructor(
    app: Application,
    ctx: RenderContext,
    entity: WindowEntity,
    node: SvgNode,
    styles: CornerWindowStyles
  );

  /**
   * Flat windows do not render inner paths
   * @returns Always false
   */
  hasInner(): boolean;

  /**
   * Gets specialized style for flat window middle paths
   * @returns Style with black stroke
   */
  getMiddlePathStyle(): PathStyle;
}

// ============================================================================
// Ordinary Window Renderer
// ============================================================================

/**
 * Renderer for ordinary windows (NgPOrdinaryWindow)
 * Includes background, base, and swing layers for complex window rendering
 */
declare class OrdinaryWindowRenderer extends BaseCornerWindowRenderer {
  private _background: SvgNode;
  private _base: SvgNode;
  private _swing: SvgNode;

  /**
   * Creates a new ordinary window renderer with layered rendering
   * @param app - Application instance
   * @param ctx - Rendering context
   * @param entity - The ordinary window entity
   * @param node - SVG node for rendering
   * @param styles - Style configuration
   */
  constructor(
    app: Application,
    ctx: RenderContext,
    entity: WindowEntity,
    node: SvgNode,
    styles: CornerWindowStyles
  );

  /**
   * Ordinary windows do not render inner paths
   * @returns Always false
   */
  hasInner(): boolean;
}