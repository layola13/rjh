/**
 * CSS模块加载器的类型定义
 * 用于描述webpack样式加载器处理CSS模块后的导出结构
 */

/**
 * CSS模块的类名映射接口
 * 将CSS类名映射为唯一的hash化类名
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * 样式插入配置选项
 */
export interface StyleInsertOptions {
  /** 样式标签转换函数 */
  styleTagTransform?: () => void;
  
  /** 设置样式标签属性的函数 */
  setAttributes?: () => void;
  
  /** 样式插入函数，指定插入位置 */
  insert?: (target: string) => void;
  
  /** DOM操作API */
  domAPI?: () => void;
  
  /** 插入样式元素的函数 */
  insertStyleElement?: () => void;
}

/**
 * CSS模块的默认导出
 * 包含所有CSS类名到hash化类名的映射
 * 如果CSS模块未定义locals，则为undefined
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * 重导出原始CSS模块的所有命名导出
 * 除了default导出之外的所有导出成员
 */
export * from './original-css-module';