/**
 * 颜色模式枚举
 * 定义材质的渲染模式
 */
export enum ColorModeEnum {
  /** 纯色模式 */
  color = 'color',
  /** 纹理模式 */
  texture = 'texture',
  /** 混合模式 */
  blend = 'blend'
}

/**
 * 材质数据接口
 * 定义材质的基本属性
 */
export interface IMaterialData {
  /** 混合颜色 (RGBA数组格式) */
  blendColor?: number[];
  /** 基础颜色 (RGBA数组格式) */
  color?: number[];
  /** 法线贴图纹理标识 */
  normalTexture?: string;
  /** 纹理资源URI */
  textureURI?: string;
  /** 资源查找ID */
  seekId?: string;
  /** 颜色模式 */
  colorMode?: ColorModeEnum;
}

/**
 * 材质数据类
 * 封装材质属性的管理和操作
 */
export declare class MaterialData implements IMaterialData {
  blendColor?: number[];
  color?: number[];
  normalTexture?: string;
  textureURI?: string;
  seekId?: string;
  colorMode?: ColorModeEnum;

  constructor(data?: Partial<IMaterialData>);

  /**
   * 创建材质数据实例
   * @param data - 材质初始化数据
   * @returns 新的材质数据实例
   */
  static create(data?: Partial<IMaterialData>): MaterialData;

  /**
   * 比较两个材质数据是否相等
   * @param other - 待比较的材质数据
   * @returns 是否相等
   */
  equals(other: MaterialData): boolean;
}

/**
 * 接缝初始化参数接口
 */
export interface ISeamArgs {
  /** 接缝宽度 */
  width?: number;
  /** 材质数据 */
  material?: Partial<IMaterialData>;
}

/**
 * FGI系统接缝数据接口
 * 用于与Floor/Ground Infrastructure系统交互
 */
export interface ISeamForFGI {
  /** 资源查找ID */
  seekId?: string;
  /** 接缝宽度 */
  seamWidth: number;
  /** 法线贴图纹理标识 */
  normalTexture?: string;
  /** 纹理资源URI */
  textureURI?: string;
  /** 颜色值 */
  color?: number[];
  /** 颜色模式 */
  colorMode?: ColorModeEnum;
  /** X方向平铺尺寸 */
  tileSize_x: number;
  /** Y方向平铺尺寸 */
  tileSize_y: number;
  /** X方向法线平铺尺寸 */
  normalTileSize_x: number;
  /** Y方向法线平铺尺寸 */
  normalTileSize_y: number;
  /** 哈希键值,用于缓存和比较 */
  hashKey: string;
}

/**
 * 接缝导出数据接口
 */
export interface ISeamDump {
  /** 接缝宽度 */
  width: number;
  /** 材质数据 */
  material: {
    blendColor?: number[];
    color?: number[];
    normalTexture?: string;
    textureURI?: string;
    seekId?: string;
    colorMode?: ColorModeEnum;
  };
}

/**
 * 工具类
 * 提供颜色转换等实用方法
 */
export declare class Util {
  /**
   * 将颜色数组转换为十六进制字符串
   * @param color - RGBA颜色数组 [r, g, b, a]
   * @returns 十六进制颜色字符串 (不含#前缀)
   */
  static convertColorToString(color?: number[]): string | undefined;
}

/**
 * 数值比较工具函数
 * @param a - 第一个数值
 * @param b - 第二个数值
 * @param epsilon - 误差范围,默认1e-6
 * @returns 两个数值是否近似相等
 */
export declare function nearlyEquals(
  a: number,
  b: number,
  epsilon?: number
): boolean;

/**
 * 接缝类
 * 表示3D建模中的接缝对象,包含宽度和材质信息
 * 用于地板、墙面等表面的拼接处理
 */
export declare class Seam {
  /** 内部宽度属性 */
  private _width?: number;
  /** 内部材质数据 */
  private _material: MaterialData;

  /**
   * 构造函数
   * @param args - 初始化参数
   */
  constructor(args?: ISeamArgs);

  /**
   * 静态工厂方法创建接缝实例
   * @param args - 初始化参数
   * @returns 新的接缝实例
   */
  static create(args?: ISeamArgs): Seam;

  /**
   * 获取接缝宽度
   * @returns 宽度值,未设置时返回0
   */
  get width(): number;

  /**
   * 获取混合颜色
   * @returns RGBA颜色数组
   */
  get blendColor(): number[] | undefined;

  /**
   * 获取基础颜色
   * @returns RGBA颜色数组
   */
  get color(): number[] | undefined;

  /**
   * 获取法线贴图标识
   */
  get normalTexture(): string | undefined;

  /**
   * 获取纹理URI
   */
  get textureURI(): string | undefined;

  /**
   * 获取资源查找ID
   */
  get seekId(): string | undefined;

  /**
   * 获取颜色模式
   * @returns 颜色模式,默认为texture
   */
  get colorMode(): ColorModeEnum;

  /**
   * 获取颜色的十六进制字符串表示
   * @returns 十六进制颜色字符串
   */
  get colorString(): string | undefined;

  /**
   * 判断是否使用纯色模式
   */
  get useColor(): boolean;

  /**
   * 判断是否使用纹理模式
   */
  get useTexture(): boolean;

  /**
   * 判断是否使用混合模式
   */
  get useBlend(): boolean;

  /**
   * 获取材质数据对象
   */
  get material(): MaterialData;

  /**
   * 导出接缝数据为普通对象
   * @returns 序列化的接缝数据
   */
  dump(): ISeamDump;

  /**
   * 获取参数对象(dump方法的别名)
   * @returns 序列化的接缝数据
   */
  getArgs(): ISeamDump;

  /**
   * 克隆接缝对象
   * @param overrides - 可选的覆盖参数
   * @returns 新的接缝实例
   */
  clone(overrides?: ISeamArgs): Seam;

  /**
   * 比较两个接缝是否相等
   * @param other - 待比较的接缝对象
   * @returns 是否相等
   */
  equals(other: Seam): boolean;

  /**
   * 生成哈希键
   * @returns JSON字符串形式的哈希键
   */
  hashKey(): string;

  /**
   * 获取FGI系统所需的接缝数据
   * @returns FGI格式的接缝数据
   */
  getSeamForFGI(): ISeamForFGI;

  /**
   * 获取图像源标识
   * @returns 根据颜色模式返回纹理URI或颜色字符串
   */
  imageSrc(): string | undefined;

  /**
   * 判断接缝是否为空(无有效材质数据)
   * @returns 是否为空
   */
  isEmpty(): boolean;

  /**
   * 内部方法:从参数设置属性
   * @param args - 参数对象
   */
  private _setFrom(args?: ISeamArgs): void;
}