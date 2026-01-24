import type { VNode } from 'vue';
import type { Route } from 'vue-router';

/**
 * Props interface for VTabsBar component
 */
export interface VTabsBarProps {
  /** Whether the tabs bar is in mobile mode */
  isMobile?: boolean;
  /** Whether to show navigation arrows */
  showArrows?: boolean;
  /** Whether at least one tab must be selected */
  mandatory?: boolean;
  /** Currently selected tab value */
  value?: any;
  /** Theme variant (light/dark) */
  dark?: boolean;
  light?: boolean;
}

/**
 * Computed properties for VTabsBar component
 */
export interface VTabsBarComputed {
  /** Combined CSS classes for the tabs bar */
  classes: Record<string, boolean>;
  /** Internal value tracking the selected tab */
  internalValue: any;
  /** Whether the component has completed initial boot */
  isBooted: boolean;
  /** Theme-related CSS classes */
  themeClasses: Record<string, boolean>;
  /** Array of tab items */
  items: VTabItem[];
}

/**
 * Individual tab item structure
 */
export interface VTabItem {
  /** Router destination path or object */
  to?: string | object;
  /** Whether the tab is active */
  isActive?: boolean;
  /** Tab value/identifier */
  value?: any;
  /** Whether the tab is disabled */
  disabled?: boolean;
}

/**
 * Methods available on VTabsBar component
 */
export interface VTabsBarMethods {
  /**
   * Triggers the slider animation to indicate active tab
   * Emits 'call:slider' event when component is booted
   */
  callSlider(): void;

  /**
   * Generates the content wrapper element for tabs
   * Adds 'v-tabs-bar__content' static class to the content
   * @returns VNode with updated data properties
   */
  genContent(): VNode;

  /**
   * Handles route changes to update tab selection
   * Clears selection if navigating away from all tab routes (when not mandatory)
   * @param newRoute - The new route being navigated to
   * @param oldRoute - The previous route
   */
  onRouteChange(newRoute: Route, oldRoute: Route): void;
}

/**
 * Data provided to descendant components via Vue's provide/inject
 */
export interface VTabsBarProvide {
  /** Reference to the tabs bar instance */
  tabsBar: VTabsBar;
}

/**
 * VTabsBar component instance type
 * A horizontal navigation component for organizing content into tabs
 * Extends BaseSlideGroup with themeable and SSR-bootable functionality
 */
export interface VTabsBar extends VTabsBarComputed, VTabsBarMethods {
  /** Component name identifier */
  readonly name: 'v-tabs-bar';
  
  /** Vue component props */
  $props: VTabsBarProps;
  
  /** Provide data to child components */
  provide(): VTabsBarProvide;
  
  /**
   * Vue render function
   * @param createElement - Vue's createElement function
   * @returns VNode with role="tablist" attribute
   */
  render(createElement: typeof VNode): VNode;
}

/**
 * VTabsBar component constructor
 */
declare const VTabsBar: {
  new (): VTabsBar;
  options: {
    name: string;
    computed: Record<keyof VTabsBarComputed, () => any>;
    methods: VTabsBarMethods;
    watch: {
      /** Watches items array changes to trigger slider update */
      items: string | (() => void);
      /** Watches internal value changes to trigger slider update */
      internalValue: string | (() => void);
      /** Watches route changes to handle tab selection */
      $route: string | ((newRoute: Route, oldRoute: Route) => void);
    };
    provide(): VTabsBarProvide;
    render(createElement: any): VNode;
  };
};

export default VTabsBar;