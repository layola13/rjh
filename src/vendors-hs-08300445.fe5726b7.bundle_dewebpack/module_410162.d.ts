/**
 * 滚动效果管理模块
 * 用于处理页面滚动时的样式调整，防止内容抖动
 * @module ScrollingEffect
 */

/**
 * 获取浏览器滚动条宽度
 * @returns 滚动条宽度（像素）
 */
declare function getScrollbarWidth(): number;

/**
 * 设置或移除CSS样式
 * @param styles - 样式对象，传入空对象时移除样式
 * @returns 应用的样式对象
 */
declare function setStyles(styles: Record<string, string>): Record<string, string>;

/**
 * 滚动效果配置缓存
 */
interface ScrollingEffectCache {
  position?: string;
  width?: string;
}

/**
 * 控制页面滚动效果
 * 当页面出现滚动条时，自动调整body宽度以防止内容抖动
 * 
 * @param shouldRemove - 是否移除滚动效果
 *                       - true: 移除效果，恢复原始状态
 *                       - false/undefined: 应用滚动效果
 * 
 * @remarks
 * - 检测页面是否存在垂直滚动条
 * - 计算滚动条宽度并调整body宽度
 * - 添加/移除 'ant-scrolling-effect' className
 * - 使用缓存记录应用的样式以便恢复
 * 
 * @example
 *