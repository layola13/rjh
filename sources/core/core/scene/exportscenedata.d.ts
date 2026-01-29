/**
 * Scene data export module
 * Provides utilities for exporting scene data, lighting configuration, and FGI parsing
 */

// ============================================================================
// Core Scene Export
// ============================================================================

/**
 * Main class for exporting scene data
 * @see module 86587
 */
export { ExportSceneData } from './ExportSceneData';

// ============================================================================
// FGI Parser
// ============================================================================

/**
 * Result interface for parsed FGI data
 */
export interface IParsedFgiResult {
  // Define properties based on actual FGI structure
  [key: string]: unknown;
}

/**
 * Parser utility for FGI (Format Graphics Interchange) files
 * @see module 4464
 */
export class FgiParser {
  /**
   * Parse FGI data
   * @param data - Raw FGI data to parse
   * @returns Parsed FGI result
   */
  parse(data: unknown): IParsedFgiResult;
}

// ============================================================================
// Sunlight Utilities
// ============================================================================

/**
 * Parameters that can be changed in default sunlight configuration
 */
export interface ChangeableDefaultSunlightParams {
  intensity?: number;
  color?: string | number;
  azimuth?: number;
  altitude?: number;
  [key: string]: unknown;
}

/**
 * Default options for sunlight configuration
 */
export interface DefaultSunlightOptions {
  intensity: number;
  color: string | number;
  azimuth: number;
  altitude: number;
  castShadow: boolean;
  [key: string]: unknown;
}

/**
 * Utility class for sunlight operations
 * @see module 95810
 */
export class SunlightUtil {
  /**
   * Get default sunlight options
   * @returns Default sunlight configuration
   */
  static getDefaultOptions(): DefaultSunlightOptions;

  /**
   * Apply changeable parameters to sunlight
   * @param params - Parameters to change
   * @returns Updated sunlight configuration
   */
  static applyParams(params: ChangeableDefaultSunlightParams): DefaultSunlightOptions;
}

/**
 * Calculate automatic sunlight angles based on scene parameters
 * @param sceneData - Scene data to analyze
 * @returns Object containing azimuth and altitude angles
 * @see module 43988
 */
export function getAutoSunLightAngles(sceneData: unknown): {
  azimuth: number;
  altitude: number;
};

// ============================================================================
// Light Export
// ============================================================================

/**
 * Utility class for exporting light configurations
 * @see module 86918
 */
export class ExportLights {
  /**
   * Export lights from scene
   * @param scene - Scene containing lights
   * @returns Serialized light data
   */
  export(scene: unknown): unknown;

  /**
   * Import lights into scene
   * @param data - Serialized light data
   * @param scene - Target scene
   */
  import(data: unknown, scene: unknown): void;
}

// ============================================================================
// Light Configuration
// ============================================================================

/**
 * Configuration settings for light sets
 * @see module 38222
 */
export namespace LightSetConfig {
  /**
   * Ambient light configuration
   */
  export interface AmbientConfig {
    intensity: number;
    color: string | number;
  }

  /**
   * Directional light configuration
   */
  export interface DirectionalConfig {
    intensity: number;
    color: string | number;
    position: [number, number, number];
    target: [number, number, number];
    castShadow: boolean;
  }

  /**
   * Point light configuration
   */
  export interface PointConfig {
    intensity: number;
    color: string | number;
    position: [number, number, number];
    distance: number;
    decay: number;
  }

  /**
   * Complete light set configuration
   */
  export interface Config {
    ambient?: AmbientConfig;
    directional?: DirectionalConfig[];
    point?: PointConfig[];
    [key: string]: unknown;
  }
}

// ============================================================================
// Intelligent Lighting
// ============================================================================

/**
 * Utility for intelligent automatic lighting setup
 * Analyzes scene geometry and automatically configures optimal lighting
 * @see module 95223
 */
export class IntelligentLightsUtil {
  /**
   * Analyze scene and generate intelligent lighting configuration
   * @param scene - Scene to analyze
   * @param options - Optional configuration parameters
   * @returns Generated lighting configuration
   */
  static generateLights(scene: unknown, options?: Partial<LightSetConfig.Config>): LightSetConfig.Config;

  /**
   * Apply intelligent lighting to scene
   * @param scene - Target scene
   * @param config - Lighting configuration to apply
   */
  static applyLights(scene: unknown, config: LightSetConfig.Config): void;
}

// ============================================================================
// General Utilities
// ============================================================================

/**
 * General utility functions for scene operations
 * @see module 65406
 */
export namespace Util {
  /**
   * Clone an object deeply
   * @param obj - Object to clone
   * @returns Deep cloned object
   */
  export function deepClone<T>(obj: T): T;

  /**
   * Merge objects deeply
   * @param target - Target object
   * @param sources - Source objects to merge
   * @returns Merged object
   */
  export function deepMerge<T>(target: T, ...sources: Partial<T>[]): T;

  /**
   * Validate scene data structure
   * @param data - Data to validate
   * @returns True if valid
   */
  export function validateSceneData(data: unknown): boolean;
}