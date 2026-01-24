/**
 * Extract utility for capturing renderer content as images, canvas, or pixel data.
 * Provides methods to export WebGL rendered content in various formats.
 */

import { RenderTexture } from './RenderTexture';
import { CanvasRenderTarget } from './CanvasRenderTarget';
import { Rectangle } from './Rectangle';

/**
 * Displayable object that can be rendered (Sprite, Container, etc.)
 */
export type DisplayObject = any;

/**
 * Valid image MIME types for export
 */
export type ImageMimeType = 'image/png' | 'image/jpeg' | 'image/webp';

/**
 * Extract class for capturing and exporting renderer content.
 * Attached to the renderer as `renderer.extract`.
 */
export class Extract {
  /**
   * Reference to the parent WebGL renderer
   */
  renderer: WebGLRenderer;

  /**
   * Creates an Extract instance and attaches it to the renderer.
   * @param renderer - The WebGL renderer instance
   */
  constructor(renderer: WebGLRenderer);

  /**
   * Extracts an HTML Image element from the target.
   * @param target - The DisplayObject or RenderTexture to extract from. If null, extracts the entire renderer.
   * @param format - The image format (MIME type). Defaults to 'image/png'.
   * @param quality - The quality for lossy formats (0-1). Relevant for JPEG/WEBP.
   * @returns An HTML Image element containing the extracted content
   */
  image(
    target?: DisplayObject | RenderTexture | null,
    format?: ImageMimeType,
    quality?: number
  ): HTMLImageElement;

  /**
   * Extracts a base64 encoded data URL from the target.
   * @param target - The DisplayObject or RenderTexture to extract from. If null, extracts the entire renderer.
   * @param format - The image format (MIME type). Defaults to 'image/png'.
   * @param quality - The quality for lossy formats (0-1). Relevant for JPEG/WEBP.
   * @returns A base64 encoded data URL string
   */
  base64(
    target?: DisplayObject | RenderTexture | null,
    format?: ImageMimeType,
    quality?: number
  ): string;

  /**
   * Extracts an HTML Canvas element from the target.
   * @param target - The DisplayObject or RenderTexture to extract from. If null, extracts the entire renderer.
   * @returns An HTML Canvas element containing the extracted content
   */
  canvas(target?: DisplayObject | RenderTexture | null): HTMLCanvasElement;

  /**
   * Extracts raw pixel data as a Uint8Array (RGBA format).
   * @param target - The DisplayObject or RenderTexture to extract from. If null, extracts the entire renderer.
   * @returns A Uint8Array containing RGBA pixel data (4 bytes per pixel)
   */
  pixels(target?: DisplayObject | RenderTexture | null): Uint8Array;

  /**
   * Cleans up resources and detaches from the renderer.
   */
  destroy(): void;

  /**
   * Post-processes pixel data to divide RGB values by alpha (un-premultiply alpha).
   * Converts premultiplied alpha format to straight alpha format.
   * @param sourcePixels - Source pixel array (RGBA format)
   * @param destinationPixels - Destination pixel array to write processed data
   */
  static arrayPostDivide(
    sourcePixels: Uint8Array,
    destinationPixels: Uint8Array
  ): void;
}

/**
 * WebGL renderer interface (minimal definition for Extract usage)
 */
interface WebGLRenderer {
  resolution: number;
  width: number;
  height: number;
  gl: WebGLRenderingContext;
  extract: Extract | null;
  renderTexture: {
    bind(renderTexture: RenderTexture | null): void;
  };
  generateTexture(target: DisplayObject): RenderTexture;
}