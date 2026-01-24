/**
 * Room Style processor module for EZHome catalog management
 * Handles room style attributes and their integration with the catalog system
 */

/**
 * Attribute value representation
 */
interface AttributeValue {
  /** Unique identifier for the attribute value */
  id: string;
  /** Display value/name */
  value: string;
}

/**
 * Catalog attribute definition
 */
interface CatalogAttribute {
  /** Unique identifier for the attribute */
  id: string;
  /** Display name of the attribute */
  name: string;
  /** Available values for this attribute */
  values: AttributeValue[];
}

/**
 * Filtered attribute with selected values
 */
interface FilteredAttribute {
  /** Attribute ID */
  id: string;
  /** Attribute name */
  name: string;
  /** Selected attribute values */
  values: AttributeValue[];
}

/**
 * Room style configuration object
 */
interface RoomStyleCode {
  /** Unique code identifier */
  code: string;
  /** Display name for the room style */
  name: string;
}

/**
 * Design metadata attributes
 */
interface DesignAttributes {
  /** Style information */
  style?: {
    /** Style code identifier */
    code: string;
  };
}

/**
 * Customized UI result container for room styles
 */
interface CustomizedUIResultContainer {
  /** Selected room style ID or "ezhome_room_style_none" */
  ezhomeRoomStyle?: string;
}

/**
 * Server request data structure
 */
interface ServerRequestData {
  /** Array of attributes to send to server */
  attributes: FilteredAttribute[];
}

/**
 * Signal data for styler template
 */
interface StylerTemplateSignalData {
  /** Custom UI container */
  customizedUIResultContainer?: CustomizedUIResultContainer;
  /** Data to be sent to server */
  dataToServer: ServerRequestData;
}

/**
 * Signal object with typed data
 */
interface Signal<T> {
  /** Signal payload data */
  data: T;
}

/**
 * Signal listener interface
 */
interface SignalEmitter<T> {
  /**
   * Register a listener for this signal
   * @param callback - Function to call when signal is emitted
   */
  listen(callback: (signal: Signal<T>) => void): void;
}

/**
 * Catalog manager interface
 */
interface CatalogManager {
  /**
   * Retrieve a catalog attribute by name
   * @param attributeName - Name of the attribute to retrieve
   * @returns Promise resolving to the attribute or undefined
   */
  getAttribute(attributeName: string): Promise<CatalogAttribute | undefined>;
}

/**
 * Design metadata store
 */
interface DesignMetadata {
  /**
   * Get metadata value by key
   * @param key - Metadata key
   * @returns Metadata value or undefined
   */
  get(key: "attributes"): DesignAttributes | undefined;
  get(key: string): unknown;
}

/**
 * Meta processor function type
 */
type MetaProcessor = (metadata: unknown, context: unknown) => unknown;

/**
 * Catalog builder interface
 */
interface HSCatalogBuilder {
  /**
   * Register a meta processor
   * @param processor - Processing function
   */
  addMetaProcessor(processor: MetaProcessor): void;
}

/**
 * Global HSCatalog namespace
 */
declare namespace HSCatalog {
  /** Catalog builder instance */
  export const Builder: HSCatalogBuilder;
}

/**
 * Resource manager for internationalized strings
 */
declare namespace ResourceManager {
  /**
   * Get a localized string by key
   * @param key - Resource key
   * @returns Localized string
   */
  export function getString(key: string): string;
}

/**
 * Room style processor configuration
 */
interface RoomStyleProcessorConfig {
  /** Attribute name for room styles */
  roomStyleAttrName: string;
  /** Value representing "no style" */
  roomStyleNone: string;
}

/**
 * Room style processor class
 */
declare class RoomStyleProcessor {
  /**
   * Create a new room style processor
   * @param config - Processor configuration
   */
  constructor(config: RoomStyleProcessorConfig);

  /**
   * Set the room style attribute ID
   * @param attributeId - The attribute ID to set
   */
  setRoomStyleAttributeId(attributeId: string): void;

  /**
   * Process metadata for room styles
   * @param metadata - Metadata to process
   * @param context - Processing context
   * @returns Processed result
   */
  process(metadata: unknown, context: unknown): unknown;
}

/**
 * Customized UI component interface
 */
declare class CustomizedUIComponent {
  /**
   * Create UI component from room style codes
   * @param roomStyles - Array of room style configurations
   */
  constructor(roomStyles: RoomStyleCode[]);
}

/**
 * Facet interface for filtering
 */
interface Facet {
  /**
   * Add a facet by attribute ID
   * @param attributeId - Attribute ID to add as facet
   */
  addFacet(attributeId: string): void;
}

/**
 * Main context object containing catalog and design data
 */
interface Context {
  /** Catalog manager instance */
  catalogManager: CatalogManager;
  /** Design metadata store */
  designMetadata: DesignMetadata;
  /** Signal emitted when sending styler template */
  signalSendingStylerTemplate: SignalEmitter<StylerTemplateSignalData>;
  /**
   * Add a customized UI component to the editing panel
   * @param component - UI component to add
   */
  addEditingPanelCustomizedUI(component: CustomizedUIComponent): void;
}

/**
 * Main module export function
 * Initializes room style processing and UI components
 * 
 * @param context - Application context with catalog and design metadata
 * @param facet - Facet interface for filtering (optional)
 */
export default function initializeRoomStyles(
  context: Context,
  facet?: Facet
): void;