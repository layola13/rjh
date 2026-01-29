import React, { Component, ChangeEvent } from 'react';
import { CheckBox, Input, Select, Option } from './UIComponents';
import { AddPictureButton } from './AddPictureButton';

interface AreaInfo {
  area: number;
  displayUnit: string;
  precisionDigits: number;
}

interface RoomType {
  id: string;
  name: string;
}

interface RoomStyle {
  id: string;
  value: string;
}

interface PictureInfo {
  url?: string;
  data?: unknown;
}

interface RoomItemProps {
  initialName: string;
  initialChecked: boolean;
  initialRoomTypeId: string;
  defaultStyleId: string;
  areaInfo: AreaInfo;
  wholehouse: boolean;
  pictureRedLine: boolean;
  initialPicInfo: PictureInfo;
  roomTypeList: RoomType[];
  roomStyleList: RoomStyle[];
  userData: unknown;
  onCheckedChange: (checked: boolean, userData: unknown) => void;
  onRoomTypeChange: (roomTypeId: string, userData: unknown) => void;
  onRoomStyleChange: (roomStyleId: string, userData: unknown) => void;
  onRequestChangePicture?: (userData: unknown) => void;
}

interface RoomItemState {
  name: string;
  roomTypeId: string;
  roomStyleId: string;
}

export class RoomItem extends Component<RoomItemProps, RoomItemState> {
  private _roomStyleSelectClassName: string = '';
  private _roomTypeSelectOptions: JSX.Element[] = [];
  private _roomStyleSelectOptions: JSX.Element[] = [];
  
  private refs: {
    picBtn?: AddPictureButton & {
      getCurrentPicInfo_: () => PictureInfo;
      changePicture_: (url: string, data: unknown) => void;
      changePictureMask_: (masked: boolean) => void;
    };
    nameTextInput?: Input;
    roomStyleSelect?: Select;
  } = {};

  constructor(props: RoomItemProps) {
    super(props);
    
    this.state = {
      name: props.initialName,
      roomTypeId: props.initialRoomTypeId,
      roomStyleId: props.defaultStyleId
    };
  }

  UNSAFE_componentWillMount = (): void => {
    this._initRoomTypeSelectOptions();
    this._initRoomStyleSelectOptions();
    this._roomStyleSelectClassName = 'roomStyle';
  };

  private _changeCheck = (): void => {
    const newChecked = !this.props.initialChecked;
    this.props.onCheckedChange(newChecked, this.props.userData);
  };

  private _onCheckedChange = (): void => {
    this._changeCheck();
  };

  private _onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      name: event.target.value
    });
  };

  private _onRoomTypeChange = (roomTypeId: string): void => {
    this.setState({
      roomTypeId
    });
    this.props.onRoomTypeChange(roomTypeId, this.props.userData);
  };

  private _onRoomStyleChange = (roomStyleId: string): void => {
    this.setState({
      roomStyleId
    });
    this.props.onRoomStyleChange(roomStyleId, this.props.userData);
  };

  private _initRoomTypeSelectOptions = (): void => {
    this._roomTypeSelectOptions = [];
    const { roomTypeList } = this.props;
    const length = roomTypeList.length;
    
    for (let i = 0; i < length; ++i) {
      const roomType = roomTypeList[i];
      const option = React.createElement(
        Option,
        {
          key: i,
          title: ResourceManager.getString(roomType.name),
          value: roomType.id
        },
        ResourceManager.getString(roomType.name)
      );
      this._roomTypeSelectOptions.push(option);
    }
  };

  private _initRoomStyleSelectOptions = (): void => {
    const { roomStyleList } = this.props;
    this._roomStyleSelectOptions = roomStyleList.map((style) => {
      return React.createElement(
        Option,
        {
          key: style.id,
          title: style.value,
          value: style.id
        },
        style.value
      );
    });
  };

  private _onPictureClick = (): void => {
    this._changeCheck();
  };

  private _onPictureIconClick = (): void => {
    if (!this.props.initialChecked) {
      this.props.onCheckedChange(true, this.props.userData);
    }
    
    if (this.props.onRequestChangePicture) {
      this.props.onRequestChangePicture(this.props.userData);
    }
  };

  private _onNameTextInputFocus = (): void => {
    this.refs.nameTextInput?.select();
  };

  private _toFixedNumberStr = (value: number): string => {
    return new Number(value).toFixed(1);
  };

  public getCurrentPicInfo_ = (): PictureInfo => {
    return this.refs.picBtn?.getCurrentPicInfo_() ?? {};
  };

  public getCurrentName_ = (): string => {
    return this.state.name;
  };

  public changePicture_ = (url: string, data: unknown): void => {
    this.refs.picBtn?.changePicture_(url, data);
  };

  public changePictureMask_ = (masked: boolean): void => {
    this.refs.picBtn?.changePictureMask_(masked);
  };

  render(): JSX.Element {
    const {
      areaInfo,
      initialChecked,
      wholehouse,
      pictureRedLine,
      initialPicInfo
    } = this.props;

    const areaDisplay = HSApp.Util.UnitFormater.toAreaDisplayString(
      areaInfo.area,
      areaInfo.displayUnit,
      areaInfo.precisionDigits,
      true
    );

    return React.createElement(
      'div',
      {
        className: `roomItem ${initialChecked ? ' roomItem__selected' : ''}`
      },
      !wholehouse && React.createElement(CheckBox, {
        className: 'check',
        checked: initialChecked,
        onChange: this._onCheckedChange
      }),
      React.createElement(
        'div',
        { className: 'roomItem-card' },
        React.createElement(AddPictureButton, {
          pictureRedLine,
          ref: 'picBtn',
          initialPictureInfo: initialPicInfo,
          onPictureClick: this._onPictureClick,
          onIconClick: this._onPictureIconClick
        })
      ),
      React.createElement(
        'div',
        { className: 'roomItem-property' },
        React.createElement(
          'div',
          { className: 'roomItem-property-item' },
          React.createElement(
            'span',
            { className: 'roomItem-property-item-label' },
            ResourceManager.getString('pageHeader_name_of_design'),
            ':'
          ),
          React.createElement(Input, {
            size: 'large',
            value: this.state.name,
            onChange: this._onNameChange
          })
        ),
        React.createElement(
          'div',
          { className: 'roomItem-property-item' },
          React.createElement(
            'span',
            { className: 'roomItem-property-item-label' },
            ResourceManager.getString('catalog_product_item_area'),
            ':'
          ),
          React.createElement(
            'span',
            { className: 'roomItem-property-item-con' },
            areaDisplay
          )
        ),
        React.createElement(
          'div',
          { className: 'roomItem-property-item' },
          React.createElement(
            'span',
            { className: 'roomItem-property-item-label' },
            ResourceManager.getString('catalog_product_item_type'),
            ':'
          ),
          wholehouse
            ? React.createElement(
                'div',
                { className: 'wholehousespan' },
                ResourceManager.getString('model_wholehouse')
              )
            : React.createElement(
                Select,
                {
                  size: 'large',
                  className: 'roomType',
                  value: this.state.roomTypeId,
                  onChange: this._onRoomTypeChange
                },
                this._roomTypeSelectOptions
              )
        ),
        React.createElement(
          'div',
          { className: 'roomItem-property-item' },
          React.createElement(
            'span',
            { className: 'roomItem-property-item-label' },
            ResourceManager.getString('catalog_product_item_style'),
            ':'
          ),
          React.createElement(
            Select,
            {
              size: 'large',
              ref: 'roomStyleSelect',
              className: this._roomStyleSelectClassName,
              value: this.state.roomStyleId,
              onChange: this._onRoomStyleChange
            },
            this._roomStyleSelectOptions
          )
        )
      )
    );
  }
}