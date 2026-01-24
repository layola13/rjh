import { EventType } from './EventType';
import { Tool, ToolType } from './Tool';
import { ShapeHelper } from './ShapeHelper';

/**
 * 墙体边缘机器人编辑工具的属性接口
 */
interface EditWallEdgeRobotAttrs {
  /** 机器人实例 */
  robot: WallEdgeRobot;
  /** 机器人数据 */
  robData: {
    /** 边缘索引 */
    idx: number;
    /** 形状ID */
    hid: string;
    /** 是否为顶点控制 */
    vertexControl: boolean;
  };
}

/**
 * 可视化形状接口
 */
interface VShape {
  /** 形状属性 */
  attrs: EditWallEdgeRobotAttrs;
}

/**
 * 多边形边缘接口
 */
interface PolygonEdge {
  // 边缘相关属性
}

/**
 * 多边形接口
 */
interface Polygon {
  /** 多边形的所有边缘 */
  edges: PolygonEdge[];
}

/**
 * 墙体接口
 */
interface Wall {
  /** 墙体的多边形 */
  polygon: Polygon;
}

/**
 * 墙体边缘机器人接口
 */
interface WallEdgeRobot {
  /** 关联的墙体 */
  wall: Wall;
  
  /**
   * 拖拽到指定位置
   * @param point - 目标点坐标
   * @param edgeIndex - 边缘索引
   * @param isVertexControl - 是否为顶点控制
   * @param hasMagneticPoint - 是否存在磁吸点
   */
  dragTo(
    point: Point,
    edgeIndex: number,
    isVertexControl: boolean,
    hasMagneticPoint: boolean
  ): void;
}

/**
 * 二维点坐标接口
 */
interface Point {
  x: number;
  y: number;
}

/**
 * 拖拽事件接口
 */
interface DragEvent {
  /** 事件目标 */
  target: VShape;
}

/**
 * 视图管理器接口
 */
interface View {
  /** 形状管理器 */
  shapeManager: ShapeManager;
  /** 历史记录管理器 */
  mometoManager: MomentoManager;
  /** 事件总线 */
  eventBus: EventBus;
}

/**
 * 形状管理器接口
 */
interface ShapeManager {
  /**
   * 捕获顶点吸附
   * @param point - 当前点坐标
   * @param excludeId - 排除的形状ID
   * @returns 吸附点坐标，无吸附则返回undefined
   */
  snapVertex(point: Point, excludeId: string): Point | undefined;
}

/**
 * 历史记录管理器接口
 */
interface MomentoManager {
  /**
   * 检查并记录当前状态点
   */
  checkPoint(): void;
}

/**
 * 事件总线接口
 */
interface EventBus {
  /**
   * 发射事件
   * @param event - 事件对象
   */
  emit(event: WallShapeChangeEvent): void;
}

/**
 * 墙体形状变化事件接口
 */
interface WallShapeChangeEvent {
  /** 事件类型 */
  type: EventType.wall_shape_change;
  /** 事件负载 */
  payload: {
    /** 相关视图 */
    view: View;
  };
}

/**
 * 墙体边缘机器人编辑工具
 * 
 * 该工具用于编辑墙体边缘的机器人位置，支持：
 * - 顶点拖拽与吸附
 * - 边缘拖拽与吸附
 * - 实时预览
 * - 撤销/重做支持
 */
export declare class EditWallEdgeRobotTool extends Tool {
  /** 视图实例 */
  private readonly view: View;
  
  /** 当前操作的可视化形状 */
  private vshape?: VShape;
  
  /** 当前拖拽点坐标 */
  protected curPt: Point;
  
  /** 磁吸点坐标 */
  protected magneticPoint?: Point;
  
  /**
   * 构造函数
   * @param view - 视图实例
   */
  constructor(view: View);
  
  /**
   * 获取形状属性
   */
  get attrs(): EditWallEdgeRobotAttrs;
  
  /**
   * 获取机器人实例
   */
  get robot(): WallEdgeRobot;
  
  /**
   * 获取当前编辑的边缘
   */
  get edge(): PolygonEdge;
  
  /**
   * 判断是否为顶点控制模式
   */
  get isVertex(): boolean;
  
  /**
   * 拖拽开始事件处理
   * @param event - 拖拽事件
   */
  dragstart(event: DragEvent): void;
  
  /**
   * 拖拽移动事件处理
   * @param event - 拖拽事件
   */
  dragmove(event: DragEvent): void;
  
  /**
   * 鼠标操作完成事件处理
   * @param event - 鼠标事件
   */
  mousedone(event: MouseEvent): void;
  
  /**
   * 检测顶点吸附
   * 在顶点控制模式下，检测并显示可能的吸附点
   */
  private detectVertexSnaps(): void;
  
  /**
   * 检测边缘吸附
   * 在边缘控制模式下，检测并显示可能的吸附点
   */
  private detectEdgeSnaps(): void;
  
  /**
   * 执行拖拽任务
   * 更新机器人位置并触发相关事件
   */
  private doTask(): void;
  
  /**
   * 墙体形状变化通知
   * 发射墙体形状变化事件，通知其他组件更新
   */
  private wallShapeChanged(): void;
  
  /**
   * 隐藏吸附提示
   */
  protected hideSnaps(): void;
  
  /**
   * 显示圆形吸附提示
   * @param point - 吸附点坐标
   */
  protected displayCircleSnap(point: Point): void;
  
  /**
   * 检测吸附点
   * @param edge - 边缘对象
   * @param wall - 墙体对象
   * @returns 吸附点坐标，无吸附则返回undefined
   */
  protected detectSnaps(edge: PolygonEdge, wall: Wall): Point | undefined;
}