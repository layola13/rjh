/**
 * DrawFilletGizmo Module
 * 
 * Provides a TypeScript declaration for the DrawFilletGizmo class,
 * which extends the Fillet gizmo from the HSApp ExtraordinarySketch2d framework.
 * 
 * @module DrawFilletGizmo
 */

declare namespace HSApp {
  namespace ExtraordinarySketch2d {
    namespace Gizmo {
      /**
       * Base class for Fillet gizmo operations in 2D sketching
       */
      class Fillet {
        constructor(...args: unknown[]);
      }
    }
  }
}

/**
 * DrawFilletGizmo class
 * 
 * A specialized gizmo component for drawing fillet operations in 2D sketches.
 * Extends the base Fillet gizmo to provide interactive fillet drawing capabilities.
 * 
 * @class DrawFilletGizmo
 * @extends {HSApp.ExtraordinarySketch2d.Gizmo.Fillet}
 * 
 * @example
 *