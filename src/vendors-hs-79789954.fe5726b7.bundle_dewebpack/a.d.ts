/**
 * 内部空间求解器模块
 * 提供空间约束求解功能，用于处理几何体之间的距离约束
 */

/**
 * 面类型枚举
 * 定义几何体的六个边界面方向
 */
export enum EN_TYPE {
  /** 前面 */
  EN_FRONT = "front",
  /** 后面 */
  EN_BACK = "back",
  /** 左面 */
  EN_LEFT = "left",
  /** 右面 */
  EN_RIGHT = "right",
  /** 顶面 */
  EN_TOP = "top",
  /** 底面 */
  EN_BOTTOM = "bottom"
}

/**
 * 求解结果枚举
 * 表示约束求解的不同状态
 */
export enum EN_SOLVE_RESULT {
  /** 求解成功 */
  EN_SUCCESS = "success",
  /** 过约束（约束冲突） */
  EN_OVER_CONSTRAINT = "over_constraint",
  /** 循环约束（存在约束环） */
  EN_LOOP_CONSTRAINT = "loop_constraint"
}

/**
 * 几何面接口
 * 描述几何体的一个面
 */
export interface Face {
  /** 所属几何体ID */
  bodyId: string;
  /** 面ID */
  faceId: string;
  /** 面类型 */
  type: EN_TYPE;
  /** 面的曲面表示 */
  surface: Surface;
}

/**
 * 曲面接口
 * 表示三维空间中的曲面
 */
export interface Surface {
  /** 克隆曲面 */
  clone(): Surface;
  /** 获取曲面原点 */
  getOrigin(): Vector3;
  /** 获取曲面法向量 */
  getNorm(): Vector3;
  /** 获取点在曲面上的投影 */
  getProjectedPtBy(point: Vector3): Vector3;
  /** 平移曲面 */
  translate(vector: Vector3): void;
  /** 变换曲面 */
  transform(matrix: Matrix4): void;
  /** 返回变换后的曲面副本 */
  transformed(matrix: Matrix4): Surface;
}

/**
 * 三维向量接口
 */
export interface Vector3 {
  /** 向量相减 */
  subtracted(other: Vector3): Vector3;
  /** 向量相加 */
  added(other: Vector3): Vector3;
  /** 向量数乘 */
  multiplied(scalar: number): Vector3;
  /** 向量取反 */
  reverse(): void;
}

/**
 * 4x4变换矩阵接口
 */
export interface Matrix4 {
  /** 判断是否为单位矩阵 */
  isIdentity(): boolean;
  /** 返回逆矩阵 */
  inversed(): Matrix4 | undefined;
}

/**
 * 几何体接口
 * 描述参与约束求解的几何体
 */
export interface Body {
  /** 几何体唯一标识 */
  id: string;
  /** 边界面数组 */
  boundFaces: Face[];
  /** 内部面数组（可选） */
  innerFaces?: Face[];
  /** 变换矩阵（可选） */
  matrix?: Matrix4;
  /** 是否固定（不可移动） */
  isFixed: boolean;
  /** 是否为参数化模型 */
  isPmModel: boolean;
  /** 是否为刚性体 */
  isRigid: boolean;
  /** 是否已改变 */
  isChanged: boolean;
}

/**
 * 面距离约束接口
 * 定义两个面之间的距离约束关系
 */
export interface FaceDistanceConstraint {
  /** 第一个面 */
  face1: Face;
  /** 第二个面 */
  face2: Face;
  /** 约束距离值 */
  value: number;
}

/**
 * 内部面数据接口
 * 扩展面信息，包含求解过程中的额外属性
 */
interface FaceData extends Face {
  /** 所属几何体引用 */
  body: Body;
  /** 是否固定 */
  isFixed: boolean;
  /** 绝对坐标系下的曲面 */
  absSurf: Surface;
  /** 是否为内部面 */
  isInner: boolean;
  /** 是否已改变 */
  isChanged?: boolean;
}

/**
 * 约束组接口
 * 包含一组相互关联的几何体及其约束
 */
interface ConstraintGroup {
  /** 几何体ID集合 */
  bs: Set<string>;
  /** 约束数组 */
  cs: FaceDistanceConstraint[];
  /** 图节点名称（用于拓扑排序） */
  graphName?: string;
}

/**
 * 图节点数据接口
 */
interface GraphNodeData {
  /** 几何信息 */
  geo: ConstraintGroup | FaceData;
  /** 是否已求解 */
  solved?: boolean;
}

/**
 * 图边数据接口
 */
interface GraphEdgeData {
  /** 约束 */
  cst: FaceDistanceConstraint;
  /** 是否已求解 */
  solved?: boolean;
}

/**
 * 有向图接口
 */
interface Graph {
  /** 设置节点 */
  setNode(name: string, data: GraphNodeData): void;
  /** 设置边 */
  setEdge(from: string, to: string, data: GraphEdgeData): void;
  /** 获取节点数据 */
  node(name: string): GraphNodeData;
  /** 获取边数据 */
  edge(edge: { v: string; w: string }): GraphEdgeData;
  /** 获取节点的入边 */
  inEdges(name: string): Array<{ v: string; w: string }> | undefined;
  /** 获取节点的所有边 */
  nodeEdges(name: string): Array<{ v: string; w: string }>;
  /** 获取所有节点名称 */
  nodes(): string[];
}

/**
 * 拓扑排序结果接口
 */
interface TopologicalSortResult {
  /** 拓扑排序后的节点序列 */
  topSorts: string[];
  /** 约束图 */
  cstGraph: Graph;
}

/**
 * 内部空间求解器类
 * 用于求解几何体之间的空间约束关系
 * 
 * @example
 *