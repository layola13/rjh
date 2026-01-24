/**
 * VCard Component Type Definitions
 * A Material Design card component that provides a flexible container for content and actions
 */

import Vue, { VNode, VueConstructor } from 'vue';
import { CombinedVueInstance } from 'vue/types/vue';

/**
 * Props configuration for VCard component
 */
export interface VCardProps {
  /**
   * Removes card elevation shadow
   * @default false
   */
  flat?: boolean;

  /**
   * Applies hover elevation effect
   * @default false
   */
  hover?: boolean;

  /**
   * Background image URL for the card
   * @default undefined
   */
  img?: string;

  /**
   * Designates the component as anchor and applies hover styling
   * @default false
   */
  link?: boolean;

  /**
   * Height of the loading progress bar
   * @default 4
   */
  loaderHeight?: number | string;

  /**
   * Applies elevated shadow to the card
   * @default false
   */
  raised?: boolean;

  /**
   * Background color (from VSheet mixin)
   */
  color?: string;

  /**
   * Disables card interaction (from routable mixin)
   */
  disabled?: boolean;

  /**
   * Shows loading state with progress bar (from loadable mixin)
   */
  loading?: boolean | string;
}

/**
 * Computed properties for VCard component
 */
export interface VCardComputed {
  /**
   * Combined CSS classes for the card element
   */
  classes: Record<string, boolean>;

  /**
   * Inline styles including background image if specified
   */
  styles: Record<string, string>;

  /**
   * Determines if card should respond to click events
   * @remarks Inherited from routable mixin
   */
  isClickable: boolean;
}

/**
 * Methods for VCard component
 */
export interface VCardMethods {
  /**
   * Generates the loading progress bar element
   * @returns VNode containing progress indicator or null
   */
  genProgress(): VNode | null;

  /**
   * Generates route link configuration
   * @returns Object containing tag name and data attributes
   * @remarks Inherited from routable mixin
   */
  generateRouteLink(): { tag: string; data: Record<string, any> };

  /**
   * Sets background color on the component data object
   * @param color - Color value to apply
   * @param data - Component data object to modify
   * @returns Modified data object
   * @remarks Inherited from VSheet mixin
   */
  setBackgroundColor(color: string | undefined, data: Record<string, any>): Record<string, any>;
}

/**
 * VCard component instance type
 */
export type VCard = CombinedVueInstance<
  Vue,
  Record<string, never>,
  VCardMethods,
  VCardComputed,
  VCardProps
>;

/**
 * VCard component constructor
 */
export interface VCardConstructor extends VueConstructor<VCard> {
  options: {
    name: 'v-card';
    props: VCardProps;
    computed: VCardComputed;
    methods: VCardMethods;
  };
}

/**
 * Default export: VCard component
 * @remarks
 * Extends VSheet, Loadable, and Routable mixins
 * Provides Material Design card with optional image background,
 * elevation effects, loading state, and routing capabilities
 */
declare const VCardComponent: VCardConstructor;

export default VCardComponent;