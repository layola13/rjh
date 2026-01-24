/**
 * DIY/定制产品添加命令模块
 * 用于在画布中添加来自灵感库的产品、定制产品和DIY产品
 */

import { Command } from 'HSApp/Cmd/Command';

/**
 * 添加产品的数据接口
 */
export interface AddProductsData {
  /** DIY代理数据列表 */
  diyProxyData: DiyProxyData[];
  /** 定制产品代理数据列表 */
  customizeProxyData: CustomizeProxyData[];
  /** 软模型数据列表（包含层级结构） */
  softModelData: SoftModelData[];
}

/**
 * DIY产品代理数据
 */
export interface DiyProxyData {
  /** DIY产品的唯一标识符 */
  id: string;
  /** 其他DIY相关属性 */
  [key: string]: unknown;
}

/**
 * 定制产品代理数据
 */
export interface CustomizeProxyData {
  /** 定制产品的唯一标识符 */
  id: string;
  /** 实体ID，用于映射关系 */
  entityId?: string;
  /** 其他定制产品相关属性 */
  [key: string]: unknown;
}

/**
 * 软模型数据（支持层级分组）
 */
export interface SoftModelData {
  /** 实体ID */
  entityId: string;
  /** 产品元数据 */
  meta?: ProductMeta;
  /** 位置信息 */
  position?: Vector3;
  /** 旋转信息 */
  rotation?: Quaternion;
  /** 缩放信息 */
  scale?: Vector3;
  /** 材质映射表 */
  materialMap?: Map<string, unknown>;
  /** 子成员（用于分组） */
  members?: SoftModelData[];
}

/**
 * 产品元数据
 */
export interface ProductMeta {
  /** 内容类型 */
  contentType?: string;
  /** 其他元数据属性 */
  [key: string]: unknown;
}

/**
 * 三维向量
 */
export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * 四元数（用于旋转）
 */
export interface Quaternion {
  x: number;
  y: number;
  z: number;
  w: number;
}

/**
 * 请求结果接口
 */
export interface RequestResult<T = unknown> {
  /** 请求执行结果 */
  result?: T;
}

/**
 * 添加产品命令类
 * 继承自Command基类，用于批量添加DIY产品、定制产品和普通产品到画布
 */
export declare class CmdAddProducts extends Command {
  /**
   * 内部存储的产品数据
   * @private
   */
  private _data: AddProductsData;

  /**
   * 构造函数
   * @param data - 包含所有待添加产品信息的数据对象
   */
  constructor(data: AddProductsData);

  /**
   * 命令执行入口
   * 取消所有选择，开启事务会话，添加产品并提交事务
   * @returns 添加的产品实体数组
   */
  onExecute(): unknown[];

  /**
   * 添加所有类型的产品
   * 按顺序处理：DIY产品 -> 定制产品 -> 软模型数据（含分组）
   * @returns 添加成功的产品实体数组
   */
  addProducts(): unknown[];

  /**
   * 添加分组内容
   * @param groupData - 分组数据
   * @param children - 分组的子元素数组
   * @returns 分组请求结果
   */
  addGroup(groupData: SoftModelData, children: unknown[]): RequestResult;

  /**
   * 批量添加DIY产品（版本2）
   * @param diyData - DIY产品数据数组
   * @returns DIY产品添加请求结果
   */
  addDiy2(diyData: DiyProxyData[]): RequestResult<unknown[]>;

  /**
   * 添加单个定制产品
   * @param customizeData - 定制产品数据
   * @returns 定制产品添加请求结果
   */
  addCustomizeProduct(customizeData: CustomizeProxyData): RequestResult;

  /**
   * 添加单个普通产品
   * @param productData - 产品数据，包含元数据、位置、旋转、缩放和材质映射
   * @returns 产品添加请求结果
   */
  addProduct(productData: SoftModelData): RequestResult;

  /**
   * 判断命令是否支持撤销/重做
   * @returns false - 此命令不支持撤销重做
   */
  canUndoRedo(): boolean;

  /**
   * 获取命令描述信息
   * @returns 命令的中文描述
   */
  getDescription(): string;

  /**
   * 获取命令所属的日志分类
   * @returns 内容操作日志类型
   */
  getCategory(): string;
}