/**
 * 迭代器结果类型
 */
interface IteratorResult<T> {
  done: boolean;
  value?: T;
}

/**
 * 自定义迭代器接口
 */
interface CustomIterator<T> {
  /** 初始化迭代器 */
  s: () => void;
  /** 获取下一个元素 */
  n: () => IteratorResult<T>;
  /** 处理错误 */
  e: (error: unknown) => void;
  /** 完成迭代时的清理函数 */
  f: () => void;
}

/**
 * 点数据结构
 */
interface Point {
  x: number;
  y: number;
  ID?: string;
}

/**
 * 3D点数据结构
 */
interface Point3D extends Point {
  z: number;
}

/**
 * 边界矩形
 */
interface Bound {
  left: number;
  top: number;
  width: number;
  height: number;
  /** 检查边界是否有效 */
  isValid: () => boolean;
}

/**
 * 顶点模型
 */
interface Vertex extends Point {
  ID: string;
  parents: Record<string, Edge | unknown>;
}

/**
 * 边模型
 */
interface Edge {
  from: Vertex | Point;
  to: Vertex | Point;
  coedge?: CoEdge;
  parents: Record<string, unknown>;
  /** 计算边的长度 */
  length: number;
}

/**
 * 共边模型
 */
interface CoEdge {
  partner?: CoEdge;
  next?: CoEdge;
  prev?: CoEdge;
  reversed: boolean;
  parents: Record<string, Loop>;
}

/**
 * 循环（闭合路径）
 */
interface Loop {
  /** 验证循环的有效性 */
  validate: () => boolean;
  /** 添加共边 */
  addChild: (coedge: CoEdge) => void;
  /** 移除共边 */
  removeCoEdge: (coedge: CoEdge) => void;
}

/**
 * 墙体模型
 */
interface Wall {
  from: Point;
  to: Point;
  instanceOf: (className: string) => boolean;
}

/**
 * 图层模型
 */
interface Layer {
  walls: Record<string, Wall>;
  bound: Bound;
  height: number;
}

/**
 * 场景模型
 */
interface Scene {
  activeLayer: Layer;
  lastLayer: Layer;
  rootLayer: Layer;
  /** 获取图层高度 */
  getLayerAltitude: (layer: Layer) => number;
}

/**
 * 相机类型枚举
 */
declare enum CameraTypeEnum {
  FirstPerson = 'FirstPerson',
  OrbitView = 'OrbitView',
  OrthView = 'OrthView'
}

/**
 * 相机模型
 */
interface Camera extends Point3D {
  type: CameraTypeEnum;
  target_x: number;
  target_y: number;
  target_z: number;
  pitch: number;
}

/**
 * 平面图模型
 */
interface Floorplan {
  active_camera: Camera;
  scene: Scene;
}

/**
 * 选择管理器
 */
interface SelectionManager {
  /** 获取当前过滤器 */
  getCurrentFilter: () => SelectionFilter | null;
  /** 检查实体是否被选中 */
  hasSelected: (entity: unknown) => boolean;
  /** 获取所有选中的实体 */
  selected: () => unknown[];
  /** 选中实体 */
  select: (entity: unknown, option?: unknown) => void;
  /** 取消选中实体 */
  unselect: (entity: unknown) => void;
  /** 取消所有选中 */
  unselectAll: () => void;
}

/**
 * 选择过滤器
 */
interface SelectionFilter {
  /** 过滤实体 */
  filter: (entity: unknown, option?: unknown) => unknown;
}

/**
 * 关联管理器
 */
interface AssociationManager {
  /** 根据目标获取实体 */
  getEntityByTarget: (target: Point, strict?: boolean) => Vertex | Wall | null;
  /** 添加关联 */
  addAssociation: (entity: Vertex | Wall, target: Point, associationType: string) => void;
  /** 移除关联 */
  removeAssociation: (entityId: string, target: Point) => void;
}

/**
 * 渲染插件
 */
interface RenderPlugin {
  /** 获取图像类型 */
  getImageType: () => string;
}

/**
 * 插件管理器
 */
interface PluginManager {
  /** 获取插件实例 */
  getPlugin: (pluginId: string) => RenderPlugin | null;
}

/**
 * 应用程序实例
 */
interface App {
  selectionManager: SelectionManager;
  associationManager: AssociationManager;
  pluginManager: PluginManager;
  floorplan: Floorplan;
  activeEnvironmentId: string;
}

/**
 * 分割点信息
 */
interface SplitPointInfo {
  point: Point;
  lerp: number;
  newEdge?: Edge;
}

/**
 * 工具类模块导出
 */
export interface Util {
  /**
   * 点选操作
   * @param entity - 要选择的实体
   * @param isMultiSelect - 是否多选模式
   * @param option - 选择选项
   */
  pointSelect(entity: unknown, isMultiSelect: boolean, option?: unknown): void;

  /**
   * 将边转换为THREE.js曲线对象
   * @param edge - 边对象
   * @returns THREE.js Line3对象
   */
  toTHREECurve(edge: Edge): THREE.Line3;

  /**
   * 通过点集分割边
   * @param edge - 要分割的边
   * @param points - 分割点数组
   * @param vertexConstructor - 顶点构造函数（可选）
   * @returns 新创建的边数组
   */
  splitEdgeByPoints(edge: Edge, points: Point[], vertexConstructor?: unknown): Edge[];

  /**
   * 获取顶点的所有父边
   * @param vertex - 顶点对象
   * @returns 父边数组
   */
  getParentEdges(vertex: Vertex): Edge[];

  /**
   * 替换顶点引用
   * @param oldVertex - 旧顶点
   * @param newVertex - 新顶点
   */
  replace(oldVertex: Vertex | Point, newVertex: Vertex | Point): void;

  /**
   * 尝试合并循环上的顶点
   * @param vertex - 要合并的顶点
   * @returns 是否成功合并
   */
  tryMergeVertexOnLoop(vertex: Vertex): boolean;

  /**
   * 更新顶点与墙体的关联
   * @param vertices - 顶点数组
   * @param walls - 墙体数组
   */
  updateVerticesAssociateToWalls(vertices: Point[], walls: Wall[]): void;

  /**
   * 更新顶点与图层墙体的关联
   * @param vertices - 顶点数组
   * @param layers - 图层数组
   */
  updateVerticesAssociationToLayerWalls(vertices: Point[], layers: Layer[]): void;

  /**
   * 调整相机位置和视角
   * @param useRootLayer - 是否使用根图层（默认false）
   */
  adjustCamera(useRootLayer?: boolean): void;

  /**
   * 正交视图模式下调整相机
   * @param camera - 相机对象
   * @param layerAltitude - 图层高度
   * @param layerHeight - 图层厚度
   */
  adjustCameraInOrthViewMode(camera: Camera, layerAltitude: number, layerHeight: number): void;

  /**
   * 第一人称模式下调整相机
   * @param camera - 相机对象
   * @param layerAltitude - 图层高度
   */
  adjustCameraInFirstPersonMode(camera: Camera, layerAltitude: number): void;

  /**
   * 轨道视图模式下调整相机
   * @param bound - 边界矩形
   * @param camera - 相机对象
   * @param layerAltitude - 图层高度
   * @param targetZ - 目标Z坐标
   */
  adjustCameraInOrbitViewMode(bound: Bound, camera: Camera, layerAltitude: number, targetZ: number): void;

  /**
   * 渲染模式下调整相机
   * @param bound - 边界矩形
   * @param camera - 相机对象
   * @param layerAltitude - 图层高度
   */
  adjustCameraInOrbitRenderMode(bound: Bound, camera: Camera, layerAltitude: number): void;

  /**
   * 解析资源URL路径
   * @param resourcePath - 资源路径
   * @returns 完整URL
   */
  parseURL(resourcePath: string): string;
}

/**
 * 模块导出接口
 */
export interface LayerEditUtilModule {
  Util: Util;
}

declare const module: LayerEditUtilModule;
export default module;