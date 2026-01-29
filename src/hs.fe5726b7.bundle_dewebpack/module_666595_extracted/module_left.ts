interface PositionElement {
  left: number;
}

interface CollisionOptions {
  within: WithinElement;
  collisionPosition: {
    marginLeft: number;
  };
  collisionWidth: number;
}

interface WithinElement {
  isWindow: boolean;
  scrollLeft: number;
  offset: {
    left: number;
  };
  width: number;
}

/**
 * Adjusts the left position of an element to handle collision detection
 * @param element - The element being positioned
 * @param options - Collision detection options including boundaries and dimensions
 */
function adjustLeftPosition(
  element: PositionElement,
  options: CollisionOptions
): void {
  const { within, collisionPosition, collisionWidth } = options;
  
  const containerLeft = within.isWindow ? within.scrollLeft : within.offset.left;
  const containerWidth = within.width;
  const elementLeft = element.left - collisionPosition.marginLeft;
  const overflowLeft = containerLeft - elementLeft;
  const overflowRight = elementLeft + collisionWidth - containerWidth - containerLeft;

  let adjustedLeft: number;

  if (collisionWidth > containerWidth) {
    if (overflowLeft > 0 && overflowRight <= 0) {
      adjustedLeft = element.left + overflowLeft + collisionWidth - containerWidth - containerLeft;
      element.left += overflowLeft - adjustedLeft;
    } else if (overflowRight > 0 && overflowLeft <= 0) {
      element.left = containerLeft;
    } else if (overflowLeft > overflowRight) {
      element.left = containerLeft + containerWidth - collisionWidth;
    } else {
      element.left = containerLeft;
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