/**
 * Controller for managing edge view initialization and gizmo interactions in 3D canvas.
 * Handles pitched roof edge visualization and camera change events.
 * 
 * @module InitEdgeViewController
 */

import type { HSCore } from './HSCore';
import type { HSApp } from './HSApp';
import type { Canvas3D, DisplayList, GizmoManager } from './Canvas3D';
import type { Context3D } from './Context3D';
import type { Curve } from './Geometry';
import type { Layer } from './Layer';
import type { ENParamRoofType } from './Enums';

/**
 * Gizmo interface for 3D edge visualization
 */
interface EdgeGizmo3D {
  /**
   * Clean up resources held by this gizmo
   */
  cleanup(): void;
  
  /**
   * Update the scale of the gizmo based on current camera settings
   */
  updateScale(): void;
}

/**
 * Room parameters containing geometry and roof configuration
 */
interface RoomParameters {
  /** Loop defining the room boundary */
  roomLoop?: RoomLoop;
  
  /** Height of the room in millimeters */
  roomHeight: number;
  
  /** Type of roof (flat, pitched, etc.) */
  roofType: ENParamRoofType;
}

/**
 * Room loop geometry that can be cloned and scaled
 */
interface RoomLoop {
  /**
   * Create a copy of this room loop
   */
  clone(): RoomLoop;
  
  /**
   * Scale the room loop by a factor
   * @param factor - Scaling factor
   */
  scale(factor: number): RoomLoop;
  
  /**
   * Get all curves that make up this loop
   */
  getAllCurves(): Curve[];
}

/**
 * Entity with room parameters and hierarchy
 */
interface RoomEntity {
  /** Unique identifier */
  id: string;
  
  /** Room configuration parameters */
  parameters: RoomParameters;
  
  /**
   * Get the parent entity in the hierarchy
   */
  getUniqueParent(): Layer;
}

/**
 * Display list item with optional face selection capability
 */
interface DisplayListItem {
  /**
   * Optional method to get the name of the chosen face
   */
  getChoiceFaceName?(): string | undefined;
}

/**
 * Controller for initializing and managing edge view gizmos in the 3D canvas.
 * Listens to camera changes and updates gizmo visualization accordingly.
 */
export declare class InitEdgeViewController {
  /** Application instance */
  private _app: HSApp.App;
  
  /** 3D rendering context */
  private _context: Context3D | undefined;
  
  /** Active 3D canvas view */
  private _canvas3d: Canvas3D;
  
  /** Collection of active edge gizmos */
  private _gizmos3d: EdgeGizmo3D[];
  
  /** Signal hook for managing event listeners */
  private _signalHook: HSCore.Util.SignalHook;

  constructor();

  /**
   * Refresh the edge view for the given entity.
   * Clears existing gizmos and reinitializes if the entity has valid geometry.
   * 
   * @param entity - The room entity to visualize, or undefined to clear
   */
  refresh(entity: RoomEntity | undefined): void;

  /**
   * Initialize edge gizmos for a pitched roof entity.
   * Creates gizmos for each initial curve of the room boundary.
   * 
   * @param entity - The room entity with pitched roof configuration
   * @private
   */
  private _init(entity: RoomEntity): void;

  /**
   * Remove and cleanup all active edge gizmos from the canvas.
   * 
   * @private
   */
  private _clear(): void;

  /**
   * Camera change event handler.
   * Updates scale of all gizmos to maintain consistent visual size.
   * 
   * @private
   */
  private _onCameraChanged(): void;
}