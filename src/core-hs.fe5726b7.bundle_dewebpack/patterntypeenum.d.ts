/**
 * Pattern type enumeration defining different brick/tile laying patterns
 */
export enum PatternTypeEnum {
  /** Aligned rectangle pattern */
  AlignRect = "alignRect",
  /** H-shaped pattern */
  HShaped = "HShaped",
  /** Rotational mixed painting pattern */
  RotMixPaint = "RotMixPaint",
  /** 369 shape pattern */
  Shape369 = "Shape369",
  /** Herringbone pattern */
  Herringbone = "herringbone",
  /** 37 shape pattern */
  Shape37 = "Shape37",
  /** 28 shape pattern */
  Shape28 = "Shape28"
}

/**
 * Polygon spatial relationship enumeration
 */
export enum PolygonRelationEnum {
  /** Polygon A is inside Polygon B */
  PolygonAInsidePolygonB = "PolygonAInsidePolygonB",
  /** Polygon A is outside Polygon B */
  PolygonAOutsidePolygonB = "PolygonAOutsidePolygonB",
  /** Polygon A overlaps with Polygon B */
  PolygonAOverlapPolygonB = "PolygonAOverlapPolygonB",
  /** Polygon B is inside Polygon A */
  PolygonBInsidepPolygonA = "PolygonBInsidepPolygonA"
}

/**
 * Seam configuration arguments
 */
export interface SeamArgs {
  /** Seam width in millimeters */
  width?: number;
  /** Material data for the seam */
  material?: MaterialData | MaterialDataJson;
  /** Seam color (hex or RGB) */
  color?: number | string;
}

/**
 * Seam data for FGI (Floor Graphics Interface) export
 */
export interface SeamDataForFGI {
  width: number;
  material: MaterialDataJson;
  color: number;
}

/**
 * Property information descriptor
 */
export interface PropertyInfo {
  /** Unique property identifier */
  id: string;
  /** Associated state identifier */
  state: string;
  /** Property value */
  value: unknown;
  /** Whether the property is read-only */
  readonly?: boolean;
}

/**
 * Anchor point information
 */
export interface AnchorPointInfo {
  /** Anchor point identifier */
  id: string;
  /** Associated state identifier for position */
  state: string;
}

/**
 * 2D point coordinates
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * Override information for states and materials
 */
export interface OverrideInfos {
  /** State overrides mapped by state name */
  state: Record<string, unknown>;
  /** Material overrides mapped by local ID */
  material: Record<string, string>;
}

/**
 * Bounding box descriptor
 */
export interface BoundingBox {
  /** Minimum X coordinate */
  x: number;
  /** Maximum X coordinate */
  x2: number;
  /** Minimum Y coordinate */
  y: number;
  /** Maximum Y coordinate */
  y2: number;
  /** Width of bounding box */
  w: number;
  /** Height of bounding box */
  h: number;
}

/**
 * Preview box configuration
 */
export interface PreviewBox {
  /** Start position */
  start: Point2D;
  /** Width of preview box */
  width: number;
  /** Height of preview box */
  height: number;
  /** Rotation angle in degrees */
  rotation: number;
}

/**
 * Path data for a single product/block
 */
export interface PathByProduct {
  /** Local identifier */
  localId: string;
  /** Material data */
  materialData: MaterialData | MaterialDataJson;
  /** Outline polygon points */
  outline: Point2D[];
  /** Paint outline polygon points */
  paintOutline: Point2D[];
  /** Origin point */
  origin: Point2D;
  /** Rotation angle in degrees */
  rotation: number;
  /** Width dimension */
  width: number;
  /** Height dimension */
  height: number;
  /** Brick pattern options */
  brickPatternOption?: BrickPatternOption;
}

/**
 * Complete pattern data export
 */
export interface PatternData {
  /** Pattern entity ID */
  id: string;
  /** Seam configuration */
  seam: SeamDataForFGI;
  /** Pattern color */
  color?: number;
  /** Anchor points mapped by ID */
  anchorPoints: Record<string, Point2D>;
  /** Paths grouped by product */
  pathsByProduct: PathByProduct[];
  /** Block data array */
  blocks: BlockData[];
  /** Whether this is a rotational mix paving pattern */
  isRotationMixPaving: boolean;
}

/**
 * Load options for deserialization
 */
export interface LoadOptions {
  /** Version string for backward compatibility */
  version?: string;
  /** Entity lookup map */
  entities?: Record<string, Entity>;
  /** Product metadata map */
  productsMap?: Map<string, ProductMetadata>;
  /** Invalid entity IDs encountered during load */
  invalidIds?: string[];
}

/**
 * Dump context for serialization callbacks
 */
export type DumpCallback = (dump: [Record<string, unknown>, unknown], entity: Pattern) => void;

/**
 * Pattern serialization/deserialization handler
 */
export declare class Pattern_IO extends Entity_IO {
  private static _Pattern_IO_instance?: Pattern_IO;

  /**
   * Get singleton instance
   */
  static instance(): Pattern_IO;

  /**
   * Serialize pattern entity to JSON
   * @param entity - Pattern entity to dump
   * @param callback - Optional callback for custom serialization
   * @param includeMetadata - Whether to include metadata
   * @param context - Serialization context with productsMap
   * @returns Serialized data tuple
   */
  dump(
    entity: Pattern,
    callback?: DumpCallback,
    includeMetadata?: boolean,
    context?: { productsMap?: Map<string, ProductMetadata> }
  ): [Record<string, unknown>, unknown];

  /**
   * Deserialize JSON data into pattern entity
   * @param entity - Target pattern entity
   * @param data - Serialized data
   * @param options - Load options with version and entity maps
   */
  load(entity: Pattern, data: Record<string, unknown>, options?: LoadOptions): void;
}

/**
 * Pattern entity representing a tiling/paving pattern with blocks and constraints
 */
export declare class Pattern extends Entity {
  /** Pattern display name */
  name: string;
  /** Local identifier within pattern library */
  localId: string;
  /** Product metadata */
  metadata: ProductMetadata;
  /** Seek catalog ID */
  seekId: string;

  /** X dimension length (bound to state) */
  XLength: number;
  /** Y dimension length (bound to state) */
  YLength: number;
  /** Rotation angle in degrees (bound to state) */
  Rotation: number;

  /** Dynamic properties mapped by ID */
  properties: Record<string, unknown>;
  /** Property descriptors */
  propertiesInfos: PropertyInfo[];
  /** Anchor points for alignment/positioning */
  anchorPoints: Record<string, Point2D>;
  /** Anchor point descriptors */
  anchorPointInfos: AnchorPointInfo[];
  /** State variables mapped by local ID */
  states: Record<string, State>;
  /** Constraints mapped by local ID */
  constraints: Record<string, Constraint>;
  /** Group assignments */
  groups: string[];
  /** Override information */
  overrideInfos?: OverrideInfos;

  /** Associated polygon boundary */
  polygon: Polygon | null;
  /** Generated material for preview */
  generatedMaterial: Material | null;

  /** Seam configuration */
  seam: Seam;
  /** @deprecated Use setSeamArgs instead */
  seamWidth: number;
  /** @deprecated Use seam.material instead */
  readonly seamMaterial: MaterialData;
  /** @deprecated Use setSeamArgs instead */
  seamColor: number;

  /** Whether pattern is ready for rendering */
  private _ready: boolean;

  /** Signal dispatched when pattern is reset */
  signalReset: Signal<{ entity: Pattern }>;
  /** Signal dispatched when overrides are reset */
  signalResetOverride: Signal<{ entity: Pattern }>;
  /** Signal dispatched when seam width changes */
  signalSeamWidthChange: Signal<void>;

  constructor(tag?: string, doc?: Document);

  /**
   * Set seam configuration
   * @param args - Seam arguments (width, material, color)
   */
  setSeamArgs(args: SeamArgs): void;

  /**
   * Create pattern with extended seam options
   * @param metadata - Product metadata
   * @param materialMap - Material map for child blocks
   * @param seamArgs - Optional seam configuration
   */
  static createExt(
    metadata: ProductMetadata,
    materialMap?: Record<string, Material>,
    seamArgs?: SeamArgs
  ): Pattern;

  /**
   * Create pattern instance
   * @param metadata - Product metadata
   * @param materialMap - Material map for child blocks
   * @param seamArgs - Optional seam configuration
   */
  static create(
    metadata: ProductMetadata,
    materialMap?: Record<string, Material>,
    seamArgs?: SeamArgs
  ): Pattern;

  /**
   * Initialize pattern from metadata
   * @param metadata - Product metadata
   * @param userFreeData - Optional user data override
   */
  init(metadata: ProductMetadata, userFreeData?: PatternUserData): void;

  /**
   * Reset pattern to default state
   */
  reset(): void;

  /**
   * Reset override information
   */
  resetOverride(): void;

  /**
   * Add property definitions
   * @param infos - Property information array
   * @param applyValues - Whether to apply values to states
   */
  addProperties(infos: PropertyInfo[], applyValues?: boolean): void;

  /**
   * Add group assignments
   * @param groups - Group identifiers or mapping
   */
  addGroups(groups: string[] | Record<string, string[]>): void;

  /**
   * Add anchor point definitions
   * @param infos - Anchor point information array
   */
  addAnchorPoints(infos: AnchorPointInfo[]): void;

  /**
   * Add state variables
   * @param stateData - Array of state definitions
   */
  addStates(stateData: StateData[]): void;

  /**
   * Add single state variable
   * @param state - State instance
   */
  addState(state: State): void;

  /**
   * Add constraint definitions
   * @param constraintData - Array of constraint definitions
   * @returns Created constraint instances
   */
  addConstraints(constraintData: ConstraintData[]): Constraint[];

  /**
   * Add single constraint
   * @param constraint - Constraint instance
   */
  addConstraint(constraint: Constraint): void;

  /**
   * Compute constraint graph and update all states
   */
  compute(): void;

  /**
   * Get paths grouped by product with FGI material format
   */
  getPathsByProductFGI(): PathByProduct[];

  /**
   * Get paths grouped by product with standard material format
   */
  getPathsByProduct(): PathByProduct[];

  /**
   * Get complete pattern data for export
   */
  getPatternData(): PatternData;

  /**
   * Get pattern data formatted for FGI export
   */
  getPatternDataForFGI(): PatternData;

  /**
   * Calculate bounding box of all blocks
   */
  bounding(): BoundingBox;

  /**
   * Update state value by local ID
   * @param stateId - State local identifier
   * @param value - New value
   */
  updateState(stateId: string, value: unknown): void;

  /**
   * Get state by local ID
   * @param localId - State local identifier
   */
  getStateByLocalId(localId: string): State | undefined;

  /**
   * Get child block by local ID
   * @param localId - Block local identifier
   */
  getChildByLocalId(localId: string): Block | undefined;

  /**
   * Get preview box configuration for rendering
   */
  private _getPreviewBox(): PreviewBox;

  /**
   * Check if this is a rotational mix paving pattern
   */
  isRotationMixPaving(): boolean;

  /**
   * Convert to rotational mix paving pattern
   */
  convert2RotationMixPaving(): void;

  /**
   * Get scale factor for rotational mix paving
   */
  getScale4RotationMixPaving(): number;

  /**
   * Check equality with another pattern
   * @param other - Pattern to compare
   */
  equals(other: Pattern): boolean;

  /**
   * Get metadata of first child block
   */
  getChildBlockMetaData(): ProductMetadata | undefined;

  /**
   * Check if pattern is a gusset/ceiling pattern
   */
  isGussetPattern(): boolean;

  /**
   * Clone pattern with all child blocks and states
   */
  clone(): Pattern;

  /**
   * Reset grooving and chamfer data for all blocks
   * @param full - Whether to perform full reset
   */
  resetGroovingChamfer(full?: boolean): void;

  /**
   * Reset block processing data (grooving, UV transforms)
   * @param full - Whether to perform full reset
   */
  resetBlockProcessData(full?: boolean): void;

  /**
   * Iterate over all states
   * @param callback - Callback function
   * @param context - Execution context
   */
  forEachState(callback: (state: State) => void, context?: unknown): void;

  /**
   * Iterate over all constraints
   * @param callback - Callback function
   * @param context - Execution context
   */
  forEachConstraint(callback: (constraint: Constraint) => void, context?: unknown): void;

  /**
   * Mark pattern as dirty and needing recomputation
   * @param options - Dirty options
   */
  dirty(options?: DirtyOptions): void;

  /**
   * Set ready state for rendering
   * @param ready - Whether pattern is ready
   */
  setReady(ready: boolean): void;

  /**
   * Prepare brick images for all child blocks
   * @returns Promise resolving to image data map
   */
  prepareBricksImage(): Promise<Record<string, ImageData[][]>>;

  /**
   * Get IO handler for serialization
   */
  getIO(): Pattern_IO;

  /**
   * Validate pattern constraints
   */
  checkPattern(): void;

  /**
   * Destroy pattern and release resources
   */
  destroy(): void;

  /**
   * Build dependency list for constraint solving
   * @private
   */
  private _buildConstraintList(
    stateId: string,
    dependencies: Map<string, string[]>,
    visited: string[],
    result: string[]
  ): void;

  /**
   * Insert child blocks from user data
   * @private
   */
  private insertChildren(
    children: ChildBlockData[],
    resources: Record<string, Material>,
    userData: PatternUserData
  ): void;

  /**
   * Get paths by product with custom material transformer
   * @private
   */
  private _getPathsByProduct(
    materialTransform: (material: Material | MaterialDataJson) => MaterialData | MaterialDataJson
  ): PathByProduct[];
}