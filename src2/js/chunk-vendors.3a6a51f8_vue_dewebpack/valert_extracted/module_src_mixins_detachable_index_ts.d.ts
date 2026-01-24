import Bootable from '../bootable';
import Vue, { VNode } from 'vue';

/**
 * Detachable Mixin
 * 
 * Provides functionality to detach component content and render it in a different
 * DOM location (e.g., document body or a specific container). Useful for modals,
 * dialogs, menus, and other overlay components that need to escape CSS overflow
 * or z-index constraints.
 */
declare const Detachable: Vue.VueConstructor<
  Vue & {
    // Props
    /**
     * Specifies where to attach the component's content in the DOM.
     * - `false`: Do not detach (default behavior)
     * - `true` or `'attach'`: Attach to `[data-app]` element
     * - `string`: CSS selector for target container
     * - `Element`: Direct DOM element reference
     */
    attach: boolean | string | Element;

    /**
     * CSS class(es) to apply to the detached content wrapper
     */
    contentClass: string;

    // Data
    /**
     * Reference to the activator VNode(s) that trigger the detachable content
     */
    activatorNode: VNode | VNode[] | null;

    /**
     * Flag indicating whether the content has been successfully detached
     */
    hasDetached: boolean;

    /**
     * Indicates if the component currently has content to render
     * (must be implemented by component using this mixin)
     */
    hasContent: boolean;

    /**
     * Active state of the component
     * (must be implemented by component using this mixin)
     */
    isActive: boolean;

    // Methods
    /**
     * Retrieves scope ID attributes from the component's VNode context
     * for proper CSS scoping in detached content
     * 
     * @returns Object containing the scope ID attribute, or undefined
     */
    getScopeIdAttrs(): Record<string, string> | undefined;

    /**
     * Initializes the detachment process by moving the content element
     * to the specified attach target in the DOM
     * 
     * Logs a warning if the target element cannot be found
     */
    initDetach(): void;
  }
>;

export default Detachable;