/**
 * Boundary IO and Boundary Entity Type Definitions
 * Module for handling boundary serialization and boundary entity management
 */

/**
 * Corner tile type enumeration
 */
export enum CornerTileTypeEnum {
  /** No corner tile */
  NoCornerTile = "noCornerTile",
  /** Corner tile type 1 */
  CornerTile1 = "cornerTile1",
  /** Corner tile type 2 */
  CornerTile2 = "cornerTile2"
}

/**
 * Boundary type enumeration
 */
export enum BoundaryTypeEnum {
  /** Non-boundary tile */
  NonBoundaryTile = "nonBoundaryTile",
  /** Boundary tile */
  BoundaryTile = "boundaryTile"
}

/**
 * 2D Point interface
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * Transformation matrix interface
 */
export interface TransformMatrix {
  m00_: number;
  m01_: number;
  m02_: number;
  m10_: number;
  m11_: number;
  m12_: number;
}

/**
 * Material data interface
 */
export interface IMaterialData {
  id: string;
  color?: number;
  colorMode?: number;
  useColor?: boolean;
  clone(options?: Partial<IMaterialData>): IMaterialData;
  equals(other: IMaterialData): boolean;
}

/**
 * Seam arguments configuration
 */
export interface SeamArgs {
  material?: Partial<IMaterialData>;
  width?: number;
}

/**
 * Pattern interface for wall and corner tiles
 */
export interface IPattern {
  seamColor: number;
  seamWidth: number;
  seamMaterial: IMaterialData;
  clone(): IPattern;
  setSeamArgs(args: SeamArgs): void;
}

/**
 * Wall polygon interface
 */
export interface IWallPolygon {
  id: string;
  points: Point2D[];
  material: IMaterialData;
  pattern?: IPattern;
  setPattern(pattern: IPattern): void;
  dirtyMaterial(): void;
}

/**
 * Wall corner interface
 */
export interface IWallCorner {
  id: string;
  points: Point2D[];
  material: IMaterialData;
  pattern?: IPattern;
  setPattern(pattern: IPattern): void;
  dirtyMaterial(): void;
}

/**
 * Entity base interface
 */
export interface IEntity {
  id: string;
  tag: string;
  parent?: unknown;
  replaceChildren(oldChildren: unknown[], newChildren: unknown[]): void;
}

/**
 * Dump options interface
 */
export interface DumpOptions {
  version?: string;
  [key: string]: unknown;
}

/**
 * Serialized boundary data
 */
export interface BoundaryDumpData {
  cornerType: CornerTileTypeEnum;
  boundaryType: BoundaryTypeEnum;
  width: number;
  wallPolygons: string[];
  wallCorners: string[];
  seekId: string;
  isBoundaryBrick: boolean;
  boundaryMaterial?: string;
  cornerMaterial?: string;
}

/**
 * Boundary calculation result
 */
export interface BoundaryCalculationResult {
  wallPolygons: IWallPolygon[];
  wallCorners: IWallCorner[];
}

/**
 * Boundary parent entity interface
 */
export interface IBoundaryParent {
  boundaries: Boundary[];
  getInnerBoundaryPointsIndex(index: number): Point2D[];
}

/**
 * Boundary IO class for serialization/deserialization
 */
export declare class Boundary_IO {
  private static _Boundary_IO_Instance?: Boundary_IO;

  /**
   * Get singleton instance
   */
  static instance(): Boundary_IO;

  /**
   * Serialize boundary entity to dump data
   * @param entity - Boundary entity to serialize
   * @param callback - Optional callback for custom serialization
   * @param includeChildren - Whether to include children in dump
   * @param options - Dump options
   * @returns Serialized boundary data array
   */
  dump(
    entity: Boundary,
    callback?: (data: unknown[], entity: Boundary) => void,
    includeChildren?: boolean,
    options?: DumpOptions
  ): [BoundaryDumpData];

  /**
   * Deserialize boundary entity from dump data
   * @param entity - Boundary entity to populate
   * @param data - Serialized boundary data
   * @param options - Load options
   */
  load(
    entity: Boundary,
    data: BoundaryDumpData,
    options?: DumpOptions
  ): void;
}

/**
 * Boundary entity class
 */
export declare class Boundary implements IEntity {
  /** Corner tile type enumeration */
  static readonly CornerTileTypeEnum: typeof CornerTileTypeEnum;
  
  /** Boundary type enumeration */
  static readonly BoundaryTypeEnum: typeof BoundaryTypeEnum;

  /** Entity ID */
  id: string;
  
  /** Entity tag */
  tag: string;
  
  /** Parent entity */
  parent?: IBoundaryParent;
  
  /** Seek identifier */
  seekId: string;
  
  /** Boundary type */
  boundaryType: BoundaryTypeEnum;
  
  /** Corner type */
  cornerType: CornerTileTypeEnum;
  
  /** Boundary width */
  width: number;
  
  /** Wall polygon entities */
  wallPolygons: IWallPolygon[];
  
  /** Wall corner entities */
  wallCorners: IWallCorner[];
  
  /** Boundary material */
  boundaryMaterial: IMaterialData;
  
  /** Corner material */
  cornerMaterial: IMaterialData;
  
  /** Wall pattern */
  wallPattern?: IPattern;
  
  /** Corner pattern */
  cornerPattern?: IPattern;
  
  /** Whether this is a boundary brick */
  isBoundaryBrick: boolean;
  
  /** Whether boundary needs update */
  needUpdate: boolean;
  
  /** Suitable boundary width (internal) */
  _suitableBoundaryWidth?: number;

  /**
   * Constructor
   * @param tag - Entity tag
   * @param parent - Parent entity
   */
  constructor(tag?: string, parent?: unknown);

  /**
   * Factory method to create a boundary
   * @param cornerType - Corner tile type
   * @param boundaryType - Boundary type
   * @param width - Boundary width
   * @param boundaryMaterial - Boundary material
   * @param cornerMaterial - Corner material
   * @param seekId - Seek identifier
   * @param isBoundaryBrick - Whether boundary is brick type
   * @param wallPattern - Wall pattern
   * @param cornerPattern - Corner pattern
   * @returns New boundary instance
   */
  static create(
    cornerType: CornerTileTypeEnum,
    boundaryType: BoundaryTypeEnum,
    width: number,
    boundaryMaterial: IMaterialData,
    cornerMaterial: IMaterialData,
    seekId: string,
    isBoundaryBrick: boolean,
    wallPattern?: IPattern,
    cornerPattern?: IPattern
  ): Boundary;

  /**
   * Get IO handler instance
   */
  getIO(): Boundary_IO;

  /**
   * @deprecated Use setSeamArgs instead
   */
  seamColor: number;

  /**
   * @deprecated Use setSeamArgs instead
   */
  seamWidth: number;

  /**
   * Get seam material
   */
  readonly seamMaterial: IMaterialData;

  /**
   * Set seam arguments
   * @param args - Seam configuration
   */
  setSeamArgs(args: SeamArgs): void;

  /**
   * Check if boundary has no boundary tile
   */
  isNoBoundaryTile(): boolean;

  /**
   * Transform boundary points by matrix
   * @param matrix - Transformation matrix
   */
  transform(matrix: TransformMatrix): void;

  /**
   * Get all points in boundary
   */
  getPoints(): Point2D[];

  /**
   * Get all boundary block patterns
   */
  readonly boundaryBlockPatterns: IPattern[];

  /**
   * Get wall polygons material
   */
  getWallPolygonsMaterial(): IMaterialData;

  /**
   * Get wall corners material
   */
  getWallCornersMaterial(): IMaterialData;

  /**
   * Update boundary geometry
   * @param parent - Parent entity containing boundary
   * @param force - Force update even if not needed
   */
  update(parent?: IBoundaryParent, force?: boolean): void;

  /**
   * Check if boundary is valid
   */
  isValid(): boolean;

  /**
   * Replace children entities
   * @param oldChildren - Old children to replace
   * @param newChildren - New children
   */
  replaceChildren(oldChildren: unknown[], newChildren: unknown[]): void;
}