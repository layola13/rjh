/**
 * Module: NCustomizedCeilingModel_IO
 * Provides input/output handling and model definition for customized ceiling entities.
 */

import { NCustomizedSketchModel_IO, NCustomizedSketchModel } from './NCustomizedSketchModel';
import { Entity } from './Entity';
import { Vector3, Matrix4 } from './Math';
import { MaterialUtil } from './MaterialUtil';

/**
 * Options for dump operation
 */
interface DumpOptions {
  [key: string]: unknown;
}

/**
 * Options for load operation
 */
interface LoadOptions {
  [key: string]: unknown;
}

/**
 * Callback function type for post-dump processing
 */
type DumpCallback = (dumpedData: unknown, model: NCustomizedCeilingModel) => void;

/**
 * Represents face bounds information including outer loop, holes, and height
 */
interface FaceInfo {
  /** Discrete points defining the outer boundary */
  outer: Vector2[];
  /** Array of discrete points for each hole in the face */
  holes: Vector2[][];
  /** Extrusion height of the face */
  height: number;
}

/**
 * Sketch face bounds information
 */
interface SketchBoundsInfo {
  /** Bounding box [x, y, width, height] */
  sketchBound: [number, number, number, number] | null;
  /** Maximum extrusion value */
  maxValue: number;
}

/**
 * Projection plane result for face rendering
 */
interface ProjectionPlane {
  /** X-ray rendering settings */
  xRay: {
    negate(): void;
  };
  [key: string]: unknown;
}

/**
 * Input/Output handler for NCustomizedCeilingModel.
 * Manages serialization and deserialization of ceiling model data.
 */
export declare class NCustomizedCeilingModel_IO extends NCustomizedSketchModel_IO {
  /**
   * Gets the singleton instance of this IO handler
   */
  static instance(): NCustomizedCeilingModel_IO;

  /**
   * Serializes a ceiling model to a data structure
   * @param model - The model to dump
   * @param callback - Optional callback to post-process dumped data
   * @param includeChildren - Whether to include child entities
   * @param options - Additional dump options
   * @returns Serialized model data
   */
  dump(
    model: NCustomizedCeilingModel,
    callback?: DumpCallback,
    includeChildren?: boolean,
    options?: DumpOptions
  ): unknown;

  /**
   * Deserializes data into a ceiling model
   * @param data - The data to load
   * @param model - The target model instance
   * @param options - Additional load options
   */
  load(data: unknown, model: NCustomizedCeilingModel, options?: LoadOptions): void;
}

/**
 * Represents a customized ceiling model with sketch-based geometry.
 * Handles ceiling-specific behaviors like content attachment and mirroring.
 */
export declare class NCustomizedCeilingModel extends NCustomizedSketchModel {
  /**
   * Creates a new customized ceiling model
   * @param id - Unique identifier for the model
   * @param parent - Optional parent entity
   */
  constructor(id?: string, parent?: Entity);

  /**
   * Called when the underlying sketch changes.
   * Triggers repositioning of attached contents.
   * @param changeType - Type of sketch modification
   */
  protected onSketchDirty(changeType: string): void;

  /**
   * Moves attached content based on property changes.
   * For z or sketch changes, repositions contents to match face heights.
   * @param propertyName - Name of the changed property
   * @param value - New value of the property
   */
  protected moveAttachedContents(propertyName: string, value?: unknown): void;

  /**
   * Initializes content positions based on sketch face boundaries.
   * Calculates model dimensions and position from sketch geometry.
   */
  initializeContentPositionBySketch(): void;

  /**
   * Computes the transformation matrix for sketch coordinates to world space.
   * Includes mirroring and translation based on sketch bounds and extrusion.
   * @returns Transformation matrix
   */
  protected getSketchTransformMatrix(): Matrix4;

  /**
   * Mirrors the ceiling model across a plane.
   * Updates sketch geometry and adjusts position relative to parent height.
   * @param mirrorPlane - Plane definition for mirroring operation
   */
  mirror(mirrorPlane: { matrix3: unknown }): void;

  /**
   * Gets the IO handler instance for this model type
   * @returns The IO handler
   */
  getIO(): NCustomizedCeilingModel_IO;

  /**
   * Computes the projection plane for a specific face.
   * Handles special rendering for RCP materials.
   * @param faceId - Identifier of the face
   * @param options - Additional projection options
   * @returns Projection plane configuration or null
   */
  getFaceProjectionPlane(faceId: string, options?: unknown): ProjectionPlane | null;

  /**
   * Gets bounds information for all sketch faces
   * @returns Bounds info containing sketch bounding box and max height
   */
  protected getSketchFacesBoundInfo(): SketchBoundsInfo | null;

  /**
   * Iterates over all content entities attached to this ceiling
   * @param callback - Function to call for each content entity
   */
  protected forEachContent(callback: (content: Entity & { x: number; y: number; z: number; ZSize: number }) => void): void;

  /** X position of the model */
  x: number;
  /** Y position of the model */
  y: number;
  /** Z position (bottom elevation) of the model */
  z: number;
  /** Width of the model */
  XLength: number;
  /** Depth of the model */
  YLength: number;
  /** Height of the model */
  ZLength: number;
  /** Total height of the model */
  ZSize: number;
  /** Parent entity */
  parent: { height: number };
}