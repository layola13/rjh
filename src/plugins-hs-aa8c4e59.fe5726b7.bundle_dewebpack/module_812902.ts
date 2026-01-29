interface StorageData {
  time: number;
  hash: string;
}

interface ApiTrackData {
  group: string;
  param: {
    url: string;
    success: boolean;
    time: number;
    code?: string | number;
    message?: Error | string;
    unique?: boolean;
    designId?: string;
    migrateMsg?: unknown;
  };
}

interface TrackEvent {
  data: ApiTrackData;
}

interface IgnoreConfig {
  ignore: {
    ignoreApis: Array<(url: string) => boolean>;
  };
  ignoreApiPath: Array<{
    rule: RegExp;
    target: string;
  }>;
}

interface BlInstanceConfig {
  pid: string;
}

interface BlInstance {
  api(url: string, success: boolean, time: number, code: string | number | undefined, extraData: string): void;
}

declare const HSApp: {
  Util: {
    Storage: new (pluginType: string) => {
      get(key: string): StorageData | null;
      set(key: string, value: StorageData): void;
    };
    EventTrack: {
      instance(): {
        signalAPITrack: {
          listen(callback: (event: TrackEvent) => void, context: unknown): void;
        };
      };
    };
  };
  Config: {
    ARMS_PID: string;
  };
  App: {
    getApp(): {
      appParams: {
        assetId?: string;
      };
      designMetadata: {
        get(key: string): string | undefined;
      };
    };
  };
};

declare const HSFPConstants: {
  PluginType: {
    Analytics: string;
  };
};

declare const adskUser: {
  uid?: string;
};

declare const CryptoJS: {
  MD5(data: string): {
    toString(): string;
  };
};

declare const publishVersion: string;

declare function singleton(config: BlInstanceConfig, setupCommands: unknown[][]): BlInstance;

export default class AnalyticsTracker {
  private storage: ReturnType<typeof HSApp.Util.Storage.prototype.constructor>;
  private _blInstance!: BlInstance;

  constructor() {
    this.storage = new HSApp.Util.Storage(HSFPConstants.PluginType.Analytics);
  }

  start(): void {
    const setupCommands: unknown[][] = [
      ["api", "/index.html", true, performance.now, "SUCCESS"],
      [
        "setConfig",
        {
          ignore: {
            ignoreApis: [
              (url: string): boolean => {
                return (
                  !url ||
                  !(url.indexOf("/action/") >= 0 || url.indexOf("/network/") >= 0) &&
                    (0 !== url.indexOf("mtop.") &&
                      (!(url.indexOf("/fpmw/") >= 0 || url.indexOf("/api/") >= 0) ||
                        !(
                          url.indexOf("/ssologin") >= 0 ||
                          url.indexOf("/design") >= 0 ||
                          url.indexOf("/designs/") >= 0 ||
                          url.indexOf("/productList") >= 0 ||
                          url.indexOf("/miniproducts/search") >= 0 ||
                          url.indexOf("/category") >= 0 ||
                          url.indexOf("/product/") >= 0 ||
                          url.indexOf("/render") >= 0 ||
                          url.indexOf("/uploadUrls") >= 0
                        )))
                );
              },
            ],
          },
          ignoreApiPath: [
            {
              rule: /(.*\.com\/)(.*)/g,
              target: "/$2",
            },
            {
              rule: /(.*)[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}(.*)/gi,
              target: "$1**$3",
            },
            {
              rule: /(.*)[a-f0-9]{8}(%2D[a-f0-9]{4}){3}%2D[a-f0-9]{12}(.*)?/gi,
              target: "$1**$3",
            },
            {
              rule: /(.*\/)[0-9]{2,}(.*)/g,
              target: "$1**$2",
            },
          ],
        },
      ],
    ];

    this._blInstance = singleton(
      {
        pid: HSApp.Config.ARMS_PID,
      },
      setupCommands
    );

    HSApp.Util.EventTrack.instance().signalAPITrack.listen(this.track, this);
  }

  isDuplicatedMessage(storageKey: string, messageHash: string): boolean {
    const storedData = this.storage.get(storageKey);
    if (!storedData) {
      return false;
    }

    const { hash, time } = storedData;
    if (!hash || !time) {
      return false;
    }

    const ONE_DAY_MS = 864e5;
    return hash === messageHash && Date.now() - time < ONE_DAY_MS;
  }

  track(event: TrackEvent): void {
    if (event.data.group !== "api") {
      return;
    }

    const { url, success, time, code, message, unique, designId, migrateMsg } = event.data.param;

    let messageString = "";
    if (message) {
      messageString = (message as Error).stack
        ? (message as Error).stack!
        : JSON.stringify(message);
    } else if (migrateMsg) {
      messageString = JSON.stringify(migrateMsg);
    }

    const app = HSApp.App.getApp();
    const trackDesignId = designId || app.appParams.assetId || app.designMetadata.get("designId");
    const designVersion = app.designMetadata.get("designVersion") || "";
    const uid = adskUser.uid || "";
    const trackPublishVersion = window.publishVersion;
    const magic = app.designMetadata.get("magic") || "";

    const extraData = JSON.stringify({
      designId: trackDesignId,
      designVersion,
      publishVersion: trackPublishVersion,
      magic,
      uid,
      message: messageString || "",
      migrateMsg: migrateMsg ? JSON.stringify(migrateMsg) : "",
    });

    const messageHash = CryptoJS.MD5(extraData).toString().substr(16);
    const storageKey = `arms${url}`;

    if (unique && this.isDuplicatedMessage(storageKey, messageHash)) {
      return;
    }

    this._blInstance.api(url, success, time, code, extraData);

    this.storage.set(storageKey, {
      time: Date.now(),
      hash: messageHash,
    });
  }
}