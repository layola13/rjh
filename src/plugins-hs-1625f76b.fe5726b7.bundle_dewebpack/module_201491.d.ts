/**
 * CSS module export for make-custom-page component styles
 * @module module_201491
 * @originalId 201491
 */

/**
 * Webpack CSS loader module function signature
 * @param exports - Module exports object
 * @param cssLoaderApi - CSS loader API from webpack
 * @param pushMethod - Method to push CSS content to the loader
 */
declare module 'module_201491' {
  /**
   * CSS content string for the make-custom-page component
   * Contains styles for:
   * - Main container (.make-custom-page): 280px width panel with white background
   * - Scroll area (.scroll-area): Calculated height container
   * - House type panel (.house-type-panel): Margin spacing
   * - Edit model class (.edit-model-class): Disabled cursor state
   * - Custom image buttons (.custom-imagebutton): Icon and image sizing
   * - Original mold buttons (.originalmold-imagebutton): Image layout
   * - Component section (.component): Button grid layout
   * - Divider (.house-type-panel-divider): Section separator line
   */
  const cssContent: string;

  /**
   * Module ID used by webpack for chunk identification
   */
  const moduleId: string | number;

  /**
   * Exported CSS module array format: [moduleId, cssContent, sourceMap?]
   * Format used by css-loader for webpack integration
   */
  const cssModule: [string | number, string, boolean?];

  export default cssModule;
  export { cssContent, moduleId };
}

/**
 * CSS class names available in this module
 */
declare interface MakeCustomPageStyles {
  /** Main container: 280px × 100%, white background, 10px border-radius */
  'make-custom-page': string;
  
  /** Scroll container: height calculated as 100% - 50px */
  'scroll-area': string;
  
  /** House type panel: 12px vertical margin */
  'house-type-panel': string;
  
  /** Panel content container */
  'panelContent': string;
  
  /** Edit model class: cursor not-allowed (disabled state) */
  'edit-model-class': string;
  
  /** Custom image button container */
  'custom-imagebutton': string;
  
  /** New icon indicator: 30px × 12px with 5px top margin */
  'catalog-image-new-icon': string;
  
  /** Original mold image button */
  'originalmold-imagebutton': string;
  
  /** Text description label: 8px top margin */
  'text-description': string;
  
  /** Component container: 16px left padding */
  'component': string;
  
  /** Catalog image button: 73px × 93px with 12px padding, 8px hover border-radius */
  'catalog-image-button': string;
  
  /** Section divider: 244px width, 1px solid border #eaecf1 */
  'house-type-panel-divider': string;
}

export type { MakeCustomPageStyles };