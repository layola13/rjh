/**
 * Frame bar dimension manager module
 * Handles dimensional properties and operations for frame bars in a 2D/3D design system
 */

import { Arc, Segment, Point, Vector, Line } from './geometry';
import { Utils, EqualSplitType, EdgeJointWay, EndpointSplitWay } from './utils';
import { 
  ThreedArcFrame, 
  ChordDimInfo, 
  KfcPolygon, 
  Kfc2Polygon, 
  Kfc3Polygon, 
  Kfc4Polygon, 
  HalfKfcPolygon, 
  HalfKfc2Polygon,
  Sash,
  Frame,
  Glass
} from './frame-types';

/**
 * Represents a polygon identifier with index information
 */
export interface PolyId {
  idx: number;
  equalTo(other: PolyId): boolean;
}

/**
 * Polygon structure with edges and shape data
 */
export interface Polygon {
  polyId: PolyId;
  mulShape: Segment | Arc;
  edges: Array<Segment | Arc>;
  stIdx: number;
  etIdx: number;
  edge(index: number): Segment | Arc;
  bottomEdgeIndexes: number[];
}

/**
 * Dimension information interface
 */
export interface DimInfo {
  dimShow: boolean;
}

/**
 * Dimension manager interface
 */
export interface DimManager {
  findFrameDim(index: number): DimInfo | undefined;
  findChordDim(index: number): ChordDimInfo | undefined;
  add(info: ChordDimInfo): void;
}

/**
 * Dimension controller interface
 */
export interface DimController {
  diMgr: DimManager;
  updatePoly(): void;
  draw(view: View): void;
}

/**
 * Profile size manager for frame dimensions
 */
export interface ProfileSizeManager {
  frameMullion: number;
}

/**
 * Mullion manager for frame subdivisions
 */
export interface MullionManager {
  addMullion(line: Line): void;
}

/**
 * Splitter line with equal split configuration
 */
export interface SplitterLine {
  equalSplit: EqualSplitType;
  start: SplitterEndpoint;
  end: SplitterEndpoint;
}

/**
 * Endpoint configuration for splitters
 */
export interface SplitterEndpoint {
  split: EndpointSplitWay;
}

/**
 * Subdivision element in a splitter
 */
export interface SplitterSub {
  IsMullion: boolean;
  polyId: PolyId;
}

/**
 * Splitter managing frame subdivisions
 */
export interface Splitter {
  lines: SplitterLine[];
  subs: SplitterSub[];
  setPullingHeight(polyId: PolyId, height: number): void;
}

/**
 * Frame manager handling frame structure
 */
export interface FrameManager {
  bars: Bar[];
  allBars: Bar[];
  _edgeWidth: Record<number, number>;
  setVirtual(polyId: PolyId, virtual: boolean): void;
  setEdgeWidth(index: number, width: number, view: View): void;
  ejw: Record<number, EdgeJointWay>;
}

/**
 * Frame or sash parent structure
 */
export interface FrameParent {
  polygon: Polygon;
  dim: DimController;
  frameManager: FrameManager;
  mulManager: {
    bars: Bar[];
    splitter: Splitter;
    refresh(view: View): void;
  };
  ignoreEqualSplit: PolyId[];
  updateFrame(): void;
  draw(view: View): void;
}

/**
 * Top frame structure (can be various frame types)
 */
export type TopFrame = FrameParent & {
  profileSizeManager: ProfileSizeManager;
  mulManager: FrameParent['mulManager'] & {
    addMullion(line: Line): void;
  };
};

/**
 * Bar element in frame structure
 */
export interface Bar {
  polygon: Polygon;
  parent: FrameParent;
  topFrame: TopFrame;
  virtual: boolean;
  polyId: PolyId;
}

/**
 * Layer for rendering operations
 */
export interface Layer {
  batchDraw(): void;
}

/**
 * Shape manager for the view
 */
export interface ShapeManager {
  shapem: unknown;
}

/**
 * Memento manager for undo/redo operations
 */
export interface MementoManager {
  checkPoint(): void;
}

/**
 * View context containing all managers and rendering state
 */
export interface View {
  activeLayer: Layer;
  mometoManager: MementoManager;
  shapeManager: ShapeManager;
  refresh(): void;
}

/**
 * Result of diagonal joint position check
 */
export interface DiagonalJointPosition {
  /** Joint at start position */
  start: boolean;
  /** Joint at end position */
  end: boolean;
}

/**
 * Frame bar dimension manager
 * Manages dimensional properties, visibility, and operations for frame bars
 */
export declare class FrameBarDim {
  /** The frame bar being managed */
  bar: Bar;
  
  /** View context for rendering */
  view: View;
  
  /** Temporary frame reference for virtual state operations */
  private tmpFrame?: TopFrame;
  
  /** Temporary poly ID for virtual state operations */
  private tmpFrameBarPolyId?: PolyId;

  /**
   * Creates a new FrameBarDim instance
   * @param bar - The frame bar to manage
   * @param view - The view context
   */
  constructor(bar: Bar, view: View);

  /**
   * Gets the target bar
   */
  get target(): Bar;

  /**
   * Checks if the bar is part of an arc
   */
  get isArc(): boolean;

  /**
   * Checks if the bar belongs to a 3D arc frame
   */
  get isThreedArcFrame(): boolean;

  /**
   * Gets the dimension visibility state
   */
  get dimShow(): boolean;

  /**
   * Sets the dimension visibility state
   * Updates polygon dimensions and triggers redraw
   */
  set dimShow(value: boolean);

  /**
   * Gets the chord dimension visibility state
   */
  get chordDimShow(): boolean;

  /**
   * Sets the chord dimension visibility state
   * Creates chord dimension info if needed and triggers redraw
   */
  set chordDimShow(value: boolean);

  /**
   * Creates a chord bar for arc-shaped polygons
   * Adds a mullion along the chord of the arc
   */
  makeChordBar(): void;

  /**
   * Retrieves dimension information for the bar
   * @param chord - Whether to get chord dimension (default: false)
   * @returns Dimension info or undefined if not found
   */
  dimInfo(chord?: boolean): DimInfo | ChordDimInfo | undefined;

  /**
   * Gets the virtual state of the bar
   */
  get virtual(): boolean;

  /**
   * Sets the virtual state of the bar
   * Handles frame visibility and joint configuration changes
   */
  set virtual(value: boolean);

  /**
   * Checks if virtual state setting is allowed for this bar
   * Not allowed for KFC polygon types and non-bottom edges
   */
  get allowVirtualSet(): boolean;

  /**
   * Gets the edge width of the bar
   */
  get edgeWidth(): number;

  /**
   * Sets the edge width of the bar
   * Updates hardware for sash instances
   */
  set edgeWidth(value: number);

  /**
   * Checks if any splitter line has equal split enabled
   */
  get hasEqualSplit(): boolean;

  /**
   * Checks if this bar is marked to ignore equal split
   */
  get ignoreEqualSplit(): boolean;

  /**
   * Sets whether to ignore equal split for this bar
   * Updates mullion manager and recalculates glass serial numbers
   */
  set ignoreEqualSplit(value: boolean);

  /**
   * Configures side bars to use vertical joints
   * @param frame - The top frame containing the bars
   */
  private setSideBarToVJoint(frame: TopFrame): void;

  /**
   * Determines diagonal joint positions between two polygons
   * @param polygon1 - First polygon to check
   * @param polygon2 - Second polygon to check
   * @returns Object indicating joint presence at start and end positions
   */
  private diagonalJointPosition(polygon1: Polygon, polygon2: Polygon): DiagonalJointPosition;
}