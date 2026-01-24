/**
 * UGuide Plugin - User guide and onboarding system for floorplan applications
 * 
 * This plugin provides interactive guided tours for new users, including
 * step-by-step walkthroughs, design templates, and onboarding flows.
 * 
 * @module UGuide
 */

import { Handler } from './Handler';
import type { IPlugin } from 'HSApp.Plugin';

/**
 * Configuration options for starting a guide
 */
export interface GuideStartOptions {
  /** Optional step index to start from */
  startStep?: number;
  /** Optional guide identifier */
  guideId?: string;
  /** Additional custom parameters */
  [key: string]: unknown;
}

/**
 * Plugin initialization context
 */
export interface PluginContext {
  /** Application instance */
  app: unknown;
  /** Map of loaded plugin dependencies */
  dependencies: Record<string, IPlugin>;
}

/**
 * Plugin activation event data
 */
export interface ActivationEvent {
  /** Application instance */
  app: unknown;
  /** Additional activation metadata */
  [key: string]: unknown;
}

/**
 * Plugin deactivation event data
 */
export interface DeactivationEvent {
  /** Reason for deactivation */
  reason?: string;
  /** Additional deactivation metadata */
  [key: string]: unknown;
}

/**
 * Guide step configuration
 */
export interface GuideStepOptions {
  /** Step title or heading */
  title?: string;
  /** Step description or instructions */
  description?: string;
  /** Target element selector */
  target?: string;
  /** Placement of the tooltip */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Additional step metadata */
  [key: string]: unknown;
}

/**
 * Signin plugin interface with signal support
 */
export interface SigninPlugin extends IPlugin {
  signals: {
    /** Emitted when user successfully signs in */
    signalSigninSucceeded: {
      listen(callback: () => void, context: unknown): void;
      unlisten(callback: () => void, context: unknown): void;
    };
  };
}

/**
 * UGuide Plugin Class
 * 
 * Manages user onboarding flows, interactive guides, and design templates.
 * Integrates with the signin system to trigger guides for new users.
 * 
 * @extends HSApp.Plugin.IPlugin
 */
export declare class UGuide extends HSApp.Plugin.IPlugin {
  /**
   * Internal guide handler managing state and logic
   * @private
   */
  private _handler: Handler;

  /**
   * Signal emitted when guide events should be logged
   * @public
   */
  public signalGuideToLog: unknown;

  /**
   * Reference to signin plugin for authentication integration
   * @private
   */
  private _signinPlugin?: SigninPlugin;

  /**
   * Creates a new UGuide plugin instance
   * 
   * Initializes the plugin with metadata and sets up the internal handler
   * and signal system.
   */
  constructor();

  /**
   * Lifecycle hook called when plugin is activated
   * 
   * Sets up the guide handler, initializes user timer, and registers
   * signin success listener to restart guides on authentication.
   * 
   * @param event - Activation event data containing app instance
   * @param dependencies - Map of loaded plugin dependencies
   */
  onActive(event: ActivationEvent, dependencies: Record<string, IPlugin>): void;

  /**
   * Lifecycle hook called when plugin is deactivated
   * 
   * Disables the guide system and unregisters signin listeners.
   * 
   * @param event - Deactivation event data
   */
  onDeactive(event: DeactivationEvent): void;

  /**
   * Displays the main guide UI
   * 
   * @returns Result of showing the guide (implementation-specific)
   */
  showGuide(): unknown;

  /**
   * Starts the "Get Started" onboarding flow
   * 
   * @returns Result of starting the flow (implementation-specific)
   */
  getStarted(): unknown;

  /**
   * Copies a design template for the user
   * 
   * Asynchronously creates a copy of a design, typically used during
   * onboarding to provide users with a starting template.
   * 
   * @param shouldCopy - Whether to actually perform the copy operation
   * @returns Promise resolving to the copied design result
   */
  copyDesign(shouldCopy?: boolean): Promise<unknown>;

  /**
   * Starts a standard guide with given options
   * 
   * @param options - Configuration for the guide session
   */
  startGuide(options?: GuideStartOptions): void;

  /**
   * Starts a custom guide flow with given options
   * 
   * Custom guides can be tailored for specific features or workflows
   * beyond the standard onboarding experience.
   * 
   * @param options - Configuration for the custom guide
   */
  startCustomGuide(options?: GuideStartOptions): void;

  /**
   * Restarts the current guide from the beginning
   * 
   * Typically called after signin to resume interrupted onboarding.
   */
  restartGuide(): void;

  /**
   * Exits the current guide session
   * 
   * @param shouldCleanup - Whether to perform cleanup operations (default: true)
   * @returns Result of exit operation (implementation-specific)
   */
  exitGuide(shouldCleanup?: boolean): unknown;

  /**
   * Checks if user is currently in a custom guide
   * 
   * @readonly
   */
  get isInCustomGuide(): boolean;

  /**
   * Retrieves the design ID assigned to new users
   * 
   * @returns Design identifier or undefined
   */
  getNewUserDesignId(): string | undefined;

  /**
   * Marks that the user has obtained a design
   * 
   * Updates internal state to track onboarding progress.
   * 
   * @param hasGot - Whether user has received a design
   */
  setHasGotDesign(hasGot: boolean): void;

  /**
   * Checks if current user is a new user (newbie)
   * 
   * Asynchronously determines user status, typically by checking
   * account creation date or completed onboarding steps.
   * 
   * @returns Promise resolving to true if user is new
   */
  isNewbie(): Promise<boolean>;

  /**
   * Updates guide state or configuration
   * 
   * @param key - Property or setting to update
   * @param value - New value for the property
   */
  updateGuide(key: string, value: unknown): void;

  /**
   * Removes/unmounts the current guide tooltip from DOM
   * 
   * Uses optional chaining to safely call handler method.
   */
  unmountGuideTip(): void;

  /**
   * Exits rendering mode and creates a new document
   * 
   * Specialized workflow for transitioning out of preview/render
   * states during guided flows.
   */
  exitRenderAndNewDoc(): void;

  /**
   * Gets the internal handler instance
   * 
   * Provides access to handler for advanced use cases.
   * 
   * @readonly
   */
  get handler(): Handler;

  /**
   * Retrieves configuration for the current guide step
   * 
   * @returns Current step options or undefined if no active step
   */
  getCurrentStepOptions(): GuideStepOptions | undefined;
}

/**
 * Plugin metadata
 */
export interface UGuideMetadata {
  /** Human-readable plugin name */
  name: 'Guide Plugin';
  /** Plugin description */
  description: 'provide Guide for floorplan';
  /** Required plugin dependencies */
  dependencies: ['hsw.plugin.signin.Plugin'];
}