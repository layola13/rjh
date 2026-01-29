interface Widget {
  plugins: Record<string, Array<[string, (...args: unknown[]) => void]>>;
  element: JQuery | HTMLElement[];
  options: Record<string, unknown>;
}

function invokePluginCallbacks(
  widget: Widget,
  pluginName: string,
  args: unknown[]
): void {
  const pluginCallbacks = widget.plugins[pluginName];
  
  if (!pluginCallbacks) {
    return;
  }

  const element = widget.element[0];
  const hasValidParent = element?.parentNode && element.parentNode.nodeType !== 11;
  
  if (!hasValidParent) {
    return;
  }

  for (let i = 0; i < pluginCallbacks.length; i++) {
    const [optionKey, callback] = pluginCallbacks[i];
    
    if (widget.options[optionKey]) {
      callback.apply(widget.element, args);
    }
  }
}