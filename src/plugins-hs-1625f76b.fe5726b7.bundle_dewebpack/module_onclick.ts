interface ClickEventData {
  name: string;
  id: string;
  topicType?: string;
  poolId?: string;
}

interface EventTracker {
  track(group: EventGroupEnum, eventName: string, params: Record<string, unknown>): void;
}

interface HSAppConfig {
  TENANT: string;
}

interface HSAppUtil {
  EventTrack: {
    instance(): EventTracker;
  };
  EventGroupEnum: typeof EventGroupEnum;
}

interface HSAppGlobal {
  Config: HSAppConfig;
  Util: HSAppUtil;
}

declare const HSApp: HSAppGlobal;

enum EventGroupEnum {
  ModelChannel = 'ModelChannel',
  Catalog = 'Catalog'
}

const TENANT_FP = 'fp';

export function createClickHandler(
  topicType: string,
  callback: (data: ClickEventData) => void
): (event: ClickEventData) => void {
  return function onClick(event: ClickEventData): void {
    const columnName = event.name;
    
    let eventData: ClickEventData = {
      ...event,
      topicType
    };

    if (HSApp.Config.TENANT === TENANT_FP) {
      eventData = {
        ...eventData,
        poolId: event.id
      };
    }

    const eventTracker = HSApp.Util.EventTrack.instance();

    if (HSApp.Config.TENANT === TENANT_FP) {
      eventTracker.track(
        HSApp.Util.EventGroupEnum.ModelChannel,
        'list_click_event',
        { pool_id: event.id }
      );
    } else {
      eventTracker.track(
        HSApp.Util.EventGroupEnum.Catalog,
        'open_model_column_event',
        { sColumnNo: columnName }
      );
    }

    callback(eventData);
  };
}