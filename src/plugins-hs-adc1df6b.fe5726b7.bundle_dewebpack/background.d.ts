/**
 * Background module for SVG sketch rendering.
 * Extends the base Background class from HSApp framework.
 * @module Background
 * @originalId 23014
 */

import { HSApp } from './HSApp';

/**
 * Background component for 2D extraordinary sketches.
 * Provides dimension display capabilities for SVG backgrounds.
 * 
 * @class Background
 * @extends {HSApp.View.SVG.ExtraordinarySketch2d.Background}
 */
export declare class Background extends HSApp.View.SVG.ExtraordinarySketch2d.Background {
  /**
   * Creates an instance of Background.
   * @constructor
   */
  constructor();

  /**
   * Determines whether dimensions can be displayed on this background.
   * 
   * @returns {boolean} Always returns true, indicating dimensions are allowed to be shown.
   */
  canShowDimensions(): boolean;
}

/**
 * HSApp namespace declarations
 */
declare namespace HSApp {
  namespace View {
    namespace SVG {
      namespace ExtraordinarySketch2d {
        /**
         * Base Background class from HSApp framework
         */
        class Background {
          constructor(...args: any[]);
        }
      }
    }
  }
}