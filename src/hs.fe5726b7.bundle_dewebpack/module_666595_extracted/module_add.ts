interface Plugin {
  [key: string]: unknown;
}

interface UIPrototype {
  plugins: Record<string, Array<[string, unknown]>>;
}

interface UIRegistry {
  [key: string]: {
    prototype: UIPrototype;
  };
}

interface GlobalRegistry {
  ui: UIRegistry;
}

declare const e: GlobalRegistry;

function moduleAdd(t: string, n: string, i: Plugin): void {
  const prototype = e.ui[t].prototype;
  
  for (const pluginKey in i) {
    prototype.plugins[pluginKey] = prototype.plugins[pluginKey] || [];
    prototype.plugins[pluginKey].push([n, i[pluginKey]]);
  }
}