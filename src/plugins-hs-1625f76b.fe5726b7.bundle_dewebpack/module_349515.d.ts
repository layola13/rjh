/**
 * Client download component module
 * Provides desktop application download functionality for Homestyler
 */

import React from 'react';
import { Tooltip, IconfontView } from 'your-ui-library';

/**
 * Component state interface
 */
interface ClientDownloadState {
  /** Icon display type, toggles between normal and hover states */
  showType: 'hs_catalog_cebianlan_desktop' | 'hs_catalog_cebianlan_desktophover';
}

/**
 * Component props interface
 */
interface ClientDownloadProps {
  // Add any props if needed in the future
}

/**
 * Tenant configuration type
 */
type TenantType = 'fp' | string;

/**
 * Operating system type
 */
type OperatingSystem = 'Mac' | 'Win';

/**
 * Global HSApp namespace
 */
declare global {
  interface Window {
    HSApp: {
      Config: {
        TENANT: TenantType;
      };
      Util: {
        EventTrack: {
          instance(): EventTracker;
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

/**
 * Event tracker interface
 */
interface EventTracker {
  /**
   * Track user events
   * @param group - Event group identifier
   * @param eventName - Event name
   * @param properties - Additional event properties
   */
  track(group: string, eventName: string, properties: Record<string, unknown>): void;
}

/**
 * Client Download Component
 * Renders a download button for the Homestyler desktop application
 * Supports both Mac and Windows platforms
 */
export default class ClientDownload extends React.Component<ClientDownloadProps, ClientDownloadState> {
  constructor(props: ClientDownloadProps) {
    super(props);
    
    this.state = {
      showType: 'hs_catalog_cebianlan_desktop'
    };
    
    this.handleDownloadClick = this.handleDownloadClick.bind(this);
  }

  /**
   * Handles click event for download button
   * Determines the user's operating system and opens the appropriate download link
   * Tracks the download event for analytics
   */
  handleDownloadClick(): void {
    const isMac: boolean = navigator.platform.includes('Mac');
    let downloadUrl: string = '';
    
    if (window.HSApp.Config.TENANT === 'fp') {
      downloadUrl = isMac
        ? 'https://3d.homestyler.com/client/homestyler-global-mac-stable.dmg'
        : 'https://3d.homestyler.com/client/homestyler-global-win-stable.exe';
    }
    
    if (downloadUrl) {
      window.open(downloadUrl, '_blank', 'noopener=yes, noreferrer=yes');
    }
    
    const system: OperatingSystem = isMac ? 'Mac' : 'Win';
    window.HSApp.Util.EventTrack.instance().track(
      window.HSApp.Util.EventGroupEnum.Catalog,
      'client_download_click_event',
      { system }
    );
  }

  /**
   * Handles mouse enter event on the icon
   * Changes icon to hover state
   */
  private handleMouseEnter = (): void => {
    this.setState({
      showType: 'hs_catalog_cebianlan_desktophover'
    });
  };

  /**
   * Handles mouse leave event on the icon
   * Changes icon back to normal state
   */
  private handleMouseLeave = (): void => {
    this.setState({
      showType: 'hs_catalog_cebianlan_desktop'
    });
  };

  render(): React.ReactElement {
    return (
      <div className="client-download" onClick={this.handleDownloadClick}>
        <Tooltip
          overlayClassName="client-download-tip"
          placement="topLeft"
          trigger="hover"
          color="dark"
          title={window.ResourceManager.getString('plugin_clientdownload_tooltip')}
        >
          <div className="menu-icon">
            <IconfontView
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              showType={this.state.showType}
              customStyle={{ fontSize: '28px' }}
            />
          </div>
        </Tooltip>
        <div className="menu-name">
          {window.ResourceManager.getString('plugin_clientdownload_entry')}
        </div>
      </div>
    );
  }
}