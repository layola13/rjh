export interface NetworkGrade {
  excellent: number;
  good: number;
  poor: number;
}

export interface DetectResource {
  url: string;
  name: string;
  grade: NetworkGrade;
}

export interface NetworkIntensity {
  grade: string;
  gradeName: string;
  duration: number;
}

export interface DetectResult {
  type: string;
  name: string;
  intensity: NetworkIntensity;
  grade: NetworkGrade;
  status: string;
  description: string;
}

export interface TypeGradeResult {
  grade: string;
  gradeName: string;
}

export interface DetectStatusItem extends TypeGradeResult {
  type: string;
  name: string;
  subTitle: string;
  checkLists: Record<string, DetectResult>;
}

export interface NetworkOverview extends TypeGradeResult {
  statuses: Record<string, DetectStatusItem>;
}

interface ResourceTypeDescription {
  name: string;
  subTitle: string;
}

interface BucketConfig {
  ossUrl: string;
  name: string;
  grade: NetworkGrade;
  bucket: Record<string, unknown>;
}

interface MtopDetectResponse {
  ret: string[];
  data?: {
    result?: Array<{
      type: string;
      name: string;
      buckets: BucketConfig[];
    }>;
  };
}

const NETWORK_QUALITY_EXCELLENT = {
  key: "excellent",
  localName: "network_detect_quality_strong"
};

const NETWORK_QUALITY_GOOD = {
  key: "good",
  localName: "network_detect_quality_medium"
};

const NETWORK_QUALITY_POOR = {
  key: "poor",
  localName: "network_detect_quality_poor"
};

const NETWORK_QUALITY_OFFLINE = {
  key: "offLine",
  localName: "network_detect_quality_offline"
};

export default class NetworkDetector {
  private app: unknown;
  private DetectResType: Record<string, string>;
  private DetectStatus: Record<string, DetectStatusItem>;
  private ossBuckets: Record<string, DetectResource[]>;
  private detectResTypeDes: Record<string, ResourceTypeDescription>;

  constructor(app: unknown) {
    this.app = app;
    this.DetectStatus = {};
    this.ossBuckets = {};
    
    this.DetectResType = {
      TOOL: "tool",
      GATEWAY: "gateway"
    };

    this.detectResTypeDes = {
      tool: {
        name: ResourceManager.getString("network_detect_tool_msg"),
        subTitle: ResourceManager.getString("network_detect_tool_msg_subTitle")
      },
      gateway: {
        name: ResourceManager.getString("network_detect_gateway_msg"),
        subTitle: ResourceManager.getString("network_detect_gateway_msg_subTitle")
      }
    };
  }

  /**
   * Detect network speed by loading an image resource
   */
  private detectNetworkSpeed(
    resource: DetectResource,
    type: string,
    logKey: string
  ): Promise<DetectResult> {
    if (resource.url.endsWith(".png") || resource.url.endsWith(".jpg")) {
      const image = new Image();
      image.src = `${resource.url}?_t=${Date.now()}`;
      const startTime = Date.now();
      const resourceName = resource.name;
      const groupName = this.detectResTypeDes[type].name;

      HSApp.Logger.mtopApiLogger.push(
        logKey,
        {
          description: `${resourceName}网络检测`,
          group: type,
          groupName,
          type: logKey,
          typeName: resourceName
        },
        {
          triggerType: LogTriggerType.START
        }
      );

      return new Promise((resolve, reject) => {
        image.onload = () => {
          const duration = Date.now() - startTime;
          const result: DetectResult = {
            type,
            name: resource.name,
            intensity: this.getNetworkIntensity(duration, resource.grade),
            grade: resource.grade,
            status: "success",
            description: "请求和加载图片成功"
          };

          resolve(result);

          HSApp.Logger.mtopApiLogger.push(
            logKey,
            {
              description: `${resourceName}网络检测成功`,
              group: type,
              groupName,
              type: logKey,
              typeName: resourceName
            },
            {
              triggerType: LogTriggerType.END,
              sendNow: true
            }
          );
        };

        image.onerror = () => {
          const duration = Date.now() - startTime;
          const result: DetectResult = {
            type,
            name: resource.name,
            intensity: this.getNetworkIntensity(duration, resource.grade),
            grade: resource.grade,
            status: "onloadImageError",
            description: "请求图片成功，但加载失败"
          };

          reject(result);

          HSApp.Logger.mtopApiLogger.push(
            logKey,
            {
              description: `${resourceName}网络检测失败`,
              group: type,
              groupName,
              type: logKey,
              typeName: resourceName
            },
            {
              triggerType: LogTriggerType.END,
              sendNow: true
            }
          );
        };
      });
    }

    const errorResult: DetectResult = {
      type,
      name: resource.name,
      intensity: {
        duration: 0,
        grade: NETWORK_QUALITY_OFFLINE.key,
        gradeName: "断开"
      },
      grade: resource.grade,
      status: "inCorrectImage",
      description: "测试网速的图片格式不对，不是目标文件"
    };

    return Promise.reject(errorResult);
  }

  /**
   * Detect network by resources including gateway and tools
   */
  async detectToolNetworkByRes(skipToolDetect = false): Promise<NetworkOverview> {
    this.DetectStatus = {};
    
    this.ossBuckets = skipToolDetect
      ? {}
      : {
          tool: [
            {
              ...HSApp.Config.DEPLOY_3D_RES_BUCKET,
              url: HSApp.Config.NETWORK_CHECK_IMG,
              name: "存储3D工具资源",
              grade:
                HSApp.Config.TENANT === "fp"
                  ? { excellent: 400, good: 2000, poor: 4300 }
                  : { excellent: 680, good: 1250, poor: 3300 }
            }
          ]
        };

    const gatewayName = this.detectResTypeDes[this.DetectResType.GATEWAY].name;

    HSApp.Logger.mtopApiLogger.push(
      "bffApp",
      {
        description: `${gatewayName}网络检测`,
        group: this.DetectResType.GATEWAY,
        groupName: gatewayName
      },
      {
        triggerType: LogTriggerType.START
      }
    );

    const startTime = Date.now();
    const response: MtopDetectResponse = await NWTK.mtop.NetWork.detect();
    const duration = Date.now() - startTime;

    const gatewayGrade: NetworkGrade =
      HSApp.Config.TENANT === "fp"
        ? { excellent: 1400, good: 5000, poor: 10000 }
        : { excellent: 1755, good: 2484, poor: 5376 };

    if (response?.ret?.[0]?.includes("SUCCESS")) {
      const checkLists: Record<string, DetectResult> = {
        bffApp: {
          name: "bff应用",
          type: this.DetectResType.GATEWAY,
          intensity: this.getNetworkIntensity(duration, gatewayGrade),
          grade: gatewayGrade,
          status: "success",
          description: "请求成功"
        }
      };

      this.DetectStatus[this.DetectResType.GATEWAY] = {
        ...this.detectResTypeDes[this.DetectResType.GATEWAY],
        ...this.getTypeGrade(checkLists),
        type: this.DetectResType.GATEWAY,
        checkLists
      };

      HSApp.Logger.mtopApiLogger.push(
        "bffApp",
        {
          description: `${gatewayName}网络检测`,
          group: this.DetectResType.GATEWAY,
          groupName: gatewayName,
          status: "success",
          argInfo: checkLists
        },
        {
          triggerType: LogTriggerType.END,
          sendNow: true
        }
      );

      if (response.data?.result) {
        response.data.result.forEach((item) => {
          this.DetectResType[item.type.toUpperCase()] = item.type;
          const buckets = item.buckets;
          
          this.ossBuckets[item.type] = buckets.map((bucket) => ({
            ...bucket.bucket,
            url: bucket.ossUrl,
            name: bucket.name,
            grade: bucket.grade
          }));

          this.detectResTypeDes[item.type] = {
            name: item.name,
            subTitle: item.name
          };
        });

        const detectPromises: Promise<Record<string, DetectResult> | null>[] = [];
        
        for (const resType of Object.values(this.DetectResType)) {
          detectPromises.push(this.detectCoreResNetwork(resType));
        }

        const results = await Promise.allSettled(detectPromises);
        
        results.forEach((result) => {
          if (result.status === "fulfilled" && result.value) {
            const type = Object.values(result.value)[0].type;
            this.DetectStatus[type] = {
              ...this.getTypeGrade(result.value),
              ...this.detectResTypeDes[type],
              type,
              checkLists: result.value
            };
          }
        });

        HSApp.Logger.mtopApiLogger.push(
          "3D_TOOL_NETWORK_DETECT",
          {
            description: "网络检测-3D核心资源",
            argInfo: this.DetectStatus
          },
          {
            sendNow: true
          }
        );

        return Promise.resolve({
          ...this.getNetworkOverview(this.DetectStatus),
          statuses: this.DetectStatus
        });
      }
    } else {
      const failCheckLists: Record<string, DetectResult> = {
        bffApp: {
          name: "bff应用",
          type: this.DetectResType.GATEWAY,
          intensity: {
            grade: NETWORK_QUALITY_OFFLINE.key,
            gradeName: ResourceManager.getString(NETWORK_QUALITY_OFFLINE.localName),
            duration
          },
          grade: gatewayGrade,
          status: "fail",
          description: "请求失败"
        }
      };

      this.DetectStatus[this.DetectResType.GATEWAY] = {
        ...this.detectResTypeDes[this.DetectResType.GATEWAY],
        ...this.getTypeGrade(failCheckLists),
        type: this.DetectResType.GATEWAY,
        checkLists: failCheckLists
      };

      HSApp.Logger.mtopApiLogger.push(
        "bffApp",
        {
          description: `${gatewayName}网络检测失败`,
          group: this.DetectResType.GATEWAY,
          groupName: gatewayName,
          status: "fail",
          argInfo: failCheckLists
        },
        {
          triggerType: LogTriggerType.END,
          sendNow: true
        }
      );
    }

    return Promise.resolve({
      ...this.getNetworkOverview(this.DetectStatus),
      statuses: this.DetectStatus
    });
  }

  /**
   * Get overall network quality grade
   */
  private getNetworkOverview(statuses: Record<string, DetectStatusItem>): TypeGradeResult {
    const statusList = Object.values(statuses);

    if (statusList.every((status) => status.grade === NETWORK_QUALITY_EXCELLENT.key)) {
      return {
        grade: NETWORK_QUALITY_EXCELLENT.key,
        gradeName: ResourceManager.getString(NETWORK_QUALITY_EXCELLENT.localName)
      };
    }

    if (statusList.every((status) => status.grade === NETWORK_QUALITY_GOOD.key)) {
      return {
        grade: NETWORK_QUALITY_GOOD.key,
        gradeName: ResourceManager.getString(NETWORK_QUALITY_GOOD.localName)
      };
    }

    return {
      grade: NETWORK_QUALITY_POOR.key,
      gradeName: ResourceManager.getString(NETWORK_QUALITY_POOR.localName)
    };
  }

  /**
   * Get grade for a specific resource type
   */
  private getTypeGrade(checkLists: Record<string, DetectResult>): TypeGradeResult {
    const resultList = Object.values(checkLists);

    if (resultList.some((result) => result.intensity.grade === NETWORK_QUALITY_EXCELLENT.key)) {
      return {
        grade: NETWORK_QUALITY_EXCELLENT.key,
        gradeName: ResourceManager.getString(NETWORK_QUALITY_EXCELLENT.localName)
      };
    }

    if (resultList.some((result) => result.intensity.grade === NETWORK_QUALITY_GOOD.key)) {
      return {
        grade: NETWORK_QUALITY_GOOD.key,
        gradeName: ResourceManager.getString(NETWORK_QUALITY_GOOD.localName)
      };
    }

    return {
      grade: NETWORK_QUALITY_POOR.key,
      gradeName: ResourceManager.getString(NETWORK_QUALITY_POOR.localName)
    };
  }

  /**
   * Calculate network intensity based on duration and grade thresholds
   */
  private getNetworkIntensity(duration: number, grade: NetworkGrade): NetworkIntensity {
    if (duration <= grade.excellent) {
      return {
        grade: NETWORK_QUALITY_EXCELLENT.key,
        gradeName: ResourceManager.getString(NETWORK_QUALITY_EXCELLENT.localName),
        duration
      };
    }

    if (duration > grade.excellent && duration <= grade.good) {
      return {
        grade: NETWORK_QUALITY_GOOD.key,
        gradeName: ResourceManager.getString(NETWORK_QUALITY_GOOD.localName),
        duration
      };
    }

    return {
      grade: NETWORK_QUALITY_POOR.key,
      gradeName: ResourceManager.getString(NETWORK_QUALITY_POOR.localName),
      duration
    };
  }

  /**
   * Detect core resource network for a specific type
   */
  private async detectCoreResNetwork(type: string): Promise<Record<string, DetectResult> | null> {
    const results: Record<string, DetectResult> = {};
    const resources = this.ossBuckets[type];

    if (!resources) {
      return null;
    }

    for (const resource of resources) {
      const resourceKey = Object.keys(resource)[0];
      const resourceValue = Object.values(resource)[0] as DetectResource;

      try {
        results[resourceKey] = await this.detectNetworkSpeed(resourceValue, type, resourceKey);
      } catch (error) {
        results[resourceKey] = error as DetectResult;
      }
    }

    return results;
  }
}