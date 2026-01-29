/**
 * CSS模块导出类型定义
 * 该模块用于加载新手引导步骤对话框的样式表
 * 
 * @module BeginnerStepsDialogStyles
 * @description 为新手引导对话框提供CSS样式定义，包括弹窗、步骤列表、内容展示等UI组件的样式
 */

import type { CSSModuleLoader } from './css-loader.types';

/**
 * CSS样式导出函数签名
 * 
 * @param exports - 模块导出对象，用于挂载生成的CSS内容
 * @param require - 模块加载函数，用于导入依赖资源
 * @param module - 当前模块对象，包含模块ID等元数据
 * 
 * @remarks
 * 该函数通过Webpack CSS加载器处理样式内容，并注入以下静态资源：
 * - 216792: 步骤完成状态的勾选图标
 * - 983161: 下拉选择框的选中状态图标
 * - 552030: 礼包项装饰背景图（红色主题）
 * - 149300: 礼包项装饰背景图（紫色主题）
 * - 82429: 引导步骤之间的连接箭头图标
 * 
 * @example
 *