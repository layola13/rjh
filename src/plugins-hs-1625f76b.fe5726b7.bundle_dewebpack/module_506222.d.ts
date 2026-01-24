/**
 * CSS模块导出类型定义
 * 
 * 此模块为Webpack CSS加载器生成的样式模块，
 * 包含"创建新心愿单"弹窗组件的样式定义。
 * 
 * @module CreateNewWishlistStyles
 */

/**
 * CSS模块加载器函数类型
 * 
 * @param sourceMap - 是否生成source map，false表示不生成
 * @returns CSS模块实例，包含push方法用于注入样式
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSModule;

/**
 * CSS模块实例接口
 * 
 * 表示一个可注入样式的模块对象
 */
interface CSSModule {
  /**
   * 将CSS规则推入样式系统
   * 
   * @param rule - CSS规则数组，包含模块ID和CSS内容
   * @example
   * module.push([moduleId, ".class { color: red; }"])
   */
  push(rule: [string, string]): void;
}

/**
 * Webpack模块导出函数类型
 * 
 * @param exports - 模块导出对象
 * @param require - 模块加载函数
 * @param moduleLoader - CSS加载器工厂函数（模块n(986380)）
 */
export type WebpackModuleExport = (
  exports: { id: string; exports: CSSModule },
  require: unknown,
  moduleLoader: CSSLoaderFunction
) => void;

/**
 * 创建新心愿单弹窗样式类名映射
 * 
 * 此接口描述了该CSS模块中定义的所有样式类
 */
export interface CreateNewWishlistStyles {
  /**
   * 根容器类名
   * 样式：`.create-new-wishlist`
   */
  'create-new-wishlist': string;

  /**
   * 弹窗容器
   * 样式特性：
   * - 居中定位（transform: translate(-50%, -50%)）
   * - 高z-index(4000)
   * - 圆角边框(8px)
   */
  popupwindows: string;

  /**
   * 弹窗头部区域
   * 样式特性：
   * - 高度60px
   * - 无底部边框
   * - 左右内边距30px
   */
  windowHeader: string;

  /**
   * 标题元素
   * 样式特性：
   * - 字体加粗
   * - 字号20px
   * - 颜色#33353b
   */
  title: string;

  /**
   * 关闭按钮容器
   * 样式特性：
   * - 绝对定位于右上角
   * - 悬停时变色(#237ab9)
   */
  closeBtn: string;

  /**
   * 关闭按钮（弹窗专用）
   * 样式特性：
   * - 定位于右上角(right: 30px, top: 15px)
   */
  'popupwindow-close-btn': string;

  /**
   * 弹窗内容区域
   * 样式特性：
   * - 全宽(100%)
   * - 白色背景
   * - 字号15px
   */
  windowContents: string;

  /**
   * 内容包装器
   * 样式特性：
   * - 内边距(12px 40px 0px 40px)
   * - 文本居中
   */
  contentsWrapper: string;

  /**
   * 瓷砖上传器容器
   * 样式特性：
   * - Flexbox居中布局
   * - 固定高度240px
   */
  tilesUploaderContainer: string;

  /**
   * 文件处理器组件
   */
  fileProcesser: string;

  /**
   * 文件处理器操作按钮
   * 样式特性：
   * - 宽度100px
   * - 背景色#f2f2f2
   * - 悬停时变为#E9E9E9
   */
  'file-processer-action-btn': string;

  /**
   * 底部按钮组
   * 样式特性：
   * - 右对齐
   */
  footerbuttons: string;

  /**
   * 按钮基础类
   * 样式特性：
   * - 最小宽度80px
   */
  btn: string;

  /**
   * 主要按钮
   * 样式特性：
   * - 右边距30px
   */
  'btn-primary': string;

  /**
   * 默认按钮
   * 样式特性：
   * - 右边距53px
   */
  'btn-default': string;
}

/**
 * 默认导出：CSS模块对象
 * 
 * 包含样式类名到实际CSS类名的映射（支持CSS Modules）
 */
declare const styles: CreateNewWishlistStyles;
export default styles;