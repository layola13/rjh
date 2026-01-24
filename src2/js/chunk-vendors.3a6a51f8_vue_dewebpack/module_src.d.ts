/**
 * 图像加载器模块
 * 负责管理图像的加载状态和初始化流程
 */

/**
 * 图像加载器类或对象的接口
 * 提供图像加载和初始化功能
 */
interface ImageLoader {
  /**
   * 标识图像是否正在加载中
   */
  isLoading: boolean;

  /**
   * 加载图像资源
   * 当isLoading为true时调用此方法
   */
  loadImage(): void;

  /**
   * 初始化图像加载器
   * @param param1 - 第一个初始化参数（可选）
   * @param param2 - 第二个初始化参数（可选）
   * @param forceInit - 是否强制初始化，默认为true
   */
  init(param1?: unknown, param2?: unknown, forceInit?: boolean): void;

  /**
   * 执行加载或初始化操作
   * 根据isLoading状态决定是加载图像还是执行初始化
   */
  execute(): void;
}

/**
 * 执行加载或初始化操作的函数
 * 如果正在加载则调用loadImage，否则执行强制初始化
 * @this {ImageLoader} - 图像加载器实例上下文
 */
declare function execute(this: ImageLoader): void;