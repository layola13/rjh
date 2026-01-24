/**
 * OrbitView Popup Plugin for HSApp
 * Provides camera control popup interface for 3D viewport manipulation
 */

declare module 'hsw.plugin.orbitview.orbitviewpopup' {
  import * as React from 'react';
  import { IPlugin } from 'HSApp.Plugin';
  import { Camera } from 'HSApp.Floorplan';
  import { CommandManager, Command } from 'HSApp.Command';
  import { SignalHook } from 'HSCore.Util';

  /**
   * Plugin identifier constant
   */
  export const PLUGIN_ID: 'hsw.plugin.orbitview.orbitviewpopup';

  /**
   * Camera height range configuration
   */
  interface CameraHeightRange {
    /** Minimum height in meters */
    min: number;
    /** Maximum height in meters */
    max: number;
    /** Whether to check maximum value */
    checkMax?: boolean;
  }

  /**
   * Camera field of view range configuration
   */
  interface CameraFovRange {
    /** Minimum FOV in degrees (default: 40°) */
    min: number;
    /** Maximum FOV in degrees (default: 120°) */
    max: number;
  }

  /**
   * Input component configuration for camera parameters
   */
  interface InputComponentOptions {
    /** CSS class name */
    className: string;
    /** Display label */
    label: string;
    /** Current value */
    value: number;
    /** Input options */
    options: {
      /** Unit type (e.g., '°' for degrees) */
      unitType?: string;
      /** Number of decimal places to display */
      displayDigits?: number;
      /** Whether to include unit in display */
      includeUnit?: boolean;
      /** Whether to show increment/decrement buttons */
      showTunningButtons?: boolean;
      /** Whether to start from minimum value */
      startFromMin?: boolean;
      /** Validation rules */
      rules: {
        range: CameraHeightRange | CameraFovRange;
        /** Whether value must be positive */
        positiveOnly?: boolean;
      };
    };
    /** Slider marks for FOV control */
    marks?: {
      [key: number]: string;
    };
    /** Value change callback */
    onValueChange?: (event: { detail: { value: number } }) => void;
    /** Value change end callback (on mouse up) */
    onValueChangeEnd?: () => void;
  }

  /**
   * Popup position configuration
   */
  interface PopupPosition {
    /** Distance from bottom of viewport in pixels */
    bottom: number;
    /** Distance from left of viewport in pixels */
    left: number;
  }

  /**
   * OrbitView popup signal payload
   */
  interface OrbitViewPopupSignal {
    /** Whether popup is active/visible */
    isActive: boolean;
  }

  /**
   * Handler object managing popup lifecycle and interactions
   */
  interface IOrbitViewPopupHandler {
    /** Property bar popup reference */
    propertyBarPopup: unknown;
    
    /** Whether popup is currently visible */
    isShow: boolean;
    
    /** Bounding rectangle of trigger button */
    triggerTargetBound?: DOMRect;
    
    /** Main application instance */
    app?: HSApp.Application;
    
    /** Command manager for executing camera operations */
    cmdMgr?: CommandManager;
    
    /** Current active camera */
    camera?: Camera;
    
    /** Whether popup is pinned (stays open) */
    isPin?: boolean;
    
    /** Camera height icon path */
    cameraZIcon?: string;
    
    /** Camera field of view icon path */
    cameraFovIcon?: string;
    
    /** Camera clip icon path */
    cameraClipIcon?: string;
    
    /** Pin icon path */
    pinIcon?: string;
    
    /** Signal hook for event handling */
    signalHook?: SignalHook;
    
    /** Contextual tools plugin reference */
    contextualToolsPlugin?: IPlugin;

    /**
     * Initialize the popup handler
     * @param app - Main application instance
     * @param plugins - Map of available plugins
     */
    init(app: HSApp.Application, plugins: Record<string, IPlugin>): void;

    /**
     * Cleanup and remove event listeners
     */
    uninit(): void;

    /**
     * Toggle popup visibility
     * @param triggerBound - Bounding rectangle of trigger element (optional)
     * @param camera - Camera to control (optional, uses current camera if not provided)
     * @returns Whether popup is now visible
     */
    toggle(triggerBound?: DOMRect, camera?: Camera): boolean;

    /**
     * Get camera instance by type
     * @param cameraType - Type of camera to retrieve
     * @returns Camera instance or null if not found
     */
    getCameraByType(cameraType: string): Camera | null;

    /**
     * Hide the popup
     * @param force - Force hide even if pinned
     */
    hide(force?: boolean): void;

    /**
     * Handle document click to hide popup when clicking outside
     * @param event - Mouse event
     */
    documentClickedHidePopup(event: MouseEvent): void;

    /**
     * Update popup when camera field changes
     * @param camera - Camera that changed
     */
    setCameraZValue(camera: Camera): void;

    /**
     * Handle reset button click - resets camera to default position
     */
    onResetBtnClk(): void;

    /**
     * Handle camera height input change
     * @param value - New height value in meters
     */
    onZInputChange(value: number): void;

    /**
     * Handle FOV slider change
     * @param value - New FOV value in degrees
     */
    onFovSliderChange(value: number): void;

    /**
     * Handle FOV input change
     * @param value - New FOV value in degrees
     */
    onFovInputChange(value: number): void;

    /**
     * Re-render the popup component
     */
    updatePopup(): void;

    /**
     * Launch a command and execute it
     * @param commandType - Type of command to execute
     * @param camera - Target camera
     * @returns Executed command instance
     * @private
     */
    _launchCmd(commandType: string, camera: Camera): Command;
  }

  /**
   * React component props for popup (no props needed)
   */
  interface CameraSettingPopupProps {}

  /**
   * Camera Setting Popup React Component
   * Renders the camera control interface with height and FOV controls
   */
  class CameraSettingPopup extends React.Component<CameraSettingPopupProps> {
    /**
     * Handle reset button click
     */
    onResetClick(): void;

    /**
     * Render the popup UI
     */
    render(): React.ReactElement;
  }

  /**
   * OrbitView Popup Plugin Class
   * Manages the camera settings popup for orbit view controls
   */
  export default class OrbitViewPopupPlugin extends IPlugin {
    /**
     * Plugin metadata
     */
    constructor();

    /**
     * Called when plugin is activated
     * @param context - Activation context containing app reference
     * @param plugins - Map of available plugins
     */
    onActive(context: { app: HSApp.Application }, plugins: Record<string, IPlugin>): void;

    /**
     * Called when plugin is deactivated
     */
    onDeactive(): void;

    /**
     * Toggle popup visibility
     * @param triggerBound - Bounding rectangle of trigger element
     * @param camera - Camera to control (optional)
     * @returns Whether popup is now visible
     */
    toggle(triggerBound?: DOMRect, camera?: Camera): boolean;

    /**
     * Hide the popup
     * @param force - Force hide even if pinned
     */
    hide(force?: boolean): void;

    /**
     * Check if popup is pinned
     * @returns Whether popup is pinned
     */
    isPin(): boolean;
  }

  /**
   * Global handler instance for popup management
   */
  export const Handler: IOrbitViewPopupHandler;
}