/**
 * Module: ShapeColor
 * Manages color configurations for various shape elements in the application.
 * Supports normal and highlight modes, with reset functionality to restore defaults.
 */

import { FillPatternType } from './FillPatternType';

/**
 * Interface defining the color scheme for shape elements
 */
interface ColorScheme {
  /** Normal bar color */
  barNormal: string;
  /** Highlighted bar color */
  barHighlight: string;
  /** Normal bead color */
  beadNormal: string;
  /** Handle color */
  handle: string;
  /** Drag robot overlay color */
  dragRobot: string;
  /** Glass overlay color */
  glass: string;
  /** Brick color */
  brick: string;
  /** Dimension indicator color */
  dim: string;
  /** Window stroke color */
  windowStrokeColor: string;
}

/**
 * Class managing shape color configurations and themes
 */
declare class ShapeColorManager {
  /** Default color configuration */
  readonly defaultColor: Readonly<ColorScheme>;
  
  /** Dark mode flag */
  darkMode: boolean;
  
  /** Current normal bar color */
  barNormal: string;
  
  /** Current highlighted bar color */
  barHighlight: string;
  
  /** Current normal bead color */
  beadNormal: string;
  
  /** Current handle color */
  handle: string;
  
  /** Current drag robot color */
  dragRobot: string;
  
  /** Current glass color */
  glass: string;
  
  /** Current brick color */
  brick: string;
  
  /** Current dimension color */
  dim: string;
  
  /** Current window stroke color */
  windowStrokeColor: string;
  
  /**
   * Get the appropriate screen fill pattern type
   * @param _element - The element (unused parameter)
   * @param highlight - Whether to use highlight mode
   * @returns The appropriate FillPatternType for screen
   */
  getScreen(_element: unknown, highlight?: boolean): FillPatternType;
  
  /**
   * Get the appropriate glass color
   * @param _element - The element (unused parameter)
   * @param highlight - Whether to use highlight mode
   * @returns The glass color (highlighted or normal)
   */
  getGlass(_element: unknown, highlight?: boolean): string;
  
  /**
   * Get the appropriate panel color
   * @param _element - The element (unused parameter)
   * @param highlight - Whether to use highlight mode
   * @returns The panel/bar color (highlighted or normal)
   */
  getPanel(_element: unknown, highlight?: boolean): string;
  
  /**
   * Reset all colors to their default values
   */
  reset(): void;
}

/**
 * Singleton instance of ShapeColorManager
 * Provides global access to shape color configuration
 */
export declare const ShapeColor: ShapeColorManager;