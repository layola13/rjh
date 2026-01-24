/**
 * CSS模块导出类型定义
 * @module CatalogLibStyles
 */

/**
 * CSS加载器push方法参数类型
 */
interface CSSLoaderPushParams {
  /** 模块ID */
  id: string;
}

/**
 * CSS加载器返回类型
 */
interface CSSLoader {
  /**
   * 向CSS模块数组推送样式内容
   * @param data - 包含模块ID和CSS内容的元组 [moduleId, cssContent, sourceMap?]
   */
  push(data: [string, string, string?]): void;
}

/**
 * Webpack模块导出函数类型
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数
 */
type WebpackModuleExport = (
  exports: CSSLoaderPushParams,
  module: { exports: CSSLoader },
  require: (moduleId: number) => (enableSourceMap: boolean) => CSSLoader
) => void;

/**
 * 目录库样式类名映射
 */
interface CatalogLibStyleClasses {
  /** 目录库主容器样式类 */
  catalogLibContainer: string;
  /** 目录层级样式类 */
  catalogZIndex: string;
  /** 目录独立容器样式类 */
  catalogIndependentContainer: string;
  /** 目录收藏列表面板样式类 */
  catalogFavListPanel: string;
  /** 目录工具提示区域样式类 */
  catalogToolTipArea: string;
}

/**
 * CSS模块导出
 * 包含目录库组件的所有样式定义：
 * - catalogLibContainer: 绝对定位的主容器，固定在顶部50px，高度为视口减去60px
 * - catalogZIndex: 高优先级层级控制(z-index: 2000)
 * - catalogIndependentContainer: 独立容器布局
 * - catalogFavListPanel: 固定定位的收藏列表面板(左上角60px, 60px)
 * - catalogToolTipArea: Homestyler UI组件的弹出提示区域样式
 */
declare const styles: CatalogLibStyleClasses;

export default styles;