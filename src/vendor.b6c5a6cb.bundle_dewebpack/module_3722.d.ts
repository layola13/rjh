/**
 * PIXI.js Settings Module
 * @module @pixi/settings
 * @version 5.2.4
 * @license MIT
 */

/**
 * Mobile device detection result
 */
export interface MobileDetection {
  /** Whether the device is a tablet */
  tablet: boolean;
  /** Whether the device is a phone */
  phone: boolean;
  /** Apple device information */
  apple: {
    /** Whether it's an Apple device */
    device: boolean;
  };
  /** Android device information */
  android: {
    /** Whether it's an Android device */
    device: boolean;
  };
}

/**
 * WebGL rendering options configuration
 */
export interface RenderOptions {
  /** The canvas element to render to */
  view: HTMLCanvasElement | null;
  /** Whether to enable anti-aliasing */
  antialias: boolean;
  /** Whether to force FXAA anti-aliasing */
  forceFXAA: boolean;
  /** Whether to automatically adjust canvas density based on device pixel ratio */
  autoDensity: boolean;
  /** Whether the canvas background should be transparent */
  transparent: boolean;
  /** The background color of the canvas (hex value) */
  backgroundColor: number;
  /** Whether to clear the canvas before each render */
  clearBeforeRender: boolean;
  /** Whether to preserve the drawing buffer for reading pixels */
  preserveDrawingBuffer: boolean;
  /** The width of the canvas in pixels */
  width: number;
  /** The height of the canvas in pixels */
  height: number;
  /** Whether to use legacy rendering mode */
  legacy: boolean;
}

/**
 * Global PIXI settings configuration
 */
export interface Settings {
  /** Mipmap generation mode for textures (0 = off, 1 = POW2 only, 2 = always) */
  MIPMAP_TEXTURES: number;
  /** Anisotropic filtering level for textures */
  ANISOTROPIC_LEVEL: number;
  /** Default resolution / device pixel ratio */
  RESOLUTION: number;
  /** Default filter resolution multiplier */
  FILTER_RESOLUTION: number;
  /** Maximum textures per sprite batch (device-dependent) */
  SPRITE_MAX_TEXTURES: number;
  /** Maximum sprites per batch */
  SPRITE_BATCH_SIZE: number;
  /** Default renderer options */
  RENDER_OPTIONS: RenderOptions;
  /** Garbage collection mode (0 = manual, 1 = auto) */
  GC_MODE: number;
  /** Maximum idle time in seconds before garbage collection */
  GC_MAX_IDLE: number;
  /** Maximum number of checks per garbage collection cycle */
  GC_MAX_CHECK_COUNT: number;
  /** Default texture wrap mode (WebGL constant) */
  WRAP_MODE: number;
  /** Default texture scale mode (0 = nearest, 1 = linear) */
  SCALE_MODE: number;
  /** Vertex shader precision (lowp, mediump, highp) */
  PRECISION_VERTEX: string;
  /** Fragment shader precision (lowp, mediump, highp) */
  PRECISION_FRAGMENT: string;
  /** Whether the device can upload the same buffer multiple times */
  CAN_UPLOAD_SAME_BUFFER: boolean;
  /** Whether to use createImageBitmap for loading images */
  CREATE_IMAGE_BITMAP: boolean;
  /** Whether to round pixel positions for crisp rendering */
  ROUND_PIXELS: boolean;
}

/**
 * Indicates whether the current device is a mobile device
 */
export const isMobile: MobileDetection;

/**
 * Global PIXI settings object
 * Contains configuration for rendering, textures, batching, and performance
 */
export const settings: Settings;