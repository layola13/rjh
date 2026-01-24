/**
 * Analytics tracker for monitoring API calls and errors.
 * Integrates with ARMS (Application Real-time Monitoring Service) for performance tracking.
 */

/**
 * Storage key-value structure for tracking duplicated messages
 */
interface StorageMessageData {
  /** Timestamp when the message was stored */
  time: number;
  /** MD5 hash of the message content */
  hash: string;
}

/**
 * API tracking event parameters
 */
interface APITrackParam {
  /** API endpoint URL */
  url: string;
  /** Whether the API call was successful */
  success: boolean;
  /** API call duration in milliseconds */
  time: number;
  /** Response status code */
  code?: number;
  /** Error message or stack trace */
  message?: Error | string | Record<string, unknown>;
  /** Unique identifier for deduplication */
  unique?: boolean;
  /** Design asset ID */
  designId?: string;
  /** Migration-related error message */
  migrateMsg?: Record<string, unknown>;
}

/**
 * Event track data structure
 */
interface TrackEventData {
  /** Event group type */
  group: string;
  /** Event parameters */
  param: APITrackParam;
}

/**
 * Event track wrapper
 */
interface TrackEvent {
  data: TrackEventData;
}

/**
 * API ignore configuration
 */
interface IgnoreConfig {
  /** List of API filtering functions */
  ignoreApis: Array<(url: string) => boolean>;
}

/**
 * API path transformation rule
 */
interface PathRule {
  /** Regular expression for matching */
  rule: RegExp;
  /** Replacement target pattern */
  target: string;
}

/**
 * ARMS configuration structure
 */
interface ARMSConfig {
  ignore: IgnoreConfig;
  ignoreApiPath: PathRule[];
}

/**
 * ARMS instance interface
 */
interface ARMSInstance {
  /**
   * Track API call
   * @param url - API endpoint
   * @param success - Call success status
   * @param time - Duration in milliseconds
   * @param code - Response code
   * @param context - JSON serialized context data
   */
  api(
    url: string,
    success: boolean,
    time: number,
    code: number | undefined,
    context: string
  ): void;
}

/**
 * Analytics context metadata
 */
interface AnalyticsContext {
  /** Design asset identifier */
  designId: string;
  /** Design version number */
  designVersion: string;
  /** Published version identifier */
  publishVersion: string;
  /** Magic token for validation */
  magic: string;
  /** User unique identifier */
  uid: string;
  /** Error or event message */
  message: string;
  /** Migration-related message */
  migrateMsg: string;
}

/**
 * Message deduplication time window in milliseconds (24 hours)
 */
const DUPLICATE_MESSAGE_WINDOW_MS = 864e5;

/**
 * Hash substring start position for message deduplication
 */
const HASH_SUBSTR_START = 16;

/**
 * Analytics tracker class for monitoring API performance and errors.
 * Integrates with ARMS and filters out irrelevant API calls.
 */
export default class AnalyticsTracker {
  /** Local storage instance for tracking message history */
  private readonly storage: HSApp.Util.Storage;

  /** ARMS monitoring instance */
  private _blInstance?: ARMSInstance;

  constructor() {
    this.storage = new HSApp.Util.Storage(HSFPConstants.PluginType.Analytics);
  }

  /**
   * Initialize and start the analytics tracker.
   * Sets up ARMS configuration and registers event listeners.
   */
  start(): void {
    const armsConfig: [string, string, boolean, () => number, string] | [string, { ignore: IgnoreConfig; ignoreApiPath: PathRule[] }] = [
      ["api", "/index.html", true, performance.now, "SUCCESS"],
      [
        "setConfig",
        {
          ignore: {
            ignoreApis: [
              (url: string): boolean => {
                if (!url) return true;

                // Include action and network APIs
                if (url.indexOf("/action/") >= 0 || url.indexOf("/network/") >= 0) {
                  return false;
                }

                // Exclude mtop APIs
                if (url.indexOf("mtop.") === 0) {
                  return true;
                }

                // Include specific fpmw/api paths
                const isFpmwOrApi = url.indexOf("/fpmw/") >= 0 || url.indexOf("/api/") >= 0;
                if (!isFpmwOrApi) return true;

                // Include critical endpoints
                const isCriticalEndpoint =
                  url.indexOf("/ssologin") >= 0 ||
                  url.indexOf("/design") >= 0 ||
                  url.indexOf("/designs/") >= 0 ||
                  url.indexOf("/productList") >= 0 ||
                  url.indexOf("/miniproducts/search") >= 0 ||
                  url.indexOf("/category") >= 0 ||
                  url.indexOf("/product/") >= 0 ||
                  url.indexOf("/render") >= 0 ||
                  url.indexOf("/uploadUrls") >= 0;

                return !isCriticalEndpoint;
              },
            ],
          },
          ignoreApiPath: [
            {
              // Remove domain prefix
              rule: /(.*\.com\/)(.*)/g,
              target: "/$2",
            },
            {
              // Mask UUID patterns
              rule: /(.*)[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}(.*)/gi,
              target: "$1**$3",
            },
            {
              // Mask URL-encoded UUID patterns
              rule: /(.*)[a-f0-9]{8}(%2D[a-f0-9]{4}){3}%2D[a-f0-9]{12}(.*)?/gi,
              target: "$1**$3",
            },
            {
              // Mask numeric IDs (2+ digits)
              rule: /(.*\/)[0-9]{2,}(.*)/g,
              target: "$1**$2",
            },
          ],
        },
      ],
    ];

    this._blInstance = i.singleton(
      {
        pid: HSApp.Config.ARMS_PID,
      },
      armsConfig
    );

    HSApp.Util.EventTrack.instance().signalAPITrack.listen(this.track, this);
  }

  /**
   * Check if a message has been tracked recently to avoid duplicates.
   * @param storageKey - Storage key for the message
   * @param messageHash - MD5 hash of the message
   * @returns True if the message is a duplicate within the time window
   */
  isDuplicatedMessage(storageKey: string, messageHash: string): boolean {
    const storedData = this.storage.get<StorageMessageData>(storageKey);
    if (!storedData) return false;

    const { hash, time } = storedData;
    if (!hash || !time) return false;

    const isDuplicate =
      hash === messageHash &&
      Date.now() - time < DUPLICATE_MESSAGE_WINDOW_MS;

    return isDuplicate;
  }

  /**
   * Track an API event and send to ARMS if not duplicated.
   * @param event - Track event containing API call data
   */
  track(event: TrackEvent): void {
    if (event.data.group !== "api") return;

    const {
      url,
      success,
      time,
      code,
      message,
      unique,
      designId,
      migrateMsg,
    } = event.data.param;

    // Serialize error message
    let serializedMessage = "";
    if (message) {
      serializedMessage =
        message instanceof Error && message.stack
          ? message.stack
          : JSON.stringify(message);
    } else if (migrateMsg) {
      serializedMessage = JSON.stringify(migrateMsg);
    }

    // Gather context metadata
    const app = HSApp.App.getApp();
    const contextDesignId =
      designId ?? app.appParams.assetId ?? app.designMetadata.get("designId");
    const designVersion = app.designMetadata.get("designVersion") ?? "";
    const uid = adskUser.uid ?? "";
    const publishVersion = window.publishVersion;
    const magic = app.designMetadata.get("magic") ?? "";

    const context: AnalyticsContext = {
      designId: contextDesignId,
      designVersion,
      publishVersion,
      magic,
      uid,
      message: serializedMessage,
      migrateMsg: migrateMsg ? JSON.stringify(migrateMsg) : "",
    };

    const contextJSON = JSON.stringify(context);
    const messageHash = CryptoJS.MD5(contextJSON)
      .toString()
      .substr(HASH_SUBSTR_START);
    const storageKey = `arms${url}`;

    // Skip if duplicate message
    if (unique && this.isDuplicatedMessage(storageKey, messageHash)) {
      return;
    }

    // Send to ARMS
    this._blInstance?.api(url, success, time, code, contextJSON);

    // Store message hash for deduplication
    this.storage.set<StorageMessageData>(storageKey, {
      time: Date.now(),
      hash: messageHash,
    });
  }
}