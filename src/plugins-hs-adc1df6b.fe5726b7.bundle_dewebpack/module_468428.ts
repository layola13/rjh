import React from 'react';
import PropTypes from 'prop-types';
import searchIconSrc from './assets/search-icon';
import clearIconSrc from './assets/clear-icon';

interface HelpSearchItemProps {
  visible: boolean;
  enable: boolean;
  isPressed?: boolean;
  label?: string;
}

interface HelpSearchItemState {
  hover: boolean;
  enable: boolean;
  isPressed: boolean;
  isFocus: boolean;
  searchStr: string;
}

class HelpSearchItem extends React.Component<HelpSearchItemProps, HelpSearchItemState> {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    enable: PropTypes.bool.isRequired,
    isPressed: PropTypes.bool
  };

  static defaultProps = {
    visible: true,
    isPressed: false
  };

  refs: {
    searchInput?: HTMLInputElement;
  };

  constructor(props: HelpSearchItemProps) {
    super(props);
    
    this.state = {
      hover: false,
      enable: props.enable,
      isPressed: props.isPressed ?? false,
      isFocus: false,
      searchStr: ""
    };

    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._searchTextOnKeyUp = this._searchTextOnKeyUp.bind(this);
    this._handleClearUp = this._handleClearUp.bind(this);
  }

  private _isEnabled(): boolean {
    return this.props.enable;
  }

  private _onMouseEnter(): void {
    if (this._isEnabled()) {
      this.setState({ hover: true });
    }
  }

  private _onMouseLeave(): void {
    if (this.state.hover) {
      this.setState({ hover: false });
    }
  }

  private _onHandleClick(event: React.MouseEvent<HTMLInputElement>): void {
    event.stopPropagation();
    event.preventDefault();
  }

  private _onFocus(): void {
    this.setState({ isFocus: true });
  }

  private _onBlur(): void {
    this.setState({ isFocus: false });
  }

  private _handleClearUp(event?: React.MouseEvent<HTMLSpanElement>): void {
    event?.stopPropagation();
    if (this.refs.searchInput) {
      this.refs.searchInput.value = "";
    }
    this.setState({ searchStr: "" });
  }

  private _searchTextOnKeyUp(event: React.KeyboardEvent<HTMLInputElement>): void {
    const key = event.key || (event as any).keyIdentifier;
    if (key === "Enter") {
      this._onClick(event as any);
    }
  }

  private _handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const value = event.target.value;
    this.setState({ searchStr: value });
  }

  private _onClick(event: React.MouseEvent | React.KeyboardEvent): void {
    if (!this._isEnabled()) {
      event.stopPropagation();
      return;
    }

    const { searchStr } = this.state;
    let helpCenterUrl = (window as any).HSApp?.PartnerConfig?.EZHOME_HELP_CENTER_VIDEOS ?? "";

    if (searchStr.trim() !== "") {
      helpCenterUrl = `${helpCenterUrl}search.html?s=${searchStr}`;
    }

    window.open(helpCenterUrl, "_blank", "noopener=yes, noreferrer=yes");

    (window as any).HSApp?.Util?.EventTrack?.instance()?.track(
      (window as any).HSApp?.Util?.EventGroupEnum?.Pageheader,
      "searchBtn_search_help_event",
      { searchStr: `${searchStr}` }
    );

    this._handleClearUp();
  }

  render(): React.ReactElement {
    const { visible, enable, isPressed } = this.props;
    const { hover, searchStr } = this.state;

    const classNames: string[] = ["helpitem", "helpsearchitem"];
    
    if (!visible) {
      classNames.push("hidden");
    }
    if (!enable) {
      classNames.push("disabled");
    }
    if (hover) {
      classNames.push("hover");
    }
    if (isPressed) {
      classNames.push("actived");
    }

    const clearBtnVisibility = searchStr === "" ? "hide" : "";

    return (
      <li
        className={classNames.join(" ")}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
      >
        <div className="helpsearch">
          <input
            ref="searchInput"
            className="searchinput"
            placeholder={(window as any).ResourceManager?.getString("toolbar_help_try_input_keyword") ?? ""}
            value={searchStr}
            onClick={this._onHandleClick}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            onKeyUp={this._searchTextOnKeyUp}
            onChange={this._handleChange}
          />
          <span
            className={`clearBtn ${clearBtnVisibility}`}
            onClick={this._handleClearUp}
          >
            <img src={clearIconSrc} />
          </span>
          <div className="searchicon" onClick={this._onClick}>
            <img src={searchIconSrc} />
          </div>
        </div>
      </li>
    );
  }
}

export default HelpSearchItem;