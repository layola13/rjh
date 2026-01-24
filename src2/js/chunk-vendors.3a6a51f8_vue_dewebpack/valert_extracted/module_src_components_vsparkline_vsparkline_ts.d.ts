/**
 * VSparkline Component Type Definitions
 * 
 * A versatile sparkline chart component supporting trend lines and bar charts
 * with gradient fills, labels, and auto-draw animations.
 */

import Vue, { VNode, CreateElement, PropType } from 'vue';
import { VueConstructor } from 'vue/types/vue';

/**
 * Direction for gradient fill
 */
export type GradientDirection = 'top' | 'bottom' | 'left' | 'right';

/**
 * Sparkline chart type
 */
export type SparklineType = 'trend' | 'bar';

/**
 * Data point value - can be a number or an object with a value property
 */
export type SparklineValue = number | { value: number; [key: string]: any };

/**
 * Boundary coordinates for the sparkline drawing area
 */
export interface Boundary {
  /** Minimum X coordinate */
  minX: number;
  /** Maximum X coordinate */
  maxX: number;
  /** Minimum Y coordinate */
  minY: number;
  /** Maximum Y coordinate */
  maxY: number;
}

/**
 * Parsed data point with coordinates
 */
export interface DataPoint {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Height (for bar charts) */
  height?: number;
  /** Original value */
  value?: number;
}

/**
 * Label data with position
 */
export interface LabelData {
  /** X coordinate for label placement */
  x: number;
  /** Label text value */
  value: string;
}

/**
 * Scoped slot properties for custom label rendering
 */
export interface LabelSlotProps {
  /** Index of the data point */
  index: number;
  /** Label value */
  value: string;
}

/**
 * VSparkline component props
 */
export interface VSparklineProps {
  /**
   * Enable automatic drawing animation on mount/update
   * @default false
   */
  autoDraw?: boolean;

  /**
   * Duration of the auto-draw animation in milliseconds
   * @default 2000
   */
  autoDrawDuration?: number;

  /**
   * CSS easing function for the auto-draw animation
   * @default "ease"
   */
  autoDrawEasing?: string;

  /**
   * Automatically calculate line width based on available space
   * @default false
   */
  autoLineWidth?: boolean;

  /**
   * Color of the sparkline (supports theme colors)
   * @default "primary"
   */
  color?: string;

  /**
   * Fill the area under the trend line
   * @default false
   */
  fill?: boolean;

  /**
   * Array of gradient colors for the sparkline
   * @default []
   */
  gradient?: string[];

  /**
   * Direction of the gradient fill
   * @default "top"
   */
  gradientDirection?: GradientDirection;

  /**
   * Height of the sparkline in pixels
   * @default 75
   */
  height?: string | number;

  /**
   * Array of custom labels for data points
   * @default []
   */
  labels?: Array<string | number>;

  /**
   * Font size for labels
   * @default 7
   */
  labelSize?: number | string;

  /**
   * Width of the sparkline stroke or bars
   * @default 4
   */
  lineWidth?: string | number;

  /**
   * Padding around the sparkline drawing area
   * @default 8
   */
  padding?: string | number;

  /**
   * Display labels below the sparkline
   * @default false
   */
  showLabels?: boolean;

  /**
   * Apply smoothing to the trend line
   * - false: no smoothing
   * - true: default smoothing (radius 8)
   * - number: custom smoothing radius
   * @default false
   */
  smooth?: boolean | number | string;

  /**
   * Type of sparkline chart to render
   * @default "trend"
   */
  type?: SparklineType;

  /**
   * Array of data values to display
   * @default []
   */
  value?: SparklineValue[];

  /**
   * Width of the sparkline in pixels
   * @default 300
   */
  width?: number | string;
}

/**
 * VSparkline component data
 */
export interface VSparklineData {
  /**
   * Last calculated path length (for animation purposes)
   */
  lastLength: number;
}

/**
 * VSparkline component computed properties
 */
export interface VSparklineComputed {
  /** Parsed padding value as number */
  parsedPadding: number;
  /** Parsed width value as number */
  parsedWidth: number;
  /** Parsed height value as number */
  parsedHeight: number;
  /** Parsed label size as number */
  parsedLabelSize: number;
  /** Total height including labels */
  totalHeight: number;
  /** Total width including all bars/points */
  totalWidth: number;
  /** Total number of data values */
  totalValues: number;
  /** Calculated line width */
  _lineWidth: number;
  /** Boundary coordinates for drawing */
  boundary: Boundary;
  /** Whether labels should be displayed */
  hasLabels: boolean;
  /** Parsed label data with positions */
  parsedLabels: LabelData[];
  /** Normalized numeric values from input data */
  normalizedValues: number[];
  /** Transformed data points with coordinates */
  _values: DataPoint[];
  /** Y coordinate for text labels */
  textY: number;
  /** Smoothing radius value */
  _radius: number;
}

/**
 * VSparkline component methods
 */
export interface VSparklineMethods {
  /**
   * Generate SVG gradient definition element
   * @returns VNode for gradient defs
   */
  genGradient(): VNode;

  /**
   * Generate SVG group element with text styles
   * @param children - Child VNodes
   * @returns VNode for group element
   */
  genG(children: VNode[]): VNode;

  /**
   * Generate SVG path element for trend line
   * @returns VNode for path element
   */
  genPath(): VNode;

  /**
   * Generate label elements for all data points
   * @param offset - X offset for label positioning
   * @returns VNode for label group
   */
  genLabels(offset: number): VNode;

  /**
   * Generate a single label element or invoke scoped slot
   * @param labelData - Label data with position and value
   * @param index - Index of the label
   * @returns VNode or text content
   */
  genLabel(labelData: LabelData, index: number): VNode | string;

  /**
   * Generate SVG element for bar chart
   * @returns VNode for bar chart SVG
   */
  genBars(): VNode | undefined;

  /**
   * Generate clip path for bar chart rectangles
   * @param points - Array of data points
   * @param offset - X offset for bars
   * @param barWidth - Width of each bar
   * @param clipId - ID for the clip path
   * @returns VNode for clipPath element
   */
  genClipPath(
    points: DataPoint[],
    offset: number,
    barWidth: number,
    clipId: string
  ): VNode;

  /**
   * Generate SVG element for trend line chart
   * @returns VNode for trend chart SVG
   */
  genTrend(): VNode;
}

/**
 * VSparkline Vue component
 * 
 * A flexible sparkline visualization component with support for:
 * - Trend lines and bar charts
 * - Gradient fills
 * - Smooth curves
 * - Auto-draw animations
 * - Custom labels via slots
 * 
 * @example
 *