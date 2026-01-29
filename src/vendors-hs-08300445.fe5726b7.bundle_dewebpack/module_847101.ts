export interface HSLAColor {
  h: number;
  s: number;
  l: number;
  a: number;
  source: string;
}

export interface TouchEventWithPageCoordinates extends MouseEvent {
  touches?: Array<{ pageX: number; pageY: number }>;
}

/**
 * Calculates the change in alpha value based on mouse/touch position
 * @param event - Mouse or touch event
 * @param currentColor - Current HSLA color values
 * @param direction - Direction of the slider ('vertical' or 'horizontal')
 * @param currentAlpha - Current alpha value
 * @param container - DOM element containing the slider
 * @returns Updated color object if alpha changed, null otherwise
 */
export function calculateChange(
  event: TouchEventWithPageCoordinates,
  currentColor: HSLAColor,
  direction: string,
  currentAlpha: number,
  container: HTMLElement
): HSLAColor | null {
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  const pageX = typeof event.pageX === "number" 
    ? event.pageX 
    : event.touches?.[0].pageX ?? 0;
  
  const pageY = typeof event.pageY === "number" 
    ? event.pageY 
    : event.touches?.[0].pageY ?? 0;

  const relativeX = pageX - (container.getBoundingClientRect().left + window.pageXOffset);
  const relativeY = pageY - (container.getBoundingClientRect().top + window.pageYOffset);

  if (direction === "vertical") {
    let newAlpha: number;

    if (relativeY < 0) {
      newAlpha = 0;
    } else if (relativeY > containerHeight) {
      newAlpha = 1;
    } else {
      newAlpha = Math.round((100 * relativeY) / containerHeight) / 100;
    }

    if (currentColor.a !== newAlpha) {
      return {
        h: currentColor.h,
        s: currentColor.s,
        l: currentColor.l,
        a: newAlpha,
        source: "rgb"
      };
    }
  } else {
    let newAlpha: number;

    if (relativeX < 0) {
      newAlpha = 0;
    } else if (relativeX > containerWidth) {
      newAlpha = 1;
    } else {
      newAlpha = Math.round((100 * relativeX) / containerWidth) / 100;
    }

    if (currentAlpha !== newAlpha) {
      return {
        h: currentColor.h,
        s: currentColor.s,
        l: currentColor.l,
        a: newAlpha,
        source: "rgb"
      };
    }
  }

  return null;
}