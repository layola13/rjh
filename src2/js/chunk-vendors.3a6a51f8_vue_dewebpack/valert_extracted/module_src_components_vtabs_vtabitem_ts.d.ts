import VWindowItem from '../VWindow/VWindowItem';
import { VNode } from 'vue';

/**
 * VTabItem 组件
 * 
 * 标签页内容项组件，继承自 VWindowItem，用于在 VTabs 中显示对应标签的内容面板。
 * 每个 VTabItem 对应一个 VTab，通过 value 属性进行关联。
 */
declare const VTabItem: {
  /**
   * 组件名称
   */
  name: 'v-tab-item';

  /**
   * 组件属性定义
   */
  props: {
    /**
     * 标签页项的唯一标识符
     * 用于设置 DOM 元素的 id 属性，如果未提供则使用 value 作为 id
     */
    id: {
      type: typeof String;
      required: false;
    };
  };

  /**
   * 组件方法
   */
  methods: {
    /**
     * 生成窗口项的虚拟 DOM 节点
     * 
     * 重写父类 VWindowItem 的 genWindowItem 方法，
     * 为生成的元素添加 id 属性（优先使用 props.id，其次使用 value）
     * 
     * @returns 包含 domProps.id 的 VNode 虚拟节点
     */
    genWindowItem(): VNode;
  };
};

export default VTabItem;