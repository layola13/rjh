/**
 * CSS模块声明
 * 该模块导出CSS样式表内容，用于设计信息组件的样式定义
 */

/**
 * CSS模块导出函数类型
 * @param isDevelopment - 是否为开发模式，false表示生产模式
 * @returns CSS加载器实例
 */
type CSSLoaderFunction = (isDevelopment: boolean) => CSSLoader;

/**
 * CSS加载器接口
 * 用于处理和注入CSS样式到页面中
 */
interface CSSLoader {
  /**
   * 添加CSS规则到样式表
   * @param moduleId - 模块标识符
   * @param cssContent - CSS内容字符串
   * @param sourceMap - 可选的source map字符串
   */
  push(rule: [string, string, string?]): void;
}

/**
 * 模块导出对象接口
 */
interface ModuleExports {
  /** 模块唯一标识符 */
  id: string;
  /** 模块导出内容 */
  exports: CSSLoader;
}

/**
 * Webpack模块加载器函数类型
 * @param moduleId - 模块ID
 * @returns 对应模块的导出内容
 */
type WebpackRequire = (moduleId: number) => CSSLoaderFunction;

/**
 * 设计信息组件样式模块
 * 
 * 该模块包含以下样式类：
 * - `.hs-design-info` - 主容器
 * - `.hs-design-info .designinfo` - 设计信息区域
 * - `.hs-design-info .designinfo .menu` - 菜单按钮
 * - `.hs-design-info .designinfo .menus` - 下拉菜单容器
 * - `.design-name-input` - 设计名称输入框
 * - `.designinfo-menu-items` - 菜单项容器
 * - `.designinfo-menu-item` - 单个菜单项
 * 
 * 支持的交互状态：
 * - hover - 悬停状态
 * - focus - 聚焦状态
 * - error - 错误状态
 * - disable - 禁用状态
 */
declare module "module_824356" {
  const cssModule: CSSLoader;
  export default cssModule;
}

/**
 * CSS样式规则内容
 * 包含完整的.hs-design-info组件样式定义
 */
export const cssContent: string;

/**
 * 模块ID常量
 */
export const MODULE_ID = "824356";