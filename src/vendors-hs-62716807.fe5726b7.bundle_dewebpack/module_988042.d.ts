import type { ReactElement, ForwardRefExoticComponent, RefAttributes } from 'react';
import type { TooltipProps } from 'antd/es/tooltip';

/**
 * Rate component props configuration
 */
export interface RateProps {
  /**
   * Custom CSS class prefix for Rate component
   * @default 'ant-rate'
   */
  prefixCls?: string;

  /**
   * Customize tooltip content for each star
   * Array index corresponds to star index
   * @example ['terrible', 'bad', 'normal', 'good', 'wonderful']
   */
  tooltips?: string[];

  /**
   * Custom character to render instead of default star
   * @default <StarFilled />
   */
  character?: ReactElement;

  /**
   * Star count
   * @default 5
   */
  count?: number;

  /**
   * Whether to allow half star selection
   * @default false
   */
  allowHalf?: boolean;

  /**
   * Whether to allow clear when click again
   * @default true
   */
  allowClear?: boolean;

  /**
   * Read only mode, cannot interact
   * @default false
   */
  disabled?: boolean;

  /**
   * Current value
   */
  value?: number;

  /**
   * Default value
   * @default 0
   */
  defaultValue?: number;

  /**
   * Callback when value changes
   */
  onChange?: (value: number) => void;

  /**
   * Callback when hovering over item
   */
  onHoverChange?: (value: number) => void;

  /**
   * Custom render function for each character
   * @param node - The character node
   * @param props - Character props including index
   */
  characterRender?: (node: ReactElement, props: { index: number }) => ReactElement;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Inline styles
   */
  style?: React.CSSProperties;

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
   * Callback when focus
   */
  onFocus?: React.FocusEventHandler<HTMLDivElement>;

  /**
   * Callback when blur
   */
  onBlur?: React.FocusEventHandler<HTMLDivElement>;

  /**
   * Callback when keydown
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;

  /**
   * Text direction
   */
  direction?: 'ltr' | 'rtl';
}

/**
 * Rate component for displaying and collecting ratings
 * 
 * @example
 *