/**
 * CSS Module Export Type Definition
 * Module: module_100106
 * Original ID: 100106
 * 
 * This module exports CSS styles for an action container component with flex layout,
 * item wrappers, VIP icons, and hover states. The styles are processed through a CSS loader.
 */

/**
 * CSS Module Loader Function Type
 * Represents the webpack css-loader module that processes CSS content
 */
type CSSLoaderModule = (sourceMap: boolean) => {
  push: (entry: [string, string, string?]) => void;
};

/**
 * CSS Style Content
 * Contains the processed CSS rules for the action container component
 */
interface CSSModuleContent {
  /** Module identifier */
  id: string;
  
  /** Raw CSS content as string */
  content: string;
}

/**
 * Webpack Module Exports Interface
 * Standard webpack module.exports structure
 */
interface ModuleExports {
  /** Module identifier */
  id: string;
  
  /** Exported CSS loader with push method */
  push: (entry: [string, string, string?]) => void;
}

/**
 * CSS Module Factory Function
 * 
 * @param exports - Module exports object to be populated
 * @param module - Module metadata and configuration
 * @param require - Webpack require function for loading dependencies
 * 
 * @remarks
 * This module exports CSS styles including:
 * - `.action_container`: Flex container with 200px height, flex-end alignment
 * - `.action_container .itemWrapper`: Relative positioned wrapper for action items
 * - `.action_container .itemWrapper .vipIcon`: Absolutely positioned VIP badge (23x18px)
 * - `.action_container .itemWrapper .action_item`: Circular action button (36px height, 18px border-radius)
 * - `.action_container .itemWrapper .action_item:hover`: Hover state with 0.8 opacity
 * - `.action_container .itemWrapper .action_item .action_item_icon`: Icon container (16px width)
 * - `.action_container .itemWrapper .unable`: Disabled state with 0.3 opacity
 * - `.containerTip.homestyler-ui-components.homestyler-popover-item .homestyler-popover-content`: Popover content with no padding
 */
declare function cssModuleFactory(
  exports: ModuleExports,
  module: { id: string; exports: ModuleExports },
  require: (moduleId: number) => CSSLoaderModule
): void;

export default cssModuleFactory;

/**
 * CSS Class Names exported by this module
 */
export interface ActionContainerStyles {
  /** Main container with flex layout and 200px height */
  action_container: string;
  
  /** Wrapper for individual action items with relative positioning */
  itemWrapper: string;
  
  /** VIP icon badge positioned absolutely at top-right */
  vipIcon: string;
  
  /** Action item button with circular design and hover effects */
  action_item: string;
  
  /** Icon container within action items */
  action_item_icon: string;
  
  /** Disabled/unable state for action items */
  unable: string;
  
  /** Container tip styling for homestyler popover components */
  containerTip: string;
}