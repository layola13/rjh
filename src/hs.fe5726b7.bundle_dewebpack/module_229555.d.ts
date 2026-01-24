/**
 * CSS模块导出声明文件
 * 该模块包含全屏加载组件的样式定义
 * @module FullScreenLoadingStyles
 */

/**
 * CSS模块加载器函数类型
 * @param sourceMap - 是否包含source map信息
 * @returns CSS模块导出对象，包含push方法用于添加样式规则
 */
type CSSModuleLoader = (sourceMap: boolean) => {
  /**
   * 添加CSS样式规则到模块
   * @param rule - 包含模块ID和CSS内容的元组
   */
  push(rule: [string, string, string?]): void;
};

/**
 * Webpack模块导出对象
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string;
  /** 模块导出内容 */
  exports: unknown;
}

/**
 * 全屏加载组件CSS类名定义
 */
interface FullScreenLoadingStyles {
  /** 全屏遮罩层容器样式 */
  fullScreenLoading: string;
  /** 加载图标样式 */
  loadingIcon: string;
  /** 加载文本样式 */
  loadingText: string;
  /** 内容容器样式 */
  container: string;
  /** 信息区域样式 */
  info: string;
  /** 主标题文本样式 */
  main: string;
  /** 额外提示文本样式 */
  extra: string;
  /** 加载进度条容器样式 */
  'loading-bar': string;
  /** 加载进度条样式 */
  'loading-progress': string;
  /** 图标容器样式 */
  icon: string;
}

/**
 * 全屏加载组件样式模块
 * 
 * 包含以下主要样式类：
 * - `.fullScreenLoading` - 固定定位的全屏遮罩层，带半透明背景
 * - `.fullScreenLoading .loadingIcon` - 居中的加载动画图标
 * - `.fullScreenLoading .loadingText` - 加载提示文本
 * - `.fullScreenLoading .container` - 白色圆角卡片容器，居中显示
 * - `.fullScreenLoading .container .info` - 信息文本区域
 * - `.fullScreenLoading .container .icon` - 76x76图标容器
 * 
 * 国际化支持：
 * - `.global-en` 前缀用于英文环境下的样式调整
 */
declare const styles: FullScreenLoadingStyles;

export default styles;

/**
 * CSS内容常量
 * 包含完整的样式规则字符串
 */
export const cssContent: string;

/**
 * 模块ID
 */
export const moduleId: string;