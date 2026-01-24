/**
 * Module: FixedThreedArcShape
 * Defines 3D arc frame shape configurations and settings
 */

/**
 * Enum defining fixed 3D arc shape types
 */
export enum FixedThreedArcShape {
  /** Quarter circle arc */
  quarter = "quarter",
  /** Half circle arc */
  half = "half"
}

/**
 * Depth structure configuration for frame components
 */
export interface DepthStruct {
  /** Frame depth measurement */
  frame: number;
  /** Fixed bead depth measurement */
  fixedBead: number;
  /** Array of sash depth measurements */
  sash: number[];
  /** Fixed component depth measurement */
  fixed: number;
  /** Sash glass depth measurement */
  sashGlass: number;
}

/**
 * Memento manager interface for undo/redo functionality
 */
export interface MomentoManager {
  /** Records current state as a checkpoint */
  checkPoint(): void;
}

/**
 * View interface representing the visual context
 */
export interface View {
  /** Memento manager instance for state management */
  mometoManager: MomentoManager;
  /** Refreshes the view rendering */
  refresh(): void;
}

/**
 * 3D Arc Frame interface with geometric properties
 */
export interface ThreedArcFrame {
  /** Inner face of the arc */
  arcFaceInner: unknown;
  /** Length of the 3D chord */
  threedChordLength: number;
  /** Short arc dimension flag or value */
  shortArcDim: unknown;
  /** Depth structure configuration */
  depthStruct: DepthStruct;
  /** Associated view instance */
  view: View;
  
  /**
   * Updates the chord height dimension
   * @param height - New height value
   */
  updateChordHeight(height: number): void;
  
  /**
   * Updates the polygon geometry */
  updatePoly(): void;
  
  /**
   * Renders the frame to the specified view
   * @param view - Target view for rendering
   */
  draw(view: View): void;
}

/**
 * Base frame settings class (imported from module 7)
 */
export declare class FrameSettings {
  constructor(frame: ThreedArcFrame, view: View);
}

/**
 * Settings class for 3D arc frame configuration
 * Extends base FrameSettings with arc-specific properties
 */
export declare class ThreedArcFrameSettings extends FrameSettings {
  /** The 3D arc frame instance being configured */
  protected frame: ThreedArcFrame;
  
  /** The view instance for rendering */
  protected view: View;
  
  /**
   * Creates a new ThreedArcFrameSettings instance
   * @param frame - The 3D arc frame to configure
   * @param view - The view for rendering
   */
  constructor(frame: ThreedArcFrame, view: View);
  
  /**
   * Gets the inner face of the arc
   */
  get arcFaceInner(): unknown;
  
  /**
   * Sets the inner face of the arc and triggers redraw
   * @param value - New arc face inner value
   */
  set arcFaceInner(value: unknown);
  
  /**
   * Sets the fixed shape type (quarter or half arc)
   * Automatically calculates and updates chord height based on shape
   * @param shape - The fixed shape type to apply
   */
  set fixedShape(shape: FixedThreedArcShape);
  
  /**
   * Gets the short arc dimension
   */
  get shortArcDim(): unknown;
  
  /**
   * Sets the short arc dimension and records checkpoint
   * @param value - New short arc dimension value
   */
  set shortArcDim(value: unknown);
  
  /**
   * Gets the frame depth measurement
   */
  get frameDepth(): number;
  
  /**
   * Sets the frame depth measurement
   * @param value - New frame depth (converted to number, NaN values ignored)
   */
  set frameDepth(value: number | string);
  
  /**
   * Gets the fixed bead depth measurement
   */
  get fixedBeadDepth(): number;
  
  /**
   * Sets the fixed bead depth measurement
   * @param value - New fixed bead depth (converted to number, NaN values ignored)
   */
  set fixedBeadDepth(value: number | string);
  
  /**
   * Gets the sash depth measurements as comma-separated string
   */
  get sashDepth(): string;
  
  /**
   * Sets the sash depth measurements
   * Accepts either a single number or comma-separated string of numbers
   * @param value - Single number or comma-separated string (e.g., "10, 20, 30")
   */
  set sashDepth(value: number | string);
  
  /**
   * Gets the fixed component depth measurement
   */
  get fixedDepth(): number;
  
  /**
   * Sets the fixed component depth measurement
   * @param value - New fixed depth (converted to number, NaN values ignored)
   */
  set fixedDepth(value: number | string);
  
  /**
   * Gets the sash glass depth measurement
   */
  get sashGlassDepth(): number;
  
  /**
   * Sets the sash glass depth measurement
   * @param value - New sash glass depth (converted to number, NaN values ignored)
   */
  set sashGlassDepth(value: number | string);
}