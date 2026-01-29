import { Entity, EntityFlagEnum } from './Entity';
import { DecorateSketch2d } from './DecorateSketch2d';
import { NCustomizedFeatureModel, NCustomizedFeatureModel_IO } from './NCustomizedFeatureModel';
import { Signal, SignalHook } from './Signal';
import { Matrix4, Vector2, Vector3, Plane, Tolerance, Polygon, Coordinate3 } from './Math';
import { alg } from './BRepAlgorithm';
import { SketchBrepNameHelper } from './SketchBrepNameHelper';
import { EntityEventType } from './EntityEvent';
import { SketchHelper } from './SketchHelper';
import { SketchEncoder } from './SketchEncoder';
import { Sketch2BrepHelper } from './Sketch2BrepHelper';
import { BRepCalculateProject } from './BRepCalculateProject';
import { MathUtil } from './MathUtil';
import { Logger } from './Logger';
import { Material } from './Material';

/**
 * Sketch face shell association information
 */
interface FaceShellInfo {
  /** 2D sketch face */
  face2d: any;
  /** 3D brep face */
  face: any;
  /** Extrusion value */
  value: number;
}

/**
 * Material data structure
 */
interface MaterialData {
  /** Material instance */
  material: Material;
  /** Associated sketch component ID */
  sketchComId?: string;
  /** Face tag */
  tag: string;
}

/**
 * Sketch face bounds information
 */
interface SketchBoundsInfo {
  /** Bounding box of sketch faces */
  sketchBound: number[] | undefined;
  /** Maximum extrusion value */
  maxValue: number;
}

/**
 * Load options for entity deserialization
 */
interface LoadOptions {
  /** Additional load options */
  [key: string]: any;
}

/**
 * Dump options for entity serialization
 */
interface DumpOptions {
  /** Additional dump options */
  [key: string]: any;
}

/**
 * Dumped entity data structure
 */
interface DumpedData {
  /** Sketch entity ID */
  sketchId?: string;
  /** Flag to ignore brep generation */
  ignoreGenerateBrep?: boolean;
  /** Additional dumped properties */
  [key: string]: any;
}

/**
 * I/O handler for NCustomizedSketchModel serialization and deserialization
 */
declare class NCustomizedSketchModel_IO extends NCustomizedFeatureModel_IO {
  /**
   * Serialize the sketch model to a data structure
   * @param entity - The sketch model entity to dump
   * @param callback - Optional callback to modify dumped data
   * @param includeChildren - Whether to include child entities
   * @param options - Additional dump options
   * @returns Serialized data array
   */
  dump(
    entity: NCustomizedSketchModel,
    callback?: (data: DumpedData[], entity: NCustomizedSketchModel) => void,
    includeChildren?: boolean,
    options?: DumpOptions
  ): DumpedData[];

  /**
   * Deserialize data into a sketch model entity
   * @param entity - The target entity to load data into
   * @param data - The serialized data to load
   * @param options - Additional load options
   */
  load(
    entity: NCustomizedSketchModel,
    data: DumpedData,
    options?: LoadOptions
  ): void;
}

/**
 * Customized sketch-based 3D model entity
 * Generates 3D brep geometry from 2D sketch faces with extrusion
 */
declare class NCustomizedSketchModel extends NCustomizedFeatureModel {
  /** Default Z-axis offset to avoid geometry conflicts */
  static readonly DEFAULT_Z_OFFSET: number;

  /** Signal dispatched when sketch geometry becomes dirty */
  readonly signalSketchDirty: Signal<this>;

  /** Internal 2D sketch entity */
  private _sketch?: DecorateSketch2d;

  /** Hook for managing sketch signal subscriptions */
  private readonly _sketchSignalHook: SignalHook<this>;

  /** Mapping between sketch faces and generated brep shells */
  faceShells: any[];

  /**
   * Constructor
   * @param id - Unique entity identifier
   * @param parent - Optional parent entity
   */
  constructor(id?: string, parent?: Entity);

  /**
   * Get the associated 2D sketch
   * Lazily creates a new sketch if not already set
   */
  get sketch(): DecorateSketch2d;

  /**
   * Set the associated 2D sketch
   */
  set sketch(value: DecorateSketch2d);

  /**
   * Add a sketch as a child entity
   * @param sketch - The sketch to add
   */
  addChildSketch(sketch: DecorateSketch2d): void;

  /**
   * Remove existing sketch children (except the specified one)
   * @param keepSketch - Optional sketch to retain
   */
  clearChildSketch(keepSketch?: DecorateSketch2d): void;

  /**
   * Bind signal listeners to the sketch's events
   */
  bindSketchSignal(): void;

  /**
   * Handler for sketch build completion
   */
  onSketchBuildComplete(): void;

  /**
   * Handler for sketch geometry changes
   * @param event - Event data containing change information
   */
  onSketchDirty(event: { data?: { type: EntityEventType } }): void;

  /**
   * Handler for sketch face copy operations
   * Duplicates material associations and dependent entities (light slots, moldings, bands)
   * @param event - Event containing source and copied face IDs
   */
  onCopyFace2d(event: { data?: { sourceId: string; copyId: string } }): void;

  /**
   * Calculate bounding box and maximum extrusion of all sketch faces
   * @returns Bounds information or undefined if no sketch exists
   */
  getSketchFacesBoundInfo(): SketchBoundsInfo | undefined;

  /**
   * Initialize model position and dimensions based on sketch bounds
   */
  initializeContentPositionBySketch(): void;

  /**
   * Get bottom faces of the extruded model
   * @param faceTag - Optional specific face tag to filter
   * @returns Array of bottom brep faces
   */
  getBottomFaceInfo(faceTag?: string): any[];

  /**
   * Mark geometry as dirty and trigger updates
   * @param recursive - Whether to propagate to children
   */
  dirtyGeometry(recursive?: boolean): void;

  /**
   * Mark clipping geometry as dirty
   * @param recursive - Whether to propagate to children
   */
  dirtyClipGeometry(recursive?: boolean): void;

  /**
   * Generate 3D brep geometry from the 2D sketch
   * @param updateOnly - If true, only update internal breps without replacing
   */
  generateBrep(updateOnly?: boolean): void;

  /**
   * Generate brep using origin-based shell construction
   * @param updateOnly - If true, only update internal breps
   */
  generateBrepBefore(updateOnly?: boolean): void;

  /**
   * Generate brep shells from sketch curves
   * @returns Array of generated shells
   */
  generateSketchShells(): any[];

  /**
   * Generate shells from sketch using origin-based algorithm
   * @returns Array of generated shells
   */
  generateSketchShellsFromOrigin(): any[];

  /**
   * Apply pull/push extrusion to sketch faces
   * @param faceInfos - Array of face extrusion information
   * @param shells - Target shells to modify
   */
  pullPushSketchFaces(faceInfos: FaceShellInfo[], shells: any[]): void;

  /**
   * Calculate transformation matrix from sketch space to model space
   * @returns Transformation matrix
   */
  getSketchTransformMatrix(): Matrix4;

  /**
   * Update material mappings based on sketch face associations
   * @param forceUpdate - Whether to force update all face materials
   */
  updateMaterialMpBysketchAssoc(forceUpdate?: boolean): void;

  /**
   * Update material mappings using sketch component IDs
   */
  updateMaterialMpBySketchComId(): void;

  /**
   * Calculate mapping between shell faces and sketch faces
   * @param shell - The brep shell to analyze
   * @param encodedFaces - Encoded sketch face data
   * @returns Array of face associations with extrusion values
   */
  calcShellSketchFaceMp(shell: any, encodedFaces: any[]): FaceShellInfo[];

  /**
   * Extract 3D curves from all sketch faces
   * @returns Array of curve arrays (one per face)
   */
  extract3DCurvesFromSketch(): any[][];

  /**
   * Extract material data related to a specific sketch face
   * @param faceId - The sketch face ID
   * @returns Object containing default and face-specific material maps
   */
  extractSketchFaceRelatedMaterials(faceId: string): {
    materialDatas: Map<string, MaterialData>;
    materials: Map<string, MaterialData>;
  };

  /**
   * Find sketch face by its ID
   * @param faceId - The face ID to search for
   * @returns The sketch face or undefined
   */
  extractSketchFaceByFaceId(faceId: string): any | undefined;

  /**
   * Build association map between source and copied sketch faces
   * @param sourceFaceId - Original face ID
   * @param copyFaceId - Copied face ID
   * @returns Map of source component IDs to copied component IDs
   */
  extractCopySketchFaceAsso(sourceFaceId: string, copyFaceId: string): Map<string, string>;

  /**
   * Apply material to bottom faces of the model
   * @param material - Material or material data to apply
   */
  setBottomFaceMaterial(material: Material | any): void;

  /**
   * Get mesh key for the bottom face
   * @param faceTag - Optional face tag filter
   * @returns Mesh key string or empty if not found
   */
  getBottomFaceMeshKey(faceTag?: string): string;

  /**
   * Mark face materials as dirty and trigger updates
   * @param faceMeshKeys - Array of face mesh keys to update
   * @param propagate - Whether to propagate updates
   */
  dirtyFaceMaterial(faceMeshKeys: string[], propagate?: boolean): void;

  /**
   * Handler for face material changes
   * @param faceMeshKeys - Updated face mesh keys
   */
  onFaceMaterialChanged(faceMeshKeys: string[]): void;

  /**
   * Mirror the model geometry
   * @param mirrorPlane - Plane to mirror across
   */
  mirror(mirrorPlane: any): void;

  /**
   * Debug utility to display sketch curves
   */
  showSketch(): void;

  /**
   * Set entity flag on (override to manage child entities)
   * @param flag - The flag to set
   * @param value - Flag value
   */
  setFlagOn(flag: EntityFlagEnum, value?: any): void;

  /**
   * Set entity flag off (override to manage child entities)
   * @param flag - The flag to clear
   * @param value - Flag value
   */
  setFlagOff(flag: EntityFlagEnum, value?: any): void;

  /**
   * Get the I/O handler for this entity type
   * @returns Singleton I/O handler instance
   */
  getIO(): NCustomizedSketchModel_IO;
}

export { NCustomizedSketchModel, NCustomizedSketchModel_IO };