import { HSCore } from './path-to-hscore';
import { HSFPConstants } from './path-to-constants';

/**
 * 结构体旋转请求类
 * 
 * 用于处理3D场景中结构体的旋转操作，支持鼠标拖拽、热键和滑块等多种交互方式。
 * 继承自 StateRequest 基类，实现了事务处理和状态管理。
 */
export declare class RotateStructureRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 需要旋转的结构体对象
   */
  structure: any; // 具体类型需根据项目中的 Structure 类型定义

  /**
   * 结构体的原始 Z 轴旋转角度（度）
   */
  originalZAngle: number;

  /**
   * 上一次记录的 Z 轴旋转角度（度）
   */
  lastZAngle: number;

  /**
   * 构造函数
   * 
   * @param structure - 需要旋转的结构体实例
   */
  constructor(structure: any);

  /**
   * 提交事务时的回调
   * 
   * 当旋转操作确认提交时触发，如果结构体是墙体的一部分，会触发重建和自动适配。
   */
  onCommit(): void;

  /**
   * 接收交互事件的处理方法
   * 
   * @param eventType - 事件类型，如 'mouseup'、'dragmove'、'hotkey'、'sliderdragend' 等
   * @param eventData - 事件数据对象
   * @param eventData.delta - 旋转增量角度（度）
   * @param eventData.offset - 偏移量，用于角度吸附判断
   * @returns 返回 true 表示事件已处理
   */
  onReceive(
    eventType: 'mouseup' | 'sliderdragend' | 'hotkeyend' | 'sliderdragmove' | 'dragmove' | 'hotkey' | string,
    eventData: {
      delta?: number;
      offset?: number;
      [key: string]: any;
    }
  ): boolean;

  /**
   * 围绕世界坐标系中的指定轴旋转结构体
   * 
   * @param axis - 旋转轴向量（世界坐标系）
   * @param angle - 旋转角度（度）
   */
  rotateAroundWorldAxis(axis: THREE.Vector3, angle: number): void;

  /**
   * 判断字段是否可以进行事务处理
   * 
   * @returns 始终返回 true，表示支持事务
   */
  canTransactField(): boolean;

  /**
   * 获取操作的描述信息
   * 
   * @returns 返回 "旋转结构体"
   */
  getDescription(): string;

  /**
   * 获取操作的日志分类
   * 
   * @returns 返回内容操作类型的日志分组标识
   */
  getCategory(): string;
}