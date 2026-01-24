/**
 * Checks if the image is loaded or if the image reference is not an IMG element.
 * 
 * @remarks
 * This method returns true in two cases:
 * 1. The image has already been loaded (isImageLoaded is true)
 * 2. The imageRef exists but is not an IMG tag
 * 
 * @returns {boolean} True if image is loaded or reference is not an IMG element
 * 
 * @module module_get
 * @originalId get
 */
declare function get(this: {
  /**
   * Flag indicating whether the image has been loaded
   */
  isImageLoaded?: boolean;
  
  /**
   * Reference to the HTML element, typically an image element
   */
  imageRef?: HTMLElement | null;
}): boolean;

export default get;