/**
 * 加载动画模块
 * 提供页面级和面板级的加载动画组件
 */

/**
 * 页面级加载动画配置选项
 */
export interface PageLoadingOptions {
  /** 遮罩层的类名 */
  layername?: string;
  /** 加载动画的类名 */
  loadname?: string;
}

/**
 * 面板级加载动画配置选项
 */
export interface PanelLoadingOptions {
  /** 加载动画颜色，默认为 #237ab9 */
  color?: string;
  /** 是否在面板中心显示 */
  ispanelcenter?: boolean;
  /** 是否在容器中心显示 */
  iscontainercenter?: boolean;
  /** 是否在容器左侧显示 */
  iscontainerleft?: boolean;
  /** 是否在页面中心显示（带遮罩层） */
  ispagecenter?: boolean;
}

/**
 * 页面级全屏加载动画组件
 * 用于显示全屏遮罩层和加载动画
 */
export declare class PageLoading {
  /** 遮罩层的类名 */
  layername: string;
  
  /** 加载动画的类名 */
  loadname: string;

  /**
   * 构造函数
   */
  constructor();

  /**
   * 启动加载动画
   * 在页面body中添加遮罩层和加载动画元素
   */
  startLoading(): void;

  /**
   * 停止加载动画
   * 移除页面中的遮罩层和加载动画元素
   */
  stopLoading(): void;

  /**
   * 检查元素是否在页面中
   * @param element - 要检查的DOM元素
   * @returns 如果元素在页面中返回true，否则返回false
   */
  private _isInPage(element: HTMLElement): boolean;
}

/**
 * 面板级加载动画组件
 * 用于在指定容器内显示加载动画
 */
export declare class PanelLoading {
  /** 父容器元素 */
  parentEl: HTMLElement | null;
  
  /** 加载动画颜色 */
  color: string;
  
  /** 是否在面板中心显示 */
  isPanelCenter: boolean;
  
  /** 是否在容器中心显示 */
  isContainerCenter: boolean;
  
  /** 是否在容器左侧显示 */
  isContainerLeft: boolean;
  
  /** 加载动画的类名 */
  loaderName: string;
  
  /** 是否在页面中心显示（带遮罩层） */
  isPageCenter: boolean;

  /**
   * 构造函数
   * @param parentElement - 父容器元素，如果为null则在页面级显示
   * @param options - 配置选项
   */
  constructor(parentElement: HTMLElement | null, options?: PanelLoadingOptions);

  /**
   * 显示加载动画
   * 根据配置在指定位置添加加载动画元素
   */
  show(): void;

  /**
   * 隐藏加载动画
   * 移除加载动画元素和遮罩层（如果有）
   */
  hide(): void;

  /**
   * 初始化属性
   * @param parentElement - 父容器元素
   * @param options - 配置选项
   */
  private _initAttr(parentElement: HTMLElement | null, options?: PanelLoadingOptions): void;
}