/**
 * LayerUtil - 图层工具类
 * 提供图层相关的辅助方法，包括获取图层关系、高度计算等功能
 */

import { Layer } from './Layer';
import { Scene } from './Scene';
import { Ceiling } from './Ceiling';
import { Slab } from './Slab';
import { Logger } from './Logger';

/**
 * 实体类型 - 可以是图层、天花板、地板或其他具有父级关系的实体
 */
interface Entity {
  /**
   * 获取第一个父级实体
   */
  getFirstParent(): Entity | undefined;
}

/**
 * 具有唯一父级的实体接口
 */
interface EntityWithParent {
  /**
   * 获取唯一的父级对象
   */
  getUniqueParent(): ParentEntity;
}

/**
 * 父级实体接口 - 可能包含图层信息
 */
interface ParentEntity {
  /**
   * 天花板图层
   */
  ceilingLayer?: Layer;
  
  /**
   * 最后一个图层
   */
  lastLayer?: Layer;
  
  /**
   * 实体标签
   */
  tag?: string;
  
  /**
   * 获取下层图层的方法（可选）
   */
  getUnderLayer?(): Layer | undefined;
}

/**
 * 图层工具类
 * 提供图层查询、高度计算等实用方法
 */
export const LayerUtil = {
  /**
   * 获取指定图层的下层图层
   * @param layer - 目标图层
   * @returns 下层图层，如果不存在则返回 undefined
   */
  getUnderLayer(layer: Layer | undefined): Layer | undefined {
    if (!layer) {
      return undefined;
    }

    const parent = layer.getUniqueParent();
    
    // 如果当前图层是天花板图层，返回最后一个图层；否则返回前一个图层
    return parent.ceilingLayer === layer ? parent.lastLayer : layer.prev;
  },

  /**
   * 获取实体所在的图层
   * 递归查找实体的父级直到找到图层对象
   * @param entity - 目标实体（可以是图层、天花板、地板等）
   * @returns 实体所在的图层，如果无法确定则返回 undefined
   */
  getEntityLayer(entity: Layer | Ceiling | Slab | Entity | undefined): Layer | undefined {
    if (!entity) {
      return undefined;
    }

    // 如果实体是天花板类型
    if (entity instanceof Ceiling) {
      const parent = entity.getUniqueParent();
      
      if (!parent) {
        return undefined;
      }

      // 断言父级具有 getUnderLayer 方法
      assert(
        parent.getUnderLayer,
        `unexpected parent ${parent.tag}.`,
        'HSCore.Verify.Error'
      );

      return parent.getUnderLayer?.();
    }

    // 如果实体本身就是图层
    if (entity instanceof Layer) {
      return entity;
    }

    // 如果实体是地板类型
    if (entity instanceof Slab) {
      return entity.getBaseLayer();
    }

    // 递归查找父级实体的图层
    return this.getEntityLayer(entity.getFirstParent());
  },

  /**
   * 获取实体的基准高度
   * @param entity - 目标实体
   * @returns 实体基准高度值（米），如果无法确定则返回 0
   */
  getEntityBaseHeight(entity: Layer | Ceiling | Slab | Entity | undefined): number {
    const layer = this.getEntityLayer(entity);
    return layer ? this.getAltitude(layer) : 0;
  },

  /**
   * 获取图层的海拔高度
   * @param layer - 目标图层
   * @returns 图层海拔高度值（米），如果图层无效则返回 0
   */
  getAltitude(layer: Layer | undefined): number {
    if (!layer) {
      Logger.console.assert(false, 'undefined layer');
      return 0;
    }

    const parent = layer.getUniqueParent();

    // 如果父级是场景对象，通过场景获取图层高度
    if (parent && parent instanceof Scene) {
      return parent.getLayerAltitude(layer);
    }

    return 0;
  }
};

/**
 * 断言函数声明
 * @param condition - 断言条件
 * @param message - 错误消息
 * @param errorType - 错误类型
 */
declare function assert(
  condition: unknown,
  message: string,
  errorType: string
): asserts condition;