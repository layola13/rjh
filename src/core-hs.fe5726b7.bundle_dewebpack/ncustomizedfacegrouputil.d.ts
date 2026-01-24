/**
 * 自定义面组工具类
 * 提供面组的判断、获取、变换和连通性检测等功能
 */
export declare class NCustomizedFaceGroupUtil {
  /**
   * 判断指定实体的某个面是否属于面组
   * @param entity - 要检查的实体对象
   * @param faceType - 面类型标识符
   * @returns 如果该面属于面组且具有有效的面组ID则返回true，否则返回false
   */
  static isFaceGroup(entity: unknown, faceType: string): boolean;

  /**
   * 判断一组面项是否属于同一个面组
   * @param faceItems - 面项数组，每个面项包含entity和faceType属性
   * @returns 如果所有面项都属于同一个面组则返回true，空数组返回false
   */
  static isSameFaceGroup(
    faceItems: Array<{ entity: FaceEntity; faceType: string }>
  ): boolean;

  /**
   * 获取与指定面属于同一面组的所有面项
   * @param entity - 要查询的实体对象
   * @param faceType - 面类型标识符
   * @returns 面组中所有面项的数组，如果不是面组或查询失败则返回空数组
   */
  static getFaceItems(
    entity: unknown,
    faceType: string
  ): Array<{ entity: FaceEntity; faceType: string }>;

  /**
   * 检查面组是否需要清除RCP（可能是渲染相关属性）
   * @param entity - 要检查的实体对象
   * @param faceType - 面类型标识符
   * @returns 如果面组中的面RCP状态不一致则返回true
   */
  static faceGroupNeedClearRCP(entity: unknown, faceType: string): boolean;

  /**
   * 获取面组中指定面的变换矩阵
   * @param entity - 实体对象
   * @param faceType - 面类型标识符
   * @returns 变换矩阵对象，如果不存在则返回undefined
   */
  static getFaceGroupTransform(
    entity: unknown,
    faceType: string
  ): Transform | undefined;

  /**
   * 检查面的背景是否发生变化
   * @param entity - 实体对象
   * @param faceType - 面类型标识符
   * @param material - 可选的材质对象，如果未提供则从实体获取
   * @returns 如果背景发生变化则返回true
   */
  static hasFaceBackgroundChanged(
    entity: unknown,
    faceType: string,
    material?: FaceMaterial
  ): boolean;

  /**
   * 判断两个Brep（边界表示）对象是否连通
   * @param brep1 - 第一个Brep对象
   * @param brep2 - 第二个Brep对象
   * @returns 如果两个Brep通过边或线连通则返回true
   */
  static isTwoBrepsConnected(brep1: Brep | null, brep2: Brep | null): boolean;

  /**
   * 从网格键中提取面标签
   * @param meshKey - 网格键字符串，格式通常为"路径/标签"
   * @returns 提取的面标签（最后一个"/"之后的部分）
   */
  static getFaceTagByMeshKey(meshKey: string): string;

  /**
   * 检查自定义模型中的面是否与面组中的其他面连通
   * @param entity - 自定义模型实体
   * @param faceType - 面类型标识符
   * @returns 如果所有面项都连通则返回true
   */
  static isNCustomizedConnected(entity: unknown, faceType: string): boolean;

  /**
   * 获取面的铺装轮廓路径
   * @param entity - 实体对象
   * @param faceType - 面类型标识符
   * @param needClearRCP - 是否需要清除RCP属性
   * @returns 包含外轮廓和孔洞的路径对象
   */
  static getPaveOutline(
    entity: unknown,
    faceType: string,
    needClearRCP: boolean
  ): PathWithHoles;
}

/**
 * 面实体接口
 */
interface FaceEntity {
  getFaceMaterial(faceType: string): FaceMaterial | undefined;
  getFaceByTag(tag: string): Brep | undefined;
  getEntityByMeshName?: (meshName: string) => FaceEntity | undefined;
  getUniqueParent?: () => FaceEntity;
}

/**
 * 面材质接口
 */
interface FaceMaterial {
  mixpaint?: {
    faceGroup?: FaceGroup;
    getBackgroundPath?: () => Path | undefined;
  };
}

/**
 * 面组接口
 */
interface FaceGroup {
  faceGroupId?: string;
  getFaceIds(): string[];
  getTransformById(faceType: string): Transform | undefined;
}

/**
 * 变换矩阵接口
 */
interface Transform {
  isIdentity(): boolean;
}

/**
 * 边界表示（Brep）接口
 */
interface Brep {
  getWires(): Array<{ toPath(): Path[] }>;
}

/**
 * 路径类型（点数组）
 */
type Path = unknown[];

/**
 * 带孔洞的路径结构
 */
interface PathWithHoles {
  /** 外轮廓线段数组 */
  outer: unknown[];
  /** 内孔洞线段数组（可选） */
  holes?: unknown[][];
}