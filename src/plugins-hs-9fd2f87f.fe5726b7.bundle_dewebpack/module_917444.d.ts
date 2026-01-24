/**
 * 角窗（转角窗）编辑命令
 * 用于处理转角窗户的参数编辑、尺寸调整和交互操作
 */

import type { Command } from 'HSApp/Cmd/Command';

/**
 * 2D向量坐标接口
 */
interface Vec2Coordinate {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 转角窗参数接口
 */
interface CornerWindowParameters {
  /** A侧长度（毫米） */
  sideA?: number;
  /** B侧长度（毫米） */
  sideB?: number;
  /** C侧长度（毫米） */
  sideC?: number;
  /** D侧长度（毫米） */
  sideD?: number;
}

/**
 * Gizmo操作参数接口
 */
interface GizmoParameter {
  /** 方向向量 */
  Dir: Vec2Coordinate;
  /** 编辑标志，指示正在编辑的边 */
  EditFlag: HSCore.Model.CornerWindowParamsEnum;
}

/**
 * 目标尺寸和偏移量接口
 */
interface TargetSizeAndOffset {
  /** X轴偏移量 */
  x: number;
  /** Y轴偏移量 */
  y: number;
}

/**
 * 事务会话接口
 */
interface TransactionSession {
  /** 提交会话 */
  commit(): void;
  /** 中止会话 */
  abort(): void;
}

/**
 * 拖拽移动事件数据
 */
interface DragMoveEventData {
  /** 偏移量 [x, y] */
  offset: [number, number];
}

/**
 * 滑块拖拽事件数据
 */
interface SliderDragEventData {
  /** 更新后的参数 */
  parameters: CornerWindowParameters;
}

/**
 * 墙体尺寸信息接口
 */
interface WallDimension {
  /** 墙体列表 */
  walls: unknown[];
}

/**
 * 相邻点信息接口
 */
interface AdjacentPointInfo {
  /** 起点坐标 */
  start: Vec2Coordinate;
  /** 终点坐标 */
  end: Vec2Coordinate;
}

/**
 * 转角窗编辑命令类
 * 继承自应用基础命令类，处理转角窗户的所有编辑操作
 */
declare class EditCornerWindowCommand extends Command {
  /** 当前编辑的转角窗实例 */
  private _cornerWindow: unknown;
  
  /** 初始参数（用于撤销/恢复） */
  private _parametersInitial: CornerWindowParameters;
  
  /** 初始X坐标 */
  private _xInitial: number;
  
  /** 初始Y坐标 */
  private _yInitial: number;
  
  /** 请求类型标识 */
  private _requestType: HSFPConstants.RequestType;
  
  /** 当前参数 */
  private _parameters: CornerWindowParameters;
  
  /** 目标尺寸（可选） */
  private _targetSize?: TargetSizeAndOffset;
  
  /** Gizmo操作参数 */
  private _gizmoParam?: GizmoParameter;
  
  /** 当前事务会话 */
  private _session?: TransactionSession;

  /**
   * 构造函数
   * @param cornerWindow - 要编辑的转角窗对象
   * @param parameters - 新的窗户参数
   * @param targetSize - 目标尺寸和位置（可选）
   * @param gizmoParam - Gizmo交互参数（可选）
   * @param context - 上下文对象（可选，用于保持签名兼容性）
   */
  constructor(
    cornerWindow: unknown,
    parameters: CornerWindowParameters,
    targetSize?: TargetSizeAndOffset,
    gizmoParam?: GizmoParameter,
    context?: unknown
  );

  /**
   * 执行命令
   * 如果有目标尺寸则立即提交请求并完成；否则启动事务会话
   */
  onExecute(): void;

  /**
   * 提交编辑请求到事务管理器
   * @param offset - 位置偏移量（可选）
   */
  private _commitRequest(offset?: TargetSizeAndOffset): void;

  /**
   * 检查命令是否支持撤销/重做
   * @returns 始终返回false（该命令通过事务管理器处理撤销重做）
   */
  canUndoRedo(): boolean;

  /**
   * 清理资源
   * 中止未完成的事务会话
   */
  onCleanup(): void;

  /**
   * 接收并处理交互事件
   * @param eventType - 事件类型
   * @param eventData - 事件数据
   * @returns 是否成功处理事件
   */
  onReceive(
    eventType: 'dragmove' | 'dragend' | 'sliderdragmove' | 'sliderdragend' | string,
    eventData?: DragMoveEventData | SliderDragEventData
  ): boolean;

  /**
   * 根据偏移量计算目标尺寸
   * 处理不同类型的窗户（凸窗、普通转角窗）的尺寸计算逻辑
   * @param offset - 拖拽偏移量 [x, y]
   * @returns 计算后的目标尺寸和位置偏移
   */
  private _getTargetSizeAndOffset(offset: [number, number]): TargetSizeAndOffset;

  /**
   * 获取墙体上允许的最大移动长度
   * 防止窗户超出墙体边界或与相邻开口重叠
   * @param windowHole - 窗洞对象
   * @param wallDimension - 墙体尺寸信息
   * @returns 最大允许长度（单位：毫米）
   */
  private _getMaxMoveLength(windowHole: unknown, wallDimension: WallDimension): number;

  /**
   * 计算左右移动时的最大偏移量
   * 确保窗户不会超出墙体边界
   * @param isLeft - 是否向左移动
   * @param targetOffset - 目标偏移量
   * @returns 修正后的安全偏移量
   */
  private _getMaxMoveOffsetLeftOrRight(
    isLeft: boolean,
    targetOffset: TargetSizeAndOffset
  ): TargetSizeAndOffset;

  /**
   * 获取命令描述（用于日志和UI显示）
   * @returns 描述字符串，例如 "编辑窗户的sideA, sideB" 或 "编辑窗户的恢复默认"
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 内容操作类别标识
   */
  getCategory(): HSFPConstants.LogGroupTypes;

  /**
   * 检查命令是否可以被挂起
   * @returns 始终返回false（该命令必须立即执行完成）
   */
  canSuspend(): boolean;
}

/**
 * 导出默认命令类
 */
export default EditCornerWindowCommand;

/**
 * 全局命名空间声明（依赖的外部类型）
 */
declare global {
  namespace HSFPConstants {
    enum RequestType {
      EditCornerWindow = 'EditCornerWindow'
    }
    
    enum LogGroupTypes {
      ContentOperation = 'ContentOperation'
    }
  }

  namespace HSCore.Model {
    enum CornerWindowParamsEnum {
      sideA = 'sideA',
      sideB = 'sideB',
      sideC = 'sideC',
      sideD = 'sideD'
    }
  }

  namespace HSConstants {
    enum ModelClass {
      NgBayWindow = 'NgBayWindow',
      NgPOrdinaryWindow = 'NgPOrdinaryWindow'
    }
  }

  namespace GeLib.MathUtils {
    function largerOrEqual(a: number, b: number): boolean;
  }

  namespace HSCore.Util.Math {
    class Vec2 {
      x: number;
      y: number;
      
      constructor(x: number, y: number);
      normalize(): void;
      clone(): Vec2;
      scale(factor: number): Vec2;
      add(other: Vec2): Vec2;
      subtract(other: Vec2 | Vec2Coordinate): Vec2;
      magnitude(): number;
      
      static fromCoordinate(coord: Vec2Coordinate): Vec2;
      static dot(v1: Vec2, v2: Vec2): number;
      static distance(v1: Vec2 | Vec2Coordinate, v2: Vec2Coordinate): number;
      static lerp(v1: Vec2, v2: Vec2Coordinate, t: number): Vec2Coordinate;
    }
  }

  namespace HSCore.Util.Geometry {
    function getWallDimension(wall: unknown): WallDimension;
  }

  namespace HSApp.Util.Opening {
    function getSecondHostWallForCornerWindow(cornerWindow: unknown): unknown | null;
    function getClosestAdjacentPointOnWall(
      opening: unknown,
      dimensionType: HSApp.App.DimensionTypeEnum,
      walls?: unknown[]
    ): AdjacentPointInfo | null;
  }

  namespace HSApp.App {
    enum DimensionTypeEnum {
      inner = 'inner'
    }
  }

  namespace HSApp.Cmd {
    class Command {
      context: {
        transManager: {
          startSession(options: { undoRedo: boolean }): TransactionSession;
          createRequest(type: string, args: unknown[]): unknown;
          commit(request: unknown, immediate: boolean): void;
        };
      };
      mgr: {
        complete(command: Command): void;
      };
    }
  }
}