import React from 'react';
import { Modal, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface PricingMarketProps {
  type: string;
  sourcePage?: string;
  onClose?: () => void;
  redeemNum?: number;
}

interface PricingMarketState {
  iframeWidth: number;
  sourcePage: string;
  visible: boolean;
  loading: boolean;
  showCloseBtn: boolean;
}

interface MessageEventData {
  eType: string;
  eData: boolean;
}

interface MessageEvent extends Event {
  data: MessageEventData;
}

declare global {
  interface Window {
    HSApp: {
      App: {
        getApp(): {
          appParams: {
            locale?: string;
          };
        };
      };
      Config: {
        EZHOME_HOST: string;
      };
    };
  }
}

const LOADING_ICON = <LoadingOutlined style={{ fontSize: 24 }} spin={true} />;

const IFRAME_WIDTH = 900;
const DEFAULT_SOURCE_PAGE = 'general';
const LOAD_TIMEOUT = 3000;
const MODAL_Z_INDEX = 10006;

export class PricingMarket extends React.Component<PricingMarketProps, PricingMarketState> {
  constructor(props: PricingMarketProps) {
    super(props);
    
    this.state = {
      iframeWidth: IFRAME_WIDTH,
      sourcePage: props.sourcePage || DEFAULT_SOURCE_PAGE,
      visible: true,
      loading: true,
      showCloseBtn: true,
    };

    this.onLoad = this.onLoad.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.messageListener = this.messageListener.bind(this);
  }

  componentDidMount(): void {
    window.addEventListener('message', this.messageListener as EventListener, false);
    
    setTimeout(() => {
      this.onLoad();
    }, LOAD_TIMEOUT);
  }

  componentWillUnmount(): void {
    window.removeEventListener('message', this.messageListener as EventListener, false);
    this.props.onClose?.();
  }

  messageListener(event: MessageEvent): void {
    if (event.data) {
      const { eType, eData } = event.data;
      
      if (eType === 'couponOrderModalIsOpen') {
        this.setState({
          showCloseBtn: !eData,
        });
      }
    }
  }

  show(sourcePage: string): void {
    this.setState({
      visible: true,
      sourcePage,
    });
  }

  hide(): void {
    this.setState({
      visible: false,
    });
    this.props.onClose?.();
  }

  onLoad(): void {
    this.setState({
      loading: false,
    });
  }

  render(): React.ReactElement {
    const { type, onClose, redeemNum } = this.props;
    const { iframeWidth, visible, loading, sourcePage, showCloseBtn } = this.state;

    const locale = window.HSApp.App.getApp().appParams.locale;
    const ezhomeHost = window.HSApp.Config.EZHOME_HOST;
    
    let iframeUrl = `https://${ezhomeHost}/business/sa/specificvip?markettype=${type}&sourcetype=3d_${sourcePage}`;
    
    if (locale) {
      iframeUrl += `&lang=${locale}`;
    }
    
    if (redeemNum) {
      iframeUrl += `&redeem_num=${redeemNum}`;
    }

    return (
      <Modal
        wrapClassName={`pricing-iframe-dialog ${showCloseBtn ? '' : 'hide-close-btn'}`}
        visible={visible}
        width={iframeWidth}
        footer={null}
        centered={true}
        onCancel={() => {
          this.hide();
          onClose?.();
        }}
        maskClosable={false}
        zIndex={MODAL_Z_INDEX}
      >
        <div className="ezhome-pricing-iframe-wrapper">
          {loading && (
            <div className="pricing-loading-wrapper">
              <Spin size="large" indicator={LOADING_ICON} spinning={loading} />
            </div>
          )}
          <iframe
            className="pricing-iframe"
            src={iframeUrl}
            onError={this.onLoad}
            onLoad={this.onLoad}
          />
        </div>
      </Modal>
    );
  }
}