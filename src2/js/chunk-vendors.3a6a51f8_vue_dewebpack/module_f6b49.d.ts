/**
 * 拦截器管理器
 * 用于管理请求/响应拦截器的注册、移除和遍历
 */
export interface InterceptorHandler<V = any> {
  /** 成功时的处理函数 */
  fulfilled: (value: V) => V | Promise<V>;
  /** 失败时的处理函数 */
  rejected?: (error: any) => any;
}

/**
 * 拦截器管理器类
 * 提供拦截器的添加、移除和遍历功能
 * @template V 拦截器处理的值类型
 */
export default class InterceptorManager<V = any> {
  /** 存储所有注册的拦截器处理函数 */
  private handlers: Array<InterceptorHandler<V> | null>;

  constructor();

  /**
   * 注册一个拦截器
   * @param fulfilled 成功时的处理函数
   * @param rejected 失败时的处理函数（可选）
   * @returns 拦截器的ID，用于后续移除
   */
  use(
    fulfilled: (value: V) => V | Promise<V>,
    rejected?: (error: any) => any
  ): number;

  /**
   * 根据ID移除一个拦截器
   * @param id 通过use方法返回的拦截器ID
   */
  eject(id: number): void;

  /**
   * 遍历所有有效的拦截器
   * @param fn 对每个有效拦截器执行的回调函数
   */
  forEach(fn: (handler: InterceptorHandler<V>) => void): void;
}