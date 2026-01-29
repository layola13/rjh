/**
 * DoorTypeEnum - 门类型枚举
 * 定义室内门、入户门和室外门的类型标识
 */
export enum DoorTypeEnum {
  /** 室内门 */
  InteriorDoor = "interiorDoor",
  /** 入户门 */
  EntryDoor = "entryDoor",
  /** 室外门 */
  OutdoorDoor = "outdoorDoor"
}

/**
 * DoorDirEnum - 门开启方向枚举
 * 定义门的四种开启方向
 */
export enum DoorDirEnum {
  /** 外开左 */
  OuterLeft = "outerLeft",
  /** 外开右 */
  OuterRight = "outerRight",
  /** 内开右 */
  InnerRight = "innerRight",
  /** 内开左 */
  InnerLeft = "innerLeft"
}

/**
 * 材质覆盖配置接口
 */
interface MaterialOverride {
  /** X轴偏移 */
  offsetX?: number;
  /** Y轴偏移 */
  offsetY?: number;
  /** X轴平铺尺寸 */
  tileSize_x?: number;
  /** Y轴平铺尺寸 */
  tileSize_y?: number;
  /** 初始X轴平铺尺寸 */
  initTileSize_x?: number;
  /** 初始Y轴平铺尺寸 */
  initTileSize_y?: number;
}

/**
 * 材质对象接口
 */
interface MaterialObject {
  /** 材质纹理 */
  texture?: any;
  /** 材质覆盖配置 */
  override?: MaterialOverride;
  /** 纹理旋转角度 */
  textureRotation?: number;
  /** 漫反射贴图UV变换矩阵 */
  diffuseMapUvTransform?: THREE.Matrix3;
  /** 法线贴图UV变换矩阵 */
  normalMapUvTransform?: THREE.Matrix3;
  /** 内容ID */
  contentID?: string;
}

/**
 * 基础对象数据接口
 */
interface BasicObjectData {
  /** 实体ID */
  entityId: string;
  /** 查找ID */
  seekId: string;
  /** 内容类型 */
  contentType: string;
  /** 是否选中 */
  selected: boolean;
  /** 是否可见 */
  visible: boolean;
  /** 姿态数据 */
  poseData: any;
}

/**
 * 房间信息接口
 */
interface RoomInfo {
  /** 房间类型 */
  roomType: string;
}

/**
 * 门信息接口
 */
interface DoorInfo extends RoomInfo {
  /** 门类型 */
  doorType?: DoorTypeEnum;
}

/**
 * 自定义属性接口
 */
interface CustomAttrs {
  /** 房间类型 */
  roomType: string;
  /** 门类型 */
  doorType: string;
  /** 门开启方向 */
  dir?: DoorDirEnum;
  /** 偏移量 */
  offset?: any;
  /** 是否材质替换 */
  isMaterialRep?: boolean;
}

/**
 * 图形对象数据接口
 */
interface GraphicsObjectData extends BasicObjectData {
  /** 图形路径 */
  graphicsPath: string;
  /** 对象类型 */
  type: string;
  /** 包围盒 */
  bounding: Float32Array;
  /** 局部变换矩阵 */
  matrixLocal?: THREE.Matrix4;
  /** 位置 */
  position?: Float32Array;
  /** 旋转四元数 */
  rotation?: Float32Array;
  /** 缩放 */
  scale?: Float32Array;
  /** 局部位置 */
  localPosition?: Float32Array;
  /** 局部旋转 */
  localRotation?: Float32Array;
  /** 局部缩放 */
  localScale?: Float32Array;
  /** 材质对象 */
  material: MaterialObject;
  /** 3D模型 */
  model: any;
  /** 组件名称 */
  component?: string;
  /** 自定义属性 */
  customAttrs: CustomAttrs;
  /** 模拟内容ID */
  simulatedContentId?: string;
  /** 口袋材质 */
  pocketMaterial?: string;
  /** 父级查找ID */
  parentSeekId?: string;
  /** 是否材质替换 */
  isMaterialRep?: boolean;
  /** 裁剪网格列表 */
  clipMeshes?: string[];
}

/**
 * 网格定义接口
 */
interface MeshDef {
  /** 网格键 */
  meshKey: string;
  /** 裁剪信息 */
  clipInfo?: ClipInfo;
}

/**
 * 裁剪信息接口
 */
interface ClipInfo {
  /** 是否填充裁剪 */
  fillClip?: boolean;
  /** 是否挤出裁剪 */
  extrudeClip?: boolean;
  /** 坐标系 */
  coordinate?: any;
  /** 循环路径点集 */
  loop?: number[][];
}

/**
 * 图形数据接口
 */
interface GraphicsData {
  /** 图形对象列表 */
  objects: GraphicsObjectData[];
  /** 网格定义列表 */
  meshDefs: MeshDef[];
}

/**
 * UV变换结果接口
 */
interface UvTransformResult {
  /** 漫反射贴图UV变换矩阵 */
  diffuseMapUvTransform: THREE.Matrix3;
  /** 法线贴图UV变换矩阵 */
  normalMapUvTransform: THREE.Matrix3;
}

/**
 * 变换信息接口
 */
interface TransformInfo {
  /** 位置 */
  pos?: THREE.Vector3;
  /** 四元数旋转 */
  qut?: THREE.Quaternion;
  /** 缩放 */
  scl?: THREE.Vector3;
}

/**
 * DIY内容变换信息接口
 */
interface DiyContentTransInfo {
  /** 结果位置 */
  resultPosition: THREE.Vector3;
  /** 旋转 */
  rotation: THREE.Quaternion;
  /** 缩放 */
  scale: THREE.Vector3;
}

/**
 * 网格数据接口
 */
interface MeshData {
  /** 对象名称 */
  obj_name: string;
  /** 世界变换矩阵 */
  matrixWorld?: THREE.Matrix4;
  /** 局部变换矩阵 */
  Matrixlocal: THREE.Matrix4;
  /** X轴重复次数 */
  repeatx?: number;
  /** Y轴重复次数 */
  repeaty?: number;
  /** X轴偏移 */
  offsetx?: number;
  /** Y轴偏移 */
  offsety?: number;
  /** 网格索引 */
  index?: number;
  /** 偏移量 */
  offset?: any;
}

/**
 * 图形数据配置接口
 */
interface GraphicsDataConfig {
  /** 包围盒 */
  bounding: any;
  /** 宿主信息 */
  host: DoorInfo;
  /** 网格名称 */
  meshName?: string;
  /** 是否材质替换 */
  isMaterialRep?: boolean;
  /** 索引 */
  index?: number;
  /** 偏移量 */
  offset?: any;
}

/**
 * Content - 内容对象类
 * 继承自BaseObject，表示场景中的内容实体（如门、窗帘、家具等）
 */
export declare class Content {
  /** 实体对象 */
  protected entity: any;
  
  /** 信号钩子 */
  protected signalHook: any;
  
  /** 裁剪器 */
  protected clipper?: any;
  
  /** 几何体脏标记 */
  protected geometryDirty: boolean;
  
  /** 局部变换矩阵 */
  protected _matrixLocal: THREE.Matrix4;
  
  /** 父节点 */
  protected parent: any;
  
  /** 上下文对象 */
  protected context: any;

  /**
   * 构造函数
   * @param entity 实体对象
   * @param context 上下文
   * @param parent 父对象
   */
  constructor(entity: any, context: any, parent: any);

  /**
   * 材质变更事件处理
   */
  protected onMaterialChanged(): void;

  /**
   * 转换为基础对象数据
   * @returns 基础对象数据
   */
  protected toBasicObject(): BasicObjectData;

  /**
   * 更新位置信息
   */
  protected onUpdatePosition(): void;

  /**
   * 创建UV变换矩阵
   * @param materialObj 材质对象
   * @returns UV变换结果，如果材质对象为空则返回undefined
   */
  protected _createUvTransform(materialObj?: MaterialObject): UvTransformResult | undefined;

  /**
   * 调整材质尺寸
   * @param material 材质对象
   * @returns 调整后的材质
   */
  protected resizeMaterial(material: any): any;

  /**
   * 获取内容材质
   * @param entity 实体对象
   * @param meshName 网格名称
   * @returns 材质对象
   */
  protected getContentMaterial(entity: any, meshName?: string): MaterialObject;

  /**
   * 获取房间信息
   * @param entity 实体对象
   * @returns 房间信息
   */
  protected _getRoomInfo(entity: any): RoomInfo;

  /**
   * 获取门类型
   * @returns 门类型枚举值
   */
  protected _getDoorType(): DoorTypeEnum | "";

  /**
   * 更新房间自定义属性
   * @returns 房间信息对象
   */
  updateRoomCustomAttrs(): RoomInfo;

  /**
   * 获取门开启方向
   * @param entity 门实体对象
   * @returns 门开启方向枚举值
   */
  protected _getDoorDir(entity: any): DoorDirEnum | undefined;

  /**
   * 获取DIY内容变换信息
   * @param entity 实体对象
   * @returns DIY内容变换信息
   */
  protected _getDiyContentTransInfo(entity: any): DiyContentTransInfo;

  /**
   * 处理门的局部变换矩阵
   * @param door 门实体对象
   * @returns 变换矩阵
   */
  protected _dealDoorLocalMatrix(door: any): THREE.Matrix4;

  /**
   * 设置图形数据
   * @param entity 实体对象
   * @param transform 变换信息
   * @param config 图形数据配置
   * @returns 图形数据
   */
  protected _setGraphicData(
    entity: any,
    transform?: TransformInfo,
    config?: GraphicsDataConfig
  ): GraphicsData;

  /**
   * 获取窗帘图形数据
   * @param entity 实体对象
   * @param transformMap 变换映射表
   * @param bounding 包围盒
   * @param hostInfo 宿主信息
   * @returns 图形数据
   */
  protected _getCurtainGraphicData(
    entity: any,
    transformMap: Map<string, any>,
    bounding: any,
    hostInfo: DoorInfo
  ): GraphicsData;

  /**
   * 处理护墙板图形数据
   * @param entity 实体对象
   * @param config 配置信息
   * @returns 图形数据，如果无法处理则返回null
   */
  dealWainscotGraphicsData(entity: any, config: GraphicsDataConfig): GraphicsData | null;

  /**
   * 获取内容材质数据
   * @param entity 实体对象
   * @param metadata 元数据
   * @param bounding 包围盒
   * @param hostInfo 宿主信息
   * @returns 图形数据，如果无法获取则返回undefined
   */
  protected _getContentMaterialData(
    entity: any,
    metadata: any,
    bounding: any,
    hostInfo: DoorInfo
  ): GraphicsData | undefined;

  /**
   * 转换为图形数据
   * @param forceUpdate 是否强制更新，默认false
   * @returns 图形数据
   */
  toGraphicsData(forceUpdate?: boolean): GraphicsData;

  /**
   * 创建网格定义
   * @param entity 实体对象
   * @param meshData 网格数据
   * @param isMaterialReplacement 是否材质替换
   * @param hostInfo 宿主信息
   * @param bounding 包围盒
   * @param index 索引
   * @returns 图形对象数据
   */
  protected _createMeshDefs(
    entity: any,
    meshData: MeshData,
    isMaterialReplacement: boolean,
    hostInfo: DoorInfo,
    bounding: any,
    index: number
  ): GraphicsObjectData;

  /**
   * 创建内容FGI数据
   * @param entity 实体对象
   * @param hostInfo 宿主信息
   * @param bounding 包围盒
   * @returns 图形数据，如果无法创建则返回null
   */
  protected _createContentFGIData(
    entity: any,
    hostInfo: DoorInfo,
    bounding: any
  ): GraphicsData | null;

  /**
   * 创建切割门FGI数据
   * @param entity 实体对象
   * @param hostInfo 宿主信息
   * @param bounding 包围盒
   * @returns 图形数据，如果无法创建则返回null
   */
  protected _createCuttingDoorFGIData(
    entity: any,
    hostInfo: DoorInfo,
    bounding: any
  ): GraphicsData | null;

  /**
   * 创建切割门网格定义
   * @param entity 实体对象
   * @param meshData 网格数据
   * @param isMaterialReplacement 是否材质替换
   * @param hostInfo 宿主信息
   * @param bounding 包围盒
   * @param index 索引
   * @returns 图形对象数据
   */
  protected _createCuttingDoorMeshDefs(
    entity: any,
    meshData: MeshData,
    isMaterialReplacement: boolean,
    hostInfo: DoorInfo,
    bounding: any,
    index: number
  ): GraphicsObjectData;

  /**
   * 父级替换事件处理
   * @param event 事件对象
   */
  onParentReplaced(event: any): void;

  /**
   * 实体变更通知（内部方法）
   * @param options 选项配置
   */
  protected _entityDirtied(options: any): void;
}