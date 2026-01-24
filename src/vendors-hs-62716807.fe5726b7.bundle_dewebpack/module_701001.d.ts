/**
 * Modal confirmation dialog utilities
 * Provides programmatic API for creating confirm, info, success, error, and warning modals
 */

import type { ReactNode } from 'react';

/**
 * Configuration options for modal dialogs
 */
export interface ModalConfig {
  /** Modal type: determines the icon and default behavior */
  type?: 'confirm' | 'info' | 'success' | 'error' | 'warning';
  
  /** Title of the modal */
  title?: ReactNode;
  
  /** Content body of the modal */
  content?: ReactNode;
  
  /** Text for the OK button */
  okText?: string;
  
  /** Text for the Cancel button */
  cancelText?: string;
  
  /** Whether to show the cancel button */
  okCancel?: boolean;
  
  /** Custom icon element */
  icon?: ReactNode;
  
  /** CSS class prefix for styling */
  prefixCls?: string;
  
  /** Whether the modal is visible */
  visible?: boolean;
  
  /** Callback when OK button is clicked */
  onOk?: (...args: any[]) => void;
  
  /** Callback when Cancel button is clicked or modal is closed */
  onCancel?: (...args: any[]) => void;
  
  /** Callback after modal is completely closed */
  afterClose?: () => void;
  
  /** Additional properties */
  [key: string]: any;
}

/**
 * Modal instance returned by modal creation functions
 */
export interface ModalInstance {
  /** Destroy the modal and remove it from DOM */
  destroy: () => void;
  
  /** 
   * Update modal configuration
   * @param config - New configuration object or updater function
   */
  update: (config: ModalConfig | ((prevConfig: ModalConfig) => ModalConfig)) => void;
}

/**
 * Global configuration options
 */
export interface GlobalConfigOptions {
  /** Root CSS class prefix for all modals */
  rootPrefixCls?: string;
}

/**
 * Creates a modal dialog with the given configuration
 * @param config - Modal configuration options
 * @returns Modal instance with destroy and update methods
 */
export default function createModal(config: ModalConfig): ModalInstance;

/**
 * Set global configuration for all modals
 * @param options - Global configuration options
 */
export function globalConfig(options: GlobalConfigOptions): void;

/**
 * Create a confirmation modal with default confirm icon and cancel button
 * @param config - Modal configuration options
 * @returns Enhanced configuration with confirm defaults
 */
export function withConfirm(config: ModalConfig): ModalConfig;

/**
 * Create an error modal with error icon and no cancel button
 * @param config - Modal configuration options
 * @returns Enhanced configuration with error defaults
 */
export function withError(config: ModalConfig): ModalConfig;

/**
 * Create an info modal with info icon and no cancel button
 * @param config - Modal configuration options
 * @returns Enhanced configuration with info defaults
 */
export function withInfo(config: ModalConfig): ModalConfig;

/**
 * Create a success modal with success icon and no cancel button
 * @param config - Modal configuration options
 * @returns Enhanced configuration with success defaults
 */
export function withSuccess(config: ModalConfig): ModalConfig;

/**
 * Create a warning modal with warning icon and no cancel button
 * @param config - Modal configuration options
 * @returns Enhanced configuration with warning defaults
 */
export function withWarn(config: ModalConfig): ModalConfig;