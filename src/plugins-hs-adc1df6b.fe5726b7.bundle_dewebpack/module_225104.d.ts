/**
 * CSS 模块导出类型定义
 * 用于 Webpack CSS Loader 生成的样式模块
 */

/**
 * CSS 模块导出函数类型
 * @param sourceMap - 是否启用 source map
 * @returns CSS 模块实例，包含 push 方法用于添加样式规则
 */
type CSSModuleLoader = (sourceMap: boolean) => CSSModule;

/**
 * CSS 模块实例接口
 * 提供样式规则注入能力
 */
interface CSSModule {
  /**
   * 添加 CSS 规则到模块
   * @param rule - CSS 规则数组，包含 [模块ID, CSS内容, source map数据]
   */
  push(rule: [string, string, string]): void;
}

/**
 * Webpack 模块导出接口
 */
interface WebpackModuleExports {
  /** 模块唯一标识符 */
  id: string;
  /** 模块导出对象 */
  exports: unknown;
}

/**
 * Webpack require 函数类型
 * @param moduleId - 要加载的模块 ID
 * @returns 模块导出的内容
 */
type WebpackRequire = (moduleId: number) => CSSModuleLoader;

/**
 * 样式模块导出声明
 * 
 * 此模块导出 2D 室外绘图辅助容器的样式定义：
 * - .editor2dContainer .outdoordrawing-aux2d: 全屏绝对定位的辅助绘图层
 * 
 * @param exports - Webpack 模块导出对象
 * @param moduleExports - 当前模块的导出容器
 * @param webpackRequire - Webpack 模块加载器
 */
declare module "module_225104" {
  const styleModule: (
    exports: WebpackModuleExports,
    moduleExports: unknown,
    webpackRequire: WebpackRequire
  ) => void;

  export default styleModule;
}

/**
 * 样式内容常量
 * 定义 2D 编辑器容器内的室外绘图辅助层样式
 */
declare const OUTDOORDRAWING_AUX2D_STYLES: {
  /** CSS 选择器 */
  readonly selector: ".editor2dContainer .outdoordrawing-aux2d";
  /** 样式规则 */
  readonly rules: {
    /** 宽度占满容器 */
    readonly width: "100%";
    /** 高度占满容器 */
    readonly height: "100%";
    /** 绝对定位 */
    readonly position: "absolute";
  };
};