interface FireOptions {
  detail?: unknown;
  cancelable: boolean;
}

function fire(
  eventOrName: Event | string,
  detail?: unknown
): { node: EventTarget; _event: Event } {
  let dispatchedEvent: Event;

  if (eventOrName instanceof Event) {
    dispatchedEvent = eventOrName;
    this.node.dispatchEvent(dispatchedEvent);
  } else {
    dispatchedEvent = new CustomEvent(eventOrName, {
      detail: detail,
      cancelable: true
    });
    this.node.dispatchEvent(dispatchedEvent);
  }

  this._event = dispatchedEvent;
  return this;
}