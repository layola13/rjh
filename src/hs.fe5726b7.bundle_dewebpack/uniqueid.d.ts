/**
 * Type definitions for canvg SVG rendering library
 * @module canvg
 */

/**
 * Options for configuring the SVG renderer
 */
export interface CanvgOptions {
  /** Enable/disable logging */
  log?: boolean;
  /** Ignore mouse events */
  ignoreMouse?: boolean;
  /** Ignore animations */
  ignoreAnimation?: boolean;
  /** Ignore SVG dimensions */
  ignoreDimensions?: boolean;
  /** Ignore canvas clearing */
  ignoreClear?: boolean;
  /** X-axis offset */
  offsetX?: number;
  /** Y-axis offset */
  offsetY?: number;
  /** Scale width */
  scaleWidth?: number;
  /** Scale height */
  scaleHeight?: number;
  /** Force redraw callback */
  forceRedraw?: () => boolean;
  /** Render completion callback */
  renderCallback?: (doc: Document) => void;
  /** Enable CORS for images */
  useCORS?: boolean;
}

/**
 * 2D point representation
 */
export interface Point {
  x: number;
  y: number;
  /** Calculate angle to another point */
  angleTo(point: Point): number;
  /** Apply transformation matrix */
  applyTransform(matrix: number[]): void;
}

/**
 * Bounding box for elements
 */
export interface BoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** Get X coordinate */
  x(): number;
  /** Get Y coordinate */
  y(): number;
  /** Get width */
  width(): number;
  /** Get height */
  height(): number;
  /** Add a point to expand bounding box */
  addPoint(x: number | null, y: number | null): void;
  /** Add X coordinate */
  addX(x: number): void;
  /** Add Y coordinate */
  addY(y: number): void;
  /** Merge another bounding box */
  addBoundingBox(bbox: BoundingBox): void;
  /** Add quadratic curve to bounds calculation */
  addQuadraticCurve(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number): void;
  /** Add bezier curve to bounds calculation */
  addBezierCurve(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void;
  /** Check if point is inside bounding box */
  isPointInBox(x: number, y: number): boolean;
}

/**
 * SVG property with value and unit parsing
 */
export interface Property {
  name: string;
  value: string;
  /** Get raw value */
  getValue(): string;
  /** Check if has non-empty value */
  hasValue(): boolean;
  /** Parse as number */
  numValue(): number;
  /** Get value or default */
  valueOrDefault(defaultValue: string): string;
  /** Get numeric value or default */
  numValueOrDefault(defaultValue: number): number;
  /** Add opacity to color */
  addOpacity(opacityProperty: Property): Property;
  /** Get referenced definition */
  getDefinition(): unknown;
  /** Check if value is url() reference */
  isUrlDefinition(): boolean;
  /** Get fill style from definition */
  getFillStyleDefinition(element: unknown, opacity: Property): unknown;
  /** Get DPI for conversions */
  getDPI(element: unknown): number;
  /** Get EM unit size */
  getEM(element: unknown): number;
  /** Get unit string */
  getUnits(): string;
  /** Convert to pixels */
  toPixels(axis?: string, relative?: boolean): number;
  /** Convert to milliseconds */
  toMilliseconds(): number;
  /** Convert to radians */
  toRadians(): number;
  /** Convert to canvas text baseline */
  toTextBaseline(): string | null;
}

/**
 * Font parsing and rendering utilities
 */
export interface Font {
  Styles: string;
  Variants: string;
  Weights: string;
  /** Create font object from components */
  CreateFont(
    fontStyle: string,
    fontVariant: string,
    fontWeight: string,
    fontSize: string,
    fontFamily: string,
    fallback?: string
  ): FontObject;
  /** Parse font string */
  Parse(fontString: string): Partial<FontObject>;
}

/**
 * Parsed font object
 */
export interface FontObject {
  fontFamily: string;
  fontSize: string;
  fontStyle: string;
  fontWeight: string;
  fontVariant: string;
  toString(): string;
}

/**
 * Main canvg rendering context
 */
export interface CanvgContext {
  opts: CanvgOptions;
  FRAMERATE: number;
  MAX_VIRTUAL_PIXELS: number;
  ctx: CanvasRenderingContext2D;
  UniqueId: () => string;
  Definitions: Record<string, unknown>;
  Styles: Record<string, unknown>;
  Animations: unknown[];
  Images: unknown[];
  ViewPort: ViewPort;
  intervalID?: number;
  
  /** Initialize rendering context */
  init(context: CanvasRenderingContext2D): void;
  /** Check if all images loaded */
  ImagesLoaded(): boolean;
  /** Trim whitespace */
  trim(str: string): string;
  /** Compress spaces */
  compressSpaces(str: string): string;
  /** AJAX request */
  ajax(url: string): string | null;
  /** Parse XML string */
  parseXml(xml: string): Document;
  /** Convert string to number array */
  ToNumberArray(str: string): number[];
  /** Create point from string */
  CreatePoint(str: string): Point;
  /** Create path from string */
  CreatePath(str: string): Point[];
  /** Load SVG from URL */
  load(context: CanvasRenderingContext2D, url: string): void;
  /** Load SVG from XML string */
  loadXml(context: CanvasRenderingContext2D, xml: string): void;
  /** Load SVG from XML document */
  loadXmlDoc(context: CanvasRenderingContext2D, doc: Document): void;
  /** Stop animation loop */
  stop(): void;
  /** Logging function */
  log(message: string): void;
}

/**
 * Viewport management
 */
export interface ViewPort {
  viewPorts: Array<{ width: number; height: number }>;
  /** Clear all viewports */
  Clear(): void;
  /** Set current viewport */
  SetCurrent(width: number, height: number): void;
  /** Remove current viewport */
  RemoveCurrent(): void;
  /** Get current viewport */
  Current(): { width: number; height: number };
  /** Get viewport width */
  width(): number;
  /** Get viewport height */
  height(): number;
  /** Compute size based on axis */
  ComputeSize(axis: string | number | null): number;
}

/**
 * Transform operations
 */
export interface Transform {
  transforms: TransformOperation[];
  /** Apply all transforms to context */
  apply(context: CanvasRenderingContext2D): void;
  /** Unapply transforms */
  unapply(context: CanvasRenderingContext2D): void;
  /** Apply transforms to point */
  applyToPoint(point: Point): void;
}

/**
 * Individual transform operation
 */
export interface TransformOperation {
  type: string;
  apply(context: CanvasRenderingContext2D): void;
  unapply(context: CanvasRenderingContext2D): void;
  applyToPoint(point: Point): void;
}

/**
 * Mouse event handling
 */
export interface Mouse {
  events: MouseEvent[];
  eventElements: unknown[];
  /** Check if has pending events */
  hasEvents(): boolean;
  /** Register click event */
  onclick(x: number, y: number): void;
  /** Register mousemove event */
  onmousemove(x: number, y: number): void;
  /** Check path intersection */
  checkPath(element: unknown, context: CanvasRenderingContext2D): void;
  /** Check bounding box intersection */
  checkBoundingBox(element: unknown, bbox: BoundingBox): void;
  /** Execute pending events */
  runEvents(): void;
}

/**
 * Mouse event data
 */
export interface MouseEvent {
  type: 'onclick' | 'onmousemove';
  x: number;
  y: number;
  run(element: unknown): void;
}

/**
 * Main canvg rendering function
 * @param canvas - Canvas element or ID
 * @param svg - SVG content (XML string, Document, or URL)
 * @param options - Rendering options
 */
export function canvg(
  canvas: string | HTMLCanvasElement,
  svg: string | Document,
  options?: CanvgOptions
): void;

/**
 * Canvas rendering context extension for SVG
 */
declare global {
  interface CanvasRenderingContext2D {
    /**
     * Draw SVG on canvas
     * @param svg - SVG content
     * @param x - X position
     * @param y - Y position
     * @param width - Width
     * @param height - Height
     */
    drawSvg(svg: string, x: number, y: number, width: number, height: number): void;
  }
}

export {};