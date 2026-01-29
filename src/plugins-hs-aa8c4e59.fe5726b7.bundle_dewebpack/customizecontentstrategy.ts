interface CustomizedProductsInfo {
  dModelIds?: string[][];
  libraryIds?: string[];
}

interface RoomData {
  customizedProducts_info?: CustomizedProductsInfo;
}

interface GetFlatEntityIdsParams {
  instanceId: string;
  room: RoomData;
}

interface FlatEntityResult {
  flatEntityIds: string[];
  reason?: string;
}

interface CustomizedProductPlugin {
  isVerifyLibraryId(libraryId: string): boolean;
}

interface PluginManager {
  getPlugin(pluginType: string): CustomizedProductPlugin;
}

interface App {
  pluginManager: PluginManager;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

interface HSFPConstants {
  PluginType: {
    CustomizedProducts: string;
  };
}

declare const HSApp: HSApp;
declare const HSFPConstants: HSFPConstants;

abstract class Strategy {
  abstract getFlatEntityIdsAndCategory(params: GetFlatEntityIdsParams): FlatEntityResult;
}

export class CustomizeContentStrategy extends Strategy {
  private readonly _customizedProductPlugin: CustomizedProductPlugin;

  constructor() {
    super();
    this._customizedProductPlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.CustomizedProducts
    );
  }

  /**
   * Get flat entity IDs and category from room data
   */
  getFlatEntityIdsAndCategory(params: GetFlatEntityIdsParams): FlatEntityResult {
    const { instanceId, room } = params;
    return this.getFlatEntityIdsByCustomizedProductsInfo(
      instanceId,
      room.customizedProducts_info
    );
  }

  /**
   * Extract flat entity IDs from customized products information
   */
  getFlatEntityIdsByCustomizedProductsInfo(
    instanceId: string,
    customizedProductsInfo?: CustomizedProductsInfo
  ): FlatEntityResult {
    const result: FlatEntityResult = {
      flatEntityIds: []
    };

    if (!customizedProductsInfo) {
      return result;
    }

    const dModelIds = customizedProductsInfo.dModelIds;

    if (dModelIds && dModelIds.length > 0) {
      const matchingGroup = dModelIds.find((group) =>
        group.some((id) => id === instanceId)
      );

      if (matchingGroup) {
        result.flatEntityIds.push(...matchingGroup);
      }
    }

    if (result.flatEntityIds.length > 0) {
      const libraryIds = customizedProductsInfo.libraryIds;
      const allLibraryIdsVerified =
        libraryIds &&
        libraryIds.length > 0 &&
        libraryIds.every((id) => this._customizedProductPlugin.isVerifyLibraryId(id));

      if (!allLibraryIdsVerified) {
        result.reason = "autostyler_no_selection_customized_products";
        result.flatEntityIds = [];
      }
    }

    return result;
  }
}