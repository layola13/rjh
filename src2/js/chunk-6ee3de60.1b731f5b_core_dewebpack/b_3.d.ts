/**
 * Pointer capture management module
 * Handles pointer event capture and release for canvas elements
 */

/**
 * Stage or node interface that can capture pointer events
 */
interface CaptureTarget {
  /**
   * Get the associated stage instance
   */
  getStage(): Stage | null | undefined;
  
  /**
   * Fire an internal event
   * @param eventType - The type of event to fire
   * @param eventData - The event data payload
   */
  _fire(eventType: string, eventData: PointerEventData): void;
}

/**
 * Stage interface containing the content element
 */
interface Stage {
  /**
   * The DOM content element of the stage
   */
  content: HTMLElement;
}

/**
 * Pointer event data wrapper
 */
interface PointerEventData {
  /**
   * Original pointer event
   */
  evt: PointerEvent;
  
  /**
   * Unique identifier for the pointer
   */
  pointerId: number;
}

/**
 * Get the target that has captured the specified pointer
 * @param pointerId - The unique pointer identifier
 * @returns The capture target or undefined if no capture exists
 */
export function getPointerCaptureTarget(pointerId: number): CaptureTarget | undefined;

/**
 * Create a pointer event data object from a PointerEvent
 * @param event - The native pointer event
 * @returns Wrapped event data with pointer ID
 */
export function createPointerEventData(event: PointerEvent): PointerEventData;

/**
 * Check if a specific target has captured the pointer
 * @param pointerId - The unique pointer identifier
 * @param target - The target to check
 * @returns True if the target has captured the pointer
 */
export function hasPointerCapture(pointerId: number, target: CaptureTarget): boolean;

/**
 * Set pointer capture to a target
 * Fires 'gotpointercapture' event if PointerEvent API is supported
 * @param pointerId - The unique pointer identifier
 * @param target - The target that should capture the pointer
 */
export function setPointerCapture(pointerId: number, target: CaptureTarget): void;

/**
 * Release pointer capture
 * Fires 'lostpointercapture' event if PointerEvent API is supported
 * @param pointerId - The unique pointer identifier
 * @param target - Optional target parameter (unused in current implementation)
 */
export function releasePointerCapture(pointerId: number, target?: CaptureTarget): void;