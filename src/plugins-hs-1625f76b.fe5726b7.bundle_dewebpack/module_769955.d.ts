/**
 * CSS模块定义 - 相机位置导航器样式
 * @module CameraPositionNavigatorStyles
 */

/**
 * Webpack模块导出函数类型
 * @param exports - 模块导出对象
 * @param module - 模块对象
 * @param require - require函数，用于加载其他模块
 */
declare function webpackModule(
  exports: WebpackExports,
  module: WebpackModule,
  require: WebpackRequire
): void;

/**
 * Webpack导出对象接口
 */
interface WebpackExports {
  /** 模块的唯一标识符 */
  id: string | number;
  /** 导出的内容 */
  exports?: unknown;
}

/**
 * Webpack模块对象接口
 */
interface WebpackModule {
  /** 模块ID */
  id: string | number;
  /** 模块导出对象 */
  exports: unknown;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出的内容
 */
type WebpackRequire = (moduleId: number) => CSSLoader;

/**
 * CSS加载器接口
 */
interface CSSLoader {
  /**
   * 添加CSS规则到加载器
   * @param module - 包含模块ID和CSS内容的数组
   */
  push(module: [string | number, string]): void;
  
  /**
   * 创建CSS加载器实例
   * @param sourceMap - 是否生成source map
   * @returns CSS加载器实例
   */
  (sourceMap: boolean): CSSLoader;
}

/**
 * 相机位置导航器样式规则
 * 此模块包含以下主要CSS选择器：
 * 
 * - `#cameraposition_overlay` - 相机位置覆盖层容器
 * - `#np_navigator` - 导航器主容器
 * - `#np_navigator .createbtn` - 创建按钮样式
 * - `#np_navigator .createbtn-disable` - 禁用状态的创建按钮
 * - `#np_navigator .create-loading` - 加载动画样式
 */
declare const cameraNavigatorStyles: string;

export default webpackModule;
export { cameraNavigatorStyles, CSSLoader, WebpackModule, WebpackExports, WebpackRequire };