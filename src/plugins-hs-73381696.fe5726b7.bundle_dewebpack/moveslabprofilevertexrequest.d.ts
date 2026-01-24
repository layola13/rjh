import { HSCore } from 'path/to/HSCore';
import { Util } from 'path/to/Util';

/**
 * 楼板轮廓顶点移动请求
 * 
 * 用于处理楼板轮廓顶点的交互式移动操作，支持移动过程中的实时更新、
 * 移动规则应用、重复点移除以及楼板面更新。
 * 
 * @extends {HSCore.Transaction.Common.StateRequest}
 */
export declare class MoveSlabProfileVertexRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 被移动的顶点对象
   */
  vertex: HSCore.Util.Point;

  /**
   * 顶点所属的楼板图层
   */
  layer: any; // 替换为实际的Layer类型

  /**
   * 移动操作开始时顶点的初始位置
   */
  moveBeginPosition: {
    x: number;
    y: number;
  };

  /**
   * 构造函数
   * 
   * @param vertex - 要移动的楼板轮廓顶点
   * @param layer - 顶点所属的楼板图层
   */
  constructor(vertex: HSCore.Util.Point, layer: any);

  /**
   * 接收并处理交互事件
   * 
   * @param eventType - 事件类型（如 "move"）
   * @param eventData - 事件数据，包含偏移量等信息
   * @returns 如果事件被处理返回 true，否则调用父类方法
   */
  onReceive(eventType: string, eventData: { offset?: { x: number; y: number } }): boolean;

  /**
   * 提交操作时的回调
   * 
   * 执行以下操作：
   * 1. 移除重复的顶点
   * 2. 更新楼板图层的面数据
   * 3. 调用父类提交逻辑
   */
  onCommit(): void;

  /**
   * 指示该请求是否可以作为事务字段
   * 
   * @returns 始终返回 true
   */
  canTransactField(): boolean;

  /**
   * 获取操作的描述文本
   * 
   * @returns 操作描述："移动楼板端点"
   */
  getDescription(): string;

  /**
   * 获取操作的日志分类
   * 
   * @returns 日志分组类型（楼板操作）
   */
  getCategory(): string;

  /**
   * 移除与当前顶点重复的点
   * 
   * 遍历所有与当前顶点连接的点，如果位置完全相同则尝试合并
   */
  removeDuplicatePoints(): void;

  /**
   * 处理移动事件的内部方法
   * 
   * @param offset - 移动的偏移量 { x, y }
   * 
   * @internal
   */
  private _onMove(offset: { x: number; y: number } | undefined): void;

  /**
   * 调整移动后的位置（预留扩展点）
   * 
   * @param position - 应用移动规则后的位置
   * @returns 调整后的最终位置
   * 
   * @internal
   */
  private _adjustMovePosition(position: { x: number; y: number }): { x: number; y: number };

  /**
   * 应用移动规则，计算新位置
   * 
   * @param offset - 相对于初始位置的偏移量
   * @returns 计算后的新位置坐标
   * 
   * @internal
   */
  private _applyMoveRule(offset: { x: number; y: number }): { x: number; y: number };
}