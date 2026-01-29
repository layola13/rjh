/**
 * CSS模块加载器类型定义
 * 用于将CSS样式注入到webpack构建系统中
 * @module CSSModuleLoader
 */

/**
 * Webpack模块导出函数类型
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数，用于加载其他模块
 */
declare function loadCSSModule(
  exports: ModuleExports,
  module: WebpackModule,
  require: WebpackRequire
): void;

/**
 * Webpack模块导出对象
 */
interface ModuleExports {
  /** 模块ID */
  id: string | number;
  /** 模块导出内容 */
  exports: unknown;
}

/**
 * Webpack模块对象
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports: CSSLoader;
}

/**
 * Webpack require函数接口
 * 用于动态加载模块
 */
interface WebpackRequire {
  /**
   * 加载指定模块
   * @param moduleId - 模块ID
   * @returns 模块导出内容
   */
  (moduleId: number): CSSLoader;
}

/**
 * CSS加载器接口
 * 提供push方法将CSS内容添加到构建系统
 */
interface CSSLoader {
  /**
   * 添加CSS样式到构建系统
   * @param cssEntry - CSS条目数组 [模块ID, CSS内容字符串]
   */
  push(cssEntry: [string | number, string]): void;
}

/**
 * 右侧属性栏样式模块
 * 包含DIY材质、完整材质、面材质等UI组件的样式定义
 */
declare module "module_548557" {
  /**
   * CSS样式内容
   * 包含以下主要样式类：
   * - .diyMateiralSelectedIconButton: DIY材质选中图标按钮样式
   * - .completeMaterialButton: 完整材质按钮样式
   * - .faceMaterialTitle: 面材质标题样式
   * - .editInGroup: 组内编辑按钮样式
   * - .returnToLastLevel: 返回上一级按钮样式
   * - .customModelScaleLockButton: 自定义模型缩放锁定按钮样式
   * - .materialFlipX: 材质X轴翻转控件样式
   * - .materialFlipY: 材质Y轴翻转控件样式
   * - .editFaceMaterialSeamWidthInput: 编辑面材质接缝宽度输入框样式
   * - .editSeamWidthInput: 编辑接缝宽度输入框样式
   * - .blend-color-pick: 混合颜色选择器样式
   * - .editSlabHeight: 编辑板高度控件样式
   * - .slabHeightInputVerticalStyle: 板高度输入垂直样式
   * - .faceMaterial_*: 面材质相关行布局样式
   * - .imageSizeLabel: 图片尺寸标签样式
   * - .customizedImageApplyCheckBox: 自定义图片应用复选框样式
   * - .pictureWidthInput: 图片宽度输入框样式
   * - .pictureHeightInput: 图片高度输入框样式
   */
  const styles: CSSLoader;
  export = styles;
}