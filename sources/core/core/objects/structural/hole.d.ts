import { Content } from './Content';
import { HoleDataProvider } from './HoleDataProvider';
import { FaceGeometry } from './FaceGeometry';
import { Pocket } from './Pocket';
import { EntityEventType } from './EntityEventType';
import * as THREE from 'three';

/**
 * CSG (Constructive Solid Geometry) object with bounding box
 */
export interface ClipAidCSG {
  /** The mesh representing the CSG geometry */
  csg: THREE.Mesh;
  /** Bounding box of the CSG object */
  box: THREE.Box3;
}

/**
 * Collection of CSG objects with their parent node
 */
export interface ClipAidCSGCollection {
  /** Array of CSG objects with bounding boxes */
  csgs: ClipAidCSG[];
  /** The parent node containing all CSG objects */
  node: THREE.Object3D;
}

/**
 * Event data for entity changes
 */
export interface EntityEvent {
  data: {
    /** Type of entity event (Geometry, Position, etc.) */
    type: EntityEventType;
    /** The entity that was modified */
    entity?: HSCore.Model.Entity;
    /** New parent entity when parent is replaced */
    newParent?: HSCore.Model.Entity;
  };
}

/**
 * Represents a hole (opening) in a wall or surface.
 * Handles geometry, positioning, and rendering of holes such as doors and windows.
 */
export declare class Hole extends Content {
  /** Cached data provider for hole geometry */
  private _dataProvider?: HoleDataProvider;
  
  /** Cached clip aid CSG objects for collision detection */
  private _clipAidCSGs?: ClipAidCSGCollection;
  
  /** Local transformation matrix including scale */
  private _matrixLocal?: THREE.Matrix4;
  
  /** Model matrix without scale (used for doors) */
  private _modelMatrixLocal?: THREE.Matrix4;

  /**
   * Creates a new Hole instance
   * @param entity - The HSCore entity representing the hole
   * @param parent - Parent geometry object
   * @param context - Rendering context
   */
  constructor(entity: HSCore.Model.Hole, parent: unknown, context: unknown);

  /**
   * Called when a child entity is added to this hole
   * @param event - Event containing the added entity data
   */
  onChildAdded(event: EntityEvent): void;

  /**
   * Creates a face geometry object for a face entity
   * @param entity - The face entity
   * @returns A new FaceGeometry instance
   */
  createFaceObject(entity: HSCore.Model.Face): FaceGeometry;

  /**
   * Creates a pocket geometry object for a pocket entity
   * @param entity - The pocket entity
   * @returns A new Pocket instance
   */
  createPocketObject(entity: HSCore.Model.Pocket): Pocket;

  /**
   * Gets the data provider for this hole, creating it if necessary
   * @returns The hole data provider
   */
  get dataProvider(): HoleDataProvider;

  /**
   * Initializes the hole geometry and child objects
   */
  onInit(): void;

  /**
   * Called when the entity becomes dirty (needs update)
   * @param event - Event containing information about what changed
   */
  onEntityDirty(event: EntityEvent): void;

  /**
   * Gets or creates CSG objects used for clipping aids
   * @param face - Optional face to compute CSGs relative to
   * @returns Collection of CSG objects and their parent node
   */
  getClipAidCSGs(face?: HSCore.Model.Face): ClipAidCSGCollection;

  /**
   * Creates CSG objects for clip aids (visual helpers for openings)
   * @param face - Optional face to compute CSGs relative to
   * @returns Collection of CSG objects and their parent node
   * @private
   */
  private _createClipAidCSGs(face?: HSCore.Model.Face): ClipAidCSGCollection;

  /**
   * Gets the 2D opening loop (profile) for this hole
   * @param face - Optional face to compute the loop relative to
   * @param applyOffset - Whether to apply thickness offset to the profile
   * @returns Array of 2D points defining the opening profile
   */
  getOpeningLoop(face?: HSCore.Model.Face, applyOffset?: boolean): THREE.Vector2[] | undefined;

  /**
   * Cleanup method called when the hole is being destroyed
   */
  onCleanup(): void;

  /**
   * Called when the parent entity is replaced
   * @param event - Event containing old and new parent information
   */
  onParentReplaced(event: EntityEvent): void;

  /**
   * Gets the model transformation matrix
   * @returns The model matrix (without scale for doors, with scale otherwise)
   */
  getModelMatrix(): THREE.Matrix4 | undefined;

  /**
   * Computes the local transformation matrix
   * @param includeScale - Whether to include scale in the matrix
   * @returns The computed local transformation matrix
   * @private
   */
  private _computeLocalMatrix(includeScale?: boolean): THREE.Matrix4;

  /**
   * Updates the position transformation matrices
   */
  onUpdatePosition(): void;
}