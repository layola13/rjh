type ModuleExports = any;

interface InteropNamespace {
  __proto__: null;
  default: any;
  [key: string]: any;
}

function interopRequireWildcard(
  moduleExports: ModuleExports,
  allowSyntheticDefaultImports?: boolean
): InteropNamespace | ModuleExports {
  const cache = allowSyntheticDefaultImports ? new WeakMap() : new WeakMap();
  const otherCache = allowSyntheticDefaultImports ? new WeakMap() : new WeakMap();

  if (allowSyntheticDefaultImports && moduleExports && moduleExports.__esModule) {
    return moduleExports;
  }

  if (
    moduleExports === null ||
    (typeof moduleExports !== 'object' && typeof moduleExports !== 'function')
  ) {
    return {
      __proto__: null,
      default: moduleExports
    } as InteropNamespace;
  }

  const targetCache = allowSyntheticDefaultImports ? otherCache : cache;

  if (targetCache.has(moduleExports)) {
    return targetCache.get(moduleExports);
  }

  const namespace: InteropNamespace = {
    __proto__: null,
    default: moduleExports
  };

  targetCache.set(moduleExports, namespace);

  for (const key in moduleExports) {
    if (key === 'default' || !Object.prototype.hasOwnProperty.call(moduleExports, key)) {
      continue;
    }

    const descriptor = Object.getOwnPropertyDescriptor(moduleExports, key);

    if (descriptor && (descriptor.get || descriptor.set)) {
      Object.defineProperty(namespace, key, descriptor);
    } else {
      namespace[key] = moduleExports[key];
    }
  }

  return namespace;
}

export { interopRequireWildcard };
export default interopRequireWildcard;