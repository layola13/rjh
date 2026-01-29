export type ModuleId = 911 | 431 | 355 | 260 | 187 | 60 | 867;

export type ModulePath =
  | "./actionType.ts"
  | "./collecter.ts"
  | "./currentTime.ts"
  | "./pageId.ts"
  | "./platformInfo.ts"
  | "./traceId.ts"
  | "./userInfo.ts";

const MODULE_MAP: Record<ModulePath, ModuleId> = {
  "./actionType.ts": 911,
  "./collecter.ts": 431,
  "./currentTime.ts": 355,
  "./pageId.ts": 260,
  "./platformInfo.ts": 187,
  "./traceId.ts": 60,
  "./userInfo.ts": 867
};

function resolveModuleId(modulePath: ModulePath): ModuleId {
  if (!(modulePath in MODULE_MAP)) {
    const error = new Error(`Cannot find module '${modulePath}'`);
    (error as NodeJS.ErrnoException).code = "MODULE_NOT_FOUND";
    throw error;
  }
  return MODULE_MAP[modulePath];
}

export function requireModule(modulePath: ModulePath): ModuleId {
  const moduleId = resolveModuleId(modulePath);
  return moduleId;
}

export function getModuleKeys(): ModulePath[] {
  return Object.keys(MODULE_MAP) as ModulePath[];
}

export { resolveModuleId };