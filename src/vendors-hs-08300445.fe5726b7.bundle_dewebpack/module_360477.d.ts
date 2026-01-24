/**
 * Core dragging utility functions for draggable components
 * Provides axis control, position calculation, boundary constraints, and grid snapping
 */

/**
 * Props interface for draggable components
 */
interface DraggableProps {
  /** Axis constraint: 'both', 'x', 'y', or 'none' */
  axis: 'both' | 'x' | 'y' | 'none';
  /** Boundary constraints for dragging */
  bounds?: BoundsType;
  /** Scale factor for drag calculations */
  scale: number;
  /** Custom offset parent element */
  offsetParent?: HTMLElement;
}

/**
 * State interface for draggable components
 */
interface DraggableState {
  /** Current X position */
  x: number;
  /** Current Y position */
  y: number;
}

/**
 * Draggable component instance
 */
interface DraggableInstance {
  props: DraggableProps;
  state: DraggableState;
  lastX?: number;
  lastY?: number;
  findDOMNode(): HTMLElement | null;
}

/**
 * Boundary definition - can be a selector string or explicit coordinates
 */
type BoundsType = string | BoundsCoordinates;

/**
 * Explicit boundary coordinates
 */
interface BoundsCoordinates {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
}

/**
 * Core drag data containing node reference and position deltas
 */
interface CoreData {
  /** The DOM node being dragged */
  node: HTMLElement;
  /** Change in X position */
  deltaX: number;
  /** Change in Y position */
  deltaY: number;
  /** Previous X position */
  lastX: number;
  /** Previous Y position */
  lastY: number;
  /** Current X position */
  x: number;
  /** Current Y position */
  y: number;
}

/**
 * Draggable-specific data with scaled positions
 */
interface DraggableData {
  /** The DOM node being dragged */
  node: HTMLElement;
  /** Current X position */
  x: number;
  /** Current Y position */
  y: number;
  /** Change in X position (scaled) */
  deltaX: number;
  /** Change in Y position (scaled) */
  deltaY: number;
  /** Previous X position */
  lastX: number;
  /** Previous Y position */
  lastY: number;
}

/**
 * Grid snap configuration [xStep, yStep]
 */
type GridConfig = [number, number];

/**
 * Position tuple [x, y]
 */
type Position = [number, number];

/**
 * Checks if dragging is allowed on the X axis
 * @param instance - Draggable component instance
 * @returns True if X-axis dragging is enabled
 */
export function canDragX(instance: DraggableInstance): boolean;

/**
 * Checks if dragging is allowed on the Y axis
 * @param instance - Draggable component instance
 * @returns True if Y-axis dragging is enabled
 */
export function canDragY(instance: DraggableInstance): boolean;

/**
 * Creates core drag data from instance state and current position
 * @param instance - Draggable component instance
 * @param x - Current X coordinate
 * @param y - Current Y coordinate
 * @returns Core drag data with position and deltas
 */
export function createCoreData(
  instance: DraggableInstance,
  x: number,
  y: number
): CoreData;

/**
 * Creates draggable-specific data with scale-adjusted positions
 * @param instance - Draggable component instance
 * @param coreData - Core drag data
 * @returns Draggable data with scaled coordinates
 */
export function createDraggableData(
  instance: DraggableInstance,
  coreData: CoreData
): DraggableData;

/**
 * Constrains position within configured bounds
 * @param instance - Draggable component instance
 * @param x - Proposed X position
 * @param y - Proposed Y position
 * @returns Constrained [x, y] position tuple
 */
export function getBoundPosition(
  instance: DraggableInstance,
  x: number,
  y: number
): Position;

/**
 * Extracts control position from event
 * @param event - Mouse or touch event
 * @param touchIdentifier - Touch identifier for multi-touch (optional)
 * @param instance - Draggable component instance
 * @returns Position relative to offset parent, or null if touch not found
 */
export function getControlPosition(
  event: MouseEvent | TouchEvent,
  touchIdentifier: number | undefined,
  instance: DraggableInstance
): Position | null;

/**
 * Snaps position to grid intervals
 * @param grid - Grid configuration [xStep, yStep]
 * @param x - X position to snap
 * @param y - Y position to snap
 * @returns Snapped [x, y] position tuple
 */
export function snapToGrid(grid: GridConfig, x: number, y: number): Position;