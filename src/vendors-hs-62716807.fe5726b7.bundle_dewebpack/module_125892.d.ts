/**
 * Type definitions for module_125892
 * 
 * This module re-exports the default export from module 478836.
 * The actual implementation is wrapped and processed through a module loader.
 */

/**
 * Default export from the underlying module (478836).
 * 
 * Note: The exact type of 'a' cannot be determined from the compressed code alone.
 * It could be a class, function, object, or any other exportable value.
 * 
 * @remarks
 * This is a re-export pattern commonly used for barrel exports or compatibility layers.
 */
declare const _default: unknown;

export default _default;

/**
 * Alternative if you know the actual type being exported:
 * 
 * If 'a' is a React component:
 * import type { ComponentType } from 'react';
 * declare const _default: ComponentType<any>;
 * 
 * If 'a' is a class:
 * declare class DefaultExport {
 *   // class members
 * }
 * export default DefaultExport;
 * 
 * If 'a' is a function:
 * declare function defaultExport(...args: unknown[]): unknown;
 * export default defaultExport;
 * 
 * If 'a' is a plain object:
 * interface DefaultExport {
 *   // object properties
 * }
 * declare const _default: DefaultExport;
 */