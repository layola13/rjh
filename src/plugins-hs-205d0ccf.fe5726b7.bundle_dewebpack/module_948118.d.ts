/**
 * Geometry strategy module exports
 * Provides 2D geometry strategies for face, line, circle arc, circle, and guide line operations
 */

import { Face2d } from './Face2d';
import { Line2d } from './Line2d';
import { CircleArc2d } from './CircleArc2d';
import { Circle2d } from './Circle2d';
import { GuideLine2d } from './GuideLine2d';

/**
 * Collection of available 2D geometry strategies
 * Used for handling different geometric primitives in 2D space
 */
export declare const strategies: readonly [
  typeof Face2d,
  typeof Line2d,
  typeof CircleArc2d,
  typeof Circle2d,
  typeof GuideLine2d
];