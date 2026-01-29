export interface ModuleMap {
  "./actionType.ts": number;
  "./collecter.ts": number;
  "./currentTime.ts": number;
  "./pageId.ts": number;
  "./platformInfo.ts": number;
  "./traceId.ts": number;
  "./userInfo.ts": number;
}

const MODULE_MAP: ModuleMap = {
  "./actionType.ts": 911,
  "./collecter.ts": 431,
  "./currentTime.ts": 355,
  "./pageId.ts": 260,
  "./platformInfo.ts": 187,
  "./traceId.ts": 60,
  "./userInfo.ts": 867
};

function resolveModuleId(modulePath: string): number {
  if (!Object.prototype.hasOwnProperty.call(MODULE_MAP, modulePath)) {
    const error = new Error(`Cannot find module '${modulePath}'`) as NodeJS.ErrnoException;
    error.code = "MODULE_NOT_FOUND";
    throw error;
  }
  return MODULE_MAP[modulePath as keyof ModuleMap];
}

export function requireModule(modulePath: string): number {
  const moduleId = resolveModuleId(modulePath);
  return moduleId;
}

export function getModuleKeys(): string[] {
  return Object.keys(MODULE_MAP);
}

export { resolveModuleId };