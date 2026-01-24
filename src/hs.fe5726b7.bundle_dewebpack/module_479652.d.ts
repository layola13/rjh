/**
 * CSS模块导出的类型定义
 * 该模块通过css-loader导出样式字符串
 * @module SliderContainerStyles
 */

/**
 * CSS加载器函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS加载器实例
 */
type CssLoaderFactory = (sourceMap: boolean) => CssLoader;

/**
 * CSS加载器实例接口
 */
interface CssLoader {
  /**
   * 推送CSS模块定义
   * @param moduleDefinition - 模块定义元组 [模块ID, CSS内容字符串, 可选的source map]
   */
  push(moduleDefinition: [string, string, string?]): void;
}

/**
 * Webpack模块导出接口
 */
interface ModuleExports {
  /** 模块ID */
  id: string;
  /** 模块导出内容 */
  exports: CssLoader;
}

/**
 * Webpack模块加载函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 加载的模块导出内容
 */
type WebpackRequire = (moduleId: number) => CssLoaderFactory;

/**
 * Slider组件相关的CSS类名
 */
export interface SliderContainerClassNames {
  /** 滑块容器类名 */
  SliderContainer: string;
  /** 滑块主体类名 */
  Slider: string;
  /** 范围线类名 */
  rangeLine: string;
  /** 刻度维度容器类名 */
  dimension: string;
}

/**
 * CSS内容常量定义
 */
export const CSS_CONTENT: string;

/**
 * 模块默认导出
 * 该模块导出包含Slider组件样式的CSS字符串
 * 
 * 样式说明：
 * - `.SliderContainer`: 滑块容器，宽度136px，左浮动
 * - `.SliderContainer .Slider`: 滑块主体，宽度86%，带边距
 * - `.rangeLine`: 范围指示线，蓝色背景(#94c1e8)，动态宽度
 * - `.SliderContainer .dimension`: 刻度标签容器
 * - `.SliderContainer .dimension span`: 刻度标签(d1/d2/d3三个位置)
 * - `.SliderContainer .Slider a.ui-slider-handle`: 滑块手柄，圆形(12px)
 */
declare const sliderStyles: CssLoader;

export default sliderStyles;