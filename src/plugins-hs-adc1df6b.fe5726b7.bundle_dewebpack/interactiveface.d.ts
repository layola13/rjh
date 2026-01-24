/**
 * Interactive face model for 2D sketch editing
 * @module InteractiveFace
 */

import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

declare namespace InteractiveFace {
  /**
   * Interactive face class that extends InteractiveModel
   * Handles user interactions with face elements in 2D sketches
   */
  export class InteractiveFace extends HSApp.ExtraordinarySketch2d.InteractiveModel {
    /**
     * Creates an instance of InteractiveFace
     */
    constructor();

    /**
     * Builder instance containing sketchable elements
     */
    builder: {
      /**
       * The current sketchable element being edited
       */
      sketchable: unknown;
    };

    /**
     * Determines whether the face can be edited
     * Checks parent class editability and validates that roof drawing regions
     * without a roof cannot be edited
     * 
     * @returns {boolean} True if the face can be edited, false otherwise
     */
    canEdit(): boolean;
  }
}

/**
 * Export the InteractiveFace class
 */
export = InteractiveFace;
export as namespace InteractiveFace;