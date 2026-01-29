import { PropertyBar, PropertyBarControlTypeEnum } from './property-bar';
import PropertyBarPopup from './property-bar-popup';
import { StatusBarItemTypeEnum } from './status-bar';
import { NameRoomPopup } from './name-room-popup';
import { AuthPopup } from './auth-popup';
import { 
  UnitInputWidget, 
  UnitInputWidgetStateEnum, 
  UnitInputWidgetEventsEnum, 
  UnitInputWidgetChangeReasonEnum 
} from './unit-input-widget';
import LengthInputWidget from './length-input-widget';
import AreaInputWidget from './area-input-widget';
import CCheckBox from './c-checkbox';
import ColorCheckbox from './color-checkbox';
import LoadingWidget from './loading-widget';
import { FullScreenLoading } from './full-screen-loading';
import SvgIcon from './svg-icon';
import StatusButton from './status-button';
import ExpandButton from './expand-button';
import HintView from './hint-view';
import PopupWindowBuilder from './popup-window-builder';
import Notification from './notification';
import UserGuide from './user-guide';
import { PageLoading, PanelLoading } from './loading-components';
import LiveHint from './live-hint';
import FloatInput from './float-input';
import LargeView from './large-view';
import MiniImagePreviewCtrl from './mini-image-preview-ctrl';
import ScrollTip from './scroll-tip';
import ToggleButtonWidget from './toggle-button-widget';
import ToggleBtnWidget from './toggle-btn-widget';
import StatusBtnWidget from './status-btn-widget';
import { NinePatchWidget } from './nine-patch-widget';
import ViewModeDropdown from './view-mode-dropdown';
import Button from './button';
import BubbleTooltips from './bubble-tooltips';
import Popover from './popover';
import DraggableContainer from './draggable-container';
import NumberController from './number-controller';
import ImgBtn from './img-btn';
import ImageBtn from './image-btn';
import LengthInput from './length-input';
import { Button as AdButton, Form as AdForm, Divider as AdDivider, Select as AdSelect } from './ad-components';
import { DeleteOutlined as AdDeleteOutlined } from './ad-icons';
import { EndPointItem, EndPointType } from './endpoint';
import { PathItem } from './path-item';
import { WallSvgAttr, ALWallAttr, AuxiliaryLineAttr, ActiveAuxiliaryLineAttr } from './wall-attributes';
import {
  Tabs as HSTabs,
  Modal as HSModal,
  Icons as HSIcons,
  DraggableModal as HSDraggableModal,
  Button as HSButton,
  Tooltip as HSTooltip,
  Message as HSMessage,
  NumberInput as HSNumberInput,
  Radio as HSRadio,
  RadioGroup as HSRadioGroup,
  Menu as HSMenu,
  SubMenu as HSSubMenu,
  MenuItem as HSMenuItem,
  Slider as HSSlider,
  Select as HSSelect,
  CheckBox as HSCheckBox,
  CheckBoxGroup as HSCheckBoxGroup,
  Option as HSOption,
  IconfontView as HSIconfontView,
  Scroll as HSScroll,
  Tree as HSTree,
  Popconfirm as HSPopconfirm,
  Popover as HSPopover,
  ImageButton as HSImageButton,
  SmartText as HSSmartText
} from './hs-components';
import HSCatalogLib from './hs-catalog-lib';
import * as patternAssets from './patterns';

interface ComponentRegistry {
  [key: string]: unknown;
}

const componentMap = new Map<string, unknown>();

componentMap.set('PropertyBar', PropertyBar);
componentMap.set('PropertyBarControlTypeEnum', PropertyBarControlTypeEnum);
componentMap.set('PropertyBarPopup', PropertyBarPopup);
componentMap.set('StatusBarItemTypeEnum', StatusBarItemTypeEnum);
componentMap.set('NameRoomPopUp', NameRoomPopup);
componentMap.set('AuthPopup', AuthPopup);
componentMap.set('UnitInputWidget', UnitInputWidget);
componentMap.set('UnitInputWidgetStateEnum', UnitInputWidgetStateEnum);
componentMap.set('UnitInputWidgetEventsEnum', UnitInputWidgetEventsEnum);
componentMap.set('UnitInputWidgetChangeReasonEnum', UnitInputWidgetChangeReasonEnum);
componentMap.set('LengthInputWidget', LengthInputWidget);
componentMap.set('AreaInputWidget', AreaInputWidget);
componentMap.set('CCheckBox', CCheckBox);
componentMap.set('ColorCheckbox', ColorCheckbox);
componentMap.set('LoadingWidget', LoadingWidget);
componentMap.set('FullScreenLoading', FullScreenLoading);
componentMap.set('SvgIcon', SvgIcon);
componentMap.set('StatusButton', StatusButton);
componentMap.set('ExpandButton', ExpandButton);
componentMap.set('HintView', HintView);
componentMap.set('PopupWindowBuilder', PopupWindowBuilder);
componentMap.set('Notification', Notification);
componentMap.set('UserGuide', UserGuide);
componentMap.set('PageLoading', PageLoading);
componentMap.set('PanelLoading', PanelLoading);
componentMap.set('LiveHint', LiveHint);
componentMap.set('FloatInput', new FloatInput());
componentMap.set('LargeView', LargeView);
componentMap.set('MiniImagePreviewCtrl', MiniImagePreviewCtrl);
componentMap.set('ScrollTip', ScrollTip);
componentMap.set('ToggleButtonWidget', ToggleButtonWidget);
componentMap.set('ToggleBtnWidget', ToggleBtnWidget);
componentMap.set('StatusBtnWidget', StatusBtnWidget);
componentMap.set('NinePatchWidget', NinePatchWidget);
componentMap.set('viewModeDropdown', ViewModeDropdown);
componentMap.set('Button', Button);
componentMap.set('BubbleTooltips', BubbleTooltips);
componentMap.set('Popover', Popover);
componentMap.set('DraggableContainer', DraggableContainer);
componentMap.set('NumberController', NumberController);
componentMap.set('ImgBtn', ImgBtn);
componentMap.set('ImageBtn', ImageBtn);
componentMap.set('LengthInput', LengthInput);
componentMap.set('AdButton', AdButton);
componentMap.set('AdDeleteOutlined', AdDeleteOutlined);
componentMap.set('AdForm', AdForm);
componentMap.set('AdDivider', AdDivider);
componentMap.set('AdSelect', AdSelect);
componentMap.set('EndPointItem', EndPointItem);
componentMap.set('EndPointType', EndPointType);
componentMap.set('PathItem', PathItem);
componentMap.set('WallSvgAttr', WallSvgAttr);
componentMap.set('ALWallAttr', ALWallAttr);
componentMap.set('AuxiliaryLineAttr', AuxiliaryLineAttr);
componentMap.set('ActiveAuxiliaryLineAttr', ActiveAuxiliaryLineAttr);
componentMap.set('HSTabs', HSTabs);
componentMap.set('HSModal', HSModal);
componentMap.set('HSIcons', HSIcons);
componentMap.set('HSDraggableModal', HSDraggableModal);
componentMap.set('HSButton', HSButton);
componentMap.set('HSTooltip', HSTooltip);
componentMap.set('HSMessage', HSMessage);
componentMap.set('HSNumberInput', HSNumberInput);
componentMap.set('HSRadio', HSRadio);
componentMap.set('HSRadioGroup', HSRadioGroup);
componentMap.set('HSMenu', HSMenu);
componentMap.set('HSSubMenu', HSSubMenu);
componentMap.set('HSMenuItem', HSMenuItem);
componentMap.set('HSSlider', HSSlider);
componentMap.set('HSSelect', HSSelect);
componentMap.set('HSCheckBox', HSCheckBox);
componentMap.set('HSCheckBoxGroup', HSCheckBoxGroup);
componentMap.set('HSOption', HSOption);
componentMap.set('HSIconfontView', HSIconfontView);
componentMap.set('HSScroll', HSScroll);
componentMap.set('HSTree', HSTree);
componentMap.set('HSPopconfirm', HSPopconfirm);
componentMap.set('HSPopover', HSPopover);
componentMap.set('HSImageButton', HSImageButton);
componentMap.set('HSSmartText', HSSmartText);
componentMap.set('HSCatalogLib', HSCatalogLib);

for (const assetKey of patternAssets.keys()) {
  let patternName = '';
  
  if (assetKey.includes('brick')) {
    patternName += 'brick';
  } else if (assetKey.includes('concrete')) {
    patternName += 'concrete';
  } else if (assetKey.includes('gypsum')) {
    patternName += 'gypsum';
  }
  
  if (assetKey.includes('hover')) {
    patternName += 'Hover';
  } else if (assetKey.includes('selected')) {
    patternName += 'Selected';
  } else if (assetKey.includes('moving')) {
    patternName += 'Moving';
  } else if (assetKey.includes('loadbearing')) {
    patternName += 'Load';
  }
  
  patternName += 'Pattern';
  componentMap.set(patternName, patternAssets(assetKey));
}

declare global {
  interface Window extends ComponentRegistry {
    HSApp: {
      Util: {
        Core: {
          define(namespace: string): ComponentRegistry;
        };
      };
    };
  }
}

const uiNamespace = window.HSApp.Util.Core.define('HSApp.UI');

componentMap.forEach((component: unknown, componentName: string) => {
  (window as ComponentRegistry)[componentName] = component;
  uiNamespace[componentName] = component;
});