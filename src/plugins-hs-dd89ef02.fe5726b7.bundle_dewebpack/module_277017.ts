import React, { Component } from 'react';

enum PropertyBarControlTypeEnum {
  dropDownEditList = 'dropDownEditList',
  dropDownList = 'dropDownList',
  toggleBtn = 'toggleBtn',
  radioButton = 'radioButton',
  checkbox = 'checkbox',
  helptip = 'helptip',
  vdivider = 'vdivider',
  imgbtn = 'imgbtn'
}

interface DropDownEditListData {
  [key: string]: unknown;
}

interface DropDownListData {
  [key: string]: unknown;
}

interface ToggleBtnData {
  positionClass?: string;
  [key: string]: unknown;
}

interface RadioButtonData {
  [key: string]: unknown;
}

interface CheckboxData {
  [key: string]: unknown;
}

interface HelpTipData {
  src: string;
  text: string;
  placement?: string;
  className?: string;
  [key: string]: unknown;
}

interface VDividerData {
  [key: string]: unknown;
}

interface ImgBtnData {
  [key: string]: unknown;
}

interface MenuItem {
  id?: string;
  type: PropertyBarControlTypeEnum;
  data: DropDownEditListData | DropDownListData | ToggleBtnData | RadioButtonData | CheckboxData | HelpTipData | VDividerData | ImgBtnData;
}

interface MenuConfig {
  status?: string | boolean;
  items?: MenuItem[];
  label?: string;
  onclick?: (checked: boolean) => void;
  className: string;
}

interface CreateWallBarProps {
  menu: MenuConfig;
}

interface CreateWallBarState {
  down: boolean;
}

interface LayoutConstraint {
  isShow: boolean;
  width: number;
}

interface LayoutManager {
  register(name: string, element: Element): void;
  unregister(name: string): void;
  addConstrain(source: string, target: string, callback: (constraint: LayoutConstraint) => void): void;
}

interface HSAppInstance {
  layoutMgr: LayoutManager;
}

declare global {
  const HSApp: {
    App: {
      getApp(): HSAppInstance;
    };
  };
  const ResourceManager: {
    getString(key: string): string;
  };
}

import DropDownEditList from './DropDownEditList';
import DropDownList from './DropDownList';
import ToggleBtn from './ToggleBtn';
import RadioButton from './RadioButton';
import Checkbox from './Checkbox';
import HelpTip from './HelpTip';
import VDivider from './VDivider';
import ImgBtn from './ImgBtn';

class CreateWallBar extends Component<CreateWallBarProps, CreateWallBarState> {
  constructor(props: CreateWallBarProps) {
    super(props);
    
    this.state = {
      down: false
    };
    
    this.clickDown = this.clickDown.bind(this);
  }

  componentDidMount(): void {
    const wallContainer = document.querySelector('.wallcontainer');
    const layoutManager = HSApp.App.getApp().layoutMgr;
    
    if (wallContainer) {
      layoutManager.register('CreateWallBar', wallContainer);
      layoutManager.addConstrain('CatalogLib', 'CreateWallBar', (constraint: LayoutConstraint) => {
        const leftPosition = constraint.isShow ? `${76 + constraint.width}px` : '76px';
        (wallContainer as HTMLElement).style.left = leftPosition;
      });
    }
  }

  componentWillUnmount(): void {
    HSApp.App.getApp().layoutMgr.unregister('CreateWallBar');
  }

  clickDown(): void {
    this.setState({
      down: !this.state.down
    });
  }

  render(): JSX.Element {
    const { menu } = this.props;
    const { down } = this.state;
    
    let status = menu.status;
    if (status === 'unchecked') {
      status = false;
    }

    const items: JSX.Element[] = [];
    
    menu.items?.forEach((item: MenuItem) => {
      switch (item.type) {
        case PropertyBarControlTypeEnum.dropDownEditList:
          items.push(
            <DropDownEditList
              key={item.id}
              id={item.id}
              data={item.data as DropDownEditListData}
            />
          );
          break;
          
        case PropertyBarControlTypeEnum.dropDownList:
          items.push(
            <DropDownList
              key={item.id}
              id={item.id}
              data={item.data as DropDownListData}
            />
          );
          break;
          
        case PropertyBarControlTypeEnum.toggleBtn:
          const toggleData = item.data as ToggleBtnData;
          if (!toggleData.positionClass) {
            toggleData.positionClass = '';
          }
          items.push(
            <ToggleBtn
              key={item.id}
              id={item.id}
              data={toggleData}
              checkedChildren={ResourceManager.getString('button_toggle_on')}
              unCheckedChildren={ResourceManager.getString('button_toggle_off')}
            />
          );
          break;
          
        case PropertyBarControlTypeEnum.radioButton:
          items.push(
            <RadioButton
              key={item.id}
              data={item.data as RadioButtonData}
            />
          );
          break;
          
        case PropertyBarControlTypeEnum.checkbox:
          items.push(
            <Checkbox
              key={item.id}
              data={item.data as CheckboxData}
            />
          );
          break;
          
        case PropertyBarControlTypeEnum.helptip:
          const helpTipData = item.data as HelpTipData;
          items.push(
            <HelpTip
              key={item.id}
              isHeavy={true}
              data={helpTipData}
              src={helpTipData.src}
              text={helpTipData.text}
              placement={helpTipData.placement}
              className={helpTipData.className}
            />
          );
          break;
          
        case PropertyBarControlTypeEnum.vdivider:
          items.push(
            <VDivider
              key={item.id}
              data={item.data as VDividerData}
            />
          );
          break;
          
        case PropertyBarControlTypeEnum.imgbtn:
          items.push(
            <ImgBtn
              key={item.id}
              data={item.data as ImgBtnData}
            />
          );
          break;
      }
    });

    if (menu.onclick) {
      return (
        <div className="cardlabel" onClick={() => menu.onclick?.(status as boolean)}>
          <input
            className="cardcheckbox"
            type="checkbox"
            defaultChecked={status as boolean}
            checked={status as boolean}
          />
          {menu.label}
        </div>
      );
    }

    return (
      <div className="card createWall">
        <div className={`carditem ${down ? 'hide ' : ''}`}>
          <div className={menu.className}>
            {items}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateWallBar;