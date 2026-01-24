/**
 * Webpack CSS模块导出
 * 该模块导出属性栏滑块输入组的CSS样式定义
 * 
 * @module PropertyBarSliderInputStyles
 * @originalId 111930
 */

/**
 * CSS模块导出函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS加载器实例
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSLoader;

/**
 * CSS加载器接口
 */
interface CSSLoader {
  /**
   * 推送CSS模块到加载队列
   * @param entry - CSS模块条目 [模块ID, CSS内容字符串, source map数据(可选)]
   */
  push(entry: [string, string, string?]): void;
}

/**
 * Webpack模块导出函数签名
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数
 */
declare function moduleExport(
  exports: Record<string, unknown>,
  module: WebpackModule,
  require: WebpackRequire
): void;

/**
 * Webpack模块对象接口
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
type WebpackRequire = (moduleId: number) => CSSLoaderFactory;

/**
 * 属性栏滑块输入组样式定义
 * 
 * 主要CSS类说明：
 * - `.property-bar-slider-input-group` - 滑块输入组容器
 * - `.property-bar-slider-input-group-proportional` - 比例模式样式
 * - `.property-bar-slider-input-wrapper` - 输入框包装器
 * - `.property-bar-slider-input-proportional-icon` - 比例锁定图标
 * - `.property-bar-slider-input-group-proportional-checked` - 选中状态
 * - `.property-bar-slider-input-group-proportional-disabled` - 禁用状态
 * - `.property-bar-slider-input-proportional-tooltip` - 提示工具框
 * - `.property-bar-parent-tips` - 父级提示样式
 * 
 * 样式特性：
 * - 支持比例锁定的连接线视觉效果
 * - 响应hover交互状态
 * - 禁用状态的视觉反馈
 * - 自定义图标定位和样式
 */
declare const styles: string;

export default styles;