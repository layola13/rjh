/**
 * CSS模块导出类型定义
 * 该模块用于autostyler组件的样式定义，包含按钮、模态框、表单输入和房间列表等UI元素的样式
 */

/**
 * Webpack模块导出函数类型
 * @param e - 模块导出对象，用于存储当前模块的导出内容
 * @param t - 模块的依赖项（未使用）
 * @param a - Webpack require函数，用于加载其他模块
 */
type WebpackModuleExport = (
  e: ModuleExports,
  t: unknown,
  a: WebpackRequire
) => void;

/**
 * 模块导出对象接口
 */
interface ModuleExports {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports: CSSExports;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns CSS加载器实例
 */
type WebpackRequire = (moduleId: number) => CSSLoader;

/**
 * CSS加载器接口
 * 用于处理CSS内容的加载和转换
 */
interface CSSLoader {
  /**
   * 创建CSS导出对象
   * @param sourceMap - 是否生成源映射
   * @returns CSS导出实例
   */
  (sourceMap: boolean): CSSExports;
}

/**
 * CSS导出对象接口
 * 包含CSS内容和相关元数据
 */
interface CSSExports {
  /**
   * 添加CSS模块内容
   * @param module - CSS模块数组，包含模块ID和CSS内容字符串
   */
  push(module: [string | number, string]): void;
}

/**
 * autostyler组件的CSS样式定义
 * 
 * 主要包含以下样式类：
 * - .btn: 基础按钮样式（圆角、内边距、外边距）
 * - .btn-primary: 主要按钮（蓝色背景 #4d9bd6）
 * - .btn-default: 默认按钮（白色背景，带边框）
 * - .modalCover: 模态框遮罩层（固定定位，半透明黑色背景）
 * - .autostylerWarningShow: 警告状态样式（红色边框）
 * - .model-input: 模型输入框（高度36px，字号14px）
 * - .model-select: 模型选择器（高度36px，宽度340px）
 * - .createStylerTemplatePanel: 创建样式模板面板
 *   - .roomItem: 房间项容器（400px宽，网格布局）
 *   - .roomItem__selected: 选中状态（蓝色边框 #396efe）
 *   - .roomItem-property: 房间属性容器
 *   - .roomItem-property-item: 属性项（网格布局：80px + 115px）
 *   - .roomListBoard: 房间列表面板（包含奇偶项布局逻辑）
 */
declare const cssContent: string;

export default cssContent;