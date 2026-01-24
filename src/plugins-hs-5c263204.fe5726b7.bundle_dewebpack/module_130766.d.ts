/**
 * 灯光操纵器组件
 * 提供灯光对象的移动和旋转交互功能
 * @module LightGizmo
 */

import { ActiveContext, ActiveType } from './ActiveContext';
import { ContentRotation } from './ContentRotation';
import { LightTarget } from './LightTarget';

/**
 * 操纵器操作模式枚举
 */
export enum GizmoMode {
  /** 支持移动和旋转 */
  moveAndRotate = 0,
  /** 仅支持移动 */
  onlyMove = 1,
  /** 仅支持旋转 */
  onlyRotate = 2
}

/**
 * 灯光操纵器配置接口
 */
export interface LightGizmoConfig {
  /** 是否启用目标点控制 */
  targetEnabled: boolean;
  /** 灯光类型 */
  type: HSCore.Model.LightTypeEnum;
  /** Z轴长度 */
  ZLength: number;
}

/**
 * 灯光操纵器类
 * 根据灯光类型提供不同的交互控制（移动/旋转）
 * @extends HSApp.View.Base.Gizmo
 */
export default class LightGizmo extends HSApp.View.Base.Gizmo {
  /**
   * 构造函数
   * @param context - 3D上下文
   * @param scene - 场景对象
   * @param config - 灯光配置
   * @param target - 可选的灯光目标对象
   */
  constructor(
    context: unknown,
    scene: unknown,
    config: LightGizmoConfig,
    target?: LightTarget | unknown
  );

  /**
   * 判断当前灯光类型是否支持旋转操作
   * @param config - 灯光配置对象
   * @returns 是否支持旋转（点光源和灯光子组不支持旋转）
   */
  supportRotation(config: LightGizmoConfig): boolean;
}

/**
 * HSCore 命名空间声明
 */
declare namespace HSCore.Model {
  /**
   * 灯光类型枚举
   */
  enum LightTypeEnum {
    PointLight = 'PointLight',
    DirectionalLight = 'DirectionalLight',
    SpotLight = 'SpotLight'
  }

  /**
   * 灯光子组类
   */
  class LightSubGroup {}
}

/**
 * HSApp 命名空间声明
 */
declare namespace HSApp.View {
  namespace Base {
    /**
     * 基础操纵器类
     */
    class Gizmo {
      protected context: unknown;
      
      constructor(context: unknown, scene: unknown, config: unknown);
      
      /**
       * 添加子操纵器组件
       * @param gizmo - 子操纵器实例
       */
      addChildGizmo(gizmo: unknown): void;
    }
  }

  namespace T3d {
    /**
     * 灯光目标点类
     */
    class LightTarget {}
  }
}