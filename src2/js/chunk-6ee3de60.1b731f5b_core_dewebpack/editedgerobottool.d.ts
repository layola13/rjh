/**
 * EditEdgeRobotTool - 用于编辑机器人边缘点的交互工具
 * 支持拖拽顶点、吸附对齐、实时预览等功能
 */

import Point from './Point';
import { Tool, ToolType } from './Tool';
import { EventType } from './EventType';
import { ShapeHelper } from './ShapeHelper';
import { ShapeActor } from './ShapeActor';
import { EditSplitterTool } from './EditSplitterTool';

/**
 * 顶点数据接口
 */
interface VertexData {
  /** 顶点坐标 */
  vertex: Point;
  /** 顶点标识ID */
  hid: string;
  /** 顶点索引 */
  idx: number;
  /** 是否为弧形边 */
  arc: boolean;
}

/**
 * 机器人图形接口
 */
interface RobotShape {
  /** 帧管理器 */
  fm: {
    host: {
      topFrame: unknown;
    };
  };
  /** 隐藏图形 */
  hide(): void;
  /** 拖拽处理 */
  drag(offset: Vector, idx: number, arc: boolean, shiftKey: boolean, point: Point): void;
}

/**
 * 可视化图形接口
 */
interface VShape {
  attrs: {
    /** 机器人数据 */
    robData: VertexData;
    /** 关联的机器人图形 */
    robot?: RobotShape;
  };
}

/**
 * 拖拽事件接口
 */
interface DragEvent {
  /** 事件目标 */
  target: VShape;
  /** 原生事件 */
  evt: {
    shiftKey: boolean;
  };
  shiftKey: boolean;
}

/**
 * 视图管理器接口
 */
interface View {
  /** 备忘录管理器，用于撤销/重做 */
  mometoManager: {
    checkPoint(): void;
  };
  /** 图形管理器 */
  shapeManager: {
    /** 吸附顶点到最近的捕捉点 */
    snapVertex(point: Point, excludeId: string): Point | null;
  };
  /** 事件总线 */
  eventBus: {
    emit(event: { type: EventType; payload: { moving: boolean } }): void;
  };
}

/**
 * 向量类型
 */
interface Vector {
  x: number;
  y: number;
  add(other: Vector): Vector;
  translate(offset: Vector): Point;
}

/**
 * EditEdgeRobotTool - 机器人边缘编辑工具
 * 继承自基础Tool类，提供顶点拖拽、吸附对齐等功能
 */
export declare class EditEdgeRobotTool extends Tool {
  /** 视图引用 */
  private readonly view: View;
  
  /** 上一次鼠标位置 */
  private prevPt: Point;
  
  /** 偏移向量（鼠标点击位置与顶点的偏移） */
  private offvec: Vector;
  
  /** 当前拖拽的顶点图形 */
  private vshape?: VShape;

  /**
   * 构造函数
   * @param view - 视图实例
   */
  constructor(view: View);

  /**
   * 拖拽开始事件处理
   * 记录初始状态和偏移量
   * @param event - 拖拽事件
   */
  dragstart(event: DragEvent): void;

  /**
   * 拖拽移动事件处理
   * 使用requestAnimationFrame优化性能
   * @param event - 拖拽事件
   */
  dragmove(event: DragEvent): void;

  /**
   * 鼠标释放事件处理
   * 完成拖拽操作，创建撤销检查点，触发结构变更事件
   * @param event - 鼠标事件
   */
  mousedone(event: MouseEvent): void;

  /**
   * 执行拖拽任务
   * 更新顶点位置，处理吸附，触发机器人图形更新
   * @param shiftKey - 是否按下Shift键（约束模式）
   * @param isFinished - 是否为最终提交（默认false）
   */
  private doTask(shiftKey: boolean, isFinished?: boolean): void;

  /**
   * 显示吸附效果
   * @param excludeId - 排除的顶点ID（避免自身吸附）
   * @param vertex - 当前顶点位置
   * @param isFinished - 是否为最终提交
   * @returns 吸附偏移向量（仅在isFinished为true时返回）
   */
  private showSnap(excludeId: string, vertex: Point, isFinished: boolean): Vector | undefined;

  /**
   * 隐藏所有吸附提示
   * @private
   */
  private hideSnaps(): void;

  /**
   * 显示圆形吸附提示
   * @param point - 吸附点位置
   * @private
   */
  private displayCircleSnap(point: Point): void;
}