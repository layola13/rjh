import React, { Component } from 'react';

interface CommissionDownloadProps {
  seekIds: string[];
}

interface CommissionDownloadRefs {
  commissionDom: HTMLIFrameElement | null;
}

interface MessageEvent {
  data: string;
}

interface PostMessageData {
  key: string;
  value: string[];
}

const MESSAGE_READY = '_haohuo_ready_';
const MESSAGE_KEY_JIDS = '_haohuo_jids_';
const IFRAME_WIDTH = 300;
const IFRAME_HEIGHT = 500;

export default class CommissionDownload extends Component<CommissionDownloadProps> {
  refs: CommissionDownloadRefs = {
    commissionDom: null
  };

  componentDidMount(): void {
    if (this.refs.commissionDom) {
      window.addEventListener('message', this.messageHandle);
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener('message', this.messageHandle);
  }

  messageHandle = (event: MessageEvent): void => {
    if (event.data === MESSAGE_READY && this.refs.commissionDom?.contentWindow) {
      const message: PostMessageData = {
        key: MESSAGE_KEY_JIDS,
        value: this.props.seekIds
      };
      this.refs.commissionDom.contentWindow.postMessage(message, '*');
    }
  };

  render(): React.ReactElement {
    const isEACommission = HSApp.App.getApp()
      .pluginManager
      .getPlugin(HSFPConstants.PluginType.Commission)
      .isEACommission();

    const baseUrl = HSApp.Config.ENV === 'prod'
      ? 'https://market.m.taobao.com'
      : 'https://market.wapa.taobao.com';

    const originParam = isEACommission ? '?origin=ihomesaas' : '';
    const targetUrl = `${baseUrl}/app/topping/haohuo-share-items/index.html${originParam}`;

    const iframeSrc = isEACommission
      ? targetUrl
      : `https://${HSApp.Config.EZHOME_HOST}/hs-statics/verification.html?targetUrl=${encodeURIComponent(targetUrl)}`;

    return (
      <iframe
        ref="commissionDom"
        className="commission-download-iframe"
        src={iframeSrc}
        allow="clipboard-read; clipboard-write self https://market.wapa.taobao.com https://market.m.taobao.com"
        scrolling="no"
        frameBorder="0"
        style={{
          border: 0,
          width: IFRAME_WIDTH,
          height: IFRAME_HEIGHT
        }}
      />
    );
  }
}