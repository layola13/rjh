/**
 * CSS模块加载器的类型定义
 * 用于描述Webpack CSS模块的导出结构
 */

/**
 * CSS模块的类名映射接口
 * 键为CSS类名，值为经过哈希处理后的实际类名
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * CSS模块样式注入配置接口
 */
export interface StyleInjectionOptions {
  /** 样式标签转换函数 */
  styleTagTransform: () => void;
  /** 设置DOM属性的函数 */
  setAttributes: () => void;
  /** 插入样式的函数，绑定到head元素 */
  insert: (target: string) => void;
  /** DOM操作API */
  domAPI: () => void;
  /** 插入样式元素的函数 */
  insertStyleElement: () => void;
}

/**
 * CSS模块导出的默认对象
 * 包含所有CSS类名到实际类名的映射
 */
export default CSSModuleClasses | undefined;

/**
 * 从CSS模块中导出的所有命名导出
 * 通常对应CSS文件中定义的类名
 */
export * from './原始CSS模块路径';