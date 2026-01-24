/**
 * glTF 2.0 序列化器模块
 * 提供将 Babylon.js 场景导出为 glTF/GLB 格式的功能
 */

import type { Scene } from '@babylonjs/core/scene';
import type { _Exporter } from './glTFExporter';

/**
 * glTF 导出器选项配置
 */
export interface IGLTFExportOptions {
  /**
   * 是否在不等待场景准备就绪的情况下导出
   * @defaultValue false
   */
  exportWithoutWaitingForScene?: boolean;

  /**
   * 其他导出相关配置选项
   */
  [key: string]: unknown;
}

/**
 * glTF 导出结果数据结构
 */
export interface IGLTFData {
  /**
   * glTF JSON 内容
   */
  glTFFiles: Record<string, string | Blob>;

  /**
   * 二进制 GLB 数据（仅用于 GLB 导出）
   */
  glTFBinary?: ArrayBuffer;
}

/**
 * GLTF2Export 类
 * 提供将 Babylon.js 场景导出为 glTF 2.0 和 GLB 格式的静态方法
 */
export declare class GLTF2Export {
  /**
   * 将场景异步导出为 glTF 格式
   * @param scene - 要导出的 Babylon.js 场景
   * @param fileNameOrPrefix - 输出文件名或前缀（不含扩展名）
   * @param options - 导出配置选项
   * @returns Promise，解析为包含 glTF 文件数据的对象
   */
  static GLTFAsync(
    scene: Scene,
    fileNameOrPrefix: string,
    options?: IGLTFExportOptions
  ): Promise<IGLTFData>;

  /**
   * 将场景异步导出为 GLB 格式（二进制 glTF）
   * @param scene - 要导出的 Babylon.js 场景
   * @param fileNameOrPrefix - 输出文件名或前缀（不含扩展名）
   * @param options - 导出配置选项
   * @returns Promise，解析为包含 GLB 二进制数据的对象
   */
  static GLBAsync(
    scene: Scene,
    fileNameOrPrefix: string,
    options?: IGLTFExportOptions
  ): Promise<IGLTFData>;

  /**
   * 导出前的预处理钩子
   * @param scene - 要导出的场景
   * @param options - 导出配置选项
   * @returns Promise，在场景准备就绪后解析
   * @internal
   */
  static _PreExportAsync(
    scene: Scene,
    options?: IGLTFExportOptions
  ): Promise<void>;

  /**
   * 导出后的后处理钩子
   * @param scene - 已导出的场景
   * @param glTFData - 导出的 glTF 数据
   * @param options - 导出配置选项
   * @returns Promise，解析为处理后的 glTF 数据
   * @internal
   */
  static _PostExportAsync(
    scene: Scene,
    glTFData: IGLTFData,
    options?: IGLTFExportOptions
  ): Promise<IGLTFData>;
}