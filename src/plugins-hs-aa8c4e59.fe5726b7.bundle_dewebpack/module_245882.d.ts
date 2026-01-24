/**
 * CSS模块类型定义
 * 用于描述CSS模块的导出接口和样式注入配置
 */

/**
 * CSS模块的类名映射接口
 * 将CSS类名映射为字符串，用于类型安全的样式引用
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * 样式注入配置接口
 * 定义样式如何被插入和管理在DOM中
 */
export interface StyleInjectionOptions {
  /**
   * 样式标签转换函数
   * 用于在插入前转换样式内容
   */
  styleTagTransform: () => void;
  
  /**
   * 设置DOM元素属性的函数
   * 用于为style标签添加自定义属性
   */
  setAttributes: () => void;
  
  /**
   * 插入函数
   * 指定样式元素插入的目标位置（如"head"）
   */
  insert: (target: string) => void;
  
  /**
   * DOM操作API
   * 提供跨浏览器的DOM操作接口
   */
  domAPI: () => void;
  
  /**
   * 插入样式元素的函数
   * 负责创建并插入style标签到DOM
   */
  insertStyleElement: () => void;
}

/**
 * CSS模块默认导出
 * 如果CSS模块包含locals（类名映射），则返回该映射，否则返回undefined
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * 重导出所有命名导出（除了default）
 * 允许按需导入特定的CSS类名
 */
export * from './styles';