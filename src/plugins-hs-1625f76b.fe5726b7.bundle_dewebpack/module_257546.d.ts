/**
 * 物品替换请求类型定义
 * 用于处理模型内容的智能替换操作
 */

/** 位置坐标接口 */
interface Position {
  x: number;
  y: number;
  z: number;
}

/** 旋转信息接口 */
interface Rotation {
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

/** 尺寸信息接口 */
interface Size {
  XSize: number;
  YSize: number;
  ZSize: number;
}

/** 缩放比例接口 */
interface Scale {
  XScale: number;
  YScale: number;
  ZScale: number;
}

/** 尺寸详情接口 */
interface SizeInfo {
  /** 宽度（毫米） */
  W: number;
  /** 深度（毫米） */
  D: number;
  /** 高度（毫米） */
  H: number;
}

/** 门槛石材质信息接口 */
interface DoorStoneMaterialInfo {
  /** 是否启用门槛石材质 */
  isDoorStoneMaterialEnabled: boolean;
  /** 门槛石材质对象 */
  doorstoneMaterial?: unknown;
}

/** 目标面信息接口 */
interface TargetFaceInfo {
  outer?: unknown;
  newOuter?: unknown;
  targetFaceId?: string | number;
  holes?: unknown[];
  D?: number;
}

/** 旧内容信息接口 */
interface OldContentInfo {
  /** 位置坐标 */
  position: Position;
  /** 尺寸 */
  size: Size;
  /** 旋转对象 */
  rotationObj: Rotation;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 旋转角度 */
  rotation: number;
  /** 宿主对象 */
  host?: unknown;
  /** 父对象 */
  parent?: unknown;
  /** 门槛石材质信息 */
  doorstoneMaterialInfo?: DoorStoneMaterialInfo;
  /** 墙体参数 */
  _wallParam?: unknown;
  /** 关联墙体列表 */
  relatedWalls?: unknown[];
  /** 存储属性 */
  storeProperty?: Map<string, unknown>;
  /** 尺寸信息 */
  sizeInfo?: SizeInfo;
  /** 开门方向 */
  swing?: unknown;
}

/** 替换选项接口 */
interface ReplaceOptions {
  /** 依赖伙伴 */
  depMates?: unknown;
  /** 位置（可选） */
  position?: Position;
  /** 旋转（可选） */
  rotation?: number;
  /** 是否智能替换 */
  isSmartReplace?: boolean;
  /** 元数据映射 */
  metaById?: Map<string, unknown>;
  /** 是否自动构建 */
  autoBuild?: boolean;
}

/** 楼梯更新参数接口 */
interface StairsUpdateParams {
  length?: number;
  width?: number;
  height?: number;
}

/** 移动向量接口 */
interface MoveVector {
  x: number;
  y: number;
}

/**
 * 内容替换请求类
 * 继承自组合请求基类，处理场景中物品的替换逻辑
 */
export default class ReplaceContentRequest {
  /** 当前内容对象 */
  private _content: unknown;
  
  /** 新内容元数据 */
  private _newContentMeta: unknown;
  
  /** 旧内容对象引用 */
  public oldContent: unknown;
  
  /** 依赖伙伴列表 */
  public depMates?: unknown;
  
  /** 缩放比例（用于参数化开口） */
  private _scale?: Scale;
  
  /** 目标位置 */
  private _position: Position;
  
  /** 目标旋转角度 */
  private _rotation: number;
  
  /** 是否智能替换模式 */
  public isSmartReplace?: boolean;
  
  /** 元数据ID映射表 */
  public metaById?: Map<string, unknown>;
  
  /** 是否自动构建 */
  public autoBuild?: boolean;
  
  /** 被移除的软装列表 */
  private _removedSoftCloth: unknown[];
  
  /** 宿主对象 */
  private _host?: unknown;
  
  /** 旧内容详细信息 */
  public oldContentInfo?: OldContentInfo;
  
  /** 新生成的实体对象 */
  public newEntity?: unknown;

  /**
   * 构造函数
   * @param content - 要替换的内容对象
   * @param newContentMeta - 新内容的元数据
   * @param options - 替换选项
   */
  constructor(
    content: unknown,
    newContentMeta: unknown,
    options: ReplaceOptions
  );

  /**
   * 提交请求时执行的核心逻辑
   * @returns 新创建的实体对象
   */
  onCommit(): unknown;

  /**
   * 获取被移除的软装列表
   * @returns 软装对象数组
   */
  getRemovedSoftCloth(): unknown[];

  /**
   * 获取自定义参数化楼梯的更新参数
   * @returns 楼梯尺寸参数
   */
  private _getUpdateNCustomizedParametricStairs(): StairsUpdateParams;

  /**
   * 获取内容对象的属性值
   * @param content - 内容对象
   * @param propertyName - 属性名称
   * @returns 属性值
   */
  private _getPropertyValue(content: unknown, propertyName: string): unknown;

  /**
   * 替换屋顶开口的专用处理
   */
  private _replaceRoofOpening(): void;

  /**
   * 扩展开口属性（复制旧开口的参数到新开口）
   */
  private _extendOpeningProperty(): void;

  /**
   * 更新新参数化开口的位置和属性
   */
  private _updateNewParametricOpening(): void;

  /**
   * 获取旧内容的详细信息
   * @returns 旧内容信息对象
   */
  private _getOldContentInfo(): OldContentInfo;

  /**
   * 恢复附加属性（如门槛石材质等）
   */
  private _restoreAttachProperty(): void;

  /**
   * 初始化新内容的尺寸和位置
   * @param newContent - 新内容对象
   */
  private _initNewContentSizeAndPosition(newContent: unknown): void;

  /**
   * 更新新内容的位置信息
   */
  private _updateNewContentPosition(): void;

  /**
   * 设置内容的宿主对象
   * @param content - 内容对象
   * @param room - 房间对象
   */
  private _setHost(content: unknown, room: unknown): void;

  /**
   * 更新内容的标高（Z轴位置）
   * @param content - 内容对象
   * @param room - 房间对象
   */
  private _updateElevation(content: unknown, room: unknown): void;

  /**
   * 执行吸附操作
   * @param content - 内容对象
   */
  private _doSnapping(content: unknown): void;

  /**
   * 计算到墙体的最小移动向量
   * @param content - 内容对象
   * @param wall - 墙体对象
   * @returns 移动向量
   */
  private _getMinMoveVecToWall(content: unknown, wall: unknown): MoveVector;

  /**
   * 获取默认的自动适配设置
   * @param content - 内容对象
   * @returns 是否自动适配
   */
  private _getDefAutoFit(content: unknown): boolean;

  /**
   * 获取吸附策略列表
   * @param helper - 吸附辅助对象
   * @param content - 内容对象
   * @returns 吸附策略数组
   */
  private _getSnappingStrategies(helper: unknown, content: unknown): unknown[];

  /**
   * 获取操作描述文本
   * @returns 描述字符串
   */
  getDescription(): string;

  /**
   * 获取日志分类
   * @returns 分类枚举值
   */
  getCategory(): unknown;
}