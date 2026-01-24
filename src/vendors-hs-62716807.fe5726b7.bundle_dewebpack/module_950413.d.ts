/**
 * Result component type definitions
 * Displays a result status with icon, title, subtitle and optional content
 */

import type { ReactNode, CSSProperties } from 'react';

/**
 * Status type for Result component
 * Determines the icon and styling of the result
 */
export type ResultStatusType = 'success' | 'error' | 'info' | 'warning' | '404' | '500' | '403';

/**
 * Props for the Result component
 */
export interface ResultProps {
  /**
   * Custom prefix for CSS class names
   * @default 'ant-result'
   */
  prefixCls?: string;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Subtitle text displayed below the title
   */
  subTitle?: ReactNode;

  /**
   * Main title text
   */
  title?: ReactNode;

  /**
   * Inline styles for the root element
   */
  style?: CSSProperties;

  /**
   * Additional content displayed at the bottom
   */
  children?: ReactNode;

  /**
   * Result status type
   * @default 'info'
   */
  status?: ResultStatusType;

  /**
   * Custom icon element (overrides default status icon)
   */
  icon?: ReactNode;

  /**
   * Extra actions or content displayed between title and children
   */
  extra?: ReactNode;
}

/**
 * Map of status types to their corresponding icon components
 */
export const IconMap: Record<'success' | 'error' | 'info' | 'warning', React.ComponentType>;

/**
 * Map of HTTP error codes to their corresponding illustration components
 */
export const ExceptionMap: Record<'404' | '500' | '403', React.ComponentType>;

/**
 * Result component
 * Used to display processing results with customizable status, icon, title and content
 */
declare const Result: React.FC<ResultProps> & {
  /**
   * Built-in 403 forbidden illustration component
   */
  PRESENTED_IMAGE_403: React.ComponentType;

  /**
   * Built-in 404 not found illustration component
   */
  PRESENTED_IMAGE_404: React.ComponentType;

  /**
   * Built-in 500 server error illustration component
   */
  PRESENTED_IMAGE_500: React.ComponentType;
};

export default Result;