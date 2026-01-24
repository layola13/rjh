/**
 * React Draggable Component Type Definitions
 * Provides a draggable wrapper component for React elements
 */

import type { Component, ReactElement, CSSProperties } from 'react';
import type { DraggableCore, DraggableCoreProps } from './DraggableCore';

/**
 * Axis constraint for dragging direction
 */
export type DraggableAxis = 'both' | 'x' | 'y' | 'none';

/**
 * Position coordinates in 2D space
 */
export interface Position {
  /** X-axis coordinate */
  x: number;
  /** Y-axis coordinate */
  y: number;
}

/**
 * Position offset supporting both numeric and percentage values
 */
export interface PositionOffset {
  /** X-axis offset (pixels or percentage string like "50%") */
  x: number | string;
  /** Y-axis offset (pixels or percentage string like "50%") */
  y: number | string;
}

/**
 * Boundary constraints for draggable movement
 */
export interface Bounds {
  /** Left boundary limit in pixels */
  left?: number;
  /** Right boundary limit in pixels */
  right?: number;
  /** Top boundary limit in pixels */
  top?: number;
  /** Bottom boundary limit in pixels */
  bottom?: number;
}

/**
 * Draggable event data passed to event handlers
 */
export interface DraggableData {
  /** DOM node being dragged */
  node: HTMLElement;
  /** Current X position */
  x: number;
  /** Current Y position */
  y: number;
  /** Change in X since last drag event */
  deltaX: number;
  /** Change in Y since last drag event */
  deltaY: number;
  /** Last X position */
  lastX: number;
  /** Last Y position */
  lastY: number;
}

/**
 * Event handler type for drag events
 * @param e - Original mouse/touch event
 * @param data - Draggable-specific event data
 * @returns false to cancel the drag, void/undefined to continue
 */
export type DraggableEventHandler = (
  e: MouseEvent | TouchEvent,
  data: DraggableData
) => void | false;

/**
 * Props for the Draggable component
 */
export interface DraggableProps extends Omit<DraggableCoreProps, 'onStart' | 'onDrag' | 'onStop'> {
  /**
   * Constrains dragging to a specific axis
   * @default "both"
   */
  axis?: DraggableAxis;

  /**
   * Boundary constraints for dragging
   * - Object with left/right/top/bottom properties
   * - String selector for a parent element
   * - false to disable bounds
   * @default false
   */
  bounds?: Bounds | string | false;

  /**
   * Single React child element to make draggable
   */
  children: ReactElement;

  /**
   * Initial position when component mounts (uncontrolled mode)
   * @default { x: 0, y: 0 }
   */
  defaultPosition?: Position;

  /**
   * Base CSS class applied to the draggable element
   * @default "react-draggable"
   */
  defaultClassName?: string;

  /**
   * CSS class applied while dragging
   * @default "react-draggable-dragging"
   */
  defaultClassNameDragging?: string;

  /**
   * CSS class applied after element has been dragged
   * @default "react-draggable-dragged"
   */
  defaultClassNameDragged?: string;

  /**
   * Controlled position (requires onDrag/onStop handlers to update)
   */
  position?: Position;

  /**
   * Offset applied to the transform position
   */
  positionOffset?: PositionOffset;

  /**
   * Scale factor for drag calculations (useful for zoomed containers)
   * @default 1
   */
  scale?: number;

  /**
   * Called when dragging starts
   * @param e - Mouse/touch event
   * @param data - Drag event data
   * @returns false to prevent drag from starting
   */
  onStart?: DraggableEventHandler;

  /**
   * Called during drag movement
   * @param e - Mouse/touch event
   * @param data - Drag event data
   * @returns false to stop dragging
   */
  onDrag?: DraggableEventHandler;

  /**
   * Called when dragging stops
   * @param e - Mouse/touch event
   * @param data - Drag event data
   * @returns false to prevent drag from stopping
   */
  onStop?: DraggableEventHandler;
}

/**
 * Internal state of the Draggable component
 */
export interface DraggableState {
  /** Whether the element is currently being dragged */
  dragging: boolean;
  /** Whether the element has ever been dragged */
  dragged: boolean;
  /** Current X position */
  x: number;
  /** Current Y position */
  y: number;
  /** Previous position prop (for getDerivedStateFromProps) */
  prevPropsPosition?: Position;
  /** Accumulated slack in X direction when constrained by bounds */
  slackX: number;
  /** Accumulated slack in Y direction when constrained by bounds */
  slackY: number;
  /** Whether the draggable element is an SVG element */
  isElementSVG: boolean;
}

/**
 * Draggable Component
 * 
 * A React component that makes a single child element draggable.
 * Supports controlled and uncontrolled modes, boundary constraints,
 * axis locking, and works with both HTML and SVG elements.
 * 
 * @example
 *