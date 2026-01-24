/**
 * Module: ViewController
 * Manages 3D view interactions and gizmo manipulation in the HSApp application
 */

import type { HSApp } from './518193';
import type { Gizmo3D } from './864193';

/**
 * Represents geometric loop information with curves
 */
interface LoopInfo {
  /** The loop structure containing curve data */
  loop: {
    /** Nested loop containing geometric curves */
    loop: {
      /** Retrieves all curves in the loop */
      getAllCurves(): Curve[];
    };
  };
}

/**
 * Represents a geometric curve in 3D space
 */
interface Curve {
  /**
   * Checks if this curve is geometrically equal to another curve
   * @param other - The curve to compare against
   * @returns True if curves are equal, false otherwise
   */
  equals(other: Curve): boolean;
}

/**
 * Represents a geometric loop that can be transformed
 */
interface GeometricLoop {
  /**
   * Creates a copy of the loop
   * @returns A cloned instance of the loop
   */
  clone(): this;
  
  /**
   * Scales the loop by a given factor
   * @param factor - The scaling factor to apply
   * @returns The scaled loop instance
   */
  scale(factor: number): this;
  
  /**
   * Retrieves all curves contained in this loop
   * @returns Array of curves
   */
  getAllCurves(): Curve[];
}

/**
 * Parameters for a roof entity
 */
interface RoofParameters {
  /** The geometric loop defining the room boundary */
  roomLoop?: GeometricLoop;
}

/**
 * Represents a roof entity with geometric properties
 */
interface RoofEntity {
  /** Configuration parameters for the roof */
  parameters: RoofParameters;
  
  /**
   * Gets the unique parent level layer
   * @returns The parent layer identifier or null
   */
  getUniqueParent(): unknown | null;
}

/**
 * Configuration data for creating a gizmo
 */
interface GizmoConfig {
  // Add specific properties based on actual implementation
  [key: string]: unknown;
}

/**
 * 3D rendering context for the canvas
 */
interface Canvas3DContext {
  // Add specific context properties
  [key: string]: unknown;
}

/**
 * Layer manager for gizmo display
 */
interface DisplayLayers {
  /** The gizmo rendering layer */
  gizmo: unknown;
}

/**
 * Manages gizmo lifecycle and rendering
 */
interface GizmoManager {
  /**
   * Registers a gizmo with the manager
   * @param gizmo - The gizmo instance to add
   */
  addGizmo(gizmo: Gizmo3D): void;
  
  /**
   * Unregisters a gizmo from the manager
   * @param gizmo - The gizmo instance to remove
   */
  removeGizmo(gizmo: Gizmo3D): void;
}

/**
 * Represents the 3D canvas view
 */
interface Canvas3D {
  /** The rendering context */
  context: Canvas3DContext;
  
  /** Display layer management */
  displayLayers: DisplayLayers;
  
  /** Gizmo lifecycle manager */
  gizmoManager: GizmoManager;
}

/**
 * Main application interface
 */
interface Application {
  /**
   * Retrieves the active 3D view
   * @returns The active canvas3D instance
   */
  getActive3DView(): Canvas3D;
}

/**
 * Controller for managing 3D view interactions and gizmo manipulation
 * Handles creation, visibility, and lifecycle of 3D gizmos in the HSApp environment
 */
export declare class ViewController {
  /** Reference to the main application instance */
  private _app: Application;
  
  /** The 3D rendering context */
  private _context?: Canvas3DContext;
  
  /** The active 3D canvas view */
  private _canvas3d: Canvas3D;
  
  /** Collection of active 3D gizmo instances */
  private _gizmos3d: Gizmo3D[];

  /**
   * Initializes the ViewController
   * Sets up application references and retrieves the active 3D view
   */
  constructor();

  /**
   * Creates and registers gizmos based on provided configurations
   * @param configs - Array of gizmo configuration objects
   */
  createGizmo(configs: GizmoConfig[]): void;

  /**
   * Hides all active gizmos from the 3D view
   */
  hideGizmo(): void;

  /**
   * Shows all active gizmos in the 3D view
   */
  showGizmo(): void;

  /**
   * Deactivates and removes all gizmos
   * Performs cleanup and unregisters gizmos from the manager
   */
  deactiveGizmo(): void;

  /**
   * Updates gizmo visibility based on roof geometry
   * Hides gizmos that match the roof's room loop geometry
   * @param roof - The roof entity containing geometric parameters
   */
  updateGizmoByRoof(roof: RoofEntity): void;
}