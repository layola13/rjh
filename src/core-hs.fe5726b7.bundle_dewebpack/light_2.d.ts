/**
 * 光源类型枚举
 * 定义系统支持的所有光源类型
 */
export enum LightTypeEnum {
  /** 点光源 */
  PointLight = "pointlight",
  /** 平面光 */
  FlatLight = "flatlight",
  /** 椭圆光 */
  EllipseLight = "ellipselight",
  /** 聚光灯 */
  SpotLight = "spotlight",
  /** 衰减聚光灯 */
  AttenuatedSpotLight = "attenuatedspotlight",
  /** 网格光 */
  MeshLight = "meshlight",
  /** 物理光源 */
  PhysicalLight = "physicallight",
  /** 聚光物理光源 */
  SpotPhysicalLight = "spotphysicallight",
  /** 子组 */
  SubGroup = "subgroup",
  /** 装配物理光源 */
  AsmPhysicalLight = "asmphysicallight",
  /** 装配子组 */
  AsmSubGroup = "asmsubgroup"
}

/**
 * 光源编辑标志枚举
 * 用于标记光源的编辑状态
 */
export enum LightEditFlagEnum {
  /** 多重操作标志 */
  multiAction = 1
}

/**
 * 光源序列化/反序列化接口
 * 负责光源数据的持久化和加载
 */
export declare class Light_IO extends Entity_IO {
  /**
   * 导出光源数据为可序列化对象
   * @param entity - 要导出的光源实体
   * @param callback - 自定义导出处理回调
   * @param includeMetadata - 是否包含元数据
   * @param options - 导出选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: Light,
    callback?: (data: unknown[], entity: Light) => void,
    includeMetadata?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * 从序列化数据加载光源
   * @param entity - 目标光源实体
   * @param data - 序列化的数据对象
   * @param options - 加载选项
   */
  load(
    entity: Light,
    data: LightSerializedData,
    options?: Record<string, unknown>
  ): void;
}

/**
 * 光源序列化数据结构
 */
interface LightSerializedData {
  /** 色温（开尔文） */
  temperature?: number;
  /** 光照强度 */
  intensity: number;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** RGB颜色值 */
  rgb?: string | number[];
  /** 是否影响高光 */
  affectSpecular?: boolean;
  /** 是否关闭 */
  close?: boolean;
  /** 是否启用体积光 */
  volumeLight?: boolean;
  /** 友好索引（用于UI显示） */
  friendlyIndex?: number;
  /** 光源类型 */
  type?: LightTypeEnum;
  /** 源内容类型 */
  sourceContentType?: string;
  /** 所属光源组ID */
  group?: string;
}

/**
 * 光源实体类
 * 表示场景中的虚拟或物理光源
 */
export declare class Light extends Entity {
  /** 非活动状态的友好索引常量 */
  static readonly INACTIVE_FRIENDLY_INDEX: 0;
  /** 默认尺寸常量 */
  static readonly DEFAULT_SIZE: 0.1;

  /** 光源所有者（通常是光源组） */
  owner: LightGroup | null;

  /** 色温（开尔文），undefined表示使用组温度 */
  temperature?: number;
  
  /** 光照强度（0-1或更高） */
  intensity: number;
  
  /** X轴坐标 */
  x: number;
  
  /** Y轴坐标 */
  y: number;
  
  /** Z轴坐标 */
  z: number;
  
  /** 旋转角度（度） */
  rotation: number;
  
  /** 是否关闭光源 */
  close: boolean;
  
  /** IES光度学文件内容 */
  IES: string;
  
  /** IES文件URL */
  iesUrl: string;
  
  /** IES文件是否公开 */
  isPublicIES: boolean;
  
  /** RGB颜色值 */
  rgb?: string | number[];
  
  /** 是否影响材质高光 */
  affectSpecular: boolean;
  
  /** 源内容类型 */
  sourceContentType?: ContentType;
  
  /** 友好索引（用于UI显示顺序） */
  friendlyIndex: number;
  
  /** 关联的真实光源内容ID */
  contentID?: string;
  
  /** 是否启用体积光效果 */
  volumeLight: boolean;
  
  /** 所属光源组 */
  group?: Light;
  
  /** 光源编辑标志位 */
  lightEditFlag: number;

  /** 光源轮廓点集合 */
  outline: Array<{ x: number; y: number }>;

  /**
   * 构造函数
   * @param id - 实体ID
   * @param type - 实体类型
   */
  constructor(id?: string, type?: string);

  /**
   * 判断光源是否使用光源组的色温
   * @returns 如果未设置有效色温则返回true
   */
  readonly isLightGroupTemperature: boolean;

  /**
   * 获取友好索引分组名称
   * @returns 分组名称
   */
  getFriendlyIndexGroup(): string;

  /**
   * 获取有效色温值
   * @returns 色温值，如果未设置则使用组温度或默认4800K
   */
  getTemperature(): number;

  /**
   * 判断光源是否有区域尺寸
   * @returns 是否有区域尺寸
   */
  hasAreaSize(): boolean;

  /**
   * 判断是否为虚拟光源
   * @returns 始终返回true
   */
  isVirtual(): boolean;

  /**
   * 获取光源初始强度（从关联内容读取）
   * @returns 初始强度值
   */
  getInitialIntensity(): number;

  /**
   * 重置光源所有参数为默认值
   */
  reset(): void;

  /**
   * 判断是否为物理光源
   * @param light - 待检查的光源
   * @returns 是否为物理光源
   */
  static isPhysicalLight(light: Light): boolean;

  /**
   * 判断是否为物理光源或网格光源
   * @param light - 待检查的光源
   * @returns 是否为物理或网格光源
   */
  static isPhysicalAndMeshLight(light: Light): boolean;

  /**
   * 判断是否为区域光源
   * @param light - 待检查的光源
   * @returns 是否为区域光源
   */
  static isAreaSourceLight(light: Light): boolean;

  /**
   * 获取IO处理器实例
   * @returns Light_IO单例
   */
  getIO(): Light_IO;

  /**
   * 克隆光源实体
   * @returns 克隆的光源实例
   */
  clone(): Light | undefined;

  /**
   * 获取宿主对象
   * @returns 宿主对象（此类中始终为null）
   */
  getHost(): null;

  /**
   * 判断内容是否在房间内
   * @returns 是否在房间内（此类中始终为false）
   */
  isContentInRoom(): boolean;

  /**
   * 判断数据是否已更改
   * @returns 数据是否有变化
   */
  isDataChanged(): boolean;

  /**
   * 设置数据为初始化状态（清除变更标记）
   */
  setDataInitStatus(): void;

  /**
   * 附加真实光源内容
   */
  attachRealLight(): void;

  /**
   * 刷新内部边界
   */
  refreshBoundInternal(): void;

  /**
   * 关闭或开启光源
   * @param shouldClose - 是否关闭
   */
  closeLight(shouldClose: boolean): void;

  /**
   * 字段变更回调
   * @param fieldName - 字段名
   * @param oldValue - 旧值
   * @param newValue - 新值
   */
  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void;

  /**
   * 判断标志位是否开启
   * @param flag - 标志位
   * @param checkDirty - 是否检查脏标记
   * @param checkGroup - 是否检查光源组
   * @returns 标志位是否开启
   */
  isFlagOn(flag: number, checkDirty?: boolean, checkGroup?: boolean): boolean;

  /**
   * 判断标志位是否关闭
   * @param flag - 标志位
   * @param checkDirty - 是否检查脏标记
   * @param checkGroup - 是否检查光源组
   * @returns 标志位是否关闭
   */
  isFlagOff(flag: number, checkDirty?: boolean, checkGroup?: boolean): boolean;

  /**
   * 实体脏标记回调
   */
  onEntityDirty(): void;

  /**
   * 镜像变换
   * @param position - 镜像轴位置
   * @param isHorizontal - 是否水平镜像
   */
  mirror(position: number, isHorizontal: boolean): void;

  /**
   * 获取渲染参数
   * @returns 渲染所需参数对象
   */
  getRenderParameters(): {
    rotationPoint: (
      x: number,
      y: number,
      z: number,
      xRotation: number,
      yRotation: number,
      zRotation: number
    ) => [number, number, number];
    volumeLight: boolean;
  };

  /**
   * 判断是否为指定光源组的子元素
   * @param group - 待检查的光源组
   * @returns 是否为子元素
   */
  isGroupChildOf(group: Light): boolean;

  /**
   * 设置光源编辑标志位
   * @param flag - 标志位
   * @param enable - 是否启用
   */
  setLightEditFlag(flag: LightEditFlagEnum, enable: boolean): void;

  /**
   * 标志位变更回调
   * @param event - 标志变更事件
   */
  onFlagChanged(event: FlagChangedEvent): void;

  /**
   * 获取边界数据
   * @returns 包含位置和旋转的边界信息
   */
  getBoundingData(): {
    x: number;
    y: number;
    z: number;
    rotation: {
      XRotation: number;
      YRotation: number;
      ZRotation: number;
    };
  };
}

/**
 * 标志变更事件数据
 */
interface FlagChangedEvent {
  data: {
    flag: number;
  };
}