interface PositionOffset {
  top: number;
}

interface WithinObject {
  isWindow: boolean;
  scrollTop: number;
  height: number;
  offset: {
    top: number;
  };
}

interface CollisionPosition {
  marginTop: number;
}

interface PositionOptions {
  within: WithinObject;
  collisionPosition: CollisionPosition;
  collisionHeight: number;
}

function adjustTopPosition(
  offset: PositionOffset,
  options: PositionOptions
): void {
  const { within, collisionPosition, collisionHeight } = options;
  
  const withinTop = within.isWindow ? within.scrollTop : within.offset.top;
  const withinHeight = within.height;
  const elementTop = offset.top - collisionPosition.marginTop;
  const overflowTop = withinTop - elementTop;
  const overflowBottom = elementTop + collisionHeight - withinHeight - withinTop;

  if (collisionHeight > withinHeight) {
    if (overflowTop > 0 && overflowBottom <= 0) {
      const adjustment = offset.top + overflowTop + collisionHeight - withinHeight - withinTop;
      offset.top += overflowTop - adjustment;
    } else {
      offset.top = overflowBottom > 0 && overflowTop <= 0
        ? withinTop
        : overflowTop > overflowBottom
          ? withinTop + withinHeight - collisionHeight
          : withinTop;
    }
  } else if (overflowTop > 0) {
    offset.top += overflowTop;
  } else if (overflowBottom > 0) {
    offset.top -= overflowBottom;
  } else {
    offset.top = Math.max(offset.top - elementTop, offset.top);
  }
}