/**
 * CSS样式模块类型定义
 * @module PopoverStyles
 * @description 弹出框组件的样式定义模块，包含容器、标题、内容和按钮等样式
 */

/**
 * CSS模块加载器函数类型
 * @param sourceMap - 是否启用source map
 * @returns CSS加载器实例
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSLoader;

/**
 * CSS加载器接口
 * @description 提供CSS内容推送功能的加载器
 */
interface CSSLoader {
  /**
   * 推送CSS样式内容
   * @param entry - CSS模块条目 [模块ID, CSS内容字符串, source map数据(可选)]
   */
  push(entry: [string, string, string?]): void;
}

/**
 * Webpack模块导出函数签名
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - 模块加载函数
 * @description 这是一个CSS样式模块，导出弹出框相关的样式定义
 * 
 * @remarks
 * 样式类说明：
 * - `.popover-container`: 弹出框容器，宽224px，黑色背景，绝对定位
 * - `.popover-container .header`: 顶部区域，高6px，圆角边框
 * - `.popover-container .header .angle`: 三角形指示器，使用边框实现，颜色#F41855
 * - `.popover-container .content-main`: 主内容区，白色文字，12px字体
 * - `.popover-container .content-main .title-container`: 标题容器，高25px，16px粗体
 * - `.popover-container .content-main .title`: 标题文本，最大宽170px，超出省略
 * - `.popover-container .content-main .popover-container-close`: 关闭按钮，右浮动
 * - `.popover-container .content-main .content`: 内容文本，行高16px，灰色(#bebebe)
 * - `.popover-container .content-main .btn-in-popover`: 弹出框内按钮，最小宽122px，圆角11px
 */
declare module 'module_807672' {
  /**
   * Webpack模块对象
   */
  interface WebpackModule {
    /** 模块唯一标识符 */
    id: string;
    /** 模块导出对象 */
    exports: CSSLoader;
  }

  /**
   * Webpack require函数
   * @param moduleId - 要加载的模块ID
   * @returns 模块加载器函数
   */
  type WebpackRequire = (moduleId: number) => CSSLoaderFunction;

  /**
   * 模块工厂函数
   * @param module - Webpack模块对象
   * @param exports - 模块导出对象
   * @param require - 模块加载函数
   */
  const factory: (
    module: WebpackModule,
    exports: CSSLoader,
    require: WebpackRequire
  ) => void;

  export default factory;
}

/**
 * 弹出框样式类名命名空间
 * @description 定义所有可用的CSS类名常量
 */
declare namespace PopoverStyleClasses {
  /** 弹出框容器根类名 */
  const CONTAINER: 'popover-container';
  /** 头部区域类名 */
  const HEADER: 'header';
  /** 三角形指示器类名 */
  const ANGLE: 'angle';
  /** 主内容区类名 */
  const CONTENT_MAIN: 'content-main';
  /** 标题容器类名 */
  const TITLE_CONTAINER: 'title-container';
  /** 标题文本类名 */
  const TITLE: 'title';
  /** 关闭按钮类名 */
  const CLOSE: 'popover-container-close';
  /** 内容文本类名 */
  const CONTENT: 'content';
  /** 弹出框按钮类名 */
  const BUTTON: 'btn-in-popover';
}