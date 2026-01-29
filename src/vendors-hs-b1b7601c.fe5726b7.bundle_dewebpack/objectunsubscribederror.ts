export class ObjectUnsubscribedError extends Error {
  constructor() {
    super("object unsubscribed");
    this.name = "ObjectUnsubscribedError";
  }
}