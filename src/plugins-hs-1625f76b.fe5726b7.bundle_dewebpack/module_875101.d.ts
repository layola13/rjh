/**
 * CSS 样式模块类型定义
 * 定义属性栏状态栏相关的样式模块导出类型
 */

/**
 * Webpack CSS 模块加载器函数类型
 * @param sourceMap - 是否启用源映射
 * @returns CSS 模块加载器实例
 */
type CssModuleLoader = (sourceMap: boolean) => CssModule;

/**
 * CSS 模块接口
 * 表示一个可以添加样式规则的 CSS 模块
 */
interface CssModule {
  /**
   * 添加 CSS 规则到模块
   * @param rule - CSS 规则数组，包含模块 ID、CSS 内容等信息
   */
  push(rule: [string, string]): void;
}

/**
 * 样式规则元组类型
 * [0] - 模块 ID
 * [1] - CSS 样式内容字符串
 */
type StyleRule = [moduleId: string, cssContent: string];

/**
 * 模块导出接口
 * Webpack 模块系统的标准导出对象
 */
interface ModuleExports {
  /** 模块唯一标识符 */
  id: string;
  
  /** 模块导出内容（CSS 模块实例） */
  exports: CssModule;
}

/**
 * 属性栏状态栏样式模块
 * 
 * 该模块包含以下主要样式定义：
 * - `.propertybar.statusBar` - 主状态栏容器样式
 * - `.contents` - 内容区域样式
 * - `.cdropdown` - 下拉菜单组件样式
 * - `.cameraSwitchWidget` - 相机切换控件样式
 * - `.imagebutton` - 图标按钮样式
 * - `.radioBtn` - 单选按钮组样式
 * 
 * 状态栏位置：页面右下角，距离边缘 12px
 * 主要功能：提供建模工具的属性配置界面
 * 
 * @remarks
 * 此模块由 Webpack CSS Loader (ID: 986380) 处理
 * 样式内容包含响应式布局、悬停效果、动画等
 */
declare module "module_875101" {
  const cssModule: CssModule;
  export = cssModule;
}

/**
 * 样式内容常量
 * 包含完整的 CSS 样式定义字符串
 */
declare const STATUSBAR_STYLES: string;

/**
 * 模块初始化函数类型
 * @param moduleExports - Webpack 模块导出对象
 * @param require - Webpack require 函数，用于加载依赖模块
 * @param cssLoaderFactory - CSS 加载器工厂函数（模块 ID: 986380）
 */
type ModuleInitializer = (
  moduleExports: ModuleExports,
  _unused: unknown,
  cssLoaderFactory: CssModuleLoader
) => void;

export type {
  CssModuleLoader,
  CssModule,
  StyleRule,
  ModuleExports,
  ModuleInitializer
};