/**
 * Camera Dialog Connected Component Module
 * 
 * This module exports a React component connected to Redux store using react-redux's connect HOC.
 * It maps state properties and action creators to component props.
 */

import { ComponentType } from 'react';
import { ConnectedComponent } from 'react-redux';

/**
 * Redux state interface mapping
 */
export interface StateProps {
  /** Indicates whether the component is in read-only mode */
  isReadonly: boolean;
  
  /** Controls the visibility of the dialog */
  isShown: boolean;
  
  /** Enables or disables animation effects */
  isAnimation: boolean;
  
  /** Plugin call configuration or handler */
  callplugin: unknown;
}

/**
 * Redux dispatch actions interface
 */
export interface DispatchProps {
  /**
   * Creates a camera handler instance
   * @returns Camera handler object or action result
   */
  createCameraHandler: () => unknown;
  
  /**
   * Closes the dialog
   * @returns Action result or void
   */
  closeDialog: () => void | unknown;
}

/**
 * Combined props passed to the connected component
 */
export type ConnectedProps = StateProps & DispatchProps;

/**
 * Default export: Redux-connected component with state and dispatch props
 * 
 * Original component (module 507291) is wrapped with react-redux connect HOC,
 * mapping state selectors and action creators.
 */
declare const ConnectedCameraDialog: ConnectedComponent<
  ComponentType<ConnectedProps>,
  Record<string, never>
>;

export default ConnectedCameraDialog;