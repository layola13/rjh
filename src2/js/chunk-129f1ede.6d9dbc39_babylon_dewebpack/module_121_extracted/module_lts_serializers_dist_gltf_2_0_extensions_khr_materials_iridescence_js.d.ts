/**
 * glTF材质虹彩效果扩展
 * 实现KHR_materials_iridescence扩展，用于导出Babylon.js材质的虹彩效果到glTF格式
 * @see https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_iridescence
 */

import type { IMaterial } from '../glTFExporter';
import type { PBRBaseMaterial } from 'core/Materials/PBR/pbrBaseMaterial';
import type { BaseTexture } from 'core/Materials/Textures/baseTexture';
import type { ITextureInfo } from '../glTFExporterInterfaces';

/**
 * 扩展名称常量
 */
export const EXTENSION_NAME = 'KHR_materials_iridescence';

/**
 * 虹彩效果扩展数据接口
 */
export interface IKHRMaterialsIridescence {
  /** 虹彩强度因子 (0.0 - 1.0) */
  iridescenceFactor: number;
  
  /** 虹彩折射率 */
  iridescenceIor: number;
  
  /** 虹彩薄膜最小厚度（纳米） */
  iridescenceThicknessMinimum: number;
  
  /** 虹彩薄膜最大厚度（纳米） */
  iridescenceThicknessMaximum: number;
  
  /** 虹彩纹理信息 */
  iridescenceTexture?: ITextureInfo;
  
  /** 虹彩厚度纹理信息 */
  iridescenceThicknessTexture?: ITextureInfo;
}

/**
 * glTF导出器接口
 */
export interface IGLTFExporter {
  _glTFMaterialExporter: {
    _getTextureInfo(texture: BaseTexture | null): ITextureInfo | null;
  };
}

/**
 * KHR_materials_iridescence 扩展导出器
 * 负责将Babylon.js PBR材质的虹彩效果导出为glTF扩展
 */
export declare class KHR_materials_iridescence {
  /** 扩展名称 */
  readonly name: string;
  
  /** 是否启用此扩展 */
  enabled: boolean;
  
  /** 是否为必需扩展 */
  required: boolean;
  
  /** 标记扩展是否在导出过程中被使用 */
  private _wasUsed: boolean;
  
  /** glTF导出器实例引用 */
  private _exporter: IGLTFExporter;

  /**
   * 构造函数
   * @param exporter - glTF导出器实例
   */
  constructor(exporter: IGLTFExporter);

  /**
   * 获取扩展是否被使用过
   */
  get wasUsed(): boolean;

  /**
   * 释放资源
   */
  dispose(): void;

  /**
   * 导出材质时收集需要导出的额外纹理
   * @param context - 导出上下文
   * @param material - 导出的glTF材质对象
   * @param babylonMaterial - Babylon.js材质实例
   * @returns 需要导出的纹理数组
   */
  postExportMaterialAdditionalTextures(
    context: string,
    material: IMaterial,
    babylonMaterial: unknown
  ): BaseTexture[];

  /**
   * 导出材质后异步处理虹彩扩展
   * @param context - 导出上下文
   * @param material - 导出的glTF材质对象
   * @param babylonMaterial - Babylon.js材质实例
   * @returns Promise，解析为包含扩展数据的材质对象
   */
  postExportMaterialAsync(
    context: string,
    material: IMaterial,
    babylonMaterial: unknown
  ): Promise<IMaterial>;
}