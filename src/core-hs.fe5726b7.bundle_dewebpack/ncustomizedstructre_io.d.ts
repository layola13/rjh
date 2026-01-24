/**
 * 自定义结构体模块
 * 提供自定义结构体的创建、管理和序列化功能
 */

import type { Content } from './Content';
import type { Face } from './Face';
import type { Entity } from './Entity';
import type { Body } from './Brep';
import type { Loop, Curve2d, Curve3d, Plane, Vector2, Vector3, Matrix3, Matrix4 } from './Geometry';

/**
 * 结构体模式枚举
 */
export enum StructureMode {
  /** 墙体部件模式 */
  wallpart = 'wallpart',
  /** 独立模式 */
  independent = 'independent'
}

/**
 * 结构体标志位枚举
 */
export enum StructureFlagEnum {
  /** 悬停状态 */
  hoverOn = 16384,
  /** 拖拽状态 */
  dragOn = 32768
}

/**
 * 结构体面类型枚举
 */
export enum StructureFaceType {
  /** 左侧面 */
  left = 'left',
  /** 右侧面 */
  right = 'right',
  /** 顶面 */
  top = 'top',
  /** 底面 */
  bottom = 'bottom',
  /** 前面 */
  front = 'front',
  /** 后面 */
  back = 'back',
  /** 圆形面 */
  circle = 'circle'
}

/**
 * 序列化选项接口
 */
interface SerializationOptions {
  [key: string]: unknown;
}

/**
 * 序列化数据接口
 */
interface SerializedData {
  structureMode?: StructureMode;
  syncHeight?: number;
  fIds?: string[];
  [key: string]: unknown;
}

/**
 * 实体字段配置接口
 */
interface EntityFields {
  structureMode?: StructureMode;
  faceIds?: string[];
  ZLength?: number;
}

/**
 * 镜像参数接口
 */
interface MirrorParams {
  /** 镜像类型 */
  type: MirrorType;
  /** 变换长度 */
  transLen: number;
}

/**
 * 镜像类型枚举
 */
enum MirrorType {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

/**
 * 平移参数接口
 */
interface TranslateParams {
  x: number;
  y: number;
  z: number;
}

/**
 * 自定义结构体IO类
 * 负责结构体数据的序列化和反序列化
 */
export class NCustomizedStructre_IO extends Content_IO {
  /**
   * 导出结构体数据
   * @param entity - 要导出的实体对象
   * @param callback - 导出回调函数
   * @param includeMetadata - 是否包含元数据
   * @param options - 序列化选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: NCustomizedStructure,
    callback?: (data: SerializedData[], entity: NCustomizedStructure) => void,
    includeMetadata: boolean = true,
    options: SerializationOptions = {}
  ): SerializedData[];

  /**
   * 加载结构体数据
   * @param entity - 目标实体对象
   * @param data - 序列化数据
   * @param options - 反序列化选项
   */
  load(
    entity: NCustomizedStructure,
    data: SerializedData,
    options: SerializationOptions = {}
  ): void;
}

/**
 * 自定义结构体基类
 * 提供结构体的核心功能，包括几何计算、面管理、变换等
 */
export class NCustomizedStructure extends Content {
  /** 私有面ID数组 */
  private __faceIds: string[];

  /** 关联的面ID列表 */
  faceIds: string[];

  /** 结构体模式 */
  structureMode: StructureMode;

  /**
   * 构造函数
   * @param id - 实体ID，默认为空字符串
   */
  constructor(id?: string);

  /**
   * 字段变更回调
   * @param fieldName - 字段名称
   * @param newValue - 新值
   * @param oldValue - 旧值
   */
  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void;

  /** 获取路径数组（抽象属性） */
  get path(): unknown[];

  /** 获取3D高度 */
  get height3d(): number;

  /** 设置3D高度 */
  set height3d(value: number);

  /** 获取辅助面ID列表 */
  get auxFaceIds(): string[];

  /** 获取关联的面对象列表 */
  get faceList(): Face[];

  /** 获取辅助面对象列表 */
  get auxFaceList(): Face[];

  /**
   * 判断是否为墙体部件
   * @returns 如果是墙体部件返回true
   */
  isWallPart(): boolean;

  /** 获取几何数据 */
  get geometry(): Array<{ x: number; y: number; userData: { ptid: string } }> | undefined;

  /** 获取轮廓曲线 */
  get profile(): Curve2d[] | undefined;

  /** 获取外轮廓路径 */
  get outlinePath(): Curve3d[];

  /**
   * 通过元数据初始化
   * @param metadata - 元数据对象
   */
  initByMeta(metadata: unknown): void;

  /**
   * 获取与面共面的路径
   * @param face - 目标面对象
   * @returns 共面路径数组
   */
  getPathsCoplanarWithFace(face: Face): Array<Array<{ x: number; y: number; z: number }>>;

  /**
   * 获取平面上的路径（私有方法）
   * @param plane - 平面对象
   * @param tolerance - 容差值
   * @returns 路径数组的二维数组
   */
  private _getPathsOnPlane(plane: Plane, tolerance: number): Array<Array<Array<{ x: number; y: number; z: number }>>>;

  /**
   * 设置结构体模式
   * @param isWallPart - 是否为墙体部件
   */
  setStructureMode(isWallPart: boolean): void;

  /**
   * 重建结构体
   */
  rebuild(): void;

  /** 获取曲线对象 */
  get curve(): Curve2d;

  /** 获取位置曲线 */
  get positionCurve(): Curve2d;

  /** 获取中点坐标 */
  get middle(): Vector3;

  /**
   * 判断是否为弧形墙
   * @returns 如果是弧形墙返回true
   */
  isArcWall(): boolean;

  /** 获取相关内容对象字典 */
  get relatedContents(): Record<string, Content>;

  /**
   * 遍历内容对象
   * @param callback - 遍历回调函数
   * @param context - 回调上下文
   */
  forEachContent(callback: (content: Content) => void, context?: unknown): void;

  /**
   * 获取面类型
   * @param face - 面对象
   * @returns 面类型
   */
  getFaceType(face: Face): StructureFaceType;

  /** 获取左侧路径（抽象属性） */
  get leftPath(): unknown;

  /** 获取右侧路径（抽象属性） */
  get rightPath(): unknown;

  /**
   * 清除关联的面
   */
  clearRelatedFaces(): void;

  /**
   * 重置面的隐藏标志
   */
  resetFaceHideFlag(): void;

  /**
   * 刷新面数据
   */
  refreshFaces(): void;

  /**
   * 生成边界表示（Brep）
   * @param forceRegenerate - 是否强制重新生成
   * @param useAlternativeProfile - 是否使用备用轮廓
   * @returns Brep主体对象
   */
  generateBrep(forceRegenerate?: boolean, useAlternativeProfile?: boolean): Body | undefined;

  /**
   * 计算轮廓曲线
   * @param useAlternative - 是否使用备用方法
   * @returns 轮廓曲线数组的二维数组
   */
  calcProfile(useAlternative?: boolean): Curve2d[][] | undefined;

  /**
   * 计算3D轮廓曲线
   * @param useAlternative - 是否使用备用方法
   * @returns 3D轮廓曲线数组的二维数组
   */
  calcProfile3ds(useAlternative: boolean): Curve3d[][] | undefined;

  /**
   * 添加面ID
   * @param faceIds - 单个或多个面ID
   */
  addFaceIds(faceIds: string | string[]): void;

  /**
   * 移除面ID
   * @param faceIds - 单个或多个面ID
   */
  removeFaceIds(faceIds: string | string[]): void;

  /**
   * 获取局部到世界坐标系的变换矩阵
   * @returns 4x4变换矩阵
   */
  getLocalToWorldTransform(): Matrix4;

  /**
   * 获取2D变换矩阵
   * @returns 3x3变换矩阵
   */
  get2DTransform(): Matrix3;

  /**
   * 获取拉伸轮廓
   * @param useAlternative - 是否使用备用方法
   * @returns 拉伸轮廓壳体
   */
  getExtrusionProfile(useAlternative?: boolean): unknown;

  /**
   * 执行拉伸操作
   * @param shell - 输入壳体
   * @returns 拉伸后的壳体
   */
  executeExtrusion(shell: unknown): unknown;

  /**
   * 获取图层高度
   * @returns 图层高度值
   */
  getLayerHeight(): number | undefined;

  /**
   * 同步图层高度
   */
  syncLayerHeight(): void;

  /**
   * 判断内容是否在房间内
   * @param content - 内容对象
   * @returns 如果在房间内返回true
   */
  isContentInRoom(content: unknown): boolean;

  /**
   * 标记几何数据为脏
   * @param options - 选项参数
   */
  dirtyGeometry(options?: Record<string, unknown>): void;

  /**
   * 标记位置数据为脏
   */
  dirtyPosition(): void;

  /**
   * 镜像变换
   * @param params - 镜像参数
   */
  mirror(params: MirrorParams): void;

  /**
   * 平移变换
   * @param offset - 平移偏移量
   */
  translate(offset: TranslateParams): void;

  /**
   * 删除结构体
   */
  delete(): void;

  /**
   * 创建新实例
   * @returns 新的结构体实例
   */
  newSelf(): NCustomizedStructure;

  /**
   * 复制结构体
   * @returns 复制后的新实例
   */
  copy(): NCustomizedStructure;

  /**
   * 隐藏所有关联面
   */
  hideFaces(): void;

  /**
   * 显示所有关联面
   */
  showFaces(): void;

  /**
   * 获取IO处理器实例
   * @returns IO处理器
   */
  getIO(): NCustomizedStructre_IO;
}

/** X方向长度属性 */
export type XLength = number;

/** Y方向长度属性 */
export type YLength = number;

/** Z方向长度属性 */
export type ZLength = number;

/** X方向缩放属性 */
export type XScale = number;

/** Y方向缩放属性 */
export type YScale = number;

/** Z方向缩放属性 */
export type ZScale = number;

/** X轴旋转角度属性 */
export type XRotation = number;

/** Y轴旋转角度属性 */
export type YRotation = number;

/** Z轴旋转角度属性 */
export type ZRotation = number;