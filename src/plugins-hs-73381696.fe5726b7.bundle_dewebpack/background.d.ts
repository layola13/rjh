/**
 * Background module for HSApp View SVG ExtraordinarySketch2d
 * 
 * This module provides an extended Background class with dimension display capabilities.
 * 
 * @module Background
 * @originalId 303019
 */

import { HSApp } from './hsapp-types';

/**
 * Extended Background class for ExtraordinarySketch2d views
 * 
 * Extends the base Background class to provide additional functionality
 * for displaying dimensions in 2D sketch views.
 * 
 * @extends HSApp.View.SVG.ExtraordinarySketch2d.Background
 */
export declare class Background extends HSApp.View.SVG.ExtraordinarySketch2d.Background {
  /**
   * Creates a new Background instance
   * 
   * @constructor
   * @param args - Constructor arguments passed to the parent class
   */
  constructor(...args: any[]);

  /**
   * Determines whether dimensions can be displayed in this background
   * 
   * This method always returns true, indicating that dimension display
   * is supported for this background type.
   * 
   * @returns Always returns true to enable dimension display
   */
  canShowDimensions(): boolean;
}

/**
 * Type definitions for HSApp namespace
 * Define these in a separate file (hsapp-types.d.ts) or include them here
 */
declare namespace HSApp {
  namespace View {
    namespace SVG {
      namespace ExtraordinarySketch2d {
        /**
         * Base Background class for ExtraordinarySketch2d views
         */
        class Background {
          constructor(...args: any[]);
        }
      }
    }
  }
}

export {};