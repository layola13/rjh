import { Signal } from './Signal';
import { Entity, Entity_IO } from './Entity';
import { Layer } from './Layer';
import { EntityField, EntityMapField } from './decorators';

/**
 * Scene serialization IO handler
 * Handles loading and saving of Scene instances
 */
export declare class Scene_IO extends Entity_IO {
  /**
   * Load scene data from dump format
   * @param scene - The scene instance to populate
   * @param dump - Serialized scene data
   * @param dumpMap - Map of dumped entities
   * @param context - Loading context
   */
  load(
    scene: Scene,
    dump: SceneDump,
    dumpMap: Map<string, unknown>,
    context: LoadContext
  ): void;
}

/**
 * Scene data structure for serialization
 */
export interface SceneDump {
  /** Array of layer IDs in the scene */
  layers: string[];
  /** Root layer ID */
  rootLayer: string;
  /** Currently active layer ID */
  activeLayer: string;
  /** Ceiling layer ID */
  ceilingLayer: string;
  /** Outdoor layer ID */
  outdoorLayer: string;
  /** Optional preview layer configuration */
  previewLayer?: unknown;
  /** Version information for migration */
  version?: string;
}

/**
 * Loading context for scene deserialization
 */
export interface LoadContext {
  /** Version string for compatibility checks */
  version: string;
  [key: string]: unknown;
}

/**
 * Main scene container managing layers and spatial hierarchy
 * Root entity that contains all layers, walls, and architectural elements
 */
export declare class Scene extends Entity {
  /** Map of all layers indexed by ID */
  private _layers: Record<string, Layer>;
  
  /** Root ground-level layer */
  private _rootLayer?: Layer;
  
  /** Outdoor/exterior layer */
  private _outdoorLayer?: Layer;
  
  /** Top ceiling layer */
  private _ceilingLayer?: Layer;
  
  /** Currently selected/active layer */
  private _activeLayer?: Layer;
  
  /** Temporary preview layer for UI operations */
  private _previewLayer?: Layer;
  
  /** Base elevation height of the scene */
  private __baseHeight: number;

  /** Emitted when the active layer changes */
  signalActiveLayerChanged: Signal<Scene>;
  
  /** Emitted when a new layer is added */
  signalLayerAdded: Signal<Scene>;
  
  /** Emitted when base height changes */
  signalBaseHeightChanged: Signal<Scene>;

  /**
   * Create a new scene
   * @param id - Optional unique identifier
   */
  constructor(id?: string);

  /**
   * Check if this entity is the root scene
   * @returns Always true for Scene instances
   */
  isRoot(): boolean;

  /**
   * Dispose scene and all child entities
   * Cleans up signals and references
   */
  destroy(): void;

  /**
   * Get the base elevation height
   * @returns Base height in scene units
   */
  getBaseHeight(): number;

  /**
   * Get the topmost layer in vertical order
   */
  get lastLayer(): Layer | undefined;

  /**
   * Get the bottommost layer in vertical order
   */
  get lowestLayer(): Layer | undefined;

  /**
   * Get or create the preview layer for temporary geometry
   */
  get previewLayer(): Layer;

  /**
   * Root ground-level layer
   * Cannot be the outdoor layer
   */
  rootLayer: Layer | undefined;

  /**
   * Outdoor/exterior layer
   */
  outdoorLayer: Layer | undefined;

  /**
   * Top ceiling layer
   * Cannot be the outdoor layer
   */
  ceilingLayer: Layer | undefined;

  /**
   * Currently active/selected layer
   * Cannot be the outdoor layer
   */
  activeLayer: Layer | undefined;

  /**
   * Map of all layers by ID
   */
  layers: Record<string, Layer>;

  /**
   * Base elevation height of the scene
   */
  baseHeight: number;

  /**
   * Calculate the absolute altitude of a layer
   * @param layer - The layer to measure
   * @returns Altitude in scene units
   */
  getLayerAltitude(layer: Layer): number;

  /**
   * Check if a layer is below ground level
   * @param layer - The layer to check
   * @returns True if underground
   */
  isUndergroundLayer(layer: Layer): boolean;

  /**
   * Check if a layer is at or above ground level
   * @param layer - The layer to check
   * @returns True if at surface level
   */
  isSurfaceLayer(layer: Layer): boolean;

  /**
   * Add a layer to the scene
   * @param layer - Layer to add
   * @returns True if successfully added
   * @internal
   */
  private _addLayer(layer: Layer): boolean;

  /**
   * Set the ceiling layer and register it
   * @param layer - New ceiling layer
   * @internal
   */
  private _setCeilingLayer(layer: Layer): void;

  /**
   * Update the layers collection with add/remove operations
   * @param newLayers - New layers map
   * @internal
   */
  private _setLayers(newLayers: Record<string, Layer>): void;

  /**
   * Find a layer matching predicate
   * @param predicate - Filter function
   * @param thisArg - Context for predicate
   * @returns First matching layer or undefined
   */
  findLayer(
    predicate: (layer: Layer) => boolean,
    thisArg?: unknown
  ): Layer | undefined;

  /**
   * Iterate over all layers
   * @param callback - Function to call for each layer
   * @param thisArg - Context for callback
   */
  forEachLayer(
    callback: (layer: Layer) => void,
    thisArg?: unknown
  ): void;

  /**
   * Get all layers sorted by vertical order (bottom to top)
   * @returns Ordered array: underground → outdoor → surface → ceiling
   */
  getLayersInOrder(): Layer[];

  /**
   * Get the IO handler for serialization
   * @returns Scene_IO singleton instance
   */
  getIO(): Scene_IO;

  /**
   * Validate and repair scene integrity
   * Ensures all required layers exist and are valid
   * @returns True if scene is valid or was repaired
   */
  verify(): boolean;

  /**
   * Iterate over all wall endpoints in the scene
   * @param callback - Function to call for each point
   * @param thisArg - Context for callback
   */
  forEachPoint(
    callback: (point: unknown) => void,
    thisArg?: unknown
  ): void;

  /**
   * Migrate ceiling geometry from old format (pre-0.3)
   * @param dump - Original serialized data
   * @param context - Loading context with version
   * @internal
   */
  private _migrateCeiling(dump: SceneDump, context: LoadContext): void;

  /**
   * Migrate wall faces from old format (pre-0.4)
   * @param dump - Original serialized data
   * @param context - Loading context with version
   * @internal
   */
  private _migrateWalls(dump: SceneDump, context: LoadContext): void;

  /**
   * Migrate layer slab relationships from old format (pre-0.2)
   * @param dump - Original serialized data
   * @param context - Loading context with version
   * @internal
   */
  private _migrateLayers(dump: SceneDump, context: LoadContext): void;

  /**
   * Iterate over all floor slabs in all layers
   * @param callback - Function to call for each floor
   * @param thisArg - Context for callback
   */
  forEachFloor(
    callback: (floor: unknown) => void,
    thisArg?: unknown
  ): void;

  /**
   * Iterate over all walls in all layers
   * @param callback - Function to call for each wall
   * @param thisArg - Context for callback
   */
  forEachWall(
    callback: (wall: unknown) => void,
    thisArg?: unknown
  ): void;
}