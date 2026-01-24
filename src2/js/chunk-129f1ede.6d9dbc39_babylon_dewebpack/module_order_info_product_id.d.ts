/**
 * 产品ID变更处理函数类型定义
 * @module OrderInfoProductId
 * @description 处理订单产品ID变更时的业务逻辑，包括脚本列表更新、产品信息获取等
 */

/**
 * 产品信息接口
 */
interface Product {
  /** 产品唯一标识 */
  id: number;
  /** 产品名称 */
  name: string;
}

/**
 * 订单信息接口
 */
interface OrderInfo {
  /** 产品ID */
  product_id: number;
  /** 产品名称 */
  product_name: string;
}

/**
 * 路由查询参数接口
 */
interface RouteQuery {
  /** 订单ID */
  order_id?: string;
}

/**
 * 路由对象接口
 */
interface Route {
  /** 查询参数 */
  query: RouteQuery;
}

/**
 * 事件总线接口
 */
interface EventBus {
  /** 触发事件 */
  $emit(event: string, ...args: unknown[]): void;
}

/**
 * 组件上下文接口
 */
interface ComponentContext {
  /** 上一次的产品ID */
  lastProductId: number;
  /** 上一次的订单ID */
  lastOrderId?: string;
  /** 当前路由对象 */
  $route: Route;
  /** 订单信息 */
  order_info: OrderInfo;
  /** 脚本列表 */
  scriptList: unknown[];
  /** 产品列表 */
  product_list: Product[];
  /** 事件总线 */
  bus: EventBus;
  /** 获取脚本列表 */
  getScriptList(productId: number): void;
  /** 获取脚本信息 */
  getScriptInfo(): void;
  /** 重置预安装列表 */
  resetPreinstallList(): void;
}

/**
 * 产品ID变更处理函数
 * @param newProductId - 新的产品ID（0或undefined表示清空）
 * @param previousProductId - 之前的产品ID
 * @this ComponentContext - 组件上下文
 * @description
 * 当产品ID发生变更时执行以下操作：
 * 1. 保存上一次的产品ID
 * 2. 如果新产品ID为空，重置订单信息和脚本列表
 * 3. 如果新旧产品ID不同且新ID有效，更新产品信息并触发相关事件
 */
declare function handleProductIdChange(
  this: ComponentContext,
  newProductId: number | undefined,
  previousProductId: number
): void;

export type { Product, OrderInfo, RouteQuery, Route, EventBus, ComponentContext };
export { handleProductIdChange };