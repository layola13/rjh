/**
 * Privacy dropdown component for document visibility settings
 * @module PrivacyDropdown
 */

/**
 * Document status enumeration
 */
declare enum DocumentStatus {
  Public = 'public',
  Private = 'private'
}

/**
 * Privacy option configuration
 */
interface PrivacyOption {
  /** Unique identifier for the option */
  id: string;
  /** Display label for the option */
  label: string;
  /** Icon path or SVG content */
  icon: string;
  /** Associated document status */
  documentStatus: DocumentStatus;
}

/**
 * Callback function invoked when privacy status changes
 * @param status - The new document status
 */
type PrivacyChangeCallback = (status: DocumentStatus) => void;

/**
 * Privacy dropdown component for managing document visibility
 * Provides a UI control for selecting between public and private document states
 */
declare class PrivacyDropdown {
  /** The DOM container element for the dropdown */
  container: JQuery<HTMLElement>;
  
  /** Callback function triggered on status change */
  onChangeCallback: PrivacyChangeCallback | null;
  
  /** Available privacy options */
  options: PrivacyOption[] | null;
  
  /** Internal mouse up event handler reference */
  private privacyMouseUpHandler?: ((event: MouseEvent) => void) | null;

  /**
   * Creates a new PrivacyDropdown instance
   * @param container - jQuery element to render the dropdown into
   * @param onChangeCallback - Optional callback for status changes
   */
  constructor(container: JQuery<HTMLElement>, onChangeCallback?: PrivacyChangeCallback);

  /**
   * Factory method to create and initialize a privacy dropdown
   * @param container - jQuery element to render the dropdown into
   * @param defaultStatus - Initial document status to display
   * @param onChangeCallback - Optional callback for status changes
   * @returns Fully initialized PrivacyDropdown instance
   */
  static create(
    container: JQuery<HTMLElement>,
    defaultStatus: DocumentStatus,
    onChangeCallback?: PrivacyChangeCallback
  ): PrivacyDropdown;

  /**
   * Retrieves privacy options based on partner/tenant configuration
   * @returns Array of privacy options with tenant-specific customizations
   */
  static getOptionsFromPartner(): PrivacyOption[];

  /**
   * Initializes the options array with default or partner-specific values
   */
  setOptions(): void;

  /**
   * Generates and appends the HTML structure for the dropdown UI
   */
  buildHtml(): void;

  /**
   * Finds an option by its document status
   * @param status - The document status to search for
   * @returns Matching option or null if not found
   */
  getOptionByStatus(status: DocumentStatus): PrivacyOption | null;

  /**
   * Finds an option by its unique identifier
   * @param key - The option ID to search for
   * @returns Matching option or null if not found
   */
  getOptionByKey(key: string): PrivacyOption | null;

  /**
   * Sets the dropdown to display a specific status as selected
   * @param status - The document status to set as active
   */
  setDefaultStatus(status: DocumentStatus): void;

  /**
   * Attaches event listeners for user interactions
   */
  bindEvents(): void;

  /**
   * Collapses the dropdown menu
   */
  hideDropdown(): void;

  /**
   * Expands the dropdown menu
   */
  showDropdown(): void;

  /**
   * Registers a document-level click handler to close dropdown when clicking outside
   */
  addPrivacyMouseUpHandler(): void;

  /**
   * Removes the document-level click handler
   */
  removePrivacyMouseUpHandler(): void;

  /**
   * Lifecycle hook called when the container becomes visible
   */
  onContainerShow(): void;

  /**
   * Lifecycle hook called when the container becomes hidden
   */
  onContainerHide(): void;

  /**
   * Cleanup hook called when the component is removed from DOM
   */
  onRemoved(): void;
}

/**
 * Global window extension for PrivacyDropdown
 */
declare global {
  interface Window {
    /** Global PrivacyDropdown constructor */
    PrivacyDropdown: typeof PrivacyDropdown;
  }
}

export { PrivacyDropdown, PrivacyOption, PrivacyChangeCallback, DocumentStatus };