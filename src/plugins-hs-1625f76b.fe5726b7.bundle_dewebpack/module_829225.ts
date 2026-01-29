type EventListener = (...args: any[]) => void;

type ListenersMap = Record<string, EventListener[]>;

/**
 * A simple event emitter class for managing event listeners and emitting events.
 */
export default class EventEmitter {
  private listeners: ListenersMap;

  constructor() {
    this.listeners = {};
  }

  /**
   * Emit an event to all registered listeners.
   * @param event - The event name to emit
   * @param args - Arguments to pass to the event listeners
   */
  emit(event: string, ...args: any[]): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => {
        listener(...args);
      });
    }
  }

  /**
   * Register an event listener for a specific event.
   * @param event - The event name to listen to
   * @param listener - The callback function to invoke when the event is emitted
   */
  on(event: string, listener: EventListener): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  /**
   * Remove an event listener for a specific event.
   * @param event - The event name
   * @param listener - The callback function to remove
   */
  off(event: string, listener: EventListener): void {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(
        (registeredListener) => registeredListener !== listener
      );
    }
  }
}