/**
 * Elevatable Mixin
 * 
 * Provides elevation (shadow depth) functionality to Vue components.
 * Adds computed properties to generate elevation classes based on the elevation prop.
 * 
 * @module Elevatable
 */

import { Vue } from 'vue';

/**
 * Elevation prop type
 */
export type ElevationValue = number | string;

/**
 * Elevation classes map
 */
export interface ElevationClasses {
  [key: string]: boolean;
}

/**
 * Elevatable mixin interface
 */
export interface Elevatable {
  /** The elevation level (shadow depth) of the component */
  elevation?: ElevationValue;
  
  /** Computed elevation value */
  readonly computedElevation: ElevationValue | undefined;
  
  /** CSS classes for elevation styling */
  readonly elevationClasses: ElevationClasses;
}

/**
 * Vue mixin that adds elevation (Material Design shadow depth) support
 * 
 * @example
 *