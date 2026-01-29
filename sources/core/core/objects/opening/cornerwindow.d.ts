import { BaseObject } from './BaseObject';
import { Manager } from './Manager';
import { WebCadDocument } from './WebCadDocument';
import { Util } from '../utils/Util';
import * as THREE from 'three';

/**
 * Graphics data structure containing mesh definitions and objects
 */
export interface GraphicsData {
  /** Array of 3D objects to be rendered */
  objects: GraphicsObject[];
  /** Array of mesh definition data */
  meshDefs: MeshDefinition[];
}

/**
 * Graphics object with custom attributes
 */
export interface GraphicsObject {
  /** Custom attributes attached to the graphics object */
  customAttrs?: {
    /** Room type identifier */
    roomType?: string;
    /** Object type classification */
    type?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Mesh definition containing vertex position data
 */
export interface MeshDefinition {
  /** Flat array of vertex positions [x1, y1, z1, x2, y2, z2, ...] */
  vertexPositions: number[];
  [key: string]: unknown;
}

/**
 * CSG (Constructive Solid Geometry) data with bounding box
 */
export interface ClipAidCSG {
  /** CSG mesh object */
  csg: THREE.Mesh;
  /** Bounding box for the CSG */
  box: THREE.Box3;
}

/**
 * Collection of CSG data with associated scene node
 */
export interface ClipAidCSGCollection {
  /** Array of CSG objects with bounding boxes */
  csgs: ClipAidCSG[];
  /** Associated THREE.js scene node */
  node?: THREE.Object3D;
}

/**
 * Room custom attributes
 */
export interface RoomCustomAttrs {
  /** Room type identifier, formatted as "roomType-floorId" or "none" */
  roomType: string;
}

/**
 * Entity interface representing a 3D model entity
 */
export interface Entity {
  id: string;
  needUpdate: boolean;
  x: number;
  y: number;
  z: number;
  signalDirty: Signal;
  showPocket: boolean;
  contentType: ContentType;
  forEachChild(callback: (child: Entity) => void): void;
  getHost(): Entity | null;
  instanceOf(modelClass: string): boolean;
  isFlagOff(flag: number): boolean;
  isFlagOn(flag: number): boolean;
  getWindowHoles(): WindowHole[];
  getWindowPockets(): WindowPocket[];
  getWindowSills(): WindowSill[];
}

/**
 * Window hole entity
 */
export interface WindowHole {
  profile: string;
  ZSize: number;
  XRotation: number;
  rotation: number;
  YRotation: number;
  getHost(): Entity | null;
}

/**
 * Window pocket entity
 */
export interface WindowPocket {
  parameters: {
    profileData: {
      profileSizeX: number;
    };
  };
}

/**
 * Window sill entity
 */
export interface WindowSill {
  isFlagOn(flag: number): boolean;
}

/**
 * Content type enumeration wrapper
 */
export interface ContentType {
  isTypeOf(type: string): boolean;
}

/**
 * Signal interface for event handling
 */
export interface Signal {
  [key: string]: unknown;
}

/**
 * Context interface for managing objects
 */
export interface Context {
  objectMap: Map<string, CornerWindow>;
  dirtyObjectMap: Map<string, unknown>;
}

/**
 * Parametric model interface
 */
export interface ParametricModel {
  entity: Entity;
  geometryDirty: boolean;
  updated: boolean;
  context: Context;
  onUpdate(): void;
  toGraphicsData(): GraphicsData | null;
  toGraphicsDataAsync(): Promise<GraphicsData | null>;
  clear(): void;
}

/**
 * Parent model interface
 */
export interface ParentModel {
  childNodes: Map<string, CornerWindow>;
}

/**
 * Event data for child removal
 */
export interface ChildRemovedEvent {
  data: {
    entity?: Entity;
  };
}

/**
 * Event data for parent replacement
 */
export interface ParentReplacedEvent {
  data: {
    newParent: Entity;
  };
}

/**
 * CornerWindow class - Manages corner window geometry and rendering
 * Extends BaseObject to provide parametric window model functionality
 */
export declare class CornerWindow extends BaseObject {
  /** Child parametric models contained within this corner window */
  childModels: ParametricModel[];
  
  /** Internal WebCAD document for model management */
  private _webCadDocument: WebCadDocument;
  
  /** Cached clip aid CSG geometry */
  private _clipAidCSGs?: ClipAidCSGCollection;

  /**
   * Creates a new CornerWindow instance
   * @param entity - The entity data for this window
   * @param context - Rendering context
   * @param parent - Parent model object
   */
  constructor(entity: Entity, context: Context, parent: ParentModel);

  /**
   * Creates a view model for a child entity
   * @param entity - Child entity to create view model for
   */
  private _createViewModel(entity: Entity): void;

  /**
   * Handles child entity removal
   * @param event - Event data containing removed entity information
   */
  onChildRemoved(event: ChildRemovedEvent): void;

  /**
   * Updates and retrieves room custom attributes
   * @returns Room custom attributes including room type
   */
  updateRoomCustomAttrs(): RoomCustomAttrs;

  /**
   * Converts window geometry to graphics data asynchronously
   * @returns Promise resolving to graphics data with meshes and objects
   */
  toGraphicsDataAsync(): Promise<GraphicsData>;

  /**
   * Converts window geometry to graphics data synchronously
   * @returns Graphics data with meshes and objects
   */
  toGraphicsData(): GraphicsData;

  /**
   * Updates geometry for all child models that are marked dirty
   */
  onUpdate(): void;

  /**
   * Retrieves or creates clip aid CSG geometry for collision detection
   * @returns Collection of CSG objects with bounding boxes
   */
  getClipAidCSGs(): ClipAidCSGCollection;

  /**
   * Creates clip aid CSG geometry from window holes
   * @returns Collection of CSG objects with bounding boxes
   */
  private _createClipAidCSGs(): ClipAidCSGCollection;

  /**
   * Generates a 3D mesh for bay window aid visualization
   * @param windowHole - Window hole entity
   * @param extrudeSettings - Extrusion settings for geometry
   * @param material - THREE.js material for the mesh
   * @param contentNode - Parent scene node
   * @returns Generated THREE.js mesh or undefined
   */
  private _getBayWindowAidMesh(
    windowHole: WindowHole,
    extrudeSettings: THREE.ExtrudeGeometryOptions,
    material: THREE.MeshBasicMaterial,
    contentNode: THREE.Object3D
  ): THREE.Mesh | undefined;

  /**
   * Handles parent entity replacement
   * @param event - Event data containing new parent information
   */
  onParentReplaced(event: ParentReplacedEvent): void;

  /**
   * Static method to extract hole loop geometry from window entity
   * @param windowEntity - Window entity containing profile data
   * @param windowHole - Window hole entity with profile information
   * @returns Array of 2D points defining the hole loop, or null if invalid
   */
  static getHoleLoop(
    windowEntity: Entity,
    windowHole: WindowHole
  ): THREE.Vector2[] | null;
}