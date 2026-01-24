/**
 * CSS样式加载器模块
 * @module module_69
 * @description 该模块负责处理CSS样式的动态注入和管理，使用style-loader相关工具链
 */

/**
 * 样式加载器配置接口
 * @interface StyleLoaderOptions
 */
interface StyleLoaderOptions {
  /**
   * 样式标签转换函数
   * @description 用于转换和处理注入的<style>标签
   */
  styleTagTransform: () => void;

  /**
   * 设置元素属性的函数
   * @description 为动态创建的样式元素设置HTML属性
   */
  setAttributes: () => void;

  /**
   * 插入样式的函数
   * @description 将样式元素插入到指定的DOM位置（此处为head）
   * @param target - 目标DOM节点名称，默认为"head"
   */
  insert: (target: string) => void;

  /**
   * DOM操作API
   * @description 提供底层DOM操作接口用于样式注入
   */
  domAPI: () => void;

  /**
   * 插入样式元素的工厂函数
   * @description 创建并返回用于插入样式的DOM元素
   */
  insertStyleElement: () => void;
}

/**
 * CSS模块对象接口
 * @interface CSSModule
 */
interface CSSModule {
  /**
   * CSS模块的局部作用域类名映射
   * @description 当使用CSS Modules时，包含原始类名到hash后类名的映射表
   * @example
   * {
   *   "button": "button_a1b2c3",
   *   "container": "container_d4e5f6"
   * }
   */
  locals?: Record<string, string> | undefined;

  /**
   * 样式模块的其他属性
   */
  [key: string]: unknown;
}

/**
 * 样式加载器工厂函数类型
 * @description 接收CSS模块和配置，执行样式注入
 * @param cssModule - CSS模块对象，包含样式信息
 * @param options - 样式加载器配置选项
 */
type StyleLoaderFactory = (
  cssModule: CSSModule,
  options: StyleLoaderOptions
) => void;

/**
 * 模块导出的默认值
 * @description CSS模块的局部类名映射，如果不存在则为undefined
 * @type {Record<string, string> | undefined}
 */
declare const moduleExport: Record<string, string> | undefined;

export default moduleExport;

/**
 * 内部依赖模块引用（仅用于类型声明，实际由构建工具处理）
 */
declare module 'style-loader-utils' {
  /**
   * 样式加载器主函数（模块230）
   */
  export function styleLoader(): StyleLoaderFactory;

  /**
   * DOM API提供者（模块823）
   */
  export function domAPI(): () => void;

  /**
   * 插入位置绑定器（模块317）
   */
  export function insertBinder(): {
    bind(context: null, target: string): () => void;
  };

  /**
   * 属性设置器（模块38）
   */
  export function attributeSetter(): () => void;

  /**
   * 样式元素插入器（模块762）
   */
  export function styleElementInserter(): () => void;

  /**
   * 样式标签转换器（模块935）
   */
  export function styleTagTransformer(): () => void;

  /**
   * CSS模块内容（模块154）
   */
  export const cssModuleContent: CSSModule;
}