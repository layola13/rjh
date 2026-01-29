function fire(eventOrName: Event | string, detail?: unknown): this {
  let event: Event;

  if (eventOrName instanceof Event) {
    event = eventOrName;
    this.node.dispatchEvent(event);
  } else {
    event = new CustomEvent(eventOrName, {
      detail,
      cancelable: true
    });
    this.node.dispatchEvent(event);
  }

  this._event = event;
  return this;
}