/**
 * CSS模块导出类型定义
 * 用于Webpack css-loader模块的类型声明
 */

/**
 * Webpack模块工厂函数类型
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数，用于加载其他模块
 */
declare function cssModuleFactory(
  exports: Record<string, unknown>,
  module: WebpackModule,
  require: WebpackRequire
): void;

/**
 * Webpack模块对象接口
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出对象 */
  exports: CssModuleExports;
  /** 模块是否已加载 */
  loaded?: boolean;
  /** 模块文件路径 */
  filename?: string;
}

/**
 * Webpack require函数类型
 * 用于动态加载模块
 */
interface WebpackRequire {
  /** 
   * 加载指定模块
   * @param moduleId - 模块ID
   * @returns 模块导出对象
   */
  (moduleId: string | number): unknown;
  
  /** 模块缓存 */
  c?: Record<string, WebpackModule>;
  
  /** 公共路径配置 */
  p?: string;
}

/**
 * CSS加载器模块导出接口
 * 符合css-loader的导出规范
 */
interface CssModuleExports {
  /**
   * 添加CSS规则到样式集合
   * @param cssRule - CSS规则数组 [moduleId, cssContent, sourceMap?]
   */
  push(cssRule: [string | number, string, string?]): void;
  
  /** CSS规则列表 */
  toString(): string;
  
  /** 其他导出属性 */
  [key: string]: unknown;
}

/**
 * 房屋收藏筛选器样式模块
 * 
 * 包含的CSS类：
 * - `.fpcollection-filter` - 主容器样式
 * - `.house-style` - 房屋风格筛选区域
 * - `.house-area` - 房屋面积筛选区域
 * - `.house-style-title` / `.house-area-title` - 筛选标题
 * - `.house-style-filter-item` / `.house-area-filter-item` - 筛选项
 * - `.house-style-all` / `.house-area-all` - "全部"选项
 * - `.selected` - 选中状态修饰符
 * - `:hover` - 鼠标悬停状态
 * 
 * 布局尺寸：
 * - 容器宽度：854px
 * - 容器高度：54px
 * - 左边距：42px（相对父容器）
 * - 顶边距：12px
 * 
 * 颜色主题：
 * - 默认文本：#33353B
 * - 高亮/选中：#396EFE
 */
declare const cssModule: CssModuleExports;

export = cssModule;