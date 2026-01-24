import type { Layer } from './Layer';
import type { Slab, SlabFace } from './Slab';
import type { IPolygon, IPath, ICurve2d, ICurve3d } from './Geometry';
import type { TrimmedSurface, Face, BrepFace } from './BrepGeometry';
import type { Structure, Wall, Beam } from './Structure';
import type { Floor, Ceiling } from './TopFace';
import { ClipMode } from './ClipMode';
import { SpaceSlabFitType, SlabFaceType } from './Enums';

/**
 * Region information for slab computation
 */
export interface ISlabRegionInfo {
  /** Slab regions */
  regions: IPolygon[];
  /** Auto-generated regions */
  autoRegions: IPolygon[];
}

/**
 * Layer slab data including floor and ceiling
 */
export interface ILayerSlabData {
  /** Floor slab region data */
  floorSlabData: ISlabRegionInfo;
  /** Ceiling slab region data */
  ceilingSlabData: ISlabRegionInfo;
}

/**
 * Region with optional split curves
 */
export interface IRegionWithSplitCurves extends IPolygon {
  /** Split curves for region subdivision */
  splitCurves?: ICurve2d[];
  /** Clone method for split curves */
  cloneSplitCurves?(): ICurve2d[];
}

/**
 * Path information for room regions
 */
export interface IRoomPath {
  /** Region path */
  path: IPolygon;
  /** Region identifier */
  id?: string;
  /** Whether this is an automatically generated loop */
  autoLoop: boolean;
}

/**
 * Shell wrapper containing shell geometry and faces
 */
export interface IShellWrapper {
  /** Shell geometry */
  shell: any;
  /** Top face of the shell */
  topFace: BrepFace;
  /** Bottom face of the shell */
  bottomFace: BrepFace;
  /** Side faces of the shell */
  sideFaces: BrepFace[][];
  /** All faces */
  faces: BrepFace[];
}

/**
 * BrepFace with metadata
 */
export interface IBrepFaceWithMeta {
  /** The BREP face */
  brepFace: BrepFace;
  /** Whether this is an automatically generated loop */
  autoLoop?: boolean;
  /** Region identifier */
  id?: string;
  /** Linked structure faces */
  linkedStructFaces?: Face[];
}

/**
 * Result of face creation/update operations
 */
export interface ISlabFaceResult {
  /** Current faces after operation */
  currentFaces: SlabFace[];
  /** Faces that were modified */
  changedFaces: SlabFace[];
}

/**
 * Result of slab creation operation
 */
export interface ISlabCreationResult {
  /** Created slab */
  slab: Slab;
  /** Changed faces from creation */
  changedFaces: SlabFace[];
}

/**
 * Region for face creation
 */
export interface IFaceRegion {
  /** Region path */
  path: IPolygon;
  /** Whether this is an automatically generated loop */
  autoLoop?: boolean;
  /** Region identifier */
  id?: string;
}

/**
 * Utility class for slab-related operations including creation, update, and face management
 */
export declare class TgSlabUtil {
  /**
   * Update layer slabs after structure changes (walls, beams, etc.)
   * @param layer - Target layer
   * @param previousSlabData - Previous slab data (optional)
   * @param changedRegions - Changed region data (optional)
   * @param fitType - Slab fitting type
   * @param intersectCeilingRegion - Ceiling region intersection data (optional)
   */
  static updateLayersSlabAfterStructureChanged(
    layer: Layer,
    previousSlabData?: ILayerSlabData,
    changedRegions?: IRegionWithSplitCurves[],
    fitType?: SpaceSlabFitType,
    intersectCeilingRegion?: IPolygon[]
  ): void;

  /**
   * Update floor slabs after 2D sketch changes
   * @param layer - Target layer
   * @param floorSlabRegions - New floor slab regions
   * @param changedRegions - Changed region data (optional)
   * @param fitType - Slab fitting type
   */
  static updateFloorSlabsAfterSketch2dChanged(
    layer: Layer,
    floorSlabRegions: IPolygon[],
    changedRegions?: IRegionWithSplitCurves[],
    fitType?: SpaceSlabFitType
  ): void;

  /**
   * Update ceiling slabs after 2D sketch changes
   * @param layer - Target layer
   * @param ceilingSlabRegions - New ceiling slab regions
   */
  static updateCeilingSlabsAfterSketch2dChanged(
    layer: Layer,
    ceilingSlabRegions: IPolygon[]
  ): void;

  /**
   * Update ceiling after beam changes
   * @param layer - Layer containing modified beams
   */
  static updateCeilingAfterBeamChanged(layer: Layer): void;

  /**
   * Update layer slab faces with specified fit type
   * @param layer - Target layer
   * @param fitType - Slab fitting type
   */
  static updateLayerSlabFaces(layer: Layer, fitType?: SpaceSlabFitType): void;

  /**
   * Get floor slab paths for a layer
   * @param layer - Target layer
   * @returns Array of slab raw paths
   */
  static getLayerFloorSlabPaths(layer: Layer | undefined): IPolygon[];

  /**
   * Get real slab paths considering structures (walls, beams, etc.)
   * @param layer - Target layer
   * @param slab - Target slab
   * @returns Array of real slab paths with holes
   */
  static getSlabRealPaths(layer: Layer, slab: Slab): IPolygon[];

  /**
   * Add sketch holes to a polygon
   * @param polygon - Base polygon
   * @param layer - Layer containing sketch holes
   * @returns Array of polygons with holes added
   */
  static addSketchHolesToPolygon(polygon: IPolygon, layer: Layer): IPolygon[];

  /**
   * Get real slab path (first real path or raw path)
   * @param layer - Target layer
   * @param slab - Target slab
   * @returns Slab path with holes
   */
  static getSlabRealPath(layer: Layer, slab: Slab): IPolygon;

  /**
   * Get raw slab path (base profile without modifications)
   * @param slab - Target slab
   * @returns Raw slab path
   */
  static getSlabRawPath(slab: Slab): IPolygon;

  /**
   * Get layer floor slab raw paths
   * @param layer - Target layer
   * @returns Array of raw slab paths
   */
  static getLayerFloorSlabRawPaths(layer: Layer | undefined): IPolygon[];

  /**
   * Get top room paths for a layer
   * @param layer - Target layer
   * @returns Array of room paths
   */
  static getLayerTopRoomPaths(layer: Layer | undefined): IRoomPath[];

  /**
   * Get bottom room paths for a layer
   * @param layer - Target layer
   * @param slabPaths - Slab paths to consider
   * @returns Array of bottom room paths
   */
  static getLayerBottomRoomPaths(layer: Layer, slabPaths: IPolygon[]): IRoomPath[];

  /**
   * Create shell wrapper from polygon and height range
   * @param polygon - Base polygon
   * @param bottomOffset - Bottom height offset
   * @param topOffset - Top height offset
   * @returns Shell wrapper with faces
   */
  static getShellWrapper(polygon: IPolygon, bottomOffset: number, topOffset: number): IShellWrapper;

  /**
   * Get auto-generated slab regions for a layer
   * @param layer - Target layer
   * @returns Floor and ceiling auto regions
   */
  static getLayerSlabAutoRegions(layer: Layer): {
    floorSlabAutoRegions: IPolygon[];
    ceilingSlabAutoRegions: IPolygon[];
  };

  /**
   * Get ceiling slab auto regions by intersecting with ceiling region
   * @param layer - Target layer
   * @param ceilingRegion - Ceiling region to intersect
   * @returns Ceiling auto regions
   */
  static getLayerCeilingSlabAutoRegionsByIntersectCeilingRegion(
    layer: Layer,
    ceilingRegion: IPolygon[]
  ): IPolygon[];

  /**
   * Get comprehensive slab region information for a layer
   * @param layer - Target layer
   * @returns Floor and ceiling slab data
   */
  static getLayerSlabRegionsInfo(layer: Layer): ILayerSlabData;

  /**
   * Get maximum slab path (optionally expanded by auto regions)
   * @param slab - Target slab
   * @param expandByAutoRegion - Whether to expand by auto region
   * @param baseLayer - Base layer for calculation
   * @returns Maximum slab path
   */
  static getSlabMaxPath(
    slab: Slab,
    expandByAutoRegion?: boolean,
    baseLayer?: Layer
  ): IPolygon;

  /**
   * Get outdoor slab paths
   * @param layer - Outdoor layer
   * @returns Array of outdoor slab paths
   */
  static getOutdoorSlabPaths(layer: Layer): IPolygon[];

  /**
   * Get slab shell geometry
   * @param slab - Target slab
   * @param expandByAutoRegion - Whether to expand by auto region
   * @param baseLayer - Base layer for calculation
   * @returns Shell wrapper
   */
  static getSlabShell(
    slab: Slab,
    expandByAutoRegion?: boolean,
    baseLayer?: Layer
  ): IShellWrapper;

  /**
   * Get outdoor slab shell geometries
   * @param slab - Outdoor slab
   * @returns Array of shell wrappers
   */
  static getOutdoorSlabShells(slab: Slab): IShellWrapper[];

  /**
   * Get edited slab shell geometries
   * @param slab - Target slab
   * @param baseLayer - Base layer
   * @returns Array of shell wrappers
   */
  static getEditedSlabShells(slab: Slab, baseLayer?: Layer): IShellWrapper[];

  /**
   * Match room region split curves with new data
   * @param layer - Target layer
   * @param newRegions - New regions with split curves
   */
  static matchRoomRegionSplitCurves(
    layer: Layer,
    newRegions?: IRegionWithSplitCurves[]
  ): void;

  /**
   * Update slab profile with new outer curve
   * @param slab - Target slab
   * @param outerCurve - New outer curve
   * @param updateDirection - Whether to update direction
   */
  static updateSlabProfile(slab: Slab, outerCurve: ICurve2d[], updateDirection?: boolean): void;

  /**
   * Update layer slab auxiliary faces
   * @param layer - Target layer
   * @returns Map of face to linked structure faces
   */
  static updateLayerSlabAuxFaces(layer: Layer): Map<SlabFace, Face[]>;

  /**
   * Add slab face to layer
   * @param layer - Target layer
   * @param slab - Parent slab
   * @param faceType - Face type
   * @param face - Face to add
   * @param isAuxFace - Whether this is an auxiliary face
   * @param regionId - Region identifier
   */
  static addSlabFace(
    layer: Layer,
    slab: Slab,
    faceType: SlabFaceType,
    face: SlabFace,
    isAuxFace: boolean,
    regionId?: string
  ): void;

  /**
   * Remove slab face from layer
   * @param layer - Target layer
   * @param slab - Parent slab
   * @param face - Face to remove
   */
  static removeSlabFace(layer: Layer, slab: Slab, face: SlabFace): void;

  /**
   * Get structures (walls, beams, etc.) contained in a slab
   * @param slab - Target slab
   * @param layer - Layer containing the slab
   * @returns Array of structures in slab
   */
  static getStructuresInSlab(slab: Slab, layer: Layer): Structure[];

  /**
   * Update ceiling layer slabs based on floor layer
   * @param ceilingLayer - Ceiling layer to update
   * @param floorLayer - Floor layer reference
   */
  static updateCeilingLayerSlabs(ceilingLayer: Layer, floorLayer: Layer): void;

  /**
   * Temporary method for slab processing
   * @param layer - Target layer
   */
  static tmp(layer: Layer): void;

  /** @internal */
  private static _updateLayerFloorSlabs(
    layer: Layer,
    slabRegions: IPolygon[],
    underLayer: Layer | undefined
  ): void;

  /** @internal */
  private static _getSlabRegionsAfterStructureChanged(
    currentRegions: IPolygon[],
    oldAutoRegions: IPolygon[],
    newAutoRegions: IPolygon[]
  ): IPolygon[];

  /** @internal */
  private static _createOrUpdateSlabSideFaces(layer: Layer, slab: Slab): ISlabFaceResult;

  /** @internal */
  private static _createOrUpdateSlabTopBottomFaces(
    layer: Layer,
    slab: Slab,
    faceType: SlabFaceType,
    roomPaths: IRoomPath[],
    slabPath?: IPolygon
  ): ISlabFaceResult;

  /** @internal */
  private static _setSlabFacesByBrepFaces(
    layer: Layer,
    slab: Slab,
    faceType: SlabFaceType,
    brepFaces: IBrepFaceWithMeta[],
    isAuxFace?: boolean,
    linkedStructFacesMap?: Map<SlabFace, Face[]>
  ): ISlabFaceResult;

  /** @internal */
  private static _createOrUpdateSlabFace(
    layer: Layer,
    slab: Slab,
    processedFaces: Set<SlabFace>,
    brepFaceData: IBrepFaceWithMeta,
    faceType: SlabFaceType,
    oldFaceInfoMap: Map<SlabFace, any>,
    oldFaceList: SlabFace[],
    isAuxFace: boolean,
    oldFaceFullInfoMap?: Map<SlabFace, any>
  ): { currentFace: SlabFace; isFaceChanged: boolean };

  /** @internal */
  private static _updateSlabAndFaces(
    layer: Layer,
    slab: Slab,
    slabRegion: IPolygon,
    topRoomPaths: IRoomPath[],
    bottomRoomPaths: IRoomPath[]
  ): ISlabFaceResult;

  /** @internal */
  private static _createSlabProfile(outerCurves: ICurve2d[]): any;

  /** @internal */
  private static _createSlabAndFaces(
    layer: Layer,
    slabRegion: IPolygon,
    topRoomPaths: IRoomPath[],
    bottomRoomPaths: IRoomPath[]
  ): ISlabCreationResult;

  /** @internal */
  private static _createOrUpdateSlabAuxFaces(
    layer: Layer,
    slab: Slab,
    linkedStructFacesMap: Map<SlabFace, Face[]>
  ): ISlabFaceResult;

  /** @internal */
  private static _getSplitFaceRegions(
    layer: Layer,
    slabPath: IPolygon,
    faceType: SlabFaceType,
    roomPaths: IRoomPath[]
  ): IFaceRegion[];

  /** @internal */
  private static _getFaceRegions(
    layer: Layer,
    polygon: IPolygon,
    roomPaths: IRoomPath[],
    faceType: SlabFaceType
  ): IFaceRegion[];

  /** @internal */
  private static _createHorizontalTrimedSurface(
    layer: Layer,
    path: IPolygon,
    faceType: SlabFaceType
  ): TrimmedSurface;

  /** @internal */
  private static _calcRemoveFloorsAndCeilingsForSlabChanged(
    newSlabRegion: IPolygon,
    oldSlab: Slab,
    floorsToRemove: Floor[],
    ceilingsToRemove: Ceiling[]
  ): void;

  /** @internal */
  private static _isValidMatch(face: SlabFace, isAutoLoop: boolean): boolean;

  /** @internal */
  private static _udpateSlabHole(layer: Layer, slabChangedFacesMap: Map<Slab, SlabFace[]>): void;

  /** @internal */
  private static _dirtyLayerInfo(layer: Layer): void;
}