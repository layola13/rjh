/**
 * HTML resource response interface
 * Represents the XML/HTML resource loaded from the server
 */
interface ResourceResponse {
  /**
   * Converts the resource content to HTML string
   * @returns HTML string representation of the resource
   */
  html(): string;
}

/**
 * jQuery-like DOM element interface
 * Represents a DOM manipulation object with jQuery-style methods
 */
interface DOMElement {
  /**
   * Appends content to the DOM element
   * @param content - HTML string or DOM element to append
   * @returns The DOM element for chaining
   */
  append(content: string | HTMLElement): DOMElement;
}

/**
 * Module initializer interface
 * Default export for initialization modules
 */
interface ModuleInitializer {
  /**
   * Initializes the module with optional configuration
   * @param config - Optional configuration object for initialization
   */
  init(config?: unknown): void;
}

/**
 * Resource loader callback type
 * Callback invoked when XML resource is successfully loaded
 */
type ResourceCallback = (response: ResourceResponse) => void;

/**
 * XML Resource Loader
 * Fetches XML/HTML resources from the server asynchronously
 * 
 * @param resourcePath - Path or identifier for the XML resource
 * @param callback - Callback function invoked with the loaded resource
 * @param selector - CSS selector or class name for the target element (e.g., ".advancedSnapshotHolder")
 */
declare function getXMLResource(
  resourcePath: string,
  callback: ResourceCallback,
  selector: string
): void;

/**
 * Module: module_init
 * Original ID: init
 * 
 * Advanced snapshot module initialization function
 * Loads XML resources and initializes dependent modules
 * 
 * @param this - Context object with DOM manipulation methods
 * @param config - Configuration parameter passed to the second initializer
 * 
 * @remarks
 * This function performs the following steps:
 * 1. Loads XML resource using getXMLResource
 * 2. Appends the loaded HTML to the DOM via this._$()
 * 3. Initializes the first default module (a.default)
 * 4. Initializes the second module (i.default) with provided config
 */
declare function moduleInit(
  this: { _$(): DOMElement },
  config: unknown
): void;

/**
 * First module initializer (referenced as 'a.default' in original code)
 */
declare const firstModule: ModuleInitializer;

/**
 * Second module initializer (referenced as 'i.default' in original code)
 */
declare const secondModule: ModuleInitializer;

export {
  type ResourceResponse,
  type DOMElement,
  type ModuleInitializer,
  type ResourceCallback,
  getXMLResource,
  moduleInit,
  firstModule,
  secondModule
};