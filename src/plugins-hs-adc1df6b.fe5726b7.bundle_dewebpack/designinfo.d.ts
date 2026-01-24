/**
 * Design information module for managing design metadata and UI components
 * Handles design name editing, validation, and menu operations
 */

import type { HSCore } from './dependencies';
import type { HSApp } from './dependencies';
import type * as React from 'react';

/**
 * Configuration for menu item hotkeys
 */
interface HotkeyConfig {
  /** Windows/Linux keyboard shortcut */
  win: string;
  /** macOS keyboard shortcut */
  mac: string;
}

/**
 * Menu item definition for design operations
 */
interface MenuItem {
  /** Display label for the menu item */
  label: string;
  /** Optional keyboard shortcut configuration */
  hotkey?: HotkeyConfig;
  /** Click handler for the menu item */
  onClick: () => void;
  /** Optional function to determine if item should be disabled */
  disabled?: () => boolean | undefined;
}

/**
 * User tracking log entry
 */
interface LogEntry {
  /** Unique identifier for the tracking event */
  id: string;
  /** Human-readable description of the action */
  description: string;
  /** Optional trigger type classification */
  triggerType?: string;
}

/**
 * Design metadata structure
 */
interface DesignMetadata {
  /** Name of the design/project */
  designName: string;
  /** ID of the user who owns the design */
  userId: string;
}

/**
 * Signal event data for metadata changes
 */
interface SignalEventData<T = unknown> {
  /** Event payload data */
  data: T;
}

/**
 * Component state for DesignInfoComponent
 */
interface DesignInfoState extends DesignMetadata {
  /** Computed byte length of design name (CJK chars count as 2) */
  designNameLength: number;
  /** Whether design name editor is visible */
  showdesignName: boolean;
  /** Whether current design name has validation errors */
  designNameError: boolean;
  /** Whether dropdown menu is in hover state */
  isHover: boolean;
  /** Current validation error message to display */
  errorMsg: string;
}

/**
 * Props for DesignInfoComponent
 */
interface DesignInfoComponentProps {
  /** Whether the component should be disabled */
  disabled?: boolean;
  /** Callback when design data changes */
  onDataChange?: (key: string, value: string) => void;
  /** Current design name */
  designName: string;
  /** Current user ID */
  userId: string;
  /** Signal for state change notifications */
  signalChanged: HSCore.Util.Signal<DesignMetadata>;
}

/**
 * Plugin map type for accessing various plugins
 */
interface PluginMap {
  [HSFPConstants.PluginType.Persistence]: PersistencePlugin;
  [HSFPConstants.PluginType.EditDesign]: EditDesignPlugin;
  [HSFPConstants.PluginType.SignIn]: SignInPlugin;
  [HSFPConstants.PluginType.ShareCase]: ShareCasePlugin;
  [key: string]: Plugin;
}

/**
 * Base plugin interface
 */
interface Plugin {
  // Base plugin methods
}

/**
 * Persistence plugin for save operations
 */
interface PersistencePlugin extends Plugin {
  /** Trigger save-as operation */
  saveas(): void;
}

/**
 * Edit design plugin for managing design properties
 */
interface EditDesignPlugin extends Plugin {
  /** Show the design properties dialog */
  showDialog(): void;
}

/**
 * Sign-in plugin for user authentication
 */
interface SignInPlugin extends Plugin {
  // Sign-in specific methods
}

/**
 * Share case plugin for sharing designs
 */
interface ShareCasePlugin extends Plugin {
  /** Open share dialog */
  shareCase(): void;
}

/**
 * Main application interface
 */
interface Application {
  /** Design metadata manager */
  designMetadata: DesignMetadataManager;
  /** Plugin manager for accessing plugins */
  pluginManager: PluginManager;
  /** Command manager for operations */
  cmdManager: CommandManager;
  /** User tracking logger */
  userTrackLogger: UserTrackLogger;
  /** Signal dispatched when metadata changes */
  signalMetadataChanged: HSCore.Util.Signal<SignalEventData<Partial<DesignMetadata>>>;
  /** Signal dispatched when document opens */
  signalDocumentOpened: HSCore.Util.Signal<void>;
}

/**
 * Design metadata manager
 */
interface DesignMetadataManager {
  /** Get metadata value by key */
  get(key: string): string;
  /** Set metadata value by key */
  set(key: string, value: string): void;
  /** Persist metadata changes */
  flush(): void;
}

/**
 * Plugin manager for accessing plugins
 */
interface PluginManager {
  /** Get plugin instance by type identifier */
  getPlugin<T extends Plugin>(type: string): T | null;
}

/**
 * Command manager for canceling operations
 */
interface CommandManager {
  /** Cancel current command */
  cancel(): void;
}

/**
 * User tracking logger
 */
interface UserTrackLogger {
  /** Push tracking event */
  push(id: string, metadata: { description: string }, options: { triggerType?: string }): void;
}

/**
 * Minimum allowed design name length (in bytes, CJK chars count as 2)
 */
const MIN_DESIGN_NAME_LENGTH = 3;

/**
 * Maximum allowed design name length (in bytes, CJK chars count as 2)
 */
const MAX_DESIGN_NAME_LENGTH = 100;

/**
 * Default input width in pixels
 */
const DEFAULT_INPUT_WIDTH = 200;

/**
 * Maximum input width in pixels
 */
const MAX_INPUT_WIDTH = 520;

/**
 * Character width multiplier for calculating input width
 */
const CHAR_WIDTH_MULTIPLIER = 8;

/**
 * Base padding for input width calculation
 */
const INPUT_WIDTH_PADDING = 56;

/**
 * Threshold for using maximum input width
 */
const MAX_WIDTH_THRESHOLD = 58;

/**
 * ASCII character code boundary (characters above this are treated as wide)
 */
const ASCII_BOUNDARY = 127;

/**
 * Character code for caret (^) symbol
 */
const CARET_CHAR_CODE = 94;

/**
 * Byte count for wide characters (CJK, etc.)
 */
const WIDE_CHAR_BYTE_COUNT = 2;

/**
 * React component for displaying and editing design information
 * Provides design name editing with validation and dropdown menu for operations
 */
declare class DesignInfoComponent extends React.Component<DesignInfoComponentProps, DesignInfoState> {
  /** Menu items for dropdown */
  private _menuItems: MenuItem[];
  
  /** Reference to dropdown DOM element */
  private dropDownDom: HTMLElement | null;
  
  /** Reference to design info DOM element */
  private hsdesignInfoDom: HTMLElement | null;
  
  /** Flag to track first validation attempt */
  private firstPrint: boolean;

  constructor(props: DesignInfoComponentProps);

  /**
   * Log user tracking event
   * @param entry - Log entry with id, description, and optional trigger type
   */
  private log(entry: LogEntry): void;

  /**
   * Cleanup event listeners on unmount
   */
  componentWillUnmount(): void;

  /**
   * Compute byte length of design name (CJK characters count as 2 bytes)
   * @param name - Design name to measure
   * @returns Byte length of the name
   */
  private computedNameLength(name: string): number;

  /**
   * Handle clicks outside the component to close dropdown
   * @param event - Mouse event
   */
  private documentClicked(event: MouseEvent): void;

  /**
   * Handle click on design info element
   * @param event - React mouse event
   */
  private onHandleClick(event: React.MouseEvent<HTMLDivElement>): void;

  /**
   * Handle mouse over event
   */
  private onMouseOver(): void;

  /**
   * Handle mouse leave event
   */
  private onMouseLeave(): void;

  /**
   * Handle design name input changes
   * @param event - React change event from input
   */
  private onEditDesignName(event: React.ChangeEvent<HTMLInputElement>): void;

  /**
   * Update error message based on validation state
   * @param length - Current name length in bytes
   * @param hasSpaceError - Whether name has leading/trailing spaces
   */
  private updateErrorMsg(length: number, hasSpaceError: boolean): void;

  /**
   * Calculate input width based on content length
   * @param value - Input value
   * @returns Width in pixels
   */
  private _inputWidth(value: string): number;

  /**
   * Submit design name change
   */
  private onSubmitNameChange(): void;

  render(): React.ReactElement;
}

/**
 * Main DesignInfo class for managing design metadata and rendering
 * Handles synchronization between app state and UI component
 */
export declare class DesignInfo {
  /** Signal dispatched when design data changes */
  readonly signalChanged: HSCore.Util.Signal<DesignMetadata>;
  
  /** Reference to main application instance */
  private readonly app: Application;
  
  /** Whether the component is disabled */
  private readonly disabled: boolean;
  
  /** Sign-in plugin reference */
  private readonly signInPlugin: SignInPlugin;
  
  /** Signal hook for managing signal subscriptions */
  private readonly SignalHook: HSCore.Util.SignalHook;
  
  /** Current design metadata */
  private data: DesignMetadata;
  
  /** Callback for data changes */
  private onDataChange: (key: string, value: string) => void;

  /**
   * Create a new DesignInfo instance
   * @param app - Main application instance
   * @param plugins - Map of available plugins
   * @param disabled - Whether component should be disabled (default: false)
   */
  constructor(app: Application, plugins: PluginMap, disabled?: boolean);

  /**
   * Handle design metadata change events
   * @param event - Signal event containing changed metadata
   */
  private _onDesignMetadataChanged(event: SignalEventData<Partial<DesignMetadata>>): void;

  /**
   * Handle design document opened event
   */
  private _onDesignOpened(): void;

  /**
   * Get the React element to render
   * @returns React element for DesignInfo component
   */
  getRenderItem(): React.ReactElement<DesignInfoComponentProps>;

  /**
   * Update component state
   * @param state - Partial state to update
   */
  setState(state: Partial<DesignMetadata>): void;
}