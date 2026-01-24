/**
 * 资源管理器模块
 * 负责管理纹理、开口样式、瓷砖和砖材料等资源
 */

/** 纹理资源配置 */
interface TextureResource {
  /** 纹理URL */
  url: string;
  /** 纹理宽度 */
  width: number;
  /** 纹理高度 */
  height: number;
}

/** 尺寸信息 */
interface Size {
  x: number;
  y: number;
}

/** 瓷砖和石材物料清单项 */
interface TileAndStoneItem {
  /** 检索ID */
  seekId: string;
  /** 颜色 */
  color?: string;
  /** 尺寸 */
  size: Size;
  /** 数量 */
  count: number;
}

/** SVG样式配置 */
interface SVGStyleConfig {
  /** 填充色 */
  fill?: string;
  /** 描边色 */
  stroke?: string;
  /** 描边宽度 */
  strokeWidth?: string | number;
  /** 填充透明度 */
  fillOpacity?: string | number;
}

/** 开口样式覆盖配置 */
interface OpeningStyleOverrides {
  [key: string]: {
    /** 基础样式 */
    base?: SVGStyleConfig;
    /** 背景样式 */
    background?: SVGStyleConfig;
    /** 扇形样式 */
    swing?: SVGStyleConfig;
    /** 扇形路径样式 */
    swingPath?: SVGStyleConfig;
  };
}

/** 页面设置 */
interface PageSetting {
  /** 开口样式覆盖配置 */
  openingStyleOverrides?: OpeningStyleOverrides;
}

/** SVG内容定义 */
interface SVGContent {
  /** 背景SVG */
  background: string;
  /** 基础SVG */
  base?: string;
  /** 扇形动画SVG */
  swing?: string;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
}

/** 开口资源配置 */
interface OpeningResource {
  /** 资源URL */
  url: string;
  /** 资源名称 */
  name: string;
  /** SVG内容(可以是静态对象或动态getter) */
  svg: SVGContent | { get svg(): SVGContent };
}

/** 移动端SVG配置 */
interface MobileSVGConfig {
  /** 背景生成函数 */
  background: (color: string) => string;
  /** 基础SVG生成函数 */
  base?: (strokeColor: string, strokeWidth: number) => string;
  /** 扇形SVG生成函数 */
  swing?: (strokeColor: string, strokeWidth: number) => string;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
}

/** 框架SVG配置 */
interface FrameSVGConfig {
  /** SVG定义内容 */
  defs: string;
  /** SVG数据内容 */
  data: string;
  /** 设计名称位置 */
  designName: { x: number; y: number };
  /** 设计日期位置 */
  designDate: { x: number; y: number };
  /** 设计名称字体大小 */
  designNameFont: number;
  /** 设计日期字体大小 */
  desingnDateFont: number;
}

/** 常量定义 */
interface ResourceConstants {
  readonly m1: "m1";
  readonly m2: "m2";
  readonly m3: "m3";
  readonly m4: "m4";
  readonly m5: "m5";
  readonly m6: "m6";
  readonly logo1: "logo1";
  readonly logo2: "logo2";
  readonly compass: "compass";
}

/**
 * 资源管理器类
 * 单例模式,管理所有纹理、开口样式、瓷砖和砖材料资源
 */
declare class ResourceManager {
  /** 纹理资源映射表 */
  private _textures: Map<string, TextureResource>;
  
  /** 开口样式映射表(按URL索引) */
  private _openings: Map<string, SVGContent>;
  
  /** 开口样式映射表(按名称索引) */
  private _openingsByName: Map<string, SVGContent>;
  
  /** 瓷砖和石材物料清单 */
  private _tilesAndStones: TileAndStoneItem[];
  
  /** 砖材料纹理缓存 */
  private _brickTextures: Map<string, string>;

  /** 单例实例 */
  private static me?: ResourceManager;

  /** 常量定义 */
  static readonly Constants: ResourceConstants;

  /** 框架SVG配置 */
  static readonly FrameSvg: FrameSVGConfig;

  /** 移动端开口SVG配置 */
  static readonly OpeningMobileSvgs: {
    door: MobileSVGConfig;
    hole: MobileSVGConfig;
    window: MobileSVGConfig;
    entry: MobileSVGConfig;
  };

  /**
   * 获取单例实例
   * @returns ResourceManager实例
   */
  static get(): ResourceManager;

  /**
   * 将图片URL转换为DataURL
   * @param url - 图片URL
   * @param callback - 转换完成回调,接收DataURL字符串
   */
  static toDataURL(url: string, callback: (dataUrl: string) => void): void;

  constructor();

  /**
   * 加载纹理资源
   * @param onComplete - 所有纹理加载完成回调
   * @param loadImage - 图片加载函数,接收图片URL和加载完成回调
   */
  load(
    onComplete: (status: string) => void,
    loadImage: (imageUrl: string, callback: (url: string) => void) => void
  ): void;

  /**
   * 通过URL加载砖材料纹理
   * @param onComplete - 加载完成回调,接收纹理DataURL或"exist"状态
   * @param url - 材料图片URL
   */
  loadBrickMaterialByUrl(
    onComplete: (result: string) => void,
    url: string
  ): void;

  /**
   * 获取砖纹理DataURL
   * @param url - 纹理URL
   * @returns 纹理DataURL或undefined
   */
  getBrickTexture(url: string): string | undefined;

  /**
   * 查找瓷砖/石材物料项
   * @param item - 要查找的物料项
   * @returns 找到的物料项或undefined
   */
  private _getTileAndStone(item: TileAndStoneItem): TileAndStoneItem | undefined;

  /**
   * 添加瓷砖/石材物料项到BOM清单
   * @param item - 要添加的物料项
   */
  addTileAndStone(item: TileAndStoneItem): void;

  /**
   * 清空瓷砖、石材清单和砖纹理缓存
   */
  clearTilesAndStones(): void;

  /**
   * 获取物料清单(Bill of Materials)
   * @returns 瓷砖和石材物料清单数组
   */
  getBom(): TileAndStoneItem[];

  /**
   * 设置纹理资源
   * @param key - 纹理键名
   * @param texture - 纹理资源对象
   */
  setTexture(key: string, texture: TextureResource): void;

  /**
   * 查找纹理资源
   * @param key - 纹理键名
   * @returns 纹理资源对象或undefined
   */
  lookup(key: string): TextureResource | undefined;

  /**
   * 构建开口样式配置
   * @param settings - 包含页面设置的对象
   */
  buildOpeinings(settings: { _pageSetting?: PageSetting }): void;

  /**
   * 通过URL查找开口SVG内容
   * @param url - 开口资源URL
   * @returns SVG内容对象或undefined
   */
  lookupSvg(url: string): SVGContent | undefined;

  /**
   * 通过名称查找开口SVG内容
   * @param name - 开口资源名称
   * @returns SVG内容对象或undefined
   */
  lookupSvgByName(name: string): SVGContent | undefined;
}

export default ResourceManager;