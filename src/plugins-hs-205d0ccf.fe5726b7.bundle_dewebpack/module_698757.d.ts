/**
 * CSS模块导出的类型定义
 * 用于深色主题的滑块组件样式
 */

/**
 * Webpack CSS模块加载器函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS模块加载器实例
 */
type CssModuleLoader = (sourceMap: boolean) => {
  push: (entry: [string | number, string, string?]) => void;
};

/**
 * Webpack模块导出函数签名
 * @param exports - 模块导出对象
 * @param require - 模块加载函数
 * @param moduleId - 当前模块ID
 */
declare function moduleExportFunction(
  exports: { id: string | number; exports?: unknown },
  require: (moduleId: number) => CssModuleLoader,
  moduleId: number
): void;

/**
 * 滑块组件深色主题CSS模块
 * 包含以下样式类：
 * - .slider-bar-wrapper-dark：滑块容器的深色主题包装器
 * - .slider-bar：滑块主容器，使用flex布局
 * - .slider-label：滑块标签文本样式
 * - .slider-wrapper：滑块交互区域包装器
 * - .slider-track：滑块轨道容器
 * - .slider-track-left-one：滑块背景轨道（灰色）
 * - .slider-track-left-two：滑块已选区域轨道（蓝色）
 * - .slider-circle：滑块可拖动圆形手柄
 * - .slider-disable-mask：禁用状态遮罩层
 * 
 * @remarks
 * 此模块通过webpack的css-loader（模块ID: 986380）处理
 * 支持国际化（.global-en）的文本换行处理
 */
declare module "module_698757" {
  const content: string;
  export default content;
}

/**
 * CSS样式规则接口
 */
interface SliderBarDarkStyles {
  /** 深色主题滑块包装器 */
  "slider-bar-wrapper-dark": string;
  
  /** 滑块主容器 */
  "slider-bar": string;
  
  /** 滑块标签 */
  "slider-label": string;
  
  /** 滑块交互区域包装器 */
  "slider-wrapper": string;
  
  /** 滑块轨道 */
  "slider-track": string;
  
  /** 滑块背景轨道层 */
  "slider-track-left-one": string;
  
  /** 滑块进度轨道层 */
  "slider-track-left-two": string;
  
  /** 滑块拖动圆形手柄 */
  "slider-circle": string;
  
  /** 禁用状态遮罩 */
  "slider-disable-mask": string;
}

/**
 * 导出的CSS类名映射
 */
export type { SliderBarDarkStyles };