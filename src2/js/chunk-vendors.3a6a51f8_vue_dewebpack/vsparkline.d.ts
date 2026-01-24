/**
 * VSparkline Component Module
 * 
 * This module exports the VSparkline component, a sparkline chart visualization component.
 * Sparklines are small, simple charts typically used to show trends in inline contexts.
 * 
 * @module VSparkline
 * @see ./VSparkline.ts for component implementation
 */

/**
 * VSparkline component interface
 * 
 * The main VSparkline component used for rendering sparkline charts.
 * Sparklines are compact line charts designed to be embedded in text or small UI areas.
 * 
 * @public
 */
export interface VSparkline {
  // Component implementation details would be defined in VSparkline.ts
  // This interface would typically extend Vue component properties
}

/**
 * Named export of the VSparkline component
 * 
 * @public
 * @type {VSparkline}
 */
export declare const VSparkline: VSparkline;

/**
 * Default export of the VSparkline component
 * 
 * Provides the same VSparkline component as the default export for convenience.
 * This allows both named and default import styles:
 * - `import { VSparkline } from './index'`
 * - `import VSparkline from './index'`
 * 
 * @public
 * @type {VSparkline}
 */
declare const _default: VSparkline;
export default _default;