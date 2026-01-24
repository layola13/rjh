/**
 * Module: module_onclick
 * Original ID: onclick
 * 
 * Event handler that deletes background PNG and hides the element
 */

/**
 * Interface representing the element with delete and hide capabilities
 */
interface DeletableElement {
  /**
   * Deletes the background PNG associated with this element
   * @returns void
   */
  _onDeleteBackgroundPngClk(): void;
  
  /**
   * Hides the element
   * @param immediate - If true, hides immediately without animation
   * @returns void
   */
  hide(immediate: boolean): void;
}

/**
 * Click event handler for deleting background PNG
 * Triggers deletion and immediately hides the element
 */
type OnDeleteBackgroundClickHandler = (this: DeletableElement) => void;