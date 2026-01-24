/**
 * Webpack CSS模块加载器的类型定义
 * 用于处理带主题样式的文章页面CSS模块
 * @module ArticlePageStyles
 */

/**
 * Webpack require函数类型
 * 用于动态加载模块
 */
type WebpackRequire = (moduleId: number) => any;

/**
 * CSS加载器push数组项类型
 * 表示一个CSS模块的完整定义
 */
interface CSSLoaderItem {
  /** 模块唯一标识符 */
  id: string | number;
  /** CSS样式字符串内容 */
  content: string;
  /** 是否为源映射模式 */
  sourceMap?: boolean;
}

/**
 * CSS模块导出对象类型
 * 包含push方法用于注册CSS内容
 */
interface CSSModuleExports {
  /** 
   * 将CSS模块项推入加载队列
   * @param item - CSS加载器项数组
   */
  push(item: [string | number, string]): void;
}

/**
 * Webpack模块导出对象
 */
interface WebpackModuleExports {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports: any;
}

/**
 * 文章页面CSS模块工厂函数
 * 
 * 生成包含以下样式的CSS模块：
 * - `.article-page`: 文章页面容器基础样式
 * - `.article-iframe-wrapper`: iframe包装器样式
 * - `.article-iframe`: iframe内容区样式
 * - `.article-iframe-header-cover`: 顶部遮罩层样式
 * - `.teaching-light`: 浅色主题样式
 * - `.teaching-black`: 深色主题样式
 * 
 * @param exports - Webpack模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数，用于加载依赖模块
 * 
 * @remarks
 * 依赖模块：
 * - 992716: URL资源加载器
 * - 986380: CSS加载器工厂函数
 * - 867600: 浅色主题背景图片资源
 * - 659764: 深色主题背景图片资源
 * 
 * @example
 *