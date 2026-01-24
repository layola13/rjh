/**
 * Type definitions for NCustomizedModelLightBand module
 * Provides interfaces and types for light band customization in 3D models
 */

import type { Curve3d, Coordinate3, Loop, Vector2, Vector3, Matrix3, Line3d, Arc3d, Circle3d } from 'GeometryCore';
import type { Entity, Entity_IO } from 'EntityCore';
import type { Brep } from 'AlgorithmCore';
import type { Signal } from 'SignalCore';

/**
 * Light band sweep profile parameters
 */
export interface LightBandParameters {
  /** Whether to flip the profile vertically (mirror on X axis) */
  flipVertical: boolean;
  
  /** Whether to flip the profile horizontally and rotate 90° */
  flip: boolean;
  
  /** Array of 3D curve tags or curve instances defining the sweep path */
  pathCoedge3dsTags: Array<string | Curve3d>;
  
  /** Tag identifier for the face where light band is placed */
  faceTag?: string;
  
  /** ID of the entity this light band relies on (parent feature or light slot) */
  relyerId: string;
  
  /** Width of the light band profile cross-section (in meters) */
  profileWidth?: number;
  
  /** Height of the light band profile cross-section (in meters) */
  profileHeight?: number;
  
  /** Local coordinate system for the sweep operation */
  coord?: Coordinate3;
}

/**
 * Graphics data structure for rendering
 */
export interface GraphicsData {
  /** Map of face geometries keyed by tag */
  faces: Map<string, FaceGraphics>;
  
  /** Map of edge geometries keyed by tag */
  edges: Map<string, EdgeGraphics>;
  
  /** Map of additional content keyed by tag */
  contents: Map<string, unknown>;
}

/**
 * Face graphics metadata
 */
export interface FaceGraphics {
  /** Custom rendering data */
  customData: {
    /** Material ID for face rendering */
    faceMaterialId: string;
    /** Material ID for edge lines */
    lineMaterialId: string;
  };
  
  /** Auxiliary faces used for picking operations */
  auxiliaryFacesForPick?: FaceGraphics[];
}

/**
 * Edge graphics metadata
 */
export interface EdgeGraphics {
  // Edge-specific properties (extend as needed)
}

/**
 * 2D projection result
 */
export interface Projection2D {
  /** Array of projected path segments */
  paths: ProjectionPath[];
}

/**
 * Single projection path segment
 */
export interface ProjectionPath {
  /** Start point of the path segment */
  startPoint: Vector2;
  
  /** End point of the path segment */
  endPoint: Vector2;
}

/**
 * Serialization options
 */
export interface DumpOptions {
  [key: string]: unknown;
}

/**
 * Deserialization options
 */
export interface LoadOptions {
  [key: string]: unknown;
}

/**
 * Event options for entity dirty notifications
 */
export interface EventOptions {
  /** Only dirty the entity itself without affecting children */
  selfonly?: boolean;
  
  [key: string]: unknown;
}

/**
 * Entity event descriptor
 */
export interface EntityEvent {
  /** Type of entity event (Geometry, Display, Clip, etc.) */
  type: string;
  
  /** Additional event options */
  options?: EventOptions;
}

/**
 * IO handler for NCustomizedModelLightBand serialization/deserialization
 * Handles conversion between runtime objects and persistent storage format
 */
export declare class NCustomizedModelLightBand_IO extends Entity_IO {
  /**
   * Get singleton instance of the IO handler
   */
  static instance(): NCustomizedModelLightBand_IO;
  
  /**
   * Serialize a light band entity to JSON format
   * @param entity - The light band entity to serialize
   * @param callback - Optional callback for post-processing
   * @param includeChildren - Whether to serialize child entities
   * @param options - Additional serialization options
   * @returns Serialized data array [entityData, ...]
   */
  dump(
    entity: NCustomizedModelLightBand,
    callback?: (result: unknown[], entity: NCustomizedModelLightBand) => void,
    includeChildren?: boolean,
    options?: DumpOptions
  ): unknown[];
  
  /**
   * Deserialize JSON data into a light band entity
   * @param entity - Target entity to populate
   * @param data - Serialized entity data
   * @param options - Additional deserialization options
   */
  load(
    entity: NCustomizedModelLightBand,
    data: {
      parameters?: LightBandParameters;
      coord?: unknown;
      lightBandId?: string;
      [key: string]: unknown;
    },
    options?: LoadOptions
  ): void;
}

/**
 * Custom light band entity for 3D models
 * Represents a sweep-based light strip along edges or curves
 */
export declare class NCustomizedModelLightBand extends Entity {
  /**
   * Creates a new light band instance
   * @param id - Unique identifier (auto-generated if empty)
   * @param parent - Parent entity containing this light band
   */
  constructor(id?: string, parent?: Entity);
  
  /**
   * Unique identifier for this light band instance
   * Format: "manualAddLightBand_{entityId}"
   */
  lightBandId: string;
  
  /**
   * Configuration parameters for the light band
   */
  parameters?: LightBandParameters;
  
  /**
   * Signal dispatched when clipping geometry changes
   */
  signalClipDirty: Signal<EntityEvent>;
  
  /**
   * Top view 2D projection cache
   */
  topProjection?: Projection2D;
  
  /**
   * Front view 2D projection cache
   */
  frontProjection?: Projection2D;
  
  /**
   * Bottom view 2D projection cache
   */
  bottomProjection?: Projection2D;
  
  /**
   * Bottom projection contour polylines
   */
  bottomProjectionContours?: Vector2[][];
  
  /**
   * Preview mode flag for temporary rendering
   */
  previewMode: boolean;
  
  /**
   * Get the entity this light band relies on (feature model or light slot)
   */
  readonly relyer: Entity | undefined;
  
  /**
   * Get BRep (Boundary Representation) geometries for this light band
   */
  readonly breps: Brep[];
  
  /**
   * Get width of the light band profile cross-section
   * Defaults to 0.04m for manual additions, 0.01m for others
   */
  readonly profileWidth: number;
  
  /**
   * Get height of the light band profile cross-section
   * Defaults to 0.001m (1mm)
   */
  readonly profileHeight: number;
  
  /**
   * Get the 3D coedge path for sweep operation
   */
  readonly path: unknown[];
  
  /**
   * Get start point of the sweep path in 3D space
   */
  readonly sweepStartPoint: Vector3 | undefined;
  
  /**
   * Clean up resources and event listeners
   */
  destroy(): void;
  
  /**
   * Create a deep copy of this light band
   */
  clone(): NCustomizedModelLightBand;
  
  /**
   * Copy properties from another light band instance
   * @param source - Source light band to copy from
   */
  copyFrom(source: NCustomizedModelLightBand): void;
  
  /**
   * Get graphics data for rendering (synchronous)
   * Generates tessellated mesh data with material assignments
   * @returns Graphics data containing faces, edges, and metadata
   */
  getGraphicsData(): GraphicsData;
  
  /**
   * Get graphics data for rendering (asynchronous)
   * @returns Promise resolving to graphics data
   */
  getGraphicsDataAsync(): Promise<GraphicsData>;
  
  /**
   * Get 2D projection on top view plane
   */
  getTopProjection(): Projection2D;
  
  /**
   * Get 2D projection on front view plane
   */
  getFrontProjection(): Projection2D;
  
  /**
   * Get 2D projection on bottom view plane
   */
  getBottomProjection(): Projection2D;
  
  /**
   * Get bottom projection as closed contour polylines
   */
  getBottomProjectionContours(): Vector2[][];
  
  /**
   * Clear all cached projection data
   */
  clearProjectionCache(): void;
  
  /**
   * Mark entity as dirty and trigger update events
   * @param event - Event descriptor
   * @param options - Additional event options
   */
  dirty(event?: EntityEvent, options?: EventOptions): void;
  
  /**
   * Initialize light band with parameters
   * @param params - Light band configuration parameters
   */
  init(params: LightBandParameters): void;
  
  /**
   * Get 3D curve path for sweep operation
   * @returns Array of 3D curves defining the sweep trajectory
   */
  getSweepPath3D(): Curve3d[];
  
  /**
   * Get 2D profile curves for sweep operation
   * Applies flip/mirror transformations based on parameters
   * @returns Array of 2D profile curves
   */
  getSweepProfile(): unknown[];
  
  /**
   * Get original (untransformed) 2D sweep profile
   * Creates a rectangular loop with user data for tracking
   */
  getOriginSweepProfile(): Loop;
  
  /**
   * Get local coordinate system for sweep operation
   */
  getLocalCoordinate(): Coordinate3 | undefined;
  
  /**
   * Generate BRep geometry by sweeping profile along path
   */
  getBrep(): Brep | undefined;
  
  /**
   * Get IO handler instance for serialization
   */
  getIO(): NCustomizedModelLightBand_IO;
  
  /**
   * Update existence state and validate dependencies
   * Removes entity if dependencies are missing
   * @returns true if entity should continue to exist
   */
  updateExistence(): boolean;
  
  /**
   * Copy this light band to a new relyer entity
   * @param relyerId - ID of the new relyer entity
   * @param pathTags - New sweep path curve tags
   * @param faceTag - New face tag
   */
  copy(relyerId: string, pathTags: Array<string | Curve3d>, faceTag?: string): void;
  
  /**
   * Reset the sweep path without changing other parameters
   * @param pathTags - New sweep path curve tags
   * @param faceTag - New face tag
   */
  resetSweepPath(pathTags: Array<string | Curve3d>, faceTag?: string): void;
  
  /**
   * Get the relyer entity by ID
   * Searches in parent's children or floorplan entity list
   * @param id - Entity ID to search for
   */
  getRelyerById(id: string): Entity | undefined;
  
  /**
   * Reset profile dimensions to default values
   * Removes custom profileWidth and profileHeight
   */
  resetSize(): void;
  
  /**
   * Mark geometry as dirty and clear caches
   */
  dirtyGeometry(): void;
  
  /**
   * Mark clipped geometry as dirty
   * @param options - Event options
   */
  dirtyClipGeometry(options?: EventOptions): void;
  
  /**
   * Check if light band is in a valid state
   * @returns true if entity has a valid unique parent
   */
  isValid(): boolean;
}