/**
 * Webpack CSS模块加载器函数类型定义
 * 
 * 该模块用于加载和注入CSS样式到webpack构建系统中
 * 
 * @module CSSModuleLoader
 */

/**
 * CSS模块导出接口
 * 
 * 表示webpack中CSS模块的导出对象，包含push方法用于添加样式规则
 */
interface CSSModuleExports {
  /**
   * 添加CSS样式规则到模块中
   * 
   * @param entry - 包含模块ID和CSS内容的元组
   *   - entry[0]: 模块唯一标识符
   *   - entry[1]: CSS样式字符串
   */
  push(entry: [string, string]): void;
}

/**
 * Webpack require函数类型
 * 
 * 用于在webpack模块系统中动态加载依赖模块
 * 
 * @param moduleId - 要加载的模块ID
 * @returns 返回CSS模块导出对象工厂函数
 */
type WebpackRequire = (moduleId: number) => (sourceMap: boolean) => CSSModuleExports;

/**
 * CSS模块加载器工厂函数
 * 
 * @param exports - 当前模块的导出对象
 * @param module - 当前模块对象，包含id等元数据
 * @param require - webpack的require函数，用于加载依赖
 * 
 * @remarks
 * 该函数执行以下操作：
 * 1. 调用CSS加载器工厂(模块986380)创建导出对象
 * 2. 将组件样式规则推送到CSS模块系统
 * 3. 样式包含三个主要区域：
 *    - `.hsc-model-collocation-product-page-container`: 产品页面容器主样式
 *    - `.model-collocation-product-page-room-type-name`: 房间类型名称标签
 *    - `.filters-area`: 筛选器区域
 *    - `.hsc-back-header`: 返回头部样式
 */
type CSSModuleLoaderFactory = (
  exports: Record<string, unknown>,
  module: { id: string; exports: Record<string, unknown> },
  require: WebpackRequire
) => void;

/**
 * 模块样式类名常量
 */
declare namespace ModelCollocationProductPageStyles {
  /**
   * 产品页面容器类名
   * 
   * 样式特性：
   * - 宽度: 280px
   * - 高度: 100%
   * - 边框: 1px实线 #d9d9d9
   * - 圆角: 10px
   * - 定位: 相对定位
   */
  const CONTAINER: 'hsc-model-collocation-product-page-container';
  
  /**
   * 房间类型名称标签类名
   * 
   * 样式特性：
   * - 定位: 绝对定位 (right: 17px, top: 167px)
   * - 尺寸: 80px × 24px
   * - 背景: 半透明白色 rgba(255, 255, 255, 0.9)
   * - 文字颜色: #33353b
   * - 圆角: 12px 0 8px 0
   * - 布局: flex居中对齐
   */
  const ROOM_TYPE_NAME: 'model-collocation-product-page-room-type-name';
  
  /**
   * 筛选器区域类名
   * 
   * 样式特性：
   * - 高度: 48px
   * - 布局: flex水平居中
   */
  const FILTERS_AREA: 'filters-area';
  
  /**
   * 返回头部类名
   * 
   * 样式特性：
   * - 左边距: 13px
   * - 内边距: 上13px 下10px
   */
  const BACK_HEADER: 'hsc-back-header';
}

export type { CSSModuleLoaderFactory, CSSModuleExports, WebpackRequire };
export { ModelCollocationProductPageStyles };