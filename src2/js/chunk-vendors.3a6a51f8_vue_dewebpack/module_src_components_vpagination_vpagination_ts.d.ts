/**
 * VPagination Component Type Definitions
 * A Vuetify pagination component for navigating through pages
 */

import { VNode } from 'vue';
import { Vue } from 'vue/types/vue';

/**
 * Props interface for VPagination component
 */
export interface VPaginationProps {
  /**
   * Display pagination buttons as circles
   * @default false
   */
  circle?: boolean;

  /**
   * Disable pagination interaction
   * @default false
   */
  disabled?: boolean;

  /**
   * Total number of pages
   * @default 0
   */
  length?: number;

  /**
   * Icon to display for next page button
   * @default "$next"
   */
  nextIcon?: string;

  /**
   * Icon to display for previous page button
   * @default "$prev"
   */
  prevIcon?: string;

  /**
   * Maximum number of visible page buttons (excluding navigation)
   * When set to 0, all pages are shown
   */
  totalVisible?: number | string;

  /**
   * Current active page (v-model)
   * @default 0
   */
  value?: number;

  /**
   * Aria label template for page buttons
   * @default "$vuetify.pagination.ariaLabel.page"
   */
  pageAriaLabel?: string;

  /**
   * Aria label template for current page button
   * @default "$vuetify.pagination.ariaLabel.currentPage"
   */
  currentPageAriaLabel?: string;

  /**
   * Aria label for previous page button
   * @default "$vuetify.pagination.ariaLabel.previous"
   */
  previousAriaLabel?: string;

  /**
   * Aria label for next page button
   * @default "$vuetify.pagination.ariaLabel.next"
   */
  nextAriaLabel?: string;

  /**
   * Aria label for pagination wrapper
   * @default "$vuetify.pagination.ariaLabel.wrapper"
   */
  wrapperAriaLabel?: string;
}

/**
 * Data interface for VPagination component internal state
 */
export interface VPaginationData {
  /**
   * Maximum number of buttons that can fit in the container
   */
  maxButtons: number;

  /**
   * Currently selected page (internal state)
   */
  selected: number | null;
}

/**
 * Computed properties interface for VPagination
 */
export interface VPaginationComputed {
  /**
   * CSS classes applied to the root element
   */
  classes: Record<string, boolean>;

  /**
   * Array of page numbers/separators to display
   * Numbers represent page buttons, "..." represents ellipsis
   */
  items: Array<number | string>;
}

/**
 * Methods interface for VPagination component
 */
export interface VPaginationMethods {
  /**
   * Initialize component state and calculate button layout
   */
  init(): void;

  /**
   * Handle window/container resize to recalculate visible buttons
   */
  onResize(): void;

  /**
   * Navigate to next page
   * @param event - Click event
   */
  next(event: Event): void;

  /**
   * Navigate to previous page
   * @param event - Click event
   */
  previous(event: Event): void;

  /**
   * Generate array of page numbers in a range
   * @param start - Starting page number
   * @param end - Ending page number
   * @returns Array of page numbers
   */
  range(start: number, end: number): number[];

  /**
   * Render navigation icon button (prev/next)
   * @param createElement - Vue render function
   * @param icon - Icon name to display
   * @param disabled - Whether button is disabled
   * @param clickHandler - Click event handler
   * @param ariaLabel - Accessibility label
   * @returns VNode for navigation button
   */
  genIcon(
    createElement: typeof Vue.prototype.$createElement,
    icon: string,
    disabled: boolean,
    clickHandler: (event: Event) => void,
    ariaLabel: string
  ): VNode;

  /**
   * Render individual page button
   * @param createElement - Vue render function
   * @param page - Page number to render
   * @returns VNode for page button
   */
  genItem(createElement: typeof Vue.prototype.$createElement, page: number): VNode;

  /**
   * Render all page items (buttons and ellipsis)
   * @param createElement - Vue render function
   * @returns Array of VNodes for all items
   */
  genItems(createElement: typeof Vue.prototype.$createElement): VNode[];

  /**
   * Render pagination list container
   * @param createElement - Vue render function
   * @param children - Child VNodes to render
   * @returns VNode for list container
   */
  genList(createElement: typeof Vue.prototype.$createElement, children: VNode[]): VNode;
}

/**
 * Events emitted by VPagination component
 */
export interface VPaginationEvents {
  /**
   * Emitted when page changes (v-model)
   * @param page - New page number
   */
  input: (page: number) => void;

  /**
   * Emitted when next button is clicked
   */
  next: () => void;

  /**
   * Emitted when previous button is clicked
   */
  previous: () => void;
}

/**
 * VPagination component class
 * Provides pagination controls for navigating through multiple pages of content
 */
export default class VPagination extends Vue {
  // Props
  circle: boolean;
  disabled: boolean;
  length: number;
  nextIcon: string;
  prevIcon: string;
  totalVisible?: number | string;
  value: number;
  pageAriaLabel: string;
  currentPageAriaLabel: string;
  previousAriaLabel: string;
  nextAriaLabel: string;
  wrapperAriaLabel: string;

  // Data
  maxButtons: number;
  selected: number | null;

  // Computed
  readonly classes: Record<string, boolean>;
  readonly items: Array<number | string>;

  // Methods
  init(): void;
  onResize(): void;
  next(event: Event): void;
  previous(event: Event): void;
  range(start: number, end: number): number[];
  genIcon(
    createElement: typeof Vue.prototype.$createElement,
    icon: string,
    disabled: boolean,
    clickHandler: (event: Event) => void,
    ariaLabel: string
  ): VNode;
  genItem(createElement: typeof Vue.prototype.$createElement, page: number): VNode;
  genItems(createElement: typeof Vue.prototype.$createElement): VNode[];
  genList(createElement: typeof Vue.prototype.$createElement, children: VNode[]): VNode;

  // Events
  $emit(event: 'input', page: number): this;
  $emit(event: 'next'): this;
  $emit(event: 'previous'): this;
}

/**
 * Type guard to check if an item is a page number
 */
export function isPageNumber(item: number | string): item is number;