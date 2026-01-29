import { Component, ReactNode } from 'react';
import { Modal, Popover, IconfontView } from './ui-components';
import { HSCore } from './core';
import { DownloadCommissionComponent } from './DownloadCommissionComponent';

interface CommissionInfo {
  count: number;
  amount: string;
  tooltipStatus: number;
  isShowCommission: boolean;
  storeName: string;
  bindStoreName: string;
}

interface CommissionBarState {
  commissionInfo: CommissionInfo;
}

interface CommissionBarProps {
  // Add props if needed
}

interface UpdateCommissionSignalData {
  isShowCommission: boolean;
  amount: string;
  count: number;
  tooltipStatus: number;
  storeName?: string;
  bindStoreName?: string;
}

interface UpdateCommissionSignalEvent {
  data: UpdateCommissionSignalData;
}

interface CommissionPlugin {
  getUpdateCommissionSignal(): unknown;
  getCommissionId(): string[];
}

export default class CommissionBar extends Component<CommissionBarProps, CommissionBarState> {
  private signalHook: HSCore.Util.SignalHook;
  private commissionPlugin: CommissionPlugin;

  constructor(props: CommissionBarProps) {
    super(props);
    
    this.state = {
      commissionInfo: {
        count: 0,
        amount: '0.00',
        tooltipStatus: 0,
        isShowCommission: false,
        storeName: '',
        bindStoreName: ''
      }
    };

    this.signalHook = new HSCore.Util.SignalHook(this);
    this.commissionPlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.Commission
    );
  }

  componentDidMount(): void {
    this.signalHook.listen(
      this.commissionPlugin.getUpdateCommissionSignal(),
      this._onUpdateCommissionSignal.bind(this)
    );
  }

  componentWillUnmount(): void {
    this.signalHook.unlistenAll();
  }

  private _onUpdateCommissionSignal(event: UpdateCommissionSignalEvent): void {
    const {
      isShowCommission,
      amount,
      count,
      tooltipStatus,
      storeName = '',
      bindStoreName = ''
    } = event.data;

    this.setState({
      commissionInfo: {
        count,
        amount,
        tooltipStatus,
        isShowCommission,
        storeName,
        bindStoreName
      }
    });
  }

  private openVerification(): void {
    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.CommissionBar,
      'jumpto_xuanpin_event'
    );

    const targetUrl = encodeURIComponent(
      'https://jia.taobao.com/workbench/xuanpin/home?spm=a214ky.13184254.0.0&entranceKey=3D_xuanpin_normal'
    );
    const url = `https://${HSApp.Config.EZHOME_HOST}/hs-statics/verification.html?targetUrl=${targetUrl}`;

    window.open(url, '_blank', 'noopener=yes, noreferrer=yes');
  }

  private downloadCommission(): void {
    const commissionIds = this.commissionPlugin.getCommissionId();

    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.CommissionBar,
      'jumpto_download_commission_event'
    );

    Modal.simple({
      title: ResourceManager.getString('plugin_commission_image_download_product_title'),
      enableCheckbox: false,
      showFooter: false,
      className: 'commission-bar-modal',
      content: (
        <div className="commission-download-modal-wrapper">
          <div className="grid-viewer-product-download-sub-title">
            {ResourceManager.getString('plugin_commission_image_download_product_sub_title')}
          </div>
          <DownloadCommissionComponent seekIds={commissionIds} />
        </div>
      )
    });
  }

  private showToolTip(): void {
    const eventTrack = HSApp.Util.EventTrack.instance();
    const { tooltipStatus } = this.state.commissionInfo;

    let eventName: string | null = null;

    if (tooltipStatus === 1) {
      eventName = 'show_xuanpin_event';
    } else if (tooltipStatus === 2) {
      eventName = 'show_download_commission_event';
    }

    if (eventName) {
      eventTrack.track(HSApp.Util.EventGroupEnum.CommissionBar, eventName);
    }
  }

  render(): ReactNode {
    const {
      count,
      amount,
      tooltipStatus,
      isShowCommission,
      storeName = '',
      bindStoreName = ''
    } = this.state.commissionInfo;

    const tooltipContent: Record<number, ReactNode> = {
      0: (
        <div>
          {ResourceManager.getString('plugin_commission_tooltip_one_add_model')}
        </div>
      ),
      1: (
        <div>
          {ResourceManager.getString('plugin_commission_tooltip_you_already_used')}
          {count}
          {ResourceManager.getString('plugin_commission_tooltip_you_may_earn')}
          {amount}
          {ResourceManager.getString('plugin_commission_tooltip_yuan')}
          <a className="cm-bar-tooltip-link" onClick={this.openVerification}>
            {ResourceManager.getString('plugin_commission_tooltip_signin')}
          </a>
          {ResourceManager.getString('plugin_commission_tooltip_get_commission')}
        </div>
      ),
      2: (
        <div>
          {ResourceManager.getString('plugin_commission_tooltip_you_already_used')}
          {count}
          {ResourceManager.getString('plugin_commission_tooltip_you_may_earn')}
          {amount}
          {ResourceManager.getString('plugin_commission_tooltip_yuan')}
          <a
            className="cm-bar-tooltip-link"
            onClick={this.downloadCommission.bind(this)}
          >
            {ResourceManager.getString('plugin_commission_tooltip_download_commission_link')}
          </a>
        </div>
      ),
      3: (
        <div>
          {ResourceManager.getString('plugin_commission_tooltip_tpzz_isJoined')}
        </div>
      ),
      4: (
        <div>
          {ResourceManager.getString('plugin_commission_tooltip_tpzz_isRelated')}
        </div>
      ),
      5: (
        <div>
          {ResourceManager.getString('plugin_commission_tooltip_tpzz_isSame_1')}
          {storeName}
          {ResourceManager.getString('plugin_commission_tooltip_tpzz_isSame_2')}
          {', '}
          {ResourceManager.getString('plugin_commission_tooltip_tpzz_isSame_3')}
          {bindStoreName}
          {ResourceManager.getString('plugin_commission_tooltip_tpzz_isSame_4')}
        </div>
      )
    };

    const popoverItem = (
      <Popover.Item overlayClassName="cm-bar-tooltip" color="dark">
        {tooltipContent[tooltipStatus]}
      </Popover.Item>
    );

    if (!isShowCommission) {
      return null;
    }

    return (
      <div>
        <Popover.Trigger
          popover={popoverItem}
          placement="topRight"
          trigger="hover"
          onOpen={this.showToolTip.bind(this)}
        >
          <div className="toggle-commission-bar" id="commission-bar">
            <div className="cm-bar-wrapper">
              <IconfontView
                showType="hs_zhanshi_tuceyongjin"
                customClass="cm-bar-icon"
              />
              <span className="cm-bar-msg">预计可赚¥{amount}</span>
            </div>
          </div>
        </Popover.Trigger>
      </div>
    );
  }
}