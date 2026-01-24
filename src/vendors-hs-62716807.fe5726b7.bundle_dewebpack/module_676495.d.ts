/**
 * Ant Design Skeleton Button Component
 * A placeholder component for button loading states
 */

import * as React from 'react';
import { ConfigConsumerProps } from './ConfigProvider';

/**
 * Size variants for the skeleton button
 */
export type SkeletonButtonSize = 'default' | 'small' | 'large';

/**
 * Shape variants for the skeleton button
 */
export type SkeletonButtonShape = 'default' | 'circle' | 'round' | 'square';

/**
 * Props for the SkeletonButton component
 */
export interface SkeletonButtonProps {
  /**
   * Custom CSS class prefix
   * @default 'ant-skeleton'
   */
  prefixCls?: string;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Whether to show animation effect
   * @default false
   */
  active?: boolean;

  /**
   * Size of the button skeleton
   * @default 'default'
   */
  size?: SkeletonButtonSize;

  /**
   * Shape of the button skeleton
   * @default 'default'
   */
  shape?: SkeletonButtonShape;

  /**
   * Custom style object
   */
  style?: React.CSSProperties;

  /**
   * Block level button (full width)
   * @default false
   */
  block?: boolean;
}

/**
 * Skeleton Button Component
 * 
 * A placeholder component that displays a loading skeleton in the shape of a button.
 * Commonly used to improve perceived performance during async operations.
 * 
 * @example
 *