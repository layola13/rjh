import VAvatar from '../VAvatar';
import Vue, { VNode, CreateElement } from 'vue';

/**
 * VListItemAvatar Component
 * 
 * A specialized avatar component designed for use within list items.
 * Extends VAvatar with additional styling and layout options for list contexts.
 */
interface VListItemAvatarProps {
  /**
   * Whether to display the avatar in horizontal orientation
   * @default false
   */
  horizontal: boolean;

  /**
   * Size of the avatar in pixels
   * Can be a number or string value
   * @default 40
   */
  size: number | string;

  /**
   * Whether to remove border radius (inherited from VAvatar)
   */
  tile?: boolean;
}

/**
 * Computed properties for VListItemAvatar component
 */
interface VListItemAvatarComputed {
  /**
   * Generates CSS classes for the avatar based on props and parent computed classes
   * @returns Object containing CSS class names as keys with boolean values
   */
  classes: Record<string, boolean>;
}

/**
 * VListItemAvatar Component Definition
 * 
 * Extended VAvatar component with list-specific styling and behavior.
 * Automatically applies appropriate classes for horizontal layout and tile rendering.
 */
declare const VListItemAvatar: Vue.ExtendedVue<
  Vue,
  {},
  {},
  VListItemAvatarComputed,
  VListItemAvatarProps
> & {
  /**
   * Render function that wraps VAvatar's render output with list-item specific classes
   * @param createElement - Vue's createElement function
   * @returns Virtual DOM node with enhanced data properties
   */
  render(createElement: CreateElement): VNode;
};

export default VListItemAvatar;