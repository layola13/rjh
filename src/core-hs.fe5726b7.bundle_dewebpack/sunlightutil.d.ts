/**
 * 阳光工具模块
 * 提供阳光参数配置和管理功能
 */

/**
 * 阳光选项参数接口
 * 定义场景中阳光的各项属性
 */
export interface SunlightOption {
  /** 是否启用阳光 */
  sunlight?: boolean;
  /** 是否自动定位阳光位置 */
  autoPosition?: boolean;
  /** 色温名称 */
  temperature?: string;
  /** 光照强度 */
  intensity?: number;
  /** 光照强度因子（用于动态调整） */
  intensityFactor?: number;
  /** 尺寸倍增器 */
  sizeMultiplier?: number;
  /** 尺寸倍增因子（用于动态调整） */
  sizeMultiplierFactor?: number;
  /** 高度角（弧度） */
  heightAngle?: number;
  /** 水平角（弧度） */
  horizontalAngle?: number;
  /** 是否启用体积光 */
  volumeLight?: boolean;
}

/**
 * 导出格式的阳光选项
 * 用于序列化和导出场景配置
 */
export interface ExportSunlightOption {
  /** 是否启用阳光 */
  sunlight: boolean;
  /** 是否自动定位阳光位置 */
  autoPosition?: boolean;
  /** 色温名称 */
  temperature?: string;
  /** 光照强度（已应用强度因子） */
  intensity?: number;
  /** 尺寸倍增器（已应用尺寸因子，四舍五入） */
  sizeMultiplier?: number;
  /** 高度角（弧度） */
  heightAngle?: number;
  /** 水平角（弧度） */
  horizontalAngle?: number;
  /** 是否启用体积光 */
  volumeLight?: boolean;
}

/**
 * 色温配置映射表类型
 * 键为色温名称，值为对应的阳光选项
 */
type TemperatureConfigMap = Record<string, Partial<SunlightOption>>;

/**
 * HDR环境贴图配置映射表类型
 * 键为HDR贴图名称，值为对应的阳光选项
 */
type HdrConfigMap = Record<string, Partial<SunlightOption>>;

/**
 * 默认阳光选项参数实例
 * 从HSCore模型中获取的基础配置
 */
export declare const DefaultSunlightOptions: SunlightOption;

/**
 * 阳光工具类
 * 提供阳光参数的获取、设置和转换功能
 */
export declare class SunlightUtil {
  /**
   * 将阳光选项转换为导出格式
   * 应用强度因子和尺寸因子，处理布尔值和体积光配置
   * 
   * @param options - 原始阳光选项参数
   * @returns 导出格式的阳光选项
   */
  static getSunlightOptionInExportFormat(options: SunlightOption): ExportSunlightOption;

  /**
   * 设置指定色温的模板阳光配置
   * 将配置与现有设置合并
   * 
   * @param temperatureName - 色温名称（如NATURE_3, REALISTIC等）
   * @param options - 要设置的阳光选项（部分）
   */
  static setTemplateSunlight(temperatureName: string, options: Partial<SunlightOption>): void;

  /**
   * 设置指定HDR环境贴图的阳光配置
   * 将配置与现有HDR设置合并
   * 
   * @param hdrName - HDR贴图名称（如eilenriede_park, bergen等）
   * @param options - 要设置的阳光选项（部分）
   */
  static setHdrSunlight(hdrName: string, options: Partial<SunlightOption>): void;

  /**
   * 获取默认阳光配置
   * 按优先级合并：基础默认值 -> 色温配置 -> HDR配置
   * 
   * @param temperatureName - 可选的色温名称
   * @param hdrName - 可选的HDR贴图名称
   * @returns 合并后的阳光选项配置
   */
  static getDefaultSunlight(temperatureName?: string, hdrName?: string): SunlightOption;
}