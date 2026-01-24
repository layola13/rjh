/**
 * HSCore 模型命名空间导入
 * 包含电线路由相关的核心类型和枚举
 */
import { HSCore } from './HSCore';

/**
 * 差异电线路由参数接口
 * 用于初始化 DiffCWRoute 实例的配置对象
 */
export interface DiffCWRouteParams {
  /**
   * 路由类型
   * 可以是强电或弱电组件类型
   */
  type: string;

  /**
   * 路由路径
   * 定义电线的具体走向
   */
  path: unknown;

  /**
   * 源节点 ID
   * 电线路由的起始点标识符
   */
  srcId: string | number;

  /**
   * 目标节点 ID
   * 电线路由的终止点标识符
   */
  destId: string | number;
}

/**
 * 差异电线路由类
 * 继承自 HSCore.Model.Entity，用于表示电线路由的差异化配置
 * 支持强电和弱电两种类型的管道直径计算
 */
export declare class DiffCWRoute extends HSCore.Model.Entity {
  /**
   * 路由类型
   * 决定使用的管道直径规格
   */
  type: string;

  /**
   * 路由路径
   * 存储电线的几何或逻辑路径信息
   */
  path: unknown;

  /**
   * 源节点 ID
   * 标识路由的起点
   */
  srcId: string | number;

  /**
   * 目标节点 ID
   * 标识路由的终点
   */
  destId: string | number;

  /**
   * 管道直径 (只读属性)
   * 根据路由类型自动计算：
   * - 强电或弱电类型：返回 D16 (16mm 直径)
   * - 其他类型：返回 D25 (25mm 直径)
   * 
   * @returns {HSCore.Model.CWTubeDiameterEnum} 管道直径枚举值
   */
  get diameter(): HSCore.Model.CWTubeDiameterEnum;

  /**
   * 设置路由参数
   * 批量配置路由的类型、路径、源节点和目标节点
   * 
   * @param {DiffCWRouteParams} params - 路由配置参数对象
   * @returns {void}
   */
  setParams(params: DiffCWRouteParams): void;
}

/**
 * HSCore 命名空间扩展
 * 包含电线路由相关的模型定义
 */
declare namespace HSCore {
  namespace Model {
    /**
     * 实体基类
     * 所有模型类的通用父类
     */
    class Entity {
      constructor(...args: unknown[]);
    }

    /**
     * 电线管道直径枚举
     * 定义标准管道规格
     */
    enum CWTubeDiameterEnum {
      /** 16mm 直径 - 用于强电/弱电 */
      D16 = 'D16',
      /** 25mm 直径 - 默认规格 */
      D25 = 'D25'
    }

    /**
     * 强电组件类型标识
     */
    interface CWStrongElecComp {
      Type: string;
    }

    /**
     * 弱电组件类型标识
     */
    interface CWWeakElecComp {
      Type: string;
    }

    /**
     * 导出强电组件配置
     */
    const CWStrongElecComp: CWStrongElecComp;

    /**
     * 导出弱电组件配置
     */
    const CWWeakElecComp: CWWeakElecComp;
  }
}