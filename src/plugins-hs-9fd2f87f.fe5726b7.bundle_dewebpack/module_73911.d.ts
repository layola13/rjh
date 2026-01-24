/**
 * SVG/PNG export handler module
 * Handles design export functionality including floor plans, materials, and paint rendering
 */

import type { App } from './app-types';
import type { SvgBuilder, SvgMinimapBuilder, SvgRawBuilder } from './svg-builder-types';
import type { HSCatalog, HSPaveSDK } from './catalog-types';

/**
 * Export configuration options
 */
interface ExportOptions {
  /** Include paint/material rendering */
  withPaint?: boolean;
  /** Export without furniture content */
  isNoContent?: boolean;
  /** Output format: 'svg' | 'png' | 'jpg' */
  output?: 'svg' | 'png' | 'jpg';
  /** Template configuration for rendering */
  template?: unknown;
  /** Generate 2D thumbnail instead of full export */
  thumbnail2D?: boolean;
}

/**
 * Material texture information
 */
interface MaterialTexture {
  /** Texture URL or URI */
  textureUrl?: string;
  textureURI?: string;
  /** Product ID in catalog */
  seekId?: string;
  /** Color mode: color, blend, or texture */
  colorMode?: ColorMode;
  /** Solid color value */
  color?: string;
  /** Blend color value */
  blendColor?: string;
  /** Scale factors for texture */
  scaleX?: number;
  scaleY?: number;
}

/**
 * Tile/stone material information for export
 */
interface TileStoneData {
  /** Product catalog ID */
  seekId: string;
  /** Material name */
  name: string;
  /** Tile dimensions */
  size: { x: number; y: number };
  /** Texture image URL */
  imageUrl?: string;
  /** Color value if applicable */
  color?: string;
  /** Quantity count */
  count: number;
  /** Unit of measurement */
  unit: string;
}

/**
 * Export result from server
 */
interface ExportResult {
  /** Export success flag */
  ret: string[];
  /** Exported data/URL */
  data?: {
    /** Image URL or data */
    value?: string;
    /** Error message if failed */
    erMessage?: string;
  };
}

/**
 * User tracking log data
 */
interface TrackingLog {
  /** Operation description */
  description: string;
  /** Log group category */
  group: string;
  /** Operation type */
  type: string;
  /** Whether paint rendering is enabled */
  withPaint?: boolean;
  /** Whether furniture is included */
  hasFurniture?: boolean;
  /** Whether operation completed successfully */
  validOperation: boolean;
}

/**
 * Export handler class for SVG/PNG/DWG generation
 */
export default class ExportHandler {
  private _app?: App;

  /**
   * Initialize handler with app instance
   */
  init(context: { app: App }): void;

  /**
   * Cleanup and uninitialize handler
   */
  uninit(): void;

  /**
   * Execute local SVG export with full rendering
   */
  executeLocal(options: ExportOptions): Promise<void>;

  /**
   * Execute local SVG export with minimap rendering
   */
  executeLocalMobile(options: ExportOptions): Promise<void>;

  /**
   * Execute local SVG export with raw rendering (no styling)
   */
  executeLocalRaw(options: ExportOptions): Promise<void>;

  /**
   * Internal method to execute local export with specified builder
   * @param options - Export configuration
   * @param builderClass - SVG builder class to use
   */
  private _executeLocal(
    options: ExportOptions,
    builderClass: typeof SvgBuilder | typeof SvgMinimapBuilder | typeof SvgRawBuilder
  ): Promise<void>;

  /**
   * Capture and export paving/tiling render
   * @param options - Export configuration
   * @param targetWidth - Target output width in pixels
   */
  executePaveCapture(options: ExportOptions, targetWidth: number): Promise<string>;

  /**
   * Get materials table from floor plan
   * @returns Array of material texture URLs
   */
  private _getMaterialsTable(): string[];

  /**
   * Extract material textures and add to tile/stone data
   * @param materials - Array of material configurations
   * @param urlCollection - Collection to store texture URLs
   */
  private _getMaterials(materials: MaterialTexture[], urlCollection: string[]): void;

  /**
   * Extract seam textures and add to tile/stone data
   * @param seams - Array of seam configurations
   * @param urlCollection - Collection to store texture URLs
   */
  private _getSeams(seams: MaterialTexture[], urlCollection: string[]): void;

  /**
   * Download image from data URL and save to file
   * @param dataUrl - Base64 encoded image data URL
   * @param format - Output format (png, jpg, etc.)
   */
  private _downloadAndSave(dataUrl: string, format: string): void;

  /**
   * Save blob data to local file with download dialog
   * @param blob - File blob data
   * @param extension - File extension
   */
  private _saveToLocalFile(blob: Blob, extension: string): void;

  /**
   * Execute export without watching progress (fire-and-forget)
   */
  executeNoWatch(options: ExportOptions): Promise<string>;

  /**
   * Export design to server and get result URL
   * @param options - Export configuration
   * @returns Promise resolving to export result
   */
  export(options: ExportOptions): Promise<ExportResult>;

  /**
   * Execute full export with progress tracking and user feedback
   * @param options - Export configuration
   */
  execute(options: ExportOptions): Promise<void>;
}