/**
 * 防盗门设置模块
 * 提供防盗门对象的各种配置属性的访问和修改接口
 */

/**
 * 防盗门设置类
 * 用于管理防盗门的各项参数，包括间隙、把手宽度、方向、偏移等
 */
export declare class AntiTheftSettings {
  /**
   * 防盗门实例引用
   */
  private readonly antitheft: AntiTheft;

  /**
   * 视图实例引用
   */
  private readonly view: View;

  /**
   * 构造函数
   * @param antitheft - 防盗门对象实例
   * @param view - 视图对象实例
   */
  constructor(antitheft: AntiTheft, view: View);

  /**
   * 获取目标防盗门对象
   * @returns 当前防盗门实例
   */
  get target(): AntiTheft;

  /**
   * 获取或设置门扇间隙
   * 设置时会触发多边形更新、重绘和检查点保存
   * @remarks
   * - 变化小于0.5时忽略更新
   * - 不能小于型材尺寸
   */
  get gap(): number;
  set gap(value: number);

  /**
   * 获取或设置把手宽度
   * 设置时会触发多边形更新、重绘和检查点保存
   * @remarks
   * - 变化小于0.5时忽略更新
   * - 不能小于型材尺寸
   */
  get handleW(): number;
  set handleW(value: number);

  /**
   * 获取或设置是否启用偏移向量
   * 禁用时会自动清除现有偏移
   */
  get offvecEnabled(): boolean;
  set offvecEnabled(value: boolean);

  /**
   * 获取或设置是否存在偏移
   * @remarks
   * - getter: 检查偏移向量是否为零向量
   * - setter: 设为false时会重置偏移并触发重绘
   */
  get hasOffset(): boolean;
  set hasOffset(value: boolean);

  /**
   * 获取或设置门的开启方向
   * 设置时会触发门扇管理器、指示器的多边形更新和重绘
   */
  get orientation(): Orientation;
  set orientation(value: Orientation);

  /**
   * 获取或设置是否显示把手栏
   * 仅在值变化时触发更新和重绘
   */
  get showHandleBars(): boolean;
  set showHandleBars(value: boolean);

  /**
   * 获取或设置孔洞高度
   * 仅在值变化时触发更新和重绘
   */
  get holeHeight(): number;
  set holeHeight(value: number);

  /**
   * 获取或设置门是否可开启
   * 仅在值变化时触发多边形更新和重绘
   */
  get openable(): boolean;
  set openable(value: boolean);
}

/**
 * 防盗门主对象接口
 */
interface AntiTheft {
  /** 门扇管理器 */
  readonly shutManager: ShutManager;
  
  /** 型材尺寸 */
  readonly mullionProfileSize: number;
  
  /** 偏移向量 */
  offvec: Vector;
  
  /** 是否启用偏移向量 */
  offvecEnabled: boolean;
  
  /** 指示器 */
  readonly indicator: Indicator;
  
  /** 是否显示把手栏 */
  showHandleBars: boolean;
  
  /** 孔洞高度 */
  holeHeight: number;
  
  /** 是否可开启 */
  openable: boolean;
  
  /**
   * 平移防盗门
   * @param offset - 偏移向量
   */
  translate(offset: Vector): void;
  
  /**
   * 隐藏辅助线
   */
  hideAssist(): void;
  
  /**
   * 更新多边形
   */
  updatePoly(): void;
  
  /**
   * 绘制防盗门
   * @param view - 视图对象
   */
  draw(view: View): void;
}

/**
 * 门扇管理器接口
 */
interface ShutManager {
  /** 门扇间隙 */
  gap: number;
  
  /** 把手宽度 */
  handleW: number;
  
  /** 门的开启方向 */
  orientation: Orientation;
  
  /**
   * 更新多边形
   */
  updatePoly(): void;
  
  /**
   * 绘制门扇
   * @param view - 视图对象
   */
  draw(view: View): void;
}

/**
 * 指示器接口
 */
interface Indicator {
  /**
   * 更新多边形
   */
  updatePoly(): void;
  
  /**
   * 绘制指示器
   * @param view - 视图对象
   */
  draw(view: View): void;
}

/**
 * 视图对象接口
 */
interface View {
  /** 当前活动图层 */
  readonly activeLayer: Layer;
  
  /** 备忘录管理器 */
  readonly mometoManager: MomentoManager;
}

/**
 * 图层接口
 */
interface Layer {
  /**
   * 批量绘制
   */
  batchDraw(): void;
}

/**
 * 备忘录管理器接口
 */
interface MomentoManager {
  /**
   * 保存检查点
   */
  checkPoint(): void;
}

/**
 * 向量接口
 */
interface Vector {
  /**
   * 判断是否等于另一个向量
   * @param other - 另一个向量
   * @returns 是否相等
   */
  equalTo(other: Vector): boolean;
  
  /**
   * 返回反向向量
   * @returns 反向向量
   */
  invert(): Vector;
}

/**
 * 门的开启方向枚举
 */
type Orientation = string | number;