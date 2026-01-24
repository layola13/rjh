import VAvatar from '../VAvatar';
import Vue, { VNode, CreateElement } from 'vue';

/**
 * VListItemAvatar Component
 * 
 * A specialized avatar component designed for use within list items.
 * Extends VAvatar with additional styling and layout options for list contexts.
 */
export interface VListItemAvatarProps {
  /**
   * Applies horizontal layout styling to the avatar
   * @default false
   */
  horizontal: boolean;

  /**
   * Sets the width and height of the avatar
   * @default 40
   */
  size: number | string;

  /**
   * Removes border radius, making the avatar square
   * Inherited from VAvatar
   */
  tile?: boolean;
}

export interface VListItemAvatarComputed {
  /**
   * Computed CSS classes for the avatar component
   * Combines base VAvatar classes with list-specific classes
   */
  classes: Record<string, boolean>;
}

/**
 * VListItemAvatar Component Definition
 * 
 * A Vue component that renders an avatar optimized for list item layouts.
 * Supports both horizontal and vertical orientations.
 */
declare const VListItemAvatar: Vue.ExtendedVue<
  Vue,
  {},
  {},
  VListItemAvatarComputed,
  VListItemAvatarProps
> & {
  name: 'v-list-item-avatar';
  
  /**
   * Render function that creates the avatar VNode with list-specific styling
   * @param createElement - Vue's createElement function
   * @returns Virtual DOM node with applied list item avatar classes
   */
  render(createElement: CreateElement): VNode;
};

export default VListItemAvatar;