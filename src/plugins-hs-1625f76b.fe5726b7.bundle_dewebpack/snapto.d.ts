/**
 * 2D视图下的内容缩放捕捉命令
 * 支持墙体捕捉、三角板捕捉等多种捕捉策略
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';
import { HSMath } from './HSMath';
import { HSCatalog } from './HSCatalog';
import { ClipTaskIntergration } from './ClipTaskIntergration';

/**
 * 尺寸向量
 */
export interface SizeVector {
  /** X轴尺寸 */
  x: number;
  /** Y轴尺寸 */
  y: number;
  /** Z轴尺寸 */
  z: number;
}

/**
 * 坐标点
 */
export interface Point2D {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 拖拽控制点（Gizmo）方向
 */
export interface DraggingGizmo {
  /** X方向：-1(左), 0(无), 1(右) */
  x: -1 | 0 | 1;
  /** Y方向：-1(下), 0(无), 1(上) */
  y: -1 | 0 | 1;
}

/**
 * 目标尺寸和偏移量
 */
export interface TargetSizeAndOffset {
  /** 目标尺寸 */
  targetSize: Partial<SizeVector>;
  /** 移动偏移量 */
  offset: Point2D;
}

/**
 * 实体自定义尺寸配置
 */
export interface EntityCustomizeSize {
  /** 是否启用缩放 */
  enableScale: boolean;
  /** 缩放步长 */
  step: number;
  /** X轴尺寸配置 */
  xSize: {
    /** 是否可缩放 */
    isScalable: boolean;
    /** 尺寸范围 [min, max] */
    range?: [number, number];
  };
  /** Y轴尺寸配置 */
  ySize: {
    isScalable: boolean;
    range?: [number, number];
  };
  /** Z轴尺寸配置 */
  zSize: {
    isScalable: boolean;
    range?: [number, number];
  };
}

/**
 * 基础内容属性
 */
export interface ContentBase {
  x: number;
  y: number;
  z: number;
  XSize: number;
  YSize: number;
  ZSize: number;
}

/**
 * 拖拽移动事件数据
 */
export interface DragMoveEvent {
  /** 偏移量 [x, y] 或 [x, y, z] */
  offset?: [number, number] | [number, number, number];
}

/**
 * 调整尺寸事件数据
 */
export interface ResizeEvent {
  x?: number;
  y?: number;
  z?: number;
  /** 是否忽略验证 */
  ignoreValidate?: boolean;
}

/**
 * 移动到位置事件数据
 */
export interface MoveToEvent {
  /** 目标位置 */
  position: HSMath.Vector2;
  /** 是否捕捉 */
  snap: boolean;
}

/**
 * 捕捉策略配置
 */
export interface SnappingStrategyConfig {
  /** 捕捉回调函数 */
  doSnappingCallback?: (offset: [number, number] | [number, number, number]) => void;
  /** 内容验证回调函数 */
  vialidatorCallback?: (content: HSCore.Model.Content) => boolean;
}

/**
 * 捕捉配置参数
 */
export interface SnappingParams {
  /** 捕捉偏移阈值 */
  snapOffset: number;
  /** 是否启用自动适配 */
  autoFitEnable: boolean;
  /** 是否忽略捕捉偏移 */
  ignoreSnapOffset: boolean;
  /** 是否不捕捉Z轴 */
  notZ: boolean;
  /** 固定的Z轴值 */
  fixedZValue: number;
  /** 拖拽方向 */
  draggingGizmo: any; // Vector2
}

/**
 * 墙体邻接点信息
 */
export interface AdjacentWallPoints {
  /** 起始点 */
  start: Point2D & { add(offset: Point2D): void };
  /** 结束点 */
  end: Point2D & { add(offset: Point2D): void };
}

/**
 * 命令执行会话
 */
export interface TransactionSession {
  /** 提交会话 */
  commit(): void;
  /** 中止会话 */
  abort(): void;
}

/**
 * 事务请求
 */
export interface TransactionRequest {
  /** 接收事件 */
  receive(event: string, data: any): void;
}

/**
 * 事务管理器
 */
export interface TransactionManager {
  /** 开始会话 */
  startSession(options: { undoRedo: boolean }): TransactionSession;
  /** 创建请求 */
  createRequest(requestType: string, args: unknown[]): TransactionRequest;
  /** 提交请求 */
  commit(request: TransactionRequest, immediate?: boolean): void;
}

/**
 * 命令执行上下文
 */
export interface CommandContext {
  /** 事务管理器 */
  transManager: TransactionManager;
}

/**
 * 命令管理器
 */
export interface CommandManager {
  /** 完成命令 */
  complete(command: unknown): void;
}

/**
 * 日志参数
 */
export interface LogParams {
  /** 活动分组 */
  activeSection: string;
  /** 活动分组名称 */
  activeSectionName: string;
  /** 点击比率信息 */
  clicksRatio: {
    id: string;
    name: string;
    subItem: {
      id: string;
      name: string;
    };
  };
}

/**
 * 2D视图下内容缩放捕捉命令类
 * 支持内容（家具、门窗等）在2D视图中的拖拽缩放，并提供墙体、三角板等捕捉功能
 */
export default class ContentResizeCommand extends HSApp.Cmd.Command {
  /** 操作的内容对象 */
  private _content: HSCore.Model.Content;
  
  /** 请求类型 */
  private _requestType: string;
  
  /** 目标尺寸 */
  private _targetSize?: Partial<SizeVector>;
  
  /** 拖拽控制点方向 */
  private _draggingGizmo: DraggingGizmo;
  
  /** 命令输出（等同于_content） */
  public output: HSCore.Model.Content;
  
  /** 内容的子内容集合 */
  private _contents: Record<string, unknown>;
  
  /** 初始X坐标 */
  private _xInitial: number;
  
  /** 初始Y坐标 */
  private _yInitial: number;
  
  /** 初始X轴尺寸 */
  private _initXSize: number;
  
  /** 内容基础属性快照 */
  private _contentBase?: ContentBase;
  
  /** 事务会话 */
  private _session?: TransactionSession;
  
  /** 门洞移动请求 */
  private _openingRequest?: TransactionRequest;
  
  /** 捕捉辅助器 */
  private snappingHelper?: HSApp.Snapping.Helper;
  
  /** 初始尺寸 */
  private beginSizes?: SizeVector;
  
  /** 缩放捕捉信号 */
  public signalResizeSnapped: HSCore.Util.Signal;
  
  /** 命令执行上下文 */
  public context: CommandContext;
  
  /** 命令管理器 */
  public mgr: CommandManager;

  /**
   * 构造函数
   * @param content - 要操作的内容对象
   * @param requestType - 请求类型（如ResizeContent）
   * @param targetSize - 目标尺寸（可选）
   * @param draggingGizmo - 拖拽控制点方向
   */
  constructor(
    content: HSCore.Model.Content,
    requestType: string,
    targetSize: Partial<SizeVector> | undefined,
    draggingGizmo: DraggingGizmo
  );

  /**
   * 命令执行入口
   * 初始化捕捉策略、创建事务会话
   */
  public onExecute(): void;

  /**
   * 获取内容的初始尺寸
   * @param content - 内容对象
   */
  private _getBeginSize(content: HSCore.Model.Content): void;

  /**
   * 捕捉回调函数
   * 将捕捉偏移量转换为目标尺寸和移动偏移
   * @param offset - 捕捉偏移量 [x, y] 或 [x, y, z]
   */
  private _doSnappingCallback(offset: [number, number] | [number, number, number]): void;

  /**
   * 内容验证器（用于捕捉时过滤内容）
   * 检查内容是否与当前操作的内容重叠
   * @param content - 要验证的内容
   * @returns 是否与当前内容重叠
   */
  private _contentVialidator(content: HSCore.Model.Content): boolean;

  /**
   * 清理命令资源
   * 中止事务、清空捕捉辅助器
   */
  public onCleanup(): void;

  /**
   * 是否支持撤销/重做
   * @returns false - 此命令不支持撤销重做
   */
  public canUndoRedo(): boolean;

  /**
   * 接收命令事件
   * @param event - 事件类型（dragmove/dragend等）
   * @param data - 事件数据
   * @returns 是否继续传播事件
   */
  public onReceive(event: string, data: DragMoveEvent | unknown): boolean;

  /**
   * 提交事务会话
   * 提交门洞请求和主会话
   */
  private _commitSession(): void;

  /**
   * 调整内容尺寸到步长
   * 根据自定义尺寸配置对尺寸进行步长对齐
   * @param customizeSize - 自定义尺寸配置
   */
  private _adjustContentSize(customizeSize: EntityCustomizeSize | undefined): void;

  /**
   * 生成捕捉检测多边形
   * 根据拖拽方向生成射线多边形用于碰撞检测
   * @param center - 中心点
   * @param content - 内容对象
   * @returns 多边形顶点数组
   */
  private _poly(center: Point2D, content: HSCore.Model.Content): Point2D[][];

  /**
   * 判断是否为墙体门洞
   * @param content - 内容对象
   * @returns 是否为墙体门洞
   */
  private _isWallOpening(content: HSCore.Model.Content): boolean;

  /**
   * 执行捕捉逻辑
   * 根据当前状态和捕捉策略计算捕捉结果
   */
  private _doSnapping(): void;

  /**
   * 提交缩放请求
   * @param targetSize - 目标尺寸
   * @param offset - 移动偏移量
   */
  private _commitRequest(targetSize: Partial<SizeVector>, offset?: Point2D): void;

  /**
   * 根据偏移量计算目标尺寸和移动偏移
   * @param offset - 拖拽偏移量 [x, y]
   * @returns 目标尺寸和移动偏移
   */
  private _getTargetSizeAndOffset(offset: [number, number]): TargetSizeAndOffset;

  /**
   * 获取捕捉策略列表
   * 根据内容类型返回适用的捕捉策略
   * @param helper - 捕捉辅助器
   * @returns 捕捉策略实例数组
   */
  private _getSnappingStrategies(helper: HSApp.Snapping.Helper): HSApp.Snapping.Strategy[];

  /**
   * 门洞移动偏移限制
   * 限制门洞不超出墙体边界
   * @param offset - 原始偏移量
   * @param gizmo - 拖拽方向
   * @param targetSize - 目标尺寸
   * @returns 修正后的偏移量
   */
  private _getMoveOffsetRestrictForOpening(
    offset: Point2D,
    gizmo: DraggingGizmo,
    targetSize: Partial<SizeVector>
  ): Point2D;

  /**
   * 缩放参数化模型
   * 处理楼梯、背景墙等参数化模型的特殊缩放逻辑
   */
  public resizeParametricModel(): void;

  /**
   * 命令是否可交互
   * @returns true - 命令可交互
   */
  public isInteractive(): boolean;

  /**
   * 获取命令描述
   * @returns 命令描述文本
   */
  public getDescription(): string;

  /**
   * 获取当前日志参数
   * @returns 日志参数对象
   */
  public getCurrentParams(): LogParams;

  /**
   * 获取命令分组类别
   * @returns 分组类型
   */
  public getCategory(): string;
}

/**
 * 墙体2D捕捉策略
 */
export declare class SnapToWall2D extends HSApp.Snapping.Strategy {
  static readonly ClassName: string;
  constructor(
    content: HSCore.Model.Content,
    helper: HSApp.Snapping.Helper,
    doSnappingCallback?: (offset: [number, number, number]) => void,
    vialidatorCallback?: (content: HSCore.Model.Content) => boolean
  );
}

/**
 * 三角板捕捉策略（用于吊顶电器）
 */
export declare class SnapToGusset extends HSApp.Snapping.Strategy {
  static readonly ClassName: string;
  constructor(
    content: HSCore.Model.Content,
    helper: HSApp.Snapping.Helper,
    doSnappingCallback?: (offset: [number, number, number]) => void,
    vialidatorCallback?: (content: HSCore.Model.Content) => boolean
  );
}