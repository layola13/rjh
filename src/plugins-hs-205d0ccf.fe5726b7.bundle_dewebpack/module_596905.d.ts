/**
 * CSS Modules类型声明
 * 
 * 该模块导出CSS类名映射和相关样式加载配置
 */

/**
 * CSS类名映射接口
 * 定义从类名到生成的哈希类名的映射关系
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * 样式标签转换函数类型
 * 用于处理样式标签的DOM操作
 */
export type StyleTagTransformFn = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * 设置DOM属性函数类型
 * 用于为样式元素设置自定义属性
 */
export type SetAttributesFn = (element: HTMLElement, attributes?: Record<string, string>) => void;

/**
 * 插入函数类型
 * 定义样式元素插入到DOM的位置和方式
 */
export type InsertFn = (element: HTMLElement) => void;

/**
 * DOM API函数类型
 * 用于操作样式元素的DOM接口
 */
export type DOMAPIFn = (options: StyleOptions) => StyleAPI;

/**
 * 插入样式元素函数类型
 * 创建并返回样式DOM元素
 */
export type InsertStyleElementFn = (options: StyleOptions) => HTMLStyleElement;

/**
 * 样式配置选项接口
 */
export interface StyleOptions {
  readonly styleTagTransform?: StyleTagTransformFn;
  readonly setAttributes?: SetAttributesFn;
  readonly insert?: InsertFn;
  readonly domAPI?: DOMAPIFn;
  readonly insertStyleElement?: InsertStyleElementFn;
}

/**
 * 样式API接口
 * 提供样式的更新和移除方法
 */
export interface StyleAPI {
  update(obj?: unknown): void;
  remove(): void;
}

/**
 * CSS模块默认导出
 * 包含CSS类名到生成类名的映射，如果没有locals则为undefined
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * 重新导出所有来自源CSS模块的命名导出
 */
export * from './source-module';