/**
 * CSS模块加载器类型定义
 * 用于Webpack CSS Modules的类型声明
 */

/**
 * CSS模块的导出对象
 * 包含CSS类名映射和默认导出
 */
declare module '*.module.css' {
  /**
   * CSS类名映射表
   * 键为源代码中的类名，值为经过hash处理后的实际类名
   */
  const classes: Readonly<Record<string, string>>;
  export default classes;
}

declare module '*.module.scss' {
  const classes: Readonly<Record<string, string>>;
  export default classes;
}

declare module '*.module.sass' {
  const classes: Readonly<Record<string, string>>;
  export default classes;
}

declare module '*.module.less' {
  const classes: Readonly<Record<string, string>>;
  export default classes;
}

declare module '*.module.styl' {
  const classes: Readonly<Record<string, string>>;
  export default classes;
}

/**
 * 样式加载器配置选项
 */
interface StyleLoaderOptions {
  /**
   * 样式标签转换函数
   * 用于将CSS内容转换为style标签
   */
  styleTagTransform?: () => void;
  
  /**
   * 设置DOM元素属性的函数
   */
  setAttributes?: () => void;
  
  /**
   * 插入函数，指定样式插入的位置
   * @param target - 插入目标元素选择器（如'head'）
   */
  insert?: (target: string) => void;
  
  /**
   * DOM操作API
   */
  domAPI?: () => void;
  
  /**
   * 插入样式元素的函数
   */
  insertStyleElement?: () => void;
}

/**
 * CSS模块导出的局部类名
 * undefined表示该模块没有导出任何局部类名
 */
export type CSSModuleClasses = Readonly<Record<string, string>> | undefined;

export default CSSModuleClasses;