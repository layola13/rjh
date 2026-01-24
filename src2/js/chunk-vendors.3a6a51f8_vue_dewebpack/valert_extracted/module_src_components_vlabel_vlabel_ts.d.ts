/**
 * VLabel 组件类型定义
 * 标签组件，用于表单字段的标签显示
 */

import Vue, { VNode, CreateElement, RenderContext } from 'vue';
import { PropType } from 'vue';

/**
 * VLabel 组件的属性接口
 */
export interface VLabelProps {
  /**
   * 是否使用绝对定位
   * @default false
   */
  absolute?: boolean;

  /**
   * 标签颜色（当 focused 为 true 时应用）
   * @default 'primary'
   */
  color?: string;

  /**
   * 是否禁用状态
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否聚焦状态
   * @default false
   */
  focused?: boolean;

  /**
   * 关联的表单元素 ID（对应 HTML for 属性）
   */
  for?: string;

  /**
   * 左侧偏移量（数字或字符串，支持 px、%等单位）
   * @default 0
   */
  left?: number | string;

  /**
   * 右侧偏移量（数字或字符串，支持 px、%等单位）
   * @default 'auto'
   */
  right?: number | string;

  /**
   * 标签是否激活（用于控制激活状态样式）
   * @default false
   */
  value?: boolean;
}

/**
 * VLabel 函数式组件渲染上下文
 */
export interface VLabelContext extends RenderContext<VLabelProps> {
  /** 子节点 */
  children: VNode[];
  
  /** 事件监听器 */
  listeners: Record<string, Function | Function[]>;
  
  /** 组件属性 */
  props: VLabelProps;
}

/**
 * VLabel 组件实例类型
 * 标签组件，支持颜色主题、定位、聚焦状态等特性
 */
export interface VLabel extends Vue {
  /** 组件名称 */
  readonly name: 'v-label';
  
  /** 是否为函数式组件 */
  readonly functional: true;
  
  /** 组件属性 */
  readonly props: VLabelProps;
  
  /**
   * 渲染函数
   * @param h - Vue 渲染函数（createElement）
   * @param context - 函数式组件上下文
   * @returns 渲染的 VNode
   */
  render(h: CreateElement, context: VLabelContext): VNode;
}

/**
 * VLabel 组件定义
 * 导出函数式标签组件
 */
declare const VLabel: VLabel;

export default VLabel;