/**
 * CSS样式模块定义文件
 * 
 * 该模块导出性能监控3D容器组件的样式定义
 * @module PerformanceContainerStyles
 */

/**
 * Webpack模块加载器函数类型
 * @param hot - 热模块替换API
 */
interface WebpackHotModule {
  accept(): void;
  decline(): void;
}

/**
 * Webpack模块导出对象
 */
interface WebpackModuleExports {
  /** 模块唯一标识符 */
  id: string | number;
  /** 导出的内容 */
  exports: any;
  /** 热模块替换API（开发模式） */
  hot?: WebpackHotModule;
}

/**
 * CSS加载器返回值类型
 * 包含push方法用于添加CSS模块
 */
interface CSSLoader {
  /**
   * 添加CSS模块
   * @param module - 包含模块ID和CSS内容的元组
   */
  push(module: [string | number, string]): void;
}

/**
 * CSS加载器工厂函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS加载器实例
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSLoader;

/**
 * Webpack模块定义函数
 * 
 * 该函数为性能监控3D容器组件注入CSS样式
 * 
 * @param moduleExports - Webpack模块导出对象
 * @param _webpackRequireContext - Webpack上下文对象（未使用）
 * @param webpackRequire - Webpack require函数，用于加载依赖模块
 * 
 * @remarks
 * 该模块包含以下样式定义：
 * - #performance-3d-container: 主容器样式（68x34px）
 * - #performanceBoard: 性能面板区域
 * - #arrow: 箭头指示器（带变换原点）
 * - .level1/.level2/.level3: 三级性能等级区域（可点击）
 * - .tip-container: 提示框容器基础样式
 * - .level-tip-container: 等级提示框样式
 * - .widget-tip-container: 组件提示框样式
 * - .nomore-show: "不再显示"链接样式
 * - .global-en 全局英文环境下的样式覆盖
 */
declare function webpackModule(
  moduleExports: WebpackModuleExports,
  _webpackRequireContext: any,
  webpackRequire: {
    /** 加载指定模块ID的模块 */
    (moduleId: number): any;
  }
): void;

/**
 * 性能3D容器CSS样式内容
 * 
 * @description
 * 包含以下主要样式规则：
 * - 容器尺寸和布局
 * - 性能等级指示器交互样式
 * - 提示框（Tooltip）样式和定位
 * - 箭头指示器和伪元素三角形
 * - 响应式hover效果
 * - 国际化（英文环境）样式适配
 */
export type PerformanceContainerStyles = string;

export default webpackModule;