/**
 * 点击事件处理函数模块
 * @module module_onClick
 * @originalId onClick
 */

/**
 * 点击事件的配置选项
 */
interface OnClickOptions {
  /** 点击回调函数 */
  onClick?: (event: MouseEvent) => void;
  /** 目标容器元素 */
  target?: HTMLElement | string;
  /** 动画持续时间（毫秒），默认450ms */
  duration?: number;
}

/**
 * 默认容器元素（推测为全局常量k的类型）
 */
declare const k: HTMLElement;

/**
 * 滚动或动画辅助函数（推测为v.default的签名）
 */
declare function scrollHelper(
  position: number,
  config: {
    getContainer: HTMLElement | string;
    duration: number;
  }
): void;

/**
 * 处理点击事件的函数
 * @param event - 原生鼠标点击事件
 * @param options - 点击事件配置选项
 */
declare function handleClick(
  event: MouseEvent,
  options: OnClickOptions
): void;

/**
 * 实现细节：
 * - 从options中解构出onClick回调、target容器和duration持续时间
 * - duration默认值为450毫秒
 * - 调用scrollHelper(0, { getContainer: target || k, duration })执行滚动/动画
 * - 如果onClick是函数，则调用它并传入原始事件
 */