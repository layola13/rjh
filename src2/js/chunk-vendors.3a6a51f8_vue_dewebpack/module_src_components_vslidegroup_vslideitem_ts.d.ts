/**
 * VSlideItem component - A slide item component that combines BaseItem functionality with slide group behavior.
 * @module VSlideItem
 */

import { BaseItem } from '../VItemGroup/VItem';
import { factory as groupableFactory } from '../../mixins/groupable';
import { mixins } from '../../util/mixins';
import { VueConstructor } from 'vue';

/**
 * Props interface for VSlideItem component
 */
export interface VSlideItemProps {
  /** The value used when the item is selected */
  value?: any;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** The active class to apply when selected */
  activeClass?: string;
}

/**
 * VSlideItem component
 * Combines BaseItem with slideGroup groupable functionality to create slide items
 * that can be selected within a VSlideGroup container.
 */
declare const VSlideItem: VueConstructor<
  Vue & 
  InstanceType<typeof BaseItem> & 
  ReturnType<typeof groupableFactory>
>;

export default VSlideItem;