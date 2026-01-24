/**
 * Utility class for WebCC 3D frame and geometry processing
 * Provides helper methods for calculating frame dimensions, parsing data, and scene manipulation
 */
declare class WebCCUtility {
  /** Whether running in web environment */
  static WebEnviroment: boolean;
  
  /** Enable edge rendering for meshes */
  static EnableEdgesRendering: boolean;
  
  /** Enable mesh merging optimization */
  static EnableMeshMerge: boolean;
  
  /** Enable arc model optimization */
  static EnableArcModelOptimize: boolean;
  
  /** Level of detail (LOD) setting */
  static LodLevel: number;
  
  /** Enable hinge locking */
  static EnableLockHinge: boolean;
  
  /** Generate markers */
  static GenMark: boolean;
  
  /** Show markers */
  static ShowMark: boolean;
  
  /** Export mode for 3D models */
  static ExportMode: ExportModeEnum;
  
  /** Enable skybox rendering */
  static EnableSkyBox: boolean;
  
  /** Enable selection effect */
  static EnableSelectEffect: boolean;
  
  /** Enable simple rendering mode */
  static EnableSimpleMode: boolean;
  
  /** Enable volumetric lighting */
  static EnableVolumLight: boolean;
  
  /** Background identification flag */
  static BackgroundIdentify: boolean;
  
  /** Enable decimal China format */
  static EnableDecChina: boolean;
  
  /** Enable helper scene */
  static EnableHelperScene: boolean;
  
  /** Enable room features */
  static EnableRoom: boolean;
  
  /** Enable house corner calculation */
  static EnableHouseCC: boolean;
  
  /** Enable room UI */
  static EnableRoomUI: boolean;
  
  /** Enable animations */
  static EnableAnimation: boolean;
  
  /** Enable backstage mode */
  static EnableBackstage: boolean;
  
  /** Enable KJL_WNSL feature */
  static EnableKjl_WNSL: boolean;
  
  /** Numerical epsilon for floating point comparisons */
  static NumberEPSILON: number;
  
  /** Debug: show CSG operations */
  static DebugShowCSG: boolean;
  
  /** Debug: show information */
  static DebugShowInfo: boolean;
  
  /** Enable digital rain effect */
  static DigitalRain: boolean;
  
  /** Current WebCC mode */
  static Mode: WebCCMode;
  
  /** Number of segments for arc rendering */
  static ArcSegment: number;
  
  /** Bounding box array */
  static BoudingBox: Array<unknown>;
  
  /** Floor item size in meters */
  static FloorItemSize: number;
  
  /** Maximum rotation angle in degrees */
  static MaxRotateAngle: number;
  
  /** Decimal China IDs */
  static DecChinaIds: number[];
  
  /** Decimal China DXF data */
  static DecChinaDxf: unknown | undefined;
  
  /** GSAP animation duration */
  static GsapDuration: number;
  
  /** Hinge diameter in meters */
  static HingeDismeter: number;
  
  /** Window scale factor */
  static WindowScale: number;
  
  /** Whether to use 3D text */
  static IsUseText3d: boolean;

  /**
   * Calculate base frames info from WebCC class data
   * Filters out host frame IDs from corner frame IDs and computes bounding box
   * @param webccClass - WebCC class containing frames and corners data
   * @returns Polygon parameters with min/max X/Y coordinates
   */
  static GetBaseFramesInfo(webccClass: WebCCClass): PolygonParaInfo;

  /**
   * Get minimum Y coordinate from WebCC class (frames, corners, walls)
   * @param webccClass - WebCC class data
   * @returns Minimum Y coordinate in meters
   */
  static GetWebccClassMinY(webccClass: WebCCClass): number;

  /**
   * Get comprehensive frame information including profiles, glass plans, and geometry
   * @param webccClass - WebCC class containing configuration data
   * @param frame - Frame object to process
   * @param framesPolygon - Optional parent polygon info (updated with max depth)
   * @returns Complete frame information structure
   */
  static GetFrameInfo(
    webccClass: WebCCClass,
    frame: Frame,
    framesPolygon?: PolygonParaInfo
  ): FrameInfo;

  /**
   * Get frame information for a single frame (simplified version)
   * @param webccClass - WebCC class containing configuration data
   * @param frame - Frame object to process
   * @returns Frame information with polygon and 3D data
   */
  static GetFrameInfo_Frame(webccClass: WebCCClass, frame: Frame): FrameInfo;

  /**
   * Log mesh hierarchy level information
   * @param mesh - Babylon.js mesh or transform node
   */
  static LogMeshlevelInfo(mesh: AbstractMesh | TransformNode): void;

  /**
   * Log abstract mesh hierarchy level information
   * @param mesh - Abstract mesh node
   */
  static LogAbstractMeshlevelInfo(mesh: AbstractMesh): void;

  /**
   * Recursively log mesh hierarchy info
   * @param node - Current node
   * @param infoArray - Accumulated info array
   */
  private static logInfo(
    node: Node | null,
    infoArray: string[]
  ): void;

  /**
   * Count number of "corner" ancestors in mesh hierarchy
   * @param mesh - Mesh to analyze
   * @returns Number of corner parents
   */
  static GetParentCornerNumber(mesh: AbstractMesh | TransformNode): number;

  /**
   * Recursively collect parent names
   * @param node - Current node
   * @param parents - Accumulated parent names
   */
  private static GetParents(
    node: Node | null,
    parents: string[]
  ): void;

  /**
   * Convert meters to millimeters
   * @param meters - Value in meters
   * @returns Value in millimeters
   */
  static MToMM(meters: number): number;

  /**
   * Convert millimeters to meters
   * @param millimeters - Value in millimeters
   * @returns Value in meters
   */
  static MMToM(millimeters: number): number;

  /**
   * Split comma-separated string into number array
   * @param posString - String like "1, 2, 3"
   * @returns Array of numbers or undefined
   */
  static SplitStringPosZArray(posString: string | null): number[] | undefined;

  /**
   * Get enum key name from value
   * @param value - Enum value
   * @param enumType - Enum object
   * @returns Enum key name or undefined
   */
  static GetEnumKey<T extends Record<string, string | number>>(
    value: T[keyof T],
    enumType: T
  ): string | undefined;

  /**
   * Convert hex color string to RGB color
   * @param hexColor - Hex color like "#FFFFFF"
   * @returns Babylon.js Color3 object
   */
  static HexToRGB(hexColor: string): Color3;

  /**
   * Create and display a debug box mesh
   * @param parent - Parent mesh/node
   * @param size - Box size
   * @param position - Box position
   * @param isPickable - Whether box is pickable
   * @param name - Box name
   * @returns Created box mesh
   */
  static ShowBox(
    parent?: AbstractMesh | TransformNode | null,
    size?: number,
    position?: Vector3,
    isPickable?: boolean,
    name?: string
  ): Mesh;

  /**
   * Create and display coordinate axis system
   * @param name - Axis system name
   * @param length - Axis length
   * @param showZ - Show Z axis
   * @param showLabels - Show axis labels (X, Y, Z)
   * @returns Transform node containing all axes
   */
  static ShowAxis(
    name?: string,
    length?: number,
    showZ?: boolean,
    showLabels?: boolean
  ): TransformNode;

  /**
   * Create simplified auxiliary axis system (X and Y only)
   * @param name - Axis system name
   * @param xLength - X axis length
   * @param yLength - Y axis length
   * @returns Transform node containing axes
   */
  static ShowAuxiliaryAxis(
    name?: string,
    xLength?: number,
    yLength?: number
  ): TransformNode;

  /**
   * Convert degrees to radians
   * @param degrees - Angle in degrees
   * @returns Angle in radians
   */
  static AngleToRadian(degrees: number): number;

  /**
   * Convert radians to degrees
   * @param radians - Angle in radians
   * @returns Angle in degrees
   */
  static RadianToAngle(radians: number): number;
}

/**
 * Polygon parameters containing bounding box and depth information
 */
interface PolygonParaInfo {
  /** Minimum X coordinate in meters */
  min_x_m: number;
  /** Maximum X coordinate in meters */
  max_x_m: number;
  /** Minimum Y coordinate in meters */
  min_y_m: number;
  /** Maximum Y coordinate in meters */
  max_y_m: number;
  /** Depth in meters */
  depth_m: number;
}

/**
 * Comprehensive frame information structure
 */
interface FrameInfo {
  /** Frame object */
  frame: Frame;
  /** 3D frame specific information (for arc frames) */
  frame_3D_info?: Frame3DInfo;
  /** Frame polygon parameters */
  frame_polygon: PolygonParaInfo;
  /** Parent frames polygon parameters */
  frames_polygon?: PolygonParaInfo;
  /** Profile configurations */
  profiles: ProfileInfo[];
  /** Profile cross section data */
  profileCrosss: ProfileCrossInfo[];
  /** Glass plan configuration */
  glassPlan: GlassPlanInfo;
  /** Fly screen plan configuration */
  flyScreenPlan: FlyScreenPlanInfo;
  /** TL GD plan configuration */
  tlGDPlan: GDInfo;
  /** Series ID */
  serieid: number;
  /** Corner definitions */
  corners: Corner[];
}

/**
 * 3D frame specific information (for arc/curved frames)
 */
interface Frame3DInfo {
  /** Frame type (e.g., "3dArc") */
  frameType: string;
  /** Arc height in meters */
  frameArcHeight: number;
  /** Whether arc faces inward */
  arcFaceInner?: boolean;
  /** Frame rotation angle in radians */
  frameRotateAngle: number;
}

/**
 * WebCC class containing all project data
 */
interface WebCCClass {
  /** Array of frame objects */
  frames: Frame[];
  /** Array of corner objects */
  corners?: Corner[];
  /** Array of wall objects */
  walls?: Wall[];
  /** Profile information */
  profiles?: ProfileInfo[];
  /** Profile cross section data */
  profileCrosss?: ProfileCrossInfo[];
  /** Glass plan configuration */
  glassPlan?: GlassPlanInfo;
  /** Fly screen plan configuration */
  flyScreenPlan?: FlyScreenPlanInfo;
  /** TL GD plan configuration */
  tlGDPlan?: GDInfo;
}

/**
 * Frame object definition
 */
interface Frame {
  /** Unique frame ID */
  id?: string;
  /** Series ID for profile lookup */
  seriesId?: number;
  /** Frame type (e.g., "3dArc") */
  frameType?: string;
  /** Arc height for curved frames */
  arcHeight?: number;
  /** Whether arc faces inward */
  arcFaceInner?: boolean;
  /** Closed object containing bars/edges */
  closeObject?: CloseObject;
  /** Frame anchor point */
  anchor: Point2D;
}

/**
 * Closed object containing frame edges
 */
interface CloseObject {
  /** Array of bar/edge segments */
  bars: Bar[];
}

/**
 * Bar/edge segment with start and end points
 */
interface Bar {
  /** Start point */
  startPt: Point2D;
  /** End point */
  endPt: Point2D;
  /** Arc height if curved */
  arcHeight?: number;
}

/**
 * 2D point
 */
interface Point2D {
  /** X coordinate in meters */
  x: number;
  /** Y coordinate in meters */
  y: number;
}

/**
 * Corner definition
 */
interface Corner {
  /** Host frame ID */
  hostFrameId?: string;
  /** Array of frame IDs forming this corner */
  cornerFrameIds: string[];
  /** Start point */
  startPt: Point2D;
  /** End point */
  endPt: Point2D;
}

/**
 * Wall definition
 */
interface Wall {
  /** Array of wall boundary points */
  pts: Point2D[];
}

/**
 * Profile configuration information
 */
interface ProfileInfo {
  // Profile-specific properties
  [key: string]: unknown;
}

/**
 * Profile cross section information
 */
interface ProfileCrossInfo {
  // Cross section properties
  [key: string]: unknown;
}

/**
 * Glass plan configuration
 */
interface GlassPlanInfo {
  // Glass plan properties
  [key: string]: unknown;
}

/**
 * Fly screen plan configuration
 */
interface FlyScreenPlanInfo {
  // Fly screen properties
  [key: string]: unknown;
}

/**
 * GD (Glass Door) information
 */
interface GDInfo {
  // GD properties
  [key: string]: unknown;
}

/**
 * Export mode enumeration
 */
enum ExportModeEnum {
  GLB = 0,
  GLTF = 1,
  // Add other export modes as needed
}

/**
 * WebCC mode enumeration
 */
enum WebCCMode {
  StatusNormal = 0,
  // Add other modes as needed
}

/**
 * Babylon.js types (re-exported for convenience)
 */
type Color3 = import('@babylonjs/core').Color3;
type Vector3 = import('@babylonjs/core').Vector3;
type Mesh = import('@babylonjs/core').Mesh;
type AbstractMesh = import('@babylonjs/core').AbstractMesh;
type TransformNode = import('@babylonjs/core').TransformNode;
type Node = import('@babylonjs/core').Node;

export default WebCCUtility;