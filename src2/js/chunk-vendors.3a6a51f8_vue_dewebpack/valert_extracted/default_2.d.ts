/**
 * Removes duplicate model listeners from a Vue component's event handlers.
 * 
 * This utility function prevents duplicate input event listeners when using v-model,
 * ensuring the model's callback is not registered multiple times.
 * 
 * @param options - Vue component options object containing model and event listener configurations
 */
export default function dedupeModelListeners(options: ComponentOptions): void {
  // Check if component has model binding and input event listeners
  if (options.model && options.on && options.on.input) {
    // Handle array of input listeners
    if (Array.isArray(options.on.input)) {
      const callbackIndex = options.on.input.indexOf(options.model.callback);
      
      // Remove the model callback if found in the array
      if (callbackIndex >= 0) {
        options.on.input.splice(callbackIndex, 1);
      }
    } else {
      // Remove single input listener
      delete options.on.input;
    }
  }
}

/**
 * Vue component options structure
 */
interface ComponentOptions {
  /** Model configuration for two-way data binding */
  model?: ModelConfig;
  
  /** Event listeners attached to the component */
  on?: EventListeners;
}

/**
 * Model configuration for v-model directive
 */
interface ModelConfig {
  /** Callback function invoked when model value changes */
  callback: Function;
  
  /** Property name to bind (e.g., 'value', 'checked') */
  prop?: string;
  
  /** Event name to listen to (e.g., 'input', 'change') */
  event?: string;
}

/**
 * Event listeners map
 */
interface EventListeners {
  /** Input event handler(s) - can be a single function or array of functions */
  input?: Function | Function[];
  
  /** Other event handlers */
  [eventName: string]: Function | Function[] | undefined;
}