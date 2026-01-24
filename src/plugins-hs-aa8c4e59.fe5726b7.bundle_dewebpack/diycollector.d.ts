/**
 * DIY收集器 - 用于收集和处理定制化模型的面材质数据
 * @module DIYCollector
 */

import { HSCore } from './HSCore';
import { PaveEntity } from './PaveEntity';
import { Utils } from './Utils';

/**
 * 面数据接口 - 描述面的材质和几何信息
 */
interface FaceData {
  /** 混合涂装材质 */
  mixPaint: unknown;
  /** 源实体对象 */
  srcEntity: HSCore.Model.CustomizedModel | HSCore.Model.NCustomizedFeatureModel;
  /** 面类型标识 */
  faceType: number;
  /** 面的轮廓数据（可选） */
  outline?: unknown[];
  /** 面所有者ID（可选，仅在非独立输出模式下存在） */
  faceOwnerId?: string;
}

/**
 * 面材质接口
 */
interface FaceMaterial {
  /** 混合涂装对象 */
  mixpaint?: {
    /** 面组对象 */
    faceGroup: {
      /** 获取面组中所有面的ID列表 */
      getFaceIds(): number[];
    };
  };
}

/**
 * DIY收集器类
 * 用于遍历内容并收集定制化模型的面材质数据
 */
export declare class DIYCollector {
  /**
   * 收集定制化模型的面数据
   * @param content - 包含forEachContent方法的内容容器
   * @param target - 目标对象，用于接受处理后的面数据
   * @returns 返回PaveEntity数组，包含所有处理后的面实体
   */
  static collect(
    content: {
      /**
       * 遍历内容中的所有实体
       * @param callback - 对每个实体执行的回调函数
       */
      forEachContent(
        callback: (entity: HSCore.Model.CustomizedModel | HSCore.Model.NCustomizedFeatureModel) => void
      ): void;
    },
    target: unknown
  ): PaveEntity[];
}