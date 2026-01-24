/**
 * Property bar configuration and data management for the selection panel
 * Handles metadata, labels, and details for selected entities in the design environment
 */

import { HSCore } from './core-types';
import { HSCatalog } from './catalog-types';
import { HSFPConstants } from './constants';
import { HSApp } from './app-types';
import { HSPaveSDK } from './pave-sdk-types';

/**
 * Float item configuration for the property bar
 */
interface FloatItem {
  id: string;
  label?: string;
  value?: unknown;
}

/**
 * Information data structure containing metadata and other details
 */
interface InfoData {
  metadata?: HSCatalog.Metadata;
  [key: string]: unknown;
}

/**
 * Customized large view data structure
 */
interface CustomizedLargeViewData {
  [key: string]: unknown;
}

/**
 * Property bar configuration options
 */
interface PropertyBarConfig {
  /** Enable detailed information display */
  enableDetailsInfo?: boolean;
  /** Float items to display in the property bar */
  floatItems?: FloatItem[];
  /** Information data object */
  infoData?: InfoData;
  /** Whether the property bar is editable */
  editable?: boolean;
  /** Maximum length for text inputs */
  maxLength?: number;
  /** Callback when title changes */
  onTitleChange?: (newTitle: string) => void;
  /** Customized large view data */
  customizedLargeViewData?: CustomizedLargeViewData;
  /** Function to get customized large view data */
  getCustomizedLargeViewData?: () => CustomizedLargeViewData;
}

/**
 * Base class interface (assumed from context)
 */
interface BasePropertyBar {
  id?: string;
  label?: string;
}

/**
 * Customized product plugin interface
 */
interface CustomizedProductPlugin {
  getSelectedEntity(): unknown;
  getContentPartIds(): string[];
  getSelectedMeshName(): string;
}

/**
 * Property bar component for displaying and editing entity properties
 * Extends the base property bar functionality with metadata handling
 */
declare class PropertyBar extends BasePropertyBar {
  /** Information data containing metadata */
  infoData: InfoData;
  
  /** Additional data for the property bar */
  moreData?: unknown;
  
  /** Flag to enable detailed information display */
  enableDetailsInfo: boolean;
  
  /** Customized large view data */
  customizedLargeViewData?: CustomizedLargeViewData;
  
  /** Function to retrieve customized large view data */
  getCustomizedLargeViewData?: () => CustomizedLargeViewData;
  
  /** Float items displayed in the property bar */
  floatItems: FloatItem[];
  
  /** Type identifier for the property bar */
  type: string;
  
  /** Maximum length for input fields */
  maxLength: number;
  
  /** Whether the property bar is editable */
  editable: boolean;
  
  /** Callback invoked when the title changes */
  onTitleChange?: (newTitle: string) => void;
  
  /** Reference to the customized product plugin */
  customizedProductPlugin: CustomizedProductPlugin;

  /**
   * Creates a new PropertyBar instance
   * @param config - Configuration options for the property bar
   */
  constructor(config: PropertyBarConfig);

  /**
   * Sets the float items for the property bar
   * @param items - Array of float items to display
   */
  setFloatItems(items: FloatItem[]): void;

  /**
   * Initializes all data for the property bar
   * Sets up ID, label, and details information if enabled
   */
  initData(): void;

  /**
   * Initializes the unique ID for the property bar
   * Generates ID based on selected entity or uses default
   */
  initId(): void;

  /**
   * Initializes the label/title for the property bar
   * Determines appropriate label based on selected entity type
   */
  initLabel(): void;

  /**
   * Sets a custom label for the property bar
   * @param label - The label text to display
   */
  setLabel(label: string): void;

  /**
   * Enables or disables detailed information display
   * @param enable - True to enable details, false to disable (default: true)
   */
  setEnableDetailsInfo(enable?: boolean): void;

  /**
   * Initializes detailed information data
   * Retrieves and assigns metadata for the selected entity
   */
  initDetailsInfo(): void;

  /**
   * Retrieves metadata for the currently selected entity
   * Handles different entity types and environments
   * @returns Metadata object for the selected entity, or undefined if not found
   */
  setSelectedMeta(): HSCatalog.Metadata | undefined;

  /**
   * Extracts and formats material metadata
   * @param material - Material object to extract metadata from
   * @returns Formatted metadata object, or undefined if not available
   */
  setMaterialMeta(material: HSCore.Material): HSCatalog.Metadata | undefined;

  /**
   * Gets the highlighted mesh name for the current selection
   * Handles special cases for content part material replacement
   * @returns The mesh name, or undefined if not found
   */
  getHightMeshName(): string | undefined;
}

export default PropertyBar;