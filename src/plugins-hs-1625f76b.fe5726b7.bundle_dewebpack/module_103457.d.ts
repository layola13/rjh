/**
 * CSS模块定义
 * 
 * 该模块导出用户引导组件的样式表定义
 * @module UserGuideStyles
 */

/**
 * Webpack模块导出函数类型
 * 
 * @param exports - 模块导出对象
 * @param module - 当前模块引用
 * @param require - Webpack require函数，用于加载依赖模块
 */
declare function webpackModule(
  exports: Record<string, unknown>,
  module: { id: string | number; exports: unknown },
  require: (moduleId: number) => unknown
): void;

/**
 * CSS加载器推送项类型
 * 
 * 表示一个CSS模块的元组结构：
 * - 第一项：模块ID
 * - 第二项：CSS样式字符串内容
 */
type CSSLoaderItem = [string | number, string];

/**
 * CSS加载器接口
 * 
 * Webpack css-loader生成的模块导出对象，包含样式内容和推送方法
 */
interface CSSLoader {
  /** 将CSS内容推送到样式数组 */
  push(item: CSSLoaderItem): void;
  /** CSS模块内容数组 */
  toString(): string;
  /** 内部样式数组 */
  i?(list: CSSLoaderItem[], options?: string): void;
}

/**
 * 用户引导样式表模块
 * 
 * 包含以下CSS类：
 * - `.userguide` - 主容器，全屏flex布局
 * - `.userguide .guideContainer` - 引导内容容器，固定高度400px
 * - `.userguide .guideContainer .guide` - 单个引导项，宽度350px
 * - `.userguide .guideContainer .guide .icon` - 引导图标，210x400px
 * - `.userguide .guideContainer .guide .tip` - 提示文本区域
 * - `.userguide .guideContainer .guide .stateGroup` - 状态指示器组
 * - `.userguide .guideContainer .guide .stateGroup > li` - 状态点，6x6px圆形
 * - `.userguide .guideContainer .guide .stateGroup > li.active` - 激活状态点，蓝色
 * - `.userguide .guideContainer .arrow` - 箭头按钮，48x48px
 * - `.userguide .footer` - 底部操作区
 * - `.userguide .footer .actionButton` - 操作按钮，宽度140px
 * 
 * @returns CSS加载器对象
 */
declare const userGuideStyles: CSSLoader;

export default userGuideStyles;