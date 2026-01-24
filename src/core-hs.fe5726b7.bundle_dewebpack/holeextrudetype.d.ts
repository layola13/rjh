/**
 * 孔洞拉伸类型枚举
 */
export enum HoleExtrudeType {
  /** 底部 */
  Bottom = "bottom",
  /** 顶部 */
  Top = "top",
  /** 侧面 */
  Side = "side"
}

/**
 * 孔洞面记录信息接口
 */
export interface HoleRecordFace {
  /** 主实体ID */
  masterId: string;
  /** 原始键值 */
  originKey: string;
  /** 扩展键值 */
  extraKey?: string;
  /** 面类型 */
  type: string;
  /** 是否为底面 */
  isBottom?: boolean;
  /** 观察的共边拓扑名称ID列表 */
  observeCoEdgeTopoNameIds: string[];
  /** 最终键值（由originKey和extraKey组成） */
  readonly finalKey: string;
  
  dump(): unknown;
}

/**
 * 孔洞实体接口
 */
export interface TgHole {
  /** 孔洞唯一标识 */
  id: string;
  /** 源实体ID */
  sourceId: string;
  /** 业务类型 */
  bizType: BizType;
  /** 源开洞对象 */
  source: Opening | ParametricOpening | DOpening | null;
  /** 壳体信息 */
  shellInfos: ShellInfos;
  /** 所有关联的拓扑名称 */
  allLinkNames: Set<string>;
  /** 关联的拓扑名称 */
  linkNames: Set<string>;
  
  /** 检查是否有变化 */
  hasChange(): boolean;
  /** 是否有效 */
  isValid(): boolean;
  /** 设置下一组关联名称 */
  setNextLinkNames(names: Set<string>): void;
  /** 刷新关联名称 */
  refreshLinkNames(): void;
  /** 刷新关联面 */
  refreshLinkFaces(layer: Layer): void;
  /** 导出数据 */
  dump(callback?: unknown, optimize?: boolean, options?: unknown): unknown[];
}

/**
 * 壳体信息接口
 */
export interface ShellInfos {
  /** 差集壳体列表 */
  diffs: ShellWithTopoFaces[];
  /** 结果壳体列表（可选） */
  results?: ShellWithTopoFaces[];
}

/**
 * 带拓扑面的壳体接口
 */
export interface ShellWithTopoFaces {
  /** 3D壳体 */
  shell: unknown; // BRep Shell
  /** 关联的拓扑面列表 */
  topoFaces: TopoFace[];
}

/**
 * 拓扑面基类接口
 */
export interface TopoFace {
  /** BRep面对象 */
  brepFace: unknown;
  /** 拓扑名称 */
  topoName: TopoName;
  /** 孔洞ID */
  holeId: string;
  /** 是否为底面 */
  isBottom?: boolean;
  /** 是否必须存在 */
  mustExist?: boolean;
}

/**
 * 拓扑名称接口
 */
export interface TopoName {
  /** 源ID */
  sourceId: string;
  /** 类型 */
  type: string;
  /** 索引 */
  index: number;
  /** 唯一标识 */
  id: string;
  
  clone(): TopoName;
}

/**
 * 开洞对象接口
 */
export interface Opening {
  id: string;
  /** 底部轮廓 */
  bottomProfile: unknown;
  /** 前部轮廓 */
  frontProfile: unknown;
  /** Z坐标 */
  z: number;
  /** Z方向尺寸 */
  ZSize: number;
  /** 厚度 */
  thickness: number;
  /** 宿主面 */
  hostFace: unknown;
  
  getHost(): Wall | Slab | null;
  getUniqueParent(): Layer | null;
  getBoundingBox3D(): unknown;
  updateHostFace(): void;
  dirtyGeometry(): void;
}

/**
 * 参数化开洞接口
 */
export interface ParametricOpening extends Opening {
  /** 底部轮廓数组 */
  bottomProfile: unknown[];
  /** 相关墙体列表 */
  relatedWalls: Wall[];
  
  getChildrenPartsPath(): unknown[];
}

/**
 * 业务类型枚举
 */
export enum BizType {
  /** 墙体 */
  Wall = "wall",
  /** 楼板 */
  Slab = "slab"
}

/**
 * HoleBuilder实体的IO处理类
 * 负责序列化与反序列化
 */
export declare class HoleBuilder_IO {
  /**
   * 获取单例实例
   */
  static instance(): HoleBuilder_IO;
  
  /**
   * 导出实体数据
   * @param entity - 要导出的HoleBuilder实体
   * @param callback - 导出回调函数
   * @param optimize - 是否优化导出
   * @param options - 导出选项
   * @returns 导出的数据数组
   */
  dump(
    entity: HoleBuilder,
    callback?: (data: unknown[], entity: HoleBuilder) => void,
    optimize?: boolean,
    options?: Record<string, unknown>
  ): unknown[];
  
  /**
   * 加载实体数据
   * @param entity - 目标HoleBuilder实体
   * @param data - 要加载的数据
   * @param context - 加载上下文
   */
  load(entity: HoleBuilder, data: unknown, context: unknown): void;
}

/**
 * 孔洞构建器主类
 * 负责处理墙体和楼板上的开洞操作
 */
export declare class HoleBuilder {
  /**
   * 构造函数
   * @param id - 实体ID
   * @param layer - 所属图层
   */
  constructor(id?: string, layer?: Layer);
  
  /** 所属图层 */
  private readonly _layer: Layer;
  /** 孔洞列表 */
  private _holes: TgHole[];
  /** 面映射表：面ID -> 孔洞记录面 */
  faceMap: Map<string, HoleRecordFace>;
  /** 待移除的孔洞集合 */
  private readonly _removeHoleSet: Set<TgHole>;
  
  /** 获取当前活动文档 */
  get fp(): unknown;
  /** 获取所有孔洞 */
  get holes(): ReadonlyArray<TgHole>;
  
  /**
   * 根据源ID获取孔洞
   * @param sourceId - 源实体ID
   * @returns 对应的孔洞对象，不存在则返回undefined
   */
  getHole(sourceId: string): TgHole | undefined;
  
  /**
   * 构建单个或多个孔洞
   * @param openingIds - 单个或多个开洞ID
   * @param slabOpeningOldInfo - 楼板开洞旧信息（可选）
   * @param crossLayerOpenings - 跨图层开洞列表（可选）
   */
  buildHole(
    openingIds: string | string[],
    slabOpeningOldInfo?: unknown,
    crossLayerOpenings?: Opening[]
  ): void;
  
  /**
   * 更新墙体孔洞
   * @param faceIds - 需要更新的面ID集合
   * @param coEdgeMap - 共边映射表（可选）
   */
  updateWallHole(faceIds: Set<string>, coEdgeMap?: Map<string, Set<string>>): void;
  
  /**
   * 更新楼板孔洞
   * @param faceIds - 需要更新的面ID集合
   * @param slab - 目标楼板
   */
  updateSlabHole(faceIds: Set<string>, slab: Slab): void;
  
  /**
   * 刷新室外图层的楼板开洞
   */
  refreshOutdoorLayerSlabOpening(): void;
  
  /**
   * 构建所有墙体孔洞
   * @param crossLayerOpenings - 跨图层开洞列表（可选）
   */
  buildAllWallHole(crossLayerOpenings?: Opening[]): void;
  
  /**
   * 构建所有楼板孔洞
   */
  buildAllSlabHole(): void;
  
  /**
   * 获取壳体
   * @param params - 壳体参数
   * @returns 壳体及其拓扑面
   */
  getShell(params: ShellParams): ShellWithTopoFaces;
  
  /**
   * 获取相交壳体
   * @param shellParamsList - 壳体参数列表
   * @returns 相交后的壳体信息
   */
  getInterShell(shellParamsList: ShellParams[]): ShellWithTopoFaces;
  
  /**
   * 获取结果壳体信息
   * @param unionShells - 并集壳体列表
   * @param diffShells - 差集壳体列表
   * @returns 布尔运算后的壳体信息列表
   */
  getResultShellInfos(
    unionShells: ShellWithTopoFaces[],
    diffShells: ShellWithTopoFaces[]
  ): ShellWithTopoFaces[];
  
  /**
   * 根据壳体信息更新底面标记
   * @param shellInfos - 壳体信息列表
   * @param markMustExist - 是否标记为必须存在
   */
  updateBottomByShellInfos(shellInfos: ShellWithTopoFaces[], markMustExist?: boolean): void;
  
  /**
   * 清理游离面（未被引用的孤立面）
   */
  cleanFreeFaces(): void;
  
  /**
   * 获取IO处理器
   */
  getIO(): HoleBuilder_IO;
  
  /**
   * 是否为根实体
   */
  isRoot(): boolean;
  
  /**
   * 获取开洞辅助工具
   * @param opening - 开洞对象
   */
  getOpeningHelper(opening: Opening): unknown;
}

/**
 * 壳体参数接口
 */
export interface ShellParams {
  /** 实体ID */
  id: string;
  /** 路径信息 */
  path: PathInfo;
  /** 曲面对象 */
  surface: unknown;
  /** 起始Z坐标 */
  start: number;
  /** 结束Z坐标 */
  end: number;
}

/**
 * 路径信息接口
 */
export interface PathInfo {
  /** 外轮廓 */
  outer: CurveWithId[];
  /** 内孔列表 */
  holes?: CurveWithId[][];
}

/**
 * 带ID的曲线接口
 */
export interface CurveWithId {
  /** 曲线对象 */
  curve: unknown;
  /** 曲线ID */
  id: number;
  /** 扩展ID */
  extraId?: number;
}

/**
 * 图层接口
 */
export interface Layer {
  id: string;
  /** 开洞映射表 */
  openings: Record<string, Opening>;
  /** 参数化开洞映射表 */
  parametricOpenings: Record<string, ParametricOpening>;
  /** 楼板映射表 */
  floorSlabs: Record<string, Slab>;
  /** 面映射表 */
  faces: Record<string, unknown>;
  /** 房间构建器 */
  roomBuilder: unknown;
  /** 楼板构建器 */
  slabBuilder: unknown;
  /** 孔洞构建器 */
  holeBuilder: HoleBuilder;
  /** 文档对象 */
  doc: unknown;
  
  addChild(entity: unknown): void;
  removeChild(entityId: string): void;
  forEachFloorSlab(callback: (slab: Slab) => void): void;
}

/**
 * 墙体接口
 */
export interface Wall {
  id: string;
  /** 宽度 */
  width: number;
}

/**
 * 楼板接口
 */
export interface Slab {
  id: string;
  /** 厚度 */
  thickness: number;
  /** 顶面映射表 */
  topFaces: Record<string, unknown>;
  /** 底面映射表 */
  bottomFaces: Record<string, unknown>;
  /** 侧面映射表 */
  sideFaces: Record<string, unknown>;
  /** 辅助面列表 */
  auxFaceList: unknown[];
}

/**
 * D型开洞接口（门洞）
 */
export interface DOpening extends Opening {
  // 继承Opening的所有属性
}