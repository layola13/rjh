/**
 * Sketch flag enumeration for element states
 * Defines flags for selection and hover states in sketch mode
 * @module ExSketchFlagEnum
 */

/**
 * Flags representing different sketch element states
 * These flags can be combined using bitwise operations
 */
export enum ExSketchFlagEnum {
  /**
   * Indicates the element is driven by selection
   * @remarks Used when an element's state is controlled by user selection
   */
  selectedDriven = 512,

  /**
   * Indicates the element is in hover state
   * @remarks Triggered when mouse cursor hovers over the element
   */
  hoverOn = 1024,

  /**
   * Indicates the element is driven by hover state
   * @remarks Used when an element's state is controlled by hover interactions
   */
  hoverOnDriven = 2048
}