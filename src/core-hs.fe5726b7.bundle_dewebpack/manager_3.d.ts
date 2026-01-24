/**
 * 参数化模型管理器
 * 负责注册和创建各种类型的参数化模型实例
 */

import { ExtrudedBody } from './ExtrudedBody';
import { WindowWall } from './WindowWall';
import { WindowFrame } from './WindowFrame';
import { WindowSill } from './WindowSill';
import { WindowCeiling } from './WindowCeiling';
import { WindowHole } from './WindowHole';
import { WindowPocket } from './WindowPocket';
import { ParametricModelType } from './ParametricModelType';

/**
 * 参数化模型参数接口
 */
export interface ParametricModelParameters {
  /** 模型类型 */
  type: ParametricModelType;
  /** 其他参数 */
  [key: string]: unknown;
}

/**
 * 参数化模型基类接口
 */
export interface IParametricModel {
  /**
   * 根据参数初始化模型
   * @param parameters - 模型参数
   */
  initByParameters(parameters: ParametricModelParameters): void;
}

/**
 * 参数化模型构造函数类型
 */
type ParametricModelCreator<T extends IParametricModel = IParametricModel> = new (
  context?: unknown
) => T;

/**
 * 参数化模型管理器
 * 使用单例模式管理模型创建器的注册和模型实例的创建
 */
export class Manager {
  /** 单例实例 */
  private static _instance?: Manager;

  /** 模型创建器映射表 */
  private readonly _creators: Map<ParametricModelType, ParametricModelCreator>;

  constructor() {
    this._creators = new Map<ParametricModelType, ParametricModelCreator>();
  }

  /**
   * 获取管理器单例实例
   * @returns Manager实例
   */
  static instance(): Manager {
    if (!Manager._instance) {
      Manager._instance = new Manager();
    }
    return Manager._instance;
  }

  /**
   * 注册参数化模型创建器
   * @param type - 模型类型
   * @param creator - 模型构造函数
   */
  registerCreator(
    type: ParametricModelType,
    creator: ParametricModelCreator
  ): void {
    this._creators.set(type, creator);
  }

  /**
   * 根据参数创建参数化模型实例
   * @param parameters - 模型参数，必须包含type字段
   * @param context - 可选的上下文对象
   * @returns 创建的模型实例，如果参数无效或类型未注册则返回null
   */
  createParametricModel(
    parameters: ParametricModelParameters,
    context?: unknown
  ): IParametricModel | null {
    if (!parameters?.type) {
      return null;
    }

    const creator = this._creators.get(parameters.type);
    if (!creator) {
      return null;
    }

    const modelInstance = new creator(context);
    modelInstance.initByParameters(parameters);
    return modelInstance;
  }
}

// 注册内置参数化模型创建器
Manager.instance().registerCreator(
  ParametricModelType.extrudedBody,
  ExtrudedBody
);
Manager.instance().registerCreator(
  ParametricModelType.windowWall,
  WindowWall
);
Manager.instance().registerCreator(
  ParametricModelType.windowFrame,
  WindowFrame
);
Manager.instance().registerCreator(
  ParametricModelType.windowSill,
  WindowSill
);
Manager.instance().registerCreator(
  ParametricModelType.windowCeiling,
  WindowCeiling
);
Manager.instance().registerCreator(
  ParametricModelType.windowHole,
  WindowHole
);
Manager.instance().registerCreator(
  ParametricModelType.windowPocket,
  WindowPocket
);