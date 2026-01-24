/**
 * Skeleton Component Type Definitions
 * A placeholder component for content that is still loading
 */

import type { ReactNode } from 'react';

/**
 * Shape type for avatar skeleton
 */
export type AvatarShape = 'circle' | 'square';

/**
 * Size type for skeleton elements
 */
export type SkeletonSize = 'small' | 'default' | 'large';

/**
 * Configuration for skeleton avatar
 */
export interface SkeletonAvatarProps {
  /** Custom prefix for CSS class names */
  prefixCls?: string;
  /** Shape of the avatar skeleton */
  shape?: AvatarShape;
  /** Size of the avatar skeleton */
  size?: SkeletonSize | number;
  /** Additional CSS class name */
  className?: string;
  /** Whether to show the avatar skeleton */
  active?: boolean;
}

/**
 * Configuration for skeleton title
 */
export interface SkeletonTitleProps {
  /** Custom prefix for CSS class names */
  prefixCls?: string;
  /** Width of the title skeleton */
  width?: string | number;
  /** Additional CSS class name */
  className?: string;
}

/**
 * Configuration for skeleton paragraph
 */
export interface SkeletonParagraphProps {
  /** Custom prefix for CSS class names */
  prefixCls?: string;
  /** Width of the paragraph skeleton, can be array for multiple rows */
  width?: string | number | Array<string | number>;
  /** Number of paragraph rows */
  rows?: number;
  /** Additional CSS class name */
  className?: string;
}

/**
 * Main Skeleton component props
 */
export interface SkeletonProps {
  /** Custom prefix for CSS class names */
  prefixCls?: string;
  /** Whether to show loading skeleton */
  loading?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Actual content to display when loading is false */
  children?: ReactNode;
  /** Avatar skeleton configuration, false to hide */
  avatar?: boolean | SkeletonAvatarProps;
  /** Title skeleton configuration, false to hide */
  title?: boolean | SkeletonTitleProps;
  /** Paragraph skeleton configuration, false to hide */
  paragraph?: boolean | SkeletonParagraphProps;
  /** Whether to show animation */
  active?: boolean;
  /** Whether to use rounded corners */
  round?: boolean;
}

/**
 * Props for Skeleton.Button sub-component
 */
export interface SkeletonButtonProps {
  /** Custom prefix for CSS class names */
  prefixCls?: string;
  /** Size of the button skeleton */
  size?: SkeletonSize;
  /** Shape of the button skeleton */
  shape?: 'default' | 'circle' | 'round';
  /** Whether to show animation */
  active?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Whether to render as a block element */
  block?: boolean;
}

/**
 * Props for Skeleton.Input sub-component
 */
export interface SkeletonInputProps {
  /** Custom prefix for CSS class names */
  prefixCls?: string;
  /** Size of the input skeleton */
  size?: SkeletonSize;
  /** Whether to show animation */
  active?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Whether to render as a block element */
  block?: boolean;
}

/**
 * Props for Skeleton.Image sub-component
 */
export interface SkeletonImageProps {
  /** Custom prefix for CSS class names */
  prefixCls?: string;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Whether to show animation */
  active?: boolean;
}

/**
 * Skeleton component with sub-components
 * Used to display placeholder content while data is loading
 */
export interface SkeletonComponent extends React.FC<SkeletonProps> {
  /** Button skeleton sub-component */
  Button: React.FC<SkeletonButtonProps>;
  /** Avatar skeleton sub-component */
  Avatar: React.FC<SkeletonAvatarProps>;
  /** Input skeleton sub-component */
  Input: React.FC<SkeletonInputProps>;
  /** Image skeleton sub-component */
  Image: React.FC<SkeletonImageProps>;
}

declare const Skeleton: SkeletonComponent;

export default Skeleton;