/**
 * 左侧面板样式模块
 * 包含图片生成工具的左侧控制面板UI样式定义
 */

/**
 * 样式模块导出接口
 * 该模块导出CSS样式字符串数组
 */
export interface StyleModule {
  /** 模块唯一标识符 */
  id: string;
  /** CSS样式内容数组 */
  styles: string[];
}

/**
 * Webpack CSS加载器返回值类型
 * 包含样式内容和source map相关方法
 */
export interface CSSModuleExports {
  /** 
   * 添加样式到样式表
   * @param module - 样式模块数组 [模块ID, CSS内容, source map相关信息]
   */
  push(module: [string, string, string?]): void;
  
  /** 将样式转换为字符串 */
  toString(): string;
  
  /** 获取样式的i属性(通常用于source map) */
  i(modules: unknown[], mediaQuery?: string): void;
}

/**
 * URL加载器函数类型
 * 用于处理CSS中的资源引用(如背景图片)
 * @param resourcePath - 资源模块路径或ID
 * @returns 处理后的资源URL字符串
 */
export type URLLoader = (resourcePath: number | string) => string;

/**
 * CSS样式加载器工厂函数类型
 * @param sourceMap - 是否启用source map
 * @returns CSS模块导出对象
 */
export type CSSLoaderFactory = (sourceMap: boolean) => CSSModuleExports;

/**
 * 模块导出函数签名
 * Webpack模块包装器,用于注入依赖并执行模块逻辑
 * 
 * @param exports - 当前模块的导出对象
 * @param module - 当前模块对象,包含id等元数据
 * @param require - Webpack的require函数,用于加载依赖模块
 * 
 * @example
 *