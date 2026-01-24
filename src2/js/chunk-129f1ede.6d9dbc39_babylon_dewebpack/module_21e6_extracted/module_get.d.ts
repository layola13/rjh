/**
 * 获取画布形状管理器并更新订单信息
 * @returns 形状管理器实例，如果画布不存在则返回空对象
 */
function get(this: CanvasContext): ShapeManager | Record<string, never> {
  if (!this.canvas) {
    return {};
  }

  const shapeManager = this.canvas.shapeManager;

  // 更新订单高度（保留2位小数）
  this.order_info.height = Number(shapeManager.height.toFixed(2));

  // 更新订单宽度（保留2位小数）
  this.order_info.width = Number(shapeManager.width.toFixed(2));

  // 计算总面积：基础面积 + 连接器面积（可选） + 角连接器面积（可选），乘以数量
  const baseArea = shapeManager.computedArea;
  const connectorsArea = this.include_connectors ? this.canvas.shapeManager.connectorsArea : 0;
  const cornerJoinersArea = this.include_cornerJoiners ? this.canvas.shapeManager.cornerJoinersArea : 0;
  const totalArea = (baseArea + connectorsArea + cornerJoinersArea) * this.order_info.count;

  this.order_info.area = Number(totalArea.toFixed(2));

  return shapeManager;
}

/**
 * 画布上下文接口
 */
interface CanvasContext {
  /** 画布实例 */
  canvas?: Canvas;
  
  /** 订单信息 */
  order_info: OrderInfo;
  
  /** 是否包含连接器面积 */
  include_connectors: boolean;
  
  /** 是否包含角连接器面积 */
  include_cornerJoiners: boolean;
}

/**
 * 画布接口
 */
interface Canvas {
  /** 形状管理器 */
  shapeManager: ShapeManager;
}

/**
 * 形状管理器接口
 */
interface ShapeManager {
  /** 高度 */
  height: number;
  
  /** 宽度 */
  width: number;
  
  /** 计算后的面积 */
  computedArea: number;
  
  /** 连接器面积 */
  connectorsArea: number;
  
  /** 角连接器面积 */
  cornerJoinersArea: number;
}

/**
 * 订单信息接口
 */
interface OrderInfo {
  /** 高度 */
  height: number;
  
  /** 宽度 */
  width: number;
  
  /** 总面积 */
  area: number;
  
  /** 数量 */
  count: number;
}