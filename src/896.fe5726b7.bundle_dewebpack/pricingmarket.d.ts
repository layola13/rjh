/**
 * PricingMarket 组件 - 用于展示定价市场的模态对话框
 * 通过 iframe 嵌入外部定价页面
 */

import React from 'react';
import { Modal, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

/**
 * 组件属性接口
 */
interface PricingMarketProps {
  /** 市场类型 */
  type: string;
  /** 来源页面标识 */
  sourcePage?: string;
  /** 兑换数量 */
  redeemNum?: number;
  /** 关闭回调函数 */
  onClose?: () => void;
}

/**
 * 组件状态接口
 */
interface PricingMarketState {
  /** iframe 宽度 */
  iframeWidth: number;
  /** 来源页面 */
  sourcePage: string;
  /** 模态框可见性 */
  visible: boolean;
  /** 加载状态 */
  loading: boolean;
  /** 是否显示关闭按钮 */
  showCloseBtn: boolean;
}

/**
 * 消息事件数据接口
 */
interface MessageEventData {
  /** 事件类型 */
  eType: string;
  /** 事件数据 */
  eData?: unknown;
}

/**
 * 自定义消息事件接口
 */
interface CustomMessageEvent extends MessageEvent {
  data: MessageEventData;
}

/** 加载中指示器图标 */
const LOADING_INDICATOR = React.createElement(LoadingOutlined, {
  style: { fontSize: 24 },
  spin: true,
});

/** 默认加载超时时间（毫秒） */
const DEFAULT_LOADING_TIMEOUT = 3000;

/** 模态框默认 z-index */
const MODAL_Z_INDEX = 10006;

/** iframe 默认宽度 */
const DEFAULT_IFRAME_WIDTH = 900;

/**
 * PricingMarket 组件
 * 用于在模态框中展示定价页面，支持与 iframe 内页面的消息通信
 */
export class PricingMarket extends React.Component<PricingMarketProps, PricingMarketState> {
  constructor(props: PricingMarketProps) {
    super(props);

    this.state = {
      iframeWidth: DEFAULT_IFRAME_WIDTH,
      sourcePage: props.sourcePage || 'general',
      visible: true,
      loading: true,
      showCloseBtn: true,
    };

    this.onLoad = this.onLoad.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.messageListener = this.messageListener.bind(this);
  }

  /**
   * 组件挂载后添加消息监听器和加载超时
   */
  componentDidMount(): void {
    window.addEventListener('message', this.messageListener, false);
    
    // 超时后强制标记为加载完成
    setTimeout(() => {
      this.onLoad();
    }, DEFAULT_LOADING_TIMEOUT);
  }

  /**
   * 组件卸载前移除消息监听器并触发关闭回调
   */
  componentWillUnmount(): void {
    window.removeEventListener('message', this.messageListener, false);
    this.props.onClose?.();
  }

  /**
   * 处理来自 iframe 的消息事件
   * @param event - 消息事件对象
   */
  messageListener(event: MessageEvent): void {
    if (!event.data) return;

    const { eType, eData } = event.data as MessageEventData;

    // 处理优惠券订单模态框状态
    if (eType === 'couponOrderModalIsOpen') {
      this.setState({
        showCloseBtn: !eData,
      });
    }
  }

  /**
   * 显示模态框
   * @param sourcePage - 来源页面标识
   */
  show(sourcePage: string): void {
    this.setState({
      visible: true,
      sourcePage,
    });
  }

  /**
   * 隐藏模态框并触发关闭回调
   */
  hide(): void {
    this.setState({ visible: false });
    this.props.onClose?.();
  }

  /**
   * iframe 加载完成处理
   */
  onLoad(): void {
    this.setState({ loading: false });
  }

  /**
   * 构建 iframe URL
   * @returns 完整的 iframe 源地址
   */
  private buildIframeUrl(): string {
    const { type, redeemNum } = this.props;
    const { sourcePage } = this.state;
    const locale = HSApp.App.getApp().appParams.locale;

    let url = `https://${HSApp.Config.EZHOME_HOST}/business/sa/specificvip?markettype=${type}&sourcetype=3d_${sourcePage}`;

    if (locale) {
      url += `&lang=${locale}`;
    }

    if (redeemNum) {
      url += `&redeem_num=${redeemNum}`;
    }

    return url;
  }

  /**
   * 渲染组件
   */
  render(): React.ReactNode {
    const { onClose } = this.props;
    const { iframeWidth, visible, loading, showCloseBtn } = this.state;

    const iframeUrl = this.buildIframeUrl();
    const wrapClassName = `pricing-iframe-dialog ${showCloseBtn ? '' : 'hide-close-btn'}`;

    return (
      <Modal
        wrapClassName={wrapClassName}
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
              <Spin size="large" indicator={LOADING_INDICATOR} spinning={loading} />
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