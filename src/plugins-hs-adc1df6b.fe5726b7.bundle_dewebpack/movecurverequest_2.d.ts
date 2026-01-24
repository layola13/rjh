/**
 * 移动曲线请求类
 * 用于处理特殊草图2D中曲线移动操作的请求
 * 
 * @module MoveCurveRequest
 * @originalId 203390
 */

import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

/**
 * 移动曲线请求类
 * 继承自基础的MoveCurveRequest，用于处理屋顶绘图草图中的曲线移动操作
 * 
 * @class MoveCurveRequest
 * @extends {HSApp.ExtraordinarySketch2d.Request.MoveCurveRequest}
 */
export declare class MoveCurveRequest extends HSApp.ExtraordinarySketch2d.Request.MoveCurveRequest {
  /**
   * 当前操作的边对象
   * @private
   */
  private _edge: {
    curve: HSCore.Model.ExtraordinaryLine2d | HSCore.Model.ExtraordinaryCircleArc2d | unknown;
  };

  /**
   * 草图数据
   * @private
   */
  private _sketchdata: unknown;

  /**
   * 克隆的已修改草图数据
   * @private
   */
  private _clonedChangedSketchdata: unknown;

  /**
   * 草图交互器
   * @private
   */
  private _sketchInteractor: {
    /**
     * 标记草图为脏数据，需要重新渲染
     * @param options - 脏数据配置
     */
    dirty(options: { type: HSCore.Model.EntityEventType }): void;
  };

  /**
   * 构造函数
   */
  constructor();

  /**
   * 获取过滤面拓扑标签
   * 用于确定在验证线框时应该过滤哪些面的拓扑标签
   * 
   * @returns {string} 返回屋顶绘图草图2D构建器的区域拓扑标签
   */
  getFilterFaceTopoTag(): string;

  /**
   * 验证移动操作是否有效
   * 检查曲线移动后草图的有效性，特别针对特殊线和特殊圆弧
   * 
   * @returns {boolean} 如果移动操作有效返回true，否则返回false并标记草图为脏数据
   * 
   * @remarks
   * - 仅对ExtraordinaryLine2d和ExtraordinaryCircleArc2d类型的曲线进行验证
   * - 通过检查所有边来验证线框的有效性
   * - 如果存在背景边，则不使用面拓扑标签过滤
   * - 验证失败时会触发几何类型的脏数据事件
   */
  isValid(): boolean;
}

/**
 * HSCore命名空间类型定义
 */
declare namespace HSCore {
  namespace Model {
    /**
     * 特殊2D线
     */
    class ExtraordinaryLine2d {}

    /**
     * 特殊2D圆弧
     */
    class ExtraordinaryCircleArc2d {}

    /**
     * 实体事件类型枚举
     */
    enum EntityEventType {
      /** 几何变化事件 */
      Geometry = 'Geometry'
    }

    namespace RoofsDrawingSketch2dBuilder {
      /**
       * 区域拓扑标签常量
       */
      const RegionTopoTag: string;
    }
  }

  namespace Util {
    namespace ExtraordinarySketch2d {
      /**
       * 从草图数据中获取所有边
       * @param sketchData - 草图数据
       * @returns 边对象数组
       */
      function getAllEdgesFromSketchData(sketchData: unknown): Array<{
        /** 是否为背景边 */
        isBackground: boolean;
      }>;
    }
  }
}

/**
 * HSApp命名空间类型定义
 */
declare namespace HSApp {
  namespace ExtraordinarySketch2d {
    namespace Request {
      /**
       * 基础移动曲线请求类
       */
      class MoveCurveRequest {}
    }

    namespace Util {
      /**
       * 通过边集合验证线框是否有效
       * 
       * @param changedSketchData - 修改后的草图数据
       * @param edges - 边对象数组
       * @param filterFaceTopoTag - 可选的面拓扑标签过滤器
       * @returns 线框是否有效
       */
      function isWireValidByEdges(
        changedSketchData: unknown,
        edges: Array<{ isBackground: boolean }>,
        filterFaceTopoTag?: string
      ): boolean;
    }
  }
}