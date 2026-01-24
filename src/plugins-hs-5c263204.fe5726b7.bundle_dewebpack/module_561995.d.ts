/**
 * 材质替换工具类
 * 提供查找和过滤相同材质模型的功能
 */
declare class MaterialReplacementHelper {
  /**
   * 获取可以替换相同材质的模型列表
   * @param targetModel - 目标模型，可以是定制模型成型件或其他特征模型
   * @param meshKey - 网格键值，用于标识特定的网格面
   * @returns 返回可以进行材质替换的模型数组
   * @description 
   * - 如果目标是定制模型成型件(NCustomizedModelMolding)，则查找所有环境中的相同材质成型件
   * - 如果是其他类型，则返回所有特征模型及其灯槽子模型
   */
  static getCanReplaceSameMaterialModels(
    targetModel: HSCore.Model.NCustomizedModelMolding | HSCore.Model.BaseFeatureModel,
    meshKey: string
  ): Array<HSCore.Model.BaseFeatureModel | HSCore.Model.NCustomizedModelMolding | HSCore.Model.NCustomizedModelLightSlot>;

  /**
   * 获取具有相同材质的面ID列表
   * @param sourceModel - 源模型，用于比较的参考模型
   * @param targetModel - 目标模型，需要检查材质的模型
   * @param meshKey - 网格键值
   * @returns 返回具有相同材质的面ID数组
   * @description
   * 遍历源模型的所有面，筛选出与目标模型指定网格具有相同材质的面
   * 会检查面是否支持材质绘制功能
   */
  static getSameMaterialFaceIds(
    sourceModel: ModelWithFaceIds,
    targetModel: ModelWithMaterial,
    meshKey: string
  ): string[];

  /**
   * 获取具有相同材质的成型件列表
   * @param modelList - 待筛选的成型件模型数组
   * @param targetMolding - 目标成型件，用于材质比对
   * @param meshKey - 网格键值（此参数在实现中未使用）
   * @returns 返回材质数据匹配的成型件数组
   * @description
   * 根据材质数据的 seekId 和 blendColor 属性进行匹配过滤
   */
  static getSameMaterialMoldings(
    modelList: HSCore.Model.NCustomizedModelMolding[],
    targetMolding: HSCore.Model.NCustomizedModelMolding,
    meshKey: string
  ): HSCore.Model.NCustomizedModelMolding[];
}

/**
 * 材质数据接口
 * 描述模型的材质属性
 */
interface MaterialData {
  /** 材质查找ID */
  seekId: string | number;
  /** 混合颜色值 */
  blendColor: string | number;
}

/**
 * 具有面ID集合的模型接口
 */
interface ModelWithFaceIds {
  /** 模型包含的所有面ID */
  faceIds: string[];
  /** 检查指定面是否支持材质绘制 */
  isFaceSupportPaintMaterialByMeshKey?(meshKey: string): boolean;
}

/**
 * 具有材质属性的模型接口
 */
interface ModelWithMaterial {
  /** 材质数据 */
  materialData: MaterialData;
  /** 检查指定面是否支持材质绘制 */
  isFaceSupportPaintMaterialByMeshKey?(meshKey: string): boolean;
}

/**
 * HSCore 命名空间声明
 */
declare namespace HSCore {
  namespace Model {
    /** 定制模型成型件基类 */
    class NCustomizedModelMolding {
      /** 材质数据 */
      materialData: MaterialData;
    }

    /** 定制模型灯槽类 */
    class NCustomizedModelLightSlot {}

    /** 特征模型基类 */
    class BaseFeatureModel {
      /** 子模型集合 */
      children: Record<string, any>;
    }
  }
}

/**
 * 全局 HSApp 应用程序接口
 */
declare namespace HSApp {
  namespace App {
    /** 获取应用程序实例 */
    function getApp(): {
      /** 当前激活的环境 */
      activeEnvironment: {
        /** 获取所有特征模型 */
        getAllFeatureModels(): HSCore.Model.BaseFeatureModel[];
      };
    };
  }

  /** 绘制插件辅助工具 */
  namespace PaintPluginHelper {
    namespace Pave {
      /** 混合绘制插件辅助类 */
      class MixPaintPluginHelper {
        /**
         * 获取模型材质键值
         * @param model - 模型对象
         * @param meshKey - 网格键
         * @returns 材质键值，如果不存在则返回 null/undefined
         */
        static getCModelMaterialKey(
          model: any,
          meshKey: string
        ): string | null | undefined;
      }
    }
  }
}

export default MaterialReplacementHelper;