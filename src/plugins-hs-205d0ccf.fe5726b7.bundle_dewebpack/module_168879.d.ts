/**
 * CSS模块加载器的类型定义
 * 用于Webpack加载CSS/SCSS模块并提供类型安全的类名访问
 */

/**
 * CSS模块导出的类名映射
 * 键为CSS类名，值为转换后的唯一类名字符串
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * 样式注入配置选项
 */
export interface StyleLoaderOptions {
  /**
   * 样式标签转换函数，用于处理CSS内容
   */
  styleTagTransform: () => void;

  /**
   * 设置样式元素属性的函数
   */
  setAttributes: () => void;

  /**
   * 将样式插入到指定DOM位置的函数
   * @param target - 目标DOM位置（如 'head'）
   */
  insert: (target: string) => void;

  /**
   * DOM操作API函数
   */
  domAPI: () => void;

  /**
   * 插入样式元素的函数
   */
  insertStyleElement: () => void;
}

/**
 * CSS模块元数据
 */
export interface CSSModule {
  /**
   * 本地类名映射对象
   * 提供CSS模块中定义的所有类名到哈希类名的映射
   */
  locals?: CSSModuleClasses;

  /**
   * 其他可能的CSS模块属性
   */
  [key: string]: unknown;
}

/**
 * 默认导出：CSS模块的类名映射
 * 如果模块包含locals属性则返回类名映射，否则返回undefined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * 从依赖模块重新导出的所有命名导出
 * 排除 'default' 导出
 */
export * from './style-module';