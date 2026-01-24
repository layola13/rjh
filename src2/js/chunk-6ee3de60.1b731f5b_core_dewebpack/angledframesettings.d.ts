/**
 * Settings class for angled frame components.
 * Manages height and polygon properties for angled hexagonal frames.
 */
export declare class AngledFrameSettings extends FrameSettings {
  /**
   * Gets the polygon associated with this frame.
   * @returns The angled hexagon polygon instance
   */
  get poly(): AngledHexagonPoly;

  /**
   * Gets the current height of the polygon.
   * @returns The height value
   */
  get height(): number;

  /**
   * Sets the height of the polygon with validation.
   * Recreates the polygon if the new height is valid, updates the view,
   * refreshes total height, redraws the active layer, and creates a checkpoint.
   * 
   * @param value - The new height value to set
   * @throws Will not set if (poly.height - poly.remainingHeight) >= value
   */
  set height(value: number);
}

/**
 * Polygon representation for angled hexagonal frames.
 */
export declare class AngledHexagonPoly {
  /**
   * Creates an angled hexagon polygon.
   * @param cpt - Center point of the polygon
   * @param width - Width of the polygon
   * @param height - Height of the polygon
   * @param remainingWidth - Remaining width available
   * @param remainingHeight - Remaining height available
   */
  constructor(
    cpt: unknown,
    width: number,
    height: number,
    remainingWidth: number,
    remainingHeight: number
  );

  /** Center point of the polygon */
  cpt: unknown;

  /** Width of the polygon */
  width: number;

  /** Height of the polygon */
  height: number;

  /** Remaining width available */
  remainingWidth: number;

  /** Remaining height available */
  remainingHeight: number;
}

/**
 * Base class for frame settings.
 */
export declare class FrameSettings {
  /** The frame instance being configured */
  frame: Frame;

  /** The view instance associated with this frame */
  view: View;
}

/**
 * Frame interface with polygon and management capabilities.
 */
export declare interface Frame {
  /** The polygon shape of the frame */
  polygon: AngledHexagonPoly;

  /** Manager responsible for frame lifecycle */
  frameManager: FrameManager;

  /** Hides assist elements for this frame */
  hideAssist(): void;
}

/**
 * Manager for frame recreation and lifecycle operations.
 */
export declare interface FrameManager {
  /**
   * Handles recreation of a frame with a new polygon.
   * @param poly - The new polygon to use
   * @param view - The view context
   */
  recreated(poly: AngledHexagonPoly, view: View): void;
}

/**
 * View interface managing layers and shapes.
 */
export declare interface View {
  /** Manager for shape operations */
  shapeManager: ShapeManager;

  /** The currently active drawing layer */
  activeLayer: Layer;

  /** Manager for undo/redo checkpoints */
  mometoManager: MomentoManager;
}

/**
 * Manager for shape-related operations.
 */
export declare interface ShapeManager {
  /** Recalculates and updates total height of all shapes */
  refreshTotalHeight(): void;
}

/**
 * Layer interface for drawing operations.
 */
export declare interface Layer {
  /** Triggers a batch redraw of the layer */
  batchDraw(): void;
}

/**
 * Manager for undo/redo checkpoint operations.
 */
export declare interface MomentoManager {
  /** Creates a checkpoint for undo/redo functionality */
  checkPoint(): void;
}