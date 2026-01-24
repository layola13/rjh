import type { Entity, Entity_IO } from './Entity';
import type { Layer } from './Layer';
import type { SunPath } from './SunPath';
import type { Wall } from './Wall';
import type { Content } from './Content';
import type { Opening } from './Opening';
import type { ParametricOpening } from './ParametricOpening';
import type { DOpening } from './DOpening';
import type { Face } from './Face';
import type { CustomizedPMModel } from './CustomizedPMModel';
import type { NCustomizedFeatureModel } from './NCustomizedFeatureModel';
import type { Signal } from './Signal';
import type { EntityFlagEnum, EntityEventType } from './EntityTypes';
import type { Bound } from './Geom';
import type { JointType } from './JointTypes';
import type { MoldingTypeEnum } from './MoldingTypes';

/**
 * Serialization/deserialization handler for Scene entities
 */
export declare class Scene_IO extends Entity_IO {
  /**
   * Serialize a Scene entity to a data structure
   * @param entity - The scene to serialize
   * @param callback - Optional callback invoked after dump
   * @param recursive - Whether to recursively dump child entities
   * @param options - Dump options including exclusions and dumped entity tracking
   * @returns Array of serialized entity data
   */
  dump(
    entity: Scene,
    callback?: (data: any[], entity: Scene) => void,
    recursive?: boolean,
    options?: {
      exclude?: Entity;
      dumpedEntities?: Set<string>;
      invalidIds?: string[];
    }
  ): any[];

  /**
   * Deserialize data into a Scene entity
   * @param entity - The scene instance to populate
   * @param data - Serialized scene data
   * @param context - Load context with version info and entity mappings
   */
  load(
    entity: Scene,
    data: any,
    context: {
      version?: string;
      data?: Record<string, any>;
      migrateEntityIdsMap?: Map<string, string>;
      invalidIds?: string[];
    }
  ): void;

  /**
   * Post-load processing after all entities are loaded
   * @param entity - The scene instance
   * @param context - Load context
   */
  postLoad(
    entity: Scene,
    context: {
      version?: string;
      data?: Record<string, any>;
      migrateEntityIdsMap?: Map<string, string>;
    }
  ): void;

  /**
   * Add a host relationship for content entities
   * @param hostId - ID of the host entity
   * @param content - Content entity to assign to host
   * @param context - Load context
   */
  private _addHost(
    hostId: string | undefined,
    content: Content,
    context: {
      invalidIds?: string[];
      [key: string]: any;
    }
  ): void;

  /**
   * Remove malformed openings that have invalid dimensions
   * @param scene - The scene to clean
   */
  private _removeMalformedOpenings(scene: Scene): void;

  /**
   * Migrate outdoor layer slabs for version compatibility
   * @param version - Target version string
   */
  private _migrateOutdoorLayerSlabs(version: string): void;

  /**
   * Migrate cross-layer openings for version 1.4+ compatibility
   * @param scene - The scene to migrate
   */
  private _migrateCrossLayerOpenings(scene: Scene): void;

  /**
   * Migrate ordinary moldings for version compatibility
   * @param scene - The scene to migrate
   * @param targetVersion - Target version ("1.1" or "1.2")
   */
  private _migrateOrdinaryMoldings(scene: Scene, targetVersion: '1.1' | '1.2'): void;

  /**
   * Migrate wall joints for version 1.1+ compatibility
   * @param entity - The scene entity
   * @param context - Load context with version info
   */
  private _migrateWallJoints(
    entity: Scene,
    context: { version?: string }
  ): void;

  /**
   * Refresh layer data when topology names have changed
   * @param layer - The layer to refresh
   */
  private _refreshWhenTopoNameChanged(layer: Layer): void;
}

/**
 * Represents a complete 3D scene containing layers, walls, and other architectural elements
 */
export declare class Scene extends Entity {
  /**
   * The root/ground floor layer
   */
  rootLayer: Layer | undefined;

  /**
   * The outdoor environment layer
   */
  outdoorLayer: Layer | undefined;

  /**
   * The ceiling layer
   */
  ceilingLayer: Layer | undefined;

  /**
   * The currently active layer being edited
   */
  activeLayer: Layer | undefined;

  /**
   * Dictionary of all layers in the scene indexed by ID
   */
  layers: Record<string, Layer>;

  /**
   * Base height/elevation of the scene (in millimeters)
   */
  baseHeight: number;

  /**
   * Signal dispatched when the active layer changes
   */
  signalActiveLayerChanged: Signal<{
    oldValue: Layer;
    newValue: Layer;
  }>;

  /**
   * Signal dispatched when a new layer is added
   */
  signalLayerAdded: Signal<{ layer: Layer }>;

  /**
   * Signal dispatched when a layer is deleted
   */
  signalLayerDeleted: Signal<{ layer: Layer }>;

  /**
   * Signal dispatched when base height changes
   */
  signalBaseHeightChanged: Signal<{
    oldValue: number;
    newValue: number;
  }>;

  /**
   * Internal layers storage
   */
  private _layers: Record<string, Layer>;

  /**
   * Internal base height storage
   */
  private __baseHeight: number;

  /**
   * Internal root layer reference
   */
  private _rootLayer?: Layer;

  /**
   * Internal outdoor layer reference
   */
  private _outdoorLayer?: Layer;

  /**
   * Internal ceiling layer reference
   */
  private _ceilingLayer?: Layer;

  /**
   * Internal active layer reference
   */
  private _activeLayer?: Layer;

  /**
   * Internal preview layer reference (lazily created)
   */
  private _previewLayer?: Layer;

  /**
   * Sun path simulation model
   */
  private _sunPath?: SunPath;

  /**
   * @param id - Optional entity ID
   * @param doc - Optional document reference
   */
  constructor(id?: string, doc?: any);

  /**
   * Create a new scene with default layers
   * @returns A new Scene instance with outdoor, root, and ceiling layers
   */
  static create(): Scene;

  /**
   * Check if this entity is a root scene
   * @returns Always true for Scene entities
   */
  isRoot(): boolean;

  /**
   * Destroy the scene and cleanup all resources
   */
  destroy(): void;

  /**
   * Get the base height of the scene
   * @returns Base height in millimeters
   */
  getBaseHeight(): number;

  /**
   * Set the base height of the scene
   * @param height - New base height in millimeters
   */
  setBaseHeight(height: number): void;

  /**
   * Set the layers dictionary
   * @param layers - New layers map
   */
  setLayers(layers: Record<string, Layer>): void;

  /**
   * Get the topmost layer in the vertical stack
   */
  get lastLayer(): Layer | undefined;

  /**
   * Get the bottommost layer in the vertical stack
   */
  get lowestLayer(): Layer | undefined;

  /**
   * Get or create the preview layer (for temporary visualization)
   */
  get previewLayer(): Layer;

  /**
   * Get or create the sun path model
   */
  get sunpath(): SunPath;

  /**
   * Calculate the absolute altitude/elevation of a layer
   * @param layer - The layer to calculate altitude for
   * @returns Altitude in millimeters from scene base
   */
  getLayerAltitude(layer: Layer): number;

  /**
   * Mark layer positions as dirty and trigger recalculation
   * @param layer - Starting layer to mark dirty
   * @param isUnderground - Whether the layer is below ground level
   */
  dirtyLayerPosition(layer: Layer, isUnderground?: boolean): void;

  /**
   * Check if a layer is below the root/ground layer
   * @param layer - Layer to check
   * @returns True if the layer is underground
   */
  isUndergroundLayer(layer: Layer): boolean;

  /**
   * Check if a layer is at or above the root/ground layer
   * @param layer - Layer to check
   * @returns True if the layer is on the surface
   */
  isSurfaceLayer(layer: Layer): boolean;

  /**
   * Add a new layer to the scene
   * @param layer - The layer to add
   * @param isUnderground - Whether to add below ground level
   * @param options - Additional options (nextLayer or previousLayer)
   * @returns The added layer
   */
  addLayer(
    layer: Layer,
    isUnderground?: boolean,
    options?: {
      nextLayer?: Layer;
      previousLayer?: Layer;
    }
  ): Layer;

  /**
   * Internal method to add a layer to the layers dictionary
   * @param layer - The layer to add
   * @returns True if successful
   */
  private _addLayer(layer: Layer): boolean;

  /**
   * Remove a layer from the scene
   * @param layer - The layer to remove
   * @param cleanup - Whether to cleanup resources
   * @param notify - Whether to dispatch removal events
   */
  removeLayer(layer: Layer, cleanup?: boolean, notify?: boolean): void;

  /**
   * Internal setter for ceiling layer
   * @param layer - The ceiling layer
   */
  private _setCeilingLayer(layer: Layer): void;

  /**
   * Internal setter for layers with diff calculation
   * @param layers - New layers map
   */
  private _setLayers(layers: Record<string, Layer>): void;

  /**
   * Internal method to remove a layer and update linked list
   * @param layer - The layer to remove
   */
  private _removeLayer(layer: Layer): void;

  /**
   * Find a layer matching a predicate
   * @param predicate - Filter function
   * @param thisArg - Context for predicate
   * @returns First matching layer or undefined
   */
  findLayer(
    predicate: (layer: Layer) => boolean,
    thisArg?: any
  ): Layer | undefined;

  /**
   * Iterate over all layers
   * @param callback - Function to call for each layer
   * @param thisArg - Context for callback
   */
  forEachLayer(callback: (layer: Layer) => void, thisArg?: any): void;

  /**
   * Get all layers in vertical order (underground to ceiling)
   * @returns Ordered array of layers
   */
  getLayersInOrder(): Layer[];

  /**
   * Get all layers at or above ground level
   * @returns Array of surface layers
   */
  getActualLayersOnGround(): Layer[];

  /**
   * Get the serialization handler for this entity type
   * @returns Scene_IO singleton instance
   */
  getIO(): Scene_IO;

  /**
   * Verify scene integrity and fix invalid state
   * @returns True if verification passed or repairs succeeded
   */
  verify(): boolean;

  /**
   * @deprecated Internal callback for active layer changes
   * @param oldLayer - Previous active layer
   * @param newLayer - New active layer
   */
  onActiveLayerChanged(oldLayer: Layer, newLayer: Layer): void;

  /**
   * Internal handler for active layer changes
   * @param oldLayer - Previous active layer
   * @param newLayer - New active layer
   */
  private _onActiveLayerChanged(oldLayer: Layer, newLayer: Layer): void;

  /**
   * Mark a layer and its children as dirty for re-rendering
   * @param layer - The layer to mark dirty
   */
  private _dirtyLayer(layer: Layer): void;

  /**
   * Handle field value changes
   * @param fieldName - Name of the changed field
   * @param oldValue - Previous value
   * @param newValue - New value
   */
  onFieldChanged(fieldName: string, oldValue: any, newValue: any): void;

  /**
   * Handle child entity removal
   * @param child - The removed child entity
   * @param cleanup - Whether to cleanup resources
   */
  onChildRemoved(child: Entity, cleanup?: boolean): void;

  /**
   * Handle child entity dirty events
   * @param child - The child that became dirty
   * @param event - Event details
   */
  onChildDirty(
    child: Entity,
    event?: { type: EntityEventType; [key: string]: any }
  ): void;

  /**
   * Recalculate internal bounding box
   */
  refreshBoundInternal(): void;

  /**
   * Iterate over all geometric points in the scene
   * @param callback - Function to call for each point
   * @param thisArg - Context for callback
   */
  forEachPoint(callback: (point: any) => void, thisArg?: any): void;

  /**
   * Get all customized parametric models in the scene
   * @returns Array of CustomizedPMModel instances
   */
  getCustomizedPms(): CustomizedPMModel[];

  /**
   * Get all customized feature models in the scene
   * @returns Array of NCustomizedFeatureModel instances
   */
  getNCustomizedFeatureModels(): NCustomizedFeatureModel[];
}