/**
 * Status bar manager that wraps PropertyBar functionality.
 * Provides methods to control visibility, content, and lifecycle of a status bar component.
 * 
 * @module StatusBarManager
 */

/**
 * Configuration for a status bar control element
 */
export interface StatusBarControl {
  /** Unique identifier for the control */
  id: string;
  /** Type of control (e.g., 'button', 'label', 'input') */
  type?: string;
  /** Display text or content */
  content?: string;
  /** Additional control-specific properties */
  [key: string]: unknown;
}

/**
 * PropertyBar interface representing the underlying UI component
 */
export interface PropertyBar {
  /** Signal emitted when the bar needs to grow in size */
  signalSizeGrow: Signal;
  /** Signal emitted when the bar needs to shrink in size */
  signalSizeShrink: Signal;
  /** Retrieves a control element by its unique identifier */
  getControlById(id: string): StatusBarControl | null;
  /** Clears all controls from the bar */
  clear(): void;
  /** Shows the bar */
  show(): void;
  /** Hides the bar */
  hide(): void;
  /** Sets the controls to be displayed in the bar */
  setControls(controls: StatusBarControl[]): void;
}

/**
 * Signal type for size change events
 */
export type Signal = {
  /** Connects a callback to the signal */
  connect(callback: () => void): void;
  /** Disconnects a callback from the signal */
  disconnect(callback: () => void): void;
};

/**
 * Global PropertyBar factory
 */
declare const PropertyBar: {
  create(className: string): PropertyBar;
};

/**
 * Manages a status bar component with methods for controlling visibility and content.
 * Wraps PropertyBar to provide a simplified interface for status bar operations.
 */
export default class StatusBarManager {
  /** Internal PropertyBar instance */
  private readonly _propertyBar: PropertyBar;
  
  /** Signal emitted when the status bar needs to grow */
  public readonly signalSizeGrow: Signal;
  
  /** Signal emitted when the status bar needs to shrink */
  public readonly signalSizeShrink: Signal;

  constructor() {
    this._propertyBar = PropertyBar.create("statusBar unselectable");
    this.signalSizeGrow = this._propertyBar.signalSizeGrow;
    this.signalSizeShrink = this._propertyBar.signalSizeShrink;
  }

  /**
   * Retrieves a status bar control by its unique identifier.
   * 
   * @param id - The unique identifier of the control
   * @returns The control element, or null if not found
   */
  public getStatusBarControlById_(id: string): StatusBarControl | null {
    return this._propertyBar.getControlById(id);
  }

  /**
   * Clears all controls from the status bar and hides it.
   */
  public clear_(): void {
    this._propertyBar.hide();
    this._propertyBar.clear();
  }

  /**
   * Shows the status bar.
   */
  public show_(): void {
    this._propertyBar.show();
  }

  /**
   * Hides the status bar.
   */
  public hide_(): void {
    this._propertyBar.hide();
  }

  /**
   * Redraws the status bar with new controls.
   * Clears existing controls, sets new ones, and shows the bar.
   * 
   * @param controls - Array of control configurations to display
   */
  public redraw_(controls: StatusBarControl[]): void {
    this.clear_();
    this._propertyBar.setControls(controls);
    this._propertyBar.show();
  }
}