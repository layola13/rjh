/**
 * 实体对象接口
 */
interface IEntity {
  seekId: string;
  XSize: number;
  ZSize: number;
  contentType?: IContentType;
  metadata: IMetadata;
  getParentsInPath(): IEntity[];
  getMaterial(name: string): IMaterial | undefined;
}

/**
 * 内容类型接口
 */
interface IContentType {
  isTypeOf(type: unknown): boolean;
}

/**
 * 元数据接口
 */
interface IMetadata {
  scaleRule?: IScaleRuleWrapper;
  extension: {
    objInfo: {
      bounding?: Record<string, IMeshData>;
      [key: string]: unknown;
    };
  };
}

/**
 * 缩放规则包装器
 */
interface IScaleRuleWrapper {
  data: IScaleRule;
}

/**
 * 缩放规则配置
 */
interface IScaleRule {
  meshes: Record<string, IMeshScaleConfig>;
}

/**
 * 网格缩放配置
 */
interface IMeshScaleConfig {
  ovrd_mtl?: string;
  hscale?: boolean;
  wscale?: boolean;
  self_locate?: boolean;
  placeholder_locate?: boolean;
  dependencies?: string[];
  width?: string;
  height?: string;
  x?: string;
  y?: string;
  z?: string;
}

/**
 * 网格数据
 */
interface IMeshData {
  obj_name: string;
  max_vertex?: IVector3Data;
  min_vertex?: IVector3Data;
  offsetcenter?: THREE.Vector3;
  textureMatrix?: THREE.Matrix4;
  matrixWorld?: THREE.Matrix4;
  Matrixlocal?: THREE.Matrix4;
  MatrixdoorWorld?: THREE.Matrix4;
  repeatx?: number;
  repeaty?: number;
  offsetx?: number;
  offsety?: number;
}

/**
 * 三维向量数据
 */
interface IVector3Data {
  x: number;
  y: number;
  z: number;
}

/**
 * 材质接口
 */
interface IMaterial {
  tileSize_x?: number;
  tileSize_y?: number;
}

/**
 * 父级信息
 */
interface IParentInfo {
  offset: THREE.Vector3;
  quat: THREE.Quaternion;
}

/**
 * 自定位网格计算结果
 */
interface ISelfLocateMeshResult {
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
  z: number;
}

/**
 * 实体矩阵数据
 */
interface IEntityMatrixData {
  pos: THREE.Vector3;
  quat: THREE.Quaternion;
}

/**
 * 判断实体是否为参数化推拉门
 */
declare function isParamSwingDoor(entity: unknown): entity is IEntity;

/**
 * 内容网格处理器
 * 负责处理3D内容的网格变换、缩放和材质更新
 */
export declare class ContentGridHandler {
  /** 网格矩阵索引 */
  private meshMatrix: number[][];
  
  /** 占位符起始索引常量 */
  private readonly PlaceHolderStartIndex: number;
  
  /** 网格包围盒缓存 */
  private meshBoundings: Map<string, THREE.Box3>;
  
  /** 网格尺寸缓存 */
  private sizes: Map<number, THREE.Vector3>;
  
  /** 网格实例列表 */
  private gridMeshes: IMeshData[];
  
  /** 包围盒数据缓存 */
  private boundingBoxData: Map<string, THREE.Box3>;
  
  /** 网格名称到数据的映射 */
  private meshesMap: Map<string, IMeshData>;
  
  /** 关联的实体对象 */
  private entity: IEntity;
  
  /** 缩放规则配置 */
  private scaleRule?: IScaleRule;
  
  /** 包围盒尺寸 */
  private boundingSize?: THREE.Vector3;
  
  /** 自定位临时数据（用于特殊情况调试） */
  private temp4SelfLocate?: IVector3Data;

  /**
   * 构造函数
   * @param entity - 要处理的实体对象
   */
  constructor(entity: IEntity);

  /**
   * 检查实体是否有参数化推拉门父级
   * @returns 如果父级路径中存在参数化推拉门则返回 true
   */
  hasParamSwingDoorParent(): boolean;

  /**
   * 更新自定位网格的变换矩阵
   * @param meshes - 网格数据数组
   */
  updateSelfLocateMeshes(meshes: IMeshData[]): void;

  /**
   * 获取所有自定位网格的计算结果
   * @param meshes - 网格数据数组
   * @returns 网格名称到计算结果的映射
   */
  private getSelfLocateMeshResults(meshes: IMeshData[]): Map<string, ISelfLocateMeshResult>;

  /**
   * 计算单个自定位网格的位置和尺寸
   * @param mesh - 网格数据
   * @param dependencies - 依赖的其他网格结果
   * @returns 计算结果，如果失败则返回 null
   */
  private getSelfLocateMeshResult(
    mesh: IMeshData,
    dependencies: ISelfLocateMeshResult[]
  ): ISelfLocateMeshResult | null;

  /**
   * 构建网格矩阵索引结构
   * @param meshes - 网格数据数组
   */
  private _buildMatrix(meshes: IMeshData[]): void;

  /**
   * 根据实体尺寸计算网格的新尺寸
   * @param meshes - 网格数据数组
   * @param sizes - 原始尺寸映射
   * @returns 计算后的新尺寸映射
   */
  private _computeNewSizes(
    meshes: IMeshData[],
    sizes: Map<number, THREE.Vector3>
  ): Map<number, THREE.Vector3>;

  /**
   * 获取多个网格的整体包围盒
   * @param meshes - 网格数据数组
   * @returns 包围盒对象
   */
  getMeshesBounding(meshes: IMeshData[]): THREE.Box3;

  /**
   * 获取单个网格的包围盒
   * @param mesh - 网格数据
   * @returns 包围盒对象，如果无法计算则返回 undefined
   */
  getMeshBounding(mesh: IMeshData): THREE.Box3 | undefined;

  /**
   * 判断网格是否为主体网格
   * @param mesh - 网格数据
   * @returns 如果是主体网格返回 true
   */
  private _isBodyMesh(mesh: IMeshData): boolean;

  /**
   * 更新单个网格的纹理坐标
   * @param mesh - 网格数据
   * @param boundingBox - 参考包围盒
   */
  private _updateTexture(mesh: IMeshData, boundingBox: THREE.Box3): void;

  /**
   * 更新所有网格的纹理坐标
   * @param meshes - 网格数据数组
   */
  updateTexture(meshes: IMeshData[]): void;

  /**
   * 获取父级实体的位置和旋转信息
   * @param entity - 实体对象
   * @returns 父级信息对象
   */
  getParentInfo(entity: IEntity): IParentInfo;

  /**
   * 更新网格材质的平铺布局
   * @param mesh - 单个网格模板
   * @param size - 平铺区域尺寸
   * @param offset - 平铺起始偏移
   */
  updateGridMaterialMesh(
    mesh: IMeshData,
    size: THREE.Vector3,
    offset: IVector3Data
  ): void;

  /**
   * 旋转偏移向量以匹配实体的世界空间方向
   * @param offset - 偏移向量
   * @param entity - 实体对象
   * @returns 旋转后的向量
   */
  rotOffset(offset: THREE.Vector3, entity: IEntity): THREE.Vector3;

  /**
   * 更新所有图形数据（主入口方法）
   * @param needRotate - 是否需要应用旋转变换
   */
  updateGraphicsData(needRotate: boolean): void;

  /**
   * 将视图空间坐标转换为模型空间坐标
   * @param viewSpaceCoord - 视图空间坐标
   * @returns 模型空间坐标
   */
  ViewSpaceToModelSpace(viewSpaceCoord: THREE.Vector3): IVector3Data;
}