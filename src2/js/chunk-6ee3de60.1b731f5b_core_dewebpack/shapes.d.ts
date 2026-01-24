/**
 * Shape module - Core shape rendering and styling functionality
 * Provides base Shape class with fill, stroke, shadow, gradient, and pattern support
 */

import type { Node } from './Node';
import type { Layer } from './Layer';
import type { Stage } from './Stage';
import type { Canvas } from './Canvas';
import type { Context } from './Context';
import type { Transform } from './Transform';

/**
 * Point interface representing x, y coordinates
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Rectangle interface for bounds and client rects
 */
export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Size interface for dimensions
 */
export interface Size {
  width: number;
  height: number;
}

/**
 * RGBA color components
 */
export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * Configuration options for Shape constructor
 */
export interface ShapeConfig extends NodeConfig {
  // Fill properties
  fill?: string;
  fillEnabled?: boolean;
  fillPriority?: 'color' | 'pattern' | 'linear-gradient' | 'radial-gradient';
  
  // Fill pattern properties
  fillPatternImage?: HTMLImageElement | HTMLCanvasElement;
  fillPatternRepeat?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';
  fillPatternX?: number;
  fillPatternY?: number;
  fillPatternOffset?: Point;
  fillPatternOffsetX?: number;
  fillPatternOffsetY?: number;
  fillPatternScale?: Point;
  fillPatternScaleX?: number;
  fillPatternScaleY?: number;
  fillPatternRotation?: number;
  
  // Linear gradient properties
  fillLinearGradientColorStops?: Array<number | string>;
  fillLinearGradientStartPoint?: Point;
  fillLinearGradientStartPointX?: number;
  fillLinearGradientStartPointY?: number;
  fillLinearGradientEndPoint?: Point;
  fillLinearGradientEndPointX?: number;
  fillLinearGradientEndPointY?: number;
  
  // Radial gradient properties
  fillRadialGradientColorStops?: Array<number | string>;
  fillRadialGradientStartPoint?: Point;
  fillRadialGradientStartPointX?: number;
  fillRadialGradientStartPointY?: number;
  fillRadialGradientEndPoint?: Point;
  fillRadialGradientEndPointX?: number;
  fillRadialGradientEndPointY?: number;
  fillRadialGradientStartRadius?: number;
  fillRadialGradientEndRadius?: number;
  
  // Stroke properties
  stroke?: string;
  strokeEnabled?: boolean;
  strokeWidth?: number;
  strokeScaleEnabled?: boolean;
  strokeHitEnabled?: boolean;
  hitStrokeWidth?: number | 'auto';
  strokeLinearGradientColorStops?: Array<number | string>;
  strokeLinearGradientStartPoint?: Point;
  strokeLinearGradientStartPointX?: number;
  strokeLinearGradientStartPointY?: number;
  strokeLinearGradientEndPoint?: Point;
  strokeLinearGradientEndPointX?: number;
  strokeLinearGradientEndPointY?: number;
  
  // Line style properties
  lineJoin?: 'miter' | 'round' | 'bevel';
  lineCap?: 'butt' | 'round' | 'square';
  dash?: number[];
  dashEnabled?: boolean;
  dashOffset?: number;
  fillAfterStrokeEnabled?: boolean;
  
  // Shadow properties
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffset?: Point;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowOpacity?: number;
  shadowEnabled?: boolean;
  shadowForStrokeEnabled?: boolean;
  
  // Drawing functions
  sceneFunc?: (context: Context, shape: Shape) => void;
  hitFunc?: (context: Context, shape: Shape) => void;
  
  // Performance options
  perfectDrawEnabled?: boolean;
}

/**
 * Options for getClientRect method
 */
export interface GetClientRectConfig {
  skipTransform?: boolean;
  skipStroke?: boolean;
  skipShadow?: boolean;
  relativeTo?: Node;
}

/**
 * Global registry mapping color keys to Shape instances for hit detection
 */
export const shapes: Record<string, Shape>;

/**
 * Base Shape class providing rendering, styling, and hit detection capabilities
 * 
 * @example
 *