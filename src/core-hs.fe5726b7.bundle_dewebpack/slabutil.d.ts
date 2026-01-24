/**
 * SlabUtil - Utility module for managing building slabs (floors and ceilings)
 * Handles slab geometry, face updates, profile associations, and layer-based operations
 */

import type { Layer } from './Layer';
import type { Wall } from './Wall';
import type { Edge } from './Edge';
import type { Vertex } from './Vertex';
import type { Loop, WallLoop, RoomLoop } from './Loop';
import type { Slab } from './Slab';
import type { Face, Floor, Ceiling } from './Face';
import type { Material } from './Material';

/**
 * 3D point with x, y, z coordinates
 */
export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 2D polygon path (array of points)
 */
export type PolygonPath = Point3D[];

/**
 * Face region with outer boundary and holes
 */
export interface FaceRegion {
  /** Outer boundary polygon */
  outer: PolygonPath;
  /** Array of hole polygons */
  holes: PolygonPath[];
  /** Optional room loop reference */
  roomLoop?: RoomLoop;
  /** Flag indicating if this is a split face */
  isSplitFace?: boolean;
  /** Collection of split faces */
  splitFaces?: Face[];
}

/**
 * Layer room loops structure
 */
export interface LayerRoomLoops {
  /** Associated layer */
  layer: Layer | undefined;
  /** Array of room loops in the layer */
  roomLoops: RoomLoop[];
}

/**
 * Layer slab auto regions data structure
 */
export interface LayerSlabAutoRegions {
  /** Floor slab auto-generated regions */
  floorSlabAutoRegions: FaceRegion[];
  /** Ceiling slab auto-generated regions */
  ceilingSlabAutoRegions: FaceRegion[];
  /** Current floor slab regions */
  floorSlabRegions: FaceRegion[];
  /** Current ceiling slab regions */
  ceilingSlabRegions: FaceRegion[];
  /** Layer below current layer */
  underLayer: Layer | undefined;
  /** Layer above current layer */
  nextLayer: Layer | undefined;
  /** Wall loops in the layer below */
  underLayerLoops: WallLoop | undefined;
  /** Wall loops in the layer above */
  nextLayerLoops: WallLoop | undefined;
  /** Wall loops in current layer */
  thisLayerLoops: WallLoop | undefined;
}

/**
 * Callback function type for processing polygon paths
 */
export type PolygonProcessor = (polygon: PolygonPath) => void;

/**
 * SlabUtil - Main utility namespace for slab operations
 */
export declare namespace SlabUtil {
  /**
   * Converts a closed path to an unclosed path by removing the duplicate endpoint
   * @param path - Input polygon path
   * @returns Unclosed path or original if invalid/already unclosed
   */
  function getUnclosedPath(path: PolygonPath | unknown): PolygonPath | unknown;

  /**
   * Computes the outer boundary of two layers by unioning their root loops
   * @param currentLayer - Current layer with wall loops
   * @param otherLayer - Other layer with wall loops
   * @returns Array of outer boundary polygons
   */
  function _getLayerOutBound(currentLayer: WallLoop, otherLayer: WallLoop): PolygonPath[];

  /**
   * Updates layer slabs after wall geometry has changed
   * @param layer - Target layer to update
   * @param previousRegions - Optional previous state of slab regions
   */
  function updateLayersSlabAfterWallChanged(
    layer: Layer,
    previousRegions?: LayerSlabAutoRegions
  ): void;

  /**
   * Validates if a room loop is valid after clipping operations
   * @param clippedRegions - Regions after clipping
   * @param roomLoop - Room loop to validate
   * @param layer - Layer containing the room
   * @returns True if the room loop is valid
   */
  function _isValidRoomLoop(
    clippedRegions: FaceRegion[],
    roomLoop: RoomLoop,
    layer: Layer
  ): boolean;

  /**
   * Updates all slabs in a layer, creating or modifying floor/ceiling geometry
   * @param layer - Target layer to update
   */
  function updateLayerSlabs(layer: Layer): void;

  /**
   * Updates ceiling slabs for a layer
   * @param currentLayer - Current layer
   * @param upperLayer - Layer above current layer
   */
  function updateCeilingLayerSlabs(currentLayer: Layer, upperLayer: Layer | undefined): void;

  /**
   * Updates vertex association to walls or points
   * @param vertex - Vertex to update
   * @param target - Target entity (Wall, Edge, or Vertex)
   */
  function _updateVertexAssociation(
    vertex: Vertex,
    target: Wall | Edge | Vertex | undefined
  ): void;

  /**
   * Updates vertex associations for multiple vertices to walls
   * @param vertices - Array of vertices to update
   * @param wallPoints - Points on walls
   * @param walls - Array of walls
   */
  function _updateVertexAssociationToWalls(
    vertices: Vertex[],
    wallPoints: Point3D[],
    walls: Wall[]
  ): void;

  /**
   * Updates profile associations for multiple slabs
   * @param slabs - Array of slabs to update
   * @param wallPoints - Points on walls
   * @param walls - Array of walls
   */
  function _updateSlabsProfileAssociations(
    slabs: Slab[],
    wallPoints: Point3D[],
    walls: Wall[]
  ): void;

  /**
   * Computes face regions from base polygon and room loops
   * @param basePolygon - Base polygon outline
   * @param layerRoomLoops - Layer room loops structure
   * @param elevationZ - Z-coordinate for the region
   * @param processor - Optional callback to process each region
   * @returns Array of face regions
   */
  function _getRegions(
    basePolygon: PolygonPath,
    layerRoomLoops: LayerRoomLoops,
    elevationZ: number,
    processor?: PolygonProcessor
  ): FaceRegion[];

  /**
   * Reverses polygon direction for all regions (outer and holes)
   * @param regions - Array of regions to reverse
   */
  function _reverseRegions(regions: FaceRegion[]): void;

  /**
   * Creates a new floor slab for a layer
   * @param layer - Target layer
   * @param basePolygon - Base polygon for the slab
   * @param topRoomLoops - Room loops for top faces
   * @param bottomRoomLoops - Room loops for bottom faces
   * @param arcWallProcessor - Callback for processing arc wall points
   * @returns Created slab
   */
  function _createLayerFloorSlab(
    layer: Layer,
    basePolygon: PolygonPath,
    topRoomLoops: LayerRoomLoops,
    bottomRoomLoops: LayerRoomLoops,
    arcWallProcessor: PolygonProcessor
  ): Slab;

  /**
   * Creates a slab and its associated faces
   * @param basePolygon - Base polygon
   * @param thickness - Slab thickness
   * @param material - Optional material
   * @param topRoomLoops - Room loops for top
   * @param bottomRoomLoops - Room loops for bottom
   * @param arcWallProcessor - Arc wall point processor
   * @returns Created slab
   */
  function _createSlabAndFaces(
    basePolygon: PolygonPath,
    thickness: number,
    material: Material | undefined,
    topRoomLoops: LayerRoomLoops,
    bottomRoomLoops: LayerRoomLoops,
    arcWallProcessor: PolygonProcessor
  ): Slab;

  /**
   * Updates an existing slab and all its faces
   * @param slab - Slab to update
   * @param basePolygon - New base polygon
   * @param topRoomLoops - Room loops for top faces
   * @param bottomRoomLoops - Room loops for bottom faces
   * @param arcWallProcessor - Arc wall point processor
   */
  function _updateSlabAndFaces(
    slab: Slab,
    basePolygon: PolygonPath,
    topRoomLoops: LayerRoomLoops,
    bottomRoomLoops: LayerRoomLoops,
    arcWallProcessor: PolygonProcessor
  ): void;

  /**
   * Updates slab base profile geometry
   * @param slab - Slab to update
   * @param newPolygon - New polygon path
   * @returns True if profile was recreated, false if updated in place
   */
  function _updateSlabProfile(slab: Slab, newPolygon: PolygonPath): boolean;

  /**
   * Updates side faces of a slab
   * @param slab - Slab to update
   */
  function _updateSlabSideFaces(slab: Slab): void;

  /**
   * Converts layer data to room loops structure
   * @param layer - Target layer
   * @param wallLoops - Wall loop finder
   * @returns Layer room loops structure
   */
  function _getLayerRoomLoops(
    layer: Layer | undefined,
    wallLoops: WallLoop | undefined
  ): LayerRoomLoops;

  /**
   * Updates all faces in a layer's slabs
   * @param layer - Target layer
   */
  function updateLayerSlabFaces(layer: Layer): void;

  /**
   * Updates top or bottom faces of a slab
   * @param slab - Slab to update
   * @param faceType - Type of face (top or bottom)
   * @param roomLoops - Room loops for the faces
   * @param arcWallProcessor - Arc wall point processor
   */
  function _updateSlabTopBottomFaces(
    slab: Slab,
    faceType: HSCore.Model.SlabFaceType,
    roomLoops: LayerRoomLoops,
    arcWallProcessor: PolygonProcessor
  ): void;

  /**
   * Updates face vertex associations to geometry
   * @param slabs - Array of slabs
   * @param faceType - Type of face to update
   * @param wallPoints - Points on walls
   * @param walls - Array of walls
   */
  function _updateSlabFaceVerticesAssociations(
    slabs: Slab[],
    faceType: HSCore.Model.SlabFaceType,
    wallPoints: Point3D[],
    walls: Wall[]
  ): void;

  /**
   * Creates a face from a region definition
   * @param region - Face region
   * @param faceType - Type of face to create
   * @param material - Optional material
   * @returns Created face (Face, Floor, or Ceiling)
   */
  function _createFaceFromRegion(
    region: FaceRegion,
    faceType: HSCore.Model.SlabFaceType,
    material: Material | undefined
  ): Face | Floor | Ceiling;

  /**
   * Updates an existing face with new region geometry
   * @param face - Face to update
   * @param faceType - Type of face
   * @param region - New region definition
   */
  function _updateFaceRegion(
    face: Face,
    faceType: HSCore.Model.SlabFaceType,
    region: FaceRegion
  ): void;

  /**
   * Updates slab edge curves to match wall curves
   * @param slab - Slab to update
   * @param wall - Wall with curve data
   * @param processedEdges - Set of already processed edge IDs
   * @param processedProfiles - Set of already processed profile IDs
   * @returns True if all edges were successfully updated
   */
  function _updateSlabEdgesWallCurve(
    slab: Slab,
    wall: Wall,
    processedEdges: Map<string, boolean>,
    processedProfiles: Set<string>
  ): boolean;

  /**
   * Computes slab update regions by comparing old and new auto regions
   * @param currentRegions - Current slab regions
   * @param oldAutoRegions - Previous auto-generated regions
   * @param newAutoRegions - New auto-generated regions
   * @returns Updated regions
   */
  function _getSlabUpdateRegions(
    currentRegions: FaceRegion[],
    oldAutoRegions: FaceRegion[],
    newAutoRegions: FaceRegion[]
  ): FaceRegion[];

  /**
   * Converts slabs to face regions
   * @param slabs - Array of slabs
   * @returns Array of face regions
   */
  function _getSlabRegions(slabs: Slab[]): FaceRegion[];

  /**
   * Computes all auto-generated slab regions for a layer
   * @param layer - Target layer
   * @returns Complete slab auto regions data
   */
  function getLayerSlabAutoRegions(layer: Layer): LayerSlabAutoRegions;

  /**
   * Generates a processor function for inserting arc wall points into polygons
   * @param currentLayer - Current layer
   * @param otherLayer - Other layer (above or below)
   * @returns Polygon processor function
   */
  function _getInsertArcWallPoints(
    currentLayer: Layer | undefined,
    otherLayer: Layer | undefined
  ): PolygonProcessor;

  /**
   * Updates floor slabs for a layer
   * @param layer - Target layer
   * @param regions - Regions to update
   * @param thisLayerLoops - Current layer wall loops
   * @param underLayerLoops - Under layer wall loops
   * @param underLayer - Layer below
   */
  function _updateLayerFloorSlabs(
    layer: Layer,
    regions: FaceRegion[],
    thisLayerLoops: WallLoop | undefined,
    underLayerLoops: WallLoop | undefined,
    underLayer: Layer | undefined
  ): void;

  /**
   * Finds the appropriate vertex association for a face vertex
   * @param vertex - Vertex to find association for
   * @param profileVertices - Profile vertices
   * @param profileEdges - Profile edges
   * @param wallPoints - Wall points
   * @param walls - Array of walls
   * @returns Associated entity or undefined
   */
  function _getFaceVertexAssociation(
    vertex: Vertex,
    profileVertices: Vertex[],
    profileEdges: Edge[],
    wallPoints: Point3D[],
    walls: Wall[]
  ): Vertex | Edge | Wall | undefined;
}

export { SlabUtil };