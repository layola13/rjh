import { Point, Line, Vector } from './geometry';
import { ShapeHelper } from './shape-helper';
import { Tool, ToolType } from './tool';

/**
 * 连接器编辑机器人接口
 * 定义连接器编辑相关的数据结构
 */
interface ConnectorRobotAttrs {
  /** 宿主形状对象 */
  hostShape: HostShape;
}

/**
 * 连接器数据接口
 */
interface ConnectorData {
  /** 角落边缘索引 */
  cornerEdgeIndex: number;
  /** 多边形对象 */
  poly: Polygon;
  /** 是否为中间形状 */
  isMiddleShape?: boolean;
}

/**
 * 可视化形状接口
 */
interface VShape {
  /** 形状属性 */
  attrs: {
    /** 机器人相关属性 */
    robot: {
      /** 宿主形状 */
      hostShape: HostShape;
      /**
       * 拖拽长度调整方法
       * @param poly - 多边形对象
       * @param edgeIndex - 边缘索引
       * @param vector - 移动向量
       * @param view - 视图对象
       */
      dragLength(poly: Polygon, edgeIndex: number, vector: Vector, view: ViewManager): void;
    };
    /** 连接器数据 */
    data: ConnectorData;
  };
}

/**
 * 宿主形状接口
 */
interface HostShape {
  /** 多边形对象 */
  polygon: {
    /**
     * 获取指定边缘
     * @param index - 边缘索引
     * @returns 边缘对象
     */
    edge(index: number): Edge;
  };
}

/**
 * 边缘接口
 */
interface Edge {
  /** 起始点 */
  start: Point;
  /** 结束点 */
  end: Point;
}

/**
 * 多边形接口
 */
interface Polygon {
  /** 多边形的点集合 */
  points: Point[];
}

/**
 * 视图管理器接口
 */
interface ViewManager {
  /** 形状管理器 */
  shapeManager: {
    /** 刷新总高度 */
    refreshTotalHeight(): void;
    /** 刷新总宽度 */
    refreshTotalWidth(): void;
  };
  /** 备忘录管理器 */
  mometoManager: {
    /** 检查点 */
    checkPoint(): void;
  };
}

/**
 * 拖拽事件接口
 */
interface DragEvent {
  /** 目标元素 */
  target: VShape;
}

/**
 * 连接器编辑机器人工具类
 * 用于处理连接器的交互式编辑操作，包括拖拽、吸附和尺寸调整
 */
export declare class EditConnectorRobot extends Tool {
  /** 视图管理器实例 */
  private readonly view: ViewManager;
  
  /** 上一个点位 */
  private prevPt: Point;
  
  /** 当前点位 */
  private curPt: Point;
  
  /** 当前操作的可视化形状 */
  private vshape?: VShape;
  
  /** 磁性吸附点 */
  private magneticPoint?: Point;

  /**
   * 构造函数
   * @param view - 视图管理器实例
   */
  constructor(view: ViewManager);

  /**
   * 拖拽开始事件处理
   * 初始化拖拽状态，保存初始点位和目标形状
   * @param event - 拖拽事件对象
   */
  dragstart(event: DragEvent): void;

  /**
   * 拖拽移动事件处理
   * 实时更新形状位置，应用磁性吸附效果
   * @param event - 拖拽事件对象
   */
  dragmove(event: DragEvent): void;

  /**
   * 执行编辑任务
   * 计算并应用连接器的长度变化
   * @param useMagneticPoint - 是否使用磁性吸附点，默认为 false
   */
  private doTask(useMagneticPoint?: boolean): void;

  /**
   * 鼠标操作完成事件处理
   * 完成编辑操作，保存状态到备忘录
   * @param event - 鼠标事件对象
   */
  mousedone(event: MouseEvent): void;

  /**
   * 检测吸附点
   * @param edge - 当前边缘
   * @param hostShape - 宿主形状
   * @returns 吸附点或 undefined
   */
  private detectSnaps(edge: Edge, hostShape: HostShape): Point | undefined;

  /**
   * 隐藏吸附辅助线
   */
  private hideSnaps(): void;
}