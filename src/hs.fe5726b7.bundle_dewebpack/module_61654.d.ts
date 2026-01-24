/**
 * CSS模块导出函数
 * 该模块用于注入移动端提示消息的样式
 * @module MobileTipsMessageStyles
 */

/**
 * Webpack模块导出函数类型定义
 * @param exports - 模块导出对象
 * @param require - 模块加载函数
 * @param moduleFactory - 样式加载工厂函数
 */
export type WebpackModuleFunction = (
  exports: ModuleExports,
  require: RequireFunction,
  moduleFactory: StyleLoaderFactory
) => void;

/**
 * 模块导出对象接口
 */
interface ModuleExports {
  /** 模块ID */
  id: string | number;
  /** 导出内容 */
  exports?: unknown;
}

/**
 * 模块加载函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出内容
 */
type RequireFunction = (moduleId: number) => StyleLoaderFactory;

/**
 * 样式加载工厂接口
 * 负责处理CSS样式的注入和管理
 */
interface StyleLoaderFactory {
  /**
   * 推送样式到样式管理器
   * @param sourceMap - 是否包含源映射
   * @returns 样式加载器实例
   */
  (sourceMap: boolean): StyleLoader;
}

/**
 * 样式加载器接口
 */
interface StyleLoader {
  /**
   * 添加CSS样式规则
   * @param styleData - 样式数据数组 [模块ID, CSS内容, 源映射(可选)]
   */
  push(styleData: [string | number, string, string?]): void;
}

/**
 * 移动端提示消息样式CSS内容
 * 包含以下组件样式：
 * - .homestyler-ui-components.homestyler-notice.mobile-tips-message: 主容器
 * - .homestyler-notice-content: 内容区域（最大宽度500px，响应式宽度，蓝色背景）
 * - .homestyler-notice-closebtn: 关闭按钮（绝对定位在右上角）
 * - .anticon: 图标样式（白色，悬停时变深色）
 */
declare const CSS_CONTENT: string;

/**
 * 模块ID常量
 */
declare const MODULE_ID = 61654;

/**
 * 样式加载器模块ID常量
 */
declare const STYLE_LOADER_MODULE_ID = 986380;

/**
 * 默认导出：Webpack模块函数
 * 该函数会被Webpack运行时调用，将CSS样式注入到页面中
 */
declare const _default: WebpackModuleFunction;
export default _default;