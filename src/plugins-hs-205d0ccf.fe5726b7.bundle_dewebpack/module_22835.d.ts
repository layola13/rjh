/**
 * Teaching Ability Plugin Module
 * 
 * This module provides teaching ability functionality for the HSApp plugin system.
 * It manages teaching UI components, model dialogs, and reminders.
 */

import { HSApp } from './hsapp';
import { Logger } from './logger';
import { TeachingAbilityButtonOptions } from './teaching-ability-button-options';

/**
 * Theme configuration for teaching ability button
 */
export type ButtonTheme = 'primary' | 'secondary' | 'default';

/**
 * General theme type
 */
export type Theme = 'light' | 'dark';

/**
 * Module identifier type
 */
export type ModuleId = string;

/**
 * Options for displaying the teaching ability button
 */
export interface GetTeachingAbilityButtonOptions {
  /** Button visual theme */
  buttonTheme?: ButtonTheme;
  /** Overall UI theme */
  theme?: Theme;
  /** Module identifier */
  module?: ModuleId;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Options for showing the teaching model
 */
export interface ShowModelOptions {
  /** Module identifier to show teaching content for */
  module: ModuleId;
}

/**
 * Options for showing reminders
 */
export interface ShowRemindOptions {
  /** Reminder message or configuration */
  message?: string;
  /** Duration in milliseconds */
  duration?: number;
  /** Reminder type */
  type?: 'info' | 'warning' | 'success' | 'error';
}

/**
 * Options for closing reminders
 */
export interface CloseRemindOptions {
  /** Reminder identifier to close */
  id?: string;
  /** Whether to close all reminders */
  all?: boolean;
}

/**
 * Environment configuration for teaching ability
 */
export interface EnvConfig {
  /** Environment-specific settings */
  [key: string]: unknown;
}

/**
 * Handle class for managing teaching ability functionality
 */
export declare class TeachingAbilityHandle {
  /**
   * Initialize the teaching ability handle
   */
  init(): void;

  /**
   * Get the teaching ability button component
   * @param options - Button configuration options
   * @returns Button component or null if unavailable
   */
  getTeachingAbilityButton(options: GetTeachingAbilityButtonOptions): React.ReactElement | null;

  /**
   * Show the teaching model dialog
   * @param options - Model display options
   */
  showModel(options: ShowModelOptions): void;

  /**
   * Close the teaching model dialog
   */
  closeModel(): void;

  /**
   * Show a teaching reminder notification
   * @param options - Reminder display options
   */
  showRemind(options: ShowRemindOptions): void;

  /**
   * Close a teaching reminder notification
   * @param options - Reminder close options
   */
  closeRemind(options: CloseRemindOptions): void;

  /**
   * Register environment-specific configuration
   * @param envId - Environment identifier
   * @param config - Configuration object
   */
  registerEnvConfig(envId: string, config: EnvConfig): void;
}

/**
 * Teaching Ability Plugin
 * 
 * Main plugin class that extends IPlugin to provide teaching ability features.
 * Manages teaching UI components, dialogs, and integrates with page header and left menu.
 */
export declare class TeachingAbilityPlugin extends HSApp.Plugin.IPlugin {
  /**
   * Handle instance for managing teaching functionality
   */
  private handle: TeachingAbilityHandle;

  /**
   * Logger instance for tracking plugin activity
   */
  private logger: Logger;

  /**
   * Constructor
   * Initializes the plugin with dependencies on PageHeader and LeftMenu plugins
   */
  constructor();

  /**
   * Called when the plugin is activated
   * @param app - Application instance
   * @param plugins - Map of dependent plugins
   */
  onActive(app: HSApp.App, plugins: Record<string, HSApp.Plugin.IPlugin>): void;

  /**
   * Called when the plugin is deactivated
   */
  onDeactive(): void;

  /**
   * Initialize the teaching ability functionality
   */
  init(): void;

  /**
   * Get the teaching ability button component
   * @param options - Button configuration options
   * @returns Button component or null if in HXRR mode or unavailable
   */
  getTeachingAbilityButton(options: GetTeachingAbilityButtonOptions): React.ReactElement | null;

  /**
   * Get the TeachingAbilityButtonOptions class
   * @returns TeachingAbilityButtonOptions constructor
   */
  getTeachingAbilityButtonOptions(): typeof TeachingAbilityButtonOptions;

  /**
   * Show the teaching model dialog
   * @param options - Model display options
   */
  showModel(options: ShowModelOptions): void;

  /**
   * Close the teaching model dialog
   */
  closeModel(): void;

  /**
   * Show a teaching reminder notification
   * @param options - Reminder display options
   */
  showRemind(options: ShowRemindOptions): void;

  /**
   * Close a teaching reminder notification
   * @param options - Reminder close options
   */
  closeRemind(options: CloseRemindOptions): void;

  /**
   * Reset the plugin to its initial state
   * Re-initializes all components and event listeners
   */
  resetPlugin(): void;

  /**
   * Register environment-specific configuration
   * @param envId - Environment identifier
   * @param config - Configuration object for the environment
   */
  registerEnvConfig(envId: string, config: EnvConfig): void;
}

/**
 * Global constants namespace
 */
declare namespace HSFPConstants {
  /**
   * Plugin type identifiers
   */
  enum PluginType {
    TeachingAbility = 'TeachingAbility',
    PageHeader = 'PageHeader',
    LeftMenu = 'LeftMenu',
    Guide = 'Guide'
  }
}

export { HSFPConstants };