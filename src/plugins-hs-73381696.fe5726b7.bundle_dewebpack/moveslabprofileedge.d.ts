/**
 * 2D点坐标接口
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 尺寸标注线接口
 */
interface DimensionLine {
  /** 起点坐标 */
  from: Point2D;
  /** 终点坐标 */
  to: Point2D;
}

/**
 * 吸附对齐结果接口
 */
interface SnapResult {
  /** 吸附偏移量 */
  offset?: Point2D;
  /** 对齐指示线集合 */
  indicateLines?: Array<[Point2D, Point2D]>;
}

/**
 * 鼠标事件数据接口
 */
interface GizmoMouseEventData {
  /** 鼠标位置坐标 */
  position?: Point2D;
  /** 移动偏移量 */
  offset?: Point2D;
  /** 原始鼠标事件 */
  event: MouseEvent;
}

/**
 * SVG渲染上下文接口（Raphael或类似库）
 */
interface SVGContext {
  /** 创建路径元素 */
  path(): SVGPathElement;
  /** 创建文本元素 */
  text(): SVGTextElement;
  /** 应用配置对象 */
  application: {
    appSettings: {
      /** 正交模式开关（限制移动方向为水平/垂直） */
      orthoModeOn: boolean;
    };
  };
}

/**
 * SVG路径/文本元素接口
 */
interface SVGElement {
  /** 设置属性 */
  attr(attributes: Record<string, string>): this;
  /** 显示元素 */
  show(): this;
  /** 隐藏元素 */
  hide(): this;
}

type SVGPathElement = SVGElement;
type SVGTextElement = SVGElement;

/**
 * 楼板轮廓边缘实体接口
 */
interface SlabProfileEdge {
  /** 边缘唯一标识符 */
  ID: string;
  /** 起点坐标 */
  from: Point2D;
  /** 终点坐标 */
  to: Point2D;
  /** 中点坐标 */
  middle: Point2D;
  /** 前一条边 */
  prev?: SlabProfileEdge;
  /** 后一条边 */
  next?: SlabProfileEdge;
  /** 获取唯一父级对象 */
  getUniqueParent(): SlabProfileParent;
}

/**
 * 楼板轮廓父级对象接口
 */
interface SlabProfileParent {
  /** 遍历所有共边 */
  forEachCoEdge(callback: (edge: SlabProfileEdge) => void): void;
}

/**
 * 墙体实体接口
 */
interface Wall {
  /** 检查墙体是否有效 */
  isValid(): boolean;
}

/**
 * 模型图层接口
 */
interface ModelLayer {
  /** 前一图层 */
  prev?: ModelLayer;
  /** 遍历图层中所有墙体 */
  forEachWall(callback: (wall: Wall) => void, context: unknown): void;
}

/**
 * 楼板平面图接口
 */
interface Floorplan {
  // 具体属性根据实际使用情况定义
}

/**
 * 命令对象接口
 */
interface MoveSlabProfileEdgeCommand {
  /** 当前操作的实体 */
  entity: SlabProfileEdge;
  /** 所属模型图层 */
  modelLayer?: ModelLayer;
  /** 移动起始位置 */
  moveBeginPosition?: Point2D;
  /** 接收事件消息 */
  receive(eventType: string, data: GizmoMouseEventData): void;
}

/**
 * 边缘吸附推理引擎接口
 */
interface EdgeInference {
  /** 设置源边缘 */
  setSourceEdge(edge: SlabProfileEdge): void;
  /** 设置吸附检测墙体列表 */
  setSnapWalls(walls: Wall[]): void;
  /** 设置吸附检测辅助线 */
  setSnapLines(lines: Array<[Point2D, Point2D]>): void;
  /** 求解吸附结果 */
  solve(
    position: Point2D,
    result: SnapResult,
    options: { isBlockSnapEndPoint: boolean }
  ): void;
}

/**
 * SVG图层接口
 */
interface SVGLayer {
  /** 检查是否包含子元素 */
  hasChild(element: unknown): boolean;
  /** 添加子元素 */
  appendChild(element: SVGElement): void;
}

/**
 * 移动楼板轮廓边缘交互工具类
 * 
 * 功能说明：
 * - 处理楼板轮廓边缘的拖拽移动操作
 * - 实时显示尺寸标注和对齐辅助线
 * - 支持智能吸附（墙体、端点、辅助线）
 * - 支持正交模式（限制水平/垂直移动）
 * 
 * 使用场景：
 * 在建筑平面图编辑中，用户通过鼠标拖动楼板边缘调整形状时，
 * 该类负责视觉反馈（标注线、对齐线）和几何计算（吸附逻辑）
 */
export declare class MoveSlabProfileEdge {
  /** SVG渲染上下文 */
  protected context: SVGContext;
  
  /** SVG绘制图层 */
  protected layer: SVGLayer;
  
  /** 绘制元素（基类属性） */
  protected drawing: unknown;
  
  /** 关联的命令对象 */
  protected cmd: MoveSlabProfileEdgeCommand;
  
  /** 边缘推理引擎（处理智能吸附逻辑） */
  protected inference: EdgeInference;
  
  /** 楼板平面图数据 */
  protected fp?: Floorplan;
  
  /** 当前操作的边缘实体 */
  protected current?: SlabProfileEdge;
  
  /** 尺寸标注线数据数组（最多10条） */
  protected dimensionLines: DimensionLine[];
  
  /** 尺寸标注SVG元素数组（路径+文本对，共20个元素） */
  protected dimensionDisplay: SVGElement[];
  
  /** 对齐辅助线SVG元素数组（6条线） */
  protected alignmentLines: SVGPathElement[];
  
  /** 需要进行吸附检测的墙体列表 */
  protected snapCheckWalls: Wall[];
  
  /** 所有SVG元素的容器 */
  protected element?: SVGElement[];
  
  /** 拖拽起始位置（模型坐标系） */
  protected beginPosition?: Point2D;
  
  /** 光标相对边缘中点的初始偏移 */
  protected beginCursorOffset?: Point2D;
  
  /** 上一次鼠标位置（屏幕坐标系，用于防抖） */
  protected lastPosition?: Point2D;
  
  /** 当前吸附计算结果 */
  protected snapResult?: SnapResult;

  /**
   * 构造函数
   * @param context - SVG渲染上下文
   * @param layer - SVG绘制图层
   * @param cmd - 关联的命令对象
   */
  constructor(context: SVGContext, layer: SVGLayer, cmd: MoveSlabProfileEdgeCommand);

  /**
   * 重置内部状态
   * 清空缓存的几何数据和SVG引用
   */
  protected reset(): void;

  /**
   * 绘制/更新SVG元素
   * 负责渲染尺寸标注和对齐辅助线
   */
  protected onDraw(): void;

  /**
   * 构建初始几何数据
   * 计算需要显示尺寸标注的边缘（当前边+前后相邻边）
   */
  protected _build(): void;

  /**
   * 获取需要进行吸附检测的墙体列表
   * @returns 当前图层及前一图层的所有有效墙体
   */
  protected getSnapCheckWalls(): Wall[];

  /**
   * 获取当前操作的边缘实体
   * @returns 从命令对象中获取的边缘
   */
  protected getCurrentEdge(): SlabProfileEdge;

  /**
   * 隐藏所有对齐辅助线
   */
  protected hideAlignmentLines(): void;

  /**
   * 更新对齐辅助线的显示
   * @param lines - 对齐线坐标数组，每条线由两个点定义
   */
  protected updateAlignmentLines(lines?: Array<[Point2D, Point2D]>): void;

  /**
   * 鼠标按下事件处理
   * @param event - 鼠标事件对象
   * @param screenX - 屏幕坐标X
   * @param screenY - 屏幕坐标Y
   */
  protected onMouseDown(event: MouseEvent, screenX: number, screenY: number): void;

  /**
   * 鼠标移动事件处理
   * 
   * 核心逻辑：
   * 1. 将屏幕坐标转换为模型坐标
   * 2. 应用正交模式约束（如果启用）
   * 3. 执行智能吸附计算（除非按下Ctrl键）
   * 4. 更新对齐辅助线显示
   * 5. 通知命令对象执行实际移动
   * 
   * @param event - 鼠标事件对象
   *                event.ctrlKey: 按下时禁用吸附
   *                event.altKey: 按下时禁用端点吸附
   * @param screenX - 屏幕坐标X
   * @param screenY - 屏幕坐标Y
   */
  protected onMouseMove(event: MouseEvent, screenX: number, screenY: number): void;

  /**
   * 获取吸附辅助线列表
   * @returns 当前楼板轮廓的所有其他边缘作为吸附参考线
   */
  protected getSnapLines(): Array<[Point2D, Point2D]>;

  /**
   * 清理资源
   * 在工具停用时调用，重置所有状态
   */
  protected onCleanup(): void;
}