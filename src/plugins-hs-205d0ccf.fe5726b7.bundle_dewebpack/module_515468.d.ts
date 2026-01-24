/**
 * CSS模块加载器的类型定义
 * 用于Webpack环境下的CSS样式注入
 * @module CSSModuleLoader
 */

/**
 * Webpack模块导出函数签名
 * @param e - 模块导出对象，用于挂载模块内容
 * @param t - 模块依赖注入对象（未使用）
 * @param n - Webpack require函数，用于加载依赖模块
 */
export type WebpackModuleFactory = (
  moduleExports: ModuleExports,
  moduleImports: unknown,
  webpackRequire: WebpackRequire
) => void;

/**
 * Webpack require函数接口
 * 用于动态加载模块
 */
export interface WebpackRequire {
  /**
   * 根据模块ID加载模块
   * @param moduleId - 模块的唯一标识符
   * @returns 加载的模块内容
   */
  (moduleId: number): unknown;
}

/**
 * 模块导出对象接口
 */
export interface ModuleExports {
  /**
   * 模块唯一标识符
   */
  id: string | number;
  
  /**
   * 模块导出的内容（通常为CSS加载器返回值）
   */
  exports: CSSModuleExports;
}

/**
 * CSS模块导出接口
 * 提供push方法用于添加CSS规则
 */
export interface CSSModuleExports {
  /**
   * 添加CSS规则到样式表
   * @param rule - CSS规则数组，包含[模块ID, CSS内容]
   */
  push(rule: [string | number, string]): void;
}

/**
 * CSS加载器工厂函数类型
 * @param sourceMap - 是否启用sourceMap（false表示禁用）
 * @returns CSS模块导出对象
 */
export type CSSLoaderFactory = (sourceMap: boolean) => CSSModuleExports;

/**
 * 图片资源加载器函数类型
 * @param moduleId - 图片资源的模块ID
 * @returns 图片资源的URL路径
 */
export type ImageLoader = (moduleId: number) => string;

/**
 * 样式规则定义
 * 描述头部区域及相关组件的样式
 */
export interface HeaderStyleRules {
  /**
   * 头部区域容器样式
   * - flex布局，固定高度56px
   * - 黑色背景，白色文字
   * - z-index: 111
   */
  '.header_area': CSSStyleDeclaration;
  
  /**
   * 左侧区域返回按钮样式
   * - 圆角按钮，白色边框
   * - hover时蓝色背景(#396EFE)
   */
  '.header_area .left_area .ai_pic_back_btn': CSSStyleDeclaration;
  
  /**
   * 按钮文本内容样式
   * - 字体大小14px
   * - 使用AlibabaPuHuiTi-Bold字体
   */
  '.header_area .left_area .ai_pic_back_btn .btn_content': CSSStyleDeclaration;
  
  /**
   * 按钮hover状态样式
   */
  '.header_area .left_area .ai_pic_back_btn:hover': CSSStyleDeclaration;
  
  /**
   * 右侧区域容器样式
   * - flex布局，居中对齐
   */
  '.header_area .right_area': CSSStyleDeclaration;
  
  /**
   * 用户信息下拉菜单样式
   */
  '.header_area .right_area .ant-dropdown-trigger.global-ddmenu.user-info': CSSStyleDeclaration;
  
  /**
   * 右侧项目样式
   * - 左边距14px
   */
  '.header_area .right_area .right_item': CSSStyleDeclaration;
  
  /**
   * 教学能力按钮样式
   */
  '.header_area .right_area .right_item .teaching-ability-button-container.teaching-ability-button-wrapper.button': CSSStyleDeclaration;
  
  /**
   * Spark图片背景样式
   * - 背景图片尺寸332px宽度
   * - 不重复平铺
   */
  '.spark_pic': CSSStyleDeclaration;
}

/**
 * 模块依赖ID常量
 */
export const enum ModuleDependencies {
  /** 图片资源加载器模块ID */
  IMAGE_LOADER = 992716,
  
  /** CSS加载器模块ID */
  CSS_LOADER = 986380,
  
  /** Spark背景图片资源ID */
  SPARK_BACKGROUND_IMAGE = 773870
}