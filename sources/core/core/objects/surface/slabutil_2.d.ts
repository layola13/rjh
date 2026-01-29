import type { Slab } from './Slab';
import type { Floor } from './Floor';
import type { Face } from './Face';
import type { SlabFaceType } from './SlabFaceType';
import type { Loop as ModelLoop } from './ModelLoop';
import type { Material } from './Material';
import type { MixPaint } from './MixPaint';
import type { Layer } from './Layer';
import type { Vector2, Vector3, Loop, Curve2d, Curve3d, Plane, Polygon } from './Math';

/**
 * Region definition with outer boundary and holes
 */
export interface Region {
  /** Outer boundary points or curves */
  outer: Vector3[] | Curve3d[];
  /** Inner holes, each represented by points or curves */
  holes: (Vector3[] | Curve3d[])[];
}

/**
 * Extended region with slab reference information
 */
export interface RegionWithSlab extends Region {
  /** Associated slab */
  slab?: Slab;
  /** Previous slab before update */
  oldSlab?: Slab;
  /** Whether this is a newly created face */
  newFace?: boolean;
}

/**
 * Material information matched from similar face
 */
export interface SimilarFaceMaterialInfo {
  /** Material data */
  m: Material;
  /** Associated slab ID */
  slabId: string;
  /** Same old face if found */
  sameOldFace?: Face;
  /** Room type classification */
  roomType?: string;
  /** Display name for room type */
  roomName?: string;
}

/**
 * Face overlap information for material matching
 */
interface FaceOverlapInfo {
  /** The face being evaluated */
  face: Floor;
  /** Overlapping curves */
  overlaps: Curve2d[];
  /** Material from the face */
  material?: Material;
  /** Associated slab ID */
  slabId?: string;
  /** Same old face if geometry matches */
  sameOldFace?: Face;
  /** Room type classification */
  roomType?: string;
  /** Display name for room type */
  roomName?: string;
}

/**
 * Utility class for slab operations including outdoor layer management,
 * face generation, and material handling
 */
export declare class SlabUtil {
  /**
   * Auto-fit content to slab dimensions
   * @param slab - Target slab to fit content to
   * @param content - Content object (hole or niche) to fit
   */
  static autoFitToSlab(slab: Slab, content: unknown): void;

  /**
   * Update outdoor layer slabs and regenerate associated faces
   * @param edges - Edge array for outdoor region boundary
   */
  static updateOutdoorLayerSlabs(edges: unknown[]): void;

  /**
   * Update outdoor layer slabs using curve-based approach
   * @param curves - Array of curve arrays defining boundaries
   * @param shouldUnion - Whether to union overlapping regions
   * @param facesToDelete - Faces to remove during update
   * @param forceRefresh - Force refresh even if no changes detected
   * @param offset - Optional offset vector for region positioning
   * @returns True if update was performed
   */
  static updateOutdoorLayerSlabsByCurves(
    curves: Curve3d[][],
    shouldUnion?: boolean,
    facesToDelete?: Face[],
    forceRefresh?: boolean,
    offset?: Vector2
  ): boolean | undefined;

  /**
   * Validate slab faces integrity (outer/inner loops)
   * @param slab - Slab to validate
   */
  static validateSlabFaces(slab: Slab): void;

  /**
   * Check if loop is a slab profile
   * @param loop - Loop to check
   * @returns Slab if loop is its base profile, undefined otherwise
   */
  static isSlabProfile(loop: unknown): Slab | undefined;

  /**
   * Check if vertex belongs to a slab profile
   * @param vertex - Vertex to check
   * @returns Slab if vertex is part of its profile, undefined otherwise
   */
  static isSlabProfileVertex(vertex: unknown): Slab | undefined;

  /**
   * Check if coedge belongs to a slab profile
   * @param coedge - Coedge to check
   * @returns Slab if coedge is part of its profile, undefined otherwise
   */
  static isSlabProfileCoEdge(coedge: unknown): Slab | undefined;

  /**
   * Get slab associated with a coedge
   * @param coedge - Coedge to query
   * @returns Associated slab or undefined
   */
  static getSlabForCoEdge(coedge: unknown): Slab | undefined;

  /**
   * Build outdoor slabs and faces from edge array
   * @param edges - Boundary edges
   * @param facesToDelete - Faces to delete
   * @param forceRefresh - Force refresh
   * @returns True if update successful
   */
  static buildOutDoorSlabAndFaces(
    edges: unknown[],
    facesToDelete?: Face[],
    forceRefresh?: boolean
  ): boolean | undefined;

  /**
   * Build outdoor slabs and faces from curve arrays (preferred method)
   * @param curves - Array of curve arrays defining regions
   * @param shouldUnion - Whether to union regions
   * @param facesToDelete - Faces to remove
   * @param forceRefresh - Force refresh
   * @param offset - Optional offset for positioning
   * @returns True if update successful
   */
  static buildOutDoorSlabAndFacesByCurves(
    curves: Curve3d[][],
    shouldUnion?: boolean,
    facesToDelete?: Face[],
    forceRefresh?: boolean,
    offset?: Vector2
  ): boolean | undefined;

  /**
   * Delete specified outdoor regions
   * @param facesToDelete - Faces defining regions to delete
   * @returns True if deletion successful
   */
  static deleteOutdoorRegion(facesToDelete: Floor[]): boolean | undefined;

  /**
   * Get outdoor regions by computing difference between union and room slabs
   * @param curves - Boundary curves for outdoor regions
   * @param shouldUnion - Whether to union overlapping regions
   * @returns Array of regions with outer boundaries and holes
   */
  static getOutdoorRegionUnionsDiffSlabsOuter(
    curves: Curve3d[][],
    shouldUnion?: boolean
  ): Region[];

  /**
   * Generate new slabs from regions
   * @param regions - Regions to generate slabs from
   * @param slabMap - Map to store slab-loop associations
   * @returns Array of generated loops
   * @internal
   */
  private static _generateNewSlabs(
    regions: RegionWithSlab[],
    slabMap: Map<Slab, Loop>
  ): Loop[];

  /**
   * Generate new slabs from curve-based regions
   * @param regions - Curve-based regions
   * @param slabMap - Map to store slab-loop associations
   * @returns Array of generated loops
   * @internal
   */
  private static _generateNewSlabsByCurves(
    regions: RegionWithSlab[],
    slabMap: Map<Slab, Loop>
  ): Loop[];

  /**
   * Match region to its corresponding slab
   * @param region - Region to match
   * @param slabMap - Map of slabs to loops
   * @returns Matched slab or undefined
   * @internal
   */
  private static _matchRegionSlab(
    region: RegionWithSlab | Loop,
    slabMap: Map<Slab, Loop>
  ): Slab | undefined;

  /**
   * Determine if outdoor layer needs refresh
   * @param slabs - Current outdoor slabs
   * @param roomPaths - Room boundary paths
   * @param facesToDelete - Faces marked for deletion
   * @returns True if refresh needed
   * @internal
   */
  private static _shouldRefreshOutdoor(
    slabs: Slab[],
    roomPaths: Vector2[][],
    facesToDelete: Face[]
  ): boolean;

  /**
   * Get outdoor regions from edges (legacy approach)
   * @param edges - Boundary edges
   * @param facesToDelete - Faces to exclude
   * @param zPosition - Z-coordinate for regions
   * @returns Array of regions
   * @internal
   */
  private static _getOutdoorRegions(
    edges: unknown[],
    facesToDelete: Face[],
    zPosition: number
  ): RegionWithSlab[];

  /**
   * Get outdoor regions from curves (modern approach)
   * @param curves - Boundary curves
   * @param shouldUnion - Whether to union regions
   * @returns Array of regions
   * @internal
   */
  private static _getOutdoorRegionsByCurves(
    curves: Curve3d[][],
    shouldUnion?: boolean
  ): RegionWithSlab[];

  /**
   * Create outdoor face from region geometry
   * @param region - Region defining face boundary
   * @param faceType - Type of face (top/bottom/side)
   * @param materialSource - Optional material source
   * @returns Created face
   * @internal
   */
  private static _createOutdoorFace(
    region: Region,
    faceType: SlabFaceType,
    materialSource?: Material
  ): Face;

  /**
   * Create outdoor face from BREP face
   * @param brepFace - BREP face geometry
   * @param faceType - Type of face
   * @param materialSource - Optional material source
   * @returns Created model face
   * @internal
   */
  private static _createOutdoorFaceByBrepFace(
    brepFace: unknown,
    faceType: SlabFaceType,
    materialSource?: Material
  ): Face;

  /**
   * Convert 2D curve to 3D curve at specified Z height
   * @param curve2d - 2D curve
   * @param zHeight - Z coordinate
   * @returns 3D curve or null
   * @internal
   */
  private static _curve2ToCurve3(curve2d: Curve2d, zHeight: number): Curve3d | null;

  /**
   * Convert array of 2D curves to 3D curves
   * @param curves2d - Array of 2D curves
   * @param zHeight - Z coordinate
   * @returns Array of 3D curves
   * @internal
   */
  private static _curves2Curves3(curves2d: Curve2d[], zHeight: number): Curve3d[];

  /**
   * Check if region has non-zero area
   * @param outerBoundary - Outer boundary points
   * @returns True if area > threshold
   * @internal
   */
  private static _isZeroArea(outerBoundary: Vector2[]): boolean;

  /**
   * Filter and find similar face for material inheritance
   * @param outerPath - Outer boundary path
   * @param holes - Inner holes
   * @param existingFaces - Existing faces to compare
   * @returns Material info if match found
   * @internal
   */
  private static _filterSimilarFaceMaterialInfo(
    outerPath: Vector2[],
    holes: Vector2[][],
    existingFaces: Floor[]
  ): SimilarFaceMaterialInfo | undefined;

  /**
   * Filter similar face using curve-based comparison
   * @param outerCurves - Outer boundary curves
   * @param holeCurves - Inner hole curves
   * @param existingFaces - Existing faces
   * @param facesToDelete - Faces being deleted
   * @param offset - Optional offset vector
   * @returns Material info if match found
   * @internal
   */
  private static _filterSimilarFaceMaterialInfoByCurves(
    outerCurves: Curve2d[],
    holeCurves: Curve2d[][],
    existingFaces: Floor[],
    facesToDelete: Floor[],
    offset?: Vector2
  ): SimilarFaceMaterialInfo | undefined;

  /**
   * Generate outdoor top face for region
   * @param region - Region with slab
   * @param existingTopFaces - Existing top faces
   * @param slab - Target slab
   * @internal
   */
  private static _generateOutdoorTopFace(
    region: RegionWithSlab,
    existingTopFaces: Floor[],
    slab: Slab
  ): void;

  /**
   * Generate outdoor top face using curves
   * @param region - Region with curves
   * @param existingTopFaces - Existing top faces
   * @param slab - Target slab
   * @param shellWrapper - Shell geometry wrapper
   * @param facesToDelete - Faces being deleted
   * @param offset - Optional offset
   * @internal
   */
  private static _generateOutdoorTopFaceByCurves(
    region: RegionWithSlab,
    existingTopFaces: Floor[],
    slab: Slab,
    shellWrapper: unknown,
    facesToDelete: Floor[],
    offset?: Vector2
  ): void;

  /**
   * Generate side faces for outdoor slab
   * @param loop - Loop defining slab boundary
   * @param slab - Target slab
   * @internal
   */
  private static _generateOutdoorSideFace(loop: Loop, slab: Slab): void;

  /**
   * Generate side faces using curves
   * @param loop - Loop with curves
   * @param slab - Target slab
   * @param shellWrapper - Shell geometry wrapper
   * @internal
   */
  private static _generateOutdoorSideFaceByCurves(
    loop: Loop,
    slab: Slab,
    shellWrapper: unknown
  ): void;

  /**
   * Generate bottom face for outdoor region
   * @param region - Region with slab
   * @internal
   */
  private static _generateOutdoorBottomFace(region: RegionWithSlab): void;

  /**
   * Generate bottom face using curves
   * @param region - Region with curves
   * @param slab - Target slab
   * @param shellWrapper - Shell geometry wrapper
   * @internal
   */
  private static _generateOutdoorBottomFaceByCurves(
    region: RegionWithSlab,
    slab: Slab,
    shellWrapper: unknown
  ): void;

  /**
   * Copy region data
   * @param region - Source region
   * @returns Deep copy of region
   * @internal
   */
  private static _copyRegion(region: RegionWithSlab): RegionWithSlab;

  /**
   * Copy region with curves
   * @param region - Source region
   * @returns Deep copy with cloned curves
   * @internal
   */
  private static _copyRegionByCurves(region: RegionWithSlab): RegionWithSlab;

  /**
   * Refresh old bottom faces after slab update
   * @param region - Region with old/new slab info
   * @internal
   */
  private static _refreshOldBottomFaces(region: RegionWithSlab): void;

  /**
   * Apply mixpaint material to face
   * @param face - Target face
   * @param material - Material with mixpaint data
   * @internal
   */
  private static _setFaceMixpaintMaterial(face: Face, material: Material): void;

  /**
   * Reverse region boundary orientations
   * @param regions - Regions to reverse
   * @internal
   */
  private static _reverseRegions(regions: RegionWithSlab[]): void;

  /**
   * Clean up orphaned outdoor faces
   * @internal
   */
  private static _cleanOutDoorFacesBySlab(): void;
}