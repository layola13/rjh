/**
 * 形状枢轴点枚举
 * 定义形状的九宫格锚点位置和自定义位置
 */
export enum ShapePivotPoint {
  /** 左下角 */
  LeftDown = "0",
  /** 左中 */
  LeftCenter = "1",
  /** 左上角 */
  LeftUp = "2",
  /** 中下 */
  CenterDown = "3",
  /** 中心 */
  CenterCenter = "4",
  /** 中上 */
  CenterUp = "5",
  /** 右下角 */
  RightDown = "6",
  /** 右中 */
  RightCenter = "7",
  /** 右上角 */
  RightUp = "8",
  /** 自定义位置 */
  Customer = "9"
}

/**
 * 导出模式枚举
 * 定义3D模型导出的文件格式
 */
export enum ExportModeEnum {
  /** GLB格式 (glTF二进制) */
  GLB = 0,
  /** OBJ格式 */
  OBJ = 1
}

/**
 * 面UV计算模式枚举
 * 定义UV纹理坐标的映射方式
 */
export enum ModeCalFaceUVEnum {
  /** 固定UV比例 */
  FixedUV = 0,
  /** 固定U方向 */
  FixedU = 1,
  /** 固定V方向 */
  FixedV = 2,
  /** 自定义模式 */
  Custom = 3
}

/**
 * 条形类型枚举
 * 定义条形构件的方向类型
 */
export enum BarType {
  /** 水平方向 */
  H = 0,
  /** 垂直方向 */
  V = 1,
  /** 其他方向 */
  Other = 2
}

/**
 * 材质类型枚举
 * 定义门窗系统中所有可用的材质标识符
 */
export enum ProfileTypesEnum {
  /** 识别材质 */
  Identify = "mat_identify",
  /** 铝型材 */
  LXC = "mat_lxc",
  /** 铝型材内侧 */
  LXCIN = "mat_lxcin",
  /** 铝型材外侧 */
  LXCOUT = "mat_lxcout",
  /** 胶条 */
  JT = "mat_jt",
  /** 扣盖 */
  KK = "mat_kk",
  /** 轨道 */
  GD = "mat_gd",
  /** 五金-锁 */
  HardwareLock = "mat_hardwarelock",
  /** 五金-合页 */
  HardwareHinge = "mat_hardwarehinge",
  /** 五金-专业合页 */
  HardwareHingePro = "mat_hardwarehingePro",
  /** 五金-钩锁 */
  HardwareLockHookLock = "mat_hardwarelockhooklock",
  /** 五金-钩锁手柄 */
  HardwareLockHookLockHandle = "mat_hardwarelockhooklockhandle",
  /** 五金-月牙锁 */
  HardwareCrecentLock = "mat_hardwarecrecentlock",
  /** 纱窗 */
  Flyscreen = "mat_flyscreen",
  /** 背景 */
  Background = "mat_background",
  /** 透明材质 */
  Transparent = "mat_transparent",
  /** 布尔运算材质 */
  Boolean = "mat_boolean",
  /** 玻璃导出材质 */
  GlassExport = "mat_glassexport",
  /** 玻璃 */
  Glass = "mat_glass",
  /** 砖墙外侧 */
  BrickWallOut = "mat_brickwall_out",
  /** 砖墙内侧 */
  BrickWallIn = "mat_brickwall_in",
  /** 砖墙侧面 */
  BrickWallSide = "mat_brickwall_side",
  /** 房间地板 */
  RoomFloor = "mat_roomflooor",
  /** 尺寸标注 */
  Dim = "mat_dim",
  /** 包围盒 */
  Obb = "mat_obb",
  /** 照片 */
  Photo = "mat_photo",
  /** KFC把手(左) */
  HardwareKfcHandleLeft = "mat_kfchandleLeft",
  /** KFC把手(右) */
  HardwareKfcHandleRight = "mat_kfchandleRight",
  /** 弧形玻璃 */
  ArcGlass = "mat_arcglass",
  /** 商用把手2(左) */
  CommercialHandle2Left = "CommercialHandle2Left",
  /** 商用把手2(右) */
  CommercialHandle2Right = "CommercialHandle2Right",
  /** KFC把手 */
  KfcHandle = "KfcHandle",
  /** 点 */
  Point = "Point",
  /** 球面反射 */
  SphereReflection = "SphereReflection",
  /** 标记线 */
  MarkLine = "mat_markline",
  /** 坐标轴前 */
  AxisFront = "mat_AxisFront",
  /** 坐标轴后 */
  AxisBack = "mat_AxisBack",
  /** 坐标轴左 */
  AxisLeft = "mat_AxisLeft",
  /** 坐标轴右 */
  AxisRight = "mat_AxisRight",
  /** 坐标轴上 */
  AxisUp = "mat_AxisUp",
  /** 坐标轴下 */
  AxisDown = "mat_AxisDown",
  /** 五金把手 */
  HardwareHandle = "hardwareHandle"
}

/**
 * WebCC模式枚举
 * 定义Web配置器的工作状态
 */
export enum WebCCMode {
  /** 正常模式 */
  StatusNormal = "normal",
  /** 拍照模式 */
  StatusTakePhoto = "takephoto",
  /** 爆炸视图模式 */
  StatusExplosion = "explosion"
}

/**
 * 多边形参数信息接口
 * 用于初始化PolygonParaInfo的参数
 */
export interface IPolygonParaInfoInit {
  /** 最小X坐标(米) */
  minx?: number;
  /** 最小Y坐标(米) */
  miny?: number;
  /** 深度(米) */
  depth?: number;
}

/**
 * 多边形参数信息类
 * 存储多边形的边界范围和深度信息
 */
export declare class PolygonParaInfo {
  /** 最小X坐标(米) */
  min_x_m: number;
  /** 最小Y坐标(米) */
  min_y_m: number;
  /** 最大X坐标(米) */
  max_x_m: number;
  /** 最大Y坐标(米) */
  max_y_m: number;
  /** 深度(米) */
  depth_m: number;

  /**
   * 构造函数
   * @param initData - 初始化数据
   */
  constructor(initData?: IPolygonParaInfoInit);
}

/**
 * 框架3D信息类
 * 存储框架的三维几何信息
 */
export declare class Frame3DInfo {
  // 根据实际使用添加属性
}

/**
 * 角点项类
 * 表示框架角点的信息
 */
export declare class CornerItem {
  // 根据实际使用添加属性
}

/**
 * 连接器项类
 * 表示框架连接点的信息
 */
export declare class ConnectorItem {
  // 根据实际使用添加属性
}

/**
 * WebCC默认信息类
 * 存储Web配置器的默认配置参数
 */
export declare class WebCCDefaultInfo {
  /** 框架深度 */
  frame_depth: number;
  /** 墙体深度 */
  wall_depth: number;
  /** 中心位置 */
  center_pos: unknown;
  /** 对象组 */
  objGroup: unknown[];
  /** 角点组 */
  cornerGroup: CornerItem[];
  /** 连接组 */
  connectionGroup: ConnectorItem[];

  /**
   * 构造函数
   * @param frameDepth - 框架深度
   * @param wallDepth - 墙体深度
   * @param centerPos - 中心位置
   */
  constructor(frameDepth: number, wallDepth: number, centerPos: unknown);
}

/**
 * 框架信息类
 * 存储完整的框架结构信息
 */
export declare class FrameInfo {
  /** 框架对象 */
  frame: unknown | undefined;
  /** 框架3D信息 */
  frame_3D_info: Frame3DInfo | undefined;
  /** 框架多边形 */
  frames_polygon: unknown | undefined;
  /** 固定组 */
  fixedGroup: unknown[];

  constructor();
}

/**
 * 生成结果类
 * 表示操作的执行结果
 */
export declare class GenResult {
  /** 结果代码 */
  code: number | string;
  /** 结果消息 */
  message: string;

  /**
   * 构造函数
   * @param code - 结果代码
   * @param message - 结果消息
   */
  constructor(code: number | string, message: string);
}

/**
 * 线段项初始化接口
 * 用于初始化LineItem的参数
 */
export interface ILineItemInit {
  /** 起点 */
  p0?: Vector3;
  /** 终点 */
  p1?: Vector3;
  /** 颜色 */
  color?: unknown;
}

/**
 * 三维向量类型(来自Babylon.js)
 * 表示三维空间中的点或向量
 */
export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * 线段项类
 * 表示三维空间中的一条线段
 */
export declare class LineItem {
  /** 起点 */
  p0: Vector3;
  /** 终点 */
  p1: Vector3;
  /** 颜色 */
  color: unknown;

  /**
   * 构造函数
   * @param initData - 初始化数据
   */
  constructor(initData?: ILineItemInit);
}