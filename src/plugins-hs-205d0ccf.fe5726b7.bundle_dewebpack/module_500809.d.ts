/**
 * Radio menu item component for HSCore menu system.
 * Extends the base MenuItem class to provide radio button functionality with grouping support.
 * @module RadioMenuItem
 */

import MenuItem from './MenuItem';

/**
 * Data structure for radio menu item configuration.
 */
export interface RadioMenuItemData {
  /** Display label text */
  label: string;
  /** Tooltip text shown on hover */
  tooltip: string;
  /** Radio group identifier - only one radio in a group can be checked */
  groupId: string;
  /** Icon URL or class name for default state */
  icon: string;
  /** Icon URL or class name for hover state */
  iconhover: string;
  /** Category classification for the menu item */
  catagory: string;
  /** Visual line type/style identifier */
  lineType: string;
  /** Current checked state of the radio button */
  isChecked: boolean;
  /** Callback invoked when checked state changes */
  onchange: (isChecked: boolean) => void;
  /** Internal callback to cancel other radios in the same group */
  cancelRadioStatus: (groupId: string) => void;
  /** Click handler callback */
  onclick?: () => void;
}

/**
 * Constructor parameters for RadioMenuItem.
 */
export interface RadioMenuItemOptions extends Partial<RadioMenuItemData> {
  /** Unique name identifier for the menu item */
  name: string;
}

/**
 * Radio button menu item component.
 * Supports grouping behavior where only one radio in a group can be selected at a time.
 * @extends MenuItem
 */
export default class RadioMenuItem extends MenuItem {
  /** Data object containing all radio menu item properties */
  data: RadioMenuItemData;

  /**
   * Creates a new radio menu item instance.
   * @param options - Configuration options including name and radio-specific properties
   * @param context - Parent context or container reference
   */
  constructor(options: RadioMenuItemOptions, context?: unknown);

  /**
   * Gets the menu item type identifier.
   * @returns The string 'radio'
   */
  get type(): 'radio';

  /**
   * Sets the checked state of the radio button.
   * If setting to true, automatically unchecks other radios in the same group.
   * @param checked - The desired checked state
   */
  setChecked(checked: boolean): void;

  /**
   * Cancels (unchecks) all other radio buttons in the specified group.
   * @param groupId - The radio group identifier
   */
  cancelRadioStatus(groupId: string): void;

  /**
   * Handles click events on the radio menu item.
   * Toggles the checked state and invokes the onclick callback if defined.
   */
  click(): void;

  /**
   * Updates the radio menu item data and triggers the onchange callback if checked state changed.
   * @param data - Partial data object to merge with existing data
   */
  setData(data: Partial<RadioMenuItemData>): void;

  /** Parent menu container reference with child items collection */
  parent: {
    childItems: MenuItem[];
  };
}