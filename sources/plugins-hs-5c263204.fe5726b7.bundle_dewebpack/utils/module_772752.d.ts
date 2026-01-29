/**
 * CSS 模块加载器类型定义
 * 用于处理样式注入和DOM操作的样式加载配置
 */

/**
 * 样式标签转换函数类型
 * 用于在DOM中插入或更新样式标签的内容
 */
type StyleTagTransformFunction = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * 样式元素属性设置函数类型
 * 为样式标签设置自定义属性（如nonce、data-*等）
 */
type SetAttributesFunction = (styleElement: HTMLElement) => void;

/**
 * 样式元素插入函数类型
 * @param target - 插入目标选择器或元素（如"head"）
 * @param options - 插入配置选项
 */
type InsertFunction = (target: string, options?: InsertOptions) => HTMLElement;

/**
 * DOM API操作接口
 * 提供底层DOM操作方法
 */
interface DomAPIFunction {
  (styleElement: HTMLElement, options: StyleLoaderOptions): void;
}

/**
 * 样式元素插入器函数类型
 * 负责创建并返回样式元素
 */
type InsertStyleElementFunction = (options: StyleLoaderOptions) => HTMLStyleElement;

/**
 * 插入选项接口
 */
interface InsertOptions {
  /**
   * 样式插入位置配置
   */
  insert?: string | Element;
  /**
   * 样式优先级
   */
  priority?: number;
}

/**
 * 样式加载器配置选项
 */
interface StyleLoaderOptions {
  /**
   * 样式标签内容转换处理函数
   */
  styleTagTransform: StyleTagTransformFunction;

  /**
   * 样式元素属性设置函数
   */
  setAttributes: SetAttributesFunction;

  /**
   * 样式元素插入函数（已绑定到"head"）
   */
  insert: InsertFunction;

  /**
   * DOM API操作函数
   */
  domAPI: DomAPIFunction;

  /**
   * 样式元素插入器函数
   */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * CSS模块导出的局部作用域类名映射
 * key为原始类名，value为编译后的哈希类名
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS模块对象接口
 */
interface CSSModule {
  /**
   * CSS模块的局部作用域类名映射
   * 仅在CSS Modules模式下存在
   */
  locals?: CSSModuleLocals;
}

/**
 * 默认导出：CSS模块的局部类名映射对象
 * 如果不是CSS Modules或无locals，则为undefined
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * 命名导出：从原始CSS模块中重新导出所有非default的导出项
 * （如果原模块有其他命名导出）
 */
export * from './original-css-module';