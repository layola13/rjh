/**
 * Plugin method caller for widget/component systems.
 * Executes registered plugin callbacks if conditions are met.
 * 
 * @module PluginCaller
 */

/**
 * Represents a widget or component instance with plugins and options
 */
interface WidgetInstance {
  /** Collection of registered plugins organized by lifecycle hooks */
  plugins: PluginRegistry;
  
  /** DOM element wrapper (jQuery-like) */
  element: ElementWrapper;
  
  /** Configuration options for the widget */
  options: WidgetOptions;
}

/**
 * Registry mapping plugin hook names to their handlers
 */
interface PluginRegistry {
  [hookName: string]: PluginEntry[];
}

/**
 * Single plugin entry containing option key and callback
 */
type PluginEntry = [optionKey: string, callback: PluginCallback];

/**
 * Plugin callback function that operates on elements
 */
type PluginCallback = (this: JQuery | HTMLElement[], ...args: unknown[]) => void;

/**
 * jQuery-like element wrapper
 */
interface ElementWrapper {
  /** Index accessor for raw DOM elements */
  [index: number]: HTMLElement;
  
  /** Length of element collection */
  length?: number;
}

/**
 * Widget configuration options
 */
interface WidgetOptions {
  [optionName: string]: unknown;
}

/**
 * Executes all registered plugin callbacks for a specific hook.
 * Only runs if the widget element has a valid parent node (not a document fragment).
 * 
 * @param widgetInstance - The widget instance containing plugins and element
 * @param hookName - Name of the plugin hook to invoke (e.g., 'create', 'destroy')
 * @param args - Arguments to pass to each plugin callback
 * 
 * @remarks
 * - Skips execution if the element is detached or in a document fragment (nodeType === 11)
 * - Only executes plugins whose corresponding option key is truthy
 * - Callbacks are applied with the widget's element as context
 */
declare function callPluginHook(
  widgetInstance: WidgetInstance,
  hookName: string,
  args: unknown[]
): void;