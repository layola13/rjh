/**
 * CSS Modules 类型声明
 * 
 * 该模块导出CSS样式类名的类型定义，用于CSS Modules的类型安全访问
 */

/**
 * CSS Modules导出的样式类名映射接口
 * 键为CSS类名，值为经过hash处理后的实际类名字符串
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * 样式注入配置选项
 */
export interface StyleInjectionOptions {
  /** 样式标签转换函数 */
  styleTagTransform: () => void;
  /** 设置DOM属性的函数 */
  setAttributes: () => void;
  /** DOM插入函数，绑定到head元素 */
  insert: (target: string) => void;
  /** DOM API处理器 */
  domAPI: () => void;
  /** 样式元素插入函数 */
  insertStyleElement: () => void;
}

/**
 * CSS Module加载器返回的对象结构
 */
export interface CSSModuleExports {
  /** 本地样式类名映射 */
  locals?: CSSModuleClasses;
  [key: string]: unknown;
}

/**
 * 默认导出：CSS Modules的本地类名映射
 * 
 * @remarks
 * 如果CSS Module包含locals属性，则返回类名映射对象
 * 否则返回undefined
 * 
 * @example
 *