/**
 * Space Item Component Type Definitions
 * Renders an individual item within a Space layout component with appropriate margins and splits
 */

import type { ReactNode, CSSProperties } from 'react';

/**
 * Direction type for space layout
 */
export type SpaceDirection = 'horizontal' | 'vertical';

/**
 * Margin direction property name
 */
export type MarginDirection = 'marginLeft' | 'marginRight';

/**
 * Props for the SpaceItem component
 */
export interface SpaceItemProps {
  /**
   * CSS class name for the item wrapper
   */
  className?: string;

  /**
   * Layout direction of the space container
   */
  direction: SpaceDirection;

  /**
   * Current index of this item in the space container
   */
  index: number;

  /**
   * Direction of margin to apply (for horizontal layout)
   */
  marginDirection: MarginDirection;

  /**
   * Child content to render
   */
  children?: ReactNode;

  /**
   * Split element to render between items (separator)
   */
  split?: ReactNode;

  /**
   * Whether items should wrap to next line
   */
  wrap?: boolean;
}

/**
 * Context value provided by Space component
 */
export interface SpaceContextValue {
  /**
   * Horizontal spacing size in pixels
   */
  horizontalSize: number;

  /**
   * Vertical spacing size in pixels
   */
  verticalSize: number;

  /**
   * Index of the last item in the space container
   */
  latestIndex: number;
}

/**
 * SpaceItem component
 * Renders a single item within a Space layout with appropriate spacing and optional separators
 * 
 * @param props - SpaceItem component props
 * @returns React element or null if children is null
 */
declare function SpaceItem(props: SpaceItemProps): JSX.Element | null;

export default SpaceItem;