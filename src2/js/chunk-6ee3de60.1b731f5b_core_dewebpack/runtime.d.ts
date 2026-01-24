/**
 * Runtime module - Core view runtime with canvas scaling capabilities
 * @module Runtime
 */

import { View } from './View';
import { ToolType } from './ToolType';
import { EventType } from './EventType';
import { ShortkeyHelper } from './ShortkeyHelper';

/**
 * Canvas position configuration
 */
interface CanvasPosition {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * Canvas scale configuration
 */
interface CanvasScale {
  /** Horizontal scale factor */
  x: number;
  /** Vertical scale factor */
  y: number;
}

/**
 * Canvas interface with transformation methods
 */
interface Canvas {
  /**
   * Set canvas scale
   * @param scale - Scale configuration
   */
  scale(scale: CanvasScale): void;
  
  /**
   * Set canvas position
   * @param position - Position configuration
   */
  position(position: CanvasPosition): void;
  
  /**
   * Batch draw operation for performance optimization
   */
  batchDraw(): void;
}

/**
 * Runtime class extends View with canvas scaling functionality
 * Provides methods to manipulate canvas transformations
 */
export declare class Runtime extends View {
  /**
   * Internal canvas instance
   */
  protected canvas: Canvas;

  /**
   * Set canvas scale and position with optional translation
   * @param scaleX - Horizontal scale factor (default: 1)
   * @param scaleY - Vertical scale factor (default: 1)
   * @param offsetX - Horizontal offset in pixels (default: 0)
   * @param offsetY - Vertical offset in pixels (default: 0)
   */
  setCanvasScale(
    scaleX?: number,
    scaleY?: number,
    offsetX?: number,
    offsetY?: number
  ): void;
}

/**
 * Re-exported ToolType enum from tools module
 */
export { ToolType };

/**
 * Re-exported EventType enum from events module
 */
export { EventType };

/**
 * Re-exported ShortkeyHelper utility from shortcuts module
 */
export { ShortkeyHelper };