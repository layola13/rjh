/**
 * Slider pointer component configuration and style definitions
 * @module SliderPointer
 */

/**
 * Direction of the slider pointer
 */
export type SliderDirection = 'vertical' | 'horizontal';

/**
 * Props for the SliderPointer component
 */
export interface SliderPointerProps {
  /**
   * Direction of the slider (vertical or horizontal)
   * Affects the transform positioning of the pointer
   */
  direction?: SliderDirection;
}

/**
 * Style object for the picker element
 */
export interface PickerStyle {
  width: string;
  height: string;
  borderRadius: string;
  transform: string;
  backgroundColor: string;
  boxShadow: string;
}

/**
 * Computed styles for the slider pointer
 */
export interface SliderPointerStyles {
  picker: PickerStyle;
}

/**
 * SliderPointer component
 * Renders a circular draggable pointer for color/value sliders
 * 
 * @param props - Component properties
 * @returns React element representing the slider pointer
 * 
 * @example
 *