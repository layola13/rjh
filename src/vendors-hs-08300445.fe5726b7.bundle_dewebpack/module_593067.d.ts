/**
 * Line progress component type definitions
 * Renders a linear progress bar with support for multiple segments and customizable styles
 */

/**
 * Stroke line cap style for the progress line
 */
type StrokeLinecap = 'butt' | 'round' | 'square';

/**
 * Color value - can be a CSS color string or gradient object
 */
type ColorType = string | { [key: string]: string };

/**
 * Props for the Line progress component
 */
interface LineProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Progress percentage(s). Can be a single number or array for multiple segments
   * @example 50 // Single segment at 50%
   * @example [30, 20] // Two segments: 30% and 20%
   */
  percent?: number | number[];

  /**
   * CSS class prefix for styling
   * @default 'rc-progress'
   */
  prefixCls?: string;

  /**
   * Stroke color(s) for the progress line
   * Can be a single color or array of colors for multiple segments
   */
  strokeColor?: ColorType | ColorType[];

  /**
   * Shape of the line cap
   * - 'butt': Square edge
   * - 'round': Rounded edge
   * - 'square': Square edge extending beyond the line
   * @default 'round'
   */
  strokeLinecap?: StrokeLinecap;

  /**
   * Width of the progress stroke
   * @default 1
   */
  strokeWidth?: number;

  /**
   * Inline styles for the SVG element
   */
  style?: React.CSSProperties;

  /**
   * Color of the background trail
   * @default '#D9D9D9'
   */
  trailColor?: string;

  /**
   * Width of the background trail
   * If not set, defaults to strokeWidth
   */
  trailWidth?: number;

  /**
   * CSS transition string for animation
   * @default 'stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke 0.3s linear'
   */
  transition?: string;

  /**
   * Gap position (not used in Line component, only for compatibility)
   * @deprecated
   */
  gapPosition?: string;
}

/**
 * Line progress bar component
 * Displays a horizontal progress indicator with support for multiple segments
 * 
 * @example
 *