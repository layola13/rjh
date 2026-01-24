/**
 * VInput 组件类型定义
 * 基础输入组件，提供标签、图标、验证消息等通用输入功能
 */

import Vue, { VNode, VNodeData } from 'vue';
import { PropType } from 'vue';

/**
 * VInput 组件的 Props 定义
 */
export interface VInputProps {
  /** 追加图标名称 */
  appendIcon?: string;
  /** 背景颜色 */
  backgroundColor?: string;
  /** 紧凑模式 */
  dense?: boolean;
  /** 组件高度 */
  height?: number | string;
  /** 隐藏详细信息（验证消息/提示） */
  hideDetails?: boolean | string;
  /** 提示文本 */
  hint?: string;
  /** 输入框ID */
  id?: string;
  /** 标签文本 */
  label?: string;
  /** 加载状态 */
  loading?: boolean;
  /** 持久显示提示 */
  persistentHint?: boolean;
  /** 前置图标名称 */
  prependIcon?: string;
  /** 输入值 */
  value?: any;
}

/**
 * VInput 组件的 Data 定义
 */
export interface VInputData {
  /** 懒加载的值 */
  lazyValue: any;
  /** 鼠标按下状态 */
  hasMouseDown: boolean;
}

/**
 * VInput 组件的计算属性定义
 */
export interface VInputComputed {
  /** CSS 类名对象 */
  classes: Record<string, boolean>;
  /** 计算后的 ID */
  computedId: string;
  /** 是否有详细信息 */
  hasDetails: boolean;
  /** 是否有提示 */
  hasHint: boolean;
  /** 是否有标签 */
  hasLabel: boolean;
  /** 内部值的 getter/setter */
  internalValue: any;
  /** 是否为脏值（已输入） */
  isDirty: boolean;
  /** 标签是否激活 */
  isLabelActive: boolean;
  /** 要显示的消息列表 */
  messagesToDisplay: string[];
  /** 是否显示详细信息 */
  showDetails: boolean;
}

/**
 * VInput 组件的方法定义
 */
export interface VInputMethods {
  /**
   * 生成内容区域
   * @returns VNode 数组
   */
  genContent(): VNode[];

  /**
   * 生成控制区域
   * @returns VNode
   */
  genControl(): VNode;

  /**
   * 生成默认插槽内容
   * @returns VNode 数组
   */
  genDefaultSlot(): VNode[];

  /**
   * 生成图标元素
   * @param iconType - 图标类型（append/prepend）
   * @param clickHandler - 点击处理函数
   * @param options - 额外选项
   * @returns VNode
   */
  genIcon(
    iconType: string,
    clickHandler?: (event: MouseEvent) => void,
    options?: Partial<VNodeData>
  ): VNode;

  /**
   * 生成输入插槽
   * @returns VNode
   */
  genInputSlot(): VNode;

  /**
   * 生成标签元素
   * @returns VNode | null
   */
  genLabel(): VNode | null;

  /**
   * 生成消息区域
   * @returns VNode | null
   */
  genMessages(): VNode | null;

  /**
   * 生成插槽包装器
   * @param prefix - 前缀
   * @param slotType - 插槽类型
   * @param content - 内容节点数组
   * @returns VNode | null
   */
  genSlot(prefix: string, slotType: string, content: VNode[]): VNode | null;

  /**
   * 生成前置插槽
   * @returns VNode | null
   */
  genPrependSlot(): VNode | null;

  /**
   * 生成追加插槽
   * @returns VNode | null
   */
  genAppendSlot(): VNode | null;

  /**
   * 点击事件处理
   * @param event - 鼠标事件
   */
  onClick(event: MouseEvent): void;

  /**
   * 鼠标按下事件处理
   * @param event - 鼠标事件
   */
  onMouseDown(event: MouseEvent): void;

  /**
   * 鼠标释放事件处理
   * @param event - 鼠标事件
   */
  onMouseUp(event: MouseEvent): void;
}

/**
 * VInput 组件定义
 */
declare const VInput: Vue.ExtendedVue<
  Vue,
  VInputData,
  VInputMethods,
  VInputComputed,
  VInputProps
>;

export default VInput;