interface PositionElement {
  left: number;
}

interface WithinInfo {
  isWindow: boolean;
  scrollLeft: number;
  offset: { left: number };
  width: number;
}

interface PositionOptions {
  within: WithinInfo;
  collisionPosition: { marginLeft: number };
  collisionWidth: number;
}

/**
 * Adjusts the horizontal position to handle collision within boundaries
 * @param element - The element position to adjust
 * @param options - Position calculation options
 */
function adjustLeftPosition(
  element: PositionElement,
  options: PositionOptions
): void {
  let newLeft: number;

  const within = options.within;
  const withinLeft = within.isWindow ? within.scrollLeft : within.offset.left;
  const withinWidth = within.width;
  const elementLeft = element.left - options.collisionPosition.marginLeft;
  const overflowLeft = withinLeft - elementLeft;
  const overflowRight = elementLeft + options.collisionWidth - withinWidth - withinLeft;

  if (options.collisionWidth > withinWidth) {
    if (overflowLeft > 0 && overflowRight <= 0) {
      newLeft = element.left + overflowLeft + options.collisionWidth - withinWidth - withinLeft;
      element.left += overflowLeft - newLeft;
    } else {
      element.left = overflowRight > 0 && overflowLeft <= 0
        ? withinLeft
        : overflowLeft > overflowRight
        ? withinLeft + withinWidth - options.collisionWidth
        : withinLeft;
    }
  } else {
    if (overflowLeft > 0) {
      element.left += overflowLeft;
    } else if (overflowRight > 0) {
      element.left -= overflowRight;
    } else {
      element.left = Math.max(element.left - elementLeft, element.left);
    }
  }
}

export { adjustLeftPosition, PositionElement, PositionOptions, WithinInfo };