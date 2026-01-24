/**
 * Light set library for managing predefined lighting configurations
 * @module LightSetLibrary
 */

import { LightTypeEnum } from './LightTypeEnum';

/**
 * Represents a light set configuration entry
 */
export interface LightSetData {
  /** Unique identifier for the light set */
  key: string;
  /** Display label for the light set */
  label: string;
}

/**
 * Library for managing and storing light set configurations.
 * Provides methods to add, retrieve, and delete light sets.
 */
export declare class LightSetLibrary {
  /**
   * Internal storage for light set data
   * @private
   */
  private static _lightData: Map<string, LightSetData>;

  /**
   * Loads default light sets including spot lights and fill lights
   * from HSConstants.RenderLight and all light types from LightTypeEnum
   */
  static loadDefault(): void;

  /**
   * Retrieves all light set data
   * @returns Map containing all registered light sets
   */
  static getLightSetData(): Map<string, LightSetData>;

  /**
   * Gets a specific light set by its key
   * @param key - The unique identifier of the light set
   * @returns The light set data if found, undefined otherwise
   */
  static get(key: string): LightSetData | undefined;

  /**
   * Adds a new light set to the library
   * @param data - The light set configuration to add
   */
  static add(data: LightSetData): void;

  /**
   * Removes a light set from the library
   * @param key - The unique identifier of the light set to remove
   */
  static delete(key: string): void;
}

/**
 * Global constants for rendering lights
 * @external HSConstants
 */
declare namespace HSConstants {
  namespace RenderLight {
    const SPOT_LIGHT_NUM_1: string;
    const SPOT_LIGHT_NUM_2: string;
    const SPOT_LIGHT_NUM_3: string;
    const SPOT_LIGHT_NUM_4: string;
    const SPOT_LIGHT_NUM_5: string;
    const SPOT_LIGHT_NUM_6: string;
    const SPOT_LIGHT_NUM_7: string;
    const SPOT_LIGHT_NUM_8: string;
    const SPOT_LIGHT_NUM_9: string;
    const SPOT_LIGHT_NUM_10: string;
    const SPOT_LIGHT_NUM_11: string;
    const SPOT_LIGHT_NUM_12: string;
    const SPOT_LIGHT_NUM_13: string;
    const SPOT_LIGHT_NUM_14: string;
    const SPOT_LIGHT_NUM_15: string;
    const FILL_LIGHT_NUM_1: string;
    const FILL_LIGHT_NUM_2: string;
    const FILL_LIGHT_NUM_3: string;
    const FILL_LIGHT_NUM_4: string;
    const FILL_LIGHT_NUM_5: string;
    const FILL_LIGHT_NUM_6: string;
    const FILL_LIGHT_NUM_7: string;
  }
}