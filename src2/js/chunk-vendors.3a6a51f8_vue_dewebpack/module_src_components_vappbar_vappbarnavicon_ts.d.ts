import type { VNode, CreateElement, RenderContext, VNodeData } from 'vue';
import type VIcon from '../VIcon';
import type VBtn from '../VBtn/VBtn';

/**
 * Props for VAppBarNavIcon component
 */
export interface VAppBarNavIconProps {
  /** Additional props passed to the underlying VBtn component */
  [key: string]: any;
}

/**
 * Data object for VAppBarNavIcon functional component
 */
export interface VAppBarNavIconData extends VNodeData {
  /** Static CSS class names */
  staticClass?: string;
  /** Component props */
  props?: VAppBarNavIconProps;
}

/**
 * VAppBarNavIcon - A functional component that renders a navigation icon button for the app bar.
 * 
 * This component is a specialized button that displays a menu icon (hamburger menu) typically
 * used to toggle navigation drawers or side menus in application bars.
 * 
 * @remarks
 * - This is a functional component (no instance state)
 * - Automatically applies 'v-app-bar__nav-icon' class
 * - Renders as an icon button (icon prop set to true)
 * - Defaults to showing a menu icon if no slot content provided
 */
declare const VAppBarNavIcon: {
  /** Component name used for registration */
  name: 'v-app-bar-nav-icon';
  
  /** Indicates this is a functional component */
  functional: true;
  
  /**
   * Render function for the functional component
   * 
   * @param createElement - Vue's createElement function for creating VNodes
   * @param context - The render context containing component data
   * @returns A VNode representing the rendered button with icon
   */
  render(
    createElement: CreateElement,
    context: RenderContext<VAppBarNavIconProps>
  ): VNode;
};

export default VAppBarNavIcon;