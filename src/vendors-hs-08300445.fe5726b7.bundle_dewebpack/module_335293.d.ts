/**
 * Slider utility module for calculating values, handling keyboard/mouse events,
 * and ensuring value constraints for range slider components.
 */

import { KeyCode } from './KeyCode';
import { findDOMNode } from 'react-dom';

/**
 * Configuration options for slider calculations
 */
export interface SliderConfig {
  /** Minimum allowed value */
  min: number;
  /** Maximum allowed value */
  max: number;
  /** Step increment for value changes */
  step: number | null;
  /** Named marks/positions on the slider */
  marks: Record<string, number | { label: string; style?: React.CSSProperties }>;
}

/**
 * Handle references for slider component
 */
export interface SliderHandles {
  [key: string]: React.ReactInstance | null;
}

/**
 * Value mutation function type
 */
export type ValueMutator = (currentValue: number, config: SliderConfig) => number;

/**
 * Direction for value changes
 */
type MutationDirection = 'increase' | 'decrease';

/**
 * Ensures the value stays within the specified min/max range.
 * 
 * @param value - The value to constrain
 * @param config - Slider configuration with min/max bounds
 * @returns The value clamped to [min, max] range
 */
export function ensureValueInRange(value: number, config: SliderConfig): number {
  const { max, min } = config;
  
  if (value <= min) return min;
  if (value >= max) return max;
  
  return value;
}

/**
 * Ensures the value precision matches the step precision.
 * 
 * @param value - The value to adjust
 * @param config - Slider configuration with step settings
 * @returns The value rounded to appropriate decimal places
 */
export function ensureValuePrecision(value: number, config: SliderConfig): number {
  const { step } = config;
  const closestPoint = isFinite(getClosestPoint(value, config)) 
    ? getClosestPoint(value, config) 
    : 0;
  
  return step === null 
    ? closestPoint 
    : parseFloat(closestPoint.toFixed(getPrecision(step)));
}

/**
 * Finds the closest valid point (mark or step) to the given value.
 * 
 * @param value - The target value
 * @param config - Slider configuration with marks, step, min, max
 * @returns The closest valid point on the slider
 */
export function getClosestPoint(value: number, config: SliderConfig): number {
  const { marks, step, min, max } = config;
  const points: number[] = Object.keys(marks).map(parseFloat);
  
  // Add step-based points if step is defined
  if (step !== null) {
    const multiplier = Math.pow(10, getPrecision(step));
    const stepCount = Math.floor((max * multiplier - min * multiplier) / (step * multiplier));
    const stepsFromMin = Math.min((value - min) / step, stepCount);
    const stepPoint = Math.round(stepsFromMin) * step + min;
    points.push(stepPoint);
  }
  
  // Find the point with minimum distance from value
  const distances = points.map(point => Math.abs(value - point));
  return points[distances.indexOf(Math.min(...distances))];
}

/**
 * Gets the decimal precision of a step value.
 * 
 * @param step - The step value to analyze
 * @returns Number of decimal places
 */
export function getPrecision(step: number): number {
  const stepString = step.toString();
  let precision = 0;
  
  if (stepString.indexOf('.') >= 0) {
    precision = stepString.length - stepString.indexOf('.') - 1;
  }
  
  return precision;
}

/**
 * Calculates the next value based on direction and configuration.
 * 
 * @param direction - Direction to move ('increase' or 'decrease')
 * @param currentValue - Current slider value
 * @param config - Slider configuration
 * @returns The next calculated value
 */
export function calculateNextValue(
  direction: MutationDirection,
  currentValue: number,
  config: SliderConfig
): number {
  const mutators: Record<MutationDirection, (val: number, delta: number) => number> = {
    increase: (val, delta) => val + delta,
    decrease: (val, delta) => val - delta,
  };
  
  const markKeys = Object.keys(config.marks);
  const currentMarkIndex = markKeys.indexOf(JSON.stringify(currentValue));
  const nextMarkIndex = mutators[direction](currentMarkIndex, 1);
  const nextMarkKey = markKeys[nextMarkIndex];
  
  // Use step if defined, otherwise use marks
  if (config.step) {
    return mutators[direction](currentValue, config.step);
  }
  
  if (markKeys.length && config.marks[nextMarkKey]) {
    return config.marks[nextMarkKey] as number;
  }
  
  return currentValue;
}

/**
 * Returns a value mutator function based on keyboard input.
 * 
 * @param event - Keyboard event
 * @param isVertical - Whether the slider is vertical
 * @param isReversed - Whether the slider direction is reversed
 * @returns A function that calculates the next value, or undefined if key not handled
 */
export function getKeyboardValueMutator(
  event: React.KeyboardEvent,
  isVertical: boolean,
  isReversed: boolean
): ValueMutator | undefined {
  const INCREASE: MutationDirection = 'increase';
  const DECREASE: MutationDirection = 'decrease';
  let direction: MutationDirection = INCREASE;
  
  switch (event.keyCode) {
    case KeyCode.UP:
      direction = isVertical && isReversed ? DECREASE : INCREASE;
      break;
    case KeyCode.RIGHT:
      direction = !isVertical && isReversed ? DECREASE : INCREASE;
      break;
    case KeyCode.DOWN:
      direction = isVertical && isReversed ? INCREASE : DECREASE;
      break;
    case KeyCode.LEFT:
      direction = !isVertical && isReversed ? INCREASE : DECREASE;
      break;
    case KeyCode.END:
      return (_value: number, config: SliderConfig) => config.max;
    case KeyCode.HOME:
      return (_value: number, config: SliderConfig) => config.min;
    case KeyCode.PAGE_UP:
      return (value: number, config: SliderConfig) => value + 2 * (config.step ?? 0);
    case KeyCode.PAGE_DOWN:
      return (value: number, config: SliderConfig) => value - 2 * (config.step ?? 0);
    default:
      return undefined;
  }
  
  return (value: number, config: SliderConfig) => calculateNextValue(direction, value, config);
}

/**
 * Gets the center position of a slider handle element.
 * 
 * @param isVertical - Whether the slider is vertical
 * @param handleElement - The handle DOM element
 * @returns The center position in pixels
 */
export function getHandleCenterPosition(isVertical: boolean, handleElement: HTMLElement): number {
  const rect = handleElement.getBoundingClientRect();
  return isVertical 
    ? rect.top + 0.5 * rect.height 
    : window.pageXOffset + rect.left + 0.5 * rect.width;
}

/**
 * Extracts the relevant position from a mouse event.
 * 
 * @param isVertical - Whether the slider is vertical
 * @param event - Mouse event
 * @returns The position value (clientY or pageX)
 */
export function getMousePosition(isVertical: boolean, event: MouseEvent): number {
  return isVertical ? event.clientY : event.pageX;
}

/**
 * Extracts the relevant position from a touch event.
 * 
 * @param isVertical - Whether the slider is vertical
 * @param event - Touch event
 * @returns The position value from the first touch point
 */
export function getTouchPosition(isVertical: boolean, event: TouchEvent): number {
  return isVertical ? event.touches[0].clientY : event.touches[0].pageX;
}

/**
 * Checks if an event originated from a slider handle.
 * 
 * @param event - The DOM event
 * @param handles - Map of handle references
 * @returns True if the event target is one of the handles
 */
export function isEventFromHandle(event: Event, handles: SliderHandles): boolean {
  try {
    return Object.keys(handles).some(key => 
      event.target === findDOMNode(handles[key])
    );
  } catch (error) {
    return false;
  }
}

/**
 * Checks if a touch event should be ignored (multi-touch or end with touches).
 * 
 * @param event - Touch event
 * @returns True if the event should not be processed
 */
export function isNotTouchEvent(event: TouchEvent): boolean {
  return (
    event.touches.length > 1 || 
    (event.type.toLowerCase() === 'touchend' && event.touches.length > 0)
  );
}

/**
 * Checks if a value is outside the allowed range.
 * 
 * @param value - The value to check
 * @param config - Slider configuration with min/max
 * @returns True if value is out of range
 */
export function isValueOutOfRange(value: number, config: SliderConfig): boolean {
  const { min, max } = config;
  return value < min || value > max;
}

/**
 * Stops event propagation and prevents default behavior.
 * 
 * @param event - The event to pause
 */
export function pauseEvent(event: Event): void {
  event.stopPropagation();
  event.preventDefault();
}