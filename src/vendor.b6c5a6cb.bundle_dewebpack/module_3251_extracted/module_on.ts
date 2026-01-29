function on<T extends EventTarget>(
  target: T,
  eventType: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
  context?: unknown
): void {
  return Ct(this, target, eventType, handler, options, context);
}