/**
 * FaceGroupUpdater - 面组更新器
 * 用于处理面组数据的迁移和更新逻辑
 */

import { FaceGroupConnectModeEnum } from './FaceGroupConnectModeEnum';

/**
 * 面组边界映射
 * key: 实体ID
 * value: 边界数据
 */
export interface FaceGroupBoundMap {
  [entityId: string]: unknown;
}

/**
 * 面组数据接口
 */
export interface FaceGroupData {
  /** 面组ID，使用分号分隔的实体ID列表 */
  faceGroupId?: string;
  /** 面组边界映射 */
  faceGroupBoundMap?: FaceGroupBoundMap;
  /** 连接模式 (cm = connect mode) */
  cm?: FaceGroupConnectModeEnum;
}

/**
 * 迁移上下文配置
 */
export interface MigrationContext {
  /** 源版本号 */
  version: string;
  /** 是否跳过 Mixpaint 迁移 */
  migrateSkipMixpaint?: boolean;
  /** 实体ID映射表，用于迁移时的ID转换 */
  migrateEntitiesMap?: Map<string, { id: string }>;
}

/**
 * 面组更新器类
 * 负责处理不同版本间的面组数据迁移
 */
export declare class FaceGroupUpdater {
  /**
   * 迁移面组ID映射
   * 处理旧版本中使用连字符分隔的ID格式，转换为分号分隔格式
   * 
   * @param data - 需要迁移的面组数据
   * @param context - 迁移上下文，包含版本信息和实体映射
   * @returns 迁移后的面组数据
   */
  static migrationFaceGroupIdMap(
    data: FaceGroupData,
    context: MigrationContext
  ): FaceGroupData;

  /**
   * 迁移连接模式
   * 根据版本和现有数据确定正确的连接模式
   * 
   * @param data - 需要迁移的面组数据
   * @param context - 迁移上下文
   * @returns 更新了连接模式的面组数据
   */
  static migrationConnectMode(
    data: FaceGroupData,
    context: MigrationContext
  ): FaceGroupData;
}