import { ParametricModel } from './ParametricModel';
import { WebCadDocument } from './WebCadDocument';
import * as Util from '../utils/Util';
import * as THREE from 'three';

/**
 * 材质数据接口
 */
interface MaterialData {
  /** 漫反射贴图路径 */
  diffuseMap?: string;
  /** 法线贴图路径 */
  normalMap?: string;
  /** UV变换参数 */
  uvTransform?: UvTransform;
}

/**
 * UV变换参数接口
 */
interface UvTransform {
  /** 漫反射贴图UV变换矩阵 */
  diffuseMapUvTransform?: THREE.Matrix3;
  /** 法线贴图UV变换矩阵 */
  normalMapUvTransform?: THREE.Matrix3;
}

/**
 * 窗洞参数接口
 */
interface WindowHoleParameters {
  /** 内侧起点 */
  innerFrom?: THREE.Vector2;
  /** 内侧终点 */
  innerTo?: THREE.Vector2;
  /** 外侧起点 */
  outerFrom?: THREE.Vector2;
  /** 外侧终点 */
  outerTo?: THREE.Vector2;
  /** 高程 */
  elevation: number;
  /** 底部是否需要填充 */
  bottomNeedFill?: boolean;
  /** 顶部是否需要填充 */
  topNeedFill?: boolean;
  /** 起始侧是否需要填充 */
  fromSideNeedFill?: boolean;
  /** 结束侧是否需要填充 */
  toSideNeedFill?: boolean;
  /** 侧面材质数据 */
  sideMaterialData?: MaterialData;
  /** 顶面材质数据 */
  topMaterialData?: MaterialData;
  /** 底面材质数据 */
  bottomMaterialData?: MaterialData;
  /** 默认材质数据 */
  materialData?: MaterialData;
}

/**
 * 窗洞实体接口
 */
interface WindowHoleEntity {
  /** 实体ID */
  id: string;
  /** Z方向长度 */
  ZLength: number;
  /** 参数 */
  parameters: WindowHoleParameters;
  /** 获取宿主对象 */
  getHost(): unknown;
  /** 获取唯一父对象 */
  getUniqueParent(): unknown;
  /** 检查标志位是否关闭 */
  isFlagOff(flag: number): boolean;
}

/**
 * 路径配置接口
 */
interface PathConfig {
  /** 路径点数组 */
  paths: THREE.Vector3[][];
  /** 路径所在平面 */
  plane: THREE.Plane;
  /** X射线方向 */
  xRay: THREE.Vector3;
  /** 目标法线方向（可选） */
  targetNormal?: THREE.Vector3;
  /** 自定义数据 */
  customData: CustomData;
}

/**
 * 自定义数据接口
 */
interface CustomData {
  /** 是否为底面 */
  isBottomFace?: boolean;
  /** 是否为顶面 */
  isTopFace?: boolean;
  /** 是否为侧面 */
  isSideFace?: boolean;
  /** UV基准点 */
  uvBasePoint?: THREE.Vector3;
  /** UV中心点 */
  uvCenter?: { x: number; y: number };
  /** 偏移标志 */
  offsetFlag?: OffsetFlag;
}

/**
 * 偏移标志接口
 */
interface OffsetFlag {
  /** 左对齐 */
  leftUAlign?: number;
  /** 右对齐 */
  rightUAlign?: number;
  /** 下对齐 */
  downVAlign?: number;
}

/**
 * 点集合接口
 */
interface PointSet {
  /** 左上角 */
  topLeft: THREE.Vector3;
  /** 左下角 */
  bottomLeft: THREE.Vector3;
  /** 右下角 */
  bottomRight: THREE.Vector3;
  /** 右上角 */
  topRight: THREE.Vector3;
}

/**
 * 几何信息接口
 */
interface GeometryInfo {
  /** 内部点集 */
  innerPoints: PointSet;
  /** 外部点集 */
  outerPoints: PointSet;
}

/**
 * 网格定义接口
 */
interface MeshDefinition {
  /** 网格键值 */
  meshKey: string;
  /** 顶点数据 */
  vertices: number[];
  /** 索引数据 */
  indices: number[];
  /** UV坐标 */
  vertexUVs: number[];
  /** 自定义数据 */
  customData: CustomData;
}

/**
 * 材质对象接口
 */
interface MaterialObject {
  /** 漫反射贴图UV变换 */
  diffuseMapUvTransform?: THREE.Matrix3;
  /** 法线贴图UV变换 */
  normalMapUvTransform?: THREE.Matrix3;
}

/**
 * 图形数据接口
 */
interface GraphicsData {
  /** 网格定义数组 */
  meshDefs: MeshDefinition[];
  /** 图形对象数组 */
  objects: GraphicsObject[];
}

/**
 * 图形对象接口
 */
interface GraphicsObject {
  /** 图形路径 */
  graphicsPath: string;
  /** 网格键值 */
  mesh: string;
  /** 材质对象 */
  material: MaterialObject;
  /** 自定义属性 */
  customAttrs: CustomAttributes;
  /** 实体ID */
  entityId: string;
  /** 类型 */
  type: number;
  /** 可见性 */
  visible: boolean;
}

/**
 * 自定义属性接口
 */
interface CustomAttributes {
  /** 房间类型 */
  roomType: string;
  /** 房间面积 */
  roomArea: number;
  /** 类型 */
  type: string;
}

/**
 * UV变换结果接口
 */
interface UvTransformResult {
  /** U轴方向 */
  uAxis: THREE.Vector3;
  /** 基准点 */
  basePoint: THREE.Vector3;
  /** 中心点 */
  center: { x: number; y: number };
  /** 偏移标志 */
  offsetFlag: OffsetFlag;
  /** 连接标志 */
  jointFlag: string;
}

/**
 * 窗洞参数化模型类
 * 用于处理窗洞的几何建模和图形数据生成
 */
export declare class WindowHole extends ParametricModel {
  /** WebCAD文档实例 */
  private _webCADDocument: WebCadDocument;
  
  /** 窗洞实体 */
  protected entity: WindowHoleEntity;

  /**
   * 构造函数
   * @param entity - 实体对象
   * @param param2 - 参数2
   * @param param3 - 参数3
   * @param param4 - 参数4
   */
  constructor(entity: WindowHoleEntity, param2: unknown, param3: unknown, param4: unknown);

  /**
   * 更新回调方法
   * 根据实体参数构建WebCAD文档的路径数据
   */
  protected onUpdate(): void;

  /**
   * 构建WebCAD文档
   * 处理普通窗口类型的窗洞几何数据
   * @private
   */
  private _buildWebCadDocument(): void;

  /**
   * 从网格数据创建图形数据
   * @param meshes - 网格定义数组
   * @param entity - 窗洞实体
   * @param baseGraphicsObject - 基础图形对象配置
   * @param room - 房间信息（可选）
   * @returns 图形数据对象
   * @private
   */
  private _createGraphicsDataFromMeshes(
    meshes: MeshDefinition[],
    entity: WindowHoleEntity,
    baseGraphicsObject: Partial<GraphicsObject>,
    room: unknown
  ): GraphicsData;

  /**
   * 异步生成图形数据
   * @returns Promise<图形数据对象>
   */
  toGraphicsDataAsync(): Promise<GraphicsData>;

  /**
   * 同步生成图形数据
   * @returns 图形数据对象
   */
  toGraphicsData(): GraphicsData;
}