/**
 * Module: GizmoFactory
 * Factory for creating gizmos (visual editing handles/overlays) for entities in the canvas
 */

import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

declare namespace HSFPConstants {
  /**
   * Enum of available plugin types in the application
   */
  enum PluginType {
    LayerEdit = 'LayerEdit',
    // ... other plugin types
  }
}

declare namespace HSApp.View.Base {
  /**
   * Base class for gizmo factories
   */
  abstract class GizmoFactory {
    /** Reference to the canvas instance */
    protected _canvas: Canvas;

    /**
     * Checks if the gizmo factory is currently active
     */
    abstract isActive(): boolean;

    /**
     * Creates gizmos for a given entity
     * @param entity - The entity to create gizmos for
     * @returns Array of created gizmo instances
     */
    abstract createEntityGizmo(entity: unknown): Gizmo[];
  }
}

/**
 * Interface representing a canvas display layer
 */
interface DisplayLayer {
  /** Layer identifier or context */
  [key: string]: unknown;
}

/**
 * Interface for canvas display layers collection
 */
interface DisplayLayers {
  /** Temporary layer for transient UI elements like gizmos */
  temp?: DisplayLayer;
  [key: string]: DisplayLayer | undefined;
}

/**
 * Interface representing the canvas element
 */
interface Canvas {
  /** Collection of display layers */
  displayLayers: DisplayLayers;
  
  /** The rendering context of the canvas */
  context: CanvasRenderingContext2D | unknown;
}

/**
 * Interface for a gizmo instance
 */
interface Gizmo {
  /** Unique identifier for the gizmo */
  id?: string;
  
  /** Render method for displaying the gizmo */
  render?(): void;
  
  /** Cleanup method for disposing the gizmo */
  dispose?(): void;
}

/**
 * Interface for the LayerEdit plugin
 */
interface LayerEditPlugin {
  /**
   * Creates a dimension gizmo for a floor entity
   * @param context - The rendering context
   * @param layer - The display layer to render on
   * @param floor - The floor entity
   * @returns The created dimension gizmo
   */
  createFloorDimensionGizmo(
    context: CanvasRenderingContext2D | unknown,
    layer: DisplayLayer,
    floor: HSCore.Model.Floor
  ): Gizmo;
}

/**
 * Interface for the plugin manager
 */
interface PluginManager {
  /**
   * Retrieves a plugin by type
   * @param pluginType - The type of plugin to retrieve
   * @returns The plugin instance or undefined if not found
   */
  getPlugin(pluginType: string): LayerEditPlugin | undefined;
}

/**
 * Interface for the application instance
 */
interface App {
  /** Plugin manager instance */
  pluginManager: PluginManager;
}

declare namespace HSApp.App {
  /**
   * Gets the singleton application instance
   * @returns The application instance
   */
  function getApp(): App;
}

declare namespace HSCore.Model {
  /**
   * Represents a floor entity in the model
   */
  class Floor {
    /** Floor identifier */
    id: string;
    
    /** Floor level/number */
    level?: number;
    
    /** Floor geometry data */
    geometry?: unknown;
  }
}

/**
 * Custom GizmoFactory implementation for creating entity-specific gizmos
 * Extends the base GizmoFactory to provide specialized gizmo creation logic
 */
export declare class GizmoFactory extends HSApp.View.Base.GizmoFactory {
  /**
   * Indicates that this gizmo factory is always active
   * @returns Always returns true
   */
  isActive(): boolean;

  /**
   * Creates appropriate gizmos for the given entity
   * Currently supports creating dimension gizmos for Floor entities
   * 
   * @param entity - The entity to create gizmos for (typically a Floor)
   * @returns Array of created gizmo instances (empty if no gizmos created)
   * 
   * @remarks
   * - Requires a valid temp display layer on the canvas
   * - For Floor entities, attempts to use LayerEdit plugin to create dimension gizmos
   * - Returns empty array if requirements are not met
   */
  createEntityGizmo(entity: unknown): Gizmo[];
}