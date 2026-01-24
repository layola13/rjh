/**
 * CSS模块导出函数
 * 该模块用于导出slider-bar组件的样式表
 */

/**
 * 模块导出函数类型定义
 * @param exports - 模块导出对象
 * @param require - 模块加载函数
 * @param module - 当前模块信息
 */
declare function cssModuleExport(
  exports: CSSModuleExports,
  require: RequireFunction,
  module: ModuleInfo
): void;

/**
 * CSS模块加载器函数类型
 * @param sourceMap - 是否启用source map
 * @returns CSS加载器实例，包含push方法用于添加CSS内容
 */
interface CSSLoader {
  /**
   * 向CSS加载器推送样式内容
   * @param entry - 包含模块ID和CSS内容的元组
   */
  push(entry: [string, string]): void;
}

/**
 * 模块加载函数类型
 * @param moduleId - 要加载的模块ID
 * @returns CSS加载器实例
 */
interface RequireFunction {
  (moduleId: number): CSSLoader;
}

/**
 * CSS模块导出对象
 */
interface CSSModuleExports {
  /** 模块导出的内容 */
  [key: string]: any;
}

/**
 * 模块信息对象
 */
interface ModuleInfo {
  /** 模块唯一标识ID */
  id: string;
  /** 模块是否已加载 */
  loaded?: boolean;
  /** 模块导出对象 */
  exports?: CSSModuleExports;
}

/**
 * Slider Bar组件的CSS类名映射
 * 包含滑块组件所有样式类
 */
interface SliderBarStyles {
  /** 滑块容器包装器 */
  'slider-bar-wrapper': string;
  /** 滑块主容器 */
  'slider-bar': string;
  /** 滑块标签 */
  'slider-label': string;
  /** 滑块包装器 */
  'slider-wrapper': string;
  /** 滑块轨道 */
  'slider-track': string;
  /** 滑块轨道左侧背景层 */
  'slider-track-left-one': string;
  /** 滑块轨道左侧进度层 */
  'slider-track-left-two': string;
  /** 滑块拖动圆点 */
  'slider-circle': string;
  /** 滑块禁用遮罩层 */
  'slider-disable-mask': string;
  /** 全局英文环境下的标签样式 */
  'global-en': string;
}

export default cssModuleExport;
export type { SliderBarStyles, CSSLoader, RequireFunction, ModuleInfo, CSSModuleExports };