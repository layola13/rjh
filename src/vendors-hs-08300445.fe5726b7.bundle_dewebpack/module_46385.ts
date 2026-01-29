/**
 * Dialog component type definitions
 * Provides a wrapper component that handles portal rendering, visibility state, and lifecycle management
 */

import type { ReactElement, ReactNode } from 'react';

/**
 * Container getter function type
 * Returns the DOM element where the dialog should be rendered
 */
export type GetContainer = () => HTMLElement;

/**
 * Props for the internal drawer/modal component
 */
export interface DrawerModalProps {
  /** Controls the visibility of the dialog */
  visible: boolean;
  /** Function to get the container element for portal rendering */
  getContainer?: GetContainer | false;
  /** Force render the component even when not visible */
  forceRender?: boolean;
  /** Destroy child components when dialog is closed */
  destroyOnClose?: boolean;
  /** Callback fired after the dialog is completely closed */
  afterClose?: () => void;
  /** Returns the number of open dialogs */
  getOpenCount?: () => number;
  /** Children content */
  children?: ReactNode;
  [key: string]: unknown;
}

/**
 * Props for the Dialog component
 */
export interface DialogProps extends Omit<DrawerModalProps, 'getOpenCount'> {
  /** Controls the visibility of the dialog */
  visible: boolean;
  /** 
   * Function to get the container element for portal rendering
   * Set to false to disable portal rendering
   */
  getContainer?: GetContainer | false;
  /** Force render the component even when not visible */
  forceRender?: boolean;
  /** 
   * Destroy child components when dialog is closed
   * @default false
   */
  destroyOnClose?: boolean;
  /** Callback fired after the dialog is completely closed */
  afterClose?: () => void;
}

/**
 * Dialog component
 * 
 * A wrapper component that provides:
 * - Portal rendering to a specified container
 * - Visibility state management
 * - Conditional rendering based on forceRender and destroyOnClose
 * - Lifecycle callbacks (afterClose)
 * 
 * @param props - Dialog component props
 * @returns React element or null
 */
declare const Dialog: {
  (props: DialogProps): ReactElement | null;
  displayName: string;
};

export default Dialog;