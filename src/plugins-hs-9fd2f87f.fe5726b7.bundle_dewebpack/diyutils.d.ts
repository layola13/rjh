/**
 * DIY工具类 - 提供DIY相关的通用功能和数据处理方法
 * 包括墙体、地板、天花板、内容物等场景元素的数据收集、转换和处理
 */
export declare class DIYUtils {
  /**
   * 遍历所有可见图层
   * @param callback - 对每个图层执行的回调函数
   */
  static forEachShowLayer(callback: (layer: unknown) => void): void;

  /**
   * 显示实时提示信息
   * @param message - 提示消息内容
   * @param duration - 显示时长(毫秒)，默认5000ms
   * @param position - 提示位置
   */
  static showLiveHint(message: string, duration?: number, position?: unknown): void;

  /**
   * 隐藏实时提示信息
   */
  static hideLiveHint(): void;

  /**
   * 显示全屏加载图标
   */
  static showLoadingIcon(): void;

  /**
   * 隐藏全屏加载图标
   */
  static hideLoadingIcon(): void;

  /**
   * 从材质实体获取材质JSON数据
   * @param materialEntity - 材质实体对象
   * @returns 材质的JSON数据对象，包含seekId、透明度等信息
   */
  static getMaterialJsonData(materialEntity: unknown): MaterialJsonData | undefined;

  /**
   * 四舍五入到千分位
   * @param value - 需要处理的数值
   * @returns 精确到0.001的数值
   */
  static roundBuildNum(value: number): number;

  /**
   * 从面收集墙体信息
   * @param faces - 面数组
   * @param walls - 墙体数组
   * @param wallsData - 收集到的墙体数据对象
   * @param layerAltitude - 图层海拔高度
   */
  static collectWallsInfoFromFace(
    faces: unknown[],
    walls: unknown[],
    wallsData: WallsDataCollection,
    layerAltitude: number
  ): void;

  /**
   * 收集墙体信息
   * @param walls - 墙体实体数组
   * @param wallsData - 收集到的墙体数据对象
   * @param layerAltitude - 图层海拔高度
   */
  static collectWallsInfo(
    walls: unknown[],
    wallsData: WallsDataCollection,
    layerAltitude: number
  ): void;

  /**
   * 获取在同一直线上的共线墙体
   * @param wall - 墙体实体
   * @returns 共线墙体数组
   */
  static getCoWallsInLine(wall: unknown): unknown[];

  /**
   * 收集单个墙体的详细信息
   * @param wall - 墙体实体
   * @param layerAltitude - 图层海拔高度
   * @returns 墙体信息对象
   */
  static collectWallInfo(wall: unknown, layerAltitude: number): WallInfo;

  /**
   * 收集开口凹槽信息(门窗洞口的凹槽)
   * @param opening - 开口实体(门/窗/洞)
   * @param loop - 开口轮廓点数组
   * @returns 凹槽信息对象
   */
  static collectOpeningPocketInfo(
    opening: unknown,
    loop: Point2D[]
  ): OpeningPocketInfo | undefined;

  /**
   * 获取开口凹槽的轮廓信息
   * @param opening - 开口实体
   * @param loop - 开口轮廓点数组
   * @returns 凹槽轮廓信息
   */
  static collectOpeningPocketLoop(
    opening: unknown,
    loop: Point2D[]
  ): OpeningPocketInfo | undefined;

  /**
   * 获取混合涂料信息
   * @param material - 材质对象
   * @returns 混合涂料数据，包含涂料路径、UV基准点等信息
   */
  static getMixPaintInfo(material: unknown): MixPaintData | undefined;

  /**
   * 根据面获取关联的楼层信息
   * @param face - 面实体
   * @returns 楼层数组
   */
  static getFloorsByFace(face: unknown): unknown[];

  /**
   * 收集地板信息
   * @param floor - 地板实体
   * @param openings - 地板上的开口数组
   * @param materialData - 材质数据
   * @param paintData - 涂料数据
   * @returns 地板信息对象
   */
  static collectFloorInfo(
    floor: unknown,
    openings: unknown[],
    materialData: MaterialJsonData,
    paintData: unknown
  ): FloorInfo;

  /**
   * 收集天花板信息
   * @param ceiling - 天花板实体
   * @param altitude - 海拔高度
   * @param materialData - 材质数据
   * @returns 天花板信息对象
   */
  static collectCeilingInfo(
    ceiling: unknown,
    altitude: number,
    materialData: MaterialJsonData
  ): CeilingInfo;

  /**
   * 获取内容物(家具、模型等)的图形数据
   * @param content - 内容物实体
   * @returns 包含网格、材质等的图形数据
   */
  static getContentInfo(content: unknown): ContentGraphicsData;

  /**
   * 收集房间内的内容物ID列表
   * @param contents - 所有内容物字典
   * @param walls - 墙体数组
   * @param rooms - 房间数组
   * @returns 房间内内容物的ID数组
   */
  static collectContentsInfoInRoom(
    contents: Record<string, unknown>,
    walls: unknown[] | null,
    rooms: unknown[]
  ): string[];

  /**
   * 获取内容物类型的字符串表示
   * @param contentType - 内容物类型枚举
   * @returns 类型字符串(特征墙/吊顶/地台/个性化)
   */
  static getContentTypeString(contentType: unknown): string;

  /**
   * 上传自定义参数化建模实例到素材库
   * 支持特征墙、吊顶、地台、个性化模型等类型
   */
  static uploadCustomizedPMInstance(): Promise<void>;

  /**
   * 在DIY模式下上传自定义参数化建模实例
   * @param uploadData - 上传数据对象，包含缩略图、模型信息等
   */
  static uploadCustomizedPMInstanceInDiy(uploadData: CustomizedPMUploadData): Promise<void>;

  /**
   * 同步导入自定义参数化建模实例
   * @param modelingHost - 建模宿主对象
   * @param modelData - 模型JSON数据
   * @param contentTypeStr - 内容类型字符串
   * @param originPos - 原点位置
   * @param xLength - X方向长度
   * @param yLength - Y方向长度
   * @param zLength - Z方向长度
   * @param scale - 缩放比例 [x, y, z]
   * @param rotation - 旋转角度 [x, y, z]
   * @returns 创建的实例模型
   */
  static importCustomizedPMInstanceSync(
    modelingHost: unknown,
    modelData: string,
    contentTypeStr: string,
    originPos: Point3D,
    xLength: number,
    yLength: number,
    zLength: number,
    scale?: [number, number, number],
    rotation?: [number, number, number]
  ): unknown;

  /**
   * 异步导入自定义参数化建模实例
   * @param modelingHost - 建模宿主对象
   * @param modelData - 模型JSON数据
   * @param contentTypeStr - 内容类型字符串
   * @param originPos - 原点位置
   * @param xLength - X方向长度
   * @param yLength - Y方向长度
   * @param zLength - Z方向长度
   * @param scale - 缩放比例 [x, y, z]
   * @param rotation - 旋转角度 [x, y, z]
   * @returns Promise，解析为创建的实例模型
   */
  static importCustomizedPMInstance(
    modelingHost: unknown,
    modelData: string,
    contentTypeStr: string,
    originPos: Point3D,
    xLength: number,
    yLength: number,
    zLength: number,
    scale?: [number, number, number],
    rotation?: [number, number, number]
  ): Promise<unknown>;

  /**
   * 编辑模型
   * @param model - 要编辑的模型实体
   * @param newData - 新的模型数据
   * @param shouldDirtyGeometry - 是否标记几何体为脏数据，默认false
   * @returns Promise，解析为更新后的模型
   */
  static editModel(
    model: unknown,
    newData: unknown,
    shouldDirtyGeometry?: boolean
  ): Promise<unknown>;

  /**
   * 获取自定义参数化建模的参数
   * @param requestType - 请求类型(创建/编辑)
   * @param params - 参数数组
   * @returns 包含根模型、建模宿主、建模数据的对象
   */
  static getCustomizedPMParams(
    requestType: string,
    params: unknown[]
  ): CustomizedPMParams;

  /**
   * 获取组件类型属性
   * @param isComponent - 是否为组件实例
   * @returns 属性对象，用于区分组件实例和组类型
   */
  static getComponentTypeAttr(isComponent: boolean): ComponentTypeAttribute;

  /**
   * DIY登出操作
   * 处理退出登录流程，包括清理会话、跳转等
   */
  static diyLoginOut(): void;
}

// ==================== 类型定义 ====================

/**
 * 2D点坐标
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 3D点坐标
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 材质JSON数据
 */
interface MaterialJsonData {
  seekId?: string;
  isTransparent?: boolean;
  [key: string]: unknown;
}

/**
 * 墙体信息
 */
interface WallInfo {
  wall: {
    from: Point2D;
    to: Point2D;
    outerFrom: Point2D;
    outerTo: Point2D;
    height: number;
    drawInner: boolean;
    drawOuter: boolean;
    drawSide: boolean;
    drawTop: boolean;
    ID: string;
    edgeID: string;
    fpMaterialData?: MaterialJsonData;
    fpMaterialDataAnother?: MaterialJsonData;
    isLowWall?: boolean;
  };
  layerAltitude: number;
  wallFaces?: WallFaces;
  isOuterWall?: boolean;
  wallRoomFloorIds?: string[];
  id: string;
  openings?: OpeningInfo[];
  openingPockets?: OpeningPocketInfo[];
  isInnerWall?: boolean;
}

/**
 * 墙体面集合
 */
interface WallFaces {
  frontFaces: FaceLoop[];
  backFaces: FaceLoop[];
  leftFaces: FaceLoop[];
  rightFaces: FaceLoop[];
  topFaces: FaceLoop[];
  bottomFaces: FaceLoop[];
}

/**
 * 面轮廓
 */
interface FaceLoop {
  outerLoop: Point2D[];
  innerLoops: Point2D[][];
}

/**
 * 墙体数据集合
 */
interface WallsDataCollection {
  walls: WallInfo[];
}

/**
 * 开口信息(门窗洞)
 */
interface OpeningInfo {
  loop: Point2D[];
  position: Point3D;
}

/**
 * 开口凹槽信息
 */
interface OpeningPocketInfo {
  loop: Point2D[];
  position: Point3D;
}

/**
 * 混合涂料数据
 */
interface MixPaintData {
  paints: PaintInfo[];
  [key: string]: unknown;
}

/**
 * 涂料信息
 */
interface PaintInfo {
  path: Point2D[];
  uvBasePoint: Point2D;
  material: MaterialJsonData;
  grid?: boolean;
}

/**
 * 地板信息
 */
interface FloorInfo {
  path2d: Point2D[];
  arcPaths?: Point2D[][];
  fpMaterialData: MaterialJsonData;
  paintData: unknown;
  openings: OpeningInfo[];
}

/**
 * 天花板信息
 */
interface CeilingInfo {
  path2d: Point2D[];
  altitude: number;
  arcPaths?: Point2D[][];
  fpMaterialData: MaterialJsonData;
}

/**
 * 内容物图形数据
 */
interface ContentGraphicsData {
  meshMaterials: Record<string, MaterialJsonData[]>;
  entityId: string;
  graphicsData: {
    objects: GraphicsObject[];
    meshDefs: MeshDefinition[];
  };
  parentID: string;
}

/**
 * 图形对象
 */
interface GraphicsObject {
  graphicsPath?: string;
  matrixWorld: unknown;
  XLength?: number;
  YLength?: number;
  ZLength?: number;
  [key: string]: unknown;
}

/**
 * 网格定义
 */
interface MeshDefinition {
  meshKey?: string;
  indexCount: number;
  faceIndices: number[];
  [key: string]: unknown;
}

/**
 * 自定义参数化建模上传数据
 */
interface CustomizedPMUploadData {
  thumbnailDataURL: string;
  contentTypeStr: string;
  freeData: {
    modelInfo: {
      XLength: number;
      YLength: number;
      ZLength: number;
      scale: [number, number, number];
    };
  };
  isComponentIns: boolean;
}

/**
 * 自定义参数化建模参数
 */
interface CustomizedPMParams {
  rootModel?: unknown;
  modelingHost: unknown;
  modelingData: unknown;
}

/**
 * 组件类型属性
 */
interface ComponentTypeAttribute {
  id: string;
  values: Array<{ id: string }>;
}