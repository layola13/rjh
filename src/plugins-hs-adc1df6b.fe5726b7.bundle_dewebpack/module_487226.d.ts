/**
 * CSS模块导出类型定义
 * 用于webpack样式加载器的类型声明
 */

/**
 * Webpack模块导出函数的参数类型
 */
interface WebpackModuleParams {
  /** 模块导出对象 */
  exports: ModuleExports;
  /** 当前模块对象 */
  module: WebpackModule;
  /** require函数，用于加载其他模块 */
  require: WebpackRequire;
}

/**
 * Webpack模块对象
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports: ModuleExports;
  /** 模块是否已加载 */
  loaded?: boolean;
  /** 父模块引用 */
  parent?: WebpackModule;
}

/**
 * Webpack require函数类型
 */
interface WebpackRequire {
  /** 通过模块ID加载模块 */
  (moduleId: string | number): unknown;
  /** 缓存的模块映射 */
  c?: Record<string | number, WebpackModule>;
  /** 模块定义映射 */
  m?: Record<string | number, ModuleFactory>;
}

/**
 * 模块工厂函数类型
 */
type ModuleFactory = (
  module: WebpackModule,
  exports: ModuleExports,
  require: WebpackRequire
) => void;

/**
 * 模块导出对象类型
 */
interface ModuleExports {
  /** 默认导出 */
  default?: unknown;
  /** 命名导出 */
  [key: string]: unknown;
}

/**
 * CSS加载器返回值类型
 * @param sourceMap - 是否生成source map
 * @returns CSS模块导出对象
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSModuleExports;

/**
 * CSS模块导出接口
 */
interface CSSModuleExports {
  /**
   * 添加CSS内容到导出数组
   * @param item - CSS内容数组项 [模块ID, CSS字符串, 媒体查询?, source map?]
   */
  push(item: CSSModuleItem): void;
  /** CSS内容数组 */
  [index: number]: CSSModuleItem;
  /** 数组长度 */
  length: number;
}

/**
 * CSS模块项类型
 * [模块ID, CSS内容, 媒体查询(可选), source map(可选)]
 */
type CSSModuleItem = [
  moduleId: string | number,
  cssContent: string,
  mediaQuery?: string,
  sourceMap?: string | object
];

/**
 * 资源加载器函数类型
 * 用于处理CSS中的资源引用(如图片)
 * @param resourcePath - 资源路径
 * @returns 处理后的资源URL
 */
type AssetLoader = (resourcePath: string | number) => string;

/**
 * 页面头部样式模块
 * 包含编辑器头部、操作按钮、菜单、通知等UI组件的完整样式定义
 * 
 * @remarks
 * 此模块定义了以下主要组件的样式：
 * - 头部容器 (#header header)
 * - 左右操作区域 (.operates.left / .operates.right)
 * - Logo区域 (.shejijia)
 * - 菜单项 (.menu-item)
 * - 设置和通知图标 (.settings-content / .notification-content)
 * - 全屏按钮 (.full-screen-content)
 * - 响应式布局 (媒体查询 @media)
 * - 国际化样式 (.global-en)
 * - 自定义主题 (.ysjj / .compelete-env-btn-customized)
 * 
 * @module module_487226
 * @category Styles
 */
declare module 'module_487226' {
  /**
   * CSS样式模块导出
   * 通过webpack css-loader处理后的样式数组
   */
  const styles: CSSModuleExports;
  export default styles;
}