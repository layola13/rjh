interface WithinElement {
  isWindow: boolean;
  scrollTop: number;
  offset: { top: number };
  height: number;
}

interface CollisionPosition {
  marginTop: number;
}

interface PositionOptions {
  within: WithinElement;
  collisionPosition: CollisionPosition;
  collisionHeight: number;
}

interface Position {
  top: number;
}

function positionTop(position: Position, options: PositionOptions): void {
  const within = options.within;
  const withinOffset = within.isWindow ? within.scrollTop : within.offset.top;
  const withinHeight = options.within.height;
  const elementTop = position.top - options.collisionPosition.marginTop;
  const overTop = withinOffset - elementTop;
  const overBottom = elementTop + options.collisionHeight - withinHeight - withinOffset;

  if (options.collisionHeight > withinHeight) {
    if (overTop > 0 && overBottom <= 0) {
      const newOverTop = position.top + overTop + options.collisionHeight - withinHeight - withinOffset;
      position.top += overTop - newOverTop;
    } else {
      position.top = overBottom > 0 && overTop <= 0 
        ? withinOffset 
        : overTop > overBottom 
          ? withinOffset + withinHeight - options.collisionHeight 
          : withinOffset;
    }
  } else if (overTop > 0) {
    position.top += overTop;
  } else if (overBottom > 0) {
    position.top -= overBottom;
  } else {
    position.top = Math.max(position.top - elementTop, position.top);
  }
}

export { positionTop, Position, PositionOptions, WithinElement, CollisionPosition };