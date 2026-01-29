/**
 * Parameters for sunlight/lighting configuration
 * @module Params
 */

/**
 * Configuration parameters for scene lighting and sunlight
 */
export declare class Params {
  /**
   * Enable or disable sunlight in the scene
   * @default true
   */
  sunlight: boolean;

  /**
   * Automatically position the light source
   * @default true
   */
  autoPosition: boolean;

  /**
   * Color temperature of the light in Kelvin
   * @default 6500
   */
  temperature: number;

  /**
   * Base intensity of the light
   * @default 0.04
   */
  intensity: number;

  /**
   * Multiplier applied to the intensity value
   * @default 1
   */
  intensityFactor: number;

  /**
   * Base size multiplier for the light source
   * @default 6
   */
  sizeMultiplier: number;

  /**
   * Multiplier applied to the size value
   * @default 1
   */
  sizeMultiplierFactor: number;

  /**
   * Enable volumetric lighting effects
   * @default false
   */
  volumeLight: boolean;

  /**
   * Vertical angle of the light in radians
   * @default 0.6109 (approximately 35 degrees)
   */
  heightAngle: number;

  /**
   * Horizontal angle of the light in radians
   * @default 0.5236 (approximately 30 degrees)
   */
  horizontalAngle: number;

  constructor();
}