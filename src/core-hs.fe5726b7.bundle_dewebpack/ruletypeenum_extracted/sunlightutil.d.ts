/**
 * 阳光渲染工具模块
 * 提供场景中阳光参数的配置、导出和管理功能
 */

/**
 * 阳光选项参数接口
 * 定义场景中阳光的所有可配置属性
 */
export interface SunlightOption {
  /** 是否启用阳光 */
  sunlight?: boolean;
  /** 是否自动定位阳光位置 */
  autoPosition?: boolean;
  /** 色温类型 */
  temperature?: string;
  /** 光照强度 (0-1范围) */
  intensity?: number;
  /** 光照强度因子，用于动态调整 */
  intensityFactor?: number;
  /** 太阳大小倍数 */
  sizeMultiplier?: number;
  /** 太阳大小倍数因子，用于动态调整 */
  sizeMultiplierFactor?: number;
  /** 高度角（弧度） */
  heightAngle?: number;
  /** 水平角（弧度） */
  horizontalAngle?: number;
  /** 是否启用体积光效果 */
  volumeLight?: boolean;
}

/**
 * 导出格式的阳光选项
 * 用于序列化和保存场景配置
 */
export interface SunlightExportOption {
  /** 是否启用阳光 */
  sunlight: boolean;
  /** 是否自动定位阳光位置（仅当sunlight为true时存在） */
  autoPosition?: boolean;
  /** 色温类型（仅当sunlight为true时存在） */
  temperature?: string;
  /** 光照强度（仅当sunlight为true时存在） */
  intensity?: number;
  /** 太阳大小倍数（仅当sunlight为true时存在） */
  sizeMultiplier?: number;
  /** 高度角（弧度）（仅当sunlight为true时存在） */
  heightAngle?: number;
  /** 水平角（弧度）（仅当sunlight为true时存在） */
  horizontalAngle?: number;
  /** 是否启用体积光效果（仅当sunlight为true时存在） */
  volumeLight?: boolean;
}

/**
 * 模板阳光配置映射
 * 键为色温名称，值为对应的阳光参数
 */
export type TemplateSunlightMap = Record<string, Partial<SunlightOption>>;

/**
 * HDR环境阳光配置映射
 * 键为HDR环境名称，值为对应的阳光参数
 */
export type HdrSunlightMap = Record<string, Partial<SunlightOption>>;

/**
 * 默认阳光选项配置
 * 全局默认值，用于初始化场景
 */
export const DefaultSunlightOptions: SunlightOption;

/**
 * 阳光工具类
 * 提供阳光参数的获取、设置和转换功能
 */
export class SunlightUtil {
  /**
   * 将阳光选项转换为导出格式
   * @param option - 阳光选项参数
   * @returns 导出格式的阳光选项
   * @description
   * - 如果sunlight为false，仅返回sunlight字段
   * - 否则应用intensityFactor和sizeMultiplierFactor进行计算
   * - sizeMultiplier会被四舍五入为整数
   */
  static getSunlightOptionInExportFormat(
    option: SunlightOption
  ): SunlightExportOption;

  /**
   * 设置或更新特定色温模板的阳光配置
   * @param temperatureName - 色温名称（如NATURE_3, REALISTIC等）
   * @param options - 要设置的阳光参数（部分覆盖）
   * @description 如果该色温已有配置，则合并更新；否则基于默认值创建新配置
   */
  static setTemplateSunlight(
    temperatureName: string,
    options: Partial<SunlightOption>
  ): void;

  /**
   * 设置或更新特定HDR环境的阳光配置
   * @param hdrName - HDR环境名称（如eilenriede_park, bergen等）
   * @param options - 要设置的阳光参数（部分覆盖）
   * @description 如果该HDR已有配置，则合并更新；否则基于默认值创建新配置
   */
  static setHdrSunlight(
    hdrName: string,
    options: Partial<SunlightOption>
  ): void;

  /**
   * 获取合并后的默认阳光配置
   * @param temperatureName - 色温名称（可选）
   * @param hdrName - HDR环境名称（可选）
   * @returns 合并后的阳光配置
   * @description
   * 合并优先级：DefaultSunlightOptions < 色温配置 < HDR配置
   * - 先应用全局默认值
   * - 如果提供色温名称且存在对应配置，覆盖相应字段
   * - 如果提供HDR名称且存在对应配置，再次覆盖相应字段
   */
  static getDefaultSunlight(
    temperatureName?: string,
    hdrName?: string
  ): SunlightOption;
}