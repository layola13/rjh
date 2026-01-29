interface BenefitInfo {
  actionType: string;
  useful?: boolean;
  payload?: Record<string, unknown>;
  group?: BenefitGroupItem[];
}

interface BenefitGroupItem {
  actionType: string;
  useful?: boolean;
  payload?: Record<string, unknown>;
}

interface Benefit {
  actionType: string;
  useful?: boolean;
  payload?: Record<string, unknown>;
  group?: Record<string, { useful: boolean; payload: Record<string, unknown> }>;
}

interface QueryBenefitsParams {
  types?: string[];
  group?: string[];
}

interface CheckBenefitParams {
  type: string | string[];
  group?: string[];
  needRefresh?: boolean;
}

interface MtopResult<T> {
  data?: {
    status?: {
      code?: number;
    };
    result?: {
      success?: boolean;
      benefitInfos?: T[];
    };
  };
}

declare const NWTK: {
  mtop: {
    User: {
      benefitsV2(params: { data: QueryBenefitsParams }): Promise<{ benefitInfos?: BenefitInfo[] }>;
      benefitCost(params: { data: { actionType: string; cost: number; type: number } }): Promise<MtopResult<unknown>>;
    };
  };
};

declare const HSApp: {
  Config: {
    TENANT: string;
  };
};

declare const adskUser: Record<string, boolean>;

declare namespace HSCore.Util {
  class Signal<T = unknown> {
    dispatch(data: T): void;
  }
}

declare function handleMtopResult<T>(promise: Promise<{ benefitInfos?: T[] }>): Promise<{ benefitInfos?: T[] }>;

const USER_BENEFIT_FLAGS = ["hideTeamModelLibrary"];

const EZHOME_BENEFIT_TYPES = [
  "manualLight",
  "beautifyPic",
  "outdoorScene",
  "Lightmix",
  "cadExport",
  "bomExport",
  "iesLight",
  "stairModelUse",
  "multistory",
  "roof",
  "hydropower"
];

export class BenefitsManager {
  private benefits: Record<string, Benefit> = {};
  public signalUpdated = new HSCore.Util.Signal<Record<string, Benefit>>();

  /**
   * Reset user benefit flags
   */
  resetUserBenefits(): void {
    USER_BENEFIT_FLAGS.forEach((flag) => {
      adskUser[flag] = false;
    });
  }

  /**
   * Query user benefits from server
   */
  async queryUserBenefitsV2(params: QueryBenefitsParams): Promise<BenefitInfo[]> {
    return handleMtopResult(NWTK.mtop.User.benefitsV2({ data: params }))
      .then((response) => response.benefitInfos || []);
  }

  /**
   * Check user benefit status
   */
  async checkUserBenefit(params: CheckBenefitParams): Promise<Benefit[]> {
    const { type, group = ["toolLabel"], needRefresh = false } = params;
    const types = Array.isArray(type) ? type : [type];
    
    let benefitCache = types.map((benefitType) => ({
      type: benefitType,
      benefit: undefined as Benefit | undefined
    }));

    if (!needRefresh) {
      benefitCache = types.map((benefitType) => ({
        type: benefitType,
        benefit: this.benefits[benefitType]
      }));
    }

    const missingBenefits = benefitCache.filter((item) => !item.benefit);

    if (missingBenefits.length > 0 || needRefresh) {
      await this.updateUserBenefits({
        types: missingBenefits.map((item) => item.type),
        group
      });
    }

    if (Array.isArray(type)) {
      return types.map((benefitType) => this.benefits[benefitType]);
    }

    return [this.benefits[type]];
  }

  /**
   * Update user benefits from server or window cache
   */
  async updateUserBenefits(params: QueryBenefitsParams): Promise<BenefitInfo[]> {
    let benefitInfos: BenefitInfo[] = [];

    if ((window as any).benefitInfos?.length > 0) {
      benefitInfos = (window as any).benefitInfos;
      (window as any).benefitInfos = [];
    } else {
      benefitInfos = await this.queryUserBenefitsV2(params);
    }

    this.setBenefits(benefitInfos);
    return benefitInfos;
  }

  /**
   * Set multiple benefits
   */
  setBenefits(benefitInfos: BenefitInfo[]): void {
    benefitInfos.forEach((benefitInfo) => {
      this.setBenefit(benefitInfo);
    });
    this.signalUpdated.dispatch(this.benefits);
  }

  /**
   * Initialize user benefits on app start
   */
  async initUserBenefits(): Promise<BenefitInfo[]> {
    this.resetUserBenefits();

    let queryParams: QueryBenefitsParams = {
      group: ["whiteLabel", "toolLabel"]
    };

    if (HSApp.Config.TENANT === "ezhome") {
      queryParams = {
        types: EZHOME_BENEFIT_TYPES
      };
    }

    return this.updateUserBenefits(queryParams);
  }

  /**
   * Pay trial cost for a benefit
   */
  payTrialCost(actionType: string): Promise<boolean> {
    return NWTK.mtop.User.benefitCost({
      data: {
        actionType,
        cost: 1,
        type: 0
      }
    }).then((response) => {
      const statusCode = response.data?.status?.code;
      const isSuccess = response.data?.result?.success;

      if (statusCode === 0 || isSuccess) {
        this.updateUserBenefits({ types: [actionType] });
        return true;
      }

      return false;
    });
  }

  /**
   * Set individual benefit data
   */
  setBenefit(benefitInfo: BenefitInfo): void {
    const { actionType, payload, group, ...rest } = benefitInfo;

    this.benefits[actionType] = benefitInfo as Benefit;

    if (HSApp.Config.TENANT === "ezhome" && !payload) {
      this.benefits[actionType].payload = rest as Record<string, unknown>;
    }

    if (group?.length) {
      this.benefits[actionType].group = group.reduce((acc, item) => {
        const { actionType: groupAction, useful = false, payload: groupPayload = {} } = item;
        
        acc[groupAction] = {
          useful,
          payload: groupPayload
        };

        if (USER_BENEFIT_FLAGS.includes(groupAction) && useful) {
          adskUser[groupAction] = true;
        }

        return acc;
      }, {} as Record<string, { useful: boolean; payload: Record<string, unknown> }>);
    }
  }
}