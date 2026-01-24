/**
 * VAvatar Component Type Definitions
 * A circular or rounded component for displaying avatars, icons, or images
 */

import Vue, { VNode, CreateElement } from 'vue';
import { PropType } from 'vue/types/options';

/**
 * Props interface for VAvatar component
 */
export interface VAvatarProps {
  /**
   * Applies appropriate margins when used inside a button group.
   * Aligns component towards the left.
   */
  left?: boolean;
  
  /**
   * Applies appropriate margins when used inside a button group.
   * Aligns component towards the right.
   */
  right?: boolean;
  
  /**
   * Sets the height and width of the avatar.
   * Can be a number (pixels) or string with units.
   * @default 48
   */
  size?: number | string;
  
  /**
   * Applies specified color to the control.
   * Can be any material color or hex value.
   */
  color?: string;
  
  /**
   * Designates the border-radius applied to the component.
   * Can be 0, xs, sm, md, lg, xl, pill, circle, or a number.
   */
  rounded?: boolean | string;
  
  /**
   * Sets the height for the component.
   */
  height?: number | string;
  
  /**
   * Sets the maximum height for the component.
   */
  maxHeight?: number | string;
  
  /**
   * Sets the maximum width for the component.
   */
  maxWidth?: number | string;
  
  /**
   * Sets the minimum height for the component.
   */
  minHeight?: number | string;
  
  /**
   * Sets the minimum width for the component.
   */
  minWidth?: number | string;
  
  /**
   * Sets the width for the component.
   */
  width?: number | string;
}

/**
 * Computed properties interface for VAvatar component
 */
export interface VAvatarComputed {
  /**
   * Computed CSS classes for the avatar
   * Combines position classes (left/right) with rounded classes
   */
  classes: Record<string, boolean>;
  
  /**
   * Computed inline styles for the avatar
   * Combines size styles with measurable styles
   */
  styles: Record<string, string>;
  
  /**
   * Classes for rounded borders (inherited from roundable mixin)
   */
  roundedClasses: Record<string, boolean>;
  
  /**
   * Styles for measurable properties (inherited from measurable mixin)
   */
  measurableStyles: Record<string, string>;
}

/**
 * Methods interface for VAvatar component
 */
export interface VAvatarMethods {
  /**
   * Sets background color on the element
   * Inherited from colorable mixin
   */
  setBackgroundColor(color: string | undefined, data: Record<string, any>): Record<string, any>;
}

/**
 * VAvatar Component
 * 
 * The v-avatar component is typically used to display circular user profile pictures.
 * This component will allow you to dynamically size and add a border radius.
 */
export interface VAvatar extends Vue, VAvatarProps, VAvatarComputed, VAvatarMethods {
  /**
   * Render function for the component
   * @param createElement - Vue's createElement function
   * @returns Virtual DOM node
   */
  render(createElement: CreateElement): VNode;
}

declare const VAvatar: {
  new (): VAvatar;
};

export default VAvatar;