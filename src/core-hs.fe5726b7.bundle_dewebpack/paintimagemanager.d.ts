/**
 * 绘图图像管理器模块
 * 提供图像资源的管理和获取功能
 */

/**
 * 砖块图案选项配置接口
 */
export interface BrickPatternOption {
  /** 纹理资源URI地址 */
  textureURI: string;
}

/**
 * 砖块配置参数接口
 */
export interface BrickConfig {
  /** 砖块图案选项配置 */
  brickPatternOption?: BrickPatternOption;
}

/**
 * 图像提供者接口
 * 定义图像资源获取的标准方法
 */
export interface IPaintImageProvider {
  /** 提供者唯一标识符 */
  readonly id: string;
  
  /** 是否支持多边形渲染 */
  readonly supportPolygon: boolean;
  
  /**
   * 异步获取砖块图像URL
   * @param config - 砖块配置参数
   * @returns Promise，解析为图像URL或null
   */
  getBrickImageUrl(config: BrickConfig): Promise<string | null>;
  
  /**
   * 同步获取砖块图像URL
   * @param config - 砖块配置参数
   * @returns 图像URL字符串或null
   */
  getBrickImageUrlSync(config: BrickConfig): string | null;
  
  /**
   * 从缓存中获取数据图像
   * @param key - 缓存键值
   * @returns 缓存的图像数据或null
   */
  getDataImageFromCache(key: string): unknown | null;
}

/**
 * 基础图像提供者实现
 * 提供默认的图像资源获取逻辑
 */
export declare class PaintImageProvider implements IPaintImageProvider {
  private readonly _id: string;
  
  constructor();
  
  /** 获取提供者ID */
  get id(): string;
  
  /** 是否支持多边形（默认支持） */
  get supportPolygon(): boolean;
  
  /**
   * 异步获取砖块纹理图像URL
   * @param config - 包含砖块图案配置的参数对象
   * @returns Promise，如果配置有效则返回textureURI，否则返回null
   */
  getBrickImageUrl(config: BrickConfig): Promise<string | null>;
  
  /**
   * 同步获取砖块纹理图像URL
   * @param config - 包含砖块图案配置的参数对象
   * @returns 如果配置有效则返回textureURI，否则返回null
   */
  getBrickImageUrlSync(config: BrickConfig): string | null;
  
  /**
   * 从缓存中获取数据图像
   * @param key - 缓存键
   * @returns 始终返回null（基础实现不支持缓存）
   */
  getDataImageFromCache(key: string): null;
}

/**
 * 绘图图像管理器（单例模式）
 * 负责管理和切换不同的图像提供者
 */
export declare class PaintImageManager {
  private static _instance: PaintImageManager | undefined;
  private _provider: IPaintImageProvider;
  
  private constructor();
  
  /**
   * 获取管理器单例实例
   * @returns PaintImageManager实例
   */
  static instance(): PaintImageManager;
  
  /**
   * 设置当前活动的图像提供者
   */
  set activeProvider(provider: IPaintImageProvider);
  
  /**
   * 获取当前活动的图像提供者
   */
  get activeProvider(): IPaintImageProvider;
}