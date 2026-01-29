import { Vector3 } from './Vector3';
import { HSCatalog } from './HSCatalog';
import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

interface Asset {
  meta?: {
    contentType: {
      isTypeOf(types: string | string[]): boolean;
    };
  };
  seekId: string;
  position: [number, number, number];
  recordData: {
    openingType?: string;
  };
}

interface SortedAssets {
  ncpBgWallAssets: Asset[];
  windowAssets: Asset[];
  doorAssets: Asset[];
}

declare const HSConstants: {
  Constants: {
    OpeningType: string;
    ParametricOpeningType: string;
  };
};

declare const HSFPConstants: {
  Constants: {
    PARAMETRIC_MODEL_DEFAULT_MOLDING_SEEKID: string;
  };
};

export class WFAAssetUtil {
  /**
   * Handle and sort assembly assets by type
   */
  static async handleAssemblyAssets(assets: Asset[]): Promise<SortedAssets> {
    const windowAssets: Asset[] = [];
    const doorAssets: Asset[] = [];
    const ncpBgWallAssets: Asset[] = [];
    
    const backgroundWallTypes = [
      HSCatalog.ContentTypeEnum.BackgroundWallUnit,
      HSCatalog.ContentTypeEnum.BackgroundWallSubpart,
      HSCatalog.ContentTypeEnum.SmartCustomizedBackgroundWall,
      HSCatalog.ContentTypeEnum.ParamBackgroundWall
    ];

    assets.forEach((asset) => {
      if (!asset.meta) return;

      if (
        asset.meta.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_window) ||
        HSCore.Util.Content.isParametricWindow(asset.meta)
      ) {
        windowAssets.push(asset);
      } else if (asset.meta.contentType.isTypeOf(backgroundWallTypes)) {
        ncpBgWallAssets.push(asset);
      } else if (
        asset.meta.contentType.isTypeOf([
          HSCatalog.ContentTypeEnum.Door,
          HSCatalog.ContentTypeEnum.PODoor
        ])
      ) {
        doorAssets.push(asset);
      }
    });

    const categorizedAssets: SortedAssets = {
      ncpBgWallAssets,
      windowAssets,
      doorAssets
    };

    await this._preloadAssetsMeta(categorizedAssets);
    return this._sortAssets(categorizedAssets);
  }

  /**
   * Preload metadata for all categorized assets
   */
  private static async _preloadAssetsMeta(assets: SortedAssets): Promise<boolean> {
    const { ncpBgWallAssets, windowAssets, doorAssets } = assets;
    const metaPromises: Promise<unknown>[] = ncpBgWallAssets.map((asset) =>
      HSApp.Util.NCustomizedFeatureModel.loadMetaRecursively(asset.seekId)
    );

    const processBackgroundWallAsset = (asset: Asset): void => {
      const seekIds = HSCore.Model.NCPBackgroundWallBaseDecorator.getRecordSeekIdsByRecordData(
        asset.recordData
      );
      seekIds.forEach((seekId: string) => {
        const productPromise = HSApp.App.getApp().catalogManager.getProductBySeekId(seekId);
        metaPromises.push(productPromise);
      });
    };

    const processOpeningAsset = (asset: Asset): void => {
      let seekIds: string[] = [];

      if (asset.recordData.openingType === HSConstants.Constants.OpeningType) {
        seekIds = HSCore.Model.OpeningDecorator.getAllSeekIds(asset.recordData);
      } else if (asset.recordData.openingType === HSConstants.Constants.ParametricOpeningType) {
        seekIds = HSCore.Model.PODecorator.getAllSeekIds(asset.recordData);
        metaPromises.push(HSCore.Model.ParametricOpening.preFetchDependentMeta(asset.meta));
      }

      seekIds.forEach((seekId: string) => {
        const productPromise = HSApp.App.getApp().catalogManager.getProductBySeekId(seekId);
        metaPromises.push(productPromise);
      });
    };

    ncpBgWallAssets.forEach(processBackgroundWallAsset);
    doorAssets.forEach(processOpeningAsset);
    windowAssets.forEach(processOpeningAsset);

    if (!HSCore.Model.NCustomizedParametricModel.defaultMoldingMeta) {
      const moldingMeta = await HSApp.App.getApp().catalogManager.getProductBySeekId(
        HSFPConstants.Constants.PARAMETRIC_MODEL_DEFAULT_MOLDING_SEEKID
      );
      HSCore.Model.NCustomizedParametricCeiling.cacheMoldingMeta(moldingMeta);
    }

    await Promise.all(metaPromises);
    return true;
  }

  /**
   * Sort assets by distance from origin
   */
  private static _sortAssets(assets: SortedAssets): SortedAssets {
    const origin = Vector3.readonlyO();
    const { ncpBgWallAssets, windowAssets, doorAssets } = assets;

    const compareByDistance = (assetA: Asset, assetB: Asset): number => {
      const distanceA = new Vector3(assetA.position).distanceTo(origin);
      const distanceB = new Vector3(assetB.position).distanceTo(origin);
      return distanceA - distanceB;
    };

    windowAssets.sort(compareByDistance);
    doorAssets.sort(compareByDistance);

    return {
      ncpBgWallAssets,
      windowAssets,
      doorAssets
    };
  }
}