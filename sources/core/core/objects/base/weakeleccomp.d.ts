/**
 * 弱电组件模块
 * 提供弱电系统相关的组件功能
 */

import { ComponentTypeDump } from './component-type-dump';
import { TreeComp, TreeCompEnum } from './tree-comp';

/**
 * 组件转储数据接口
 */
interface ComponentDumpData {
  /** 组件类型 */
  tp: ComponentTypeDump;
}

/**
 * 弱电组件类
 * 用于处理建筑信息模型中的弱电系统组件
 * @extends TreeComp
 */
export class WeakElecComp extends TreeComp {
  /**
   * 组件类型常量
   * @static
   * @readonly
   */
  static readonly Type: TreeCompEnum = TreeCompEnum.WeakElec;

  /**
   * 引用对象
   * @private
   */
  private _referObject?: unknown;

  /**
   * 获取组件类型
   * @returns {TreeCompEnum} 弱电组件类型枚举值
   */
  get type(): TreeCompEnum {
    return WeakElecComp.Type;
  }

  /**
   * 转储组件数据
   * 将组件序列化为可存储的数据结构
   * @returns {ComponentDumpData} 组件转储数据对象
   */
  dump(): ComponentDumpData {
    return {
      tp: ComponentTypeDump.WeakElec
    };
  }

  /**
   * 从数据加载组件实例
   * @static
   * @param {ComponentDumpData} data - 组件数据
   * @param {unknown} referObject - 引用对象
   * @returns {WeakElecComp} 弱电组件实例
   */
  static load(data: ComponentDumpData, referObject: unknown): WeakElecComp {
    const component = new WeakElecComp();
    component._referObject = referObject;
    return component;
  }
}