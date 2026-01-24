/**
 * 模块配置处理函数
 * 用于特定租户和模块ID的配置定制
 * 
 * @module module_add
 * @original_id add
 */

/**
 * 模块配置对象接口
 */
interface ModuleConfig {
  /** 模块唯一标识符 */
  id: string;
  /** 点标记配置（可选） */
  dot?: DotConfig;
  /** 其他可能的配置属性 */
  [key: string]: unknown;
}

/**
 * 点标记配置接口
 */
interface DotConfig {
  /** 点标记的唯一标识符 */
  id: string;
  /** 样式配置对象 */
  style: Record<string, unknown>;
}

/**
 * 应用全局配置接口
 */
interface HSAppConfig {
  /** 租户标识 */
  TENANT: string;
}

/**
 * 全局应用对象接口
 */
interface HSApp {
  Config: HSAppConfig;
}

declare global {
  const HSApp: HSApp;
}

/**
 * 为特定租户和模块应用配置扩展
 * 当租户为 "ezhome" 且模块ID匹配时，添加点标记配置
 * 
 * @param moduleConfig - 待处理的模块配置对象
 */
declare function processModuleConfig(moduleConfig: ModuleConfig): void;

export { ModuleConfig, DotConfig, HSAppConfig, HSApp, processModuleConfig };