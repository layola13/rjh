/**
 * CSS模块加载器类型定义
 * Module: module_523973
 * Original ID: 523973
 */

/**
 * Webpack CSS导出函数类型
 * @param useSourceMap - 是否使用source map
 * @returns CSS模块加载器实例
 */
type CSSModuleLoader = (useSourceMap: boolean) => {
  /**
   * 将CSS内容推送到模块
   * @param entry - CSS模块条目 [模块ID, CSS内容字符串]
   */
  push(entry: [string, string]): void;
};

/**
 * Webpack模块导出函数签名
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数
 */
declare function module_523973(
  exports: { exports: unknown },
  module: { id: string },
  require: (moduleId: number) => CSSModuleLoader
): void;

export default module_523973;

/**
 * CSS类名定义
 */
export interface RoomTypeCSSClasses {
  /** 房间类型下拉菜单右侧容器 */
  roomTypeDropdownRightMenu: string;
  /** 列表容器 */
  ulcontainer: string;
  /** 下拉项图标跨度 */
  dropdownitemspan: string;
  /** 文本内容 */
  utext: string;
  /** 右侧属性栏 */
  rightpropertybar: string;
  /** 户外空间板厚度 */
  'outdoorspace-slab-thickness': string;
  /** 长度输入框 */
  'length-input': string;
  /** 左侧元素 */
  left: string;
  /** 天花板切换 */
  'toggle-ceiling': string;
  /** 切换标题 */
  'toggle-title': string;
  /** 天花板提示 */
  'ceiling-tips': string;
  /** 全局英文样式 */
  'global-en': string;
  /** 属性栏三级标题 */
  'property-bar-level3-title': string;
}