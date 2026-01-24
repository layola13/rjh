/**
 * CSS模块导出类型定义
 * @module SparkPicShareStyles
 */

/**
 * Webpack CSS加载器导出的模块接口
 */
interface CSSModuleExports {
  /**
   * 将CSS规则推送到样式集合中
   * @param rule - CSS规则数组，包含模块ID和CSS内容
   */
  push(rule: [string, string]): void;
  
  /**
   * 模块的唯一标识符
   */
  id: string;
}

/**
 * Webpack require函数类型
 */
type WebpackRequire = (moduleId: number) => (sourceMap: boolean) => CSSModuleExports;

/**
 * 模块导出函数签名
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数
 */
declare function cssModuleLoader(
  exports: Record<string, unknown>,
  module: { id: string; exports: CSSModuleExports },
  require: WebpackRequire
): void;

/**
 * Spark图片分享组件的CSS样式模块
 * 
 * 包含以下样式类：
 * - `.spark-pic-share` - 主容器
 * - `.spark-pic-modal` - 模态框样式
 * - `.ribpShareVendorHeader` - 分享平台头部
 * - `.ribpShareVendor` - 分享平台图标容器
 * - `.ribpQrCode` - 二维码容器
 * - `.ribpShareOtherPlatformTitle` - 其他平台标题
 * - `.ribpShareOtherPlatformItems` - 其他平台项目列表
 * - `.ribpShareVendorBtns` - 分享按钮组
 */
declare module 'module_89045' {
  const styles: CSSModuleExports;
  export = styles;
}

/**
 * CSS样式规则内容（用于类型文档）
 */
interface SparkPicShareStyleRules {
  /** 主容器：弹性布局，居中对齐 */
  '.spark-pic-share': CSSStyleDeclaration;
  
  /** 模态框标题：使用阿里巴巴普惠体粗体字体 */
  '.spark-pic-modal .ant-modal-confirm-title': CSSStyleDeclaration;
  
  /** 模态框内容区域：自定义内边距 */
  '.spark-pic-modal .ant-modal-body': CSSStyleDeclaration;
  
  /** 分享平台头部：小号字体，半透明白色 */
  '.ribpShareVendorHeader': CSSStyleDeclaration;
  
  /** 分享平台图标：圆形按钮，悬停时蓝色高亮 */
  '.ribpShareVendor': CSSStyleDeclaration;
  
  /** 二维码容器：252x252像素，白色背景，圆角 */
  '.ribpQrCode': CSSStyleDeclaration;
  
  /** 其他平台标题：居中文本，带左右分隔线 */
  '.ribpShareOtherPlatformTitle': CSSStyleDeclaration;
  
  /** 其他平台项目列表：水平弹性布局 */
  '.ribpShareOtherPlatformItems': CSSStyleDeclaration;
  
  /** 分享按钮组：圆角按钮，悬停时蓝色高亮 */
  '.ribpShareVendorBtns': CSSStyleDeclaration;
}

export {};