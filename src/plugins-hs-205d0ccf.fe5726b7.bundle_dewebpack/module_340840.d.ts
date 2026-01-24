/**
 * Button component with click lock mechanism
 * Provides a UI button with customizable appearance and behavior
 */

/**
 * Configuration data for button component
 */
export interface ButtonData {
  /** Button display label */
  label: string;
  /** Icon identifier or URL */
  icon: string;
  /** Hover state icon identifier or URL */
  iconhover: string;
  /** CSS class name for styling */
  styleName: string;
  /** Category classification for the button */
  catagory: string;
  /** Tooltip text shown on hover */
  tooltip: string;
  /** Visual line type style */
  lineType: string;
  /** Button width in pixels or CSS value */
  width?: number | string;
  /** Click event handler function */
  onclick: () => void;
  /** Whether button is in pressed/active state */
  isPressed: boolean;
  /** Click lock configuration - boolean enables default lock, or provide custom ClickLock instance */
  lock?: boolean | ClickLock;
}

/**
 * Click lock mechanism to prevent rapid repeated clicks
 * Temporarily disables the target after interaction
 */
export declare class ClickLock {
  /** Timeout duration in milliseconds before re-enabling */
  readonly timeout: number;

  /**
   * Creates a new click lock instance
   * @param timeout - Milliseconds to lock (default: 5000ms)
   */
  constructor(timeout?: number);

  /**
   * Locks (disables) the target element
   * @param target - Element with disable/enable methods
   */
  lock(target: Lockable): void;

  /**
   * Unlocks (re-enables) the target element
   * @param target - Element with disable/enable methods
   */
  unlock(target: Lockable): void;
}

/**
 * Interface for elements that can be locked/unlocked
 */
export interface Lockable {
  /** Disables the element */
  disable(): void;
  /** Enables the element */
  enable(): void;
}

/**
 * Button component constructor parameters
 */
export interface ButtonConfig extends Partial<ButtonData> {
  /** Unique identifier for the button */
  name: string;
}

/**
 * Base component class (imported from module 286787)
 */
export declare class BaseComponent {
  /** Component data storage */
  data: Record<string, any>;
  
  /** Sets component data */
  setData(data: Record<string, any>): void;
  
  /** Checks if component is enabled */
  isEnabled(): boolean;
  
  /** Disables the component */
  disable(): void;
  
  /** Enables the component */
  enable(): void;
}

/**
 * Button component types enumeration
 */
export declare enum ComponentType {
  button = "button"
}

/**
 * Button UI component with click handling and lock mechanism
 * Extends base component with button-specific functionality
 */
export default class Button extends BaseComponent implements Lockable {
  /** Component data with button-specific properties */
  data: ButtonData;

  /**
   * Creates a new button instance
   * @param config - Button configuration including name and optional properties
   * @param context - Parent context or container
   */
  constructor(config: ButtonConfig, context?: any);

  /**
   * Gets the component type identifier
   * @returns Always returns ComponentType.button
   */
  get type(): ComponentType;

  /**
   * Sets the pressed/active state of the button
   * @param pressed - True to mark as pressed, false otherwise
   */
  setPressed(pressed: boolean): void;

  /**
   * Updates the button label text
   * @param label - New label text to display
   */
  setLabel(label: string): void;

  /**
   * Handles button click interaction
   * - Checks if button is enabled
   * - Applies click lock if configured
   * - Invokes onclick handler
   * - Triggers parent click event
   */
  click(): void;

  /**
   * Disables the button (inherited from BaseComponent)
   */
  disable(): void;

  /**
   * Enables the button (inherited from BaseComponent)
   */
  enable(): void;

  /**
   * Checks if button is currently enabled (inherited from BaseComponent)
   */
  isEnabled(): boolean;
}

/**
 * HSCore utility namespace (global)
 */
declare global {
  namespace HSCore {
    namespace Util {
      namespace Object {
        /** Empty function placeholder */
        const nullFunction: () => void;
      }
    }
  }
}