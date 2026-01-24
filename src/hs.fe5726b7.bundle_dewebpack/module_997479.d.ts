/**
 * CSS 模块加载器类型定义
 * 用于描述 CSS Modules 的导出结构和样式注入机制
 */

/**
 * CSS 模块样式类名映射
 * 键为源代码中的类名，值为经过模块化处理后的实际类名
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * 样式注入配置选项
 */
interface StyleInjectionOptions {
  /**
   * 样式标签转换函数
   * 用于在插入 DOM 前转换样式内容
   */
  styleTagTransform: () => void;
  
  /**
   * 设置样式元素属性的函数
   */
  setAttributes: () => void;
  
  /**
   * 插入函数，绑定到指定的 DOM 容器
   * @param container - 目标容器选择器（如 "head"）
   */
  insert: (container: string) => void;
  
  /**
   * DOM 操作 API
   */
  domAPI: () => void;
  
  /**
   * 插入样式元素的函数
   */
  insertStyleElement: () => void;
}

/**
 * CSS 模块导出对象
 */
interface CSSModuleExports {
  /**
   * 样式类名映射对象
   * 如果模块不包含 locals，则为 undefined
   */
  locals?: CSSModuleClasses;
  
  [key: string]: unknown;
}

/**
 * 默认导出：CSS 模块的类名映射
 * 
 * @remarks
 * - 当 CSS 文件作为模块导入时，返回类名映射对象
 * - 如果模块未定义 locals 属性，则返回 undefined
 * 
 * @example
 *