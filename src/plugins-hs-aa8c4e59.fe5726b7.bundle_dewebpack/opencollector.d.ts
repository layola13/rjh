/**
 * 开孔收集器模块
 * 用于收集和处理场景中的各种开孔实体（壁龛、墙洞、墙面开孔等）
 */

import { HSCore } from './HSCore';
import { PaveEntity } from './PaveEntity';

/**
 * 混合涂料信息接口
 */
interface MixPaintInfo {
  /** 混合涂料对象 */
  mixPaint: any;
  /** 源实体面 */
  srcEntity: HSCore.Model.Face;
  /** 面类型标识 */
  faceType: string;
}

/**
 * 开孔收集器类
 * 负责遍历场景中的开孔实体，收集需要铺贴的面信息
 */
export declare class OpenCollector {
  /**
   * 收集开孔实体中的可铺贴面
   * 
   * @param scene - 包含开孔信息的场景对象，需实现 forEachOpening 方法
   * @param context - 铺贴上下文参数，传递给 PaveEntity.accept 方法
   * @returns 返回铺贴实体数组
   * 
   * @remarks
   * 处理以下类型的开孔：
   * - 地面壁龛 (SlabNiche)
   * - 墙面壁龛 (WallNiche)
   * - 地面孔洞 (SlabHole)
   * - 墙面开孔 (WallOpening)，包括门槛石逻辑处理
   */
  static collect(
    scene: SceneWithOpenings,
    context: PaveContext
  ): PaveEntity[];
}

/**
 * 场景对象接口，需支持开孔遍历
 */
interface SceneWithOpenings {
  /**
   * 遍历场景中的所有开孔
   * @param callback - 对每个开孔执行的回调函数
   */
  forEachOpening(callback: (opening: HSCore.Model.Opening) => void): void;
}

/**
 * 铺贴上下文类型（具体结构需根据实际业务定义）
 */
type PaveContext = any;

/**
 * HSCore 命名空间扩展
 */
declare namespace HSCore {
  namespace Util {
    namespace Content {
      /** 判断是否为地面壁龛 */
      function isSlabNiche(opening: Model.Opening): boolean;
      /** 判断是否为墙面壁龛 */
      function isWallNiche(opening: Model.Opening): boolean;
      /** 判断是否为地面孔洞 */
      function isSlabHole(opening: Model.Opening): boolean;
      /** 判断是否为墙面开孔 */
      function isWallOpening(opening: Model.Opening): boolean;
    }
  }

  namespace Model {
    /**
     * 开孔实体类
     */
    class Opening {
      /** 面列表 */
      faceList: Face[];
      /** 侧面列表 */
      sideFaces: Face[];

      /**
       * 判断是否启用门槛石材质
       */
      isDoorStoneMaterialEnabled(): boolean;

      /**
       * 获取底面
       */
      getBottomFace(): Face | null;
    }

    /**
     * 面实体类
     */
    interface Face {
      /** 面ID标识 */
      id: string;
      /** 材质信息 */
      material: {
        /** 混合涂料对象 */
        mixpaint?: any;
      };
    }
  }
}

/**
 * 铺贴实体类
 */
declare class PaveEntity {
  /**
   * 接受混合涂料信息并创建铺贴实体
   * @param paintInfo - 涂料信息
   * @param context - 铺贴上下文
   * @returns 返回当前铺贴实体
   */
  accept(paintInfo: MixPaintInfo, context: PaveContext): this;
}