import type { Vector3 } from './Vector3';
import type { WallFaceAssemblyDecorator } from './WallFaceAssemblyDecorator';
import type { Material } from './Material';
import type { MaterialApi } from './MaterialApi';
import type { NCParametricModelMaterialUtil } from './NCParametricModelMaterialUtil';
import type { NCPConstantEnum } from './NCPConstantEnum';

/**
 * 属性类型枚举
 */
type PropertyType = 'MATERIIAL' | string;

/**
 * 限制类型枚举
 */
type LimitType = 'FIXED' | string;

/**
 * 材质信息接口
 */
interface MaterialInfo {
  /** 材质唯一标识ID */
  seekId: string;
  /** 旋转角度（弧度） */
  rotation: number;
  /** X轴偏移量 */
  offsetX: number;
  /** Y轴偏移量 */
  offsetY: number;
  /** X轴缩放比例 */
  scaleX: number;
  /** Y轴缩放比例 */
  scaleY: number;
}

/**
 * 材质分组额外信息
 */
interface MaterialGroupExtraInfo {
  /** 变量名称 */
  name: string;
  /** 材质详细信息 */
  materialInfo: MaterialInfo;
}

/**
 * 三维坐标点
 */
interface Point3D {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
}

/**
 * 面信息接口
 */
interface FaceInfo {
  /** 外轮廓点集 */
  outer: Point3D[];
  /** 孔洞集合 */
  holes: Point3D[][];
  /** 深度/距离参数 */
  D?: number;
}

/**
 * 属性值类型
 */
interface PropertyValue {
  /** 属性类型 */
  type: PropertyType;
  /** 属性值 */
  value: unknown;
}

/**
 * 导出记录数据接口
 */
interface DumpRecordData {
  /** 实体唯一标识ID */
  seekId: string;
  /** 属性映射表 */
  propertymp: Map<string, PropertyValue>;
  /** 基于尺寸的外轮廓（相对坐标） */
  outerBySize: Point3D[];
  /** 深度/距离参数（可选） */
  D?: number;
  /** 是否自动适配 */
  isAutoFit: boolean;
  /** 是否可缩放 */
  isScalable: boolean;
  /** 材质分组额外信息列表 */
  materialGroupExtraInfo: MaterialGroupExtraInfo[];
}

/**
 * 属性树节点接口
 */
interface PropertyTreeNode {
  /** 友好显示名称 */
  friendlyName?: string;
  /** 属性变量名 */
  name: string;
  /** 属性值 */
  value?: unknown;
  /** 属性类型 */
  type?: PropertyType;
  /** 限制类型 */
  limitType?: LimitType;
  /** 实体ID */
  eId?: string;
  /** 子节点集合 */
  children?: PropertyTreeNode[];
}

/**
 * 材质属性节点（简化版）
 */
interface MaterialPropertyNode {
  /** 友好显示名称 */
  friendlyName: string;
  /** 变量名 */
  name: string;
  /** 属性值 */
  value: unknown;
}

/**
 * 面详细信息
 */
interface FaceDetailInfo {
  /** 所属实体 */
  entity: HSCore.Model.NCPBackgroundWallSubpart;
  /** 面标签/标识 */
  faceTag: string;
  /** 面是否支持绘制材质 */
  isFaceSupportPaintMaterial: boolean;
}

/**
 * 尺寸范围限制
 */
interface SizeLimit {
  /** 最小值 */
  minValue: number;
  /** 最大值 */
  maxValue: number;
}

/**
 * 实体参数接口（扩展HSCore实体参数）
 */
interface EntityParameters {
  /** 是否自动适配 */
  isAutoFit?: boolean;
  /** 目标面信息 */
  targetFaceInfo?: FaceInfo;
  /** 属性树 */
  propertytree?: {
    children: PropertyTreeNode[];
  };
  /** 模型数据 */
  modelData?: {
    dataModel: {
      brepShells?: BrepShell[];
    };
  };
}

/**
 * Brep壳体接口
 */
interface BrepShell {
  /** 材质映射表 */
  materials: Map<string, MaterialReference>;
  /** 壳体集合 */
  shells: Array<{
    getFaces(): Array<{ tag: string }>;
  }>;
}

/**
 * 材质引用接口
 */
interface MaterialReference {
  /** 引用的变量名（可能包含#分隔符） */
  refVariable?: string;
}

/**
 * 背景墙实体接口（扩展HSCore实体）
 */
interface BackgroundWallEntity extends HSCore.Model.Entity {
  /** 元数据 */
  metadata: {
    seekId: string;
  };
  /** 参数配置 */
  parameters: EntityParameters;
  /** 是否可缩放 */
  isScalable?: boolean;
  /** X轴旋转角度 */
  XRotation?: number;
  /** Y轴旋转角度 */
  YRotation?: number;
  /** Z轴旋转角度 */
  ZRotation?: number;
  /** 默认材质映射表 */
  defaultmaterialmap: Map<string, { material: HSCore.Material.MaterialData }>;
  /** 面材质映射表 */
  facematerialmap: Map<string, { material: HSCore.Material.MaterialData }>;

  /**
   * 获取基于尺寸的目标面信息
   * @param targetFaceInfo 可选的目标面信息
   * @returns 包含新外轮廓的面信息
   */
  getTargetFaceInfoBySize(targetFaceInfo?: FaceInfo): { newOuter: Point3D[] };

  /**
   * 通过元数据初始化
   * @param metadata 元数据对象
   */
  initByMeta(metadata: unknown): void;

  /**
   * 打开文档
   * @param faceInfo 面信息
   * @param flag 标志位
   */
  openDocument(faceInfo: FaceInfo, flag: boolean): void;

  /**
   * 构建Brep表示
   * @param properties 属性记录对象
   * @param flag1 标志位1
   * @param flag2 标志位2
   */
  constructBrep(properties: Record<string, unknown>, flag1: boolean, flag2: boolean): void;

  /**
   * 标记子模型为脏（需要更新）
   * @param dirty 是否为脏
   * @param recursive 是否递归标记
   */
  dirtyChildModels(dirty: boolean, recursive?: boolean): void;

  /**
   * 标记几何体为脏（需要更新）
   */
  dirtyGeometry(): void;

  /**
   * 设置材质数据
   * @param faceTag 面标签
   * @param material 材质数据
   */
  setMaterialData(faceTag: string, material: HSCore.Material.MaterialData): void;

  /**
   * 遍历每个子实体
   * @param callback 回调函数
   */
  forEachChild(callback: (child: HSCore.Model.Entity) => void): void;

  /**
   * 获取尺寸范围区间
   * @returns 包含宽度范围的对象
   */
  getSizeRangeInterval(): { W?: [number, number] };
}

/**
 * NCP背景墙基础装饰器类
 * 负责背景墙实体的序列化、反序列化、材质管理等核心功能
 */
declare class NCPBackgroundWallBaseDecorator {
  /** 被装饰的背景墙实体 */
  private readonly _entity: BackgroundWallEntity;

  /**
   * 构造函数
   * @param entity 背景墙实体对象
   */
  constructor(entity: BackgroundWallEntity);

  /**
   * 导出背景墙数据为可序列化的记录对象
   * @param offset 偏移坐标点
   * @returns 导出的记录数据，如果缺少宿主面则返回undefined
   */
  dump(offset: Point3D): DumpRecordData | undefined;

  /**
   * 从记录数据创建背景墙实体
   * @param recordData 记录数据对象
   * @param metadata 元数据（内容类型等）
   * @param transformMatrix 局部到世界的变换矩阵
   * @param hostFace 可选的宿主面对象
   * @returns 创建的背景墙实体，如果创建失败则返回undefined
   */
  static create(
    recordData: DumpRecordData,
    metadata: {
      contentType: {
        isTypeOf(type: HSCatalog.ContentTypeEnum): boolean;
      };
    },
    transformMatrix: unknown,
    hostFace?: HSCore.Model.Face
  ): BackgroundWallEntity | undefined;

  /**
   * 为面设置材质
   * @param facesInfo 面信息数组
   * @param materialInfo 材质信息
   */
  setMaterial(facesInfo: FaceDetailInfo[], materialInfo: MaterialInfo): void;

  /**
   * 从属性树中提取材质属性节点
   * @param propertyTree 属性树根节点
   * @returns 材质属性节点数组
   */
  private _getMaterialPropertyNodes(propertyTree?: { children: PropertyTreeNode[] }): MaterialPropertyNode[];

  /**
   * 根据变量名获取材质信息
   * @param variableName 变量名称
   * @returns 材质信息，如果未找到则返回undefined
   */
  getMaterialInfoByVariableName(variableName: string): MaterialInfo | undefined;

  /**
   * 根据变量名获取所有相关面的信息
   * @param variableName 变量名称
   * @returns 面详细信息数组
   */
  getFacesInfoByVariableName(variableName: string): FaceDetailInfo[];

  /**
   * 从记录数据中提取材质引用的SeekId列表
   * @param recordData 记录数据
   * @returns SeekId数组
   */
  static getRecordSeekIdsByRecordData(recordData: DumpRecordData): string[];

  /**
   * 获取所有属性的映射表
   * @returns 属性名到属性值的映射
   */
  getProperties(): Map<string, PropertyValue>;

  /**
   * 递归遍历属性树并提取属性
   * @param node 当前节点
   * @param resultMap 结果映射表
   */
  private _traversePropertyTree(node: PropertyTreeNode, resultMap: Map<string, PropertyValue>): void;

  /**
   * 将Map转换为普通对象
   * @param propertyMap 属性映射表
   * @returns 属性记录对象
   */
  private static _mapToRecordObj(propertyMap: Map<string, PropertyValue>): Record<string, unknown>;

  /**
   * 获取X轴（宽度）尺寸限制
   * @returns 尺寸限制对象
   */
  getXSizeLimit(): SizeLimit;
}

export { NCPBackgroundWallBaseDecorator };