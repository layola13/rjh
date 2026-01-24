/**
 * Module: module_call
 * Original ID: call
 * 
 * Invokes registered plugin callbacks for a widget instance.
 * Iterates through all plugins associated with the specified type and executes
 * their callbacks if the corresponding option is enabled and the element is attached to the DOM.
 */

/**
 * Represents a plugin callback entry.
 * @template TElement - The type of DOM element the plugin operates on
 */
interface PluginEntry<TElement extends Element = Element> {
  /** The name of the option that controls whether this plugin is enabled */
  0: string;
  /** The callback function to invoke when the plugin is active */
  1: (this: JQuery<TElement>, ...args: unknown[]) => void;
}

/**
 * Represents a widget instance with plugin support.
 * @template TElement - The type of DOM element
 * @template TOptions - The type of widget options object
 */
interface WidgetInstance<TElement extends Element = Element, TOptions extends Record<string, unknown> = Record<string, unknown>> {
  /** jQuery-wrapped DOM element */
  element: JQuery<TElement>;
  /** Widget configuration options */
  options: TOptions;
  /** Registry of plugin callbacks indexed by plugin type name */
  plugins: Record<string, PluginEntry<TElement>[]>;
}

/**
 * Calls all registered plugin callbacks for a specific plugin type.
 * 
 * @param widgetInstance - The widget instance containing plugin registry and options
 * @param pluginType - The type/name of the plugin to invoke
 * @param args - Arguments to pass to each plugin callback
 * 
 * @remarks
 * - Only executes plugins whose corresponding option is truthy in `widgetInstance.options`
 * - Skips execution if the element is not attached to the DOM (parentNode is null)
 * - Skips execution if the element is in a DocumentFragment (nodeType === 11)
 * - Callbacks are invoked with the widget's element as `this` context
 */
declare function callPlugins<TElement extends Element = Element>(
  widgetInstance: WidgetInstance<TElement>,
  pluginType: string,
  args: unknown[]
): void;