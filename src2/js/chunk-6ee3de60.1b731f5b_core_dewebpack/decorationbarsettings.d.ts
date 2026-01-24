/**
 * Decoration bar configuration manager interface
 * Manages decoration bar settings for polyline elements
 */

/**
 * Decoration bar properties interface
 */
interface IDecorationBar {
  /** Half width of the decoration bar */
  semiBarWidth: number;
  /** Recreate decoration bar components */
  recreateComponents(): void;
}

/**
 * Decoration shape wrapper interface
 */
interface IDecorationShape {
  /** The underlying decoration bar instance */
  decorationBar: IDecorationBar;
  /** Update the polyline geometry */
  updatePoly(): void;
  /** Render the decoration shape to the view */
  draw(view: IView): void;
}

/**
 * Decoration bar manager interface
 */
interface IDecorationBarManager {
  /**
   * Get decoration shape by polyline ID
   * @param pid - Polyline identifier
   * @returns Decoration shape instance or undefined if not found
   */
  getDecorationBar(pid: string): IDecorationShape | undefined;
}

/**
 * Memento manager for undo/redo operations
 */
interface IMomentoManager {
  /** Create a checkpoint for state tracking */
  checkPoint(): void;
}

/**
 * View interface for rendering operations
 */
interface IView {
  /** Memento manager instance */
  mometoManager: IMomentoManager;
  /** Trigger view refresh */
  refresh(): void;
}

/**
 * Multi-element manager interface
 */
interface IMultiManager {
  /** Decoration bar manager instance */
  decorationBarManager: IDecorationBarManager;
}

/**
 * Settings controller for decoration bar properties
 * Provides reactive access to decoration bar configuration
 */
export declare class DecorationBarSettings {
  /** Polyline identifier */
  private readonly pid: string;
  
  /** Multi-element manager reference */
  private readonly mulManager: IMultiManager;
  
  /** View reference for rendering */
  private readonly view: IView;

  /**
   * Creates a new decoration bar settings controller
   * @param pid - Polyline identifier
   * @param mulManager - Multi-element manager instance
   * @param view - View instance for rendering
   */
  constructor(pid: string, mulManager: IMultiManager, view: IView);

  /**
   * Gets the decoration bar instance associated with this polyline
   * @returns Decoration bar instance or undefined if not found
   */
  get decorationBar(): IDecorationBar | undefined;

  /**
   * Gets the decoration shape wrapper instance
   * @returns Decoration shape instance or undefined if not found
   */
  get decorationShape(): IDecorationShape | undefined;

  /**
   * Gets the half-width of the decoration bar
   * @returns Semi bar width value, or 0 if decoration bar doesn't exist
   */
  get semiBarWidth(): number;

  /**
   * Sets the half-width of the decoration bar
   * Triggers recreation of components, geometry update, and view refresh
   * @param value - New semi bar width value
   */
  set semiBarWidth(value: number);
}