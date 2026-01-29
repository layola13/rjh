const moduleMap: Record<string, number> = {
  "./autorecommend.event.ts": 537210,
  "./camera.event.ts": 740734,
  "./category.event.ts": 873797,
  "./command.event.ts": 109788,
  "./environment/environment.event.ts": 316766,
  "./guide.event.ts": 243629,
  "./hotkey.event.ts": 635483,
  "./leftmenu.event.ts": 140655,
  "./markingsystem.event.ts": 567683,
  "./opendesign.event.ts": 474395,
  "./recommendaccessories.event.ts": 966229,
  "./request.event.ts": 333304,
  "./save.event.ts": 975128,
  "./templatedesign.event.ts": 743013,
  "./undoredo.event.ts": 7223,
  "./usersetting.event.ts": 409556,
  "./viewswitch.event.ts": 600740
};

/**
 * Resolves a module path to its numeric ID
 * @param modulePath - The relative path to the module
 * @returns The numeric module ID
 * @throws Error if module path is not found
 */
function resolveModuleId(modulePath: string): number {
  if (!moduleMap.hasOwnProperty(modulePath)) {
    const error = new Error(`Cannot find module '${modulePath}'`) as Error & { code?: string };
    error.code = "MODULE_NOT_FOUND";
    throw error;
  }
  return moduleMap[modulePath];
}

/**
 * Gets all available module paths
 * @returns Array of module path strings
 */
export function getModuleKeys(): string[] {
  return Object.keys(moduleMap);
}

export { resolveModuleId, moduleMap };