/**
 * CSS模块加载器类型定义
 * Module: module_944839
 * Original ID: 944839
 * 
 * 该模块导出一个CSS样式表，包含属性栏标签按钮组件的样式定义
 */

/**
 * Webpack模块导出函数签名
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数，用于加载依赖模块
 */
declare function cssModuleLoader(
  exports: CSSModuleExports,
  module: WebpackModule,
  require: WebpackRequire
): void;

/**
 * CSS模块导出接口
 */
interface CSSModuleExports {
  /** 模块唯一标识符 */
  id: string | number;
  
  /** 模块导出内容（通常为CSS字符串数组） */
  exports: CSSStyleExports;
}

/**
 * CSS样式导出对象
 * 提供push方法用于添加CSS内容
 */
interface CSSStyleExports {
  /**
   * 添加CSS样式内容
   * @param content - 包含模块ID和CSS字符串的元组数组
   */
  push(content: [string | number, string][]): void;
}

/**
 * Webpack模块对象
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string | number;
  
  /** 模块导出对象 */
  exports: unknown;
}

/**
 * Webpack require函数类型
 */
interface WebpackRequire {
  /**
   * 加载指定模块
   * @param moduleId - 要加载的模块ID
   * @returns 模块导出内容
   */
  (moduleId: number): unknown;
}

/**
 * 属性栏标签按钮组件样式类名定义
 */
declare namespace PropertyBarLabelButtonsStyles {
  /**
   * 按钮容器：flex布局，支持换行，两端对齐
   */
  const container: "property-bar-labelbuttons";
  
  /**
   * 按钮项基础样式：带边框、圆角、鼠标指针、相对定位
   */
  const item: "property-bar-labelbuttons-item";
  
  /**
   * 3列布局的按钮项：宽度30%，纵横比1:1
   */
  const item3Column: "property-bar-labelbuttons-item__3";
  
  /**
   * 4列布局的按钮项：宽度21%，纵横比1:1
   */
  const item4Column: "property-bar-labelbuttons-item__4";
  
  /**
   * 激活状态按钮：深色边框和背景
   */
  const itemActive: "property-bar-labelbuttons-item-active";
  
  /**
   * 按钮图标：绝对定位，居中显示
   */
  const itemIcon: "property-bar-labelbuttons-item-icon";
}

export = cssModuleLoader;
export as namespace PropertyBarLabelButtonsModule;