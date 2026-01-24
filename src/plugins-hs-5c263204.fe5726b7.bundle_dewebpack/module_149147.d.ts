/**
 * Webpack CSS模块加载器的类型定义
 * 用于处理CSS样式表的动态导入和注入
 * @module CSSModuleLoader
 */

/**
 * CSS模块导出函数类型
 * 
 * @param exports - 模块导出对象，用于挂载CSS内容
 * @param cssLoaderFactory - CSS加载器工厂函数，通过模块ID 986380 引入
 * @param require - 模块加载函数，用于解析依赖
 * 
 * @description
 * 该模块导出一个函数，负责将CSS样式字符串推送到CSS加载器中。
 * CSS内容包含反馈单选框组件的样式定义，支持网格布局和内联布局两种模式。
 * 
 * @remarks
 * - 原始模块ID: 149147
 * - 依赖CSS加载器模块ID: 986380
 * - CSS内容采用sourcemap关闭模式（参数false）
 * 
 * @example
 *