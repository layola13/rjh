/**
 * 3D盒子模型的类型定义
 * 用于表示具有XYZ三维尺寸的盒子几何对象
 */

import { PModel, PModel_IO } from './PModel';
import { Material } from './Material';
import { State } from './State';
import { Entity } from './Entity';

/**
 * 序列化状态接口
 */
interface SerializedState {
  readonly id: string;
  XLength: string;
  YLength: string;
  ZLength: string;
  [key: string]: unknown;
}

/**
 * 加载上下文接口
 * 用于反序列化时传递状态映射
 */
interface LoadContext {
  /** 状态ID到State对象的映射 */
  readonly states: Record<string, State | undefined>;
}

/**
 * dump回调函数类型
 */
type DumpCallback = (result: [SerializedState, ...unknown[]], source: PBox) => void;

/**
 * PBox的序列化/反序列化处理器
 * 继承自PModel_IO，负责PBox对象的持久化操作
 */
export declare class PBox_IO extends PModel_IO {
  /**
   * 将PBox对象序列化为可存储的状态对象
   * @param entity - 要序列化的PBox实例
   * @param callback - 可选的序列化后回调函数
   * @param includeChildren - 是否包含子对象，默认true
   * @param options - 额外的序列化选项
   * @returns 序列化后的状态数组，第一个元素为主要状态对象
   */
  dump(
    entity: PBox,
    callback?: DumpCallback,
    includeChildren?: boolean,
    options?: Record<string, unknown>
  ): [SerializedState, ...unknown[]];

  /**
   * 从序列化状态加载PBox对象
   * @param entity - 要填充数据的PBox实例
   * @param state - 序列化的状态对象
   * @param context - 加载上下文，包含状态映射
   */
  load(
    entity: PBox,
    state: SerializedState,
    context: LoadContext
  ): void;

  /**
   * 获取单例实例
   * @returns PBox_IO的单例实例
   */
  static instance(): PBox_IO;
}

/**
 * PBox创建参数接口
 * 用于从配置创建PBox实例
 */
interface PBoxCreateParams {
  /** 本地唯一标识符 */
  readonly localId: string;
  /** 材质配置 */
  readonly material: unknown;
  /** 几何参数 */
  readonly parameters?: {
    /** X轴位置，默认0 */
    readonly x?: number | null;
    /** Y轴位置，默认0 */
    readonly y?: number | null;
    /** Z轴位置，默认0 */
    readonly z?: number | null;
    /** X轴长度，默认0 */
    readonly XLength?: number | null;
    /** Y轴长度，默认0 */
    readonly YLength?: number | null;
    /** Z轴长度，默认0 */
    readonly ZLength?: number | null;
  };
}

/**
 * 状态遍历回调函数类型
 */
type StateIterator = (state: State) => void;

/**
 * 3D盒子模型类
 * 表示具有三维尺寸(XLength, YLength, ZLength)的盒子几何体
 * 继承自PModel，支持材质、变换和房间/循环检测
 */
export declare class PBox extends PModel {
  /** X轴长度的状态对象（私有） */
  private __XLength: State<number>;
  /** Y轴长度的状态对象（私有） */
  private __YLength: State<number>;
  /** Z轴长度的状态对象（私有） */
  private __ZLength: State<number>;

  /** X轴位置的状态对象（继承自PModel） */
  protected __x: State<number>;
  /** Y轴位置的状态对象（继承自PModel） */
  protected __y: State<number>;
  /** Z轴位置的状态对象（继承自PModel） */
  protected __z: State<number>;

  /** 标签/名称（继承自PModel） */
  readonly tag: string;
  /** 材质属性（继承自PModel） */
  material: Material;

  /**
   * 构造函数
   * @param name - 模型名称，默认为空字符串
   * @param parent - 父对象，默认undefined
   */
  constructor(name?: string, parent?: PModel | undefined);

  /**
   * 从配置参数创建PBox实例（工厂方法）
   * @param params - 创建参数对象
   * @returns 新创建的PBox实例
   */
  static create(params: PBoxCreateParams): PBox;

  /**
   * 遍历所有状态字段
   * @param iterator - 对每个State对象调用的回调函数
   */
  forEachState(iterator: StateIterator): void;

  /**
   * 克隆当前PBox对象
   * @returns 当前对象的深拷贝
   */
  clone(): PBox;

  /**
   * 验证对象状态的有效性
   * 检查XLength、YLength、ZLength是否有效
   * @returns 验证通过返回true，否则返回false并记录错误
   */
  verify(): boolean;

  /**
   * 获取IO处理器实例
   * @returns 用于序列化/反序列化的PBox_IO实例
   */
  getIO(): PBox_IO;

  /**
   * 检查内容是否在指定房间内
   * @param room - 要检查的房间对象
   * @param recursive - 是否递归检查子对象，默认false
   * @returns 内容在房间内返回true
   */
  isContentInRoom(room: unknown, recursive?: boolean): boolean;

  /**
   * 检查内容是否在指定循环内
   * @param loop - 要检查的循环对象
   * @param recursive - 是否递归检查子对象，默认false
   * @returns 内容在循环内返回true
   */
  isContentInLoop(loop: unknown, recursive?: boolean): boolean;

  /**
   * 刷新内部边界缓存
   * @internal
   */
  protected refreshBoundInternal(): void;

  /**
   * 字段变更事件处理器
   * 当XLength/YLength/ZLength变化时触发几何更新
   * @param fieldName - 变更的字段名
   * @param oldValue - 旧值
   * @param newValue - 新值
   */
  protected onFieldChanged(
    fieldName: string,
    oldValue: unknown,
    newValue: unknown
  ): void;

  /**
   * 获取唯一父对象
   * @returns 父对象实例
   */
  protected getUniqueParent(): PModel;

  /**
   * 标记对象为脏状态（需要更新）
   */
  protected dirty(): void;

  /** 几何变更信号（继承自PModel） */
  readonly signalGeometryChanged: {
    dispatch(): void;
  };
}

/**
 * 全局Entity类注册
 * 将PBox类注册到HSConstants.ModelClass.NgPBox标识符下
 */
declare namespace Entity {
  function registerClass(modelClass: string, constructor: typeof PBox): void;
}

/**
 * 全局常量命名空间
 */
declare namespace HSConstants {
  namespace ModelClass {
    const NgPBox: string;
  }
}

/**
 * 全局文档管理器
 */
declare namespace HSCore {
  namespace Doc {
    function getDocManager(): {
      readonly activeDocument: {
        createContext(): LoadContext;
      };
    };
  }
}

/**
 * 全局日志对象
 */
declare const log: {
  error(message: string, category: string, showToUser: boolean): void;
};