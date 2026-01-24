/**
 * 浏览器动画/过渡事件名称检测工具模块
 * 提供跨浏览器兼容的CSS动画和过渡事件名称
 */

/**
 * CSS过渡/动画属性名映射接口
 */
interface VendorPrefixMap {
  [key: string]: string;
}

/**
 * 事件类型到浏览器前缀映射的接口
 */
interface VendorEventMap {
  animationend?: VendorPrefixMap;
  transitionend?: VendorPrefixMap;
}

/**
 * 过渡名称配置类型
 * 可以是字符串前缀或对象映射
 */
type TransitionNameConfig = string | Record<string, string>;

/**
 * 当前浏览器是否支持CSS过渡和动画
 */
export declare const supportTransition: boolean;

/**
 * 当前浏览器的animationend事件名称
 * @default "animationend"
 */
export declare const animationEndName: string;

/**
 * 当前浏览器的transitionend事件名称
 * @default "transitionend"
 */
export declare const transitionEndName: string;

/**
 * 获取完整的过渡类名
 * @param prefix - 类名前缀，可以是字符串或对象映射
 * @param suffix - 类名后缀（如 'enter', 'leave'）
 * @returns 完整的过渡类名，如果prefix为空则返回null
 * 
 * @example
 *