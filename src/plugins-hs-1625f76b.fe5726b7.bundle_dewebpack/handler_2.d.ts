/**
 * Compass widget handler for managing rotation/orientation controls
 * Original Module ID: 997961
 */

import { HSCore } from './HSCore';
import { CompassWidget } from './CompassWidget';
import type React from 'react';

/**
 * Metadata key for storing compass degree value
 */
const COMPASS_DEGREE_KEY = 'compass_degree';

/**
 * Application instance interface
 */
interface IApplication {
  /** Signal emitted when a view is activated */
  signalViewActivated: unknown;
  /** Signal emitted when a document is opened */
  signalDocumentOpened: unknown;
  /** Signal emitted when a document is closed */
  signalDocumentClosed: unknown;
  /** Signal emitted when metadata changes */
  signalMetadataChanged: unknown;
  /** Design metadata storage */
  designMetadata: IDesignMetadata;
  /** Layout manager for registering UI components */
  layoutMgr: ILayoutManager;
}

/**
 * Design metadata storage interface
 */
interface IDesignMetadata {
  /**
   * Set a metadata value
   * @param key - Metadata key
   * @param value - Value to store
   */
  set(key: string, value: number): void;
  
  /**
   * Get a metadata value
   * @param key - Metadata key
   * @returns The stored value or undefined
   */
  get(key: string): number | undefined;
}

/**
 * Layout manager interface
 */
interface ILayoutManager {
  /**
   * Register a UI component with the layout manager
   * @param name - Component identifier
   * @param element - DOM element to register
   */
  register(name: string, element: Element | null): void;
}

/**
 * Initialization options for the Handler
 */
interface IHandlerInitOptions {
  /** Application instance */
  app: IApplication;
  /** Whether to skip UI rendering */
  noUI?: boolean;
}

/**
 * View data structure
 */
interface IView {
  /** View identifier name */
  name: string;
}

/**
 * View activation event data
 */
interface IViewActivatedEventData {
  data: {
    /** The newly activated view */
    newView: IView;
  };
}

/**
 * Metadata changed event data
 */
interface IMetadataChangedEventData {
  data: {
    /** Changed attributes map */
    attributes?: Record<string, number>;
  };
}

/**
 * CompassWidget component reference type
 */
interface ICompassWidgetRef {
  /**
   * Update the displayed degree value
   * @param degree - New degree value (0-360)
   */
  updateDegree(degree: number): void;
  
  /** Show the compass widget */
  show(): void;
  
  /** Hide the compass widget */
  hide(): void;
}

/**
 * Handler class for managing compass widget functionality
 * Coordinates between application events and compass UI component
 */
export declare class Handler {
  /** Signal hook utility for managing event subscriptions */
  private signalHook: HSCore.Util.SignalHook;
  
  /** Whether the widget should automatically show/hide based on view changes */
  private autoShowHide: boolean;
  
  /** Reference to the application instance */
  private app?: IApplication;
  
  /** React ref to the CompassWidget component */
  private compassWidgetRef: React.RefObject<ICompassWidgetRef>;

  constructor();

  /**
   * Initialize the handler with application context
   * Sets up event listeners and renders UI if needed
   * @param options - Initialization options
   */
  init(options: IHandlerInitOptions): void;

  /**
   * Handle metadata change events
   * Updates compass widget when degree value changes
   * @param event - Metadata change event data
   */
  onMetadataChanged(event: IMetadataChangedEventData): void;

  /**
   * Handle document opened events
   * Updates compass widget with current degree value
   * @private
   */
  private _onDocumentOpened(): void;

  /**
   * Handle document closed events
   * Resets compass widget to 0 degrees
   */
  onDocumentClosed(): void;

  /**
   * Handle view activation events
   * Auto-shows widget in SVG view, hides in other views
   * @param event - View activation event data
   */
  onViewActivated(event: IViewActivatedEventData): void;

  /**
   * Render the CompassWidget component into the DOM
   * @private
   */
  private renderCompassWidget(): void;

  /**
   * Check if auto show/hide is enabled
   * @returns True if auto show/hide is enabled
   */
  isAutoShowHide(): boolean;

  /**
   * Enable or disable automatic show/hide behavior
   * @param enabled - Whether to enable auto show/hide
   */
  setAutoShowHide(enabled: boolean): void;

  /**
   * Show the compass widget
   */
  show(): void;

  /**
   * Hide the compass widget
   */
  hide(): void;

  /**
   * Set the compass degree value
   * @param degree - Degree value (0-360)
   */
  setDegree(degree: number): void;

  /**
   * Get the current compass degree value
   * @returns Current degree value, or 0 if not set
   */
  getDegree(): number;
}