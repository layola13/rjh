/**
 * PContent Module
 * 
 * This module defines the PContent class and its I/O handler for managing 3D content containers
 * with position, rotation, and scale transformations.
 * 
 * @module PContent
 */

import type { PModel, PModel_IO } from './PModel';
import type { Entity } from './Entity';
import type { Content } from './Content';
import type { PAssembly } from './PAssembly';
import type { Material } from './Material';
import type { Logger } from './Logger';
import type { ContentTypeEnum, ProductTypeEnum } from './Enums';

/**
 * Layout information for positioning and sizing content
 */
interface LayoutInfo {
  /** X position offset */
  x?: number;
  /** Y position offset */
  y?: number;
  /** Z position offset */
  z?: number;
  /** Rotation around X axis in degrees */
  XRotation?: number;
  /** Rotation around Y axis in degrees */
  YRotation?: number;
  /** Rotation around Z axis in degrees */
  ZRotation?: number;
  /** Rotation axis (1 = X, 2 = Y, 3 = Z) */
  Axis?: number;
  /** Additional layout parameters */
  [key: string]: unknown;
}

/**
 * Parameters for creating PContent instances
 */
interface PContentCreateParameters {
  /** Local identifier */
  localId?: string;
  /** Transformation and dimension parameters */
  parameters?: {
    x?: number | null;
    y?: number | null;
    z?: number | null;
    XRotation?: number | null;
    YRotation?: number | null;
    ZRotation?: number | null;
    Axis?: number | null;
  };
  /** Child content metadata or instance */
  content?: ContentMetadata | Content | PAssembly;
  /** Material definition */
  material?: MaterialDefinition;
  /** Material component name for assignment */
  materialComponentName?: string;
  /** Layout information */
  layoutInfo?: LayoutInfo;
  /** Whether content needs clipping */
  needClip?: boolean;
  /** User-defined free data */
  userFreeData?: {
    children?: unknown[];
    [key: string]: unknown;
  };
  /** Product type identifier */
  productType?: ProductTypeEnum;
  /** Content metadata */
  metadata?: ContentMetadata;
}

/**
 * Content metadata definition
 */
interface ContentMetadata {
  [key: string]: unknown;
}

/**
 * Material definition structure
 */
interface MaterialDefinition {
  [key: string]: unknown;
}

/**
 * Serialization context for dump/load operations
 */
interface SerializationContext {
  /** Map of state objects by ID */
  states: Record<string, StateField<number>>;
  /** List of invalid entity IDs encountered during load */
  invalidIds?: string[];
  [key: string]: unknown;
}

/**
 * State field wrapper for reactive properties
 */
interface StateField<T> {
  /** Unique identifier */
  id: string;
  /** Current value */
  __value: T;
  /** Bind field changes to object property */
  bindObjectFieldChanged(obj: unknown, fieldName: string): void;
  /** Verify field validity */
  verify(): boolean;
}

/**
 * Serialized representation of PContent
 */
interface SerializedPContent {
  /** X length state ID */
  XLength: string;
  /** Y length state ID */
  YLength: string;
  /** Z length state ID */
  ZLength: string;
  /** Layout information */
  layoutInfo?: LayoutInfo;
  /** Content entity ID */
  content: string;
  [key: string]: unknown;
}

/**
 * I/O handler for PContent serialization and deserialization
 * 
 * Manages the persistence of PContent instances including all child content
 * and dimensional state fields.
 */
declare class PContent_IO extends PModel_IO {
  /**
   * Serialize PContent instance to transferable format
   * 
   * @param entity - The PContent instance to serialize
   * @param callback - Optional callback for post-processing
   * @param includeMetadata - Whether to include metadata (default: true)
   * @param options - Additional serialization options
   * @returns Array of serialized objects
   */
  dump(
    entity: PContent,
    callback?: (data: SerializedPContent[], entity: PContent) => void,
    includeMetadata?: boolean,
    options?: Record<string, unknown>
  ): SerializedPContent[];

  /**
   * Deserialize data into PContent instance
   * 
   * @param entity - Target PContent instance to populate
   * @param data - Serialized data
   * @param context - Deserialization context with state mappings
   */
  load(
    entity: PContent,
    data: SerializedPContent,
    context: SerializationContext
  ): void;
}

/**
 * PContent - Parametric Content Container
 * 
 * A 3D entity that wraps and manages child content (assemblies or basic content),
 * providing dimensional parameters (XLength, YLength, ZLength) and transformation
 * capabilities. Used extensively in cabinet and furniture modeling.
 * 
 * Key features:
 * - Dimensional parameterization with reactive state fields
 * - Hierarchical content management
 * - Material assignment and propagation
 * - Animation support with rotation centers
 * - Layout information for positioning
 */
declare class PContent extends PModel {
  /**
   * X-axis dimension state field
   * @private
   */
  private __XLength: StateField<number>;

  /**
   * Y-axis dimension state field
   * @private
   */
  private __YLength: StateField<number>;

  /**
   * Z-axis dimension state field
   * @private
   */
  private __ZLength: StateField<number>;

  /**
   * Wrapped child content (Content or PAssembly)
   * @private
   */
  private _content: Content | PAssembly | null;

  /**
   * Layout positioning and transformation info
   */
  layoutInfo?: LayoutInfo;

  /**
   * Whether content requires clipping
   */
  needClip?: boolean;

  /**
   * X-axis dimension (length)
   */
  XLength: number;

  /**
   * Y-axis dimension (width)
   */
  YLength: number;

  /**
   * Z-axis dimension (height)
   */
  ZLength: number;

  /**
   * X-axis position
   */
  x: number;

  /**
   * Y-axis position
   */
  y: number;

  /**
   * Z-axis position
   */
  z: number;

  /**
   * Rotation around X-axis in degrees
   */
  XRotation: number;

  /**
   * Rotation around Y-axis in degrees
   */
  YRotation: number;

  /**
   * Rotation around Z-axis in degrees
   */
  ZRotation: number;

  /**
   * Primary rotation axis (1=X, 2=Y, 3=Z)
   */
  Axis: number;

  /**
   * Animation rotation angle in degrees
   */
  AnimationRotation?: number;

  /**
   * X-coordinate of animation rotation center
   */
  XAnimationCenter?: number;

  /**
   * Y-coordinate of animation rotation center
   */
  YAnimationCenter?: number;

  /**
   * Z-coordinate of animation rotation center
   */
  ZAnimationCenter?: number;

  /**
   * Create new PContent instance
   * 
   * @param id - Optional entity identifier
   * @param parent - Optional parent entity
   */
  constructor(id?: string, parent?: Entity);

  /**
   * Get the host entity containing this content
   * 
   * @returns Host entity or undefined
   */
  getHost(): Entity | undefined;

  /**
   * Factory method to create PContent from parameters
   * 
   * @param params - Creation parameters with content, dimensions, and layout
   * @returns Newly created PContent instance
   */
  static create(params: PContentCreateParameters): PContent;

  /**
   * Get wrapped child content
   * 
   * @returns Content or PAssembly instance, or null if none
   */
  getContent(): Content | PAssembly | null;

  /**
   * Get material of wrapped content
   * 
   * @returns Material instance
   */
  getMaterial(): Material;

  /**
   * Set material on wrapped content
   * 
   * Applies material to the 'cbnt_body' component unless content is an assembly
   * or belongs to specific door leaf types.
   * 
   * @param material - Material to apply
   */
  setMaterial(material: Material): void;

  /**
   * Replace wrapped content
   * 
   * @param content - New content (metadata, Content, or PAssembly instance)
   * @returns True if content was successfully set
   */
  setContent(content: ContentMetadata | Content | PAssembly): boolean;

  /**
   * Verify entity integrity
   * 
   * Checks that all dimensional state fields and children are valid.
   * 
   * @returns True if entity is valid
   */
  verify(): boolean;

  /**
   * Get I/O handler instance
   * 
   * @returns Singleton PContent_IO instance
   */
  getIO(): PContent_IO;

  /**
   * Update content from new metadata
   * 
   * @param params - Update parameters with metadata
   */
  update(params: { metadata?: ContentMetadata }): void;

  /**
   * Add content (no-op, maintained for interface compatibility)
   */
  addContent(): void;

  /**
   * Remove content by ID
   * 
   * Delegates to wrapped content's removeContent method.
   * 
   * @param id - Content ID to remove
   * @returns True if content was removed
   */
  removeContent(id: string): boolean;

  /**
   * Refresh internal bounding box (implementation delegated to parent)
   * @private
   */
  private refreshBoundInternal(): void;

  /**
   * Get model boundary line
   * 
   * @param param - Boundary calculation parameter
   * @returns Boundary line data
   */
  modelBoundLine(param: unknown): unknown;

  /**
   * Resize content dimensions
   * 
   * @param xLength - New X dimension
   * @param yLength - New Y dimension
   * @param zLength - New Z dimension
   */
  resize(xLength: number, yLength: number, zLength: number): void;

  /**
   * Iterate over all content recursively
   * 
   * @param callback - Function to call for each content
   * @param includeThis - Whether to include this entity
   */
  forEachContent(
    callback: (content: Content | PAssembly) => void,
    includeThis?: boolean
  ): void;

  /**
   * Check if wrapped content is valid
   * 
   * @returns True if content exists and is valid
   */
  isContentValid(): boolean;

  /**
   * Check if content is located in specified room
   * 
   * @param room - Room entity to check
   * @param recursive - Whether to check recursively
   * @returns True if content is in room
   */
  isContentInRoom(room: unknown, recursive?: boolean): boolean;

  /**
   * Check if content is within specified loop boundary
   * 
   * @param loop - Loop boundary to check
   * @param recursive - Whether to check recursively
   * @returns True if content is in loop
   */
  isContentInLoop(loop: unknown, recursive?: boolean): boolean;

  /**
   * Update wrapped content transformations and dimensions
   * 
   * Applies position, rotation, and scale based on this container's state fields.
   * Handles animation rotation and axis-specific transformations.
   * 
   * @param shouldCompute - Whether to trigger content recomputation
   * @private
   */
  private updateContent(shouldCompute?: boolean): void;

  /**
   * Recompute wrapped content geometry
   * 
   * Triggers the compute() method on content if available (typically for PAssembly).
   * @private
   */
  private computeContent(): void;

  /**
   * Handle state field changes
   * 
   * Propagates changes to wrapped content and triggers updates.
   * 
   * @param fieldName - Name of changed field
   * @param newValue - New field value
   * @param oldValue - Previous field value
   */
  onFieldChanged(
    fieldName: string,
    newValue: unknown,
    oldValue: unknown
  ): void;

  /**
   * Flip entity along its axis
   * 
   * Overrides parent to also update content after flip.
   */
  flipSelf(): void;

  /**
   * Set entity flag to ON state
   * 
   * Propagates flag to wrapped content.
   * 
   * @param flag - Flag identifier
   * @param value - Flag value
   */
  setFlagOn(flag: number, value?: boolean): void;

  /**
   * Set entity flag to OFF state
   * 
   * Propagates flag to wrapped content.
   * 
   * @param flag - Flag identifier
   * @param value - Flag value
   */
  setFlagOff(flag: number, value?: boolean): void;
}

export { PContent, PContent_IO };