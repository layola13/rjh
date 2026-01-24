/**
 * SectionalSlider Component
 * A slider component with sectional marks and value change handlers
 */

import { Component, ReactElement } from 'react';
import { Slider } from 'antd';
import { IValueChange } from './IValueChange';

/**
 * Range configuration for slider min/max values
 */
export interface SliderRange {
  /** Minimum value of the slider */
  min?: number;
  /** Maximum value of the slider */
  max?: number;
}

/**
 * Validation and display rules for the slider
 */
export interface SliderRules {
  /** Range constraints for slider values */
  range?: SliderRange;
}

/**
 * Configuration options for the slider
 */
export interface SliderOptions {
  /** Unit type for display (e.g., 'px', '%', 'em') */
  unitType?: string;
  /** Number of digits to display after decimal point */
  displayDigits?: number;
  /** Whether to include unit in display */
  includeUnit?: boolean;
  /** Whether the slider is read-only */
  readOnly?: boolean;
  /** Tooltip text to display */
  tips?: string;
  /** Whether to start slider from minimum value */
  startFromMin?: boolean;
  /** Validation and range rules */
  rules?: SliderRules;
}

/**
 * Controller interface for external value change handling
 */
export interface SliderController {
  /** Called when value starts changing */
  onValueChangeStart?: (value: number) => void;
  /** Called when value changes */
  onValueChanged?: (value: number) => void;
  /** Called when value change ends */
  onValueChangeEnd?: (value: number) => void;
}

/**
 * Marks configuration for slider steps
 * Key is the numeric position, value is the label
 */
export interface SliderMarks {
  [key: number]: string | { style?: React.CSSProperties; label: string };
}

/**
 * Data configuration for SectionalSlider
 */
export interface SectionalSliderData {
  /** CSS class name for styling */
  className?: string;
  /** Label text for the slider */
  label?: string;
  /** Icon source URL */
  iconSrc?: string;
  /** Current value of the slider */
  value?: number;
  /** Whether to delay value updates */
  delay?: boolean;
  /** Step increment for slider movement */
  step?: number;
  /** Marks/sections to display on the slider */
  marks?: SliderMarks;
  /** Snapping step threshold (percentage of range) */
  snappingStep?: number;
  /** Function to format tooltip display */
  tip?: ((value: number) => string) | null;
  /** Configuration options */
  options?: SliderOptions;
  /** External controller for value changes */
  controller?: SliderController;
}

/**
 * Props for SectionalSlider component
 */
export interface SectionalSliderProps {
  /** Configuration data for the slider */
  data: SectionalSliderData;
}

/**
 * State for SectionalSlider component
 */
export interface SectionalSliderState {
  /** Current slider value */
  value: number;
  /** Whether the slider is read-only */
  readOnly: boolean;
}

/**
 * Event detail for value change events
 */
export interface ValueChangeDetail {
  detail: {
    value: number;
  };
}

/**
 * SectionalSlider Component
 * 
 * A React component that renders a slider with configurable sections, marks,
 * and value change handlers. Supports read-only mode, snapping to marks,
 * and external control through a controller interface.
 */
export declare class SectionalSlider extends IValueChange<SectionalSliderProps, SectionalSliderState> {
  /**
   * Default props for SectionalSlider
   */
  static defaultProps: SectionalSliderProps;

  /**
   * PropTypes validation (legacy)
   */
  static propTypes: {
    data: unknown;
  };

  /**
   * Constructor
   * @param props - Component props containing slider configuration
   */
  constructor(props: SectionalSliderProps);

  /**
   * Legacy lifecycle method for receiving new props
   * @param nextProps - Next props to receive
   * @deprecated Use componentDidUpdate or derived state instead
   */
  UNSAFE_componentWillReceiveProps(nextProps: SectionalSliderProps): void;

  /**
   * Handles the start of value change
   * @param event - Event containing new value (either native or custom event)
   */
  onValueChangeStart(event: ValueChangeDetail | number): void;

  /**
   * Handles continuous value changes during sliding
   * @param event - Event containing new value (either native or custom event)
   */
  onValueChange(event: ValueChangeDetail | number): void;

  /**
   * Handles the end of value change
   * @param event - Event containing new value (either native or custom event)
   */
  onValueChangeEnd(event: ValueChangeDetail | number): void;

  /**
   * Notifies external controller of slider change start
   * @param value - New slider value as string
   */
  onSliderChangeStart(value: string): void;

  /**
   * Notifies external controller of slider change end
   * @param value - Final slider value as string
   */
  onSliderChangeEnd(value: string): void;

  /**
   * Handles value changes with optional snapping to marks
   * @param value - New slider value
   */
  onChangeHandle(value: number): void;

  /**
   * Renders the slider component
   * @returns React element containing the slider UI
   */
  render(): ReactElement;
}