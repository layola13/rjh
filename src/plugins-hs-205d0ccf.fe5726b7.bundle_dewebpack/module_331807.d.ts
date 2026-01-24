/**
 * Webpack CSS模块加载器的类型定义
 * 用于处理Spark图片容器组件的样式表
 */

/**
 * Webpack模块函数参数类型
 */
interface WebpackModuleParams {
  /** 当前模块的导出对象 */
  exports: CSSModuleExports;
  /** 模块标识符 */
  id: string | number;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出的内容
 */
type WebpackRequire = (moduleId: number) => any;

/**
 * CSS模块导出接口
 */
interface CSSModuleExports {
  /** CSS加载器push方法，用于添加CSS内容 */
  push: (content: [string | number, string]) => void;
}

/**
 * CSS加载器工厂函数返回类型
 * @param sourcemap - 是否启用source map
 * @returns CSS模块导出对象
 */
type CSSLoaderFactory = (sourcemap: boolean) => CSSModuleExports;

/**
 * Spark图片容器样式模块
 * 
 * 该模块导出Spark图片浏览器组件的完整样式定义，包括：
 * - .spark-pic-image-container: 主容器样式（绝对定位，右上角显示）
 * - .card-container: 卡片网格容器（flex布局，支持滚动）
 * - .task: 单个任务卡片项
 * - .image-browser-icon: 图片浏览器图标按钮
 * - .image-browser-tip: 提示工具栏
 * - submitingAnimationFrame: 提交动画关键帧
 * 
 * @param exports - Webpack模块导出对象
 * @param moduleId - 当前模块ID (331807)
 * @param require - Webpack require函数，用于加载依赖模块
 * 
 * @remarks
 * 依赖模块：
 * - 992716: 资源URL处理工具
 * - 986380: CSS加载器工厂函数
 * - 751893: doing状态图标资源
 */
declare function sparkPicImageContainerStyleModule(
  exports: WebpackModuleParams['exports'],
  moduleId: WebpackModuleParams['id'],
  require: WebpackRequire
): void;

/**
 * 样式类名常量定义
 */
declare namespace SparkPicImageContainerStyles {
  /** 主容器类名 */
  const CONTAINER: 'spark-pic-image-container';
  
  /** 隐藏状态类名 */
  const HIDE: 'hide';
  
  /** 卡片容器类名 */
  const CARD_CONTAINER: 'card-container';
  
  /** 任务卡片类名 */
  const TASK: 'task';
  
  /** 任务卡片内容类名 */
  const TASK_CARD: 'task-card';
  
  /** 删除按钮类名 */
  const DELETE_BTN: 'delete-btn';
  
  /** 查看更多按钮类名 */
  const CLICK_VIEW_MORE: 'click-view-more';
  
  /** 悬浮遮罩类名 */
  const HOVER_MASK: 'hover-mask';
  
  /** 图片浏览器图标类名 */
  const IMAGE_BROWSER_ICON: 'image-browser-icon';
  
  /** 提交动画类名 */
  const SUBMITING_ANIMATION: 'submitingAnimation';
  
  /** 徽章类名 */
  const RIBP_BTN_BADGE: 'ribp-btn-badge';
  
  /** 进行中徽章类名 */
  const RIBP_BTN_BADGE_DOING: 'ribp-btn-badge-doing';
  
  /** 图标向下移动类名 */
  const DOING_ICON_MOVE_DOWN: 'doing-icon-move-down';
  
  /** 浏览器提示类名 */
  const IMAGE_BROWSER_TIP: 'image-browser-tip';
}

/**
 * 样式配置常量
 */
declare namespace SparkPicImageContainerConfig {
  /** 容器最大宽度 (px) */
  const MAX_WIDTH: 520;
  
  /** 容器最大高度 (px) */
  const MAX_HEIGHT: 310;
  
  /** 卡片盒子宽度 (px) */
  const BOX_WIDTH: 150;
  
  /** 卡片盒子高度 (px) */
  const BOX_HEIGHT: 85;
  
  /** 任务卡片高度 (px) */
  const TASK_CARD_HEIGHT: 93;
  
  /** 容器顶部偏移 (px) */
  const TOP_OFFSET: 44;
  
  /** 滚动条宽度 (px) */
  const SCROLLBAR_WIDTH: 5;
  
  /** 滚动条高度 (px) */
  const SCROLLBAR_HEIGHT: 6;
}

export { sparkPicImageContainerStyleModule as default };
export type { 
  WebpackModuleParams, 
  WebpackRequire, 
  CSSModuleExports, 
  CSSLoaderFactory 
};
export { SparkPicImageContainerStyles, SparkPicImageContainerConfig };