/**
 * Module: ExportSceneData
 * 
 * This module provides utilities for exporting scene data, managing lights,
 * parsing FGI files, and configuring sunlight parameters.
 * 
 * @module ExportSceneData
 */

/**
 * Main class for exporting scene data
 */
export declare class ExportSceneData {
  // Add specific method signatures based on implementation
}

/**
 * Utility class for general helper functions
 */
export declare namespace Util {
  // Add specific utility function signatures
}

/**
 * Interface representing the parsed FGI file result
 */
export interface IParsedFgiResult {
  // Add specific properties based on FGI file structure
  [key: string]: unknown;
}

/**
 * Parser class for FGI (File Geometry Information) files
 */
export declare class FgiParser {
  /**
   * Parses an FGI file and returns the parsed result
   * @param data - The raw FGI file data
   * @returns Parsed FGI result
   */
  parse(data: string | ArrayBuffer): IParsedFgiResult;
}

/**
 * Calculates automatic sunlight angles based on scene parameters
 * @param latitude - Geographic latitude
 * @param longitude - Geographic longitude
 * @param date - Date and time for sun position calculation
 * @returns Object containing azimuth and elevation angles
 */
export declare function getAutoSunLightAngles(
  latitude: number,
  longitude: number,
  date: Date
): {
  azimuth: number;
  elevation: number;
};

/**
 * Class for exporting light configurations
 */
export declare class ExportLights {
  /**
   * Exports all lights in the scene
   * @returns Serialized light data
   */
  export(): unknown;
}

/**
 * Parameters that can be modified in default sunlight configuration
 */
export interface ChangeableDefaultSunlightParams {
  /** Sunlight intensity (0.0 - 1.0) */
  intensity?: number;
  /** Sunlight color in hex format */
  color?: string;
  /** Azimuth angle in degrees */
  azimuth?: number;
  /** Elevation angle in degrees */
  elevation?: number;
  /** Enable/disable shadows */
  castShadow?: boolean;
}

/**
 * Default options for sunlight configuration
 */
export declare const DefaultSunlightOptions: Readonly<{
  intensity: number;
  color: string;
  azimuth: number;
  elevation: number;
  castShadow: boolean;
}>;

/**
 * Utility class for managing sunlight settings
 */
export declare class SunlightUtil {
  /**
   * Applies sunlight configuration to the scene
   * @param options - Sunlight configuration options
   */
  static apply(options: ChangeableDefaultSunlightParams): void;

  /**
   * Gets current sunlight configuration
   * @returns Current sunlight settings
   */
  static getCurrent(): ChangeableDefaultSunlightParams;

  /**
   * Resets sunlight to default settings
   */
  static reset(): void;
}

/**
 * Configuration namespace for light sets
 */
export declare namespace LightSetConfig {
  // Add specific light set configuration types and functions
}

/**
 * Utility class for intelligent lighting algorithms
 */
export declare class IntelligentLightsUtil {
  /**
   * Automatically generates optimal lighting for a scene
   * @param sceneData - Scene geometry and material data
   * @returns Generated light configuration
   */
  static generateLights(sceneData: unknown): unknown;

  /**
   * Analyzes scene and suggests lighting improvements
   * @param currentLights - Current light setup
   * @returns Lighting optimization suggestions
   */
  static analyzeLighting(currentLights: unknown): unknown;
}