/**
 * 地板平面的路径分割参数配置
 */
interface DivideFloorByPathsOptions {
  /** 要分割的地板面 */
  floor: Floor;
  /** 分割路径 */
  path: unknown;
  /** 起始额外路径 */
  startExtraPath: unknown;
  /** 结束额外路径 */
  endExtraPath: unknown;
  /** 起始边缘 */
  startEdge: unknown;
  /** 结束边缘 */
  endEdge: unknown;
}

/**
 * 查找面循环结果
 */
interface FaceLoopResult {
  /** 面列表 */
  faces: unknown[];
  /** 前后面列表 */
  frontbackFaces: unknown[];
  /** 点集合 */
  points: unknown[];
  /** 墙体结构列表 */
  walls: Wall[];
}

/**
 * 面类型字符串字面量联合类型
 */
type FaceType = 'unknown' | string;

/**
 * 面工具类 - 提供地板/天花板面的操作和验证功能
 */
export declare const FaceUtil: {
  /**
   * 通过路径分割地板平面
   * @param options - 分割配置选项
   */
  divideFloorByPaths(options: DivideFloorByPathsOptions): void;

  /**
   * 获取与指定地板相邻的所有地板
   * @param floor - 目标地板对象
   * @returns 邻接地板与共享边的映射表
   */
  adjacentFloors(floor: Floor): Map<Floor | Ceiling, Edge[]>;

  /**
   * 获取两个地板之间的共享边缘
   * @param floor1 - 第一个地板
   * @param floor2 - 第二个地板
   * @returns 共享的边缘数组
   */
  getSharedEdges(floor1: Floor, floor2: Floor): Edge[];

  /**
   * 将地板合并到相邻的地板
   * @param floor - 要合并的地板
   * @returns 合并后的地板,如果没有相邻地板则返回 undefined
   */
  mergeFloorToAdjacent(floor: Floor): Floor | Ceiling | undefined;

  /**
   * 将一个地板合并到另一个指定的地板
   * @param sourceFloor - 源地板(将被合并)
   * @param targetFloor - 目标地板(合并目标)
   * @param sharedEdges - 两个地板之间的共享边缘
   * @returns 合并后的目标地板
   */
  mergeFloorToOtherFloor(
    sourceFloor: Floor,
    targetFloor: Floor,
    sharedEdges: Edge[]
  ): Floor | Ceiling;

  /**
   * 验证面的有效性
   * @param face - 要验证的面对象
   * @throws 如果面的外部循环未定义则抛出断言错误
   */
  validateFace(face: Floor | Ceiling): void;

  /**
   * 自动调整内容以适配面
   * @param face - 目标面(墙体或地板)
   * @param content - 要调整的内容对象(如壁龛、开口等)
   * @returns 如果成功适配返回 true,否则返回 false
   */
  autoFitContentToFace(
    face: Wall | Floor | Ceiling,
    content: Niche | Opening
  ): boolean;

  /**
   * 查找与实体关联的面循环信息
   * @param entity - 实体对象
   * @returns 面循环结果,如果未找到返回 undefined
   */
  findFaceLoop(entity: unknown): FaceLoopResult | undefined;

  /**
   * 获取面的类型
   * @param face - 面对象
   * @returns 面的类型字符串,默认为 'unknown'
   */
  getFaceType(face: unknown): FaceType;

  /**
   * 判断多个面是否相互连接
   * @param faces - 要检查的面数组
   * @returns 如果所有面都相互连接返回 true,否则返回 false
   */
  isFacesConnected(faces: (Floor | unknown)[]): boolean;
};

/**
 * 地板面实体类型声明(外部模块)
 */
declare class Floor {
  id: string;
  outerLoop?: Loop;
  roomInfos: RoomInfo[];
  wirePath: { outer: unknown[] };
  
  /**
   * 遍历地板中的所有内容
   */
  forEachContent(callback: (content: unknown) => void): void;
  
  /**
   * 触发脏状态更新
   */
  onDirty(): void;
}

/**
 * 天花板面实体类型声明(外部模块)
 */
declare class Ceiling {
  id: string;
  outerLoop?: Loop;
  thickness: number;
  
  /**
   * 触发脏状态更新
   */
  onDirty(): void;
}

/**
 * 墙体实体类型声明(外部模块)
 */
declare class Wall {
  to: Vector;
  from: Vector;
  width: number;
  thickness: number;
  transRotation: number;
  transDirection: Vector;
}

/**
 * 边缘对象
 */
declare class Edge {
  from: Vertex;
  to: Vertex;
  ID: string;
}

/**
 * 顶点对象
 */
declare class Vertex {
  ID: string;
  parents: Record<string, unknown>;
}

/**
 * 共边对象
 */
declare class CoEdge {
  edge: Edge;
  partner?: CoEdge;
  
  /**
   * 获取唯一父级
   */
  getUniqueParent(): Loop | undefined;
}

/**
 * 循环对象
 */
declare class Loop {
  /**
   * 遍历循环中的所有共边
   */
  forEachCoEdge(callback: (coEdge: CoEdge) => void): void;
  
  /**
   * 验证循环的有效性
   */
  validate(): void;
  
  /**
   * 获取唯一父级面
   */
  getUniqueParent(): Floor | Ceiling | undefined;
}

/**
 * 壁龛对象
 */
declare class Niche {
  x: number;
  y: number;
  z: number;
  rotation: number;
  thickness: number;
  
  /**
   * 获取宿主实体
   */
  getHost(): unknown;
}

/**
 * 开口对象
 */
declare class Opening {
  thickness: number;
}

/**
 * 房间信息
 */
interface RoomInfo {
  faces: unknown[];
  geometry: {
    outer: unknown[];
  };
  structures: unknown[];
}

/**
 * 向量对象
 */
interface Vector {
  x: number;
  y: number;
  z?: number;
  
  normalize(): Vector;
  scale(factor: number): Vector;
  clone(): Vector;
  add(other: Vector): Vector;
}

/**
 * X轴旋转属性(可能用于3D对象旋转)
 */
export declare type XRotation = number;