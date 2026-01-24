/**
 * Advanced Snapshot Resizable Widget Module
 * Provides resizable overlay functionality for snapshot capture with aspect ratio support
 */

/** Resizable widget handle types */
type ResizableHandle = 'e' | 'w' | 's' | 'n' | 'ne' | 'nw' | 'se' | 'sw' | null;

/** Aspect ratio configuration (-1 for free aspect ratio) */
type AspectRatio = number;

/** jQuery resizable event object */
interface ResizableEvent {
  data?: {
    target?: Window;
  };
}

/** jQuery resizable UI helper */
interface ResizableUI {
  element?: JQuery;
  helper?: JQuery;
  position?: { top: number; left: number };
  size?: { width: number; height: number };
  originalPosition?: { top: number; left: number };
  originalSize?: { width: number; height: number };
}

/** Cropping window dimensions [width, height, left, top] */
type CroppingWindow = [width: number, height: number, left: number, top: number];

/**
 * Advanced snapshot resizable widget controller
 * Manages overlay resizing with aspect ratio constraints
 */
interface AdvancedSnapshotController {
  /** Minimum width constraint (pixels) */
  readonly minW: number;
  
  /** Minimum height constraint (pixels) */
  readonly minH: number;
  
  /** Current selection width */
  w: number;
  
  /** Current selection height */
  h: number;
  
  /** Current selection top position */
  t: number;
  
  /** Current selection left position */
  l: number;
  
  /** Current aspect ratio (-1 for free ratio) */
  ratio?: AspectRatio;
  
  /**
   * Handle window resize events to adjust selection bounds
   * @param event - Resize event with target window
   */
  windowResizeHandler(event: ResizableEvent): void;
  
  /**
   * Initialize resizable widgets with aspect ratio constraint
   * @param aspectRatio - Desired aspect ratio (-1 for free, 1.5 for auto-detect)
   */
  initResizableWidgets(aspectRatio: AspectRatio): void;
  
  /**
   * Destroy all resizable widget instances
   */
  destroyResizableWidgets(): void;
  
  /**
   * Show the snapshot overlay with resizable handles
   * @param aspectRatio - Aspect ratio to apply
   */
  show(aspectRatio: AspectRatio): void;
  
  /**
   * Hide the snapshot overlay and cleanup
   */
  hide(): void;
  
  /**
   * Initialize the module and load resources
   * @param config - Configuration object
   */
  init(config: unknown): void;
  
  /**
   * jQuery selector helper scoped to editor element
   * @param selector - Optional selector string
   * @returns jQuery object
   */
  _$(selector?: string): JQuery;
  
  /**
   * Update UI elements based on current selection data
   * Applies bounds validation and CSS positioning
   */
  updateUIByData(): void;
  
  /**
   * Set aspect ratio and recalculate selection bounds
   * @param aspectRatio - New aspect ratio value
   */
  setRatio(aspectRatio: AspectRatio): void;
  
  /**
   * Calculate optimal cropping window dimensions
   * @param aspectRatio - Target aspect ratio
   * @returns Tuple of [width, height, left, top]
   */
  getCroppingWindow(aspectRatio: AspectRatio): CroppingWindow;
}

/**
 * Default export: Advanced snapshot controller instance
 */
declare const advancedSnapshotController: AdvancedSnapshotController;

export default advancedSnapshotController;