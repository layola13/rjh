/**
 * CSS模块加载器类型定义
 * 描述Webpack CSS模块加载后导出的类型结构
 */

/**
 * CSS模块的类名映射接口
 * 键为CSS类名，值为经过模块化处理后的实际类名
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * 样式注入配置选项
 */
export interface StyleInjectionOptions {
  /** 样式标签转换函数 */
  styleTagTransform?: () => void;
  
  /** 设置DOM元素属性的函数 */
  setAttributes?: () => void;
  
  /** 插入样式到指定容器的函数 */
  insert?: (target: string) => void;
  
  /** DOM操作API */
  domAPI?: () => void;
  
  /** 插入style元素的函数 */
  insertStyleElement?: () => void;
}

/**
 * CSS模块元数据
 */
export interface CSSModuleMetadata {
  /** CSS模块的类名映射对象 */
  locals?: CSSModuleClasses;
  
  [key: string]: unknown;
}

/**
 * CSS模块默认导出
 * 包含所有CSS类名到转换后类名的映射
 * 如果模块不包含locals，则为undefined
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;