import Vue, { VNode, CreateElement } from 'vue';
import { PropType } from 'vue';

/**
 * VSubheader component properties
 */
export interface VSubheaderProps {
  /**
   * Applies an inset style to the subheader, adding left padding
   */
  inset?: boolean;
  
  /**
   * Applies light theme variant styles
   */
  light?: boolean;
  
  /**
   * Applies dark theme variant styles
   */
  dark?: boolean;
}

/**
 * VSubheader component instance type
 */
export interface VSubheader extends Vue {
  /** Component props */
  readonly inset: boolean;
  
  /** Theme classes computed from themeable mixin */
  readonly themeClasses: Record<string, boolean>;
}

/**
 * VSubheader - A subheader component for displaying section titles
 * 
 * Provides a styled header element for grouping content sections,
 * with support for theming and inset positioning.
 * 
 * @example
 *