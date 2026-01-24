/**
 * NCPContent Clipper Module
 * Provides functionality for clipping and cutting planes to mesh definitions
 */

import type { ContentClipper } from './ContentClipper';

/**
 * Mesh definition structure returned by cutPlanesToMeshDefs
 */
interface MeshDefinition {
  /** Unique identifier for the mesh */
  meshKey: string;
  /** Array of face indices for rendering */
  faceIndices: number[];
  /** Total count of indices */
  indexCount: number;
  /** Flattened array of vertex position coordinates [x, y, z, ...] */
  vertexPositions: number[];
  /** Total number of vertices */
  vertexCount: number;
  /** Visibility flag for the mesh */
  visible: boolean;
}

/**
 * Obstacle information structure
 */
interface ObstacleInfo {
  // Define based on NCustomizedFeatureModelUtil.getObstacleInfos return type
  [key: string]: unknown;
}

/**
 * Result structure returned by getAllClipMeshes
 */
interface ClipMeshesResult {
  /** Array of generated clip meshes */
  clipMeshes: unknown[];
  /** Cutting planes extracted from the content */
  cutPlanes: unknown[];
  /** Map of nodes (structure depends on implementation) */
  nodeMap: Map<unknown, unknown>;
  /** Array of obstacle information */
  cutObstacles: ObstacleInfo[];
}

/**
 * Cutting plane definition (3D plane in space)
 */
interface CutPlane {
  // Define based on HSCore.Geometry.Util.getNCPContentClipPlanes return type
  [key: string]: unknown;
}

/**
 * 3D Point structure
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * NCPContentClipper class
 * Extends ContentClipper to provide NCP-specific content clipping functionality
 */
export declare class NCPContentClipper extends ContentClipper {
  /** Reference to the NCP content being clipped */
  protected readonly ncpcontent: unknown;

  /**
   * Creates an instance of NCPContentClipper
   * @param ncpcontent - The NCP content entity to be clipped
   */
  constructor(ncpcontent: unknown);

  /**
   * Cuts planes to mesh definitions
   * Converts cutting planes into triangulated mesh data structures
   * 
   * @param cutPlanes - Array of cutting planes to process
   * @param meshIndex - Index identifier for the mesh
   * @param adjustBoundary - Whether to adjust boundary vertices (adds ±5e-4 offset to y-coordinates at min/max)
   * @param useBox - Whether to use box construction method
   * @param offset - Additional offset value for mesh generation
   * @returns Array of mesh definitions with vertices and indices
   */
  cutPlanesToMeshDefs(
    cutPlanes: CutPlane[],
    meshIndex: number,
    adjustBoundary?: boolean,
    useBox?: boolean,
    offset?: number
  ): MeshDefinition[];

  /**
   * Retrieves all clip meshes and related data
   * Gathers cutting planes, obstacles, and generates node mapping
   * 
   * @param param1 - First parameter (usage depends on implementation)
   * @param param2 - Second parameter (usage depends on implementation)
   * @returns Object containing clip meshes, cut planes, node map, and obstacles
   */
  getAllClipMeshes(param1: unknown, param2: unknown): ClipMeshesResult;

  /**
   * Transforms coordinates from model space to view space
   * Converts from (x, y, z) model coordinates to (x, z, -y) view coordinates
   * 
   * @param point - Point in model space coordinates
   * @returns THREE.Vector3 in view space coordinates
   */
  ModelSpaceToViewSpace(point: Point3D): THREE.Vector3;

  /**
   * Internal method: Constructs boxes from cutting planes
   * @param cutPlanes - Array of cutting planes
   * @param meshIndex - Mesh index identifier
   * @param useBox - Whether to use box construction
   * @returns Array of vertex arrays representing boxes
   * @internal
   */
  protected _constructBoxFromCutPlanes(
    cutPlanes: CutPlane[],
    meshIndex: number,
    useBox: boolean
  ): Point3D[][][];
}