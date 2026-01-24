/**
 * 参数化屋顶材质替换命令模块
 * @module RoofMaterialReplaceCommand
 */

import { Command } from 'HSApp.Cmd.Command';
import { HSCore } from 'HSCore';
import { HSApp } from 'HSApp';
import { HSCatalog } from 'HSCatalog';

/**
 * 面ID类型
 */
type FaceId = string | number;

/**
 * 材质元数据接口
 */
interface MaterialMetadata {
  /** 内容类型信息 */
  contentType: {
    /** 检查是否为指定内容类型 */
    isTypeOf(type: HSCatalog.ContentTypeEnum): boolean;
  };
  /** 其他元数据属性 */
  [key: string]: unknown;
}

/**
 * 平面投影信息接口
 */
interface ProjectionPlane {
  /** 投影点到平面上 */
  projectPoint(point: THREE.Vector3): THREE.Vector3;
}

/**
 * 屋顶模型接口
 */
interface RoofModel {
  /**
   * 检查面是否支持通过网格键绘制材质
   * @param faceId - 面ID
   */
  isFaceSupportPaintMaterialByMeshKey(faceId: FaceId): boolean;

  /**
   * 检查面是否支持绘制材质
   * @param faceId - 面ID
   */
  isFaceSupportPaintMaterial(faceId: FaceId): boolean;

  /**
   * 获取面的路径集合
   * @param faceId - 面ID
   * @returns 路径点数组
   */
  getFacePaths(faceId: FaceId): Array<Array<{ x: number; y: number; z: number }>> | undefined;

  /**
   * 获取面的投影平面
   * @param faceId - 面ID
   */
  getFaceProjectionPlane(faceId: FaceId): ProjectionPlane | undefined;
}

/**
 * 混合绘制图案数据类型
 */
type PatternData = HSCore.Material.Material | Map<FaceId, unknown>;

/**
 * 混合绘制插件助手接口
 */
interface MixPaintPluginHelper {
  /**
   * 异步获取图案数据
   * @param roof - 屋顶模型
   * @param faceIds - 面ID数组
   * @param meta - 材质元数据
   */
  getPatternDataAsync(
    roof: RoofModel,
    faceIds: FaceId[],
    meta: MaterialMetadata
  ): Promise<Map<FaceId, PatternData>>;

  /**
   * 获取自定义模型请求
   * @param roof - 屋顶模型
   * @param materialMap - 材质映射
   */
  getCustomizedModelRequest(
    roof: RoofModel,
    materialMap: Map<FaceId, unknown>
  ): unknown;
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  /** 取消当前操作 */
  cancel(): void;
  /** 完成当前操作 */
  complete(): void;
}

/**
 * 参数化屋顶材质替换命令
 * 
 * 该命令用于替换参数化屋顶模型的材质，支持多种屋顶类型：
 * - NCustomizedFeatureModel（自定义特征模型）
 * - NCustomizedModelMolding（自定义模型线条）
 * - 其他自定义屋顶模型
 * 
 * @example
 *