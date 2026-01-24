/**
 * Typography Text component type definitions
 * Wraps the Base component with Text-specific props
 */

import type React from 'react';

/**
 * Props for the Typography.Text component
 */
export interface TypographyTextProps extends Omit<TypographyBaseProps, 'component'> {
  /**
   * Whether to display ellipsis when text overflows
   * @deprecated - Only boolean values are supported. Object configuration is deprecated.
   */
  ellipsis?: boolean | EllipsisConfig;
  
  /**
   * Additional CSS class name
   */
  className?: string;
  
  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Text content
   */
  children?: React.ReactNode;
}

/**
 * Deprecated ellipsis configuration object
 * @deprecated - Use boolean value instead
 */
interface EllipsisConfig {
  rows?: number;
  expandable?: boolean;
  suffix?: string;
  symbol?: React.ReactNode;
  onExpand?: (event: React.MouseEvent) => void;
  onEllipsis?: (ellipsis: boolean) => void;
  tooltip?: React.ReactNode | boolean;
}

/**
 * Base typography component props
 */
interface TypographyBaseProps {
  /**
   * The HTML element or React component to render
   */
  component?: React.ElementType;
  
  /**
   * Whether to display ellipsis when content overflows
   */
  ellipsis?: boolean;
  
  /**
   * Additional props passed to the underlying element
   */
  [key: string]: unknown;
}

/**
 * Typography Text component
 * Renders inline text with optional ellipsis support
 * 
 * @param props - Component props
 * @returns React element rendering a span with text content
 * 
 * @example
 *