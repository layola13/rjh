/**
 * Typography Text Component Type Definitions
 * Handles text display with ellipsis, editing, and copy functionality
 */

import type { CSSProperties, ReactNode, RefObject } from 'react';
import type { ConfigConsumerProps } from './ConfigContext';

/**
 * Copyable configuration for text component
 */
export interface CopyableConfig {
  /** Custom text to copy (defaults to children) */
  text?: string;
  /** Callback when copy action is triggered */
  onCopy?: () => void;
  /** Custom icon for copy button [normal, copied] */
  icon?: [ReactNode, ReactNode];
  /** Tooltip text for copy button [copy, copied] */
  tooltips?: [ReactNode, ReactNode] | false;
}

/**
 * Editable configuration for text component
 */
export interface EditableConfig {
  /** Whether currently in editing state */
  editing?: boolean;
  /** Custom icon for edit button */
  icon?: ReactNode;
  /** Tooltip text for edit button */
  tooltip?: ReactNode | false;
  /** Callback when edit starts */
  onStart?: () => void;
  /** Callback when edit content changes */
  onChange?: (value: string) => void;
  /** Maximum length of editable content */
  maxLength?: number;
  /** Auto size configuration for textarea */
  autoSize?: boolean | { minRows?: number; maxRows?: number };
}

/**
 * Ellipsis configuration for text component
 */
export interface EllipsisConfig {
  /** Number of rows to display before ellipsis */
  rows?: number;
  /** Whether to show expand button */
  expandable?: boolean;
  /** Suffix text after ellipsis */
  suffix?: string;
  /** Custom symbol for expand button */
  symbol?: ReactNode;
  /** Callback when ellipsis state changes */
  onEllipsis?: (isEllipsis: boolean) => void;
  /** Callback when expand button is clicked */
  onExpand?: (event: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Component state interface
 */
export interface TypographyTextState {
  /** Whether in edit mode */
  edit: boolean;
  /** Whether copy action was just completed */
  copied: boolean;
  /** Ellipsized text content */
  ellipsisText: string;
  /** Ellipsized React content */
  ellipsisContent: ReactNode | null;
  /** Whether text is currently ellipsized */
  isEllipsis: boolean;
  /** Whether ellipsis is expanded */
  expanded: boolean;
  /** Whether component has been rendered on client */
  clientRendered: boolean;
}

/**
 * Typography Text component props
 */
export interface TypographyTextProps {
  /** Custom class name prefix */
  prefixCls?: string;
  /** Component class name */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Text content */
  children?: ReactNode;
  /** HTML element type to render */
  component?: keyof JSX.IntrinsicElements;
  /** Text type variant */
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  /** Whether text is disabled */
  disabled?: boolean;
  /** Mark text style */
  mark?: boolean;
  /** Code text style */
  code?: boolean;
  /** Underline text style */
  underline?: boolean;
  /** Delete/strikethrough text style */
  delete?: boolean;
  /** Strong/bold text style */
  strong?: boolean;
  /** Keyboard text style */
  keyboard?: boolean;
  /** Enable copy functionality */
  copyable?: boolean | CopyableConfig;
  /** Enable edit functionality */
  editable?: boolean | EditableConfig;
  /** Enable ellipsis functionality */
  ellipsis?: boolean | EllipsisConfig;
  /** Custom title attribute */
  title?: string;
}

/**
 * Typography Text Component
 * 
 * Provides advanced text display with features:
 * - Ellipsis with configurable rows and expansion
 * - Inline editing capability
 * - Copy to clipboard functionality
 * - Multiple text style variants
 * 
 * @example
 *