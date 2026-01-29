import React from 'react';
import PropTypes from 'prop-types';
import { IconfontView } from './IconfontView';
import { Tooltip } from './Tooltip';

interface RenderingModeOption {
  id: string;
  iconType: string;
  label: string;
  hotKey?: string;
}

interface MaterialDropdownData {
  disable?: boolean;
  options: RenderingModeOption[];
  onchange: (id: string) => void;
}

interface MaterialDropdownProps {
  data: MaterialDropdownData;
}

interface MaterialDropdownState {
  showList: boolean;
  selectItemImgHover?: boolean;
}

interface ValueChangeEvent {
  data: {
    fieldName: string;
    oldValue: string;
  };
}

export default class MaterialDropdown extends React.Component<MaterialDropdownProps, MaterialDropdownState> {
  static propTypes = {
    data: PropTypes.object
  };

  static defaultProps = {
    data: {
      options: [],
      onchange: () => {}
    }
  };

  private _lastRenderMode?: string;
  private signalHook: any;

  constructor(props: MaterialDropdownProps) {
    super(props);
    
    this._lastRenderMode = undefined;
    this.state = {
      showList: false
    };
    
    this.signalHook = new HSCore.Util.SignalHook(this);
    this.documentClickedHidePopup = this.documentClickedHidePopup.bind(this);
  }

  private _renderingModeValueChange = (event: ValueChangeEvent): void => {
    if (event.data.fieldName === 'renderingMode') {
      this._lastRenderMode = event.data.oldValue;
      this.forceUpdate();
    }
  };

  componentDidMount(): void {
    this.signalHook.listen(
      HSApp.App.getApp().appSettings.signalValueChanged,
      this._renderingModeValueChange
    );
    document.addEventListener('mousedown', this.documentClickedHidePopup);
  }

  componentWillUnmount(): void {
    this.signalHook.dispose();
    document.removeEventListener('mousedown', this.documentClickedHidePopup);
  }

  private documentClickedHidePopup(event: MouseEvent): void {
    if (this.state.showList) {
      const dropdownList = $('.material-dropdown-list');
      const isOutsideClick = !dropdownList.is(event.target) && dropdownList.has(event.target as HTMLElement).length === 0;
      const isRightClick = event.which === 3;
      
      if (isOutsideClick || isRightClick) {
        this.setState({ showList: false });
      }
    }
  }

  private currentmaterialOnClick = (): void => {
    this.setState({ showList: !this.state.showList });
  };

  private selectItemImgHoverStatus = (): void => {
    this.setState({ selectItemImgHover: true });
  };

  private selectItemImgNormalStatus = (): void => {
    this.setState({ selectItemImgHover: false });
  };

  render(): React.ReactNode {
    const { data } = this.props;
    const { disable = false, options, onchange } = data;
    const { showList, selectItemImgHover } = this.state;

    const DEFAULT_RENDERING_MODE = HSApp.App.RenderingMode.Shading;
    const currentRenderingMode = HSApp.App.getApp().appSettings.renderingMode || DEFAULT_RENDERING_MODE;
    
    const currentOption = options.find(option => option.id === currentRenderingMode);
    
    let currentIconType: string = '';
    let currentLabel: string = '';

    const dropdownItems = options.map(option => {
      let itemClassName = 'dropdown-ul-item';
      
      if (currentOption) {
        if (currentRenderingMode === option.id) {
          currentIconType = option.iconType;
          itemClassName += ' active';
          currentLabel = option.label;
        }
      } else if (option.id === this._lastRenderMode) {
        currentIconType = option.iconType;
        itemClassName += ' active';
        currentLabel = option.label;
      }

      return (
        <div
          key={option.id}
          className={itemClassName}
          onClick={() => {
            onchange(option.id);
            this.setState({ showList: false });
          }}
        >
          <span className="ul-item-img">
            <IconfontView
              showType={option.iconType}
              customStyle={{ fontSize: '20px' }}
              hoverColor="#396EFE"
              clickColor="#396EFE"
            />
          </span>
          <span className="ul-item-label"> {option.label}</span>
          <span className="ul-item-hotkey"> {option.hotKey}</span>
        </div>
      );
    });

    const currentMaterialClassName = `current-material${selectItemImgHover ? ' hover-material' : ''}`;

    const currentMaterialButton = (
      <div
        className={currentMaterialClassName}
        onMouseEnter={this.selectItemImgHoverStatus}
        onMouseLeave={this.selectItemImgNormalStatus}
        onClick={this.currentmaterialOnClick}
      >
        <IconfontView
          showType={currentIconType}
          customClass="current-material-img"
          customStyle={{ fontSize: '20px' }}
          hoverColor="#396EFE"
          clickColor="#396EFE"
        />
        <div className="current-material-drop-icon">
          <IconfontView
            showType="hs_xiao_shijiantou_tuozhan"
            customStyle={{ fontSize: '6px' }}
            hoverColor="#396EFE"
            clickColor="#396EFE"
          />
        </div>
      </div>
    );

    const buttonWithTooltip = showList ? (
      currentMaterialButton
    ) : (
      <Tooltip placement="top" trigger="hover" title={currentLabel} color="dark">
        {currentMaterialButton}
      </Tooltip>
    );

    return (
      <div className={`material-dropdown-list${disable ? ' disable' : ''}`}>
        {buttonWithTooltip}
        {showList && (
          <ul role="menu" className="material-dropdown-ul">
            {dropdownItems}
          </ul>
        )}
      </div>
    );
  }
}