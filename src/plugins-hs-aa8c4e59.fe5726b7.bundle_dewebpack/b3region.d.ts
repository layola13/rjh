/**
 * B3Region 模块 - 区域实体处理类
 * 用于处理瓷砖铺贴区域的BOM数据构建、面积计算和材料统计
 */

import { B3Entity } from './B3Entity';
import { MathUtil, Box2 } from './MathUtil';
import { HSPaveSDK } from './HSPaveSDK';
import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

/**
 * 三维向量或坐标
 */
export type Vector2 = [number, number];
export type Vector3 = [number, number, number];

/**
 * 材料类别数据
 */
export interface CategoryData {
  /** 材料唯一标识 */
  seekId: string;
  /** 阿里模型ID */
  aliModelId?: string;
  /** 类别类型 */
  categoryType?: string;
  /** 显示名称 */
  displayName?: string;
  /** 纹理URL */
  textureUrl?: string;
  /** 颜色 */
  color?: string | number[];
  /** 尺寸 [宽度, 高度] */
  size?: Vector2;
  /** 引用ID列表 */
  refs?: string[];
  /** 品牌名称 */
  brand?: string;
  /** 品牌ID */
  brandId?: string;
  /** 类型标识（如'wallPaint'） */
  type?: string;
}

/**
 * 材料信息
 */
export interface MaterialInfo {
  /** 区域材料引用ID */
  regionMaterialSeekID: string;
  /** 材料尺寸 */
  size?: Vector2;
  /** 面积（平方米） */
  area?: number;
  /** 包含缝隙的面积 */
  areaWithSeam?: number;
  /** 砖块统计信息 */
  block?: BlockCount;
  /** 砖块加工参数列表 */
  blockProcess?: BlockProcess[];
}

/**
 * 砖块数量统计
 */
export interface BlockCount {
  /** 总数量 */
  count: number;
  /** 完整砖块数量 */
  intactCount: number;
  /** 拼接砖块数量 */
  combinedCount: number;
}

/**
 * 砖块加工参数
 */
export interface BlockProcess {
  /** 加工参数 */
  param: TileProcessParam;
  /** 数量 */
  count: number;
}

/**
 * 瓷砖加工参数
 */
export interface TileProcessParam {
  /** 垂直开槽数量 */
  vGroovingCount: number;
  /** 水平开槽数量 */
  hGroovingCount: number;
  /** 开槽宽度 */
  groovingWidth: number;
  /** 垂直开槽角度 */
  vGroovingAngle: number;
  /** 水平开槽角度 */
  hGroovingAngle: number;
  /** 倒角宽度 */
  chamferWidth: number;
  /** 倒角边缘标识数组 */
  chamferEdge: number[];
}

/**
 * 缝隙材料信息
 */
export interface SeamMaterial {
  /** 材料类别 */
  category: CategoryData;
  /** 材料详细信息 */
  materialInfo: {
    regionMaterialSeekID: string;
  };
}

/**
 * 缝隙信息
 */
export interface SeamInfo {
  /** 缝隙宽度 */
  width: number;
  /** 缝隙材料 */
  material: SeamMaterial;
}

/**
 * 铺贴材料
 */
export interface PaveMaterial {
  /** 材料类别 */
  category: CategoryData;
  /** 材料详细信息 */
  materialInfo: MaterialInfo;
}

/**
 * 铺贴信息
 */
export interface PaveInfo {
  /** 材料列表 */
  material: PaveMaterial[];
  /** 面积信息 */
  area: {
    /** 总面积（含孔洞） */
    fullArea: number;
    /** 有效面积 */
    validArea: number;
  };
  /** 缝隙信息列表 */
  seam?: SeamInfo[];
  /** 图案ID */
  patternId?: string;
  /** 图案名称 */
  patternName?: string;
}

/**
 * BOM3数据项
 */
export interface Bom3DataItem {
  /** 实体数据 */
  entity: unknown;
  /** 铺贴信息（区域类型特有） */
  paveInfo?: PaveInfo;
}

/**
 * 水刀组件数据
 */
export interface WaterJetComponent {
  /** 位置 */
  position: { x: number; y: number };
  /** 旋转角度 */
  rotation: number;
  /** 缩放比例 */
  scale: { x: number; y: number };
  /** 尺寸 */
  length: { x: number; y: number };
}

/**
 * 实体实例参数接口
 */
export interface EntityInstance {
  getParameterValue(key: string): unknown;
  getInstanceId(): string;
}

/**
 * 实体接口
 */
export interface Entity {
  instance: EntityInstance;
  children: Entity[];
  prefix: string;
  getChildren(): Entity[];
  getInstanceId(): string;
}

/**
 * 图案信息
 */
export interface PatternInfo {
  /** 图案唯一标识 */
  seekId: string;
  /** 图案名称 */
  name: string;
  /** 单元信息列表 */
  unitsInfos: UnitInfo[];
  /** 缝隙材料 */
  seam?: {
    width: number;
    material: unknown;
  };
}

/**
 * 单元信息
 */
export interface UnitInfo {
  /** 单元ID */
  unitId: string;
  /** X方向长度 */
  xLength: number;
  /** Y方向长度 */
  yLength: number;
  /** 材料列表 */
  materials: unknown[];
  /** 外轮廓 */
  outer: unknown[];
  /** 面积 */
  area: number;
}

/**
 * 修改砖块数据
 */
export interface ModifyBrick {
  /** 单元ID */
  unitId: string;
  /** 材料数据 */
  material: unknown;
}

/**
 * 砖块数据
 */
export interface Block {
  /** 单元ID */
  unitId: string;
  /** 材料SeekID */
  materialSeekId: string;
  /** 数量 */
  count: number;
  /** 是否为碎砖 */
  isRubble: boolean;
  /** 路径数据 */
  path?: PathData[][];
  /** 加工参数 */
  param?: TileProcessParam;
}

/**
 * 路径数据
 */
export interface PathData {
  /** 路径对象 */
  path: {
    outer: unknown[];
  };
  /** 面积 */
  area: number;
}

/**
 * 腰线根组件
 */
export interface WaistlineRootComponent {
  /** 腰线分组，每组包含多个子实体引用 */
  waistline: Array<Array<{ id: string }>>;
}

/**
 * 边界根组件
 */
export interface BoundaryRootComponent {
  /** 子组件ID列表 */
  componentIds: string[];
}

/**
 * B3Region - 区域实体类
 * 继承自B3Entity，专门处理铺贴区域的BOM数据构建
 */
export declare class B3Region extends B3Entity {
  constructor(config: unknown);

  /**
   * 构建BOM3数据
   * @param entity - 实体对象
   * @returns BOM3数据项数组
   */
  buildBom3Data(entity: Entity): Bom3DataItem[];

  /**
   * 构建水刀组件的BOM3数据
   * @param entity - 实体对象
   * @param result - 结果数组（修改引用）
   */
  private _buildBom3DataWaterJet(entity: Entity, result: Bom3DataItem[]): void;

  /**
   * 计算普通区域
   * @param entity - 实体对象
   * @param result - 结果数组（修改引用）
   */
  private _calcRegion(entity: Entity, result: Bom3DataItem[]): void;

  /**
   * 计算腰线区域
   * 合并同一腰线组中的多个区域
   * @param entity - 实体对象
   * @param result - 结果数组（修改引用）
   */
  private _calcWaistLineRegion(entity: Entity, result: Bom3DataItem[]): void;

  /**
   * 计算边界区域
   * @param entity - 实体对象
   * @param result - 结果数组（修改引用）
   */
  private _calcBoundaryRegion(entity: Entity, result: Bom3DataItem[]): void;

  /**
   * 计算边界块区域
   * @param entity - 实体对象
   * @param result - 结果数组（修改引用）
   */
  private _calcBoundaryBlockRegions(entity: Entity, result: Bom3DataItem[]): void;

  /**
   * 获取铺贴信息
   * @param entityOrEntities - 单个实体或实体数组
   * @returns 铺贴信息对象
   */
  getPaveInfo(entityOrEntities: Entity | Entity[]): PaveInfo;

  /**
   * 添加修改砖块数据
   * @param entity - 实体对象
   * @param modifyBricks - 修改砖块列表
   * @param paveInfo - 铺贴信息（修改引用）
   */
  private addModifyBlocks(
    entity: Entity,
    modifyBricks: ModifyBrick[],
    paveInfo: PaveInfo
  ): void;

  /**
   * 获取图案信息
   * @param entity - 实体对象
   * @param paveInfo - 铺贴信息（修改引用）
   */
  private getPatternInfo(entity: Entity, paveInfo: PaveInfo): void;

  /**
   * 获取缝隙信息
   * @param patternInfo - 图案信息
   * @param regionId - 区域ID
   * @returns 缝隙信息数组
   */
  private getSeamInfo(patternInfo: PatternInfo, regionId: string): SeamInfo[];

  /**
   * 获取砖块信息并统计
   * @param patternInfo - 图案信息
   * @param blocks - 砖块列表
   * @param paveInfo - 铺贴信息（修改引用）
   */
  private getBlocksInfo(
    patternInfo: PatternInfo,
    blocks: Block[],
    paveInfo: PaveInfo
  ): void;

  /**
   * 计算包含缝隙的面积
   * 根据材料占比重新分配总面积
   * @param paveInfo - 铺贴信息（修改引用）
   */
  private getAreaWithSeam(paveInfo: PaveInfo): void;

  /**
   * 拼接碎砖
   * 计算多少块碎砖可以拼接成完整砖块
   * @param paths - 路径数据
   * @param outerPaths - 外轮廓
   * @param unitArea - 单元面积
   * @returns 拼接后的砖块数量
   */
  private jointRubbleTiles(
    paths: PathData[][][],
    outerPaths: unknown[],
    unitArea: number
  ): number;

  /**
   * 添加铺贴材料
   * @param materials - 材料列表（修改引用）
   * @param material - 材料数据
   * @param regionId - 区域ID
   * @param size - 材料尺寸
   * @param area - 面积
   */
  private addPaveMaterial(
    materials: PaveMaterial[],
    material: unknown,
    regionId: string,
    size?: Vector2,
    area?: number
  ): void;

  /**
   * 判断材料引用ID是否相等
   * @param paveMaterial - 铺贴材料
   * @param seekId - 材料SeekID
   * @returns 是否相等
   */
  private isMaterialRefIdEqual(paveMaterial: PaveMaterial, seekId: string): boolean;

  /**
   * 判断尺寸是否相等
   * @param size1 - 尺寸1
   * @param size2 - 尺寸2
   * @returns 是否相等（允许浮点误差）
   */
  private isSizeEqual(size1: Vector2 | undefined, size2: Vector2 | undefined): boolean;

  /**
   * 判断材料是否相等
   * 比较SeekID和尺寸
   * @param material1 - 材料1
   * @param material2 - 材料2
   * @returns 是否相等
   */
  private isMaterialEqual(material1: PaveMaterial, material2: PaveMaterial): boolean;

  /**
   * 获取材料类别数据
   * @param material - 材料对象
   * @returns 类别数据
   */
  private getCategoryData(material: unknown): CategoryData;

  /**
   * 判断瓷砖加工参数是否相同
   * @param param1 - 加工参数1
   * @param param2 - 加工参数2
   * @returns 是否相同
   */
  private isSameTileProcess(param1: TileProcessParam, param2: TileProcessParam): boolean;
}