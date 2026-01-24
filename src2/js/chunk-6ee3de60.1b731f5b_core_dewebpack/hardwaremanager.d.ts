/**
 * 开启方向枚举
 * 定义硬件的各种开启方向类型
 */
export enum OpenDirection {
  /** 向左开启 */
  Left = "left",
  /** 向右开启 */
  Right = "right",
  /** 向上开启 */
  Up = "up",
  /** 向下开启 */
  Down = "down",
  /** 左侧带上开启 */
  Left_With_Up = "left_with_up",
  /** 右侧带上开启 */
  Right_With_Up = "right_with_up",
  /** 左侧带下开启 */
  Left_With_Down = "left_with_down",
  /** 右侧带下开启 */
  Right_With_Down = "right_with_down",
  /** 自定义开启方向 */
  Custom = "custom",
  /** 无开启方向 */
  None = "none",
  /** 浮动 */
  Float = "float",
  /** 左旋转 */
  Left_Rotate = "Left_Rotate",
  /** 右旋转 */
  Right_Rotate = "Right_Rotate",
  /** 上旋转 */
  Up_Rotate = "Up_Rotate",
  /** 下旋转 */
  Down_Rotate = "Down_Rotate"
}

/**
 * 硬件项接口
 * 定义单个硬件的基本属性和方法
 */
interface Hardware {
  /** 是否隐藏 */
  hidden: boolean;
  /** 绘制硬件 */
  draw(context: CanvasRenderingContext2D): void;
}

/**
 * 窗扇接口
 * 代表硬件管理器所属的窗扇对象
 */
interface Sash {
  // 窗扇的具体属性根据实际情况定义
}

/**
 * 序列化数据接口
 * 用于硬件管理器的序列化和反序列化
 */
interface HardwareManagerData {
  /** 开启方向 */
  openDirection: OpenDirection;
}

/**
 * 硬件管理器类
 * 管理窗扇的硬件组件及其开启方向
 */
export declare class HardwareManager {
  /** 所属窗扇 */
  readonly sash: Sash;
  
  /** 硬件列表 */
  readonly hardwares: Hardware[];
  
  /** 私有：开启方向 */
  private _openDirection: OpenDirection;

  /**
   * 构造函数
   * @param sash - 所属窗扇对象
   */
  constructor(sash: Sash);

  /**
   * 获取开启方向
   */
  get openDirection(): OpenDirection;

  /**
   * 设置开启方向
   * @param value - 新的开启方向
   */
  set openDirection(value: OpenDirection);

  /**
   * 判断是否为垂直开启
   * @returns 当开启方向为Up或Down时返回true
   */
  get isVertical(): boolean;

  /**
   * 判断是否向左开启
   * @returns 当开启方向以"left"开头时返回true
   */
  get isLeftOpen(): boolean;

  /**
   * 判断是否向右开启
   * @returns 当开启方向以"right"开头时返回true
   */
  get isRightOpen(): boolean;

  /**
   * 判断是否向上开启
   * @returns 当开启方向以"up"结尾时返回true
   */
  get isUpOpen(): boolean;

  /**
   * 判断是否向下开启
   * @returns 当开启方向以"down"结尾时返回true
   */
  get isDownOpen(): boolean;

  /**
   * 序列化为JSON对象
   * @returns 包含开启方向的对象
   */
  toJSON(): HardwareManagerData;

  /**
   * 从数据反序列化
   * @param data - 序列化的数据对象
   * @returns 当前实例（支持链式调用）
   */
  deserialize(data: HardwareManagerData): this;

  /**
   * 绘制所有硬件
   * @param context - Canvas 2D渲染上下文
   */
  draw(context: CanvasRenderingContext2D): void;

  /**
   * 修复/校验数据
   * @param data - 原始数据
   * @returns 修复后的数据
   */
  protected fixData(data: HardwareManagerData): HardwareManagerData;
}