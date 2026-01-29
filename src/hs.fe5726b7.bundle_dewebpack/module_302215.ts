import React from 'react';
import PropTypes from 'prop-types';
import InputComponent from './InputComponent';

interface DropdownOption {
  id: string;
  label?: string;
  icon?: string;
}

interface DropdownData {
  className?: string;
  title?: string;
  options: DropdownOption[];
  defaultKey?: string;
  defaultRoomName?: string;
  defaultHolder?: string;
  onchange: (key: string, label: string) => void;
  onchangeroomname?: (name: string) => void;
}

interface DropdownProps {
  data: DropdownData;
  id: string;
  flag: boolean;
}

interface DropdownState {
  show: boolean;
}

class Dropdown extends React.Component<DropdownProps, DropdownState> {
  static propTypes = {
    data: PropTypes.object,
    id: PropTypes.string,
    flag: PropTypes.bool
  };

  static defaultProps = {
    data: {},
    id: '',
    flag: false
  };

  private nameinput: any;

  constructor(props: DropdownProps) {
    super(props);
    this.state = {
      show: false
    };
  }

  componentDidMount(): void {
    document.body.addEventListener('click', this.handleDocumentClick, true);
  }

  componentWillUnmount(): void {
    document.body.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick = (): void => {
    if (this.state.show) {
      this.setState({ show: false });
    }
  };

  toggleDropdown = (): void => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  onItemClick = (
    event: React.MouseEvent,
    data: DropdownData,
    option: DropdownOption
  ): void => {
    data.defaultKey = option.id;

    if (data.defaultKey !== undefined) {
      const selectedOption = this.getOptionByKey(data.defaultKey, data);
      const roomTypeNum = this.getRoomTypeNum(this.props.data.defaultKey);
      const fullLabel = selectedOption.label + roomTypeNum;

      data.onchange(option.id, fullLabel);

      this.setState({ show: false }, () => {
        this.nameinput?.onfocus();
      });

      this.nameinput?.setValue(fullLabel);
    }
  };

  getOptionByKey(key: string, data: DropdownData): DropdownOption {
    if (key === '') {
      return data.options[0];
    }

    if (data.options?.length) {
      for (let i = 0; i < data.options.length; i++) {
        if (data.options[i].id === key) {
          return data.options[i];
        }
      }
    }

    return data.options[0];
  }

  getRoomTypeNum(defaultKey?: string): string {
    const selectedItems: any[] = [];
    return selectedItems.length ? String(selectedItems.length) : '';
  }

  render(): React.ReactNode {
    const { data, id, flag } = this.props;
    let className = data.className ?? '';
    const ulClassName = this.state.show
      ? `${className} dropdownul`
      : `${className} dropdownul hide`;

    let buttonClassName = '';
    const isRoomTypeDropdown =
      data.className === 'roomTypeDropdownRightMenu' ||
      data.className === 'roomTypeDropdown';

    if (isRoomTypeDropdown && this.state.show) {
      buttonClassName = 'button';
    }

    const listItems: React.ReactNode[] = [];
    const containerClassName = `${id} dropdownlist`;

    data.options.forEach((option) => {
      if (option.id !== 'none' || !isRoomTypeDropdown) {
        const optionId = option.id;
        const optionLabel = option.label ?? '';
        const title = optionLabel;
        let liClassName = 'dropdownli';

        if (flag && data.defaultKey === optionId) {
          liClassName += ' selectDropdownli';
        }

        listItems.push(
          <li
            key={optionId}
            data-id={optionId}
            className={liClassName}
            role="presentation"
            title={title}
            onClick={(event) => this.onItemClick(event, data, option)}
          >
            {data.defaultKey === optionId ? (
              <span className="dropdownitemspan"> ✔ </span>
            ) : (
              <span className="dropdownitemspan"></span>
            )}
            {option.icon && <img src={option.icon} alt="" />}
            <span className="utext">{optionLabel}</span>
          </li>
        );
      }
    });

    const selectedOption =
      data.defaultKey !== undefined
        ? this.getOptionByKey(data.defaultKey, data)
        : null;
    const isNoneSelected = data.defaultKey === 'none';
    const keyType = isNoneSelected ? undefined : data.defaultKey;

    return (
      <div className={containerClassName}>
        {data.title && <span className="utitle">{data.title}</span>}

        {selectedOption?.icon ? (
          <div className="ulcontainer">
            <button type="button" onClick={this.toggleDropdown}>
              <img src={selectedOption.icon} alt="" />
              <span className="utext">{selectedOption.label}</span>
              <div className="caretContainer">
                <span className="caret"></span>
              </div>
            </button>
            <ul role="menu" className={ulClassName}>
              {listItems}
            </ul>
          </div>
        ) : (
          <div className="ulcontainer">
            <button
              type="button"
              onClick={this.toggleDropdown}
              className={buttonClassName}
            >
              <span className="dropdownitemspan"></span>
              <span className="utext">{selectedOption?.label}</span>
              <div className="caretContainer">
                <span className="caret"></span>
              </div>
            </button>
            <ul role="menu" className={ulClassName}>
              {listItems}
            </ul>
          </div>
        )}

        {!selectedOption?.icon && (
          <InputComponent
            ref={(ref) => {
              this.nameinput = ref;
            }}
            isReadOnly={isNoneSelected}
            value={data.defaultRoomName}
            onChangeName={data.onchangeroomname}
            keyType={keyType}
            defaultHolder={data.defaultHolder}
          />
        )}
      </div>
    );
  }
}

export default Dropdown;