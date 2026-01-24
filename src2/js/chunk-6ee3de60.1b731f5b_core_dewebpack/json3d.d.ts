/**
 * Json3d module - Handles 3D JSON export functionality for window/door frames
 * @module Json3d
 */

/**
 * Profile series enumeration
 */
export enum ProfileSeries {
  Sash = 1,
  Slide2 = 2,
  Slide3 = 3,
  AntiTheft = 4,
  Fold = 5,
  Sash2 = 6,
  KFC = 7,
  AntiTheft2 = 8,
  SashMullion = 9,
  ScreenMullion = 10,
  ChineseDecoration1 = 11,
  ChineseDecoration2 = 12,
  Slide4 = 13,
  Slide5 = 14,
  Slide6 = 15,
  Slide7 = 16
}

/**
 * 2D point coordinates
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * 3D vector representation
 */
export interface Vector3D {
  x: number;
  y: number;
}

/**
 * Bar/profile object in 3D space
 */
export interface Bar3D {
  profileId: string;
  startPt: Point2D;
  endPt: Point2D;
  startAngle?: number;
  endAngle?: number;
  arcCenter?: Point2D;
  arcHeight?: number;
  startOutPt?: Point2D;
  endOutPt?: Point2D;
  startInPt?: Point2D;
  endInPt?: Point2D;
  startOutRealPt?: Point2D;
  endOutRealPt?: Point2D;
  startProfile?: string;
  endProfile?: string;
  attrs?: {
    type?: string;
    direction?: string;
    [key: string]: unknown;
  };
}

/**
 * Mullion bar in 3D
 */
export interface MullionBar3D extends Bar3D {
  opts?: Point2D[];
  isVertical?: boolean;
  isHorizontal?: boolean;
}

/**
 * Dimension mark information
 */
export interface DimensionMark {
  startPt: Point2D;
  endPt: Point2D;
}

/**
 * Color configuration
 */
export interface ColorConfig {
  bar: string;
  bead?: string;
  glass?: string;
  hardware?: string;
}

/**
 * Close object containing bars
 */
export interface CloseObject {
  bars: Bar3D[];
}

/**
 * Glass/area definition in 3D
 */
export interface Area3D {
  pts: Point2D[];
  ptBulges: number[];
  opts: Point2D[];
  optBulges: number[];
  holes: Point2D[][];
  closeObject: CloseObject;
  decBars: { opts: Point2D[] }[];
  decPoly: Point2D[];
  withShade: boolean;
  sideTrackFixeds?: { startPt: Point2D; endPt: Point2D }[];
  hasTheft?: boolean;
  dockInfos?: { dockDirection: string; dockBar: boolean }[];
  padding?: number;
  shadeWidth?: number;
  gap?: number;
}

/**
 * Sash/leaf definition
 */
export interface Sash3D {
  closeObject: CloseObject;
  mullions: MullionBar3D[];
  glass: Area3D[];
  flyScreen: Area3D[];
  shade: Area3D[];
  panel: Area3D[];
  hardwares: Hardware3D[];
  openDirection: string;
  isDoor: boolean;
  sashNumber?: string;
  sashAssignWay?: string;
  isOutward?: boolean;
  axis?: Point2D;
  axisArrow?: Vector3D[];
  movex?: number;
  movey?: number;
  pathWay?: number;
}

/**
 * Hardware item definition
 */
export interface Hardware3D extends Point2D {
  type: string;
  direction: Vector3D;
  length: number;
}

/**
 * Slide track definition
 */
export interface SlideTrack {
  up: { startPt: Point2D; endPt: Point2D };
  down: { startPt: Point2D; endPt: Point2D };
}

/**
 * Slide configuration
 */
export interface Slide3D extends SlideTrack {
  slideLeafs: Sash3D[][];
  slidePathWayUp: { startPt: Point2D; endPt: Point2D };
  slidePathWayDown: { startPt: Point2D; endPt: Point2D };
  type: string;
  asPtDoor: boolean;
}

/**
 * Anti-theft configuration
 */
export interface AntiTheft3D {
  closeObject: CloseObject;
  securityBoxArray: {
    profileId: string;
    isCenter: boolean;
    startPt: Point2D;
    endPt: Point2D;
  }[];
}

/**
 * Fold door configuration
 */
export interface Fold3D {
  posLD: Point2D;
  posLU: Point2D;
  posRD: Point2D;
  posRU: Point2D;
  leftCount: number;
  rightCount: number;
  isOut: boolean;
  horizontally: boolean;
}

/**
 * Frame output structure
 */
export interface Frame3D {
  id: string;
  seriesId: ProfileSeries;
  thickness: number;
  glassLeafs: Sash3D[];
  screenLeafs: Sash3D[];
  glasses: Area3D[];
  shade: Area3D[];
  guardSash: Sash3D[];
  panels: Area3D[];
  slides: Slide3D[];
  foldLeafs: Fold3D[];
  antiTheft: AntiTheft3D[];
  frameType: 'normal' | '3dArc';
  arcHeight: number;
  arcFaceInner: boolean;
  closeObject: CloseObject;
  mullions: MullionBar3D[];
  sideTrackFixeds: { startPt: Point2D; endPt: Point2D }[];
  fixedTurningFrames: { closeObject: CloseObject }[];
  sashTurningFrames: { closeObject: CloseObject }[];
  isSimpleClosed: boolean;
  boundary: { startPt: Point2D; endPt: Point2D }[];
  anchor?: Point2D;
  colors?: ColorConfig;
  marks?: DimensionMark[];
  tCorner?: boolean;
}

/**
 * Wall structure
 */
export interface Wall3D {
  id: string;
  pts: Point2D[];
  type: 'normal' | '3dArc';
  arcHeight: number;
  arcFaceInner: boolean;
  marks: DimensionMark[];
}

/**
 * Corner joiner structure
 */
export interface Corner3D {
  id: string;
  type: string;
  squareCorner: boolean;
  hostFrameId: string;
  cornerFrameIds: string[];
  angle: number;
  startPt: Point2D;
  endPt: Point2D;
  wh: number;
  colors: ColorConfig;
  marks: DimensionMark[];
}

/**
 * Connector structure
 */
export interface Connector3D {
  id: string;
  width: number;
  startPt: Point2D;
  endPt: Point2D;
  colors: ColorConfig;
  marks: DimensionMark[];
}

/**
 * Background wall structure
 */
export interface BackgroundWall {
  innerSide: Point2D[];
  outterSide: Point2D[];
  height: number;
}

/**
 * Profile size configuration
 */
export interface ProfileSizes {
  frame?: number;
  bead?: number;
  frameMullion?: number;
  sash?: number;
  screen?: number;
  sashMullion?: number;
  screenMullion?: number;
  antiTheft?: number;
  antiTheftMullion?: number;
  cornerJoiner?: number;
  upTrack?: number;
  fixedUpTrack?: number;
  downTrack?: number;
  fixedDownTrack?: number;
  upDownTrack?: number;
  sideTrack?: number;
  slideSashUpBar?: number;
  slideSashDownBar?: number;
  slideSashCollisionLeftBar?: number;
  slideSashCollisionRightBar?: number;
  slideSashEdgeBar?: number;
  slideSashSingleBar?: number;
  slideSashDoubleBar?: number;
  slideSashNoneBar?: number;
  kfcWaist?: number;
  kfcSashUpBar?: number;
  kfcSashDownBar?: number;
  kfcSashLeftBar?: number;
  kfcSashRightBar?: number;
}

/**
 * Profile insertion configuration
 */
export interface ProfileInsertion {
  from: string;
  to?: string;
  offset: number;
  attrs?: Record<string, unknown>;
}

/**
 * Profile usage flags
 */
export interface ProfileUsage {
  sashBead?: boolean;
  screenBead?: boolean;
}

/**
 * Complete 3D JSON output
 */
export interface Json3DOutput {
  bgWall?: BackgroundWall;
  corners: Corner3D[];
  connectors: Connector3D[];
  walls: Wall3D[];
  frames: Frame3D[];
  unsupported: boolean;
  thickness: number;
  version: string;
}

/**
 * Main Json3d class - Converts 2D design to 3D JSON representation
 */
export declare class Json3d {
  readonly view: unknown;
  readonly profileInjection: boolean;
  readonly profileSizes: ProfileSizes;
  readonly profileInsertions: ProfileInsertion[];
  readonly profileUsage: ProfileUsage;
  readonly corners: unknown[];
  readonly connectors: unknown[];
  readonly walls: unknown[];
  readonly frames: unknown[];
  readonly wallThickness: number;

  /**
   * Creates a new Json3d instance
   * @param view - The view object containing the design
   * @param profileData - Optional profile configuration data
   */
  constructor(view: unknown, profileData?: unknown);

  /**
   * Generates the background wall structure
   * @returns Background wall data or undefined
   */
  backgroundWallStruct(): BackgroundWall | undefined;

  /**
   * Generates the complete 3D JSON output
   * @returns Complete 3D representation of the design
   */
  output(): Json3DOutput;

  /**
   * Checks if design contains unsupported 3D render features
   * @returns True if unsupported features exist
   */
  containUnsupported3DRender(): boolean;

  /**
   * Fetches profile sizes from configuration
   * @param profileData - Profile configuration data
   * @returns Profile size mappings
   */
  fetchProfileSizes(profileData: unknown): ProfileSizes;

  /**
   * Fetches profile usage flags from configuration
   * @param profileData - Profile configuration data
   * @returns Profile usage flags
   */
  fetchProfileUsage(profileData: unknown): ProfileUsage;

  /**
   * Fetches profile insertion configurations
   * @param profileData - Profile configuration data
   * @returns Array of insertion configurations
   */
  fetchProfileInsertions(profileData: unknown): ProfileInsertion[];
}

export default Json3d;