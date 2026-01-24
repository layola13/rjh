/**
 * Removes duplicate model listeners from a Vue component options object.
 * 
 * This utility function prevents duplicate input event handlers when using v-model,
 * by removing the model callback from the input event listeners if present.
 * 
 * @param options - Vue component options object containing model and event listeners
 */
export default function dedupeModelListeners(options: ComponentOptions): void {
  if (!options.model || !options.on?.input) {
    return;
  }

  const inputListeners = options.on.input;

  if (Array.isArray(inputListeners)) {
    const callbackIndex = inputListeners.indexOf(options.model.callback);
    
    if (callbackIndex !== -1) {
      inputListeners.splice(callbackIndex, 1);
    }
  } else {
    delete options.on.input;
  }
}

/**
 * Vue component options structure
 */
interface ComponentOptions {
  /** v-model configuration */
  model?: ModelOptions;
  
  /** Event listeners map */
  on?: EventListeners;
}

/**
 * v-model options
 */
interface ModelOptions {
  /** The callback function for model updates */
  callback: Function;
  
  /** The prop name to bind (default: 'value') */
  prop?: string;
  
  /** The event name to listen (default: 'input') */
  event?: string;
}

/**
 * Event listeners map
 */
interface EventListeners {
  /** Input event listeners - can be a single function or array of functions */
  input?: Function | Function[];
  
  /** Other event listeners */
  [eventName: string]: Function | Function[] | undefined;
}