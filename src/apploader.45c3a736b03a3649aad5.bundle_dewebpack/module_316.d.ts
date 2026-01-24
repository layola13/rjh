/**
 * Resource configuration and ad loading module
 * Handles loading page advertisements and user membership information display
 */

/**
 * Advertisement resource content configuration
 */
interface ResourceContent {
  /** Template identifier: "2" for Google AdSense, other values for custom ads */
  templateId: string;
  /** Link text from MDS (Master Data Service) */
  linkNameMdsKeyValue: string;
  /** Link URL from MDS */
  linkUrlMdsKeyValue: string;
  /** Ad content text from MDS */
  contentMdsKeyValue: string;
}

/**
 * Resource display rules for custom styling
 */
interface ResourceRule {
  /** Background color (CSS format) */
  bgColor?: string;
  /** Background image URL (CSS format) */
  bgImage?: string;
  /** Font color (CSS format) */
  fontColor?: string;
}

/**
 * Resource configuration item from API response
 */
interface ResourceConfigItem {
  /** Unique resource identifier */
  resourceCode: string;
  /** Content configuration for the resource */
  resourceContent: ResourceContent;
  /** Optional styling rules */
  resourceRule?: ResourceRule;
}

/**
 * API response data wrapper
 */
interface APIResponseData<T> {
  /** Response data payload */
  data?: T[];
}

/**
 * Standard API response structure
 */
interface APIResponse<T = unknown> {
  /** Return status codes (e.g., ["SUCCESS::调用成功"]) */
  ret: string[];
  /** Response data container */
  data?: APIResponseData<T>;
}

/**
 * User membership information
 */
interface UserMemberInfo {
  /** Membership tier: 1 = Basic, 2 = Pro, 3 = Master */
  memberType: 1 | 2 | 3;
  /** Whether user is part of a team/group */
  groupUser: boolean;
  /** Whether user has styler membership */
  stylerMember: boolean;
}

/**
 * Business environment type
 */
type BusinessEnvironment = 'global' | string;

/**
 * Event tracking callback function
 * @param eventName - Name of the event to track
 * @param eventData - Additional event metadata
 */
type TrackingCallback = (eventName: string, eventData: Record<string, unknown>) => void;

/**
 * Global client user configuration
 */
interface GlobalClientUser {
  /** Message listener for login events */
  messageListener: (message: MessageEvent) => void;
}

declare global {
  interface Window {
    /** Google AdSense queue */
    adsbygoogle?: Array<Record<string, unknown>>;
    /** Global user client configuration */
    globalClientUser?: GlobalClientUser;
  }
}

/**
 * Main function to initialize loading page resources
 * Fetches and displays advertisements and user membership information
 * 
 * @param biz - Business environment identifier
 * @param env - Environment configuration
 * @param track - Tracking callback for analytics events
 */
export default function initializeLoadingPageResources(
  biz: BusinessEnvironment,
  env: string,
  track: TrackingCallback
): void;

/**
 * Opens a link and tracks the click event
 * 
 * @param url - URL to open in new tab
 * @param eventName - Event name for tracking
 * @param resourceCode - Resource identifier for tracking
 * @param track - Tracking callback function
 */
declare function handleLinkClickWithTracking(
  url: string | null | undefined,
  eventName: string,
  resourceCode: string,
  track: TrackingCallback
): void;

/**
 * Renders Google AdSense advertisement in the loading page
 * 
 * @param linkUrl - URL for the "Remove Ads" subscription link
 * @param resourceCode - Resource identifier for tracking
 * @param loadingSvgElement - Container element for the ad
 * @param track - Tracking callback function
 * @returns Promise that resolves when ad is loaded
 */
declare function renderGoogleAdSense(
  linkUrl: string,
  resourceCode: string,
  loadingSvgElement: HTMLElement,
  track: TrackingCallback
): Promise<void>;

/**
 * Renders custom member advertisement in the loading page
 * 
 * @param config - Advertisement configuration
 * @param config.linkNameMdsKeyValue - Button text
 * @param config.linkUrlMdsKeyValue - Button URL
 * @param config.contentMdsKeyValue - Ad content text
 * @param config.resourceCode - Resource identifier
 * @param config.resourceRule - Optional styling rules
 * @param track - Tracking callback function
 */
declare function renderCustomMemberAd(
  config: {
    linkNameMdsKeyValue: string;
    linkUrlMdsKeyValue: string;
    contentMdsKeyValue: string;
    resourceCode: string;
    resourceRule?: ResourceRule;
  },
  track: TrackingCallback
): void;

/**
 * Fetches and displays user membership level badge
 * 
 * @param biz - Business environment identifier
 * @param env - Environment configuration
 */
declare function displayUserMembershipInfo(
  biz: BusinessEnvironment,
  env: string
): Promise<void>;

/**
 * Membership tier display names
 */
declare const MEMBER_TYPE_LABELS: {
  readonly 1: 'Basic';
  readonly 2: 'Pro';
  readonly 3: 'Master';
};