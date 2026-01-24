/**
 * 添加PAssembly请求类
 * 用于在场景中添加3D模型组件（PAssembly）及其关联对象
 */
declare class AddPAssemblyRequest extends HSCore.Transaction.Request {
  /**
   * 原始元数据
   */
  private _meta: PAssemblyMetadata;

  /**
   * 用户自定义数据模式
   */
  private _schema: PAssemblySchema;

  /**
   * 吸附/捕捉的子对象列表
   */
  private _snappedObjects: SnappedObject[] | null;

  /**
   * 3D空间位置坐标
   */
  private _position: Position3D;

  /**
   * 旋转角度（弧度或欧拉角）
   */
  private _rotation: number | Rotation3D;

  /**
   * 宿主对象（父级PAssembly）
   */
  private _host: HSCore.Model.PAssembly | null;

  /**
   * 缩放比例
   */
  private _scale: Scale3D | null;

  /**
   * 翻转标志（0=无翻转）
   */
  private _flip: number;

  /**
   * PAssembly规格配置（提交后生成）
   */
  private _spec: PAssemblySpec;

  /**
   * 添加捕捉内容的子请求列表
   */
  private _addSnappedContentRequsts?: AddPAssemblyRequest[];

  /**
   * 预处理器函数列表（在创建前执行）
   */
  prevProcessors: Array<(meta: PAssemblyMetadata, schema: PAssemblySchema) => void>;

  /**
   * 后处理器函数列表（在创建后执行）
   */
  postProcessors: Array<(meta: PAssemblyMetadata, pAssembly: HSCore.Model.PAssembly) => void>;

  /**
   * 构造函数
   * @param meta - PAssembly元数据
   * @param position - 初始位置（默认原点）
   * @param rotation - 初始旋转（默认0）
   * @param scale - 缩放比例
   * @param host - 宿主对象
   * @param flip - 翻转标志（默认0）
   */
  constructor(
    meta: PAssemblyMetadata,
    position?: Position3D,
    rotation?: number | Rotation3D,
    scale?: Scale3D,
    host?: HSCore.Model.PAssembly,
    flip?: number
  );

  /**
   * 提交请求，创建PAssembly及其子对象
   * @returns 创建的PAssembly实例
   */
  onCommit(): HSCore.Model.PAssembly;

  /**
   * 撤销操作，移除PAssembly及子对象
   */
  onUndo(): void;

  /**
   * 重做操作，重新添加PAssembly
   */
  onRedo(): void;

  /**
   * 根据类型获取对应的PAssembly类
   * @param type - PAssembly类型
   * @returns 模型类
   */
  getPAssemblyClass(type: string): typeof HSCore.Model.PAssembly;

  /**
   * 添加PAssembly到场景
   * @param spec - PAssembly规格
   */
  private _addPAssembly(spec: PAssemblySpec): void;

  /**
   * 创建所有捕捉的子对象
   * @param pAssembly - 父PAssembly对象
   */
  private _createSnappedObject(pAssembly: HSCore.Model.PAssembly): void;

  /**
   * 创建单个捕捉对象的请求
   * @param snappedObj - 捕捉对象配置
   * @param parentPAssembly - 父PAssembly
   * @returns 创建的请求或null
   */
  private _createSnappedObjectRequest(
    snappedObj: SnappedObject,
    parentPAssembly: HSCore.Model.PAssembly
  ): AddPAssemblyRequest | null;

  /**
   * 静态工厂方法：创建并提交PAssembly
   * @param meta - 元数据
   * @param position - 位置
   */
  createPAssembly(meta: PAssemblyMetadata, position: Position3D): void;
}

/**
 * 3D位置坐标
 */
interface Position3D {
  x: number;
  y: number;
  z?: number;
}

/**
 * 3D旋转（欧拉角，弧度）
 */
interface Rotation3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 3D缩放比例
 */
interface Scale3D {
  XScale: number;
  YScale: number;
  ZScale: number;
}

/**
 * PAssembly元数据
 */
interface PAssemblyMetadata {
  /** 组件版本 */
  pAssemblyVersion?: number;
  /** 用户自定义数据 */
  userFreeData?: UserFreeData;
  /** 用户模式（已弃用，迁移到userFreeData） */
  userSchema?: PAssemblySchema;
  /** 内容类型 */
  contentType?: HSCatalog.ContentType;
  /** 扩展元数据 */
  metadata?: {
    extension?: {
      objInfo?: {
        planes?: Record<string, { points: Array<{ z: number }> }>;
      };
    };
  };
}

/**
 * 用户自由数据结构
 */
interface UserFreeData {
  /** 组件配置列表（v1版本） */
  assemblies?: Array<{
    peerSnappingObjects?: SnappedObject[];
  }>;
  /** 对等捕捉对象（v2+版本） */
  peerSnappingObjects?: SnappedObject[];
}

/**
 * PAssembly数据模式
 */
interface PAssemblySchema {
  /** 模型类型 */
  type: string;
  [key: string]: unknown;
}

/**
 * 捕捉对象配置
 */
interface SnappedObject {
  /** 目标产品ID */
  seekId: string;
  /** 子对象ID（可选） */
  childId?: string;
  /** 位置偏移 */
  offset?: Position3D;
  /** 旋转偏移 */
  rotation?: Rotation3D;
  /** 强制位置（覆盖计算值） */
  force?: Partial<Position3D>;
}

/**
 * PAssembly规格配置
 */
interface PAssemblySpec {
  /** PAssembly实例 */
  pAssembly: HSCore.Model.PAssembly;
  /** 宿主对象 */
  host?: HSCore.Model.PAssembly;
  /** 父级图层 */
  parent?: HSCore.Model.Layer;
}

export default AddPAssemblyRequest;