/**
 * Solver module for constraint-based spatial layout solving.
 * Manages bodies, constraints, and solves spatial relationships between entities.
 */

import type { Matrix4 } from 'three';
import type { InnerSpaceSolver, IBody, EN_SOLVE_RESULT } from './inner-space-solver';
import type { HSCore } from './hs-core';
import type { GroupObject } from './group-object';

/**
 * Face type enum representing different faces of a 3D entity
 */
export enum FaceType {
  Front = 'front',
  Back = 'back',
  Left = 'left',
  Right = 'right',
  Top = 'top',
  Bottom = 'bottom'
}

/**
 * Constraint type enum for spatial relationships
 */
export enum ConstraintType {
  Distance = 'distance',
  Alignment = 'alignment',
  Fixed = 'fixed'
}

/**
 * 3D vector/size representation
 */
export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Entity in the 3D space (furniture, wall, etc.)
 */
export interface Entity {
  id: string;
  x: number;
  y: number;
  z: number;
  XLength: number;
  YLength: number;
  ZLength: number;
  content: Vector3D;
  members?: Entity[];
  spaceConstraint?: SpaceConstraint;
}

/**
 * Space constraint definition for an entity
 */
export interface SpaceConstraint {
  bodyId: string;
  constraints: Record<FaceType, Constraint>;
}

/**
 * Face key identifying a specific face
 */
export interface FaceKey {
  faceId: string;
  bodyId: string;
}

/**
 * Constraint between two faces
 */
export interface Constraint {
  /** Reference face this constraint is relative to */
  refFace: FaceKey;
  /** Type of constraint */
  constraintType: ConstraintType;
  /** Constraint value (e.g., distance in mm) */
  value: string;
  /** Additional user data */
  userData: {
    /** Dimension position on the face (normalized 0-1) */
    dimPos: {
      x: number;
      y: number;
    };
  };
}

/**
 * 3D surface representation
 */
export interface Surface {
  /** Get the normal vector of the surface */
  getNorm(): Vector3D;
  /** Get the origin point of the surface */
  getOrigin(): Vector3D;
  /** Get distance from surface to a point */
  distanceToPoint(point: Vector3D): number;
  /** Get a point at normalized coordinates on the surface */
  getPtAt(coords: { x: number; y: number }): Vector3D | null;
  /** Project a point onto this surface */
  getProjectedPtBy(point: Vector3D): Vector3D | null;
}

/**
 * Face of a body
 */
export interface Face {
  faceId: string;
  entityId: string;
  type: FaceType;
  surface: Surface;
}

/**
 * 3D bounding box
 */
export interface BoundingBox {
  min: Vector3D;
  max: Vector3D;
}

/**
 * Body operator - represents a physical entity with faces and constraints
 */
export interface BodyOperator {
  id: string;
  boundFaces: Set<Face>;
  
  /** Convert to solver's internal body representation */
  toIBody(): IBody;
  
  /** Update from solver's internal body representation */
  updateFromIBody(body: IBody): void;
  
  /** Update from entity data */
  updateFromEntity(entity: Entity, root: Entity, flatEntities: Map<string, Entity>): void;
  
  /** Get face by face ID */
  getFaceByFaceId(faceId: string): Face | undefined;
  
  /** Find face by predicate */
  findFace(predicate: (face: Face) => boolean): Face | undefined;
  
  /** Get bounding box of the body */
  getBoundingBox(): BoundingBox | null;
}

/**
 * Locked space constraint between two faces
 */
export interface LockedSpace {
  face: Face;
  refFace: Face;
}

/**
 * Model change result after solving
 */
export interface ModelChangedProperty {
  entity: Entity;
  position: Vector3D;
}

/**
 * Dimension visualization data
 */
export interface DimensionData {
  /** Start and end points of dimension line */
  pos: [Vector3D, Vector3D];
  /** Unique key for the dimension */
  key: string;
  /** Entities involved in this dimension */
  faceEntities: [Entity, Entity];
}

/**
 * Main solver class for spatial constraint resolution.
 * Manages bodies (3D entities), constraints (spatial relationships), and solves layouts.
 */
export declare class Solver {
  /** Map of body ID to body operator */
  private bodys: Map<string, BodyOperator>;
  
  /** Map of face ID to constraint */
  private constraints: Map<string, Constraint>;
  
  /** Set of newly added entities */
  private newAddeds: Set<Entity>;
  
  /** Map of locked space constraints */
  private lockedSpaces: Map<string, LockedSpace>;
  
  /** Map of fixed sizes for entities */
  private fixedSizeMap: Map<Entity, Partial<Vector3D>>;
  
  /** Root entity of the scene */
  private root: Entity;
  
  /** Flat map of all entities by ID */
  private flatEntities: Map<string, Entity>;
  
  /** Original entity data dumps before solving */
  private originDumps?: Map<string, Entity>;

  /**
   * Creates a new Solver instance
   * @param root - Root entity containing the entire scene hierarchy
   */
  constructor(root: Entity);

  /**
   * Set original entity dumps for reference
   * @param dumps - Map of entity ID to original entity data
   * @returns This solver instance for chaining
   */
  setOriginDumps(dumps: Map<string, Entity>): this;

  /**
   * Solve all constraints in the scene.
   * Updates entity positions and sizes to satisfy spatial constraints.
   */
  solve(): Promise<void>;

  /**
   * Check if an entity face has any constraint
   * @param entity - Target entity
   * @param faceType - Face type to check
   * @returns True if constraint exists
   */
  hasConstraint(entity: Entity, faceType: FaceType): boolean;

  /**
   * Check if two entity faces have a constraint relationship
   * @param entity1 - First entity
   * @param faceType1 - First entity's face type
   * @param entity2 - Second entity
   * @param faceType2 - Second entity's face type
   * @returns True if constraint exists between the faces
   */
  hasConstraintWith(
    entity1: Entity,
    faceType1: FaceType,
    entity2: Entity,
    faceType2: FaceType
  ): boolean;

  /**
   * Check if two entity faces have bidirectional constraint
   * @param entity1 - First entity
   * @param faceType1 - First entity's face type
   * @param entity2 - Second entity
   * @param faceType2 - Second entity's face type
   * @returns True if constraint exists in either direction
   */
  isTwoEntityFaceHasConstraint(
    entity1: Entity,
    faceType1: FaceType,
    entity2: Entity,
    faceType2: FaceType
  ): boolean;

  /**
   * Add a distance constraint between two entity faces
   * @param entity1 - First entity
   * @param faceType1 - First entity's face type
   * @param entity2 - Second entity (reference)
   * @param faceType2 - Second entity's face type
   * @param autoSelect - Auto-select closest matching face
   * @returns Created constraint or undefined if failed
   */
  addEntityFaceConstraint(
    entity1: Entity,
    faceType1: FaceType,
    entity2: Entity,
    faceType2: FaceType,
    autoSelect?: boolean
  ): Constraint | undefined;

  /**
   * Add a body to the solver
   * @param body - Body operator to add
   */
  addBody(body: BodyOperator): void;

  /**
   * Add a constraint to the solver
   * @param faceId - Face ID to attach constraint to
   * @param constraint - Constraint definition
   */
  addConstraint(faceId: string, constraint: Constraint): void;

  /**
   * Get constraint by face ID
   * @param faceId - Face ID
   * @returns Constraint or undefined
   */
  getConstraint(faceId: string): Constraint | undefined;

  /**
   * Delete a constraint
   * @param faceId - Face ID of the constraint to delete
   */
  deleteConstraint(faceId: string): void;

  /**
   * Get entity by ID
   * @param id - Entity ID
   * @returns Entity or undefined
   */
  getEntityById(id: string): Entity | undefined;

  /**
   * Extract and flatten all entities from the scene hierarchy
   * @returns Flat map of entity ID to entity
   */
  extractFlatEntities(): Map<string, Entity>;

  /**
   * Extract bodies and constraints from all entities
   */
  private extractBodysAndConstraints(): void;

  /**
   * Extract locked space constraints (constraints that define enclosed spaces)
   */
  private extractLockedSpaceConstraints(): void;

  /**
   * Get or create a body by body ID
   * @param bodyId - Body ID
   * @returns Body operator or undefined
   */
  private bodyGetter(bodyId: string): BodyOperator | undefined;

  /**
   * Get or create a face from a body
   * @param faceId - Face ID
   * @param body - Body operator
   * @returns Face or undefined
   */
  private faceGetter(faceId: string, body: BodyOperator): Face | undefined;

  /**
   * Get existing body by ID
   * @param bodyId - Body ID
   * @returns Body operator or undefined
   */
  private getBodyByBodyId(bodyId: string): BodyOperator | undefined;

  /**
   * Create a new body from entity
   * @param bodyId - Body ID (same as entity ID)
   * @returns Created body operator or undefined
   */
  private createBodyByBodyId(bodyId: string): BodyOperator | undefined;

  /**
   * Get face from body by face ID
   * @param faceId - Face ID
   * @param body - Body operator
   * @returns Face or undefined
   */
  private getFaceFromBody(faceId: string, body: BodyOperator): Face | undefined;

  /**
   * Create an inner face for a body (for internal constraints)
   * @param body - Body operator
   * @param faceId - Face ID
   * @returns Created face or undefined
   */
  private createBodyInnerFace(body: BodyOperator, faceId: string): Face | undefined;

  /**
   * Reset sizes of entities in locked spaces to their original values
   */
  private resetSizeInLockedSpace(): Promise<void>;

  /**
   * Update model entities based on solved body positions
   * @param bodies - Solved bodies from the solver
   * @returns Updated bodies for further processing
   */
  private updateModelByBodys(bodies: IBody[]): Promise<IBody[]>;

  /**
   * Update body operators from solver's internal body representations
   * @param bodies - Internal body representations
   * @returns Updated body operators
   */
  private updateBodyOpertorFromIBodys(bodies: IBody[]): BodyOperator[];

  /**
   * Update all bodies from current entity states
   */
  private updateBodys(): void;

  /**
   * Export dimension data for visualization
   * @returns Array of dimension data for rendering
   */
  exportDimensionData(): DimensionData[];
}