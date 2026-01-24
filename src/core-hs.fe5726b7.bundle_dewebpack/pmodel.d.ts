/**
 * PModel Module - 3D Cabinet Model for WebCAD Graphics System
 * 
 * This module defines the PModel class which extends CabinetBase to handle
 * 3D model entities with materials, positioning, and geometry in a CAD environment.
 * 
 * @module PModel
 * @see CabinetBase
 */

import { PMolding } from './PMolding';
import { PAssembly } from './PAssembly';
import { CabinetBase } from './CabinetBase';

declare namespace HSCore.Model {
  /**
   * Entity flag enumeration for visibility and state control
   */
  enum EntityFlagEnum {
    /** Entity is hidden from view */
    hidden = 'hidden',
    /** Entity has been removed/deleted */
    removed = 'removed'
  }
}

declare namespace HSCore.Util {
  /**
   * Matrix transformation utilities for 3D entities
   */
  class Matrix3DHandler {
    /**
     * Converts entity transformation to THREE.js Matrix4
     * @param entity - The entity to extract matrix from
     * @returns THREE.Matrix4 transformation matrix
     */
    static getMatrix4(entity: any): THREE.Matrix4;
  }

  namespace Math {
    /** Default tolerance for geometric comparisons */
    const defaultTolerance: number;
  }
}

declare namespace HSConstants {
  /**
   * Graphics object type enumeration
   */
  enum GraphicsObjectType {
    /** 3D mesh object */
    Mesh = 'Mesh'
  }
}

declare namespace HSCatalog {
  /**
   * Content type enumeration for cabinet components
   */
  enum ContentTypeEnum {
    /** Countertop component */
    Countertop = 'Countertop',
    /** Light molding component */
    LightMolding = 'LightMolding'
  }
}

/**
 * Entity change event type enumeration
 */
declare namespace EntityEventType {
  const Material: string;
  const Position: string;
  const Geometry: string;
}

/**
 * Custom attributes for graphics objects
 */
interface GraphicsCustomAttributes {
  /** Room type identifier combined with room ID */
  roomType: string;
  /** Room area in square units */
  roomArea: number;
  /** Object type classification */
  type: 'Cabinet' | 'Cabinet/LightBand' | string;
  /** Light band index for light strip components */
  lightBandIndex?: number;
}

/**
 * Material definition for rendering
 */
interface MaterialObject {
  /** Diffuse map UV transformation matrix */
  diffuseMapUvTransform: THREE.Matrix3;
  /** Normal map UV transformation matrix */
  normalMapUvTransform: THREE.Matrix3;
  /** Material texture offset X */
  offsetX?: number;
  /** Material texture offset Y */
  offsetY?: number;
  /** Material texture flip on X axis */
  flipX?: boolean;
  /** Material texture flip on Y axis */
  flipY?: boolean;
  /** Material texture tile size on X axis */
  tileSize_x?: number;
  /** Material texture tile size on Y axis */
  tileSize_y?: number;
  /** Material texture rotation in degrees */
  rotation?: number;
  /** Material texture rotation in degrees (alternative) */
  textureRotation?: number;
}

/**
 * Mesh definition data structure
 */
interface MeshDefinition {
  /** Unique mesh identifier */
  meshKey: string;
  /** Vertex position array (flat x,y,z coordinates) */
  vertexPositions: number[];
  /** Custom mesh data */
  customData?: {
    /** Face material identifier */
    faceMaterialId?: string;
    /** UV center point for texture transformations */
    uvCenter?: { x: number; y: number };
  };
  /** Sketch model metadata */
  sketchModelData?: {
    /** Sketch element type */
    type: 'FACE' | string;
  };
}

/**
 * Graphics object definition
 */
interface GraphicsObject {
  /** Unique path identifier for the graphics object */
  graphicsPath: string;
  /** Reference to mesh definition key */
  mesh: string;
  /** Material properties for rendering */
  material: MaterialObject;
  /** Entity ID reference */
  entityId: string;
  /** Graphics object type */
  type: HSConstants.GraphicsObjectType;
  /** Visibility flag */
  visible: boolean;
  /** Position in 3D space [x, y, z] */
  position: Float32Array;
  /** Rotation quaternion [x, y, z, w] */
  rotation: Float32Array;
  /** Scale factors [x, y, z] */
  scale: Float32Array;
  /** Custom rendering attributes */
  customAttrs: GraphicsCustomAttributes;
}

/**
 * Graphics data return structure
 */
interface GraphicsData {
  /** Array of mesh definitions */
  meshDefs: MeshDefinition[];
  /** Array of graphics objects to render */
  objects: GraphicsObject[];
}

/**
 * Entity dirty event data
 */
interface EntityDirtyEventData {
  /** Event data payload */
  data: {
    /** Type of entity change */
    type: string;
  };
}

/**
 * Room entity interface
 */
interface RoomEntity {
  /** Room type classification */
  roomType?: string;
  /** Unique room identifier */
  ID: string;
}

/**
 * Parent entity relationship
 */
interface ParentEntity {
  /** Flip transformation flag */
  flip?: boolean;
  /** Content type of parent */
  contentType?: {
    /**
     * Check if content type matches
     * @param type - Type to check against
     * @returns True if types match
     */
    isTypeOf(type: HSCatalog.ContentTypeEnum): boolean;
  };
}

/**
 * Base entity interface
 */
interface Entity {
  /** Unique entity identifier */
  ID: string;
  /** Entity material properties */
  material: MaterialObject;
  /** Entity X dimension */
  XSize: number;
  /** Entity Y dimension */
  YSize: number;
  /** Local identifier within assembly */
  localId?: string;
  /** Parent entity relationships */
  parents?: Record<string, ParentEntity>;
  /** Content type of entity */
  contentType?: {
    /**
     * Check if content type matches
     * @param type - Type to check against
     * @returns True if types match
     */
    isTypeOf(type: HSCatalog.ContentTypeEnum): boolean;
  };
  
  /**
   * Check if entity has specific flag enabled
   * @param flag - Flag to check
   * @returns True if flag is on
   */
  isFlagOn(flag: HSCore.Model.EntityFlagEnum): boolean;
  
  /**
   * Get unique parent entity
   * @returns Parent entity or undefined
   */
  getUniqueParent(): (PMolding | PAssembly) | undefined;
}

/**
 * WebCAD document interface
 */
interface WebCadDocument {
  /**
   * Get graphics data for rendering
   * @returns Array of mesh definitions
   */
  getGraphicsData(): MeshDefinition[];
}

/**
 * Signal hook for event management
 */
interface SignalHook {
  /**
   * Listen to a signal and bind callback
   * @param signal - Signal to listen to
   * @param callback - Callback function to execute
   */
  listen(signal: any, callback: () => void): void;
}

/**
 * PModel - 3D Cabinet Model Class
 * 
 * Handles 3D cabinet model entities including material management,
 * position tracking, geometry updates, and graphics data generation
 * for rendering in a WebCAD environment.
 * 
 * @extends CabinetBase
 */
export declare class PModel extends CabinetBase {
  /** Signal hook for event subscription */
  protected signalHook: SignalHook;
  
  /** Reference to the WebCAD document */
  protected _webCadDocument?: WebCadDocument;
  
  /** The entity this model represents */
  protected entity: Entity;
  
  /**
   * Creates a new PModel instance
   * 
   * @param entity - The entity this model represents
   * @param webCadDocument - Reference to the WebCAD document
   * @param additionalParam - Additional configuration parameter
   */
  constructor(entity: Entity, webCadDocument: WebCadDocument, additionalParam: any);
  
  /**
   * Called on each update cycle
   * Override this method to implement custom update logic
   */
  onUpdate(): void;
  
  /**
   * Get snapping face keys for this model
   * @returns Array of face key strings
   */
  protected get snappingFaceKeys(): string[];
  
  /**
   * Get original paths for geometry
   * @returns Array of 3D vector arrays representing paths
   */
  protected get originalPaths(): THREE.Vector3[][];
  
  /**
   * Get the host room for an entity
   * @param entity - Entity to find room for
   * @returns Room entity or undefined
   */
  protected getHostRoom(entity: Entity): RoomEntity | undefined;
  
  /**
   * Handle material change events
   * Triggers entity dirty notification with Material event type
   * @private
   */
  private _onMaterialDirty(): void;
  
  /**
   * Handle position change events
   * Triggers entity dirty notification with Position event type
   * @private
   */
  private _onPositionDirty(): void;
  
  /**
   * Handle geometry change events
   * Triggers entity dirty notification with Geometry event type
   * @private
   */
  private _onGeometryDirty(): void;
  
  /**
   * Notify that entity has been modified
   * @param eventData - Event data describing the change
   * @private
   */
  private _entityDirtied(eventData: EntityDirtyEventData): void;
  
  /**
   * Convert model to graphics data for rendering
   * 
   * Generates mesh definitions and graphics objects including:
   * - Mesh geometry and materials
   * - Transformations (position, rotation, scale)
   * - Room associations
   * - UV mapping and texture transformations
   * - Special handling for moldings and light strips
   * 
   * @returns Graphics data containing mesh definitions and objects
   */
  toGraphicsData(): GraphicsData;
}

/**
 * Utility functions for room operations
 */
declare namespace RoomUtil {
  /**
   * Calculate room area
   * @param room - Room entity
   * @returns Area in square units
   */
  function getArea(room: RoomEntity): number;
}

/**
 * Utility functions for graphics and materials
 */
declare namespace Util {
  /**
   * Handle special material processing for moldings
   * @param material - Original material
   * @param entity - Entity to apply material to
   * @param xSize - X dimension
   * @param ySize - Y dimension
   * @returns Processed material object
   */
  function dealMoldingMaterial(
    material: MaterialObject,
    entity: Entity,
    xSize: number,
    ySize: number
  ): MaterialObject;
  
  /**
   * Get mesh definition from FGI data
   * @param meshData - Source mesh data
   * @returns Mesh definition
   */
  function getFgiMeshDef(meshData: MeshDefinition): MeshDefinition;
  
  /**
   * Get material object from material properties
   * @param material - Material properties
   * @returns Material object for rendering
   */
  function getMaterialObject(material: MaterialObject): MaterialObject;
  
  /**
   * Set graphics material parameters
   * @param materialObject - Target material object
   * @param material - Source material properties
   * @param entity - Entity context
   * @param isProfileMaterial - Whether this is a profile material
   * @param isMolding - Whether entity is a molding
   * @returns Updated material object
   */
  function setGraphicMaterialParam(
    materialObject: MaterialObject,
    material: MaterialObject,
    entity: Entity,
    isProfileMaterial: boolean,
    isMolding: boolean
  ): MaterialObject;
}

/**
 * Geometric vector utilities
 */
declare namespace GeLib.VectorUtils {
  /**
   * Check if two points are equal within tolerance
   * @param point1 - First point
   * @param point2 - Second point
   * @param tolerance - Comparison tolerance
   * @returns True if points are equal
   */
  function isPointEqual(
    point1: THREE.Vector3,
    point2: THREE.Vector3,
    tolerance: number
  ): boolean;
}