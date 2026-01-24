/**
 * Re-export module that combines a default export with a named Group export.
 * This module serves as the main entry point, aggregating exports from two submodules.
 */

import type DefaultExport from './module_786260';
import type GroupExport from './module_787170';

/**
 * Main export interface that extends the default export and includes the Group property.
 */
export interface MainExport extends DefaultExport {
  /**
   * Group component or utility exported as a static property.
   */
  Group: typeof GroupExport;
}

/**
 * Named export for the Group component/utility.
 */
export { GroupExport as Group };

/**
 * Default export combining the main functionality with the Group property.
 */
declare const mainExport: MainExport;
export default mainExport;