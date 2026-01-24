/**
 * VSlideItem Component
 * 
 * A slide item component that extends BaseItem with slide group functionality.
 * Used within VSlideGroup to create slidable/scrollable item groups.
 * 
 * @module VSlideItem
 */

import { VueConstructor } from 'vue';
import { BaseItem } from '../VItemGroup/VItem';
import { factory as groupableFactory } from '../../mixins/groupable';

/**
 * VSlideItem component props interface
 */
export interface VSlideItemProps {
  /** The value used for selection/activation within the slide group */
  value?: any;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** The active class to apply when item is selected */
  activeClass?: string;
}

/**
 * VSlideItem component instance interface
 */
export interface VSlideItem extends InstanceType<typeof BaseItem> {
  /** Component name identifier */
  readonly $options: {
    name: 'v-slide-item';
  };
}

/**
 * VSlideItem Vue component constructor
 * 
 * Creates a slide item that can be used within a VSlideGroup.
 * Combines BaseItem functionality with groupable slide group behavior.
 * 
 * @example
 *