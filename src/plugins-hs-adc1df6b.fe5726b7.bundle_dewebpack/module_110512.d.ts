/**
 * CSS样式模块类型定义
 * 该模块导出webpack编译后的CSS样式字符串数组
 */

/**
 * 样式加载器导入函数类型
 * @param shouldUseSourceMap - 是否使用source map进行调试
 * @returns 样式加载器实例，提供push方法用于添加样式规则
 */
type StyleLoaderFactory = (shouldUseSourceMap: boolean) => StyleLoader;

/**
 * 样式加载器接口
 * 用于向DOM中注入CSS样式
 */
interface StyleLoader {
  /**
   * 添加CSS样式规则到页面
   * @param styleRule - 样式规则数组，格式为 [moduleId, cssContent, sourceMap?]
   */
  push(styleRule: [string | number, string, string?]): void;
}

/**
 * 资源路径解析函数类型
 * 用于将模块引用转换为实际的资源URL路径
 * @param resourcePath - 资源模块ID或路径
 * @returns 解析后的完整资源URL
 */
type AssetUrlResolver = (resourcePath: string | number) => string;

/**
 * Webpack模块导出函数签名
 * @param exports - 当前模块的导出对象
 * @param module - 当前模块元数据（包含id等信息）
 * @param require - 模块加载函数，用于导入其他模块
 */
declare function moduleExport(
  exports: ModuleExports,
  module: ModuleMetadata,
  require: RequireFunction
): void;

/**
 * 模块导出对象接口
 */
interface ModuleExports {
  /** 模块导出的任意内容 */
  [key: string]: unknown;
}

/**
 * 模块元数据接口
 */
interface ModuleMetadata {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出对象 */
  exports: ModuleExports;
  /** 是否已加载 */
  loaded?: boolean;
  /** 其他模块属性 */
  [key: string]: unknown;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 目标模块的导出内容
 */
type RequireFunction = (moduleId: string | number) => unknown;

/**
 * CSS样式规则元组类型
 * [0]: 模块ID
 * [1]: CSS内容字符串
 * [2]: Source Map（可选）
 */
type CSSStyleRule = [string | number, string, string?];

/**
 * 全局用户信息下拉菜单样式模块
 * 
 * 包含以下主要样式：
 * - `.global-ddmenu.user-info` - 用户信息下拉菜单容器
 * - `.global-ddmenu.user-info .menu` - 菜单触发按钮区域
 * - `.global-ddmenu.user-info .menu #userAvatar` - 用户头像
 * - `.global-ddmenu.user-info .user-vip-badge` - VIP徽章
 * - `.global-user-info-menu .menus` - 下拉菜单内容区
 * - `.global-user-info-menu .menus .cli` - 菜单项
 * - 会员升级/续费相关样式
 * - 积分/金币显示样式
 * 
 * @remarks
 * 此模块依赖以下资源：
 * - 模块 992716: 资源URL解析器
 * - 模块 986380: CSS样式加载器工厂
 * - 模块 223156: 会员升级背景图
 * - 模块 869394: 会员过期背景图
 * - 模块 382037: 积分图标
 */
declare module "module_110512" {
  const styles: CSSStyleRule[];
  export default styles;
}