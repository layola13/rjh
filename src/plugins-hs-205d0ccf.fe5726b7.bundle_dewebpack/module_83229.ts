export interface Dimensions {
  width: number;
  height: number;
}

export interface Transform {
  top: number;
  left: number;
  scale: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface AutofitScaleOptions {
  width?: number;
  height?: number;
}

export interface MinScaleState {
  containerDimensions: Dimensions;
  imageDimensions: Dimensions;
  minScale: number | string;
}

type RefCallback<T> = (instance: T | null) => void;
type RefObject<T> = { current: T | null };
type Ref<T> = RefCallback<T> | RefObject<T>;

const ROUNDING_PRECISION = 5;

export function constrain(min: number, max: number, value: number): number {
  return Math.min(max, Math.max(min, value));
}

export function negate(value: number): number {
  return -1 * value;
}

export function snapToTarget(current: number, target: number, threshold: number): number {
  return Math.abs(target - current) < threshold ? target : current;
}

function roundToPrecision(value: number, precision?: number): number {
  if (precision && value != null) {
    const parts = `${String(value)}e`.split('e');
    const rounded = Math.round(Number(`${parts[0]}e${+parts[1] + precision}`));
    const finalParts = `${String(rounded)}e`.split('e');
    return Number(`${finalParts[0]}e${+finalParts[1] - precision}`);
  }
  return Math.round(value);
}

export function getRelativePosition(event: MouseEvent, element: HTMLElement): Position {
  const { clientX, clientY } = event;
  const rect = element.getBoundingClientRect();
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

export function isEqualDimensions(
  a: Dimensions | undefined,
  b: Dimensions | undefined
): boolean {
  return a === b === undefined || 
    (a !== undefined && b !== undefined && a.width === b.width && a.height === b.height);
}

export function getDimensions(element: HTMLElement | undefined): Dimensions | undefined {
  if (element !== undefined) {
    return {
      width: element.offsetWidth || (element as any).width,
      height: element.offsetHeight || (element as any).height
    };
  }
}

export function getContainerDimensions(element: HTMLElement): Dimensions {
  return {
    width: element.parentNode.offsetWidth,
    height: element.parentNode.offsetHeight
  };
}

export function isEqualTransform(
  a: Transform | undefined,
  b: Transform | undefined
): boolean {
  return a === b === undefined || 
    (a !== undefined && b !== undefined && 
      roundToPrecision(a.top, ROUNDING_PRECISION) === roundToPrecision(b.top, ROUNDING_PRECISION) &&
      roundToPrecision(a.left, ROUNDING_PRECISION) === roundToPrecision(b.left, ROUNDING_PRECISION) &&
      roundToPrecision(a.scale, ROUNDING_PRECISION) === roundToPrecision(b.scale, ROUNDING_PRECISION));
}

export function getAutofitScale(
  container: Dimensions,
  options?: AutofitScaleOptions
): number {
  const { width, height } = options || {};
  return width > 0 && height > 0 
    ? Math.min(container.width / width, container.height / height, 1) 
    : 1;
}

export function setRef<T>(ref: Ref<T> | null | undefined, value: T | null): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export function getMinScale(state: MinScaleState): number {
  const { containerDimensions, imageDimensions, minScale } = state;
  return String(minScale).toLowerCase() === 'auto' 
    ? getAutofitScale(containerDimensions, imageDimensions) 
    : (minScale as number) || 1;
}

export function tryCancelEvent(event: Event): boolean {
  if (event.cancelable !== false) {
    event.preventDefault();
    return true;
  }
  return false;
}