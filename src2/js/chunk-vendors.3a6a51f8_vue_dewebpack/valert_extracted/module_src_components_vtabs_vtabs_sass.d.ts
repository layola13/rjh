/**
 * VTabs样式模块类型定义
 * 
 * 该模块导出VTabs组件的Sass样式，通过Webpack的CSS/Sass加载器处理。
 * 在TypeScript环境中，这类样式模块通常不导出静态成员。
 * 
 * @module VTabsStyles
 * @packageDocumentation
 */

/**
 * VTabs.sass样式模块
 * 
 * 此模块包含VTabs组件的样式定义，由Webpack在构建时处理。
 * 样式会被注入到DOM或提取为CSS文件，取决于构建配置。
 * 
 * @remarks
 * - 无静态导出：该模块主要用于副作用（注入样式），不提供命名导出
 * - 导入此模块会自动应用样式到应用程序中
 * 
 * @example
 *