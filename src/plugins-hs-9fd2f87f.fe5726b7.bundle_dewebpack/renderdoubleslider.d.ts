/**
 * Module: RenderDoubleSlider
 * Original ID: 131849
 * Exports: RenderDoubleSlider and default export
 */

import { ComponentType } from 'react';

/**
 * Configuration options for double slider rendering
 */
interface DoubleSliderConfig {
  /**
   * Whether the slider only accepts positive values
   * @default true
   */
  positiveOnly: boolean;
  
  /**
   * Function to extract value from event data
   * @param event - The event object containing slider data
   * @returns The extracted numeric value
   */
  reciveData?: (event: unknown) => number;
}

/**
 * Props for the base slider component
 */
interface SliderComponentProps {
  value?: number | [number, number];
  onChange?: (value: number | [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  [key: string]: unknown;
}

/**
 * Higher-order component that wraps a slider component with configuration
 * @param config - Configuration options for the slider behavior
 * @returns A function that accepts a component and returns the wrapped component
 */
declare function createDoubleSlider(
  config: DoubleSliderConfig
): <P extends SliderComponentProps>(
  Component: ComponentType<P>
) => ComponentType<P>;

/**
 * Default export: Double slider component configured for positive values only
 * Receives data via _.get(event, "detail.value", 0)
 */
declare const _default: ComponentType<SliderComponentProps>;

/**
 * RenderDoubleSlider: Double slider component that accepts both positive and negative values
 */
export const RenderDoubleSlider: ComponentType<SliderComponentProps>;

export default _default;