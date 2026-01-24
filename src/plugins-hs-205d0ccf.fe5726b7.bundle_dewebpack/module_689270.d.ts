/**
 * CSS模块导出类型定义
 * 该模块包含switch-language组件的样式定义
 */

/**
 * CSS加载器推送函数类型
 * @param content - CSS内容数组，包含模块ID和CSS字符串
 */
type CssLoaderPush = (content: [string, string]) => void;

/**
 * CSS模块导出接口
 * 表示通过css-loader处理后的CSS模块对象
 */
interface CssModuleExports {
  /**
   * 推送CSS内容到样式表集合
   */
  push: CssLoaderPush;
  
  /**
   * CSS模块的toString方法
   * @returns CSS内容的字符串表示
   */
  toString(): string;
  
  /**
   * 模块标识符
   */
  i(modules: any[], mediaQuery?: string): void;
}

/**
 * Webpack模块工厂函数类型
 * @param cssLoaderApi - CSS加载器API函数，接收sourceMap布尔值参数
 * @returns CSS模块导出对象
 */
type CssModuleFactory = (cssLoaderApi: (sourceMap: boolean) => CssModuleExports) => CssModuleExports;

/**
 * 模块导出声明
 * 该模块导出switch-language组件的CSS样式
 * 
 * 样式功能说明：
 * - .switch-language: 语言切换器主容器（相对定位）
 * - .switch-language svg: SVG图标样式（1em尺寸，垂直居中）
 * - .switch-language > span: 文本标签样式（内联块，左边距0.7em）
 * - .pointer: 可点击元素样式（鼠标指针，hover时浅蓝色背景）
 * - li: 列表项样式（白色背景，边框，2.35714em高度）
 * - .region-list: 区域列表（绝对定位下拉菜单，z-index 1000）
 * - .region-item: 区域项（最小宽度10em，相对定位）
 * - .selected: 选中状态（蓝色背景#55acee，白色文字）
 * - .lang-list: 语言列表（绝对定位子菜单）
 * - .hide-region-list: 隐藏区域列表状态
 */
declare module "module_689270" {
  const styles: CssModuleExports;
  export = styles;
}

/**
 * CSS内容常量
 * 包含完整的switch-language组件样式定义
 */
declare const CSS_CONTENT: string;

export type { CssModuleExports, CssLoaderPush, CssModuleFactory };
export { CSS_CONTENT };