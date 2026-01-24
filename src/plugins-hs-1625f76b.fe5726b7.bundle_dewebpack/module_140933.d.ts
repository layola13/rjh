/**
 * Webpack CSS模块加载器的类型定义
 * 该模块用于在Webpack构建过程中处理CSS样式文件
 * @module template-recommend-model-page-styles
 */

/**
 * CSS模块导出函数类型
 * @param exports - 模块导出对象
 * @param require - 模块加载函数
 * @param module - 当前模块对象
 */
declare function cssModuleLoader(
  exports: CSSModuleExports,
  require: RequireFunction,
  module: WebpackModule
): void;

/**
 * CSS模块导出对象接口
 */
interface CSSModuleExports {
  /** 模块唯一标识符 */
  id: string | number;
  /** 导出的CSS内容数组 */
  exports: unknown;
  /** 推送CSS规则到导出数组 */
  push: (rule: CSSRule) => void;
}

/**
 * CSS规则元组类型
 * [模块ID, CSS内容字符串]
 */
type CSSRule = [string | number, string];

/**
 * Webpack模块对象接口
 */
interface WebpackModule {
  /** 模块ID */
  id: string | number;
  /** 模块导出对象 */
  exports: CSSModuleExports;
  /** 是否已加载 */
  loaded?: boolean;
}

/**
 * Webpack require函数类型
 * 用于动态加载其他模块
 */
interface RequireFunction {
  /**
   * 加载指定模块
   * @param moduleId - 模块ID
   * @returns 模块导出内容
   */
  (moduleId: number | string): unknown;
}

/**
 * CSS加载器工厂函数类型
 * @param sourceMap - 是否启用source map
 * @returns CSS加载器函数
 */
type CSSLoaderFactory = (sourceMap: boolean) => (content: string) => void;

/**
 * 资源URL处理函数类型
 * 用于处理CSS中的资源引用（如图片、字体等）
 * @param resourcePath - 资源路径或模块ID
 * @returns 处理后的资源URL
 */
type AssetUrlResolver = (resourcePath: string | number) => string;

/**
 * 模板推荐模型页面样式类名定义
 */
interface TemplateRecommendModelPageStyles {
  /** 页面主容器 */
  'template-recommend-model-page': string;
  /** 返回按钮区域 */
  back: string;
  /** 返回提示文本 */
  'back-tip': string;
  /** 描述文本区域 */
  description: string;
  /** 颜色选择栏 */
  'color-bar': string;
  /** 单个颜色项 */
  'color-item': string;
  /** 全部颜色选项 */
  'all-color': string;
  /** 激活状态 */
  active: string;
  /** 产品列表容器 */
  'product-list': string;
  /** 加载中状态 */
  loading: string;
  /** 无结果状态 */
  'no-result': string;
  /** 图片容器 */
  image: string;
}

export = cssModuleLoader;
export type { 
  CSSModuleExports, 
  CSSRule, 
  WebpackModule, 
  RequireFunction,
  CSSLoaderFactory,
  AssetUrlResolver,
  TemplateRecommendModelPageStyles 
};