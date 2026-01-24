/**
 * Re-export module from internal dependency 422427
 * This module acts as a facade/barrel export pattern
 */

import type DefaultExport from './module_422427';

/**
 * Default export re-exported from module 422427
 */
export default DefaultExport;

/**
 * CommonJS compatibility export
 * Ensures module.exports === exports.default for legacy requires
 */
export = DefaultExport;