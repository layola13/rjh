/**
 * CSS Module exports for special topic container component
 * This module contains styles for the special topic landing page and model selection UI
 */

/**
 * Represents a CSS module export with stylesheet content
 */
interface CSSModuleExport {
  /** Module identifier */
  id: string;
  
  /** CSS content as string */
  content: string;
}

/**
 * CSS loader function that processes and returns stylesheet content
 * @param sourceMap - Whether to include source maps in the output
 * @returns Array containing module ID and CSS content
 */
declare function cssLoader(sourceMap: boolean): CSSModuleExport[];

/**
 * Asset URL resolver for webpack bundled resources
 * @param assetPath - Path to the asset resource
 * @returns Resolved URL string for the asset
 */
declare function assetUrlResolver(assetPath: string): string;

/**
 * Module dependencies
 */
declare const dependencies: {
  /** Asset URL resolver utility (module 992716) */
  assetUrlResolver: typeof assetUrlResolver;
  
  /** CSS loader utility (module 986380) */
  cssLoader: typeof cssLoader;
  
  /** High quality pool background image asset (module 227975) */
  highQualityPoolImage: string;
  
  /** High commission pool background image asset (module 803687) */
  highCommissionPoolImage: string;
  
  /** High commission pool TPZZ variant background image asset (module 554176) */
  highCommissionPoolTpzzImage: string;
};

/**
 * CSS class names exported by this module
 * These classes style the special topic container component
 */
export interface SpecialTopicStyles {
  /** Root container for special topic feature */
  'special-topic-container': string;
  
  /** Landing page layout container */
  'special-topic-landing-page': string;
  
  /** Header section with search functionality */
  'special-topic-header': string;
  
  /** Search box component styling */
  'hsc-search-box': string;
  
  /** Search icon positioning */
  'special-search-icon': string;
  
  /** Scrollable model list area */
  'model-area': string;
  
  /** Model pool grouping container */
  'model-pool-area': string;
  
  /** Section title styling */
  'title': string;
  
  /** Individual model pool card */
  'model-pool': string;
  
  /** High quality model pool variant */
  'high-quality-pool': string;
  
  /** High commission model pool variant */
  'high-commission-pool': string;
  
  /** High commission TPZZ model pool variant */
  'high-commission-pool_tpzz': string;
  
  /** Hidden state for high commission pool */
  'high-commission-pool-hide': string;
  
  /** List page container for special topics */
  'special-topic-list-page': string;
  
  /** Styler link component */
  'special-topic-styler-link': string;
  
  /** Badge icon styling */
  'icon-badge-symbol': string;
  'icon-badge-symbol2': string;
  
  /** Special topic content area */
  'special-topic-area': string;
  
  /** Loading indicator wrapper */
  'loading-wrapper': string;
  
  /** Secondary tabs navigation */
  'special-second-tabs': string;
  
  /** Special topic list container */
  'special-topic-list': string;
  
  /** No results state container */
  'no-result-area': string;
  
  /** No data illustration image */
  'no-data-img': string;
  'no-data-img-recommend': string;
  
  /** No data message text */
  'no-data-tip': string;
  'no-data-tip-recommend': string;
  
  /** Image cover for model items */
  'img-cover': string;
  
  /** Favorite icon overlay */
  'fav-icon': string;
  
  /** Link to web model special topic */
  'link-to-model-special-topic': string;
  'link-to-web': string;
  
  /** No relative models container */
  'no-relative-container': string;
  'no-relative-model': string;
  
  /** Model detail page container */
  'special-topic-model-page': string;
  
  /** Model page header */
  'special-topic-model-header': string;
  'special-topic-model-first-row': string;
  'special-topic-model-back': string;
  'special-topic-model-fav': string;
  
  /** Banner wrapper and image */
  'banner-wrapper': string;
  'banner': string;
  
  /** Filters area */
  'filters-area': string;
  
  /** Model list container */
  'model-list': string;
  
  /** Favorite popup */
  'specical-topic-fav-pop': string;
  
  /** Favorite wrapper with icon */
  'special-topic-list-fav-wrapper': string;
  'special-topic-list-fav-icon': string;
  
  /** Model charge icon */
  'icon-model-charge': string;
  
  /** New badge */
  'new': string;
  
  /** Styler icon */
  'icon-styler': string;
}

/**
 * Export the processed CSS module
 * This pushes the compiled styles into the module exports array
 */
export default SpecialTopicStyles;