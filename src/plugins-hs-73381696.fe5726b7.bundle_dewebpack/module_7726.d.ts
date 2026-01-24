/**
 * LightMix Plugin for WebT3D Post Processing
 * Provides advanced lighting and color grading capabilities for 3D rendering
 */

import { HSApp } from './core';
import { IPlugin } from './plugin';
import { PostProcessing } from './postprocessing';

/**
 * Plugin metadata interface
 */
interface PluginMetadata {
  /** Display name of the plugin */
  name: string;
  /** Detailed description of plugin functionality */
  description: string;
  /** List of required plugin dependencies */
  dependencies: string[];
}

/**
 * Light texture loading options
 */
interface LightTextureOptions {
  /** Texture image source or URL */
  source: string | HTMLImageElement;
  /** Texture filtering mode */
  filtering?: 'linear' | 'nearest';
  /** Texture wrapping mode */
  wrapping?: 'repeat' | 'clamp';
}

/**
 * LightMix Plugin class
 * Extends base plugin to provide post-processing effects including:
 * - Light texture mixing
 * - Exposure control
 * - Color temperature adjustment
 * - Highlight burn effects
 * - Filmic color grading
 */
export declare class LightMixPlugin extends IPlugin {
  /**
   * Internal post-processing engine instance
   * @private
   */
  private readonly _postprocessing: PostProcessing;

  /**
   * Creates a new LightMix plugin instance
   * Initializes with default metadata and post-processing engine
   */
  constructor();

  /**
   * Lifecycle hook called when plugin becomes active
   * @param context - Plugin activation context
   * @param options - Activation configuration options
   */
  onActive(context: unknown, options: unknown): void;

  /**
   * Starts the post-processing pipeline
   * @param scene - 3D scene to process
   * @param camera - Active camera for rendering
   * @param renderer - WebGL renderer instance
   */
  start(scene: unknown, camera: unknown, renderer: unknown): void;

  /**
   * Cleans up and terminates post-processing
   * Releases GPU resources and disposes buffers
   */
  finish(): void;

  /**
   * Updates post-processing effects per frame
   * @param deltaTime - Time elapsed since last frame in seconds
   */
  update(deltaTime: number): void;

  /**
   * Handles viewport resize events
   * Recreates render targets to match new dimensions
   * @param width - New viewport width in pixels
   * @param height - New viewport height in pixels
   */
  resize(width: number, height: number): void;

  /**
   * Loads and applies a light texture for mixing
   * @param textureId - Unique identifier for the texture slot
   * @param source - Texture source (URL, Image, or data)
   * @param options - Texture sampling and wrapping options
   * @param callback - Completion callback with loaded texture
   * @returns Promise resolving to loaded texture instance
   */
  loadLightTexture(
    textureId: string,
    source: string | HTMLImageElement,
    options?: LightTextureOptions,
    callback?: (texture: unknown) => void
  ): Promise<unknown>;

  /**
   * Sets exposure value for a specific light layer
   * @param lightId - Target light layer identifier
   * @param exposure - Exposure value (0 = dark, 1 = normal, >1 = overexposed)
   */
  setLightExposure(lightId: string, exposure: number): void;

  /**
   * Sets the original color temperature for light conversion
   * @param lightId - Target light layer identifier
   * @param temperature - Color temperature in Kelvin (e.g., 6500K for daylight)
   */
  setLightOriginColorTemperature(lightId: string, temperature: number): void;

  /**
   * Sets the target color temperature for light conversion
   * @param lightId - Target light layer identifier
   * @param temperature - Desired color temperature in Kelvin
   */
  setLightTargetColorTemperature(lightId: string, temperature: number): void;

  /**
   * Controls highlight burn/bloom intensity
   * @param intensity - Burn intensity (0 = no effect, 1 = maximum bloom)
   */
  setHighlightBurnIntensity(intensity: number): void;

  /**
   * Loads base color lookup texture for color grading
   * @param source - LUT texture source (URL or Image)
   * @returns Promise resolving to loaded LUT texture
   */
  loadBaseColorTexture(source: string | HTMLImageElement): Promise<unknown>;

  /**
   * Loads filmic tone mapping curve texture
   * @param source - Filmic curve texture source
   * @returns Promise resolving to loaded curve texture
   */
  loadFilmicTexture(source: string | HTMLImageElement): Promise<unknown>;

  /**
   * Loads custom color curve adjustment texture
   * @param source - Color curve texture source
   * @returns Promise resolving to loaded curve texture
   */
  loadColorCurveTexture(source: string | HTMLImageElement): Promise<unknown>;

  /**
   * Sets custom variable name for shader configuration
   * @param name - Variable name to bind in shader uniforms
   */
  setCVarName(name: string): void;
}

/**
 * Plugin type enumeration
 */
declare namespace HSFPConstants {
  enum PluginType {
    LightMix = 'LightMix'
  }
}

/**
 * Global plugin registration
 * Registers LightMixPlugin with the HSApp plugin system
 */
declare module './plugin-registry' {
  interface PluginRegistry {
    [HSFPConstants.PluginType.LightMix]: typeof LightMixPlugin;
  }
}