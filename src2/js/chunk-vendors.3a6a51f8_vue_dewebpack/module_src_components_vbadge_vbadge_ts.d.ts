/**
 * VBadge Component Type Definitions
 * A component that displays a badge overlay on content, supporting icons, dots, and custom content.
 */

import Vue from 'vue';
import { VNode } from 'vue';

/**
 * Position configuration for badge placement
 */
interface BadgePosition {
  left?: boolean;
  bottom?: boolean;
}

/**
 * Badge component props interface
 */
interface VBadgeProps {
  /**
   * Applies avatar-specific styling (circular badge)
   */
  avatar?: boolean;
  
  /**
   * Adds a border around the badge
   */
  bordered?: boolean;
  
  /**
   * Badge background color (theme color or CSS color)
   * @default 'primary'
   */
  color?: string;
  
  /**
   * Custom content to display in the badge
   */
  content?: string | number;
  
  /**
   * Displays badge as a small dot instead of content
   */
  dot?: boolean;
  
  /**
   * Accessibility label for screen readers
   * @default '$vuetify.badge'
   */
  label?: string;
  
  /**
   * Icon to display in the badge (icon name)
   */
  icon?: string;
  
  /**
   * Displays badge inline with content instead of overlaid
   */
  inline?: boolean;
  
  /**
   * Horizontal offset from default position
   */
  offsetX?: number | string;
  
  /**
   * Vertical offset from default position
   */
  offsetY?: number | string;
  
  /**
   * Overlaps the slotted content
   */
  overlap?: boolean;
  
  /**
   * Removes border radius from badge
   */
  tile?: boolean;
  
  /**
   * Transition animation name
   * @default 'scale-rotate-transition'
   */
  transition?: string;
  
  /**
   * Controls badge visibility
   * @default true
   */
  value?: boolean;
  
  /**
   * Positions badge on the left side
   */
  left?: boolean;
  
  /**
   * Positions badge on the bottom edge
   */
  bottom?: boolean;
}

/**
 * Computed properties interface
 */
interface VBadgeComputed {
  /**
   * Combined CSS classes for the badge container
   */
  classes: Record<string, boolean>;
  
  /**
   * Calculated bottom position style
   */
  computedBottom: string;
  
  /**
   * Calculated left position style
   */
  computedLeft: string;
  
  /**
   * Calculated right position style
   */
  computedRight: string;
  
  /**
   * Calculated top position style
   */
  computedTop: string;
  
  /**
   * Calculated horizontal offset
   */
  computedXOffset: string;
  
  /**
   * Calculated vertical offset
   */
  computedYOffset: string;
  
  /**
   * Whether RTL (right-to-left) mode is active
   */
  isRtl: boolean;
  
  /**
   * Default offset value based on dot/overlap settings
   */
  offset: number;
  
  /**
   * Position styles object
   */
  styles: Partial<{
    bottom: string;
    left: string;
    right: string;
    top: string;
  }>;
}

/**
 * Badge component methods interface
 */
interface VBadgeMethods {
  /**
   * Calculates position using calc() CSS function
   * @param offset - The offset value to calculate
   * @returns Calculated CSS calc() string
   */
  calcPosition(offset?: number | string): string;
  
  /**
   * Generates the badge element with transition wrapper
   * @returns VNode for the badge
   */
  genBadge(): VNode;
  
  /**
   * Generates the content inside the badge (icon, text, or slot)
   * @returns VNode or string for badge content
   */
  genBadgeContent(): VNode | string | undefined;
  
  /**
   * Generates the wrapper span element for the badge
   * @returns VNode for the badge wrapper
   */
  genBadgeWrapper(): VNode;
}

/**
 * VBadge Component
 * 
 * Displays a badge overlay on content with customizable appearance and positioning.
 * Supports icons, text content, dot indicators, and accessibility features.
 * 
 * @example
 *