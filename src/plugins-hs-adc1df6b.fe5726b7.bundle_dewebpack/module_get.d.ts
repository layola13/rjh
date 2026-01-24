/**
 * Module: module_get
 * Retrieves the folder property from the default export
 * @returns The folder value from the default module export
 */
declare function moduleGet(): unknown;

export default moduleGet;

/**
 * If this is part of a larger module system, the types might be:
 */

/**
 * Represents a folder structure or path
 */
export type Folder = string | { path: string; name: string } | unknown;

/**
 * Default module structure
 */
export interface DefaultModule {
  folder: Folder;
}

/**
 * Module container
 */
export interface ModuleContainer {
  default: DefaultModule;
}

/**
 * Gets the folder from the default module
 * @returns The folder property value
 */
declare function get(): Folder;

export { get };