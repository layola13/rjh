/**
 * 删除梁的请求类
 * 
 * 该类负责处理从图层中删除梁(Beam)的操作，
 * 包括更新相关的面板、天花板和模具装配。
 */

import { HSCore } from './HSCore';

/**
 * 梁(Beam)接口
 * 代表可以从图层中删除的梁对象
 */
interface Beam {
  /** 梁所属的父图层 */
  parent: Layer | undefined;
  
  /** 获取宿主对象(如Face) */
  getHost(): Face | unknown;
}

/**
 * 图层(Layer)接口
 * 包含梁和其他建筑元素的容器
 */
interface Layer {
  /** 梁构建器，用于重建图层中的梁 */
  beamBuilder: {
    build(): void;
  };
  
  /** 从图层中移除子元素 */
  removeChild(beam: Beam): void;
}

/**
 * 面(Face)接口
 * 代表建筑模型中的面板
 */
interface Face {
  /** 从面中移除内容 */
  removeContent(beam: Beam): void;
}

/**
 * 删除梁请求类
 * 
 * 继承自StateRequest基类，实现事务性删除操作。
 * 当提交(commit)时，会：
 * 1. 从图层中移除梁
 * 2. 更新相关的天花板
 * 3. 重建图层中的梁
 * 4. 自动调整模具装配
 * 
 * @extends {HSCore.Transaction.Common.StateRequest}
 */
export declare class DeleteBeamRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 要删除的梁对象
   * @private
   */
  private readonly _beam: Beam;
  
  /**
   * 梁所属的图层
   * @type {Layer | undefined}
   */
  layer: Layer | undefined;
  
  /**
   * 构造函数
   * 
   * @param beam - 要删除的梁对象
   */
  constructor(beam: Beam);
  
  /**
   * 提交删除操作
   * 
   * 执行以下步骤：
   * 1. 启动面板模具装配监听
   * 2. 从图层中移除梁
   * 3. 从宿主对象(如Face)中移除梁内容
   * 4. 更新梁变化后的天花板
   * 5. 重建图层中的梁
   * 6. 自动调整模具装配
   * 
   * @returns {Beam} 被删除的梁对象
   */
  onCommit(): Beam;
  
  /**
   * 获取操作描述
   * 
   * @returns {string} 返回"删除梁"
   */
  getDescription(): string;
  
  /**
   * 判断是否可以对字段进行事务处理
   * 
   * @returns {boolean} 始终返回true
   */
  canTransactField(): boolean;
  
  /**
   * 获取日志分类
   * 
   * @returns {string} 返回内容操作类型的日志分组
   */
  getCategory(): string;
}

/**
 * HSCore命名空间扩展
 * 包含事务管理和工具类
 */
declare namespace HSCore {
  namespace Transaction {
    namespace Common {
      /**
       * 状态请求基类
       * 所有事务请求的基类
       */
      class StateRequest {
        /** 提交操作 */
        onCommit(): unknown;
      }
    }
  }
  
  namespace Model {
    /**
     * 面(Face)模型类
     */
    class Face {
      removeContent(beam: Beam): void;
    }
  }
  
  namespace Util {
    /**
     * 面板模具装配辅助工具
     * 提供自动装配功能的单例类
     */
    class FaceMoldingFitHelper {
      /**
       * 获取单例实例
       * @returns {FaceMoldingFitHelper} 单例实例
       */
      static getInstance(): FaceMoldingFitHelper;
      
      /**
       * 开始监听指定图层
       * @param layer - 要监听的图层
       */
      startListening(layer: Layer): void;
      
      /**
       * 执行自动装配
       */
      autoFit(): void;
    }
    
    /**
     * 天花板平板工具类
     * 提供天花板更新功能
     */
    class TgSlab {
      /**
       * 在梁变化后更新天花板
       * @param layer - 包含梁的图层
       */
      static updateCeilingAfterBeamChanged(layer: Layer): void;
    }
  }
}

/**
 * 日志分组常量
 */
declare const HSFPConstants: {
  LogGroupTypes: {
    /** 内容操作类型 */
    ContentOperation: string;
  };
};