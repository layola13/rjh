type EventListener = (...args: any[]) => void;

interface EventEmitterListener {
  fn: EventListener;
  context: any;
  once: boolean;
}

type EventMap = Record<string | symbol, EventEmitterListener | EventEmitterListener[]>;

const hasOwnProperty = Object.prototype.hasOwnProperty;

function EmptyEvents(): void {}

let prefixSymbol: string | false = "~";

if (Object.create) {
  EmptyEvents.prototype = Object.create(null);
  if (!(new EmptyEvents() as any).__proto__) {
    prefixSymbol = false;
  }
}

class EventEmitterListener implements EventEmitterListener {
  fn: EventListener;
  context: any;
  once: boolean;

  constructor(fn: EventListener, context: any, once: boolean = false) {
    this.fn = fn;
    this.context = context;
    this.once = once;
  }
}

function addListener(
  emitter: EventEmitter,
  event: string | symbol,
  fn: EventListener,
  context: any,
  once: boolean
): EventEmitter {
  if (typeof fn !== "function") {
    throw new TypeError("The listener must be a function");
  }

  const listener = new EventEmitterListener(fn, context || emitter, once);
  const eventKey = prefixSymbol ? (prefixSymbol + String(event)) : event;

  if (!emitter._events[eventKey]) {
    emitter._events[eventKey] = listener;
    emitter._eventsCount++;
  } else if ((emitter._events[eventKey] as EventEmitterListener).fn) {
    emitter._events[eventKey] = [
      emitter._events[eventKey] as EventEmitterListener,
      listener
    ];
  } else {
    (emitter._events[eventKey] as EventEmitterListener[]).push(listener);
  }

  return emitter;
}

function clearEvent(emitter: EventEmitter, eventKey: string | symbol): void {
  if (--emitter._eventsCount === 0) {
    emitter._events = new EmptyEvents() as EventMap;
  } else {
    delete emitter._events[eventKey];
  }
}

class EventEmitter {
  _events: EventMap;
  _eventsCount: number;

  static prefixed = prefixSymbol;
  static EventEmitter = EventEmitter;

  constructor() {
    this._events = new EmptyEvents() as EventMap;
    this._eventsCount = 0;
  }

  eventNames(): Array<string | symbol> {
    const names: Array<string | symbol> = [];

    if (this._eventsCount === 0) {
      return names;
    }

    for (const name in this._events) {
      if (hasOwnProperty.call(this._events, name)) {
        names.push(prefixSymbol ? name.slice(1) : name);
      }
    }

    return Object.getOwnPropertySymbols
      ? names.concat(Object.getOwnPropertySymbols(this._events))
      : names;
  }

  listeners(event: string | symbol): EventListener[] {
    const eventKey = prefixSymbol ? (prefixSymbol + String(event)) : event;
    const handlers = this._events[eventKey];

    if (!handlers) {
      return [];
    }

    if ((handlers as EventEmitterListener).fn) {
      return [(handlers as EventEmitterListener).fn];
    }

    const listeners = handlers as EventEmitterListener[];
    const result = new Array<EventListener>(listeners.length);

    for (let i = 0; i < listeners.length; i++) {
      result[i] = listeners[i].fn;
    }

    return result;
  }

  listenerCount(event: string | symbol): number {
    const eventKey = prefixSymbol ? (prefixSymbol + String(event)) : event;
    const handlers = this._events[eventKey];

    if (!handlers) {
      return 0;
    }

    return (handlers as EventEmitterListener).fn ? 1 : (handlers as EventEmitterListener[]).length;
  }

  emit(event: string | symbol, ...args: any[]): boolean {
    const eventKey = prefixSymbol ? (prefixSymbol + String(event)) : event;

    if (!this._events[eventKey]) {
      return false;
    }

    const handlers = this._events[eventKey];

    if ((handlers as EventEmitterListener).fn) {
      const handler = handlers as EventEmitterListener;
      if (handler.once) {
        this.removeListener(event, handler.fn, undefined, true);
      }
      handler.fn.apply(handler.context, args);
    } else {
      const listeners = handlers as EventEmitterListener[];
      for (let i = 0; i < listeners.length; i++) {
        if (listeners[i].once) {
          this.removeListener(event, listeners[i].fn, undefined, true);
        }
        listeners[i].fn.apply(listeners[i].context, args);
      }
    }

    return true;
  }

  on(event: string | symbol, fn: EventListener, context?: any): this {
    return addListener(this, event, fn, context, false) as this;
  }

  once(event: string | symbol, fn: EventListener, context?: any): this {
    return addListener(this, event, fn, context, true) as this;
  }

  removeListener(event: string | symbol, fn?: EventListener, context?: any, once?: boolean): this {
    const eventKey = prefixSymbol ? (prefixSymbol + String(event)) : event;

    if (!this._events[eventKey]) {
      return this;
    }

    if (!fn) {
      clearEvent(this, eventKey);
      return this;
    }

    const handlers = this._events[eventKey];

    if ((handlers as EventEmitterListener).fn) {
      const handler = handlers as EventEmitterListener;
      if (
        handler.fn === fn &&
        (!once || handler.once) &&
        (!context || handler.context === context)
      ) {
        clearEvent(this, eventKey);
      }
    } else {
      const listeners = handlers as EventEmitterListener[];
      const remaining: EventEmitterListener[] = [];

      for (let i = 0; i < listeners.length; i++) {
        if (
          listeners[i].fn !== fn ||
          (once && !listeners[i].once) ||
          (context && listeners[i].context !== context)
        ) {
          remaining.push(listeners[i]);
        }
      }

      if (remaining.length) {
        this._events[eventKey] = remaining.length === 1 ? remaining[0] : remaining;
      } else {
        clearEvent(this, eventKey);
      }
    }

    return this;
  }

  removeAllListeners(event?: string | symbol): this {
    if (event) {
      const eventKey = prefixSymbol ? (prefixSymbol + String(event)) : event;
      if (this._events[eventKey]) {
        clearEvent(this, eventKey);
      }
    } else {
      this._events = new EmptyEvents() as EventMap;
      this._eventsCount = 0;
    }

    return this;
  }

  off(event: string | symbol, fn?: EventListener, context?: any, once?: boolean): this {
    return this.removeListener(event, fn, context, once);
  }

  addListener(event: string | symbol, fn: EventListener, context?: any): this {
    return this.on(event, fn, context);
  }
}

export default EventEmitter;