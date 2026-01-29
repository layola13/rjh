const moduleMap: Record<string, number> = {
  "./livehint.inject.ts": 866752,
  "./logger.inject.ts": 593513
};

function resolveModuleId(modulePath: string): number {
  if (!(modulePath in moduleMap)) {
    const error = new Error(`Cannot find module '${modulePath}'`) as NodeJS.ErrnoException;
    error.code = "MODULE_NOT_FOUND";
    throw error;
  }
  return moduleMap[modulePath];
}

function requireModule(modulePath: string): unknown {
  const moduleId = resolveModuleId(modulePath);
  return require(moduleId.toString());
}

export function getModuleKeys(): string[] {
  return Object.keys(moduleMap);
}

export { requireModule, resolveModuleId };