/**
 * CSS模块导出的类型定义
 * 
 * 此模块用于生成有效区域预览模态框的样式表
 * 包含模态框布局、状态指示器、图例和操作按钮的样式定义
 * 
 * @module ValidAreaPreviewModalStyles
 */

/**
 * Webpack模块导出参数
 */
interface WebpackModuleExports {
  /** 模块ID */
  id: string;
}

/**
 * CSS加载器推送的数组项
 * [模块ID, CSS内容字符串]
 */
type CSSModuleItem = [string, string];

/**
 * CSS加载器返回类型
 */
interface CSSLoader {
  /**
   * 推送CSS模块内容
   * @param item CSS模块项，包含模块ID和CSS内容
   */
  push(item: CSSModuleItem): void;
}

/**
 * Webpack require函数类型
 * @param moduleId 要加载的模块ID
 * @returns CSS加载器实例
 */
type WebpackRequire = (moduleId: number) => (sourceMap: boolean) => CSSLoader;

/**
 * 有效区域预览模态框样式模块
 * 
 * 该模块导出一个CSS样式表，用于渲染有效区域预览模态框
 * 
 * 主要样式类包括：
 * - `.valid-area-preview-modal` - 模态框根容器
 * - `.homestyler-modal-content-wrapper` - 内容包装器
 * - `.preview-title` - 标题区域（包含状态指示器）
 * - `.status-success` - 成功状态样式（绿色背景）
 * - `.status-error` - 错误状态样式（红色背景）
 * - `.preview-content` - 预览内容区域
 * - `.preview-footer` - 底部操作区域
 * - `.legend` - 颜色图例
 * - `.buttons` - 操作按钮组（下载和确认）
 * 
 * @param exports 模块导出对象
 * @param _unusedModule 未使用的模块参数
 * @param require Webpack require函数
 */
declare function validAreaPreviewModalStyles(
  exports: WebpackModuleExports,
  _unusedModule: unknown,
  require: WebpackRequire
): void;

export default validAreaPreviewModalStyles;

/**
 * CSS样式内容常量
 * 
 * 包含以下主要布局：
 * 1. 模态框尺寸：900px × 550px
 * 2. 状态指示器：
 *    - 成功状态：96px宽，#C8F0E9背景色
 *    - 错误状态：110px宽，#F9CEC7背景色
 * 3. 图例颜色：
 *    - 有效区域：#BAD1FF（浅蓝色）
 *    - 无效区域：#FFC4B8（浅红色）
 * 4. 操作按钮：
 *    - 下载按钮：146px × 42px，#F2F2F2背景
 *    - 确认按钮：146px × 42px，#396EFE背景
 */
export const CSS_CONTENT: string;