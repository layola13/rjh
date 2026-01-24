/**
 * Property bar handler for content manipulation in a 3D scene editor.
 * Provides controls for scaling, positioning, and configuring 3D content entities.
 */

/** Storage key for plugin settings */
declare const PLUGIN_STORAGE_KEY: string;

/** Minimum and maximum size constraint interface */
interface SizeRange {
  min: number;
  max: number;
  checkMin: boolean;
  checkMax: boolean;
}

/** Input control configuration options */
interface InputOptions {
  showTunningButtons?: boolean;
  rules?: {
    range?: SizeRange;
    positiveOnly?: boolean;
  };
  includeUnit?: boolean;
  readOnly?: boolean;
  maxCheck?: boolean;
  tips?: string;
}

/** 3D size dimensions */
interface Size3D {
  x: number;
  y: number;
  z: number;
}

/** Entity size properties including constraints */
interface EntitySizeProperties extends Size3D {
  /** Whether the entity can be scaled */
  isScalable: boolean;
  /** Minimum allowed size */
  minSize: Size3D;
  /** Maximum allowed size */
  maxsize: Size3D;
}

/** Axis identifier for resizing operations */
type AxisType = 'x' | 'y' | 'z';

/** Mapping of field names to axis types */
type FieldToAxisMap = {
  XScale: AxisType;
  YScale: AxisType;
  ZScale: AxisType;
  XLength: AxisType;
  YLength: AxisType;
  ZLength: AxisType;
};

/** Value change event detail */
interface ValueChangeEvent {
  detail: {
    value: number;
    oldValue?: number;
    newValue?: number;
  };
}

/** Controller callbacks for value changes */
interface ControllerCallbacks {
  onValueChangeStart?: (event: ValueChangeEvent) => void;
  onValueChanged?: (event: ValueChangeEvent) => void;
  onValueChangeEnd?: (event: ValueChangeEvent) => void;
}

/**
 * Controller that synchronizes UI inputs with entity field changes.
 * Monitors entity properties and updates the UI when values change.
 */
declare class EntityFieldController {
  /** Entities being controlled */
  readonly entities: HSCore.Model.Content[];
  
  /** Field names to monitor for changes */
  readonly fieldNames: string[];
  
  /**
   * Creates a field controller for multiple entities.
   * @param entities - Array of content entities to monitor
   * @param fieldNames - Property names to track (e.g., 'x', 'y', 'z', 'XScale')
   * @param callbacks - Callbacks for value change events
   */
  constructor(
    entities: HSCore.Model.Content[],
    fieldNames: string[],
    callbacks: ControllerCallbacks
  );
  
  /**
   * Handles entity field change events.
   * Updates the UI when monitored properties change.
   * @param event - Field change event from entity
   */
  onEntityFieldChange(event: { data: { fieldName: string; oldValue: number; newValue: number } }): void;
  
  /**
   * Deactivates the controller and cleans up signal listeners.
   */
  deactive(): void;
}

/** Property bar item data configuration */
interface PropertyBarItemData {
  label?: string;
  name?: string;
  className?: string;
  text?: string;
  options?: InputOptions;
  value?: number | boolean;
  controller?: EntityFieldController | ControllerCallbacks;
  normalSrc?: string;
  hoverSrc?: string;
  clickSrc?: string;
  tooltips?: string;
  tooltip?: string;
  labelPosition?: string;
  disabled?: boolean;
  status?: CCheckBox.StatusEnum;
  onclick?: (event: Event) => void;
  readOnly?: boolean;
}

/** Property bar UI control item */
interface PropertyBarItem {
  /** Unique identifier for the control */
  id: string;
  
  /** Type of control (slider, checkbox, button, etc.) */
  type: PropertyBarControlTypeEnum;
  
  /** Display order in the property bar */
  order: number;
  
  /** Control configuration data */
  data: PropertyBarItemData;
}

/** Command execution context for undo/redo operations */
interface CommandContext {
  /** Current active command */
  current?: {
    type: string;
  };
  
  /**
   * Creates a command instance.
   * @param type - Command type identifier
   * @param args - Command arguments
   * @returns Command object
   */
  createCommand(type: string, args: unknown[]): unknown;
  
  /**
   * Executes a command.
   * @param command - Command to execute
   * @param options - Execution options
   */
  execute(command: unknown, options?: Record<string, boolean>): void;
  
  /**
   * Completes the current command.
   * @param command - Optional command to complete
   */
  complete(command?: unknown): void;
  
  /**
   * Cancels the current command.
   */
  cancel(): void;
  
  /**
   * Sends a message to the command.
   * @param message - Message type
   * @param data - Message payload
   */
  receive(message: string, data?: unknown): void;
}

/**
 * Main property bar handler class.
 * Manages UI controls for content manipulation in the 3D editor.
 * Handles scaling, positioning, and property editing for selected entities.
 */
export default class ContentManipulationPropertyBarHandler {
  /** Active field controllers */
  protected controllers: EntityFieldController[];
  
  /** Handler for customized light slot properties */
  protected customizedLightSlotPropertyBarHandler: unknown;
  
  /** Handler for customized light band properties */
  protected CustomizedLightBandPropertyBarHandler: unknown;
  
  /** Utility for mix paint operations */
  protected MixPaintUtil?: unknown;
  
  /** Reference to the contextual tools plugin */
  protected contextualToolsPlugin: {
    willShowPropertyBarItemsForWeb(): boolean;
  };
  
  constructor();
  
  /**
   * Cleans up and deactivates all active controllers.
   */
  cleanControllers(): void;
  
  /**
   * Checks if mix paint utility is available and initializes it.
   * @returns True if MixPaintUtil is available
   */
  checkMixPaintUtil(): boolean;
  
  /**
   * Generates property bar items for selected entities.
   * @param entities - Selected content entities
   * @param commandContext - Command execution context
   * @param skipUnlockCheck - Skip scalability checks (default: false)
   * @returns Array of property bar control items
   */
  getPropertyBarItems_(
    entities: HSCore.Model.Content[],
    commandContext: CommandContext,
    skipUnlockCheck?: boolean
  ): PropertyBarItem[];
  
  /**
   * Shows a live hint for unlocked model limitations.
   * Displays a one-time tooltip about product purchase restrictions.
   */
  showLiveHintForUnlockModel(): void;
  
  /**
   * Creates unlock dimension button for locked models.
   * @param entities - Entities to unlock
   * @param currentScalable - Current scalable state
   * @returns Array containing unlock button item
   */
  unlockDim(entities: HSCore.Model.Content[], currentScalable?: boolean): PropertyBarItem[];
  
  /**
   * Sets the contextual tools plugin reference.
   * @param plugin - Contextual tools plugin instance
   */
  setContextualToolsPlugin_(plugin: unknown): void;
  
  /**
   * Handles content flag change events.
   * @param event - Flag change event
   * @param entities - Affected entities
   * @param commandContext - Command context
   * @returns Updated property bar items
   */
  onContentFlagChanged_(
    event: { data: { flag: HSCore.Model.ContentFlagEnum } },
    entities: HSCore.Model.Content[],
    commandContext: CommandContext
  ): PropertyBarItem[];
  
  /**
   * Gets property bar items for default scalable content.
   * Includes width, length, height controls with min/max constraints.
   * @param entities - Content entities
   * @param commandContext - Command context
   * @param skipUnlockCheck - Skip scalability checks
   * @returns Property bar items for default content
   */
  protected _getDefaultPropertyBarItems(
    entities: HSCore.Model.Content[],
    commandContext: CommandContext,
    skipUnlockCheck?: boolean
  ): PropertyBarItem[];
  
  /**
   * Gets property bar items for opening entities (windows, doors, holes).
   * @param entities - Opening entities
   * @param commandContext - Command context
   * @returns Property bar items for openings
   */
  protected _getOpeningPropertyBarItems(
    entities: HSCore.Model.Content[],
    commandContext: CommandContext
  ): PropertyBarItem[];
  
  /**
   * Checks if customized model properties should be forbidden.
   * @param entity - Entity to check
   * @returns True if properties should be read-only
   */
  isForbidCustomizedModelProperty(entity: HSCore.Model.Content): boolean;
  
  /**
   * Checks if current environment is customized feature model mode.
   * @returns True if in wall/ceiling platform environment
   */
  isCustomizedFeaturenModelEnv(): boolean;
  
  /**
   * Gets property bar items for fixed thickness content (e.g., curtains).
   * Only length and height are editable; thickness is locked.
   * @param entities - Fixed thickness entities
   * @param commandContext - Command context
   * @returns Property bar items for fixed thickness content
   */
  protected _getFixedThicknessPropertyBarItems(
    entities: HSCore.Model.Content[],
    commandContext: CommandContext
  ): PropertyBarItem[];
  
  /**
   * Builds input control options with validation rules.
   * @param checkMin - Enable minimum value validation
   * @param checkMax - Enable maximum value validation
   * @param editable - Whether input is editable
   * @param min - Minimum allowed value
   * @param max - Maximum allowed value
   * @param maxCheck - Additional max constraint flag
   * @param tips - Tooltip or help text
   * @returns Input configuration object
   */
  protected _getInputOptions(
    checkMin: boolean,
    checkMax: boolean,
    editable: boolean,
    min: number,
    max?: number,
    maxCheck?: boolean,
    tips?: string
  ): InputOptions;
  
  /**
   * Creates reset to default size button.
   * @param entities - Entities to reset
   * @param commandContext - Command context
   * @returns Array containing reset button item
   */
  protected _setDefaultScale(
    entities: HSCore.Model.Content[],
    commandContext: CommandContext
  ): PropertyBarItem[];
  
  /**
   * Creates proportions lock checkbox control.
   * Allows toggling between locked and unlocked aspect ratios.
   * @param entities - Entities to lock/unlock
   * @param commandContext - Command context
   * @returns Array containing lock checkbox item
   */
  protected _getProportionsLockBtn(
    entities: HSCore.Model.Content[],
    commandContext: CommandContext
  ): PropertyBarItem[];
  
  /**
   * Resets locked status flags for entities.
   * @param entities - Entities to reset
   */
  protected _resetLockedStatus(entities: HSCore.Model.Content[]): void;
  
  /**
   * Checks if elevation input should be read-only.
   * @param entities - Entities to check
   * @returns True if elevation cannot be edited
   */
  protected _isElevationReadOnly(entities: HSCore.Model.Content[]): boolean;
  
  /**
   * Handles entity field change events from the model.
   * @param event - Field change event
   * @param entities - Affected entities
   * @param commandContext - Command context
   * @returns Updated property bar items if field is monitored
   */
  onContentFieldChanged_(
    event: { target: { fieldName: string } },
    entities: HSCore.Model.Content[],
    commandContext: CommandContext
  ): PropertyBarItem[];
  
  /**
   * Moves content to a specific elevation (z-axis position).
   * @param elevation - Target z-coordinate
   * @param entities - Entities to move
   * @param commandContext - Command context
   */
  protected _moveContent(
    elevation: number,
    entities: HSCore.Model.Content[],
    commandContext: CommandContext
  ): void;
  
  /**
   * Resizes content entities along a specific axis.
   * @param value - New size value
   * @param axis - Axis to resize ('x', 'y', or 'z')
   * @param entities - Entities to resize
   * @param commandContext - Command context
   */
  protected _resizeContents(
    value: number | undefined,
    axis: AxisType,
    entities: HSCore.Model.Content[],
    commandContext: CommandContext
  ): void;
  
  /**
   * Gets property bar items for customized molding.
   * @param parent - Parent entity
   * @param moldingId - Molding identifier
   * @returns Property bar items for molding
   */
  getCustomizedMoldingItems(parent: HSCore.Model.Content, moldingId: string): PropertyBarItem[];
}