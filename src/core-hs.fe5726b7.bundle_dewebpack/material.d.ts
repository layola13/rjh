/**
 * 材质系统类型定义
 * @module Material
 */

/**
 * 材质ID枚举
 * 定义材质来源类型
 */
export enum MaterialIdEnum {
  /** 本地材质 */
  local = "local",
  /** 生成的材质 */
  generated = "generated",
  /** 自定义材质 */
  customized = "customized",
  /** 模型材质 */
  modelMaterial = "modelMaterial"
}

/**
 * 纹理铺设类型枚举
 * 定义纹理在表面的铺设方式
 */
export enum TexturePaveTypeEnum {
  /** 拉伸 */
  stretch = "stretch",
  /** 平铺 */
  tile = "tile",
  /** 镜像 */
  mirror = "mirror",
  /** 随机 */
  random = "random",
  /** 未指定 */
  notSpecify = "notSpecify"
}

/**
 * 颜色模式枚举
 */
export enum ColorModeEnum {
  /** 纯色模式 */
  color = "color",
  /** 纹理模式 */
  texture = "texture",
  /** 混合模式 */
  blend = "blend"
}

/**
 * 材质数据接口
 */
export interface IMaterialData {
  /** 材质唯一标识符 */
  seekId: string;
  /** 纹理URI */
  textureURI?: string;
  /** 默认纹理URI */
  textureURIDefault?: string;
  /** 小图标URI */
  iconSmallURI?: string;
  /** 大图标URI */
  iconLargeURI?: string;
  /** 材质颜色（十六进制） */
  color?: number;
  /** 材质名称 */
  name?: string;
  /** 分类ID */
  categoryId?: string;
  /** X轴平铺尺寸 */
  tileSize_x?: number;
  /** Y轴平铺尺寸 */
  tileSize_y?: number;
  /** X轴初始平铺尺寸 */
  initTileSize_x?: number;
  /** Y轴初始平铺尺寸 */
  initTileSize_y?: number;
  /** X轴偏移量 */
  offsetX?: number;
  /** Y轴偏移量 */
  offsetY?: number;
  /** 旋转角度 */
  rotation?: number;
  /** 纹理旋转角度 */
  textureRotation?: number;
  /** 法线纹理 */
  normalTexture?: string;
  /** 法线纹理X轴平铺尺寸 */
  normalTileSize_x?: number;
  /** 法线纹理Y轴平铺尺寸 */
  normalTileSize_y?: number;
  /** X轴翻转 */
  flipX?: boolean;
  /** Y轴翻转 */
  flipY?: boolean;
  /** 是否支持接缝填充 */
  seamFillerSupported?: boolean;
  /** 接缝颜色 */
  seamColor?: string | number;
  /** 接缝宽度 */
  seamWidth?: number;
  /** 颜色模式 */
  colorMode?: ColorModeEnum;
  /** 混合颜色 */
  blendColor?: number;
  /** 接缝材质 */
  seamMaterial?: IMaterialData;
  /** 对齐类型 */
  alignType?: string;
  /** 涂料数据 */
  paintData?: Record<string, any>;
  /** 用户自定义数据 */
  userDefined?: Record<string, any>;
  /** 是否透明 */
  isTransparent?: boolean;
  /** 混合涂料 */
  mixpaint?: any;
  /** 图案集合 */
  patterns?: Record<string, any>;
}

/**
 * 材质序列化/反序列化选项
 */
export interface IMaterialIOOptions {
  /** 版本号 */
  version?: string;
  /** 材质数据映射表 */
  materialsData?: Map<string, any>;
  /** 产品映射表 */
  productsMap?: Map<string, any>;
  /** 是否浅保存元数据 */
  shallowSaveMeta?: boolean;
}

/**
 * 材质转储上下文
 */
export interface IMaterialDumpContext {
  /** 实体数据 */
  data: Record<string, any>;
  /** 材质数据映射 */
  materialsData: Map<string, any>;
  /** 实体映射 */
  entities: Record<string, any>;
  /** 材质映射 */
  materials: Map<string, any>;
  /** 状态映射 */
  states?: Record<string, any>;
  /** 约束映射 */
  constraints?: Record<string, any>;
  /** 产品映射 */
  productsMap: Map<string, any>;
  /** 是否浅保存元数据 */
  shallowSaveMeta?: boolean;
}

/**
 * UV变换参数
 */
export interface IUVTransform {
  /** X轴偏移 */
  offsetX: number;
  /** Y轴偏移 */
  offsetY: number;
  /** 旋转角度 */
  rotation: number;
}

/**
 * 材质事件数据
 */
export interface IMaterialEventData {
  /** 事件类型 */
  type: string;
}

/**
 * 材质序列化结果
 */
export interface IMaterialDumpResult {
  /** 转储数据数组 */
  dumps: any[];
  /** 转储上下文 */
  context: IMaterialDumpContext;
}

/**
 * 材质JSON数据结构
 */
export interface IMaterialJSON {
  /** 元数据 */
  meta: any;
  /** 入口实体ID */
  entryId: string;
  /** 数据数组 */
  data: any[];
  /** 材质数组 */
  materials: any[];
  /** 产品数组 */
  products: any[];
}

/**
 * 材质输入输出类
 * 负责材质的序列化和反序列化
 */
export declare class Material_IO {
  /** 单例实例 */
  private static _Material_IO_instance?: Material_IO;

  /**
   * 获取单例实例
   */
  static instance(): Material_IO;

  /**
   * 序列化材质对象
   * @param material 材质实例
   * @param callback 回调函数
   * @param recursive 是否递归序列化
   * @param options 序列化选项
   * @returns 序列化后的数据数组
   */
  dump(
    material: Material,
    callback?: (data: any[], entity: Material) => void,
    recursive?: boolean,
    options?: IMaterialIOOptions
  ): any[];

  /**
   * 反序列化材质对象
   * @param material 材质实例
   * @param data 序列化数据
   * @param options 反序列化选项
   */
  load(material: Material, data: any, options?: IMaterialIOOptions): void;

  /**
   * 修复加载时的涂料数据
   * @param data 序列化数据
   */
  fixPaintDataForLoading(data: any): void;
}

/**
 * 材质类
 * 表示三维场景中的材质对象
 */
export declare class Material {
  /** 材质唯一标识符 */
  seekId: MaterialIdEnum | string;
  
  /** 材质元数据 */
  metadata?: any;
  
  /** 材质名称 */
  name?: string;
  
  /** 分类ID */
  categoryId?: string;
  
  /** 纹理URI */
  textureURI: string;
  
  /** 默认纹理URI */
  textureURIDefault: string;
  
  /** 材质颜色（默认白色：0xFFFFFF） */
  color: number;
  
  /** 法线纹理 */
  normalTexture: string;
  
  /** 法线纹理X轴平铺尺寸 */
  normalTileSize_x: number;
  
  /** 法线纹理Y轴平铺尺寸 */
  normalTileSize_y: number;
  
  /** X轴初始平铺尺寸 */
  initTileSize_x: number;
  
  /** Y轴初始平铺尺寸 */
  initTileSize_y: number;
  
  /** X轴平铺尺寸 */
  tileSize_x: number;
  
  /** Y轴平铺尺寸 */
  tileSize_y: number;
  
  /** X轴偏移量（0-1范围） */
  offsetX: number;
  
  /** Y轴偏移量（0-1范围） */
  offsetY: number;
  
  /** 旋转角度（弧度） */
  rotation: number;
  
  /** 纹理旋转角度 */
  textureRotation?: number;
  
  /** X轴翻转 */
  flipX: boolean;
  
  /** Y轴翻转 */
  flipY: boolean;
  
  /** 是否支持接缝填充 */
  seamFillerSupported: boolean;
  
  /** 接缝宽度 */
  seamWidth: number;
  
  /** 接缝颜色 */
  seamColor: string | number | undefined;
  
  /** 颜色模式 */
  colorMode: ColorModeEnum;
  
  /** 混合颜色 */
  blendColor?: number;
  
  /** 接缝材质 */
  seamMaterial?: any;
  
  /** 小图标URI */
  iconSmallURI?: string;
  
  /** 大图标URI */
  iconLargeURI?: string;
  
  /** X轴缩放平铺尺寸 */
  scalingTileSize_x: number;
  
  /** Y轴缩放平铺尺寸 */
  scalingTileSize_y: number;
  
  /** X轴百分比偏移（0-100） */
  percentOffsetX: number;
  
  /** Y轴百分比偏移（0-100） */
  percentOffsetY: number;
  
  /** 对齐类型 */
  alignType?: string;
  
  /** 默认X轴偏移 */
  defaultoffsetX?: number;
  
  /** 默认Y轴偏移 */
  defaultoffsetY?: number;
  
  /** 涂料数据 */
  paintData: Record<string, any>;
  
  /** 用户自定义数据 */
  userDefined: Record<string, any>;
  
  /** 混合涂料对象 */
  mixpaint?: any;
  
  /** 图案引用映射 */
  readonly patterns: Record<string, any>;
  
  /** 是否透明 */
  isTransparent: boolean;
  
  /** 更新通知信号 */
  signalDirtyForUpdate: any;

  /**
   * 构造函数
   * @param id 材质ID
   * @param tag 标签
   */
  constructor(id?: string, tag?: string);

  /**
   * 创建材质实例
   * @param meta 元数据
   * @returns 材质实例
   */
  static create(meta?: any): Material;

  /**
   * 获取唯一多边形
   * @returns 多边形对象
   */
  getUniquePolygon(): any;

  /**
   * 创建唯一多边形
   * @param path 路径数据
   * @param faceEntity 面实体
   * @param faceId 面ID
   */
  createUniquePolygon(path: any, faceEntity: any, faceId: any): void;

  /**
   * 销毁材质
   */
  destroy(): void;

  /**
   * 标记需要更新
   * @param eventData 事件数据
   */
  dirtyForUpdate(eventData?: IMaterialEventData): void;

  /**
   * 验证材质数据完整性
   * @returns 验证结果
   */
  verify(): boolean;

  /**
   * 通过元数据初始化材质
   * @param meta 元数据
   */
  initByMeta(meta: any): void;

  /**
   * 获取转储数据
   * @param options 选项
   * @returns 转储结果
   */
  getDumpData(options?: { shallowSaveMeta?: boolean }): IMaterialDumpResult;

  /**
   * 从另一个材质复制数据
   * @param source 源材质
   */
  copyFrom(source: Material): void;

  /**
   * 克隆材质（浅拷贝）
   * @returns 新材质实例
   */
  clone(): Material;

  /**
   * 深度克隆材质
   * @returns 新材质实例
   */
  cloneDeep(): Material;

  /**
   * 判断两个材质是否相同
   * @param other 另一个材质
   * @returns 是否相同
   */
  isSame(other: IMaterialData): boolean;

  /**
   * 是否为目录材质
   * @returns 是否为目录材质
   */
  isCatalogMaterial(): boolean;

  /**
   * 是否进行了UV变换
   * @returns 是否变换
   */
  isUvTransformed(): boolean;

  /**
   * 设置UV变换参数
   * @param transform UV变换参数
   */
  setUvTransform(transform: IUVTransform): void;

  /**
   * 重置UV变换
   */
  resetUvTransform(): void;

  /**
   * 判断UV变换是否相同
   * @param other 另一个材质
   * @returns 是否相同
   */
  isSameUvTransform(other: IUVTransform): boolean;

  /**
   * 更新材质数据
   * @param data 材质数据
   */
  updateData(data: IMaterialData): void;

  /**
   * 设置材质属性
   * @param data 材质数据
   * @param patternMap 图案映射表
   */
  set(data: IMaterialData, patternMap?: Record<string, any>): void;

  /**
   * 获取原始材质数据
   * @returns 材质数据对象
   */
  getRawMaterialData(): IMaterialData;

  /**
   * 获取材质数据对象
   * @returns 材质数据实例
   */
  getMaterialData(): any;

  /**
   * 获取用于FGI的材质数据
   * @returns FGI材质数据
   */
  getMaterialDataForFGI(): IMaterialData;

  /**
   * 获取IO处理器
   * @returns Material_IO实例
   */
  getIO(): Material_IO;

  /**
   * 是否为根实体
   * @returns 始终返回true
   */
  isRoot(): boolean;

  /**
   * 保存为JSON格式
   * @param options 保存选项
   * @returns JSON数据
   */
  saveToJSON(options?: { shallowSaveMeta?: boolean }): IMaterialJSON;

  /**
   * 将JSON转换为转储数据
   * @param json JSON数据
   * @returns 转储结果
   */
  jsonToDumpData(json: IMaterialJSON): IMaterialDumpResult;

  /**
   * 是否可以事务化字段
   * @returns 始终返回false
   */
  canTransactField(): boolean;

  /**
   * 混合涂料图案变化回调
   * @param event 事件数据
   */
  protected onMixPaintPatternChanged(event: any): void;

  /**
   * 标记角撑面需要更新
   */
  protected dirtyGussetSurface(): void;

  /**
   * 刷新边界（内部方法）
   */
  protected refreshBoundInternal(): void;
}