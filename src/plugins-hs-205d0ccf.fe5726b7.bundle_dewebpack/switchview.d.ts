/**
 * SwitchView Component
 * 
 * A React component that provides a toggle between 2D and 3D view modes.
 * Integrates with HSApp.App to manage view state transitions.
 * 
 * @module SwitchView
 */

import { Component, ReactElement, MouseEvent } from 'react';

/**
 * Represents the HSApp application instance interface
 */
interface HSAppInstance {
  /**
   * Current primary view mode ('2d' or '3d')
   */
  primaryViewMode: ViewMode;

  /**
   * Checks if 2D view is currently active
   * @returns true if 2D view is active
   */
  is2DViewActive(): boolean;

  /**
   * Checks if 3D view is currently active
   * @returns true if 3D view is active
   */
  is3DViewActive(): boolean;

  /**
   * Switches the application to 3D view mode
   */
  switchTo3DView(): void;

  /**
   * Switches the application to 2D view mode
   */
  switchTo2DView(): void;
}

/**
 * Global HSApp namespace
 */
declare global {
  const HSApp: {
    App: {
      /**
       * Gets the singleton HSApp application instance
       * @returns The application instance
       */
      getApp(): HSAppInstance;
    };
  };
}

/**
 * View mode type definition
 */
type ViewMode = '2d' | '3d';

/**
 * Props interface for SwitchView component
 */
interface SwitchViewProps {
  // Component accepts standard React component props
  [key: string]: unknown;
}

/**
 * State interface for SwitchView component
 */
interface SwitchViewState {
  /**
   * Currently active view mode
   */
  currViewMode: ViewMode;
}

/**
 * SwitchView Component
 * 
 * Renders a toggle UI allowing users to switch between 2D and 3D views.
 * Automatically syncs state with the HSApp application instance.
 * 
 * @example
 *