/**
 * CSS模块类型定义
 * 该模块导出底图设置相关的样式表
 */

/**
 * Webpack CSS加载器模块导出函数类型
 * @param sourceMap - 是否启用源映射
 * @returns CSS加载器实例
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSLoader;

/**
 * CSS加载器接口
 * 用于处理CSS模块的加载和导出
 */
interface CSSLoader {
  /**
   * 添加CSS内容到加载器
   * @param moduleId - 模块标识符
   * @param cssContent - CSS样式内容
   * @param sourceMap - 可选的源映射信息
   */
  push(content: [string, string, string?]): void;
}

/**
 * Webpack模块导出对象
 */
interface ModuleExports {
  /** 模块ID */
  id: string;
  /** 模块导出内容 */
  exports: CSSLoader;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 加载的模块导出内容
 */
type WebpackRequire = (moduleId: number) => CSSLoaderFactory;

/**
 * 底图设置样式模块
 * 
 * 该模块包含以下样式类：
 * - `.underlayimg-setting-wrapper` - 底图设置包装器容器
 * - `.underlayimg-setting-text` - 设置文本区域
 * - `.underlayimg-setting-label` - 设置标签文本
 * - `.underlayimg-setting-arrow` - 箭头图标
 * - `.underlayimg-setting-popup` - 弹出式设置面板
 * - `.underlayimg-title` - 标题样式
 * - `.wall-opacity-background` - 墙体透明度背景
 * - `.wall-opacity-label` - 透明度标签
 * - `.bottom-bar-wall-opacity-setting` - 底部栏透明度设置
 * - `.slider-outer` - 滑块外层容器
 * - `.slider-bar-wrapper` - 滑块条包装器
 * - `.slider-circle` - 滑块圆形控制点
 * - `.length-input-outer` - 长度输入外层
 * - `.input-wrapper` - 输入框包装器
 * - `.arrow-group` - 箭头按钮组
 * - `.underlayimg-action` - 底图操作按钮区域
 * - `.underlayimg-part` - 底图部分区域
 * - `.underlayimg-check-box` - 复选框样式
 * - `.underlayimg-button-label` - 按钮标签
 * - `.underlayimg-popup-container` - 弹出容器
 * - `.global-en` - 英文全局样式覆盖
 * 
 * @param exports - Webpack模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数
 */
declare function underlayImageSettingStyles(
  exports: ModuleExports,
  module: ModuleExports,
  require: WebpackRequire
): void;

export default underlayImageSettingStyles;