interface FeatureConfig {
  disableStore?: boolean;
  disableLayoutAlg?: boolean;
  disableSampleRoom?: boolean;
  disableLandingPage?: boolean;
}

interface Storage {
  set(key: string, value: boolean): void;
}

interface StorageConstructor {
  new (pluginType: string): Storage;
}

interface HSAppUtil {
  Storage: StorageConstructor;
}

interface HSAppConfig {
  VERSION: string;
}

interface HSApp {
  Util: HSAppUtil;
  Config: HSAppConfig;
}

interface HSFPConstants {
  PluginType: {
    AutoRecommend: string;
  };
}

declare const HSApp: HSApp;
declare const HSFPConstants: HSFPConstants;

/**
 * Feature toggle manager for controlling application features
 */
export default class FeatureToggle {
  private config: FeatureConfig;

  constructor(config: FeatureConfig = {}) {
    this.config = config;
  }

  /**
   * Initialize feature toggle configuration
   */
  init(config: FeatureConfig): void {
    this.config = config;
    this._setStorage();
  }

  /**
   * Configure storage settings based on feature toggles
   */
  private _setStorage(): void {
    if (!this.enableAutoRecommend) {
      new HSApp.Util.Storage(HSFPConstants.PluginType.AutoRecommend).set(
        "enable-dynamic-auto-recommend",
        false
      );
    }
  }

  /**
   * Get configuration value for a specific feature
   */
  private _getConfigItem<K extends keyof FeatureConfig>(key: K): FeatureConfig[K] | false {
    const value = this.config[key];
    return value !== undefined ? value : false;
  }

  /**
   * Check if current account is EA (Enterprise) account
   */
  private _isEAAccount(): boolean {
    return HSApp.Config.VERSION === "ea";
  }

  get enableMerchant(): boolean {
    return !this._getConfigItem("disableStore");
  }

  get enableAutoRecommend(): boolean {
    return !this._getConfigItem("disableLayoutAlg");
  }

  get enableSampleRoom(): boolean {
    return !this._getConfigItem("disableSampleRoom");
  }

  get enableLandingPage(): boolean {
    return !this._getConfigItem("disableLandingPage");
  }
}