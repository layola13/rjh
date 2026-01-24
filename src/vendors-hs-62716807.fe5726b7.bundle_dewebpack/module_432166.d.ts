/**
 * Skeleton Avatar Component
 * A placeholder component that displays an avatar skeleton loading state
 */

/**
 * Shape type for the skeleton avatar
 */
export type SkeletonAvatarShape = 'circle' | 'square';

/**
 * Size type for the skeleton avatar
 */
export type SkeletonAvatarSize = 'large' | 'small' | 'default' | number;

/**
 * Props for the Skeleton Avatar component
 */
export interface SkeletonAvatarProps {
  /**
   * Custom CSS class name prefix
   */
  prefixCls?: string;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Whether to show active animation
   * @default false
   */
  active?: boolean;

  /**
   * Shape of the avatar skeleton
   * @default 'circle'
   */
  shape?: SkeletonAvatarShape;

  /**
   * Size of the avatar skeleton
   * @default 'default'
   */
  size?: SkeletonAvatarSize;

  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}

/**
 * Skeleton Avatar Component
 * Displays a placeholder avatar during content loading
 * 
 * @example
 *