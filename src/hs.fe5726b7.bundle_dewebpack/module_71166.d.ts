/**
 * Camera Switch Widget - Type Definitions
 * Provides camera view switching functionality with position and settings controls
 */

/**
 * Camera widget configuration parameters
 */
interface CameraSwitchWidgetParams {
  /** Unique identifier for the camera root container */
  id?: string;
  /** Index of the initially selected camera button */
  selectedIndex: number;
  /** Array of camera button configurations */
  btns: CameraButtonConfig[];
  /** Click event handler for the widget */
  onclick?: (event: JQuery.ClickEvent) => void;
}

/**
 * Configuration for a single camera button
 */
interface CameraButtonConfig {
  /** Camera position button configuration */
  cameraposition: ButtonConfig;
  /** Camera settings button configuration */
  setting: SettingButtonConfig;
  /** Fit center button configuration */
  fitcenter: ButtonConfig;
}

/**
 * Base button configuration
 */
interface ButtonConfig {
  /** Click event handler */
  click: (event: JQuery.ClickEvent) => void | boolean;
  /** Additional button-specific properties */
  [key: string]: unknown;
}

/**
 * Settings button configuration with pin state
 */
interface SettingButtonConfig extends ButtonConfig {
  /** Whether the setting is pinned/selected */
  isPin: boolean;
}

/**
 * Image button widget interface
 */
interface CImageButton {
  /** jQuery container element */
  container: JQuery;
  /** Additional widget methods */
  [key: string]: unknown;
}

/**
 * Main Camera Switch Widget class
 * Manages camera view mode switching with position and settings controls
 */
declare class CameraSwitchWidget {
  /**
   * Creates a new CameraSwitchWidget instance
   * @param element - CSS selector or jQuery element for the container
   * @param params - Widget configuration parameters
   */
  constructor(element: string | HTMLElement | JQuery, params: CameraSwitchWidgetParams);

  /** jQuery container element */
  container: JQuery;

  /** Widget configuration parameters */
  param: CameraSwitchWidgetParams;

  /** jQuery UI widget instance */
  instance: JQuery;

  /**
   * Factory method to create a new widget instance
   * @param element - CSS selector or jQuery element for the container
   * @param params - Widget configuration parameters
   * @returns New CameraSwitchWidget instance
   */
  static create(
    element: string | HTMLElement | JQuery,
    params: CameraSwitchWidgetParams
  ): CameraSwitchWidget;

  /**
   * Updates the widget with new parameters
   * @param params - Partial parameters to merge with existing configuration
   */
  update(params: Partial<CameraSwitchWidgetParams>): void;

  /**
   * Destroys the widget and cleans up resources
   */
  destroy(): void;
}

/**
 * jQuery UI widget options for camera switch widget
 */
interface CameraSwitchWidgetOptions extends JQueryUI.WidgetOptions {
  /** Unique identifier for the camera root container */
  id: string;
  /** Index of the currently selected camera button */
  selectedIndex: number;
  /** Array of camera button configurations */
  btns: CameraButtonConfig[];
  /** Click event handler for the widget */
  onclick?: (event: JQuery.ClickEvent) => void;
}

/**
 * jQuery UI Camera Switch Widget
 */
interface CameraSwitchJQueryWidget extends JQueryUI.Widget {
  /** Widget event prefix for namespacing events */
  widgetEventPrefix: string;

  /** Widget configuration options */
  options: CameraSwitchWidgetOptions;

  /** Position button widget instance */
  positionWidget: CImageButton;

  /** Settings button widget instance */
  settingWidget: CImageButton;

  /** Fit center button widget instance */
  fitcenterWidget: CImageButton;

  /** Array of camera widget instances */
  cameraWidgets: unknown[];

  /** Localized string for camera positions label */
  camera_positions: string;

  /** Localized string for camera settings label */
  camera_settings: string;

  /** Reference to the application instance */
  app: unknown;

  /**
   * Updates the widget state based on current selection
   */
  update(): void;

  /**
   * Updates the visual state of the settings button
   * @param isPinned - Whether the setting should be displayed as pinned/selected
   */
  selectSetting(isPinned: boolean): void;
}

/**
 * Extends jQuery with custom camera switch widget
 */
interface JQuery {
  /**
   * Initializes or invokes methods on the camera switch widget
   * @param options - Widget options or method name
   * @returns jQuery instance for chaining
   */
  cameraswitchwidget(options: CameraSwitchWidgetOptions): JQuery;
  cameraswitchwidget(method: "destroy"): void;
  cameraswitchwidget(method: string, ...args: unknown[]): unknown;
}

/**
 * Global window interface extension
 */
interface Window {
  /** Camera Switch Widget constructor */
  CameraSwitchWidget: typeof CameraSwitchWidget;
}

/**
 * CImageButton static factory
 */
declare namespace CImageButton {
  /**
   * Creates a new image button widget
   * @param container - jQuery element to contain the button
   * @param config - Button configuration
   * @returns Image button widget instance
   */
  function create(container: JQuery, config: ButtonConfig): CImageButton;
}