import type { VNode, CreateElement } from 'vue';
import type { PropType } from 'vue';

/**
 * VBadge Component Type Definitions
 * A component for displaying badges, typically used to show notifications or status indicators
 */

/**
 * Props for the VBadge component
 */
export interface VBadgeProps {
  /**
   * Applies avatar styling to the badge (circular shape)
   * @default false
   */
  avatar?: boolean;

  /**
   * Applies a border around the badge
   * @default false
   */
  bordered?: boolean;

  /**
   * The color of the badge
   * @default 'primary'
   */
  color?: string;

  /**
   * Content to display inside the badge (text or number)
   */
  content?: string | number;

  /**
   * Reduces badge size to a small dot indicator
   * @default false
   */
  dot?: boolean;

  /**
   * Accessible label for screen readers
   * @default '$vuetify.badge'
   */
  label?: string;

  /**
   * Icon name to display inside the badge
   */
  icon?: string;

  /**
   * Renders badge inline with content instead of absolutely positioned
   * @default false
   */
  inline?: boolean;

  /**
   * Horizontal offset for badge positioning
   */
  offsetX?: number | string;

  /**
   * Vertical offset for badge positioning
   */
  offsetY?: number | string;

  /**
   * Overlaps the badge on top of the slotted content
   * @default false
   */
  overlap?: boolean;

  /**
   * Removes border radius from the badge
   * @default false
   */
  tile?: boolean;

  /**
   * Transition to use when badge appears/disappears
   * @default 'scale-rotate-transition'
   */
  transition?: string;

  /**
   * Controls visibility of the badge
   * @default true
   */
  value?: boolean;

  /**
   * Positions badge on the left side
   * @default false
   */
  left?: boolean;

  /**
   * Positions badge on the bottom
   * @default false
   */
  bottom?: boolean;
}

/**
 * Computed properties for the VBadge component
 */
export interface VBadgeComputed {
  /**
   * CSS classes applied to the badge wrapper
   */
  classes: Record<string, boolean>;

  /**
   * Computed bottom position value
   */
  computedBottom: string;

  /**
   * Computed left position value (RTL aware)
   */
  computedLeft: string;

  /**
   * Computed right position value (RTL aware)
   */
  computedRight: string;

  /**
   * Computed top position value
   */
  computedTop: string;

  /**
   * Computed horizontal offset with unit
   */
  computedXOffset: string;

  /**
   * Computed vertical offset with unit
   */
  computedYOffset: string;

  /**
   * Whether the application is in RTL (right-to-left) mode
   */
  isRtl: boolean;

  /**
   * Default offset value based on dot and overlap settings
   */
  offset: number;

  /**
   * Inline styles applied to the badge
   */
  styles: Partial<CSSStyleDeclaration> | Record<string, never>;
}

/**
 * Methods for the VBadge component
 */
export interface VBadgeMethods {
  /**
   * Calculates the position value using calc() CSS function
   * @param offset - The offset value (number or string)
   * @returns Calculated CSS position value
   */
  calcPosition(offset?: number | string): string;

  /**
   * Generates the badge element VNode
   * @returns VNode for the badge
   */
  genBadge(): VNode;

  /**
   * Generates the content inside the badge
   * @returns VNode or string content, or undefined for dot badges
   */
  genBadgeContent(): VNode | string | undefined;

  /**
   * Generates the wrapper span element for the badge
   * @returns VNode for the badge wrapper
   */
  genBadgeWrapper(): VNode;
}

/**
 * Slots available for the VBadge component
 */
export interface VBadgeSlots {
  /**
   * Default slot for the element that the badge is attached to
   */
  default?: VNode[];

  /**
   * Custom content to display inside the badge
   */
  badge?: VNode[];
}

/**
 * VBadge Component
 * 
 * A versatile badge component for displaying notifications, counts, or status indicators.
 * Supports various positioning options, colors, and styles.
 * 
 * @example
 *