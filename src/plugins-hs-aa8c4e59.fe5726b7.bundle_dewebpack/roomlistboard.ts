import React, { Component } from 'react';
import { RoomItem } from './RoomItem';
import { Scroll, Switch } from './UIComponents';
import CCheckBox from './CCheckBox';

interface AreaInfo {
  [key: string]: unknown;
}

interface PicInfo {
  [key: string]: unknown;
}

interface RoomData {
  checked: boolean;
  name: string;
  areaInfo: AreaInfo;
  roomTypeId: string | number;
  picInfo: PicInfo;
  wholehouse?: boolean;
}

interface RoomTypeItem {
  id: string | number;
  name: string;
}

interface RoomStyleItem {
  id: string | number;
  name: string;
}

interface RoomListBoardProps {
  originalRoomListData: RoomData[];
  roomTypeList: RoomTypeItem[];
  defaultStyleId: string | number;
  roomStyleList: RoomStyleItem[];
  pictureRedLineArr: unknown[];
  onCheckedChange: (checked: boolean, index: number) => void;
  onRoomTypeChange: (typeId: string | number, index: number) => void;
  onRoomStyleChange: (styleId: string | number, index: number) => void;
  onRoomNameChange: (name: string, index: number) => void;
  onRequestChangePicture: (index: number) => void;
}

interface RoomListBoardState {
  allChecked: boolean;
  originalRoomListData: RoomData[];
  selectSingleRoom: boolean;
}

interface UserData {
  itemIdx: number;
}

export class RoomListBoard extends Component<RoomListBoardProps, RoomListBoardState> {
  private _roomItemInstanceArr: RoomItem[] = [];
  private _items: React.ReactElement[] = [];

  constructor(props: RoomListBoardProps) {
    super(props);
    const roomListData = props.originalRoomListData;
    this.state = {
      allChecked: false,
      originalRoomListData: roomListData,
      selectSingleRoom: !roomListData[0].checked
    };
  }

  UNSAFE_componentWillMount = (): void => {
    this._roomItemInstanceArr = [];
  };

  componentWillUnmount = (): void => {
    this._destroyItems();
  };

  private _initItems = (): void => {
    this._items = [];
    const roomListData = this.state.originalRoomListData;
    const length = roomListData.length;

    for (let index = 0; index < length; ++index) {
      this._items.push(
        React.createElement(RoomItem, {
          key: index,
          ref: this._onRefFunc,
          roomTypeList: this.props.roomTypeList,
          defaultStyleId: this.props.defaultStyleId,
          roomStyleList: this.props.roomStyleList,
          initialChecked: roomListData[index].checked,
          initialName: roomListData[index].name,
          areaInfo: roomListData[index].areaInfo,
          initialRoomTypeId: roomListData[index].roomTypeId,
          initialPicInfo: roomListData[index].picInfo,
          onCheckedChange: this._onItemCheckedChange,
          onRoomTypeChange: this._onItemRoomTypeChange,
          onRoomStyleChange: this._onItemRoomStyleChange,
          onRequestChangePicture: this._onRequestChangePicture,
          userData: { itemIdx: index },
          wholehouse: index === 0,
          pictureRedLine: this.props.pictureRedLineArr[index]
        })
      );
    }
  };

  private _destroyItems = (): void => {
    this._items = [];
    this._roomItemInstanceArr = [];
  };

  private _onRefFunc = (element: RoomItem | null): void => {
    if (element && this._roomItemInstanceArr) {
      this._roomItemInstanceArr[element.props.userData.itemIdx] = element;
    }
  };

  private _onItemCheckedChange = (checked: boolean, userData: UserData): void => {
    const { onCheckedChange } = this.props;
    const itemIndex = userData.itemIdx;
    onCheckedChange(checked, itemIndex);

    const { originalRoomListData, selectSingleRoom: currentSelectSingleRoom } = this.state;
    originalRoomListData[itemIndex].checked = checked;

    let allChecked = true;
    for (let i = 0; i < originalRoomListData.length; i++) {
      if (!originalRoomListData[i].wholehouse && !originalRoomListData[i].checked) {
        allChecked = false;
        break;
      }
    }

    let selectSingleRoom = currentSelectSingleRoom;
    if (checked && itemIndex > 0) {
      selectSingleRoom = true;
    }

    this.setState({
      originalRoomListData: this.state.originalRoomListData,
      allChecked,
      selectSingleRoom
    });
  };

  private _onAllCheckedChange = (checked: boolean): void => {
    let { selectSingleRoom } = this.state;
    const { originalRoomListData } = this.state;
    const length = originalRoomListData.length;

    for (let i = 1; i < length; i++) {
      this.props.onCheckedChange(checked, i);
      originalRoomListData[i].checked = checked;
    }

    if (!selectSingleRoom && checked) {
      selectSingleRoom = true;
    }

    this.setState({
      allChecked: checked,
      originalRoomListData: this.state.originalRoomListData,
      selectSingleRoom
    });
  };

  private _onItemRoomTypeChange = (typeId: string | number, userData: UserData): void => {
    this.props.onRoomTypeChange(typeId, userData.itemIdx);
  };

  private _onItemRoomStyleChange = (styleId: string | number, userData: UserData): void => {
    this.props.onRoomStyleChange(styleId, userData.itemIdx);
  };

  private _onItemRoomNameChange = (name: string, userData: UserData): void => {
    this.props.onRoomNameChange(name, userData.itemIdx);
  };

  private _onRequestChangePicture = (userData: UserData): void => {
    this.props.onRequestChangePicture(userData.itemIdx);
  };

  public getRoomCurrentName_ = (index: number): string | undefined => {
    if (this._roomItemInstanceArr) {
      return this._roomItemInstanceArr[index].getCurrentName_();
    }
  };

  public getRoomPicInfo_ = (index: number): PicInfo | undefined => {
    if (this._roomItemInstanceArr) {
      return this._roomItemInstanceArr[index].getCurrentPicInfo_();
    }
  };

  public changePicture_ = (index: number, picInfo: PicInfo, extra: unknown): void => {
    if (this._roomItemInstanceArr) {
      this._roomItemInstanceArr[index].changePicture_(picInfo, extra);
    }
  };

  public changePictureMask_ = (index: number, mask: unknown): void => {
    if (this._roomItemInstanceArr) {
      this._roomItemInstanceArr[index].changePictureMask_(mask);
    }
  };

  render(): React.ReactElement {
    this._initItems();

    const { originalRoomListData, selectSingleRoom, allChecked } = this.state;

    const wholeHouseSwitchProps = {
      disabled: false,
      checked: originalRoomListData[0].checked,
      className: "roomListBoard-switch-con__switch",
      onClick: (checked: boolean) => {
        this._onItemCheckedChange(checked, { itemIdx: 0 });
      }
    };

    const singleRoomSwitchProps = {
      disabled: false,
      checked: selectSingleRoom,
      className: "roomListBoard-switch-con__switch",
      onClick: (checked: boolean) => {
        if (!checked) {
          this._onAllCheckedChange(false);
        }
        this.setState({ selectSingleRoom: checked });
      }
    };

    const allSelectCheckboxProps = {
      text: ResourceManager.getString("plugin_wholehouse_allselect"),
      disabled: false,
      status: allChecked ? CCheckBox.StatusEnum.checked : CCheckBox.StatusEnum.unchecked,
      className: "template-room-single-room-all-checkbox",
      onclick: (_: unknown, data: { checked: boolean }) => {
        this._onAllCheckedChange(data.checked);
      }
    };

    return React.createElement(
      "div",
      { className: "roomListBoard", ref: "roomListBoard" },
      React.createElement(
        Scroll,
        { className: "room-list-board-scrollbar" },
        React.createElement(
          "div",
          { className: "template-room-single-checkbox" },
          React.createElement(
            "div",
            { className: "roomListBoard-switch-con" },
            React.createElement(Switch, wholeHouseSwitchProps),
            ResourceManager.getString("create_wholeHouse")
          )
        ),
        this._items?.[0],
        React.createElement(
          "div",
          { className: "template-room-single-checkbox" },
          React.createElement(
            "div",
            { className: "roomListBoard-switch-con" },
            React.createElement(Switch, singleRoomSwitchProps),
            ResourceManager.getString("create_single_room")
          ),
          React.createElement(CCheckBox, { data: allSelectCheckboxProps })
        ),
        React.createElement(
          "div",
          { className: "roomList", ref: "roomList" },
          this._items?.slice(1)
        )
      )
    );
  }
}