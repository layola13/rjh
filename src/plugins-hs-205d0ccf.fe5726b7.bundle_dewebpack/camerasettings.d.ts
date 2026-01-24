/**
 * Camera settings component for 3D camera control
 * @module CameraSettings
 */

import { PureComponent } from 'react';
import { HSCore } from './core-types';
import { SignalHook } from './signal-hook';

/**
 * Display mode enumeration
 */
export enum DisplayModeEnum {
  SingleLayer = 'SingleLayer',
  AllLayers = 'AllLayers'
}

/**
 * Camera constraint constants
 */
export const CAMERA_CONSTANTS = {
  MIN_FOV: 10,
  MAX_FOV: 120,
  MIN_ANGLE: -90,
  MAX_ANGLE: 90,
  MIN_ELEVATION: 0
} as const;

/**
 * Camera object interface
 */
export interface ICamera {
  /** Camera Z position in meters */
  z: number;
  /** Camera pitch angle in degrees */
  pitch: number;
  /** Horizontal field of view in degrees */
  horizontal_fov: number;
}

/**
 * Layer entity interface
 */
export interface ILayer {
  /** Layer height in meters */
  height: number;
  /** Previous layer reference */
  prev: ILayer | null;
}

/**
 * Scene interface
 */
export interface IScene {
  /** Currently active layer */
  activeLayer: ILayer;
  /** Root layer of the scene */
  rootLayer: ILayer;
  /** Signal dispatched when active layer changes */
  signalActiveLayerChanged: HSCore.Signal;
}

/**
 * Command manager interface for executing camera commands
 */
export interface ICommandManager {
  /**
   * Create a command instance
   * @param type - Command type identifier
   * @param args - Command arguments
   */
  createCommand(type: string, args: unknown[]): unknown;
  
  /** Execute the created command */
  execute(command: unknown): void;
  
  /**
   * Send command parameters
   * @param action - Action identifier
   * @param params - Action parameters
   */
  receive(action: string, params: Record<string, unknown>): void;
  
  /** Complete command execution */
  complete(): void;
}

/**
 * Application settings interface
 */
export interface IAppSettings {
  /** Current display mode */
  displayMode: DisplayModeEnum;
  /** Signal dispatched when setting values change */
  signalValueChanged: HSCore.Signal<IValueChangedEventData>;
}

/**
 * Value changed event data
 */
export interface IValueChangedEventData {
  /** Name of the field that changed */
  fieldName: string;
  /** New value */
  value: DisplayModeEnum;
}

/**
 * Floorplan interface
 */
export interface IFloorplan {
  /** Scene instance */
  scene: IScene;
  /** Display length unit (e.g., 'm', 'ft') */
  displayLengthUnit: string;
}

/**
 * Application interface
 */
export interface IApp {
  /** Application settings */
  appSettings: IAppSettings;
  /** Command manager instance */
  cmdManager: ICommandManager;
  /** Floorplan instance */
  floorplan: IFloorplan;
  /** Display mode enumeration */
  DisplayModeEnum: typeof DisplayModeEnum;
}

/**
 * Range tuple [min, max]
 */
export type Range = [number, number];

/**
 * Slider validation rules
 */
export interface ISliderRules {
  /** Only allow positive values */
  positiveOnly?: boolean;
  /** Range constraints */
  range: {
    /** Check minimum value */
    checkMin?: boolean;
    /** Check maximum value */
    checkMax?: boolean;
    /** Maximum allowed value */
    max: number;
    /** Minimum allowed value */
    min: number;
  };
}

/**
 * Slider options
 */
export interface ISliderOptions {
  /** Unit type for display (e.g., '°', 'm') */
  unitType: string;
  /** Number of decimal digits to display */
  displayDigits?: number;
  /** Include unit in display */
  includeUnit?: boolean;
  /** Read-only mode */
  readOnly?: boolean;
  /** Start slider from minimum value */
  startFromMin?: boolean;
  /** Disable tooltip */
  disabledTooltip?: boolean;
  /** Validation rules */
  rules: ISliderRules;
}

/**
 * Slider controller interface
 */
export interface ISliderController {
  /** Callback when value changes */
  onValueChanged: (event: CustomEvent<{ value: number }> | number) => void;
}

/**
 * Length input data structure
 */
export interface ILengthInputData {
  /** CSS class name */
  className: string;
  /** Input label */
  label: string;
  /** Icon source URL */
  iconSrc: string;
  /** Current value */
  value: number;
  /** List of preset values */
  listValues?: number[];
  /** Label position */
  labelPosition: string;
  /** Callback when value change starts */
  onValueChangeStart: string;
  /** Callback when value changes */
  onValueChange: (event: CustomEvent<{ value: number }> | number) => void;
  /** Input options */
  options: ISliderOptions;
}

/**
 * Double slider data structure for bidirectional sliders
 */
export interface IDoubleSliderData {
  /** CSS class name */
  className: string;
  /** Slider label */
  label: string;
  /** Current value */
  value: number;
  /** Delay updates */
  delay: boolean;
  /** Callback when slide starts */
  onValueChangeStart: string;
  /** Callback during sliding */
  onValueChange: (value: number) => void;
  /** Callback when slide ends */
  onValueChangeEnd: string;
  /** Slider options */
  options: {
    /** Read-only mode */
    readOnly: boolean;
    /** Validation rules */
    rules: {
      /** Range constraints */
      range: {
        /** Minimum value */
        min: number;
        /** Maximum value */
        max: number;
      };
    };
  };
}

/**
 * Slider mark labels
 */
export interface ISliderMarks {
  [value: number]: string;
}

/**
 * Complete slider data structure
 */
export interface ISliderData {
  /** CSS class name */
  className: string;
  /** Slider controller */
  controller: ISliderController;
  /** Current value */
  value: number;
  /** Step increment */
  step: number;
  /** Slider options */
  options: ISliderOptions;
  /** Slider label */
  label?: string;
  /** Mark labels at specific values */
  marks?: ISliderMarks;
  /** Show tooltip */
  tip?: boolean;
  /** Snapping step for fine control */
  snappingStep?: number;
  /** Length input configuration */
  lengthInputData?: ILengthInputData;
  /** Start value for range sliders */
  startValue?: number;
  /** Double slider configuration */
  doubleSliderData?: IDoubleSliderData;
  /** Enable bidirectional slider */
  twoWays?: boolean;
}

/**
 * Component state interface
 */
export interface ICameraSettingsState {
  /** Camera elevation in millimeters */
  cameraElevation: number;
  /** Camera field of view in degrees */
  cameraFOV: number;
  /** Camera pitch angle in degrees */
  cameraPitch: number;
  /** Valid height range [min, max] in meters */
  heightRange: Range;
}

/**
 * Component props interface
 */
export interface ICameraSettingsProps {
  /** Additional props can be defined here */
  [key: string]: unknown;
}

/**
 * Camera settings component for controlling 3D camera parameters
 * Manages elevation, field of view, and pitch angle
 */
export class CameraSettings extends PureComponent<ICameraSettingsProps, ICameraSettingsState> {
  /** Signal hook for managing event listeners */
  private signalHook?: SignalHook;

  /**
   * Constructor
   * @param props - Component properties
   */
  constructor(props: ICameraSettingsProps);

  /**
   * Lifecycle: Component mounted
   * Initializes camera state from current camera
   */
  componentDidMount(): void;

  /**
   * Lifecycle: Component will unmount
   * Cleans up event listeners
   */
  componentWillUnmount(): void;

  /**
   * Handle layer view mode change events
   * @param event - Value changed event data
   */
  onLayerViewModeChanged(event: IValueChangedEventData): void;

  /**
   * Handle active layer change events
   */
  onActiveLayerChanged(): void;

  /**
   * Update camera height parameters based on layer range
   * @param range - Valid height range [min, max]
   */
  updateCameraHeightParams(range: Range): void;

  /**
   * Handle camera elevation change
   * @param event - Custom event or direct number value
   */
  onElevationChange(event: CustomEvent<{ value: number }> | number): void;

  /**
   * Handle camera field of view change
   * @param event - Custom event or direct number value
   */
  onFOVChange(event: CustomEvent<{ value: number }> | number): void;

  /**
   * Handle camera pitch angle change (from input)
   * @param event - Custom event or direct number value
   */
  onPitchChange(event: CustomEvent<{ value: number }> | number): void;

  /**
   * Handle camera pitch angle change (from slider drag)
   * @param value - New pitch value in degrees
   */
  onPitchChangeSlide(value: number): void;

  /**
   * Get valid height range for current display mode
   * @param displayMode - Current display mode
   * @returns Height range [min, max] in meters
   */
  getLayerRange(displayMode: DisplayModeEnum): Range;

  /**
   * Execute pitch change command
   * @param pitch - Pitch angle in degrees
   * @param snap - Whether to snap to grid
   */
  private _receivePitchCommand(pitch: number, snap: boolean): void;

  /**
   * Refresh camera state from current camera
   */
  private _cameraRefresh(): void;

  /**
   * Validate value within range
   * @param value - Value to validate
   * @param min - Minimum allowed value
   * @param max - Maximum allowed value
   * @returns Clamped value
   */
  private _validateValue(value: number, min: number, max: number): number;

  /**
   * Build slider configuration data
   * @param value - Current slider value
   * @param type - Slider type ('height', 'fov', or 'pitch')
   * @returns Slider configuration
   */
  buildSliderData(value: number, type: 'height' | 'fov' | 'pitch'): ISliderData;

  /**
   * Build double slider configuration for bidirectional control
   * @param baseData - Base slider configuration
   * @returns Double slider configuration
   */
  buildDoubleSliderData(baseData: ISliderData): IDoubleSliderData;

  /**
   * Build length input configuration
   * @param baseData - Base slider configuration
   * @param type - Input type
   * @returns Length input configuration
   */
  buildLengthInputData(baseData: ISliderData, type: string): ILengthInputData;

  /**
   * Render component
   * @returns React element
   */
  render(): JSX.Element;
}