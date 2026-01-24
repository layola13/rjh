/**
 * Module: RoomSplitCurveType
 * Defines room region types, extrude types, and related geometry structures
 */

import { Region } from './Region';
import { RoomTopoFace } from './RoomTopoFace';
import { Loader } from './Loader';
import { TopoName } from './TopoName';
import type { Curve } from './Curve';
import type { Matrix3 } from './Matrix';
import type { Vector3 } from './Vector';
import type { ShellWrapper } from './Shell';

/**
 * Room extrusion type enumeration
 * Defines which face of the room region to process
 */
export enum RoomExtrudeType {
  /** Bottom face of the room */
  Bottom = "bottom",
  /** Top face of the room */
  Top = "top",
  /** Side faces of the room */
  Side = "side"
}

/**
 * Room split curve type enumeration
 * Defines how curves split room regions
 */
export enum RoomSplitCurveType {
  /** @deprecated Legacy type, should not be used */
  Deprecated = 0,
  /** Represents space division */
  Space = 1,
  /** Represents slab division */
  Slab = 2
}

/**
 * Connection point data for split curves
 * Describes where a split curve connects to room boundaries
 */
export interface SplitCurveConnectionData {
  /** Topological name identifying the connection point */
  topoName: TopoName;
  /** Position along the edge (0.0 to 1.0) */
  percent: number;
}

/**
 * Room split curve definition
 * Represents a curve that divides room space
 */
export interface RoomSplitCurve {
  /** The geometric curve */
  curve: Curve;
  /** Type of split this curve represents */
  type: RoomSplitCurveType;
  /** Optional start point connection data */
  startData?: SplitCurveConnectionData;
  /** Optional end point connection data */
  endData?: SplitCurveConnectionData;
}

/**
 * Co-edge structure with curve and topological name
 */
export interface CoEdge {
  /** Unique identifier */
  id: string;
  /** The geometric curve */
  curve: Curve;
  /** Topological naming information */
  topoName: TopoName;
}

/**
 * Co-edge path defining room boundary
 * Contains outer boundary and optional holes
 */
export interface CoEdgePath {
  /** Outer boundary loop */
  outer: CoEdge[];
  /** Inner hole loops */
  holes: CoEdge[][];
}

/**
 * Layer information for room region
 */
export interface Layer {
  /** Thickness of the slab in this layer */
  slabThickness: number;
}

/**
 * Mirror transformation
 */
export interface MirrorTransform {
  /** 3x3 transformation matrix */
  matrix3: Matrix3;
}

/**
 * Serialized room region data
 */
export interface RoomRegionDumpData {
  /** Topological IDs of all co-edges */
  topoIds: string[];
  /** Optional face IDs */
  fIds?: string[];
  /** Optional serialized split curves */
  sCs?: SerializedSplitCurve[];
}

/**
 * Serialized split curve data
 */
export interface SerializedSplitCurve {
  /** Serialized curve data */
  c: unknown;
  /** Optional start connection data */
  sData?: {
    /** Serialized topological name */
    n: unknown;
    /** Position percent */
    p: number;
  };
  /** Optional end connection data */
  eData?: {
    /** Serialized topological name */
    n: unknown;
    /** Position percent */
    p: number;
  };
  /** Split curve type */
  type?: RoomSplitCurveType;
}

/**
 * Loaded room region data structure
 */
export interface RoomRegionLoadedData {
  /** Face IDs associated with this region */
  faceIds: string[];
  /** Split curves dividing this region */
  splitCurves: RoomSplitCurve[];
}

/**
 * Clone options for room region
 */
export interface RoomRegionCloneOptions {
  /** Override split curves */
  splitCurves?: RoomSplitCurve[];
}

/**
 * Room Region class
 * Represents a 3D room space with boundaries, holes, and split curves
 * Extends base Region class with room-specific topology and extrusion
 */
export declare class RoomRegion extends Region {
  /** Layer information containing slab thickness */
  private readonly _layer: Layer;
  
  /** Co-edge path defining room boundary and holes */
  coEdgePath: CoEdgePath;
  
  /** IDs of walls linked to this room region */
  linkWallIds: string[];
  
  /** Face IDs associated with this region */
  faceIds: string[];
  
  /** Split curves dividing this region */
  splitCurves: RoomSplitCurve[];
  
  /** Shell wrapper containing extruded geometry */
  shellWrapper: ShellWrapper;
  
  /** Topological faces of the room */
  topoFaces: RoomTopoFace[];

  /**
   * Creates a new room region
   * @param id - Unique identifier
   * @param layer - Layer information
   */
  constructor(id: string, layer: Layer);

  /**
   * Factory method to create a room region with full initialization
   * @param id - Unique identifier
   * @param coEdgePath - Boundary definition
   * @param layer - Layer information
   * @param linkWallIds - Associated wall IDs
   * @returns Newly created room region
   */
  static create(
    id: string,
    coEdgePath: CoEdgePath,
    layer: Layer,
    linkWallIds: string[]
  ): RoomRegion;

  /**
   * Gets non-deprecated split curves
   * Filters out curves marked as deprecated
   */
  get roomSplitCurves(): RoomSplitCurve[];

  /**
   * Gets all co-edge topological name IDs
   */
  get allCoEdgeTopoNameIds(): string[];

  /**
   * Extrudes the room region to create 3D geometry
   * Creates bottom, top, and side faces based on slab thickness
   */
  extrudeBody(): void;

  /**
   * Finds a co-edge by its topological ID
   * @param topoId - Topological identifier to search for
   * @returns Matching co-edge or undefined
   */
  getCoEdgeTopoName(topoId: string): CoEdge | undefined;

  /**
   * Creates a deep copy of this room region
   * @param options - Optional clone customization
   * @returns Cloned room region
   */
  clone(options?: RoomRegionCloneOptions): RoomRegion;

  /**
   * Creates deep copies of all split curves
   * @returns Cloned split curve array
   */
  cloneSplitCurves(): RoomSplitCurve[];

  /**
   * Applies mirror transformation to all geometry
   * Reverses curve directions and flips geometry
   * @param transform - Mirror transformation
   */
  mirror(transform: MirrorTransform): void;

  /**
   * Translates all geometry by a vector
   * @param offset - Translation vector
   */
  translate(offset: Vector3): void;

  /**
   * Serializes room region to plain object
   * @returns Serialized data structure
   */
  dump(): RoomRegionDumpData;

  /**
   * Deserializes and applies data to this instance
   * @param data - Serialized room region data
   */
  load(data: RoomRegionDumpData): void;

  /**
   * Static deserialization helper
   * Converts serialized data to structured format
   * @param data - Serialized room region data
   * @returns Structured loaded data
   */
  static loadData(data: RoomRegionDumpData): RoomRegionLoadedData;

  /**
   * Applies loaded data to this instance
   * @param data - Structured room region data
   */
  setData(data: RoomRegionLoadedData): void;

  /**
   * Internal helper to get co-edge by ID
   * @param id - Co-edge identifier
   * @returns Matching co-edge
   * @private
   */
  private _getCoEdge(id: string): CoEdge;
}