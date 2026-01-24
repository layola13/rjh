/**
 * VLayout组件模块
 * 提供布局容器功能，基于grid系统实现
 * @module VLayout
 */

import './grid.sass';
import gridFactory from './grid';

/**
 * VLayout组件
 * 通过grid工厂函数创建的布局组件，用于页面整体布局结构
 */
declare const VLayout: ReturnType<typeof gridFactory>;

export default VLayout;