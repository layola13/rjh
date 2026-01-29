import { Component, createRef, RefObject } from 'react';
import { Button } from 'antd';
import { RoomListBoard } from './RoomListBoard';
import ResourceManager from './ResourceManager';
import LiveHint from './LiveHint';
import HSApp from './HSApp';

enum ComponentStatus {
  WillMountStatus = 'willMount',
  MountedStatus = 'mounted',
  UnMountedStatus = 'unmounted'
}

enum PictureMask {
  None = 'none',
  Loading = 'loading',
  Error = 'error'
}

interface PicInfo {
  id: string;
  url: string;
}

interface AreaInfo {
  area: number;
}

interface RoomData {
  id: string;
  roomTypeId: string;
  checked: boolean;
  areaInfo: AreaInfo;
}

interface RoomStyleValue {
  id: string;
  name: string;
}

interface RoomStylerAttribute {
  values: RoomStyleValue[];
}

interface CheckValidResult {
  isValid: boolean;
  checkedCount: number;
  wholehouse: boolean;
  wholehouseInValidCount: number;
}

interface SubmitRoomData {
  id: string;
  checked: boolean;
  name: string;
  area: number;
  roomTypeId: string;
  roomStyleId: string;
  picInfo: PicInfo;
  wholehouse: boolean;
}

interface CreateStylerTemplatePanelProps {
  originalRoomListData: RoomData[];
  roomTypeList: Array<{ id: string; name: string }>;
  roomStylerAttribute: RoomStylerAttribute;
  defaultStyle: string;
  invalidRoomTypeSet: Set<string>;
  submitNotify: (roomDataList: SubmitRoomData[], component: CreateStylerTemplatePanel) => void;
  cancelNotify: (component: CreateStylerTemplatePanel) => void;
  requestPictureNotify: (
    committer: RequestPicDataCommitter,
    onStart: () => void,
    component: CreateStylerTemplatePanel,
    roomData: RoomData
  ) => void;
}

interface CreateStylerTemplatePanelState {
  changedRoomTypeList: string[];
  changedRoomStyleList: string[];
  changedCheckList: boolean[];
  hover: boolean;
}

class RequestPicDataCommitter {
  private data: Map<string, unknown>;
  private callback: (committer: RequestPicDataCommitter) => void;

  constructor(callback: (committer: RequestPicDataCommitter) => void) {
    this.data = new Map();
    this.callback = callback;
  }

  addData(key: string, value: unknown): void {
    this.data.set(key, value);
  }

  getData(key: string): any {
    return this.data.get(key);
  }

  destroy(): void {
    this.data.clear();
  }

  commit(): void {
    this.callback(this);
  }
}

class CreateStylerTemplatePanel extends Component<
  CreateStylerTemplatePanelProps,
  CreateStylerTemplatePanelState
> {
  private pictureRedLineArr: string[] = [];
  private pictureUrlArr: string[] = [];
  private checkValidResult: CheckValidResult = {
    isValid: false,
    checkedCount: 0,
    wholehouse: false,
    wholehouseInValidCount: 0
  };
  private headTitle: string = '';
  private closeBtnImgUrl: string = '';
  private status: string = '';
  private generateBtnCaption: string = '';
  private cancelBtnCaption: string = '';
  private loadingItemIndexSet: Set<number> = new Set();
  private requestPicDataCommitterArr: Array<RequestPicDataCommitter | undefined> = [];
  private roomListBoardRef: RefObject<RoomListBoard> = createRef();
  private closeBtnRef: RefObject<HTMLSpanElement> = createRef();

  constructor(props: CreateStylerTemplatePanelProps) {
    super(props);

    const { originalRoomListData, defaultStyle, roomStylerAttribute } = props;
    const changedRoomTypeList: string[] = [];
    const changedRoomStyleList: string[] = [];
    const changedCheckList: boolean[] = [];

    const defaultStyleId =
      defaultStyle || (JSON.stringify(roomStylerAttribute) === '{}' ? '' : roomStylerAttribute.values[0].id);

    originalRoomListData?.forEach((roomData) => {
      this.pictureRedLineArr.push('');
      this.pictureUrlArr.push('');
      changedRoomTypeList.push(roomData.roomTypeId);
      changedRoomStyleList.push(defaultStyleId);
      changedCheckList.push(roomData.checked);
    });

    this.state = {
      changedRoomTypeList,
      changedRoomStyleList,
      changedCheckList,
      hover: false
    };
  }

  UNSAFE_componentWillMount(): void {
    this.status = ComponentStatus.WillMountStatus;
    this.closeBtnImgUrl = this.parseImageURL('cancel.svg');
    this.headTitle = ResourceManager.getString('autostyler_creating_panel_head_title');
    this.generateBtnCaption = ResourceManager.getString('autostyler_creating_panel_generate_button_caption');
    this.cancelBtnCaption = ResourceManager.getString('cancel');
    this.initRequestPicDataCommitterArr();
    this.checkValidResult = this.checkValid(
      this.state.changedCheckList,
      this.state.changedRoomTypeList,
      this.props.invalidRoomTypeSet
    );
    this.loadingItemIndexSet = new Set();
  }

  componentDidMount(): void {
    this.status = ComponentStatus.MountedStatus;
    if (this.closeBtnRef.current) {
      ResourceManager.injectSVGImage(this.closeBtnRef.current);
    }
  }

  componentWillUnmount = (): void => {
    this.status = ComponentStatus.UnMountedStatus;
  };

  UNSAFE_componentWillUpdate(nextProps: CreateStylerTemplatePanelProps, nextState: CreateStylerTemplatePanelState): void {
    this.checkValidResult = this.checkValid(
      nextState.changedCheckList,
      nextState.changedRoomTypeList,
      nextProps.invalidRoomTypeSet
    );
  }

  private parseImageURL(imageName: string): string {
    return `url/to/${imageName}`;
  }

  private initRequestPicDataCommitterArr = (): void => {
    this.requestPicDataCommitterArr = new Array(this.props.originalRoomListData.length).fill(undefined);
  };

  private addToLoadingItemIndexSet = (index: number): void => {
    const previousSize = this.loadingItemIndexSet.size;
    this.loadingItemIndexSet.add(index);
    if (previousSize === 0) {
      this.forceUpdate();
    }
  };

  private deleteFromLoadingItemIndexSet = (index: number): void => {
    const previousSize = this.loadingItemIndexSet.size;
    this.loadingItemIndexSet.delete(index);
    const currentSize = this.loadingItemIndexSet.size;
    if (previousSize > 0 && currentSize === 0) {
      this.forceUpdate();
    }
  };

  private onItemCheckedChange = (checked: boolean, index: number): void => {
    const changedCheckList = [...this.state.changedCheckList];
    changedCheckList[index] = checked;
    this.pictureRedLineArr[index] = '';
    this.setState({ changedCheckList });
  };

  private onItemRoomTypeChange = (roomTypeId: string, index: number): void => {
    const changedRoomTypeList = [...this.state.changedRoomTypeList];
    changedRoomTypeList[index] = roomTypeId;
    this.setState({ changedRoomTypeList });
  };

  private onItemRoomStyleChange = (roomStyleId: string, index: number): void => {
    const changedRoomStyleList = [...this.state.changedRoomStyleList];
    changedRoomStyleList[index] = roomStyleId;
    this.setState({ changedRoomStyleList });
  };

  private onBtnOKClick = (): void => {
    const { changedCheckList, changedRoomTypeList, changedRoomStyleList } = this.state;
    const { submitNotify, originalRoomListData } = this.props;

    let hasChecked = false;
    let allValid = true;

    for (let i = 0; i < changedCheckList.length; i++) {
      if (changedCheckList[i]) {
        hasChecked = true;
      }

      if (!this.pictureUrlArr[i] && changedCheckList[i]) {
        this.pictureRedLineArr[i] = 'pictureRedLine';
        allValid = false;
      } else {
        this.pictureRedLineArr[i] = '';
      }
    }

    if (!hasChecked) {
      LiveHint.show(ResourceManager.getString('plugin_no_room_check'), 2000, undefined, {
        status: LiveHint.statusEnum.canops,
        canclose: true
      });
      return;
    }

    if (!allValid) {
      LiveHint.show(ResourceManager.getString('plugin_wholehouse_mustadd_picture'), 2000, undefined, {
        status: LiveHint.statusEnum.canops,
        canclose: true
      });
      this.forceUpdate();
      return;
    }

    const roomListBoard = this.roomListBoardRef.current;
    if (!roomListBoard) return;

    const submitDataList: SubmitRoomData[] = [];
    const roomCount = this.props.originalRoomListData.length;
    let isWholehouse = false;

    for (let i = 0; i < roomCount; i++) {
      const picInfo = roomListBoard.getRoomPicInfo_(i);
      const processedPicInfo: PicInfo = {
        id: picInfo.id,
        url: picInfo.url ? HSApp.Util.Url.clearParams(picInfo.url) : picInfo.url
      };

      if (i === 0) {
        isWholehouse = true;
      }

      submitDataList.push({
        id: originalRoomListData[i].id,
        checked: changedCheckList[i],
        name: roomListBoard.getRoomCurrentName_(i),
        area: originalRoomListData[i].areaInfo.area,
        roomTypeId: changedRoomTypeList[i],
        roomStyleId: changedRoomStyleList[i],
        picInfo: processedPicInfo,
        wholehouse: isWholehouse
      });

      isWholehouse = false;
    }

    submitNotify(submitDataList, this);
  };

  private onBtnCancelClick = (): void => {
    this.props.cancelNotify(this);
  };

  private checkValid(
    checkList: boolean[],
    roomTypeList: string[],
    invalidRoomTypeSet: Set<string>
  ): CheckValidResult {
    const count = checkList.length;
    const result: CheckValidResult = {
      isValid: true,
      checkedCount: 0,
      wholehouse: false,
      wholehouseInValidCount: 0
    };

    for (let i = 0; i < count; i++) {
      if (checkList[i]) {
        result.checkedCount++;
        if (invalidRoomTypeSet.has(roomTypeList[i])) {
          result.isValid = false;
        }
      }
    }

    if (checkList[0]) {
      result.wholehouse = true;
      roomTypeList.forEach((roomType, index) => {
        if (invalidRoomTypeSet.has(roomTypeList[index])) {
          result.wholehouseInValidCount++;
          result.isValid = false;
        }
      });
    }

    if (result.checkedCount === 0) {
      result.isValid = false;
    }

    return result;
  }

  private getCheckedCount = (): number => {
    const { changedCheckList } = this.state;
    let count = 0;
    for (let i = 0; i < changedCheckList.length; i++) {
      if (changedCheckList[i]) {
        count++;
      }
    }
    return count;
  };

  private onRequestChangePicture = (index: number): void => {
    const roomListBoard = this.roomListBoardRef.current;
    if (!roomListBoard) return;

    const committer = new RequestPicDataCommitter(this.onGetPicInfoData);

    if (this.requestPicDataCommitterArr[index]) {
      this.requestPicDataCommitterArr[index]?.destroy();
      roomListBoard.changePictureMask_(index, PictureMask.None);
      this.deleteFromLoadingItemIndexSet(index);
    }

    this.requestPicDataCommitterArr[index] = committer;
    committer.addData('itemIdx', index);

    const onStart = (): void => {
      roomListBoard.changePictureMask_(index, PictureMask.Loading);
      this.addToLoadingItemIndexSet(index);
    };

    this.props.requestPictureNotify(committer, onStart, this, this.props.originalRoomListData[index]);
  };

  private onGetPicInfoData = (committer: RequestPicDataCommitter): void => {
    const roomListBoard = this.roomListBoardRef.current;
    if (this.status === ComponentStatus.UnMountedStatus || !roomListBoard) {
      return;
    }

    const itemIndex = committer.getData('itemIdx') as number;
    if (itemIndex === -1) return;

    this.requestPicDataCommitterArr[itemIndex] = undefined;

    if (committer.getData('hasError')) {
      roomListBoard.changePictureMask_(itemIndex, PictureMask.Error);
      this.deleteFromLoadingItemIndexSet(itemIndex);
    } else {
      const picInfo: PicInfo = {
        id: committer.getData('picId') as string,
        url: committer.getData('picUrl') as string
      };

      this.pictureUrlArr[itemIndex] = picInfo.url;
      this.pictureRedLineArr[itemIndex] = '';

      if (picInfo.url && picInfo.url !== '') {
        roomListBoard.changePictureMask_(itemIndex, PictureMask.Loading);
        this.addToLoadingItemIndexSet(itemIndex);
        roomListBoard.changePicture_(itemIndex, picInfo, () => {
          roomListBoard.changePictureMask_(itemIndex, PictureMask.None);
          this.deleteFromLoadingItemIndexSet(itemIndex);
        });
      } else {
        roomListBoard.changePictureMask_(itemIndex, PictureMask.None);
        this.deleteFromLoadingItemIndexSet(itemIndex);
      }
    }
  };

  private onMouseover = (): void => {
    this.setState({ hover: true });
  };

  private onMouseOut = (): void => {
    this.setState({ hover: false });
  };

  render(): JSX.Element {
    const checkedCount = this.checkValidResult.checkedCount;
    const { roomTypeList, roomStylerAttribute, defaultStyle, originalRoomListData } = this.props;

    return (
      <div className="createStylerTemplatePanel">
        <input type="button" className="modalCover" onClick={this.onBtnCancelClick} />
        <div className="mainPanel">
          <div className="headerwrap">
            <div className="title">{this.headTitle}</div>
            <div className="btn-close" onClick={this.onBtnCancelClick}>
              <span data-src={this.closeBtnImgUrl} ref={this.closeBtnRef} />
            </div>
          </div>
          <RoomListBoard
            ref={this.roomListBoardRef}
            originalRoomListData={originalRoomListData}
            roomTypeList={roomTypeList}
            defaultStyleId={defaultStyle}
            roomStyleList={roomStylerAttribute.values}
            onCheckedChange={this.onItemCheckedChange}
            onRoomTypeChange={this.onItemRoomTypeChange}
            onRoomStyleChange={this.onItemRoomStyleChange}
            onRequestChangePicture={this.onRequestChangePicture}
            pictureRedLineArr={this.pictureRedLineArr}
          />
          <div className="template-room-panel-buttons">
            <Button onClick={this.onBtnCancelClick} className="template-room-panel-button">
              {ResourceManager.getString('cancel')}
            </Button>
            <Button onClick={this.onBtnOKClick} type="primary" className="template-room-panel-button">
              {ResourceManager.getString('create_instance') + (checkedCount > 0 ? `(${checkedCount})` : '')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateStylerTemplatePanel;