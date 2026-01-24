/**
 * CSS模块加载器类型定义
 * @module PropertyBarSwitchStyles
 * @description 属性栏开关组件的样式模块类型声明
 */

/**
 * CSS模块导出函数类型
 * @param shouldUseSourceMap - 是否使用source map的标志
 * @returns CSS加载器实例，包含push方法用于注入样式
 */
type CSSLoaderFunction = (shouldUseSourceMap: boolean) => CSSLoaderInstance;

/**
 * CSS加载器实例接口
 * @description 提供样式注入功能的加载器对象
 */
interface CSSLoaderInstance {
  /**
   * 将CSS样式规则推入样式系统
   * @param styleEntry - 样式条目元组 [模块ID, CSS内容字符串, source map(可选)]
   */
  push(styleEntry: [string | number, string, string?]): void;
}

/**
 * Webpack模块导出函数签名
 * @param moduleExports - 模块导出对象，用于挂载导出内容
 * @param require - Webpack require函数，用于加载依赖模块
 * @param moduleId - 当前模块的唯一标识符
 * 
 * @description
 * 此模块导出属性栏开关组件(PropertyBarSwitch)的样式定义，包含：
 * - .property-bar-switch: 主容器样式（flex布局，space-between对齐）
 * - .property-bar-switch-button: 开关按钮样式
 * - .property-bar-label: 标签容器样式
 * - .property-bar-label-text: 标签文本样式（右边距5px）
 * - .property-bar-label-icon: 标签图标样式（字体大小16px）
 * - .switch-label: 开关标签样式（最小宽度100px）
 * - .property-bar-switch-label-tooltip: 工具提示样式（固定宽度210px）
 */
declare module "module_66392" {
  /**
   * 模块导出函数
   */
  const moduleExporter: (
    moduleExports: { id: string | number; exports?: unknown },
    require: (moduleId: number) => CSSLoaderFunction,
    moduleMetadata: { id: string | number }
  ) => void;

  export = moduleExporter;
}

/**
 * CSS类名命名空间
 * @description 该模块定义的所有CSS类名
 */
declare namespace PropertyBarSwitchStyles {
  /** 主容器类名 - flex布局，高度36px，字体12px，颜色#888888 */
  const PROPERTY_BAR_SWITCH: "property-bar-switch";
  
  /** 开关按钮容器类名 */
  const PROPERTY_BAR_SWITCH_BUTTON: "property-bar-switch-button";
  
  /** 标签容器类名 - flex布局，垂直居中 */
  const PROPERTY_BAR_LABEL: "property-bar-label";
  
  /** 标签文本类名 - 右边距5px */
  const PROPERTY_BAR_LABEL_TEXT: "property-bar-label-text";
  
  /** 标签图标类名 - 字体大小16px */
  const PROPERTY_BAR_LABEL_ICON: "property-bar-label-icon";
  
  /** 开关标签类名 - 最小宽度100px */
  const SWITCH_LABEL: "switch-label";
  
  /** 工具提示类名 - 宽度210px（!important） */
  const PROPERTY_BAR_SWITCH_LABEL_TOOLTIP: "property-bar-switch-label-tooltip";
}