import * as React from 'react';
import { Component } from 'react';
import { Button } from './button-component';
import PictureGrid from './picture-grid-component';
import ResourceManagerUtil from './resource-manager-util';
import ComponentStatus from './component-status';
import EmptyIconImage from './empty-icon.svg';
import LoadingIconImage from './loading-icon.svg';

interface PictureInfo {
  id: string | undefined;
  url: string;
}

interface PickImagePanelProps {
  willMountNotify?: (panel: PickImagePanel) => void;
  submitNotify?: (picInfo: PictureInfo, panel: PickImagePanel) => void;
  cancelNotify?: (panel: PickImagePanel) => void;
  uploadNotify?: (panel: PickImagePanel) => void;
  closeParentPanel?: () => void;
}

interface PickImagePanelState {
  picInfoList: PictureInfo[];
  loaded: boolean;
  selected: boolean;
}

class PickImagePanel extends Component<PickImagePanelProps, PickImagePanelState> {
  private _status: string | undefined;
  private _closeBtnImageUrl: string | undefined;
  private _HEAD_TITLE: string | undefined;
  private _UPLOAD_BTN_CAPTION: string | undefined;
  private _CANCEL_BTN_CAPTION: string | undefined;
  private _OK_BTN_CAPTION: string | undefined;
  private _selectPicInfo: PictureInfo | undefined;
  private _selectIdx: number | undefined;
  private refs: {
    closeBtn?: HTMLElement;
  };

  constructor(props: PickImagePanelProps) {
    super(props);
    this._status = undefined;
    this._closeBtnImageUrl = undefined;
    this._HEAD_TITLE = undefined;
    this._UPLOAD_BTN_CAPTION = undefined;
    this._CANCEL_BTN_CAPTION = undefined;
    this._OK_BTN_CAPTION = undefined;
    this._selectPicInfo = undefined;
    this._selectIdx = undefined;
    this.refs = {};

    this.state = {
      picInfoList: [],
      loaded: false,
      selected: false
    };
  }

  UNSAFE_componentWillMount(): void {
    this._status = ComponentStatus.WillMountStatus;
    this._closeBtnImageUrl = ResourceManagerUtil.parseURL('cancel.svg');
    this._HEAD_TITLE = ResourceManager.getString('autostyler_pick_img_panel_head_title');
    this._UPLOAD_BTN_CAPTION = ResourceManager.getString('autostyler_pick_img_panel_upload_btn');
    this._CANCEL_BTN_CAPTION = ResourceManager.getString('cancel');
    this._OK_BTN_CAPTION = ResourceManager.getString('confirm');
    this._selectPicInfo = {
      id: undefined,
      url: ''
    };

    if (this.props.willMountNotify) {
      this.props.willMountNotify(this);
    }
  }

  componentDidMount(): void {
    this._status = ComponentStatus.MountedStatus;
    if (this.refs.closeBtn) {
      ResourceManager.injectSVGImage(this.refs.closeBtn);
    }
  }

  componentWillUnmount(): void {
    this._status = ComponentStatus.UnMountedStatus;
  }

  private _onItemSelect = (index: number): void => {
    if (!this.state.selected) {
      this.setState({ selected: true });
    }
    this._selectIdx = index;
  };

  private _onBtnOKClick = (): void => {
    if (this.props.submitNotify && this._selectPicInfo) {
      this.props.submitNotify(this._selectPicInfo, this);
    }
  };

  private _onBtnCancelClick = (): void => {
    if (this.props.cancelNotify) {
      this.props.cancelNotify(this);
    }
  };

  private _shouldDisableOKBtn = (): boolean => {
    return !this.state.selected;
  };

  private _onPicSelectChange = (picInfo: PictureInfo): void => {
    if (picInfo.url === '') {
      this.setState({ selected: false });
    } else {
      this.setState({ selected: true });
    }

    if (this._selectPicInfo) {
      this._selectPicInfo.id = picInfo.id;
      this._selectPicInfo.url = picInfo.url;
    }
  };

  private _onBtnUploadClick = (): void => {
    if (this.props.uploadNotify) {
      this.props.uploadNotify(this);
    }
  };

  private _RenderWaiting = (): React.ReactElement => {
    return (
      <img className="waiting" src={LoadingIconImage} />
    );
  };

  private _RenderContainer = (): React.ReactElement => {
    const isEmpty = this.state.picInfoList.length === 0;

    if (isEmpty) {
      return (
        <div className="emptyShow">
          <img className="emptyIcon" src={EmptyIconImage} />
          <div className="emptyText">
            {ResourceManager.getString('autostyler_pick_img_panel_empty_text')}
            {HSApp.Config.TENANT === 'fp' ? <span> </span> : null}
            <span
              onClick={() => {
                this.props.cancelNotify?.(this);
                this.props.closeParentPanel?.();
                HSApp.App.getApp()
                  .pluginManager
                  .getPlugin('hsw.plugin.render.Plugin')
                  .start('image');
              }}
              className="emptyHighlight"
            >
              {ResourceManager.getString('autostyler_pick_img_panel_render')}
            </span>
          </div>
        </div>
      );
    }

    return (
      <PictureGrid
        picInfoList={this.state.picInfoList}
        selectChangeNotify={this._onPicSelectChange}
      />
    );
  };

  setPictureList_ = (picInfoList: PictureInfo[]): void => {
    if (this._status !== ComponentStatus.UnMountedStatus) {
      this._selectPicInfo = {
        id: undefined,
        url: ''
      };
      this.setState({
        picInfoList,
        selected: false,
        loaded: true
      });
    }
  };

  render(): React.ReactElement {
    const isOKButtonDisabled = this._shouldDisableOKBtn();

    return (
      <div className="pickImagePanel">
        <input
          type="button"
          className="modalCover"
          onClick={this._onBtnCancelClick}
        />
        <div className="mainPanel">
          <div className="headerwrap">
            <div className="title">{this._HEAD_TITLE}</div>
            <div className="btn-close" onClick={this._onBtnCancelClick}>
              <span data-src={this._closeBtnImageUrl} ref="closeBtn" />
            </div>
          </div>
          {this.state.loaded ? this._RenderContainer() : this._RenderWaiting()}
          <div className="pickImagePanel-footer">
            <div className="pickImagePanel-footer-upload" />
            <div className="pickImagePanel-footer-buttons">
              <Button
                onClick={this._onBtnCancelClick}
                className="upload-picture-button"
              >
                {this._CANCEL_BTN_CAPTION}
              </Button>
              <Button
                type="primary"
                onClick={this._onBtnOKClick}
                disabled={isOKButtonDisabled}
                className="upload-picture-button upload-picture-button-submit"
              >
                {this._OK_BTN_CAPTION}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PickImagePanel;