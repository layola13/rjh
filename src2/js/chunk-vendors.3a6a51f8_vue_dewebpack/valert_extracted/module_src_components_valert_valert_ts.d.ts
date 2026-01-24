/**
 * VAlert Component Type Definitions
 * A versatile alert component with support for different types, borders, and dismissible functionality
 */

import Vue, { VNode, VNodeData } from 'vue';
import { PropValidator } from 'vue/types/options';

/**
 * Valid border position values for the alert component
 */
export type AlertBorderPosition = 'top' | 'right' | 'bottom' | 'left';

/**
 * Valid alert type values that determine the semantic meaning and default styling
 */
export type AlertType = 'info' | 'error' | 'success' | 'warning';

/**
 * Props interface for the VAlert component
 */
export interface VAlertProps {
  /**
   * Adds a colored border to the alert component
   * @validator Must be one of: 'top', 'right', 'bottom', 'left'
   */
  border?: AlertBorderPosition;

  /**
   * Customizable label for the close button (used for accessibility)
   * @default '$vuetify.close'
   */
  closeLabel?: string;

  /**
   * Applies the defined color to the border instead of the background
   * @default false
   */
  coloredBorder?: boolean;

  /**
   * Reduces the alert's height and content padding
   * @default false
   */
  dense?: boolean;

  /**
   * Adds a close icon to dismiss the alert
   * @default false
   */
  dismissible?: boolean;

  /**
   * Icon used for the dismissible close button
   * @default '$cancel'
   */
  closeIcon?: string;

  /**
   * Designates a specific icon to display
   * Set to false to hide the icon
   * @default '' (auto-determined by type)
   */
  icon?: string | false;

  /**
   * Applies the outlined style which uses the current color for border and text
   * @default false
   */
  outlined?: boolean;

  /**
   * Displays a larger and more prominent alert with increased icon size
   * @default false
   */
  prominent?: boolean;

  /**
   * Applies the text style which uses the current color for text
   * @default false
   */
  text?: boolean;

  /**
   * Specifies a predefined alert type with associated color and icon
   * @validator Must be one of: 'info', 'error', 'success', 'warning'
   */
  type?: AlertType;

  /**
   * Controls the visibility of the alert component
   * @default true
   */
  value?: boolean;
}

/**
 * Computed properties interface for VAlert component
 */
export interface VAlertComputed {
  /**
   * Cached border element VNode
   */
  __cachedBorder: VNode | null;

  /**
   * Cached dismissible button VNode
   */
  __cachedDismissible: VNode | null;

  /**
   * Cached icon element VNode
   */
  __cachedIcon: VNode | null;

  /**
   * Combined CSS classes for the alert component
   */
  classes: Record<string, boolean>;

  /**
   * Computed color value, either from color prop or type prop
   */
  computedColor: string | undefined;

  /**
   * Computed icon name based on icon prop or type prop
   */
  computedIcon: string | false;

  /**
   * Determines if the icon should use the computed color
   */
  hasColoredIcon: boolean;

  /**
   * Determines if the alert uses text styling (text or outlined)
   */
  hasText: boolean;

  /**
   * Color to apply to the icon
   */
  iconColor: string | undefined;

  /**
   * Determines if the alert should use dark theme styling
   */
  isDark: boolean;
}

/**
 * Methods interface for VAlert component
 */
export interface VAlertMethods {
  /**
   * Generates the wrapper element containing all alert content
   * @returns VNode wrapper element
   */
  genWrapper(): VNode;

  /**
   * Generates the content container element
   * @returns VNode content element
   */
  genContent(): VNode;

  /**
   * Generates the root alert element
   * @returns VNode alert element
   */
  genAlert(): VNode;

  /**
   * Toggles the visibility state of the alert
   */
  toggle(): void;
}

/**
 * Scoped slot interface for VAlert component
 */
export interface VAlertScopedSlots {
  /**
   * Scoped slot for custom close button
   * @param props - Object containing toggle function
   */
  close?: (props: { toggle: () => void }) => VNode | VNode[];
}

/**
 * Slots interface for VAlert component
 */
export interface VAlertSlots {
  /**
   * Default slot for alert content
   */
  default?: VNode[];

  /**
   * Slot for content to prepend before the icon
   */
  prepend?: VNode[];

  /**
   * Slot for content to append after the main content
   */
  append?: VNode[];
}

/**
 * VAlert Component
 * 
 * A flexible alert component that displays contextual feedback messages
 * Supports multiple variants (info, success, warning, error), borders, icons, and dismissible functionality
 * 
 * @example
 *