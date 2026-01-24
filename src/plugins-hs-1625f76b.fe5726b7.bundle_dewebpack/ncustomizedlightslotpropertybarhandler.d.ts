/**
 * NCustomizedLightSlotPropertyBarHandler
 * 
 * Handler for managing customized light slot properties in the property bar.
 * Provides UI controls for adjusting light slot dimensions, position, and light band settings.
 */

import type { App } from 'HSApp';
import type { CatalogPlugin } from 'HSFPConstants';
import type { CommandManager, Command } from 'HSApp.CommandManager';

/**
 * Parameters defining the dimensions of a light slot
 */
export interface LightSlotParameters {
  /** Width dimension (b-length) of the light slot */
  bLength: number;
  /** Height dimension (a-length) of the light slot */
  aLength: number;
}

/**
 * Entity representing a light slot in the scene
 */
export interface LightSlotEntity {
  /** Unique identifier for this light slot */
  lightSlotId: string;
  /** Dimensional parameters of the light slot */
  parameters: LightSlotParameters;
  /** Scene graph path to this entity */
  path: string;
  /** Child entities */
  children?: Record<string, LightSlotEntity>;
  /** Get self-hosted light bands attached to this slot */
  getSelfHostLightBand(): unknown[];
}

/**
 * Parent entity containing light slot children
 */
export interface ParentEntity {
  /** Map of child entities indexed by ID */
  children: Record<string, LightSlotEntity>;
}

/**
 * Value change event detail for slider inputs
 */
export interface ValueChangeEventDetail {
  detail: {
    /** New value from the slider */
    value: number;
  };
}

/**
 * Property bar item data for slider input controls
 */
export interface SliderInputData {
  /** Display label for the control */
  label: string;
  /** Configuration options for the slider */
  options: {
    /** Number of decimal places to display */
    displayDigits: number;
    /** Whether to show unit suffix */
    includeUnit: boolean;
    /** Validation rules */
    rules: {
      /** Min/max value constraints */
      range: {
        min: number;
        max: number;
      };
      /** Only allow positive values */
      positiveOnly: boolean;
    };
  };
  /** Current value */
  value: number;
  /** Callback when value change starts (drag begin) */
  onValueChangeStart: () => void;
  /** Callback during value change (dragging) */
  onValueChange: (event: ValueChangeEventDetail) => void;
  /** Callback when value change ends (drag end) */
  onValueChangeEnd: (event: ValueChangeEventDetail) => void;
}

/**
 * Property bar item data for check block controls
 */
export interface CheckBlockData {
  /** Display label for the control */
  label: string;
  /** Array of checkable blocks */
  blocks: Array<{
    /** Icon identifier */
    icon: string;
    /** Whether the block is checked */
    checked: boolean;
  }>;
  /** Callback when check state changes */
  onChange: () => void;
}

/**
 * Property bar item data for switch controls
 */
export interface SwitchData {
  /** Display label for the control */
  label: string;
  /** Text shown when switch is on */
  checkedChildren: string;
  /** Text shown when switch is off */
  unCheckedChildren: string;
  /** Current switch state */
  checked: boolean;
  /** Callback when switch state changes */
  onChange: (checked: boolean) => void;
}

/**
 * Base property bar item structure
 */
export interface PropertyBarItem {
  /** Unique identifier for this item */
  id: string;
  /** Parent item ID in the hierarchy */
  parentId?: string;
  /** Type of property bar control */
  type: string;
  /** Display order in the list */
  order?: number;
  /** Display label for grouped items */
  label?: string;
  /** Nested child items */
  items?: PropertyBarItem[];
  /** Control-specific data */
  data?: SliderInputData | CheckBlockData | SwitchData;
  /** Custom render function for complex items */
  getRenderItem?: () => React.ReactElement;
}

/**
 * Handler class for managing customized light slot property bar interactions.
 * Provides methods to generate property bar UI items and handle user input
 * for light slot editing operations.
 */
export declare class NCustomizedLightSlotPropertyBarHandler {
  /** Main application instance */
  private app: App;
  
  /** Catalog plugin for accessing scene entities */
  private catalogPlugin: CatalogPlugin;
  
  /** Command manager for executing and managing editing commands */
  private cmdMgr: CommandManager;

  /**
   * Initialize the handler with application references
   */
  constructor();

  /**
   * Generate property bar items for a customized light slot.
   * Creates UI controls for size adjustment, position flipping, and light band toggling.
   * 
   * @param parentEntity - The parent entity containing the light slot
   * @param lightSlotId - Unique identifier of the light slot to edit
   * @returns Array of property bar items for rendering in the UI, empty array if light slot not found
   */
  getNCustomizedLightSlotItems(
    parentEntity: ParentEntity,
    lightSlotId: string
  ): PropertyBarItem[];

  /**
   * Retrieve a light slot entity by its ID from a parent entity.
   * 
   * @param parentEntity - The parent entity to search within
   * @param lightSlotId - The ID of the light slot to find
   * @returns The matching light slot entity, or undefined if not found
   */
  getLightSlotEntityById(
    parentEntity: ParentEntity,
    lightSlotId: string
  ): LightSlotEntity | undefined;
}