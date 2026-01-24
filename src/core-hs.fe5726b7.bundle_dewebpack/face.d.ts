/**
 * Face module - Represents a geometric face entity with outer and inner loops
 * Supports material assignment and content management
 */

import { Entity, Entity_IO } from './Entity';
import { Loop } from './Loop';
import { Material } from './Material';
import { Signal, SignalHook } from './Signal';
import { Content } from './Content';
import { Logger } from './Logger';
import { EntityField } from './EntityField';

/**
 * Serialization/deserialization handler for Face entities
 */
export declare class Face_IO extends Entity_IO {
  /**
   * Loads a Face entity from serialized data
   * @param face - The Face instance to populate
   * @param data - Serialized face data containing loop references
   * @param entityMap - Map of entity IDs to entity instances for resolving references
   * @param options - Additional loading options
   */
  load(
    face: Face,
    data: FaceSerializedData,
    entityMap: Map<string, Entity>,
    options?: LoadOptions
  ): void;

  /**
   * Returns singleton instance of Face_IO
   */
  static instance(): Face_IO;
}

/**
 * Serialized data structure for Face persistence
 */
interface FaceSerializedData {
  /** ID reference to the outer loop */
  outerLoop: string;
  /** Array of ID references to inner loops (holes) */
  innerLoops?: string[];
}

/**
 * Options for entity loading operations
 */
interface LoadOptions {
  [key: string]: unknown;
}

/**
 * Verification options for Face validation
 */
interface VerifyOptions {
  /** Skip material validation if true */
  ignoreMaterial?: boolean;
}

/**
 * Polygon representation with outer boundary and holes
 */
interface ClipFacePolygon {
  /** Outer boundary polygon points */
  outer?: Point3D[];
  /** Array of hole polygons */
  holes: Point3D[][];
}

/**
 * 3D point coordinates
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Mass properties calculation result
 */
type MassProperties = number[];

/**
 * Signal payload when content is added
 */
interface ContentAddedPayload {
  content: Content;
}

/**
 * Signal payload when content is removed
 */
interface ContentRemovedPayload {
  content: Content;
}

/**
 * Signal payload for customized wall-attached model events
 */
interface CustomizedModelPayload {
  customizedModel: Content;
}

/**
 * Geometric face entity representing a 2D surface bounded by loops
 * Supports:
 * - Outer loop (boundary)
 * - Inner loops (holes)
 * - Material assignment
 * - Content attachment (furniture, fixtures, etc.)
 */
export declare class Face extends Entity {
  /**
   * Private storage for outer boundary loop
   */
  private __outerLoop: Loop | undefined;

  /**
   * Private storage for inner loops (holes) indexed by loop ID
   */
  private __innerLoops: Record<string, Loop>;

  /**
   * Private storage for attached content items indexed by content ID
   */
  private __contents: Record<string, Content>;

  /**
   * Private storage for face material
   */
  private __material?: Material;

  /**
   * Signal dispatched when content is added to this face
   */
  signalContentAdded: Signal<ContentAddedPayload>;

  /**
   * Signal dispatched when content is removed from this face
   */
  signalContentRemoved: Signal<ContentRemovedPayload>;

  /**
   * Signal dispatched when customized wall-attached model is added
   */
  signalCustomizedWallAttachedModelAdded: Signal<CustomizedModelPayload>;

  /**
   * Signal dispatched when customized wall-attached model is removed
   */
  signalCustomizedWallAttachedModelRemoved: Signal<CustomizedModelPayload>;

  /**
   * Hook for managing signal subscriptions
   */
  private _signalHook: SignalHook;

  /**
   * Hook for managing material-related signal subscriptions
   */
  private _materialSignalHook: SignalHook;

  /**
   * Cached child entities array
   */
  private _children: Entity[];

  /**
   * Flag indicating if entity has been disposed
   */
  protected _disposed: boolean;

  /**
   * Creates a new Face instance
   * @param id - Optional unique identifier
   */
  constructor(id?: string);

  /**
   * Gets all child entities
   */
  get children(): Entity[];

  /**
   * Gets the outer boundary loop
   */
  getOuterLoop(): Loop | undefined;

  /**
   * Entity field: Outer boundary loop defining the face perimeter
   * Decorated with @EntityField for serialization
   */
  outerLoop: Loop | undefined;

  /**
   * Internal setter for outer loop, manages child relationships
   * @param loop - New outer loop
   */
  private _setOuterLoop(loop: Loop | undefined): void;

  /**
   * Gets all inner loops (holes)
   */
  getInnerLoops(): Record<string, Loop>;

  /**
   * Entity field: Inner loops representing holes in the face
   * Decorated with @EntityField for serialization
   */
  innerLoops: Record<string, Loop>;

  /**
   * Internal setter for inner loops, manages child relationships
   * @param loops - New inner loops dictionary
   */
  private _setInnerLoops(loops: Record<string, Loop>): void;

  /**
   * Compares two inner loop collections for equality
   * @param loops1 - First loop collection
   * @param loops2 - Second loop collection
   * @returns True if collections contain same loop IDs
   */
  isSameInnerLoops(
    loops1: Record<string, Loop>,
    loops2: Record<string, Loop>
  ): boolean;

  /**
   * Removes a specific inner loop
   * @param loop - Loop to remove
   * @returns True if loop was removed successfully
   */
  removeInnerLoop(loop: Loop): boolean;

  /**
   * Updates outer loop using an array of points
   * @param points - Array of 3D points defining the boundary
   */
  updateOuterLoopByPoints(points: Point3D[]): void;

  /**
   * Gets all vertices from the outer loop
   * @returns Array of vertex entities
   */
  getOuterLoopVertices(): Entity[];

  /**
   * Converts outer loop to polygon representation
   * @returns Array of 3D points, or undefined if no outer loop
   */
  getOuterLoopPolygon(): Point3D[] | undefined;

  /**
   * Gets polygon representation suitable for clipping operations
   * Ensures correct winding order (CCW for outer, CW for holes)
   * @returns Polygon with outer boundary and holes
   */
  getClipFacePolygon(): ClipFacePolygon;

  /**
   * Converts face to discrete polygon (same as outer loop polygon)
   * @returns Array of 3D points
   */
  toDiscretePolygon(): Point3D[];

  /**
   * Calculates mass properties (area, centroid, etc.)
   * @returns Mass properties array
   */
  getMassProps(): MassProperties;

  /**
   * Iterates over all vertices in outer and inner loops
   * @param callback - Function to call for each vertex
   * @param context - Context for callback execution
   */
  forEachVertex(callback: (vertex: Entity) => void, context?: unknown): void;

  /**
   * Gets the face material
   * @returns Material instance, creates default if none exists
   */
  getMaterial(): Material;

  /**
   * Sets the face material
   * @param material - New material to assign
   */
  setMaterial(material: Material): void;

  /**
   * Entity field: Surface material for rendering
   * Decorated with @EntityField with custom getter/setter logic
   */
  material: Material;

  /**
   * Entity field: Attached content items (furniture, fixtures, etc.)
   * Decorated with @EntityField for serialization
   */
  contents: Record<string, Content>;

  /**
   * Internal setter for contents, manages content lifecycle
   * @param contents - New contents dictionary
   */
  private _setContents(contents: Record<string, Content>): void;

  /**
   * Sets all contents, replacing existing
   * @param contents - New contents dictionary
   */
  setContents(contents: Record<string, Content>): void;

  /**
   * Adds a content item to the face
   * @param content - Content to add
   * @returns True if content was added successfully
   */
  addContent(content: Content): boolean;

  /**
   * Checks if a content item can be added
   * @param content - Content to validate
   * @returns True if content is valid for this face
   */
  canAddContent(content: Content): boolean;

  /**
   * Removes a content item from the face
   * @param content - Content instance or ID string to remove
   * @returns True if content was removed successfully
   */
  removeContent(content: Content | string): boolean;

  /**
   * Checks if face contains a specific content item
   * @param content - Content to check for
   * @param recursive - If true, checks nested contents
   * @returns True if content is present
   */
  hasContent(content: Content, recursive?: boolean): boolean;

  /**
   * Internal method to add content without validation
   * @param content - Content to add
   * @returns True if successful
   */
  private _addContent(content: Content): boolean;

  /**
   * Internal method to remove content without validation
   * @param content - Content to remove
   * @returns True if successful
   */
  private _removeContent(content: Content): boolean;

  /**
   * Iterates over all content items
   * @param callback - Function to call for each content
   * @param context - Context for callback execution
   */
  forEachContent(callback: (content: Content) => void, context?: unknown): void;

  /**
   * Callback when a child entity is removed
   * @param child - Child entity that was removed
   */
  protected onChildRemoved(child: Entity): void;

  /**
   * Destroys the face and cleans up all resources
   */
  destroy(): void;

  /**
   * Validates face geometry and structure
   * @param options - Verification options
   * @returns True if face is valid
   */
  verify(options?: VerifyOptions): boolean;

  /**
   * Recalculates internal bounding box
   */
  protected refreshBoundInternal(): void;

  /**
   * Gets the I/O handler for this entity type
   * @returns Face_IO instance
   */
  getIO(): Face_IO;

  /**
   * Validates that geometry is properly initialized
   * @returns True if outer loop exists and has valid root
   */
  validateGeometry(): boolean;

  /**
   * Factory method to create a Face instance
   * @param innerLoops - Inner loops (holes) as array or dictionary
   * @param outerLoop - Outer boundary loop
   * @param materialId - Optional material identifier
   * @returns New Face instance
   */
  static create(
    innerLoops: Loop[] | Record<string, Loop>,
    outerLoop: Loop,
    materialId?: string
  ): Face;

  /**
   * Internal helper to initialize a Face instance
   * @param face - Face instance to initialize
   * @param innerLoops - Inner loops to assign
   * @param outerLoop - Outer loop to assign
   * @param materialId - Optional material identifier
   */
  private static _initFace(
    face: Face,
    innerLoops: Loop[] | Record<string, Loop>,
    outerLoop: Loop,
    materialId?: string
  ): void;
}