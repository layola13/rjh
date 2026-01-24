/**
 * CSS module definition for shop task component styles
 * @module ShopTaskStyles
 */

/**
 * Webpack CSS loader module function signature
 * @param exports - The module exports object
 * @param module - The webpack module object
 * @param require - The webpack require function
 */
declare module 'shop-task-styles' {
  /**
   * Module exports interface containing CSS content
   */
  interface CSSModuleExports {
    /** Module identifier */
    id: string | number;
    
    /** CSS content as string */
    toString(): string;
    
    /** CSS class names mapping */
    locals?: Record<string, string>;
  }

  /**
   * CSS loader function type
   * @param sourceMap - Whether to include source maps (false for production)
   * @returns CSS module with push method for adding styles
   */
  type CSSLoaderFunction = (sourceMap: boolean) => {
    /**
     * Pushes CSS content to the module
     * @param entry - Tuple containing module ID and CSS string
     */
    push(entry: [string | number, string]): void;
  };

  /**
   * Webpack module function signature
   * @param exports - Module exports object
   * @param module - Current module metadata
   * @param require - Webpack require function for dependencies
   */
  type WebpackModuleFunction = (
    exports: CSSModuleExports,
    module: { id: string | number; exports: CSSModuleExports },
    require: (moduleId: number) => CSSLoaderFunction
  ) => void;

  /**
   * Shop task component CSS styles
   * 
   * Includes styles for:
   * - .shop-task-wrapper: Main container (470x420px with auto overflow)
   * - .shop-task: Inner wrapper (440px width)
   * - .shop-task-item: Individual task items (flex layout with 12px bottom margin)
   * - .shop-task-item-image: Task thumbnail (70x70px rounded square)
   * - .shop-task-item-select: Selection area (350px width)
   */
  const styles: CSSModuleExports;
  
  export default styles;
}

/**
 * CSS class names exported by this module
 */
declare module 'shop-task-styles.css' {
  /** Main wrapper container for shop tasks */
  export const shopTaskWrapper: string;
  
  /** Inner container for task list */
  export const shopTask: string;
  
  /** Individual task item container */
  export const shopTaskItem: string;
  
  /** Task item thumbnail image */
  export const shopTaskItemImage: string;
  
  /** Task item selection component */
  export const shopTaskItemSelect: string;
}