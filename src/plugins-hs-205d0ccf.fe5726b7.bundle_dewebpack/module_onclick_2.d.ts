/**
 * 点击事件处理器模块
 * 
 * 处理点击事件，执行回调并阻止事件冒泡
 * 
 * @module onClick
 */

/**
 * 点击事件选项配置
 */
interface OnClickOptions {
  /** 点击后执行的回调函数 */
  callback?: () => void;
}

/**
 * 创建点击事件处理函数
 * 
 * @param event - DOM事件对象
 * @param options - 点击事件配置选项
 * 
 * @remarks
 * 此函数会：
 * 1. 检查并执行传入的回调函数（如果存在）
 * 2. 阻止事件向上冒泡
 * 
 * @example
 *