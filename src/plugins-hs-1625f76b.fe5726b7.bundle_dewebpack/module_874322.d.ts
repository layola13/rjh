/**
 * CSS模块类型定义
 * 该模块导出模型首页相关的样式表
 */

/**
 * CSS加载器函数类型
 * @param sourcemap - 是否启用source map
 * @returns CSS模块加载器实例
 */
type CSSLoaderFunction = (sourcemap: boolean) => CSSModuleLoader;

/**
 * CSS模块加载器接口
 */
interface CSSModuleLoader {
  /**
   * 添加CSS样式到模块
   * @param data - CSS模块数据数组，包含模块ID和样式内容
   */
  push(data: [string, string, string?][]): void;
}

/**
 * Webpack模块导出配置
 */
interface WebpackModuleExports {
  /** 模块唯一标识符 */
  id: string;
  /** 导出的CSS加载器实例 */
  exports: CSSModuleLoader;
}

/**
 * 模型首页样式模块
 * 包含以下主要样式区域：
 * - .hsc-model-home-page: 主容器样式
 * - .hsc-back-header: 返回头部样式
 * - .hsc-model-homepage-landing-page: 着陆页样式
 * - .hsc-search-box: 搜索框样式
 * - .model-homepage-title: 页面标题样式
 * - .hsc-model-homepage-content: 内容区域样式
 * - .model-recommend-img-wrapper: 推荐图片容器
 * - .model-recommend-img: 推荐图片基础样式
 * - .model-recommend-img-small: 小尺寸推荐图片
 * - .model-recommend-img-large: 大尺寸推荐图片
 * - .model-homepage-banner-content: Banner内容区域
 * - .special-topic-model-page: 专题模型页面
 * - .special-topic-list: 专题列表
 * - .activity-tool-tip: 活动提示工具栏
 * 
 * @param exports - Webpack模块导出对象
 * @param _module - 保留参数（未使用）
 * @param require - Webpack require函数，用于加载CSS加载器模块
 */
declare function cssModule(
  exports: WebpackModuleExports,
  _module: unknown,
  require: (moduleId: number) => CSSLoaderFunction
): void;

/**
 * CSS样式类名映射接口
 * 定义了所有可用的CSS类名
 */
export interface ModelHomePageStyles {
  /** 模型首页主容器 */
  'hsc-model-home-page': string;
  /** 返回头部 */
  'hsc-back-header': string;
  /** 内容标题 */
  'content': string;
  /** 标题文本 */
  'title': string;
  /** 首页着陆页 */
  'hsc-model-homepage-landing-page': string;
  /** 搜索框 */
  'hsc-search-box': string;
  /** 模型首页标题 */
  'model-homepage-title': string;
  /** 模型首页内容区 */
  'hsc-model-homepage-content': string;
  /** 推荐图片容器 */
  'model-recommend-img-wrapper': string;
  /** 推荐图片 */
  'model-recommend-img': string;
  /** 小尺寸推荐图片 */
  'model-recommend-img-small': string;
  /** 小尺寸品牌图片 */
  'model-recommend-img-small-brand': string;
  /** 大尺寸推荐图片 */
  'model-recommend-img-large': string;
  /** Banner内容区 */
  'model-homepage-banner-content': string;
  /** Banner图片封面 */
  'banner-img-cover': string;
  /** 专题模型页面 */
  'special-topic-model-page': string;
  /** 专题模型头部 */
  'special-topic-model-header': string;
  /** 专题模型第一行 */
  'special-topic-model-first-row': string;
  /** 专题模型返回按钮 */
  'special-topic-model-back': string;
  /** 专题模型收藏按钮 */
  'special-topic-model-fav': string;
  /** 收藏文本 */
  'fav-text': string;
  /** 返回提示 */
  'back-tip': string;
  /** Banner包装器 */
  'banner-wrapper': string;
  /** 模型收费图标 */
  'icon-model-charge': string;
  /** Banner图片 */
  'banner': string;
  /** 筛选区域 */
  'filters-area': string;
  /** 模型列表 */
  'model-list': string;
  /** 专题列表 */
  'special-topic-list': string;
  /** 图片封面 */
  'img-cover': string;
  /** 收藏图标 */
  'fav-icon': string;
  /** Homestyler UI组件 */
  'homestyler-ui-components': string;
  /** Homestyler气泡提示项 */
  'homestyler-popover-item': string;
  /** 活动工具提示 */
  'activity-tool-tip': string;
  /** 工具提示区域 */
  'tool-tip-area': string;
  /** 工具提示标题 */
  'tool-tip-title': string;
  /** Homestyler气泡箭头 */
  'homestyler-popover-caret': string;
}

export default cssModule;