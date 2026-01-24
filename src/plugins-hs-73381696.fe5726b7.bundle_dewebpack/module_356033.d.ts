/**
 * DIY绘制策略类型声明
 * 用于处理自定义模型的材质吸取和应用
 */

/**
 * 二维坐标点
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 三维坐标点
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 拾取结果
 */
interface PickResult {
  meshId: number;
  point: Point3D;
  viewObject: {
    entity: any;
  };
}

/**
 * 拾取事件参数
 */
interface PickEvent {
  entity: any;
  meshId: number;
  event?: MouseEvent & { ctrlKey: boolean };
  pickResults?: PickResult[];
}

/**
 * 材质数据
 */
interface MaterialData {
  clone(): MaterialData;
  [key: string]: any;
}

/**
 * 绘制信息
 */
interface PaintInfo {
  material?: MaterialData;
  pattern?: any;
  pavingOption?: any;
}

/**
 * 材质吸取结果
 */
interface SuckResult {
  materialData: MaterialData;
  isParamPaint?: boolean;
  paint?: PaintInfo;
}

/**
 * 区域查找结果
 */
interface FindMaterialResult {
  ret?: SuckResult;
  retFlag: boolean;
}

/**
 * 网格块
 */
interface PatternBlock {
  points: Point2D[];
  originalMaterial: MaterialData;
}

/**
 * 网格信息
 */
interface GridInfo {
  freePatternBlocks?: PatternBlock[];
  patternBlocks?: PatternBlock[];
}

/**
 * 区域路径信息
 */
interface RegionPathInfo {
  innerPath?: Point2D[];
  leftTop?: Point2D;
  path: Point2D[];
  material?: MaterialData;
  grid?: GridInfo;
}

/**
 * 几何多边形
 */
interface GeomPolygon {
  outer: Point2D[];
}

/**
 * 混合绘制信息
 */
interface MixPaintInfo {
  mixPave?: any;
  [key: string]: any;
}

/**
 * 面材质
 */
interface FaceMaterial {
  mixpaint?: MixPaintInfo;
  getMaterialData(): MaterialData;
  clone(): FaceMaterial;
  createUniquePolygon(path: any, model: any, faceName: string): void;
}

/**
 * WebGL实体接口
 */
interface WebGLEntity {
  meshMap?: Map<number, any>;
  allMeshes?: any[];
  groupMesh?: boolean;
  isChildContentMesh(meshId: number): boolean;
  createModelMesh(): void;
  getGroupMeshIds(meshId: number): number[] | undefined;
  selectMeshs(): void;
}

/**
 * DIY绘制策略类
 * 处理自定义模型、灯槽、线条等的材质吸取和应用
 */
export default class DIYStrategy {
  /** 材质刷工具 */
  protected MaterialBrushUtil: any;
  
  /** 绘制服务 */
  protected PaintService: any;
  
  /** 混合绘制工具 */
  protected MixPaintUtil: any;
  
  /** 策略类型标识 */
  readonly type: string = "DIYStrategy";

  constructor();

  /**
   * 判断指定实体是否可以吸取材质
   * @param pickEvent - 拾取事件参数
   * @returns 是否可吸取
   */
  isSuckable(pickEvent: PickEvent): boolean;

  /**
   * 将点数组转换为路径格式
   * @param points - 原始点数组
   * @returns 转换后的路径点数组
   */
  getPath(points: Point2D[]): Point2D[];

  /**
   * 计算多边形面积（带符号）
   * @param polygon - 多边形顶点数组
   * @returns 面积值（小于3个点返回0）
   */
  calcArea(polygon: Point2D[]): number;

  /**
   * 在区域中查找指定点的材质信息
   * @param point - 查询点
   * @param region - 区域模型
   * @param config - 最小面积配置
   * @param pathInfos - 路径信息数组
   * @returns 查找结果
   */
  findMaterialInRegion(
    point: Point2D,
    region: any,
    config: { minArea: number },
    pathInfos: RegionPathInfo[]
  ): FindMaterialResult;

  /**
   * 获取面材质的绘制信息（支持混合绘制）
   * @param pickEvent - 拾取事件
   * @param faceMaterial - 面材质
   * @param faceName - 面名称
   * @returns 材质数据和绘制信息
   */
  getPatternOrMaterial(
    pickEvent: PickEvent,
    faceMaterial: FaceMaterial,
    faceName: string
  ): SuckResult | undefined;

  /**
   * 吸取指定位置的材质
   * @param pickEvent - 拾取事件参数
   * @returns 吸取到的材质信息
   */
  suck(pickEvent: PickEvent): SuckResult | undefined;

  /**
   * 判断是否可以对指定实体应用材质
   * @param pickEvent - 拾取事件参数
   * @param materialInfo - 材质信息（可选）
   * @returns 是否可应用
   */
  isAppliable(pickEvent: PickEvent, materialInfo?: any): boolean;

  /**
   * 应用材质到指定实体
   * @param pickEvent - 拾取事件参数
   * @param suckInfo - 吸取的材质信息
   */
  apply(pickEvent: PickEvent, suckInfo: SuckResult): void;

  /**
   * 获取撤销操作所需的数据
   * @param pickEvent - 拾取事件参数
   * @returns 材质数据快照
   */
  getUndoData(pickEvent: PickEvent): Map<string, MaterialData>;

  /**
   * 获取重做操作所需的数据
   * @param pickEvent - 拾取事件参数
   * @returns 材质数据快照
   */
  getRedoData(pickEvent: PickEvent): Map<string, MaterialData>;

  /**
   * 执行撤销操作
   * @param pickEvent - 拾取事件参数
   * @param materialData - 要恢复的材质数据
   */
  undo(pickEvent: PickEvent, materialData: Map<string, MaterialData>): void;

  /**
   * 执行重做操作
   * @param pickEvent - 拾取事件参数
   * @param materialData - 要应用的材质数据
   */
  redo(pickEvent: PickEvent, materialData: Map<string, MaterialData>): void;

  /**
   * 获取撤销/重做数据的内部实现
   * @param pickEvent - 拾取事件参数
   * @returns 材质数据快照
   */
  protected _getUndoRedoData(pickEvent: PickEvent): Map<string, MaterialData>;

  /**
   * 根据网格ID获取网格名称
   * @param webglEntity - WebGL实体
   * @param meshId - 网格ID
   * @returns 网格名称
   */
  protected _getMeshName(webglEntity: WebGLEntity, meshId: number): string | undefined;

  /**
   * 获取实体对应的WebGL显示对象
   * @param entity - 模型实体
   * @returns WebGL实体
   */
  protected _getWebglEntity(entity: any): WebGLEntity | undefined;

  /**
   * 执行三维拾取操作
   * @param view - 3D视图
   * @param event - 鼠标事件
   * @returns 拾取结果
   */
  protected _pick(view: any, event: MouseEvent): { meshId: number } | undefined;

  /**
   * 从吸取信息中提取材质数据
   * @param suckInfo - 吸取结果
   * @returns 材质数据
   */
  protected _getMaterialDataFromSuckInfo(suckInfo: SuckResult): MaterialData;
}