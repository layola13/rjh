/**
 * Image button with popup status bar component factory
 * @module ImageButtonWithPopup
 */

import BaseComponent from './BaseComponent';

/**
 * Configuration options for creating an image button with popup
 */
export interface ImageButtonPopupOptions {
  /** CSS class name for the popup container */
  popupClassName: string;
  /** Additional configuration options passed to CImageButton */
  [key: string]: unknown;
}

/**
 * Image button component with integrated popup status bar
 * Extends the base component class to provide image button functionality
 * with an associated popup container for displaying status information
 */
export default class ImageButtonWithPopup extends BaseComponent {
  /**
   * Factory method to create a new ImageButtonWithPopup instance
   * @param container - jQuery element or selector for the component container
   * @param options - Configuration options for the image button and popup
   * @returns A new ImageButtonWithPopup instance
   */
  static create(
    container: JQuery | string,
    options: ImageButtonPopupOptions
  ): ImageButtonWithPopup;

  /**
   * Creates the main widget structure with image button and popup container
   * @param containerElement - The parent container element
   * @param options - Configuration options including popup class name
   * @returns The created CImageButton instance
   */
  protected createMainWidget(
    containerElement: HTMLElement | string,
    options: ImageButtonPopupOptions
  ): unknown;
}