/**
 * Large View Manager
 * 管理大视图面板的显示、隐藏和定位
 */

/**
 * 大视图数据配置接口
 */
export interface LargeViewData {
  /** 自定义数据 */
  customizedData?: Record<string, unknown>;
  /** 图片信息 */
  image?: string | ImageData;
  /** 获取自定义大视图数据的异步方法 */
  getCustomizedLargeViewData?: Promise<CustomizedLargeViewResult>;
  /** 其他扩展属性 */
  [key: string]: unknown;
}

/**
 * 自定义大视图结果
 */
export interface CustomizedLargeViewResult {
  /** 自定义数据 */
  customizedData?: Record<string, unknown>;
  /** 图片数据 */
  image?: string | ImageData;
}

/**
 * 图片数据接口
 */
export interface ImageData {
  /** 图片URL */
  url: string;
  /** 图片宽度 */
  width?: number;
  /** 图片高度 */
  height?: number;
  /** 其他属性 */
  [key: string]: unknown;
}

/**
 * 大视图位置配置
 */
export interface LargeViewPosition {
  /** 距离顶部的距离（像素） */
  top?: number;
  /** 距离底部的距离（像素） */
  bottom?: number;
  /** 距离左侧的距离（像素） */
  left?: number;
  /** 距离右侧的距离（像素） */
  right?: number;
}

/**
 * 相关模型选择回调函数类型
 */
export type OnRelatedModelSelect = (model: unknown) => void;

/**
 * 收藏功能回调函数类型
 */
export type OnFavFunc = (data: unknown) => void;

/**
 * 大视图管理器类
 * 负责显示和隐藏产品的大视图面板
 */
declare class LargeViewManager {
  /**
   * 隐藏大视图的定时器ID
   * @private
   */
  private hideLargeViewTimer?: number;

  /**
   * 标识鼠标是否悬停在大视图上
   * @private
   */
  private isHoverLargeView: boolean;

  /**
   * 构造函数
   * 初始化大视图容器并设置事件监听
   */
  constructor();

  /**
   * 显示大视图面板
   * @param data - 大视图数据配置
   * @param position - 大视图位置配置
   * @param showVariation - 是否显示变体，默认为 true
   * @param onRelatedModelSelect - 相关模型选择时的回调函数
   * @param onFavFunc - 收藏操作的回调函数
   * @returns Promise<void>
   */
  showLargeView(
    data?: LargeViewData,
    position?: LargeViewPosition,
    showVariation?: boolean,
    onRelatedModelSelect?: OnRelatedModelSelect,
    onFavFunc?: OnFavFunc
  ): Promise<void>;

  /**
   * 隐藏大视图面板
   * 使用延迟隐藏机制，400ms 后隐藏（如果鼠标未悬停）
   */
  hideLargeView(): void;

  /**
   * 调整大视图位置
   * 确保大视图不会超出视口边界
   * @param element - 大视图 DOM 元素
   * @private
   */
  private changeLargeViewPosition(element: HTMLElement): void;

  /**
   * 鼠标进入大视图区域的事件处理
   * @private
   */
  private largeViewMouseEnter(): void;

  /**
   * 鼠标离开大视图区域的事件处理
   * @private
   */
  private largeViewMouseLeave(): void;
}

/**
 * 大视图管理器单例实例
 */
declare const largeViewManager: LargeViewManager;

export default largeViewManager;