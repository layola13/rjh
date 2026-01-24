/**
 * CSS模块导出声明
 * 原始模块ID: 701058
 * 
 * 该模块导出一个CSS样式表，主要用于图片按钮组件的样式定义
 */

/**
 * Webpack模块工厂函数参数接口
 */
interface WebpackModuleParams {
  /** 当前模块导出对象 */
  exports: CssModuleExports;
  /** 模块元数据 */
  module: WebpackModule;
  /** 依赖加载函数 */
  require: WebpackRequire;
}

/**
 * Webpack模块元数据接口
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出对象 */
  exports: CssModuleExports;
}

/**
 * Webpack require函数类型
 */
interface WebpackRequire {
  /** 加载指定模块 */
  (moduleId: string | number): unknown;
}

/**
 * CSS模块导出接口
 */
interface CssModuleExports {
  /**
   * 添加CSS规则到样式表
   * @param cssRule - CSS规则数组，格式为 [moduleId, cssContent, sourceMap?]
   */
  push(cssRule: [string | number, string, string?]): void;
}

/**
 * 图片按钮组件样式类名定义
 */
interface ImageButtonStyles {
  /** 右侧图片按钮容器 */
  'right_imgbtn': string;
  
  /** 图片按钮右侧文本区域 */
  'image-button-right-part': string;
  
  /** 右侧第一行文本 */
  'image-button-right-first-line-text': string;
  
  /** 右侧第二行文本 */
  'image-button-right-second-line-text': string;
  
  /** 图片标签容器 */
  'imglabel': string;
  
  /** 台面样式变体 */
  'countertop-style': string;
  
  /** 文本标签 */
  'label': string;
  
  /** 图片容器 */
  'imgdiv': string;
  
  /** 图片三角标记 */
  'imgtriangle': string;
  
  /** 备用三角标记 */
  'imgtriangle1': string;
  
  /** 图片包装器 */
  'image-wrap': string;
  
  /** 旋转容器 */
  'rotation': string;
  
  /** 图片按钮 */
  'imgbtn': string;
  
  /** 匹配/选中状态 */
  'match': string;
  
  /** 九宫格容器 */
  'nine-patch-container': string;
  
  /** 九宫格 */
  'nine-patch': string;
  
  /** 九宫格行 */
  'nine-patch-row': string;
  
  /** 九宫格块 */
  'nine-patch-block': string;
  
  /** 选中状态SVG */
  'selected': string;
  
  /** 正常状态SVG */
  'normal': string;
  
  /** 隐藏标签 */
  'labelHidden': string;
  
  /** 按钮文本 */
  'imgbtn_text': string;
  
  /** 双行文本 */
  'double_line': string;
  
  /** 禁用状态 */
  'disable': string;
  
  /** 底部标签 */
  'footlable': string;
}

/**
 * CSS加载器函数类型
 * @param useSourceMap - 是否使用source map
 * @returns CSS模块导出对象
 */
type CssLoaderFunction = (useSourceMap: boolean) => CssModuleExports;

/**
 * 图片资源加载器函数类型
 * @param resourcePath - 资源路径
 * @returns 处理后的资源URL
 */
type ImageLoaderFunction = (resourcePath: string) => string;

/**
 * 模块导出声明
 * 该模块通过Webpack的css-loader处理CSS内容并导出
 */
declare const cssModule: CssModuleExports;

export = cssModule;
export as namespace ImageButtonCssModule;