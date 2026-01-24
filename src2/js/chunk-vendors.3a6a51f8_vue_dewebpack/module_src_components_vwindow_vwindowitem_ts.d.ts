import Vue, { VNode, VNodeData } from 'vue';
import { PropType } from 'vue';

/**
 * Props interface for VWindowItem component
 */
interface VWindowItemProps {
  /** Whether the window item is disabled */
  disabled: boolean;
  /** Transition to use when navigating in reverse direction */
  reverseTransition: boolean | string | undefined;
  /** Transition to use when navigating forward */
  transition: boolean | string | undefined;
  /** The value used for groupable functionality */
  value?: any;
}

/**
 * Data interface for VWindowItem component
 */
interface VWindowItemData {
  /** Whether this item is currently active in the window group */
  isActive: boolean;
  /** Whether the item is currently transitioning */
  inTransition: boolean;
}

/**
 * Computed properties interface for VWindowItem component
 */
interface VWindowItemComputed {
  /** CSS classes applied to the component based on group state */
  classes: Record<string, boolean>;
  /** The computed transition name based on direction and props */
  computedTransition: string | boolean;
}

/**
 * Window group instance interface
 */
interface WindowGroup extends Vue {
  /** Whether the window is transitioning in reverse */
  internalReverse: boolean;
  /** The computed transition for the window group */
  computedTransition: string | boolean;
  /** Count of active transitions */
  transitionCount: number;
  /** Height used during transitions */
  transitionHeight?: string | number;
  /** Root element of the window group */
  $el: HTMLElement;
}

/**
 * Methods interface for VWindowItem component
 */
interface VWindowItemMethods {
  /**
   * Generate the default slot content
   * @returns The default slot VNodes
   */
  genDefaultSlot(): VNode[] | undefined;
  
  /**
   * Generate the root window item element
   * @returns The window item VNode
   */
  genWindowItem(): VNode;
  
  /**
   * Handler called after a transition completes
   */
  onAfterTransition(): void;
  
  /**
   * Handler called before a transition starts
   */
  onBeforeTransition(): void;
  
  /**
   * Handler called when a transition is cancelled
   */
  onTransitionCancelled(): void;
  
  /**
   * Handler called when entering transition begins
   * @param element - The DOM element being transitioned
   */
  onEnter(element: HTMLElement): void;
}

/**
 * VWindowItem component declaration
 * A child component of VWindow that represents a single panel/slide
 * Supports transitions, lazy loading via bootable mixin, and touch gestures
 */
declare const VWindowItem: Vue.extend<
  VWindowItemData,
  VWindowItemMethods,
  VWindowItemComputed,
  VWindowItemProps
> & {
  /** Component name */
  name: 'v-window-item';
  
  /** Reference to the parent window group */
  windowGroup: WindowGroup;
  
  /** Classes inherited from groupable mixin */
  groupClasses: Record<string, boolean>;
  
  /**
   * Lazy content method from bootable mixin
   * @param content - Function that returns the content to render
   * @returns VNode or array of VNodes
   */
  showLazyContent(content: () => VNode[]): VNode | VNode[];
  
  /**
   * Render function
   * @param createElement - Vue's createElement function
   * @returns The rendered VNode
   */
  render(createElement: typeof Vue.prototype.$createElement): VNode;
};

export default VWindowItem;