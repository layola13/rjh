/**
 * 元素处理模块
 * 提供统一的数据处理管道，支持注册多个处理器进行前置和后置处理
 * @module ElementHandle
 */

/**
 * 处理器项接口
 * 定义了数据处理的生命周期钩子
 */
interface IHandleItem<T = any> {
  /**
   * 前置处理钩子
   * @param data - 待处理的数据
   * @returns 处理后的数据
   */
  before(data: T): Promise<T>;

  /**
   * 后置处理钩子
   * @param data - 待处理的数据
   * @returns 处理后的数据
   */
  after(data: T): Promise<T>;
}

/**
 * 处理器项映射表
 * 键为处理器名称，值为对应的处理器实例
 */
type HandleItemMap = Record<string, IHandleItem>;

/**
 * 元素处理主类
 * 管理多个处理器，按注册顺序依次执行前置和后置处理逻辑
 */
export declare class ElementHandle {
  /**
   * 处理器项映射表
   */
  private handleItemMap: HandleItemMap;

  /**
   * 构造函数
   * 初始化空的处理器映射表
   */
  constructor();

  /**
   * 注册处理器项
   * @param name - 处理器名称（唯一标识）
   * @param handler - 处理器实例
   */
  registerHandleItem(name: string, handler: IHandleItem): void;

  /**
   * 执行所有注册的前置处理器
   * 按注册顺序依次调用每个处理器的 before 方法
   * @param data - 待处理的数据
   * @returns 经过所有前置处理器处理后的数据
   */
  before<T>(data: T): Promise<T>;

  /**
   * 执行所有注册的后置处理器
   * 按注册顺序依次调用每个处理器的 after 方法
   * @param data - 待处理的数据
   * @returns 经过所有后置处理器处理后的数据
   */
  after<T>(data: T): Promise<T>;
}

/**
 * 产品数据项接口
 * 描述产品相关的数据结构
 */
interface IProductItem {
  /**
   * 类别类型标识
   * 用于判断产品所属类别
   */
  categoryTypeId?: string;

  /**
   * 位置名称
   * 仅特定类别的产品需要该字段
   */
  locationName?: string;

  /**
   * 其他任意属性
   */
  [key: string]: any;
}

/**
 * 位置处理器类（内部实现）
 * 根据产品类别决定是否保留 locationName 字段
 * @internal
 */
declare class LocationHandler implements IHandleItem<IProductItem[]> {
  /**
   * 需要保留位置信息的产品类别列表
   */
  private readonly categories: readonly [
    "tiles",
    "stone",
    "paint",
    "flooring",
    "matt_finish",
    "wallpape/wallfabric"
  ];

  /**
   * 构造函数
   * 初始化类别白名单
   */
  constructor();

  /**
   * 前置处理：过滤产品的 locationName 字段
   * 仅类别白名单内的产品保留 locationName
   * @param data - 产品列表
   * @returns 处理后的产品列表
   */
  before(data: IProductItem[]): Promise<IProductItem[]>;

  /**
   * 后置处理：直接返回数据（无额外处理）
   * @param data - 产品列表
   * @returns 原样返回的产品列表
   */
  after(data: IProductItem[]): Promise<IProductItem[]>;
}

/**
 * 全局元素处理器实例
 * 已预注册 "location" 处理器
 */
export declare const elementHandle: ElementHandle;