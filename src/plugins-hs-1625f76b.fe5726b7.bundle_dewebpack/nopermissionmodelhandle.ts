import { ModelHandle } from './ModelHandle';
import { HSApp } from './HSApp';

interface InitParams {
  designId: string;
}

interface InitResult {
  cancel: boolean;
}

interface DesignCheckData {
  designId: string;
}

interface DesignDetailResponse {
  ret: string[];
  data?: {
    caseId: string;
  };
}

declare const NWTK: {
  mtop: {
    Design: {
      checkDesignDetailPage(params: { data: DesignCheckData }): Promise<DesignDetailResponse>;
    };
  };
};

declare const CryptoJS: {
  enc: {
    Base64: {
      stringify(words: unknown): string;
    };
    Utf8: {
      parse(str: string): unknown;
    };
  };
  MD5(message: string): {
    toString(): string;
  };
};

export class NoPermissionModelHandle extends ModelHandle {
  isHeartbeat: boolean;

  constructor() {
    super();
    this.isHeartbeat = false;
  }

  async init(params: InitParams): Promise<InitResult> {
    await this.jumpToDesignCaseDetail(params.designId);
    return {
      cancel: true
    };
  }

  jumpToDesignCaseDetail(designId: string): Promise<void> {
    const data: DesignCheckData = {
      designId
    };

    return NWTK.mtop.Design.checkDesignDetailPage({ data })
      .then((response: DesignDetailResponse) => {
        const responseData = response.data;
        
        if (response?.ret[0]?.includes('SUCCESS') && responseData?.caseId) {
          const encodedCaseId = this.encode(responseData.caseId);
          let redirectUrl = `${HSApp.PartnerConfig.EZHOME_DESIGN_CASE}anlixiangqing/my/${encodedCaseId}${responseData.caseId}`;
          
          if (HSApp.Config.TENANT === 'fp') {
            redirectUrl = `${HSApp.PartnerConfig.EZHOME_DESIGN_CASE}projectDetail/${responseData.caseId}?permission=no`;
          }
          
          window.location.replace(redirectUrl);
        }
      })
      .catch((error: unknown) => {
        // Error handling can be implemented here
      });
  }

  encode(caseId: string): string {
    const SALT = 'mPrkjU^q6z3Md53wKfRTA4lQ#xUMieu@';
    const saltedCaseId = caseId + SALT;
    const base64Encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(saltedCaseId));
    const md5Hash = CryptoJS.MD5(base64Encoded).toString();
    const SUBSTR_START = 16;
    
    return md5Hash.substr(SUBSTR_START);
  }
}