/**
 * Authorization configuration interface
 */
interface AuthorizeConfigItem {
  /** Authorization type: 'aigc' | 'render' | 'authorize' */
  type: string;
  /** Market type for authorization */
  marketType?: string;
  /** Source page identifier */
  sourcePage: string;
}

/**
 * Authorization configuration map
 */
interface AuthorizeConfig {
  aigc: AuthorizeConfigItem;
  count: AuthorizeConfigItem;
  resolution: AuthorizeConfigItem;
  sparkpic_all_watermark: AuthorizeConfigItem;
  sparkpic_group_watermark: AuthorizeConfigItem;
  sparkpic_detail_watermark: AuthorizeConfigItem;
}

/**
 * Authorization callback options
 */
interface AuthorizeOptions {
  /** Callback function executed after authorization */
  callBack?: (success: boolean) => void;
  /** Callback function executed after redeem completion */
  redeemComplete?: () => void;
}

/**
 * Market modal display options
 */
interface ShowMarketModalOptions {
  /** Market type identifier */
  type: string;
  /** Source page identifier */
  sourcePage: string;
  /** Callback function on modal close */
  callBack?: (success: boolean) => void;
  /** Callback function after redeem completion */
  redeemComplete?: () => void;
}

/**
 * Authorization configuration object
 * Defines authorization settings for various features
 */
export declare const authorizeConfig: AuthorizeConfig;

/**
 * Authorization Manager class
 * Handles authorization flows and market modal interactions
 */
export declare class Manager {
  /** Application instance reference */
  private app: any;

  /**
   * Initializes the Manager with HSApp application instance
   */
  constructor();

  /**
   * Performs authorization for a specific feature
   * @param configKey - Key from authorizeConfig to determine authorization type
   * @param options - Optional callbacks for authorization flow
   */
  authorize(configKey: keyof AuthorizeConfig, options?: AuthorizeOptions): void;

  /**
   * Displays the marketing modal for authorization
   * @param options - Configuration for modal display
   */
  showMarketModal(options: ShowMarketModalOptions): void;
}

/**
 * Singleton instance of AuthorizeManager
 * Provides global access to authorization functionality
 */
export declare const AuthorizeManager: Manager;