import { VNode, RenderContext, CreateElement } from 'vue';

/**
 * Props for VListItemIcon component
 */
export interface VListItemIconProps {}

/**
 * Data object passed to functional component render function
 */
export interface VListItemIconData {
  /** Static CSS class names */
  staticClass?: string;
  /** Dynamic CSS class names */
  class?: string | Record<string, boolean> | Array<string | Record<string, boolean>>;
  /** Inline styles */
  style?: Record<string, string | number>;
  /** HTML attributes */
  attrs?: Record<string, unknown>;
  /** DOM properties */
  props?: Record<string, unknown>;
  /** Event listeners */
  on?: Record<string, Function | Function[]>;
  /** Native event listeners */
  nativeOn?: Record<string, Function | Function[]>;
  /** Slot content */
  slot?: string;
  /** Scoped slots */
  scopedSlots?: Record<string, Function>;
  /** Unique key for v-for */
  key?: string | number;
  /** Ref reference */
  ref?: string;
  /** Ref in v-for */
  refInFor?: boolean;
}

/**
 * Context object for functional component
 */
export interface VListItemIconContext extends RenderContext<VListItemIconProps> {
  /** Component data including classes, styles, attrs, etc. */
  data: VListItemIconData;
  /** Child VNodes */
  children?: VNode[];
}

/**
 * Functional component for rendering list item icons.
 * Wraps children in a div with the v-list-item__icon class.
 */
declare const VListItemIcon: {
  /** Component name */
  name: 'v-list-item-icon';
  /** Marks component as functional (stateless, no instance) */
  functional: true;
  /**
   * Render function for the functional component
   * @param h - Vue's createElement function
   * @param context - Render context containing data and children
   * @returns Virtual DOM node representing the icon container
   */
  render(
    h: CreateElement,
    context: VListItemIconContext
  ): VNode;
};

export default VListItemIcon;