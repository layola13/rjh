import { Signal } from 'HSCore.Util';
import { BenefitsManager } from './BenefitsManager';
import { MemberManager } from './MemberManager';
import { PermissionsManager } from './PermissionsManager';
import { MerchantCustomizedConfig } from './MerchantCustomizedConfig';

interface GrowthOption {
  grade: string;
  growth: number;
  next: number;
  url: string;
  isBinding: number;
}

interface CustomizedSetting {
  default3DView: HSCore.Model.CameraTypeEnum;
  firstPersonCameraRotationType: number;
  mouseLeftAndRightButtonSetting: number;
  concealedWorkDimensionType: number;
}

interface CustomHdrData {
  hdrList: unknown[];
  inProcessing: number;
  queryStartTime: number;
}

interface MemberInfo {
  [key: string]: unknown;
}

interface BenefitPayload {
  benefitMetas?: Array<{ value: string }>;
  [key: string]: unknown;
}

interface BenefitGroup {
  [key: string]: {
    useful: boolean;
    payload: BenefitPayload;
  };
}

interface Benefit {
  useful?: boolean;
  payload?: BenefitPayload;
  group?: BenefitGroup;
}

interface Benefits {
  [key: string]: Benefit;
}

interface Permissions {
  [key: string]: unknown;
}

interface PluginStorage {
  sessionKey?: string;
  uid?: string;
  token?: string;
  expiredTime?: number;
}

interface SigninPlugin {
  getStorage(): PluginStorage | undefined;
  appendStorage(key: string, value: string): void;
  clearStorage(): void;
}

interface LoginSuccessData {
  isLogin: boolean;
  needRefresh?: boolean;
}

interface SignoutData {
  sid: string;
  type: string;
}

const DEFAULT_PHOTO_URL = '/default-avatar.png';

export class AdskUser {
  public sid = '';
  public unitTag = '';
  public name = '';
  public photo = '';
  public email = '';
  public hasCoupon = false;
  public userEquities: unknown[] = [];
  public growthOption: GrowthOption = {
    grade: '',
    growth: 0,
    next: 0,
    url: '',
    isBinding: 0,
  };
  public app: HSApp.App | undefined = undefined;
  public userIdentity = '';
  public agentId = '';
  public employeeId = '';
  public enterpriseId = '';
  public memberEquity: Record<string, unknown> = {};
  public memberAllEquity: Record<string, unknown> = {};
  public uid = '';
  public provider = '';
  public uType = '';
  public memberId = '';
  public mobilePhone = '';
  public userType = '';
  public renderNotify = false;
  public is3dGeneralWhitelist = false;
  public isRenderWhitelist = false;
  public oAuthToken = '';
  public gradeId = '';
  public hasRate = false;
  public originalPermisson = false;
  public isEnterprise = false;
  public isEnterpriseAgent = false;
  public removeToIndividual = false;
  public removeTemplates = false;
  public removeContactSupport = false;
  public keepDIY1InCatalog = false;
  public isSmartAccessories = false;
  public isHardUpGrade = false;
  public showClientDownloadEntry = false;
  public isVifaAccount = false;
  public isPersonalUserOfCW = false;
  public isEnterpriseUserOfCW = false;
  public enablenewfptip = false;
  public exportPicColorOffline = false;
  public agentTeamName = '';
  public agentTeamId = '';
  public isEnterpriseOfCad = false;
  public isEmployeeOfCad = false;
  public isPersonOfCad = false;
  public newfpCreateDocumentTipInBlackList = false;
  public isLowResolutionMovement = false;
  public apartmentCustomizedUI = false;
  public kanfangCustomizedUI = false;
  public enableExpertTemplate = false;
  public liveDesignOperation = false;
  public storeSmartLayout = false;
  public customizedSetting: CustomizedSetting = {
    default3DView: HSCore.Model.CameraTypeEnum.OrbitView,
    firstPersonCameraRotationType: 1,
    mouseLeftAndRightButtonSetting: 0,
    concealedWorkDimensionType: 0,
  };
  public customHdrData: CustomHdrData = {
    hdrList: [],
    inProcessing: 0,
    queryStartTime: 0,
  };
  public merchentCustomizedConfig: MerchantCustomizedConfig;
  public enable3dFurnishing = false;
  public permissions: Permissions = {};
  public isShowSaveSuccessPopup = true;

  public readonly EVENT_LOGIN_SUCCESS = 'EVENT_LOGIN_SUCCESS';
  public readonly EVENT_CALLBACK_FUN = 'EVENT_CALLBACK_FUN';

  public signalLoginCompleted = new Signal();
  public signalGetRenderImageTypeNums = new Signal();
  public signalMerchentCustomizedConfigChanged = new Signal();

  public memberMananger: MemberManager;
  public benefitManager: BenefitsManager;
  public permissionsManager: PermissionsManager;

  constructor() {
    this.merchentCustomizedConfig = new MerchantCustomizedConfig();
    this.benefitManager = new BenefitsManager();
    this.memberMananger = new MemberManager();
    this.permissionsManager = new PermissionsManager();
    this.init();
  }

  get memberInfo(): MemberInfo {
    return this.memberMananger.memberInfo;
  }

  get benefits(): Benefits {
    return this.benefitManager.benefits;
  }

  private init(): void {
    this.afterInit();
    this.app = HSApp.App.getApp();
  }

  private afterInit(): void {
    $('.dropdown-toggle').dropdown();
  }

  public registerErrorHandler(): void {
    NWTK.ajax.registerErrorHandler((response: { status: number }) => {
      if (response.status === 401) {
        this.openLoginWindow();
      }
    });
  }

  public unRegisterAllErrorHandlers(): void {
    NWTK.ajax.unRegisterAllErrorHandlers();
  }

  public buildTenant(): string {
    return `&tenant=${this.app?.appParams.tenant ?? ''}`;
  }

  public isLogin(): boolean {
    let loggedIn = !!(this.sid && this.getUserSessionId());

    if (loggedIn) {
      const tokenExpiredTime = this.getTokenExpiredTime();
      const currentTime = Math.floor(Date.now());
      loggedIn = loggedIn && (!tokenExpiredTime || tokenExpiredTime > currentTime);
    }

    return loggedIn;
  }

  public getUserSessionId(): string | undefined {
    const storage = this.getSigninPlugin()?.getStorage();
    return storage?.sessionKey;
  }

  public setUserSessionId(sessionKey: string): void {
    if (sessionKey) {
      this.getSigninPlugin()?.appendStorage('sessionKey', sessionKey);
    }
  }

  public getUserId(): string | undefined {
    const storage = this.getSigninPlugin()?.getStorage();
    return storage?.uid;
  }

  public setUserId(userId: string): void {
    if (userId) {
      this.getSigninPlugin()?.appendStorage('uid', userId);
    }
  }

  public getAccessToken(): string | undefined {
    const storage = this.getSigninPlugin()?.getStorage();
    return storage?.token;
  }

  public getTokenExpiredTime(): number | undefined {
    const storage = this.getSigninPlugin()?.getStorage();
    return storage?.expiredTime;
  }

  public clearSessions(): void {
    this.getSigninPlugin()?.clearStorage();
  }

  public loginSuccess(needRefresh?: boolean): void {
    $('.unlogin').hide();
    $('.loginsuccess').show();
    $('.loginsuccess')
      .find('.user-name span.nametext')
      .attr('title', this.name)
      .html(this.name);

    const photoUrl = this.photo;
    $('.loginsuccess .img-fitter-wrapper img')
      .attr({
        src: photoUrl || DEFAULT_PHOTO_URL,
        alt: this.name,
      })
      .css({
        height: '30px',
        width: '30px',
      });

    $('a.gotomyprofile').attr({
      href: `/userprofile/${this.unitTag}`,
      target: '_blank',
    });

    $('.loginsuccess .img-fitter-wrapper img').on('error', function () {
      $(this).attr('src', DEFAULT_PHOTO_URL);
    });

    $('.loginsuccess').show();
    this.closeLoginWindows();
    this.closeRegisterWindows();
    this.setUserSessionId(this.sid);
    this.setUserId(this.uid);

    if (HSApp.Config.VERSION === 'ea') {
      this.setMerchentCustomizedConfig();
    }

    this.signalLoginCompleted.dispatch({
      isLogin: true,
      needRefresh,
    });

    hsw.plugin.signin.UI.Signals.signalSigninSucceeded.dispatch({
      data: this,
    });

    $('body').trigger(this.EVENT_LOGIN_SUCCESS).trigger(this.EVENT_CALLBACK_FUN);
  }

  public logoutSuccess(): void {
    $('.unlogin').show();
    $('.loginsuccess').hide();
  }

  public checkLogin(sessionId?: string): boolean {
    const sid = sessionId || this.getUserSessionId();

    if (sid) {
      this.sid = sid;
      this.setUserSessionId(sid);
      this.loginSuccess();
      return true;
    } else {
      this.signalLoginCompleted.dispatch({
        isLogin: false,
      });
      this.logoutSuccess();
      return false;
    }
  }

  public checkBenefit(
    benefitKey: string,
    groupKey?: string
  ): { useful?: boolean; payload?: BenefitPayload } | BenefitGroup | undefined {
    const benefit = (this.benefits?.[benefitKey] ?? {}) as Benefit;
    const { useful, payload, group } = benefit;

    if (groupKey) {
      return group?.[groupKey];
    }

    return {
      useful,
      payload,
    };
  }

  public getBenefitMeta(benefitKey: string, groupKey?: string): unknown {
    const benefitData = this.checkBenefit(benefitKey, groupKey) ?? {};
    const { useful, payload } = benefitData as { useful?: boolean; payload?: BenefitPayload };
    const benefitMetas = payload?.benefitMetas;

    let metaValue: unknown;

    if (useful && benefitMetas && benefitMetas.length > 0) {
      const rawValue = benefitMetas[0]?.value;
      try {
        metaValue = JSON.parse(rawValue);
      } catch {
        metaValue = rawValue;
      }
    }

    return metaValue;
  }

  public cleanUserData(logoutParam?: unknown): void {
    this.clearSessions();
    this.logoutSuccess();
    this.email = '';
    this.photo = '';
    this.sid = '';
    this.unitTag = '';
    hsw.plugin.signin.UI.Signals.signalSignoutSucceeded.dispatch(logoutParam);
    $('body').trigger('logoutsuccess');
  }

  public async logOut(logoutParam?: unknown): Promise<void> {
    if (!this.getUserSessionId() && !this.sid) {
      return;
    }

    const signoutData: SignoutData = {
      sid: this.sid,
      type: 'signout',
    };
    hsw.plugin.signin.UI.Signals.signalSignoutClicked.dispatch(signoutData);

    try {
      await hsw.plugin.signin.Handler.signoutrequest();
      this.cleanUserData(logoutParam);

      if (HSApp.Config.TENANT === 'fp') {
        let redirectUrl = window.location.href;
        const logoutUrlBenefit = this.checkBenefit('whiteLabel', 'logoutUrl') as {
          useful?: boolean;
          payload?: BenefitPayload;
        };

        if (
          logoutUrlBenefit?.useful &&
          logoutUrlBenefit.payload?.benefitMetas &&
          logoutUrlBenefit.payload.benefitMetas.length > 0
        ) {
          redirectUrl = logoutUrlBenefit.payload.benefitMetas[0]?.value || redirectUrl;
        }

        if (window.self === window.top) {
          window.location.href = redirectUrl;
        } else {
          window.parent.location.href = redirectUrl;
        }
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  public openPwdResetWindow(): void {
    hsw.plugin.signin.UI.openwindow(hsw.plugin.signin.UI.myforms.forgotpw);
  }

  public openLoginWindow(options?: unknown): void {
    hsw.plugin.signin.UI.openwindow(hsw.plugin.signin.UI.myforms.signin, options);
    const signinPopup = document.querySelector<HTMLElement>('.signinpopup');
    if (signinPopup) {
      signinPopup.style.display = 'block';
    }
    this.app?.hotkey.disable('esc');
  }

  public openUpdateAccountWindow(): void {
    // Implementation needed
  }

  public openRegisterWindow(): void {
    hsw.plugin.signin.UI.openwindow(hsw.plugin.signin.UI.myforms.signup);
  }

  public closePwdResetWindow(): void {
    hsw.plugin.signin.UI.closewindow();
  }

  public closeLoginWindows(): void {
    hsw.plugin.signin.UI.closewindow();
    const signinPopup = document.querySelector<HTMLElement>('.signinpopup');
    if (signinPopup) {
      signinPopup.style.display = 'none';
    }
    this.app?.hotkey.enable('esc');
  }

  public closeRegisterWindows(): void {
    hsw.plugin.signin.UI.closewindow();
  }

  public setMerchentCustomizedConfig(): void {
    NWTK.mtop.User.getUserConfig({
      data: {
        treeId: '',
      },
    })
      .then((response: { data?: unknown }) => {
        if (!response || !response.data) {
          throw new Error('Failed to get user config');
        }
        this.merchentCustomizedConfig.init(response.data);
        this.signalMerchentCustomizedConfigChanged.dispatch();
      })
      .catch((error: Error) => {
        console.error('Set merchant config failed:', error);
      });
  }

  private getSigninPlugin(): SigninPlugin | undefined {
    return this.app?.pluginManager.getPlugin('hsw.plugin.signin.Plugin') as SigninPlugin | undefined;
  }
}

export const adskUser = new AdskUser();