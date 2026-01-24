/**
 * 3D场景内容请求类型定义
 * 用于处理3D模型的添加、分组和定位操作
 */

/**
 * 3D空间位置坐标
 */
export interface Position3D {
  /** X轴坐标 */
  x: number;
  /** Y轴坐标 */
  y: number;
  /** Z轴坐标（可选，用于高度） */
  z?: number;
}

/**
 * 3D旋转角度
 */
export interface Rotation3D {
  /** X轴旋转角度 */
  x: number;
  /** Y轴旋转角度 */
  y: number;
  /** Z轴旋转角度 */
  z: number;
}

/**
 * 产品数据结构
 */
export interface ProductData {
  /** 产品唯一标识 */
  id: string;
  /** 代理模型ID（可选） */
  proxyId?: string;
  /** 位置信息 */
  position?: number[];
  /** Z轴位置 */
  posZ?: number;
  /** T3D旋转数据 */
  t3dRotation?: Rotation3D | number;
  /** 旋转角度 */
  rotation?: Rotation3D | number;
  /** 缩放比例 */
  scale?: number;
  /** 翻转标志 */
  flip?: boolean;
  /** 替换材质 */
  replacedMaterial?: unknown;
  /** 附加数据 */
  data?: {
    position?: number[];
    posZ?: number;
  };
}

/**
 * 分组元数据
 */
export interface GroupMetadata {
  /** 内容类型 */
  contentType?: string | HSCatalog.ContentType;
  /** 搜索ID */
  seekId?: string;
  /** 单位 */
  unit?: string;
  /** 默认高度 */
  defaultHeight?: number;
}

/**
 * 内容分组定义
 */
export interface ContentGroup {
  /** 子内容索引数组 */
  subContent: number[];
  /** 子分组索引数组 */
  subGroup: number[];
  /** 分组元数据 */
  metadata: GroupMetadata;
}

/**
 * 请求元数据配置
 */
export interface RequestMetadata extends GroupMetadata {
  /** 替换材质 */
  replacedMaterial?: unknown;
  /** 产品ID映射表 */
  productDataById: Record<string, unknown>;
  /** 产品列表 */
  products: ProductData[];
  /** 分组列表 */
  groups?: ContentGroup[];
}

/**
 * 3D内容对象接口
 */
export interface Content3D {
  /** X轴坐标 */
  x: number;
  /** Y轴坐标 */
  y: number;
  /** Z轴坐标 */
  z: number;
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** Z轴旋转角度 */
  ZRotation: number;
  /** Z轴尺寸 */
  ZSize: number;
  /** 组件搜索ID */
  assemblySeekId?: string;
  /**
   * 将内容分配给宿主对象
   * @param host 宿主对象
   */
  assignTo(host: unknown): void;
}

/**
 * 复合请求基类（来自HSCore.Transaction.Common）
 */
export declare class CompositeRequest {
  /** 请求管理器 */
  protected mgr: unknown;
  /**
   * 添加子请求
   * @param request 子请求对象
   */
  protected append(request: unknown): void;
  /**
   * 创建请求
   * @param type 请求类型
   * @param args 请求参数
   */
  protected createRequest(type: string, args: unknown[]): unknown;
}

/**
 * 添加3D内容的复合请求类
 * 处理产品模型的添加、分组、定位和旋转
 */
export default class AddContentCompositeRequest extends CompositeRequest {
  /** 请求元数据 */
  private readonly _meta: RequestMetadata;
  /** 内容位置 */
  private readonly _position: Position3D;
  /** 内容旋转（数字或3D旋转对象） */
  private readonly _rotation: number | Rotation3D;
  /** 宿主对象引用 */
  private readonly _host?: unknown;
  /** 缩放比例 */
  private readonly _scale?: number;

  /**
   * 构造函数
   * @param meta 请求元数据，包含产品信息和分组配置
   * @param position 内容在3D空间中的位置
   * @param rotation 内容的旋转角度（单个数字或3D旋转对象）
   * @param scale 内容的缩放比例
   * @param host 宿主对象，内容将分配给该对象
   */
  constructor(
    meta: RequestMetadata,
    position?: Position3D,
    rotation?: number | Rotation3D,
    scale?: number,
    host?: unknown
  );

  /**
   * 提交请求并执行内容添加操作
   * 处理流程：
   * 1. 遍历产品列表，为每个产品创建添加请求
   * 2. 如果存在分组配置，按层级组织内容
   * 3. 应用位置、旋转和缩放变换
   * 4. 处理特殊内容类型（如吊顶附着物）的Z轴定位
   * 5. 将最终内容分配给宿主对象（如果指定）
   * @returns 创建的3D内容对象
   */
  onCommit(): Content3D;
}