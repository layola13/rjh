/**
 * Select component module with Option and OptGroup sub-components.
 * Provides a dropdown selection interface with support for option groups.
 * @module Select
 */

import type { default as SelectComponent } from './Select';
import type { default as OptionComponent } from './Option';
import type { default as OptGroupComponent } from './OptGroup';

/**
 * Option component for individual selectable items within a Select.
 * @public
 */
export declare const Option: typeof OptionComponent;

/**
 * OptGroup component for grouping related options within a Select.
 * @public
 */
export declare const OptGroup: typeof OptGroupComponent;

/**
 * Main Select component for dropdown selection interface.
 * @public
 * @default
 */
declare const Select: typeof SelectComponent;

export default Select;