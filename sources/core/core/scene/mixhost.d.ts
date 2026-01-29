/**
 * MixHost - 用于管理实体面片(Face)的宿主类
 * 负责存储和管理面片实体及其ID，支持克隆、序列化/反序列化
 */

/**
 * 加载选项接口
 */
interface LoadOptions {
  /** 实体迁移映射表，用于处理实体ID变更 */
  migrateEntitiesMap?: Map<string, { id: string }>;
  /** 实体字典，通过ID查找实体对象 */
  entities: Record<string, FaceEntity>;
}

/**
 * 序列化数据接口
 */
interface SerializedMixHost {
  /** 面片实体的ID */
  faceEntity?: string;
  /** 面片索引ID */
  faceId?: number;
}

/**
 * 面片实体基类
 */
interface FaceEntity {
  /** 实体唯一标识符 */
  id: string;
}

/**
 * MixHost类 - 面片宿主管理器
 * 用于关联和管理3D模型中的面片实体（如墙面、地板等）
 */
export class MixHost {
  /** 面片实体对象 */
  private _faceEntity?: FaceEntity;
  
  /** 面片索引ID */
  private _faceId?: number;

  constructor() {}

  /**
   * 克隆当前MixHost实例
   * @returns 新的MixHost实例，包含相同的数据
   */
  clone(): MixHost {
    const cloned = new MixHost();
    cloned.copyFrom(this);
    return cloned;
  }

  /**
   * 从另一个MixHost实例复制数据
   * @param source - 源MixHost实例
   */
  copyFrom(source: MixHost): void {
    this._faceEntity = source._faceEntity;
    this._faceId = source._faceId;
  }

  /**
   * 检查当前实例是否有效（是否包含有效的面片实体）
   * @returns true表示包含有效的面片实体
   */
  isValid(): boolean {
    return this._faceEntity != null;
  }

  /**
   * 获取面片实体
   */
  get faceEntity(): FaceEntity | undefined {
    return this._faceEntity;
  }

  /**
   * 设置面片实体
   * @param entity - 面片实体对象，不能为null
   */
  set faceEntity(entity: FaceEntity | undefined) {
    // 注意：原代码断言entity不为null，但类型定义允许undefined
    if (this._faceEntity && entity && entity.id === this._faceEntity.id) {
      return;
    }
    this._faceEntity = entity;
  }

  /**
   * 获取面片索引ID
   */
  get faceId(): number | undefined {
    return this._faceId;
  }

  /**
   * 设置面片索引ID
   */
  set faceId(id: number | undefined) {
    this._faceId = id;
  }

  /**
   * 获取默认材质
   * 根据面片实体类型返回相应的默认材质
   * @returns 地板返回默认地板材质，否则返回默认白色墙漆材质
   */
  get defaultMaterial(): unknown {
    return this._faceEntity instanceof HSCore.Model.Floor
      ? HSConstants.Constants.DEFAULT_FLOOR_MATERIAL
      : HSConstants.Constants.DEFAULT_WALL_WHITE_PAINT;
  }

  /**
   * 从序列化数据加载MixHost
   * @param data - 序列化的数据对象
   * @param options - 加载选项，包含实体映射和查找信息
   */
  load(data: SerializedMixHost, options: LoadOptions): void {
    this._faceId = data.faceId;

    let entityId = data.faceEntity;

    // 处理实体迁移映射
    if (entityId && options.migrateEntitiesMap?.get(entityId)) {
      entityId = options.migrateEntitiesMap.get(entityId)!.id;
    }

    if (entityId) {
      // 优先从options.entities查找
      let entity = options.entities[entityId];

      // 回退到文档管理器查找
      if (!entity) {
        entity = HSCore.Doc.getDocManager()
          .activeDocument
          .getEntityById(entityId);
      }

      if (entity) {
        this.faceEntity = entity;
      }
    }
  }

  /**
   * 序列化MixHost为普通对象
   * @returns 包含面片实体ID和面片ID的对象
   */
  dump(): SerializedMixHost {
    return {
      faceEntity: this._faceEntity?.id,
      faceId: this._faceId,
    };
  }
}