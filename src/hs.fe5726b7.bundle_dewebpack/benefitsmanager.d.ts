/**
 * 用户权益管理器
 * 负责查询、更新和管理用户的各种权益状态
 */

import { HSCore } from './HSCore';
import { Signal } from './Signal';

/**
 * 权益类型枚举
 */
type BenefitType = 
  | 'manualLight'
  | 'beautifyPic'
  | 'outdoorScene'
  | 'Lightmix'
  | 'cadExport'
  | 'bomExport'
  | 'iesLight'
  | 'stairModelUse'
  | 'multistory'
  | 'roof'
  | 'hydropower'
  | 'hideTeamModelLibrary';

/**
 * 权益组类型
 */
type BenefitGroup = 'whiteLabel' | 'toolLabel';

/**
 * 权益负载数据
 */
interface BenefitPayload {
  [key: string]: unknown;
}

/**
 * 组内权益信息
 */
interface GroupBenefitInfo {
  /** 权益是否可用 */
  useful: boolean;
  /** 权益附加数据 */
  payload: BenefitPayload;
}

/**
 * 权益信息完整结构
 */
interface BenefitInfo {
  /** 权益动作类型 */
  actionType: BenefitType;
  /** 权益是否可用 */
  useful?: boolean;
  /** 权益附加数据 */
  payload?: BenefitPayload;
  /** 权益所属分组 */
  group?: Array<{
    actionType: string;
    useful: boolean;
    payload?: BenefitPayload;
  }>;
}

/**
 * 查询权益参数
 */
interface QueryBenefitsParams {
  /** 权益类型列表 */
  types?: BenefitType[];
  /** 权益分组 */
  group?: BenefitGroup[];
}

/**
 * 检查权益参数
 */
interface CheckBenefitParams {
  /** 权益类型（单个或数组） */
  type: BenefitType | BenefitType[];
  /** 权益分组，默认为 ['toolLabel'] */
  group?: BenefitGroup[];
  /** 是否强制刷新 */
  needRefresh?: boolean;
}

/**
 * MTOP 响应结构
 */
interface MtopResponse<T> {
  data?: {
    status?: {
      code?: number;
    };
    result?: T;
  };
}

/**
 * 权益消费响应
 */
interface BenefitCostResult {
  success: boolean;
}

/**
 * 用户权益属性
 */
interface UserBenefitFlags {
  hideTeamModelLibrary?: boolean;
}

/**
 * 全局用户对象（扩展）
 */
declare global {
  interface Window {
    benefitInfos?: BenefitInfo[];
    adskUser: UserBenefitFlags;
    HSApp: {
      Config: {
        TENANT: string;
      };
    };
    NWTK: {
      mtop: {
        User: {
          benefitsV2(params: { data: QueryBenefitsParams }): Promise<{ benefitInfos?: BenefitInfo[] }>;
          benefitCost(params: { data: { actionType: BenefitType; cost: number; type: number } }): Promise<MtopResponse<BenefitCostResult>>;
        };
      };
    };
  }
}

/** 用户对象属性列表 */
const USER_BENEFIT_FLAGS: ReadonlyArray<keyof UserBenefitFlags> = ['hideTeamModelLibrary'];

/** EZHome 租户专用权益类型 */
const EZHOME_BENEFIT_TYPES: readonly BenefitType[] = [
  'manualLight',
  'beautifyPic',
  'outdoorScene',
  'Lightmix',
  'cadExport',
  'bomExport',
  'iesLight',
  'stairModelUse',
  'multistory',
  'roof',
  'hydropower'
] as const;

/**
 * 用户权益管理器
 * 提供权益查询、更新、消费等核心功能
 */
export class BenefitsManager {
  /** 权益信息缓存 */
  private benefits: Record<string, BenefitInfo> = {};
  
  /** 权益更新信号 */
  public signalUpdated: Signal<Record<string, BenefitInfo>>;

  constructor() {
    this.signalUpdated = new HSCore.Util.Signal();
  }

  /**
   * 重置用户权益标志位
   * 将所有用户对象上的权益标志设置为 false
   */
  public resetUserBenefits(): void {
    USER_BENEFIT_FLAGS.forEach((flag) => {
      window.adskUser[flag] = false;
    });
  }

  /**
   * 查询用户权益（V2 接口）
   * @param params 查询参数
   * @returns 权益信息列表
   */
  public async queryUserBenefitsV2(params: QueryBenefitsParams): Promise<BenefitInfo[]> {
    const result = await window.NWTK.mtop.User.benefitsV2({ data: params });
    return result.benefitInfos ?? [];
  }

  /**
   * 检查用户权益状态
   * @param params 检查参数
   * @returns 权益信息数组
   */
  public async checkUserBenefit(params: CheckBenefitParams): Promise<BenefitInfo[]> {
    const { type, group = ['toolLabel'], needRefresh = false } = params;
    
    const typeList = Array.isArray(type) ? type : [type];
    
    // 构建待检查列表
    let benefitCheckList = typeList.map((benefitType) => ({
      type: benefitType,
      benefit: needRefresh ? undefined : this.benefits[benefitType]
    }));

    // 过滤出需要更新的权益
    const needUpdateList = benefitCheckList.filter((item) => !item.benefit);

    if (needUpdateList.length > 0 || needRefresh) {
      await this.updateUserBenefits({
        types: needUpdateList.map((item) => item.type),
        group
      });
    }

    // 返回结果
    if (Array.isArray(type)) {
      return typeList.map((benefitType) => this.benefits[benefitType]);
    }
    
    return [this.benefits[type]];
  }

  /**
   * 更新用户权益信息
   * @param params 查询参数
   * @returns 权益信息列表
   */
  public async updateUserBenefits(params: QueryBenefitsParams): Promise<BenefitInfo[]> {
    let benefitInfos: BenefitInfo[] = [];

    // 优先使用 window 缓存的权益数据
    if (window.benefitInfos?.length > 0) {
      benefitInfos = window.benefitInfos;
      window.benefitInfos = [];
    } else {
      benefitInfos = await this.queryUserBenefitsV2(params);
    }

    this.setBenefits(benefitInfos);
    return benefitInfos;
  }

  /**
   * 批量设置权益信息
   * @param benefitInfos 权益信息列表
   */
  public setBenefits(benefitInfos: BenefitInfo[]): void {
    benefitInfos.forEach((info) => {
      this.setBenefit(info);
    });
    
    this.signalUpdated.dispatch(this.benefits);
  }

  /**
   * 初始化用户权益
   * 根据租户类型加载不同的权益配置
   * @returns 权益信息列表
   */
  public async initUserBenefits(): Promise<BenefitInfo[]> {
    this.resetUserBenefits();

    let queryParams: QueryBenefitsParams = {
      group: ['whiteLabel', 'toolLabel']
    };

    // EZHome 租户使用特定权益类型
    if (window.HSApp.Config.TENANT === 'ezhome') {
      queryParams = {
        types: [...EZHOME_BENEFIT_TYPES]
      };
    }

    return this.updateUserBenefits(queryParams);
  }

  /**
   * 支付试用消费
   * @param actionType 权益类型
   * @returns 是否支付成功
   */
  public async payTrialCost(actionType: BenefitType): Promise<boolean> {
    const response = await window.NWTK.mtop.User.benefitCost({
      data: {
        actionType,
        cost: 1,
        type: 0
      }
    });

    const statusCode = response.data?.status?.code;
    const isSuccess = response.data?.result?.success;

    if (statusCode === 0 || isSuccess) {
      await this.updateUserBenefits({ types: [actionType] });
      return true;
    }

    return false;
  }

  /**
   * 设置单个权益信息
   * @param benefitInfo 权益信息
   */
  public setBenefit(benefitInfo: BenefitInfo): void {
    const { actionType, payload, group, ...restProps } = benefitInfo;

    this.benefits[actionType] = benefitInfo;

    // EZHome 租户特殊处理：如果没有 payload，使用剩余属性
    if (window.HSApp.Config.TENANT === 'ezhome' && !payload) {
      this.benefits[actionType].payload = restProps as BenefitPayload;
    }

    // 处理分组权益
    if (group?.length) {
      this.benefits[actionType].group = group.reduce((acc, groupItem) => {
        const { actionType: groupActionType, useful = false, payload: groupPayload = {} } = groupItem;
        
        acc[groupActionType] = {
          useful,
          payload: groupPayload
        };

        // 更新用户对象标志位
        if (USER_BENEFIT_FLAGS.includes(groupActionType as keyof UserBenefitFlags) && useful) {
          window.adskUser[groupActionType as keyof UserBenefitFlags] = true;
        }

        return acc;
      }, {} as Record<string, GroupBenefitInfo>);
    }
  }
}