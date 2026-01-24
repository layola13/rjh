/**
 * React Draggable component library
 * Provides draggable functionality for React components
 */

import type { ComponentType } from 'react';

/**
 * Core draggable functionality without positioning logic
 * Provides low-level drag event handling
 */
export interface DraggableCore extends ComponentType<DraggableCoreProps> {}

/**
 * Props for DraggableCore component
 */
export interface DraggableCoreProps {
  /** Allow any specific direction for dragging */
  allowAnyClick?: boolean;
  /** Cancel dragging on these elements (CSS selector) */
  cancel?: string;
  /** Enable dragging only from these elements (CSS selector) */
  handle?: string;
  /** Enable/disable dragging */
  disabled?: boolean;
  /** Callback when drag starts */
  onStart?: (e: MouseEvent, data: DraggableData) => void | false;
  /** Callback during dragging */
  onDrag?: (e: MouseEvent, data: DraggableData) => void | false;
  /** Callback when drag ends */
  onStop?: (e: MouseEvent, data: DraggableData) => void | false;
  /** Callback on mouse down */
  onMouseDown?: (e: MouseEvent) => void;
  /** Scale factor for dragging calculations */
  scale?: number;
}

/**
 * Data provided to drag event callbacks
 */
export interface DraggableData {
  /** DOM node being dragged */
  node: HTMLElement;
  /** Current x position */
  x: number;
  /** Current y position */
  y: number;
  /** Change in x from last position */
  deltaX: number;
  /** Change in y from last position */
  deltaY: number;
  /** Last x position */
  lastX: number;
  /** Last y position */
  lastY: number;
}

/**
 * Full-featured draggable component with positioning
 * Manages component position and constrained dragging
 */
export interface Draggable extends ComponentType<DraggableProps> {}

/**
 * Props for Draggable component
 */
export interface DraggableProps extends DraggableCoreProps {
  /** Dragging axis constraint: 'x', 'y', 'both', or 'none' */
  axis?: 'x' | 'y' | 'both' | 'none';
  /** Boundary constraints for dragging */
  bounds?: DraggableBounds | string | false;
  /** Default position for uncontrolled component */
  defaultPosition?: ControlPosition;
  /** Position for controlled component */
  position?: ControlPosition;
  /** CSS transform to apply */
  positionOffset?: PositionOffsetControlPosition;
  /** Snap to grid [x, y] */
  grid?: [number, number];
}

/**
 * Position control object
 */
export interface ControlPosition {
  x: number;
  y: number;
}

/**
 * Position offset with string or number values
 */
export interface PositionOffsetControlPosition {
  x: number | string;
  y: number | string;
}

/**
 * Draggable boundary constraints
 */
export interface DraggableBounds {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
}

/**
 * Default export: Main Draggable component
 */
declare const Draggable: Draggable;

export default Draggable;
export { DraggableCore };