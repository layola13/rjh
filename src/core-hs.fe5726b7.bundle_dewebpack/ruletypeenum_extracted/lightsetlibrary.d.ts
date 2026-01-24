/**
 * 光照集合库模块
 * 用于管理和存储各种光照预设配置
 */

import { LightTypeEnum } from './LightTypeEnum';

/**
 * 光照集合数据项接口
 */
export interface LightSetData {
  /** 光照配置的唯一标识键 */
  key: string;
  /** 光照配置的显示标签 */
  label: string;
}

/**
 * 光照集合库
 * 提供光照预设的加载、获取、添加和删除功能
 */
export declare class LightSetLibrary {
  /**
   * 内部存储光照数据的Map集合
   * @private
   */
  private static _lightData: Map<string, LightSetData>;

  /**
   * 加载默认光照预设
   * 包括聚光灯（SPOT_LIGHT）和补光灯（FILL_LIGHT）预设
   * 以及所有光照类型枚举值
   */
  static loadDefault(): void;

  /**
   * 获取所有光照集合数据
   * @returns 包含所有光照配置的Map对象
   */
  static getLightSetData(): Map<string, LightSetData>;

  /**
   * 根据键获取特定的光照集合数据
   * @param key - 光照配置的唯一标识键
   * @returns 对应的光照数据项，若不存在则返回undefined
   */
  static get(key: string): LightSetData | undefined;

  /**
   * 添加光照集合数据
   * @param data - 要添加的光照数据项
   */
  static add(data: LightSetData): void;

  /**
   * 删除指定键的光照集合数据
   * @param key - 要删除的光照配置键
   */
  static delete(key: string): void;
}