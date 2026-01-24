/**
 * CSS属性前缀和事件名称检测模块
 * 用于跨浏览器兼容的CSS动画和过渡属性
 */

/**
 * CSS transform 属性名（带浏览器前缀）
 */
export const transform: string;

/**
 * CSS transition-property 属性名（带浏览器前缀）
 */
export const transitionProperty: string;

/**
 * CSS transition-duration 属性名（带浏览器前缀）
 */
export const transitionDuration: string;

/**
 * CSS transition-delay 属性名（带浏览器前缀）
 */
export const transitionDelay: string;

/**
 * CSS transition-timing-function 属性名（带浏览器前缀）
 */
export const transitionTiming: string;

/**
 * transition 结束事件名称
 * 可能的值: 'transitionend', 'webkitTransitionEnd', 'oTransitionEnd', 'MSTransitionEnd'
 */
export const transitionEnd: string | undefined;

/**
 * CSS animation-name 属性名（带浏览器前缀）
 */
export const animationName: string;

/**
 * CSS animation-duration 属性名（带浏览器前缀）
 */
export const animationDuration: string;

/**
 * CSS animation-delay 属性名（带浏览器前缀）
 */
export const animationDelay: string;

/**
 * CSS animation-timing-function 属性名（带浏览器前缀）
 */
export const animationTiming: string;

/**
 * animation 结束事件名称
 * 可能的值: 'animationend', 'webkitAnimationEnd', 'oAnimationEnd', 'MSAnimationEnd'
 */
export const animationEnd: string | undefined;

/**
 * CSS过渡属性集合
 */
export interface TransitionProperties {
  /** transform 属性名 */
  transform: string;
  /** transitionend 事件名 */
  end: string | undefined;
  /** transition-property 属性名 */
  property: string;
  /** transition-timing-function 属性名 */
  timing: string;
  /** transition-delay 属性名 */
  delay: string;
  /** transition-duration 属性名 */
  duration: string;
}

/**
 * 默认导出：包含所有过渡相关属性的对象
 */
declare const _default: TransitionProperties;
export default _default;