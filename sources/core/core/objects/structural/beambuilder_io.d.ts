/**
 * BeamBuilder模块类型定义
 * 用于处理梁构建器的IO操作和实体管理
 */

import { Entity, Entity_IO } from './Entity';
import { TrimmedSurface } from './TrimmedSurface';
import { BeamFaceType } from './BeamFaceType';
import { FaceHoleType } from './FaceHoleType';

/**
 * 面记录接口
 * 用于存储梁面的元数据信息
 */
export interface IBeamRecordFace {
  /** 主实体ID */
  masterId: string;
  /** 原始键值，用于标识面的来源 */
  originKey: string;
  /** 是否为辅助面 */
  isAux: boolean;
  /** 额外键值，用于区分分割后的子面 */
  extraKey?: string;
  /** 最终键值，由originKey和extraKey组合而成 */
  finalKey: string;
}

/**
 * 梁记录面类
 * 封装面的持久化数据
 */
export declare class BeamRecordFace implements IBeamRecordFace {
  masterId: string;
  originKey: string;
  isAux: boolean;
  extraKey?: string;
  
  constructor(data: Omit<IBeamRecordFace, 'finalKey'>);
  
  /** 导出为可序列化的数据结构 */
  dump(): Record<string, unknown>;
  
  /** 克隆当前记录 */
  clone(): BeamRecordFace;
  
  /** 获取最终键值 */
  get finalKey(): string;
}

/**
 * BREP面对象接口
 * 表示边界表示法中的面
 */
export interface IBRepFace {
  /** 用户自定义数据 */
  userData: {
    /** 是否为辅助面 */
    isAux: boolean;
    /** 关联的梁实体 */
    beam: {
      id: string;
      [key: string]: unknown;
    };
  };
  [key: string]: unknown;
}

/**
 * 梁实体接口
 */
export interface IBeam {
  /** 梁的唯一标识 */
  id: string;
  /** 计算梁的轮廓路径 */
  calcProfile(refresh: boolean): [unknown] | null;
  [key: string]: unknown;
}

/**
 * 图层接口
 * 包含梁构建器和房间构建器
 */
export interface ILayer {
  /** 梁对象集合，键为梁ID */
  beams: Record<string, IBeam>;
  /** 梁构建器实例 */
  beamBuilder: BeamBuilder;
  /** 房间构建器上下文 */
  roomBuilder: {
    ctx?: {
      spaceOptions?: {
        /** 分割数据配置 */
        splitData?: {
          /** 忽略匹配的面ID集合 */
          ignoreMatchFaceId?: Set<string>;
        };
      };
    };
  };
  
  /** 移除子实体 */
  removeChild(entityId: string): void;
  
  /** 添加子实体 */
  addChild(entity: unknown): void;
  
  /** 获取面查询结果 */
  getFaceQuery(): Array<{
    holes: Array<{ type: FaceHoleType }>;
    updateFaceMixpaint(): void;
  }>;
  
  [key: string]: unknown;
}

/**
 * 面更新数据接口
 * 用于传递面的变更信息
 */
export interface IFaceChangeData {
  /** BREP面对象 */
  brepFace: IBRepFace;
  /** 额外键值，用于区分分割后的子面 */
  extraKey?: string;
  /** 已存在的面实体（更新时使用） */
  face?: IModelFace;
  /** 材质信息 */
  material?: unknown;
  /** 旧面信息（用于材质迁移） */
  oldFaceInfo?: {
    material?: unknown;
  };
}

/**
 * 模型面实体接口
 */
export interface IModelFace {
  /** 面的唯一标识 */
  id: string;
  /** 线框路径数据 */
  wirePath: {
    outer: unknown;
    holes: unknown[];
  };
  /** 曲面对象 */
  surfaceObj: {
    surface: unknown;
    sameDirWithSurface: boolean;
  };
  /** 材质属性 */
  material?: unknown;
  [key: string]: unknown;
}

/**
 * 序列化的面记录数据
 */
export interface ISerializedFaceRecord {
  /** 面ID */
  fId: string;
  /** 记录数据 */
  record: Record<string, unknown>;
}

/**
 * 梁构建器IO类
 * 负责BeamBuilder实体的序列化和反序列化
 */
export declare class BeamBuilder_IO extends Entity_IO {
  /**
   * 导出实体数据
   * @param entity - 要导出的梁构建器实体
   * @param callback - 导出后的回调函数
   * @param includeMetadata - 是否包含元数据
   * @param options - 导出选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: BeamBuilder,
    callback?: (data: unknown[], entity: BeamBuilder) => void,
    includeMetadata?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * 加载实体数据
   * @param entity - 目标梁构建器实体
   * @param data - 序列化的数据对象
   * @param context - 加载上下文
   */
  load(
    entity: BeamBuilder,
    data: {
      /** 面映射数据 */
      fM?: ISerializedFaceRecord[];
      [key: string]: unknown;
    },
    context: unknown
  ): void;

  /** 获取单例实例 */
  static instance(): BeamBuilder_IO;
}

/**
 * 梁构建器实体类
 * 管理梁的面生成、更新和镜像操作
 */
export declare class BeamBuilder extends Entity {
  /** 所属图层 */
  private readonly _layer: ILayer;
  
  /**
   * 面映射表
   * 键为面实体ID，值为面记录对象
   */
  faceMap: Map<string, BeamRecordFace>;

  /**
   * 构造函数
   * @param id - 实体ID，默认为空字符串
   * @param layer - 所属图层
   */
  constructor(id?: string, layer: ILayer);

  /**
   * 检查是否存在指定拓扑键的面
   * @param topoKey - 拓扑键值
   * @returns 是否存在
   */
  hasTopoKey(topoKey: string): boolean;

  /**
   * 构建所有梁的面
   * 遍历图层中的所有梁，生成对应的面实体
   */
  build(): void;

  /**
   * 添加新面
   * @param faceKey - 面的键值标识
   * @param brepFace - BREP面对象
   * @returns 新创建的面实体ID列表
   */
  addFace(faceKey: string, brepFace: IBRepFace): string[];

  /**
   * 更新已存在的面
   * @param faceKey - 面的键值标识
   * @param brepFace - 新的BREP面对象
   * @returns 更新或新创建的面实体ID列表
   */
  updateFace(faceKey: string, brepFace: IBRepFace): string[];

  /**
   * 清理游离的面
   * 移除不再关联到任何梁的面实体
   */
  cleanFreeFaces(): void;

  /**
   * 镜像操作
   * @param axis - 镜像轴参数
   */
  mirror(axis: unknown): void;

  /**
   * 镜像面映射表
   * 将前后面互换并重新计算面索引
   */
  mirrorFaceMap(): void;

  /**
   * 检查是否为根实体
   * @returns 始终返回true
   */
  isRoot(): boolean;

  /**
   * 获取IO处理器
   * @returns BeamBuilder_IO单例实例
   */
  getIO(): BeamBuilder_IO;

  /**
   * 获取裁剪后的曲面
   * @param brepFace - BREP面对象
   * @returns 裁剪曲面对象
   * @private
   */
  private _getTrimmed(brepFace: IBRepFace): TrimmedSurface;

  /**
   * 判断面是否为垂直面
   * @param faceKey - 面的键值标识
   * @returns 是否为垂直面（左、右、前、后）
   * @private
   */
  private _isVertical(faceKey: string): boolean;

  /**
   * 获取分割后的面列表
   * @param faceKey - 面的键值标识
   * @param trimmedSurface - 裁剪曲面
   * @returns 分割后的BREP面数组
   * @private
   */
  private _getSplitFaces(faceKey: string, trimmedSurface: TrimmedSurface): IBRepFace[];

  /**
   * 处理面变更数据
   * 创建或更新面实体，处理材质迁移
   * @param changeDataList - 面变更数据列表
   * @param originKey - 原始键值
   * @param masterId - 主实体ID
   * @param isAux - 是否为辅助面
   * @returns 处理后的面实体ID列表
   * @private
   */
  private _handleChangeData(
    changeDataList: IFaceChangeData[],
    originKey: string,
    masterId: string,
    isAux: boolean
  ): string[];
}