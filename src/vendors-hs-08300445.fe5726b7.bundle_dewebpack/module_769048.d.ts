/**
 * Higher-Order Component (HOC) that wraps a slider component with tooltip functionality.
 * 
 * @module SliderTooltipWrapper
 * @description Enhances slider components by adding interactive tooltips that display values
 * and respond to user interactions (hover, drag).
 */

import React from 'react';
import Tooltip from 'rc-tooltip';
import Handle from 'rc-slider/lib/Handle';

/**
 * Style object for slider handle customization
 */
interface HandleStyle extends React.CSSProperties {}

/**
 * Props configuration for the tooltip component
 */
interface TooltipProps {
  /** CSS class prefix for tooltip styling */
  prefixCls?: string;
  /** Custom overlay content for tooltip */
  overlay?: React.ReactNode;
  /** Tooltip placement relative to target element */
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  /** Force tooltip visibility state */
  visible?: boolean;
}

/**
 * Props passed to the handle component
 */
interface HandleComponentProps {
  /** Current value of the handle */
  value: number;
  /** Whether the handle is currently being dragged */
  dragging: boolean;
  /** Index of the handle (for multi-handle sliders) */
  index: number;
  /** Whether the handle is disabled */
  disabled: boolean;
  /** Additional style properties */
  style?: React.CSSProperties;
  /** Mouse enter event handler */
  onMouseEnter?: () => void;
  /** Mouse leave event handler */
  onMouseLeave?: () => void;
}

/**
 * Props for the enhanced slider component
 */
interface SliderWithTooltipProps {
  /** Formatter function to transform value into tooltip display text */
  tipFormatter?: (value: number) => React.ReactNode;
  /** Style(s) for slider handle(s) - single object or array for multiple handles */
  handleStyle?: HandleStyle | HandleStyle[];
  /** Configuration props passed to tooltip component */
  tipProps?: TooltipProps;
  /** Function to determine tooltip container element */
  getTooltipContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

/**
 * Internal state for tracking tooltip visibility
 */
interface TooltipVisibilityState {
  /** Map of handle index to visibility state */
  visibles: Record<number, boolean>;
}

/**
 * Creates a Higher-Order Component that adds tooltip functionality to a slider component.
 * 
 * @template P - Props type of the wrapped component
 * @param {React.ComponentType<P>} WrappedSliderComponent - The slider component to enhance
 * @returns {React.ComponentType<P & SliderWithTooltipProps>} Enhanced component with tooltip support
 * 
 * @example
 *