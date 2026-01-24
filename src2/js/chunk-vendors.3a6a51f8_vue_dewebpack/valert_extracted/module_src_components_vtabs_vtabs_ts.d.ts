/**
 * VTabs Component Type Definitions
 * A tabs component with sliding indicator and support for vertical/horizontal layouts
 */

import Vue, { VNode, VNodeDirective } from 'vue';
import { PropType } from 'vue';

/**
 * Slider position and dimensions
 */
interface SliderState {
  /** Height of the slider */
  height: number | null;
  /** Left position of the slider */
  left: number | null;
  /** Right position of the slider */
  right: number | null;
  /** Top position of the slider */
  top: number | null;
  /** Width of the slider */
  width: number | null;
}

/**
 * Parsed slot nodes
 */
interface ParsedNodes {
  /** Tab button nodes */
  tab: VNode[];
  /** Custom slider node */
  slider: VNode | null;
  /** VTabsItems wrapper node */
  items: VNode | null;
  /** VTabItem content nodes */
  item: VNode[];
}

/**
 * VTabs component data
 */
interface VTabsData {
  /** Timeout ID for resize debouncing */
  resizeTimeout: number;
  /** Current slider state */
  slider: SliderState;
  /** Transition duration in milliseconds */
  transitionTime: number;
}

/**
 * VTabs component props
 */
interface VTabsProps {
  /** Custom active class for selected tab */
  activeClass?: string;
  /** Align tabs with toolbar title */
  alignWithTitle?: boolean;
  /** Background color of the tabs bar */
  backgroundColor?: string;
  /** Center the active tab */
  centerActive?: boolean;
  /** Center all tabs */
  centered?: boolean;
  /** Make tabs fixed width */
  fixedTabs?: boolean;
  /** Make tabs grow to fill available space */
  grow?: boolean;
  /** Height of the tabs bar */
  height?: number | string;
  /** Hide the slider indicator */
  hideSlider?: boolean;
  /** Use larger tabs for icons and text */
  iconsAndText?: boolean;
  /** Mobile breakpoint for responsive behavior */
  mobileBreakpoint?: string | number;
  /** Icon for next button */
  nextIcon?: string;
  /** Make tab selection optional */
  optional?: boolean;
  /** Icon for previous button */
  prevIcon?: string;
  /** Align tabs to the right */
  right?: boolean;
  /** Show/hide navigation arrows */
  showArrows?: boolean | string;
  /** Color of the slider indicator */
  sliderColor?: string;
  /** Size (height) of the slider indicator */
  sliderSize?: number | string;
  /** Display tabs vertically */
  vertical?: boolean;
  /** Text color of the tabs */
  color?: string;
  /** Apply dark theme */
  dark?: boolean;
  /** Apply light theme */
  light?: boolean;
  /** Current active tab value (v-model) */
  value?: unknown;
}

/**
 * VTabs component computed properties
 */
interface VTabsComputed {
  /** Combined CSS classes for the component */
  classes: Record<string, boolean>;
  /** Whether tabs are in reversed order (RTL + vertical) */
  isReversed: boolean;
  /** Inline styles for the slider indicator */
  sliderStyles: {
    height: string | undefined;
    left: string | undefined;
    right: string | undefined;
    top: string | undefined;
    transition: string | null;
    width: string | undefined;
  };
  /** Computed color with fallback logic */
  computedColor: string;
  /** Internal value for v-model */
  internalValue: unknown;
  /** Theme classes from themeable mixin */
  themeClasses: Record<string, boolean>;
  /** Whether dark mode is active */
  isDark: boolean;
  /** Whether app-level dark mode is active */
  appIsDark: boolean;
}

/**
 * VTabs component methods
 */
interface VTabsMethods {
  /**
   * Calculate and update slider position based on active tab
   * @returns Whether the slider was updated
   */
  callSlider(): boolean;

  /**
   * Generate the tabs bar element
   * @param tabs - Array of tab button nodes
   * @param slider - Custom slider node
   * @returns VNode for the tabs bar
   */
  genBar(tabs: VNode[], slider: VNode | null): VNode;

  /**
   * Generate the tab items container
   * @param items - Custom VTabsItems node
   * @param itemNodes - Array of VTabItem nodes
   * @returns VNode for the items container or null
   */
  genItems(items: VNode | null, itemNodes: VNode[]): VNode | null;

  /**
   * Generate the slider indicator element
   * @param slider - Custom slider node
   * @returns VNode for the slider wrapper
   */
  genSlider(slider: VNode | null): VNode | null;

  /**
   * Handle window resize events
   */
  onResize(): void;

  /**
   * Parse default slot nodes into categorized groups
   * @returns Object containing categorized slot nodes
   */
  parseNodes(): ParsedNodes;

  /**
   * Set text color utility from colorable mixin
   */
  setTextColor(color: string, data: Record<string, unknown>): void;

  /**
   * Set background color utility from colorable mixin
   */
  setBackgroundColor(color: string, data: Record<string, unknown>): void;
}

/**
 * VTabs Component
 * 
 * A material design tabs component with support for:
 * - Horizontal and vertical orientations
 * - Sliding indicator animation
 * - Navigation arrows for overflow
 * - Responsive behavior
 * - RTL support
 * - Custom styling and theming
 * 
 * @example
 * <v-tabs v-model="activeTab">
 *   <v-tab>Tab 1</v-tab>
 *   <v-tab>Tab 2</v-tab>
 *   <v-tab-item>Content 1</v-tab-item>
 *   <v-tab-item>Content 2</v-tab-item>
 * </v-tabs>
 */
declare const VTabs: {
  new (): Vue & VTabsProps & VTabsComputed & VTabsMethods & {
    $data: VTabsData;
  };
};

export default VTabs;