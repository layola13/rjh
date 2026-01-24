/**
 * Module: module_145
 * Original ID: 145
 * 
 * 提供STL文件加载和硬件锁配置管理功能
 */

import type { Vector3 } from './module_3';
import type { ProfileTypesEnum } from './module_10';
import type DefaultExport from './module_20';

/**
 * STL加载器和硬件锁管理类
 * 负责同步加载STL模型文件并管理硬件锁配置
 */
export default class STLLoaderManager {
  /**
   * 初始化STL加载器
   * @param config - 初始化配置参数
   */
  static Init(config: unknown): void;

  /**
   * 同步加载STL文件
   * @param filePath - STL文件路径
   * @param offset - 3D空间偏移向量，默认为零向量
   * @param profileType - 硬件锁配置类型，默认使用HardwareLock配置
   * @returns 加载结果（具体类型需根据实际返回值确定）
   */
  static LoadSTLSync(
    filePath: string,
    offset?: Vector3,
    profileType?: ReturnType<typeof DefaultExport.GetProfileType>
  ): unknown;

  /**
   * 更改硬件锁主密钥（Primary Key）
   * @param profileType - 硬件锁配置类型，默认使用HardwareLock配置
   * @returns 操作结果（具体类型需根据实际返回值确定）
   */
  static ChangeLockPK(
    profileType?: ReturnType<typeof DefaultExport.GetProfileType>
  ): unknown;
}