/**
 * Ant Design Slider Component Type Definitions
 * A slider component for selecting values from a range
 */

import * as React from 'react';
import { TooltipProps } from 'antd/es/tooltip';

/**
 * Placement options for the slider tooltip
 */
export type TooltipPlacement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

/**
 * Marks configuration for slider
 */
export interface SliderMarks {
  [key: number]: React.ReactNode | {
    style?: React.CSSProperties;
    label?: React.ReactNode;
  };
}

/**
 * Range configuration object
 */
export interface RangeConfig {
  /**
   * Whether the track between handles is draggable
   */
  draggableTrack?: boolean;
}

/**
 * Handle render info passed to custom handle renderer
 */
export interface HandleRenderInfo {
  /** Current value of the handle */
  value: number;
  /** Whether the handle is currently being dragged */
  dragging: boolean;
  /** Index of the handle (for range sliders) */
  index: number;
  /** Offset position */
  offset?: number;
  /** Additional props */
  [key: string]: any;
}

/**
 * Props for the Slider component
 */
export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /**
   * Custom CSS class prefix
   * @default 'ant-slider'
   */
  prefixCls?: string;

  /**
   * Custom CSS class prefix for tooltip
   * @default 'ant-tooltip'
   */
  tooltipPrefixCls?: string;

  /**
   * Whether to enable range selection
   * Can be a boolean or configuration object
   */
  range?: boolean | RangeConfig;

  /**
   * Minimum value of the slider
   * @default 0
   */
  min?: number;

  /**
   * Maximum value of the slider
   * @default 100
   */
  max?: number;

  /**
   * Step size for value changes
   * @default 1
   */
  step?: number | null;

  /**
   * Current value (controlled)
   * Single value for normal slider, tuple for range slider
   */
  value?: number | [number, number];

  /**
   * Default value (uncontrolled)
   * Single value for normal slider, tuple for range slider
   */
  defaultValue?: number | [number, number];

  /**
   * Whether the slider is vertical
   * @default false
   */
  vertical?: boolean;

  /**
   * Whether to reverse the slider direction
   * @default false
   */
  reverse?: boolean;

  /**
   * Marks to display on the slider
   */
  marks?: SliderMarks;

  /**
   * Whether dots should be shown on steps
   * @default false
   */
  dots?: boolean;

  /**
   * Whether the slider is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether to include min/max in marks
   * @default true
   */
  included?: boolean;

  /**
   * Formatter for tooltip content
   * Return null to hide tooltip
   */
  tipFormatter?: ((value?: number) => React.ReactNode) | null;

  /**
   * Whether tooltip is visible
   * undefined for auto visibility (visible when dragging)
   */
  tooltipVisible?: boolean;

  /**
   * Placement of the tooltip
   * Auto-calculated based on vertical prop if not specified
   */
  tooltipPlacement?: TooltipPlacement;

  /**
   * Container for tooltip popup
   */
  getTooltipPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;

  /**
   * Callback fired when value changes
   */
  onChange?: (value: number | [number, number]) => void;

  /**
   * Callback fired after interaction ends
   */
  onAfterChange?: (value: number | [number, number]) => void;

  /**
   * Callback fired when interaction starts
   */
  onBeforeChange?: (value: number | [number, number]) => void;

  /**
   * Custom handle renderer
   */
  handle?: (info: HandleRenderInfo) => React.ReactElement;

  /**
   * Track style configuration
   */
  trackStyle?: React.CSSProperties | React.CSSProperties[];

  /**
   * Rail (background track) style
   */
  railStyle?: React.CSSProperties;

  /**
   * Handle style configuration
   */
  handleStyle?: React.CSSProperties | React.CSSProperties[];

  /**
   * Dot style configuration
   */
  dotStyle?: React.CSSProperties;

  /**
   * Active dot style configuration
   */
  activeDotStyle?: React.CSSProperties;

  /**
   * Auto focus on mount
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Tab index for keyboard navigation
   */
  tabIndex?: number;

  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;

  /**
   * ARIA labelledby for accessibility
   */
  'aria-labelledby'?: string;

  /**
   * ARIA valuetext for accessibility
   */
  'aria-valuetext'?: string;
}

/**
 * Ant Design Slider Component
 * 
 * A slider component for selecting single values or ranges from a continuous or discrete range.
 * 
 * @example
 * // Basic usage
 * <Slider defaultValue={30} />
 * 
 * @example
 * // Range slider
 * <Slider range defaultValue={[20, 50]} />
 * 
 * @example
 * // With custom tooltip formatter
 * <Slider tipFormatter={value => `${value}%`} />
 */
declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<any>>;

export default Slider;