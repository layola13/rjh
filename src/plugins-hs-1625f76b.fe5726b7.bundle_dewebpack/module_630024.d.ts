/**
 * CSS模块导出类型定义
 * 该模块导出AIGC图片搜索页面的样式表
 * @module ImageSearchPageStyles
 */

/**
 * Webpack CSS加载器push方法的参数类型
 */
interface CSSModulePushParams {
  /** 模块ID */
  id: string;
  /** CSS内容字符串 */
  content: string;
}

/**
 * Webpack CSS加载器返回类型
 */
interface CSSLoader {
  /**
   * 向CSS模块数组推送新的样式规则
   * @param params - 包含模块ID和CSS内容的数组
   */
  push(params: [string, string]): void;
}

/**
 * Webpack模块导出对象
 */
interface ModuleExports {
  /** 导出的CSS加载器实例 */
  exports: CSSLoader;
  /** 当前模块的唯一标识符 */
  id: string;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 返回CSS加载器工厂函数
 */
type WebpackRequire = (moduleId: number) => (sourceMap: boolean) => CSSLoader;

/**
 * AIGC图片搜索页面样式模块工厂函数
 * 
 * 该模块定义了以下主要样式类：
 * - `.aigc-image-search-page-container`: 页面主容器
 * - `.image-search-page-header`: 页面头部，包含标题和展开按钮
 * - `.image-search-page-header-title`: 头部标题样式（带文本溢出处理）
 * - `.expand-btn`: 展开/收起按钮
 * - `.image-search-product-page-content`: 产品内容区域
 * - `.hsc-filter-container`: 筛选器容器
 * - `.image-search-page-product-list-container`: 产品列表容器（带自定义滚动条）
 * - `.image-search-page-product-list`: 产品列表（flex布局）
 * - `.no-result-page`: 无结果页面（居中显示）
 * 
 * @param moduleExports - Webpack模块导出对象
 * @param _unused - 未使用的参数（通常为module.exports的别名）
 * @param webpackRequire - Webpack的require函数，用于加载依赖模块
 */
declare function imageSearchPageStylesModule(
  moduleExports: ModuleExports,
  _unused: unknown,
  webpackRequire: WebpackRequire
): void;

export default imageSearchPageStylesModule;

/**
 * 样式类名常量定义
 */
export interface ImageSearchPageClassNames {
  /** 页面主容器类名 */
  readonly container: 'aigc-image-search-page-container';
  /** 页面头部类名 */
  readonly header: 'image-search-page-header';
  /** 头部标题类名 */
  readonly headerTitle: 'image-search-page-header-title';
  /** 展开按钮类名 */
  readonly expandBtn: 'expand-btn';
  /** 产品页面内容类名 */
  readonly productPageContent: 'image-search-product-page-content';
  /** 筛选器容器类名 */
  readonly filterContainer: 'hsc-filter-container';
  /** 产品列表容器类名 */
  readonly productListContainer: 'image-search-page-product-list-container';
  /** 产品列表类名 */
  readonly productList: 'image-search-page-product-list';
  /** 无结果页面类名 */
  readonly noResultPage: 'no-result-page';
  /** 图标类名 */
  readonly icon: 'icon';
  /** 提示文本类名 */
  readonly tooltipsText: 'tooltipstext';
  /** 隐藏状态类名 */
  readonly hidden: 'hidden';
}