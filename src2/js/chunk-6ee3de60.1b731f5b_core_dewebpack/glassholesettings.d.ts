/**
 * Settings interface for managing glass hole properties and dimensions
 * Provides reactive properties that automatically update the view when changed
 */
export interface GlassHoleSettings {
  /**
   * The style configuration of the glass hole
   * Setting this property triggers polygon update, glass redraw, and checkpoint creation
   */
  style: unknown;

  /**
   * Dimension from hole to profile edge
   * Setting this property triggers polygon update, glass redraw, and checkpoint creation
   */
  dimToProfile: unknown;

  /**
   * Visibility state of the horizontal margin dimension indicator
   * When set to true, the horizontal margin dimension is hidden from view
   */
  hMarginDimHidden: boolean;

  /**
   * Visibility state of the vertical margin dimension indicator
   * When set to true, the vertical margin dimension is hidden from view
   */
  vMarginDimHidden: boolean;
}

/**
 * Internal glass hole object with drawable and updateable properties
 */
interface GlassHole {
  /** Current style configuration */
  style: unknown;
  
  /** Dimension to profile measurement */
  dimToProfile: unknown;
  
  /** Horizontal margin dimension object */
  hMarginDim: MarginDimension;
  
  /** Vertical margin dimension object */
  vMarginDim: MarginDimension;
  
  /** Parent glass object reference */
  glass: Glass;
  
  /** Updates the polygon geometry */
  updatePoly(): void;
}

/**
 * Margin dimension object with visibility control
 */
interface MarginDimension {
  /** Visibility flag */
  hidden: boolean;
  
  /** Updates the dimension polygon */
  updatePoly(): void;
  
  /** Renders the dimension to the view */
  draw(view: View): void;
}

/**
 * Glass drawable object
 */
interface Glass {
  /** Renders the glass to the specified view */
  draw(view: View): void;
}

/**
 * Layer with batch rendering capability
 */
interface Layer {
  /** Executes batched draw operations for performance */
  batchDraw(): void;
}

/**
 * Memento pattern manager for undo/redo functionality
 */
interface MomentoManager {
  /** Creates a checkpoint in history for undo/redo */
  checkPoint(): void;
}

/**
 * Main view/canvas context
 */
interface View {
  /** Currently active rendering layer */
  activeLayer: Layer;
  
  /** History manager for state persistence */
  mometoManager: MomentoManager;
}

/**
 * Constructor signature for GlassHoleSettings class
 * @param glassHole - The glass hole object to manage
 * @param view - The view context for rendering
 */
export interface GlassHoleSettingsConstructor {
  new (glassHole: GlassHole, view: View): GlassHoleSettings;
}

declare const GlassHoleSettings: GlassHoleSettingsConstructor;
export default GlassHoleSettings;