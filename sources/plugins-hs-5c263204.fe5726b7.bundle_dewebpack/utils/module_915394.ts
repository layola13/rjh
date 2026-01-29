import React, { Component } from 'react';

interface MirrorInfo {
  [key: string]: unknown;
}

interface MirrorModalProps {
  mirrorInfo: MirrorInfo;
}

interface MirrorModalState {
  close: boolean;
}

interface CommandManager {
  receive(command: string, data: MirrorInfo): void;
}

interface AppInstance {
  cmdManager: CommandManager;
}

interface HSAppNamespace {
  App: {
    getApp(): AppInstance;
  };
}

interface ResourceManagerNamespace {
  getString(key: string): string;
}

declare const HSApp: HSAppNamespace;
declare const ResourceManager: ResourceManagerNamespace;

export default class MirrorModal extends Component<MirrorModalProps, MirrorModalState> {
  constructor(props: MirrorModalProps) {
    super(props);
    this.state = {
      close: false
    };
  }

  executeRequest(): void {
    HSApp.App.getApp().cmdManager.receive("executeRequest", this.props.mirrorInfo);
    this.setState({
      close: true
    });
  }

  closeThis(): void {
    HSApp.App.getApp().cmdManager.receive("cancelRequest", this.props.mirrorInfo);
    this.setState({
      close: true
    });
  }

  render(): React.ReactElement {
    return (
      <div className={this.state.close ? "mirror-pop-modal-hidden" : "mirror-pop-modal"}>
        <div className="mirror-area-modal">
          <div className="mirror-area-title">
            <div className="mirror-area-title-txt">
              {ResourceManager.getString("plugin_underlayimg_rotate_room_dialog_title")}
            </div>
            <div 
              className="mirror-area-tittle-close" 
              onClick={this.closeThis.bind(this)}
            >
              x
            </div>
          </div>
          <div className="mirror-area-lb-info">
            {ResourceManager.getString("plugin_underlayimg_rotate_room_dialog_content")}
          </div>
          <div className="mirror-group-btn">
            <button 
              className="mirror-btn-base mirror-btn-cancel" 
              onClick={this.closeThis.bind(this)}
            >
              {ResourceManager.getString("cancel")}
            </button>
            <button 
              className="mirror-btn-base mirror-btn-confirm" 
              onClick={this.executeRequest.bind(this)}
            >
              {ResourceManager.getString("plugin_underlayimg_rotate_room_dialog_confirm")}
            </button>
          </div>
        </div>
      </div>
    );
  }
}