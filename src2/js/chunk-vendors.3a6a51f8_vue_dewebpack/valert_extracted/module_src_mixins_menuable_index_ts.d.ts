/**
 * Menuable Mixin - 提供菜单定位和激活功能的Vue混入
 * 
 * 该混入结合了Positionable、Stackable和Activatable混入的功能，
 * 为菜单、下拉框等浮层组件提供定位、层级管理和激活状态控制。
 */

import { VueConstructor } from 'vue';
import Positionable from '../positionable';
import Stackable from '../stackable';
import Activatable from '../activatable';

/**
 * 激活器的尺寸和位置信息
 */
interface ActivatorDimensions {
  /** 距离视口顶部的距离 */
  top: number;
  /** 距离视口左侧的距离 */
  left: number;
  /** 距离视口底部的距离 */
  bottom: number;
  /** 距离视口右侧的距离 */
  right: number;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 相对于offsetParent的top偏移 */
  offsetTop: number;
  /** 滚动高度 */
  scrollHeight: number;
  /** 相对于offsetParent的left偏移 */
  offsetLeft: number;
}

/**
 * 内容区域的尺寸和位置信息
 */
interface ContentDimensions {
  /** 距离视口顶部的距离 */
  top: number;
  /** 距离视口左侧的距离 */
  left: number;
  /** 距离视口底部的距离 */
  bottom: number;
  /** 距离视口右侧的距离 */
  right: number;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 相对于offsetParent的top偏移 */
  offsetTop: number;
  /** 滚动高度 */
  scrollHeight: number;
}

/**
 * 维度信息容器
 */
interface Dimensions {
  /** 激活器的维度信息 */
  activator: ActivatorDimensions;
  /** 内容区域的维度信息 */
  content: ContentDimensions;
}

/**
 * 边界矩形信息
 */
interface RoundedBoundedClientRect {
  /** 距离视口顶部的距离 */
  top: number;
  /** 距离视口左侧的距离 */
  left: number;
  /** 距离视口底部的距离 */
  bottom: number;
  /** 距离视口右侧的距离 */
  right: number;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
}

/**
 * Menuable组件的Props定义
 */
interface MenuableProps {
  /** 是否允许内容溢出视口 */
  allowOverflow: boolean;
  /** 使用浅色主题 */
  light: boolean;
  /** 使用深色主题 */
  dark: boolean;
  /** 最大宽度 */
  maxWidth: number | string;
  /** 最小宽度 */
  minWidth: number | string;
  /** 向下微调距离（像素） */
  nudgeBottom: number | string;
  /** 向左微调距离（像素） */
  nudgeLeft: number | string;
  /** 向右微调距离（像素） */
  nudgeRight: number | string;
  /** 向上微调距离（像素） */
  nudgeTop: number | string;
  /** 宽度微调（像素） */
  nudgeWidth: number | string;
  /** 溢出时偏移 */
  offsetOverflow: boolean;
  /** 点击时打开 */
  openOnClick: boolean;
  /** 绝对定位的X坐标 */
  positionX: number | null;
  /** 绝对定位的Y坐标 */
  positionY: number | null;
  /** z-index层级 */
  zIndex: number | string | null;
}

/**
 * Menuable组件的Data定义
 */
interface MenuableData {
  /** 绝对定位的X坐标 */
  absoluteX: number;
  /** 绝对定位的Y坐标 */
  absoluteY: number;
  /** 激活该菜单的元素 */
  activatedBy: HTMLElement | null;
  /** 激活器是否使用fixed定位 */
  activatorFixed: boolean;
  /** 维度信息 */
  dimensions: Dimensions;
  /** 是否刚刚获得焦点 */
  hasJustFocused: boolean;
  /** 是否存在window对象 */
  hasWindow: boolean;
  /** 是否为输入框激活器 */
  inputActivator: boolean;
  /** 内容是否处于激活状态 */
  isContentActive: boolean;
  /** 页面宽度 */
  pageWidth: number;
  /** 页面Y轴滚动偏移 */
  pageYOffset: number;
  /** 激活状态的CSS类名 */
  stackClass: string;
  /** 最小z-index值 */
  stackMinZIndex: number;
}

/**
 * Menuable组件的计算属性定义
 */
interface MenuableComputed {
  /** 计算后的左侧位置 */
  computedLeft: number;
  /** 计算后的顶部位置 */
  computedTop: number;
  /** 是否存在激活器 */
  hasActivator: boolean;
}

/**
 * Menuable组件的方法定义
 */
interface MenuableMethods {
  /**
   * 获取绝对定位的位置信息
   * @returns 激活器维度对象
   */
  absolutePosition(): ActivatorDimensions;

  /**
   * 激活菜单时的回调
   */
  activate(): void;

  /**
   * 计算左侧位置
   * @param contentWidth - 内容区域宽度
   * @returns CSS单位字符串
   */
  calcLeft(contentWidth: number): string;

  /**
   * 计算顶部位置
   * @returns CSS单位字符串
   */
  calcTop(): string;

  /**
   * 计算X轴溢出后的位置
   * @param left - 初始左侧位置
   * @param contentWidth - 内容区域宽度
   * @returns 修正后的左侧位置
   */
  calcXOverflow(left: number, contentWidth: number): number;

  /**
   * 计算Y轴溢出后的位置
   * @param top - 初始顶部位置
   * @returns 修正后的顶部位置
   */
  calcYOverflow(top: number): number;

  /**
   * 调用激活方法（在有window对象时）
   */
  callActivate(): void;

  /**
   * 调用停用方法
   */
  callDeactivate(): void;

  /**
   * 检查并更新页面Y轴偏移量
   */
  checkForPageYOffset(): void;

  /**
   * 检查激活器是否使用fixed定位
   */
  checkActivatorFixed(): void;

  /**
   * 停用菜单时的回调
   */
  deactivate(): void;

  /**
   * 生成激活器的事件监听器
   * @returns 事件监听器对象
   */
  genActivatorListeners(): Record<string, Function>;

  /**
   * 获取视口内部高度
   * @returns 视口高度
   */
  getInnerHeight(): number;

  /**
   * 获取页面左侧滚动偏移
   * @returns 左侧滚动偏移量
   */
  getOffsetLeft(): number;

  /**
   * 获取页面顶部滚动偏移
   * @returns 顶部滚动偏移量
   */
  getOffsetTop(): number;

  /**
   * 获取元素的圆整后的边界矩形
   * @param element - 目标元素
   * @returns 圆整后的边界矩形对象
   */
  getRoundedBoundedClientRect(element: HTMLElement): RoundedBoundedClientRect;

  /**
   * 测量元素的尺寸和位置
   * @param element - 目标元素
   * @returns 边界矩形对象或null
   */
  measure(element: HTMLElement | null): RoundedBoundedClientRect | null;

  /**
   * 临时显示内容以执行回调
   * @param callback - 回调函数
   */
  sneakPeek(callback: () => void): void;

  /**
   * 启动过渡动画
   * @returns Promise对象
   */
  startTransition(): Promise<void>;

  /**
   * 更新维度信息
   */
  updateDimensions(): void;
}

/**
 * Menuable混入类型定义
 */
declare const Menuable: VueConstructor<
  Vue & MenuableData & MenuableComputed & MenuableMethods
> & {
  props: MenuableProps;
};

export default Menuable;