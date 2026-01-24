/**
 * VInput 组件类型定义
 * 基础输入组件，为其他表单控件提供通用功能
 */

import Vue, { VNode, VueConstructor } from 'vue';
import { PropType } from 'vue';

/**
 * VInput 组件属性接口
 */
export interface VInputProps {
  /** 追加图标名称 */
  appendIcon?: string;
  
  /** 背景颜色 */
  backgroundColor?: string;
  
  /** 密集模式，减小组件高度 */
  dense?: boolean;
  
  /** 组件高度 */
  height?: number | string;
  
  /** 隐藏详情信息（验证消息、提示等）
   * - true: 始终隐藏
   * - false: 始终显示
   * - 'auto': 有内容时显示
   */
  hideDetails?: boolean | 'auto';
  
  /** 提示文本 */
  hint?: string;
  
  /** 组件 DOM ID */
  id?: string;
  
  /** 标签文本 */
  label?: string;
  
  /** 加载状态 */
  loading?: boolean;
  
  /** 持久化提示（不依赖焦点状态） */
  persistentHint?: boolean;
  
  /** 前置图标名称 */
  prependIcon?: string;
  
  /** 组件值 */
  value?: any;
}

/**
 * VInput 组件数据接口
 */
export interface VInputData {
  /** 懒加载值（内部状态） */
  lazyValue: any;
  
  /** 是否处于鼠标按下状态 */
  hasMouseDown: boolean;
}

/**
 * VInput 组件计算属性接口
 */
export interface VInputComputed {
  /** 组件 CSS 类名对象 */
  classes: Record<string, boolean>;
  
  /** 计算后的 ID（自动生成或使用 prop） */
  computedId: string;
  
  /** 是否有详情内容需要显示 */
  hasDetails: boolean;
  
  /** 是否有提示信息 */
  hasHint: boolean;
  
  /** 是否有标签 */
  hasLabel: boolean;
  
  /** 内部值（getter/setter） */
  internalValue: any;
  
  /** 是否为脏状态（已输入内容） */
  isDirty: boolean;
  
  /** 标签是否激活状态 */
  isLabelActive: boolean;
  
  /** 需要显示的消息列表 */
  messagesToDisplay: string[];
  
  /** 是否显示详情区域 */
  showDetails: boolean;
}

/**
 * VInput 组件方法接口
 */
export interface VInputMethods {
  /**
   * 生成内容区域
   * @returns VNode 数组
   */
  genContent(): VNode[];
  
  /**
   * 生成控制区域（输入槽 + 消息）
   * @returns VNode
   */
  genControl(): VNode;
  
  /**
   * 生成默认插槽内容
   * @returns VNode 数组
   */
  genDefaultSlot(): VNode[];
  
  /**
   * 生成图标
   * @param type - 图标类型（prepend/append）
   * @param callback - 点击回调函数
   * @param options - 额外选项
   * @returns VNode
   */
  genIcon(
    type: string,
    callback?: (event: MouseEvent) => void,
    options?: Record<string, any>
  ): VNode;
  
  /**
   * 生成输入槽
   * @returns VNode
   */
  genInputSlot(): VNode;
  
  /**
   * 生成标签
   * @returns VNode | null
   */
  genLabel(): VNode | null;
  
  /**
   * 生成消息区域
   * @returns VNode | null
   */
  genMessages(): VNode | null;
  
  /**
   * 生成插槽容器
   * @param prefix - 前缀（prepend/append）
   * @param location - 位置标识
   * @param content - 内容节点数组
   * @returns VNode | null
   */
  genSlot(prefix: string, location: string, content: VNode[]): VNode | null;
  
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
 * VInput 组件插槽接口
 */
export interface VInputSlots {
  /** 默认插槽 */
  default?: VNode[];
  
  /** 标签插槽 */
  label?: VNode[];
  
  /** 前置插槽 */
  prepend?: VNode[];
  
  /** 追加插槽 */
  append?: VNode[];
  
  /** 消息插槽 */
  message?: (props: { key: number; message: string }) => VNode[];
}

/**
 * VInput 组件事件接口
 */
export interface VInputEvents {
  /** 值变化事件 */
  input: (value: any) => void;
  
  /** 点击事件 */
  click: (event: MouseEvent) => void;
  
  /** 鼠标按下事件 */
  mousedown: (event: MouseEvent) => void;
  
  /** 鼠标释放事件 */
  mouseup: (event: MouseEvent) => void;
  
  /** 前置图标点击事件 */
  'click:prepend'?: (event: MouseEvent) => void;
  
  /** 追加图标点击事件 */
  'click:append'?: (event: MouseEvent) => void;
}

/**
 * VInput 组件实例类型
 */
export type VInput = Vue & 
  VInputProps & 
  VInputData & 
  VInputComputed & 
  VInputMethods & {
    $slots: VInputSlots;
    $scopedSlots: VInputSlots;
  };

/**
 * VInput 组件构造器
 */
declare const VInput: VueConstructor<VInput>;

export default VInput;