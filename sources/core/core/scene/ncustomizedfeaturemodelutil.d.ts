import { NCustomizedParametricModel } from './NCustomizedParametricModel';
import { Vector3, Matrix4, Loop, Plane, Tolerance, Coord } from './geometry';
import { NCPBackgroundWallBase } from './NCPBackgroundWallBase';
import { ParametricModelDecorator } from './ParametricModelDecorator';

/**
 * 面实体信息
 */
interface FaceEntityInfo {
  /** 关联的实体对象 */
  entity: HSCore.Model.Entity;
  /** 网格键列表 */
  meshKeys: string[];
}

/**
 * 连续面项
 */
interface ContinuousFaceItem {
  /** 灯槽面信息，可能为空 */
  lightSlotFaces?: FaceEntityInfo;
  /** 依赖面信息 */
  relyerFaces: FaceEntityInfo;
}

/**
 * 障碍物信息
 */
interface ObstacleInfo {
  /** 基础坐标系 */
  baseCoord: Coord;
  /** 坐标系 */
  coord: Coord;
  /** 循环轮廓 */
  loop: Loop;
  /** 挤出高度 */
  extruderHeight: number;
}

/**
 * Brep壳体信息
 */
interface BrepShellInfo {
  /** 实体ID */
  eId?: string;
  /** 壳体列表 */
  shells: Array<{ getFaces(): Array<{ tag: string }> }>;
  /** 材质映射 */
  materials: Map<string, MaterialInfo>;
}

/**
 * 材质信息
 */
interface MaterialInfo {
  /** 引用变量 */
  refVariable?: string;
  /** 区域 */
  regions?: unknown;
  /** 图案 */
  pats?: unknown;
}

/**
 * 实例信息
 */
interface InstanceInfo {
  /** 实体ID */
  eId: string;
  /** 引用父级变量映射 */
  refParentVariables?: Map<string, string | string[]>;
}

/**
 * 开口轮廓信息
 */
interface OpeningOuterInfo {
  /** 轮廓点 */
  points: Vector3[];
  /** 挤出高度 */
  extruderHeight: number;
}

/**
 * 目标面信息
 */
interface TargetFaceInfo {
  /** 新的外轮廓 */
  newOuter?: Array<{ x: number; y: number; z: number }>;
  /** 距离 */
  D?: number;
}

/**
 * 墙线信息
 */
interface WallInfo {
  /** 墙线对象 */
  wallLine: {
    getOrigin(): Vector3;
    getDirection(): Vector3;
  };
}

/**
 * 定制化特征模型工具类
 * 提供背景墙、灯槽等参数化模型的几何分析和数据处理功能
 */
export declare class NCustomizedFeatureModelUtil {
  /**
   * 根据灯槽获取连续面项
   * @param lightSlotEntity - 灯槽实体
   * @param filterTags - 过滤标签列表（可选）
   * @returns 连续面项信息，包含灯槽面和依赖面的网格键
   */
  static getContinousFaceItemByLightSlot(
    lightSlotEntity: HSCore.Model.NCustomizedModelLightSlot,
    filterTags?: string[]
  ): ContinuousFaceItem | undefined;

  /**
   * 根据依赖面获取连续灯槽项列表
   * @param relyerEntity - 依赖实体
   * @param meshKey - 网格键
   * @param filterTags - 过滤标签列表（可选）
   * @returns 连续面项数组
   */
  static getContinousLightSlotItemsByRelyerFace(
    relyerEntity: HSCore.Model.Entity & {
      getLightSlotEntities(): HSCore.Model.NCustomizedModelLightSlot[];
      getFaceTagByMeshKey(key: string): string;
    },
    meshKey: string,
    filterTags?: string[]
  ): ContinuousFaceItem[];

  /**
   * 根据实体类型获取父级实体
   * @param entity - 子实体
   * @param entityTypes - 目标实体类型列表
   * @returns 匹配的父级实体或undefined
   */
  static getParentByEntityTypes(
    entity: HSCore.Model.Entity,
    entityTypes: string[]
  ): HSCore.Model.Entity | undefined;

  /**
   * 遍历NCP背景墙层级结构
   * @param callback - 遍历回调函数
   * @param entity - 起始实体
   */
  static ncpBgWallTraverse(
    callback: (model: NCustomizedParametricModel) => void,
    entity: HSCore.Model.Entity
  ): void;

  /**
   * 获取障碍物信息列表（如开口、参数化开口等）
   * @param entity - 实体对象
   * @returns 障碍物信息数组
   */
  static getObstacleInfos(entity: HSCore.Model.Entity): ObstacleInfo[];

  /**
   * 根据网格名称提取标签
   * @param meshName - 网格名称
   * @returns 提取的标签字符串
   * @internal
   */
  static _getTagByMeshName(meshName: string): string;

  /**
   * 获取Brep壳体信息
   * @param entity - 实体对象
   * @returns Brep壳体信息数组或undefined
   * @internal
   */
  static _getBrepShellsInfo(
    entity: HSCore.Model.Entity & {
      parameters?: {
        modelData?: {
          dataModel: {
            brepShells?: BrepShellInfo[];
          };
        };
      };
    }
  ): BrepShellInfo[] | undefined;

  /**
   * 根据网格名称获取变量名
   * @param entity - 实体对象
   * @param meshName - 网格名称
   * @returns 变量名或undefined
   */
  static getVariableNameByMeshName(
    entity: HSCore.Model.Entity,
    meshName?: string
  ): string | string[] | undefined;

  /**
   * 获取引用根变量列表
   * @param entity - 实体对象
   * @param variableName - 变量名
   * @param excludeId - 排除的实体ID（可选）
   * @returns 变量名数组（展平后）
   */
  static getRefRootVariables(
    entity: HSCore.Model.Entity,
    variableName: string,
    excludeId?: string
  ): Array<string | string[]>;

  /**
   * 覆盖变量（递归处理父级变量引用）
   * @param entity - 实体对象
   * @param variables - 变量数组
   * @param excludeId - 排除的实体ID（可选）
   * @internal
   */
  static _coverVariables(
    entity: HSCore.Model.Entity,
    variables: Array<string | string[]>,
    excludeId?: string
  ): void;

  /**
   * 获取实例信息
   * @param entity - 子部件实体
   * @returns 实例信息或undefined
   */
  static getInstanceInfo(
    entity: HSCore.Model.NCPBackgroundWallSubpart | HSCore.Model.ParametricContentSubpart
  ): InstanceInfo | undefined;

  /**
   * 获取顶层模型实体
   * @param entity - 任意层级的实体
   * @returns 顶层背景墙模型或单元，未找到则返回undefined
   */
  static getTopLevelModel(
    entity: HSCore.Model.Entity
  ): HSCore.Model.Entity | undefined;

  /**
   * 检查墙面是否重叠
   * @param outerPoints - 外轮廓点数组
   * @param targetEntity - 目标实体
   * @param transformMatrix - 变换矩阵
   * @param checkSameDirection - 是否检查同向（默认true）
   * @param tolerance - 容差值（默认LENGTH_EPS）
   * @returns 是否重叠
   */
  static checkOverlapWall(
    outerPoints: Array<{ x: number; y: number; z: number }>,
    targetEntity: {
      faceInfo?: {
        baseInfo: {
          surface: {
            getNorm(): Vector3;
            containsPoint(point: Vector3, tolerance: number): boolean;
          };
        };
      };
    },
    transformMatrix: Matrix4,
    checkSameDirection?: boolean,
    tolerance?: number
  ): boolean;
}