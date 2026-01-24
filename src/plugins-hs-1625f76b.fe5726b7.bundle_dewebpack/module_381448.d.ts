/**
 * Webpack CSS模块加载器类型定义
 * Module ID: 381448
 * 
 * 该模块用于加载客户端下载组件的CSS样式
 */

/**
 * Webpack模块导出函数签名
 * 
 * @param e - 模块导出对象，包含exports属性用于设置导出内容
 * @param t - 模块上下文对象（未使用）
 * @param n - Webpack的require函数，用于导入其他模块
 */
declare function cssModuleLoader(
  e: WebpackModuleExports,
  t: WebpackModuleContext,
  n: WebpackRequireFunction
): void;

/**
 * Webpack模块导出对象
 */
interface WebpackModuleExports {
  /** 模块ID */
  id: string | number;
  /** 模块导出内容 */
  exports: CssLoader;
}

/**
 * Webpack模块上下文对象
 */
interface WebpackModuleContext {
  [key: string]: unknown;
}

/**
 * Webpack require函数类型
 * 用于动态导入模块
 */
interface WebpackRequireFunction {
  (moduleId: number | string): CssLoader;
}

/**
 * CSS加载器对象
 * 负责处理和注入CSS样式到页面中
 */
interface CssLoader {
  /**
   * 添加CSS规则到样式表
   * 
   * @param cssRule - CSS规则数组，格式为 [moduleId, cssContent]
   */
  push(cssRule: [string | number, string]): void;
}

/**
 * 客户端下载组件样式定义
 * 
 * 包含以下CSS类：
 * - #client-download-container: 固定定位的下载容器
 * - .client-download-tip: 下载提示弹窗样式
 * - .client-download: 下载按钮主容器
 * - .client-download .menu-icon: 菜单图标容器
 * - .client-download .menu-name: 菜单名称文本
 */
interface ClientDownloadStyles {
  /** 下载容器ID - 固定在页面底部，z-index: 2001 */
  'client-download-container': string;
  
  /** 下载提示弹窗类 - 宽度171px */
  'client-download-tip': string;
  
  /** 下载按钮主容器 - 使用flex布局，垂直居中 */
  'client-download': string;
  
  /** 菜单图标容器 - 圆形40px，包含28px图标 */
  'menu-icon': string;
  
  /** 菜单名称 - 使用AlibabaPuHuiTi-Bold字体，12px加粗 */
  'menu-name': string;
}

export type { 
  cssModuleLoader,
  WebpackModuleExports, 
  WebpackModuleContext,
  WebpackRequireFunction,
  CssLoader,
  ClientDownloadStyles 
};