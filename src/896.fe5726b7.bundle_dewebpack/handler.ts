import { Signal } from './Signal';

interface VipCycleRecord {
  vipType: string;
  status: string;
}

interface VipData {
  data?: {
    code?: string;
    data?: VipCycleRecord[];
  };
}

interface VipInfo {
  vipType: string;
  status: 'in_use' | 'finished';
  expireTime?: number;
  isAboutToExpire?: boolean;
  isVip?: boolean;
  showSale?: boolean;
}

interface UserInfoPlugin {
  updateLoginMenuClassName(config: { id: string; className: string }): void;
  updateItem(item: UserInfoItem): void;
  addItem(item: UserInfoItem): void;
}

interface UserInfoItem {
  id: string;
  className: string;
  order: number;
  type: string;
  label: unknown;
  visible: boolean;
}

interface LoginData {
  data?: {
    isLogin?: boolean;
  };
}

interface MarketModalOptions {
  onClose?: () => void;
}

const VIP_EXPIRE_WARNING_TIME = 6048e5; // 7 days in milliseconds

export class Handler {
  private useVipInfo?: VipInfo;
  private useVipInfoAdded: boolean = false;
  private markertModal?: unknown;
  public vipInfoChangedSignal: Signal;

  constructor() {
    this.initData = this.initData.bind(this);
    this.toBuyPage = this.toBuyPage.bind(this);
    this.showMarketModal = this.showMarketModal.bind(this);
    this.vipInfoChangedSignal = new HSCore.Util.Signal();
  }

  public init(): void {
    if (adskUser.isLogin()) {
      this.initData();
    } else {
      adskUser.signalLoginCompleted.listen((loginData: LoginData) => {
        const data = loginData.data;
        if (data?.isLogin) {
          this.initData();
        }
      });
    }
  }

  public getVipInfo(): VipInfo | undefined {
    return this.useVipInfo;
  }

  private async initData(): Promise<void> {
    this.useVipInfo = await this.getData();
    this.vipInfoChangedSignal.dispatch(this.useVipInfo);
    await this.initFloatInfo();
    this.initUserInfo();
  }

  private async initFloatInfo(): Promise<void> {
    renderFloatButton(this.useVipInfo, this.showMarketModal);
  }

  private initUserInfo(): void {
    const app = HSApp.App.getApp();
    const userInfoPlugin = app.pluginManager.getPlugin(
      HSFPConstants.PluginType.UserInfo
    ) as UserInfoPlugin;

    const config = getConfig(this.useVipInfo!.vipType);
    const className = config?.getUserInfoClassName(this.useVipInfo!) || '';

    userInfoPlugin.updateLoginMenuClassName({
      id: 'user-vip-info',
      className,
    });

    const itemConfig: UserInfoItem = {
      id: 'user-vip-info',
      className: 'user-vip',
      order: 1,
      type: 'custom',
      label: getUserInfoItem(this.useVipInfo!, this.toBuyPage),
      visible: true,
    };

    if (this.useVipInfoAdded) {
      userInfoPlugin.updateItem(itemConfig);
    } else {
      userInfoPlugin.addItem(itemConfig);
      this.useVipInfoAdded = true;
    }
  }

  private async getData(): Promise<VipInfo> {
    const promises = [
      getUserVip(),
      getVipRecords(),
      vipNoticeCheckExpire(),
    ];

    const [userVip, vipRecords, expireNotice] = await Promise.all(promises);

    let vipInfo: VipInfo;

    if (userVip?.vipType) {
      const validStatuses = ['in_use', 'finished'];
      const matchedRecord = (vipRecords || []).find(
        (record: VipCycleRecord) => record.vipType === userVip.vipType
      );

      const isAboutToExpire =
        userVip.expireTime != null &&
        userVip.expireTime - Date.now() < VIP_EXPIRE_WARNING_TIME;

      if (matchedRecord) {
        vipInfo = {
          vipType: userVip.vipType,
          status: validStatuses.includes(matchedRecord.status)
            ? matchedRecord.status
            : 'finished',
          expireTime: userVip.expireTime,
          isAboutToExpire,
        };
      } else {
        vipInfo = {
          vipType: userVip.vipType,
          status: userVip.expireTime > Date.now() ? 'in_use' : 'finished',
          expireTime: userVip.expireTime,
          isAboutToExpire,
        };
      }
    } else {
      const firstRecord = vipRecords?.[0];
      if (firstRecord?.vipType && firstRecord.status === 'finished') {
        vipInfo = {
          vipType: firstRecord.vipType,
          status: firstRecord.status,
        };
      } else {
        vipInfo = {
          vipType: 'notVip',
          status: 'in_use',
        };
      }
    }

    const isValidVipType = ['base', 'high'].some((type) =>
      vipInfo.vipType.includes(type)
    );
    if (isValidVipType && vipInfo.status === 'in_use') {
      vipInfo.isVip = true;
    }

    if (vipInfo.isVip && expireNotice) {
      vipInfo.isAboutToExpire = expireNotice && vipInfo.isAboutToExpire;
    }

    const showSale = await this.fetchVipCycleRecords();
    vipInfo.showSale = showSale;

    return vipInfo;
  }

  private fetchVipCycleRecords = async (): Promise<boolean> => {
    const response: VipData = await NWTK.mtop.MemberGrade.fetchVipCycleRecords();
    const records = response.data?.data || [];

    if (response.data?.code === 'SUCCESS') {
      return records.length === 0;
    }

    return false;
  };

  private refreshBenefits = (): void => {
    const app = HSApp.App.getApp();
    this.initData();

    const firstLoginPlugin = app.pluginManager.getPlugin(
      'hsw.brand.ezhome.firstlogin.Plugin'
    );
    if (firstLoginPlugin) {
      firstLoginPlugin.getUserBenefitsV2?.();
      firstLoginPlugin.getUserEquity?.();
    }

    const renderPlugin = app.pluginManager.getPlugin(
      'hsw.plugin.render.Plugin'
    );
    if (renderPlugin) {
      renderPlugin.initRenderTypeNums();
    }
  };

  public toBuyPage(): void {
    const buyPageUrl = HSApp.Config.VIP_BUY_PAGE;
    window.open(buyPageUrl, '_blank');
    this.recordData();
  }

  private recordData(): void {
    const app = HSApp.App.getApp();
    const isRenderEnvironment = app.activeEnvironmentId === 'render';

    app.userTrackLogger.push(
      isRenderEnvironment
        ? 'rendertopbar.membership.buy.entry'
        : 'statusbar.membership.buy.entry',
      {
        activeSection: isRenderEnvironment ? '' : HSApp.Util.EventGroupEnum.Statusbar,
        activeSectionName: isRenderEnvironment ? '' : '状态栏',
        description: '会员权益购买',
      },
      {}
    );
  }

  public showMarketModal(
    firstArg: unknown,
    sourcePage: string,
    options?: MarketModalOptions
  ): void {
    const envPrefix = HSApp.Config.ENV === 'pre' ? 'pre-' : '';

    if (HSApp.Config.VERSION === 'ea') {
      const url = `https://${envPrefix}b.shejijia.com/topic/equitycenter#image`;
      window.open(url, '_blank');
    } else {
      if (this.markertModal) {
        unmountMarketModal();
      }

      this.markertModal = null;
      this.markertModal = renderMarketModal(firstArg, sourcePage, {
        ...options,
        onClose: () => {
          this.refreshBenefits();
          options?.onClose?.();
        },
      });

      HSApp.Util.EventTrack.instance().track(
        HSApp.Util.EventGroupEnum.Pageheader,
        'more_benefits_event',
        {
          sourcePage,
        }
      );
    }

    this.recordData();
  }

  public closeMarketModal(): void {
    unmountMarketModal();
  }
}