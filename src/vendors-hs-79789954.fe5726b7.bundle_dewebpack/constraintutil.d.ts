/**
 * Constraint utility for managing spatial constraints on 3D entities
 * Handles body/face ID conversions and constraint operations
 */

import { EN_TYPE } from './enum-types';
import { Loop, Vector2 } from './geometry';

/**
 * Face information extracted from face ID
 */
export interface FaceInfo {
  /** Entity ID */
  id: number;
  /** Face type identifier */
  type: string;
}

/**
 * Spatial constraint configuration for an entity
 */
export interface SpaceConstraint {
  /** Body identifier */
  bodyId: string;
  /** Map of constraint ID to constraint data */
  constraints: Record<string, ConstraintData>;
}

/**
 * Constraint data structure
 */
export interface ConstraintData {
  /** Reference face information */
  refFace: RefFaceData;
  [key: string]: unknown;
}

/**
 * Reference face data in constraints
 */
export interface RefFaceData {
  /** Face identifier */
  faceId: string;
  /** Body identifier */
  bodyId?: string;
  [key: string]: unknown;
}

/**
 * Entity with constraint support
 */
export interface BodyEntity {
  /** Entity ID */
  id: number;
  /** Spatial constraint configuration */
  spaceConstraint?: SpaceConstraint;
  /** Set spatial constraint on entity */
  setSpaceConstraint(constraint: SpaceConstraint): void;
}

/**
 * ID mapping for entity updates
 */
export type EntityIdMap = Map<number, number>;

/**
 * Geometric segment with spatial properties
 */
export interface GeometricSegment {
  /** Get start point of segment */
  getStartPt(): Vector2;
  /** Clone segment */
  clone(): GeometricSegment;
  /** Translate segment by vector */
  translate(offset: Vector2): GeometricSegment;
}

/**
 * Utility class for managing spatial constraints on 3D entities
 * Provides methods for ID conversions, constraint operations, and geometry analysis
 */
export declare class ConstraintUtil {
  /**
   * Convert body entity to string body ID
   * @param entity - Entity ID or entity object
   * @returns String representation of body ID
   */
  static getBodyIdFromBodyEntity(entity: number | BodyEntity): string;

  /**
   * Extract numeric entity ID from body ID string
   * @param bodyId - String body identifier
   * @returns Numeric entity ID
   */
  static getEntityIdFromBodyId(bodyId: string): number;

  /**
   * Generate face ID from entity and face type
   * @param entity - Entity ID or entity object
   * @param faceType - Face type identifier
   * @returns Composite face ID string
   */
  static getFaceIdByEntityAndFaceType(entity: number | BodyEntity, faceType: string): string;

  /**
   * Extract entity ID from face ID string
   * @param faceId - Composite face identifier
   * @returns Entity ID or 0 if invalid
   */
  static getEntityIdFromFaceId(faceId: string): number;

  /**
   * Extract face type from face ID string
   * @param faceId - Composite face identifier
   * @returns Face type or default EN_LEFT
   */
  static getFaceTypeFromFaceId(faceId: string): string;

  /**
   * Parse face ID into structured face information
   * @param faceId - Composite face identifier
   * @returns Face info object or null if invalid
   */
  static getFaceInfoFromFaceId(faceId: string): FaceInfo | null;

  /**
   * Add or update a constraint on an entity
   * @param entity - Target entity
   * @param constraintId - Constraint identifier
   * @param constraintData - Constraint configuration data
   */
  static addConstraintToEntity(entity: BodyEntity, constraintId: string, constraintData: ConstraintData): void;

  /**
   * Remove a constraint from an entity
   * @param entity - Target entity
   * @param constraintId - Constraint identifier to remove
   */
  static deleteConstraintOnEntity(entity: BodyEntity, constraintId: string): void;

  /**
   * Update reference IDs in multiple constraints based on ID mapping
   * @param constraints - Array of constraint configurations
   * @param idMap - Mapping of old IDs to new IDs
   */
  static updateConstraintsRefIds(constraints: SpaceConstraint[], idMap: EntityIdMap): void;

  /**
   * Update reference IDs in a single constraint based on ID mapping
   * @param constraint - Constraint configuration
   * @param idMap - Mapping of old IDs to new IDs
   */
  static updateConstraintRefIds(constraint: SpaceConstraint, idMap: EntityIdMap): void;

  /**
   * Update body ID in constraint using ID mapping
   * @param constraint - Constraint with bodyId property
   * @param idMap - Mapping of old IDs to new IDs
   * @returns Updated constraint object
   */
  static updateBodyId(constraint: { bodyId: string }, idMap: EntityIdMap): { bodyId: string };

  /**
   * Update face ID in reference face using ID mapping
   * @param refFace - Reference face data
   * @param idMap - Mapping of old IDs to new IDs
   * @returns Updated reference face object
   */
  static updateFaceId(refFace: RefFaceData, idMap: EntityIdMap): RefFaceData;

  /**
   * Find starting index of outermost floor boundary segment
   * Identifies segment closest to bounding box minimum point
   * @param segments - Array of geometric segments
   * @returns Index of outer start segment, or -1 if empty
   */
  static getFloorOuterStartIndex(segments: GeometricSegment[]): number;
}