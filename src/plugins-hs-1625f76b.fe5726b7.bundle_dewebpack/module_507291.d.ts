/**
 * Camera UI Component Module
 * Provides camera position and navigation controls with animation support
 */

import { Component, MouseEvent as ReactMouseEvent } from 'react';

/**
 * Camera UI component props
 */
export interface CameraUIProps {
  /** Whether the camera UI is currently visible */
  isShown: boolean;
  /** Whether animation is enabled */
  isAnimation?: boolean;
  /** Handler for creating camera snapshots */
  createCameraHandler: (animationFn: (imageData: string) => Promise<void>) => void;
  /** Handler called when the dialog should close */
  closeDialog: () => void;
  /** Whether the UI is in read-only mode */
  isReadonly?: boolean;
}

/**
 * Camera UI component state
 */
export interface CameraUIState {
  // Add state properties if needed
}

/**
 * Snapshot dimensions configuration
 */
export interface SnapshotConfig {
  width: number;
  height: number;
}

/**
 * Animation position configuration
 */
export interface AnimationPosition {
  top: number;
  left: number;
  width: number;
  height: number;
  position: 'absolute' | 'relative' | 'fixed';
}

/**
 * Clipping bounds [x, y, width, height]
 */
export type ClipBounds = [number, number, number, number];

/**
 * Camera UI Component
 * Manages camera position controls, snapshots, and animations
 */
export default class CameraUI extends Component<CameraUIProps, CameraUIState> {
  /** UI XML reference */
  private uixml: unknown;
  
  /** Container top offset */
  private containerT?: number;

  constructor(props: CameraUIProps);

  /**
   * Initialize the camera UI DOM structure
   * @private
   */
  private _init(): void;

  /**
   * jQuery selector helper for camera UI elements
   * @param selector - CSS selector within camera UI
   * @returns jQuery object
   * @private
   */
  private _$(selector?: string): JQuery;

  /**
   * Component lifecycle: Setup event listeners
   */
  componentDidMount(): void;

  /**
   * Component lifecycle: Cleanup event listeners
   */
  componentWillUnmount(): void;

  /**
   * Test if mouse event occurred within UI bounds
   * @param event - Mouse event
   * @returns True if event is within bounds
   */
  testIfInBounds(event: MouseEvent): boolean;

  /**
   * Handle loss of focus (click outside)
   * @param event - Mouse event
   */
  onLoseFocus(event: MouseEvent): void;

  /**
   * Execute camera snapshot animation sequence
   * @param imageData - Base64 encoded image data
   * @returns Promise that resolves when animation completes
   * @private
   */
  private _runAnimation(imageData: string): Promise<void>;

  /**
   * Render the camera UI
   */
  render(): JSX.Element | null;
}

/**
 * Constants for overlay and navigator IDs
 */
export declare const overlayId: string;
export declare const ngNavigatorId: string;

/**
 * Snapshot configuration
 */
export declare const snapshotWidth: number;
export declare const snapshotHeight: number;

/**
 * Get clipping bounds for canvas
 * @param width - Canvas width
 * @param height - Canvas height
 * @param useClip - Whether to apply clipping
 * @returns Clipping bounds
 */
export declare function getClipBound(
  width: number,
  height: number,
  useClip: boolean
): ClipBounds;

/**
 * Get the current HSW application instance
 */
export declare function getApp(): HSWApp;

/**
 * HSW Application interface
 */
export interface HSWApp {
  pluginManager: PluginManager;
  getActive3DView(): View3D;
}

/**
 * Plugin Manager interface
 */
export interface PluginManager {
  getPlugin(pluginId: string): OrbitViewPlugin;
}

/**
 * Orbit View Plugin interface
 */
export interface OrbitViewPlugin {
  signalCameraPositionPopup: Signal<CameraPositionPopupPayload>;
}

/**
 * Camera position popup signal payload
 */
export interface CameraPositionPopupPayload {
  isActive: boolean;
}

/**
 * Signal dispatcher interface
 */
export interface Signal<T> {
  dispatch(payload: T): void;
}

/**
 * 3D View interface
 */
export interface View3D {
  context: ViewContext;
}

/**
 * View context interface
 */
export interface ViewContext {
  clientRect: ClientRect;
}

/**
 * Client rectangle interface
 */
export interface ClientRect {
  width: number;
  height: number;
  top?: number;
  left?: number;
}

/**
 * Global HSApp namespace
 */
declare global {
  interface Window {
    HSApp: {
      App: {
        getApp(): HSWApp;
      };
    };
  }

  const HSApp: Window['HSApp'];
}