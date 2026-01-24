import type { ParametricModel } from './ParametricModel';
import type * as THREE from 'three';

/**
 * Window entity parameters
 */
export interface WindowParameters {
  /** Starting point of the window (inner) */
  from: { x: number; y: number };
  /** Ending point of the window (inner) */
  to: { x: number; y: number };
  /** Starting point of the window (outer) */
  outerFrom: { x: number; y: number };
  /** Ending point of the window (outer) */
  outerTo: { x: number; y: number };
  /** Elevation from ground level */
  elevation: number;
  /** Total height of the window */
  height: number;
  /** Window material configuration */
  window: {
    /** Material data for the window glass/pane */
    materialData: unknown;
  };
  /** Frame configuration */
  frame: {
    /** Frame width */
    width: number;
    /** Frame thickness */
    thickness: number;
    /** Default width for frame calculations */
    defaultWidth: number;
    /** Default height for frame calculations */
    defaultHeight: number;
    /** Whether to divide frame into equal parts */
    equalparts: boolean;
    /** Number of frame divisions */
    frameNumber: number;
    /** Frame path definitions */
    paths: Array<{
      /** 2D path points defining frame shape */
      path: Array<{ x: number; y: number }>;
      /** Whether width is fixed during scaling */
      widthFixed?: boolean;
      /** Whether height is fixed during scaling */
      heightFixed?: boolean;
      /** Fixed width that shouldn't be affected by scaling */
      affectedFixedWidth?: number;
      /** Fixed height that shouldn't be affected by scaling */
      affectedFixedHeight?: number;
      /** Index of the previously connected path */
      lastConnected?: number;
      /** Profile identifier for this path */
      profile: string;
    }>;
    /** Profile for the bounding frame */
    boundingProfile: string;
    /** Path points for the bounding frame */
    boundingPath: Array<{ x: number; y: number }>;
    /** Molding segment definitions (array of vertex indices) */
    boundingMoldings?: number[][];
    /** Material data for the frame */
    materialData: unknown;
  };
}

/**
 * Window entity interface
 */
export interface WindowEntity {
  /** Unique identifier */
  id: string;
  /** Window parameters */
  parameters: WindowParameters;
  /** Parent entities */
  parents: Record<string, unknown>;
  /**
   * Get the host entity (e.g., wall) containing this window
   */
  getHost(): HostEntity | undefined;
  /**
   * Check if a specific flag is turned off
   */
  isFlagOff(flag: number): boolean;
}

/**
 * Host entity (e.g., Wall) that contains the window
 */
export interface HostEntity {
  /**
   * Check if a specific flag is turned off
   */
  isFlagOff(flag: number): boolean;
}

/**
 * Graphics mesh definition
 */
export interface MeshDefinition {
  // Mesh geometry and topology data
  [key: string]: unknown;
}

/**
 * Graphics object representation
 */
export interface GraphicsObject {
  /** Path to the graphics object */
  graphicsPath: string;
  /** Mesh key identifier */
  mesh: string;
  /** Material definition */
  material: MaterialObject;
  /** Entity identifier */
  entityId: string;
  /** Graphics object type */
  type: number;
  /** Visibility flag */
  visible: boolean;
  /** Custom attributes */
  customAttrs: {
    /** Room type and ID */
    roomType: string;
    /** Room area in square units */
    roomArea: number;
    /** Object type identifier */
    type: string;
  };
}

/**
 * Material object definition
 */
export interface MaterialObject {
  /** Diffuse map UV transformation matrix */
  diffuseMapUvTransform?: unknown;
  /** Normal map UV transformation matrix */
  normalMapUvTransform?: unknown;
  /** Material opacity (0-1) */
  opacity?: number;
  [key: string]: unknown;
}

/**
 * Graphics data container
 */
export interface GraphicsData {
  /** Array of mesh definitions */
  meshDefs: MeshDefinition[];
  /** Array of graphics objects */
  objects: GraphicsObject[];
}

/**
 * Mesh with custom data
 */
export interface MeshWithCustomData {
  /** Unique mesh key identifier */
  meshKey: string;
  /** Custom metadata */
  customData?: {
    /** Whether this is a placeholder mesh */
    isPlaceHolder?: boolean;
    /** Whether this defines a snapping plane */
    isSnappingPlane?: boolean;
  };
  [key: string]: unknown;
}

/**
 * Graphics computation options
 */
export interface GraphicsComputationOptions {
  /** Whether computation is during fast/preview mode */
  isDuringFastComputation: boolean;
  /** Whether to sort smooth paths */
  sortSmoothPaths: boolean;
}

/**
 * Room information
 */
export interface RoomInfo {
  /** Unique room identifier */
  id: string;
  /** Room type (e.g., "bedroom", "kitchen") */
  roomType?: string;
}

/**
 * Parametric window model
 * 
 * Generates 3D geometry for architectural windows with frames,
 * supporting complex frame patterns, multiple panes, and material assignments.
 * 
 * @module Window
 * @originalId 72537
 */
export declare class Window extends ParametricModel {
  /**
   * Creates a new Window instance
   * 
   * @param entity - The window entity data
   * @param param1 - Second constructor parameter (inherited)
   * @param param2 - Third constructor parameter (inherited)
   * @param param3 - Fourth constructor parameter (inherited)
   */
  constructor(
    entity: WindowEntity,
    param1: unknown,
    param2: unknown,
    param3: unknown
  );

  /**
   * Updates the window geometry based on current parameters
   * 
   * Generates frame paths, snapping planes, and moldings according to
   * the frame configuration (equal parts, custom paths, or default).
   */
  onUpdate(): void;

  /**
   * Creates graphics data from processed meshes
   * 
   * @param meshes - Array of meshes with custom data
   * @param windowMaterial - Material data for window panes
   * @param frameMaterial - Material data for frame
   * @param baseGraphicsObject - Base graphics object properties
   * @param roomInfo - Optional room information for metadata
   * @returns Graphics data containing mesh definitions and objects
   * @internal
   */
  protected _createGraphicsDataFromMeshes(
    meshes: MeshWithCustomData[] | undefined,
    windowMaterial: unknown,
    frameMaterial: unknown,
    baseGraphicsObject: Partial<GraphicsObject>,
    roomInfo: RoomInfo | undefined
  ): GraphicsData;

  /**
   * Generates graphics data asynchronously
   * 
   * @returns Promise resolving to graphics data
   */
  toGraphicsDataAsync(): Promise<GraphicsData>;

  /**
   * Generates graphics data synchronously
   * 
   * @returns Graphics data for immediate use
   */
  toGraphicsData(): GraphicsData;
}