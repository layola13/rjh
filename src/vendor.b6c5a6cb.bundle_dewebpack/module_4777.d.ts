/**
 * PixiJS Utilities Module
 * Core utility functions and caches for PixiJS rendering engine
 * @module @pixi/utils
 * @version 5.2.4
 */

import type { BLEND_MODES } from '@pixi/constants';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Typed array types supported by the utility functions
 */
export type TypedArray = Float32Array | Uint32Array | Int32Array | Uint16Array | Uint8Array;

/**
 * String representation of typed array types
 */
export type TypedArrayType = 'Float32Array' | 'Uint32Array' | 'Int32Array' | 'Uint16Array' | 'Uint8Array';

/**
 * Parsed data URI components
 */
export interface DataUriComponents {
    /** MIME type (e.g., 'image') */
    mediaType?: string;
    /** MIME subtype (e.g., 'png') */
    subType?: string;
    /** Character encoding */
    charset?: string;
    /** Encoding method (e.g., 'base64') */
    encoding?: string;
    /** The actual data payload */
    data: string;
}

/**
 * Result from trimming a canvas to its content bounds
 */
export interface TrimmedCanvasData {
    /** Trimmed width in pixels */
    width: number;
    /** Trimmed height in pixels */
    height: number;
    /** Image data of the trimmed region, or null if canvas is empty */
    data: ImageData | null;
}

/**
 * WebGL context creation attributes
 */
export interface WebGLContextAttributes {
    /** Enable stencil buffer */
    stencil: boolean;
    /** Fail context creation if performance is poor */
    failIfMajorPerformanceCaveat: boolean;
}

/**
 * Bounding box coordinates
 */
export interface BoundingBox {
    top: number | null;
    left: number | null;
    right: number | null;
    bottom: number | null;
}

// ============================================================================
// Cache Objects
// ============================================================================

/**
 * Cache mapping texture URLs/keys to Texture instances
 * @example
 * TextureCache['myTexture.png'] = texture;
 */
export const TextureCache: Record<string, any>;

/**
 * Cache mapping base texture URLs/keys to BaseTexture instances
 */
export const BaseTextureCache: Record<string, any>;

/**
 * Cache for compiled shader programs
 */
export const ProgramCache: Record<string, any>;

/**
 * Regular expression for parsing data URIs
 * Matches: data:[<mediatype>][;charset=<charset>][;base64],<data>
 */
export const DATA_URI: RegExp;

/**
 * Blend mode correction lookup table
 * [premultiplied][blendMode] -> corrected blend mode
 */
export const premultiplyBlendMode: BLEND_MODES[][];

// ============================================================================
// Event Emitter
// ============================================================================

/**
 * Cross-platform event emitter implementation
 */
export class EventEmitter {
    /**
     * Add a listener for a given event
     * @param event - Event name
     * @param fn - Callback function
     * @param context - Execution context
     */
    on(event: string | symbol, fn: Function, context?: any): this;
    
    /**
     * Add a one-time listener
     * @param event - Event name
     * @param fn - Callback function
     * @param context - Execution context
     */
    once(event: string | symbol, fn: Function, context?: any): this;
    
    /**
     * Remove event listener(s)
     * @param event - Event name
     * @param fn - Callback function to remove
     * @param context - Execution context
     * @param once - Only remove one-time listeners
     */
    removeListener(event: string | symbol, fn?: Function, context?: any, once?: boolean): this;
    
    /**
     * Emit an event
     * @param event - Event name
     * @param args - Arguments to pass to listeners
     */
    emit(event: string | symbol, ...args: any[]): boolean;
}

// ============================================================================
// URL Utilities
// ============================================================================

/**
 * URL parsing and manipulation utilities
 */
export namespace url {
    /**
     * Parse a URL string into components
     * @param urlString - URL to parse
     */
    export function parse(urlString: string): {
        protocol: string;
        hostname: string;
        port: string;
        pathname: string;
        search: string;
        hash: string;
    };
}

// ============================================================================
// Earcut Triangulation
// ============================================================================

/**
 * Earcut polygon triangulation algorithm
 * @param vertices - Flat array of vertex coordinates
 * @param holes - Array of hole indices
 * @param dimensions - Number of coordinates per vertex (default: 2)
 * @returns Array of triangle indices
 */
export function earcut(vertices: number[], holes?: number[], dimensions?: number): number[];

// ============================================================================
// Mobile Detection
// ============================================================================

/**
 * Platform detection result
 */
export const isMobile: {
    /** Running on any mobile device */
    any: boolean;
    /** Running on Android */
    android: boolean;
    /** Running on iOS */
    ios: boolean;
    /** Running on Windows Phone */
    windows: boolean;
    /** Running on Amazon device */
    amazon: boolean;
    /** Running on tablet */
    tablet: boolean;
    /** Running on phone */
    phone: boolean;
};

// ============================================================================
// Canvas Utilities
// ============================================================================

/**
 * Off-screen canvas render target with automatic resolution handling
 */
export class CanvasRenderTarget {
    /** The canvas element */
    canvas: HTMLCanvasElement;
    
    /** 2D rendering context */
    context: CanvasRenderingContext2D;
    
    /** Pixel density resolution */
    resolution: number;
    
    /**
     * Creates a new canvas render target
     * @param width - Width in pixels
     * @param height - Height in pixels
     * @param resolution - Pixel density (default: settings.RESOLUTION)
     */
    constructor(width: number, height: number, resolution?: number);
    
    /** Canvas width in pixels */
    width: number;
    
    /** Canvas height in pixels */
    height: number;
    
    /**
     * Clear the canvas
     */
    clear(): void;
    
    /**
     * Resize the canvas
     * @param width - New width in pixels
     * @param height - New height in pixels
     */
    resize(width: number, height: number): void;
    
    /**
     * Destroy and release resources
     */
    destroy(): void;
}

// ============================================================================
// Cache Management
// ============================================================================

/**
 * Clear all cached textures and base textures (without destroying them)
 */
export function clearTextureCache(): void;

/**
 * Destroy all cached textures and base textures
 */
export function destroyTextureCache(): void;

// ============================================================================
// Color Conversion
// ============================================================================

/**
 * Convert hex color to normalized RGB array
 * @param hex - Hex color value (0xRRGGBB)
 * @param out - Output array (optional, will be created if not provided)
 * @returns RGB array with values [0, 1]
 */
export function hex2rgb(hex: number, out?: number[] | Float32Array): number[] | Float32Array;

/**
 * Convert hex color to CSS hex string
 * @param hex - Hex color value
 * @returns CSS color string (e.g., '#ff0000')
 */
export function hex2string(hex: number): string;

/**
 * Convert normalized RGB array to hex color
 * @param rgb - RGB array with values [0, 1]
 * @returns Hex color value (0xRRGGBB)
 */
export function rgb2hex(rgb: number[] | Float32Array): number;

/**
 * Convert CSS hex string to hex color value
 * @param string - CSS color string (with or without '#')
 * @returns Hex color value
 */
export function string2hex(string: string): number;

// ============================================================================
// Premultiplication
// ============================================================================

/**
 * Premultiply RGB values by alpha
 * @param rgb - RGB array [0, 1]
 * @param alpha - Alpha value [0, 1]
 * @param out - Output array (optional)
 * @param premultiply - Whether to actually premultiply (default: true)
 * @returns RGBA array with premultiplied values
 */
export function premultiplyRgba(
    rgb: number[] | Float32Array,
    alpha: number,
    out?: Float32Array,
    premultiply?: boolean
): Float32Array;

/**
 * Premultiply a tint color by alpha
 * @param tint - Tint color (0xRRGGBB)
 * @param alpha - Alpha value [0, 1]
 * @returns Premultiplied color (0xAARRGGBB)
 */
export function premultiplyTint(tint: number, alpha: number): number;

/**
 * Premultiply tint and convert to RGBA array
 * @param tint - Tint color (0xRRGGBB)
 * @param alpha - Alpha value [0, 1]
 * @param out - Output array (optional)
 * @param premultiply - Whether to premultiply RGB by alpha (default: true)
 * @returns RGBA Float32Array
 */
export function premultiplyTintToRgba(
    tint: number,
    alpha: number,
    out?: Float32Array,
    premultiply?: boolean
): Float32Array;

// ============================================================================
// Blend Mode Utilities
// ============================================================================

/**
 * Correct blend mode based on texture premultiplication
 * @param blendMode - Original blend mode
 * @param premultiplied - Whether texture is premultiplied
 * @returns Corrected blend mode
 */
export function correctBlendMode(blendMode: BLEND_MODES, premultiplied: boolean): BLEND_MODES;

// ============================================================================
// Index Generation
// ============================================================================

/**
 * Generate triangle indices for rendering quads
 * Produces indices for two triangles per quad (0-1-2, 0-2-3 pattern)
 * @param quadCount - Number of quads
 * @param outBuffer - Output buffer (optional, creates Uint16Array if not provided)
 * @returns Indices array
 */
export function createIndicesForQuads(quadCount: number, outBuffer?: Uint16Array): Uint16Array;

// ============================================================================
// Typed Array Utilities
// ============================================================================

/**
 * Get the type name of a typed array
 * @param array - Typed array instance
 * @returns Type name or null if not a recognized typed array
 */
export function getBufferType(array: TypedArray): TypedArrayType | null;

/**
 * Interleave multiple typed arrays into a single Float32Array
 * @param arrays - Arrays to interleave
 * @param sizes - Number of elements per vertex for each array
 * @returns Interleaved Float32Array
 * @example
 * // Interleave positions (2 floats) and UVs (2 floats)
 * interleaveTypedArrays([positions, uvs], [2, 2]);
 */
export function interleaveTypedArrays(arrays: TypedArray[], sizes: number[]): Float32Array;

// ============================================================================
// Math Utilities
// ============================================================================

/**
 * Get the sign of a number
 * @param n - Input number
 * @returns -1, 0, or 1
 */
export function sign(n: number): -1 | 0 | 1;

/**
 * Check if a number is a power of two
 * @param value - Number to check
 * @returns True if value is a power of two
 */
export function isPow2(value: number): boolean;

/**
 * Round up to the next power of two
 * @param value - Input value
 * @returns Next power of two
 */
export function nextPow2(value: number): number;

/**
 * Calculate log base 2 of a number (integer approximation)
 * @param value - Input value
 * @returns Floor of log2(value)
 */
export function log2(value: number): number;

// ============================================================================
// Array Utilities
// ============================================================================

/**
 * Remove elements from an array in-place
 * More efficient than splice for multiple elements
 * @param array - Array to modify
 * @param startIndex - Index to start removing from
 * @param removeCount - Number of elements to remove
 */
export function removeItems<T>(array: T[], startIndex: number, removeCount: number): void;

// ============================================================================
// URL & Resource Utilities
// ============================================================================

/**
 * Parse a data URI into its components
 * @param dataUri - Data URI string
 * @returns Parsed components or undefined if invalid
 */
export function decomposeDataUri(dataUri: string): DataUriComponents | undefined;

/**
 * Extract resolution from a URL using RETINA_PREFIX regex
 * @param url - URL to parse
 * @param defaultResolution - Fallback resolution (default: 1)
 * @returns Detected or default resolution
 */
export function getResolutionOfUrl(url: string, defaultResolution?: number): number;

/**
 * Determine appropriate CORS setting for a URL
 * @param url - Resource URL
 * @param location - Location to compare against (default: window.location)
 * @returns CORS string ('anonymous' or '')
 */
export function determineCrossOrigin(url: string, location?: Location): '' | 'anonymous';

// ============================================================================
// Canvas Image Utilities
// ============================================================================

/**
 * Trim transparent pixels from a canvas
 * @param canvas - Canvas to trim
 * @returns Trimmed dimensions and image data
 */
export function trimCanvas(canvas: HTMLCanvasElement): TrimmedCanvasData;

// ============================================================================
// WebGL Detection
// ============================================================================

/**
 * Check if WebGL is supported in the current environment
 * @returns True if WebGL is available with stencil support
 */
export function isWebGLSupported(): boolean;

// ============================================================================
// Unique ID Generation
// ============================================================================

/**
 * Generate a unique incrementing ID
 * @returns Unique integer ID
 */
export function uid(): number;

// ============================================================================
// Logging & Debugging
// ============================================================================

/**
 * Display PixiJS startup banner in console
 * @param rendererType - Renderer type (e.g., 'WebGL', 'Canvas')
 */
export function sayHello(rendererType: string): void;

/**
 * Prevent the PixiJS banner from displaying
 */
export function skipHello(): void;

/**
 * Log a deprecation warning (only once per message)
 * @param version - Version when feature was deprecated
 * @param message - Deprecation message
 * @param stackDepth - Stack trace depth (default: 3)
 */
export function deprecation(version: string, message: string, stackDepth?: number): void;