/**
 * BOM (Bill of Materials) 控制模块的用户界面类
 * 提供BOM清单的筛选、导出等功能的UI交互
 */

import { HSApp, HSFPConstants, NWTK, adskUser } from './global';
import { Modal } from './modal';
import { BomDialogTitle, BomDialog } from './components';

/**
 * 模型类型枚举键
 */
export enum ModelKeysEnums {
  /** 公共模型 */
  COMMON = 'common',
  /** 企业模型 */
  ENTERPRISE = 'enterprise',
  /** 私有模型 */
  PRIVATE = 'private',
  /** 其他模型 */
  OTHERS = 'others'
}

/**
 * 分类类型枚举键
 */
export enum CategoryKeysEnums {
  /** 硬装 */
  HARD = 'hard',
  /** 材料 */
  MATERIAL = 'material',
  /** 背景墙 */
  BACKGROUNDWALL = 'backgroundwall',
  /** 门 */
  DOOR = 'door',
  /** 开口 */
  OPENING = 'opening',
  /** 其他 */
  OTHERS = 'others',
  /** 家具 */
  FURNITURE = 'furniture',
  /** 电器 */
  APPLIANCE = 'appliance'
}

/**
 * 模型筛选值类型
 */
export interface ModelFilterValues {
  [ModelKeysEnums.COMMON]?: boolean;
  [ModelKeysEnums.ENTERPRISE]?: boolean;
  [ModelKeysEnums.PRIVATE]?: boolean;
  [ModelKeysEnums.OTHERS]?: boolean;
}

/**
 * 分类筛选值类型
 */
export interface CategoryFilterValues {
  [CategoryKeysEnums.HARD]?: boolean;
  [CategoryKeysEnums.MATERIAL]?: boolean;
  [CategoryKeysEnums.BACKGROUNDWALL]?: boolean;
  [CategoryKeysEnums.DOOR]?: boolean;
  [CategoryKeysEnums.OPENING]?: boolean;
  [CategoryKeysEnums.OTHERS]?: boolean;
  [CategoryKeysEnums.FURNITURE]?: boolean;
  [CategoryKeysEnums.APPLIANCE]?: boolean;
}

/**
 * BOM导出参数
 */
export interface BomExportValues {
  /** 模型筛选值 */
  modelValues: ModelFilterValues;
  /** 分类筛选值 */
  categoryValues: CategoryFilterValues;
  /** 资源池ID（企业用户） */
  poolId?: string;
  /** 企业ID */
  enterpriseId?: string;
}

/**
 * UI配置属性
 */
export interface UIProps {
  // 根据实际需要定义配置项
  [key: string]: unknown;
}

/**
 * 用户权益检查结果
 */
export interface BenefitCheckResult {
  /** 是否可用 */
  useful: boolean;
}

/**
 * 企业模型列表结果
 */
export interface EnterpriseModelListResult {
  data?: {
    result?: Array<{
      poolId?: string;
    }>;
  };
}

/**
 * BOM控制UI类
 * 管理BOM清单对话框的显示、筛选和导出功能
 */
export declare class UI {
  /** 组件配置属性 */
  props: UIProps;
  
  /** 容器元素 */
  private _container: HTMLElement | undefined;
  
  /** 默认模型筛选值 */
  defaultModelValues: ModelFilterValues;
  
  /** 默认分类筛选值 */
  defaultCategoryValues: CategoryFilterValues;
  
  /** 企业资源池ID */
  poolId: string | undefined;
  
  /** 临时存储的筛选值 */
  private _tempValues: BomExportValues | null;
  
  /** 确认导出的回调函数 */
  private _handleOpen: ((values: BomExportValues) => void) | null;

  /**
   * 构造函数
   * @param props UI配置属性
   */
  constructor(props: UIProps);

  /**
   * 从本地存储获取筛选值
   * @param storageKey 存储键名
   * @returns 存储的筛选值
   */
  getStorageValues<T>(storageKey: string): T | undefined;

  /**
   * 将筛选值保存到本地存储
   * @param storageKey 存储键名
   * @param values 要保存的值
   */
  setStorageValues<T>(storageKey: string, values: T): void;

  /**
   * 筛选值变更事件处理
   * @param values 新的筛选值
   */
  onValuesChange(values: BomExportValues | null): void;

  /**
   * BOM对话框下一步状态检查
   * 检查用户是否有BOM导出权限
   * @returns 是否允许继续
   */
  onBomDialogNextState(): Promise<boolean>;

  /**
   * 确认按钮点击处理
   * 保存筛选条件并触发导出
   */
  handleOk(): void;

  /**
   * 处理用户升级
   * 显示营销弹窗引导用户升级权限
   */
  handleUpgrade(): void;

  /**
   * 加载企业资源池ID
   * 异步获取企业模型列表并提取poolId
   */
  loadPoolId(): void;

  /**
   * 显示BOM对话框
   * @param onOpenCallback 确认导出时的回调函数
   */
  show(onOpenCallback: (values: BomExportValues) => void): void;

  /**
   * 隐藏BOM对话框
   */
  hide(): void;

  /**
   * BOM操作日志记录
   * @param eventId 事件ID
   * @param eventName 事件名称
   */
  bomLogger(eventId: string, eventName: string): void;
}

/**
 * BOM模型筛选存储键
 */
export declare const BOM_MODEL_FILTER_STORAGE_KEY = "BOM_MODEL_FILTER_STORAGE_KEY";

/**
 * BOM分类筛选存储键
 */
export declare const BOM_CATEGORY_FILTER_STORAGE_KEY = "BOM_CATEGORY_FILTER_STORAGE_KEY";