interface ModelTrackingParams {
  id: string;
}

interface TrackingService {
  track(
    eventGroup: string,
    eventName: string,
    data: Record<string, unknown>
  ): void;
}

interface UtilService {
  EventGroupEnum: {
    Catalog: string;
  };
}

interface HSAppService {
  Util: UtilService;
}

declare const T: TrackingService;
declare const HSApp: HSAppService;

export function trackUseModel(model: ModelTrackingParams): void {
  T.track(HSApp.Util.EventGroupEnum.Catalog, "catalog_use_material_pick_up_model_event", {
    sModelID: model.id
  });
}