/**
 * Corner Window Property Bar Controller Module
 * Handles property bar items and interactions for various corner window types
 */

declare module 'module_240792' {
  import { SignalHook } from 'HSCore.Util';
  
  /**
   * Window dimension field names
   */
  type WindowDimensionField = 'sideA' | 'sideB' | 'sideC' | 'sideD' | 'height' | 'elevation';
  
  /**
   * Range configuration for window dimensions
   */
  interface DimensionRange {
    min: number;
    max: number;
  }
  
  /**
   * Side range data for window validation
   */
  interface SideRangeData {
    sideARange: DimensionRange;
    sideBRange: DimensionRange;
    sideCRange: DimensionRange;
    sideDRange: DimensionRange;
  }
  
  /**
   * Window size properties
   */
  interface WindowSizeProps {
    sideA?: number;
    sideB: number;
    sideC: number;
    sideD?: number;
    height: number;
    elevation: number;
  }
  
  /**
   * Window parameters for editing operations
   */
  interface WindowParameters {
    sideA?: number;
    sideB?: number;
    sideC?: number;
    sideD?: number;
    height?: number;
    elevation?: number;
    indent?: number;
  }
  
  /**
   * Field change event data
   */
  interface FieldChangeEventData {
    oldValue: Record<string, unknown>;
    newValue: Record<string, unknown>;
    fieldName: string;
  }
  
  /**
   * Field change event
   */
  interface FieldChangeEvent {
    data?: FieldChangeEventData;
    target?: {
      fieldName: string;
    };
  }
  
  /**
   * Value change event detail
   */
  interface ValueChangeEventDetail {
    value: number;
  }
  
  /**
   * Value change event
   */
  interface ValueChangeEvent {
    detail: ValueChangeEventDetail;
  }
  
  /**
   * Controller callbacks for value changes
   */
  interface ControllerCallbacks {
    onValueChangeStart?: (value: number) => void;
    onValueChanged?: (event: ValueChangeEvent) => void;
    onValueChangeEnd?: (event: ValueChangeEvent) => void;
  }
  
  /**
   * Slider input validation rules
   */
  interface SliderInputRules {
    range: DimensionRange & {
      checkMax?: boolean;
    };
    positiveOnly: boolean;
  }
  
  /**
   * Slider input options
   */
  interface SliderInputOptions {
    rules: SliderInputRules;
    includeUnit: boolean;
    readOnly: boolean;
  }
  
  /**
   * Property bar item data configuration
   */
  interface PropertyBarItemData {
    label: string;
    name: string;
    options: SliderInputOptions;
    value: number;
    controller: FieldController | unknown;
    className?: string;
  }
  
  /**
   * Property bar item definition
   */
  interface PropertyBarItem {
    id: string;
    type: string;
    order: number;
    data: PropertyBarItemData;
  }
  
  /**
   * Property bar section grouping items
   */
  interface PropertyBarSection {
    id: string;
    label: string;
    items: PropertyBarItem[];
  }
  
  /**
   * Command manager interface for executing window operations
   */
  interface CommandManager {
    current?: {
      type: string;
      complete: () => void;
    };
    createCommand: (type: string, args: unknown[]) => unknown;
    execute: (command: unknown) => void;
    complete: (command: unknown) => void;
    receive: (action: string, data: { parameters: WindowParameters }) => void;
  }
  
  /**
   * Window resize options
   */
  interface ResizeOptions {
    targetSize?: boolean;
    preview?: boolean;
  }
  
  /**
   * Entity representing a corner window model
   */
  interface WindowEntity {
    host?: {
      height3d?: number;
      width?: number;
    };
    preViewParam?: Partial<WindowSizeProps>;
    sideA?: number;
    sideB: number;
    sideC: number;
    sideD?: number;
    height: number;
    elevation: number;
    indent?: number;
    signalFieldChanged: unknown;
    getSideRangeData: () => SideRangeData;
    getHost: () => { width: number } | unknown;
    getFrameThickness: () => number;
    instanceOf: (className: string) => boolean;
  }
  
  /**
   * Field controller that synchronizes entity field changes with UI
   */
  class FieldController {
    /**
     * Creates a field controller instance
     * @param entities - Array of window entities to monitor
     * @param fieldName - Name of the field to synchronize
     * @param callbacks - Callbacks for value change events
     */
    constructor(
      entities: WindowEntity[],
      fieldName: WindowDimensionField,
      callbacks: ControllerCallbacks
    );
    
    /** Array of entities being controlled */
    entities: WindowEntity[];
    
    /** Field name being synchronized */
    fieldName: WindowDimensionField;
    
    /** Internal signal hook for event management */
    private _contentSignalHook: SignalHook;
    
    /**
     * Handles entity field change events
     * @param event - Field change event data
     */
    onEntityFieldChange(event: FieldChangeEvent): void;
    
    /**
     * Deactivates the controller and cleans up listeners
     */
    deactive(): void;
  }
  
  /**
   * Corner window property bar controller
   * Manages property bar UI for different corner window types
   */
  export default class CornerWindowPropertyBarController {
    /**
     * Gets property bar items for the given entities (V2 implementation)
     * @param entities - Array of window entities
     * @param commandManager - Command manager for executing operations
     * @returns Array of property bar sections
     */
    getPropertyBarItemsV2_(entities: WindowEntity[], commandManager: CommandManager): PropertyBarSection[];
    
    /**
     * Handles parameter window size change events
     * @param commandManager - Command manager instance
     * @param parameters - New window parameters
     * @param value - Changed dimension value
     * @param field - Field name that changed
     * @param entity - Window entity being modified
     */
    onParameterWindowSizeChange(
      commandManager: CommandManager,
      parameters: WindowParameters,
      value: number,
      field: WindowDimensionField,
      entity: WindowEntity
    ): void;
    
    /**
     * Handles corner window field change events
     * @param event - Field change event
     * @param commandManager - Command manager instance
     * @param entities - Array of window entities
     * @param statusBar - Status bar update callback
     */
    onCornerWindowFieldChanged_(
      event: FieldChangeEvent,
      commandManager: CommandManager,
      entities: WindowEntity[],
      statusBar: { update: (items: unknown[]) => void }
    ): void;
    
    /**
     * Handles corner window flag change events
     * @param event - Flag change event
     * @param commandManager - Command manager instance
     * @param entities - Array of window entities
     * @param statusBar - Status bar update callback
     */
    onCornerWindowFlagChanged_(
      event: unknown,
      commandManager: CommandManager,
      entities: WindowEntity[],
      statusBar: unknown
    ): void;
    
    /**
     * Gets the maximum allowed height for a window
     * @param entity - Window entity to check
     * @returns Maximum height value
     */
    private _getMaxHeight(entity: WindowEntity): number;
    
    /**
     * Gets property bar items for corner window type
     * @param entities - Array of window entities
     * @param commandManager - Command manager instance
     * @returns Array of property bar sections
     */
    private _getPropertyBarItemsForCornerWindowV2(
      entities: WindowEntity[],
      commandManager: CommandManager
    ): PropertyBarSection[];
    
    /**
     * Gets property bar items for bay window type
     * @param entities - Array of window entities
     * @param commandManager - Command manager instance
     * @returns Array of property bar sections
     */
    private _getPropertyBarItemsForBayWindowV2(
      entities: WindowEntity[],
      commandManager: CommandManager
    ): PropertyBarSection[];
    
    /**
     * Gets property bar items for P-ordinary window type
     * @param entities - Array of window entities
     * @param commandManager - Command manager instance
     * @returns Array of property bar sections
     */
    private _getPropertyBarItemsForPOrdinaryWindowV2(
      entities: WindowEntity[],
      commandManager: CommandManager
    ): PropertyBarSection[];
    
    /**
     * Gets property bar items for corner flat window type
     * @param entities - Array of window entities
     * @param commandManager - Command manager instance
     * @returns Array of property bar sections
     */
    private _getPropertyBarItemsForCornerFlatWindowV2(
      entities: WindowEntity[],
      commandManager: CommandManager
    ): PropertyBarSection[];
    
    /**
     * Extracts value from event object
     * @param event - Value change event
     * @returns Extracted value or undefined
     */
    private _getEventValue(event: ValueChangeEvent): number | undefined;
    
    /**
     * Creates and executes an edit corner window command
     * @param parameters - Window parameters to apply
     * @param entity - Window entity to edit
     * @param commandManager - Command manager instance
     */
    private _createEditCornerWindowCmd(
      parameters: WindowParameters,
      entity: WindowEntity,
      commandManager: CommandManager
    ): void;
    
    /**
     * Handles edit corner window operation
     * @param parameters - Window parameters to apply
     * @param entity - Window entity to edit
     * @param commandManager - Command manager instance
     */
    private _onEditCornerWindow(
      parameters: WindowParameters,
      entity: WindowEntity,
      commandManager: CommandManager
    ): void;
    
    /**
     * Applies window parameters to all similar windows
     * @param parameters - Window parameters to apply
     * @param entity - Reference window entity
     */
    private _applyToAllWindow(parameters: WindowParameters, entity: WindowEntity): void;
    
    /**
     * Gets current size properties from entities
     * @param entities - Array of window entities
     * @returns Window size properties
     */
    private _getSizeProps(entities: WindowEntity[]): WindowSizeProps;
    
    /**
     * Resizes a corner window with specified parameters
     * @param value - New dimension value
     * @param field - Field name to resize
     * @param entity - Window entity to resize
     * @param commandManager - Command manager instance
     * @param options - Additional resize options
     */
    private _resizeCornerWindow(
      value: number,
      field: WindowDimensionField,
      entity: WindowEntity,
      commandManager: CommandManager,
      options?: ResizeOptions
    ): void;
    
    /**
     * Builds parameter object for corner window editing
     * @param value - New dimension value
     * @param field - Field name being changed
     * @param entity - Window entity being modified
     * @returns Window parameters object
     */
    private _getCornerWindowParams(
      value: number,
      field: WindowDimensionField,
      entity: WindowEntity
    ): WindowParameters;
    
    /**
     * Gets status bar items for the current selection
     * @param commandManager - Command manager instance
     * @param entities - Array of window entities
     * @returns Status bar items
     */
    private getStatusBarItems_(
      commandManager: CommandManager,
      entities: WindowEntity[]
    ): unknown[];
  }
}