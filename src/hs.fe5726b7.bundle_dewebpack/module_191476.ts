const moduleMap: Record<string, number> = {
  "./canvas.event.ts": 180261,
  "./command/command.event.ts": 47918,
  "./usertracklogger.event.ts": 717811
};

function requireModule(modulePath: string): number {
  const moduleId = resolveModuleId(modulePath);
  return moduleId;
}

function resolveModuleId(modulePath: string): number {
  if (!(modulePath in moduleMap)) {
    const error = new Error(`Cannot find module '${modulePath}'`) as NodeJS.ErrnoException;
    error.code = "MODULE_NOT_FOUND";
    throw error;
  }
  return moduleMap[modulePath];
}

requireModule.keys = function(): string[] {
  return Object.keys(moduleMap);
};

requireModule.resolve = resolveModuleId;

export default requireModule;