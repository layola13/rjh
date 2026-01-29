interface PluginHandler {
  apply(element: HTMLElement, args: unknown[]): void;
}

interface WidgetInstance {
  plugins: Record<string, Array<[string, PluginHandler]>>;
  element: JQuery | HTMLElement[];
  options: Record<string, unknown>;
}

const DOCUMENT_FRAGMENT_NODE_TYPE = 11;

function moduleCall(
  instance: WidgetInstance,
  pluginName: string,
  args: unknown[]
): void {
  const pluginHandlers = instance.plugins[pluginName];

  if (
    !pluginHandlers ||
    !instance.element[0].parentNode ||
    instance.element[0].parentNode.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE
  ) {
    return;
  }

  for (let index = 0; index < pluginHandlers.length; index++) {
    const [optionKey, handler] = pluginHandlers[index];
    
    if (instance.options[optionKey]) {
      handler.apply(instance.element, args);
    }
  }
}