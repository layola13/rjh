interface GlobalNamespace {
  [key: string]: unknown;
}

declare const globalThis: {
  [key: string]: GlobalNamespace | unknown;
};

/**
 * Builds a namespaced alias with prefix and suffix
 * @param namespace - The namespace identifier
 * @returns The prefixed and suffixed namespace string
 */
export function buildNameSpaceAlias(namespace: string): string {
  return `$__${namespace}__`;
}

/**
 * Exports a value to the global namespace
 * @param namespace - The namespace to export to
 * @param key - The property key
 * @param value - The value to export
 */
export function exportToGlobal(namespace: string, key: string, value: unknown): void {
  const aliasedNamespace = buildNameSpaceAlias(namespace);

  if (globalThis.hasOwnProperty(aliasedNamespace)) {
    const existingNamespace = globalThis[aliasedNamespace] as GlobalNamespace;
    
    if (existingNamespace.hasOwnProperty(key)) {
      console.warn(`重复导出覆盖: ${aliasedNamespace} ${key}`);
    }
    
    existingNamespace[key] = value;
  } else {
    globalThis[aliasedNamespace] = {
      [key]: value
    };
  }
}

/**
 * Imports a value from the global namespace
 * @param namespace - The namespace to import from
 * @param key - The property key to retrieve
 * @returns The imported value or undefined if not found
 */
export function importFromGlobal(namespace: string, key: string): unknown | undefined {
  const aliasedNamespace = buildNameSpaceAlias(namespace);

  if (globalThis.hasOwnProperty(aliasedNamespace)) {
    const existingNamespace = globalThis[aliasedNamespace] as GlobalNamespace;
    
    if (existingNamespace.hasOwnProperty(key)) {
      return existingNamespace[key];
    }
  }

  return undefined;
}