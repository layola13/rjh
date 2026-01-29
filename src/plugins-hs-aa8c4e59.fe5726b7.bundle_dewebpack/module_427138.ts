interface EventData {
  group: string;
  action: string;
  param?: Record<string, unknown>;
}

interface TrackEvent {
  data?: EventData;
}

interface TrackingConfig {
  topic: string;
}

interface TrackingPayload {
  category: string;
  publishVersion: string;
  publishVersionByType: string;
  appVersion: string;
  topic: string;
  [key: string]: unknown;
}

interface Logger {
  silence: boolean;
  info(message: string, flag: boolean): void;
}

interface LogFactory {
  logger(name: string): Logger;
}

interface EventTrackInstance {
  signalEventTrack: {
    listen(handler: (event: TrackEvent) => void, context: unknown): void;
  };
}

interface HSAppUtil {
  EventTrack: {
    instance(): EventTrackInstance;
  };
}

declare global {
  interface Window {
    publishVersion: string;
    publishVersionByType: string;
    HSApp: {
      Util: HSAppUtil;
    };
  }
  const log: LogFactory;
  const HSApp: {
    Util: HSAppUtil;
  };
}

const CONFIG_MAP: Record<string, TrackingConfig> = {};

export default class AliWebTracking {
  private logger!: Logger;

  start(): void {
    HSApp.Util.EventTrack.instance().signalEventTrack.listen(this.track, this);
    this.logger = log.logger("AliWebTracking");
    this.logger.silence = true;
  }

  track(event: TrackEvent): void {
    const eventData = event.data;
    
    if (!eventData?.group || !eventData?.action) {
      return;
    }

    const configKey = `${eventData.group}_${eventData.action}`;
    const config = CONFIG_MAP[configKey];

    if (!config) {
      return;
    }

    const payload: TrackingPayload = {
      category: "AliWebTracking",
      publishVersion: window.publishVersion,
      publishVersionByType: window.publishVersionByType,
      appVersion: "v3",
      topic: config.topic,
      ...(eventData.param ?? {})
    };

    this.logger.info(JSON.stringify(payload), true);
  }
}