/**
 * CSS模块导出的类型定义
 * 
 * 该模块导出一个CSS字符串，包含分段滑块组件的样式定义
 * 主要用于Ant Design的Slider组件自定义样式
 * 
 * @module SectionalSliderStyles
 */

/**
 * Webpack模块加载器函数签名
 * 
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - 模块加载函数
 */
type WebpackModuleFunction = (
  exports: ModuleExports,
  module: Module,
  require: RequireFunction
) => void;

/**
 * 模块导出接口
 */
interface ModuleExports {
  /** 模块的默认导出 */
  default?: unknown;
  /** 动态属性 */
  [key: string]: unknown;
}

/**
 * 模块对象接口
 */
interface Module {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出对象 */
  exports: ModuleExports;
  /** 模块是否已加载 */
  loaded?: boolean;
}

/**
 * CSS加载器返回值接口
 */
interface CSSLoaderResult {
  /**
   * 添加CSS规则到结果集
   * 
   * @param rule - CSS规则数组，包含模块ID和CSS内容
   */
  push(rule: [string | number, string]): void;
}

/**
 * Require函数类型
 * 
 * @param moduleId - 要加载的模块ID
 * @returns CSS加载器函数
 */
type RequireFunction = (moduleId: number) => (sourceMap: boolean) => CSSLoaderResult;

/**
 * 分段滑块容器样式声明
 * 
 * 该声明文件描述了一个CSS模块的类型结构
 * 实际的CSS内容包含：
 * - `.sectional-slider-container .slider-input`: 滑块输入容器样式（220x44px）
 * - `.slider-outer`: 滑块外层容器样式
 * - `.ant-slider-rail`: 滑块轨道样式（隐藏）
 * - `.ant-slider-step`: 滑块步进器样式（背景色#6B6C6D）
 * - `.ant-slider-dot`: 滑块刻度点样式（非激活状态#6B6C6D，激活状态#396efe）
 * - `.ant-slider-handle`: 滑块手柄样式（背景色#2b2c2e）
 * - `.ant-slider-track`: 滑块轨迹样式（悬停时#396efe）
 * - `.ant-slider-mark`: 滑块标记文本样式（12px字体，半透明白色）
 */
declare const styles: CSSLoaderResult;

export default styles;

/**
 * CSS类名常量
 * 用于类型安全的样式引用
 */
export const CLASS_NAMES: Readonly<{
  /** 分段滑块容器根类名 */
  SECTIONAL_SLIDER_CONTAINER: 'sectional-slider-container';
  /** 滑块输入框类名 */
  SLIDER_INPUT: 'slider-input';
  /** 滑块外层容器类名 */
  SLIDER_OUTER: 'slider-outer';
}>;

/**
 * 样式主题颜色常量
 */
export const THEME_COLORS: Readonly<{
  /** 轨道默认背景色 */
  RAIL_BACKGROUND: '#6B6C6D';
  /** 激活状态主色 */
  ACTIVE_COLOR: '#396efe';
  /** 手柄背景色 */
  HANDLE_BACKGROUND: '#2b2c2e';
  /** 标记文本颜色（半透明白色） */
  MARK_TEXT_COLOR: 'rgba(255, 255, 255, 0.46)';
}>;