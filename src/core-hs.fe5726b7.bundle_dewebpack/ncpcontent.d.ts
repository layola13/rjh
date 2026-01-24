import type { Content } from './Content';
import type { ParametricModelContent } from './ParametricModelContent';
import type { ContentClipper } from './ContentClipper';
import type { Vector3 } from './Vector3';
import type { Plane } from './Plane';

/**
 * Signal event data for entity changes
 */
interface SignalEventData {
  /** The type of entity event that occurred */
  type?: EntityEventType;
}

/**
 * Signal event wrapper
 */
interface SignalEvent {
  /** Event payload data */
  data: SignalEventData;
}

/**
 * Clipping mesh definition with optional metadata
 */
interface ClipMeshDef {
  /** Unique identifier for the mesh */
  meshKey: string;
  /** Optional clipping information */
  clipInfo?: ClipInfo;
}

/**
 * Clipping information for fill or extrude operations
 */
interface ClipInfo {
  /** Whether this is a fill clip operation */
  fillClip?: boolean;
  /** Whether this is an extrude clip operation */
  extrudeClip?: boolean;
  /** Coordinate system for the clip */
  coordinate?: unknown;
  /** Loop points for extrude clips */
  loop?: [number, number][];
}

/**
 * Result of clipping operations containing mesh data
 */
interface ClipResult {
  /** Array of clipping meshes */
  clipMeshes?: THREE.Mesh[];
  /** Array of cutting planes */
  cutPlanes?: THREE.Vector3[][];
  /** Array of cutting obstacles */
  cutObstacles?: CutObstacle[];
  /** Map of node identifiers */
  nodeMap?: Map<string, unknown>;
}

/**
 * Obstacle definition for cutting operations
 */
interface CutObstacle {
  /** Coordinate system of the obstacle */
  coord: unknown;
  /** Loop defining the obstacle boundary */
  loop: Loop;
}

/**
 * Loop geometry with point data
 */
interface Loop {
  /**
   * Get all points defining the loop
   * @returns Array of points with x, y coordinates
   */
  getAllPoints(): Array<{ x: number; y: number }>;
}

/**
 * Graphics data output structure
 */
interface GraphicsData {
  /** Array of renderable objects */
  objects: GraphicsObject[];
  /** Array of mesh definitions */
  meshDefs: ClipMeshDef[];
}

/**
 * Renderable graphics object
 */
interface GraphicsObject {
  /** Array of clip mesh keys applied to this object */
  clipMeshes?: string[];
}

/**
 * Metadata for parametric content
 */
interface ContentMetadata {
  /** Extension-specific metadata */
  extension?: unknown;
}

/**
 * Host context information
 */
interface HostContext {
  /** Type of door if applicable */
  doorType: string;
}

/**
 * Clipping context passed to clip operations
 */
interface ClipContext {
  /** Bounding box of the content */
  bounding: THREE.Box3;
  /** Host context information */
  host: HostContext;
}

/**
 * Content material data structure
 */
interface ContentMaterialData {
  /** Array of graphics objects */
  objects: GraphicsObject[];
  /** Array of mesh definitions */
  meshDefs: ClipMeshDef[];
}

/**
 * Enumeration of entity event types
 */
enum EntityEventType {
  /** Geometry change event */
  Geometry = 'Geometry',
}

/**
 * NCPContent (N-Customized Parametric Content) class.
 * 
 * Extends the base Content class to provide advanced clipping and rendering
 * capabilities for parametric model content. Handles geometry updates,
 * clipping operations, and graphics data generation.
 */
declare class NCPContent extends Content {
  /** Content clipper for performing clipping operations */
  private clipper?: ContentClipper;
  
  /** Reference to the underlying parametric content */
  private ncpcontent?: ParametricModelContent;

  /**
   * Creates a new NCPContent instance
   * 
   * @param entity - The parametric model content entity
   * @param param2 - Second constructor parameter (type to be determined)
   * @param param3 - Third constructor parameter (type to be determined)
   */
  constructor(
    entity: ParametricModelContent,
    param2: unknown,
    param3: unknown
  );

  /**
   * Traverses the parent hierarchy to find the root parametric model
   * 
   * @param entity - Starting entity to traverse from
   * @returns The root parent entity
   */
  private getParent(entity: ParametricModelContent): ParametricModelContent;

  /**
   * Handles dirty cache events when geometry changes
   * 
   * @param event - Signal event containing change information
   */
  private dirtyCache(event: SignalEvent): void;

  /**
   * Clips graphics data based on content geometry and clipping meshes
   * 
   * @param entity - The parametric model content to clip
   * @param context - Clipping context with bounding and host information
   * @returns Clipped graphics data or null if clipping failed
   */
  private clipGraphicsData(
    entity: ParametricModelContent,
    context: ClipContext
  ): GraphicsData | null;

  /**
   * Gets content material data (internal method)
   * 
   * @param entity - The entity to get material data from
   * @param metadata - Content metadata
   * @param bounding - Bounding box
   * @param host - Host context
   * @returns Content material data or null
   * @private
   */
  private _getContentMaterialData(
    entity: ParametricModelContent,
    metadata: ContentMetadata,
    bounding: THREE.Box3,
    host: HostContext
  ): ContentMaterialData | null;

  /**
   * Converts the content to graphics data for rendering
   * 
   * @param forceUpdate - Whether to force regeneration of graphics data
   * @returns Graphics data containing objects and mesh definitions
   */
  toGraphicsData(forceUpdate?: boolean): GraphicsData;
}

export { NCPContent };