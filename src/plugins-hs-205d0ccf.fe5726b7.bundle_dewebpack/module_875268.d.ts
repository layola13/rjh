/**
 * CSS Module for Store Smart Layout Modal Component
 * Defines styles for a modal interface with layout generation, preview, and selection features
 */

/**
 * CSS module declaration for store-smart-layout-modal styles
 * This module exports CSS classes for a smart layout generation modal with the following features:
 * - Modal content wrapper with fixed dimensions (900x550px)
 * - Multiple view states: initial, generating, calculating, completed, and error
 * - Left panel with scrollable plan thumbnails and selection
 * - Right panel with preview area and progress indicators
 * - Bottom action buttons for regenerate and apply operations
 * - Animated loading states with shimmer effects
 * - Responsive hover states and transitions
 */
declare module '*.css' {
  const content: string;
  export default content;
}

/**
 * CSS module exports interface
 * Generated from webpack css-loader output
 */
export interface StoreSmartLayoutModalStyles {
  /** Root modal wrapper class */
  'store-smart-layout-modal': string;
  
  /** Modal content wrapper from homestyler-ui-components */
  'homestyler-ui-components': string;
  'homestyler-modal-content-wrapper': string;
  'homestyler-modal-content-wrapper-content': string;
  
  /** Outer container for modal layout */
  'homestyler-modal-outer': string;
  
  /** Top element container (60px height) */
  'homestyler-modal-top-element-container': string;
  
  /** Main modal content area */
  'homestyler-modal-content': string;
  
  /** Smart layout content states */
  'smart-layout-content': string;
  'initial': string;
  'generating': string;
  
  /** Preview area for layout display (515x310px max) */
  'preview-area': string;
  'preview-placeholder': string;
  'placeholder-text': string;
  
  /** Layout generation button section */
  'layout-button-section': string;
  'layout-button-container': string;
  'smart-layout-btn': string;
  'unable': string;
  'disabled-tooltip': string;
  
  /** Calculating state with progress indicator */
  'calculating': string;
  'calculating-container': string;
  'left-panel': string;
  'placeholder-list': string;
  'placeholder-item-large': string;
  'right-panel': string;
  'progress-section': string;
  'progress-section-timeout': string;
  'progress-section-title': string;
  'progress-text': string;
  'progress-percentage': string;
  'progress-subtitle': string;
  
  /** Error status state */
  'error-status': string;
  
  /** Completed state with plan selection */
  'completed': string;
  'completed-container': string;
  'scroll-area': string;
  'smart-scroll-content': string;
  'plans-list': string;
  'plan-item': string;
  'selected': string;
  'plan-thumbnail': string;
  'plan-info': string;
  'plan-name-container': string;
  'plan-name': string;
  'plan-description': string;
  'plan-rating': string;
  'rating-stars': string;
  'star': string;
  'filled': string;
  'preview-image': string;
  
  /** Bottom action buttons */
  'bottom-buttons': string;
  'regenerate-btn': string;
  'apply-btn': string;
  
  /** Hidden bottom container */
  'homestyler-modal-bottom-container': string;
}

/**
 * Webpack css-loader module export function type
 * @param insertStyles - Whether to insert styles into DOM (false for SSR)
 * @returns Array of [moduleId, cssContent, sourceMap?]
 */
export type CssLoaderExport = (insertStyles: boolean) => Array<[string, string, string?]>;

/**
 * Default export from css-loader webpack module
 * Pushes CSS content array with module ID and compiled styles
 */
declare const cssModule: CssLoaderExport;
export default cssModule;