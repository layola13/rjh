/**
 * CSS模块导出类型定义
 * @module CSSModuleExporter
 * @description 该模块用于在Webpack构建过程中导出CSS样式表内容
 */

/**
 * Webpack模块导出函数类型
 * @param exports - 模块导出对象
 * @param module - 当前模块信息
 * @param require - 模块加载函数
 */
type WebpackModuleFunction = (
  exports: WebpackExports,
  module: WebpackModule,
  require: WebpackRequire
) => void;

/**
 * Webpack导出对象接口
 */
interface WebpackExports {
  /** 模块的默认导出 */
  default?: unknown;
  /** 其他命名导出 */
  [key: string]: unknown;
}

/**
 * Webpack模块对象接口
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出对象 */
  exports: WebpackExports;
  /** 模块是否已加载 */
  loaded?: boolean;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出对象
 */
type WebpackRequire = (moduleId: string | number) => unknown;

/**
 * CSS加载器接口
 * @description 处理CSS内容并将其转换为可导出的格式
 */
interface CSSLoader {
  /**
   * 推送CSS规则到样式表
   * @param rule - CSS规则数组，格式为 [moduleId, cssContent, sourceMap?]
   */
  push(rule: [string | number, string, string?]): void;
}

/**
 * 自定义工具提示CSS样式模块
 * @description 包含自定义工具提示组件的完整样式定义
 * 
 * 主要样式特性：
 * - 浅色背景 (#fafafa)
 * - 固定宽度 177px
 * - 带圆角和阴影的卡片样式
 * - 顶部蓝色装饰条
 * - 三角形指示器
 * - "不再显示"交互按钮
 * 
 * DOM结构：
 *