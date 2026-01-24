/**
 * WebGL-based image processing and 3D rendering module
 * Provides filters, transformations, and panoramic image handling
 */

// ============================================================================
// Core Utility Types
// ============================================================================

/**
 * RGB color representation
 */
export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

/**
 * RGBA color representation with alpha channel
 */
export interface RGBAColor extends RGBColor {
  a: number;
}

/**
 * Entity identifier mapping
 */
export interface EntityIds {
  instanceid: string;
  [key: string]: unknown;
}

/**
 * Entity with color and ID information
 */
export interface Entity {
  color: RGBAColor;
  ids: EntityIds;
}

/**
 * Gizmo display configuration
 */
export interface GizmoConfig extends RGBAColor {
  gizmoType: 'line' | 'face';
}

/**
 * Filter parameters for image adjustments
 */
export interface FilterParams {
  sharpen?: number;
  brightness?: number;
  contrast?: number;
  hue?: number;
  saturation?: number;
  temperature?: number;
  highlight?: number;
  shadow?: number;
  exposure?: number;
}

/**
 * Enhanced canvas with WebGL capabilities
 */
export interface WebGLCanvas extends HTMLCanvasElement {
  texture(image: HTMLImageElement | HTMLCanvasElement): WebGLCanvas;
  draw(target: WebGLTexture): WebGLCanvas;
  update(): WebGLCanvas;
  replace(element: HTMLElement): WebGLCanvas;
  contents(): WebGLTexture;
  getPixelArray(): Uint8ClampedArray;
  
  // Adjustment filters
  brightnessContrast(brightness: number, contrast: number): WebGLCanvas;
  hueSaturation(hue: number, saturation: number): WebGLCanvas;
  temperature(amount: number): WebGLCanvas;
  exposure(amount: number): WebGLCanvas;
  vibrance(amount: number): WebGLCanvas;
  sepia(amount: number): WebGLCanvas;
  vignette(size: number, amount: number): WebGLCanvas;
  
  // Blur and sharpening
  triangleBlur(radius: number): WebGLCanvas;
  lensBlur(radius: number, brightness: number, angle: number): WebGLCanvas;
  tiltShift(startX: number, startY: number, endX: number, endY: number, blurRadius: number, gradientRadius: number): WebGLCanvas;
  zoomBlur(centerX: number, centerY: number, strength: number): WebGLCanvas;
  sharpen(amount: number): WebGLCanvas;
  unsharpMask(radius: number, strength: number): WebGLCanvas;
  denoise(exponent: number): WebGLCanvas;
  
  // Color adjustments
  curves(red: number[], green?: number[], blue?: number[]): WebGLCanvas;
  highlight(amount: number): WebGLCanvas;
  shadow(amount: number): WebGLCanvas;
  
  // Effects
  noise(amount: number): WebGLCanvas;
  dotScreen(centerX: number, centerY: number, angle: number, size: number): WebGLCanvas;
  colorHalftone(centerX: number, centerY: number, angle: number, size: number): WebGLCanvas;
  hexagonalPixelate(centerX: number, centerY: number, scale: number): WebGLCanvas;
  edgeWork(radius: number): WebGLCanvas;
  ink(strength: number): WebGLCanvas;
  
  // Transformations
  perspective(before: number[], after: number[]): WebGLCanvas;
  matrixWarp(matrix: number[], inverse?: boolean, useTextureSpace?: boolean): WebGLCanvas;
  bulgePinch(centerX: number, centerY: number, radius: number, strength: number): WebGLCanvas;
  swirl(centerX: number, centerY: number, radius: number, angle: number): WebGLCanvas;
  
  // Special effects
  replace(targetColor: RGBColor, maskImage: HTMLImageElement, sourceImage: HTMLImageElement): WebGLCanvas;
  replaceAdvance(targetColor: RGBColor, maskImage: HTMLImageElement, sourceImage: HTMLImageElement): WebGLCanvas;
  select(colors: RGBColor[], lineWidth?: number): WebGLCanvas;
  partFilter(maskImage: HTMLImageElement, filters: Array<RGBColor & FilterParams>): WebGLCanvas;
  partFilterAdvance(maskImage: HTMLImageElement, filters: Array<RGBColor & FilterParams>): WebGLCanvas;
  
  // Panoramic
  fishEyeHandle(images: HTMLImageElement[]): WebGLCanvas;
  fishEye(images: HTMLImageElement[], scale?: number): HTMLCanvasElement | undefined;
  bokeh(depthMap: HTMLImageElement, focus: number, radius: number, aperture: number): WebGLCanvas;
}

/**
 * WebGL texture wrapper
 */
export interface WebGLTexture {
  loadContentsOf(element: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): void;
  destroy(): void;
}

// ============================================================================
// Main Module Interface
// ============================================================================

export interface ImageProcessingModule {
  /**
   * Creates a WebGL-enabled canvas for image processing
   */
  canvas(): WebGLCanvas;
  
  /**
   * Converts cubic images to fisheye panorama (version 2)
   */
  fishEyeV2(images: HTMLImageElement[], scale?: number): HTMLCanvasElement | undefined;
  
  /**
   * Creates interactive image picker with entity selection
   */
  pickImage(
    imageUrl: string,
    width: number,
    height: number,
    lineConfig?: GizmoConfig,
    faceConfig?: GizmoConfig,
    lineWidth?: number,
    entityCombiner?: (entities: Entity[]) => Record<string, string[]>
  ): Promise<InteractiveCanvas>;
  
  /**
   * Creates interactive panoramic viewer with entity selection
   */
  pickPano(
    imageUrl: string,
    width: number,
    height: number,
    lineConfig?: GizmoConfig,
    faceConfig?: GizmoConfig,
    lineWidth?: number,
    entityMetadata?: Record<string, unknown>
  ): Promise<InteractivePanorama>;
  
  /**
   * Performs spline interpolation for smooth curves
   */
  splineInterpolate(points: Array<[number, number]>): number[];
}

/**
 * Interactive canvas with entity selection
 */
export interface InteractiveCanvas extends HTMLCanvasElement {
  /**
   * Highlights selected entities
   */
  highlight(lineEntityIds?: string[], faceEntityIds?: string[]): void;
  
  /**
   * Gets entity IDs at page coordinates
   */
  getIds(pageX: number, pageY: number): EntityIds | null;
  
  /**
   * Gets entity IDs at relative canvas coordinates
   */
  getIdsByRelative(x: number, y: number): EntityIds | null;
  
  /**
   * Releases WebGL resources
   */
  loseContext(): void;
}

/**
 * Interactive panoramic viewer
 */
export interface InteractivePanorama extends InteractiveCanvas {
  /**
   * Sets field of view (in radians)
   */
  setFov(fov: number): void;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Clamps a value between min and max
 */
export function clamp(min: number, value: number, max: number): number;

/**
 * Compiles GLSL shader source code
 */
export function compileSource(gl: WebGLRenderingContext, type: number, source: string): WebGLShader;

/**
 * Loads an image with CORS support
 */
export function loadImage(url: string): Promise<HTMLImageElement>;

/**
 * Loads ID map image for entity selection
 */
export function loadIdMap(imageUrl: string): Promise<HTMLImageElement>;

/**
 * Fetches ID map JSON metadata
 */
export function getIdMapJson(idMapImage: HTMLImageElement): Promise<Entity[]>;

/**
 * Combines entities based on mapping rules
 */
export function combineEntity(
  idMapImage: HTMLImageElement,
  entities: Entity[],
  combinations?: Record<string, string[]>
): ImageData;

/**
 * Resizes image to target width maintaining aspect ratio
 */
export function resizeImage(image: HTMLImageElement, targetWidth: number): ImageData;

/**
 * Checks if URL is an editable image
 */
export function isEditImage(url: string): boolean;

/**
 * Gets source URL from edit URL
 */
export function getSourceUrl(url: string): string;

declare const module: ImageProcessingModule;
export default module;