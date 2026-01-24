/**
 * VAppBarNavIcon Component
 * A functional component that renders a navigation icon button for the app bar.
 * Typically used to toggle navigation drawers or menus.
 */

import { VNode, CreateElement, RenderContext, FunctionalComponentOptions } from 'vue';
import { VIcon } from '../VIcon';
import { VBtn } from '../VBtn/VBtn';

/**
 * Props interface for VAppBarNavIcon component
 */
export interface VAppBarNavIconProps {
  /** Any additional props to pass to the underlying VBtn component */
  [key: string]: unknown;
}

/**
 * Slots interface for VAppBarNavIcon component
 */
export interface VAppBarNavIconSlots {
  /** Default slot for custom icon content */
  default?: VNode[];
}

/**
 * VAppBarNavIcon functional component definition
 * Renders a menu icon button for app bar navigation
 */
declare const VAppBarNavIcon: FunctionalComponentOptions<VAppBarNavIconProps>;

export default VAppBarNavIcon;

/**
 * Component configuration type
 */
export type VAppBarNavIconComponent = typeof VAppBarNavIcon;

/**
 * Render function signature for VAppBarNavIcon
 * @param createElement - Vue's createElement function
 * @param context - Render context containing slots, listeners, props, and data
 * @returns VNode representing the rendered component
 */
export declare function render(
  createElement: CreateElement,
  context: RenderContext<VAppBarNavIconProps>
): VNode;