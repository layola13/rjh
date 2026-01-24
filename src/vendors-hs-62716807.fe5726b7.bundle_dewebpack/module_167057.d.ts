/**
 * React Comment Component Type Definitions
 * A component for displaying user comments with avatar, author, timestamp, and actions
 */

import { ReactNode, HTMLAttributes } from 'react';

/**
 * Comment component props interface
 */
export interface CommentProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /**
   * Array of action elements to be displayed below the comment content
   * @example [<span>Reply</span>, <span>Delete</span>]
   */
  actions?: ReactNode[];

  /**
   * The author name of the comment
   */
  author?: ReactNode;

  /**
   * The avatar of the comment author
   * Can be an image URL string or a custom React element
   */
  avatar?: string | ReactNode;

  /**
   * Nested comments to be displayed as replies
   */
  children?: ReactNode;

  /**
   * Additional CSS class name for the comment container
   */
  className?: string;

  /**
   * The main content of the comment
   */
  content: ReactNode;

  /**
   * Custom prefix for CSS class names (for theming purposes)
   * @default 'comment'
   */
  prefixCls?: string;

  /**
   * Timestamp or time description for when the comment was posted
   * @example "2 hours ago" or <time>2024-01-01</time>
   */
  datetime?: ReactNode;
}

/**
 * Comment Component
 * 
 * Displays a comment with optional author information, avatar, timestamp,
 * actions (like reply/delete), and support for nested comments.
 * 
 * @param props - Comment component props
 * @returns React functional component
 * 
 * @example
 *