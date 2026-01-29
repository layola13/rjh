import React from 'react';
import PropTypes from 'prop-types';

interface DropdownOption {
  id: string;
  label: string;
}

interface DropdownData {
  options: DropdownOption[];
  defaultKey: string;
  tooltip?: string;
  onchange: (id: string) => void;
}

interface DropdownProps {
  data: DropdownData;
}

interface DropdownState {
  hoverItemId: string;
  selectItemId: string;
  selectItemLabel: string;
  hideList: boolean;
}

export default class PureTextDropdown extends React.Component<DropdownProps, DropdownState> {
  static propTypes = {
    data: PropTypes.object
  };

  static defaultProps: DropdownProps = {
    data: {
      options: [
        {
          id: "1",
          label: "one"
        },
        {
          id: "2",
          label: "two"
        },
        {
          id: "3",
          label: "three"
        }
      ],
      defaultKey: "1",
      tooltip: "",
      onchange: () => {}
    }
  };

  private timer?: ReturnType<typeof setTimeout>;

  constructor(props: DropdownProps) {
    super(props);

    const { data } = props;
    let defaultId = '';
    let defaultLabel = '';

    data.options.forEach((option) => {
      if (option.id === data.defaultKey) {
        defaultId = option.id;
        defaultLabel = option.label;
      }
    });

    this.state = {
      hoverItemId: defaultId,
      selectItemId: defaultId,
      selectItemLabel: defaultLabel,
      hideList: true
    };
  }

  onClickListItem(itemId: string, itemLabel: string): void {
    this.setState(
      {
        hoverItemId: itemId,
        selectItemId: itemId,
        selectItemLabel: itemLabel,
        hideList: true
      },
      () => this.props.data.onchange(itemId)
    );
  }

  onEnterListItem(itemId: string): void {
    this.setState({
      hoverItemId: itemId
    });
  }

  onHidePopup(): void {
    this.timer = setTimeout(() => {
      this.setState({
        hoverItemId: this.props.data.defaultKey,
        hideList: true
      });
    }, 100);
  }

  onShowPopup(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    const currentSelectId = this.state.selectItemId;
    this.setState({
      hoverItemId: currentSelectId,
      hideList: false
    });
  }

  clearPopupTimeout(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render(): React.ReactElement {
    const { data } = this.props;
    const { hideList, hoverItemId, selectItemLabel } = this.state;

    let listClassName = "dropdown-list-part ";
    if (hideList) {
      listClassName += "hide";
    }

    const listItems: React.ReactElement[] = [];
    data.options.forEach((option) => {
      let itemClassName = "dropdown-list-li ";
      if (option.id === hoverItemId) {
        itemClassName += "dropdown-list-hover-item ";
      }

      listItems.push(
        <li
          key={option.id}
          className={itemClassName}
          role="menuitem"
          onMouseEnter={() => this.onEnterListItem(option.id)}
          onClick={() => this.onClickListItem(option.id, option.label)}
        >
          {option.label}
        </li>
      );
    });

    return (
      <div className="pure-text-dropdown-wrapper">
        <div className="dropdown-content">
          <div
            className="dropdown-main-part"
            onMouseEnter={() => this.onShowPopup()}
            onMouseLeave={() => this.onHidePopup()}
          >
            <div className="dropdown-main-label">{selectItemLabel}</div>
            <div className="dropdown-main-triangle" />
          </div>
          <ul
            className={listClassName}
            onMouseEnter={() => this.clearPopupTimeout()}
            onMouseLeave={() => this.onHidePopup()}
          >
            {listItems}
          </ul>
        </div>
      </div>
    );
  }
}