/**
 * Module: Content
 * Represents 3D content entities with materials, transformations, and metadata
 */

import { Entity, Entity_IO } from './Entity';
import { FieldValueType } from './FieldValueType';
import { Signal } from './Signal';
import { Logger } from './Logger';

/**
 * Content flag enumeration for various content properties
 */
export enum ContentFlagEnum {
  /** @deprecated Legacy cast shadow flag */
  castShadow_obsoleted = 256,
  
  /** @deprecated Legacy scalable flag */
  scalable_obsoleted = 512,
  
  /** Indicates proportions are locked during scaling */
  ProportionsLocked = 1024,
  
  /** Content has transparency */
  transparent = 2048,
  
  /** Content replaces existing items */
  replace = 4096,
  
  /** Length and width dimensions are locked */
  LengthWidthLocked = 8192
}

/**
 * Material change event data
 */
export interface MaterialChangeEvent {
  /** Component identifier */
  component: string;
  
  /** Previous material (if any) */
  oldMaterial?: unknown;
  
  /** New material (if any) */
  newMaterial?: unknown;
}

/**
 * Content metadata structure
 */
export interface ContentMetadata {
  /** Unique identifier */
  id: string;
  
  /** Seek identifier for catalog lookup */
  seekId: string;
  
  /** Content type classification */
  contentType: HSCatalog.ContentType;
  
  /** Measurement unit */
  unit?: string;
  
  /** Default height placement */
  defaultHeight?: number;
  
  /** X-axis dimension */
  XLength: number;
  
  /** Y-axis dimension */
  YLength: number;
  
  /** Z-axis dimension */
  ZLength?: number;
  
  /** Whether content can be scaled */
  isScalable: boolean;
  
  /** Top view texture path */
  top?: string;
  
  /** 3D model path */
  model3d?: string;
  
  /** Model texture path */
  modelTexture?: string;
  
  /** Z-index for rendering order */
  zIndex?: string;
  
  /** Variation identifier */
  variationId?: string;
  
  /** Available component names */
  components?: string[];
  
  /** Extension data */
  extension?: unknown;
  
  /** Scaling rules */
  scaleRule?: unknown;
  
  /** User-defined free data */
  userFreeData?: unknown;
}

/**
 * Serialized content data for loading
 */
export interface ContentDumpData {
  /** Seek identifier */
  seekId?: string;
  
  /** Variation identifier */
  variationId?: string;
  
  /** X position */
  x?: number;
  
  /** Y position */
  y?: number;
  
  /** Z position */
  z?: number;
  
  /** X-axis rotation in degrees */
  XRotation?: number;
  
  /** Y-axis rotation in degrees */
  YRotation?: number;
  
  /** Z-axis rotation in degrees */
  ZRotation?: number;
  
  /** X-axis scale factor */
  XScale?: number;
  
  /** Y-axis scale factor */
  YScale?: number;
  
  /** Z-axis scale factor */
  ZScale?: number;
  
  /** X dimension length */
  XLength?: number;
  
  /** Y dimension length */
  YLength?: number;
  
  /** Z dimension length */
  ZLength?: number;
  
  /** Scalability flag */
  isScalable?: boolean;
  
  /** Flip state (0 or 1) */
  flip?: number;
  
  /** Top view texture */
  topView?: string;
  
  /** Model texture */
  modelTexture?: string;
  
  /** 3D model path */
  model3d?: string;
  
  /** Pose/animation data */
  poseData?: unknown;
  
  /** Legacy content type string */
  type?: 'flooring' | 'seating' | 'surface' | 'wall_attachment' | 'ceiling_attachment';
  
  /** Measurement unit */
  unit?: string;
}

/**
 * Load context with product catalog
 */
export interface LoadContext {
  /** Product metadata cache */
  productsMap?: Map<string, ContentMetadata>;
}

/**
 * 2D point for outline
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * Content IO handler for serialization/deserialization
 */
export class Content_IO extends Entity_IO {
  /**
   * Loads content data from serialized format
   * @param entity - Target content entity
   * @param dumpData - Serialized content data
   * @param context - Load context with metadata
   */
  load(entity: Content, dumpData: ContentDumpData, context: LoadContext): void;
}

/**
 * Content entity representing a 3D object with materials, transforms, and metadata
 */
export class Content extends Entity {
  /**
   * Creates a new content instance
   * @param id - Optional unique identifier
   */
  constructor(id?: string);

  // ==================== Core Properties ====================

  /**
   * Catalog seek identifier for product lookup
   */
  seekId: string;

  /**
   * Content metadata with dimensions, type, and resources
   */
  metadata: ContentMetadata | null;

  /**
   * X-axis position in world space
   */
  x: number;

  /**
   * Y-axis position in world space
   */
  y: number;

  /**
   * Z-axis position (height) in world space
   */
  z: number;

  /**
   * Base X-axis dimension (unscaled)
   */
  XLength: number;

  /**
   * Base Y-axis dimension (unscaled)
   */
  YLength: number;

  /**
   * Base Z-axis dimension (unscaled)
   */
  ZLength: number;

  /**
   * Whether content supports scaling operations
   */
  isScalable: boolean;

  /**
   * X-axis scale multiplier
   */
  XScale: number;

  /**
   * Y-axis scale multiplier
   */
  YScale: number;

  /**
   * Z-axis scale multiplier
   */
  ZScale: number;

  /**
   * X-axis rotation in degrees
   */
  XRotation: number;

  /**
   * Y-axis rotation in degrees
   */
  YRotation: number;

  /**
   * Z-axis rotation in degrees
   */
  ZRotation: number;

  /**
   * Flip state: 0 = normal, 1 = flipped
   */
  flip: number;

  /**
   * Pose/animation data (structure varies by content type)
   */
  poseData?: unknown;

  /**
   * Variation identifier for content variants
   */
  variationId: string;

  /**
   * Top view texture resource path
   */
  topView: string;

  /**
   * 3D model resource path
   */
  model3d: string;

  /**
   * Model texture resource path
   */
  modelTexture: string;

  /**
   * 2D outline points for top-down view
   */
  outline: Point2D[];

  /**
   * Whether content is in opened state (e.g., door, window)
   */
  isOpened: boolean;

  // ==================== Computed Properties ====================

  /**
   * Content type classification from metadata
   */
  readonly contentType: HSCatalog.ContentType;

  /**
   * Rendering order z-index from metadata
   */
  readonly zIndex: number | undefined;

  /**
   * Final X dimension (XLength × XScale)
   */
  readonly XSize: number;

  /**
   * Final Y dimension (YLength × YScale)
   */
  readonly YSize: number;

  /**
   * Final Z dimension (ZLength × ZScale)
   */
  readonly ZSize: number;

  /**
   * Alias for ZRotation
   */
  rotation: number;

  // ==================== Materials ====================

  /**
   * Map of component names to assigned materials
   */
  materialsMap: Map<string, unknown>;

  /**
   * Signal dispatched when materials change
   */
  signalMaterialChanged: Signal<MaterialChangeEvent>;

  /**
   * Retrieves material assigned to a component
   * @param componentName - Component identifier
   * @returns Material or undefined
   */
  getMaterial(componentName: string): unknown | undefined;

  /**
   * Gets all component-material pairs
   * @returns Array of [componentName, material] tuples
   */
  getMaterialList(): Array<[string, unknown]>;

  /**
   * Checks if a component is available in metadata
   * @param componentName - Component to check
   * @returns True if component exists
   */
  isComponentAvailable(componentName: string): boolean;

  /**
   * Normalizes a component name to standard format
   * @param componentName - Raw component name
   * @returns Normalized name
   */
  getNormalizedComponentName(componentName: string): string;

  /**
   * Converts component name to storage key format
   * @param componentName - Component name
   * @returns Storage key
   */
  getComponentStorageKey(componentName: string): string;

  /**
   * Retrieves component name from storage key
   * @param storageKey - Storage key
   * @returns Component name
   */
  getComponentByStorageKey(storageKey: string): string;

  /**
   * Iterates over all materials in this content and children
   * @param callback - Function to call for each material
   * @param context - Execution context for callback
   */
  forEachMaterial(callback: (material: unknown) => void, context?: unknown): void;

  // ==================== Hierarchy ====================

  /**
   * Parent content hosting this entity
   */
  host: Content | null;

  /**
   * Child contents contained within this entity
   */
  contents: Record<string, Content>;

  /**
   * Assigns this content to a host parent
   * @param host - New parent content or null to detach
   */
  assignTo(host: Content | null): void;

  /**
   * Gets the current host parent
   * @returns Host content or null
   */
  getHost(): Content | null;

  /**
   * Checks if an entity can be a valid host
   * @param host - Candidate host entity
   * @returns True if valid (no circular references)
   */
  isValidHost(host: Content | null): boolean;

  /**
   * Adds a child content
   * @param content - Content to add
   * @returns True if successfully added
   */
  addContent(content: Content): boolean;

  /**
   * Checks if a content can be added as child
   * @param content - Candidate content
   * @returns True if addition is allowed
   */
  canAddContent(content: Content): boolean;

  /**
   * Removes a child content
   * @param content - Content instance or ID to remove
   * @returns True if removed
   */
  removeContent(content: Content | string): boolean;

  /**
   * Checks if a content is a descendant
   * @param content - Content to check
   * @param recursive - Whether to check entire subtree
   * @returns True if found
   */
  hasContent(content: Content, recursive?: boolean): boolean;

  /**
   * Iterates over direct child contents
   * @param callback - Function to call for each child
   * @param context - Execution context for callback
   */
  forEachContent(callback: (content: Content) => void, context?: unknown): void;

  // ==================== Metadata Management ====================

  /**
   * Migrates legacy metadata format
   * @param metadata - Legacy metadata
   */
  migrateContentMetaData(metadata: ContentMetadata): void;

  /**
   * Updates content with new metadata
   * @param metadata - New metadata
   */
  updateContentMetaData(metadata: ContentMetadata | null): void;

  /**
   * Initializes content from metadata
   * @param metadata - Content metadata
   * @param param2 - Additional initialization data
   * @param param3 - Skip validation flag
   * @param param4 - Force update flag
   */
  initByMeta(
    metadata: ContentMetadata,
    param2?: unknown,
    param3?: boolean,
    param4?: boolean
  ): void;

  /**
   * Gets metadata keys that should be filtered during operations
   * @returns Set of key names to exclude
   */
  getMetadataFilterKeys(): Set<string>;

  /**
   * Migrates dump data to current metadata format
   * @param dumpData - Legacy dump data
   * @param context - Load context
   * @returns Migrated metadata or null
   */
  migrateMetadata(dumpData: ContentDumpData, context: LoadContext): ContentMetadata | null;

  /**
   * Resolves metadata from dump data and context
   * @param seekId - Seek identifier
   * @param context - Load context
   * @returns Metadata or undefined
   */
  protected dealMeta(seekId: string, context: LoadContext): ContentMetadata | undefined;

  // ==================== Validation & Lifecycle ====================

  /**
   * Validates content state
   * @returns True if valid
   */
  verify(): boolean;

  /**
   * Checks if content is valid for rendering/interaction
   * @returns True if not hidden or removed
   */
  isContentValid(): boolean;

  /**
   * Cleans up resources and references
   */
  destroy(): void;

  /**
   * Gets IO handler for serialization
   * @returns Content_IO instance
   */
  getIO(): Content_IO;

  // ==================== Geometry & Transforms ====================

  /**
   * Flips content horizontally
   */
  flipSelf(): void;

  /**
   * Gets the two extreme points of a bounding edge
   * @param direction - Edge direction (0=left, 1=right, 2=front, 3=back)
   * @returns Array of two extreme points
   */
  modelBoundLine(direction: 0 | 1 | 2 | 3): [Point2D, Point2D];

  // ==================== Static Utilities ====================

  /**
   * Finds animation data by type
   * @param animations - Array of animation objects
   * @param animationType - Animation type to find
   * @returns Matching animation or undefined
   */
  static getAnimationByType<T extends { type: string }>(
    animations: T[] | null | undefined,
    animationType: string
  ): T | undefined;

  // ==================== Internal Members ====================

  /** @internal */
  protected _seekId: string;
  
  /** @internal */
  protected _metadata: ContentMetadata | null;
  
  /** @internal */
  protected __x: number;
  
  /** @internal */
  protected __y: number;
  
  /** @internal */
  protected __z: number;
  
  /** @internal */
  protected __XLength: number;
  
  /** @internal */
  protected __YLength: number;
  
  /** @internal */
  protected __ZLength: number;
  
  /** @internal */
  protected __isScalable: boolean;
  
  /** @internal */
  protected __XScale: number;
  
  /** @internal */
  protected __YScale: number;
  
  /** @internal */
  protected __ZScale: number;
  
  /** @internal */
  protected __XRotation: number;
  
  /** @internal */
  protected __YRotation: number;
  
  /** @internal */
  protected __ZRotation: number;
  
  /** @internal */
  protected __flip: number;
  
  /** @internal */
  protected __variationId: string;
  
  /** @internal */
  protected __contents: Record<string, Content>;
  
  /** @internal */
  protected _materialByComponent: Map<string, unknown>;
  
  /** @internal */
  protected _host: Content | null;
  
  /** @internal */
  protected _meshMaterials: unknown;

  /** @internal */
  protected _setMaterialsMap(materialsMap: Map<string, unknown>): void;
  
  /** @internal */
  protected _setHost(host: Content | null): void;
  
  /** @internal */
  protected _setContents(contents: Record<string, Content>): void;
  
  /** @internal */
  protected _addContent(content: Content): boolean;
  
  /** @internal */
  protected _removeContent(content: Content): boolean;
}