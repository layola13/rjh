/**
 * 自定义特征模型实体模块
 * 用于处理参数化吊顶、草图造型等自定义模型的数据导出
 */

import { AcceptEntity } from './AcceptEntity';
import { Parameter, DataType } from './Parameter';
import { HSCore } from './HSCore';
import { Utils } from './Utils';
import { NCustomizedMoldingEntity } from './NCustomizedMoldingEntity';
import { DIYFaceEntity } from './DIYFaceEntity';
import { genEntityTypeFromContent, genCategoryDataFromContent, genInstanceDataFromContent } from './EntityUtils';

/**
 * 自定义模型结果类型枚举
 */
export enum NCustomizedModelResultType {
  /** 结构信息 */
  StructureInfo = 'ncustomized structure info',
  /** 草图造型信息 */
  SketchMolding = 'ncustomized sketch molding info',
  /** 参数化吊顶信息 */
  ParametricCeiling = 'ncustomized parametric ceiling info',
  /** DIY模型信息 */
  DIYModel = 'ncustomized diy model info'
}

/**
 * 截面数据类
 * 表示两个端点之间的截面及其高度信息
 */
declare class SectionData {
  /** 截面起点 */
  pointA: THREE.Vector2;
  /** 截面终点 */
  pointB: THREE.Vector2;
  /** 截面高度数组 */
  height: number[];

  /**
   * @param pointA - 截面起点
   * @param pointB - 截面终点
   * @param height - 初始高度
   */
  constructor(pointA: THREE.Vector2, pointB: THREE.Vector2, height: number);

  /**
   * 判断是否为相同截面
   * @param section - 待比较的截面
   * @returns 是否相同
   */
  isSameSection(section: SectionData): boolean;

  /**
   * 插入新的高度值
   * @param height - 高度值
   */
  insertHeight(height: number): void;

  /**
   * 计算截面面积
   * @param polygon - 宿主面轮廓多边形
   * @returns 面积值
   */
  getArea(polygon: THREE.Vector2[]): number;

  /**
   * 获取截面长度
   * @returns 长度值
   */
  getLength(): number;
}

/**
 * 投影数据接口
 */
interface ProjectionData {
  /** 距离 */
  distance: number;
  /** 面积 */
  area: number;
  /** 路径数据 */
  paths: Array<{
    paths: Array<Array<{ X: number; Y: number }>>;
    graphicsPath?: string;
  }>;
  /** 表面积（可选） */
  surfaceArea?: number;
}

/**
 * 表面积计算器
 * 用于计算自定义模型的水平和垂直表面积
 */
declare class SurfaceAreaCalculator {
  /** 截面数组 */
  private sectionArray: SectionData[];
  /** 宿主面轮廓 */
  private hostFaceOutline: THREE.Vector2[];
  /** 水平面积 */
  private horizontalArea: number;
  /** 垂直面积 */
  private verticalArea: number;

  constructor();

  /**
   * 导入截面数据
   * @param faceOutline - 面轮廓点数组
   * @param projectionData - 投影数据数组
   */
  importSectionData(faceOutline: THREE.Vector3[], projectionData: ProjectionData[]): void;

  /**
   * 计算总表面积
   * @returns 总表面积（水平+垂直）
   */
  calculateSurfaceArea(): number;

  /**
   * 设置宿主面轮廓
   * @param faceOutline - 面轮廓点数组
   */
  setHostFaceOutline(faceOutline: THREE.Vector3[]): void;

  /**
   * 设置截面数据
   * @param projectionData - 投影数据数组
   */
  setSectionData(projectionData: ProjectionData[]): void;

  /**
   * 添加截面
   * @param pointA - 起点
   * @param pointB - 终点
   * @param height - 高度
   */
  addSection(pointA: THREE.Vector2, pointB: THREE.Vector2, height: number): void;

  /**
   * 获取水平面积
   * @returns 水平面积
   */
  getHorizontalArea(): number;

  /**
   * 获取垂直面积
   * @returns 垂直面积
   */
  getVerticalArea(): number;
}

/**
 * 面信息接口
 */
interface FaceGeomInfo {
  /** 面几何路径 */
  faceGeomPath: THREE.Vector3[];
  /** 面信息 */
  faceInfo: {
    outer: Array<{ x: number; y: number }>;
  };
}

/**
 * 内容实体接口（墙体、吊顶等）
 */
interface ContentEntity {
  /** 实体ID */
  id: string;
  /** 父级容器 */
  parent: { id: string };
  /** 宿主对象 */
  host?: HSCore.Model.Wall | HSCore.Model.Face;
  /** 属性映射 */
  properties?: Map<string, number | string>;
  /** 参数配置 */
  parameters?: {
    parametricCeilingType?: string;
    [key: string]: unknown;
  };
  /** Z轴尺寸 */
  ZSize?: number;
  /** 标签 */
  tag?: string;
  /** BREP数据 */
  breps?: Array<{ tag: string }>;
  /** 草图对象 */
  sketch?: SketchData;
  /** 位置坐标 */
  x: number;
  y: number;

  /**
   * 获取造型实体列表
   */
  getMoldingEntities(): unknown[];

  /**
   * 获取灯槽实体列表
   */
  getLightSlotEntities(): unknown[];

  /**
   * 获取灯带实体列表
   */
  getLightBandEntities(): unknown[];

  /**
   * 获取面材质
   * @param faceId - 面ID
   */
  getFaceMaterial(faceId: string): { mixpaint?: { faceGroup: { getFaceIds(): string[] } } } | undefined;

  /**
   * 获取标准面材质数据
   * @param faceId - 面ID
   */
  getNormalFaceMaterialData(faceId: string): { seekId?: string } | undefined;

  /**
   * 根据Mesh键获取面标签
   * @param meshKey - Mesh键
   */
  getFaceTagByMeshKey(meshKey: string): string;

  /**
   * 根据标签获取面对象
   * @param tag - 标签
   */
  getFaceByTag(tag: string): Face | undefined;

  /**
   * 获取底部投影
   * @param includeAll - 是否包含所有
   */
  getBottomProjection(includeAll: boolean): ProjectionData[];

  /**
   * 获取前方投影
   */
  getFrontProjection(): ProjectionData[];

  /**
   * 获取顶部投影
   */
  getTopProjection(): ProjectionData[];
}

/**
 * 面对象接口
 */
interface Face {
  /**
   * 获取曲面对象
   */
  getSurface(): Surface;
}

/**
 * 曲面对象接口
 */
interface Surface {
  /**
   * 是否为平面
   */
  isPlane(): boolean;

  /**
   * 获取原点
   */
  getOrigin(): THREE.Vector3;
}

/**
 * 草图数据接口
 */
interface SketchData {
  /** 子元素 */
  children: Record<string, {
    children: Record<string, {
      children: Record<string, { radius?: number }>;
    }>;
  }>;
  /** 面数组 */
  faces: Array<{ id: string }>;

  /**
   * 获取拉伸值
   * @param faceId - 面ID
   */
  getExtrusionValue(faceId: string): number;
}

/**
 * 面数据接口（包含拉伸信息）
 */
interface FaceWithExtrusion {
  /** 2D面对象 */
  face2d: { id: string };
  /** 拉伸高度 */
  extrusion: number;
}

/**
 * 自定义特征模型实体类
 * 处理参数化吊顶、草图造型、DIY模型的数据导出
 */
export declare class NCustomizedFeatureModelEntity extends AcceptEntity {
  constructor();

  /**
   * 构建子实体
   * 包括造型、灯槽、灯带和DIY面
   * @param content - 内容实体
   */
  buildChildren(content: ContentEntity): void;

  /**
   * 构建实体数据
   * @param content - 内容实体
   */
  buildEntityData(content: ContentEntity): void;

  /**
   * 获取实例数据
   * @param content - 内容实体
   * @returns 实例数据参数集合
   */
  getInstanceData(content: ContentEntity): InstanceData;

  /**
   * 获取基础模型数据
   * @param content - 内容实体
   * @param instanceData - 实例数据容器
   */
  getBasicModelData(content: ContentEntity, instanceData: InstanceData): void;

  /**
   * 构建参数化吊顶数据
   * @param content - 内容实体
   * @param instanceData - 实例数据容器
   */
  buildParametricCeilingData(content: ContentEntity, instanceData: InstanceData): void;

  /**
   * 获取投影数据
   * @param content - 内容实体
   * @returns 投影数据数组
   */
  getProjection(content: ContentEntity): ProjectionData[];

  /**
   * 获取总投影面积
   * @param content - 内容实体
   * @returns 投影面积（平方米）
   */
  getTotalProjectionArea(content: ContentEntity): number;

  /**
   * 获取总投影长度
   * @param content - 内容实体
   * @returns 投影长度（米）
   */
  getTotalProjectionLength(content: ContentEntity): number;

  /**
   * 获取自定义模型表面积
   * 包括水平和垂直表面
   * @param content - 内容实体
   * @returns 表面积（平方米）
   */
  getSurfaceAreaForCustomizedModel(content: ContentEntity): number;

  /**
   * 获取草图模型的圆角半径数组
   * @param content - 内容实体
   * @returns 圆角半径数组
   */
  getCornerCountForSketchModel(content: ContentEntity): number[];

  /**
   * 获取底部面标识数组
   * @param content - 内容实体
   * @returns 面标识数组
   */
  getBottomFaces(content: ContentEntity): string[];

  /**
   * 获取参数化吊顶的底部面
   * @param content - 内容实体
   * @returns 底部面标识数组
   */
  getParametricCeilingBottomFaces(content: ContentEntity): string[];

  /**
   * 获取草图模型的底部面
   * @param content - 内容实体
   * @returns 底部面标识数组
   */
  getSketchBottomFaces(content: ContentEntity): string[];

  /**
   * 获取默认面面积
   * @param content - 内容实体
   * @param isSketchModel - 是否为草图模型
   * @returns 默认面面积（平方米）
   */
  getDefaultFaceArea(content: ContentEntity, isSketchModel: boolean): number;
}

/**
 * 实例数据接口
 */
interface InstanceData {
  /**
   * 添加参数
   * @param parameters - 参数列表
   */
  addParameter(...parameters: Parameter[]): void;

  /**
   * 获取参数
   * @param name - 参数名称
   */
  getParameter(name: string): Parameter | undefined;
}