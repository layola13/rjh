/**
 * CSS模块加载器的类型定义
 * 用于webpack构建系统中处理CSS文件的导入和注入
 */

/**
 * CSS内容推送函数
 * @param moduleId - 模块的唯一标识符
 * @param cssContent - CSS样式字符串内容
 * @param sourceMap - 是否包含source map（此处为false表示不包含）
 */
declare function pushCSSContent(
  moduleId: string | number,
  cssContent: string,
  sourceMap: boolean
): void;

/**
 * 资源URL解析器
 * 将相对路径的资源（如图片）转换为可用的URL
 * @param resourcePath - 资源文件路径或模块ID
 * @returns 处理后的资源URL字符串
 */
declare function resolveAssetUrl(resourcePath: string | number): string;

/**
 * CSS模块导出接口
 * 表示一个CSS模块的导出结构
 */
interface CSSModuleExports {
  /**
   * 模块ID
   */
  id: string | number;

  /**
   * 推送CSS内容到样式系统
   * @param content - 包含模块ID、CSS内容和source map标志的数组
   */
  push(content: [string | number, string, boolean]): void;
}

/**
 * Webpack模块定义
 * @param exports - 模块导出对象
 * @param require - 模块加载函数
 */
declare module "module_614465" {
  /**
   * 特殊主题容器的样式模块
   * 包含以下主要组件样式：
   * - .special-topic-container-new: 主容器
   * - .special-topic-landing-page: 落地页布局（宽度280px）
   * - .special-topic-header: 头部区域（包含返回按钮和搜索框）
   * - .model-area: 模型展示区域
   * - .model-pool-area: 模型池区域（高质量池、高佣金池等）
   * - .special-topic-list-page: 主题列表页
   * - .special-topic-area: 主题内容区域
   * - .special-topic-model-page-new: 模型详情页
   * 
   * 支持国际化(.global-en)样式变体
   * 包含响应式动画效果(open_product_img)
   */
  const cssModule: CSSModuleExports;
  export = cssModule;
}

/**
 * CSS类名映射（用于CSS Modules）
 */
declare const styles: {
  /** 特殊主题容器根元素 */
  readonly "special-topic-container-new": string;
  /** 特殊主题落地页 */
  readonly "special-topic-landing-page": string;
  /** 特殊主题头部 */
  readonly "special-topic-header": string;
  /** 返回头部样式 */
  readonly "hsc-back-header": string;
  /** 搜索框样式 */
  readonly "hsc-search-box": string;
  /** 搜索图标 */
  readonly "special-search-icon": string;
  /** 模型展示区域 */
  readonly "model-area": string;
  /** 模型池区域 */
  readonly "model-pool-area": string;
  /** 标题 */
  readonly title: string;
  /** 模型池 */
  readonly "model-pool": string;
  /** 高质量模型池 */
  readonly "high-quality-pool": string;
  /** 高佣金模型池 */
  readonly "high-commission-pool": string;
  /** 高佣金模型池（特殊主题） */
  readonly "high-commission-pool_tpzz": string;
  /** 隐藏的高佣金池 */
  readonly "high-commission-pool-hide": string;
  /** 特殊主题列表页 */
  readonly "special-topic-list-page": string;
  /** 造型师链接 */
  readonly "special-topic-styler-link": string;
  /** 造型师文本 */
  readonly "special-topic-styler-text": string;
  /** 徽章符号图标 */
  readonly "icon-badge-symbol": string;
  /** 徽章符号图标2 */
  readonly "icon-badge-symbol2": string;
  /** 特殊主题区域 */
  readonly "special-topic-area": string;
  /** 加载中包装器 */
  readonly "loading-wrapper": string;
  /** 二级标签页 */
  readonly "special-second-tabs": string;
  /** 标签列表 */
  readonly "homestyler-tabs-list": string;
  /** 激活的标签 */
  readonly "homestyler-tabs-tab-active": string;
  /** 标签栏 */
  readonly "homestyler-tabs-bar": string;
  /** 标签栏内部 */
  readonly "homestyler-tabs-bar-inner": string;
  /** 特殊主题列表 */
  readonly "special-topic-list": string;
  /** 无结果区域 */
  readonly "no-result-area": string;
  /** 无数据图片 */
  readonly "no-data-img": string;
  /** 无数据提示 */
  readonly "no-data-tip": string;
  /** 图片封面 */
  readonly "img-cover": string;
  /** 收藏图标 */
  readonly "fav-icon": string;
  /** 链接到模型专题 */
  readonly "link-to-model-special-topic": string;
  /** 链接到网页 */
  readonly "link-to-web": string;
  /** 查看图标字体 */
  readonly "hsc-iconfont-view": string;
  /** 无相关容器 */
  readonly "no-relative-container": string;
  /** 无相关模型 */
  readonly "no-relative-model": string;
  /** Logo */
  readonly logo: string;
  /** 无结果提示 */
  readonly "no-result-tips": string;
  /** 无相关模型文本 */
  readonly "no-relative-model-text": string;
  /** 模型申请提示 */
  readonly "model-apply-tip": string;
  /** 特殊主题收藏弹窗 */
  readonly "specical-topic-fav-pop": string;
  /** 特殊主题列表收藏包装器 */
  readonly "special-topic-list-fav-wrapper": string;
  /** 新标签 */
  readonly "new-tag": string;
  /** 特殊主题列表收藏图标 */
  readonly "special-topic-list-fav-icon": string;
  /** 模型收费图标 */
  readonly "icon-model-charge": string;
  /** 新标记 */
  readonly new: string;
  /** 造型师图标 */
  readonly "icon-styler": string;
  /** 特殊主题模型页（新版） */
  readonly "special-topic-model-page-new": string;
  /** 特殊主题模型头部 */
  readonly "special-topic-model-header": string;
  /** 特殊主题模型第一行 */
  readonly "special-topic-model-first-row": string;
  /** 特殊主题模型返回 */
  readonly "special-topic-model-back": string;
  /** 特殊主题模型收藏 */
  readonly "special-topic-model-fav": string;
  /** 收藏文本 */
  readonly "fav-text": string;
  /** 返回提示 */
  readonly "back-tip": string;
  /** Banner横幅 */
  readonly banner: string;
  /** Banner筛选区域 */
  readonly "banner-filters-area": string;
  /** Banner筛选项 */
  readonly "banner-filter-item": string;
  /** 目录筛选器 */
  readonly "hsc-catalog-filter": string;
  /** 目录筛选器内容 */
  readonly "hsc-catalog-filter-content": string;
  /** Banner包装器 */
  readonly "banner-wrapper": string;
  /** 模型列表 */
  readonly "model-list": string;
  /** 国际化英文版样式 */
  readonly "global-en": string;
};

export default styles;