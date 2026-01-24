/**
 * Canvas rendering context module
 * Provides 2D canvas rendering contexts with tracing and hit detection capabilities
 */

/**
 * List of traceable canvas 2D context methods
 */
const TRACEABLE_METHODS: readonly string[] = [
  "arc",
  "arcTo",
  "beginPath",
  "bezierCurveTo",
  "clearRect",
  "clip",
  "closePath",
  "createLinearGradient",
  "createPattern",
  "createRadialGradient",
  "drawImage",
  "ellipse",
  "fill",
  "fillText",
  "getImageData",
  "createImageData",
  "lineTo",
  "moveTo",
  "putImageData",
  "quadraticCurveTo",
  "rect",
  "restore",
  "rotate",
  "save",
  "scale",
  "setLineDash",
  "setTransform",
  "stroke",
  "strokeText",
  "transform",
  "translate"
] as const;

/**
 * Configurable canvas 2D context properties
 */
const CONFIGURABLE_PROPERTIES: readonly string[] = [
  "fillStyle",
  "strokeStyle",
  "shadowColor",
  "shadowBlur",
  "shadowOffsetX",
  "shadowOffsetY",
  "lineCap",
  "lineDashOffset",
  "lineJoin",
  "lineWidth",
  "miterLimit",
  "font",
  "textAlign",
  "textBaseline",
  "globalAlpha",
  "globalCompositeOperation",
  "imageSmoothingEnabled"
] as const;

/**
 * Trace entry for method calls
 */
interface MethodTraceEntry {
  method: string;
  args: unknown[];
}

/**
 * Trace entry for property assignments
 */
interface PropertyTraceEntry {
  property: string;
  val: unknown;
}

/**
 * Union type for all trace entries
 */
type TraceEntry = MethodTraceEntry | PropertyTraceEntry;

/**
 * Shape interface with common rendering attributes
 */
interface Shape {
  attrs: ShapeAttributes;
  fillEnabled(): boolean;
  hasStroke(): boolean;
  getLineCap(): string | undefined;
  getAbsoluteOpacity(): number;
  fill(): string | undefined;
  getFillPriority(): string;
  getFillPatternImage(): HTMLImageElement | undefined;
  getFillLinearGradientColorStops(): number[] | undefined;
  getFillRadialGradientColorStops(): number[] | undefined;
  dash(): number[] | undefined;
  getStrokeScaleEnabled(): boolean;
  dashEnabled(): boolean;
  dashOffset(): number;
  strokeWidth(): number;
  getShadowForStrokeEnabled(): boolean;
  getStrokeLinearGradientColorStops(): number[] | undefined;
  stroke(): string | undefined;
  getShadowRGBA(): string | null;
  getShadowBlur(): number | null;
  getShadowOffset(): { x: number; y: number } | null;
  getAbsoluteScale(): { x: number; y: number };
  hasHitStroke(): boolean;
  hitStrokeWidth(): number | "auto";
  colorKey: string;
  _fillFunc(context: Context): void;
  _strokeFunc(context: Context): void;
  _fillFuncHit(context: Context): void;
  _strokeFuncHit(context: Context): void;
  _getFillPattern(): CanvasPattern;
  _getLinearGradient(): CanvasGradient | null;
  _getRadialGradient(): CanvasGradient | null;
  getStrokeLinearGradientStartPoint(): { x: number; y: number };
  getStrokeLinearGradientEndPoint(): { x: number; y: number };
}

/**
 * Shape attributes configuration
 */
interface ShapeAttributes {
  fillAfterStrokeEnabled?: boolean;
  lineJoin?: CanvasLineJoin;
  globalCompositeOperation?: GlobalCompositeOperation;
}

/**
 * Canvas wrapper interface
 */
interface CanvasWrapper {
  _canvas: HTMLCanvasElement;
  getPixelRatio(): number;
  getWidth(): number;
  getHeight(): number;
  pixelRatio: number;
}

/**
 * Configuration for canvas creation
 */
interface CanvasConfig {
  width?: number;
  height?: number;
  pixelRatio?: number;
}

/**
 * Clear region configuration
 */
interface ClearRegion {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

/**
 * Base rendering context wrapper for 2D canvas operations
 * Provides method tracing and enhanced rendering capabilities
 */
declare class Context {
  /** Reference to parent canvas wrapper */
  canvas: CanvasWrapper;
  
  /** Native 2D rendering context */
  protected _context: CanvasRenderingContext2D;
  
  /** Trace array for debugging (enabled when Global.enableTrace is true) */
  traceArr?: TraceEntry[];

  /**
   * Creates a new context wrapper
   * @param canvas - Parent canvas wrapper
   */
  constructor(canvas: CanvasWrapper);

  /**
   * Fills a shape if fill is enabled
   * @param shape - Shape to fill
   */
  fillShape(shape: Shape): void;

  /**
   * Internal fill implementation (overridden in subclasses)
   * @param shape - Shape to fill
   */
  protected _fill(shape: Shape): void;

  /**
   * Strokes a shape if stroke is enabled
   * @param shape - Shape to stroke
   */
  strokeShape(shape: Shape): void;

  /**
   * Internal stroke implementation (overridden in subclasses)
   * @param shape - Shape to stroke
   */
  protected _stroke(shape: Shape): void;

  /**
   * Fills and strokes a shape respecting fillAfterStrokeEnabled
   * @param shape - Shape to render
   */
  fillStrokeShape(shape: Shape): void;

  /**
   * Gets formatted trace log
   * @param skipTransform - Skip method arguments
   * @param rounded - Round numeric values
   * @returns Formatted trace string
   */
  getTrace(skipTransform?: boolean, rounded?: boolean): string;

  /**
   * Clears trace array
   */
  clearTrace(): void;

  /**
   * Adds entry to trace array
   * @param entry - Trace entry to add
   */
  protected _trace(entry: TraceEntry): void;

  /**
   * Resets transform to default with pixel ratio scaling
   */
  reset(): void;

  /**
   * Gets parent canvas wrapper
   */
  getCanvas(): CanvasWrapper;

  /**
   * Clears canvas or specified region
   * @param region - Optional region to clear
   */
  clear(region?: ClearRegion): void;

  /**
   * Applies line cap from shape
   * @param shape - Shape with lineCap attribute
   */
  protected _applyLineCap(shape: Shape): void;

  /**
   * Applies opacity from shape
   * @param shape - Shape with opacity
   */
  protected _applyOpacity(shape: Shape): void;

  /**
   * Applies line join from shape
   * @param shape - Shape with lineJoin attribute
   */
  protected _applyLineJoin(shape: Shape): void;

  /**
   * Sets context attribute
   * @param attr - Attribute name
   * @param value - Attribute value
   */
  setAttr(attr: string, value: unknown): void;

  /**
   * Enables trace recording for debugging
   */
  protected _enableTrace(): void;

  /**
   * Applies global composite operation from shape
   * @param shape - Shape with globalCompositeOperation
   */
  protected _applyGlobalCompositeOperation(shape: Shape): void;

  // CanvasRenderingContext2D method declarations
  arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void;
  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
  beginPath(): void;
  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
  clearRect(x: number, y: number, width: number, height: number): void;
  clip(): void;
  closePath(): void;
  createImageData(width: number, height: number): ImageData;
  createImageData(imagedata: ImageData): ImageData;
  createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient;
  createPattern(image: CanvasImageSource, repetition: string | null): CanvasPattern | null;
  createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient;
  drawImage(image: CanvasImageSource, dx: number, dy: number): void;
  drawImage(image: CanvasImageSource, dx: number, dy: number, dw: number, dh: number): void;
  drawImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void;
  ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void;
  isPointInPath(x: number, y: number): boolean;
  fill(fillRule?: CanvasFillRule): void;
  fill(path: Path2D, fillRule?: CanvasFillRule): void;
  fillRect(x: number, y: number, width: number, height: number): void;
  strokeRect(x: number, y: number, width: number, height: number): void;
  fillText(text: string, x: number, y: number, maxWidth?: number): void;
  measureText(text: string): TextMetrics;
  getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
  lineTo(x: number, y: number): void;
  moveTo(x: number, y: number): void;
  rect(x: number, y: number, width: number, height: number): void;
  putImageData(imagedata: ImageData, dx: number, dy: number): void;
  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
  restore(): void;
  rotate(angle: number): void;
  save(): void;
  scale(x: number, y: number): void;
  setLineDash(segments: number[]): void;
  getLineDash(): number[];
  setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;
  stroke(path?: Path2D): void;
  strokeText(text: string, x: number, y: number, maxWidth?: number): void;
  transform(a: number, b: number, c: number, d: number, e: number, f: number): void;
  translate(x: number, y: number): void;

  // CanvasRenderingContext2D property declarations
  fillStyle: string | CanvasGradient | CanvasPattern;
  strokeStyle: string | CanvasGradient | CanvasPattern;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  lineCap: CanvasLineCap;
  lineDashOffset: number;
  lineJoin: CanvasLineJoin;
  lineWidth: number;
  miterLimit: number;
  font: string;
  textAlign: CanvasTextAlign;
  textBaseline: CanvasTextBaseline;
  globalAlpha: number;
  globalCompositeOperation: GlobalCompositeOperation;
  imageSmoothingEnabled: boolean;
}

/**
 * Scene rendering context for visible canvas output
 * Handles colors, gradients, patterns, and shadows
 */
declare class SceneContext extends Context {
  /**
   * Fills shape with solid color
   * @param shape - Shape to fill
   */
  protected _fillColor(shape: Shape): void;

  /**
   * Fills shape with pattern
   * @param shape - Shape with pattern
   */
  protected _fillPattern(shape: Shape): void;

  /**
   * Fills shape with linear gradient
   * @param shape - Shape with linear gradient
   */
  protected _fillLinearGradient(shape: Shape): void;

  /**
   * Fills shape with radial gradient
   * @param shape - Shape with radial gradient
   */
  protected _fillRadialGradient(shape: Shape): void;

  /**
   * Fills shape based on priority and available fill types
   * @param shape - Shape to fill
   */
  protected _fill(shape: Shape): void;

  /**
   * Applies linear gradient to stroke
   * @param shape - Shape with stroke gradient
   */
  protected _strokeLinearGradient(shape: Shape): void;

  /**
   * Strokes shape with scaling and dash support
   * @param shape - Shape to stroke
   */
  protected _stroke(shape: Shape): void;

  /**
   * Applies shadow effect from shape attributes
   * @param shape - Shape with shadow configuration
   */
  protected _applyShadow(shape: Shape): void;
}

/**
 * Hit detection rendering context
 * Renders shapes with unique color keys for pixel-based hit detection
 */
declare class HitContext extends Context {
  /**
   * Fills shape with its color key
   * @param shape - Shape to fill
   */
  protected _fill(shape: Shape): void;

  /**
   * Strokes shape if hit stroke is enabled
   * @param shape - Shape to stroke
   */
  strokeShape(shape: Shape): void;

  /**
   * Strokes shape with color key for hit detection
   * @param shape - Shape to stroke
   */
  protected _stroke(shape: Shape): void;
}

/**
 * Base canvas wrapper class
 * Manages HTMLCanvasElement with pixel ratio scaling
 */
declare class Canvas {
  /** Pixel ratio for high-DPI displays */
  pixelRatio: number;
  
  /** Logical width */
  width: number;
  
  /** Logical height */
  height: number;
  
  /** Whether this canvas is used for caching */
  isCache: boolean;
  
  /** Underlying HTML canvas element */
  _canvas: HTMLCanvasElement;
  
  /** Rendering context wrapper */
  context: Context;

  /**
   * Creates a new canvas wrapper
   * @param config - Canvas configuration
   */
  constructor(config?: CanvasConfig);

  /**
   * Gets the rendering context
   */
  getContext(): Context;

  /**
   * Gets current pixel ratio
   */
  getPixelRatio(): number;

  /**
   * Sets pixel ratio and rescales canvas
   * @param pixelRatio - New pixel ratio
   */
  setPixelRatio(pixelRatio: number): void;

  /**
   * Sets canvas width
   * @param width - Logical width in pixels
   */
  setWidth(width: number): void;

  /**
   * Sets canvas height
   * @param height - Logical height in pixels
   */
  setHeight(height: number): void;

  /**
   * Gets logical width
   */
  getWidth(): number;

  /**
   * Gets logical height
   */
  getHeight(): number;

  /**
   * Sets canvas dimensions
   * @param width - Logical width
   * @param height - Logical height
   */
  setSize(width: number, height: number): void;

  /**
   * Exports canvas to data URL
   * @param mimeType - MIME type (e.g., 'image/png')
   * @param quality - Quality for lossy formats (0-1)
   * @returns Data URL string
   */
  toDataURL(mimeType?: string, quality?: number): string;
}

/**
 * Scene canvas for visible rendering output
 */
export declare class SceneCanvas extends Canvas {
  context: SceneContext;

  /**
   * Creates a new scene canvas
   * @param config - Canvas configuration
   */
  constructor(config?: CanvasConfig);
}

/**
 * Hit detection canvas with unique color key rendering
 */
export declare class HitCanvas extends Canvas {
  /** Identifies this as a hit detection canvas */
  hitCanvas: true;
  
  context: HitContext;

  /**
   * Creates a new hit detection canvas
   * @param config - Canvas configuration
   */
  constructor(config?: CanvasConfig);
}

// Named exports
export { SceneCanvas as b, HitCanvas as a };