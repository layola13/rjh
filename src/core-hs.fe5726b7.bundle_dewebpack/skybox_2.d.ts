/**
 * Skybox module - Manages 3D scene skybox/background rendering
 * Supports multiple skybox types: default, builtin, custom textures, and solid colors
 */

import type { Entity, Entity_IO } from './Entity';
import type { Signal } from './Signal';
import type { Vec2 } from './Math';

/**
 * Skybox type enumeration
 * Defines the source/method of skybox rendering
 */
export enum SkyboxTypeEnum {
  /** Default engine skybox */
  Default = "default",
  /** Built-in preset skybox */
  Builtin = "builtin",
  /** Custom user-provided texture */
  Custom = "custom",
  /** Solid color background */
  Color = "color"
}

/**
 * Custom skybox texture fill mode
 * Controls how textures are sampled at boundaries
 */
export enum CustomSkyboxFillMode {
  /** Clamp texture coordinates to [0,1] range */
  Clamp = 0,
  /** Repeat texture when coordinates exceed [0,1] */
  Repeat = 1
}

/**
 * Skybox texture mapping type
 * Defines the projection method for skybox textures
 */
export enum SkyboxMappingType {
  /** Equirectangular projection (360° panoramic) */
  ERP = 0,
  /** Custom box mapping (6-sided cubemap) */
  CustomBox = 1
}

/**
 * Serialization/deserialization handler for Skybox entities
 * Handles conversion between runtime objects and serialized data
 */
export declare class Skybox_IO extends Entity_IO {
  /**
   * Serialize a Skybox instance to JSON-compatible format
   * @param entity - Skybox entity to serialize
   * @param callback - Optional post-processing callback
   * @param includeMetadata - Whether to include metadata fields
   * @param options - Additional serialization options
   * @returns Serialized skybox data array
   */
  dump(
    entity: Skybox,
    callback?: (data: any[], entity: Skybox) => void,
    includeMetadata?: boolean,
    options?: Record<string, any>
  ): any[];

  /**
   * Deserialize JSON data into a Skybox instance
   * @param entity - Target Skybox entity to populate
   * @param data - Serialized skybox data
   * @param context - Deserialization context object
   */
  load(entity: Skybox, data: any, context: any): void;
}

/**
 * Configuration options for Skybox.set() method
 */
export interface SkyboxSetOptions {
  /** Skybox type */
  type?: SkyboxTypeEnum;
  /** Texture URL for custom skyboxes */
  url?: string;
  /** Skybox identifier name */
  name?: string;
  /** Y-axis rotation in degrees */
  rotation?: number;
  /** Brightness intensity multiplier */
  intensity?: number;
  /** Texture mapping projection type */
  mappingType?: SkyboxMappingType;
  /** Background color as RGB integer (0xRRGGBB) */
  bgColor?: number;
  /** UV scale factor */
  uvScale?: number;
  /** Texture fill mode for custom skyboxes */
  fillMode?: CustomSkyboxFillMode;
  /** Source image width in pixels */
  imageWidth?: number;
  /** Source image height in pixels */
  imageHeight?: number;
  /** Local Y-axis offset */
  localOffsetY?: number;
  /** Display label for custom skyboxes */
  label?: string;
  /** Texture resolution for sampling */
  texelSize?: number;
  /** Whether skybox is active */
  enabled?: boolean;
  /** Whether to show reference grid */
  gridEnable?: boolean;
}

/**
 * Render parameters generated for the rendering engine
 */
export interface SkyboxRenderParameters {
  /** Skybox type */
  type: SkyboxTypeEnum;
  /** Skybox resource name */
  name: string;
  /** Brightness intensity */
  intensity: number;
  /** Y-axis rotation in degrees */
  rotationY: number;
  /** Background color as RGB array [R, G, B] (0-255) */
  bgColor?: number[];
  /** Mapping projection type */
  mappingType?: SkyboxMappingType;
  /** Display label */
  label?: string;
  /** UV scale factor */
  uvScale?: number;
  /** Local Y offset */
  localOffsetY?: number;
  /** Fill mode */
  fillMode?: CustomSkyboxFillMode;
  /** Texel size */
  texelSize?: number;
  /** Computed UV scale X */
  uvScaleX?: number;
  /** Computed UV scale Y */
  uvScaleY?: number;
  /** Computed UV offset X */
  uvOffsetX?: number;
  /** Computed UV offset Y */
  uvOffsetY?: number;
}

/**
 * Skybox entity - Manages 3D scene background/environment
 * Supports default, builtin, custom texture, and solid color skyboxes
 */
export declare class Skybox extends Entity {
  /** Whether the skybox is currently enabled/visible */
  enabled: boolean;
  
  /** Skybox type (default/builtin/custom/color) */
  type: SkyboxTypeEnum;
  
  /** Texture mapping projection type */
  mappingType: SkyboxMappingType;
  
  /** Skybox resource identifier */
  name: string;
  
  /** Display label for custom skyboxes */
  label: string;
  
  /** Texture URL for custom skyboxes */
  url: string;
  
  /** Y-axis rotation angle in degrees */
  rotation: number;
  
  /** Brightness intensity multiplier (typically 0-2) */
  intensity: number;
  
  /** Background color as RGB integer (0xRRGGBB format) */
  bgColor: number;
  
  /** Source image width in pixels */
  imageWidth: number;
  
  /** Source image height in pixels */
  imageHeight: number;
  
  /** UV coordinate scale factor */
  uvScale: number;
  
  /** Local Y-axis offset for texture positioning */
  localOffsetY: number;
  
  /** Texture sampling resolution (power of 2) */
  texelSize: number;
  
  /** Texture fill mode (clamp or repeat) */
  fillMode: CustomSkyboxFillMode;
  
  /** Whether to display reference grid */
  gridEnable: boolean;
  
  /** Tracks if skybox has been configured */
  initialSet: boolean;
  
  /** Signal dispatched when enabled state changes */
  signalEnabledChanged: Signal<Skybox>;

  /**
   * Create a new Skybox instance
   * @param id - Optional entity identifier
   * @param parent - Optional parent entity
   */
  constructor(id?: string, parent?: any);

  /**
   * Factory method to create a new Skybox
   * @returns New Skybox instance
   */
  static create(): Skybox;

  /**
   * Clean up resources and destroy the skybox
   */
  destroy(): void;

  /**
   * Reset all skybox properties to default values
   */
  reset(): void;

  /**
   * Batch update multiple skybox properties
   * @param options - Configuration object with properties to update
   */
  set(options: SkyboxSetOptions): void;

  /**
   * Set the enabled state of the skybox
   * @param enabled - Whether skybox should be visible
   */
  setEnabled(enabled: boolean): void;

  /**
   * Set the source image dimensions
   * @param width - Image width in pixels
   * @param height - Image height in pixels
   */
  setImageSize(width: number, height: number): void;

  /**
   * Calculate UV scale factors based on image size and texel size
   * @returns 2D vector with X and Y scale factors
   */
  getUVScale(): Vec2;

  /**
   * Calculate UV offset for texture positioning
   * @returns 2D vector with X and Y offset values
   */
  getUVOffset(): Vec2;

  /**
   * Get the serialization handler for this entity type
   * @returns Skybox_IO instance
   */
  getIO(): Skybox_IO;

  /**
   * Validate skybox configuration
   * @returns True if configuration is valid
   */
  verify(): boolean;

  /**
   * Convert RGB integer color to array of [R, G, B] values (0-255)
   * @param rgbColor - Color as 0xRRGGBB integer
   * @returns Array of [red, green, blue] values
   */
  static getSkyboxColor3FromRGB255(rgbColor: number): number[];

  /**
   * Generate render parameters for the rendering engine
   * @param useBlackDefault - Whether to use black default skybox
   * @returns Configuration object for renderer
   */
  getRenderParameters(useBlackDefault?: boolean): SkyboxRenderParameters;
}