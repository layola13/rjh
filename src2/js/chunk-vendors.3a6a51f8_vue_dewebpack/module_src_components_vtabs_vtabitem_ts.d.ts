import { VNode } from 'vue';
import VWindowItem from '../VWindow/VWindowItem';

/**
 * VTabItem 组件类型声明
 * 
 * VTabItem 是基于 VWindowItem 扩展的组件，用于在 VTabs 中显示标签页内容。
 * 继承了 VWindowItem 的所有功能，并添加了对 HTML id 属性的支持。
 */
declare const VTabItem: import('vue').ExtendedVue<
  typeof VWindowItem,
  {},
  {
    /**
     * 生成窗口项的虚拟节点
     * 
     * 覆盖父类方法，为生成的元素添加 DOM 属性（id）。
     * id 优先使用 props.id，如果未提供则回退到 value 属性。
     * 
     * @returns {VNode} 包含 DOM 属性的虚拟节点
     */
    genWindowItem(): VNode;
  },
  {},
  {
    /**
     * HTML 元素的 id 属性
     * 
     * 用于设置标签页内容容器的 id，便于 ARIA 无障碍访问和样式定制。
     * 如果未提供，将使用组件的 value 属性作为 id。
     * 
     * @type {string | undefined}
     */
    id?: string;
  }
>;

export default VTabItem;