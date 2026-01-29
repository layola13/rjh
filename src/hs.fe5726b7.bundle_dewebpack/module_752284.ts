import React from 'react';
import PropTypes from 'prop-types';

interface DropdownOption {
  id: string;
  label?: string;
  icon?: string;
}

interface PopoverConfig {
  placement?: string;
  trigger?: string;
  delay?: number;
  delayOpen?: number;
  delayClose?: number;
  imageUrl?: string;
  videoUrl?: string;
  text?: string;
  showBtn?: boolean;
  onBtnClick?: () => void;
  btnText?: string;
  linkText?: string;
  linkUrl?: string;
}

interface DropdownData {
  className?: string;
  customClassName?: string;
  options: DropdownOption[];
  allOptions?: DropdownOption[];
  defaultKey?: string;
  title?: string;
  direction?: 'column' | 'row';
  trigger?: 'hover' | 'click';
  popover?: PopoverConfig;
  onchange: (id: string) => void;
  onClickDropDown?: () => void;
  onHideDropDown?: () => void;
}

interface DropdownProps {
  data: DropdownData;
  id: string;
}

interface DropdownState {
  show: boolean;
}

class Dropdown extends React.Component<DropdownProps, DropdownState> {
  static propTypes = {
    data: PropTypes.object,
    id: PropTypes.string
  };

  static defaultProps = {
    data: {} as DropdownData,
    id: ''
  };

  constructor(props: DropdownProps) {
    super(props);
    this.state = {
      show: false
    };
  }

  componentDidMount(): void {
    document.body.addEventListener('click', this.handleDocumentClick, true);
  }

  UNSAFE_componentWillReceiveProps(): void {
    this.setState({
      show: false
    });
  }

  componentWillUnmount(): void {
    document.body.removeEventListener('click', this.handleDocumentClick);
  }

  handleToggleDropdown = (): void => {
    const { show } = this.state;
    this.setState({
      show: !show
    });

    if (this.props.data?.onClickDropDown) {
      this.props.data.onClickDropDown();
    }
  };

  handleMouseEnter = (): void => {
    this.setState({
      show: true
    });
  };

  handleMouseLeave = (): void => {
    this.setState({
      show: false
    });
  };

  handleDocumentClick = (): void => {
    if (this.state.show) {
      this.setState({
        show: false
      });

      if (this.props.data?.onHideDropDown) {
        this.props.data.onHideDropDown();
      }
    }
  };

  onItemClick(event: React.MouseEvent, data: DropdownData, option: DropdownOption): void {
    data.onchange(option.id);
    data.defaultKey = option.id;
    this.setState({
      show: false
    });
  }

  getOptionByKey(key: string, data: DropdownData): DropdownOption {
    if (key === '') {
      return data.options[0];
    }

    const optionsList = data.allOptions || data.options;
    let selectedOption: DropdownOption | undefined;

    if (optionsList?.length) {
      for (let i = 0; i < optionsList.length; i++) {
        if (optionsList[i].id === key) {
          selectedOption = optionsList[i];
          break;
        }
      }
    }

    return selectedOption!;
  }

  render(): React.ReactElement {
    const { data, id } = this.props;
    let className = data.className ?? '';
    let dropdownId = id;

    if (this.state.show) {
      className += ' dropdownul';
    } else {
      className += ' dropdownul hide';
    }

    const listItems: React.ReactElement[] = [];

    if (data.customClassName) {
      dropdownId += ' ' + data.customClassName;
    } else {
      dropdownId += ' dropdownlist';
    }

    data.options.forEach((option) => {
      const optionId = option.id;
      const optionLabel = option.label ?? '';
      const title = optionLabel;
      const isSelected = data.defaultKey === optionId;

      if (option.icon) {
        if (isSelected) {
          listItems.push(
            <li
              data-id={optionId}
              className="dropdownli"
              role="presentation"
              title={title}
              key={optionId}
              onClick={(e) => this.onItemClick(e, data, option)}
            >
              <span className="dropdownitemspan"> ✔ </span>
              <img src={option.icon} alt="" />
              <span className="utext">{optionLabel}</span>
            </li>
          );
        } else {
          listItems.push(
            <li
              data-id={optionId}
              className="dropdownli"
              role="presentation"
              title={title}
              key={optionId}
              onClick={(e) => this.onItemClick(e, data, option)}
            >
              <span className="dropdownitemspan"></span>
              <img src={option.icon} alt="" />
              <span className="utext">{optionLabel}</span>
            </li>
          );
        }
      } else {
        if (isSelected) {
          listItems.push(
            <li
              data-id={optionId}
              className="dropdownli"
              role="presentation"
              title={title}
              key={optionId}
              onClick={(e) => this.onItemClick(e, data, option)}
            >
              <span className="dropdownitemspan"> ✔ </span>
              <span className="utext">{optionLabel}</span>
            </li>
          );
        } else {
          listItems.push(
            <li
              data-id={optionId}
              className="dropdownli"
              role="presentation"
              title={title}
              key={optionId}
              onClick={(e) => this.onItemClick(e, data, option)}
            >
              <span className="dropdownitemspan"></span>
              <span className="utext">{optionLabel}</span>
            </li>
          );
        }
      }
    });

    let selectedOption: DropdownOption | undefined;
    if (data.defaultKey !== undefined) {
      selectedOption = this.getOptionByKey(data.defaultKey, data);
    }

    let popoverElement: React.ReactElement | null = null;
    if (data.popover) {
      const popoverConfig = data.popover;
      popoverElement = (
        <HSApp.UI.Popover.Heavy
          placement={popoverConfig.placement}
          trigger={popoverConfig.trigger}
          delay={popoverConfig.delay}
          delayOpen={popoverConfig.delayOpen}
          delayClose={popoverConfig.delayClose}
          imageUrl={popoverConfig.imageUrl}
          videoUrl={popoverConfig.videoUrl}
          text={popoverConfig.text}
          showBtn={popoverConfig.showBtn}
          onBtnClick={popoverConfig.onBtnClick}
          btnText={popoverConfig.btnText}
          linkText={popoverConfig.linkText}
          linkUrl={popoverConfig.linkUrl}
        >
          <span className="imageButton helpdiv">
            <img src={''} alt="" />
          </span>
        </HSApp.UI.Popover.Heavy>
      );
    }

    const buttonIcon = selectedOption?.icon ? (
      <img src={selectedOption.icon} alt="" />
    ) : (
      <span className="dropdownitemspan"></span>
    );

    if (data.direction === 'column') {
      className += ' column';
    }

    if (data.trigger === 'hover') {
      return (
        <div
          className={dropdownId}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          {data.title && <div className="utitle">{data.title}</div>}
          <div className="ulcontainer">
            <button type="button">
              {buttonIcon}
              <span className="utext">{selectedOption?.label}</span>
              <div className="caretContainer">
                <span className="caret"></span>
              </div>
            </button>
            <ul role="menu" className={className}>
              {listItems}
            </ul>
            {popoverElement}
          </div>
        </div>
      );
    } else {
      return (
        <div className={dropdownId}>
          {data.title && <div className="utitle">{data.title}</div>}
          <div className="ulcontainer">
            <button type="button" onClick={this.handleToggleDropdown}>
              {buttonIcon}
              <span className="utext">{selectedOption?.label}</span>
              <div className="caretContainer">
                <span className="caret"></span>
              </div>
            </button>
            <ul role="menu" className={className}>
              {listItems}
            </ul>
            {popoverElement}
          </div>
        </div>
      );
    }
  }
}

export default Dropdown;