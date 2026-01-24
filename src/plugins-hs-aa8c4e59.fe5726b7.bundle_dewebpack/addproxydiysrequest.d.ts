/**
 * 添加代理DIY数据的请求类
 * 用于处理自定义重复数据的提交、撤销和重做操作
 */

import { HSCore } from './HSCore';

/**
 * 自定义重复数据接口
 */
interface CustomDuplicateData {
  /** 代理对象ID */
  proxyId: string | number;
  /** 其他重复数据属性 */
  [key: string]: unknown;
}

/**
 * 文档管理器接口
 */
interface DocumentManager {
  /** 当前活动文档 */
  activeDocument: {
    scene: {
      /** 获取自定义参数 */
      getCustomizedPms(): unknown[];
    };
  };
}

/**
 * 实体代理对象接口
 */
interface EntityProxy {
  /**
   * 从重复数据加载
   * @param data - 重复数据
   * @returns 加载后的模型对象
   */
  loadFromDuplicateData(data: CustomDuplicateData): ModelObject | null;
}

/**
 * 模型对象接口
 */
interface ModelObject {
  /** WebCAD文档数据 */
  webCADDocument: unknown;
  /** 建模文档ID */
  modelingDocId: string | number;
  /**
   * 获取唯一父级
   * @returns 父级模型对象
   */
  getUniqueParent(): ModelObject | undefined;
  /**
   * 打开DIY文档
   * @param refresh - 是否刷新
   */
  openDiyDocument(refresh: boolean): Promise<void>;
}

/**
 * 添加代理DIY数据请求类
 * 继承自状态请求基类，用于管理自定义数据的生命周期
 */
export declare class AddProxyDiysRequest extends HSCore.Transaction.Common.StateRequest {
  /** 根模型对象 */
  rootModel?: ModelObject;
  
  /** 自定义重复数据集合 */
  customDuplicateDatas: CustomDuplicateData[];
  
  /** 操作前的文档状态 */
  docBefore?: unknown;
  
  /** 操作后的文档状态 */
  docAfter?: unknown;

  /**
   * 构造函数
   * @param customDuplicateDatas - 自定义重复数据数组
   */
  constructor(customDuplicateDatas: CustomDuplicateData[]);

  /**
   * 提交操作
   * 创建并返回内容
   * @returns 创建的模型对象数组
   */
  onCommit(): ModelObject[];

  /**
   * 创建内容
   * 从重复数据中加载并创建代理对象
   * @returns 创建的模型对象数组
   */
  createContent(): ModelObject[];

  /**
   * 撤销操作
   * 恢复到操作前的文档状态
   */
  onUndo(): Promise<void>;

  /**
   * 重做操作
   * 恢复到操作后的文档状态
   */
  onRedo(): Promise<void>;
}