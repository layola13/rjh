import React from 'react';
import { Menu, MenuItem, CheckBox } from './components';
import { Icons } from './Icons';

interface SubCheckboxConfig {
  txt: string;
  checked: boolean;
  onCheck?: (checked: boolean) => void;
}

interface DropdownCardData {
  title: string;
  subTitle?: string;
  className?: string;
  menuClassName?: string;
  children: string[];
  displayChildren?: string[];
  selectedItem: string;
  onClick?: (selection: { selectedItem: string; index: number }) => void;
  subCheckbox?: SubCheckboxConfig;
}

interface DropdownCardProps {
  data: DropdownCardData;
  theme?: string;
}

interface DropdownCardState {
  selectedItem: string;
  checked: boolean;
}

export class DropdownCard extends React.Component<DropdownCardProps, DropdownCardState> {
  static defaultProps: Partial<DropdownCardProps> = {
    data: {
      title: '欢迎窗口',
      subTitle: '设置邮件提醒可在渲染完成以后通知您',
      className: '',
      menuClassName: '',
      children: ['m', 'cm', 'mm'],
      selectedItem: 'm',
      onClick: () => {},
      subCheckbox: {
        txt: '四舍五入',
        checked: false,
        onCheck: () => {}
      }
    }
  };

  constructor(props: DropdownCardProps) {
    super(props);

    const { data } = props;
    const isChecked = data.subCheckbox?.checked ?? false;

    this.state = {
      selectedItem: data.selectedItem,
      checked: isChecked
    };

    this.onChange = this.onChange.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps: DropdownCardProps): void {
    this.setState({
      selectedItem: nextProps.data.selectedItem,
      checked: nextProps.data.subCheckbox?.checked ?? false
    });
  }

  onListItemSelect(index: number): void {
    const selectedItem = this.props.data.children[index];
    const selection = {
      selectedItem,
      index
    };

    this.setState({ selectedItem });

    this.props.data.onClick?.(selection);
  }

  onChange(checked: boolean): void {
    this.setState({ checked }, () => {
      this.props.data.subCheckbox?.onCheck?.(checked);
    });
  }

  render(): React.ReactElement {
    const { data, theme } = this.props;
    const { selectedItem, checked } = this.state;

    let wrapperClassName = 'setting-window-dropdown-card-wrapper';
    if (data.className) {
      wrapperClassName += ` ${data.className}`;
    }

    const itemsToDisplay = data.displayChildren?.length ? data.displayChildren : data.children;
    const currentSelectedItem = data.displayChildren?.length
      ? itemsToDisplay[data.children.findIndex(item => item === selectedItem)]
      : selectedItem;

    const menuItems = itemsToDisplay.map((item, index) => (
      <MenuItem
        key={index}
        className={currentSelectedItem === item ? 'dropdown-card-item-selected' : ''}
        onClick={() => this.onListItemSelect(index)}
      >
        {item}
      </MenuItem>
    ));

    let menuClassName = `dropdown-card-dropdown-list-${theme ?? ''}`;
    if (data.menuClassName) {
      menuClassName += ` ${data.menuClassName}`;
    }

    return (
      <div className={wrapperClassName}>
        <div className="dropdown-card-left-part">
          <div className="dropdown-card-title">{data.title}</div>
          {data.subTitle && (
            <div className="dropdown-card-sub-title">{data.subTitle}</div>
          )}
          {data.subCheckbox && (
            <CheckBox checked={checked} onChange={this.onChange}>
              {data.subCheckbox.txt}
            </CheckBox>
          )}
        </div>
        <div className="dropdown-card-right-part">
          <div className="dropdown-card-dropdown-item">
            <Menu
              subItems={menuItems}
              trigger="click"
              placement="bottomRight"
              popupClassName={`dropdown-card-dropdown-list ${menuClassName}`}
            >
              <div className="dropdown-card-dropdown-button">
                {currentSelectedItem}
                <Icons
                  type="hs_xiao_danjiantou_xia"
                  className="dropdown-card-dropdown-icon"
                />
              </div>
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}