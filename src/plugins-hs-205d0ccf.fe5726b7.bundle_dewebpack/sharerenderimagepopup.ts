import React, { PureComponent } from 'react';
import { message } from 'antd';
import QRCode from 'qrcode.react';
import { IconfontView } from './IconfontView';
import { ClipboardUtil } from './ClipboardUtil';
import './styles.css';

interface ShareData {
  weibo: string;
  qq: string;
  qzone: string;
}

interface BindedShareImageInfo {
  url: string;
  shareData: ShareData;
}

interface ShareRenderImagePopupProps {
  bindedShareImageInfo: BindedShareImageInfo;
}

interface HSAppConfig {
  TENANT: string;
}

declare global {
  interface Window {
    HSApp: {
      Config: HSAppConfig;
    };
    ResourceManager: {
      getString(key: string): string;
    };
  }
}

export class ShareRenderImagePopup extends PureComponent<ShareRenderImagePopupProps> {
  downloadQrcode = (): void => {
    this.downloadQRCodeV2(
      '#qrcodeCanvasWrapper canvas',
      'image/jpeg',
      `${document.title}-qrcode.jpg`
    );
    message.success(window.ResourceManager.getString('plugin_render_qrcode_download_success'));
  };

  copyUrl = (url: string): void => {
    if (ClipboardUtil.copyText(url)) {
      message.success(window.ResourceManager.getString('plugin_render_qrcode_copy_success'));
    } else {
      message.error(window.ResourceManager.getString('plugin_render_qrcode_copy_fail'));
    }
  };

  downloadQRCodeV2(selector: string, mimeType: string, fileName: string): void {
    const canvas = document.querySelector<HTMLCanvasElement>(selector);
    if (!canvas) return;

    let dataURL = canvas.toDataURL(mimeType);
    const imageType = mimeType
      .toLocaleLowerCase()
      .replace(/jpg/i, 'jpeg')
      .match(/png|jpeg|bmp|gif/)?.[0] ?? 'png';
    
    dataURL = dataURL.replace(`image/${imageType}`, 'image/octet-stream');
    
    this.triggerDownload(dataURL, fileName);
  }

  triggerDownload(dataURL: string, fileName: string): void {
    const anchor = document.createElement('a');
    anchor.href = dataURL;
    anchor.download = fileName;
    
    const event = document.createEvent('MouseEvents');
    event.initMouseEvent(
      'click',
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    anchor.dispatchEvent(event);
  }

  render(): React.ReactNode {
    const { bindedShareImageInfo } = this.props;
    const qrCodeSize = 640 / (window.devicePixelRatio || 1);
    const isEzhomeTenant = window.HSApp?.Config?.TENANT === 'ezhome';

    return (
      <>
        <div className="ribpShareVendorHeader">
          {window.ResourceManager.getString('plugin_render_qrcode_header')}
        </div>

        <div className="ribpQrCode" id="qrcodeCanvasWrapper">
          <QRCode value={bindedShareImageInfo.url} size={qrCodeSize} />
        </div>

        <div className="ribpShareVendorBtns">
          <span onClick={() => this.downloadQrcode()}>
            {window.ResourceManager.getString('plugin_render_qrcode_download')}
          </span>
          <span onClick={() => this.copyUrl(bindedShareImageInfo.url)}>
            {window.ResourceManager.getString('plugin_render_qrcode_copy')}
          </span>
        </div>

        {isEzhomeTenant && (
          <div className="ribpShareOtherPlatformTitle">
            <span className="left-divider" />
            <span>
              {window.ResourceManager.getString('render_ribp_share_to_other_vendor')}
            </span>
            <span className="right-divider" />
          </div>
        )}

        {isEzhomeTenant && (
          <div className="ribpShareOtherPlatformItems">
            <a
              href={bindedShareImageInfo.shareData.weibo}
              className="ribpShareVendor"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconfontView
                showType="hs_mian_xinlang"
                customStyle={{ fontSize: '22px', color: '#fff' }}
              />
            </a>

            <a
              href={bindedShareImageInfo.shareData.qq}
              className="ribpShareVendor"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconfontView
                showType="hs_mian_qq"
                customStyle={{ fontSize: '22px', color: '#fff' }}
              />
            </a>

            <a
              href={bindedShareImageInfo.shareData.qzone}
              className="ribpShareVendor"
              style={{ marginRight: 0 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconfontView
                showType="hs_mian_kongjian"
                customStyle={{ fontSize: '22px', color: '#fff' }}
              />
            </a>
          </div>
        )}
      </>
    );
  }
}