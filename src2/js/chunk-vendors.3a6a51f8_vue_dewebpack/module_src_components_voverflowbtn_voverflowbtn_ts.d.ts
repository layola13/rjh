import { VNodeData } from 'vue';
import { PropType } from 'vue';

/**
 * VOverflowBtn 组件
 * 
 * 基于 VAutocomplete 扩展的溢出按钮组件，支持可编辑和分段模式
 */
export default class VOverflowBtn {
  /** 组件名称 */
  name: 'v-overflow-btn';

  // ==================== Props ====================

  /**
   * 是否可编辑模式
   * 当启用时，允许用户直接在输入框中输入值
   */
  editable: boolean;

  /**
   * 是否为分段按钮模式
   * 当启用时，选中的项将渲染为可点击的按钮
   */
  segmented: boolean;

  // ==================== Computed Properties ====================

  /**
   * 计算组件的 CSS 类名
   * 
   * @returns 包含所有应用类名的对象
   */
  readonly classes: {
    'v-overflow-btn': true;
    'v-overflow-btn--segmented': boolean;
    'v-overflow-btn--editable': boolean;
    [key: string]: boolean;
  };

  /**
   * 是否允许任意值
   * 在可编辑模式下返回 true，否则继承父类行为
   * 
   * @returns 是否允许用户输入任意值
   */
  readonly isAnyValueAllowed: boolean;

  /**
   * 是否为单选模式
   * VOverflowBtn 始终为单选
   * 
   * @returns 始终返回 true
   */
  readonly isSingle: true;

  /**
   * 计算要显示的选项列表
   * 
   * @returns 在分段模式下返回所有项，否则返回过滤后的项
   */
  readonly computedItems: unknown[];

  // ==================== Methods ====================

  /**
   * 生成选中项的渲染内容
   * 根据 editable 属性决定使用 VAutocomplete 或 VSelect 的实现
   * 
   * @returns 渲染的 VNode 或 VNode 数组
   */
  genSelections(): unknown;

  /**
   * 生成逗号分隔的选中项
   * 
   * @param item - 要渲染的选项项
   * @param index - 项的索引
   * @param isLast - 是否为最后一项
   * @returns 在分段模式下返回分段按钮，否则使用 VSelect 的默认实现
   */
  genCommaSelection(item: unknown, index: number, isLast: boolean): unknown;

  /**
   * 生成输入框元素
   * 
   * @returns 配置了适当属性的输入框 VNode
   */
  genInput(): {
    data: VNodeData & {
      domProps: {
        /** 输入框的值，可编辑模式下显示搜索文本 */
        value: string;
      };
      attrs: {
        /** 非可编辑模式下设为只读 */
        readonly: boolean;
      };
    };
    [key: string]: unknown;
  };

  /**
   * 生成标签元素
   * 在可编辑且聚焦状态下隐藏标签
   * 
   * @returns 标签 VNode 或 null
   */
  genLabel(): {
    data: VNodeData & {
      /** 标签的内联样式 */
      style: Record<string, unknown>;
    };
    [key: string]: unknown;
  } | null;

  /**
   * 生成分段按钮
   * 
   * @param item - 选项项，必须包含 text 和 callback 属性
   * @returns 按钮 VNode，如果项缺少必需属性则返回 null 并发出警告
   */
  genSegmentedBtn(item: {
    text?: string;
    callback?: (event: Event) => void;
    [key: string]: unknown;
  }): unknown | null;

  /**
   * 更新组件值
   * 
   * @param focused - 是否处于聚焦状态
   * @description 在失去焦点时，如果值发生变化则触发 change 事件
   */
  updateValue(focused: boolean): void;

  // ==================== Internal Properties ====================

  /**
   * 内部搜索文本
   * @internal
   */
  internalSearch: string;

  /**
   * 当前是否聚焦
   * @internal
   */
  isFocused: boolean;

  /**
   * 初始值，用于检测值变化
   * @internal
   */
  initialValue: unknown;

  /**
   * 懒加载的值
   * @internal
   */
  lazyValue: unknown;

  /**
   * 所有可用项
   * @internal
   */
  allItems: unknown[];

  /**
   * 过滤后的项
   * @internal
   */
  filteredItems: unknown[];

  /**
   * 获取选项项的值
   * @param item - 选项项
   * @returns 项的值
   * @internal
   */
  getValue(item: unknown): unknown;
}