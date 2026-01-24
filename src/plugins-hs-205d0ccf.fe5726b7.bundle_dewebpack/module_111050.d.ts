/**
 * CSS 样式模块的类型定义
 * 该模块导出产品推荐列表的样式表
 * 
 * @module ProductRecommendStyles
 * @description 包含小尺寸产品推荐项、轮播控制按钮等样式定义
 */

/**
 * CSS 模块加载器函数类型
 * @param sourceMap - 是否生成 source map
 * @returns CSS 模块实例，包含 push 方法用于注入样式
 */
type CSSModuleLoader = (sourceMap: boolean) => CSSModule;

/**
 * CSS 模块接口
 * 表示一个可以接收样式内容的模块
 */
interface CSSModule {
  /**
   * 将 CSS 内容推送到模块中
   * @param content - 包含模块 ID 和 CSS 字符串的数组
   */
  push(content: [string, string]): void;
}

/**
 * Webpack 模块导出函数签名
 * @param exports - 模块导出对象
 * @param require - 模块加载函数
 * @param moduleId - 当前模块的唯一标识符
 */
declare function webpackModule(
  exports: { id: string; exports: CSSModule },
  require: (moduleId: number) => CSSModuleLoader,
  moduleId: number
): void;

/**
 * 导出的 CSS 类名定义
 * 产品推荐组件的样式类
 */
export interface ProductRecommendStyleClasses {
  /** 小尺寸产品推荐项容器样式 - 固定 78x78px */
  'product-item-recommend-small': string;
  
  /** 小尺寸推荐列表容器 - flex 布局，支持换行 */
  'recommand-list-small': string;
  
  /** 推荐轮播下一页按钮 - 绝对定位在右侧 */
  'recommend-carousel-next': string;
  
  /** 推荐轮播上一页按钮 - 绝对定位在左侧 */
  'recommend-carousel-prev': string;
}

/**
 * CSS 样式内容常量
 * 包含所有样式规则的字符串
 */
export const cssContent: string;

/**
 * 模块 ID
 * Webpack 分配的唯一模块标识符
 */
export const moduleId: string;

export default CSSModule;