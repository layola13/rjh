export interface ColorInput {
  h: number;
  s: number;
  v: number;
  a: number;
}

export interface ColorChange {
  h: number;
  s: number;
  v: number;
  a: number;
  source: string;
}

/**
 * Calculate HSV color change based on mouse/touch position within an element
 * @param event - Mouse or touch event
 * @param color - Current color in HSV format
 * @param container - HTML element serving as the color picker container
 * @returns New color values with updated saturation and value
 */
export function calculateChange(
  event: MouseEvent | TouchEvent,
  color: ColorInput,
  container: HTMLElement
): ColorChange {
  const rect = container.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  const pageX = typeof (event as MouseEvent).pageX === "number"
    ? (event as MouseEvent).pageX
    : (event as TouchEvent).touches[0].pageX;

  const pageY = typeof (event as MouseEvent).pageY === "number"
    ? (event as MouseEvent).pageY
    : (event as TouchEvent).touches[0].pageY;

  let offsetX = pageX - (container.getBoundingClientRect().left + window.pageXOffset);
  let offsetY = pageY - (container.getBoundingClientRect().top + window.pageYOffset);

  if (offsetX < 0) {
    offsetX = 0;
  } else if (offsetX > width) {
    offsetX = width;
  }

  if (offsetY < 0) {
    offsetY = 0;
  } else if (offsetY > height) {
    offsetY = height;
  }

  const saturation = (100 * offsetX) / width;
  const value = (-100 * offsetY) / height + 100;

  return {
    h: color.h,
    s: saturation,
    v: value,
    a: color.a,
    source: "rgb"
  };
}