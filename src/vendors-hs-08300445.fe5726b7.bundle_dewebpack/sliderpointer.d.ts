/**
 * SliderPointer Component
 * 
 * A slider pointer component that renders a draggable picker element.
 * Used in color picker or slider UI components.
 * 
 * @module SliderPointer
 */

/**
 * Style configuration for the slider pointer picker element
 */
export interface PickerStyle {
  /** Width of the picker element */
  width: string;
  /** Height of the picker element */
  height: string;
  /** Border radius for rounded corners */
  borderRadius: string;
  /** CSS transform for positioning */
  transform: string;
  /** Background color of the picker */
  backgroundColor: string;
  /** Box shadow for depth effect */
  boxShadow: string;
}

/**
 * Style configuration object for SliderPointer component
 */
export interface SliderPointerStyles {
  /** Default styles */
  default: {
    /** Picker element styles */
    picker: PickerStyle;
  };
}

/**
 * Props for the SliderPointer component
 */
export interface SliderPointerProps {
  /** Optional custom styles to override defaults */
  styles?: Partial<SliderPointerStyles>;
}

/**
 * SliderPointer Component
 * 
 * Renders a circular draggable pointer for slider controls.
 * Displays with a light background and shadow for visual depth.
 * 
 * @returns A React element representing the slider pointer
 */
export declare function SliderPointer(props?: SliderPointerProps): React.ReactElement;

export default SliderPointer;