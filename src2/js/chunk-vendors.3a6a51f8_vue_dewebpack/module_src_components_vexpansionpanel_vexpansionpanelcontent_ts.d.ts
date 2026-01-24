/**
 * VExpansionPanelContent Component Type Definitions
 * 
 * A component that provides expandable/collapsible content within an expansion panel.
 * Manages content visibility and integrates with parent VExpansionPanel.
 */

import Vue from 'vue';
import { VNode, CreateElement } from 'vue';

/**
 * Interface for the expansion panel injected by parent component
 */
interface ExpansionPanelInjection {
  /**
   * Whether the expansion panel is currently active/expanded
   */
  isActive: boolean;
  
  /**
   * Register this content component with the parent panel
   * @param content - The content component instance
   */
  registerContent(content: Vue): void;
  
  /**
   * Unregister this content component from the parent panel
   */
  unregisterContent(): void;
}

/**
 * Props and methods mixed into VExpansionPanelContent from Bootable mixin
 */
interface Bootable {
  /**
   * Whether the component has been mounted at least once (for lazy content)
   */
  isBooted: boolean;
  
  /**
   * Conditionally renders content based on lazy loading state
   * @param renderFn - Function that returns the content to render
   * @returns The rendered content or empty array if not yet booted
   */
  showLazyContent(renderFn: () => VNode[]): VNode[];
}

/**
 * Props and methods mixed into VExpansionPanelContent from Colorable mixin
 */
interface Colorable {
  /**
   * The color to apply to the component
   */
  color?: string;
  
  /**
   * Applies background color to the provided data object
   * @param color - The color value to apply
   * @param data - The VNode data object to modify
   * @returns The modified data object with background color applied
   */
  setBackgroundColor(color: string | undefined, data: Record<string, any>): Record<string, any>;
}

/**
 * VExpansionPanelContent Component
 * 
 * Displays content within an expansion panel with expand/collapse transition.
 * Uses bootable mixin for lazy rendering and colorable for theming support.
 */
interface VExpansionPanelContent extends Vue, Bootable, Colorable {
  /**
   * Reference to the parent expansion panel injected via provide/inject
   */
  expansionPanel: ExpansionPanelInjection;
  
  /**
   * Computed property that returns whether this content should be visible
   * @returns True if the parent expansion panel is active
   */
  readonly isActive: boolean;
}

/**
 * VExpansionPanelContent Constructor
 */
declare const VExpansionPanelContent: {
  new (): VExpansionPanelContent;
};

export default VExpansionPanelContent;