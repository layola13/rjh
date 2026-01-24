import { VNode, CreateElement, RenderContext } from 'vue';

/**
 * Props interface for VListItemIcon component
 */
interface VListItemIconProps {}

/**
 * Data interface for functional component context
 */
interface VListItemIconData {
  /** Static CSS class names applied to the component */
  staticClass?: string;
  /** Additional data attributes */
  [key: string]: unknown;
}

/**
 * Functional component context for VListItemIcon
 */
interface VListItemIconContext extends RenderContext<VListItemIconProps> {
  /** Component data including classes and attributes */
  data: VListItemIconData;
  /** Child VNodes to be rendered inside the component */
  children?: VNode[];
}

/**
 * VListItemIcon - A functional component that renders an icon container for list items
 * 
 * This component wraps icon elements and applies the appropriate styling classes
 * for use within VListItem components.
 * 
 * @param createElement - Vue's render function for creating VNodes
 * @param context - The render context containing data and children
 * @returns A div VNode with the icon styling applied
 */
declare function render(
  createElement: CreateElement,
  context: VListItemIconContext
): VNode;

/**
 * VListItemIcon component definition
 * 
 * A functional component that provides a styled container for icons in list items.
 * It automatically applies the 'v-list-item__icon' class and preserves any
 * additional classes passed through the data object.
 */
declare const VListItemIcon: {
  /** Component name for debugging and DevTools */
  readonly name: 'v-list-item-icon';
  /** Marks this as a functional component (no instance, stateless) */
  readonly functional: true;
  /** Render function that generates the component's VNode */
  readonly render: typeof render;
};

export default VListItemIcon;