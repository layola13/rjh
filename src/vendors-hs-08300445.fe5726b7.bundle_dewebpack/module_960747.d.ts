/**
 * Slider step dots component type definitions
 * Renders visual dots/marks along a slider track
 */

import React from 'react';

/**
 * Props for the slider step dots component
 */
export interface SliderStepsProps {
  /** CSS class prefix for styling */
  prefixCls: string;
  
  /** Whether the slider is vertical orientation */
  vertical: boolean;
  
  /** Whether the slider direction is reversed */
  reverse: boolean;
  
  /** Mark points on the slider with labels/values */
  marks: Record<number, React.ReactNode | { style?: React.CSSProperties; label: React.ReactNode }>;
  
  /** Whether to show dots at step intervals */
  dots: boolean;
  
  /** Step interval for dots (must be positive when dots is true) */
  step: number | null;
  
  /** Whether the range between handles is included/highlighted */
  included: boolean;
  
  /** Lower bound value for active range */
  lowerBound: number;
  
  /** Upper bound value for active range */
  upperBound: number;
  
  /** Maximum slider value */
  max: number;
  
  /** Minimum slider value */
  min: number;
  
  /** Style object for inactive dots */
  dotStyle?: React.CSSProperties;
  
  /** Style object for active dots within range */
  activeDotStyle?: React.CSSProperties;
}

/**
 * Renders step dots along the slider track.
 * Dots can represent marks or step intervals, with visual feedback for active ranges.
 * 
 * @param props - Component props
 * @returns React element containing the step dots
 */
declare function SliderSteps(props: SliderStepsProps): React.ReactElement;

export default SliderSteps;