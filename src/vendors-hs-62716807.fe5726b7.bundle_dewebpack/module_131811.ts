interface AffixInstance {
  lazyUpdatePosition(): void;
}

interface ObserverEntity {
  target: Window | HTMLElement;
  affixList: AffixInstance[];
  eventHandlers: Record<string, { remove?: () => void }>;
}

interface TargetRect {
  top: number;
  bottom: number;
}

const OBSERVE_EVENTS = [
  "resize",
  "scroll",
  "touchstart",
  "touchmove",
  "touchend",
  "pageshow",
  "load"
] as const;

let observerEntities: ObserverEntity[] = [];

function addEventListener(
  target: Window | HTMLElement,
  eventName: string,
  handler: () => void
): { remove?: () => void } {
  target.addEventListener(eventName, handler);
  return {
    remove: () => target.removeEventListener(eventName, handler)
  };
}

export function addObserveTarget(
  target: Window | HTMLElement | undefined,
  affixInstance: AffixInstance
): void {
  if (!target) return;

  let entity = observerEntities.find((item) => item.target === target);

  if (entity) {
    entity.affixList.push(affixInstance);
  } else {
    entity = {
      target,
      affixList: [affixInstance],
      eventHandlers: {}
    };

    observerEntities.push(entity);

    OBSERVE_EVENTS.forEach((eventName) => {
      entity.eventHandlers[eventName] = addEventListener(target, eventName, () => {
        entity.affixList.forEach((affix) => {
          affix.lazyUpdatePosition();
        });
      });
    });
  }
}

export function removeObserveTarget(affixInstance: AffixInstance): void {
  const entity = observerEntities.find((item) => {
    const hasAffix = item.affixList.some((affix) => affix === affixInstance);

    if (hasAffix) {
      item.affixList = item.affixList.filter((affix) => affix !== affixInstance);
    }

    return hasAffix;
  });

  if (entity && entity.affixList.length === 0) {
    observerEntities = observerEntities.filter((item) => item !== entity);

    OBSERVE_EVENTS.forEach((eventName) => {
      const handler = entity.eventHandlers[eventName];
      handler?.remove?.();
    });
  }
}

export function getTargetRect(target: Window | HTMLElement): TargetRect {
  return target !== window
    ? target.getBoundingClientRect()
    : {
        top: 0,
        bottom: window.innerHeight
      };
}

export function getFixedTop(
  targetRect: TargetRect,
  affixRect: TargetRect,
  offsetTop: number | undefined
): number | undefined {
  if (offsetTop !== undefined && affixRect.top > targetRect.top - offsetTop) {
    return offsetTop + affixRect.top;
  }
  return undefined;
}

export function getFixedBottom(
  targetRect: TargetRect,
  affixRect: TargetRect,
  offsetBottom: number | undefined
): number | undefined {
  if (offsetBottom !== undefined && affixRect.bottom < targetRect.bottom + offsetBottom) {
    return offsetBottom + (window.innerHeight - affixRect.bottom);
  }
  return undefined;
}

export function getObserverEntities(): ObserverEntity[] {
  return observerEntities;
}