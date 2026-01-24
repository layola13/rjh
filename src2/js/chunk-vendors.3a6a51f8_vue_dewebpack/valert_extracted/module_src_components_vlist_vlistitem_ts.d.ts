import Vue, { VNode, VNodeData, CreateElement } from 'vue';
import { PropType } from 'vue/types/options';

/**
 * VListItem 组件的属性接口
 */
export interface VListItemProps {
  /** 激活状态时的 CSS 类名，默认从 listItemGroup 继承 */
  activeClass?: string;
  /** 是否启用紧凑模式 */
  dense?: boolean;
  /** 是否禁用交互（不触发点击等事件） */
  inactive?: boolean;
  /** 是否作为链接渲染 */
  link?: boolean;
  /** 是否可选中 */
  selectable?: boolean;
  /** 渲染的 HTML 标签名称 */
  tag?: string;
  /** 是否显示为三行布局 */
  threeLine?: boolean;
  /** 是否显示为两行布局 */
  twoLine?: boolean;
  /** 列表项的值（用于选中状态） */
  value?: any;
  /** 文本颜色 */
  color?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 路由目标（继承自 routable mixin） */
  to?: string | object;
}

/**
 * VListItem 组件的注入依赖
 */
export interface VListItemInjection {
  /** 是否在 v-list-item-group 组件内 */
  isInGroup: boolean;
  /** 是否在 v-list 组件内 */
  isInList: boolean;
  /** 是否在 v-menu 组件内 */
  isInMenu: boolean;
  /** 是否在 v-navigation-drawer 组件内 */
  isInNav: boolean;
}

/**
 * VListItem 组件的计算属性
 */
export interface VListItemComputed {
  /** 组件的 CSS 类对象 */
  classes: Record<string, boolean>;
  /** 是否可点击 */
  isClickable: boolean;
  /** 是否处于激活状态（继承自 groupable） */
  isActive: boolean;
  /** 主题相关的 CSS 类（继承自 themeable） */
  themeClasses: Record<string, boolean>;
}

/**
 * VListItem 组件的方法
 */
export interface VListItemMethods {
  /**
   * 处理点击事件
   * @param event - 原生点击事件
   */
  click(event: MouseEvent): void;

  /**
   * 生成元素的 HTML 属性
   * @returns 属性对象
   */
  genAttrs(): Record<string, string | number | boolean | undefined>;

  /**
   * 切换选中状态（继承自 toggleable）
   */
  toggle(): void;

  /**
   * 生成路由链接配置（继承自 routable）
   * @returns 包含标签名和数据的对象
   */
  generateRouteLink(): { tag: string; data: VNodeData };

  /**
   * 设置文本颜色（继承自 colorable）
   * @param color - 颜色值
   * @param data - VNode 数据对象
   * @returns 更新后的 VNode 数据
   */
  setTextColor(color: string | undefined, data: VNodeData): VNodeData;
}

/**
 * VListItem 组件的作用域插槽参数
 */
export interface VListItemScopedSlotProps {
  /** 是否处于激活状态 */
  active: boolean;
  /** 切换激活状态的方法 */
  toggle: () => void;
}

/**
 * VListItem 组件的事件
 */
export interface VListItemEvents {
  /** 点击事件 */
  click: MouseEvent;
  /** 键盘按下事件 */
  keydown: KeyboardEvent;
}

/**
 * VListItem - Vuetify 列表项组件
 * 
 * 用于在列表中显示单个项目，支持路由导航、选中状态、多行布局等功能。
 * 可以与 v-list-item-group 配合实现选择器功能。
 * 
 * @remarks
 * 继承了以下 mixins:
 * - colorable: 颜色控制
 * - routable: 路由导航
 * - themeable: 主题支持
 * - groupable: 分组支持
 * - toggleable: 切换状态
 * 
 * @example
 *