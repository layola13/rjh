/**
 * Touch and wheel event handler hook for drag/swipe interactions with momentum scrolling
 * 
 * @param element - React ref to the DOM element to attach listeners to
 * @param onMove - Callback function invoked with deltaX and deltaY values during drag/scroll
 * @returns void
 */
export default function useDragAndWheelHandler(
  element: React.RefObject<HTMLElement>,
  onMove: (deltaX: number, deltaY: number) => boolean | void
): void;

/**
 * Coordinate point in 2D space
 */
interface Point {
  /** X coordinate (horizontal position) */
  x: number;
  /** Y coordinate (vertical position) */
  y: number;
}

/**
 * Touch event handlers interface
 */
interface TouchHandlers {
  /** Handler for touch start event */
  onTouchStart: (event: TouchEvent) => void;
  /** Handler for touch move event */
  onTouchMove: (event: TouchEvent) => void;
  /** Handler for touch end event */
  onTouchEnd: () => void;
  /** Handler for wheel event */
  onWheel: (event: WheelEvent) => void;
}

/**
 * Minimum velocity threshold for momentum scrolling (pixels per millisecond)
 * Velocities below this value will stop the momentum animation
 */
declare const VELOCITY_THRESHOLD: 0.1;

/**
 * Minimum velocity to stop momentum scrolling (pixels per millisecond)
 * When velocity decays below this, the momentum animation stops
 */
declare const MIN_VELOCITY: 0.01;

/**
 * Interval duration for momentum animation frames (milliseconds)
 */
declare const MOMENTUM_INTERVAL: 20;

/**
 * Decay factor applied to velocity each momentum frame
 * Calculated as: Math.pow(0.995, MOMENTUM_INTERVAL)
 */
declare const VELOCITY_DECAY: number;