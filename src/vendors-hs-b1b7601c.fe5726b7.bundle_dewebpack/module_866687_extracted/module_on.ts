function on<T extends EventTarget>(
  this: T,
  eventName: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions,
  priority?: number
): T {
  n.on(this, eventName, handler, options, priority);
  return this;
}