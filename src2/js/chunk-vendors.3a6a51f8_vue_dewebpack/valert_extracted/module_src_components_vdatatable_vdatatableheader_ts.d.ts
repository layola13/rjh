/**
 * VDataTable Header Component
 * Renders either mobile or desktop version of data table header based on props
 */

import Vue, { VNode, CreateElement, RenderContext } from 'vue';
import { VDataTableHeaderMobile } from './VDataTableHeaderMobile';
import { VDataTableHeaderDesktop } from './VDataTableHeaderDesktop';
import { HeaderMixin } from './mixins/header';

/**
 * Props for VDataTableHeader component
 */
export interface VDataTableHeaderProps extends HeaderMixin.Props {
  /**
   * Whether to render mobile version of the header
   * @default false
   */
  mobile?: boolean;
}

/**
 * VDataTableHeader component definition
 * A functional component that delegates rendering to either mobile or desktop header
 */
declare const VDataTableHeader: Vue.ExtendedVue<
  Vue,
  {},
  {},
  {},
  VDataTableHeaderProps
> & {
  functional: true;
  render(
    createElement: CreateElement,
    context: RenderContext<VDataTableHeaderProps>
  ): VNode;
};

export default VDataTableHeader;

/**
 * Slot definitions for VDataTableHeader
 */
export interface VDataTableHeaderSlots {
  /**
   * Default slot for custom header content
   */
  default?: VNode[];
  
  /**
   * Slot for custom header cell rendering
   */
  'header.<name>'?: VNode[];
  
  /**
   * Slot for data table header progress indicator
   */
  'progress'?: VNode[];
}