/**
 * Network detection module for monitoring connection quality to various services
 * @module NetworkDetector
 */

/**
 * Network quality grade levels
 */
export enum NetworkGrade {
  /** Excellent network quality */
  EXCELLENT = 'excellent',
  /** Good network quality */
  GOOD = 'good',
  /** Poor network quality */
  POOR = 'poor',
  /** Offline/disconnected */
  OFFLINE = 'offLine'
}

/**
 * Resource detection types
 */
export enum DetectResType {
  /** Tool resources (3D assets, etc.) */
  TOOL = 'tool',
  /** Gateway/BFF services */
  GATEWAY = 'gateway'
}

/**
 * Detection status result
 */
export type DetectionStatus = 'success' | 'onloadImageError' | 'inCorrectImage' | 'fail';

/**
 * Network intensity measurement
 */
export interface NetworkIntensity {
  /** Quality grade of the network */
  grade: NetworkGrade;
  /** Localized grade name */
  gradeName: string;
  /** Response duration in milliseconds */
  duration: number;
}

/**
 * Grade threshold configuration
 */
export interface GradeThreshold {
  /** Excellent quality threshold (ms) */
  excellent: number;
  /** Good quality threshold (ms) */
  good: number;
  /** Poor quality threshold (ms) */
  poor: number;
}

/**
 * OSS bucket configuration
 */
export interface OSSBucket {
  /** Bucket identifier */
  [key: string]: OSSBucketConfig;
}

export interface OSSBucketConfig {
  /** Target URL for detection */
  url: string;
  /** Resource name */
  name: string;
  /** Grade thresholds */
  grade: GradeThreshold;
}

/**
 * Resource type description
 */
export interface ResourceTypeDescription {
  /** Display name */
  name: string;
  /** Subtitle description */
  subTitle: string;
}

/**
 * Individual check result
 */
export interface CheckResult {
  /** Resource type */
  type: string;
  /** Resource name */
  name: string;
  /** Network intensity measurement */
  intensity: NetworkIntensity;
  /** Grade thresholds used */
  grade: GradeThreshold;
  /** Detection status */
  status: DetectionStatus;
  /** Human-readable description */
  description: string;
}

/**
 * Aggregated type detection result
 */
export interface TypeDetectionResult {
  /** Resource type */
  type: string;
  /** Quality grade */
  grade: NetworkGrade;
  /** Localized grade name */
  gradeName: string;
  /** Display name */
  name: string;
  /** Subtitle */
  subTitle: string;
  /** Individual check results */
  checkLists: Record<string, CheckResult>;
}

/**
 * Overall network detection result
 */
export interface NetworkDetectionResult {
  /** Overall quality grade */
  grade: NetworkGrade;
  /** Localized grade name */
  gradeName: string;
  /** Detailed status by resource type */
  statuses: Record<string, TypeDetectionResult>;
}

/**
 * BFF API detection response
 */
export interface BFFDetectResponse {
  ret: string[];
  data?: {
    result?: Array<{
      type: string;
      name: string;
      buckets: Array<{
        bucket: Record<string, unknown>;
        ossUrl: string;
        name: string;
        grade: GradeThreshold;
      }>;
    }>;
  };
}

/**
 * Network detector class for measuring connection quality to various resources
 */
export default class NetworkDetector {
  /** Application instance */
  private readonly app: unknown;

  /** Resource detection types */
  public DetectResType: Record<string, string>;

  /** Current detection status by type */
  public DetectStatus: Record<string, TypeDetectionResult>;

  /** OSS bucket configurations */
  public ossBuckets: Record<string, OSSBucket[]>;

  /** Resource type descriptions */
  private detectResTypeDes: Record<string, ResourceTypeDescription>;

  constructor(app: unknown) {
    this.app = app;
    this.DetectStatus = {};
    this.ossBuckets = {};
    
    this.DetectResType = {
      TOOL: 'tool',
      GATEWAY: 'gateway'
    };

    this.detectResTypeDes = {
      tool: {
        name: ResourceManager.getString('network_detect_tool_msg'),
        subTitle: ResourceManager.getString('network_detect_tool_msg_subTitle')
      },
      gateway: {
        name: ResourceManager.getString('network_detect_gateway_msg'),
        subTitle: ResourceManager.getString('network_detect_gateway_msg_subTitle')
      }
    };
  }

  /**
   * Detect network speed by loading an image resource
   * @param resource - OSS bucket configuration to test
   * @param resourceType - Type of resource being tested
   * @param logKey - Logging identifier
   * @returns Promise resolving to check result
   */
  public detectNetworkSpeed(
    resource: OSSBucketConfig,
    resourceType: string,
    logKey: string
  ): Promise<CheckResult>;

  /**
   * Detect tool network quality by testing multiple resources
   * @param skipToolCheck - Whether to skip tool resource checks
   * @returns Promise resolving to overall network detection result
   */
  public detectToolNetworkByRes(skipToolCheck?: boolean): Promise<NetworkDetectionResult>;

  /**
   * Get overall network quality overview from individual type results
   * @param detectionResults - Detection results by resource type
   * @returns Overall network grade summary
   */
  public getNetworkOverview(
    detectionResults: Record<string, TypeDetectionResult>
  ): { grade: NetworkGrade; gradeName: string };

  /**
   * Determine aggregate grade for a resource type from individual checks
   * @param checkResults - Individual check results
   * @returns Aggregate grade for the type
   */
  public getTypeGrade(
    checkResults: Record<string, CheckResult>
  ): { grade: NetworkGrade; gradeName: string };

  /**
   * Calculate network intensity from response duration
   * @param duration - Response duration in milliseconds
   * @param thresholds - Grade thresholds configuration
   * @returns Network intensity measurement
   */
  public getNetworkIntensity(
    duration: number,
    thresholds?: GradeThreshold
  ): NetworkIntensity;

  /**
   * Detect network quality for core resources of a specific type
   * @param resourceType - Type of resources to check
   * @returns Promise resolving to check results by resource
   */
  public detectCoreResNetwork(
    resourceType: string
  ): Promise<Record<string, CheckResult> | null>;
}

/**
 * Global ResourceManager interface (assumed to exist in runtime)
 */
declare global {
  const ResourceManager: {
    getString(key: string): string;
  };

  const HSApp: {
    Config: {
      DEPLOY_3D_RES_BUCKET: Record<string, unknown>;
      NETWORK_CHECK_IMG: string;
      TENANT: string;
    };
    Logger: {
      mtopApiLogger: {
        push(key: string, data: Record<string, unknown>, options: Record<string, unknown>): void;
      };
    };
  };

  const NWTK: {
    mtop: {
      NetWork: {
        detect(): Promise<BFFDetectResponse>;
      };
    };
  };
}