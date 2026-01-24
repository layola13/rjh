/**
 * XML Layout Loader for Babylon.js GUI
 * Loads and parses XML files to create GUI control hierarchies
 */

import { Observable } from "core/Misc/observable";
import { Control } from "BABYLON.GUI";

/**
 * Node types enumeration for XML parsing
 */
interface NodeTypes {
  /** Element node type (value: 1) */
  element: number;
  /** Attribute node type (value: 2) */
  attribute: number;
  /** Text node type (value: 3) */
  text: number;
}

/**
 * Map of attribute names that require class-based values
 */
interface ObjectAttributesMap {
  /** Text horizontal alignment property */
  textHorizontalAlignment: number;
  /** Text vertical alignment property */
  textVerticalAlignment: number;
  /** Horizontal alignment property */
  horizontalAlignment: number;
  /** Vertical alignment property */
  verticalAlignment: number;
  /** Stretch property */
  stretch: number;
}

/**
 * XML Loader for Babylon.js GUI controls
 * Parses XML layouts and creates corresponding GUI element hierarchies
 */
export declare class XmlLoader {
  /**
   * Dictionary of parsed GUI nodes indexed by their ID
   */
  private _nodes: Record<string, Control>;

  /**
   * XML node type constants
   */
  private readonly _nodeTypes: NodeTypes;

  /**
   * Indicates whether the layout has been successfully loaded
   */
  private _isLoaded: boolean;

  /**
   * Attributes that require object/class values rather than primitives
   */
  private readonly _objectAttributes: ObjectAttributesMap;

  /**
   * Parent class context for resolving references
   */
  private _parentClass?: any;

  /**
   * Root node of the parsed GUI hierarchy
   */
  private _rootNode: Control | null;

  /**
   * Creates a new XmlLoader instance
   * @param parentClass - Optional parent class context for property resolution
   */
  constructor(parentClass?: any);

  /**
   * Resolves a chained property reference (e.g., "window.myObj.property")
   * @param chain - Dot-separated property path
   * @returns The resolved value
   */
  private _getChainElement(chain: string): any;

  /**
   * Retrieves a class attribute from Babylon.GUI namespace
   * @param attributePath - Dot-separated path to the attribute (e.g., "Control.HORIZONTAL_ALIGNMENT_LEFT")
   * @returns The class attribute value
   */
  private _getClassAttribute(attributePath: string): any;

  /**
   * Creates a GUI element from an XML node
   * @param xmlNode - XML element node to parse
   * @param parentControl - Parent control to attach to
   * @param shouldAddToParent - Whether to automatically add to parent (default: true)
   * @returns The created GUI control
   * @throws Error if element creation fails or duplicate ID is found
   */
  private _createGuiElement(
    xmlNode: Element,
    parentControl?: Control,
    shouldAddToParent?: boolean
  ): Control;

  /**
   * Parses a Grid element and its Row/Column structure
   * @param xmlNode - Grid XML element
   * @param gridControl - The Grid control instance
   * @param parentControl - Parent control context
   * @throws Error if grid structure is invalid
   */
  private _parseGrid(
    xmlNode: Element,
    gridControl: Control,
    parentControl?: Control
  ): void;

  /**
   * Parses a standard GUI element and its children
   * @param xmlNode - XML element to parse
   * @param control - The created control
   * @param parentControl - Parent control context
   */
  private _parseElement(
    xmlNode: Element,
    control: Control,
    parentControl?: Control
  ): void;

  /**
   * Prepares and processes a single element from a data source
   * @param xmlNode - Template XML element
   * @param control - Control instance
   * @param iteratorName - Variable name for the current item
   * @param dataSource - Source array or object
   * @param key - Current key/index in the data source
   */
  private _prepareSourceElement(
    xmlNode: Element,
    control: Control,
    iteratorName: string,
    dataSource: any[] | Record<string, any>,
    key: string | number
  ): void;

  /**
   * Parses elements generated from a dataSource attribute
   * @param xmlNode - XML element with dataSource attribute
   * @param control - Control instance
   * @param parentControl - Parent control context
   * @throws Error if dataSource syntax is invalid
   */
  private _parseElementsFromSource(
    xmlNode: Element,
    control: Control,
    parentControl?: Control
  ): void;

  /**
   * Recursively parses XML nodes and creates GUI hierarchy
   * @param xmlNode - Current XML node
   * @param parentControl - Parent control to attach children to
   * @param autoGenerateId - Whether to auto-generate IDs for children (default: false)
   */
  private _parseXml(
    xmlNode: Node,
    parentControl?: Control,
    autoGenerateId?: boolean
  ): void;

  /**
   * Checks if the layout has been loaded
   * @returns True if loaded, false otherwise
   */
  isLoaded(): boolean;

  /**
   * Retrieves a node by its ID
   * @param id - Unique identifier of the node
   * @returns The GUI control, or undefined if not found
   */
  getNodeById(id: string): Control | undefined;

  /**
   * Gets all parsed nodes
   * @returns Dictionary of all nodes indexed by ID
   */
  getNodes(): Record<string, Control>;

  /**
   * Disposes of the loader and all created controls
   */
  dispose(): void;

  /**
   * Loads an XML layout from a URL
   * @param url - URL of the XML layout file
   * @param rootControl - Root control to attach the layout to
   * @param onSuccess - Callback invoked on successful load
   * @param onError - Callback invoked on error with error message
   * @throws Error if XML is malformed and no error callback is provided
   */
  loadLayout(
    url: string,
    rootControl: Control,
    onSuccess?: (() => void) | null,
    onError?: ((error: string) => void) | null
  ): void;

  /**
   * Asynchronously loads an XML layout from a URL
   * @param url - URL of the XML layout file
   * @param rootControl - Root control to attach the layout to
   * @returns Promise that resolves when loading completes
   * @throws Error if loading or parsing fails
   */
  loadLayoutAsync(url: string, rootControl: Control): Promise<void>;
}