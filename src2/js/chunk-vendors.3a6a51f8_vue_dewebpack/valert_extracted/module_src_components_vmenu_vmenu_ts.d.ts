/**
 * VMenu 组件类型定义
 * 一个可定位的菜单组件，支持多种激活方式和定位选项
 */

import { VNode } from 'vue';
import { Vue } from 'vue/types/vue';

/**
 * VMenu 组件的 Props 接口
 */
export interface VMenuProps {
  /**
   * 是否自动定位菜单以适应视口
   * @default false
   */
  auto?: boolean;

  /**
   * 点击外部时是否关闭菜单
   * @default true
   */
  closeOnClick?: boolean;

  /**
   * 点击菜单内容时是否关闭菜单
   * @default true
   */
  closeOnContentClick?: boolean;

  /**
   * 是否禁用菜单
   * @default false
   */
  disabled?: boolean;

  /**
   * 是否禁用键盘导航
   * @default false
   */
  disableKeys?: boolean;

  /**
   * 菜单的最大高度（像素或字符串单位）
   * @default "auto"
   */
  maxHeight?: number | string;

  /**
   * 是否在 X 轴上偏移菜单
   * @default false
   */
  offsetX?: boolean;

  /**
   * 是否在 Y 轴上偏移菜单
   * @default false
   */
  offsetY?: boolean;

  /**
   * 点击激活器时是否打开菜单
   * @default true
   */
  openOnClick?: boolean;

  /**
   * 悬停激活器时是否打开菜单
   * @default false
   */
  openOnHover?: boolean;

  /**
   * 设置菜单的变换原点
   * @default "top left"
   */
  origin?: string;

  /**
   * 菜单打开/关闭的过渡动画名称
   * @default "v-menu-transition"
   */
  transition?: boolean | string;

  /**
   * 最小宽度（像素或字符串单位）
   */
  minWidth?: number | string;

  /**
   * 最大宽度（像素或字符串单位）
   */
  maxWidth?: number | string;

  /**
   * X 轴微调偏移量
   */
  nudgeWidth?: number | string;

  /**
   * 附加到的元素选择器或元素
   */
  attach?: boolean | string | Element;

  /**
   * 是否使用浅色主题
   */
  light?: boolean;

  /**
   * 是否使用深色主题
   */
  dark?: boolean;

  /**
   * 自定义内容类名
   */
  contentClass?: string;

  /**
   * z-index 值
   */
  zIndex?: number | string;
}

/**
 * VMenu 组件的数据接口
 */
export interface VMenuData {
  /**
   * 自动模式下计算的顶部位置
   */
  calculatedTopAuto: number;

  /**
   * 默认偏移量（像素）
   */
  defaultOffset: number;

  /**
   * 是否刚刚获得焦点
   */
  hasJustFocused: boolean;

  /**
   * 当前列表项索引
   */
  listIndex: number;

  /**
   * 调整大小的防抖定时器 ID
   */
  resizeTimeout: number;

  /**
   * 选中项的索引
   */
  selectedIndex: number | null;

  /**
   * 菜单内的可交互元素列表
   */
  tiles: HTMLElement[];
}

/**
 * VMenu 组件的计算属性接口
 */
export interface VMenuComputed {
  /**
   * 当前激活的列表项元素
   */
  activeTile: HTMLElement | undefined;

  /**
   * 计算后的左侧位置（CSS 字符串）
   */
  calculatedLeft: string;

  /**
   * 计算后的最大高度（CSS 字符串）
   */
  calculatedMaxHeight: string;

  /**
   * 计算后的最大宽度（CSS 字符串）
   */
  calculatedMaxWidth: string;

  /**
   * 计算后的最小宽度（CSS 字符串）
   */
  calculatedMinWidth: string;

  /**
   * 计算后的顶部位置（CSS 字符串）
   */
  calculatedTop: string;

  /**
   * 是否存在可点击的列表项
   */
  hasClickableTiles: boolean;

  /**
   * 菜单内容的样式对象
   */
  styles: {
    maxHeight: string;
    minWidth: string;
    maxWidth: string;
    top: string;
    left: string;
    transformOrigin: string;
    zIndex: number | string;
  };
}

/**
 * VMenu 组件的方法接口
 */
export interface VMenuMethods {
  /**
   * 激活菜单，更新位置并启动过渡动画
   */
  activate(): void;

  /**
   * 计算内容区域的滚动位置，使激活项居中
   * @returns 滚动位置（像素）
   */
  calcScrollPosition(): number;

  /**
   * 在自动模式下计算左侧位置
   * @returns 左侧位置（像素）
   */
  calcLeftAuto(): number;

  /**
   * 在自动模式下计算顶部位置
   * @returns 顶部位置（像素）
   */
  calcTopAuto(): number;

  /**
   * 处理键盘导航，更改列表项索引
   * @param event - 键盘事件
   */
  changeListIndex(event: KeyboardEvent): void;

  /**
   * 判断点击外部时是否应关闭菜单
   * @param event - 点击事件
   * @returns 是否关闭
   */
  closeConditional(event: Event): boolean;

  /**
   * 生成激活器元素的属性
   * @returns 属性对象
   */
  genActivatorAttributes(): Record<string, any>;

  /**
   * 生成激活器元素的事件监听器
   * @returns 事件监听器对象
   */
  genActivatorListeners(): Record<string, Function>;

  /**
   * 生成过渡动画包装器
   * @returns VNode
   */
  genTransition(): VNode;

  /**
   * 生成指令配置（v-show, v-click-outside）
   * @returns 指令数组
   */
  genDirectives(): Array<{
    name: string;
    value: any;
  }>;

  /**
   * 生成菜单内容元素
   * @returns VNode
   */
  genContent(): VNode;

  /**
   * 获取并缓存菜单内的所有列表项元素
   */
  getTiles(): void;

  /**
   * 鼠标进入激活器时的处理函数
   */
  mouseEnterHandler(): void;

  /**
   * 鼠标离开菜单时的处理函数
   * @param event - 鼠标事件
   */
  mouseLeaveHandler(event: MouseEvent): void;

  /**
   * 导航到下一个可交互列表项
   */
  nextTile(): void;

  /**
   * 导航到上一个可交互列表项
   */
  prevTile(): void;

  /**
   * 键盘按下事件处理函数（ESC 关闭，上下键打开）
   * @param event - 键盘事件
   */
  onKeyDown(event: KeyboardEvent): void;

  /**
   * 窗口调整大小时的处理函数
   */
  onResize(): void;
}

/**
 * VMenu 组件实例接口
 */
export interface VMenu extends Vue, VMenuProps, VMenuData, VMenuComputed, VMenuMethods {
  /**
   * 菜单是否处于激活状态
   */
  isActive: boolean;

  /**
   * 内容是否处于激活状态（过渡完成后）
   */
  isContentActive: boolean;

  /**
   * 当前主题配置
   */
  theme: Record<string, any>;

  /**
   * 提供给子组件的上下文
   */
  readonly provide: {
    isInMenu: boolean;
    theme: Record<string, any>;
  };
}

/**
 * VMenu 组件构造函数
 */
declare const VMenu: {
  new (): VMenu;
};

export default VMenu;