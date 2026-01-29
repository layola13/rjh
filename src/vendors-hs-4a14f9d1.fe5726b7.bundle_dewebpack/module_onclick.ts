function handleClick<T extends Event>(event: T): void {
  return processEvent(event, eventHandler);
}