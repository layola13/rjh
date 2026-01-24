/**
 * Body operator for managing 3D body entities and their faces in a CAD/BIM system.
 * Handles body creation, face management, and geometric operations.
 */

import type { Line2d, Loop, Vector2, Box3 } from './geometry';
import type { EntityObject, RoomObject } from './entities';
import type { FaceOperator } from './FaceOperator';
import type { Matrix4 } from './math';

/**
 * Face type enumeration for different sides of a body
 */
export enum EN_TYPE {
  EN_LEFT = 'left',
  EN_RIGHT = 'right',
  EN_FRONT = 'front',
  EN_BACK = 'back',
  EN_TOP = 'top',
  EN_BOTTOM = 'bottom',
}

/**
 * Face iteration mode
 */
export enum FaceIterationMode {
  /** Only bound faces */
  BOUND_ONLY = 1,
  /** Only inner faces */
  INNER_ONLY = 2,
  /** Both bound and inner faces */
  ALL = 3,
}

/**
 * Interface representing face data structure
 */
export interface IFace {
  faceId: string;
  type: EN_TYPE;
  entityId: number;
  bodyId: string;
  trimmed?: unknown;
  // Additional face properties...
}

/**
 * Interface representing body data structure
 */
export interface IBodyData {
  /** Unique identifier for the body */
  id: string;
  
  /** Whether the body is rigid */
  isRigid: boolean;
  
  /** Whether the body is fixed in space */
  isFixed: boolean;
  
  /** Whether this is a parametric model */
  isPmModel: boolean;
  
  /** Transformation matrix for the body */
  matrix?: Matrix4;
  
  /** Boundary faces of the body */
  boundFaces: FaceOperator[];
  
  /** Internal faces of the body (optional) */
  innerFaces?: FaceOperator[];
}

/**
 * Generic body interface
 */
export interface IBody {
  id: string;
  isRigid?: boolean;
  isFixed?: boolean;
  isPmModel?: boolean;
  matrix?: Matrix4;
  boundFaces: Array<FaceOperator | IFace>;
  innerFaces?: Array<FaceOperator | IFace>;
}

/**
 * Entity data structure for serialization
 */
export interface IEntityData {
  id: number | string;
  // Additional entity data properties...
}

/**
 * Operator class for managing 3D body geometry and topology.
 * Provides methods for creating, manipulating, and querying body entities
 * including their boundary and internal faces.
 */
export declare class BodyOperator {
  private bodyData: IBodyData;

  /**
   * Creates a new BodyOperator instance
   * @param bodyData - Initial body data
   */
  constructor(bodyData: IBodyData);

  /**
   * Factory method to create a BodyOperator from body data
   * @param bodyData - Body data structure
   * @returns New BodyOperator instance
   */
  static create(bodyData: IBodyData): BodyOperator;

  /**
   * Creates a BodyOperator from an entity object
   * @param entity - Source entity object
   * @param topParent - Top-level parent entity (optional)
   * @returns New BodyOperator instance
   */
  static createFromEntity(
    entity: EntityObject | RoomObject,
    topParent?: EntityObject
  ): BodyOperator;

  /**
   * Creates a BodyOperator from serialized entity data
   * @param entityData - Serialized entity data
   * @param topParent - Top-level parent entity
   * @returns New BodyOperator instance
   */
  static createFromEntityData(
    entityData: IEntityData,
    topParent: EntityObject
  ): BodyOperator;

  /**
   * Creates a body from an entity, handling parametric models
   * @param entity - Source entity
   * @param topParent - Top-level parent entity (optional)
   * @returns New BodyOperator instance
   */
  static createBody(
    entity: EntityObject,
    topParent?: EntityObject
  ): BodyOperator;

  /**
   * Creates a BodyOperator from an existing IBody interface
   * @param body - Source body interface
   * @returns New BodyOperator instance
   */
  static createFrom(body: IBody): BodyOperator;

  /**
   * Converts IBody interface to internal body data scheme
   * @param body - Source body interface
   * @returns Body data scheme
   */
  static getSchemeFromIBody(body: IBody): IBodyData;

  /**
   * Type guard to check if an object is a BodyOperator
   * @param obj - Object to check
   * @returns True if object is BodyOperator
   */
  static isBodyOperator(obj: unknown): obj is BodyOperator;

  /**
   * Converts an IBody or BodyOperator to BodyOperator
   * @param body - Source body
   * @returns BodyOperator instance
   */
  static toBodyOperator(body: IBody | BodyOperator): BodyOperator;

  /**
   * Converts an array of bodies to BodyOperators
   * @param bodies - Array of bodies
   * @returns Array of BodyOperator instances
   */
  static toBodyOperators(bodies: Array<IBody | BodyOperator>): BodyOperator[];

  /**
   * Converts BodyOperator to plain IBodyData object
   * @param bodyOperator - Source body operator
   * @returns Plain body data object
   */
  static toIBodyData(bodyOperator: BodyOperator): IBodyData;

  /**
   * Finds the starting index in a collection based on distance to origin
   * @param collection - Array of objects with getStartPt method
   * @returns Index of the starting element, or -1 if empty
   */
  static getStartIndex(collection: Array<{ getStartPt(): { x: number; y: number } }>): number;

  /**
   * Creates face operators for all faces of a body entity
   * @param entity - Source entity
   * @param topParent - Top-level parent entity (optional)
   * @param bodyId - Body identifier (optional)
   * @returns Array of face operators
   */
  static createBodyFaces(
    entity: EntityObject | RoomObject,
    topParent?: EntityObject,
    bodyId?: string
  ): FaceOperator[];

  /**
   * Creates face operators from serialized entity data
   * @param entityData - Serialized entity data
   * @param topParent - Top-level parent entity
   * @param bodyId - Body identifier (optional)
   * @returns Array of face operators
   */
  static createBodyFacesFromEntityData(
    entityData: IEntityData,
    topParent: EntityObject,
    bodyId?: string
  ): FaceOperator[];

  /**
   * Creates an internal face for a body
   * @param body - Target body operator
   * @param entity - Source entity
   * @param faceType - Type of face to create
   * @param topParent - Top-level parent entity (optional)
   * @returns Created face operator
   */
  static createInnerFaceForBody(
    body: BodyOperator,
    entity: EntityObject,
    faceType: EN_TYPE,
    topParent?: EntityObject
  ): FaceOperator;

  /**
   * Extracts body ID from a body entity
   * @param entity - Entity object or entity ID
   * @returns Body identifier string
   */
  static getBodyIdFromBodyEntity(entity: EntityObject | number | string): string;

  /**
   * Gets body ID from an entity, handling parametric models
   * @param entity - Source entity
   * @returns Body identifier string
   */
  static getBodyId(entity: EntityObject): string;

  /**
   * Converts this operator to IBody interface
   * @returns Body interface object
   */
  toIBody(): IBodyData;

  /** Body unique identifier */
  get id(): string;

  /** Transformation matrix */
  get matrix(): Matrix4 | undefined;

  /** Whether the body is rigid */
  get isRigid(): boolean;

  /** Whether the body is fixed */
  get isFixed(): boolean;

  /** Whether this is a parametric model */
  get isPmModel(): boolean;

  /** Boundary faces */
  get boundFaces(): FaceOperator[];

  /** Internal faces */
  get innerFaces(): FaceOperator[] | undefined;

  /** Entity ID as number */
  get entityId(): number;

  /**
   * Adds an internal face to the body
   * @param face - Face operator to add
   */
  addInnerFace(face: FaceOperator): void;

  /**
   * Iterates over faces with a callback
   * @param callback - Function to call for each face. Return true to stop iteration.
   * @param mode - Iteration mode (bound only, inner only, or all faces)
   * @returns True if iteration was stopped early
   */
  forEachFace(
    callback: (face: FaceOperator) => boolean | void,
    mode?: FaceIterationMode
  ): boolean;

  /**
   * Finds a face matching a predicate
   * @param predicate - Function to test each face
   * @param mode - Search mode (bound only, inner only, or all faces)
   * @returns First matching face or undefined
   */
  findFace(
    predicate: (face: FaceOperator) => boolean,
    mode?: FaceIterationMode
  ): FaceOperator | undefined;

  /**
   * Checks if body has a face with given ID
   * @param faceId - Face identifier
   * @param mode - Search mode
   * @returns True if face exists
   */
  hasFace(faceId: string, mode?: FaceIterationMode): boolean;

  /**
   * Gets a face by its ID
   * @param faceId - Face identifier
   * @param mode - Search mode
   * @returns Face operator or undefined
   */
  getFaceByFaceId(faceId: string, mode?: FaceIterationMode): FaceOperator | undefined;

  /**
   * Calculates the bounding box of the body
   * @param transformMatrix - Optional transformation matrix to apply
   * @returns Bounding box
   */
  getBoundingBox(transformMatrix?: Matrix4): Box3;

  /**
   * Checks if a face is an internal face
   * @param faceId - Face identifier
   * @returns True if face is internal
   */
  isInnerFace(faceId: string): boolean;

  /**
   * Gets an internal face by ID
   * @param faceId - Face identifier
   * @returns Face operator or undefined
   */
  getInnerFace(faceId: string): FaceOperator | undefined;

  /**
   * Updates body data from an IBody interface
   * @param body - Source body interface
   */
  updateFromIBody(body: IBody): void;

  /**
   * Updates body from entity, refreshing face data
   * @param entity - Source entity
   * @param topParent - Top-level parent entity (optional)
   * @param entityMap - Map of entities by ID (optional)
   */
  updateFromEntity(
    entity: EntityObject,
    topParent?: EntityObject,
    entityMap?: Map<string, EntityObject>
  ): void;

  /**
   * Logs body face information for debugging
   */
  log(): void;

  /**
   * Logs boundary faces for debugging
   */
  logBoundFaces(): void;

  /**
   * Gets the bounding box containing all faces
   * @returns Bounding box
   */
  getBox(): Box3;
}