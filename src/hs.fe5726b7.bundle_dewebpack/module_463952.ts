interface SaleInfo {
  [key: string]: unknown;
}

interface TrackEventParams {
  designID?: string;
  env?: string;
  IF_env?: string;
  uid?: string;
  timestamp?: number;
  pid?: string;
  pageNum?: number;
  pos?: number;
  searchContext?: string;
  tid?: string;
  requestId?: string;
  traceIds?: string[];
  payIndexFlag?: boolean;
  saleInfo?: SaleInfo;
  GUID?: string;
  [key: string]: unknown;
}

interface UseModelParams {
  text?: string;
  imageSearch?: boolean;
  treeId?: string;
  modelId?: string;
  searchStatus?: string;
}

interface ModelEventData {
  id: string;
  page: number;
  index: number;
  contentType?: {
    isTypeOf: (type: string) => boolean;
  };
  requestId?: string;
  traceIds?: string[];
  payIndexFlag?: boolean;
  saleInfo?: SaleInfo;
}

interface CatalogLogData {
  logType?: string;
  targetType?: string;
  id?: string;
  pageNum?: number;
  pos?: number;
  searchStatus?: string;
  traceIds?: string[];
  payIndexFlag?: boolean;
  saleInfo?: SaleInfo;
  subMenuData?: unknown;
  categoryId?: string;
  name?: string;
  selectedPath?: string;
  searchType?: string;
  [key: string]: unknown;
}

interface SignalDispatchData {
  argInfo: Record<string, unknown>;
  [key: string]: unknown;
}

enum CatalogEventEnum {
  eClickCommiss = "click_more_commission_button",
  eHoverCommiss = "hover_commission_tag",
  eUseModel = "catalog_darg_product_event",
  eSearch = "catalog_search_event",
  eFilter = "catalog_filter_event",
  eSearchBox = "leftPanel_searchBtn_search_event",
  eHint = "search_suggestion_hint_event",
  imageSearch = "catalog_search_by_image_event",
  imageReframe = "image_search_reframe_event",
  imageCateSearch = "image_search_event",
  sortNew = "catalog_sort_name_create_event",
  sortDefault = "catalog_sort_name_default_event",
  catalogLargeView = "catalog_large_view_event"
}

class CatalogTracker {
  private static instance?: CatalogTracker;
  public static eventEnum = CatalogEventEnum;
  private cacheLogData: Record<string, unknown> = {};

  public static getInstance(): CatalogTracker {
    if (!this.instance) {
      this.instance = new CatalogTracker();
    }
    return this.instance;
  }

  public catalogLibTrack(
    eventName: string,
    params: TrackEventParams = {},
    eventGroup?: string
  ): void {
    const app = HSApp.App.getApp();
    const designId = app.designMetadata.get("designId");
    const queryEnv = HSApp.Util.Url.getQueryStrings().env;
    const env = queryEnv || "shejijia";
    const activeEnvId = app.activeEnvironmentId;

    Object.assign(params, {
      designID: designId,
      env: env,
      IF_env: activeEnvId,
      uid: adskUser.uid,
      timestamp: Date.now()
    });

    const tracker = HSApp.Util.EventTrack.instance();
    const group = eventGroup || HSApp.Util.EventGroupEnum.Catalog;
    tracker.track(group, eventName, params);
  }

  public trackUseModel(modelData: ModelEventData, searchParams: UseModelParams): void {
    const { text, imageSearch, treeId, modelId, searchStatus } = searchParams;
    const {
      id,
      page,
      index,
      contentType,
      requestId,
      traceIds,
      payIndexFlag = false,
      saleInfo
    } = modelData;

    const app = HSApp.App.getApp();
    const searchContext = imageSearch
      ? "image"
      : text
      ? "text"
      : modelId
      ? "replace"
      : "category";

    this.signalCatalogToLog?.({
      logType: "addProduct",
      targetType: "model",
      id: id,
      pageNum: page,
      pos: index + 1,
      searchStatus: searchStatus,
      traceIds: traceIds,
      payIndexFlag: payIndexFlag,
      saleInfo: saleInfo
    });

    this.catalogLibTrack("catalog_darg_product_event", {
      pid: id,
      pageNum: page,
      pos: index + 1,
      searchContext: searchContext,
      tid: treeId,
      requestId: requestId,
      traceIds: traceIds,
      payIndexFlag: payIndexFlag,
      saleInfo: saleInfo
    });

    this.catalogLibTrack("catalog_drag_model_event", {
      GUID: id
    });

    if (text) {
      this.catalogLibTrack("catalog_use_searched_model_event", {
        GUID: id
      });
    }

    if (contentType) {
      const activeEnvironmentId = app.environmentManager.activeEnvironmentId;

      if (contentType.isTypeOf((HSApp.Catalog as any).ContentTypeEnum.KitchenCeiling)) {
        this.catalogLibTrack("apply_plate_event", {
          IF_env: activeEnvironmentId
        });
      }

      if (contentType.isTypeOf((HSApp.Catalog as any).ContentTypeEnum.JiaoHua)) {
        this.catalogLibTrack("add_molding_corner_event", {
          IF_env: activeEnvironmentId
        });
      }

      if (contentType.isTypeOf((HSApp.Catalog as any).ContentTypeEnum.ext_CeilingAttachedLighting)) {
        this.catalogLibTrack("add_light_model_event", {
          IF_env: activeEnvironmentId
        });
      }

      if (contentType.isTypeOf((HSApp.Catalog as any).ContentTypeEnum.GypsumCeiling)) {
        this.catalogLibTrack("add_finished_ceiling_event");
      }
    }
  }

  public signalCatalogToLog(data: CatalogLogData): void {
    try {
      const cachedData = this.cacheCatalogLogData(data, [
        "subMenuData",
        "categoryId",
        "name",
        "selectedPath",
        "searchType"
      ]);
      HSApp.Catalog.CatalogSignalManager.getInstance().signalCatalogToLog.dispatch(cachedData);
    } catch (error) {
      // Silent error handling
    }
  }

  public setKey(key: string, value: unknown): void {
    this.cacheLogData[key] = value;
  }

  public cacheCatalogLogData(data: CatalogLogData, keys: string[]): CatalogLogData {
    for (const key of keys) {
      if (data[key]) {
        this.setKey(key, data[key]);
      }
    }
    return { ...data, ...this.cacheLogData };
  }

  public signalCatalogToUserTrackLogger(data: Record<string, unknown>): void {
    try {
      const dispatchData: SignalDispatchData = {
        ...data,
        argInfo: this.cacheLogData
      };
      HSApp.Catalog.CatalogSignalManager.getInstance().signalCatalogToUserTrackLogger.dispatch(dispatchData);
    } catch (error) {
      // Silent error handling
    }
  }
}

export default CatalogTracker;