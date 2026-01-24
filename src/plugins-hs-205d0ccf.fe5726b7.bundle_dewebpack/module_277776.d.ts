/**
 * CSS模块导出类型定义
 * @module MaterialDropdownStyles
 * @description 材质下拉列表组件的样式模块定义
 */

/**
 * Webpack CSS加载器模块导出函数类型
 * @param exports - 模块导出对象
 * @param cssLoader - CSS加载器工厂函数
 * @param loaderAPI - 加载器API函数（通常用于require其他模块）
 */
declare function cssModuleExport(
  exports: NodeModule,
  cssLoader: (sourceMap: boolean) => CSSLoaderAPI,
  loaderAPI: (moduleId: number) => unknown
): void;

/**
 * CSS加载器API接口
 * @description 用于处理CSS模块的加载和注入
 */
interface CSSLoaderAPI {
  /**
   * 推送CSS内容到样式系统
   * @param content - CSS内容元组 [moduleId, cssText, sourceMap?]
   */
  push(content: [string | number, string, string?]): void;
}

/**
 * Node模块对象接口
 */
interface NodeModule {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports: unknown;
}

/**
 * 材质下拉列表样式类名映射
 * @description 该模块导出的CSS类名
 */
interface MaterialDropdownStyleClasses {
  /** 材质下拉列表容器 */
  'material-dropdown-list': string;
  /** 当前选中的材质项 */
  'current-material': string;
  /** 当前材质图标 */
  'current-material-img': string;
  /** 下拉箭头图标 */
  'current-material-drop-icon': string;
  /** 悬停状态的材质项 */
  'hover-material': string;
  /** 下拉菜单列表容器 */
  'material-dropdown-ul': string;
  /** 下拉菜单单项 */
  'dropdown-ul-item': string;
  /** 菜单项图标 */
  'ul-item-img': string;
  /** 菜单项文本标签 */
  'ul-item-label': string;
  /** 菜单项快捷键提示 */
  'ul-item-hotkey': string;
  /** 激活状态 */
  'active': string;
  /** 全局英文环境类名 */
  'global-en': string;
}

/**
 * CSS样式内容
 * @description 材质下拉列表的完整样式定义，包含：
 * - 容器样式（半透明白色背景，左侧圆角）
 * - 当前材质显示区域
 * - 下拉菜单列表（阴影效果，固定宽度166px）
 * - 菜单项交互效果（悬停、激活状态）
 * - 国际化支持（英文环境下宽度200px）
 */
declare const cssContent: string;

export = cssModuleExport;
export { MaterialDropdownStyleClasses, cssContent };