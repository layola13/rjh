/**
 * Custom Property Panel Module
 * Provides UI components for displaying and managing geometric modeling commands
 */

/** Command types supported by the property panel */
type CommandType =
  | "command_line"
  | "command_arch"
  | "command_fillet"
  | "command_rect"
  | "command_circle"
  | "command_polygon"
  | "command_molding"
  | "command_sweep"
  | "command_group"
  | "command_lineraid"
  | "command_radioraid";

/** Configuration item for property panel */
interface PropertyPanelItem {
  /** Display order (defaults to 1000 + index if not specified) */
  order?: number;
  /** Additional properties for the item */
  [key: string]: unknown;
}

/** Label button configuration */
interface LabelButtonConfig {
  /** Associated command */
  command: CommandType;
  /** Whether to show label button */
  labelButton: boolean;
  /** Tip messages to display */
  tips?: Array<{ data: string }>;
  /** Cancel callback */
  onCancel?: () => void;
  /** Apply callback */
  onApply?: () => void;
}

/** Property panel initialization data */
interface PropertyPanelData {
  /** Whether to show the panel */
  show: boolean;
  /** Command identifier */
  command: CommandType;
  /** Close callback */
  onClose?: () => void;
  /** Cancel operation callback */
  onCancel?: () => void;
  /** Apply operation callback */
  onApply?: () => void;
  /** Next operation callback */
  onNext?: () => void;
  /** Label button configuration */
  labelButton?: boolean | LabelButtonConfig;
}

/** Configuration for updating property panel */
interface PropertyPanelUpdateConfig {
  /** Whether to show the panel */
  show?: boolean;
  /** Command identifier */
  command?: CommandType;
  /** Property items to display */
  items?: PropertyPanelItem[];
  /** Label button configuration */
  labelButton?: boolean | LabelButtonConfig;
  /** Cancel operation callback */
  onCancel?: () => void;
  /** Apply operation callback */
  onApply?: () => void;
  /** Next operation callback */
  onNext?: () => void;
}

/**
 * Property Panel Manager
 * Manages the lifecycle and state of the custom modeling property panel
 */
declare class PropertyPanelManager {
  /** Singleton instance */
  private static instance: React.Component | undefined;
  
  /** Root DOM element reference */
  private static _rootElement: HTMLElement | undefined;

  /**
   * Creates and initializes the property panel
   * @param config - Initial configuration data
   */
  static create(config: PropertyPanelData): void;

  /**
   * Updates the property panel state
   * @param config - Updated configuration
   */
  static update(config: PropertyPanelUpdateConfig): void;

  /**
   * Updates a single input field value
   * @param elementId - DOM element ID
   * @param value - New value (will be converted to absolute value and scaled by 10)
   * @param skipProcessing - If true, skips value transformation
   */
  static updateInputValue(
    elementId: string,
    value: string | number,
    skipProcessing?: boolean
  ): void;

  /**
   * Updates multiple input fields from comma-separated values
   * @param elementIds - Array of DOM element IDs
   * @param values - Comma-separated string of values (e.g., "10, 20, 30")
   * @param skipProcessing - If true, skips value transformation
   */
  static updateMultInputValue(
    elementIds: string[],
    values: string,
    skipProcessing?: boolean
  ): void;
}

export default PropertyPanelManager;