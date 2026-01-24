/**
 * Webpack CSS module loader type definition
 * Module: module_928554
 * Original ID: 928554
 */

/**
 * CSS module export function signature
 * @param exports - The module exports object to be populated
 * @param cssLoaderFactory - Factory function from webpack css-loader (module 986380)
 * @param moduleContext - Webpack module context/require function
 */
declare module 'module_928554' {
  /**
   * CSS content for wishlist creation popup component
   * Contains styles for:
   * - .createnewwishlist: Main container for wishlist popup
   * - .diy-popupwindows: Popup window container (611px height)
   * - .closeBtn: Close button with hover effects
   * - .windowContents: Main content area with light gray background
   * - .contentsWrapper: Content wrapper with padding
   * - input: Styled input fields (86% width, 30px height)
   * - .footerbuttons: Hidden footer button container
   * - .diy-files-uploader-container-mask: Full-screen overlay mask
   */
  interface CSSModule {
    /** The unique module identifier */
    id: string | number;
    
    /** The CSS content as string */
    toString(): string;
  }

  /**
   * CSS Loader factory function type
   * @param sourceMap - Whether to include source maps
   * @returns CSS module with push method
   */
  type CSSLoaderFactory = (sourceMap: boolean) => {
    /**
     * Push CSS content to the module
     * @param content - Tuple of [moduleId, cssString, sourceMap?]
     */
    push(content: [string | number, string, string?]): void;
  };

  /**
   * Module definition function
   * @param exports - Module exports object
   * @param cssLoaderFactory - CSS loader factory from module 986380
   * @param moduleContext - Webpack module context
   */
  function moduleDef(
    exports: { exports: CSSModule },
    cssLoaderFactory: CSSLoaderFactory,
    moduleContext: any
  ): void;

  export = moduleDef;
}

/**
 * Global CSS class names exported by this module
 */
declare global {
  /** Wishlist creation popup component styles */
  interface WishlistPopupStyles {
    /** Main container for create new wishlist popup */
    'createnewwishlist': string;
    
    /** Popup window container with fixed height */
    'diy-popupwindows': string;
    
    /** Close button wrapper */
    'closeBtn': string;
    
    /** Main window content area */
    'windowContents': string;
    
    /** Content wrapper with padding */
    'contentsWrapper': string;
    
    /** Footer buttons container (hidden by default) */
    'footerbuttons': string;
    
    /** Full-screen uploader overlay mask */
    'diy-files-uploader-container-mask': string;
  }
}