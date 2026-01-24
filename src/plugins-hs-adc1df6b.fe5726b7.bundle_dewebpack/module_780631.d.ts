/**
 * CSS模块导出类型定义
 * 该模块导出旋转对齐组件的样式表
 * 
 * @module RotateAlignStyles
 */

/**
 * CSS模块加载器函数类型
 * @param sourceMap - 是否包含源映射
 * @returns CSS模块加载器实例
 */
type CSSModuleLoader = (sourceMap: boolean) => {
  push: (entry: [string, string, string]) => void;
};

/**
 * Webpack模块导出函数签名
 * @param exports - 模块导出对象
 * @param require - 模块加载函数
 */
declare function rotateAlignStylesModule(
  exports: { exports: unknown },
  require: (moduleId: number) => CSSModuleLoader,
): void;

/**
 * CSS样式规则接口
 * 定义旋转对齐容器及其子元素的样式类名
 */
export interface RotateAlignStyles {
  /** 旋转对齐容器主类名 - 使用flex布局，子元素两端对齐并垂直居中 */
  'rotate-align-container': string;
  
  /** 旋转对齐标签文本样式 - 灰色小字体 */
  'rotate-align-label': string;
  
  /** 旋转数值标签样式 - 左侧边距60px */
  'rotate-value-label': string;
  
  /** 旋转图像按钮图标样式 - 37x37像素，18px字号，深色可点击图标 */
  'rotate-image-button-icon': string;
  
  /** 大尺寸容器变体 - 高度72px */
  'rotate-align-container__large': string;
  
  /** 旋转对齐元素 - 在大尺寸容器中为64x64像素 */
  'rotate-align': string;
}

/**
 * 导出的CSS内容字符串
 * 包含完整的样式规则定义
 */
export type CSSContent = string;

/**
 * 模块导出类型
 * Webpack处理后的CSS模块导出值
 */
export type ModuleExports = unknown;

export default rotateAlignStylesModule;