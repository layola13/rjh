/**
 * CSS模块导出类型定义
 * 此模块导出任务提示浮层的样式表内容
 * @module TaskWrapperStyles
 */

/**
 * CSS模块加载器函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS模块实例，提供push方法用于添加样式
 */
type CSSModuleLoader = (sourceMap: boolean) => CSSModule;

/**
 * CSS模块实例接口
 * 用于管理和添加CSS样式规则
 */
interface CSSModule {
  /**
   * 添加CSS样式规则到模块
   * @param entry - 样式条目数组，包含模块ID和CSS内容
   */
  push(entry: [string, string]): void;
}

/**
 * Webpack模块导出函数签名
 * @param exports - 模块导出对象
 * @param module - 当前模块元数据
 * @param require - 模块加载函数
 */
declare function ModuleFactory(
  exports: Record<string, unknown>,
  module: WebpackModule,
  require: RequireFunction
): void;

/**
 * Webpack模块元数据接口
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string;
  /** 模块导出对象 */
  exports: Record<string, unknown>;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出内容
 */
type RequireFunction = (moduleId: number) => CSSModuleLoader;

/**
 * 任务提示组件样式类名映射
 * 包含所有可用的CSS类名
 */
interface TaskWrapperStyleClasses {
  /** 主容器样式 - 固定定位的最外层容器 */
  task_wrapper_container: string;
  
  /** 内容包裹器 - 包含文本内容的容器 */
  content_wrapper: string;
  
  /** 图标包裹器 - 包含图标的容器 */
  img_wrapper: string;
  
  /** 内部包裹器 - 带背景和圆角的内层容器 */
  task_wrapper_inside: string;
  
  /** 任务箭头容器 */
  task_arrow: string;
  
  /** 左侧箭头提示 - 箭头指向左侧 */
  task_tip_left_arrow: string;
  
  /** 右侧箭头提示 - 箭头指向右侧 */
  task_tip_right_arrow: string;
  
  /** 顶部箭头提示 - 箭头指向顶部 */
  task_tip_top_arrow: string;
  
  /** 底部箭头提示 - 箭头指向底部 */
  task_tip_bottom_arrow: string;
  
  /** 左侧固定修正 - 用于调整左侧定位 */
  task_wrapper_left_fix: string;
}

/**
 * CSS样式内容常量
 * 包含任务提示浮层的完整样式定义
 */
declare const TASK_WRAPPER_STYLES: string;

export type { 
  CSSModuleLoader, 
  CSSModule, 
  WebpackModule, 
  RequireFunction, 
  TaskWrapperStyleClasses 
};

export { TASK_WRAPPER_STYLES };