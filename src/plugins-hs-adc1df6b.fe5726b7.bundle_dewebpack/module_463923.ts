import React from 'react';
import SecondLevelNode from './SecondLevelNode';
import ThirdLevelNode from './ThirdLevelNode';
import RadioButton from './RadioButton';
import LengthInput from './LengthInput';
import SliderInput from './SliderInput';
import SliderInputGroup from './SliderInputGroup';
import ImageButton from './ImageButton';
import Switch from './Switch';
import TabsSelect from './TabsSelect';
import DropdownRoomTypeList from './DropdownRoomTypeList';
import DropdownList from './DropdownList';
import DropdownInput from './DropdownInput';
import CheckBox from './CheckBox';
import ColorPicker from './ColorPicker';
import Button from './Button';
import BlockAlign from './BlockAlign';
import LabelRadioButton from './LabelRadioButton';
import LabelButton from './LabelButton';
import NoChoice from './NoChoice';
import CheckBlock from './CheckBlock';
import { AxialRotation } from './AxialRotation';
import { MultiSelectButton } from './MultiSelectButton';
import { SchematicDiagram } from './SchematicDiagram';
import TpzzLabelRadioInput from './TpzzLabelRadioInput';
import LabelButtons from './LabelButtons';
import LabelInput from './LabelInput';
import { RotateButton } from './RotateButton';
import DropdownAreaList from './DropdownAreaList';

interface ComponentItem {
  id: string;
  type: string;
  data?: unknown;
  getRenderItem?: () => React.ReactElement | null;
}

interface ComponentData {
  id: string;
  data: unknown;
}

type ComponentType = React.ComponentType<any>;

export function createComponentByType(item: ComponentItem | null | undefined): React.ReactElement | string {
  if (!item) return '';

  switch (item.type) {
    case HSFPConstants.PropertyBarType.SecondLevelNode:
      return React.createElement(SecondLevelNode, {
        item,
        key: item.id
      });

    case HSFPConstants.PropertyBarType.ThirdLevelNode:
      return React.createElement(ThirdLevelNode, {
        item
      });

    case HSFPConstants.PropertyBarType.RadioButton:
      return React.createElement(RadioButton, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.LengthInput:
      return React.createElement(LengthInput, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.SliderInput:
      return React.createElement(SliderInput, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.SliderInputGroup:
      return React.createElement(SliderInputGroup, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.ImageButton:
      return React.createElement(ImageButton, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.Switch:
      return React.createElement(Switch, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.TabsSelect:
      return React.createElement(TabsSelect, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.Dropdownroomtypelist:
      return React.createElement(DropdownRoomTypeList, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.DropdownList:
      return React.createElement(DropdownList, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.DropdownInput:
      return React.createElement(DropdownInput, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.CheckBox:
      return React.createElement(CheckBox, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.ColorPicker:
      return React.createElement(ColorPicker, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.Button:
    case HSFPConstants.PropertyBarType.ImageTextButton:
      return React.createElement(Button, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.BlockAlign:
      return React.createElement(BlockAlign, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.LabelRadioButton:
      return React.createElement(LabelRadioButton, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.LabelButton:
      return React.createElement(LabelButton, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.NoChoice:
      return React.createElement(NoChoice, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.CheckBlock:
      return React.createElement(CheckBlock, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.TpzzLabelRadioInput:
      return React.createElement(TpzzLabelRadioInput, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.LabelButtons:
      return React.createElement(LabelButtons, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.LabelInput:
      return React.createElement(LabelInput, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.RotateButton:
      return React.createElement(RotateButton, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.AxialRotation:
      return React.createElement(AxialRotation, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.DropdownAreaList:
      return React.createElement(DropdownAreaList, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.MultiSelectButton:
      return React.createElement(MultiSelectButton, {
        id: item.id,
        data: item.data
      });

    case HSFPConstants.PropertyBarType.SchematicDiagram:
      return React.createElement(SchematicDiagram, {
        id: item.id,
        data: item.data
      });

    default:
      if (item.getRenderItem) {
        return item.getRenderItem();
      }
  }

  return '';
}

export function getComponentByType(type: string): ComponentType {
  switch (type) {
    case HSFPConstants.PropertyBarType.SecondLevelNode:
      return SecondLevelNode;

    case HSFPConstants.PropertyBarType.ThirdLevelNode:
      return ThirdLevelNode;

    case HSFPConstants.PropertyBarType.RadioButton:
      return RadioButton;

    case HSFPConstants.PropertyBarType.LengthInput:
      return LengthInput;

    case HSFPConstants.PropertyBarType.SliderInput:
      return SliderInput;

    case HSFPConstants.PropertyBarType.SliderInputGroup:
      return SliderInputGroup;

    case HSFPConstants.PropertyBarType.ImageButton:
      return ImageButton;

    case HSFPConstants.PropertyBarType.Switch:
      return Switch;

    case HSFPConstants.PropertyBarType.TabsSelect:
      return TabsSelect;

    case HSFPConstants.PropertyBarType.Dropdownroomtypelist:
      return DropdownRoomTypeList;

    case HSFPConstants.PropertyBarType.DropdownList:
      return DropdownList;

    case HSFPConstants.PropertyBarType.CheckBox:
      return CheckBox;

    case HSFPConstants.PropertyBarType.ColorPicker:
      return ColorPicker;

    case HSFPConstants.PropertyBarType.Button:
    case HSFPConstants.PropertyBarType.ImageTextButton:
      return Button;

    case HSFPConstants.PropertyBarType.BlockAlign:
      return BlockAlign;

    case HSFPConstants.PropertyBarType.LabelRadioButton:
      return LabelRadioButton;

    case HSFPConstants.PropertyBarType.LabelButton:
      return LabelButton;

    case HSFPConstants.PropertyBarType.NoChoice:
      return NoChoice;

    case HSFPConstants.PropertyBarType.CheckBlock:
      return CheckBlock;

    case HSFPConstants.PropertyBarType.TpzzLabelRadioInput:
      return TpzzLabelRadioInput;

    case HSFPConstants.PropertyBarType.LabelButtons:
      return LabelButtons;

    case HSFPConstants.PropertyBarType.LabelInput:
      return LabelInput;

    case HSFPConstants.PropertyBarType.RotateButton:
      return RotateButton;

    case HSFPConstants.PropertyBarType.AxialRotation:
      return AxialRotation;

    case HSFPConstants.PropertyBarType.MultiSelectButton:
      return MultiSelectButton;

    default:
      return ImageButton;
  }
}