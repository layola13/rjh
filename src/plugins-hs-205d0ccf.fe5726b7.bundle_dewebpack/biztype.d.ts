/**
 * Module: BizType
 * Snap helper system for handling point and curve snapping in floor plan editor
 */

/**
 * Curve types used in snap detection
 */
export enum CurveType {
  /** Helper ray for snap detection */
  RayHelper = "RayHelper",
  /** Enhanced ray with extended snapping */
  RayPlus = "RayPlus",
  /** Special ray type for specific snap scenarios */
  RaySpecial = "RaySpecial",
  /** Line segment with fixed endpoints */
  LineSegment = "LineSegment",
  /** Extendable line for projection snapping */
  LineExtend = "LineExtend"
}

/**
 * Business logic types for different snap targets
 */
export enum BizType {
  /** Orthogonal point snapping */
  PointOrtho = "PointOrtho",
  /** Auxiliary/guide line snapping */
  AuxiliaryLine = "AuxiliaryLine",
  /** Arc wall height dimension */
  ArcWallHeight = "ArcWallHeight",
  /** Arc wall length dimension */
  ArcWallLength = "ArcWallLength",
  /** Wall border/edge snapping */
  WallBorder = "WallBorder",
  /** Wall centerline snapping */
  WallCenter = "WallCenter"
}

/**
 * Types of snap points detected
 */
export enum SnapType {
  /** Wall border snap */
  Border = "border",
  /** Arc length snap point */
  ArcLength = "arclength",
  /** Arc height snap point */
  ArcHeight = "archeight",
  /** Auxiliary line snap */
  AuxiliaryLine = "auxiliaryline",
  /** Intersection point */
  CrossPoint = "crosspoint",
  /** Curve endpoint */
  EndPoint = "endpoint",
  /** Curve midpoint */
  MidPoint = "midpoint",
  /** Center point (e.g., of arc) */
  CenterPoint = "centerpoint",
  /** Perpendicular foot point */
  FootPoint = "footpoint",
  /** Undefined snap type */
  Undefined = "undefined"
}

/**
 * Configuration options for snap behavior
 */
export interface SnapHelperConfig {
  /** Enable orthogonal mode snapping */
  orthoModeOn?: boolean;
  /** Avoid snapping to ray curves */
  avoidSnapRay?: boolean;
  /** Enable pre-point orthogonal snapping */
  prePointOrthoSnap?: boolean;
}

/**
 * Curve bean data structure for snap candidates
 */
export interface CurveBean {
  /** The geometric curve */
  curve: any; // HSCore geometry curve type
  /** Classification of curve type */
  type: CurveType;
  /** Business logic classification */
  bizType?: BizType;
  /** Snap tolerance in pixels */
  pixelLength?: number;
  /** Special snap point on the curve */
  snapPoint?: any; // Vector2
}

/**
 * Snap result data
 */
export interface SnapResult {
  /** Offset vector from input to snap point */
  offset: any; // Vector2
  /** Type of snap detected */
  type: SnapType;
  /** The curve that was snapped to */
  curve: any; // Curve2d
}

/**
 * Dimension line display data
 */
export interface DimensionData {
  /** The dimension line geometry */
  line: any; // Line2d
  /** Whether to reverse dimension offset */
  reverseOffset: boolean;
  /** Associated arc for arc dimensions */
  linkArc?: any; // Arc2d
}

/**
 * UI data for rendering snap feedback
 */
export interface SnapUIData {
  /** Curves to display for snap feedback */
  show: any[]; // Curve2d[]
  /** Dimension annotations to display */
  dimension: DimensionData[];
  /** Optional snap point to highlight */
  point?: any; // Vector2
}

/**
 * Origin data tracking snap source
 */
export interface OriginData {
  /** Index of originating point */
  pointId?: number;
  /** Index of originating line */
  lineId?: number;
}

/**
 * Snap candidate with origin tracking
 */
export interface SnapCandidate {
  /** Origin reference */
  origin: OriginData;
  /** Bean data with distance info */
  beanData: BeanData;
}

/**
 * Bean data with snap distance
 */
export interface BeanData {
  /** Distance to snap target */
  dist: number;
  /** Target curve bean */
  bean: CurveBean;
  /** Offset to snap point */
  offset: any; // Vector2
  /** Optional intersection point */
  inter?: any; // Vector2
}

/**
 * Input geometry for snap detection
 */
export interface SnapOriginData {
  /** Points to test for snapping */
  points: any[]; // Vector2[]
  /** Lines to test for snapping */
  lines: any[]; // Line2d[]
}

/**
 * Wall reference data
 */
export interface WallReference {
  /** Wall curve geometry */
  curve: any; // Curve2d
  /** Wall face data */
  faces?: any;
  /** Optional cross-sectional path */
  crossPath?: any; // Loop
}

/**
 * Structure point with classification
 */
export interface StructurePoint {
  /** Point location */
  point: any; // Vector2
  /** Classification of point */
  type: SnapType;
}

/**
 * Helper class for intelligent point and curve snapping in 2D floor plan editing.
 * Handles wall borders, centerlines, auxiliary lines, CAD reference points, and geometric constraints.
 */
export class SnapHelper {
  /** Rendering context */
  private readonly _context: any;
  
  /** Snap behavior configuration */
  private readonly _config?: SnapHelperConfig;
  
  /** Event signal for snap events */
  public readonly signal: any; // HSCore.Util.Signal
  
  /** Current snap direction constraint */
  private _direction?: any; // Vector2
  
  /** Visual curve items for rendering */
  private readonly _curveItems: any[]; // PathItem[]
  
  /** Dimension annotation items */
  private readonly _dimensions: any[]; // Dimension[]
  
  /** Orthogonal dash line items */
  private readonly _orthoDashItems: any[]; // PathItem[]
  
  /** Endpoint highlight item */
  private readonly _endPointItem: any; // EndPointItem
  
  /** Wall polygon geometry cache */
  private _wallPolygons: any[]; // Polygon[]
  
  /** All wall curve cache */
  private _allWallCurves: any[]; // Curve2d[]
  
  /** Key snap points */
  private _points: any[]; // Vector2[]
  
  /** Primary curve snap candidates */
  private _curveBeans: CurveBean[];
  
  /** Extra curve beans (e.g., from pre-point) */
  private _extraCurveBeans: CurveBean[];
  
  /** Temporary curve beans */
  private _tempBeans: CurveBean[];
  
  /** CAD reference points */
  private _cadPoints: any[]; // Vector2[]
  
  /** Structure/column points */
  private _structurePoints: StructurePoint[];
  
  /** Map linking dimensions to arcs */
  private readonly _dimensionLinkArc: Map<any, any>; // Map<Dimension, Arc2d>
  
  /** First snap data (for two-step snapping) */
  private _firstData?: SnapCandidate;
  
  /** Whether current snap is point-based */
  private _isPointSnap: boolean;
  
  /** Whether dimensions are visible */
  private _dimensionVisible: boolean;
  
  /** Active layer reference */
  private _layer?: any;

  /**
   * Creates a new snap helper instance
   * @param context - Rendering context
   * @param config - Snap behavior configuration
   */
  constructor(context: any, config?: SnapHelperConfig);

  /**
   * Gets all active curve beans (primary + extra + temp)
   */
  get curveBeans(): CurveBean[];

  /**
   * Gets dimension annotation items
   */
  get dimensions(): any[]; // Dimension[]

  /**
   * Hides all snap visual feedback
   */
  hide(): void;

  /**
   * Controls dimension visibility
   */
  set dimensionVisible(visible: boolean);

  /**
   * Clears all snap data
   */
  clear(): void;

  /**
   * Disposes resources and removes listeners
   */
  dispose(): void;

  /**
   * Clears first snap data (resets two-step snap)
   */
  clearFirstData(): void;

  /**
   * Gets whether orthogonal mode is enabled
   */
  get orthoModeOn(): boolean;

  /**
   * Gets whether ray snapping should be avoided
   */
  get avoidSnapRay(): boolean;

  /**
   * Gets whether current snap is point-based
   */
  get isPointSnap(): boolean;

  /**
   * Refreshes snap data for wall move operation
   * @param walls - Wall references
   * @param currentWall - Currently moving wall
   * @param direction - Optional movement direction constraint
   */
  refreshForMoveWall(walls: WallReference[], currentWall?: WallReference, direction?: any): void;

  /**
   * Refreshes snap data for point move operation
   * @param walls - Wall references
   * @param structures - Structure elements
   * @param currentPoint - Currently moving point reference
   * @param direction - Optional movement direction constraint
   */
  refreshForMovePoint(
    walls: WallReference[],
    structures?: any[],
    currentPoint?: any,
    direction?: any
  ): void;

  /**
   * Refreshes snap data for auxiliary line mode
   */
  refreshForAuxiliaryLine(): void;

  /**
   * Refreshes orthogonal snap data relative to a point
   * @param point - Reference point
   */
  refreshPointOrthoData(point: any): void;

  /**
   * Refreshes auxiliary line snap candidates
   */
  refreshAuxiliaryLineData(): void;

  /**
   * Sets pre-point for orthogonal snapping
   */
  set prePoint(point: any | undefined);

  /**
   * Snaps a point using wall geometry
   * @param wall - Wall reference
   * @returns Snap offset or undefined
   */
  snapByWall(wall: WallReference): any | undefined; // Vector2

  /**
   * Performs snap detection for a point
   * @param point - Point to snap
   * @param step - Current operation step
   * @param prePoint - Optional previous point for context
   * @returns Snap result or undefined
   */
  snap(point: any, step?: number, prePoint?: any): SnapResult | undefined;

  /**
   * Snaps to nearest CAD reference point
   * @param point - Query point
   * @returns Snap offset or undefined
   */
  snapCadPoints(point: any): any | undefined; // Vector2

  /**
   * Snaps to nearest structure point
   * @param point - Query point
   * @returns Snap data or undefined
   */
  snapStructurePoints(point: any): { offset: any; type: SnapType } | undefined;

  /**
   * Hides dimensions that overlap with given curves
   * @param curves - Curves to check against
   */
  hideDimensionByCurves(curves: any[]): void;
}