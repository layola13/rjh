/**
 * CSS Module Exports
 * 
 * This module exports CSS styles for a guide popup component with mask overlay.
 * The styles define a modal dialog with cards for user onboarding or feature introduction.
 */

/**
 * CSS module loader function signature
 * @param exports - The module exports object
 * @param require - The module require function
 * @param moduleLoader - The webpack module loader utility function
 */
declare module 'module_502156' {
  /**
   * CSS class names for the guide popup component
   */
  export interface GuidePopupStyles {
    /** Main mask overlay covering the entire viewport */
    'guide-popup-mask': string;
    
    /** Hidden state modifier for the mask */
    hidden: string;
    
    /** Main popup container centered on screen */
    'guide-popup-container': string;
    
    /** Decorative background image at the top of the popup */
    'top-bg': string;
    
    /** Container for text content (title and description) */
    'words-container': string;
    
    /** Congratulatory message text style */
    congratul: string;
    
    /** Description text style */
    desc: string;
    
    /** Wrapper for interactive card elements */
    'card-wrapper': string;
    
    /** Individual card component style */
    card: string;
    
    /** Modifier for the second card with left margin */
    second: string;
    
    /** Card image/thumbnail area */
    'card-img': string;
    
    /** Home card background image variant */
    home: string;
    
    /** Design card background image variant */
    design: string;
    
    /** Descriptive text within cards */
    'desc-words': string;
    
    /** Text content wrapper inside desc-words */
    words: string;
    
    /** Icon font view element */
    iconfontview: string;
    
    /** Hover state for icon */
    hover: string;
    
    /** Close button positioned in top-right corner */
    'guanbi-in-guide-popup': string;
  }

  /**
   * CSS Content Array
   * Format: [moduleId, cssContent, sourceMap?]
   */
  export type CSSModuleExport = [string, string, string?];

  const styles: GuidePopupStyles;
  export default styles;
}

/**
 * Module Dependencies Type Definitions
 */
declare module '992716' {
  /**
   * Asset URL resolver utility
   * Processes asset imports and returns the final URL path
   * @param assetModule - The imported asset module
   * @returns Resolved asset URL string
   */
  export default function resolveAssetUrl(assetModule: unknown): string;
}

declare module '986380' {
  /**
   * CSS loader factory function
   * @param sourceMaps - Whether to include source maps in the output
   * @returns CSS loader instance with push method
   */
  export default function cssLoader(sourceMaps: boolean): {
    /**
     * Adds CSS module content to the bundle
     * @param content - Tuple containing [moduleId, cssString, sourceMap?]
     */
    push(content: [string, string, string?]): void;
  };
}

declare module '561680' {
  /**
   * Top background decorative image asset
   * Used as the header background in the guide popup
   */
  const asset: string;
  export default asset;
}

declare module '203864' {
  /**
   * Home card thumbnail image asset
   * Represents the home/dashboard navigation option
   */
  const asset: string;
  export default asset;
}

declare module '441187' {
  /**
   * Design card thumbnail image asset
   * Represents the design tool navigation option
   */
  const asset: string;
  export default asset;
}