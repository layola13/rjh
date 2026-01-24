/**
 * Wall settings interface for managing wall dimension visibility and positioning
 * @module WallSettings
 */

/**
 * Represents a wall object with dimension properties
 */
interface Wall {
  /** Dimension configuration for wall height */
  dimForHeight: {
    /** Whether the height dimension is hidden */
    hidden: boolean;
    /** Position of the height dimension marker */
    position: unknown;
    /** Updates the dimension polygon */
    updatePoly(): void;
    /** Draws the dimension on the view */
    draw(view: View): void;
  };
  /** Dimension configuration for wall width */
  dimForWidth: {
    /** Whether the width dimension is hidden */
    hidden: boolean;
    /** Updates the dimension polygon */
    updatePoly(): void;
    /** Draws the dimension on the view */
    draw(view: View): void;
  };
}

/**
 * View interface representing the drawing canvas
 */
interface View {
  /** The active drawing layer */
  activeLayer: {
    /** Batches drawing operations for performance */
    batchDraw(): void;
  };
  /** Manager for undo/redo operations */
  mometoManager: {
    /** Creates a checkpoint in history */
    checkPoint(): void;
  };
}

/**
 * Settings controller for wall dimension display and configuration
 */
export declare class WallSettings {
  /** The wall instance being configured */
  private wall: Wall;
  
  /** The view context for rendering */
  private view: View;

  /**
   * Creates a new WallSettings instance
   * @param wall - The wall object to configure
   * @param view - The view context for rendering updates
   */
  constructor(wall: Wall, view: View);

  /**
   * Gets the target wall object
   * @returns The wall instance
   */
  get target(): Wall;

  /**
   * Gets whether the height dimension is hidden
   * @returns True if height dimension is hidden
   */
  get dimHidden(): boolean;

  /**
   * Sets the visibility of the height dimension
   * Updates the polygon, redraws the view, and creates a history checkpoint
   * @param value - True to hide, false to show
   */
  set dimHidden(value: boolean);

  /**
   * Gets the position of the height dimension marker
   * @returns The current position value
   */
  get dimPosition(): unknown;

  /**
   * Sets the position of the height dimension marker
   * Updates the polygon, redraws the view, and creates a history checkpoint
   * @param value - The new position value
   */
  set dimPosition(value: unknown);

  /**
   * Gets whether the width dimension is hidden
   * @returns True if width dimension is hidden
   */
  get dimForWidthHidden(): boolean;

  /**
   * Sets the visibility of the width dimension
   * Updates the polygon, redraws the view, and creates a history checkpoint
   * @param value - True to hide, false to show
   */
  set dimForWidthHidden(value: boolean);
}