const moduleMap: Record<string, number> = {
  "./brick_wall_hover_pattern.svg": 726434,
  "./brick_wall_loadbearing_pattern.svg": 341014,
  "./brick_wall_moving_pattern.svg": 508660,
  "./brick_wall_pattern.svg": 33561,
  "./brick_wall_selected_pattern.svg": 60981,
  "./concrete_hover_pattern.svg": 27585,
  "./concrete_loadbearing_pattern.svg": 893661,
  "./concrete_moving_pattern.svg": 870149,
  "./concrete_pattern.svg": 51682,
  "./concrete_selected_pattern.svg": 236564,
  "./gypsum_wall_hover_pattern.svg": 458544,
  "./gypsum_wall_loadbearing_pattern.svg": 530524,
  "./gypsum_wall_moving_pattern.svg": 47490,
  "./gypsum_wall_pattern.svg": 314287,
  "./gypsum_wall_selected_pattern.svg": 563731
};

/**
 * Resolves a module path to its module ID
 * @param modulePath - The relative path to the SVG module
 * @returns The resolved module ID
 * @throws Error if the module cannot be found
 */
function resolveModule(modulePath: string): number {
  if (!(modulePath in moduleMap)) {
    const error = new Error(`Cannot find module '${modulePath}'`) as NodeJS.ErrnoException;
    error.code = "MODULE_NOT_FOUND";
    throw error;
  }
  return moduleMap[modulePath];
}

/**
 * Gets all available module paths
 * @returns Array of module paths
 */
export function getModuleKeys(): string[] {
  return Object.keys(moduleMap);
}

/**
 * Resolves and requires a module by its path
 * @param modulePath - The relative path to the SVG module
 * @returns The required module
 */
export function requireModule(modulePath: string): unknown {
  const moduleId = resolveModule(modulePath);
  return require(moduleId.toString());
}

export { resolveModule };