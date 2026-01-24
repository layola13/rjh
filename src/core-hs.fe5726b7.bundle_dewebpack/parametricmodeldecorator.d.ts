/**
 * Module: ParametricModelDecorator
 * 
 * This module provides a collection of decorator classes for parametric modeling,
 * including graphics faces, ceilings, walls, and openings.
 * 
 * @module ParametricModelDecorator
 */

/**
 * Interface for customized graphics face.
 * Defines the contract for rendering and managing graphical faces in the parametric model.
 */
export interface INCustomizedGraphicsFace {
  // Add specific interface members based on IGraphicsFace implementation
}

/**
 * Base decorator class for parametric models.
 * Provides core functionality for decorating and extending parametric model behavior.
 */
export declare class ParametricModelDecorator {
  /**
   * Creates an instance of ParametricModelDecorator.
   */
  constructor();
  
  // Add specific method signatures based on implementation
}

/**
 * Decorator for NCP (Non-Standard Component Parametric) background wall base.
 * Handles the decoration and rendering logic for background wall base elements.
 */
export declare class NCPBackgroundWallBaseDecorator {
  /**
   * Creates an instance of NCPBackgroundWallBaseDecorator.
   */
  constructor();
  
  // Add specific method signatures based on implementation
}

/**
 * Decorator for opening elements in parametric models.
 * Manages doors, windows, and other opening-type components.
 */
export declare class OpeningDecorator {
  /**
   * Creates an instance of OpeningDecorator.
   */
  constructor();
  
  // Add specific method signatures based on implementation
}

/**
 * Parametric Opening Decorator.
 * Specialized decorator for parametric opening components with advanced customization.
 * 
 * @alias PODecorator
 */
export declare class PODecorator {
  /**
   * Creates an instance of PODecorator (ParametricOpeningDecorator).
   */
  constructor();
  
  // Add specific method signatures based on implementation
}

/**
 * Decorator for NCP (Non-Standard Component Parametric) ceiling elements.
 * Provides specialized handling for ceiling components in the parametric model.
 */
export declare class NCPCeilingDecorator {
  /**
   * Creates an instance of NCPCeilingDecorator.
   */
  constructor();
  
  // Add specific method signatures based on implementation
}

/**
 * Re-exported types and classes from this module.
 */
export {
  ParametricModelDecorator,
  NCPBackgroundWallBaseDecorator,
  OpeningDecorator,
  PODecorator,
  INCustomizedGraphicsFace,
  NCPCeilingDecorator
};