/**
 * CSS module exports for teaching select dropdown component
 * Module ID: 403630
 * 
 * This module contains styles for a custom teaching select dropdown with support for
 * light and dark themes. It extends Ant Design's Select component with custom styling.
 */

/**
 * CSS loader module interface
 */
interface CSSModule {
  /** Module identifier */
  id: string | number;
  /** CSS content and source map flag */
  push: (content: [string | number, string]) => void;
}

/**
 * CSS loader factory function type
 * @param sourceMap - Whether to include source maps
 * @returns CSS module instance
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSModule;

/**
 * Module exports function signature
 * @param exports - Module exports object
 * @param module - Module metadata
 * @param require - Module require function
 */
declare function moduleExports(
  exports: Record<string, unknown>,
  module: { id: string | number; exports: unknown },
  require: (moduleId: number) => CSSLoaderFactory
): void;

/**
 * Teaching select dropdown CSS styles
 * 
 * Provides custom styling for:
 * - Base dropdown container with rounded corners
 * - Option items with custom fonts
 * - Custom scrollbar styling
 * - Selected state styling
 * - Light theme variant (.teaching-light)
 * - Dark theme variant (.teaching-black)
 * 
 * @remarks
 * This module injects CSS for the `.teaching-select-dropdown` component
 * with theme-specific overrides for Ant Design Select component.
 */
export default moduleExports;

/**
 * CSS class names exported by this module
 */
export interface TeachingSelectDropdownStyles {
  /** Base dropdown container class */
  'teaching-select-dropdown': string;
  /** Light theme variant */
  'teaching-light': string;
  /** Dark theme variant */
  'teaching-black': string;
}