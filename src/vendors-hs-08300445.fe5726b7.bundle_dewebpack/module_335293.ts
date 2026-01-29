import { findDOMNode } from 'react-dom';

enum KeyCode {
  UP = 38,
  DOWN = 40,
  LEFT = 37,
  RIGHT = 39,
  END = 35,
  HOME = 36,
  PAGE_UP = 33,
  PAGE_DOWN = 34,
}

interface SliderRange {
  min: number;
  max: number;
  step: number | null;
  marks: Record<string, number>;
}

type ValueMutator = (currentValue: number, range: SliderRange) => number;

type MutatorDirection = 'increase' | 'decrease';

export function ensureValueInRange(value: number, range: Pick<SliderRange, 'min' | 'max'>): number {
  const { max, min } = range;
  if (value <= min) return min;
  if (value >= max) return max;
  return value;
}

export function getPrecision(step: number): number {
  const stepString = step.toString();
  let precision = 0;
  if (stepString.indexOf('.') >= 0) {
    precision = stepString.length - stepString.indexOf('.') - 1;
  }
  return precision;
}

export function getClosestPoint(value: number, range: SliderRange): number {
  const { marks, step, min, max } = range;
  const pointsFromMarks = Object.keys(marks).map(parseFloat);

  if (step !== null) {
    const multiplier = Math.pow(10, getPrecision(step));
    const maxSteps = Math.floor((max * multiplier - min * multiplier) / (step * multiplier));
    const steps = Math.min((value - min) / step, maxSteps);
    const snappedValue = Math.round(steps) * step + min;
    pointsFromMarks.push(snappedValue);
  }

  const distances = pointsFromMarks.map((point) => Math.abs(value - point));
  return pointsFromMarks[distances.indexOf(Math.min(...distances))];
}

export function ensureValuePrecision(value: number, range: SliderRange): number {
  const { step } = range;
  const closestPoint = isFinite(getClosestPoint(value, range)) ? getClosestPoint(value, range) : 0;
  return step === null ? closestPoint : parseFloat(closestPoint.toFixed(getPrecision(step)));
}

export function calculateNextValue(direction: MutatorDirection, currentValue: number, range: SliderRange): number {
  const mutators: Record<MutatorDirection, (a: number, b: number) => number> = {
    increase: (a, b) => a + b,
    decrease: (a, b) => a - b,
  };

  const markKeys = Object.keys(range.marks);
  const currentMarkIndex = markKeys.indexOf(JSON.stringify(currentValue));
  const nextMarkIndex = mutators[direction](currentMarkIndex, 1);
  const nextMarkKey = markKeys[nextMarkIndex];

  if (range.step) {
    return mutators[direction](currentValue, range.step);
  }

  if (markKeys.length && range.marks[nextMarkKey]) {
    return range.marks[nextMarkKey];
  }

  return currentValue;
}

export function getKeyboardValueMutator(
  event: KeyboardEvent,
  isVertical: boolean,
  isReversed: boolean
): ValueMutator | undefined {
  const INCREASE: MutatorDirection = 'increase';
  const DECREASE: MutatorDirection = 'decrease';
  let direction: MutatorDirection = INCREASE;

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
      return (_, range) => range.max;
    case KeyCode.HOME:
      return (_, range) => range.min;
    case KeyCode.PAGE_UP:
      return (value, range) => value + 2 * (range.step ?? 0);
    case KeyCode.PAGE_DOWN:
      return (value, range) => value - 2 * (range.step ?? 0);
    default:
      return undefined;
  }

  return (value, range) => calculateNextValue(direction, value, range);
}

export function getHandleCenterPosition(isVertical: boolean, handle: HTMLElement): number {
  const rect = handle.getBoundingClientRect();
  return isVertical ? rect.top + 0.5 * rect.height : window.pageXOffset + rect.left + 0.5 * rect.width;
}

export function getMousePosition(isVertical: boolean, event: MouseEvent): number {
  return isVertical ? event.clientY : event.pageX;
}

export function getTouchPosition(isVertical: boolean, event: TouchEvent): number {
  return isVertical ? event.touches[0].clientY : event.touches[0].pageX;
}

export function pauseEvent(event: Event): void {
  event.stopPropagation();
  event.preventDefault();
}

export function isEventFromHandle(event: Event, handles: Record<string, React.Component>): boolean {
  try {
    return Object.keys(handles).some((key) => event.target === findDOMNode(handles[key]));
  } catch {
    return false;
  }
}

export function isNotTouchEvent(event: TouchEvent): boolean {
  return event.touches.length > 1 || (event.type.toLowerCase() === 'touchend' && event.touches.length > 0);
}

export function isValueOutOfRange(value: number, range: Pick<SliderRange, 'min' | 'max'>): boolean {
  const { min, max } = range;
  return value < min || value > max;
}