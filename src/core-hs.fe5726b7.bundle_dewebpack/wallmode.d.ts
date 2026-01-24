/**
 * Wall mode enumeration - defines wall alignment relative to its positioning curve
 */
export enum WallMode {
  /** Wall aligned to inner side */
  Inner = "Inner",
  /** Wall centered on positioning curve */
  Middle = "Middle",
  /** Wall aligned to outer side */
  Outer = "Outer"
}

/**
 * Wall flag enumeration - bitwise flags for wall behavior and state
 */
export enum WallFlagEnum {
  /** Dimension display disabled */
  dimensionOff = 256,
  /** Hover state active */
  hoverOn = 512,
  /** Click state active */
  clickOn = 1024,
  /** Height can be edited */
  heightEditable = 2048,
  /** Wall rendered as transparent */
  transparent = 4096,
  /** Disable automatic connection to adjacent walls */
  disableAutoConnect = 8192,
  /** Drag operation active */
  dragOn = 16384
}

/**
 * Wall face type enumeration - identifies wall surface orientations
 */
export enum WallFaceType {
  /** Left vertical face */
  left = "left",
  /** Right vertical face */
  right = "right",
  /** Top horizontal face */
  top = "top",
  /** Bottom horizontal face */
  bottom = "bottom",
  /** Front end face */
  front = "front",
  /** Back end face */
  back = "back"
}

/**
 * Wall type enumeration - defines wall construction material/style
 */
export enum WallTypeEnum {
  /** Generic/default wall type */
  generic = "generic",
  /** Generic gypsum board wall */
  gypsum_generic = "gypsum_generic",
  /** Generic brick wall */
  brick_generic = "brick_generic",
  /** Concrete wall */
  concrete = "concrete"
}

/**
 * Wall surface type enumeration - identifies specific wall surfaces for material assignment
 */
export enum WallSurfaceTypeEnum {
  /** Inner surface */
  inner = "inner",
  /** Outer surface */
  outer = "outer",
  /** Top surface */
  top = "top",
  /** Bottom surface */
  bottom = "bottom",
  /** Start point surface */
  from = "from",
  /** End point surface */
  to = "to",
  /** Outer start point surface */
  outerfrom = "outerfrom",
  /** Outer end point surface */
  outerto = "outerto"
}

/**
 * Wall serialization/deserialization handler
 */
export declare class Wall_IO extends Entity_IO {
  /**
   * Serialize wall entity to JSON
   * @param entity - Wall entity to serialize
   * @param callback - Optional post-processing callback
   * @param includeChildren - Whether to include child entities
   * @param options - Serialization options
   * @returns Serialized wall data array
   */
  dump(
    entity: Wall,
    callback?: (data: any[], entity: Wall) => void,
    includeChildren?: boolean,
    options?: Record<string, any>
  ): any[];

  /**
   * Deserialize wall entity from JSON
   * @param entity - Target wall entity
   * @param data - Serialized wall data
   * @param context - Deserialization context
   */
  load(entity: Wall, data: any, context: any): void;

  /**
   * Migrate and load wall data from legacy format
   * @param entity - Target wall entity
   * @param data - Legacy serialized data
   * @param context - Migration context
   */
  migrateLoad(entity: Wall, data: any, context: any): void;

  /**
   * Get singleton instance
   */
  static instance(): Wall_IO;
}

/**
 * Wall entity - represents architectural walls in floor plans
 */
export declare class Wall extends Entity {
  /** Wall construction type */
  wallType: WallTypeEnum;
  
  /** Whether wall is load-bearing */
  isLoadBearing: boolean;
  
  /** Wall thickness (width) */
  width: number;
  
  /** Wall height in 3D */
  height3d: number;
  
  /** Wall positioning curve (2D line or arc) */
  curve: Line2d | Arc2d;
  
  /** Wall alignment mode */
  mode: WallMode;
  
  /** Wall boundary path curves with metadata */
  path: Array<Curve2d & { userData: { tag: string } }>;
  
  /** Wall cross-section path curves */
  crossPath: Array<Curve2d & { userData: { tag: string } }>;

  /**
   * Create a new wall instance
   * @param id - Optional entity ID
   * @param doc - Optional parent document
   */
  constructor(id?: string, doc?: any);

  /**
   * Create a straight wall from two points
   * @param start - Start point
   * @param end - End point
   * @param width - Wall thickness
   * @param height - Wall height
   * @param path - Optional custom path
   * @param wallType - Wall construction type
   * @param isLoadBearing - Whether wall is load-bearing
   * @param mode - Wall alignment mode
   * @returns New wall instance
   */
  static createLineWall(
    start: Vector2,
    end: Vector2,
    width: number,
    height: number,
    path?: Array<Curve2d>,
    wallType?: WallTypeEnum,
    isLoadBearing?: boolean,
    mode?: WallMode
  ): Wall;

  /**
   * Create a curved wall from arc parameters
   * @param center - Arc center point
   * @param start - Start point
   * @param end - End point
   * @param clockwise - Arc direction
   * @param width - Wall thickness
   * @param height - Wall height
   * @param path - Optional custom path
   * @param wallType - Wall construction type
   * @param isLoadBearing - Whether wall is load-bearing
   * @param mode - Wall alignment mode
   * @returns New wall instance
   */
  static createArcWall(
    center: Vector2,
    start: Vector2,
    end: Vector2,
    clockwise: boolean,
    width: number,
    height: number,
    path?: Array<Curve2d>,
    wallType?: WallTypeEnum,
    isLoadBearing?: boolean,
    mode?: WallMode
  ): Wall;

  /**
   * Create a wall from curve and parameters
   * @param curve - Positioning curve
   * @param width - Wall thickness
   * @param height - Wall height
   * @param path - Optional custom path
   * @param wallType - Wall construction type
   * @param isLoadBearing - Whether wall is load-bearing
   * @param mode - Wall alignment mode
   * @returns New wall instance
   */
  static create(
    curve: Line2d | Arc2d,
    width: number,
    height: number,
    path?: Array<Curve2d>,
    wallType?: WallTypeEnum,
    isLoadBearing?: boolean,
    mode?: WallMode
  ): Wall;

  /**
   * Clone this wall
   * @returns Deep copy of wall
   */
  clone(): Wall;

  /** Get wall positioning curve (accounting for alignment mode) */
  readonly positionCurve: Line2d | Arc2d;

  /** Get wall start vertex */
  readonly fromPoint: Vertex;

  /** Get wall end vertex */
  readonly toPoint: Vertex;

  /** Get wall mid vertex (arc walls only) */
  readonly midPoint: Vertex | undefined;

  /** Get IDs of associated face entities */
  readonly faceIds: string[];

  /** Get IDs of associated auxiliary face entities */
  readonly auxFaceIds: string[];

  /** Get face entities grouped by type */
  readonly faces: Record<WallFaceType, Record<string, Face>>;

  /** Get auxiliary face entities grouped by type */
  readonly auxFaces: Record<WallFaceType, Record<string, Face>>;

  /** Get list of associated face entities */
  readonly faceList: Face[];

  /** Get list of auxiliary face entities */
  readonly auxFaceList: Face[];

  /** Wall start point (getter/setter) */
  from: Vector3;

  /** Wall end point (getter/setter) */
  to: Vector3;

  /** Wall middle point for arc walls (getter/setter) */
  middle: Vector3;

  /** Get wall curve adjusted for joints */
  readonly jointCurve: Line2d | Arc2d;

  /** Get wall boundary geometry as vector array */
  readonly geometry: Vector2[];

  /** Get raw wall boundary geometry (before joint processing) */
  readonly rawGeometry: Vector2[];

  /**
   * Update wall start point
   * @param point - New start point
   */
  updateFromPoint(point: Vector3): void;

  /**
   * Update wall end point
   * @param point - New end point
   */
  updateToPoint(point: Vector3): void;

  /**
   * Update wall middle point (arc walls)
   * @param point - New middle point
   */
  updateMidPoint(point: Vector3): void;

  /** Get parent layer entity */
  readonly parent: Layer | undefined;

  /** Get left side path curves */
  readonly leftPaths: Curve2d[];

  /** Get right side path curves */
  readonly rightPaths: Curve2d[];

  /** Get start end path curves */
  readonly fromPaths: Curve2d[];

  /** Get end path curves */
  readonly toPaths: Curve2d[];

  /** Get left side cross-section curve */
  readonly leftCurve: Curve2d | undefined;

  /** Get right side cross-section curve */
  readonly rightCurve: Curve2d | undefined;

  /** Get start end cross-section curve */
  readonly fromCurve: Curve2d | undefined;

  /** Get end cross-section curve */
  readonly toCurve: Curve2d | undefined;

  /** Get start end boundary points */
  readonly fromPoints: Vector2[];

  /** Get end boundary points */
  readonly toPoints: Vector2[];

  /** Get left face entities */
  readonly leftFaces: Record<string, Face>;

  /** Get right face entities */
  readonly rightFaces: Record<string, Face>;

  /** Get top face entities */
  readonly topFaces: Record<string, Face>;

  /** Get bottom face entities */
  readonly bottomFaces: Record<string, Face>;

  /** Get front face entities */
  readonly frontFaces: Record<string, Face>;

  /** Get back face entities */
  readonly backFaces: Record<string, Face>;

  /** Get wall rotation angle in radians */
  readonly rotation: number;

  /**
   * Get face type for a specific face entity
   * @param face - Face entity
   * @returns Face type identifier
   */
  getFaceType(face: Face): WallFaceType | "";

  /**
   * Iterate over all associated face entities
   * @param callback - Function called for each face
   * @param context - Optional this context
   */
  forEachFace(callback: (face: Face) => void, context?: any): void;

  /**
   * Check if wall is arc-based (curved)
   * @returns True if arc wall
   */
  isArcWall(): boolean;

  /**
   * Validate wall integrity
   * @returns True if valid
   */
  verify(): boolean;

  /**
   * Validate wall properties and hierarchy
   * @returns True if valid
   */
  validate(): boolean;

  /**
   * Refresh internal bounding box
   */
  refreshBoundInternal(): void;

  /** Get raw boundary path (before joint processing) */
  readonly rawPath: Curve2d[];

  /**
   * Get faces of specific type
   * @param faceType - Face type to retrieve
   * @returns Face entities by ID
   */
  getFaces(faceType: WallFaceType): Record<string, Face>;

  /**
   * Split wall at a point
   * @param point - Point to split at
   * @returns New wall segment or undefined
   */
  splitByPoint(point: Vector2): Wall | undefined;

  /**
   * Merge with another wall
   * @param otherWall - Wall to merge with
   */
  merge(otherWall: Wall): void;

  /**
   * Copy properties from another wall
   * @param sourceWall - Source wall
   */
  copyProperty(sourceWall: Wall): void;

  /**
   * Mirror wall across transformation
   * @param transform - Mirror transformation
   */
  mirror(transform: Transform): void;

  /**
   * Translate wall by vector
   * @param offset - Translation vector
   */
  translate(offset: Vector2): void;

  /** Get arc radius (infinity for straight walls) */
  readonly radius: number;

  /** Get arc direction (true if clockwise) */
  readonly clockwise: boolean;

  /** Get arc center point */
  readonly center: Vector3;

  /** Get sagitta line (perpendicular from chord midpoint to arc) */
  readonly sagittaLine: Line2d;

  /** Get sagitta length (arc height) */
  readonly sagitta: number;

  /** Get sagitta direction vector */
  readonly sagittaDirection: Vector2;

  /** Get transformed direction (accounting for wall side) */
  readonly transDirection: Vector2;

  /**
   * Get transformed direction at specific point
   * @param point - Point on wall
   * @returns Direction vector
   */
  getTransDirection(point: Vector2): Vector2;

  /** Get transformed rotation angle */
  readonly transRotation: number;

  /** Get wall outline vertices */
  readonly outline: Vector2[];

  /** Get wall direction vector */
  readonly direction: Vector2;

  /** Get associated opening entities */
  readonly openings: Record<string, Opening>;

  /** Get associated parametric opening entities */
  readonly parametricOpenings: Map<string, ParametricOpening>;

  /** Get all content entities (faces, openings, etc.) */
  readonly contents: Record<string, Entity>;

  /** Get wall length */
  readonly length: number;

  /**
   * Iterate over all content entities
   * @param callback - Function called for each content
   * @param context - Optional this context
   */
  forEachContent(callback: (content: Entity) => void, context?: any): void;

  /**
   * Iterate over all opening entities
   * @param callback - Function called for each opening
   * @param context - Optional this context
   */
  forEachOpening(callback: (opening: Opening) => void, context?: any): void;

  /**
   * Iterate over all parametric opening entities
   * @param callback - Function called for each parametric opening
   * @param context - Optional this context
   */
  forEachParametricOpenings(callback: (opening: ParametricOpening) => void, context?: any): void;

  /**
   * Get material for specific face type
   * @param faceType - Face type
   * @returns Material or null
   */
  getMaterial(faceType: WallFaceType): Material | null;

  /**
   * Get tangent vector at parameter
   * @param param - Curve parameter
   * @returns Tangent vector
   */
  getTangent(param: number): Vector2;

  /**
   * Check if wall can be edited
   * @returns True if editable
   */
  canEdit(): boolean;

  /**
   * Check if wall can be selected
   * @param ignoreParents - Whether to ignore parent selection state
   * @returns True if selectable
   */
  canSelect(ignoreParents?: boolean): boolean;

  /** Get wall metadata info */
  readonly wallInfo: WallInfo | undefined;

  /** Get associated room info objects */
  readonly roomInfos: RoomInfo[];

  /** Check if wall extends full floor height */
  readonly isFullHeight: boolean;

  /**
   * Get I/O handler for serialization
   * @returns Wall I/O handler instance
   */
  getIO(): Wall_IO;
}