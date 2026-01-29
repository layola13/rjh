import React, { Component, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { Input, Select, Button } from 'antd';

const { Option } = Select;

enum ComponentStatus {
  WillMountStatus = 'WILL_MOUNT',
  MountedStatus = 'MOUNTED',
  UnMountedStatus = 'UNMOUNTED'
}

enum PictureMask {
  None = 'NONE',
  Loading = 'LOADING',
  Error = 'ERROR'
}

interface PictureInfo {
  id: string;
  url: string;
}

interface RoomType {
  id: string;
  name: string;
}

interface CustomizedUIWithValue {
  show(container: HTMLElement): void;
  hide(): void;
}

interface SaveData {
  name: string;
  roomTypeId: string;
  picInfo: PictureInfo;
}

interface ValidationResult {
  isValid: boolean;
  reasons?: string[];
}

interface EditStylerTemplatePanelProps {
  initialName: string;
  initialRoomTypeId: string;
  initialPicInfo: PictureInfo;
  roomTypeList: RoomType[];
  invalidRoomTypeIdSet: Set<string>;
  wholehouseFlag?: boolean;
  customizedUIWithValueList?: CustomizedUIWithValue[];
  saveNotify?: (data: SaveData, panel: EditStylerTemplatePanel) => void;
  cancelNotify?: (panel: EditStylerTemplatePanel) => void;
  requestPictureNotify?: (
    committer: RequestPicDataCommitter,
    onStart: () => void,
    panel: EditStylerTemplatePanel
  ) => void;
}

interface EditStylerTemplatePanelState {
  changedRoomTypeId: string;
}

interface NameTextInputRef {
  state: { value: string };
  select(): void;
}

interface PictureBtnRef {
  getCurrentPicInfo_(): PictureInfo;
  changePictureMask_(mask: PictureMask): void;
  changePicture_(picInfo: PictureInfo, onComplete: () => void): void;
}

class RequestPicDataCommitter {
  private callback: (committer: RequestPicDataCommitter) => void;
  private data: Map<string, unknown> = new Map();

  constructor(callback: (committer: RequestPicDataCommitter) => void) {
    this.callback = callback;
  }

  setData(key: string, value: unknown): void {
    this.data.set(key, value);
  }

  getData(key: string): unknown {
    return this.data.get(key);
  }

  commit(): void {
    this.callback(this);
  }

  destroy(): void {
    this.data.clear();
  }
}

class ResourceManager {
  static getString(key: string): string {
    return key;
  }

  static parseURL(filename: string): string {
    return `/assets/${filename}`;
  }

  static injectSVGImage(element: HTMLElement): void {
    // SVG injection logic
  }
}

class PictureButton extends Component<{
  initialPictureInfo: PictureInfo;
  onPictureClick: () => void;
}> {
  getCurrentPicInfo_(): PictureInfo {
    return this.props.initialPictureInfo;
  }

  changePictureMask_(mask: PictureMask): void {
    // Implementation
  }

  changePicture_(picInfo: PictureInfo, onComplete: () => void): void {
    // Implementation
  }

  render(): ReactElement {
    return <div />;
  }
}

class EditStylerTemplatePanel extends Component<
  EditStylerTemplatePanelProps,
  EditStylerTemplatePanelState
> {
  private _status?: ComponentStatus;
  private _closeBtnImageUrl?: string;
  private _HEAD_TITLE?: string;
  private _UPLOAD_IMG_DESC?: string;
  private _SAVE_BTN_CAPTION?: string;
  private _CANCEL_BTN?: string;
  private _requestPicDataCommitter?: RequestPicDataCommitter;
  private _customizedDomNode?: HTMLElement;
  private _isPictureLoading: boolean = false;
  private _roomTypeSelectOptions: ReactElement[] = [];

  declare refs: {
    nameTextInput: NameTextInputRef;
    picBtn: PictureBtnRef;
    closeBtn: HTMLElement;
    customizedUIRoot: HTMLElement;
  };

  constructor(props: EditStylerTemplatePanelProps) {
    super(props);
    this.state = {
      changedRoomTypeId: props.initialRoomTypeId
    };
  }

  UNSAFE_componentWillMount(): void {
    this._status = ComponentStatus.WillMountStatus;
    this._closeBtnImageUrl = ResourceManager.parseURL('cancel.svg');
    this._HEAD_TITLE = ResourceManager.getString('autostyler_editing_panel_head_title');
    this._UPLOAD_IMG_DESC = ResourceManager.getString('autostyler_editing_panel_upload_img');
    this._SAVE_BTN_CAPTION = ResourceManager.getString('messageBox_btn_save');
    this._CANCEL_BTN = ResourceManager.getString('messageBox_btn_cancel');
    this._requestPicDataCommitter = undefined;
    this._initRoomTypeSelectOptions();
    this._customizedDomNode = undefined;
    this._isPictureLoading = false;
  }

  componentDidMount(): void {
    this._status = ComponentStatus.MountedStatus;
    ResourceManager.injectSVGImage(this.refs.closeBtn);
    this._customizedDomNode = ReactDOM.findDOMNode(this.refs.customizedUIRoot) as HTMLElement;
    this._showCustomizedUI();
  }

  componentWillUnmount(): void {
    this._status = ComponentStatus.UnMountedStatus;
    this._closeCustomizedUIArr();
    this._customizedDomNode = undefined;
  }

  private _updatePictureLoading = (isLoading: boolean): void => {
    if (this._isPictureLoading !== isLoading) {
      this._isPictureLoading = isLoading;
      this.forceUpdate();
    }
  };

  private _initRoomTypeSelectOptions = (): void => {
    this._roomTypeSelectOptions = [];
    const { roomTypeList } = this.props;
    const roomTypeCount = roomTypeList.length;

    for (let i = 0; i < roomTypeCount; ++i) {
      this._roomTypeSelectOptions.push(
        <Option title={ResourceManager.getString(roomTypeList[i].name)} key={i} value={roomTypeList[i].id}>
          {ResourceManager.getString(roomTypeList[i].name)}
        </Option>
      );
    }
  };

  private _onBtnSaveClick = (): void => {
    if (this.props.saveNotify) {
      const nameTextInput = this.refs.nameTextInput;
      const picBtn = this.refs.picBtn;
      const name = nameTextInput.state.value;
      const currentPicInfo = picBtn.getCurrentPicInfo_();
      
      const saveData: SaveData = {
        name,
        roomTypeId: this.state.changedRoomTypeId,
        picInfo: {
          id: currentPicInfo.id,
          url: currentPicInfo.url
        }
      };
      
      this.props.saveNotify(saveData, this);
    }
  };

  private _onBtnCancelClick = (): void => {
    if (this.props.cancelNotify) {
      this.props.cancelNotify(this);
    }
  };

  private _onNameTextInputFocus = (): void => {
    this.refs.nameTextInput.select();
  };

  private _onRoomTypeChange = (roomTypeId: string): void => {
    this.setState({
      changedRoomTypeId: roomTypeId
    });
  };

  private _checkValid = (): ValidationResult => {
    const isRoomTypeValid = !this.props.invalidRoomTypeIdSet.has(this.state.changedRoomTypeId);
    const isValid = isRoomTypeValid && !this._isPictureLoading;

    if (isValid) {
      return { isValid: true };
    }

    const reasons: string[] = [];
    if (!isRoomTypeValid) {
      reasons.push('roomType');
    }
    if (this._isPictureLoading) {
      reasons.push('loadingPicture');
    }

    return {
      isValid: false,
      reasons
    };
  };

  private _onRequestChangePicture = (): void => {
    if (this.props.requestPictureNotify) {
      const picBtn = this.refs.picBtn;
      const committer = new RequestPicDataCommitter(this._onGetPicInfoData);

      if (this._requestPicDataCommitter) {
        this._requestPicDataCommitter.destroy();
        picBtn.changePictureMask_(PictureMask.None);
        this._updatePictureLoading(false);
      }

      this._requestPicDataCommitter = committer;

      const onStart = (): void => {
        this.refs.picBtn.changePictureMask_(PictureMask.Loading);
        this._updatePictureLoading(true);
      };

      this.props.requestPictureNotify(committer, onStart, this);
    }
  };

  private _onGetPicInfoData = (committer: RequestPicDataCommitter): void => {
    if (this._status === ComponentStatus.UnMountedStatus) {
      return;
    }

    const picBtn = this.refs.picBtn;
    this._requestPicDataCommitter = undefined;

    if (committer.getData('hasError')) {
      picBtn.changePictureMask_(PictureMask.Error);
      this._updatePictureLoading(false);
    } else {
      const newPicInfo: PictureInfo = {
        id: committer.getData('picId') as string,
        url: committer.getData('picUrl') as string
      };

      if (newPicInfo.url && newPicInfo.url !== '') {
        picBtn.changePictureMask_(PictureMask.Loading);
        this._updatePictureLoading(true);
        picBtn.changePicture_(newPicInfo, () => {
          picBtn.changePictureMask_(PictureMask.None);
          this._updatePictureLoading(false);
        });
      } else {
        picBtn.changePictureMask_(PictureMask.None);
        this._updatePictureLoading(false);
      }
    }
  };

  private _RenderContent = (hasRoomTypeError: boolean): ReactElement => {
    const initialPicInfo: PictureInfo = {
      id: this.props.initialPicInfo.id,
      url: this.props.initialPicInfo.url
    };

    return (
      <div className="modify-content">
        <div className="modify-row modify-row__name">
          <span className="modify-row-label">
            {ResourceManager.getString('autostyler_editing_panel_name')}
          </span>
          <Input
            ref="nameTextInput"
            className="modify-row-item model-input"
            defaultValue={this.props.initialName}
            onFocus={this._onNameTextInputFocus}
          />
        </div>
        <div className="modify-row modify-row__type">
          <span className="modify-row-label">
            {ResourceManager.getString('autostyler_editing_panel_type')}
          </span>
          {this.props.wholehouseFlag ? (
            <span className="modify-row-item">
              {ResourceManager.getString('catalog_product_item_wholehouse_name')}
            </span>
          ) : (
            <Select
              dropdownClassName="model-select-dropdown"
              className="modify-row-item model-select"
              defaultValue={this.props.initialRoomTypeId}
              onChange={this._onRoomTypeChange}
            >
              {this._roomTypeSelectOptions}
            </Select>
          )}
        </div>
        <div className="modify-row">
          <span className="modify-row-label">
            {ResourceManager.getString('autostyler_editing_panel_style')}
          </span>
          <div className="modify-row-item" ref="customizedUIRoot" />
        </div>
        <div className="modify-row">
          <span className="modify-row-label">{this._UPLOAD_IMG_DESC}</span>
          <PictureButton
            ref="picBtn"
            initialPictureInfo={initialPicInfo}
            onPictureClick={this._onRequestChangePicture}
          />
        </div>
      </div>
    );
  };

  private _showCustomizedUI = (): void => {
    const customizedUIList = this.props.customizedUIWithValueList;
    if (!customizedUIList || customizedUIList.length === 0) {
      return;
    }

    const containerNode = this._customizedDomNode;
    if (!containerNode) {
      return;
    }

    while (containerNode.hasChildNodes()) {
      containerNode.removeChild(containerNode.firstChild!);
    }

    for (let i = 0; i < customizedUIList.length; ++i) {
      const divElement = document.createElement('div');
      containerNode.appendChild(divElement);
      customizedUIList[i].show(divElement);
    }
  };

  private _closeCustomizedUIArr = (): void => {
    const customizedUIList = this.props.customizedUIWithValueList;
    if (!customizedUIList || customizedUIList.length === 0) {
      return;
    }

    customizedUIList.forEach((ui) => {
      ui.hide();
    });

    const containerNode = this._customizedDomNode;
    if (!containerNode) {
      return;
    }

    while (containerNode.hasChildNodes()) {
      containerNode.removeChild(containerNode.firstChild!);
    }
  };

  render(): ReactElement {
    const validationResult = this._checkValid();
    const hasRoomTypeError = !validationResult.isValid && 
      !!validationResult.reasons?.includes('roomType');

    return (
      <div className="editStylerTemplatePanel">
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
          {this._RenderContent(hasRoomTypeError)}
          <div className="modify-footer">
            <Button
              type="primary"
              className="template-room-panel-button"
              onClick={this._onBtnSaveClick}
              disabled={!validationResult.isValid}
            >
              {this._SAVE_BTN_CAPTION}
            </Button>
            <Button
              type="default"
              className="template-room-panel-button"
              onClick={this._onBtnCancelClick}
            >
              {this._CANCEL_BTN}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditStylerTemplatePanel;