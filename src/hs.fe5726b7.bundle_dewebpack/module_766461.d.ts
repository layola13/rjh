/**
 * CSS样式模块的类型定义
 * 用于描述Webpack CSS模块导出的结构
 */

/**
 * Webpack CSS导出函数类型
 * @param sourcemap - 是否启用源映射
 * @returns CSS模块加载器实例
 */
type CSSModuleLoader = (sourcemap: boolean) => CSSModuleExports;

/**
 * CSS模块导出接口
 * 表示处理后的CSS样式内容
 */
interface CSSModuleExports {
  /**
   * 将CSS规则推入样式集合
   * @param rule - CSS规则数组，包含模块ID和样式字符串
   */
  push(rule: [string, string]): void;
}

/**
 * Webpack模块定义函数类型
 * @param exports - 当前模块的导出对象
 * @param module - 模块元数据对象
 * @param require - Webpack的require函数，用于加载其他模块
 */
type WebpackModuleDefinition = (
  exports: ModuleExports,
  module: WebpackModule,
  require: WebpackRequire
) => void;

/**
 * Webpack模块对象接口
 */
interface WebpackModule {
  /** 模块的唯一标识符 */
  id: string;
  /** 模块导出的内容 */
  exports: ModuleExports;
}

/**
 * 模块导出对象类型
 */
type ModuleExports = CSSModuleExports | Record<string, unknown>;

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块的导出内容
 */
type WebpackRequire = (moduleId: number) => unknown;

/**
 * 资源URL解析器类型
 * @param resourcePath - 资源文件路径
 * @returns 处理后的资源URL
 */
type ResourceUrlResolver = (resourcePath: string) => string;

/**
 * 右侧图片按钮样式模块
 * 
 * 该模块导出包含以下CSS类的样式：
 * - `.right_imgbtn` - 右侧图片按钮容器
 * - `.imglabel` - 图片标签
 * - `.imgdiv` - 图片容器
 * - `.rotation` - 旋转按钮
 * - `.imgtriangle` - 三角形指示器
 * - `.match` - 匹配状态样式
 * - `.disable` - 禁用状态样式
 * 
 * @module module_766461
 */
declare module "module_766461" {
  /**
   * 样式模块导出
   * 包含右侧图片按钮相关的所有CSS规则
   */
  const styles: CSSModuleExports;
  export default styles;
}

/**
 * CSS规则元组类型
 * [模块ID, CSS内容字符串]
 */
type CSSRule = [moduleId: string, cssContent: string];

/**
 * 样式类名枚举
 * 定义了模块中所有可用的CSS类名
 */
declare enum RightImageButtonClasses {
  /** 右侧图片按钮主容器 */
  RIGHT_IMGBTN = "right_imgbtn",
  /** 图片标签 */
  IMG_LABEL = "imglabel",
  /** 标签文本 */
  LABEL = "label",
  /** 图片容器 */
  IMG_DIV = "imgdiv",
  /** 图片包装器 */
  IMAGE_WRAP = "image-wrap",
  /** 旋转按钮 */
  ROTATION = "rotation",
  /** 图片按钮 */
  IMG_BTN = "imgbtn",
  /** 三角形指示器 */
  IMG_TRIANGLE = "imgtriangle",
  /** 三角形内部 */
  IMG_TRIANGLE_1 = "imgtriangle1",
  /** 九宫格容器 */
  NINE_PATCH_CONTAINER = "nine-patch-container",
  /** 匹配状态 */
  MATCH = "match",
  /** 隐藏标签 */
  LABEL_HIDDEN = "labelHidden",
  /** 按钮文本 */
  IMGBTN_TEXT = "imgbtn_text",
  /** 双行文本 */
  DOUBLE_LINE = "double_line",
  /** 禁用状态 */
  DISABLE = "disable",
  /** 底部标签 */
  FOOT_LABEL = "footlable",
  /** 台面样式 */
  COUNTERTOP_STYLE = "countertop-style",
  /** 模压面板 */
  MOLDING_PANEL_DIV = "moldingPanelDiv"
}