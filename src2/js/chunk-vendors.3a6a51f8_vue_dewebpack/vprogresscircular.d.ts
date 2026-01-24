/**
 * VProgressCircular组件模块
 * 
 * 提供圆形进度条组件的导出
 * 
 * @module VProgressCircular
 * @see {@link ./VProgressCircular/VProgressCircular.ts} 原始实现
 */

import VProgressCircularComponent from './VProgressCircular/VProgressCircular';

/**
 * 圆形进度条组件
 * 
 * 用于显示操作进度的圆形可视化组件
 * 支持自定义颜色、大小和进度值
 */
export const VProgressCircular: typeof VProgressCircularComponent;

/**
 * 默认导出 - VProgressCircular组件
 * 
 * @default VProgressCircular
 */
export default VProgressCircularComponent;