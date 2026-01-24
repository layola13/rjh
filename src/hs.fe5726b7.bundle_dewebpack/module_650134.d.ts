/**
 * Custom dropdown component with editable variant support
 * Provides a jQuery-based dropdown widget with options management
 */

/**
 * Bounds/Position interface for dropdown popup
 */
interface DropdownBounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * Point coordinate interface
 */
interface Point {
  x: number;
  y: number;
}

/**
 * Rectangle bounds interface
 */
interface Rectangle {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/**
 * Dropdown option item configuration
 */
interface DropdownOption {
  /** Unique identifier for the option */
  id: string;
  /** Display label text */
  label?: string;
  /** Icon image URL */
  icon?: string;
  /** Icon URL shown on hover */
  iconHover?: string;
  /** Active state icon URL */
  iconActive?: string;
  /** Keyboard shortcut hint text */
  hotKey?: string;
  /** Whether the option is disabled */
  disabled?: 0 | 1;
  /** Whether to align label left */
  alignleft?: boolean;
  /** Right-side image URL */
  image?: string;
  /** Click handler for right-side image */
  imageclick?: (event: Event) => void;
  /** Item type for special rendering */
  itemtype?: 'editable' | 'divider' | 'normal';
  /** Placeholder text for editable items */
  placeholder?: string;
}

/**
 * Dropdown widget configuration options
 */
interface DropdownOptions {
  /** Unique identifier for the dropdown */
  id: string;
  /** Default selected option key */
  defaultKey?: string;
  /** Array of dropdown options */
  options: DropdownOption[];
  /** Prompt text shown when no option selected */
  prompt?: string;
  /** Title/tooltip text */
  title?: string;
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Callback when selected option changes */
  onchange?: (selectedKey: string) => void;
  /** Callback when popup opens */
  onopenpopup?: (data: { id: string; bound: DropdownBounds }) => void;
  /** Callback when popup closes */
  onclosepopup?: (data: { id: string }) => void;
  /** Fixed width in pixels */
  width?: number;
}

/**
 * jQuery widget interface extensions
 */
interface JQuery {
  cdropdown(options?: DropdownOptions | string): JQuery;
  editabledropdown(options?: DropdownOptions | string): JQuery;
  capture(selector: JQuery, eventType: string, handler: EventListener): void;
  unbindcapture(selector: JQuery, eventType: string, handler: EventListener): void;
}

/**
 * jQuery widget static interface
 */
interface JQueryStatic {
  widget(name: string, base: unknown, prototype: Record<string, unknown>): void;
  capture(selector: JQuery, eventType: string, handler: EventListener): void;
  unbindcapture(selector: JQuery, eventType: string, handler: EventListener): void;
}

/**
 * Global ResourceManager interface for SVG injection
 */
interface ResourceManager {
  injectSVGImage(element: HTMLElement): void;
}

declare const ResourceManager: ResourceManager;

/**
 * Standard dropdown component class
 * Wraps jQuery cdropdown widget for programmatic control
 */
declare class CDropDown {
  /** jQuery widget instance */
  instance: JQuery | undefined;
  
  /** Container DOM element wrapped in jQuery */
  container: JQuery | undefined;
  
  /** Configuration parameters */
  param: DropdownOptions | undefined;

  /**
   * Creates a new dropdown instance
   * @param element - DOM element or selector
   * @param options - Dropdown configuration options
   */
  constructor(element: string | HTMLElement, options: DropdownOptions);

  /**
   * Factory method to create dropdown instance
   * @param element - DOM element or selector
   * @param options - Dropdown configuration options
   * @returns New CDropDown instance
   */
  static create(element: string | HTMLElement, options: DropdownOptions): CDropDown;

  /**
   * Toggles the dropdown options popup visibility
   */
  toggleOptions(): void;

  /**
   * Destroys the dropdown widget and cleans up resources
   */
  destroy(): void;

  /**
   * Checks if provided options match current parameters
   * @param options - Options to compare
   * @returns True if title, prompt, and defaultKey match
   */
  isSame(options: DropdownOptions): boolean;

  /**
   * Updates dropdown with new options (recreates if changed)
   * @param options - New configuration options
   */
  update(options: DropdownOptions): void;
}

/**
 * Editable dropdown component class
 * Extends standard dropdown with inline editing capabilities
 */
declare class CEditableDropDown {
  /** Container DOM element wrapped in jQuery */
  container: JQuery;
  
  /** jQuery widget instance */
  instance: JQuery;
  
  /** Configuration parameters */
  param: DropdownOptions;

  /**
   * Creates a new editable dropdown instance
   * @param element - DOM element or selector
   * @param options - Dropdown configuration options
   */
  constructor(element: string | HTMLElement, options: DropdownOptions);

  /**
   * Toggles the dropdown options popup visibility
   */
  toggleOptions(): void;

  /**
   * Destroys the dropdown widget and cleans up resources
   */
  destroy(): void;

  /**
   * Updates dropdown with new options (always recreates)
   * @param options - New configuration options
   */
  update(options: DropdownOptions): void;
}

/**
 * Global declarations
 */
declare global {
  interface Window {
    CDropDown: typeof CDropDown;
    CEditableDropDown: typeof CEditableDropDown;
  }
}

export { CDropDown, CEditableDropDown, DropdownOptions, DropdownOption, DropdownBounds };