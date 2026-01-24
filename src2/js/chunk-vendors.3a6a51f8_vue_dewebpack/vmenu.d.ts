/**
 * VMenu Component Module
 * 
 * This module exports the VMenu component as both named and default export.
 * VMenu is a menu component that provides dropdown/popup menu functionality.
 * 
 * @module VMenu
 * @packageDocumentation
 */

/**
 * VMenu Component
 * 
 * A reusable menu component for creating dropdown menus, context menus,
 * or navigation menus with customizable options and behavior.
 * 
 * @public
 */
export declare class VMenu {
  /**
   * Creates an instance of VMenu
   * 
   * @param options - Configuration options for the menu component
   */
  constructor(options?: VMenuOptions);
}

/**
 * Configuration options for VMenu component
 * 
 * @public
 */
export interface VMenuOptions {
  /**
   * The trigger element or selector for opening the menu
   */
  trigger?: string | HTMLElement;
  
  /**
   * Menu items configuration
   */
  items?: VMenuItem[];
  
  /**
   * Position of the menu relative to trigger
   */
  position?: 'top' | 'bottom' | 'left' | 'right';
  
  /**
   * Additional CSS classes for styling
   */
  className?: string;
}

/**
 * Menu item configuration
 * 
 * @public
 */
export interface VMenuItem {
  /**
   * Display label for the menu item
   */
  label: string;
  
  /**
   * Unique identifier for the menu item
   */
  id?: string;
  
  /**
   * Click handler for the menu item
   */
  onClick?: (event: MouseEvent) => void;
  
  /**
   * Whether the menu item is disabled
   */
  disabled?: boolean;
}

/**
 * Default export of VMenu component
 * 
 * @public
 */
export default VMenu;