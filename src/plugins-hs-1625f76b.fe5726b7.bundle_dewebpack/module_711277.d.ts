/**
 * Content Styler Plugin Module
 * Handles application of materials and styles to doors, windows, and openings
 */

import type HSCore from 'hscore';
import type { App } from './app';
import type { Plugin } from './plugin';
import type { Entity, Door, Window } from './model';
import type { CommandManager, TransactionManager } from './managers';

/**
 * Dependencies required for ContentStylerPlugin initialization
 */
interface PluginDependencies {
  [HSFPConstants.PluginType.ContextualTools]: Plugin;
  [HSFPConstants.PluginType.PropertyBar]: Plugin;
  [HSFPConstants.PluginType.Toolbar]: Plugin;
  [HSFPConstants.PluginType.Catalog]: Plugin;
  [HSFPConstants.PluginType.LeftMenu]: Plugin;
  [HSFPConstants.PluginType.RightMenu]: Plugin;
  [HSFPConstants.PluginType.ViewSwitch]: Plugin;
  [HSFPConstants.PluginType.PageHeader]: Plugin;
  ['hsw.plugin.resizewidget.Plugin']: Plugin;
}

/**
 * Initialization configuration for ContentStylerPlugin
 */
interface ContentStylerInitConfig {
  app: App;
  dependencies: PluginDependencies;
}

/**
 * Property bar item data structure
 */
interface PropertyBarItem {
  id: string;
  label: string;
  className: string;
  isApplyToAllBtnCard: boolean;
  items: PropertyBarControl[];
}

/**
 * Property bar button control
 */
interface PropertyBarControl {
  id: string;
  type: PropertyBarControlTypeEnum;
  order: number;
  data: {
    className: string;
    icon: string;
    text: string;
    disabled: boolean;
    onclick: (event: Event) => void;
  };
}

/**
 * Event data for populating right property bar
 */
interface PopulateRightPropertyBarEvent {
  data: {
    rightPropertyItems: PropertyBarItem[];
  };
}

/**
 * Property bar control type enumeration
 */
declare enum PropertyBarControlTypeEnum {
  button = 'button',
  dropdown = 'dropdown',
  input = 'input'
}

/**
 * Style applicator interface
 */
interface Styler {
  /**
   * Applies style from template entity to target entity
   */
  applyStyle(targetEntity: Entity): void;
  
  /**
   * Cleans up resources after style application
   */
  cleanUp(): void;
}

/**
 * Signal hook utility for event handling
 */
declare class SignalHook {
  constructor(context: unknown);
}

/**
 * Content Styler Plugin
 * Manages geometry material application to doors, windows, and openings
 */
declare class ContentStylerPlugin {
  /**
   * Application instance
   */
  app: App;
  
  /**
   * Signal hook for event management
   */
  private _signalHook: SignalHook;
  
  /**
   * ID of the environment from which styler was activated
   */
  private _fromEnvironmentId: string | undefined;
  
  /**
   * Template entity used as style source
   */
  private _templateEntity: Entity | undefined;
  
  constructor();
  
  /**
   * Initializes the plugin with application and dependencies
   * @param config - Initialization configuration
   */
  init(config: ContentStylerInitConfig): void;
  
  /**
   * Gets the current template entity
   * @returns The template entity or undefined
   */
  getTemplateEntity(): Entity | undefined;
  
  /**
   * Sets the template entity to use as style source
   * @param entity - Entity to use as template
   */
  setTemplateEntity(entity: Entity): void;
  
  /**
   * Registers commands with the command manager
   */
  registerCommands(): void;
  
  /**
   * Registers transactions with the transaction manager
   */
  registerTransactions(): void;
  
  /**
   * Registers environments with their plugin dependencies
   * @param dependencies - Required plugin dependencies
   */
  registerEnvironments(dependencies: PluginDependencies): void;
  
  /**
   * Handles populating the right property bar when selection changes
   * @param event - Property bar populate event
   */
  onPopulateRightPropertyBar(event: PopulateRightPropertyBarEvent): void;
  
  /**
   * Creates property bar item for applying content style
   * @param entity - Door or window entity
   * @returns Array of property bar items
   */
  getRightPropertyBarItem(entity: Door | Window): PropertyBarItem[];
  
  /**
   * Applies style from template entity to target entity
   * @param targetEntity - Entity to receive style
   * @param styleType - Type of style to apply
   */
  applyStyle(targetEntity: Entity, styleType: unknown): void;
  
  /**
   * Starts the content styler environment
   */
  startStyler(): void;
  
  /**
   * Exits the content styler and returns to previous environment
   */
  exitStyler(): void;
}

export default ContentStylerPlugin;