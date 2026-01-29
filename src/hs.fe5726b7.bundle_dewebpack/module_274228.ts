const moduleMap: Record<string, number> = {
  "./logcollector.event.ts": 572236,
  "./save.event.ts": 524572
};

function requireModule(modulePath: string): number {
  const moduleId = resolveModule(modulePath);
  return moduleId;
}

function resolveModule(modulePath: string): number {
  if (!(modulePath in moduleMap)) {
    const error = new Error(`Cannot find module '${modulePath}'`) as NodeJS.ErrnoException;
    error.code = "MODULE_NOT_FOUND";
    throw error;
  }
  return moduleMap[modulePath];
}

export function getModuleKeys(): string[] {
  return Object.keys(moduleMap);
}

export function resolve(modulePath: string): number {
  return resolveModule(modulePath);
}

export { requireModule as default };