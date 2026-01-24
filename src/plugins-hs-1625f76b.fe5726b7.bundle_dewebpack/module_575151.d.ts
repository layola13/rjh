/**
 * Customized Light Slot Manager
 * Manages light slot configuration and property controls for customized modeling
 */

/**
 * Light slot dimension change event data
 */
export interface LightSlotSizeChangeData {
  /** Width of the light slot in centimeters */
  width?: number;
  /** Height of the light slot in centimeters */
  height?: number;
}

/**
 * Light slot parameters configuration
 */
export interface LightSlotParameters {
  /** Whether the light slot is flipped */
  flip: boolean;
  /** Whether the light slot has light band */
  hasLightBand: boolean;
  /** Width of the light slot in millimeters */
  width: number;
  /** Height of the light slot in millimeters */
  height: number;
  /** Path identifier for the light slot */
  path?: string;
  /** Additional options for the light slot */
  options?: Record<string, unknown>;
  /** Error code, -1 indicates no error */
  error?: number;
}

/**
 * Light slot entity response structure
 */
export interface LightSlotEntity {
  /** Get parameters configuration for the light slot */
  getParameters(): LightSlotParameters | { error: number };
}

/**
 * Value change event detail for slider inputs
 */
export interface SliderValueChangeEvent {
  detail: {
    /** The new value from the slider */
    value: number;
  };
}

/**
 * Property bar control item base structure
 */
export interface PropertyBarControlItem {
  /** Unique identifier for the control */
  id?: string;
  /** Control type from PropertyBarControlTypeEnum */
  type: string;
  /** Display order in the property bar */
  order: number;
  /** Whether the key should be unique */
  uniqueKey?: boolean;
  /** Configuration data for the control */
  data?: Record<string, unknown>;
  /** Custom render function for React components */
  getRenderItem?(): React.ReactElement;
}

/**
 * Radio button configuration
 */
export interface RadioButtonData {
  /** CSS class name */
  className: string;
  /** Display label */
  label: string;
  /** Button options with icon sources */
  btns: Array<{ src: [unknown, unknown] }>;
  /** Change handler callback */
  onchange(selectedIndex: number): void;
  /** Currently selected button index */
  selectedIndex: number;
}

/**
 * Toggle button configuration
 */
export interface ToggleButtonData {
  /** Display label */
  label: string;
  /** Text when checked */
  checkedChildren: string;
  /** Text when unchecked */
  unCheckedChildren: string;
  /** Current value */
  value: boolean;
  /** Value change handler */
  onValueChange(value: boolean): void;
}

/**
 * Slider input configuration
 */
export interface SliderInputData {
  /** Display label */
  label: string;
  /** Slider options */
  options: {
    /** Number of decimal digits to display */
    displayDigits: number;
    /** Whether to include unit in display */
    includeUnit: boolean;
    /** Whether the input is read-only */
    readOnly: boolean;
    /** Whether to start from minimum value */
    startFromMin: boolean;
    /** Tooltip text */
    tips: string;
    /** Validation rules */
    rules: {
      /** Value range constraints */
      range: {
        /** Minimum allowed value */
        min: number;
        /** Maximum allowed value */
        max: number;
      };
      /** Whether only positive values are allowed */
      positiveOnly: boolean;
    };
  };
  /** Current value */
  value: number;
  /** Handler called when value change starts */
  onValueChangeStart(event: SliderValueChangeEvent): void;
  /** Handler called during value change */
  onValueChange(event: SliderValueChangeEvent): void;
  /** Handler called when value change ends */
  onValueChangeEnd(event: SliderValueChangeEvent): void;
}

/**
 * Customized Light Slot Manager
 * Handles light slot property controls and user interactions
 */
export default class CustomizedLightSlotManager {
  /** Application instance reference */
  private readonly app: HSApp.App;
  
  /** Catalog plugin instance */
  private readonly catalogPlugin: HSFPConstants.Plugin;
  
  /** Command manager instance */
  private readonly cmdMgr: HSFPConstants.CommandManager;
  
  /** Signal dispatched when light slot size changes */
  public readonly lightSlotSizeChangeSignal: HSCore.Util.Signal<LightSlotSizeChangeData>;

  /**
   * Creates a new CustomizedLightSlotManager instance
   */
  constructor();

  /**
   * Get customized light slot property bar items
   * @param entity - The customized model entity containing light slots
   * @param lightSlotId - The identifier of the light slot to configure
   * @returns Array of property bar control items for the light slot configuration
   */
  getCustomizedLightSlotItems(
    entity: {
      getLightSlotEntityById(id: string): LightSlotEntity;
    } | null,
    lightSlotId: string
  ): PropertyBarControlItem[];
}