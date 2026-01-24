/**
 * Ant Design Cascader 组件样式类型定义
 * @module CascaderStyles
 */

/**
 * Webpack 模块导出函数的参数类型
 */
interface WebpackModuleParams {
  /** 模块导出对象 */
  exports: ModuleExports;
  /** 模块 ID */
  id: string;
}

/**
 * 模块导出对象接口
 */
interface ModuleExports {
  /** 导出内容（通常是 CSS 字符串或其他模块） */
  [key: string]: unknown;
}

/**
 * CSS 加载器函数类型
 * @param insertStyles - 是否插入样式到 DOM
 * @returns CSS 模块加载器实例
 */
type CSSLoaderFunction = (insertStyles: boolean) => CSSModuleLoader;

/**
 * CSS 模块加载器接口
 */
interface CSSModuleLoader {
  /**
   * 添加 CSS 模块内容
   * @param moduleData - 包含模块 ID 和 CSS 内容的数组
   */
  push(moduleData: [string, string]): void;
}

/**
 * Ant Design Cascader 级联选择器样式模块
 * 
 * 该模块包含以下组件的完整样式定义：
 * - `.ant-cascader` - 级联选择器容器
 * - `.ant-cascader-picker` - 选择器主体
 * - `.ant-cascader-input` - 输入框
 * - `.ant-cascader-menus` - 下拉菜单容器
 * - `.ant-cascader-menu` - 单个菜单列
 * - `.ant-cascader-menu-item` - 菜单项
 * 
 * 支持特性：
 * - 搜索模式 (.ant-cascader-picker-show-search)
 * - 禁用状态 (.ant-cascader-picker-disabled)
 * - 无边框模式 (.ant-cascader-picker-borderless)
 * - RTL 布局支持 (.ant-cascader-picker-rtl)
 * - 尺寸变体 (small)
 * - 动画效果 (slide-up enter/leave)
 * 
 * @param exports - Webpack 模块导出对象
 * @param moduleId - 当前模块 ID
 * @param require - Webpack require 函数（用于加载 CSS 加载器）
 */
declare function cascaderStylesModule(
  exports: ModuleExports,
  moduleId: string,
  require: (id: number) => CSSLoaderFunction
): void;

/**
 * 级联选择器样式常量
 */
declare const CascaderStyleConstants: {
  /** 模块原始 ID */
  readonly MODULE_ID: 939286;
  /** CSS 加载器模块 ID */
  readonly CSS_LOADER_ID: 986380;
  /** 默认字体大小 */
  readonly DEFAULT_FONT_SIZE: '14px';
  /** 默认边框圆角 */
  readonly DEFAULT_BORDER_RADIUS: '2px';
  /** 菜单默认高度 */
  readonly MENU_HEIGHT: '180px';
  /** 菜单最小宽度 */
  readonly MENU_MIN_WIDTH: '111px';
};

export { cascaderStylesModule, CascaderStyleConstants, WebpackModuleParams, ModuleExports, CSSLoaderFunction, CSSModuleLoader };