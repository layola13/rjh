/**
 * 配置模块：室内外标签设置
 * @module SettingsConfig
 */

/**
 * 设置项描述信息
 */
interface SettingDescription {
  /** 设置项名称 */
  name: string;
  /** 设置项类型描述 */
  type: string;
}

/**
 * 设置项值配置
 */
interface SettingValue {
  /** 设置项的值 */
  value: string;
  /** 设置项的唯一标识符 */
  id: string;
}

/**
 * 设置项映射配置
 */
interface SettingMapping {
  /** 映射的属性名称 */
  name: string;
  /** 映射的类型代码 */
  type: number;
}

/**
 * 完整的设置配置结构
 */
interface SettingsConfig {
  /** 设置项描述信息集合 */
  describe: Record<string, SettingDescription>;
  /** 设置项值配置集合 */
  settings: Record<string, SettingValue>;
  /** 设置项映射关系集合 */
  settingMap: Record<string, SettingMapping>;
}

/**
 * 导出的配置常量
 * 包含反转室内外标签的设置配置
 */
declare const config: SettingsConfig;

export default config;

export type {
  SettingDescription,
  SettingValue,
  SettingMapping,
  SettingsConfig
};