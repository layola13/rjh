/**
 * Help Plugin Module
 * Manages the help bar system, hotkeys, and command bindings in the application.
 * Original Module ID: 100766
 */

import type { Signal, SignalHook } from 'HSCore.Util';
import type { Application } from './Application';
import type { Plugin, PluginMap } from './Plugin';
import type { UserInputPlugin } from './UserInputPlugin';
import type { Helpbar } from './Helpbar';
import type { HelpbarItem } from './HelpbarItem';
import type { HelpbarItemType } from './HelpbarItemType';
import type React from 'react';

/**
 * Event data for helpbar item added signal
 */
interface HelpbarItemAddedEventData {
  /** The newly added helpbar item */
  addedItem: HelpbarItem;
}

/**
 * Event data for helpbar item removed signal
 */
interface HelpbarItemRemovedEventData {
  /** The removed helpbar item */
  removedItem: HelpbarItem;
}

/**
 * Signal event wrapper with target and data
 */
interface SignalEvent<T> {
  /** The event target (usually the helpbar) */
  target: Helpbar;
  /** The event payload data */
  data: T;
}

/**
 * Hotkey definition structure
 */
interface HotkeyDefinition {
  /** The helpbar item associated with this hotkey */
  item: HelpbarItem;
  /** The hotkey combination string (e.g., "Ctrl+H") */
  hotkey: string;
  /** Handler function invoked when hotkey is triggered */
  handler: (event: KeyboardEvent) => void;
}

/**
 * Data structure for helpbar items
 */
interface HelpbarItemData {
  /** Command type(s) associated with this item, comma-separated */
  command?: string;
  /** Hotkey combination for this item */
  hotkey?: string;
  /** Whether to register the hotkey automatically */
  registerHotkey?: boolean;
}

/**
 * Help Plugin - Manages help bar UI, hotkeys, and command mappings
 * 
 * This plugin provides:
 * - Help bar rendering and state management
 * - Hotkey registration and handling
 * - Command to helpbar item mapping
 * - Dynamic item updates based on application state
 */
export declare class Help implements Plugin {
  /**
   * Plugin initialization order (higher numbers load later)
   */
  readonly order: 900;

  /**
   * Reference to the main application instance
   * @private
   */
  private readonly _app: Application;

  /**
   * Whether the help bar is currently visible
   * @private
   */
  private _isShowing: boolean;

  /**
   * The active helpbar instance
   * @private
   */
  private _helpbar: Helpbar | null;

  /**
   * Flag indicating if UI needs re-rendering
   * @private
   */
  private _dirty: boolean;

  /**
   * Map of helpbar IDs to their registered hotkey definitions
   * @private
   */
  private readonly _hotkeysByHelpbarId: Map<string, HotkeyDefinition[]>;

  /**
   * Map of command types to associated helpbar items
   * Allows multiple items to respond to the same command
   * @private
   */
  private readonly _helpbarItemByCommandType: Map<string, HelpbarItem[]>;

  /**
   * Signal hook for managing event subscriptions
   * @private
   */
  private readonly _signalHook: SignalHook;

  /**
   * Signal dispatched when help UI needs to refresh
   * @private
   */
  private readonly _signalRefreshHelpUi: Signal<void>;

  /**
   * Reference to the user input plugin for handling interactions
   * @private
   */
  private readonly _userInputPlugin: UserInputPlugin;

  /**
   * Creates a new Help plugin instance
   * @param app - The main application instance
   * @param plugins - Map of available plugins
   */
  constructor(app: Application, plugins: PluginMap);

  /**
   * Initialize the help plugin
   * Sets up default helpbar with standard items
   * @private
   */
  private init(): void;

  /**
   * Retrieve a helpbar item by its ID
   * @param itemId - The unique identifier of the item
   * @returns The helpbar item, or undefined if not found
   * @private
   */
  private getItem_(itemId: string): HelpbarItem | undefined;

  /**
   * Add a new item to the active helpbar
   * @param itemId - Unique identifier for the new item
   * @param itemData - Configuration data for the item
   * @returns The created helpbar item, or undefined if no active helpbar
   * @private
   */
  private addItem_(itemId: string, itemData: HelpbarItemData): HelpbarItem | undefined;

  /**
   * Remove an item from the active helpbar
   * @param itemId - The ID of the item to remove
   * @private
   */
  private removeItem_(itemId: string): void;

  /**
   * Update data for multiple helpbar items
   * @param itemIds - Array of item IDs to update
   * @param data - New data to apply to the items
   * @private
   */
  private updateItems_(itemIds: string[], data: Partial<HelpbarItemData>): void;

  /**
   * Create and register a new helpbar
   * @param name - Unique name for the helpbar
   * @param items - Initial items to populate the helpbar
   * @private
   */
  private addHelpbar_(name: string, items: HelpbarItem[]): void;

  /**
   * Handle a newly added helpbar
   * Registers all items, sets up event listeners, and activates the helpbar
   * @param helpbar - The helpbar instance to handle
   * @private
   */
  private _handleHelpbarAdded(helpbar: Helpbar): void;

  /**
   * Recursively iterate over all items in a helpbar tree
   * @param rootItem - The root item to start iteration from
   * @param callback - Function called for each item
   * @param context - The `this` context for the callback
   * @private
   */
  private _forEachItem(
    rootItem: HelpbarItem,
    callback: (item: HelpbarItem) => void,
    context?: unknown
  ): void;

  /**
   * Handler for helpbar item added signal
   * @param event - Signal event containing the added item
   * @private
   */
  private _onHelpbarItemAdded(event: SignalEvent<HelpbarItemAddedEventData>): void;

  /**
   * Handler for helpbar item removed signal
   * @param event - Signal event containing the removed item
   * @private
   */
  private _onHelpbarItemRemoved(event: SignalEvent<HelpbarItemRemovedEventData>): void;

  /**
   * Process a newly added helpbar item
   * Registers commands and hotkeys as needed
   * @param item - The item that was added
   * @param helpbar - The helpbar containing the item
   * @private
   */
  private _handleItemAdded(item: HelpbarItem, helpbar: Helpbar): void;

  /**
   * Process a removed helpbar item
   * Unregisters commands and hotkeys
   * @param item - The item that was removed
   * @param helpbar - The helpbar that contained the item
   * @private
   */
  private _handleItemRemoved(item: HelpbarItem, helpbar: Helpbar): void;

  /**
   * Register a hotkey for a helpbar item
   * @param item - The item to register a hotkey for
   * @param helpbar - The helpbar containing the item
   * @private
   */
  private _handleItemHotKeyAdd(item: HelpbarItem, helpbar: Helpbar): void;

  /**
   * Unregister a hotkey for a helpbar item
   * @param item - The item to unregister the hotkey from
   * @param helpbar - The helpbar containing the item
   * @private
   */
  private _handleItemHotKeyRemove(item: HelpbarItem, helpbar: Helpbar): void;

  /**
   * Check if a hotkey has already been registered
   * @param hotkeyList - List of registered hotkeys
   * @param hotkeyDef - Hotkey definition to check
   * @returns True if the hotkey is already registered
   * @private
   */
  private _itemHotKeyHasAdded(hotkeyList: HotkeyDefinition[], hotkeyDef: HotkeyDefinition): boolean;

  /**
   * Register a hotkey with the application's hotkey manager
   * @param hotkeyDef - The hotkey definition to register
   * @private
   */
  private _registerHotkey(hotkeyDef: HotkeyDefinition): void;

  /**
   * Create a hotkey definition from a helpbar item
   * @param item - The helpbar item
   * @returns A hotkey definition object
   * @private
   */
  private _getHotkeyDef(item: HelpbarItem): HotkeyDefinition;

  /**
   * Handler called when any helpbar item changes
   * Triggers a re-render if the help bar is visible
   * @private
   */
  private _onHelpbarItemChanged(): void;

  /**
   * Trigger a re-render of the help UI
   * @private
   */
  private _render(): void;

  /**
   * Get the React element for rendering the help bar
   * @returns A React element representing the help bar UI
   */
  getRenderItem(): React.ReactElement;
}