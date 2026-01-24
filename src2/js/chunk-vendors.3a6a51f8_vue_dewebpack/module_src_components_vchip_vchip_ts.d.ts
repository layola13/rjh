import { VNode } from 'vue';
import { PropType } from 'vue';

/**
 * VChip 组件的属性接口
 */
export interface VChipProps {
  /**
   * 控制芯片的激活状态
   * @default true
   */
  active?: boolean;

  /**
   * 激活状态时应用的 CSS 类名
   * @default 从 chipGroup 继承或为空字符串
   */
  activeClass?: string;

  /**
   * 是否显示关闭按钮
   * @default false
   */
  close?: boolean;

  /**
   * 关闭按钮的图标
   * @default '$delete'
   */
  closeIcon?: string;

  /**
   * 是否禁用芯片
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否可拖拽
   * @default false
   */
  draggable?: boolean;

  /**
   * 是否显示筛选图标
   * @default false
   */
  filter?: boolean;

  /**
   * 筛选图标的名称
   * @default '$complete'
   */
  filterIcon?: string;

  /**
   * 是否显示为标签样式（矩形）
   * @default false
   */
  label?: boolean;

  /**
   * 是否表现为链接
   * @default false
   */
  link?: boolean;

  /**
   * 是否使用轮廓样式
   * @default false
   */
  outlined?: boolean;

  /**
   * 是否显示为药丸形状（完全圆角）
   * @default false
   */
  pill?: boolean;

  /**
   * 渲染的 HTML 标签名
   * @default 'span'
   */
  tag?: string;

  /**
   * 文本颜色
   */
  textColor?: string;

  /**
   * 芯片的值（用于选择组）
   */
  value?: any;

  /**
   * 芯片的颜色
   */
  color?: string;

  /**
   * 尺寸相关属性（来自 sizeable mixin）
   */
  small?: boolean;
  large?: boolean;
  xSmall?: boolean;
  xLarge?: boolean;

  /**
   * 路由相关属性（来自 routable mixin）
   */
  to?: string | object;
  href?: string;
  replace?: boolean;
  append?: boolean;
  exact?: boolean;
  nuxt?: boolean;

  /**
   * 主题相关属性（来自 themeable mixin）
   */
  dark?: boolean;
  light?: boolean;
}

/**
 * VChip 组件的事件接口
 */
export interface VChipEvents {
  /**
   * 点击芯片时触发
   * @param event 原生点击事件
   */
  click: (event: MouseEvent) => void;

  /**
   * 点击关闭按钮时触发
   */
  'click:close': () => void;

  /**
   * 激活状态更新时触发
   * @param value 新的激活状态
   */
  'update:active': (value: boolean) => void;
}

/**
 * VChip 组件的计算属性接口
 */
export interface VChipComputed {
  /**
   * 组件的所有 CSS 类
   */
  classes: Record<string, boolean>;

  /**
   * 是否显示关闭按钮
   */
  hasClose: boolean;

  /**
   * 是否可点击
   */
  isClickable: boolean;
}

/**
 * VChip 组件的方法接口
 */
export interface VChipMethods {
  /**
   * 处理点击事件
   * @param event 原生点击事件
   */
  click(event: MouseEvent): void;

  /**
   * 生成筛选图标
   * @returns 筛选图标的 VNode
   */
  genFilter(): VNode;

  /**
   * 生成关闭按钮
   * @returns 关闭按钮的 VNode
   */
  genClose(): VNode;

  /**
   * 生成芯片内容
   * @returns 内容的 VNode
   */
  genContent(): VNode;
}

/**
 * VChip 组件
 * 
 * 芯片组件用于传递少量信息。
 * 支持关闭、筛选、点击、路由导航等功能。
 * 可与 VChipGroup 组件配合使用实现选择功能。
 * 
 * @example
 *