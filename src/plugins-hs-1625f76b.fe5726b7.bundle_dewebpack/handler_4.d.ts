/**
 * 佣金处理器模块
 * 负责跟踪和计算设计方案中模型和材质的佣金信息
 */

import { HSCore } from 'hscore';
import { HSApp } from 'hsapp';
import { HSFPConstants } from 'hsfp-constants';
import { CommissionBar } from './CommissionBar';
import { Util } from './util';
import { isHXRR } from './env-utils';

/**
 * 商品佣金数据
 */
interface CommissionItemData {
  /** 佣金金额 */
  rebate: number;
  /** 商品数量 */
  count: number;
}

/**
 * 佣金更新事件数据
 */
interface CommissionUpdateData {
  /** 有佣金的商品总数 */
  count: number;
  /** 佣金总金额 */
  amount: string;
  /** 是否显示佣金栏 */
  isShowCommission: boolean;
  /** 提示状态码 */
  tooltipStatus: number;
  /** 当前店铺名称 */
  storeName: string;
  /** 绑定的店铺名称 */
  bindStoreName: string;
}

/**
 * 用户佣金状态信息
 */
interface UserCommissionStatusData {
  /** 是否已加入佣金计划 */
  isJoined: boolean;
  /** 是否关联店铺 */
  isRelated: boolean;
  /** 是否同一店铺 */
  isSame: boolean;
  /** 店铺名称 */
  storeName?: string;
}

/**
 * 商品佣金响应数据
 */
interface GoodsRebateResponse {
  ret: string[];
  data?: {
    items?: Array<{
      modelId: string;
      maxRebate: number;
    }>;
  };
}

/**
 * 命令完成事件数据
 */
interface CommandEvent {
  data: {
    cmd: {
      type: string;
      output?: any;
      selected?: any[];
    };
  };
}

/**
 * 环境激活事件数据
 */
interface EnvironmentEvent {
  data: {
    oldEnvironmentId: string;
  };
}

/**
 * 设置值变更事件数据
 */
interface SettingValueChangedEvent {
  data: {
    fieldName: string;
    value: boolean;
  };
}

/**
 * 请求事件数据
 */
interface RequestEvent {
  data: {
    request: {
      type: string;
      result?: any;
      subRequests?: SubRequest[];
      oldContent?: { metadata?: { id?: string; seekId?: string } };
      newEntity?: { metadata?: { id?: string } };
    };
  };
}

/**
 * 子请求数据
 */
interface SubRequest {
  type: string;
  result?: {
    metadata?: {
      seekId?: string;
    };
  };
}

/**
 * 添加商品的请求类型列表
 */
const ADD_PRODUCT_REQUEST_TYPES = [
  HSFPConstants.RequestType.AddProduct,
  HSFPConstants.RequestType.PasteContent,
];

/**
 * 删除商品的请求类型列表
 */
const DELETE_PRODUCT_REQUEST_TYPES = [
  HSFPConstants.RequestType.DeleteContent,
  HSFPConstants.RequestType.DeleteProduct,
];

/**
 * 模型相关的命令类型列表
 */
const MODEL_COMMAND_TYPES = [
  HSFPConstants.CommandType.PlaceProduct,
  HSFPConstants.CommandType.DuplicateSequence,
  HSFPConstants.CommandType.PasteSequence,
  HSFPConstants.CommandType.DeleteSelection,
];

/**
 * 材质相关的命令类型列表
 */
const MATERIAL_COMMAND_TYPES = [
  HSFPConstants.CommandType.EditMaterial,
  HSFPConstants.CommandType.Decoration,
  HSFPConstants.CommandType.MixPaint.MixDecoration,
  HSFPConstants.CommandType.MixPaint.ApplyMixPaintPlanToFaces,
  HSFPConstants.CommandType.MixPaint.PickMaterialToFaces,
  HSFPConstants.CommandType.DeleteCustomizedPMInstanceModel,
  HSFPConstants.CommandType.CopyCustomizedPMInstanceModel,
  HSFPConstants.PluginType.MaterialBrush,
];

/**
 * 清空相关的命令类型列表
 */
const CLEAR_COMMAND_TYPES = [
  HSFPConstants.CommandType.CmdClearFurniture,
  HSFPConstants.CommandType.CmdClearHardDecorations,
  HSFPConstants.CommandType.CmdClearDecorations,
  HSFPConstants.CommandType.CmdClearView,
];

/**
 * 推荐相关的命令类型列表
 */
const RECOMMEND_COMMAND_TYPES = [
  HSFPConstants.CommandType.CmdAddRecommendAccessories,
  HSFPConstants.CommandType.AddRecommendContents,
];

/**
 * 佣金处理器
 * 管理设计方案中模型和材质的佣金跟踪、计算和显示
 */
export class Handler {
  private _signalHook: HSCore.Util.SignalHook;
  private _app: HSApp.Application;
  private cmdMgr: HSApp.CommandManager;
  private userSettingLocalStorage: HSApp.Util.Storage;
  private commissionBar: CommissionBar;

  /** 佣金更新信号 */
  public signalUpdateCommission: HSCore.Util.Signal<CommissionUpdateData>;

  /** 是否显示佣金信息 */
  public isShowCommission: boolean;

  /** 模型佣金数据映射表 (模型ID -> 佣金数据) */
  public modelData: Map<string, CommissionItemData>;

  /** 材质佣金数据映射表 (材质ID -> 佣金数据) */
  public materialData: Map<string, CommissionItemData>;

  /** 佣金数据缓存字典 (商品ID -> 佣金金额) */
  public cacheDict: Map<string, number>;

  /** 是否显示佣金信息提示 */
  public isShowCommissionInfo: boolean;

  /**
   * 用户佣金状态
   * 0: 未验证淘宝账号
   * 1: 已验证但未绑定
   * 2: (保留状态)
   * 3: 未加入佣金计划
   * 4: 加入但未关联店铺
   * 5: 关联但非同一店铺
   */
  public userCommissionStatus: number;

  /** 当前用户的店铺名称 */
  public currentStoreName: string;

  /** 绑定的店铺名称 */
  public bindStoreName: string;

  constructor() {
    this.userSettingLocalStorage = new HSApp.Util.Storage(HSFPConstants.PluginType.UserSetting);
    this._signalHook = new HSCore.Util.SignalHook(this);
    this.signalUpdateCommission = new HSCore.Util.Signal<CommissionUpdateData>();
    this.isShowCommission = false;
    this.modelData = new Map();
    this.materialData = new Map();
    this.cacheDict = new Map();
    this.isShowCommissionInfo = false;
    this.userCommissionStatus = 0;
    this.currentStoreName = '';
    this.bindStoreName = '';
    this.commissionBar = new CommissionBar();
  }

  /**
   * 初始化处理器
   * @param options - 初始化选项
   */
  public init(options: { app: HSApp.Application }): void;

  /**
   * 清理资源，解除所有事件监听
   */
  public cleanup(): void;

  /**
   * 设置佣金栏显示状态
   * @param visible - 是否显示
   */
  public setShowCommissionBar(visible: boolean): void;

  /**
   * 获取佣金更新信号
   * @returns 佣金更新信号对象
   */
  public getUpdateCommissionSignal(): HSCore.Util.Signal<CommissionUpdateData>;

  /**
   * 获取所有有佣金的商品ID列表
   * @returns 商品ID数组
   */
  public getCommissionId(): string[];

  /**
   * 获取当前店铺名称
   * @returns 店铺名称
   */
  public getCurrentStoreName(): string;

  /**
   * 判断是否为EA佣金模式
   * @returns 是否为EA佣金模式
   */
  public isEACommission(): boolean;

  /**
   * 绑定信号钩子监听器
   * @private
   */
  private _bindSignalHook(): void;

  /**
   * 处理权限检查完成事件
   * @private
   */
  private _handleCheckPermission(): void;

  /**
   * 清空佣金数据
   * @private
   */
  private _clearCommissionData(): void;

  /**
   * 获取佣金数据（模型+材质）
   * @private
   */
  private _getCommissionData(): void;

  /**
   * 获取模型佣金数据
   * @private
   */
  private _getModelData(): void;

  /**
   * 获取材质佣金数据
   * @private
   */
  private _getMaterialData(): void;

  /**
   * 获取场景中所有材质ID集合
   * @returns 材质ID集合
   * @private
   */
  private _getMaterialIdSet(): Set<string>;

  /**
   * 从服务器获取商品佣金信息
   * @param type - 商品类型 ('model' | 'material')
   * @param idList - 商品ID列表
   * @private
   */
  private _getGoodsRebate(type: 'model' | 'material', idList: string[]): Promise<void>;

  /**
   * 获取用户佣金状态
   * @private
   */
  private _getUserCommissionStatus(): void;

  /**
   * 设置当前店铺名称
   * @private
   */
  private _setCurrentStoreName(): void;

  /**
   * 获取提示状态码
   * @param count - 商品数量
   * @returns 状态码
   * @private
   */
  private _getTooltipStatus(count: number): number;

  /**
   * 更新并广播佣金数据
   * @private
   */
  private _updateCommissionData(): void;

  /**
   * 更新模型佣金数据
   * @param action - 操作类型 ('update' | 'delete')
   * @param modelId - 模型ID
   * @param data - 佣金数据
   * @private
   */
  private _updateModelData(action: 'update' | 'delete', modelId: string, data?: CommissionItemData): void;

  /**
   * 更新材质佣金数据
   * @param action - 操作类型 ('update' | 'delete')
   * @param materialId - 材质ID
   * @param data - 佣金数据
   * @private
   */
  private _updateMaterialData(action: 'update' | 'delete', materialId: string, data?: CommissionItemData): void;

  /**
   * 删除模型佣金记录
   * @param modelId - 模型ID
   * @private
   */
  private _delModel(modelId: string): void;

  /**
   * 添加模型佣金记录
   * @param modelId - 模型ID
   * @private
   */
  private _addModel(modelId: string): void;

  /**
   * 添加材质佣金记录
   * @param materialId - 材质ID
   * @private
   */
  private _addMaterial(materialId: string): void;

  /**
   * 命令完成事件处理器
   * @param event - 命令事件
   * @private
   */
  private _onCmdComplete(event: CommandEvent): void;

  /**
   * 环境激活事件处理器
   * @param event - 环境事件
   * @private
   */
  private _onEnvActivated(event: EnvironmentEvent): void;

  /**
   * 文档打开事件处理器
   * @private
   */
  private _onDocumentOpened(): void;

  /**
   * 设置值变更事件处理器
   * @param event - 设置变更事件
   * @private
   */
  private _onSettingValueChanged(event: SettingValueChangedEvent): void;

  /**
   * 撤销操作事件处理器
   * @param event - 请求事件
   * @private
   */
  private _handleUndoInCommand(event: RequestEvent): void;

  /**
   * 重做操作事件处理器
   * @param event - 请求事件
   * @private
   */
  private _handleRedoInCommand(event: RequestEvent): void;

  /**
   * 请求提交事件处理器
   * @param event - 请求事件
   * @private
   */
  private _onRequestCommitted(event: RequestEvent): void;

  /**
   * 获取有佣金的模型总数
   * @returns 模型数量
   * @private
   */
  private _getModelCount(): number;

  /**
   * 获取有佣金的材质总数
   * @returns 材质数量
   * @private
   */
  private _getMaterialCount(): number;

  /**
   * 计算有佣金的商品总数
   * @returns 商品总数
   * @private
   */
  private _calcCommissionCount(): number;

  /**
   * 获取模型佣金总金额
   * @returns 佣金总金额
   * @private
   */
  private _getModelAmount(): number;

  /**
   * 获取材质佣金总金额
   * @returns 佣金总金额
   * @private
   */
  private _getMaterialAmount(): number;

  /**
   * 计算佣金总金额
   * @returns 佣金总金额（保留两位小数）
   * @private
   */
  private _calcCommissionAmount(): string;
}