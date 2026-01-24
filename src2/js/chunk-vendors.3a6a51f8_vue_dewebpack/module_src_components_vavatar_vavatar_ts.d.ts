/**
 * VAvatar component - A circular or rounded avatar component for displaying user images or icons
 * @module VAvatar
 */

import Vue, { VNode, VNodeData } from 'vue';
import { PropType } from 'vue/types/options';

/**
 * Props interface for VAvatar component
 */
export interface VAvatarProps {
  /**
   * Aligns the avatar to the left
   * @default false
   */
  left?: boolean;
  
  /**
   * Aligns the avatar to the right
   * @default false
   */
  right?: boolean;
  
  /**
   * Size of the avatar in pixels
   * @default 48
   */
  size?: number | string;
  
  /**
   * Background color of the avatar
   * Accepts color name or hex value
   */
  color?: string;
  
  /**
   * Height of the avatar
   */
  height?: number | string;
  
  /**
   * Maximum height of the avatar
   */
  maxHeight?: number | string;
  
  /**
   * Maximum width of the avatar
   */
  maxWidth?: number | string;
  
  /**
   * Minimum height of the avatar
   */
  minHeight?: number | string;
  
  /**
   * Minimum width of the avatar
   */
  minWidth?: number | string;
  
  /**
   * Width of the avatar
   */
  width?: number | string;
  
  /**
   * Makes the avatar rounded
   */
  rounded?: boolean | string;
  
  /**
   * Makes the avatar circular
   */
  tile?: boolean;
}

/**
 * Computed properties interface for VAvatar component
 */
export interface VAvatarComputed {
  /**
   * CSS classes for the avatar
   */
  classes: Record<string, boolean>;
  
  /**
   * Inline styles for the avatar
   */
  styles: Record<string, string | undefined>;
  
  /**
   * Rounded CSS classes from roundable mixin
   */
  roundedClasses: Record<string, boolean>;
  
  /**
   * Measurable styles from measurable mixin
   */
  measurableStyles: Record<string, string | undefined>;
}

/**
 * Methods interface for VAvatar component
 */
export interface VAvatarMethods {
  /**
   * Sets background color on the element
   * @param color - Color name or hex value
   * @param data - Vue VNode data object
   * @returns Modified VNode data with background color applied
   */
  setBackgroundColor(color: string | undefined, data: VNodeData): VNodeData;
}

/**
 * VAvatar component instance type
 */
export interface VAvatar extends Vue, VAvatarMethods {
  readonly $props: VAvatarProps;
  readonly classes: Record<string, boolean>;
  readonly styles: Record<string, string | undefined>;
}

/**
 * VAvatar component declaration
 */
declare const VAvatar: {
  new (): VAvatar;
};

export default VAvatar;