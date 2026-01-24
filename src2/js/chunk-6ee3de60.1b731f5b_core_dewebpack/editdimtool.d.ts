/**
 * 编辑尺寸标注工具模块
 * @module EditDimTool
 */

import { Point } from 'paper';
import { Tool, ToolType, EditorStyle } from './Tool';
import { EventType } from './EventBus';
import { DimInfo, DimType, ThreedArcFrame, TopFrame, TopView } from './Frame';
import { UnitConvertion, DrawParams } from './Utils';
import { ShapeHelper, SystemParam, Utils } from './System';

/**
 * 尺寸扩展方向枚举
 */
export enum ExpandDirection {
  /** 向左或向上扩展 */
  LeftOrUp = 1,
  /** 向右或向下扩展 */
  RightOrDown = 2,
  /** 双向扩展 */
  BothSide = 3
}

/**
 * 尺寸标注信息接口
 */
export interface DimensionInfo {
  /** 尺寸值 */
  value: number;
  /** 尺寸名称 */
  name: string;
  /** 尺寸类型 */
  type: DimType;
  /** 边缘索引 */
  edgeIdx: number;
  /** 中横档尺寸索引 */
  mulDimIdx: number;
  /** 方向向量 */
  dir: Vector;
  /** 偏移向量 */
  offvec: Vector;
  /** 是否为框架尺寸 */
  frameDim: boolean;
  
  /**
   * 应用尺寸差值
   * @param value - 新的尺寸值
   * @param point - 参考点位置
   */
  applyDiff(value: number, point: Point): void;
  
  /**
   * 应用框架尺寸
   * @param value - 新的尺寸值
   * @param direction - 扩展方向
   */
  applyFrame(value: number, direction: ExpandDirection): void;
  
  /**
   * 判断是否反向
   * @param direction - 扩展方向
   * @returns 是否反向
   */
  isReverse(direction: ExpandDirection): boolean;
}

/**
 * 向量接口
 */
export interface Vector {
  x: number;
  y: number;
  
  /**
   * 旋转90度顺时针
   * @returns 旋转后的向量
   */
  rotate90CW(): Vector;
  
  /**
   * 向量投影
   * @param targetVector - 目标向量
   * @returns 投影向量
   */
  projectionOn(targetVector: Vector): Vector;
  
  /**
   * 向量相加
   * @param vector - 要相加的向量
   * @returns 相加后的向量
   */
  add(vector: Vector): Vector;
}

/**
 * 形状对象接口
 */
export interface VShape {
  /** 形状属性 */
  attrs: {
    /** 形状数据 */
    data: {
      /** 尺寸信息 */
      dimInfo: DimensionInfo;
    };
    /** 机器人对象（框架） */
    robot?: {
      /** 顶部框架 */
      topFrame: TopFrame;
      /** 绘制方法 */
      draw(view: View): void;
    };
  };
}

/**
 * 视图接口
 */
export interface View {
  /** 形状管理器 */
  shapeManager: ShapeManager;
  /** 尺寸管理器 */
  dimManager: DimensionManager;
  /** 状态管理器 */
  mometoManager: MomentoManager;
  /** 事件总线 */
  eventBus: EventBus;
  
  /** 刷新视图 */
  refresh(): void;
}

/**
 * 形状管理器接口
 */
export interface ShapeManager {
  /** 形状映射 */
  shapem: Map<string, VShape>;
  
  /** 更新总宽度 */
  updateTotalWidth(): void;
  
  /** 更新总高度 */
  updateTotalHeight(): void;
  
  /** 刷新墙体 */
  refreshWalls(): void;
}

/**
 * 尺寸管理器接口
 */
export interface DimensionManager {
  /** 尺寸模式 */
  mode: number;
  
  /**
   * 根据名称更新尺寸
   * @param name - 尺寸名称
   * @param value - 尺寸值
   */
  updateDimByName(name: string, value: number): void;
}

/**
 * 状态管理器接口
 */
export interface MomentoManager {
  /** 创建检查点 */
  checkPoint(): void;
  
  /** 恢复到上一个状态 */
  recoverLast(): void;
}

/**
 * 事件总线接口
 */
export interface EventBus {
  /**
   * 触发事件
   * @param event - 事件对象
   */
  emit(event: EventPayload): void;
}

/**
 * 事件载荷接口
 */
export interface EventPayload {
  /** 事件类型 */
  type: EventType;
  /** 事件数据 */
  payload: unknown;
}

/**
 * 鼠标事件接口
 */
export interface MouseEvent {
  /** 事件目标 */
  target: VShape;
  /** 原始事件对象 */
  evt: {
    /** 页面X坐标 */
    pageX: number;
    /** 页面Y坐标 */
    pageY: number;
  };
}

/**
 * 编辑尺寸标注工具类
 * 用于处理尺寸标注的交互式编辑，包括拖动调整和双击编辑
 */
export class EditDimTool extends Tool {
  /** 视图对象引用 */
  private readonly view: View;
  
  /** 上一次鼠标位置 */
  private prevPt: Point;
  
  /** 当前操作的形状对象 */
  private vshape?: VShape;
  
  /**
   * 构造函数
   * @param view - 视图对象
   */
  constructor(view: View);
  
  /**
   * 获取当前尺寸信息
   * @returns 当前尺寸信息对象
   */
  get curDimInfo(): DimensionInfo;
  
  /**
   * 获取当前框架
   * @returns 顶部框架对象
   */
  get frame(): TopFrame;
  
  /**
   * 获取所有尺寸信息
   * @returns 所有尺寸信息数组
   */
  get allDimInfos(): DimensionInfo[];
  
  /**
   * 拖动开始事件处理
   * @param event - 鼠标事件对象
   */
  dragstart(event: MouseEvent): void;
  
  /**
   * 拖动移动事件处理
   * 实时更新尺寸标注的偏移位置
   * @param event - 鼠标事件对象
   */
  dragmove(event: MouseEvent): void;
  
  /**
   * 鼠标操作完成事件处理
   * 创建撤销/重做检查点
   * @param event - 鼠标事件对象
   */
  mousedone(event: MouseEvent): void;
  
  /**
   * 双击事件处理
   * 根据尺寸类型显示对应的编辑器
   * @param event - 鼠标事件对象
   */
  dbclick(event: MouseEvent): void;
  
  /**
   * 编辑尺寸名称
   * @param dimInfo - 尺寸信息对象
   * @param event - 鼠标事件对象
   */
  private editDimName(dimInfo: DimensionInfo, event: MouseEvent): void;
  
  /**
   * 触发尺寸编辑事件
   * @param event - 原始事件对象
   * @param style - 编辑器样式
   * @param isVertical - 是否为垂直方向
   */
  private emitDimEdit(
    event: Event,
    style?: EditorStyle,
    isVertical?: boolean
  ): void;
  
  /**
   * 尺寸编辑确认回调
   * 应用用户输入的新尺寸值
   * @param newValue - 新的尺寸值
   * @param oldValue - 旧的尺寸值
   * @param direction - 扩展方向
   */
  private onConfirm(
    newValue: number,
    oldValue: number,
    direction: ExpandDirection
  ): void;
  
  /**
   * 查找尺寸所在的边缘
   * @param dimInfo - 尺寸信息对象
   * @returns 边缘对象
   */
  private findEdgeOn(dimInfo: DimensionInfo): Edge;
  
  /**
   * 判断是否为中间尺寸标注
   * 中间尺寸标注允许双向扩展
   * @param dimInfo - 尺寸信息对象
   * @returns 是否为中间尺寸
   */
  private isMiddleDim(dimInfo: DimensionInfo): boolean;
  
  /**
   * 统计边缘上的尺寸数量
   * @param edgeIdx - 边缘索引
   * @param dimType - 尺寸类型
   * @returns 尺寸数量
   */
  private countDimsOnEdge(edgeIdx: number, dimType: DimType): number;
  
  /**
   * 扩展中横档尺寸
   * 处理中横档尺寸的双向或单向扩展
   * @param dimInfo - 尺寸信息对象
   * @param diff - 尺寸差值
   * @param direction - 扩展方向
   * @param edge - 边缘对象
   */
  private expandMullionDim(
    dimInfo: DimensionInfo,
    diff: number,
    direction: ExpandDirection,
    edge: Edge
  ): void;
  
  /**
   * 获取中横档尺寸信息
   * @param dimInfo - 当前尺寸信息
   * @param direction - 扩展方向
   * @param edge - 边缘对象
   * @returns 相邻的中横档尺寸信息，如果不存在则返回 undefined
   */
  private fetchMullionDimInfo(
    dimInfo: DimensionInfo,
    direction: ExpandDirection,
    edge: Edge
  ): DimensionInfo | undefined;
  
  /**
   * 判断边缘是否为垂直方向
   * 根据切线角度判断
   * @param edge - 边缘对象
   * @returns 是否为垂直方向
   */
  private isVertical(edge: Edge): boolean;
  
  /**
   * 判断是否需要反转中横档尺寸索引
   * @param edge - 边缘对象
   * @param isRightOrDown - 是否为向右或向下方向
   * @returns 是否需要反转
   */
  private reverseMulDimIdxRequired(
    edge: Edge,
    isRightOrDown: boolean
  ): boolean;
  
  /**
   * 更新总尺寸标注
   * 更新宽度和高度的总尺寸标注
   */
  private updateTotalSizeDim(): void;
}

/**
 * 边缘接口
 */
export interface Edge {
  /**
   * 获取起始切线
   * @returns 切线向量
   */
  tangentInStart(): Tangent;
}

/**
 * 切线接口
 */
export interface Tangent {
  /** X分量 */
  x: number;
  /** Y分量 */
  y: number;
  
  /**
   * 获取斜率（以弧度表示）
   * @returns 斜率角度
   */
  slope(): number;
}

// 别名导出，保持向后兼容
export const LeftOrUp = ExpandDirection.LeftOrUp;
export const RightOrDown = ExpandDirection.RightOrDown;
export const BothSide = ExpandDirection.BothSide;