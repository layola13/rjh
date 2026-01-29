import { getQueryStringsFromUrl, getUUID, sendLog } from './utils';
import DEPLOY_CONFIG from './deploy-config';

enum NetworkIntensity {
  Good = "good",
  Bad = "bad",
  OffLine = "offLine"
}

interface NetworkGrade {
  good: number;
  average: number;
  poor: number;
}

interface NetworkDetectionResult {
  intensity: NetworkIntensity;
  duration: number;
  status: "success" | "fail";
  grade: NetworkGrade;
}

interface LogPayload {
  actionType: string;
  currentTime: number;
  logName: string;
  traceId: string;
  customizedInfo: {
    designId?: string;
    description: string;
    group: string;
    groupName: string;
    argInfo?: NetworkDetectionResult;
    realDuration?: number;
  };
  userInfo: {
    biz: string;
    domain?: string;
  };
}

interface FetchResponse {
  status: number | boolean;
}

type BizType = "fp" | string;

class NetworkDetect {
  private grade: NetworkGrade;
  private biz: BizType;

  constructor(bizType: BizType) {
    this.grade = bizType === "fp" 
      ? {
          good: 1200,
          average: 1990,
          poor: 7590
        }
      : {
          good: 680,
          average: 1250,
          poor: 3300
        };
    this.biz = bizType;
  }

  /**
   * Detects network speed by loading an image resource
   * @param imageUrl - The URL of the image to load for speed testing
   * @returns Promise resolving to network detection result
   */
  private detectNetworkSpeed(imageUrl: string): Promise<NetworkDetectionResult> {
    const testImage = new Image();
    testImage.src = `${imageUrl}?_t=${Date.now()}`;
    
    const startTime = Date.now();
    const queryParams = getQueryStringsFromUrl(location.search);
    
    const logPayload: LogPayload = {
      actionType: `${DEPLOY_CONFIG.DEPLOY_3D_RES_BUCKET}`,
      currentTime: Date.now(),
      logName: "mtopApiLogger",
      traceId: getUUID(),
      customizedInfo: {
        designId: queryParams.assetId,
        description: "打开工具网络检测",
        group: "tool",
        groupName: "工具部署资源"
      },
      userInfo: {
        biz: this.biz === "homestyler" ? "sjj" : this.biz,
        domain: queryParams.env
      }
    };

    return new Promise<NetworkDetectionResult>((resolve) => {
      testImage.onload = () => {
        const duration = Date.now() - startTime;
        const result: NetworkDetectionResult = {
          intensity: duration < this.grade.poor ? NetworkIntensity.Good : NetworkIntensity.Bad,
          duration,
          status: "success",
          grade: this.grade
        };
        
        resolve(result);
        logPayload.customizedInfo.argInfo = result;
        logPayload.customizedInfo.realDuration = duration;
        sendLog(logPayload);
      };

      testImage.onerror = () => {
        const duration = Date.now() - startTime;
        const result: NetworkDetectionResult = {
          intensity: duration < this.grade.poor ? NetworkIntensity.Good : NetworkIntensity.Bad,
          duration,
          status: "fail",
          grade: this.grade
        };
        
        resolve(result);
        logPayload.customizedInfo.argInfo = result;
        logPayload.customizedInfo.realDuration = duration;
        sendLog(logPayload);
      };
    });
  }

  /**
   * Detects network quality when opening tool
   * @param resourceUrl - The resource URL to test
   * @returns Promise resolving to network detection result
   */
  async detectOpenToolNetwork(resourceUrl: string): Promise<NetworkDetectionResult> {
    return await this.detectNetworkSpeed(resourceUrl);
  }

  /**
   * Detects if user is on internal network
   * @returns Promise resolving to warning messages or rejecting if external network
   */
  async detectinternalNetwork(): Promise<[string, string]> {
    const INTERNAL_NETWORK_TIMEOUT = 3000;
    const TEST_CDN_URL = "https://dev.g.alicdn.com/flabfe/foo/0.0.1/a.js";
    
    const response = await Promise.race<FetchResponse>([
      new Promise<FetchResponse>((resolve) => 
        setTimeout(() => resolve({ status: false }), INTERNAL_NETWORK_TIMEOUT)
      ),
      fetch(TEST_CDN_URL, { method: "HEAD" })
    ]);

    if (response && response.status === 200) {
      return Promise.resolve([
        "您当前正使用内网访问(非稳定环境), 请勿对外演示、培训等业务",
        "内网访问中(非稳定环境)"
      ]);
    }
    
    return Promise.reject([]);
  }
}

export default {
  NetworkDetect,
  NetworkIntensity
};