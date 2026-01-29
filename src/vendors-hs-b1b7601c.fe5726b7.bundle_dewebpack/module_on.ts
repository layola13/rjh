function on<T extends EventTarget>(
  this: T,
  element: EventTarget | string,
  eventType: string,
  handler: EventListener | EventListenerObject,
  options?: boolean | AddEventListenerOptions
): T {
  n.on(this, element, eventType, handler, options);
  return this;
}