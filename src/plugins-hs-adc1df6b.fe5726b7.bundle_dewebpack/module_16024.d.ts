/**
 * CSS Module Type Definitions
 * 
 * This module exports CSS styles for privacy and share components,
 * including header privacy controls, public buttons, radio items, and loading states.
 */

/**
 * CSS module loader function type
 * Represents a webpack css-loader module that processes CSS content
 * 
 * @param useSourceMap - Whether to include source maps in the CSS output
 * @returns A function that can be called to register the CSS module
 */
type CSSLoaderFunction = (useSourceMap: boolean) => {
  push: (entry: [string, string]) => void;
};

/**
 * CSS Module Export Interface
 * Defines the structure of a CSS module with its identifier and content
 */
interface CSSModuleExport {
  /** Unique identifier for this CSS module */
  id: string;
  
  /** Raw CSS content as a string */
  content: string;
}

/**
 * Module Factory Parameters
 * Standard webpack module factory function signature
 */
interface ModuleFactoryParams {
  /** Module exports object */
  exports: CSSModuleExport;
  
  /** Require function for loading dependencies */
  require: (moduleId: number) => CSSLoaderFunction;
  
  /** Module metadata */
  module: {
    id: string;
    exports: CSSModuleExport;
  };
}

/**
 * CSS Styles for Privacy and Share Components
 * 
 * This declaration file represents a CSS module containing styles for:
 * - Privacy header controls (.hs-privacy, .pageHeader .hs-privacy)
 * - Public share buttons (.public-buttons, .public-button)
 * - Privacy checkbox items (.privacy-checkbox-item)
 * - Share loading states (.share-loading-content, .share-loading-modal)
 * - Dark theme variants (.darkTheme)
 * - Animations (blink, rotateit)
 * 
 * @remarks
 * The CSS includes responsive layouts, hover states, loading animations,
 * and support for both light and dark themes.
 */
declare const cssModule: CSSModuleExport;

export default cssModule;

/**
 * CSS Class Names
 * Type-safe class name constants for the privacy component styles
 */
export interface PrivacyClassNames {
  /** Main privacy container class */
  readonly 'hs-privacy': string;
  
  /** Privacy menu wrapper */
  readonly privacy: string;
  
  /** Privacy menu item */
  readonly menu: string;
  
  /** Privacy dropdown menus container */
  readonly menus: string;
  
  /** Public buttons container */
  readonly 'public-buttons': string;
  
  /** Individual public button */
  readonly 'public-button': string;
  
  /** Privacy checkbox item */
  readonly 'privacy-checkbox-item': string;
  
  /** Share loading content */
  readonly 'share-loading-content': string;
  
  /** Share viewer container */
  readonly 'share-viewer': string;
  
  /** Dark theme variant */
  readonly darkTheme: string;
  
  /** Hover menu state */
  readonly hoverMenu: string;
  
  /** Disabled state */
  readonly disabled: string;
  
  /** Blinking animation element */
  readonly shanshuo: string;
}

/**
 * Theme Mode
 * Supported theme variants for the privacy component
 */
export type ThemeMode = 'light' | 'dark';

/**
 * Privacy Level Options
 * Available privacy settings for shared content
 */
export type PrivacyLevel = 'private' | 'public' | 'community';