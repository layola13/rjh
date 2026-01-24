/**
 * 滚动容器类型：可以是 Window、Document 或 HTML 元素
 */
type ScrollContainer = Window | Document | HTMLElement;

/**
 * 缓动函数类型：计算动画进度对应的值
 * @param currentTime - 当前已经过的时间
 * @param startValue - 起始值
 * @param changeInValue - 值的变化量
 * @param duration - 动画总时长
 * @returns 计算后的当前值
 */
type EasingFunction = (
  currentTime: number,
  startValue: number,
  changeInValue: number,
  duration: number
) => number;

/**
 * 滚动选项配置
 */
interface ScrollToOptions {
  /**
   * 获取滚动容器的函数
   * @default () => window
   * @returns 滚动容器实例
   */
  getContainer?: () => ScrollContainer;

  /**
   * 滚动完成后的回调函数
   */
  callback?: () => void;

  /**
   * 滚动动画的持续时间（毫秒）
   * @default 450
   */
  duration?: number;
}

/**
 * 平滑滚动到指定的垂直位置
 * 
 * 使用 easeInOutCubic 缓动函数实现平滑的滚动动画效果。
 * 支持多种滚动容器类型：Window、Document 和普通 HTML 元素。
 * 
 * @param targetPosition - 目标滚动位置（垂直方向的像素值）
 * @param options - 滚动配置选项
 * @param options.getContainer - 返回滚动容器的函数，默认返回 window
 * @param options.callback - 滚动动画完成后执行的回调函数
 * @param options.duration - 动画持续时间，单位毫秒，默认 450ms
 * 
 * @example
 *