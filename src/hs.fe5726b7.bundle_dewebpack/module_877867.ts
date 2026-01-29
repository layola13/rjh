export type EventHandler = (...args: any[]) => boolean | void;

export function combineEventHandlers(
  firstHandler: EventHandler | undefined,
  secondHandler: EventHandler | undefined
): EventHandler | null {
  const hasFirstHandler = typeof firstHandler === "function";
  const hasSecondHandler = typeof secondHandler === "function";

  if (!hasFirstHandler && !hasSecondHandler) {
    return null;
  }

  if (!hasFirstHandler) {
    return secondHandler!;
  }

  if (!hasSecondHandler) {
    return firstHandler!;
  }

  return function combinedHandler(this: any, ...args: any[]): void {
    const firstResult = firstHandler.apply(this, args);
    
    if (firstResult !== false) {
      secondHandler.apply(this, args);
    }
  };
}

export default combineEventHandlers;