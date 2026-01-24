import React from 'react';
import PropTypes from 'prop-types';
import { IValueChange } from './IValueChange';

/**
 * Range configuration for the slider
 */
export interface SliderRange {
  /** Minimum value of the slider */
  min?: number;
  /** Maximum value of the slider */
  max?: number;
}

/**
 * Validation rules for the slider
 */
export interface SliderRules {
  /** Range constraints for the slider value */
  range: SliderRange;
}

/**
 * Options configuration for the slider component
 */
export interface SliderOptions {
  /** Whether the slider is in read-only mode */
  readOnly: boolean;
  /** Validation rules applied to the slider */
  rules: SliderRules;
}

/**
 * Props data structure for the VerticalDoubleSlider component
 */
export interface VerticalDoubleSliderData {
  /** Additional CSS class name(s) to apply */
  className?: string;
  /** Label text displayed with the slider */
  label?: string;
  /** Current value of the slider */
  value: number;
  /** Whether to delay mouse move events */
  delay?: boolean;
  /** Configuration options for the slider */
  options: SliderOptions;
}

/**
 * Props interface for VerticalDoubleSlider component
 */
export interface VerticalDoubleSliderProps {
  /** Configuration data for the slider */
  data: VerticalDoubleSliderData;
}

/**
 * State interface for VerticalDoubleSlider component
 */
export interface VerticalDoubleSliderState {
  /** Current value of the slider */
  value: number;
  /** Whether the slider is in read-only mode */
  readOnly: boolean;
}

/**
 * A vertical double-range slider component that supports bidirectional value selection.
 * Allows users to select values in both positive and negative ranges with visual feedback.
 * 
 * @example
 *