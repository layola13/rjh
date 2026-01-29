/**
 * 管道尺寸标注 Gizmo 类型声明
 * 用于在3D视图中显示和编辑管道的线性尺寸标注
 */

import type { Vector3, Line3 } from 'three';
import type { HSCore } from '@/core';
import type { HSApp } from '@/app';

/**
 * 线性尺寸标注类型枚举
 */
declare enum LinearDimensionType {
  /** 顶部标注 */
  top = 'top',
  /** 底部标注 */
  bottom = 'bottom',
  /** 左侧标注 */
  left = 'left',
  /** 右侧标注 */
  right = 'right',
  /** 后侧标注 */
  back = 'back',
  /** 前侧标注 */
  front = 'front',
}

/**
 * 点标记类型枚举
 */
declare enum WebGLPointMarkerType {
  /** 左上顶点 */
  upLeftTop = 'upLeftTop',
}

/**
 * 3D坐标点接口
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 2D坐标点接口
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 边界矩形接口
 */
interface BoundingSquare {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
}

/**
 * 边界盒接口
 */
interface BoundingBox {
  square: BoundingSquare;
}

/**
 * 线性尺寸数据接口
 */
interface LinearDimensionData {
  /** 起点坐标 */
  start?: Vector3;
  /** 终点坐标 */
  end?: Vector3;
  /** 交点坐标 */
  intersect?: Vector3;
  /** 关联的线段 */
  line?: Line3;
  /** 参数2（用于线段计算） */
  param2?: number;
}

/**
 * 碰撞检测结果接口
 */
interface CollisionResult {
  /** 交点坐标 */
  intersect: Vector3;
  /** 碰撞线段 */
  line: Line3;
  /** 线段参数1 */
  param1: number;
  /** 线段参数2 */
  param2: number;
  /** 碰撞类型 */
  type: 'content' | 'wall';
  /** 碰撞的内容对象 */
  content?: HSCore.Model.ConcealedWorkTube;
}

/**
 * 管道轴向方向接口
 */
interface TubeAxisDirection {
  /** X轴方向 */
  axisX: boolean;
  /** Y轴方向 */
  axisY: boolean;
  /** Z轴方向 */
  axisZ: boolean;
}

/**
 * 偏移量接口
 */
interface Offset3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 目标位置接口
 */
interface TargetPosition {
  x: number;
  y: number;
}

/**
 * 尺寸变更事件数据接口
 */
interface DimensionChangeEventData {
  /** 新值 */
  value: number;
  /** 旧值 */
  oldValue: number;
  /** 关联的尺寸对象 */
  dim: TubeLinearDimension;
}

/**
 * 设置变更事件数据接口
 */
interface SettingChangeEventData {
  data: {
    /** 字段名称 */
    fieldName: string;
    /** 旧值 */
    oldValue: unknown;
    /** 新值 */
    value: unknown;
  };
}

/**
 * 单个管道线性尺寸标注类
 */
declare class TubeLinearDimension {
  /** 标注类型 */
  readonly type: LinearDimensionType;
  
  /** 起点坐标 */
  start?: Vector3;
  
  /** 终点坐标 */
  end?: Vector3;
  
  /** 是否可见 */
  visible: boolean;

  /**
   * 构造函数
   * @param context - 上下文对象
   * @param canvas - 画布元素
   * @param content - 管道内容对象
   * @param type - 标注类型
   */
  constructor(
    context: unknown,
    canvas: unknown,
    content: HSCore.Model.ConcealedWorkTube,
    type: LinearDimensionType
  );

  /**
   * 更新尺寸数据
   * @param data - 线性尺寸数据
   */
  updateDimensionData(data: LinearDimensionData): void;

  /**
   * 显示标注
   */
  show(): void;

  /**
   * 隐藏标注
   */
  hide(): void;

  /**
   * 内容字段变更时的回调
   */
  onContentFieldChange(): void;
}

/**
 * WebGL点标记类
 */
declare class WebGLPointMarker {
  /** 标记类型 */
  readonly type: WebGLPointMarkerType;

  /**
   * 构造函数
   * @param context - 上下文对象
   * @param canvas - 画布元素
   * @param content - 管道内容对象
   * @param type - 标记类型
   */
  constructor(
    context: unknown,
    canvas: unknown,
    content: HSCore.Model.ConcealedWorkTube,
    type: WebGLPointMarkerType
  );

  /**
   * 初始化标记
   * @param position - 中心位置
   * @param directions - 方向向量数组
   */
  init(position: Vector3, directions: Vector3[]): void;

  /**
   * 更新网格
   */
  updateMesh(): void;
}

/**
 * 管道尺寸标注控制器
 * 负责管理管道位置拖拽和尺寸更新
 */
declare class TubeDimensionController {
  /** 管道拾取偏移量 */
  private tubePickOffset?: Offset3D;
  
  /** 管道位置 */
  private tubePosition: Point3D;
  
  /** 关联的管道内容对象 */
  protected readonly content: HSCore.Model.ConcealedWorkTube;
  
  /** 上下文对象 */
  protected readonly context: unknown;

  /**
   * 构造函数
   * @param content - 管道内容对象
   * @param context - 上下文对象
   * @param pickPosition - 拾取位置
   */
  constructor(
    content: HSCore.Model.ConcealedWorkTube,
    context: unknown,
    pickPosition: Point3D
  );

  /**
   * 获取内容中心位置（包含偏移）
   */
  get contentPosition(): Vector3;

  /**
   * 根据尺寸值计算目标位置
   * @param dimension - 尺寸对象
   * @param value - 尺寸值
   * @returns 目标位置
   */
  targetWithDimValue(dimension: TubeLinearDimension, value: number): TargetPosition;

  /**
   * 分发尺寸变更事件
   * @param event - 事件对象
   */
  dispatch(event: { data: DimensionChangeEventData }): void;

  /**
   * 移动管道
   * @param target - 目标位置
   * @private
   */
  private _move(target?: Partial<Point3D>): void;
}

/**
 * 管道尺寸标注 Gizmo 主类
 * 负责显示和管理管道的所有线性尺寸标注
 */
declare class TubeDimensionGizmo {
  /** 尺寸标注控制器 */
  private readonly controller: TubeDimensionController;
  
  /** 线性尺寸标注映射表 */
  private readonly lineDimensions: Map<LinearDimensionType, TubeLinearDimension>;
  
  /** 点标记数组 */
  private readonly pointMarkers: WebGLPointMarker[];
  
  /** 管道所在房间 */
  private room?: HSCore.Model.Room;
  
  /** 是否启用 */
  private isEnabled: boolean;
  
  /** 是否需要更新 */
  private dirty: boolean;
  
  /** 上下文对象 */
  protected readonly context: unknown;
  
  /** 管道内容对象 */
  protected readonly content: HSCore.Model.ConcealedWorkTube;

  /**
   * 构造函数
   * @param context - 上下文对象
   * @param canvas - 画布元素
   * @param content - 管道内容对象
   * @param pickPosition - 拾取位置
   */
  constructor(
    context: unknown,
    canvas: unknown,
    content: HSCore.Model.ConcealedWorkTube,
    pickPosition: Point3D
  );

  /**
   * 获取管道位置（包含控制器偏移）
   */
  get tubePosition(): Vector3;

  /**
   * 获取管道轮廓多边形（2D投影）
   */
  get tubeOutline(): Point2D[];

  /**
   * 获取管道边界盒
   */
  get tubeBoundingBox(): BoundingBox;

  /**
   * 更新所有尺寸标注数据
   */
  updateDimensionData(): void;

  /**
   * 根据标注类型获取线性尺寸数据
   * @param type - 标注类型
   * @returns 尺寸数据
   */
  getLinearDimensionDataByType(type: LinearDimensionType): LinearDimensionData | undefined;

  /**
   * 绘制标注（每帧调用）
   */
  draw(): void;

  /**
   * 遍历碰撞检测的内容对象
   * @param callback - 回调函数
   */
  forEachCollisionContent(callback: (content: HSCore.Model.ConcealedWorkTube) => void): void;

  /**
   * 显示标注
   */
  show(): void;

  /**
   * 隐藏标注
   */
  hide(): void;

  /**
   * 添加子级 Gizmo
   * @param child - 子 Gizmo
   */
  addChildGizmo(child: TubeLinearDimension | WebGLPointMarker): void;

  /**
   * 尺寸更新回调
   */
  onDimensionUpdate(): void;

  /**
   * 值变更回调
   */
  onValueChanged(): void;

  /**
   * 初始化子级 Gizmo
   * @param context - 上下文对象
   * @param canvas - 画布元素
   * @param content - 管道内容对象
   * @private
   */
  private _initChildenGizmo(
    context: unknown,
    canvas: unknown,
    content: HSCore.Model.ConcealedWorkTube
  ): void;

  /**
   * 初始化点标记
   * @param context - 上下文对象
   * @param canvas - 画布元素
   * @param content - 管道内容对象
   * @returns 点标记映射表
   * @private
   */
  private _initPointMarkers(
    context: unknown,
    canvas: unknown,
    content: HSCore.Model.ConcealedWorkTube
  ): Map<WebGLPointMarkerType, WebGLPointMarker>;

  /**
   * 更新点标记位置
   * @param markers - 点标记映射表
   * @private
   */
  private _updatePointMarkers(markers: Map<WebGLPointMarkerType, WebGLPointMarker>): void;

  /**
   * 获取与边界盒碰撞的内容对象
   * @param boundingBox - 边界盒
   * @param type - 标注类型
   * @param tolerance - 容差值，默认 1e-6
   * @returns 碰撞的内容对象数组
   * @private
   */
  private _getCollisionContents(
    boundingBox: BoundingBox,
    type: LinearDimensionType,
    tolerance?: number
  ): HSCore.Model.ConcealedWorkTube[];

  /**
   * 获取最近的碰撞线段
   * @param contents - 内容对象数组
   * @param line - 检测线段
   * @param type - 标注类型
   * @returns 碰撞结果
   * @private
   */
  private _getClosestCollisionLine(
    contents: HSCore.Model.ConcealedWorkTube[],
    line: Line3,
    type: LinearDimensionType
  ): CollisionResult | undefined;

  /**
   * 获取与墙体的碰撞点
   * @param line - 检测线段
   * @returns 碰撞结果
   * @private
   */
  private _getCollisionPointToWall(line: Line3): CollisionResult | undefined;

  /**
   * 设置变更回调
   * @param event - 事件对象
   * @private
   */
  private _onSettingChanged(event: SettingChangeEventData): void;

  /**
   * 刷新内容边界
   * @private
   */
  private _refreshContentBound(): void;

  /**
   * 获取点所在的房间
   * @param position - 3D位置
   * @returns 房间对象
   * @private
   */
  private _getRoomContentIn(position: Point3D): HSCore.Model.Room | undefined;

  /**
   * 更新管道所在房间
   * @private
   */
  private _updateContentRoom(): void;

  /**
   * 获取房间高度
   * @param room - 房间对象
   * @returns 高度值
   * @private
   */
  private _getRoomHeight(room: HSCore.Model.Room): number;

  /**
   * 判断是否需要过滤该标注类型（立面图视角下）
   * @param type - 标注类型
   * @returns 是否需要过滤
   * @private
   */
  private _needFilterDimType(type: LinearDimensionType): boolean;
}

export default TubeDimensionGizmo;
export { TubeDimensionController, TubeLinearDimension, WebGLPointMarker };
export type {
  LinearDimensionType,
  WebGLPointMarkerType,
  Point3D,
  Point2D,
  BoundingBox,
  BoundingSquare,
  LinearDimensionData,
  CollisionResult,
  TubeAxisDirection,
  Offset3D,
  TargetPosition,
  DimensionChangeEventData,
  SettingChangeEventData,
};