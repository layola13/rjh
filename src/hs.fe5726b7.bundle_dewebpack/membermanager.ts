interface MemberData {
  groupUser?: boolean;
  groupInfo?: EnterpriseInfo;
  memberType?: number;
  stylerMember?: boolean;
  portfolioMember?: boolean;
}

interface EnterpriseInfo {
  paidMember?: boolean;
  validMember?: boolean;
  latestRenderMemberType?: number;
}

interface MemberInfo {
  memberType: number;
  stylerMember?: boolean;
  portfolioMember?: boolean;
  paidMember?: boolean;
  validMember?: boolean;
  enterpriseInfo?: EnterpriseInfo | boolean;
  latestRenderMemberType?: number;
}

interface QueryMemberInfoResult {
  memberInfo: MemberInfo;
  data: MemberData;
}

interface UpdateMemberInfoResult {
  data?: MemberData;
  memberInfo: MemberInfo;
}

declare global {
  interface Window {
    userMemberInfo?: MemberData | null;
    NWTK?: {
      mtop: {
        MemberGrade: {
          getUserActiveMemberScoreInfo: () => Promise<unknown>;
        };
      };
    };
  }
}

export class MemberManager {
  private memberInfo: MemberInfo;
  private memberData?: MemberData;

  constructor() {
    this.memberInfo = {
      memberType: 0,
      stylerMember: false,
      paidMember: false,
      validMember: false
    };
  }

  async queryMemberInfo(): Promise<QueryMemberInfoResult> {
    const data = await this.handleMtopResult(
      window.NWTK?.mtop.MemberGrade.getUserActiveMemberScoreInfo()
    );
    
    return {
      memberInfo: this.getMemberInfo(data),
      data
    };
  }

  async updateMemberInfo(forceQuery: boolean = true): Promise<UpdateMemberInfoResult> {
    if (window.userMemberInfo != null) {
      this.memberData = window.userMemberInfo;
      this.memberInfo = this.getMemberInfo(this.memberData);
      window.userMemberInfo = null;
    } else if (forceQuery || !this.memberData) {
      const result = await this.queryMemberInfo();
      this.memberData = result.data;
      this.memberInfo = result.memberInfo;
    }

    return {
      data: this.memberData,
      memberInfo: this.memberInfo
    };
  }

  private getMemberInfo(data: MemberData): MemberInfo {
    const { groupUser, groupInfo, memberType } = data;

    return {
      memberType: groupUser ? 4 : memberType ?? 1,
      stylerMember: data.stylerMember,
      portfolioMember: data.portfolioMember,
      paidMember: groupUser && groupInfo?.paidMember,
      validMember: groupUser && groupInfo?.validMember,
      enterpriseInfo: groupUser && groupInfo,
      latestRenderMemberType: groupUser && groupInfo?.latestRenderMemberType
    };
  }

  private async handleMtopResult(promise: Promise<unknown> | undefined): Promise<MemberData> {
    // Implementation depends on handleMtopResult from module 117321
    // Placeholder - actual implementation should match the imported function
    const result = await promise;
    return result as MemberData;
  }
}