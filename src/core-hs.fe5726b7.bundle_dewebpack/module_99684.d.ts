/**
 * 边界计算工具模块
 * 提供实体边界框、轮廓点计算等几何运算功能
 */

/**
 * 2D 点坐标
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 3D 点坐标
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 边界框方形区域
 */
interface BoundSquare {
  /** X 轴最大值 */
  maxX: number;
  /** Y 轴最大值 */
  maxY: number;
  /** X 轴最小值 */
  minX: number;
  /** Y 轴最小值 */
  minY: number;
  /** Z 轴最小值 */
  minZ: number;
  /** Z 轴最大值 */
  maxZ: number;
}

/**
 * 3D 边界框信息
 */
interface BoundBox3D {
  /** 左边界 */
  left: number;
  /** 右边界 */
  right: number;
  /** 底部边界 */
  bottom: number;
  /** 顶部边界 */
  top: number;
  /** 前边界 */
  front: number;
  /** 后边界 */
  back: number;
  /** 方形区域边界 */
  square: BoundSquare;
  /** 中心点坐标 */
  center: Point3D;
  /** X 轴尺寸 */
  XSize: number;
  /** Y 轴尺寸 */
  YSize: number;
  /** Z 轴尺寸 */
  ZSize: number;
}

/**
 * 实体类型（基类） */
interface Entity {
  x: number;
  y: number;
  rotation: number;
  isFlagOn?(flag: unknown): boolean;
  forEachChild?(callback: (child: Entity) => void): void;
}

/**
 * 挤出实体
 */
interface DExtruding extends Entity {
  __direction?: Point3D;
  height: number;
  getPaths(): Point3D[][];
}

/**
 * 内容实体
 */
interface Content extends Entity {
  XLength: number;
  YLength: number;
  ZLength: number;
}

/**
 * DContent 实体（继承 Content）
 */
interface DContent extends Content {}

/**
 * 装配实体
 */
interface DAssembly extends Entity {
  forEachChild(callback: (child: Entity) => void): void;
}

/**
 * 边界计算工具类
 * 提供各类实体的局部/全局边界框、轮廓点计算功能
 */
export declare const BoundUtil: {
  /**
   * 获取实体的局部边界轮廓点（2D）
   * @param entity - 目标实体
   * @param includeContent - 是否包含内容实体
   * @param useZeroBase - 是否使用零基准
   * @returns 轮廓点数组，失败返回空数组
   */
  getLocalBoundOutline(
    entity: Entity,
    includeContent?: boolean,
    useZeroBase?: boolean
  ): Point2D[];

  /**
   * 获取实体的全局边界轮廓点（考虑旋转和位置）
   * @param entity - 目标实体
   * @param includeContent - 是否包含内容实体
   * @param useZeroBase - 是否使用零基准
   * @returns 变换后的轮廓点数组
   */
  getBoundOutline(
    entity: Entity,
    includeContent?: boolean,
    useZeroBase?: boolean
  ): Point2D[];

  /**
   * 获取实体的局部 3D 边界框
   * @param entity - 目标实体
   * @param includeContent - 是否包含内容实体
   * @param useZeroBase - 是否使用零基准
   * @returns 边界框信息，无效时返回 null
   */
  getLocalBoundBox3d(
    entity: Entity,
    includeContent?: boolean,
    useZeroBase?: boolean
  ): BoundBox3D | null;

  /**
   * 获取实体的 3D 边界框
   * @param entity - 目标实体
   * @param includeContent - 是否包含内容实体
   * @param useZeroBase - 是否使用零基准
   * @returns 边界框信息，无效时返回 null
   */
  getBoundingBox3d(
    entity: Entity,
    includeContent?: boolean,
    useZeroBase?: boolean
  ): BoundBox3D | null;

  /**
   * 获取实体的局部 3D 边界点集
   * @param entity - 目标实体
   * @param includeContent - 是否包含内容实体
   * @param useZeroBase - 是否使用零基准
   * @returns 3D 点数组，不支持的实体返回 undefined
   */
  getLocalBound3dPoints(
    entity: Entity,
    includeContent?: boolean,
    useZeroBase?: boolean
  ): THREE.Vector3[] | undefined;

  /**
   * 获取实体的变换后 3D 边界点集
   * @param entity - 目标实体
   * @param includeContent - 是否包含内容实体
   * @param useZeroBase - 是否使用零基准
   * @param transformMatrix - 可选的变换矩阵
   * @returns 变换后的 3D 点数组
   */
  getBound3dPoints(
    entity: Entity,
    includeContent?: boolean,
    useZeroBase?: boolean,
    transformMatrix?: THREE.Matrix4
  ): THREE.Vector3[];

  /**
   * 获取实体的全局 3D 边界点集（应用全局变换）
   * @param entity - 目标实体
   * @param includeContent - 是否包含内容实体
   * @param useZeroBase - 是否使用零基准
   * @returns 全局坐标系下的 3D 点数组
   */
  getGlobalBound3dPoints(
    entity: Entity,
    includeContent?: boolean,
    useZeroBase?: boolean
  ): THREE.Vector3[];

  /**
   * 获取实体的全局 3D 边界框
   * @param entity - 目标实体
   * @param includeContent - 是否包含内容实体
   * @param useZeroBase - 是否使用零基准
   * @returns 全局边界框信息，无效时返回 null
   */
  getGlobalBoundingBox3d(
    entity: Entity,
    includeContent?: boolean,
    useZeroBase?: boolean
  ): BoundBox3D | null;

  /**
   * 从点集计算边界框
   * @param points - 3D 点数组
   * @returns 边界框信息，点集为空时返回 null
   */
  getBoundBox(points: THREE.Vector3[]): BoundBox3D | null;

  /**
   * 获取挤出实体的局部 3D 边界点
   * @param entity - 挤出实体
   * @returns 挤出路径的顶点和挤出后的对应点
   */
  getExtrudingLocalBound3dPoints(entity: DExtruding): THREE.Vector3[];

  /**
   * 获取 DContent 实体的局部 3D 边界点
   * @param entity - DContent 实体
   * @param useZeroBase - 是否使用零基准（Z 轴从 0 开始）
   * @returns 包围盒的 8 个顶点
   */
  getDContentLocalBound3dPoints(
    entity: DContent,
    useZeroBase?: boolean
  ): THREE.Vector3[];

  /**
   * 获取装配实体的局部 3D 边界点（递归计算子实体）
   * @param entity - 装配实体
   * @param includeContent - 是否包含内容实体
   * @param useZeroBase - 是否使用零基准
   * @returns 所有子实体边界点的合集
   */
  getDAssemblyLocalBound3dPoints(
    entity: DAssembly,
    includeContent?: boolean,
    useZeroBase?: boolean
  ): THREE.Vector3[];

  /**
   * 获取 Content 实体的局部 3D 边界点
   * @param entity - Content 实体
   * @param useZeroBase - 是否使用零基准（Z 轴从 0 开始）
   * @returns 包围盒的 8 个顶点
   */
  getContentLocalBound3dPoints(
    entity: Content,
    useZeroBase?: boolean
  ): THREE.Vector3[];
};