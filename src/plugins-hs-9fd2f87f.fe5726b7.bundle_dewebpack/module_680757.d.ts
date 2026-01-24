/**
 * CSS模块加载器类型定义
 * 用于处理CSS模块的样式注入和类名导出
 */

/**
 * CSS模块的类名映射接口
 * 键为CSS中定义的类名，值为经过处理后的唯一类名
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
  
  /** 插入样式到DOM的函数，默认插入到head标签 */
  insert: (target: string) => void;
  
  /** DOM操作API */
  domAPI: () => void;
  
  /** 插入样式元素的函数 */
  insertStyleElement: () => void;
}

/**
 * CSS模块导出的默认值
 * 包含所有类名到生成类名的映射
 * 如果模块未定义locals则返回undefined
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;