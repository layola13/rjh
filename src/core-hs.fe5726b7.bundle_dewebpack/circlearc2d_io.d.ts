/**
 * 圆弧2D实体的序列化/反序列化IO处理器
 * 负责将CircleArc2d实体转储为可序列化的数据格式，以及从数据中恢复实体
 */
export declare class CircleArc2d_IO extends Curve2d_IO {
  /**
   * 获取CircleArc2d_IO的单例实例
   * @returns CircleArc2d_IO的单例对象
   */
  static instance(): CircleArc2d_IO;

  /**
   * 将CircleArc2d实体转储为可序列化的数据结构
   * @param entity - 要转储的圆弧实体
   * @param callback - 转储完成后的回调函数
   * @param includeMetadata - 是否包含元数据，默认true
   * @param options - 转储选项配置
   * @returns 转储后的数据数组
   */
  dump(
    entity: CircleArc2d,
    callback?: (data: any[], entity: CircleArc2d) => void,
    includeMetadata?: boolean,
    options?: Record<string, unknown>
  ): any[];

  /**
   * 从转储数据中加载并恢复CircleArc2d实体
   * @param entity - 要加载数据的目标实体
   * @param data - 转储的数据对象
   * @param options - 加载选项配置
   */
  load(
    entity: CircleArc2d,
    data: {
      start: string;
      end: string;
      center: { x: number; y: number };
      radius: number;
      clockwise: boolean;
    },
    options?: Record<string, unknown>
  ): void;
}

/**
 * 2D坐标点接口
 */
export interface ICoordinate2d {
  x: number;
  y: number;
}

/**
 * 2D圆弧曲线实体
 * 表示由起点、终点、圆心、半径和方向定义的圆弧
 */
export declare class CircleArc2d extends Curve2d {
  /**
   * 构造函数
   * @param id - 实体唯一标识符，默认为空字符串
   * @param options - 初始化选项
   */
  constructor(id?: string, options?: unknown);

  /**
   * 创建圆弧实例的静态工厂方法
   * @param start - 起始点实体
   * @param end - 结束点实体
   * @param center - 圆心坐标
   * @param radius - 圆弧半径
   * @param clockwise - 是否顺时针方向，默认false
   * @returns 创建的圆弧实例
   */
  static create(
    start: Point2d,
    end: Point2d,
    center: ICoordinate2d,
    radius: number,
    clockwise?: boolean
  ): CircleArc2d;

  /**
   * 圆弧起始点（EntityField装饰器标记的字段）
   */
  start: Point2d;

  /**
   * 圆弧结束点（EntityField装饰器标记的字段）
   */
  end: Point2d;

  /**
   * 圆心坐标（EntityField装饰器标记的字段）
   */
  center: ICoordinate2d;

  /**
   * 圆弧半径（EntityField装饰器标记的字段）
   */
  radius: number;

  /**
   * 是否顺时针方向（EntityField装饰器标记的字段）
   */
  clockwise: boolean;

  /**
   * 圆弧起点的别名（同start）
   */
  get from(): Point2d;
  set from(value: Point2d);

  /**
   * 圆弧终点的别名（同end）
   */
  get to(): Point2d;
  set to(value: Point2d);

  /**
   * 从起点到终点的方向向量
   */
  get direction(): Vec2 | undefined;

  /**
   * 圆弧中点坐标（参数t=0.5处的点）
   */
  get middle(): ICoordinate2d;

  /**
   * 圆弧的离散采样点数组
   */
  get discretePoints(): ICoordinate2d[];

  /**
   * 圆弧的关键点数组（起点和终点）
   */
  get points(): Point2d[];

  /**
   * 圆弧的弧长
   */
  get length(): number;

  /**
   * 圆弧的最高点（如果圆弧包含圆心正上方的点）
   */
  get topPoint(): ICoordinate2d | undefined;

  /**
   * 圆弧的最低点（如果圆弧包含圆心正下方的点）
   */
  get bottomPoint(): ICoordinate2d | undefined;

  /**
   * 圆弧的最左点（如果圆弧包含圆心正左方的点）
   */
  get leftPoint(): ICoordinate2d | undefined;

  /**
   * 圆弧的最右点（如果圆弧包含圆心正右方的点）
   */
  get rightPoint(): ICoordinate2d | undefined;

  /**
   * 圆弧的矢高（弓高）缓存值
   */
  get sagittaCache(): number | undefined;

  /**
   * 圆弧的几何描述数组：[起点几何, 终点几何, 圆心, 半径, 方向]
   */
  get geometry(): Array<ICoordinate2d | number | boolean>;

  /**
   * 圆弧的唯一键标识（基于几何参数生成）
   */
  get key(): string;

  /**
   * 转换为THREE.js的Curve对象
   * @returns THREE.js的圆弧曲线对象
   */
  toTHREECurve(): any;

  /**
   * 平移圆弧
   * @param offsetX - X方向偏移量
   * @param offsetY - Y方向偏移量
   */
  offset(offsetX: number, offsetY: number): void;

  /**
   * 获取圆弧在指定参数位置的切向量
   * @param t - 参数值，范围[0, 1]
   * @returns 该位置的单位切向量
   */
  getTangent(t: number): Vec2 | undefined;

  /**
   * 获取圆弧的离散采样点（同discretePoints）
   * @returns 离散点坐标数组
   */
  getDiscretePoints(): ICoordinate2d[];

  /**
   * 创建圆弧的子曲线段
   * @param newStart - 新的起点
   * @param newEnd - 新的终点
   * @returns 新的圆弧实例
   */
  createSubCurve(newStart: Point2d, newEnd: Point2d): CircleArc2d;

  /**
   * 获取圆弧的采样点（可指定容差）
   * @param curve - THREE.js曲线对象
   * @param tolerance - 采样容差
   * @returns 采样点数组
   */
  getArcPoints(curve: any, tolerance?: number): ICoordinate2d[];

  /**
   * 计算并缓存圆弧的矢高
   */
  calSagitta(): void;

  /**
   * 根据矢高更新圆心和半径信息
   */
  updateCenterRadiusInfo(): void;

  /**
   * 刷新圆弧的包围盒
   * @internal
   */
  refreshBoundInternal(): void;

  /**
   * 验证圆弧数据的有效性
   * @returns 验证是否通过
   */
  verify(): boolean;

  /**
   * 获取对应的IO处理器实例
   * @returns CircleArc2d_IO实例
   */
  getIO(): CircleArc2d_IO;

  /**
   * 字段变更事件处理
   * @param fieldName - 变更的字段名
   * @param oldValue - 旧值
   * @param newValue - 新值
   */
  onFieldChanged(fieldName: string, oldValue: any, newValue: any): void;

  /**
   * 内部方法：设置起点
   * @param point - 新的起点
   * @private
   */
  private _setStart(point: Point2d): void;

  /**
   * 内部方法：设置终点
   * @param point - 新的终点
   * @private
   */
  private _setEnd(point: Point2d): void;

  /**
   * 内部方法：判断点是否在圆弧上
   * @param point - 待检测的点
   * @param tolerance - 容差值，默认使用SKETCH2D_LENGTH_TOL
   * @returns 点是否在圆弧上
   * @private
   */
  private _isPointInCurArc(point: ICoordinate2d, tolerance?: number): boolean;
}