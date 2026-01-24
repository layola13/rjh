import Bootable from '../bootable';
import { VNode } from 'vue';
import Vue from 'vue';

/**
 * Detachable Mixin
 * 
 * Provides functionality to detach components from their parent and attach them
 * to a different DOM element, typically used for overlays, dialogs, and menus
 * to avoid z-index and overflow issues.
 */
export interface DetachableProps {
  /**
   * Specifies where to attach the component in the DOM.
   * - false: Do not detach (default)
   * - true or 'attach': Attach to [data-app] element
   * - string: CSS selector for target element
   * - HTMLElement: Direct element reference
   */
  attach: boolean | string | Element;

  /**
   * CSS class to apply to the content wrapper element
   */
  contentClass: string;
}

export interface DetachableData {
  /**
   * Reference to the activator VNode(s) that trigger the detachable content
   */
  activatorNode: VNode | VNode[] | null;

  /**
   * Flag indicating whether the content has been detached from its original position
   */
  hasDetached: boolean;
}

export interface DetachableMethods {
  /**
   * Retrieves scope ID attributes from the component's VNode context
   * Used to maintain scoped CSS when detaching components
   * 
   * @returns Object containing scope ID attribute, or undefined if not scoped
   */
  getScopeIdAttrs(): Record<string, string> | undefined;

  /**
   * Initializes the detachment process by moving the content element
   * to the specified attach target in the DOM
   * 
   * Handles various attach prop values:
   * - Empty string/'attach'/true: Uses [data-app] element
   * - CSS selector string: Queries for matching element
   * - Element reference: Uses directly
   * - false: No detachment occurs
   */
  initDetach(): void;
}

export interface DetachableComputed {
  /**
   * Indicates whether the component has content to display
   * Should be implemented by components using this mixin
   */
  hasContent?: boolean;

  /**
   * Indicates whether the component is currently active
   * Should be implemented by components using this mixin
   */
  isActive?: boolean;
}

/**
 * Detachable Vue Mixin
 * 
 * Extends Bootable mixin to provide DOM detachment capabilities.
 * Allows components to render their content in a different location in the DOM tree
 * while maintaining Vue's reactivity and component lifecycle.
 * 
 * @example
 *