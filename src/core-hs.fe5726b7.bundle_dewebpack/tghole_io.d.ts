/**
 * TgHole模块 - 洞口与拓扑面关联管理
 * 用于处理洞口(Opening)在墙体或楼板上的拓扑关联关系
 */

import { Entity, Entity_IO, EntityField } from './entity-framework';
import { Opening } from './opening';
import { ParametricOpening } from './parametric-opening';
import { DOpening } from './d-opening';
import { WallTopoFace } from './wall-topo-face';
import { Loop, PolyCurve, MathAlg } from './geometry';

/**
 * 业务类型枚举
 */
export enum BizType {
  /** 墙体洞口 */
  Wall = 'Wall',
  /** 楼板洞口 */
  Slab = 'Slab'
}

/**
 * TgHole序列化数据接口
 */
interface TgHoleSerializedData {
  /** 实体ID */
  id: string;
  /** 源实体ID */
  sId: string;
  /** 当前关联的拓扑面名称集合 */
  cNames: string[];
  /** 业务类型 */
  bType: BizType;
}

/**
 * TgHole构造参数
 */
interface TgHoleConstructorParams {
  /** 实体ID */
  id: string;
  /** 源实体ID（Opening/ParametricOpening/DOpening的ID） */
  sourceId: string;
  /** 业务类型，默认为Wall */
  bizType?: BizType;
}

/**
 * 房间构建器接口
 */
interface RoomBuilder {
  /** 拓扑面集合 */
  topoFaces: WallTopoFace[];
  /** 面映射表 */
  faceMap: Map<string, { originKey: string }>;
}

/**
 * 楼板构建器接口
 */
interface SlabBuilder {
  /** 面对象集合 */
  faceObjs: Array<{ obj: { isAux: boolean }; id: string }>;
}

/**
 * 刷新上下文接口
 */
interface RefreshContext {
  /** 房间构建器 */
  roomBuilder: RoomBuilder;
  /** 楼板构建器 */
  slabBuilder: SlabBuilder;
}

/**
 * 面信息接口
 */
interface FaceInfo {
  /** 面的曲线 */
  curve?: unknown;
}

/**
 * 面实体接口
 */
interface FaceEntity {
  /** 是否为辅助面 */
  isAux: boolean;
  /** 面信息 */
  faceInfo?: FaceInfo;
}

/**
 * TgHole IO处理器
 * 负责TgHole实体的序列化与反序列化
 */
export class TgHole_IO extends Entity_IO {
  /**
   * 序列化TgHole实体
   * @param entity - 要序列化的TgHole实体
   * @param callback - 序列化后的回调函数
   * @param includeDefaults - 是否包含默认值
   * @param options - 序列化选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: TgHole,
    callback?: (data: unknown[], entity: TgHole) => void,
    includeDefaults: boolean = true,
    options: Record<string, unknown> = {}
  ): unknown[] {
    const result = super.dump(entity, undefined, includeDefaults, options);
    const serializedData = result[0] as TgHoleSerializedData;
    
    serializedData.sId = entity.sourceId;
    serializedData.cNames = Array.from(entity._curLinkNames);
    serializedData.bType = entity.bizType;
    
    if (callback) {
      callback(result, entity);
    }
    
    return result;
  }

  /**
   * 反序列化TgHole实体
   * @param entity - 目标实体
   * @param data - 序列化数据
   * @param context - 加载上下文
   */
  load(entity: TgHole, data: TgHoleSerializedData, context: unknown): void {
    super.load(entity, data, context);
    
    const { cNames } = data;
    const fields: Partial<TgHole> = {};
    
    if (cNames) {
      fields._curLinkNames = new Set(cNames);
    }
    
    Entity_IO.setEntityFields(entity, fields);
  }

  /**
   * 后处理加载
   * @param entity - 已加载的实体
   * @param data - 序列化数据
   */
  postLoad(entity: TgHole, data: TgHoleSerializedData): void {
    super.postLoad(entity, data);
  }
}

/**
 * TgHole - 洞口拓扑关联实体
 * 管理洞口(Opening)与墙体/楼板拓扑面的关联关系
 */
export class TgHole extends Entity {
  /** 业务类型（墙体或楼板） */
  @EntityField()
  bizType: BizType;

  /** 当前关联的拓扑面名称集合 */
  @EntityField()
  _curLinkNames: Set<string>;

  /** 下一次更新的拓扑面名称集合（用于延迟更新） */
  @EntityField()
  _nextLinkNames?: Set<string>;

  /** 关联的面实体列表 */
  @EntityField()
  linkFaces: FaceEntity[];

  /** 源实体ID（Opening/ParametricOpening/DOpening） */
  sourceId: string;

  /** 源实体引用 */
  source?: Opening | ParametricOpening | DOpening;

  /**
   * 构造函数
   * @param params - 构造参数
   */
  constructor(params: TgHoleConstructorParams) {
    super(params.id);
    
    this.bizType = BizType.Wall;
    this._curLinkNames = new Set();
    this.linkFaces = [];
    
    const internalFields = {
      bizType: params.bizType || BizType.Wall
    };
    this.setInternalFields(internalFields);
    
    this.sourceId = params.sourceId || '';
    this.source = this.doc.getEntityById(this.sourceId) as Opening | ParametricOpening | DOpening;
  }

  /**
   * 静态加载方法
   * @param data - 序列化数据
   * @param context - 加载上下文
   * @returns 新创建的TgHole实例
   */
  static load(data: TgHoleSerializedData, context: unknown): TgHole {
    const instance = new TgHole({
      id: data.id,
      sourceId: data.sId,
      bizType: data.bType
    });
    instance.load(data, context);
    return instance;
  }

  /**
   * 是否为根实体
   * @returns 始终返回true
   */
  isRoot(): boolean {
    return true;
  }

  /**
   * 获取IO处理器
   * @returns TgHole_IO单例
   */
  getIO(): TgHole_IO {
    return TgHole_IO.instance();
  }

  /**
   * 验证源实体是否有效
   * @returns 源实体是否为有效的洞口类型
   */
  isValid(): boolean {
    return (
      this.source instanceof Opening ||
      this.source instanceof ParametricOpening ||
      this.source instanceof DOpening
    );
  }

  /**
   * 是否为空（无任何关联）
   * @returns 当前和下一次关联均为空时返回true
   */
  isEmpty(): boolean {
    return (
      !this._curLinkNames.size &&
      !(this._nextLinkNames?.size ?? 0)
    );
  }

  /**
   * 是否有变更
   * @returns 存在待更新的关联时返回true
   */
  hasChange(): boolean {
    return this._nextLinkNames !== undefined;
  }

  /**
   * 设置下一次更新的关联名称集合
   * @param names - 新的关联名称集合
   */
  setNextLinkNames(names: Set<string>): void {
    if (!this._isSameLinkNames(names, this._curLinkNames)) {
      this._nextLinkNames = names;
    }
  }

  /**
   * 刷新关联名称（应用待更新的关联）
   */
  refreshLinkNames(): void {
    if (this._nextLinkNames) {
      this._curLinkNames = new Set(this._nextLinkNames);
      this._nextLinkNames = undefined;
    }
  }

  /**
   * 刷新关联的面实体
   * @param context - 刷新上下文，包含房间和楼板构建器
   */
  refreshLinkFaces(context: RefreshContext): void {
    const linkedFaces = new Set<FaceEntity>();

    if (!this.isValid()) {
      this.linkFaces = Array.from(linkedFaces);
      return;
    }

    if (this.bizType === BizType.Wall) {
      this._refreshWallLinkFaces(context, linkedFaces);
    } else if (this.bizType === BizType.Slab) {
      this._refreshSlabLinkFaces(context, linkedFaces);
    }

    this.linkFaces = Array.from(linkedFaces);
  }

  /**
   * 获取所有关联名称（当前+待更新）
   */
  get allLinkNames(): string[] {
    const allNames = new Set<string>();
    this._curLinkNames.forEach(name => allNames.add(name));
    this._nextLinkNames?.forEach(name => allNames.add(name));
    return Array.from(allNames);
  }

  /**
   * 获取旧的关联名称（仅当前）
   */
  get oldLinkNames(): string[] {
    return Array.from(this._curLinkNames);
  }

  /**
   * 获取有效的关联名称（优先返回待更新，否则返回当前）
   */
  get linkNames(): string[] {
    return this._nextLinkNames
      ? Array.from(this._nextLinkNames)
      : Array.from(this._curLinkNames);
  }

  /**
   * 获取源实体的shell信息
   */
  get shellInfos(): unknown {
    return this.source?.shellInfos;
  }

  /**
   * 刷新墙体关联面
   * @private
   */
  private _refreshWallLinkFaces(context: RefreshContext, linkedFaces: Set<FaceEntity>): void {
    const sourceProfiles = this._getSourceBottomProfiles();
    const loops = sourceProfiles.map(profile => new Loop(profile));
    
    const validTopoKeys = new Set<string>();
    context.roomBuilder.topoFaces.forEach(face => {
      if (
        face instanceof WallTopoFace &&
        !face.isAux &&
        face.coEdge !== undefined &&
        this._curLinkNames.has(face.topoName.id)
      ) {
        validTopoKeys.add(face.topoKey);
      }
    });

    const faceGroups = new Map<string, FaceEntity[]>();
    context.roomBuilder.faceMap.forEach((faceData, entityId) => {
      if (validTopoKeys.has(faceData.originKey)) {
        if (!faceGroups.has(faceData.originKey)) {
          faceGroups.set(faceData.originKey, []);
        }
        faceGroups.get(faceData.originKey)!.push(
          this.doc.getEntityById(entityId) as FaceEntity
        );
      }
    });

    faceGroups.forEach(faces => {
      if (faces.length === 1) {
        linkedFaces.add(faces[0]);
      } else {
        faces.forEach(face => {
          if (face.faceInfo?.curve) {
            const polyCurve = new PolyCurve([face.faceInfo.curve]);
            const intersections = MathAlg.BoolOperate2d.polylineIntersect(
              polyCurve,
              loops,
              true
            );
            if (intersections.length > 0) {
              linkedFaces.add(face);
            }
          }
        });
      }
    });
  }

  /**
   * 刷新楼板关联面
   * @private
   */
  private _refreshSlabLinkFaces(context: RefreshContext, linkedFaces: Set<FaceEntity>): void {
    context.slabBuilder.faceObjs.forEach(faceObj => {
      if (!faceObj.obj.isAux && this._curLinkNames.has(faceObj.id)) {
        linkedFaces.add(this.doc.getEntityById(faceObj.id) as FaceEntity);
      }
    });
  }

  /**
   * 获取源实体的底部轮廓
   * @private
   */
  private _getSourceBottomProfiles(): unknown[] {
    if (!this.source) return [];
    
    if (this.source instanceof Opening || this.source instanceof DOpening) {
      return [this.source.bottomProfile];
    }
    
    return this.source.bottomProfile;
  }

  /**
   * 比较两个关联名称集合是否相同
   * @private
   */
  private _isSameLinkNames(set1: Set<string>, set2: Set<string>): boolean {
    if (set1.size !== set2.size) return false;
    if (!set1.size) return true;
    return Array.from(set1).every(name => set2.has(name));
  }
}