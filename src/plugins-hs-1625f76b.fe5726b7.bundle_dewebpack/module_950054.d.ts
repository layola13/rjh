/**
 * CSS模块导出类型定义
 * @module AICreateContainerStyles
 * @description AI创建容器的样式模块，包含CSS-in-JS的类型定义
 */

/**
 * Webpack模块导出函数类型
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数
 */
declare function cssModuleExport(
  exports: CSSModuleExports,
  module: WebpackModule,
  require: WebpackRequire
): void;

/**
 * CSS模块导出对象
 */
interface CSSModuleExports {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports: unknown;
}

/**
 * Webpack模块对象
 */
interface WebpackModule {
  /** 模块ID */
  id: string | number;
  /** 模块导出对象 */
  exports: unknown;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出内容
 */
interface WebpackRequire {
  (moduleId: string | number): unknown;
}

/**
 * CSS加载器返回类型
 */
interface CSSLoaderResult {
  /**
   * 推送CSS内容到样式表
   * @param content - CSS内容数组，包含模块ID和CSS字符串
   */
  push(content: [string | number, string]): void;
}

/**
 * 资源URL处理函数类型
 * @param resourcePath - 资源路径或模块ID
 * @returns 处理后的资源URL
 */
type AssetUrlResolver = (resourcePath: string | number) => string;

/**
 * AI创建容器的CSS类名映射
 */
interface AICreateContainerClassNames {
  /** 主容器类名 */
  'ai-create-container': string;
  /** 隐藏状态类名 */
  'hide': string;
  /** 创建页面容器类名 */
  'ai-create-page': string;
  /** 页面头部类名 */
  'ai-create-page-header': string;
  /** 头部顶部区域类名 */
  'ai-top': string;
  /** Logo容器类名 */
  'ai-logo': string;
  /** 图标组容器类名 */
  'ai-icons': string;
  /** 单个图标类名 */
  'ai-icon': string;
  /** 教程链接类名 */
  'ai-tutorial': string;
  /** 材料内容列类名 */
  'ai-material-content-col': string;
  /** 尺寸标题类名 */
  'dimension-title': string;
  /** 上传标题类名 */
  'upload-title': string;
  /** 步骤标签类名 */
  'step': string;
  /** 上传内容类名 */
  'upload-content': string;
  /** 上传图标类名 */
  'upload-icon': string;
  /** 尺寸表单类名 */
  'dimension-form': string;
  /** 尺寸行类名 */
  'dimension-row': string;
  /** 尺寸标签类名 */
  'dimension-label': string;
  /** 尺寸输入包装器类名 */
  'dimension-input-wrapper': string;
  /** 尺寸输入类名 */
  'dimension-input': string;
  /** 尺寸单位类名 */
  'dimension-unit': string;
  /** 尺寸错误提示类名 */
  'dimension-error': string;
  /** 生成按钮底部容器类名 */
  'generate-footer': string;
  /** 生成费用提示类名 */
  'generate-cost-tips': string;
  /** 生成按钮类名 */
  'generate-button': string;
  /** 免费试用徽章类名 */
  'free-trial-badge': string;
  /** 购买更多链接类名 */
  'buy-more': string;
  /** Ant Design输入框包装器类名 */
  'ant-input-affix-wrapper': string;
}

/**
 * 样式配置对象
 */
interface StyleConfig {
  /** 容器定位左偏移量（像素） */
  readonly CONTAINER_LEFT_OFFSET: 60;
  /** 容器定位顶部偏移量（像素） */
  readonly CONTAINER_TOP_OFFSET: 50;
  /** 容器高度偏移量（像素） */
  readonly CONTAINER_HEIGHT_OFFSET: 60;
  /** Z-index层级 */
  readonly Z_INDEX: 1002;
  /** 页面宽度（像素） */
  readonly PAGE_WIDTH: 280;
  /** 边框圆角（像素） */
  readonly BORDER_RADIUS: 10;
  /** Logo高度（像素） */
  readonly LOGO_HEIGHT: 40;
  /** 按钮高度（像素） */
  readonly BUTTON_HEIGHT: 36;
  /** 上传图标尺寸（像素） */
  readonly UPLOAD_ICON_SIZE: 36;
  /** 主题色 */
  readonly PRIMARY_COLOR: '#396efe';
  /** 基础字体大小（像素） */
  readonly BASE_FONT_SIZE: 12;
}

/**
 * 模块依赖项引用
 */
interface ModuleDependencies {
  /** CSS加载器模块ID */
  readonly CSS_LOADER_MODULE: 986380;
  /** 资源URL处理器模块ID */
  readonly ASSET_URL_RESOLVER_MODULE: 992716;
  /** 背景图片资源模块ID */
  readonly BACKGROUND_IMAGE_MODULE: 925543;
}

export type {
  cssModuleExport,
  CSSModuleExports,
  WebpackModule,
  WebpackRequire,
  CSSLoaderResult,
  AssetUrlResolver,
  AICreateContainerClassNames,
  StyleConfig,
  ModuleDependencies
};

export default cssModuleExport;