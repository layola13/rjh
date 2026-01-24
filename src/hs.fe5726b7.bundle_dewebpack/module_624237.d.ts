/**
 * CSS模块定义 - 切换按钮样式
 * 
 * 该模块导出用于切换按钮组件的CSS样式，包括：
 * - 标准尺寸切换按钮 (.toggle-button)
 * - 紧凑尺寸切换按钮 (.toggle-button-compact)
 * 
 * @module ToggleButtonStyles
 */

/**
 * CSS模块加载器函数类型
 * 用于将CSS内容推送到样式系统
 */
interface CSSModuleLoader {
  /**
   * 将CSS内容添加到样式表
   * @param content - CSS样式数组 [模块ID, CSS字符串, sourceMap标识]
   */
  push(content: [string, string, string]): void;
}

/**
 * Webpack CSS加载器工厂函数类型
 * @param sourceMap - 是否启用source map
 * @returns CSS模块加载器实例
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSModuleLoader;

/**
 * Webpack模块导入函数类型
 * @param moduleId - 要导入的模块ID
 * @returns 导入的模块（CSS加载器工厂）
 */
type WebpackRequire = (moduleId: number) => CSSLoaderFactory;

/**
 * Webpack模块导出对象
 */
interface ModuleExports {
  /** 模块唯一标识符 */
  id: string;
  /** 模块导出内容 */
  exports: CSSModuleLoader;
}

/**
 * 切换按钮样式模块
 * 
 * 导出的CSS类：
 * - `.toggle-button` - 标准切换按钮容器（高度34px）
 * - `.toggle-button .toggle-title` - 切换按钮标题文本
 * - `.toggle-button .ant-switch` - Ant Design开关组件样式
 * - `.toggle-button .ant-switch-checked` - 选中状态样式（蓝色#327DFF）
 * - `.toggle-button-compact` - 紧凑切换按钮容器（高度24px）
 * - `.toggle-button-compact .toggle-title` - 紧凑模式标题文本
 * - `.toggle-button-compact .ant-switch` - 紧凑模式开关样式
 * 
 * @param moduleExports - Webpack模块导出对象
 * @param _unusedExports - 未使用的导出参数
 * @param webpackRequire - Webpack模块加载函数
 */
declare function toggleButtonStylesModule(
  moduleExports: ModuleExports,
  _unusedExports: unknown,
  webpackRequire: WebpackRequire
): void;

export default toggleButtonStylesModule;

/**
 * 样式常量 - 供外部引用
 */
export interface ToggleButtonStyleConstants {
  /** 标准按钮高度 */
  readonly STANDARD_HEIGHT: 34;
  /** 紧凑按钮高度 */
  readonly COMPACT_HEIGHT: 24;
  /** 开关高度 */
  readonly SWITCH_HEIGHT: 20;
  /** 开关最小宽度 */
  readonly SWITCH_MIN_WIDTH: 40;
  /** 开关手柄尺寸 */
  readonly SWITCH_HANDLE_SIZE: 16;
  /** 选中状态颜色 */
  readonly CHECKED_COLOR: '#327DFF';
  /** 标题文字颜色 */
  readonly TITLE_COLOR: '#96969b';
  /** 标题字体大小 */
  readonly TITLE_FONT_SIZE: 12;
  /** 标题右侧间距 */
  readonly TITLE_MARGIN_RIGHT: 6;
}

export const STYLE_CONSTANTS: ToggleButtonStyleConstants;