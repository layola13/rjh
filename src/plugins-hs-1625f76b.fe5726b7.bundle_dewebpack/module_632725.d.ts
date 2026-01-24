/**
 * CSS module for image category filter styling
 * Defines styles for selected image category items
 */

/**
 * CSS content exported as a string
 * Applies blue color to selected image category filter items
 */
declare const styles: string;

export default styles;

/**
 * Type definition for the CSS module structure
 * @remarks
 * This module exports a CSS string that will be injected into the application
 * The CSS targets `.image-category-filter-item .image-category-name.selected-item`
 * and applies a blue color to selected items
 */
export interface ImageCategoryFilterStyles {
  /**
   * Raw CSS content as a string
   * Contains styling rules for image category filter components
   */
  readonly content: string;
  
  /**
   * CSS class selector for the image category filter item container
   */
  readonly imageCategoryFilterItem: string;
  
  /**
   * CSS class selector for the image category name element
   */
  readonly imageCategoryName: string;
  
  /**
   * CSS class selector for selected item state
   */
  readonly selectedItem: string;
}