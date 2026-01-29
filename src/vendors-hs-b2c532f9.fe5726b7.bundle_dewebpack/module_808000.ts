class EventElement {
  private element: HTMLElement;
  private events: Record<string, EventListener[]>;

  constructor(element: HTMLElement) {
    this.element = element;
    this.events = {};
  }

  bind(eventName: string, listener: EventListener): void {
    if (this.events[eventName] === undefined) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
    this.element.addEventListener(eventName, listener, false);
  }

  unbind(eventName: string, listener?: EventListener): void {
    const hasSpecificListener = listener !== undefined;
    this.events[eventName] = this.events[eventName].filter((registeredListener) => {
      if (!hasSpecificListener || registeredListener === listener) {
        this.element.removeEventListener(eventName, registeredListener, false);
        return false;
      }
      return true;
    });
  }

  unbindAll(): void {
    for (const eventName in this.events) {
      this.unbind(eventName);
    }
  }
}

class EventManager {
  private eventElements: EventElement[];

  constructor() {
    this.eventElements = [];
  }

  eventElement(element: HTMLElement): EventElement {
    let eventElement = this.eventElements.find(
      (item) => item['element'] === element
    );

    if (eventElement === undefined) {
      eventElement = new EventElement(element);
      this.eventElements.push(eventElement);
    }

    return eventElement;
  }

  bind(element: HTMLElement, eventName: string, listener: EventListener): void {
    this.eventElement(element).bind(eventName, listener);
  }

  unbind(element: HTMLElement, eventName: string, listener?: EventListener): void {
    this.eventElement(element).unbind(eventName, listener);
  }

  unbindAll(): void {
    for (let i = 0; i < this.eventElements.length; i++) {
      this.eventElements[i].unbindAll();
    }
  }

  once(element: HTMLElement, eventName: string, listener: EventListener): void {
    const eventElement = this.eventElement(element);
    const onceListener = (event: Event) => {
      eventElement.unbind(eventName, onceListener);
      listener(event);
    };
    eventElement.bind(eventName, onceListener);
  }
}

export default EventManager;