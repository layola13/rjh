import React from 'react';
import { Tooltip, IconfontView } from './components';

interface ClientDownloadState {
  showType: string;
}

interface ClientDownloadProps {}

type Platform = 'Mac' | 'Win';

const ICON_TYPE_DEFAULT = 'hs_catalog_cebianlan_desktop';
const ICON_TYPE_HOVER = 'hs_catalog_cebianlan_desktophover';
const ICON_FONT_SIZE = '28px';

const DOWNLOAD_URLS: Record<Platform, string> = {
  Mac: 'https://3d.homestyler.com/client/homestyler-global-mac-stable.dmg',
  Win: 'https://3d.homestyler.com/client/homestyler-global-win-stable.exe'
};

declare global {
  interface Window {
    HSApp: {
      Config: {
        TENANT: string;
      };
      Util: {
        EventTrack: {
          instance(): {
            track(group: string, event: string, data: Record<string, unknown>): void;
          };
        };
        EventGroupEnum: {
          Catalog: string;
        };
      };
    };
    ResourceManager: {
      getString(key: string): string;
    };
  }
}

export default class ClientDownload extends React.Component<ClientDownloadProps, ClientDownloadState> {
  constructor(props: ClientDownloadProps) {
    super(props);
    this.state = {
      showType: ICON_TYPE_DEFAULT
    };
    this.handleDownloadClick = this.handleDownloadClick.bind(this);
  }

  private getPlatform(): Platform {
    return navigator.platform.includes('Mac') ? 'Mac' : 'Win';
  }

  private getDownloadUrl(platform: Platform): string | null {
    if (window.HSApp?.Config?.TENANT !== 'fp') {
      return null;
    }
    return DOWNLOAD_URLS[platform];
  }

  private trackDownloadEvent(platform: Platform): void {
    window.HSApp?.Util?.EventTrack?.instance()?.track(
      window.HSApp.Util.EventGroupEnum.Catalog,
      'client_download_click_event',
      { system: platform }
    );
  }

  handleDownloadClick(): void {
    const platform = this.getPlatform();
    const downloadUrl = this.getDownloadUrl(platform);

    if (downloadUrl) {
      window.open(downloadUrl, '_blank', 'noopener=yes,noreferrer=yes');
    }

    this.trackDownloadEvent(platform);
  }

  private handleMouseEnter = (): void => {
    this.setState({ showType: ICON_TYPE_HOVER });
  };

  private handleMouseLeave = (): void => {
    this.setState({ showType: ICON_TYPE_DEFAULT });
  };

  render(): React.ReactElement {
    return (
      <div className="client-download" onClick={this.handleDownloadClick}>
        <Tooltip
          overlayClassName="client-download-tip"
          placement="topLeft"
          trigger="hover"
          color="dark"
          title={window.ResourceManager?.getString('plugin_clientdownload_tooltip')}
        >
          <div className="menu-icon">
            <IconfontView
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              showType={this.state.showType}
              customStyle={{ fontSize: ICON_FONT_SIZE }}
            />
          </div>
        </Tooltip>
        <div className="menu-name">
          {window.ResourceManager?.getString('plugin_clientdownload_entry')}
        </div>
      </div>
    );
  }
}