/**
 * CSS模块导出的类型定义
 * 用于Webpack css-loader生成的CSS模块
 * @module module_427614
 */

/**
 * Webpack模块工厂函数类型
 * @param exports - 模块导出对象
 * @param module - 模块元数据对象
 * @param require - Webpack require函数
 */
type WebpackModuleFactory = (
  exports: ModuleExports,
  module: WebpackModule,
  require: WebpackRequire
) => void;

/**
 * 模块导出对象接口
 */
interface ModuleExports {
  /** 模块默认导出 */
  default?: unknown;
  /** 其他命名导出 */
  [key: string]: unknown;
}

/**
 * Webpack模块元数据接口
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出对象 */
  exports: ModuleExports;
  /** 模块是否已加载 */
  loaded?: boolean;
}

/**
 * Webpack require函数类型
 */
interface WebpackRequire {
  /** 加载指定ID的模块 */
  (moduleId: string | number): unknown;
  /** 缓存的模块映射 */
  c?: Record<string | number, WebpackModule>;
}

/**
 * CSS Loader推送项元组
 * [模块ID, CSS内容, 源映射数据]
 */
type CSSLoaderItem = [string | number, string, string?];

/**
 * CSS Loader导出接口
 * 包含push方法用于添加CSS内容
 */
interface CSSLoaderExports {
  /**
   * 添加CSS模块内容
   * @param item - CSS内容元组 [moduleId, cssContent, sourceMap?]
   */
  push(item: CSSLoaderItem): void;
  
  /** CSS内容数组 */
  toString(): string;
  
  /** 其他可能的方法 */
  [key: string]: unknown;
}

/**
 * 双滑块输入组件的CSS样式定义
 * 
 * 包含的样式类：
 * - `.render-double-slider-input` - 主容器样式
 * - `.render-double-slider-input .ant-slider` - Ant Design滑块样式覆盖
 * - `.render-double-slider-input .ant-slider .ant-slider-rail` - 隐藏滑块轨道
 * - `.render-double-slider-input .left-content` - 左侧内容区域
 * - `.render-double-slider-input .left-content .label-text` - 标签文本样式
 */
declare const cssModule: WebpackModuleFactory;

export default cssModule;

/**
 * CSS类名映射接口（如果使用CSS Modules）
 */
export interface RenderDoubleSliderInputStyles {
  /** 主容器类名 */
  'render-double-slider-input': string;
  /** 左侧内容区域类名 */
  'left-content': string;
  /** 标签文本类名 */
  'label-text': string;
}