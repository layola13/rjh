/**
 * Circle Progress Component Type Definitions
 * A circular progress indicator component with gradient support and customizable appearance
 */

/**
 * Position of the gap in the circular progress
 */
export type GapPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Line cap style for the progress stroke
 */
export type StrokeLinecap = 'butt' | 'round' | 'square';

/**
 * Gradient color configuration
 * Key: percentage string (e.g., "0%", "100%")
 * Value: color string (e.g., "#ff0000", "rgb(255,0,0)")
 */
export interface GradientColor {
  [percent: string]: string;
}

/**
 * Stroke color type - can be a solid color string or gradient configuration
 */
export type StrokeColor = string | GradientColor;

/**
 * Path rendering result containing SVG path string and associated styles
 */
export interface PathInfo {
  /** SVG path data string */
  pathString: string;
  /** CSS styles to apply to the path element */
  pathStyle: {
    stroke?: string;
    strokeDasharray: string;
    strokeDashoffset: string;
    transition: string;
  };
}

/**
 * Props for the Circle progress component
 */
export interface CircleProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'percent' | 'strokeColor'> {
  /** CSS class prefix for BEM naming convention */
  prefixCls?: string;
  
  /** Width of the progress stroke in pixels */
  strokeWidth?: number;
  
  /** Width of the trail (background) stroke in pixels */
  trailWidth?: number;
  
  /** Degree of the gap in the circle (0-360) */
  gapDegree?: number;
  
  /** Position of the gap in the circle */
  gapPosition?: GapPosition;
  
  /** Color of the trail (background circle) */
  trailColor?: string;
  
  /** Line cap style for stroke endings */
  strokeLinecap?: StrokeLinecap;
  
  /** Inline styles for the SVG element */
  style?: React.CSSProperties;
  
  /** Additional CSS class names */
  className?: string;
  
  /** Color(s) for the progress stroke - supports gradients */
  strokeColor?: StrokeColor | StrokeColor[];
  
  /** Progress percentage value(s) - supports multiple segments */
  percent?: number | number[];
}

/**
 * Converts a percentage string to a numeric value
 * @param percentString - Percentage string with or without '%' symbol
 * @returns Numeric percentage value
 * @example
 * parsePercentage("50%") // returns 50
 */
declare function parsePercentage(percentString: string): number;

/**
 * Normalizes input to an array format
 * @param value - Single value or array of values
 * @returns Array containing the value(s)
 * @example
 * toArray(5) // returns [5]
 * toArray([1, 2]) // returns [1, 2]
 */
declare function toArray<T>(value: T | T[]): T[];

/**
 * Generates SVG path data and styles for a circular progress segment
 * @param startPercent - Starting percentage of the segment
 * @param currentPercent - Current percentage value to display
 * @param strokeColor - Color for the stroke
 * @param strokeWidth - Width of the stroke
 * @param gapDegree - Gap size in degrees (default: 0)
 * @param gapPosition - Position of the gap (default: 'top')
 * @returns Path configuration object with SVG path string and styles
 */
declare function getPathStyles(
  startPercent: number,
  currentPercent: number,
  strokeColor: string | undefined,
  strokeWidth: number,
  gapDegree?: number,
  gapPosition?: GapPosition
): PathInfo;

/**
 * Circle Progress Component
 * Renders a circular progress indicator with support for:
 * - Multiple progress segments
 * - Gradient colors
 * - Customizable gap position and size
 * - Smooth transitions
 * 
 * @example
 *