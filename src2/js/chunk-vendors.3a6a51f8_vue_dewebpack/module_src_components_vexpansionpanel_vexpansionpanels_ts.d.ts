/**
 * VExpansionPanels Component Type Definitions
 * 
 * A component that contains and manages multiple expansion panels.
 * Extends BaseItemGroup to provide item group functionality.
 */

import { VueConstructor } from 'vue';
import { BaseItemGroup } from '../VItemGroup/VItemGroup';

/**
 * Props interface for VExpansionPanels component
 */
export interface VExpansionPanelsProps {
  /** Enable accordion mode - only one panel can be open at a time */
  accordion?: boolean;
  /** Disable all expansion panels */
  disabled?: boolean;
  /** Remove elevation and border radius */
  flat?: boolean;
  /** Add hover effect to panels */
  hover?: boolean;
  /** Make panels focusable via keyboard navigation */
  focusable?: boolean;
  /** Reduce the width of panels and add margin */
  inset?: boolean;
  /** Add popout effect when panel is active */
  popout?: boolean;
  /** Make panels read-only (cannot be toggled) */
  readonly?: boolean;
  /** Remove border radius from panels */
  tile?: boolean;
}

/**
 * Computed properties interface for VExpansionPanels
 */
export interface VExpansionPanelsComputed {
  /** CSS classes applied to the component root element */
  classes: Record<string, boolean>;
}

/**
 * Methods interface for VExpansionPanels
 */
export interface VExpansionPanelsMethods {
  /**
   * Update the active state of an expansion panel item
   * @param item - The expansion panel item to update
   * @param index - The index of the item in the panels array
   */
  updateItem(item: ExpansionPanelItem, index: number): void;
}

/**
 * Provide/Inject interface for child components
 */
export interface VExpansionPanelsProvide {
  /** Reference to parent VExpansionPanels instance */
  expansionPanels: VExpansionPanelsInstance;
}

/**
 * Expansion panel item interface
 */
export interface ExpansionPanelItem {
  /** Whether this panel is currently active/open */
  isActive: boolean;
  /** Whether the next panel in sequence is active */
  nextIsActive: boolean;
}

/**
 * VExpansionPanels component instance type
 */
export type VExpansionPanelsInstance = InstanceType<typeof VExpansionPanels> & {
  $attrs: Record<string, unknown>;
  value: boolean[] | number[];
  getValue(item: ExpansionPanelItem, index: number): boolean;
  toggleMethod(value: boolean): boolean;
};

/**
 * VExpansionPanels Vue Component
 * 
 * @example
 *