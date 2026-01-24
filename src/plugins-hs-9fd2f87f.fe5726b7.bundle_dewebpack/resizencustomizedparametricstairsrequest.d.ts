/**
 * 参数化楼梯调整大小和自定义参数请求
 * @module ResizeNCustomizedParametricStairsRequest
 */

import { HSCore } from './HSCore';

/**
 * 三维坐标位置
 */
interface Position3D {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
}

/**
 * 参数化楼梯属性参数映射
 * 键为属性类型枚举，值为对应的数值（单位：毫米）
 */
interface StairParameterMap {
  [key: string]: number;
}

/**
 * 缩放变更配置
 */
interface ScaleChangeConfig {
  /** 当前缩放值 */
  scaleValue: number;
  /** 缩放属性键名 */
  scaleKey: 'XScale' | 'YScale' | 'ZScale';
  /** 参数化楼梯属性类型 */
  key: string;
}

/**
 * 外部传入的参数变更信息
 */
interface ParameterChangeInfo {
  /** 变更类型：'x'(宽度), 'y'(长度), 'z'(高度) */
  type?: 'x' | 'y' | 'z';
  /** 新的参数值（单位：米） */
  value?: number;
}

/**
 * 参数化楼梯内容对象接口
 */
interface ParametricStairContent {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** X轴缩放比例 */
  XScale: number;
  /** Y轴缩放比例 */
  YScale: number;
  /** Z轴缩放比例 */
  ZScale: number;
  /** Z轴尺寸（单位：米） */
  ZSize: number;

  /**
   * 获取属性映射表
   * @returns 属性键值对映射
   */
  getPropertyMap(): Map<string, { value: number }>;

  /**
   * 设置楼梯参数
   * @param params 参数映射对象
   */
  setParamsToStairs(params: StairParameterMap): void;
}

/**
 * 参数化楼梯调整大小和自定义参数的事务请求类
 * 支持撤销/重做操作
 */
export declare class ResizeNCustomizedParametricStairsRequest extends HSCore.Transaction.Request {
  /** 楼梯内容对象 */
  private _content: ParametricStairContent;
  
  /** 原始参数映射 */
  private _oldParam: StairParameterMap;
  
  /** 新参数映射 */
  private _newParam: StairParameterMap;
  
  /** 原始位置 */
  private _oldPos: Position3D;
  
  /** 新位置 */
  private _newPos: Position3D;

  /**
   * 构造函数
   * @param content 参数化楼梯内容对象
   * @param oldPosition 原始位置坐标
   * @param changeInfo 参数变更信息（可选）
   */
  constructor(
    content: ParametricStairContent,
    oldPosition: Position3D,
    changeInfo?: ParameterChangeInfo
  );

  /**
   * 计算参数变化
   * @param changeInfo 外部传入的参数变更信息
   * @returns 包含旧参数和新参数的对象
   * @private
   */
  private _calcParam(changeInfo?: ParameterChangeInfo): {
    oldParam: StairParameterMap;
    newParam: StairParameterMap;
  };

  /**
   * 根据变更类型获取对应的属性键
   * @param type 变更类型：'x'(宽度), 'y'(长度), 'z'(高度)
   * @returns 参数化楼梯属性类型枚举值
   * @private
   */
  private _getPropKeyByType(type: 'x' | 'y' | 'z'): string;

  /**
   * 提交操作：应用新的位置和参数
   * @returns 更新后的楼梯内容对象
   */
  onCommit(): ParametricStairContent;

  /**
   * 撤销操作：恢复到原始位置和参数
   */
  onUndo(): void;

  /**
   * 重做操作：重新应用新的位置和参数
   */
  onRedo(): void;

  /**
   * 是否可以进行字段事务处理
   * @returns 始终返回 false
   */
  canTransactField(): boolean;

  /**
   * 获取操作分类
   * @returns 参数化模型日志分组类型
   */
  getCategory(): string;

  /**
   * 获取操作描述
   * @returns 操作的中文描述
   */
  getDescription(): string;
}