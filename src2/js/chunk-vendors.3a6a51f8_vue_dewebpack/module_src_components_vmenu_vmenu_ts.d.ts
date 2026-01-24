/**
 * VMenu 组件类型定义
 * 菜单组件，提供弹出式菜单功能，支持多种定位和交互模式
 */

import Vue, { VNode, VueConstructor } from 'vue';
import { VThemeProvider } from '../VThemeProvider';

/**
 * 菜单样式配置接口
 */
interface MenuStyles {
  /** 最大高度 */
  maxHeight: string;
  /** 最小宽度 */
  minWidth: string;
  /** 最大宽度 */
  maxWidth: string;
  /** 顶部位置 */
  top: string;
  /** 左侧位置 */
  left: string;
  /** 变换原点 */
  transformOrigin: string;
  /** 层级索引 */
  zIndex: number | string;
}

/**
 * 菜单组件数据接口
 */
interface MenuData {
  /** 自动计算的顶部位置 */
  calculatedTopAuto: number;
  /** 默认偏移量 */
  defaultOffset: number;
  /** 是否刚刚获得焦点 */
  hasJustFocused: boolean;
  /** 当前列表索引 */
  listIndex: number;
  /** 窗口调整定时器 */
  resizeTimeout: number;
  /** 选中的索引 */
  selectedIndex: number | null;
  /** 菜单项元素列表 */
  tiles: HTMLElement[];
}

/**
 * 菜单组件属性接口
 */
interface MenuProps {
  /** 是否自动定位 */
  auto?: boolean;
  /** 点击外部时是否关闭 */
  closeOnClick?: boolean;
  /** 点击内容时是否关闭 */
  closeOnContentClick?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否禁用键盘导航 */
  disableKeys?: boolean;
  /** 最大高度 */
  maxHeight?: number | string;
  /** 是否在 X 轴偏移 */
  offsetX?: boolean;
  /** 是否在 Y 轴偏移 */
  offsetY?: boolean;
  /** 点击时是否打开 */
  openOnClick?: boolean;
  /** 悬停时是否打开 */
  openOnHover?: boolean;
  /** 变换原点位置 */
  origin?: string;
  /** 过渡动画名称 */
  transition?: boolean | string;
}

/**
 * VMenu 组件实例接口
 */
interface VMenu extends Vue {
  // Props
  auto: boolean;
  closeOnClick: boolean;
  closeOnContentClick: boolean;
  disabled: boolean;
  disableKeys: boolean;
  maxHeight: number | string;
  offsetX: boolean;
  offsetY: boolean;
  openOnClick: boolean;
  openOnHover: boolean;
  origin: string;
  transition: boolean | string;

  // Data
  calculatedTopAuto: number;
  defaultOffset: number;
  hasJustFocused: boolean;
  listIndex: number;
  resizeTimeout: number;
  selectedIndex: number | null;
  tiles: HTMLElement[];

  // Computed
  /** 当前激活的菜单项 */
  readonly activeTile: HTMLElement | undefined;
  /** 计算后的左侧位置 */
  readonly calculatedLeft: string;
  /** 计算后的最大高度 */
  readonly calculatedMaxHeight: string;
  /** 计算后的最大宽度 */
  readonly calculatedMaxWidth: string;
  /** 计算后的最小宽度 */
  readonly calculatedMinWidth: string;
  /** 计算后的顶部位置 */
  readonly calculatedTop: string;
  /** 是否有可点击的菜单项 */
  readonly hasClickableTiles: boolean;
  /** 菜单样式对象 */
  readonly styles: MenuStyles;

  // Methods
  /**
   * 激活菜单
   */
  activate(): void;

  /**
   * 计算滚动位置
   * @returns 滚动位置的像素值
   */
  calcScrollPosition(): number;

  /**
   * 自动计算左侧位置
   * @returns 左侧位置的像素值
   */
  calcLeftAuto(): number;

  /**
   * 自动计算顶部位置
   * @returns 顶部位置的像素值
   */
  calcTopAuto(): number;

  /**
   * 改变列表索引（处理键盘导航）
   * @param event - 键盘事件
   */
  changeListIndex(event: KeyboardEvent): void;

  /**
   * 关闭条件判断
   * @param event - 点击事件
   * @returns 是否应该关闭菜单
   */
  closeConditional(event: MouseEvent): boolean;

  /**
   * 生成激活器属性
   * @returns HTML 属性对象
   */
  genActivatorAttributes(): Record<string, unknown>;

  /**
   * 生成激活器监听器
   * @returns 事件监听器对象
   */
  genActivatorListeners(): Record<string, Function>;

  /**
   * 生成过渡效果
   * @returns VNode 节点
   */
  genTransition(): VNode;

  /**
   * 生成指令配置
   * @returns 指令配置数组
   */
  genDirectives(): Array<{
    name: string;
    value: unknown;
  }>;

  /**
   * 生成菜单内容
   * @returns VNode 节点
   */
  genContent(): VNode;

  /**
   * 获取所有菜单项元素
   */
  getTiles(): void;

  /**
   * 鼠标进入处理器
   */
  mouseEnterHandler(): void;

  /**
   * 鼠标离开处理器
   * @param event - 鼠标事件
   */
  mouseLeaveHandler(event: MouseEvent): void;

  /**
   * 导航到下一个菜单项
   */
  nextTile(): void;

  /**
   * 导航到上一个菜单项
   */
  prevTile(): void;

  /**
   * 键盘按下事件处理器
   * @param event - 键盘事件
   */
  onKeyDown(event: KeyboardEvent): void;

  /**
   * 窗口大小调整处理器
   */
  onResize(): void;
}

/**
 * VMenu 组件构造函数
 */
declare const VMenu: VueConstructor<VMenu>;

export default VMenu;
export { VMenu, MenuProps, MenuData, MenuStyles };