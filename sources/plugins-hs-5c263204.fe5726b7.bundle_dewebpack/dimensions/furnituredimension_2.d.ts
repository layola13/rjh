/**
 * 家具尺寸标注模块
 * 用于在3D视图中显示家具到结构和其他内容的线性尺寸标注
 */

/**
 * WebGL线性尺寸类型枚举
 * 定义了所有可能的尺寸标注方向
 */
export enum WebGLLinearDimensionType {
  /** 顶部到结构的距离 */
  topToStructure = "top",
  /** 背部到结构的距离 */
  backToStructure = "back",
  /** 左侧到结构的距离 */
  leftToStructure = "left",
  /** 右侧到结构的距离 */
  rightToStructure = "right",
  /** 底部到结构的距离 */
  bottomToStructure = "bottom",
  /** 前部到结构的距离 */
  frontToStructure = "front",
  /** 顶部到内容的距离 */
  topToContent = "topToContent",
  /** 背部到内容的距离 */
  backToContent = "backToContent",
  /** 左侧到内容的距离 */
  leftToContent = "leftToContent",
  /** 右侧到内容的距离 */
  rightToContent = "rightToContent",
  /** 底部到内容的距离 */
  bottomToContent = "bottomToContent",
  /** 前部到内容的距离 */
  frontToContent = "frontToContent"
}

/**
 * 3D空间中的点坐标
 */
interface Point3D {
  x: number;
  y: number;
  z?: number;
}

/**
 * 边界点集合
 */
interface BoundingPoints {
  /** 左上角点 */
  leftTop: THREE.Vector3;
  /** 左下角点 */
  leftBottom: THREE.Vector3;
  /** 右上角点 */
  rightTop: THREE.Vector3;
  /** 右下角点 */
  rightBottom: THREE.Vector3;
}

/**
 * 碰撞检测结果
 */
interface CollisionResult {
  /** 交点坐标 */
  intersect: Vector3;
  /** 碰撞线段 */
  line: THREE.Line3;
  /** 第一个参数值 */
  param1: number;
  /** 第二个参数值 */
  param2: number;
  /** 碰撞类型：墙体或内容 */
  type: "wall" | "content";
  /** 碰撞的内容对象（如果是内容类型） */
  content?: unknown;
}

/**
 * 线性尺寸数据
 */
interface LinearDimensionData {
  /** 起始点 */
  start?: Vector3;
  /** 结束点 */
  end?: Vector3;
  /** 交点 */
  intersect?: Vector3;
  /** 线段 */
  line?: THREE.Line3;
  /** 参数值 */
  param2?: number;
  /** 碰撞类型 */
  collisionType?: "wall" | "content";
  /** 碰撞内容对象 */
  content?: unknown;
}

/**
 * 尺寸标注规则配置
 */
interface DimensionRules {
  // 具体规则字段根据实际使用定义
  [key: string]: unknown;
}

/**
 * 尺寸标注配置
 */
interface DimensionConfig {
  // 具体配置字段根据实际使用定义
  [key: string]: unknown;
}

/**
 * 变换参数
 */
interface TransformParams {
  x?: number;
  y?: number;
  z?: number;
  XRotation?: number;
  YRotation?: number;
  ZRotation?: number;
  XScale?: number;
  YScale?: number;
  ZScale?: number;
  XSize?: number;
  YSize?: number;
  ZSize?: number;
}

/**
 * 家具尺寸标注Gizmo类
 * 继承自HSApp.View.Base.Gizmo，用于在3D视图中显示和编辑家具尺寸标注
 */
export declare class Furnituredimension extends HSApp.View.Base.Gizmo {
  /** 是否启用标注 */
  isEnabled: boolean;
  /** 事务管理器 */
  transManager: unknown;
  /** 输入是否可编辑 */
  isEditableInput: boolean;
  /** 是否正在拖拽 */
  isDragging: boolean;
  /** 最后移动时间戳 */
  lastMoveTime: number;
  /** 位置是否脏标记 */
  isPositionDirty: boolean;
  /** 房间是否脏标记 */
  isRoomDirty: boolean;
  /** 目标对象 */
  target: unknown;
  /** 线性尺寸标注集合 */
  lineDimensions: Map<string, HSApp.View.T3d.LinearDimension>;
  /** 点标记集合 */
  pointMarkers: Map<string, unknown>;
  /** 内容映射缓存 */
  contentsMap: Map<unknown, [unknown[], unknown[]]>;
  /** 轮廓缓存 */
  outlineMap: Map<unknown, Point3D[]>;
  /** 当前房间 */
  room?: unknown;
  /** 内容数组 */
  contents: unknown[];
  /** 标注规则 */
  rules?: DimensionRules;
  /** 标注配置 */
  config?: DimensionConfig;

  /**
   * 构造函数
   * @param context - 上下文对象
   * @param layer - 图层对象
   * @param canvas - 画布对象
   * @param isEditableInput - 输入是否可编辑
   */
  constructor(
    context: unknown,
    layer: unknown,
    canvas: unknown,
    isEditableInput: boolean
  );

  /**
   * 初始化尺寸标注
   * @param target - 目标对象
   */
  init(target: unknown): void;

  /**
   * 重置拖拽状态
   */
  private _resetDraggingStatus(): void;

  /**
   * 设置标注规则
   * @param rules - 规则配置
   */
  setRules(rules: DimensionRules): void;

  /**
   * 设置标注配置
   * @param config - 配置对象
   */
  setConfig(config: DimensionConfig): void;

  /**
   * 清理资源
   */
  onCleanup(): void;

  /**
   * 激活标注
   */
  onActivate(): void;

  /**
   * 停用标注
   */
  onDeactivate(): void;

  /**
   * 命令开始事件处理
   * @param event - 事件对象
   */
  onCmdStarted(event: unknown): void;

  /**
   * 命令结束事件处理
   * @param event - 事件对象
   */
  onCmdTerminated(event: unknown): void;

  /**
   * 设置线性尺寸文本编辑状态
   * @param isEditable - 是否可编辑
   */
  setLinerdimensionTextEditState(isEditable: boolean): void;

  /**
   * 视图激活事件处理
   * @param event - 事件对象
   */
  private _onViewActivated(event: unknown): void;

  /**
   * 遍历所有碰撞内容
   * @param callback - 回调函数
   */
  forEachCollisionContent(callback: (content: unknown) => void): void;

  /**
   * 获取房间内的所有内容
   * @returns [结构内容数组, 普通内容数组]
   */
  getContents(): [unknown[], unknown[]];

  /**
   * 判断是否为结构内容
   * @param content - 内容对象
   * @returns 是否为结构内容
   */
  private _isStructureContent(content: unknown): boolean;

  /**
   * 设置改变事件处理
   * @param event - 事件对象
   */
  private _onSettingChanged(event: unknown): void;

  /**
   * 获取边界点
   * @param entity - 实体对象
   * @returns 边界点集合
   */
  private _getBoundingPoints(entity: TransformParams): BoundingPoints;

  /**
   * 将局部空间坐标转换为模型空间坐标
   * @param entity - 实体对象
   * @param localPoint - 局部坐标点
   * @returns 模型空间坐标
   */
  private _localSpaceToModelSpace(
    entity: TransformParams,
    localPoint: Point3D
  ): THREE.Vector3;

  /**
   * 获取变换矩阵
   * @param entity - 实体对象
   * @returns 4x4变换矩阵
   */
  private _getTransformMatrix4(entity: TransformParams): THREE.Matrix4;

  /**
   * 初始化子Gizmo
   * @param context - 上下文
   * @param layer - 图层
   * @param target - 目标对象
   */
  private _initChildenGizmo(
    context: unknown,
    layer: unknown,
    target: unknown
  ): void;

  /**
   * 初始化到结构的Gizmo
   * @param context - 上下文
   * @param layer - 图层
   * @param target - 目标对象
   * @param isDragging - 是否正在拖拽
   */
  private _initGizmoToStructures(
    context: unknown,
    layer: unknown,
    target: unknown,
    isDragging?: boolean
  ): void;

  /**
   * 初始化到内容的Gizmo
   * @param context - 上下文
   * @param layer - 图层
   * @param target - 目标对象
   * @param isDragging - 是否正在拖拽
   */
  private _initGizmoToContents(
    context: unknown,
    layer: unknown,
    target: unknown,
    isDragging?: boolean
  ): void;

  /**
   * 获取碰撞的内容对象
   * @param outline - 轮廓多边形
   * @param contents - 内容数组
   * @returns 碰撞的内容数组
   */
  private _getCollisionContents(
    outline: Point3D[],
    contents: unknown[]
  ): unknown[];

  /**
   * 获取上方的内容
   * @param contents - 内容数组
   * @returns 上方的内容数组
   */
  private _getContentsAbove(contents: unknown[]): unknown[];

  /**
   * 获取下方的内容
   * @param contents - 内容数组
   * @returns 下方的内容数组
   */
  private _getContentsBelow(contents: unknown[]): unknown[];

  /**
   * 检查内容是否有效
   * @param content - 内容对象
   * @returns 是否有效
   */
  private _checkContentValid(content: unknown): boolean;

  /**
   * 判断内容是否在房间内
   * @param content - 内容对象
   * @param room - 房间对象
   * @returns 是否在房间内
   */
  private _isContentInRoom(content: unknown, room: unknown): boolean;

  /**
   * 判断是否垂直
   * @param content - 内容对象
   * @param line - 线段
   * @returns 是否垂直
   */
  private _isPerpendicular(content: unknown, line: THREE.Line3): boolean;

  /**
   * 获取最近的碰撞线段
   * @param contents - 内容数组
   * @param line - 检测线段
   * @returns 碰撞结果
   */
  private _getClosestCollisionLine(
    contents: unknown[],
    line: THREE.Line3
  ): CollisionResult | undefined;

  /**
   * 获取与墙体的碰撞点
   * @param line - 检测线段
   * @returns 碰撞结果
   */
  private _getCollisionPointToWall(
    line: THREE.Line3
  ): CollisionResult | undefined;

  /**
   * 获取房间高度
   * @param room - 房间对象
   * @returns 房间高度
   */
  private _getRoomHeight(room: unknown): number;

  /**
   * 根据类型获取线性尺寸数据
   * @param type - 尺寸类型
   * @param structureContents - 结构内容数组
   * @param normalContents - 普通内容数组
   * @returns 线性尺寸数据
   */
  getLinearDimensionDataByType(
    type: string,
    structureContents: unknown[],
    normalContents: unknown[]
  ): LinearDimensionData;

  /**
   * 值改变事件处理
   * @param event - 事件对象
   */
  onValueChanged(event: unknown): void;

  /**
   * 更新尺寸数据
   */
  updateDimensionData(): void;

  /**
   * 更新标注
   */
  update(): void;

  /**
   * 显示标注
   */
  show(): void;

  /**
   * 隐藏标注
   */
  hide(): void;

  /**
   * 视图改变事件处理
   */
  private _onViewChange(): void;

  /**
   * 重绘标注
   */
  redraw(): void;

  /**
   * 重绘前处理
   */
  onPreRedraw(): void;

  /**
   * 判断是否可以绘制
   * @returns 是否可以绘制
   */
  canDraw(): boolean;

  /**
   * 绘制标注
   */
  onDraw(): void;

  /**
   * 从缓存获取轮廓
   * @param content - 内容对象
   * @returns 轮廓点数组
   */
  getOutlineFromCache(content: unknown): Point3D[];

  /**
   * 获取对象轮廓
   * @param content - 内容对象
   * @returns 轮廓点数组
   */
  getOutline(content: unknown): Point3D[];

  /**
   * 获取IOpening类型的轮廓
   * @param content - 内容对象
   * @returns 轮廓点数组
   */
  getIOpeningOutline(content: unknown): Point3D[];

  /**
   * 获取普通Opening的轮廓
   * @param opening - Opening对象
   * @returns 轮廓点数组
   */
  getCommonOpeingOutline(opening: unknown): Point3D[];

  /**
   * 实体变脏事件处理
   * @param event - 事件对象
   */
  private _entityDirtied(event: unknown): void;

  /**
   * 获取内容所在房间
   * @returns 房间对象
   */
  getRoomContentIn(): unknown;
}