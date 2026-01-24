/**
 * Dimension setting configuration interface
 * Manages visibility and display properties for dimension annotations
 */
export interface IDimInfo {
  /** Whether the dimension should be displayed */
  dimShow: boolean;
  /** Reference to the target bar element containing dimension info */
  targetBar?: ITargetBar;
}

/**
 * Target bar interface with dimension frame reference
 */
export interface ITargetBar {
  /** Top frame containing dimension rendering logic */
  topFrame: ITopFrame;
}

/**
 * Top frame interface for dimension rendering
 */
export interface ITopFrame {
  /** Dimension renderer instance */
  dim: IDimRenderer;
}

/**
 * Dimension renderer interface
 * Handles polygon updates and drawing operations
 */
export interface IDimRenderer {
  /** Updates the polygon geometry */
  updatePoly(): void;
  /** Draws the dimension to the specified view */
  draw(view: IView): void;
}

/**
 * View interface for rendering and state management
 */
export interface IView {
  /** Active rendering layer */
  activeLayer: IActiveLayer;
  /** Memento manager for undo/redo operations */
  mometoManager: IMomentoManager;
}

/**
 * Active layer interface for batch rendering
 */
export interface IActiveLayer {
  /** Performs batch drawing of layer elements */
  batchDraw(): void;
}

/**
 * Memento manager interface for state checkpointing
 */
export interface IMomentoManager {
  /** Creates a checkpoint in the state history */
  checkPoint(): void;
}

/**
 * Dimension setting manager
 * Controls the visibility and rendering of dimension annotations in the view
 */
export declare class DimSetting {
  /** Dimension information object */
  private readonly dimInfo: IDimInfo;
  
  /** Associated view for rendering */
  private readonly view: IView;

  /**
   * Creates a new DimSetting instance
   * @param dimInfo - Dimension information configuration
   * @param view - View instance for rendering operations
   */
  constructor(dimInfo: IDimInfo, view: IView);

  /**
   * Gets the current visibility state of the dimension
   * @returns true if dimension should be displayed, false otherwise
   */
  get dimShow(): boolean;

  /**
   * Sets the visibility state of the dimension
   * Triggers polygon update, redraw, and state checkpoint when changed
   * @param value - New visibility state
   */
  set dimShow(value: boolean);
}