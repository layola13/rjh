/**
 * CSS模块导出
 * 搜索历史容器样式定义
 * @module SearchHistoryStyles
 */

/**
 * Webpack CSS模块加载器函数签名
 * @param exports - 模块导出对象
 * @param cssLoader - CSS加载器工厂函数
 * @param loaderContext - 加载器上下文
 */
declare function loadCSSModule(
  exports: ModuleExports,
  cssLoader: CSSLoaderFactory,
  loaderContext: LoaderContext
): void;

/**
 * 模块导出对象接口
 */
interface ModuleExports {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports: CSSModule;
}

/**
 * CSS加载器工厂函数类型
 * @param sourceMap - 是否生成Source Map
 * @returns CSS加载器实例
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSLoader;

/**
 * CSS加载器接口
 */
interface CSSLoader {
  /**
   * 添加CSS规则到加载器
   * @param moduleId - 模块标识符
   * @param cssContent - CSS内容字符串
   */
  push(rule: [string | number, string]): void;
}

/**
 * CSS模块接口
 */
interface CSSModule {
  /**
   * 添加CSS规则
   * @param rule - CSS规则元组 [模块ID, CSS内容]
   */
  push(rule: [string | number, string]): void;
}

/**
 * 加载器上下文接口（Webpack require函数）
 */
interface LoaderContext {
  /**
   * 动态加载模块
   * @param moduleId - 模块ID
   * @returns 加载的模块
   */
  (moduleId: number): unknown;
}

/**
 * 搜索历史容器CSS类名映射
 */
interface SearchHistoryContainerClasses {
  /** 初始化状态容器样式 */
  'search-history-container.init': string;
  /** 搜索历史标题样式 */
  'search-history-title': string;
  /** 搜索历史项样式 */
  'search-history-item': string;
  /** 选中状态的历史项样式 */
  'search-history-item.selected': string;
  /** 社区/小区名称样式 */
  'neighborName': string;
  /** 城市名称样式 */
  'city': string;
  /** 结果展示状态容器样式 */
  'search-history-container.result': string;
}

/**
 * 搜索历史CSS内容常量
 * 包含初始化和结果展示两种状态的样式定义
 */
declare const SEARCH_HISTORY_CSS: string;

export {
  loadCSSModule,
  ModuleExports,
  CSSLoaderFactory,
  CSSLoader,
  CSSModule,
  LoaderContext,
  SearchHistoryContainerClasses,
  SEARCH_HISTORY_CSS
};

export default loadCSSModule;