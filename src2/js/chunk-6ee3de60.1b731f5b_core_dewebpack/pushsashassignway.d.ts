/**
 * 推拉窗扇分配方式枚举
 * 定义窗扇的开启方向和位置组合
 */
export enum PushSashAssignWay {
  /** 内开左 */
  InwardLeft = "IL",
  /** 内开右 */
  InwardRight = "IR",
  /** 内开下 */
  InwardDown = "ID",
  /** 内开左下 */
  InwardDownLeft = "IDL",
  /** 内开右下 */
  InwardDownRight = "IDR",
  /** 内开上 */
  InwardUp = "IU",
  /** 内开左上 */
  InwardUpLeft = "IUL",
  /** 内开右上 */
  InwardUpRight = "IUR",
  /** 外开左 */
  OutwardLeft = "OL",
  /** 外开右 */
  OutwardRight = "OR",
  /** 外开上 */
  OutwardUp = "OU",
  /** 外开左上 */
  OutwardUpLeft = "OUL",
  /** 外开右上 */
  OutwardUpRight = "OUR",
  /** 外开下 */
  OutwardDown = "OD",
  /** 外开左下 */
  OutwardDownLeft = "ODL",
  /** 外开右下 */
  OutwardDownRight = "ODR",
  /** 无 */
  None = "N",
  /** 自定义 */
  Custom = "C",
  /** 内开悬浮 */
  InwardFloat = "IF",
  /** 外开悬浮 */
  OutwardFloat = "OF"
}

/**
 * 开启方向配置接口
 */
interface OpenDirectionConfig {
  /** 开启朝向 */
  toward: OpenToward;
  /** 开启方向 */
  direction: OpenDirection;
}

/**
 * 窗扇序列化数据接口
 */
interface PushSashSerializedData extends SashSerializedData {
  /** 是否打开 */
  opened: boolean;
  /** 是否为门 */
  isDoor: boolean;
  /** 底部尺寸数据 */
  bd?: SashBottomDimSerializedData;
  /** 固定宽度 */
  fw?: number;
  /** 固定宽度（旧版字段） */
  fixedWidth?: number;
  /** 是否带转向框 */
  wtf?: boolean;
  /** 是否截断外框 */
  tf?: boolean;
  /** 开启角度 */
  od?: number;
}

/**
 * 推拉窗扇类
 * 继承自基础窗扇类，支持内外开、多方向开启等功能
 */
export class PushSash extends Sash {
  /** 是否打开状态 */
  opened: boolean;
  /** 是否为门 */
  isDoor: boolean;
  /** 固定宽度，-1表示未固定 */
  fixedWidth: number;
  /** 是否带转向框 */
  withTurningFrame: boolean;
  /** 是否截断外框 */
  truncateFrame: boolean;
  /** 开启角度 */
  openDegree: number;
  /** 五金件管理器 */
  hardwareManager: PushSashHardwareManager;
  /** 底部尺寸标注 */
  bottomDim: SashBottomDim;
  /** 文本标签 */
  label: Label;

  /**
   * 构造函数
   * @param parent - 父级元素
   * @param polygon - 多边形几何数据
   * @param options - 配置选项
   * @param shapeType - 形状类型，默认为Sash
   */
  constructor(
    parent: Frame,
    polygon: Polygon,
    options: SashOptions,
    shapeType?: ShapeType
  );

  /**
   * 初始化推拉窗扇
   * 创建五金件并更新标签
   */
  initPushSash(): void;

  /**
   * 获取带转向框的标签
   */
  get withTurningFrameLabel(): Label;

  /**
   * 获取开启朝向
   */
  get openToward(): OpenToward;

  /**
   * 获取同级窗扇
   * 返回同一多边形区域内的其他推拉窗扇
   */
  get siblingSash(): PushSash | undefined;

  /**
   * 获取把手高度
   * 如果把手隐藏则返回0
   */
  get handleHeight(): number;

  /**
   * 更新多边形几何数据
   * @param polygon - 新的多边形数据
   */
  updatePoly(polygon: Polygon): void;

  /**
   * 更新标签文本和位置
   */
  updateLabel(): void;

  /**
   * 修正tap索引
   * 根据开启方向和状态设置正确的绘制层级
   */
  fixTapIdx(): void;

  /**
   * 获取/设置滑动属性
   */
  get slide(): boolean;
  set slide(value: boolean);

  /**
   * 获取窗扇分配方式
   * 根据开启朝向和方向返回对应的枚举值
   */
  get sashAssignWay(): PushSashAssignWay;

  /**
   * 根据位置确定合适的开启方向
   * @param position - 位置向量
   * @returns 开启方向
   */
  properOpenDirectionByPosition(position: Vector): OpenDirection;

  /**
   * 获取窗扇分配方式映射表
   * 返回分配方式枚举与开启配置的映射关系
   */
  get sashAssignWayMap(): Map<PushSashAssignWay, OpenDirectionConfig>;

  /**
   * 获取包围盒
   * 包含把手尺寸的完整边界框
   */
  box(): Box;

  /**
   * 绘制窗扇
   * @param context - 绘图上下文
   */
  draw(context: DrawingContext): void;

  /**
   * 序列化为JSON
   */
  toJSON(): PushSashSerializedData;

  /**
   * 从JSON反序列化
   * @param data - 序列化数据
   */
  deserialize(data: PushSashSerializedData): this;

  /**
   * 调整开启方向以适配相邻窗扇
   * @param sibling - 相邻窗扇
   * @param position - 位置向量
   */
  fitOpenDirection(sibling: PushSash | null, position: Vector): void;

  /**
   * 调整开启朝向以适配相邻窗扇
   * @param sibling - 相邻窗扇
   */
  fitOpenToward(sibling: PushSash | null): void;

  /**
   * 关闭窗扇
   * 恢复窗扇的原始矩阵变换
   */
  closeSash(): void;

  /**
   * 打开窗扇
   * 应用倾斜变换模拟开启效果
   */
  openSash(): void;

  /**
   * 获取Z轴索引
   * 用于控制窗扇的绘制层级
   */
  get Zindex(): number;

  /**
   * 平移窗扇及其附属元素
   * @param vector - 平移向量
   */
  translate(vector: Vector): void;
}