import { AplusMapping } from './aplus-mapping';
import GoogleAnalytics from './google-analytics';
import AliAnalytics from './ali-analytics';
import ArmsAnalytics from './arms-analytics';
import AplusAnalytics from './aplus-analytics';

interface PluginConfig {
  name: string;
  description: string;
  dependencies: string[];
}

interface EventTrackType {
  GA?: boolean;
  ALI?: boolean;
  APLUS?: boolean;
}

interface HSAppConfig {
  EVENTTRACKTYPE: EventTrackType;
  ENABLE_ARMS?: boolean;
}

interface HSAppGlobal {
  Config: HSAppConfig;
  Plugin: {
    IPlugin: new (...args: any[]) => any;
    registerPlugin: (type: string, plugin: any) => void;
  };
}

interface HSFPConstantsGlobal {
  PluginType: {
    Analytics: string;
  };
}

declare global {
  interface Window {
    DEBUG?: boolean;
    HSApp: HSAppGlobal;
    HSFPConstants: HSFPConstantsGlobal;
  }
}

class AnalyticsPlugin extends window.HSApp.Plugin.IPlugin {
  private readonly aplusInstance?: AplusAnalytics;

  constructor() {
    super({
      name: 'Analytics plugin',
      description: 'collects analytics data',
      dependencies: []
    });
  }

  /**
   * Called when the plugin is activated
   */
  onActive(event: unknown, context: unknown): void {
    const trackType = window.HSApp.Config.EVENTTRACKTYPE;

    if (window.DEBUG !== true && trackType.GA) {
      new GoogleAnalytics().start();
    }

    if (trackType.ALI) {
      new AliAnalytics().start();
    }

    if (window.HSApp.Config.ENABLE_ARMS) {
      new ArmsAnalytics().start();
    }

    if (trackType.APLUS) {
      (this as any).aplusInstance = new AplusAnalytics();
      (this as any).aplusInstance.start();
    }
  }

  /**
   * Combine additional mappings into the global AplusMapping
   */
  combine(mappings: Record<string, unknown>): void {
    if (typeof mappings === 'object' && mappings !== null) {
      for (const key in mappings) {
        if (mappings.hasOwnProperty(key) && !(key in AplusMapping)) {
          AplusMapping[key] = mappings[key];
        }
      }
    }
  }

  /**
   * Send Aplus UV tracking data
   */
  sendAplusUV(event: unknown, data: unknown): void {
    (this as any).aplusInstance?.sendUV(event, data);
  }

  /**
   * Called when the plugin is deactivated
   */
  onDeactive(): void {
    // Cleanup logic can be added here
  }
}

window.HSApp.Plugin.registerPlugin(
  window.HSFPConstants.PluginType.Analytics,
  AnalyticsPlugin
);