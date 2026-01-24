/**
 * Input view controller for managing 3D gizmos and camera interactions
 * @module InputViewController
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { RoofGizmo } from './RoofGizmo';

/**
 * Enum for roof types
 */
export enum ENParamRoofType {
  SaltBox = 'SaltBox',
  BoxGable = 'BoxGable'
}

/**
 * Roof parameter node configuration
 */
interface RoofParamNode {
  /** Parameter name */
  name: string;
  /** Current value */
  value: number;
  /** Min/max constraints [min, max] */
  minMax?: [number, number];
}

/**
 * Gizmo configuration options
 */
interface GizmoConfig {
  /** Associated roof object */
  roof: RoofObject;
  /** Parameter name */
  name: string;
  /** Current value */
  value: number;
  /** Minimum allowed value */
  min: number;
  /** Maximum allowed value */
  max: number;
}

/**
 * Roof parameters structure
 */
interface RoofParameters {
  /** Room boundary loop */
  roomLoop?: unknown;
  /** Type of roof */
  roofType?: ENParamRoofType;
}

/**
 * Roof object with parameters and metadata
 */
interface RoofObject {
  /** Unique identifier */
  id: string;
  /** Roof configuration parameters */
  parameters: RoofParameters;
}

/**
 * Display list item with optional choice face name getter
 */
interface DisplayListItem {
  /** Get the name of the selected face, if applicable */
  getChoiceFaceName?(): string | undefined;
}

/**
 * 3D canvas view with context and display list
 */
interface Canvas3D {
  /** Rendering context */
  context: RenderContext;
  /** Map of display list items by ID */
  displayList: Record<string, DisplayListItem>;
}

/**
 * Rendering context with camera change signal
 */
interface RenderContext {
  /** Signal emitted when camera position/orientation changes */
  signalCameraChanged: HSCore.Signal;
}

/**
 * Controller for managing input gizmos in 3D view
 * Handles roof parameter editing via interactive 3D widgets
 */
export declare class InputViewController {
  private readonly _app: HSApp.App;
  private readonly _signalHook: HSCore.Util.SignalHook;
  private _context?: RenderContext;
  private _canvas3d: Canvas3D;
  private _gizmos3d: RoofGizmo[];

  constructor();

  /**
   * Refresh gizmos for the given roof object
   * Clears existing gizmos and initializes new ones if applicable
   * @param roofObject - The roof object to display gizmos for, or undefined to clear
   */
  refresh(roofObject?: RoofObject): void;

  /**
   * Initialize gizmos for a roof object
   * Creates angle adjustment gizmos for SaltBox and BoxGable roof types
   * @param roofObject - The roof object to initialize gizmos for
   * @private
   */
  private _init(roofObject: RoofObject): void;

  /**
   * Remove all active gizmos from the scene
   * @private
   */
  private _clear(): void;

  /**
   * Handle camera change events
   * Updates gizmo positions to maintain correct screen-space alignment
   * @private
   */
  private _onCameraChanged(): void;
}