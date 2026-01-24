/**
 * 定制内容策略类
 * 用于处理定制产品相关的实体ID获取逻辑
 */

import { Strategy } from './Strategy';

/**
 * 定制产品插件接口
 */
interface ICustomizedProductPlugin {
  /**
   * 验证库ID是否有效
   * @param libraryId - 库ID
   * @returns 验证结果
   */
  isVerifyLibraryId(libraryId: string): boolean;
}

/**
 * 插件管理器接口
 */
interface IPluginManager {
  /**
   * 获取指定类型的插件
   * @param pluginType - 插件类型
   * @returns 定制产品插件实例
   */
  getPlugin(pluginType: string): ICustomizedProductPlugin;
}

/**
 * 应用实例接口
 */
interface IApp {
  pluginManager: IPluginManager;
}

/**
 * 全局HSApp接口
 */
declare global {
  const HSApp: {
    App: {
      getApp(): IApp;
    };
  };
  const HSFPConstants: {
    PluginType: {
      CustomizedProducts: string;
    };
  };
}

/**
 * 定制产品信息接口
 */
interface ICustomizedProductsInfo {
  /** 3D模型ID数组的数组 */
  dModelIds?: string[][];
  /** 库ID数组 */
  libraryIds?: string[];
}

/**
 * 房间接口
 */
interface IRoom {
  /** 定制产品信息 */
  customizedProducts_info?: ICustomizedProductsInfo;
}

/**
 * 获取实体ID的参数接口
 */
interface IGetEntityIdsParams {
  /** 实例ID */
  instanceId: string;
  /** 房间对象 */
  room: IRoom;
}

/**
 * 实体ID和分类结果接口
 */
interface IFlatEntityResult {
  /** 扁平化的实体ID数组 */
  flatEntityIds: string[];
  /** 未选择原因（可选） */
  reason?: string;
}

/**
 * 定制内容策略类
 * 继承自基础策略类，用于处理定制产品的实体ID获取
 */
export class CustomizeContentStrategy extends Strategy {
  /** 定制产品插件实例 */
  private readonly _customizedProductPlugin: ICustomizedProductPlugin;

  /**
   * 构造函数
   * 初始化定制产品插件
   */
  constructor() {
    super();
    this._customizedProductPlugin = HSApp.App.getApp()
      .pluginManager
      .getPlugin(HSFPConstants.PluginType.CustomizedProducts);
  }

  /**
   * 获取扁平化的实体ID和分类
   * @param params - 包含实例ID和房间信息的参数对象
   * @returns 实体ID结果对象
   */
  public getFlatEntityIdsAndCategory(params: IGetEntityIdsParams): IFlatEntityResult {
    const { instanceId, room } = params;
    return this.getFlatEntityIdsByCustomizedProductsInfo(
      instanceId,
      room.customizedProducts_info
    );
  }

  /**
   * 根据定制产品信息获取扁平化的实体ID
   * @param instanceId - 实例ID
   * @param customizedProductsInfo - 定制产品信息对象
   * @returns 实体ID结果对象
   */
  public getFlatEntityIdsByCustomizedProductsInfo(
    instanceId: string,
    customizedProductsInfo?: ICustomizedProductsInfo
  ): IFlatEntityResult {
    const result: IFlatEntityResult = {
      flatEntityIds: []
    };

    // 如果没有定制产品信息，直接返回空结果
    if (!customizedProductsInfo) {
      return result;
    }

    const { dModelIds, libraryIds } = customizedProductsInfo;

    // 处理3D模型ID
    if (dModelIds && dModelIds.length > 0) {
      // 查找包含当前实例ID的模型ID组
      const matchedGroup = dModelIds.find(group =>
        group.some(id => id === instanceId)
      );

      if (matchedGroup) {
        result.flatEntityIds.push(...matchedGroup);
      }
    }

    // 验证库ID
    if (result.flatEntityIds.length > 0) {
      const hasValidLibraries =
        libraryIds &&
        libraryIds.length > 0 &&
        libraryIds.every(libraryId =>
          this._customizedProductPlugin.isVerifyLibraryId(libraryId)
        );

      // 如果库ID验证失败，清空结果并设置原因
      if (!hasValidLibraries) {
        result.reason = 'autostyler_no_selection_customized_products';
        result.flatEntityIds.length = 0;
      }
    }

    return result;
  }
}