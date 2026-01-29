import React from 'react';
import PropTypes from 'prop-types';
import UnderlayImageSetting from './UnderlayImageSetting';
import MaterialDropdownList from './MaterialDropdownList';
import ImageButton from './ImageButton';
import ZoomView from './ZoomView';
import Performance3dWidget from './Performance3dWidget';
import DropDown from './DropDown';
import CameraSwitch from './CameraSwitch';
import VerticalDivider from './VerticalDivider';
import { RenderPreviewWidget } from './RenderPreviewWidget';
import { SizeLimitWidget } from './SizeLimitWidget';

enum StatusBarItemTypeEnum {
  Vdivider = 'Vdivider',
  UnderlayimgSetting = 'UnderlayimgSetting',
  ImageButton = 'ImageButton',
  ZoomView = 'ZoomView',
  DropDown = 'DropDown',
  RenderPreviewWidget = 'RenderPreviewWidget',
  SizeLimitWidget = 'SizeLimitWidget',
  MaterialDropdownList = 'MaterialDropdownList',
  Performance3dWidget = 'Performance3dWidget'
}

enum PropertyBarControlTypeEnum {
  subdivider = 'subdivider',
  ImageButtonWithPopup = 'ImageButtonWithPopup',
  imageButton = 'imageButton',
  image = 'image',
  linkButton = 'linkButton',
  label = 'label',
  numberinput = 'numberinput',
  areaInput = 'areaInput',
  lengthInput = 'lengthInput',
  space = 'space',
  dropDownListEx = 'dropDownListEx',
  cameraSwitchWidget = 'cameraSwitchWidget',
  button = 'button',
  slider = 'slider',
  sliderscale = 'sliderscale',
  radioButton = 'radioButton',
  checkbox = 'checkbox',
  colorCheckbox = 'colorCheckbox',
  toggleBtn = 'toggleBtn',
  toggleBtnNew = 'toggleBtnNew',
  statusBtn = 'statusBtn',
  ninePatch = 'ninePatch',
  CImageButton = 'CImageButton'
}

type StatusBarItemPosition = 'left' | 'right' | 'rightFloat';

interface StatusBarItemData {
  width?: number;
  [key: string]: unknown;
}

interface StatusBarItem {
  type: StatusBarItemTypeEnum | PropertyBarControlTypeEnum;
  position?: StatusBarItemPosition;
  data: StatusBarItemData;
}

interface StatusBarProps {
  itemsMap: Map<string, StatusBarItem>;
  showLeft?: boolean;
  showRight?: boolean;
  disableLeft?: boolean;
  disableRight?: boolean;
}

interface StatusBarState {}

export default class StatusBar extends React.Component<StatusBarProps, StatusBarState> {
  static propTypes = {
    itemsMap: PropTypes.object
  };

  static defaultProps = {
    itemsMap: new Map(),
    disableLeft: false,
    disableRight: false
  };

  constructor(props: StatusBarProps) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(): void {
    const app = HSApp.App.getApp();
    if (app.environmentManager.activeEnvironmentId !== HSFPConstants.Environment.SlabEdit) {
      const viewSwitchPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.ViewSwitch);
      if (viewSwitchPlugin) {
        viewSwitchPlugin.show();
      }
    }
  }

  componentWillUnmount(): void {
    HSApp.App.getApp().layoutMgr.unregister('StatusBar');
  }

  renderItem(item: StatusBarItem): React.ReactElement[] {
    const elements: React.ReactElement[] = [];
    const itemData = item.data;

    switch (item.type) {
      case StatusBarItemTypeEnum.Vdivider:
        elements.push(React.createElement(VerticalDivider, { data: itemData }));
        break;

      case PropertyBarControlTypeEnum.subdivider:
        break;

      case StatusBarItemTypeEnum.UnderlayimgSetting:
        elements.push(React.createElement(UnderlayImageSetting, { data: itemData }));
        break;

      case StatusBarItemTypeEnum.ImageButton:
        elements.push(React.createElement(ImageButton, { data: itemData }));
        break;

      case StatusBarItemTypeEnum.ZoomView:
        elements.push(React.createElement(ZoomView, { data: itemData }));
        break;

      case StatusBarItemTypeEnum.DropDown:
        elements.push(React.createElement(DropDown, { data: itemData }));
        break;

      case StatusBarItemTypeEnum.RenderPreviewWidget:
        elements.push(React.createElement(RenderPreviewWidget, { data: itemData }));
        break;

      case StatusBarItemTypeEnum.SizeLimitWidget:
        elements.push(React.createElement(SizeLimitWidget, { data: itemData }));
        break;

      case PropertyBarControlTypeEnum.ImageButtonWithPopup:
      case PropertyBarControlTypeEnum.imageButton:
      case PropertyBarControlTypeEnum.image:
      case PropertyBarControlTypeEnum.linkButton:
      case PropertyBarControlTypeEnum.label:
      case PropertyBarControlTypeEnum.numberinput:
      case PropertyBarControlTypeEnum.areaInput:
      case PropertyBarControlTypeEnum.lengthInput:
        break;

      case PropertyBarControlTypeEnum.space:
        itemData.width = itemData.width ?? 10;
        break;

      case StatusBarItemTypeEnum.MaterialDropdownList:
        elements.push(React.createElement(MaterialDropdownList, { data: itemData }));
        break;

      case PropertyBarControlTypeEnum.dropDownListEx:
        break;

      case PropertyBarControlTypeEnum.cameraSwitchWidget:
        elements.push(React.createElement(CameraSwitch, { data: itemData }));
        break;

      case PropertyBarControlTypeEnum.button:
      case PropertyBarControlTypeEnum.slider:
      case PropertyBarControlTypeEnum.sliderscale:
      case PropertyBarControlTypeEnum.radioButton:
      case PropertyBarControlTypeEnum.checkbox:
      case PropertyBarControlTypeEnum.colorCheckbox:
      case PropertyBarControlTypeEnum.toggleBtn:
      case PropertyBarControlTypeEnum.toggleBtnNew:
      case PropertyBarControlTypeEnum.statusBtn:
      case PropertyBarControlTypeEnum.ninePatch:
        break;

      case StatusBarItemTypeEnum.Performance3dWidget:
        elements.push(React.createElement(Performance3dWidget, { data: itemData }));
        break;

      case PropertyBarControlTypeEnum.CImageButton:
        break;
    }

    return elements;
  }

  render(): React.ReactElement {
    const { itemsMap, showLeft, showRight, disableLeft, disableRight } = this.props;
    const leftItems: React.ReactElement[] = [];
    const rightItems: React.ReactElement[] = [];
    const floatingItems: React.ReactElement[] = [];

    itemsMap.forEach((item: StatusBarItem) => {
      switch (item.position) {
        case 'right':
          rightItems.push(...this.renderItem(item));
          break;
        case 'rightFloat':
          floatingItems.push(...this.renderItem(item));
          break;
        default:
          leftItems.push(...this.renderItem(item));
      }
    });

    return React.createElement(
      'div',
      { className: 'status-bar-contents' },
      React.createElement(
        'div',
        {
          className: `left-status-bar contents-container ${showLeft ? '' : 'hidden-bar'} ${disableLeft ? 'disable' : ''}`
        },
        leftItems,
        React.createElement('div', { className: 'status-bar-plugin-container' })
      ),
      React.createElement(
        'div',
        {
          className: `right-status-bar contents-container ${showRight ? '' : 'hidden-bar'} ${rightItems.length ? '' : 'empty-right-items'}${disableRight ? ' disable' : ''}`
        },
        rightItems
      ),
      floatingItems
    );
  }
}