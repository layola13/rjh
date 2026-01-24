/**
 * Camera pitch line component for displaying visual guides in 3D view
 * @module CameraPitchLine
 */

import { useState, useEffect } from 'react';
import React from 'react';
import classNames from 'classnames';

/**
 * Visibility states for the camera pitch line
 */
enum PitchLineState {
  /** Line is completely hidden */
  hidden = 'hidden',
  /** Line is visible in normal mode */
  common = 'common',
  /** Line is visible and snapping to center */
  snapping = 'snapping'
}

/**
 * Props for the CameraPitchLine component
 */
export interface CameraPitchLineProps {
  /** Height of the viewport in pixels */
  height: number;
}

/**
 * Camera pitch line component that displays horizontal guide lines
 * when adjusting camera pitch in first-person view mode.
 * 
 * Features:
 * - Shows a base line at viewport center
 * - Shows a dynamic line that follows camera pitch angle
 * - Snaps to center when pitch is nearly zero
 * - Auto-hides after 1 second of inactivity
 * 
 * @param props - Component properties
 * @returns React element containing the pitch line UI
 */
export declare function CameraPitchLine(props: CameraPitchLineProps): React.ReactElement;

/**
 * Internal state management types
 */
declare namespace CameraPitchLineInternal {
  /**
   * Command data structure from HSApp
   */
  interface CommandData {
    cmd?: {
      type?: string;
      signalRenderCameraMoving?: unknown;
    };
  }

  /**
   * Event wrapper for command events
   */
  interface CommandEvent {
    data: CommandData;
  }

  /**
   * Active camera instance from floorplan
   */
  interface ActiveCamera {
    /** Horizontal field of view in degrees */
    horizontal_fov: number;
    /** Camera pitch angle in degrees */
    pitch: number;
  }

  /**
   * Floorplan instance containing active camera
   */
  interface Floorplan {
    active_camera: ActiveCamera;
  }

  /**
   * HSApp application instance
   */
  interface AppInstance {
    /** Current primary view mode */
    primaryViewMode: number;
    /** Floorplan with camera data */
    floorplan: Floorplan;
    /** Command manager for handling camera movements */
    cmdManager: CommandManager;
  }

  /**
   * Command manager for listening to camera events
   */
  interface CommandManager {
    /** Signal fired when command starts */
    signalCommandStarting: unknown;
    /** Signal fired when command terminates */
    signalCommandTerminating: unknown;
  }

  /**
   * Signal hook utility for managing event listeners
   */
  interface SignalHook {
    listen(signal: unknown, callback: (...args: any[]) => void): SignalHook;
    unlisten(signal: unknown): void;
    unlistenAll(): void;
  }
}