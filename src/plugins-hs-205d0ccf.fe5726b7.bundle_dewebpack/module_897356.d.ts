/**
 * CSS模块导出类型定义
 * 用于Webpack样式加载器的类型声明
 */

/**
 * Webpack模块导出函数类型
 * @param exports - 模块导出对象
 * @param require - 模块require函数
 * @param module - 当前模块对象
 */
type WebpackModuleFunction = (
  exports: WebpackModuleExports,
  require: WebpackRequire,
  module: WebpackModule
) => void;

/**
 * Webpack require函数接口
 */
interface WebpackRequire {
  /**
   * 根据模块ID加载模块
   * @param moduleId - 模块标识符
   * @returns 模块导出内容
   */
  (moduleId: number): unknown;
}

/**
 * Webpack模块对象接口
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: number;
  /** 模块导出对象 */
  exports: WebpackModuleExports;
}

/**
 * Webpack模块导出对象接口
 */
interface WebpackModuleExports {
  /**
   * 添加CSS规则到样式表
   * @param rule - CSS规则数组 [模块ID, CSS内容, 其他元数据]
   */
  push(rule: [number, string, ...unknown[]]): void;
}

/**
 * CSS加载器工厂函数类型
 * @param useSourceMap - 是否使用source map
 * @returns CSS加载器函数
 */
type CssLoaderFactory = (useSourceMap: boolean) => CssLoader;

/**
 * CSS加载器接口
 */
interface CssLoader {
  /**
   * 添加CSS规则
   * @param rule - CSS规则数组
   */
  push(rule: [number, string, ...unknown[]]): void;
}

/**
 * 资源URL处理函数类型
 * @param assetModule - 资源模块require结果
 * @returns 处理后的资源URL
 */
type AssetUrlResolver = (assetModule: unknown) => string;

/**
 * Spark Pic布局样式模块
 * 
 * 包含以下主要样式类：
 * - .spark_pic_Layout .sider - 侧边栏样式
 * - .spark_pic_Layout .spark_pic_center_radius - 中心圆角容器
 * - .spark_pic_Layout .footer - 底部栏样式
 * - .spark_pic_Layout .footer .ai_pic_btn - AI图片按钮
 * - .spark-pic-resize-widget - 调整大小组件样式
 */
declare module 'module_897356' {
  /**
   * 模块导出函数
   * 注入CSS样式到页面中
   */
  const moduleExport: WebpackModuleFunction;
  export = moduleExport;
}

/**
 * 依赖模块ID常量
 */
declare const enum DependencyModuleIds {
  /** 资源URL解析器模块 */
  ASSET_URL_RESOLVER = 992716,
  /** CSS加载器工厂模块 */
  CSS_LOADER_FACTORY = 986380,
  /** 背景图片资源模块1 */
  BACKGROUND_IMAGE_1 = 249436,
  /** 取消按钮图标资源模块1 */
  CANCEL_ICON_1 = 489317,
  /** 取消按钮图标资源模块2 */
  CANCEL_ICON_2 = 349237,
}

/**
 * CSS规则元组类型
 * [模块ID, CSS内容字符串, source map标志]
 */
type CssRule = [moduleId: number, cssContent: string, useSourceMap: false];