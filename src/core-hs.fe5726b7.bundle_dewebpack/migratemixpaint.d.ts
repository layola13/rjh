/**
 * 迁移混合贴图工具类
 * 负责处理面组的混合贴图迁移、转换和更新操作
 */
export declare class MigrateMixpaint {
  /**
   * 对面组执行混合贴图处理
   * @param faceEntities - 面实体数组
   * @param mixpaint - 混合贴图对象
   * @returns 如果成功创建混合贴图返回混合贴图实例，否则返回 false 或 undefined
   */
  static doFaceGroup(
    faceEntities: Array<unknown>,
    mixpaint: unknown
  ): unknown | false | undefined;

  /**
   * 使用给定的矩阵变换路径
   * @param path - 包含外轮廓和孔洞的路径对象
   * @param transformMatrix - 变换矩阵
   * @returns 变换后的路径对象
   */
  static transformPath<T extends Path2D>(
    path: T,
    transformMatrix: Matrix3
  ): T;

  /**
   * 从旧的面组断开连接并重新初始化混合贴图
   * @param faceId - 面 ID
   * @param mixpaint - 混合贴图对象
   * @param faceEntity - 面实体对象
   * @private
   */
  private static _disconnectFromOldFaceGroup(
    faceId: number,
    mixpaint: MixpaintInstance,
    faceEntity: FaceEntity
  ): void;

  /**
   * 更新面组的混合贴图迁移状态
   * @param faceIds - 需要更新的面 ID 数组
   * @param sourceMixpaint - 源混合贴图对象
   * @param faceIdToEntitiesMap - 面 ID 到面实体数组的映射表
   */
  static updateMigrationFaceGroup(
    faceIds: number[],
    sourceMixpaint: MixpaintInstance,
    faceIdToEntitiesMap: Map<number, FaceEntity[]>
  ): void;
}

/**
 * 路径 2D 对象结构
 */
interface Path2D {
  /** 外轮廓路径点数组 */
  outer: Array<PathPoint>;
  /** 孔洞路径数组（可选） */
  holes?: Array<Array<PathPoint>>;
}

/**
 * 路径点接口
 */
interface PathPoint {
  /**
   * 对路径点应用变换矩阵
   * @param matrix - 变换矩阵
   */
  transform(matrix: Matrix3): void;
}

/**
 * 3x3 矩阵类型
 */
interface Matrix3 {
  /** 转换为数组表示 */
  toArray(): number[];
  /** 获取逆矩阵 */
  inversed(): Matrix3 | null;
  /** 判断是否为单位矩阵 */
  isIdentity(): boolean;
}

/**
 * 混合贴图实例接口
 */
interface MixpaintInstance {
  /** 关联的面组对象 */
  faceGroup: FaceGroup;
  /** 关联的面实体 */
  faceEntity?: FaceEntity;
  /**
   * 更新背景多边形
   * @param path - 路径对象
   */
  updateBackgroundPolygon(path: Path2D): void;
  /**
   * 应用变换矩阵
   * @param matrix - THREE.js 的 3x3 矩阵
   */
  transform(matrix: THREE.Matrix3): void;
  /**
   * 克隆混合贴图实例
   */
  clone(): MixpaintInstance | null;
}

/**
 * 面组接口
 */
interface FaceGroup {
  /**
   * 获取面组中所有面的 ID
   */
  getFaceIds(): number[];
  /**
   * 清空面组
   */
  clear(): void;
}

/**
 * 面实体接口
 */
interface FaceEntity {
  /** 原始 2D 路径数据 */
  rawPath2d: Path2D;
  /** 关联的材质对象 */
  material?: {
    /** 混合贴图实例 */
    mixpaint?: MixpaintInstance;
  };
}