interface EventMap {
  [eventName: string]: Array<(...args: any[]) => void>;
}

class EventEmitter {
  private events: EventMap = {};

  on(eventName: string, handler: (...args: any[]) => void): void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(handler);
  }

  emit(eventName: string, ...args: any[]): void {
    if (this.events[eventName]) {
      [...this.events[eventName]].forEach((handler) => {
        handler.call(this, ...args);
      });
    }
  }

  once(eventName: string, handler: (...args: any[]) => void): void {
    const onceHandler = (...args: any[]): void => {
      handler.call(this, ...args);
      this.off(eventName, onceHandler);
    };
    this.on(eventName, onceHandler);
  }

  off(eventName: string, handler: (...args: any[]) => void): void {
    if (this.events[eventName]) {
      const index = this.events[eventName].indexOf(handler);
      if (index !== -1) {
        this.events[eventName].splice(index, 1);
      }
    }
  }
}

export default EventEmitter;