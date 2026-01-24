import { StateRequest } from './StateRequest';
import { Layer } from './Layer';
import { Wall } from './Wall';
import { Opening } from './Opening';
import { FloorSlab } from './FloorSlab';
import { Scene } from './Scene';
import { Floorplan } from './Floorplan';
import { ExtraordinaryGuideline } from './ExtraordinaryGuideline';
import { WallFlagEnum, EntityFlagEnum } from './Enums';

/**
 * Type of layer insertion operation
 */
type LayerInsertionType = 'up' | 'bottom';

/**
 * Configuration for slab building operations
 */
interface SlabBuildOptions {
  slabOption: {
    /** Whether to clean up existing ceiling structures */
    cleanBuildUp: boolean;
    /** Ceiling slab regions for intersection calculations */
    ceilingSlabRegionsForInter?: any[];
  };
}

/**
 * Result of wall copying operation
 */
interface CopyWallsResult {
  /** Array of newly created wall instances */
  newWalls: Wall[];
  /** Map of openings to their associated walls */
  newOpeningWallMp: Map<Opening, Wall>;
}

/**
 * Sketch slab hole definition
 */
interface SlabHole {
  /** Geometric loop defining the hole boundary */
  loop: any;
  /** Unique identifier for the hole */
  id: string;
}

/**
 * Request for inserting a new layer in the building structure.
 * Handles duplication of walls, openings, and other structural elements
 * from the active layer to the newly created layer.
 */
export declare class InsertNewLayerRequest extends StateRequest {
  /**
   * Type of insertion operation (up or bottom)
   * @private
   */
  private readonly _type: LayerInsertionType;

  /**
   * Whether to copy walls from the active layer
   * @private
   */
  private readonly _needCopyWall: boolean;

  /**
   * Reference to the application floorplan
   */
  floorplan: Floorplan;

  /**
   * Reference to the 3D scene
   */
  scene: Scene;

  /**
   * Currently active layer
   */
  activeLayer: Layer;

  /**
   * Index of the active layer in the layer stack
   */
  activeLayerIndex: number;

  /**
   * Indicates if operation is at the topmost or bottommost layer
   * @private
   */
  private _topBottom: boolean;

  /**
   * Creates a new layer insertion request
   * @param type - Direction of layer insertion ('up' or 'bottom')
   * @param needCopyWall - Whether to duplicate walls from active layer
   */
  constructor(type: LayerInsertionType, needCopyWall: boolean);

  /**
   * Determines if this request can be executed within a transaction
   * @returns Always returns true
   */
  canTransactField(): boolean;

  /**
   * Executes the layer insertion operation
   * @returns The newly created layer
   */
  onCommit(): Layer;

  /**
   * Inserts a new layer above the current active layer
   * @returns The newly created layer, or undefined if operation fails
   * @remarks Maximum 33 above-ground layers allowed
   */
  insertUpLayer(): Layer | undefined;

  /**
   * Inserts a new layer below the current active layer
   * @returns The newly created layer, or undefined if operation fails
   * @remarks Maximum 3 basement layers allowed
   */
  insertDownLayer(): Layer | undefined;

  /**
   * Copies walls from the active layer to the target layer
   * @param targetLayer - Layer to receive the copied walls
   * @returns Map of copied openings to their associated walls
   */
  copyLayerWall(targetLayer: Layer): Map<Opening, Wall> | undefined;

  /**
   * Copies floor slab openings from the active layer
   * @returns Array of copied slab openings
   */
  copyLayerSlabOpening(): Opening[];

  /**
   * Copies sketch guidelines and holes to the target layer
   * @param targetLayer - Layer to receive the copied sketch elements
   */
  copySketchSlabHoles(targetLayer: Layer): void;

  /**
   * Rebuilds geometry for the newly inserted layer and adjacent layers
   * @param newLayer - The newly created layer
   */
  buildLayers(newLayer: Layer): void;

  /**
   * Reconstructs openings (doors, windows) and assigns them to walls
   * @param targetLayer - Layer containing the openings
   * @param wallOpeningMap - Map of openings to their host walls
   * @param slabOpenings - Array of floor slab openings
   */
  buildOpenings(
    targetLayer: Layer,
    wallOpeningMap: Map<Opening, Wall> | undefined,
    slabOpenings: Opening[]
  ): void;

  /**
   * Disconnects grouped faces that are no longer geometrically connected
   * after layer insertion
   * @param layer - Layer to process
   */
  disconnectGroupedFaces(layer: Layer): void;
}