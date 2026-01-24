/**
 * Snapping utilities module
 * Provides interfaces and helpers for element snapping functionality
 */

/**
 * Output result from a snapping operation
 */
export interface ISnapOutput {
  /** The snapped x-coordinate */
  x?: number;
  /** The snapped y-coordinate */
  y?: number;
  /** Whether snapping occurred on the x-axis */
  snappedX?: boolean;
  /** Whether snapping occurred on the y-axis */
  snappedY?: boolean;
  /** Distance to the snap point */
  distance?: number;
  /** The element that was snapped to */
  snapTarget?: unknown;
}

/**
 * Configuration options for snapping behavior
 */
export interface ISnappingOption {
  /** Enable or disable snapping */
  enabled?: boolean;
  /** Snap threshold distance in pixels */
  threshold?: number;
  /** Snap to grid */
  snapToGrid?: boolean;
  /** Grid size in pixels */
  gridSize?: number;
  /** Snap to other elements */
  snapToElements?: boolean;
  /** Elements to snap to */
  snapTargets?: unknown[];
  /** Snap to guides */
  snapToGuides?: boolean;
}

/**
 * Helper class for performing snapping calculations and operations
 */
export declare class SnapHelper {
  /**
   * Creates a new SnapHelper instance
   * @param options - Snapping configuration options
   */
  constructor(options?: ISnappingOption);

  /**
   * Calculates snap position for given coordinates
   * @param x - Current x-coordinate
   * @param y - Current y-coordinate
   * @returns Snapping result with adjusted coordinates
   */
  snap(x: number, y: number): ISnapOutput;

  /**
   * Updates snapping options
   * @param options - New snapping configuration
   */
  setOptions(options: Partial<ISnappingOption>): void;

  /**
   * Gets current snapping options
   * @returns Current configuration
   */
  getOptions(): ISnappingOption;
}