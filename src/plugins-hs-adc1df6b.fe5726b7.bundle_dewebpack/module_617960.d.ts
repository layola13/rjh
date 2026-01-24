/**
 * Button toolbar item component
 * Represents a clickable button element in the toolbar with label, icon, and press state
 */

import ToolbarItem from './ToolbarItem';
import { ToolbarItemType } from './ToolbarItemType';

/**
 * Configuration options for creating a button
 */
export interface ButtonConfig {
  /** Unique identifier for the button */
  name: string;
  /** Display text for the button */
  label?: string;
  /** Icon identifier or CSS class */
  icon?: string;
  /** Button width in pixels or CSS unit */
  width?: number | string;
  /** Click event handler */
  onclick?: () => void;
  /** Whether the button is in pressed/active state */
  isPressed?: boolean;
}

/**
 * Internal data structure for button state
 */
interface ButtonData {
  label: string;
  icon: string;
  width?: number | string;
  onclick: () => void;
  isPressed: boolean;
}

/**
 * Button toolbar item class
 * Extends ToolbarItem to provide button-specific functionality
 */
export default class Button extends ToolbarItem<ButtonData> {
  /**
   * Creates a new Button instance
   * @param config - Button configuration object
   * @param context - Optional context parameter passed to parent constructor
   */
  constructor(config: ButtonConfig, context?: unknown) {
    const { name, ...restConfig } = config;
    
    super(name, context);
    
    // Initialize default button data
    Object.assign(this.data, {
      label: '',
      icon: '',
      width: undefined,
      onclick: () => {}, // HSCore.Util.Object.nullFunction equivalent
      isPressed: false
    });
    
    // Apply user-provided configuration
    this.setData(restConfig as Partial<ButtonData>);
  }
  
  /**
   * Returns the type identifier for this toolbar item
   */
  get type(): ToolbarItemType {
    return ToolbarItemType.button;
  }
  
  /**
   * Sets the pressed/active state of the button
   * @param pressed - True to set button as pressed, false otherwise
   */
  setPressed(pressed: boolean): void {
    this.setData({
      isPressed: pressed
    });
  }
  
  /**
   * Updates the button label text
   * @param label - New label text to display
   */
  setLabel(label: string): void {
    this.setData({
      label
    });
  }
  
  /**
   * Triggers the button's click handler
   * Executes the onclick callback function
   */
  click(): void {
    this.data.onclick();
  }
}