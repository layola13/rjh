/**
 * CSS模块声明文件
 * 用于Webpack css-loader生成的CSS模块类型定义
 * @module RoofTypesStyles
 */

/**
 * Webpack模块导出函数类型
 * @param e - 模块导出对象，包含模块ID和导出内容
 * @param t - 模块依赖项（未使用）
 * @param n - Webpack require函数，用于加载其他模块
 */
declare function webpackCssModule(
  e: WebpackModuleExports,
  t: unknown,
  n: WebpackRequire
): void;

/**
 * Webpack模块导出对象接口
 */
interface WebpackModuleExports {
  /** 当前模块ID */
  id: string | number;
  /** 模块导出内容 */
  exports: CssModuleExports;
}

/**
 * CSS模块导出接口
 * 包含push方法用于添加CSS内容到样式表
 */
interface CssModuleExports {
  /**
   * 添加CSS规则到样式表
   * @param entry - CSS模块条目，包含模块ID和CSS文本内容
   */
  push(entry: [string | number, string]): void;
}

/**
 * Webpack require函数类型
 * 用于动态加载模块
 */
type WebpackRequire = (moduleId: number) => CssModuleExports;

/**
 * 屋顶类型选择器样式类名映射
 * 对应 property-bar-rooftypes 组件的CSS类
 */
interface RoofTypesStylesClasses {
  /** 屋顶类型选择器外层包装容器 - 224px宽，最大高度204px，带滚动条 */
  'property-bar-rooftypes-wrapper': string;
  
  /** 屋顶类型网格容器 - flex布局，208px宽 */
  'property-bar-rooftypes-container': string;
  
  /** 屋顶图片容器 - 64x64px */
  'roof-img': string;
  
  /** 激活状态类 - 蓝色边框 (#396efe) */
  active: string;
  
  /** 屋顶名称文本 - 12px字体，居中对齐 */
  'roof-name': string;
  
  /** 屋顶名称遮罩状态 - 灰色文本 (#A8A9AC) */
  'roof-name-mask': string;
  
  /** 文本省略样式 - 单行溢出显示省略号 */
  'text-ellipsis': string;
  
  /** 禁用遮罩层 - 半透明背景，禁止点击 */
  mask: string;
  
  /** VIP标识位置 - 右上角徽章 */
  'roof-vip': string;
  
  /** 屋顶类型提示文本容器 - 最大宽度220px */
  'roof-type-tip-txt-warp-2': string;
  
  /** 屋顶类型提示文本容器 - 最大宽度130px */
  'roof-type-tip-txt-warp-0': string;
}

/**
 * 默认导出：CSS模块类名对象
 * 在运行时由css-loader生成实际的类名映射
 */
declare const styles: RoofTypesStylesClasses;

export default styles;
export { RoofTypesStylesClasses };