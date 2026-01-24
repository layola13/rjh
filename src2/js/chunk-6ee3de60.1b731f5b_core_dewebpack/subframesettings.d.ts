/**
 * Sub-frame settings interface for managing frame properties
 * Handles joint way, profile size, and visibility settings
 */

/**
 * Edge joint connection method enumeration
 */
export enum EdgeJointWay {
  /** Miter joint - angled connection */
  MITER = 'miter',
  /** Butt joint - perpendicular connection */
  BUTT = 'butt',
  /** Lap joint - overlapping connection */
  LAP = 'lap'
}

/**
 * Profile size configuration
 */
export interface ProfileSize {
  /** Width of the profile in pixels or units */
  width: number;
  /** Height of the profile in pixels or units */
  height: number;
  /** Optional depth for 3D profiles */
  depth?: number;
}

/**
 * Hidden sides configuration
 */
export interface HiddenSides {
  /** Whether top side is hidden */
  top: boolean;
  /** Whether right side is hidden */
  right: boolean;
  /** Whether bottom side is hidden */
  bottom: boolean;
  /** Whether left side is hidden */
  left: boolean;
}

/**
 * Sub-frame object interface
 */
export interface SubFrame {
  /** Edge joint connection method */
  edgeJointWay: EdgeJointWay | string;
  /** Profile dimensions */
  profileSize: ProfileSize;
  /** Hidden sides configuration */
  hiddenSides: HiddenSides;
  /** Updates the polygon geometry */
  updatePoly(): void;
  /** Renders the sub-frame */
  draw(): void;
  /** Updates related dependent objects */
  updateRelatedTargets(): void;
}

/**
 * Active layer interface
 */
export interface ActiveLayer {
  /** Batch renders all objects in the layer */
  batchDraw(): void;
}

/**
 * Memento manager for undo/redo functionality
 */
export interface MomentoManager {
  /** Creates a checkpoint for state restoration */
  checkPoint(): void;
}

/**
 * View context interface
 */
export interface View {
  /** Currently active rendering layer */
  activeLayer: ActiveLayer;
  /** State management for undo/redo */
  mometoManager: MomentoManager;
}

/**
 * Settings manager for sub-frame properties
 * Provides a reactive interface to modify frame appearance and behavior
 */
export declare class SubFrameSettings {
  /** Reference to the managed sub-frame */
  private readonly subFrame: SubFrame;
  
  /** Reference to the view context */
  private readonly view: View;

  /**
   * Creates a new SubFrameSettings instance
   * @param subFrame - The sub-frame object to manage
   * @param view - The view context containing layer and state management
   */
  constructor(subFrame: SubFrame, view: View);

  /**
   * Gets or sets the edge joint connection method
   * When set, automatically updates geometry, redraws, and creates checkpoint
   */
  get jointWay(): EdgeJointWay | string;
  set jointWay(value: EdgeJointWay | string);

  /**
   * Gets or sets the profile dimensions
   * When set, updates geometry, redraws related objects, and creates checkpoint
   */
  get profileSize(): ProfileSize;
  set profileSize(value: ProfileSize);

  /**
   * Gets or sets the hidden sides configuration
   * When set, updates geometry, redraws related objects, and creates checkpoint
   */
  get hidden(): HiddenSides;
  set hidden(value: HiddenSides);
}