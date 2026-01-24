import * as THREE from 'three';

/**
 * 方向类型
 * - 'left': 左侧
 * - 'right': 右侧
 * - 'outer': 外侧
 * - 'inner': 内侧
 */
type DirectionType = 'left' | 'right' | 'outer' | 'inner';

/**
 * 平面选项配置
 */
interface PlaneOption {
  /** 是否独立处理 */
  independent: boolean;
}

/**
 * 路径平面数据
 */
interface PathPlaneData {
  /** 3D路径点数组 */
  paths: THREE.Vector3[][];
  /** Three.js平面对象 */
  plane: THREE.Plane;
  /** 平面配置选项 */
  planeOption: PlaneOption;
  /** X射线向量 */
  xRay: THREE.Vector3;
}

/**
 * 方向信息配置
 */
interface DirectionInfo {
  /** 垂直线向量,默认为(0,0,1) */
  verticalLine?: THREE.Vector3;
  /** 方向类型,默认为'inner' */
  dir?: DirectionType;
}

/**
 * 轮廓数据配置
 */
interface ProfileData {
  /** 轮廓数据对象 */
  data?: {
    /** 标准分辨率轮廓 */
    profile?: unknown;
    /** 高分辨率轮廓 */
    profileHigh?: unknown;
  };
  /** 轮廓定义(兼容旧格式) */
  profile?: unknown;
  /** 高分辨率轮廓(兼容旧格式) */
  profileHigh?: unknown;
}

/**
 * 线条造型输入参数
 */
interface MoldingInput {
  /** 线条造型的唯一名称 */
  name: string;
  /** 路径点数组 */
  paths: THREE.Vector3[][];
  /** 完整路径数组 */
  wholePaths: THREE.Vector3[][];
  /** 方向信息 */
  dirInfo: DirectionInfo;
  /** 轮廓数据 */
  profileData?: ProfileData;
  /** 是否保持轮廓坐标系,默认为true */
  bKeepProfileCordinate?: boolean;
}

/**
 * 内部存储的线条造型数据
 */
interface InternalMoldingData {
  /** 路径点数组 */
  paths: THREE.Vector3[][];
  /** 完整路径数组 */
  wholePaths: THREE.Vector3[][];
  /** 垂直线向量 */
  verticalLine: THREE.Vector3;
  /** 方向类型 */
  dir: DirectionType;
  /** 轮廓数据 */
  profileData?: ProfileData;
  /** 是否保持轮廓坐标系 */
  bKeepProfileCordinate: boolean;
}

/**
 * 文档JSON数据结构
 */
interface DocumentJSON {
  /** 是否处于快速计算模式 */
  isDuringFastComputation: boolean;
  /** 自定义数据 */
  customData?: {
    /** UV基准点数组 */
    uvBasePoints?: THREE.Vector3[];
  };
  /** 缓存ID */
  cachedID?: string;
  /** 其他动态属性 */
  [key: string]: unknown;
}

/**
 * 草图模型数据
 */
interface SketchModelData {
  /** 模型类型 */
  type: string;
  /** 其他动态属性 */
  [key: string]: unknown;
}

/**
 * 图形数据面片
 */
interface GraphicsFace {
  /** 草图模型数据 */
  sketchModelData: SketchModelData;
  /** 其他动态属性 */
  [key: string]: unknown;
}

/**
 * 图形数据结果
 */
interface GraphicsDataResult {
  /** 面片数组 */
  faces: GraphicsFace[];
  /** 其他动态属性 */
  [key: string]: unknown;
}

/**
 * WebCAD线条造型文档类
 * 用于管理和生成3D线条造型(如踢脚线、装饰线等)的文档对象
 */
export declare class WebCadMoldingDocument {
  /**
   * 标记文档是否需要重新计算
   * @default true
   */
  dirty: boolean;

  /**
   * 存储所有线条造型数据的Map
   * @private
   */
  private _moldings: Map<string, InternalMoldingData>;

  /**
   * 文档的JSON表示
   * @private
   */
  private _documentJSON?: DocumentJSON;

  /**
   * 标准分辨率网格数据
   * @private
   */
  private _meshes?: GraphicsFace[];

  /**
   * 高分辨率网格数据
   * @private
   */
  private _highResolutionMeshes?: GraphicsFace[];

  /**
   * 构造函数
   * 初始化空的线条造型文档
   */
  constructor();

  /**
   * 设置平面信息
   * @param paths - 路径点数组
   * @param planeDataArray - 平面数据数组(输出参数)
   * @param direction - 方向类型
   * @private
   */
  private _setPlane(
    paths: THREE.Vector3[][],
    planeDataArray: PathPlaneData[],
    direction: DirectionType
  ): void;

  /**
   * 获取带方向信息的主机路径
   * @param moldingData - 线条造型数据
   * @param planeDataArray - 平面数据数组(输出参数)
   * @private
   */
  private _getHostPathsWithDirInfo(
    moldingData: InternalMoldingData,
    planeDataArray: PathPlaneData[]
  ): void;

  /**
   * 获取所有主机路径
   * @returns 路径平面数据数组
   * @private
   */
  private _getHostPaths(): PathPlaneData[];

  /**
   * 同步计算所有线条造型
   * 生成标准分辨率的网格数据
   */
  compute(): void;

  /**
   * 异步计算所有线条造型
   * @param useHighResolution - 是否使用高分辨率,默认为false
   * @returns Promise<void>
   */
  computeAsync(useHighResolution?: boolean): Promise<void>;

  /**
   * 获取图形数据(同步)
   * 仅返回类型为'MOLDING'的面片
   * @returns 图形面片数组
   */
  getGraphicsData(): GraphicsFace[];

  /**
   * 获取图形数据(异步)
   * @param useHighResolution - 是否使用高分辨率,默认为false
   * @returns Promise<GraphicsFace[]> 图形面片数组
   */
  getGraphicsDataAsync(useHighResolution?: boolean): Promise<GraphicsFace[]>;

  /**
   * 获取文档的JSON表示
   * @returns 文档JSON对象
   */
  getDocumentJSON(): DocumentJSON | undefined;

  /**
   * 添加线条造型到文档
   * 如果同名的线条造型已存在且数据相同,则不更新
   * @param molding - 线条造型输入参数
   * @returns 返回当前实例以支持链式调用
   */
  addMolding(molding: MoldingInput): this;
}

/**
 * 全局WebCAD模型API
 * 提供路径和线条造型的处理功能
 */
declare global {
  namespace WebCADModelAPI {
    /**
     * 添加路径(同步)
     * @param doc - 文档JSON对象
     * @param paths - 路径平面数据数组
     * @returns 更新后的文档JSON
     */
    function addPaths(doc: DocumentJSON, paths: PathPlaneData[]): DocumentJSON;

    /**
     * 添加路径(异步)
     * @param doc - 文档JSON对象
     * @param paths - 路径平面数据数组
     * @returns Promise<DocumentJSON> 更新后的文档JSON
     */
    function addPathsAsync(
      doc: DocumentJSON,
      paths: PathPlaneData[]
    ): Promise<DocumentJSON>;

    /**
     * 添加线条造型(同步)
     * @param doc - 文档JSON对象
     * @param path - 单条路径
     * @param wholePath - 完整路径
     * @param profileData - 轮廓数据
     * @param param5 - 保留参数(未使用)
     * @param param6 - 保留参数(未使用)
     * @param keepProfileCoordinate - 是否保持轮廓坐标系
     * @returns 更新后的文档JSON
     */
    function addMolding(
      doc: DocumentJSON,
      path: THREE.Vector3[],
      wholePath: THREE.Vector3[],
      profileData?: ProfileData,
      param5?: boolean,
      param6?: boolean,
      keepProfileCoordinate?: boolean
    ): DocumentJSON;

    /**
     * 添加线条造型(异步)
     * @param doc - 文档JSON对象
     * @param path - 单条路径
     * @param wholePath - 完整路径
     * @param profileData - 轮廓数据
     * @param param5 - 保留参数(未使用)
     * @param param6 - 保留参数(未使用)
     * @param keepProfileCoordinate - 是否保持轮廓坐标系
     * @returns Promise<DocumentJSON> 更新后的文档JSON
     */
    function addMoldingAsync(
      doc: DocumentJSON,
      path: THREE.Vector3[],
      wholePath: THREE.Vector3[],
      profileData?: ProfileData,
      param5?: boolean,
      param6?: boolean,
      keepProfileCoordinate?: boolean
    ): Promise<DocumentJSON>;

    /**
     * 获取图形数据(同步)
     * @param doc - 文档JSON对象
     * @param param2 - 保留参数(未使用)
     * @returns 图形数据结果
     */
    function getGraphicsData(
      doc: DocumentJSON,
      param2?: boolean
    ): GraphicsDataResult;

    /**
     * 获取图形数据(异步)
     * @param doc - 文档JSON对象
     * @param param2 - 保留参数(未使用)
     * @returns Promise<GraphicsDataResult> 图形数据结果
     */
    function getGraphicsDataAsync(
      doc: DocumentJSON,
      param2?: boolean
    ): Promise<GraphicsDataResult>;
  }
}