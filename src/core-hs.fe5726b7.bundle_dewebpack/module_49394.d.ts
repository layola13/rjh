/**
 * PSegmentLoft module - Parametric segment loft geometry for architectural moldings
 * Handles 3D extrusion of profiles along a line segment with various orientations
 */

import { PMolding, PMolding_IO } from './PMolding';
import { Entity } from './Entity';
import { Material } from './Material';
import * as THREE from 'three';

/**
 * Serialization/deserialization handler for PSegmentLoft entities
 */
export declare class PSegmentLoft_IO extends PMolding_IO {
  /**
   * Serializes a PSegmentLoft instance to a plain object
   * @param entity - The PSegmentLoft entity to serialize
   * @param callback - Optional callback to customize serialization
   * @param includeDefaults - Whether to include default values
   * @param options - Additional serialization options
   * @returns Serialized data array
   */
  dump(
    entity: PSegmentLoft,
    callback?: (data: unknown[], entity: PSegmentLoft) => void,
    includeDefaults?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * Deserializes data into a PSegmentLoft instance
   * @param entity - The target PSegmentLoft entity
   * @param data - Serialized data object
   * @param context - Deserialization context containing state references
   */
  load(
    entity: PSegmentLoft,
    data: SerializedPSegmentLoft,
    context: DeserializationContext
  ): void;
}

/**
 * Serialized representation of a PSegmentLoft
 */
interface SerializedPSegmentLoft {
  XStart: string | number;
  YStart: string | number;
  ZStart: string | number;
  XEnd: string | number;
  YEnd: string | number;
  ZEnd: string | number;
  XLength: string | number;
  YLength: string | number;
  ZLength: string | number;
  [key: string]: unknown;
}

/**
 * Deserialization context with state management
 */
interface DeserializationContext {
  states: Record<string | number, StateField>;
  [key: string]: unknown;
}

/**
 * State field with binding capabilities
 */
interface StateField {
  id: string | number;
  __value?: number;
  bindObjectFieldChanged(obj: unknown, fieldName: string): void;
  unbindObject(obj: unknown): void;
}

/**
 * Profile metadata for segment loft
 */
interface ProfileMetadata {
  id: string;
  /** SVG path-like profile definition */
  profile: string;
  /** Profile width in X direction */
  profileSizeX: number;
  /** Profile height in Y direction */
  profileSizeY: number;
  /** Content type classification */
  contentType: ContentType;
}

/**
 * Content type for architectural elements
 */
interface ContentType {
  isTypeOf(type: string): boolean;
}

/**
 * Creation parameters for PSegmentLoft
 */
interface PSegmentLoftCreateParams {
  resource?: ProfileMetadata;
  material?: unknown;
  localId?: string;
}

/**
 * Transform data for segment positioning and orientation
 */
interface TransformData {
  /** World space start point */
  start: THREE.Vector3;
  /** World space end point */
  end: THREE.Vector3;
  /** Center point between start and end */
  originPoint: THREE.Vector3;
  /** Local to world transformation matrix */
  matrix: THREE.Matrix4;
  /** World to local transformation matrix */
  inverseMatrix: THREE.Matrix4;
  /** Start point in local coordinates */
  localStart: THREE.Vector3;
  /** End point in local coordinates */
  localEnd: THREE.Vector3;
  /** Euler rotation angles */
  euler: THREE.Euler;
  /** Rotation in degrees */
  rotationOfDeg: {
    x: number;
    y: number;
    z: number;
  };
}

/**
 * Bounding box dimensions
 */
interface Size {
  XLength: number;
  YLength: number;
  ZLength: number;
}

/**
 * Parametric segment loft - Extrudes a 2D profile along a line segment
 * Used for architectural moldings, tracks, mullions, and transoms
 */
export declare class PSegmentLoft extends PMolding {
  /** Start X coordinate in world space */
  XStart: number;
  /** Start Y coordinate in world space */
  YStart: number;
  /** Start Z coordinate in world space */
  ZStart: number;
  /** End X coordinate in world space */
  XEnd: number;
  /** End Y coordinate in world space */
  YEnd: number;
  /** End Z coordinate in world space */
  ZEnd: number;
  /** Total length in X direction */
  XLength: number;
  /** Total length in Y direction */
  YLength: number;
  /** Total length in Z direction */
  ZLength: number;

  /** Profile metadata resource */
  metadata: ProfileMetadata;
  /** Resource identifier */
  seekId: string;
  /** Material definition */
  material: Material;
  /** Local identifier */
  localId: string;
  /** Segment length */
  length: number;

  /** Internal state fields */
  __XStart: StateField;
  __YStart: StateField;
  __ZStart: StateField;
  __XEnd: StateField;
  __YEnd: StateField;
  __ZEnd: StateField;
  __XLength: StateField;
  __YLength: StateField;
  __ZLength: StateField;
  __XSize: StateField;
  __YSize: StateField;

  /**
   * @param name - Optional entity name
   * @param parent - Optional parent entity
   */
  constructor(name?: string, parent?: unknown);

  /**
   * Factory method to create a PSegmentLoft from parameters
   * @param params - Creation parameters with resource and material
   * @returns New PSegmentLoft instance
   */
  static create(params: PSegmentLoftCreateParams): PSegmentLoft;

  /**
   * Gets the path defining the segment centerline
   * @returns Array of path segments, each containing start and end points
   */
  getPaths(): THREE.Vector3[][];

  /**
   * Generates the 3D profile path from 2D profile definition
   * Transforms profile points into 3D space at the start position
   * @returns Array of 3D points defining the profile contour
   */
  getProfilePath(): THREE.Vector3[];

  /**
   * Gets the I/O handler for serialization
   * @returns Singleton instance of PSegmentLoft_IO
   */
  getIO(): PSegmentLoft_IO;

  /**
   * Handles field change notifications
   * @param fieldName - Name of the changed field
   * @param newValue - New field value
   * @param oldValue - Previous field value
   */
  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void;

  /**
   * Updates entity position and rotation based on start/end points
   * Recalculates derived properties (x, y, z, rotations, lengths)
   */
  updatePosition(): void;

  /**
   * Calculates transformation data from start/end points
   * Builds local coordinate system aligned with segment direction
   * @returns Complete transformation data
   */
  getTransformData(): TransformData;

  /**
   * Calculates bounding box dimensions
   * Dimensions vary based on content type (mullion vs track/transom)
   * @returns Size object with XLength, YLength, ZLength
   */
  getSize(): Size;

  /**
   * Generates profile transformation matrix based on content type
   * Different types (track, mullion, transom) require different orientations
   * @param metadata - Profile metadata with content type
   * @returns Transformation matrix for profile positioning
   */
  static getProfileTransformMatrixByContentType(
    metadata: ProfileMetadata
  ): THREE.Matrix4;

  /**
   * Returns array of supported content types for segment lofts
   * @returns Array of content type enum values
   */
  static getPSegmentLoftContentTypes(): string[];

  /** Signals geometry has changed */
  signalGeometryChanged: { dispatch(): void };
  /** Signals position has changed */
  signalPositionChanged: { dispatch(): void };
  /** Marks entity as needing update */
  dirty(): void;
  /** Defines a reactive state field */
  defineStateField(name: string, defaultValue: number): void;
}