/**
 * Vue Clipboard Plugin
 * 
 * A Vue.js plugin that provides clipboard copy/cut functionality using the clipboard.js library.
 * Supports both Vue 2 and Vue 3 with directive-based and programmatic API.
 */

import type { App, Plugin, DirectiveBinding, VNode } from 'vue';
import type ClipboardJS from 'clipboard';

/**
 * Configuration options for the clipboard plugin
 */
export interface ClipboardConfig {
  /**
   * Whether to automatically set the container element for the clipboard action
   * @default false
   */
  autoSetContainer: boolean;
  
  /**
   * Whether to temporarily append the trigger element to document.body
   * @default true
   */
  appendToBody: boolean;
}

/**
 * Event object returned on successful clipboard operation
 */
export interface ClipboardSuccessEvent {
  /**
   * The action performed ('copy' or 'cut')
   */
  action: 'copy' | 'cut';
  
  /**
   * The text that was copied/cut
   */
  text: string;
  
  /**
   * The trigger element
   */
  trigger: Element;
  
  /**
   * Clears the current selection
   */
  clearSelection(): void;
}

/**
 * Event object returned on clipboard operation failure
 */
export interface ClipboardErrorEvent {
  /**
   * The action that was attempted
   */
  action: 'copy' | 'cut';
  
  /**
   * The trigger element
   */
  trigger: Element;
}

/**
 * Extended HTMLElement with clipboard-related properties
 */
interface ClipboardElement extends HTMLElement {
  _vClipboard?: ClipboardJS;
  _vClipboard_success?: (event: ClipboardSuccessEvent) => void;
  _vClipboard_error?: (event: ClipboardErrorEvent) => void;
}

/**
 * Vue instance augmentation for Vue 2/3 compatibility
 */
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    /**
     * Global clipboard configuration
     */
    $clipboardConfig: ClipboardConfig;
    
    /**
     * Programmatically copy text to clipboard
     * @param text - The text to copy
     * @param container - Optional container element for the clipboard action
     * @returns Promise that resolves with success event or rejects with error event
     */
    $copyText(
      text: string,
      container?: HTMLElement | Element
    ): Promise<ClipboardSuccessEvent>;
  }
}

/**
 * Vue Clipboard Plugin
 */
export interface VueClipboardPlugin extends Plugin {
  /**
   * Install method for Vue.use()
   * @param app - Vue application instance
   */
  install(app: App): void;
  
  /**
   * Plugin configuration
   */
  config: ClipboardConfig;
}

/**
 * Default export - Vue Clipboard Plugin instance
 */
declare const VueClipboard: VueClipboardPlugin;

export default VueClipboard;

/**
 * Directive binding value types
 */
export type ClipboardDirectiveValue = 
  | string 
  | ((event: ClipboardSuccessEvent) => void)
  | ((event: ClipboardErrorEvent) => void);

/**
 * Directive argument types
 */
export type ClipboardDirectiveArg = 'copy' | 'cut' | 'success' | 'error';

/**
 * Clipboard directive binding
 */
export interface ClipboardDirectiveBinding extends DirectiveBinding {
  value: ClipboardDirectiveValue;
  arg?: ClipboardDirectiveArg;
}