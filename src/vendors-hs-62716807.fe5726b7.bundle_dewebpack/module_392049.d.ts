/**
 * CSS模块加载器的类型定义
 * 用于Webpack样式加载器处理CSS Module的类型声明
 */

/**
 * CSS Module导出的类名映射对象
 * 键为CSS中定义的类名，值为经过hash处理后的实际类名
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * 样式注入配置选项
 */
export interface StyleInjectionOptions {
  /**
   * 样式标签转换函数
   * 用于在DOM中插入或更新样式内容
   */
  styleTagTransform: () => void;

  /**
   * 设置样式标签属性的函数
   */
  setAttributes: () => void;

  /**
   * 样式插入函数
   * 指定样式标签插入到DOM的位置（如head标签内）
   */
  insert: (target: string) => void;

  /**
   * DOM操作API
   * 提供底层DOM操作能力
   */
  domAPI: () => void;

  /**
   * 插入样式元素的函数
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module导出的默认对象
 * 包含经过hash处理的类名映射，如果没有则为undefined
 * 
 * @example
 *