/**
 * CSS Modules 类型声明
 * 
 * 这个模块导出 CSS 模块的类型定义，包含样式类名的映射关系
 */

/**
 * CSS 模块的局部类名映射
 * 键为 CSS 类名，值为经过处理后的唯一类名字符串
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * 样式注入配置选项
 */
export interface StyleInjectionOptions {
  /** 样式标签转换函数 */
  styleTagTransform: () => void;
  
  /** 设置 DOM 元素属性的函数 */
  setAttributes: () => void;
  
  /** 插入样式到 DOM 的函数，绑定到 head 元素 */
  insert: (target: string) => void;
  
  /** DOM 操作 API */
  domAPI: () => void;
  
  /** 插入 style 元素的函数 */
  insertStyleElement: () => void;
}

/**
 * 默认导出：CSS 模块的类名映射对象
 * 
 * @remarks
 * 如果模块包含 locals 属性，返回类名映射对象；否则返回 undefined
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * 从依赖模块 458233 重新导出的所有命名导出
 * （除了 default 导出）
 */
export * from './458233';