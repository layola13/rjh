import { HSCore } from './HSCore';

/**
 * 三维尺寸接口
 */
interface Size3D {
  /** X轴尺寸 */
  x: number;
  /** Y轴尺寸 */
  y: number;
  /** Z轴尺寸 */
  z: number;
}

/**
 * 三维偏移量接口
 */
interface Offset3D {
  /** X轴偏移 */
  x: number;
  /** Y轴偏移 */
  y: number;
  /** Z轴偏移 */
  z: number;
}

/**
 * 参数化模型基础接口
 */
interface IParametricModel {
  /** X轴尺寸 */
  XSize: number;
  /** Y轴尺寸 */
  YSize: number;
  /** Z轴尺寸 */
  ZSize: number;
  /** X轴缩放比例 */
  XScale: number;
  /** Y轴缩放比例 */
  YScale: number;
  /** Z轴缩放比例 */
  ZScale: number;
  /** X轴长度 */
  XLength: number;
  /** Y轴长度 */
  YLength: number;
  /** Z轴长度 */
  ZLength: number;
  /** X轴位置 */
  x: number;
  /** Y轴位置 */
  y: number;
  /** Z轴位置 */
  z: number;
  /** 根据尺寸初始化 */
  initBySize(): void;
}

/**
 * 参数化模型调整操作类
 * 用于处理参数化模型的尺寸调整和位置偏移，支持撤销/重做操作
 */
export declare class ResizeNCustomizedParametricModel extends HSCore.Transaction.Common.StateRequest {
  /** 操作的参数化模型内容 */
  private _content: HSCore.Model.NCustomizedParametricModel;
  
  /** 初始尺寸 */
  private _beginSize: Size3D;
  
  /** 目标尺寸 */
  private _endSize: Size3D;
  
  /** 位置偏移量 */
  private _offset: Offset3D;

  /**
   * 构造函数
   * @param content - 要调整的参数化模型对象
   * @param beginSize - 初始尺寸
   * @param endSize - 目标尺寸（可选，默认为模型当前尺寸）
   * @param offset - 位置偏移量（可选，默认为零偏移）
   */
  constructor(
    content: HSCore.Model.NCustomizedParametricModel,
    beginSize: Size3D,
    endSize?: Size3D,
    offset?: Partial<Offset3D>
  );

  /**
   * 提交操作时执行
   * 应用目标尺寸和位置偏移，并重新初始化模型
   */
  onCommit(): void;

  /**
   * 撤销操作时执行
   * 恢复到初始尺寸并反向应用位置偏移
   */
  onUndo(): void;

  /**
   * 重做操作时执行
   * 重新应用目标尺寸和位置偏移
   */
  onRedo(): void;

  /**
   * 更新模型尺寸
   * @param size - 新的三维尺寸
   */
  private updateSize(size: Size3D): void;

  /**
   * 更新模型位置
   * @param offset - 位置偏移量
   * @param isForward - true表示正向应用偏移，false表示反向应用偏移
   */
  private updatePosition(offset: Offset3D, isForward: boolean): void;

  /**
   * 是否可以进行字段事务处理
   * @returns 始终返回false
   */
  canTransactField(): boolean;

  /**
   * 获取操作的日志分组类型
   * @returns 根据模型类型返回对应的日志分组类型常量
   */
  getCategory(): string;

  /**
   * 获取操作描述文本
   * @returns 根据模型类型返回对应的中文描述
   */
  getDescription(): string;
}