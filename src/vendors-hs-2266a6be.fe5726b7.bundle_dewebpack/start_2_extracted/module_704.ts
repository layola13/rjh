interface EventMap {
  [eventName: string]: EventCallback[];
}

type EventCallback = (...args: any[]) => void;

class EventEmitter {
  private events: EventMap;

  constructor() {
    this.events = {};
  }

  on(eventName: string, callback: EventCallback): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  emit(eventName: string, ...args: any[]): void {
    if (this.events[eventName]) {
      [...this.events[eventName]].forEach((callback) => {
        callback.call(this, ...args);
      });
    }
  }

  once(eventName: string, callback: EventCallback): void {
    const onceWrapper = (...args: any[]): void => {
      callback.call(this, ...args);
      this.off(eventName, onceWrapper);
    };
    this.on(eventName, onceWrapper);
  }

  off(eventName: string, callback: EventCallback): void {
    if (this.events[eventName]) {
      const index = this.events[eventName].indexOf(callback);
      if (index !== -1) {
        this.events[eventName].splice(index, 1);
      }
    }
  }
}

export default EventEmitter;