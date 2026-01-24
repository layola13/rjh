import type { Vue } from 'vue';

/**
 * Mouse event handler configuration
 */
interface MouseEventHandlerConfig {
  /** The native DOM event name to listen to */
  event: string;
  /** Whether to call preventDefault on the event */
  prevent?: boolean;
  /** Whether to call stopPropagation on the event */
  stop?: boolean;
  /** The return value for the handler */
  result?: boolean;
  /** Whether the listener should be passive */
  passive?: boolean;
  /** Whether the listener should only fire once */
  once?: boolean;
  /** Whether to use capture phase */
  capture?: boolean;
  /** The mouse button to filter for (0 = left, 1 = middle, 2 = right) */
  button?: number;
}

/**
 * Map of event names to their configurations
 */
interface MouseEventHandlersMap {
  [eventName: string]: MouseEventHandlerConfig;
}

/**
 * Event handler function that can be single or multiple
 */
type EventHandler = ((event: Event) => boolean | void) | Array<(event: Event) => boolean | void>;

/**
 * Map of processed event handlers ready for Vue
 */
interface ProcessedEventHandlers {
  [key: string]: EventHandler;
}

/**
 * Event transformer function that processes raw DOM events
 */
type EventTransformer<T = unknown> = (event: Event) => T;

/**
 * Mixin that provides mouse and touch event handling utilities for VCalendar components
 */
export default interface MouseMixin extends Vue {
  /**
   * Creates default mouse event handlers for a given suffix
   * 
   * @param suffix - String to append to event names (e.g., ':time', ':day')
   * @param transformer - Function to transform the raw event before emission
   * @returns Processed event handlers object
   */
  getDefaultMouseEventHandlers<T = unknown>(
    suffix: string,
    transformer: EventTransformer<T>
  ): ProcessedEventHandlers;

  /**
   * Processes mouse event handler configurations into Vue-compatible handlers
   * 
   * @param handlersMap - Map of event names to their configurations
   * @param transformer - Function to transform the raw event before emission
   * @returns Processed event handlers with Vue modifiers applied
   */
  getMouseEventHandlers<T = unknown>(
    handlersMap: MouseEventHandlersMap,
    transformer: EventTransformer<T>
  ): ProcessedEventHandlers;
}

declare const MouseMixin: {
  name: 'mouse';
  methods: {
    getDefaultMouseEventHandlers<T = unknown>(
      suffix: string,
      transformer: EventTransformer<T>
    ): ProcessedEventHandlers;
    
    getMouseEventHandlers<T = unknown>(
      handlersMap: MouseEventHandlersMap,
      transformer: EventTransformer<T>
    ): ProcessedEventHandlers;
  };
};